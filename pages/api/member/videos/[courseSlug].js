import { getServerSession } from 'next-auth/next'
import { authOptions } from '../../../../lib/auth.js'
import { query } from '../../../../lib/db'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // Check if user is authenticated
    const session = await getServerSession(req, res, authOptions)
    if (!session?.user?.email) {
      return res.status(401).json({ error: 'Nicht authentifiziert' })
    }

    const { courseSlug } = req.query
    if (!courseSlug) {
      return res.status(400).json({ error: 'Kurs-Slug erforderlich' })
    }

    // Get user from database and check enrollment
    const userResult = await query('SELECT * FROM users WHERE email = $1', [session.user.email])
    if (userResult.rows.length === 0) {
      return res.status(404).json({ error: 'Benutzer nicht gefunden' })
    }
    const user = userResult.rows[0]

    // Check if user is enrolled in the course
    const enrollmentCheck = await query(`
      SELECT e.id 
      FROM enrollments e
      JOIN courses c ON e.course_id = c.id
      WHERE e.user_id = $1 AND c.slug = $2 AND e.is_active = true
    `, [user.id, courseSlug])

    if (enrollmentCheck.rows.length === 0) {
      return res.status(403).json({ error: 'Kein Zugriff auf diesen Kurs' })
    }

    // Fetch course title and description
    const courseInfo = await query(`
      SELECT id, title, description FROM courses WHERE slug = $1
    `, [courseSlug])

    // Fetch all modules with lessons and video URLs for this course
    const lessonData = await query(`
      SELECT 
        m.id as module_id,
        m.title as module_title,
        m.description as module_description,
        m.sort_order as module_sort,
        l.id as lesson_id,
        l.title as lesson_title,
        l.video_url,
        l.sort_order as lesson_sort
      FROM modules m
      JOIN courses c ON m.course_id = c.id
      LEFT JOIN lessons l ON l.module_id = m.id
      WHERE c.slug = $1
      ORDER BY m.sort_order, l.sort_order
    `, [courseSlug])

    // Build structured modules array
    const modulesMap = {}
    lessonData.rows.forEach(row => {
      if (!modulesMap[row.module_id]) {
        modulesMap[row.module_id] = {
          id: row.module_id,
          title: row.module_title,
          description: row.module_description,
          sortOrder: row.module_sort,
          lessons: []
        }
      }
      if (row.lesson_id) {
        modulesMap[row.module_id].lessons.push({
          id: row.lesson_id,
          title: row.lesson_title,
          videoUrl: row.video_url || null,
          sortOrder: row.lesson_sort
        })
      }
    })

    const modules = Object.values(modulesMap).sort((a, b) => a.sortOrder - b.sortOrder)
    const totalVideos = lessonData.rows.filter(r => r.video_url).length

    res.status(200).json({ 
      success: true,
      course: courseInfo.rows[0] || { slug: courseSlug },
      modules,
      totalVideos
    })

  } catch (error) {
    console.error('Video API error:', error)
    res.status(500).json({ error: 'Interner Serverfehler' })
  }
}
