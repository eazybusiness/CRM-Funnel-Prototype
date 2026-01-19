export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { amount, currency = 'EUR', description } = req.body

  if (!amount || amount <= 0) {
    return res.status(400).json({ error: 'Ungültiger Betrag' })
  }

  try {
    const auth = Buffer.from(
      `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`
    ).toString('base64')

    const response = await fetch(
      `${process.env.PAYPAL_API_URL || 'https://api-m.sandbox.paypal.com'}/v2/checkout/orders`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${auth}`,
        },
        body: JSON.stringify({
          intent: 'CAPTURE',
          purchase_units: [
            {
              amount: {
                currency_code: currency,
                value: amount.toFixed(2),
              },
              description: description || 'Kauf',
            },
          ],
          application_context: {
            return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/success`,
            cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/cancel`,
            brand_name: 'Deine Marke',
            locale: 'de-DE',
            user_action: 'PAY_NOW',
          },
        }),
      }
    )

    const data = await response.json()

    if (!response.ok) {
      console.error('PayPal API Error:', data)
      return res.status(response.status).json({ 
        error: 'PayPal-Fehler', 
        details: data 
      })
    }

    return res.status(200).json({ 
      orderId: data.id,
      approveLink: data.links.find(link => link.rel === 'approve')?.href
    })

  } catch (error) {
    console.error('PayPal Order Creation Error:', error)
    return res.status(500).json({ 
      error: 'Fehler bei der Bestellerstellung' 
    })
  }
}
