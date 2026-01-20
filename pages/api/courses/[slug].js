export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { slug } = req.query
    const userId = req.headers['x-user-id'] // From session middleware

    if (!slug) {
      return res.status(400).json({ error: 'Course slug is required' })
    }

    // Check if user has access to this course
    const accessCheck = await query(`
      SELECT e.id, e.is_active
      FROM enrollments e
      JOIN courses c ON e.course_id = c.id
      WHERE e.user_id = $1 AND c.slug = $2 AND e.is_active = true
    `, [userId, slug])

    if (accessCheck.rows.length === 0) {
      return res.status(403).json({ error: 'No access to this course' })
    }

    // Fetch course details with modules and lessons
    const courseData = await query(`
      SELECT 
        c.id,
        c.title,
        c.description,
        c.slug,
        json_agg(
          json_build_object(
            'id', m.id,
            'title', m.title,
            'description', m.description,
            'sortOrder', m.sort_order,
            'lessons', (
              SELECT json_agg(
                json_build_object(
                  'id', l.id,
                  'title', l.title,
                  'description', l.description,
                  'videoUrl', l.video_url,
                  'pdfUrl', l.pdf_url,
                  'durationMinutes', l.duration_minutes,
                  'isFree', l.is_free,
                  'sortOrder', l.sort_order,
                  'completed', CASE WHEN up.completed_at IS NOT NULL THEN true ELSE false END
                )
                ORDER BY l.sort_order
              )
              FROM lessons l
              LEFT JOIN user_progress up ON l.id = up.lesson_id AND up.user_id = $1
              WHERE l.module_id = m.id
            )
          )
          ORDER BY m.sort_order
        ) as modules
      FROM courses c
      LEFT JOIN modules m ON c.id = m.course_id
      WHERE c.slug = $2
      GROUP BY c.id
    `, [userId, slug])

    if (courseData.rows.length === 0) {
      return res.status(404).json({ error: 'Course not found' })
    }

    res.status(200).json({ course: courseData.rows[0] })

  } catch (error) {
    console.error('Error fetching course:', error)
    res.status(500).json({ error: 'Ein Fehler ist aufgetreten' })
  }
}

async function query(text, params) {
  // Mock data for development
  return {
    rows: [{
      id: 1,
      title: 'Minimalismus Grundlagen',
      description: 'Lerne die Grundlagen des minimalistischen Lebens',
      slug: 'minimalismus-grundlagen',
      modules: [
        {
          id: 1,
          title: 'Einführung',
          description: 'Grundlagen des Minimalismus',
          sortOrder: 0,
          lessons: [
            {
              id: 1,
              title: 'Was ist Minimalismus?',
              description: 'Eine Einführung in die Philosophie',
              videoUrl: 'https://www.youtube.com/embed/example',
              pdfUrl: null,
              durationMinutes: 15,
              isFree: true,
              sortOrder: 0,
              completed: false
            }
          ]
        }
      ]
    }]
  }
}
