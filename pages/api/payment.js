import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { items, customerEmail, customerName } = req.body;

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card', 'klarna', 'sofort'],
      mode: 'payment',
      customer_email: customerEmail,
      line_items: items.map(item => ({
        price_data: {
          currency: 'eur',
          product_data: {
            name: item.name,
            description: item.description,
            images: item.images || [],
          },
          unit_amount: item.price * 100, // Convert to cents
        },
        quantity: item.quantity || 1,
      })),
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/cancel`,
      metadata: {
        customer_name: customerName,
        source: 'crm_funnel'
      },
      billing_address_collection: 'required',
      shipping_address_collection: {
        allowed_countries: ['DE', 'AT', 'CH'],
      },
      payment_intent_data: {
        metadata: {
          customer_name: customerName,
          customer_email: customerEmail,
        },
      },
    });

    // Store lead data before payment
    await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/lead`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: customerName,
        email: customerEmail,
        source: 'payment_initiated',
        items: items,
        sessionId: session.id,
        timestamp: new Date().toISOString()
      })
    });

    res.status(200).json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error('Payment error:', error);
    res.status(500).json({ error: 'Failed to create payment session' });
  }
}
