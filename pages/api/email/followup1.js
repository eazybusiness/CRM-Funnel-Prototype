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

    const emailContent = getFollowUp1EmailContent(lead, type);

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: lead.email,
      subject: emailContent.subject,
      html: emailContent.html,
      text: emailContent.text,
    });

    console.log(`Follow-up 1 email sent to ${lead.email} for type: ${type}`);

    res.status(200).json({ 
      success: true, 
      message: 'Follow-up 1 email sent successfully' 
    });

  } catch (error) {
    console.error('Follow-up 1 email sending error:', error);
    res.status(500).json({ error: 'Failed to send follow-up 1 email' });
  }
}

function getFollowUp1EmailContent(lead, type) {
  const firstName = lead.name.split(' ')[0];
  
  const baseContent = {
    subject: 'Die nächsten Schritte auf deinem Erfolgsweg',
    text: `Hallo ${firstName},

wie geht es dir seit deiner Anmeldung? Wir hoffen, du hattest Zeit, unsere Angebote zu erkunden.

${getTypeSpecificText(type)}

Hier sind einige Ressourcen, die dir weiterhelfen könnten:
- Unser Blog mit wertvollen Tipps
- Kostenlose Webinare
- Erfolgsgeschichten anderer Kunden

Wenn du Fragen hast oder persönliche Beratung wünschst, melde dich jederzeit bei uns.

Beste Grüße,
Dein CRM Funnel Team`,
    html: `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Die nächsten Schritte</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .feature-box { background: white; padding: 20px; margin: 15px 0; border-radius: 8px; border-left: 4px solid #667eea; }
        .button { display: inline-block; background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; margin: 10px 0; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Die nächsten Schritte, ${firstName} 🚀</h1>
            <p>Lass uns gemeinsam deine Ziele erreichen</p>
        </div>
        
        <div class="content">
            <p>Hallo ${firstName},</p>
            
            <p>wie geht es dir seit deiner Anmeldung? Wir hoffen, du hattest Zeit, unsere Angebote zu erkunden.</p>
            
            ${getTypeSpecificHtml(type)}
            
            <h3>🎯 Nützliche Ressourcen für dich</h3>
            
            <div class="feature-box">
                <h4>📚 Wissensdatenbank</h4>
                <p>Tipps, Tricks und Strategien von Experten</p>
                <a href="${process.env.NEXT_PUBLIC_APP_URL}/blog" class="button">Jetzt entdecken</a>
            </div>
            
            <div class="feature-box">
                <h4>🎥 Kostenlose Webinare</h4>
                <p>Lerne von den Besten - live und interaktiv</p>
                <a href="${process.env.NEXT_PUBLIC_APP_URL}/webinars" class="button">Anmelden</a>
            </div>
            
            <div class="feature-box">
                <h4>⭐ Erfolgsgeschichten</h4>
                <p>Wie andere ihre Ziele erreicht haben</p>
                <a href="${process.env.NEXT_PUBLIC_APP_URL}/success-stories" class="button">Inspiration finden</a>
            </div>
            
            <p><strong>Hast du Fragen?</strong> Unser Support-Team hilft dir gerne weiter:</p>
            <p>📧 E-Mail: support@crm-funnel.de<br>
               📞 Telefon: +49 123 456789</p>
            
            <p>Beste Grüße,<br>Dein CRM Funnel Team</p>
        </div>
        
        <div class="footer">
            <p>&copy; 2024 CRM Funnel. Alle Rechte vorbehalten.</p>
            <p><a href="${process.env.NEXT_PUBLIC_APP_URL}/unsubscribe">Abmelden</a></p>
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
      return `Unsere Produkte wurden entwickelt, um echte Ergebnisse zu liefern. Viele Kunden berichten von signifikanten Verbesserungen nach nur wenigen Wochen.`;
    case 'course_interest':
      return `Unsere Kurse sind praxisorientiert und helfen dir, neue Fähigkeiten schnell zu erlernen. Die nächsten Kurse starten bald - sichere dir noch einen Platz!`;
    case 'business_interest':
      return `Unternehmerische Freiheit ist erreichbarer als du denkst. Unsere Partner zeigen dir, wie du in kürzester Zeit ein profitables Business aufbauen kannst.`;
    default:
      return `Wir haben die passenden Lösungen für deine Ziele. Lass uns gemeinsam den besten Weg für dich finden.`;
  }
}

function getTypeSpecificHtml(type) {
  switch (type) {
    case 'product_interest':
      return `
        <div class="feature-box">
          <h3>📦 Produkte, die wirklich funktionieren</h3>
          <p>Unsere Lösungen wurden entwickelt, um messbare Ergebnisse zu liefern. Viele Kunden berichten von signifikanten Verbesserungen nach nur wenigen Wochen der Anwendung.</p>
          <ul>
            <li>✅ Wissenschaftlich fundiert</li>
            <li>✅ Einfach zu implementieren</li>
            <li>✅ 30-Tage-Garantie</li>
          </ul>
        </div>
      `;
    case 'course_interest':
      return `
        <div class="feature-box">
          <h3>🎓 Fähigkeiten, die dich weiterbringen</h3>
          <p>Unsere Kurse sind praxisorientiert und helfen dir, neue Kompetenzen schnell zu erlernen. Die nächsten Kurse starten bald - sichere dir noch einen Platz!</p>
          <ul>
            <li>✅ Erfahrene Trainer</li>
            <li>✅ Kleine Gruppen</li>
            <li>✅ Zertifikat</li>
          </ul>
        </div>
      `;
    case 'business_interest':
      return `
        <div class="feature-box">
          <h3>💼 Dein Weg zur finanziellen Freiheit</h3>
          <p>Unternehmerische Freiheit ist erreichbarer als du denkst. Unsere Partner zeigen dir, wie du in kürzester Zeit ein profitables Business aufbauen kannst.</p>
          <ul>
            <li>✅ Bewährtes System</li>
            <li>✅ Voll Support</li>
            <li>✅ Flexible Arbeitszeiten</li>
          </ul>
        </div>
      `;
    default:
      return `
        <div class="feature-box">
          <h3>🎯 Deine persönliche Erfolgsgeschichte</h3>
          <p>Wir haben die passenden Lösungen für deine Ziele. Lass uns gemeinsam den besten Weg für dich finden.</p>
        </div>
      `;
  }
}
