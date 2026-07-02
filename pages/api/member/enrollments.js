import { getServerSession } from 'next-auth/next'
import { authOptions } from '../auth/[...nextauth].js'
import { query } from '../../../lib/db'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const session = await getServerSession(req, res, authOptions)
    if (!session?.user?.id) {
      return res.status(401).json({ error: 'Nicht authentifiziert' })
    }

    const userId = session.user.id

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
        COUNT(DISTINCT l.id) as lesson_count
      FROM enrollments e
      JOIN courses c ON e.course_id = c.id
      LEFT JOIN modules m ON c.id = m.course_id
      LEFT JOIN lessons l ON m.id = l.module_id
      WHERE e.user_id = $1 AND e.is_active = true
      GROUP BY e.id, c.id, c.title, c.description, c.slug
      ORDER BY e.enrolled_at DESC
    `, [userId])

    const enrollments = result.rows.map(row => ({
      id: row.id,
      enrolledAt: row.enrolled_at,
      expiresAt: row.expires_at,
      isActive: row.is_active,
      progressPercentage: 0,
      course: {
        id: row.course_id,
        title: row.title,
        description: row.description,
        slug: row.slug,
        modules: Array(parseInt(row.module_count || 0)).fill(null),
        lessons: Array(parseInt(row.lesson_count || 0)).fill(null),
        completedLessons: 0,
        duration: parseInt(row.lesson_count || 0) * 15
      }
    }))

    res.status(200).json({ enrollments })

  } catch (error) {
    console.error('Error fetching enrollments:', error)
    res.status(500).json({ error: 'Ein Fehler ist aufgetreten' })
  }
}
