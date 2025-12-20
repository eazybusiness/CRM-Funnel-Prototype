export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const trackingData = req.body;
    
    // Log tracking data for analysis
    console.log('Funnel Tracking:', {
      ...trackingData,
      ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
      userAgent: req.headers['user-agent'],
      timestamp: new Date().toISOString()
    });

    // Store in database (in production, use proper DB)
    // await db.tracking.create({ data: trackingData });

    // Send to CRM if configured
    if (process.env.CRM_WEBHOOK_URL && process.env.CRM_API_KEY) {
      try {
        await fetch(process.env.CRM_WEBHOOK_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.CRM_API_KEY}`
          },
          body: JSON.stringify({
            event: 'funnel_tracking',
            data: trackingData
          })
        });
      } catch (crmError) {
        console.error('CRM tracking webhook failed:', crmError);
      }
    }

    // Trigger automated actions based on funnel step
    await triggerAutomatedActions(trackingData);

    res.status(200).json({ 
      success: true, 
      message: 'Tracking data recorded' 
    });

  } catch (error) {
    console.error('Tracking error:', error);
    res.status(500).json({ error: 'Failed to record tracking data' });
  }
}

async function triggerAutomatedActions(trackingData) {
  const { funnel_step, email, phone, source } = trackingData;

  switch (funnel_step) {
    case 'landing_page_visit':
      // Log initial visit
      console.log(`New visitor from ${source}`);
      break;
      
    case 'pathway_selected':
      // User selected a specific pathway
      console.log(`User selected pathway: ${trackingData.pathway}`);
      // Could trigger specific email sequence
      break;
      
    case 'form_submitted':
      // User submitted a form
      if (email) {
        console.log(`Form submitted by: ${email}`);
        // Trigger immediate follow-up
        await triggerImmediateFollowup(trackingData);
      }
      break;
      
    case 'payment_initiated':
      // User started payment process
      console.log(`Payment initiated by: ${email}`);
      // Trigger payment recovery sequence if not completed
      setTimeout(() => {
        triggerPaymentRecovery(trackingData);
      }, 60 * 60 * 1000); // 1 hour
      break;
      
    case 'purchase_completed':
      // Successful purchase
      console.log(`Purchase completed by: ${email}`);
      // Trigger onboarding sequence
      await triggerOnboardingSequence(trackingData);
      break;
      
    default:
      console.log(`Unknown funnel step: ${funnel_step}`);
  }
}

async function triggerImmediateFollowup(data) {
  try {
    await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/email/immediate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        lead: data,
        type: 'immediate_followup'
      })
    });
  } catch (error) {
    console.error('Immediate followup failed:', error);
  }
}

async function triggerPaymentRecovery(data) {
  try {
    await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/email/payment-recovery`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        lead: data,
        type: 'payment_recovery'
      })
    });
  } catch (error) {
    console.error('Payment recovery failed:', error);
  }
}

async function triggerOnboardingSequence(data) {
  try {
    await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/email/onboarding`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        lead: data,
        type: 'onboarding'
      })
    });
  } catch (error) {
    console.error('Onboarding sequence failed:', error);
  }
}
