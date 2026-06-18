const SibApiV3Sdk = require('sib-api-v3-sdk')

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { token } = req.query

  if (!token) {
    return res.status(400).setHeader('Content-Type', 'text/html').send(`
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Ungültiger Link</title>
        <style>
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { font-family: Arial, sans-serif; display: flex; justify-content: center; align-items: center; min-height: 100vh; background: #f9fafb; }
          .container { background: white; padding: 60px 40px; border: 1px solid #e5e7eb; border-radius: 8px; text-align: center; max-width: 500px; width: 90%; }
          h1 { color: #1f2937; font-size: 22px; font-weight: 400; margin-bottom: 16px; }
          p { color: #6b7280; line-height: 1.7; font-size: 15px; margin-bottom: 24px; }
          a { display: inline-block; color: #1f2937; text-decoration: none; border-bottom: 1px solid #1f2937; padding-bottom: 1px; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Ungültiger Bestätigungslink</h1>
          <p>Dieser Bestätigungslink ist ungültig. Bitte melde dich erneut an.</p>
          <a href="/freebie">Zurück zur Anmeldung</a>
        </div>
      </body>
      </html>
    `)
  }

  try {
    const decoded = Buffer.from(token, 'base64').toString('utf-8')
    const parts = decoded.split(":")
    const email = parts[0]
    // Token format: email:firstName:lastName:timestamp (new) or email:firstName:timestamp (old)
    let firstName, lastName, timestamp
    if (parts.length >= 4) {
      firstName = parts[1]
      lastName = parts[2]
      timestamp = parts[3]
    } else if (parts.length >= 3) {
      firstName = parts[1]
      lastName = ''
      timestamp = parts[2]
    } else {
      firstName = 'Freund'
      lastName = ''
      timestamp = parts[1]
    }

    const tokenAge = Date.now() - parseInt(timestamp)
    const maxAge = 24 * 60 * 60 * 1000 // 24 Stunden

    if (tokenAge > maxAge) {
      return res.status(400).setHeader('Content-Type', 'text/html').send(`
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Link abgelaufen</title>
          <style>
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body { font-family: Arial, sans-serif; display: flex; justify-content: center; align-items: center; min-height: 100vh; background: #f9fafb; }
            .container { background: white; padding: 60px 40px; border: 1px solid #e5e7eb; border-radius: 8px; text-align: center; max-width: 500px; width: 90%; }
            h1 { color: #1f2937; font-size: 22px; font-weight: 400; margin-bottom: 16px; }
            p { color: #6b7280; line-height: 1.7; font-size: 15px; margin-bottom: 24px; }
            a { display: inline-block; color: #1f2937; text-decoration: none; border-bottom: 1px solid #1f2937; padding-bottom: 1px; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Bestätigungslink abgelaufen</h1>
            <p>Dieser Bestätigungslink ist leider abgelaufen. Bitte melde dich erneut an.</p>
            <a href="/freebie">Zurück zur Anmeldung</a>
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
      LASTNAME: lastName,
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
          LASTNAME: lastName,
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

    // 2. Freebie-Download-Mail direkt senden
    try {
      const freebieApi = new SibApiV3Sdk.TransactionalEmailsApi()
      const freebieEmail = new SibApiV3Sdk.SendSmtpEmail()
      const downloadLink = `${process.env.NEXT_PUBLIC_BASE_URL || 'https://crm-funnel-prototype.vercel.app'}/downloads/freebie.pdf`

      freebieEmail.subject = 'Dein kostenloser Guide ist da'
      freebieEmail.sender = { name: 'Stefanie Dinçer', email: 'noreply@einfachbewussterleben.de' }
      freebieEmail.to = [{ email: email, name: `${firstName} ${lastName}`.trim() }]
      freebieEmail.htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f9fafb;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9fafb; padding: 40px 20px;">
            <tr>
              <td align="center">
                <table width="560" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px;">
                  <tr>
                    <td style="padding: 48px 40px 32px 40px;">
                      <p style="color: #1f2937; font-size: 18px; margin: 0 0 24px 0;">Hallo ${firstName},</p>
                      <p style="color: #4b5563; font-size: 15px; line-height: 1.7; margin: 0 0 24px 0;">
                        vielen Dank für deine Bestätigung. Hier ist dein kostenloser Guide:
                      </p>
                      <table cellpadding="0" cellspacing="0">
                        <tr>
                          <td>
                            <a href="${downloadLink}" style="display: inline-block; background: #1f2937; color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 6px; font-size: 15px;">
                              Guide herunterladen
                            </a>
                          </td>
                        </tr>
                      </table>
                      <p style="color: #6b7280; font-size: 13px; line-height: 1.6; margin: 32px 0 0 0;">
                        Falls der Button nicht funktioniert, kopiere diesen Link in deinen Browser:<br>
                        <a href="${downloadLink}" style="color: #4b5563;">${downloadLink}</a>
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 24px 40px; border-top: 1px solid #f3f4f6;">
                      <p style="color: #9ca3af; font-size: 12px; margin: 0;">
                        Viele Grüße<br>Stefanie Dinçer<br>
                        <a href="{{unsubscribe}}" style="color: #9ca3af;">Abmelden</a>
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
      freebieEmail.textContent = `Hallo ${firstName},\n\nvielen Dank für deine Bestätigung. Hier ist dein Download-Link:\n\n${downloadLink}\n\nViele Grüße\nStefanie Dinçer`

      await freebieApi.sendTransacEmail(freebieEmail)
      console.log('Freebie-Download-Mail gesendet an:', email)
    } catch (freebieError) {
      console.error('Fehler beim Senden der Freebie-Mail:', freebieError.message)
    }

    // 3. Interne Benachrichtigung an die Website-Inhaberin bei neuer bestätigter Anmeldung
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
          <p style="margin: 0 0 4px 0;"><strong>Vorname:</strong> ${firstName || 'nicht angegeben'}</p>
          <p style="margin: 0 0 16px 0;"><strong>Nachname:</strong> ${lastName || 'nicht angegeben'}</p>
          <p style="font-size: 12px; color: #6b7280; margin-top: 24px;">Diese Nachricht wurde automatisch vom CRM Funnel System gesendet.</p>
        </body>
        </html>
      `
      internalEmail.textContent = `
Neuer bestätigter Kontakt über die Funnel-Seite

E-Mail: ${email}
Vorname: ${firstName || 'nicht angegeben'}
Nachname: ${lastName || 'nicht angegeben'}

Diese Nachricht wurde automatisch vom CRM Funnel System gesendet.
      `

      await apiInstance.sendTransacEmail(internalEmail)

      console.log('Interne Benachrichtigungs-E-Mail an mail.s.muench@googlemail.com gesendet')
    } catch (internalError) {
      console.error('Fehler beim Senden der internen Benachrichtigung:', internalError)
    }

    return res.status(200).setHeader('Content-Type', 'text/html').send(`
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>E-Mail bestätigt</title>
        <style>
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { font-family: Arial, sans-serif; display: flex; justify-content: center; align-items: center; min-height: 100vh; background: #f9fafb; }
          .container { background: white; padding: 60px 40px; border: 1px solid #e5e7eb; border-radius: 8px; text-align: center; max-width: 520px; width: 90%; }
          .check { width: 48px; height: 48px; border: 1px solid #1f2937; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 32px; font-size: 20px; color: #1f2937; }
          h1 { color: #1f2937; font-size: 22px; font-weight: 400; margin-bottom: 16px; }
          p { color: #6b7280; line-height: 1.7; font-size: 15px; margin-bottom: 16px; }
          .note { background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 6px; padding: 16px; margin: 24px 0; font-size: 14px; color: #4b5563; }
          a { display: inline-block; color: #1f2937; text-decoration: none; border-bottom: 1px solid #1f2937; padding-bottom: 1px; font-size: 14px; margin-top: 8px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="check">&#10003;</div>
          <h1>E-Mail bestätigt</h1>
          <p>Vielen Dank für deine Bestätigung.</p>
          <div class="note">
            Du erhältst in Kürze eine E-Mail mit dem Download-Link.<br>
            Falls du keine E-Mail siehst, schau bitte auch in deinem Spam-Ordner nach.
          </div>
          <a href="/">Zurück zur Startseite</a>
        </div>
      </body>
      </html>
    `)

  } catch (error) {
    console.error('Fehler bei der E-Mail-Bestätigung:', error)
    return res.status(500).setHeader('Content-Type', 'text/html').send(`
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Fehler</title>
        <style>
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { font-family: Arial, sans-serif; display: flex; justify-content: center; align-items: center; min-height: 100vh; background: #f9fafb; }
          .container { background: white; padding: 60px 40px; border: 1px solid #e5e7eb; border-radius: 8px; text-align: center; max-width: 500px; width: 90%; }
          h1 { color: #1f2937; font-size: 22px; font-weight: 400; margin-bottom: 16px; }
          p { color: #6b7280; line-height: 1.7; font-size: 15px; margin-bottom: 24px; }
          a { display: inline-block; color: #1f2937; text-decoration: none; border-bottom: 1px solid #1f2937; padding-bottom: 1px; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Ein Fehler ist aufgetreten</h1>
          <p>Leider konnte deine E-Mail-Adresse nicht bestätigt werden. Bitte versuche es erneut oder kontaktiere uns.</p>
          <a href="/freebie">Zurück zur Anmeldung</a>
        </div>
      </body>
      </html>
    `)
  }
}
