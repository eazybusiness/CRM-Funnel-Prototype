import { useState } from 'react'
import { motion } from 'framer-motion'
import { Download, CheckCircle, Shield, Heart } from 'lucide-react'
import Head from 'next/head'
import Link from 'next/link'

export default function Freebie() {
  const [formData, setFormData] = useState({
    firstName: '',
    email: '',
    consent: false,
    dataProtection: false
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    
    if (!formData.consent || !formData.dataProtection) {
      setError('Bitte bestätige die erforderlichen Einwilligungen.')
      return
    }

    setLoading(true)

    try {
      // Lead im CRM speichern (client-side für Demo)
      const leadData = {
        id: `lead_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        name: formData.firstName,
        email: formData.email,
        source: 'freebie',
        offer: 'Kostenloses Freebie',
        createdAt: new Date().toISOString()
      }
      
      // Im LocalStorage speichern (für Demo-CRM)
      const leads = JSON.parse(localStorage.getItem('crm_funnel_demo_leads') || '[]')
      leads.unshift(leadData)
      localStorage.setItem('crm_funnel_demo_leads', JSON.stringify(leads.slice(0, 200)))

      // E-Mail-Anmeldung
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          email: formData.email,
          source: 'freebie',
          consent: formData.consent,
          dataProtection: formData.dataProtection
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setSubmitted(true)
      } else {
        setError(data.error || 'Ein Fehler ist aufgetreten. Bitte versuche es erneut.')
      }
    } catch (err) {
      setError('Ein Fehler ist aufgetreten. Bitte versuche es erneut.')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  if (submitted) {
    return (
      <>
        <Head>
          <title>Bestätige deine E-Mail - Freebie Download</title>
          <meta name="description" content="Bestätige deine E-Mail-Adresse für den Download" />
        </Head>

        <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center"
          >
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Fast geschafft! 🎉
            </h1>
            
            <p className="text-lg text-gray-600 mb-6">
              Wir haben dir eine E-Mail an <strong>{formData.email}</strong> gesendet.
            </p>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
              <h3 className="font-semibold text-gray-900 mb-2">
                Bitte bestätige deine E-Mail-Adresse
              </h3>
              <p className="text-gray-700">
                Klicke auf den Link in der E-Mail, um deine Anmeldung zu bestätigen 
                und deinen kostenlosen Download zu erhalten.
              </p>
            </div>

            <p className="text-sm text-gray-500 mb-6">
              Keine E-Mail erhalten? Überprüfe deinen Spam-Ordner oder kontaktiere uns.
            </p>

            <Link 
              href="/"
              className="inline-block bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold px-8 py-3 rounded-lg hover:shadow-lg transition-all"
            >
              Zurück zur Startseite
            </Link>
          </motion.div>
        </div>
      </>
    )
  }

  return (
    <>
      <Head>
        <title>Kostenloses Freebie - Dein Weg zu mehr Bewusstsein</title>
        <meta name="description" content="Lade dir jetzt dein kostenloses Freebie herunter und starte deine Reise zu mehr Minimalismus und bewusstem Konsum" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <Link href="/" className="text-2xl font-bold text-gray-900">
                Zurück
              </Link>
            </div>
          </div>
        </header>

        <div className="max-w-6xl mx-auto px-4 py-12 md:py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Side - Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-6">
                <span className="inline-block bg-green-100 text-green-800 text-sm font-semibold px-4 py-2 rounded-full">
                  100% Kostenlos
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Dein kostenloser Guide zu mehr{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600">
                  Bewusstsein
                </span>
              </h1>

              <p className="text-xl text-gray-600 mb-8">
                Entdecke praktische Tipps und Strategien für einen minimalistischen 
                und bewussten Lebensstil. Dieser Guide hilft dir dabei, achtsamer 
                zu konsumieren und mehr Klarheit in dein Leben zu bringen.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Sofort umsetzbar</h3>
                    <p className="text-gray-600">Praktische Übungen für den Alltag</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Heart className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Wertebasiert</h3>
                    <p className="text-gray-600">Authentische und ehrliche Inhalte</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Download className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Direkt verfügbar</h3>
                    <p className="text-gray-600">Download nach E-Mail-Bestätigung</p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start">
                  <Shield className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-700">
                    <strong>Deine Daten sind sicher.</strong> Wir respektieren deine Privatsphäre 
                    und versenden nur wertvolle Inhalte. Abmeldung jederzeit möglich.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Right Side - Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                  Jetzt kostenlos herunterladen
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                      Vorname *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Dein Vorname"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      E-Mail-Adresse *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="deine@email.de"
                    />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-start">
                      <input
                        type="checkbox"
                        id="consent"
                        name="consent"
                        checked={formData.consent}
                        onChange={handleChange}
                        className="mt-1 h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                        required
                      />
                      <label htmlFor="consent" className="ml-3 text-sm text-gray-700">
                        Ja, ich möchte den kostenlosen Download erhalten und bin einverstanden, 
                        dass ich in Zukunft wertvolle Tipps und Informationen per E-Mail erhalte. 
                        Abmeldung jederzeit möglich. *
                      </label>
                    </div>

                    <div className="flex items-start">
                      <input
                        type="checkbox"
                        id="dataProtection"
                        name="dataProtection"
                        checked={formData.dataProtection}
                        onChange={handleChange}
                        className="mt-1 h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                        required
                      />
                      <label htmlFor="dataProtection" className="ml-3 text-sm text-gray-700">
                        Ich habe die{' '}
                        <Link href="/datenschutz" className="text-green-600 hover:text-green-700 underline">
                          Datenschutzerklärung
                        </Link>{' '}
                        zur Kenntnis genommen und stimme zu. *
                      </label>
                    </div>
                  </div>

                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold py-4 rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Wird gesendet...' : 'Jetzt kostenlos herunterladen'}
                  </button>

                  <p className="text-xs text-gray-500 text-center">
                    * Pflichtfelder. Deine Daten werden vertraulich behandelt und nicht an Dritte weitergegeben.
                  </p>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  )
}
