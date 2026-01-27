import { query } from '../../../lib/db'
import bcrypt from 'bcryptjs'
import { checkRateLimit, getClientIP } from '../../../lib/rateLimit.js'

// Generate random password for new users
function generateRandomPassword(length = 12) {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*'
  let password = ''
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return password
}

// Helper function to send emails (using Brevo)
async function sendEmail(to, subject, html, text) {
  try {
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'api-key': process.env.BREVO_API_KEY,
      },
      body: JSON.stringify({
        sender: {
          name: 'Einfach bewusster leben',
          email: process.env.EMAIL_FROM || 'noreply@einfachbewusstleben.de',
        },
        to: [{ email: to }],
        subject,
        htmlContent: html,
        textContent: text,
      }),
    })

    if (!response.ok) {
      console.error('Email send error:', await response.text())
    }
  } catch (error) {
    console.error('Email error:', error)
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // Rate limiting for payment endpoints
  const ip = getClientIP(req)
  const rateLimitResult = checkRateLimit(ip, 10, 300000) // 10 attempts per 5 minutes
  
  if (!rateLimitResult.allowed) {
    return res.status(429).json({ error: rateLimitResult.error })
  }

  const { orderId } = req.body

  if (!orderId) {
    return res.status(400).json({ error: 'Order ID erforderlich' })
  }

  try {
    const auth = Buffer.from(
      `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`
    ).toString('base64')

    // Capture payment
    const response = await fetch(
      `${process.env.PAYPAL_API_URL || 'https://api-m.sandbox.paypal.com'}/v2/checkout/orders/${orderId}/capture`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${auth}`,
        },
      }
    )

    const data = await response.json()

    if (!response.ok) {
      console.error('PayPal Capture Error:', data)
      return res.status(response.status).json({ 
        error: 'Fehler bei der Zahlungsabwicklung', 
        details: data 
      })
    }

    // Extract payment and course info
    const payment = data.purchase_units[0]
    const amount = payment.amount.value
    const currency = payment.amount.currency_code || 'EUR'
    const payerEmail = data.payer?.email_address
    const payerName = `${data.payer?.name?.given_name || ''} ${data.payer?.name?.surname || ''}`.trim()
    const customData = JSON.parse(payment.custom_id || '{}')
    const { courseId, courseName } = customData

    if (!courseId || !courseName) {
      console.error('Missing course info in custom_id:', customData)
      return res.status(400).json({ error: 'Kursinformationen fehlen' })
    }

    // Get or create user
    let user = await query('SELECT * FROM users WHERE email = $1', [payerEmail])
    let isNewUser = false
    let tempPassword = null

    if (user.rows.length === 0) {
      tempPassword = generateRandomPassword()
      const passwordHash = await bcrypt.hash(tempPassword, 12)
      
      const nameParts = payerName.split(' ')
      const firstName = nameParts[0] || ''
      const lastName = nameParts.slice(1).join(' ') || ''
      
      const newUser = await query(
        `INSERT INTO users (first_name, last_name, email, password_hash, paypal_email, created_at, updated_at) 
         VALUES ($1, $2, $3, $4, $5, NOW(), NOW()) 
         RETURNING id, email, first_name, last_name`,
        [firstName, lastName, payerEmail, passwordHash, payerEmail]
      )
      user = { rows: [newUser.rows[0]] }
      isNewUser = true
    }

    const userId = user.rows[0].id

    // Record purchase
    const purchase = await query(`
      INSERT INTO purchases (user_id, course_id, amount, paypal_payment_id, status, created_at)
      VALUES ($1, $2, $3, $4, 'completed', NOW())
      RETURNING id
    `, [userId, courseId, amount, orderId])

    // Create enrollment
    const enrollment = await query(`
      INSERT INTO enrollments (user_id, course_id, paypal_payment_id, enrolled_at, is_active)
      VALUES ($1, $2, $3, NOW(), true)
      ON CONFLICT (user_id, course_id) 
      DO UPDATE SET is_active = true, paypal_payment_id = $3
      RETURNING id
    `, [userId, courseId, orderId])

    // Send welcome email
    if (isNewUser) {
      const loginUrl = `${process.env.NEXT_PUBLIC_APP_URL}/login`
      const html = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #111827; color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .button { display: inline-block; background: #111827; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
            .credentials { background: white; padding: 20px; border-left: 4px solid #111827; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Willkommen ${payerName}! 🎉</h1>
              <p>Dein Zugang ist bereit</p>
            </div>
            
            <div class="content">
              <p>Vielen Dank für deinen Kauf von <strong>${courseName}</strong>!</p>
              
              <p>Dein Account wurde automatisch erstellt. Hier sind deine Login-Daten:</p>
              
              <div class="credentials">
                <p><strong>E-Mail:</strong> ${payerEmail}</p>
                <p><strong>Temporäres Passwort:</strong> ${tempPassword}</p>
              </div>
              
              <p><strong>Wichtig:</strong> Bitte ändere dein Passwort nach dem ersten Login!</p>
              
              <div style="text-align: center;">
                <a href="${loginUrl}" class="button">
                  Jetzt anmelden
                </a>
              </div>
              
              <p>Nach dem Login findest du deine Inhalte im Dashboard.</p>
              
              <p>Bei Fragen stehen wir dir gerne zur Verfügung.</p>
              
              <p>Viel Erfolg!<br>Dein Team von Einfach bewusster leben</p>
            </div>
          </div>
        </body>
        </html>
      `

      const text = `
Willkommen ${payerName}!

Vielen Dank für deinen Kauf von ${courseName}!

Dein Account wurde automatisch erstellt:
E-Mail: ${payerEmail}
Temporäres Passwort: ${tempPassword}

Bitte ändere dein Passwort nach dem ersten Login!

Login: ${loginUrl}

Viel Erfolg!
Dein Team von Einfach bewusster leben
      `

      await sendEmail(payerEmail, `Dein Zugang zu ${courseName} ist bereit!`, html, text)
    } else {
      // Existing user - send course access email
      const dashboardUrl = `${process.env.NEXT_PUBLIC_APP_URL}/member/dashboard`
      const html = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #111827; color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .button { display: inline-block; background: #111827; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Neuer Kurs verfügbar! 🎉</h1>
            </div>
            
            <div class="content">
              <p>Hallo ${payerName},</p>
              
              <p>Vielen Dank für deinen Kauf von <strong>${courseName}</strong>!</p>
              
              <p>Der Kurs wurde deinem Account hinzugefügt und steht dir ab sofort zur Verfügung.</p>
              
              <div style="text-align: center;">
                <a href="${dashboardUrl}" class="button">
                  Zum Dashboard
                </a>
              </div>
              
              <p>Viel Erfolg!<br>Dein Team von Einfach bewusster leben</p>
            </div>
          </div>
        </body>
        </html>
      `

      const text = `
Hallo ${payerName},

Vielen Dank für deinen Kauf von ${courseName}!

Der Kurs wurde deinem Account hinzugefügt und steht dir ab sofort zur Verfügung.

Dashboard: ${dashboardUrl}

Viel Erfolg!
Dein Team von Einfach bewusster leben
      `

      await sendEmail(payerEmail, `Neuer Kurs verfügbar: ${courseName}`, html, text)
    }

    return res.status(200).json({ 
      success: true,
      orderId: data.id,
      status: data.status,
      isNewUser,
      userId,
      enrollmentId: enrollment.rows[0].id
    })

  } catch (error) {
    console.error('PayPal Capture Error:', error)
    return res.status(500).json({ 
      error: 'Fehler bei der Zahlungsabwicklung' 
    })
  }
}
