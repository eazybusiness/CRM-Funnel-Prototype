import { v4 as uuidv4 } from 'uuid';

// Simple in-memory storage (in production, use a proper database)
let leads = [];

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const leadData = req.body;
    
    // Validate required fields
    if (!leadData.email || !leadData.name) {
      return res.status(400).json({ error: 'Name and email are required' });
    }

    // Create lead record
    const lead = {
      id: uuidv4(),
      ...leadData,
      status: 'new',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Store lead (in production, save to database)
    leads.push(lead);

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
            event: 'new_lead',
            lead: lead
          })
        });
      } catch (crmError) {
        console.error('CRM webhook failed:', crmError);
        // Continue even if CRM fails
      }
    }

    // Trigger email sequence based on source
    const emailType = getEmailType(leadData.source);
    await triggerEmailSequence(lead, emailType);

    // Log for debugging
    console.log('New lead created:', {
      id: lead.id,
      name: lead.name,
      email: lead.email,
      source: lead.source,
      timestamp: lead.createdAt
    });

    res.status(200).json({ 
      success: true, 
      leadId: lead.id,
      message: 'Lead created successfully' 
    });

  } catch (error) {
    console.error('Lead creation error:', error);
    res.status(500).json({ error: 'Failed to create lead' });
  }
}

function getEmailType(source) {
  switch (source) {
    case 'products':
      return 'product_interest';
    case 'courses':
      return 'course_interest';
    case 'business':
      return 'business_interest';
    case 'payment_initiated':
      return 'payment_started';
    default:
      return 'general_interest';
  }
}

async function triggerEmailSequence(lead, type) {
  try {
    // Trigger welcome email immediately
    await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/email/welcome`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        lead: lead,
        type: type
      })
    });

    // Schedule follow-up emails (in production, use a job queue)
    setTimeout(async () => {
      await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/email/followup1`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          lead: lead,
          type: type
        })
      });
    }, 24 * 60 * 60 * 1000); // 24 hours

    setTimeout(async () => {
      await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/email/followup2`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          lead: lead,
          type: type
        })
      });
    }, 3 * 24 * 60 * 60 * 1000); // 72 hours

  } catch (emailError) {
    console.error('Email sequence trigger failed:', emailError);
  }
}
