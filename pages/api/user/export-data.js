import { query } from '../../../lib/db.js'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../auth/[...nextauth].js'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // Check if user is authenticated
    const session = await getServerSession(req, res, authOptions)
    if (!session?.user?.id) {
      return res.status(401).json({ error: 'Nicht autorisiert' })
    }

    const userId = parseInt(session.user.id)

    // Get user data
    const userResult = await query(
      'SELECT id, first_name, last_name, email, created_at, updated_at FROM users WHERE id = $1',
      [userId]
    )

    if (userResult.rows.length === 0) {
      return res.status(404).json({ error: 'User nicht gefunden' })
    }

    const user = userResult.rows[0]

    // Get enrollments with course data
    const enrollmentsResult = await query(`
      SELECT 
        e.enrolled_at,
        e.is_active,
        e.expires_at,
        c.title as course_title,
        c.description as course_description,
        c.slug as course_slug,
        p.amount as payment_amount,
        p.created_at as payment_date,
        p.paypal_payment_id
      FROM enrollments e
      JOIN courses c ON e.course_id = c.id
      LEFT JOIN purchases p ON e.user_id = p.user_id AND e.course_id = p.course_id
      WHERE e.user_id = $1
      ORDER BY e.enrolled_at DESC
    `, [userId])

    // Get progress data
    const progressResult = await query(`
      SELECT 
        up.completed_at,
        up.progress_percentage,
        l.title as lesson_title,
        m.title as module_title,
        c.title as course_title
      FROM user_progress up
      JOIN lessons l ON up.lesson_id = l.id
      JOIN modules m ON l.module_id = m.id
      JOIN courses c ON m.course_id = c.id
      WHERE up.user_id = $1
      ORDER BY up.completed_at DESC
    `, [userId])

    // Compile export data
    const exportData = {
      personal_data: {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        account_created: user.created_at,
        last_updated: user.updated_at
      },
      enrollments: enrollmentsResult.rows,
      progress: progressResult.rows,
      export_date: new Date().toISOString(),
      export_type: 'DSGVO Data Export'
    }

    // Log export for audit purposes (without personal data)
    console.log(`Data export requested: User ID ${userId} at ${new Date().toISOString()}`)

    // Set headers for file download
    res.setHeader('Content-Type', 'application/json')
    res.setHeader('Content-Disposition', `attachment; filename="meine_daten_${new Date().toISOString().split('T')[0]}.json"`)

    res.status(200).json(exportData)

  } catch (error) {
    console.error('Data export error:', error)
    res.status(500).json({ error: 'Fehler beim Exportieren Ihrer Daten. Bitte kontaktieren Sie den Support.' })
  }
}
