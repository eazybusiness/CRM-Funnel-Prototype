const SibApiV3Sdk = require('sib-api-v3-sdk')

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { firstName, lastName, email, consent, dataProtection } = req.body

  if (!firstName || !lastName || !email || !consent || !dataProtection) {
    return res.status(400).json({ error: 'Alle Pflichtfelder müssen ausgefüllt werden.' })
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Bitte gib eine gültige E-Mail-Adresse ein.' })
  }

  try {
    const defaultClient = SibApiV3Sdk.ApiClient.instance
    const apiKey = defaultClient.authentications['api-key']
    apiKey.apiKey = process.env.BREVO_API_KEY

    const contactsApi = new SibApiV3Sdk.ContactsApi()
    const downloadLink = `${process.env.NEXT_PUBLIC_BASE_URL || 'https://crm-funnel-prototype.vercel.app'}/downloads/stoffwechsel-freebie.pdf`

    try {
      const existingContact = await contactsApi.getContactInfo(email)

      if (existingContact && existingContact.email === email) {
        console.log('Existierender Kontakt (Stoffwechsel):', email, '- Sende PDF direkt')

        const freebieApiInstance = new SibApiV3Sdk.TransactionalEmailsApi()
        const freebieEmail = new SibApiV3Sdk.SendSmtpEmail()

        freebieEmail.subject = 'Dein kostenloser Stoffwechsel-Guide ist da!'
        freebieEmail.sender = { name: 'Stefanie Din\u00e7er', email: 'gerd_meyer@tutavi.com' }
        freebieEmail.to = [{ email: email, name: `${firstName} ${lastName}`.trim() || 'Freund' }]
        freebieEmail.htmlContent = `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="margin:0;padding:0;font-family:Arial,sans-serif;background:#f9fafb;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9fafb;padding:40px 20px;">
              <tr><td align="center">
                <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border:1px solid #e5e7eb;border-radius:8px;">
                  <tr><td style="padding:48px 40px 32px 40px;">
                    <p style="color:#1f2937;font-size:18px;margin:0 0 24px 0;">Hallo ${firstName},</p>
                    <p style="color:#4b5563;font-size:15px;line-height:1.7;margin:0 0 24px 0;">
                      sch\u00f6n, dich wiederzusehen! Da du bereits in unserer Community bist, erh\u00e4ltst du deinen kostenlosen Stoffwechsel-Guide sofort.
                    </p>
                    <table cellpadding="0" cellspacing="0">
                      <tr><td>
                        <a href="${downloadLink}" style="display:inline-block;background:#1f2937;color:#ffffff;text-decoration:none;padding:14px 32px;border-radius:6px;font-size:15px;">
                          Guide herunterladen
                        </a>
                      </td></tr>
                    </table>
                    <p style="color:#6b7280;font-size:13px;line-height:1.6;margin:32px 0 0 0;">
                      Falls der Button nicht funktioniert:<br>
                      <a href="${downloadLink}" style="color:#4b5563;">${downloadLink}</a>
                    </p>
                  </td></tr>
                  <tr><td style="padding:24px 40px;border-top:1px solid #f3f4f6;">
                    <p style="color:#9ca3af;font-size:12px;margin:0;">
                      Herzliche Gr\u00fc\u00dfe<br>Stefanie Din\u00e7er
                    </p>
                  </td></tr>
                </table>
              </td></tr>
            </table>
          </body>
          </html>
        `
        freebieEmail.textContent = `Hallo ${firstName},\n\nsch\u00f6n, dich wiederzusehen! Hier ist dein Stoffwechsel-Guide:\n\n${downloadLink}\n\nHerzliche Gr\u00fc\u00dfe\nStefanie Din\u00e7er`

        await freebieApiInstance.sendTransacEmail(freebieEmail)

        return res.status(200).json({
          success: true,
          message: 'Dein Guide wurde an deine bekannte E-Mail-Adresse gesendet.',
          existingUser: true
        })
      }
    } catch (contactError) {
      console.log('Neuer Kontakt (Stoffwechsel):', email)
    }

    // Double-Opt-In für neue Nutzer
    const confirmationToken = Buffer.from(`${email}:${firstName}:${lastName}:${Date.now()}`).toString('base64')
    const confirmationUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'https://crm-funnel-prototype.vercel.app'}/api/confirm?token=${confirmationToken}&source=stoffwechsel`

    const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi()
    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail()

    sendSmtpEmail.subject = 'Bitte best\u00e4tige deine E-Mail-Adresse'
    sendSmtpEmail.sender = { name: 'Stefanie Din\u00e7er', email: 'gerd_meyer@tutavi.com' }
    sendSmtpEmail.to = [{ email: email, name: `${firstName} ${lastName}`.trim() }]
    sendSmtpEmail.htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="margin:0;padding:0;font-family:Arial,sans-serif;background:#f3f4f6;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background:#f3f4f6;padding:40px 20px;">
          <tr><td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;box-shadow:0 2px 4px rgba(0,0,0,0.1);">
              <tr><td style="padding:40px 40px 20px 40px;">
                <h1 style="color:#1f2937;margin:0 0 20px 0;font-size:24px;font-weight:400;">
                  Willkommen, ${firstName}!
                </h1>
                <p style="color:#4b5563;font-size:16px;line-height:1.6;margin:0 0 20px 0;">
                  Vielen Dank f\u00fcr dein Interesse am Stoffwechsel-Guide! Um deinen kostenlosen Guide zu erhalten, best\u00e4tige bitte deine E-Mail-Adresse.
                </p>
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr><td align="center" style="padding:20px 0;">
                    <a href="${confirmationUrl}"
                       style="background:#1f2937;color:#ffffff;text-decoration:none;padding:16px 40px;border-radius:8px;font-size:16px;display:inline-block;">
                      E-Mail-Adresse best\u00e4tigen
                    </a>
                  </td></tr>
                </table>
                <p style="color:#6b7280;font-size:14px;line-height:1.6;margin:20px 0 0 0;">
                  Falls der Button nicht funktioniert, kopiere bitte diesen Link:<br>
                  <span style="color:#3b82f6;font-size:12px;word-break:break-all;">${confirmationUrl}</span>
                </p>
              </td></tr>
              <tr><td style="padding:24px 40px;background:#f9fafb;border-radius:0 0 8px 8px;">
                <p style="color:#6b7280;font-size:12px;line-height:1.6;margin:0;text-align:center;">
                  Diese E-Mail wurde gesendet, weil du dich auf unserer Website angemeldet hast.<br>
                  Falls du dich nicht angemeldet hast, kannst du diese E-Mail ignorieren.
                </p>
              </td></tr>
            </table>
          </td></tr>
        </table>
      </body>
      </html>
    `
    sendSmtpEmail.textContent = `Willkommen, ${firstName}!\n\nBitte best\u00e4tige deine E-Mail-Adresse:\n${confirmationUrl}\n\nFalls du dich nicht angemeldet hast, ignoriere diese E-Mail.`

    await apiInstance.sendTransacEmail(sendSmtpEmail)
    console.log('Double Opt-In (Stoffwechsel) gesendet an:', email)

    return res.status(200).json({
      success: true,
      message: 'Best\u00e4tigungs-E-Mail wurde gesendet.'
    })

  } catch (error) {
    console.error('Fehler subscribe-stoffwechsel:', error)
    return res.status(500).json({
      error: 'Ein Fehler ist aufgetreten. Bitte versuche es sp\u00e4ter erneut.',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    })
  }
}
