import { sql } from '@vercel/postgres'

export async function query(text, params = []) {
  try {
    const result = await sql.query(text, params)
    return result
  } catch (error) {
    console.error('Database query error:', error)
    throw error
  }
}

export async function getUser(email) {
  const result = await query('SELECT * FROM users WHERE email = $1', [email])
  return result.rows[0]
}

export async function getUserById(id) {
  const result = await query('SELECT * FROM users WHERE id = $1', [id])
  return result.rows[0]
}

export async function createUser(data) {
  const { firstName, lastName, email, passwordHash } = data
  const result = await query(
    `INSERT INTO users (first_name, last_name, email, password_hash, created_at, updated_at) 
     VALUES ($1, $2, $3, $4, NOW(), NOW()) 
     RETURNING id, email, first_name, last_name`,
    [firstName, lastName, email, passwordHash]
  )
  return result.rows[0]
}

export async function getUserEnrollments(userId) {
  const result = await query(`
    SELECT 
      e.id,
      e.enrolled_at,
      e.expires_at,
      e.is_active,
      c.id as course_id,
      c.title,
      c.description,
      c.slug,
      COUNT(DISTINCT m.id) as module_count,
      COUNT(DISTINCT l.id) as lesson_count,
      SUM(CASE WHEN up.completed_at IS NOT NULL THEN 1 ELSE 0 END) as completed_lessons,
      CASE 
        WHEN COUNT(DISTINCT l.id) > 0 
        THEN (SUM(CASE WHEN up.completed_at IS NOT NULL THEN 1 ELSE 0 END)::float / COUNT(DISTINCT l.id) * 100)
        ELSE 0 
      END as progress_percentage
    FROM enrollments e
    JOIN courses c ON e.course_id = c.id
    LEFT JOIN modules m ON c.id = m.course_id
    LEFT JOIN lessons l ON m.id = l.module_id
    LEFT JOIN user_progress up ON l.id = up.lesson_id AND up.user_id = e.user_id
    WHERE e.user_id = $1 AND e.is_active = true
    GROUP BY e.id, c.id, c.title, c.description, c.slug
    ORDER BY e.enrolled_at DESC
  `, [userId])
  return result.rows
}

export async function getCourseBySlug(slug, userId = null) {
  const result = await query(`
    SELECT 
      c.id,
      c.title,
      c.description,
      c.slug,
      c.price
    FROM courses c
    WHERE c.slug = $1
  `, [slug])
  return result.rows[0]
}

export async function checkUserAccess(userId, courseSlug) {
  const result = await query(`
    SELECT e.id, e.is_active
    FROM enrollments e
    JOIN courses c ON e.course_id = c.id
    WHERE e.user_id = $1 AND c.slug = $2 AND e.is_active = true
  `, [userId, courseSlug])
  return result.rows.length > 0
}

export async function createEnrollment(userId, courseId, paypalPaymentId = null) {
  const result = await query(`
    INSERT INTO enrollments (user_id, course_id, paypal_payment_id, enrolled_at, is_active)
    VALUES ($1, $2, $3, NOW(), true)
    RETURNING id
  `, [userId, courseId, paypalPaymentId])
  return result.rows[0]
}

export async function updateLessonProgress(userId, lessonId, completed = false, progressPercentage = 0) {
  if (completed) {
    await query(`
      INSERT INTO user_progress (user_id, lesson_id, completed_at, progress_percentage)
      VALUES ($1, $2, NOW(), 100)
      ON CONFLICT (user_id, lesson_id) 
      DO UPDATE SET completed_at = NOW(), progress_percentage = 100
    `, [userId, lessonId])
  } else {
    await query(`
      INSERT INTO user_progress (user_id, lesson_id, progress_percentage)
      VALUES ($1, $2, $3)
      ON CONFLICT (user_id, lesson_id) 
      DO UPDATE SET progress_percentage = $3
    `, [userId, lessonId, progressPercentage])
  }
}
