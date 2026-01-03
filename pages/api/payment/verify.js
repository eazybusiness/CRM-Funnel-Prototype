export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { session_id } = req.body || {}

    // Demo verification endpoint.
    // In production you would call Stripe API and verify the session.
    const isDemo = typeof session_id === 'string' && session_id.startsWith('demo_')

    return res.status(200).json({
      ok: true,
      mode: isDemo ? 'demo' : 'unknown',
      order_number: session_id || `order_${Date.now()}`,
      amount: isDemo ? 197 : 0,
      customer_email: 'demo@example.com'
    })
  } catch (e) {
    return res.status(500).json({ error: 'Verification failed' })
  }
}
