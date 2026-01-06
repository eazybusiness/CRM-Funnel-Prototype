import { sql } from '@vercel/postgres';
import { getUserByEmail, createUser, generateRandomPassword, grantContentAccess } from '../../../lib/auth';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { orderId, productSlug, productName, leadEmail, leadName } = req.body

  if (!orderId) {
    return res.status(400).json({ error: 'Order ID erforderlich' })
  }

  try {
    const auth = Buffer.from(
      `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`
    ).toString('base64')

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

    const payerEmail = data.payer?.email_address || leadEmail;
    const payerName = data.payer?.name?.given_name + ' ' + data.payer?.name?.surname || leadName;
    const amount = data.purchase_units[0]?.amount?.value;
    const currency = data.purchase_units[0]?.amount?.currency_code || 'EUR';

    let user = await getUserByEmail(payerEmail);
    let isNewUser = false;
    let tempPassword = null;

    if (!user) {
      tempPassword = generateRandomPassword();
      user = await createUser(payerEmail, tempPassword, payerName);
      isNewUser = true;
    }

    const purchase = await sql`
      INSERT INTO purchases (user_id, paypal_order_id, paypal_payer_id, product_name, product_type, amount, currency, status, completed_at)
      VALUES (${user.id}, ${orderId}, ${data.payer?.payer_id}, ${productName}, 'course', ${amount}, ${currency}, 'completed', NOW())
      RETURNING *
    `;

    if (productSlug) {
      await grantContentAccess(user.id, productSlug, purchase.rows[0].id);
    }

    if (isNewUser) {
      await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: payerEmail,
        subject: `Dein Zugang zu ${productName} ist bereit!`,
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
              .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
              .button { display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
              .credentials { background: white; padding: 20px; border-left: 4px solid #667eea; margin: 20px 0; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>Willkommen ${payerName}! 🎉</h1>
                <p>Dein Zugang ist bereit</p>
              </div>
              
              <div class="content">
                <p>Vielen Dank für deinen Kauf von <strong>${productName}</strong>!</p>
                
                <p>Dein Account wurde automatisch erstellt. Hier sind deine Login-Daten:</p>
                
                <div class="credentials">
                  <p><strong>E-Mail:</strong> ${payerEmail}</p>
                  <p><strong>Temporäres Passwort:</strong> ${tempPassword}</p>
                </div>
                
                <p><strong>Wichtig:</strong> Bitte ändere dein Passwort nach dem ersten Login!</p>
                
                <div style="text-align: center;">
                  <a href="${process.env.NEXT_PUBLIC_APP_URL}/login" class="button">
                    Jetzt anmelden
                  </a>
                </div>
                
                <p>Nach dem Login findest du deine Inhalte im Dashboard.</p>
                
                <p>Bei Fragen stehen wir dir gerne zur Verfügung.</p>
                
                <p>Viel Erfolg!<br>Dein Team</p>
              </div>
            </div>
          </body>
          </html>
        `,
        text: `
Willkommen ${payerName}!

Vielen Dank für deinen Kauf von ${productName}!

Dein Account wurde automatisch erstellt:
E-Mail: ${payerEmail}
Temporäres Passwort: ${tempPassword}

Bitte ändere dein Passwort nach dem ersten Login!

Login: ${process.env.NEXT_PUBLIC_APP_URL}/login

Viel Erfolg!
Dein Team
        `
      });
    } else {
      await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: payerEmail,
        subject: `Neuer Inhalt verfügbar: ${productName}`,
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
              .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
              .button { display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>Neuer Inhalt verfügbar! 🎉</h1>
              </div>
              
              <div class="content">
                <p>Hallo ${payerName},</p>
                
                <p>Vielen Dank für deinen Kauf von <strong>${productName}</strong>!</p>
                
                <p>Der Inhalt wurde deinem Account hinzugefügt und steht dir ab sofort zur Verfügung.</p>
                
                <div style="text-align: center;">
                  <a href="${process.env.NEXT_PUBLIC_APP_URL}/member/dashboard" class="button">
                    Zum Dashboard
                  </a>
                </div>
                
                <p>Viel Erfolg!<br>Dein Team</p>
              </div>
            </div>
          </body>
          </html>
        `,
        text: `
Hallo ${payerName},

Vielen Dank für deinen Kauf von ${productName}!

Der Inhalt wurde deinem Account hinzugefügt und steht dir ab sofort zur Verfügung.

Dashboard: ${process.env.NEXT_PUBLIC_APP_URL}/member/dashboard

Viel Erfolg!
Dein Team
        `
      });
    }

    return res.status(200).json({ 
      success: true,
      orderId: data.id,
      status: data.status,
      isNewUser,
      userId: user.id
    })

  } catch (error) {
    console.error('PayPal Capture Error:', error)
    return res.status(500).json({ 
      error: 'Fehler bei der Zahlungsabwicklung' 
    })
  }
}
