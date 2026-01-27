import { query } from '../../../lib/db.js'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../auth/[...nextauth].js'

export default async function handler(req, res) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // Check if user is authenticated
    const session = await getServerSession(req, res, authOptions)
    if (!session?.user?.id) {
      return res.status(401).json({ error: 'Nicht autorisiert' })
    }

    const userId = parseInt(session.user.id)

    // Start transaction
    await query('BEGIN')

    try {
      // Delete user progress
      await query('DELETE FROM user_progress WHERE user_id = $1', [userId])
      
      // Delete enrollments
      await query('DELETE FROM enrollments WHERE user_id = $1', [userId])
      
      // Delete purchases
      await query('DELETE FROM purchases WHERE user_id = $1', [userId])
      
      // Delete user account
      const result = await query('DELETE FROM users WHERE id = $1 RETURNING email', [userId])
      
      if (result.rows.length === 0) {
        throw new Error('User not found')
      }

      await query('COMMIT')

      // Log deletion for audit purposes (without personal data)
      console.log(`User account deleted: ID ${userId} at ${new Date().toISOString()}`)

      res.status(200).json({ 
        message: 'Ihr Account wurde erfolgreich gelöscht',
        email: result.rows[0].email
      })

    } catch (error) {
      await query('ROLLBACK')
      throw error
    }

  } catch (error) {
    console.error('Account deletion error:', error)
    res.status(500).json({ error: 'Fehler beim Löschen des Accounts. Bitte kontaktieren Sie den Support.' })
  }
}
