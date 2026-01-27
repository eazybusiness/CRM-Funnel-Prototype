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

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Ungültige E-Mail-Adresse' })
    }

    // Password strength validation
    if (password.length < 8) {
      return res.status(400).json({ error: 'Passwort muss mindestens 8 Zeichen lang sein' })
    }
    
    // Check for at least one number and one letter
    if (!/(?=.*[a-zA-Z])(?=.*\d)/.test(password)) {
      return res.status(400).json({ error: 'Passwort muss mindestens einen Buchstaben und eine Zahl enthalten' })
    }
    
    // Check for common weak passwords
    const weakPasswords = ['password', '12345678', 'qwerty123', 'admin123', 'passwort123']
    if (weakPasswords.includes(password.toLowerCase())) {
      return res.status(400).json({ error: 'Bitte wählen Sie ein sichereres Passwort' })
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
