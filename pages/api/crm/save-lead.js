export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { name, email, source, offer, phone } = req.body

  if (!email) {
    return res.status(400).json({ error: 'E-Mail ist erforderlich' })
  }

  try {
    // In einer produktiven Umgebung würde hier die Datenbank-Speicherung erfolgen
    // Für jetzt geben wir die Daten zurück, damit sie client-seitig gespeichert werden können
    
    const lead = {
      id: generateId(),
      name: name || '',
      email: email,
      source: source || 'unknown',
      offer: offer || '',
      phone: phone || '',
      createdAt: new Date().toISOString(),
      status: 'new'
    }

    // TODO: Hier später Datenbank-Integration
    // await db.leads.create(lead)

    return res.status(200).json({ 
      success: true, 
      lead: lead,
      message: 'Lead erfolgreich gespeichert' 
    })

  } catch (error) {
    console.error('Fehler beim Speichern des Leads:', error)
    return res.status(500).json({ 
      error: 'Fehler beim Speichern des Leads' 
    })
  }
}

function generateId() {
  return `lead_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}
