const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { amount, currency = 'eur', productName } = req.body

  if (!amount || amount <= 0) {
    return res.status(400).json({ error: 'Ungültiger Betrag' })
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: currency.toLowerCase(),
            product_data: {
              name: productName || 'Produkt',
            },
            unit_amount: Math.round(amount * 100), // Stripe verwendet Cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/cancel`,
      locale: 'de',
    })

    return res.status(200).json({ 
      sessionId: session.id,
      url: session.url 
    })

  } catch (error) {
    console.error('Stripe Session Creation Error:', error)
    return res.status(500).json({ 
      error: 'Fehler bei der Zahlungsabwicklung',
      details: error.message 
    })
  }
}
