import { getUserByEmail, generateResetToken, saveResetToken } from '../../../lib/auth';
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
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const user = await getUserByEmail(email.toLowerCase().trim());

    if (user) {
      const resetToken = generateResetToken();
      await saveResetToken(email, resetToken);

      const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${resetToken}`;

      await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: email,
        subject: 'Passwort zurücksetzen',
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .button { display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
            </style>
          </head>
          <body>
            <div class="container">
              <h2>Passwort zurücksetzen</h2>
              <p>Hallo,</p>
              <p>du hast eine Passwort-Zurücksetzung angefordert.</p>
              <p>Klicke auf den folgenden Link, um dein Passwort zurückzusetzen (gültig für 1 Stunde):</p>
              <a href="${resetUrl}" class="button">Passwort zurücksetzen</a>
              <p>Oder kopiere diesen Link in deinen Browser:</p>
              <p>${resetUrl}</p>
              <p>Falls du diese Anfrage nicht gestellt hast, ignoriere diese E-Mail.</p>
              <p>Beste Grüße,<br>Dein Team</p>
            </div>
          </body>
          </html>
        `,
        text: `
Passwort zurücksetzen

Hallo,

du hast eine Passwort-Zurücksetzung angefordert.

Klicke auf den folgenden Link, um dein Passwort zurückzusetzen (gültig für 1 Stunde):
${resetUrl}

Falls du diese Anfrage nicht gestellt hast, ignoriere diese E-Mail.

Beste Grüße,
Dein Team
        `
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Falls ein Account mit dieser E-Mail existiert, wurde eine Reset-E-Mail versendet.'
    });

  } catch (error) {
    console.error('Password reset request error:', error);
    return res.status(500).json({ error: 'Failed to process request' });
  }
}
