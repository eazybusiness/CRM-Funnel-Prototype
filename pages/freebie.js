import { useState } from 'react'
import { motion } from 'framer-motion'
import { Download, CheckCircle, Shield, Mail } from 'lucide-react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'

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
          <title>Bestätige deine E-Mail - Kostenloser Guide</title>
          <meta name="description" content="Bestätige deine E-Mail-Adresse für den Download" />
        </Head>

        <div className="min-h-screen bg-white flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl w-full text-center"
          >
            <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center">
              <Mail className="w-16 h-16 text-gray-700" strokeWidth={1.5} />
            </div>
            
            <h1 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
              Fast geschafft!
            </h1>
            
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Wir haben dir eine E-Mail an <strong>{formData.email}</strong> gesendet.
            </p>
            
            <div className="bg-gray-50 border border-gray-200 rounded-sm p-8 mb-8">
              <h3 className="font-normal text-gray-900 mb-3 text-lg">
                Bitte bestätige deine E-Mail-Adresse
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Klicke auf den Link in der E-Mail, um deine Anmeldung zu bestätigen. 
                Danach erhältst du sofort Zugang zu deinem kostenlosen Guide.
              </p>
            </div>

            <p className="text-sm text-gray-500 mb-8">
              Keine E-Mail erhalten? Überprüfe deinen Spam-Ordner.
            </p>

            <Link 
              href="/"
              className="inline-block bg-gray-900 text-white font-light px-8 py-3 rounded-sm hover:bg-gray-800 transition-colors"
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
        <title>Kostenloser Guide - Minimalismus & bewusstes Leben</title>
        <meta name="description" content="Lade dir jetzt deinen kostenlosen Guide herunter und starte deine Reise zu mehr Minimalismus und Achtsamkeit" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-white">
        {/* Header */}
        <header className="bg-white border-b border-gray-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <Link href="/" className="text-xl font-light tracking-wide text-gray-900">
                Einfach Leichter
              </Link>
              <Link href="/" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                Zurück
              </Link>
            </div>
          </div>
        </header>

        <div className="max-w-6xl mx-auto px-4 py-12 md:py-20">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Left Side - Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-6">
                <span className="inline-block text-sm font-light text-gray-600 border border-gray-300 px-4 py-2 rounded-sm">
                  100% Kostenlos
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-6 leading-tight">
                Dein kostenloser Guide zu mehr Bewusstsein
              </h1>

              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Entdecke praktische Tipps und Strategien für einen minimalistischen 
                und bewussten Lebensstil. Dieser Guide hilft dir dabei, achtsamer 
                zu leben und mehr Klarheit in dein Leben zu bringen.
              </p>

              {/* Image */}
              <div className="relative h-64 md:h-80 rounded-sm overflow-hidden mb-8">
                <Image
                  src="https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800&h=600&fit=crop"
                  alt="Minimalismus und Achtsamkeit"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="space-y-6 mb-8">
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-gray-700 mr-3 flex-shrink-0 mt-1" strokeWidth={1.5} />
                  <div>
                    <h3 className="font-normal text-gray-900 mb-1">Sofort umsetzbar</h3>
                    <p className="text-gray-600">Praktische Übungen für den Alltag</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Download className="w-6 h-6 text-gray-700 mr-3 flex-shrink-0 mt-1" strokeWidth={1.5} />
                  <div>
                    <h3 className="font-normal text-gray-900 mb-1">Direkt per E-Mail</h3>
                    <p className="text-gray-600">Download-Link nach Bestätigung deiner E-Mail-Adresse</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-sm p-6">
                <div className="flex items-start">
                  <Shield className="w-5 h-5 text-gray-700 mr-3 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                  <p className="text-sm text-gray-600 leading-relaxed">
                    <strong className="text-gray-900">Deine Daten sind sicher.</strong> Wir respektieren deine Privatsphäre 
                    und versenden nur wertvolle Inhalte. Abmeldung jederzeit möglich.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Right Side - Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="md:sticky md:top-8"
            >
              <div className="bg-gray-50 border border-gray-200 rounded-sm p-8 md:p-10">
                <h2 className="text-2xl font-light text-gray-900 mb-6 text-center">
                  Jetzt kostenlos sichern
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-normal text-gray-700 mb-2">
                      Vorname *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:border-gray-900 transition-colors"
                      placeholder="Dein Vorname"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-normal text-gray-700 mb-2">
                      E-Mail-Adresse *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:border-gray-900 transition-colors"
                      placeholder="deine@email.de"
                    />
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start">
                      <input
                        type="checkbox"
                        id="consent"
                        name="consent"
                        checked={formData.consent}
                        onChange={handleChange}
                        className="mt-1 h-4 w-4 text-gray-900 focus:ring-gray-900 border-gray-300 rounded-sm"
                        required
                      />
                      <label htmlFor="consent" className="ml-3 text-sm text-gray-600 leading-relaxed">
                        Ja, ich möchte den kostenlosen Guide erhalten und bin einverstanden, 
                        dass ich in Zukunft wertvolle Tipps per E-Mail erhalte. 
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
                        className="mt-1 h-4 w-4 text-gray-900 focus:ring-gray-900 border-gray-300 rounded-sm"
                        required
                      />
                      <label htmlFor="dataProtection" className="ml-3 text-sm text-gray-600 leading-relaxed">
                        Ich habe die{' '}
                        <Link href="/datenschutz" className="text-gray-900 hover:text-gray-700 underline">
                          Datenschutzerklärung
                        </Link>{' '}
                        zur Kenntnis genommen und stimme zu. *
                      </label>
                    </div>
                  </div>

                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-sm text-sm">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gray-900 text-white font-light py-4 rounded-sm hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Wird gesendet...' : 'Jetzt kostenlos sichern'}
                  </button>

                  <p className="text-xs text-gray-500 text-center leading-relaxed">
                    * Pflichtfelder. Nach der Anmeldung erhältst du eine Bestätigungs-E-Mail. 
                    Klicke auf den Link darin, um deinen Download-Link zu erhalten.
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
