import { getServerSession } from 'next-auth/next'
import { authOptions } from '../../../lib/auth.js'
import { query } from '../../../lib/db'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { slug } = req.query

    if (!slug) {
      return res.status(400).json({ error: 'Course slug is required' })
    }

    const session = await getServerSession(req, res, authOptions)
    if (!session?.user?.id) {
      return res.status(401).json({ error: 'Nicht authentifiziert' })
    }

    const userId = session.user.id

    // Check if user has access to this course
    const accessCheck = await query(`
      SELECT e.id FROM enrollments e
      JOIN courses c ON e.course_id = c.id
      WHERE e.user_id = $1 AND c.slug = $2 AND e.is_active = true
    `, [userId, slug])

    if (accessCheck.rows.length === 0) {
      return res.status(403).json({ error: 'No access to this course' })
    }

    // Fetch course with modules and lessons (only columns that exist in live DB)
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
            'sortOrder', m.sort_order,
            'lessons', (
              SELECT json_agg(
                json_build_object(
                  'id', l.id,
                  'title', l.title,
                  'videoUrl', l.video_url,
                  'sortOrder', l.sort_order
                )
                ORDER BY l.sort_order
              )
              FROM lessons l
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
