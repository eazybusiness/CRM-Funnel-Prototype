import fs from 'fs'
import path from 'path'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../../../../lib/auth.js'
import { query } from '../../../../lib/db.js'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const session = await getServerSession(req, res, authOptions)
    if (!session?.user?.id) {
      return res.status(401).json({ error: 'Nicht autorisiert' })
    }

    const userId = parseInt(session.user.id, 10)

    // Check entitlement: enrollment for course slug 'stoffwechselkur-ebook' or id 2
    const result = await query(
      `SELECT 1
       FROM enrollments e
       JOIN courses c ON e.course_id = c.id
       WHERE e.user_id = $1
         AND e.is_active = true
         AND (c.slug = 'stoffwechselkur-ebook' OR c.id = 2)
       LIMIT 1`,
      [userId]
    )

    if (!result.rows || result.rows.length === 0) {
      return res.status(403).json({ error: 'Kein Zugriff auf diesen Download' })
    }

    // Resolve file path (not publicly accessible)
    const filePath = path.join(process.cwd(), 'client_input', 'Ebook Stoffwechselkur.pdf')

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'Datei nicht gefunden' })
    }

    const stat = fs.statSync(filePath)

    res.setHeader('Content-Type', 'application/pdf')
    res.setHeader('Content-Length', stat.size)
    res.setHeader('Content-Disposition', 'attachment; filename="Ebook_Stoffwechselkur.pdf"')

    const stream = fs.createReadStream(filePath)
    stream.pipe(res)
  } catch (error) {
    console.error('Ebook download error:', error)
    return res.status(500).json({ error: 'Interner Serverfehler' })
  }
}
