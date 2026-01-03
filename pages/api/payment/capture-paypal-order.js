export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { orderId } = req.body

  if (!orderId) {
    return res.status(400).json({ error: 'Order ID erforderlich' })
  }

  try {
    const auth = Buffer.from(
      `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`
    ).toString('base64')

    const response = await fetch(
      `${process.env.PAYPAL_API_URL || 'https://api-m.sandbox.paypal.com'}/v2/checkout/orders/${orderId}/capture`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${auth}`,
        },
      }
    )

    const data = await response.json()

    if (!response.ok) {
      console.error('PayPal Capture Error:', data)
      return res.status(response.status).json({ 
        error: 'Fehler bei der Zahlungsabwicklung', 
        details: data 
      })
    }

    // Hier können Sie zusätzliche Logik hinzufügen:
    // - Bestellung in Datenbank speichern
    // - E-Mail an Kunden senden
    // - CRM aktualisieren

    return res.status(200).json({ 
      success: true,
      orderId: data.id,
      status: data.status,
      payer: data.payer
    })

  } catch (error) {
    console.error('PayPal Capture Error:', error)
    return res.status(500).json({ 
      error: 'Fehler bei der Zahlungsabwicklung' 
    })
  }
}
