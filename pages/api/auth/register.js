import bcrypt from 'bcryptjs'
import { query } from '../../../lib/db.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { firstName, lastName, email, password } = req.body

    // Validation
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ error: 'Alle Felder sind erforderlich' })
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Passwort muss mindestens 6 Zeichen lang sein' })
    }

    // Check if user already exists
    const existingUser = await query('SELECT id FROM users WHERE email = $1', [email])
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ error: 'Ein Account mit dieser E-Mail existiert bereits' })
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 12)

    // Create user
    const result = await query(
      `INSERT INTO users (first_name, last_name, email, password_hash, created_at, updated_at) 
       VALUES ($1, $2, $3, $4, NOW(), NOW()) RETURNING id, email, first_name, last_name`,
      [firstName, lastName, email, passwordHash]
    )

    const user = result.rows[0]

    res.status(201).json({ 
      message: 'Account erfolgreich erstellt',
      user: {
        id: user.id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name
      }
    })

  } catch (error) {
    console.error('Registration error:', error)
    res.status(500).json({ error: 'Ein Fehler ist aufgetreten. Bitte versuche es erneut.' })
  }
}
