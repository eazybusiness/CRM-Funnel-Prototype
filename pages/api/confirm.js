const SibApiV3Sdk = require('sib-api-v3-sdk')

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { token } = req.query

  if (!token) {
    return res.status(400).send('Ungültiger Bestätigungslink.')
  }

  try {
    const decoded = Buffer.from(token, 'base64').toString('utf-8')
    const parts = decoded.split(":")
    const email = parts[0]
    const firstName = parts.length >= 3 ? parts[1] : "Freund"
    const timestamp = parts.length >= 3 ? parts[2] : parts[1]

    const tokenAge = Date.now() - parseInt(timestamp)
    const maxAge = 24 * 60 * 60 * 1000 // 24 Stunden

    if (tokenAge > maxAge) {
      return res.status(400).send(`
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Link abgelaufen</title>
          <style>
            body { font-family: Arial, sans-serif; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%); }
            .container { background: white; padding: 40px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); text-align: center; max-width: 500px; }
            h1 { color: #dc2626; margin-bottom: 20px; }
            p { color: #4b5563; line-height: 1.6; }
            a { color: #3b82f6; text-decoration: none; font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>⏰ Link abgelaufen</h1>
            <p>Dieser Bestätigungslink ist leider abgelaufen. Bitte melde dich erneut an.</p>
            <p><a href="/freebie">Zurück zur Anmeldung</a></p>
          </div>
        </body>
        </html>
      `)
    }

    // Brevo API konfigurieren
    const defaultClient = SibApiV3Sdk.ApiClient.instance
    const apiKey = defaultClient.authentications['api-key']
    apiKey.apiKey = process.env.BREVO_API_KEY

    // 1. Kontakt in Brevo als bestätigt markieren und anlegen
    const contactsApi = new SibApiV3Sdk.ContactsApi()
    const createContact = new SibApiV3Sdk.CreateContact()
    
    createContact.email = email
    createContact.attributes = {
      FIRSTNAME: firstName,
      DOUBLE_OPT_IN: true, // Jetzt bestätigt!
      OPT_IN_DATE: new Date().toISOString()
    }
    createContact.listIds = [2] // Füge zu Liste hinzu
    createContact.updateEnabled = true

    try {
      await contactsApi.createContact(createContact)
      console.log('Kontakt in Brevo bestätigt und angelegt:', email)
    } catch (contactError) {
      // Kontakt existiert bereits - aktualisiere ihn
      try {
        const updateContact = new SibApiV3Sdk.UpdateContact()
        updateContact.attributes = {
          FIRSTNAME: firstName,
          DOUBLE_OPT_IN: true,
          OPT_IN_DATE: new Date().toISOString()
        }
        updateContact.listIds = [2]
        await contactsApi.updateContact(email, updateContact)
        console.log('Bestehender Kontakt aktualisiert:', email)
      } catch (updateError) {
        console.error('Fehler beim Aktualisieren:', updateError.message)
      }
    }

    // 2. Willkommens-E-Mail mit Download-Link senden
    const downloadLink = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/downloads/freebie.pdf`

    const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi()
    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail()
    
    sendSmtpEmail.subject = '🎉 Dein Freebie ist bereit zum Download!'
    sendSmtpEmail.sender = { name: 'Einfach Leichter', email: 'gerd_meyer@tutavi.com' }
    sendSmtpEmail.to = [{ email: email }]
    sendSmtpEmail.htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Willkommen!</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f3f4f6;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f3f4f6; padding: 40px 20px;">
            <tr>
              <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                  <tr>
                    <td style="padding: 40px 40px 20px 40px; text-align: center;">
                      <h1 style="color: #1f2937; margin: 0 0 20px 0; font-size: 28px;">
                        Willkommen in unserer Community! 🌱
                      </h1>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 0 40px 30px 40px;">
                      <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                        Herzlich willkommen! Schön, dass du dabei bist. 
                      </p>
                      <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 0 0 30px 0;">
                        Dein kostenloses Freebie steht jetzt für dich bereit. Klicke einfach auf den Button unten, 
                        um es herunterzuladen:
                      </p>
                      <table width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td align="center" style="padding: 20px 0;">
                            <a href="${downloadLink}" 
                               style="background: linear-gradient(to right, #10b981, #3b82f6); 
                                      color: #ffffff; 
                                      text-decoration: none; 
                                      padding: 16px 40px; 
                                      border-radius: 8px; 
                                      font-weight: bold; 
                                      font-size: 16px;
                                      display: inline-block;">
                              Jetzt herunterladen
                            </a>
                          </td>
                        </tr>
                      </table>
                      <div style="background-color: #f0fdf4; border-left: 4px solid #10b981; padding: 20px; margin: 30px 0;">
                        <h3 style="color: #1f2937; margin: 0 0 10px 0; font-size: 18px;">
                          Was dich in Zukunft erwartet:
                        </h3>
                        <ul style="color: #4b5563; margin: 0; padding-left: 20px; line-height: 1.8;">
                          <li>Wertvolle Tipps für einen bewussten Lebensstil</li>
                          <li>Inspirierende Geschichten aus unserer Community</li>
                          <li>Exklusive Angebote und Einblicke</li>
                        </ul>
                      </div>
                      <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 30px 0 0 0;">
                        Ich freue mich darauf, dich auf deiner Reise zu mehr Bewusstsein und Minimalismus zu begleiten.
                      </p>
                      <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 10px 0 0 0;">
                        Herzliche Grüße<br>
                        <strong>[Dein Name]</strong>
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 30px 40px; background-color: #f9fafb; border-radius: 0 0 8px 8px;">
                      <p style="color: #6b7280; font-size: 12px; line-height: 1.6; margin: 0; text-align: center;">
                        Du erhältst diese E-Mail, weil du dich für unser Freebie angemeldet hast.<br>
                        <a href="[ABMELDE_LINK]" style="color: #3b82f6; text-decoration: none;">Abmelden</a> | 
                        <a href="/datenschutz" style="color: #3b82f6; text-decoration: none;">Datenschutz</a>
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
Willkommen in unserer Community!

Herzlich willkommen! Schön, dass du dabei bist.

Dein kostenloses Freebie steht jetzt für dich bereit. Lade es hier herunter: ${downloadLink}

Was dich in Zukunft erwartet:
- Wertvolle Tipps für einen bewussten Lebensstil
- Inspirierende Geschichten aus unserer Community
- Exklusive Angebote und Einblicke

Ich freue mich darauf, dich auf deiner Reise zu mehr Bewusstsein und Minimalismus zu begleiten.

Herzliche Grüße
Gerd Meyer
Tutavi Coaching
      `

    await apiInstance.sendTransacEmail(sendSmtpEmail)

    console.log('Willkommens-E-Mail mit Download-Link gesendet an:', email)

    // Interne Benachrichtigung an die Website-Inhaberin bei neuer bestätigter Anmeldung
    try {
      const internalEmail = new SibApiV3Sdk.SendSmtpEmail()
      internalEmail.subject = 'Neuer bestätigter Kontakt über die Funnel-Seite'
      internalEmail.sender = { name: 'CRM Funnel System', email: 'noreply@einfachbewussterleben.de' }
      internalEmail.to = [{ email: 'mail.s.muench@googlemail.com' }]
      internalEmail.htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Neuer Kontakt</title>
        </head>
        <body style="font-family: Arial, sans-serif; color: #111827; background-color: #f9fafb; padding: 24px;">
          <h1 style="font-size: 20px; font-weight: normal; margin-bottom: 16px;">Neuer bestätigter Kontakt</h1>
          <p style="margin: 0 0 8px 0;">Es hat sich soeben jemand über deine Funnel-Seite angemeldet.</p>
          <p style="margin: 0 0 4px 0;"><strong>E-Mail:</strong> ${email}</p>
          <p style="margin: 0 0 16px 0;"><strong>Vorname (falls bekannt):</strong> ${firstName || 'nicht angegeben'}</p>
          <p style="font-size: 12px; color: #6b7280; margin-top: 24px;">Diese Nachricht wurde automatisch vom CRM Funnel System gesendet.</p>
        </body>
        </html>
      `
      internalEmail.textContent = `
Neuer bestätigter Kontakt über die Funnel-Seite

E-Mail: ${email}
Vorname (falls bekannt): ${firstName || 'nicht angegeben'}

Diese Nachricht wurde automatisch vom CRM Funnel System gesendet.
      `

      await apiInstance.sendTransacEmail(internalEmail)

      console.log('Interne Benachrichtigungs-E-Mail an mail.s.muench@googlemail.com gesendet')
    } catch (internalError) {
      console.error('Fehler beim Senden der internen Benachrichtigung:', internalError)
    }

    return res.status(200).send(`
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>E-Mail bestätigt!</title>
        <style>
          body { 
            font-family: Arial, sans-serif; 
            display: flex; 
            justify-content: center; 
            align-items: center; 
            min-height: 100vh; 
            margin: 0; 
            background: linear-gradient(135deg, #f0fdf4 0%, #dbeafe 100%); 
          }
          .container { 
            background: white; 
            padding: 60px 40px; 
            border-radius: 16px; 
            box-shadow: 0 10px 25px rgba(0,0,0,0.1); 
            text-align: center; 
            max-width: 600px; 
          }
          .icon { 
            width: 80px; 
            height: 80px; 
            background: linear-gradient(135deg, #10b981, #3b82f6); 
            border-radius: 50%; 
            display: flex; 
            align-items: center; 
            justify-content: center; 
            margin: 0 auto 30px; 
            font-size: 40px; 
          }
          h1 { 
            color: #1f2937; 
            margin-bottom: 20px; 
            font-size: 32px; 
          }
          p { 
            color: #4b5563; 
            line-height: 1.8; 
            font-size: 18px; 
            margin-bottom: 30px; 
          }
          .success-box {
            background: #f0fdf4;
            border: 2px solid #10b981;
            border-radius: 8px;
            padding: 20px;
            margin: 30px 0;
          }
          a { 
            display: inline-block;
            background: linear-gradient(to right, #10b981, #3b82f6); 
            color: white; 
            text-decoration: none; 
            padding: 16px 40px; 
            border-radius: 8px; 
            font-weight: bold; 
            font-size: 16px;
            transition: transform 0.2s;
          }
          a:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4);
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="icon">✓</div>
          <h1>E-Mail erfolgreich bestätigt! 🎉</h1>
          <p>
            Vielen Dank für deine Bestätigung! 
          </p>
          <div class="success-box">
            <p style="margin: 0; font-weight: bold; color: #10b981;">
              📧 Wir haben dir soeben eine E-Mail mit dem Download-Link gesendet.
            </p>
          </div>
          <p>
            Überprüfe dein E-Mail-Postfach und lade dein Freebie herunter. 
            Falls du keine E-Mail siehst, schau bitte auch in deinem Spam-Ordner nach.
          </p>
          <a href="/">Zurück zur Startseite</a>
        </div>
      </body>
      </html>
    `)

  } catch (error) {
    console.error('Fehler bei der E-Mail-Bestätigung:', error)
    return res.status(500).send(`
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Fehler</title>
        <style>
          body { font-family: Arial, sans-serif; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%); }
          .container { background: white; padding: 40px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); text-align: center; max-width: 500px; }
          h1 { color: #dc2626; margin-bottom: 20px; }
          p { color: #4b5563; line-height: 1.6; }
          a { color: #3b82f6; text-decoration: none; font-weight: bold; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>❌ Ein Fehler ist aufgetreten</h1>
          <p>Leider konnte deine E-Mail-Adresse nicht bestätigt werden. Bitte versuche es erneut oder kontaktiere uns.</p>
          <p><a href="/freebie">Zurück zur Anmeldung</a></p>
        </div>
      </body>
      </html>
    `)
  }
}
