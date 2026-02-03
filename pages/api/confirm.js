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

    // 2. Brevo automation will send the welcome email with download link
    // No need to send email from here - Brevo handles it automatically
    console.log('Kontakt bestätigt - Brevo Automation wird Willkommens-E-Mail senden:', email)

    // Interne Benachrichtigung an die Website-Inhaberin bei neuer bestätigter Anmeldung
    try {
      const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi()
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
              📧 Du erhältst in Kürze eine E-Mail mit dem Download-Link.
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
