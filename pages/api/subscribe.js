const SibApiV3Sdk = require('sib-api-v3-sdk')

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { firstName, email, source, consent, dataProtection } = req.body

  if (!firstName || !email || !consent || !dataProtection) {
    return res.status(400).json({ error: 'Alle Pflichtfelder müssen ausgefüllt werden.' })
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Bitte gib eine gültige E-Mail-Adresse ein.' })
  }

  try {
    // Brevo API konfigurieren
    const defaultClient = SibApiV3Sdk.ApiClient.instance
    const apiKey = defaultClient.authentications['api-key']
    apiKey.apiKey = process.env.BREVO_API_KEY

    // Prüfen ob E-Mail bereits existiert
    const contactsApi = new SibApiV3Sdk.ContactsApi()
    
    try {
      // Suche nach existierendem Kontakt
      const existingContacts = await contactsApi.getContactInfo(email)
      
      // Wenn Kontakt existiert, sende Freebie direkt (OHNE erneute Registrierung in Brevo)
      if (existingContacts && existingContacts.email === email) {
        console.log('Existierender Kontakt gefunden:', email, '- Sende Freebie direkt (ohne Brevo-Update)')
        
        // Freebie direkt senden (ohne Double-Opt-In und ohne Brevo-Update)
        const freebieApiInstance = new SibApiV3Sdk.TransactionalEmailsApi()
        const freebieEmail = new SibApiV3Sdk.SendSmtpEmail()
        
        const downloadLink = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/downloads/freebie.pdf`
        
        freebieEmail.subject = 'Dein kostenloser Guide ist da!'
        freebieEmail.sender = { name: 'Einfach Leichter', email: 'gerd_meyer@tutavi.com' }
        freebieEmail.to = [{ email: email, name: firstName || 'Freund' }]
        freebieEmail.htmlContent = `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Dein kostenloser Guide</title>
          </head>
          <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f3f4f6;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f3f4f6; padding: 40px 20px;">
              <tr>
                <td align="center">
                  <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                    <tr>
                      <td style="padding: 40px 40px 20px 40px; text-align: center;">
                        <h1 style="color: #1f2937; margin: 0 0 20px 0; font-size: 28px;">
                          Willkommen zurück, ${firstName || 'Freund'}! 🎉
                        </h1>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 0 40px 30px 40px;">
                        <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                          Schön, dich wiederzusehen! Da du bereits in unserer Community bist, 
                          erhältst du deinen kostenlosen Guide sofort.
                        </p>
                        <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 0 0 30px 0;">
                          Hier ist dein Download-Link:
                        </p>
                        <table width="100%" cellpadding="0" cellspacing="0">
                          <tr>
                            <td align="center" style="padding: 20px 0;">
                              <a href="${downloadLink}" 
                                 style="background: #1f2937; 
                                        color: #ffffff; 
                                        text-decoration: none; 
                                        padding: 16px 40px; 
                                        border-radius: 8px; 
                                        font-weight: bold; 
                                        font-size: 16px;
                                        display: inline-block;
                                        transition: background 0.2s;">
                                Guide jetzt herunterladen
                              </a>
                            </td>
                          </tr>
                        </table>
                        <p style="color: #6b7280; font-size: 14px; line-height: 1.6; margin: 30px 0 0 0;">
                          Falls der Button nicht funktioniert, kopiere bitte diesen Link in deinen Browser:
                        </p>
                        <p style="color: #3b82f6; font-size: 12px; word-break: break-all; margin: 10px 0 0 0;">
                          ${downloadLink}
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 30px 40px; background-color: #f9fafb; border-radius: 0 0 8px 8px;">
                        <p style="color: #6b7280; font-size: 12px; line-height: 1.6; margin: 0; text-align: center;">
                          Du erhältst diese E-Mail weil du nach dem Freebie gefragt hast.<br>
                          Schön, dass du Teil unserer Community bist!
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </body>
          </html>
        `
        freebieEmail.textContent = `
Willkommen zurück, ${firstName || 'Freund'}!

Schön, dich wiederzusehen! Da du bereits in unserer Community bist, erhältst du deinen kostenlosen Guide sofort.

Hier ist dein Download-Link: ${downloadLink}

Falls der Link nicht funktioniert, kopiere ihn bitte in deinen Browser.

Schön, dass du Teil unserer Community bist!
        `
        
        await freebieApiInstance.sendTransacEmail(freebieEmail)
        
        return res.status(200).json({ 
          success: true, 
          message: 'Dein Guide wurde an deine bekannte E-Mail-Adresse gesendet.',
          existingUser: true
        })
      }
    } catch (contactError) {
      // Kontakt existiert nicht - normaler Double-Opt-In Prozess
      console.log('Neuer Kontakt:', email)
    }

    // Normaler Double-Opt-In für neue Nutzer
    const confirmationToken = Buffer.from(`${email}:${firstName}:${Date.now()}`).toString('base64')
    const confirmationUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/confirm?token=${confirmationToken}`

    // 1. Speichere Vorname temporär (wird nach Bestätigung verwendet)
    // Kontakt wird NICHT sofort angelegt - erst nach E-Mail-Bestätigung!
    console.log('Double Opt-In initiiert für:', email, 'Name:', firstName)

    // 2. Transaktions-E-Mail senden
    const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi()

    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail()
    
    sendSmtpEmail.subject = 'Bitte bestätige deine E-Mail-Adresse'
    sendSmtpEmail.sender = { name: 'Tutavi Coaching', email: 'gerd_meyer@tutavi.com' }
    sendSmtpEmail.to = [{ email: email, name: firstName }]
    sendSmtpEmail.htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>E-Mail Bestätigung</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f3f4f6;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f3f4f6; padding: 40px 20px;">
            <tr>
              <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                  <tr>
                    <td style="padding: 40px 40px 20px 40px; text-align: center;">
                      <h1 style="color: #1f2937; margin: 0 0 20px 0; font-size: 28px;">
                        Willkommen, ${firstName}! 🌱
                      </h1>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 0 40px 30px 40px;">
                      <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                        Vielen Dank für dein Interesse! Um dein kostenloses Freebie zu erhalten, 
                        bestätige bitte deine E-Mail-Adresse.
                      </p>
                      <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 0 0 30px 0;">
                        Klicke einfach auf den Button unten:
                      </p>
                      <table width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td align="center" style="padding: 20px 0;">
                            <a href="${confirmationUrl}" 
                               style="background: #1f2937; 
                                      color: #ffffff; 
                                      text-decoration: none; 
                                      padding: 16px 40px; 
                                      border-radius: 8px; 
                                      font-weight: bold; 
                                      font-size: 16px;
                                      display: inline-block;
                                      transition: background 0.2s;">
                              E-Mail-Adresse bestätigen
                            </a>
                          </td>
                        </tr>
                      </table>
                      <p style="color: #6b7280; font-size: 14px; line-height: 1.6; margin: 30px 0 0 0;">
                        Falls der Button nicht funktioniert, kopiere bitte diesen Link in deinen Browser:
                      </p>
                      <p style="color: #3b82f6; font-size: 12px; word-break: break-all; margin: 10px 0 0 0;">
                        ${confirmationUrl}
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 30px 40px; background-color: #f9fafb; border-radius: 0 0 8px 8px;">
                      <p style="color: #6b7280; font-size: 12px; line-height: 1.6; margin: 0; text-align: center;">
                        Diese E-Mail wurde gesendet, weil du dich auf unserer Website angemeldet hast.<br>
                        Falls du dich nicht angemeldet hast, kannst du diese E-Mail ignorieren.
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `
    sendSmtpEmail.textContent = `
Willkommen, ${firstName}!

Vielen Dank für dein Interesse! Um deinen kostenlosen Guide zu erhalten, bestätige bitte deine E-Mail-Adresse.

Klicke auf diesen Link: ${confirmationUrl}

Falls du dich nicht angemeldet hast, kannst du diese E-Mail ignorieren.
      `

    const emailResult = await apiInstance.sendTransacEmail(sendSmtpEmail)

    console.log('Double Opt-In E-Mail via Brevo gesendet an:', email)
    console.log('Brevo Response:', JSON.stringify(emailResult))

    return res.status(200).json({ 
      success: true, 
      message: 'Bestätigungs-E-Mail wurde gesendet.' 
    })

  } catch (error) {
    console.error('Fehler beim Versenden der E-Mail:', error)
    console.error('Error Details:', error.response?.body || error.message)
    
    return res.status(500).json({ 
      error: 'Ein Fehler ist aufgetreten. Bitte versuche es später erneut.',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    })
  }
}
