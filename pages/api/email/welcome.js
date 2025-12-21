import nodemailer from 'nodemailer';

// Create email transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false, // true for 465, false for other ports
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

    // Get email content based on type
    const emailContent = getWelcomeEmailContent(lead, type);

    // Send email
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: lead.email,
      subject: emailContent.subject,
      html: emailContent.html,
      text: emailContent.text,
    });

    console.log(`Welcome email sent to ${lead.email} for type: ${type}`);

    res.status(200).json({ 
      success: true, 
      message: 'Welcome email sent successfully' 
    });

  } catch (error) {
    console.error('Email sending error:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
}

function getWelcomeEmailContent(lead, type) {
  const firstName = lead.name.split(' ')[0];
  
  const baseContent = {
    subject: 'Willkommen bei CRM Funnel! Deine Reise beginnt jetzt.',
    text: `Hallo ${firstName},

vielen Dank für dein Interesse an unseren Angeboten. Wir freuen uns, dich auf deiner Erfolgsgeschichte zu begleiten.

In den nächsten Tagen wirst du von uns weitere Informationen erhalten, die perfekt auf deine Interessen zugeschnitten sind.

Solltest du Fragen haben, zögere nicht, uns zu kontaktieren.

Beste Grüße,
Dein CRM Funnel Team`,
    html: `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Willkommen bei CRM Funnel</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .button { display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Willkommen ${firstName}! 🎉</h1>
            <p>Deine Reise zum Erfolg beginnt jetzt</p>
        </div>
        
        <div class="content">
            <p>Vielen Dank für dein Interesse an unseren Angeboten. Wir freuen uns, dich auf deiner Erfolgsgeschichte zu begleiten.</p>
            
            ${getTypeSpecificContent(type)}
            
            <p>In den nächsten Tagen wirst du von uns weitere Informationen erhalten, die perfekt auf deine Interessen zugeschnitten sind.</p>
            
            <div style="text-align: center;">
                <a href="${process.env.NEXT_PUBLIC_APP_URL}" class="button">
                    Jetzt entdecken
                </a>
            </div>
            
            <p>Solltest du Fragen haben, zögere nicht, uns zu kontaktieren.</p>
            
            <p>Beste Grüße,<br>Dein CRM Funnel Team</p>
        </div>
        
        <div class="footer">
            <p>&copy; 2024 CRM Funnel. Alle Rechte vorbehalten.</p>
            <p>Du erhältst diese E-Mail, weil du dich auf unserer Website registriert hast.</p>
        </div>
    </div>
</body>
</html>`
  };

  return baseContent;
}

function getTypeSpecificContent(type) {
  switch (type) {
    case 'product_interest':
      return `
        <h3>📦 Produktinformationen</h3>
        <p>Du hast dich für unsere Produkte interessiert. Wir werden dir in Kürze detaillierte Informationen zu den verschiedenen Paketen und deren Vorteilen zusenden.</p>
      `;
    case 'course_interest':
      return `
        <h3>🎓 Kurse & Workshops</h3>
        <p>Du möchtest deine Fähigkeiten erweitern! Wir werden dir Informationen zu unseren Kursen, den nächsten Startterminen und wie du dich anmelden kannst zusenden.</p>
      `;
    case 'business_interest':
      return `
        <h3>💼 Business-Möglichkeiten</h3>
        <p>Du interessierst dich für unternehmerische Möglichkeiten! Wir werden dir Details zu unseren Partnerprogrammen und wie du dein eigenes Business aufbauen kannst zusenden.</p>
      `;
    default:
      return `
        <p>Wir haben verschiedene Angebote, die dir helfen können, deine Ziele zu erreichen.</p>
      `;
  }
}
