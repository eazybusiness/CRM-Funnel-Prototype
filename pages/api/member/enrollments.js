export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // Get user session (you'll need to implement session checking)
    // For now, we'll use a placeholder
    const userId = req.query.userId || req.headers['x-user-id']

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    // Fetch user enrollments with course details
    const enrollments = await query(`
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

    const formattedEnrollments = enrollments.rows.map(row => ({
      id: row.id,
      enrolledAt: row.enrolled_at,
      expiresAt: row.expires_at,
      isActive: row.is_active,
      progressPercentage: Math.round(row.progress_percentage || 0),
      course: {
        id: row.course_id,
        title: row.title,
        description: row.description,
        slug: row.slug,
        modules: Array(parseInt(row.module_count)).fill(null),
        lessons: Array(parseInt(row.lesson_count)).fill(null),
        completedLessons: parseInt(row.completed_lessons || 0),
        duration: parseInt(row.lesson_count || 0) * 15 // Estimate 15 min per lesson
      }
    }))

    res.status(200).json({ enrollments: formattedEnrollments })

  } catch (error) {
    console.error('Error fetching enrollments:', error)
    res.status(500).json({ error: 'Ein Fehler ist aufgetreten' })
  }
}

// Helper function for database queries
async function query(text, params) {
  // This would be replaced with actual Vercel Postgres connection
  // For now, return mock data for development
  return { 
    rows: [
      {
        id: 1,
        enrolled_at: new Date(),
        expires_at: null,
        is_active: true,
        course_id: 1,
        title: 'Minimalismus Grundlagen',
        description: 'Lerne die Grundlagen des minimalistischen Lebens',
        slug: 'minimalismus-grundlagen',
        module_count: 3,
        lesson_count: 12,
        completed_lessons: 5,
        progress_percentage: 41.67
      }
    ] 
  }
}
