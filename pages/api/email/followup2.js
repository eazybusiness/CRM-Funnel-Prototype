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
    const { lead, type } = req.body;

    if (!lead || !lead.email) {
      return res.status(400).json({ error: 'Lead email is required' });
    }

    const emailContent = getFollowUp2EmailContent(lead, type);

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: lead.email,
      subject: emailContent.subject,
      html: emailContent.html,
      text: emailContent.text,
    });

    console.log(`Follow-up 2 email sent to ${lead.email} for type: ${type}`);

    res.status(200).json({ 
      success: true, 
      message: 'Follow-up 2 email sent successfully' 
    });

  } catch (error) {
    console.error('Follow-up 2 email sending error:', error);
    res.status(500).json({ error: 'Failed to send follow-up 2 email' });
  }
}

function getFollowUp2EmailContent(lead, type) {
  const firstName = lead.name.split(' ')[0];
  
  const baseContent = {
    subject: 'Exklusives Angebot nur für dich!',
    text: `Hallo ${firstName},

wir haben etwas Besonderes für dich! Als Dank für dein Interesse möchten wir dir einen exklusiven Vorteil anbieten.

${getTypeSpecificText(type)}

Dieses Angebot ist zeitlich begrenzt und nur für neue Interessenten wie dich verfügbar.

Hier sind deine nächsten Schritte:
1. Wähle das passende Angebot
2. Sichere dir den Rabatt
3. Starte deine Erfolgsgeschichte

Wenn du Fragen hast oder Hilfe bei der Entscheidung benötigst, melde dich bei uns.

Beste Grüße,
Dein CRM Funnel Team`,
    html: `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Exklusives Angebot</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #fa709a 0%, #fee140 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .offer-box { background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%); padding: 25px; border-radius: 10px; margin: 20px 0; text-align: center; }
        .button { display: inline-block; background: linear-gradient(135deg, #fa709a 0%, #fee140 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; margin: 10px 0; font-weight: bold; }
        .urgency { background: #ff6b6b; color: white; padding: 10px; border-radius: 5px; text-align: center; margin: 15px 0; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
        .testimonial { background: white; padding: 20px; margin: 15px 0; border-radius: 8px; border-left: 4px solid #fa709a; font-style: italic; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🎁 Exklusives Angebot nur für dich, ${firstName}!</h1>
            <p>Zeitlich begrenzt - sichere dir deinen Vorteil</p>
        </div>
        
        <div class="content">
            <p>Hallo ${firstName},</p>
            
            <p>wir haben etwas Besonderes für dich! Als Dank für dein Interesse möchten wir dir einen exklusiven Vorteil anbieten.</p>
            
            ${getTypeSpecificHtml(type)}
            
            <div class="urgency">
                <strong>⏰ Nur noch 48 Stunden verfügbar!</strong><br>
                Dieses Angebot läuft am ${new Date(Date.now() + 48 * 60 * 60 * 1000).toLocaleDateString('de-DE')} ab.
            </div>
            
            <div class="testimonial">
                <p>"Ich bin so froh, dass ich dieses Angebot genutzt habe. Es hat meine Karriere wirklich verändert!"</p>
                <p><strong>- Sarah K., zufriedene Kundin</strong></p>
            </div>
            
            <h3>🎯 Deine nächsten Schritte</h3>
            <ol>
                <li><strong>Wähle</strong> das passende Angebot aus</li>
                <li><strong>Sichere</strong> dir den exklusiven Rabatt</li>
                <li><strong>Starte</strong> deine persönliche Erfolgsgeschichte</li>
            </ol>
            
            <div style="text-align: center;">
                <a href="${process.env.NEXT_PUBLIC_APP_URL}/special-offer" class="button">
                    Jetzt exklusiven Rabatt sichern!
                </a>
            </div>
            
            <p><strong>Brauchst du Hilfe bei der Entscheidung?</strong></p>
            <p>Unser Team steht dir für eine persönliche Beratung zur Verfügung:</p>
            <p>📞 Telefon: +49 123 456789<br>
               📧 E-Mail: beratung@crm-funnel.de<br>
               💬 Live-Chat: ${process.env.NEXT_PUBLIC_APP_URL}</p>
            
            <p>Wir freuen uns, dich auf deinem Weg zu begleiten!</p>
            
            <p>Beste Grüße,<br>Dein CRM Funnel Team</p>
        </div>
        
        <div class="footer">
            <p>&copy; 2024 CRM Funnel. Alle Rechte vorbehalten.</p>
            <p><a href="${process.env.NEXT_PUBLIC_APP_URL}/unsubscribe">Abmelden</a> | <a href="${process.env.NEXT_PUBLIC_APP_URL}/privacy">Datenschutz</a></p>
        </div>
    </div>
</body>
</html>`
  };

  return baseContent;
}

