export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { amount, currency = 'EUR', description, courseId, courseName } = req.body

  if (!amount || amount <= 0) {
    return res.status(400).json({ error: 'Ungültiger Betrag' })
  }

  if (!courseId || !courseName) {
    return res.status(400).json({ error: 'Kurs-ID und Kursname erforderlich' })
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
              description: description || `Kurs: ${courseName}`,
              custom_id: JSON.stringify({ courseId, courseName }),
            },
          ],
          application_context: {
            return_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment/success`,
            cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment/cancel`,
            brand_name: 'Einfach bewusster leben',
            locale: 'de-DE',
            user_action: 'PAY_NOW',
            payment_method: {
              payer_selected: 'PAYPAL',
              payee_preferred: 'IMMEDIATE_PAYMENT_REQUIRED',
            },
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
