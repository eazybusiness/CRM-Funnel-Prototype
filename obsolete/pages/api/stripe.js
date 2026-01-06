import Stripe from 'stripe';

// Helper function to get raw body
async function getRawBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      resolve(body);
    });
    req.on('error', (err) => {
      reject(err);
    });
  });
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const buf = await getRawBody(req);
    const sig = req.headers['stripe-signature'];
    
    let event;

    try {
      event = stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
      console.log(`Webhook signature verification failed.`, err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the event
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object;
        console.log('PaymentIntent was successful!');
        
        // Trigger email sequence
        await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/email/welcome`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: paymentIntent.receipt_email,
            amount: paymentIntent.amount,
            customer: paymentIntent.customer
          })
        });
        
        break;
        
      case 'checkout.session.completed':
        const session = event.data.object;
        console.log('Checkout session completed!');
        
        // Update CRM with purchase data
        await fetch(`${process.env.CRM_WEBHOOK_URL}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.CRM_API_KEY}`
          },
          body: JSON.stringify({
            event: 'purchase_completed',
            customer: session.customer_details,
            purchase: {
              amount: session.amount_total,
              currency: session.currency,
              items: session.line_items
            }
          })
        });
        
        break;
        
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    // Return a 200 response to acknowledge receipt of the event
    res.json({ received: true });
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