function getTypeSpecificText(type) {
  switch (type) {
    case 'product_interest':
      return `Sichere dir jetzt 25% Rabatt auf unser Professional Paket! Statt 297€ zahlst du nur 223€ - aber nur für die nächsten 48 Stunden.`;
    case 'course_interest':
      return `Melde dich jetzt zu einem beliebten Kurs an und erhalte kostenlosen Zugang zu unserem exklusiven Community-Bereich (Wert: 197€).`;
    case 'business_interest':
      return `Starte jetzt mit unserem Partner Programm und erhalte zusätzlich zum 20% Provision einen 500€ Start-Bonus für deine ersten 10 Verkäufe.`;
    default:
      return `Sichere dir jetzt 20% auf alle Angebote als neuer Kunde!`;
  }
}

function getTypeSpecificHtml(type) {
  switch (type) {
    case 'product_interest':
      return `
        <div class="offer-box">
          <h3>📦 25% Rabatt auf Professional Paket</h3>
          <p style="font-size: 24px; margin: 15px 0;"><s>297€</s> <strong style="color: #ff6b6b;">223€</strong></p>
          <ul style="text-align: left; max-width: 300px; margin: 0 auto;">
            <li>✅ Alle erweiterten Funktionen</li>
            <li>✅ Priorität Support</li>
            <li>✅ 30 Tage Geld-zurück</li>
          </ul>
        </div>
      `;
    case 'course_interest':
      return `
        <div class="offer-box">
          <h3>🎓 Kurs + Gratis Community Zugang</h3>
          <p style="font-size: 24px; margin: 15px 0;">Community Zugang <strong style="color: #ff6b6b;">KOSTENLOS</strong></p>
          <ul style="text-align: left; max-width: 300px; margin: 0 auto;">
            <li>✅ Wähle deinen Kurs</li>
            <li>✅ Erhalte gratis Community Zugang</li>
            <li>✅ Wert: 197€ gespart</li>
          </ul>
        </div>
      `;
    case 'business_interest':
      return `
        <div class="offer-box">
          <h3>💼 Partner Programm + 500€ Bonus</h3>
          <p style="font-size: 24px; margin: 15px 0;"><strong style="color: #ff6b6b;">500€</strong> Start-Bonus</p>
          <ul style="text-align: left; max-width: 300px; margin: 0 auto;">
            <li>✅ 20% Provision auf alle Verkäufe</li>
            <li>✅ Zusätzlicher 500€ Bonus</li>
            <li>✅ Marketing Materialien inklusive</li>
          </ul>
        </div>
      `;
    default:
      return `
        <div class="offer-box">
          <h3>🎁 20% Rabatt auf alles</h3>
          <p style="font-size: 24px; margin: 15px 0;"><strong style="color: #ff6b6b;">20%</strong> Rabatt</p>
          <ul style="text-align: left; max-width: 300px; margin: 0 auto;">
            <li>✅ Gültig für alle Angebote</li>
            <li>✅ Sofort einlösbar</li>
            <li>✅ Nur 48 Stunden verfügbar</li>
          </ul>
        </div>
      `;
  }
}
