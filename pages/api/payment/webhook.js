import bcrypt from 'bcryptjs'
import { query } from '../../../lib/db'

export const config = {
  api: {
    bodyParser: false,
  },
}

function generateRandomPassword(length = 12) {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*'
  let password = ''
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return password
}

async function sendEmail(to, subject, html, text) {
  try {
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
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

async function getPayPalAccessToken() {
  const auth = Buffer.from(
    `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`
  ).toString('base64')

  const response = await fetch(
    `${process.env.PAYPAL_API_URL || 'https://api-m.sandbox.paypal.com'}/v1/oauth2/token`,
    {
      method: 'POST',
      headers: {
        Authorization: `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'grant_type=client_credentials',
    }
  )

  if (!response.ok) {
    throw new Error('PayPal access token error')
  }

  const data = await response.json()
  return data.access_token
}

async function verifyWebhookSignature(headers, body) {
  if (!process.env.PAYPAL_WEBHOOK_ID) {
    console.warn('PAYPAL_WEBHOOK_ID not set - skipping webhook verification')
    return true
  }

  const accessToken = await getPayPalAccessToken()

  const verificationPayload = {
    auth_algo: headers['paypal-auth-algo'],
    cert_url: headers['paypal-cert-url'],
    transmission_id: headers['paypal-transmission-id'],
    transmission_sig: headers['paypal-transmission-sig'],
    transmission_time: headers['paypal-transmission-time'],
    webhook_id: process.env.PAYPAL_WEBHOOK_ID,
    webhook_event: body,
  }

  const response = await fetch(
    `${process.env.PAYPAL_API_URL || 'https://api-m.sandbox.paypal.com'}/v1/notifications/verify-webhook-signature`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(verificationPayload),
    }
  )

  const result = await response.json()
  return result.verification_status === 'SUCCESS'
}

async function fetchOrderDetails(orderId) {
  const accessToken = await getPayPalAccessToken()
  const response = await fetch(
    `${process.env.PAYPAL_API_URL || 'https://api-m.sandbox.paypal.com'}/v2/checkout/orders/${orderId}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  )

  if (!response.ok) {
    throw new Error('Unable to fetch PayPal order details')
  }

  return response.json()
}

async function handleOrderCompletion(order) {
  const payment = order.purchase_units?.[0]
  const amount = payment?.amount?.value
  const payerEmail = order.payer?.email_address
  const payerName = `${order.payer?.name?.given_name || ''} ${order.payer?.name?.surname || ''}`.trim()
  const customData = JSON.parse(payment?.custom_id || '{}')
  const { courseId, courseName } = customData

  if (!courseId || !courseName || !payerEmail) {
    throw new Error('Missing course or payer info in PayPal order')
  }

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

  await query(
    `INSERT INTO purchases (user_id, course_id, amount, paypal_payment_id, status, created_at)
     VALUES ($1, $2, $3, $4, 'completed', NOW())
     ON CONFLICT DO NOTHING`,
    [userId, courseId, amount, order.id]
  )

  await query(
    `INSERT INTO enrollments (user_id, course_id, paypal_payment_id, enrolled_at, is_active)
     VALUES ($1, $2, $3, NOW(), true)
     ON CONFLICT (user_id, course_id)
     DO UPDATE SET is_active = true, paypal_payment_id = $3`,
    [userId, courseId, order.id]
  )

  if (isNewUser) {
    const loginUrl = `${process.env.NEXT_PUBLIC_APP_URL}/login`
    const html = `
      <p>Willkommen ${payerName}!</p>
      <p>Dein Zugang zu <strong>${courseName}</strong> ist bereit.</p>
      <p><strong>E-Mail:</strong> ${payerEmail}</p>
      <p><strong>Temporäres Passwort:</strong> ${tempPassword}</p>
      <p><a href="${loginUrl}">Jetzt anmelden</a></p>
    `
    const text = `Willkommen ${payerName}!

Dein Zugang zu ${courseName} ist bereit.

E-Mail: ${payerEmail}
Temporäres Passwort: ${tempPassword}

Login: ${loginUrl}`
    await sendEmail(payerEmail, `Dein Zugang zu ${courseName} ist bereit!`, html, text)
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const buffers = []
  for await (const chunk of req) {
    buffers.push(chunk)
  }
  const rawBody = Buffer.concat(buffers).toString('utf8')
  const body = rawBody ? JSON.parse(rawBody) : {}

  const isValid = await verifyWebhookSignature(req.headers, body)
  if (!isValid) {
    return res.status(400).json({ error: 'Invalid webhook signature' })
  }

  try {
    const eventType = body.event_type

    if (eventType === 'CHECKOUT.ORDER.APPROVED' || eventType === 'CHECKOUT.ORDER.COMPLETED') {
      await handleOrderCompletion(body.resource)
    }

    if (eventType === 'PAYMENT.CAPTURE.COMPLETED') {
      const orderId = body.resource?.supplementary_data?.related_ids?.order_id
      if (orderId) {
        const order = await fetchOrderDetails(orderId)
        await handleOrderCompletion(order)
      }
    }

    return res.status(200).json({ received: true })
  } catch (error) {
    console.error('PayPal webhook error:', error)
    return res.status(500).json({ error: 'Webhook processing failed' })
  }
}
