import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { 
  CheckCircle, 
  ArrowLeft,
  Download,
  Mail,
  Calendar,
  Home
} from 'lucide-react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Success() {
  const router = useRouter()
  const [orderDetails, setOrderDetails] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const { session_id } = router.query
    
    if (session_id) {
      // In production, verify session with Stripe and get order details
      fetch('/api/payment/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ session_id })
      })
      .then(res => res.json())
      .then(data => {
        setOrderDetails(data)
        setLoading(false)
        
        // Track successful purchase
        if (typeof window !== 'undefined' && window.trackFunnelStep) {
          window.trackFunnelStep('purchase_completed', {
            session_id,
            amount: data.amount,
            customer_email: data.customer_email
          });
        }
      })
      .catch(err => {
        console.error('Order verification failed:', err)
        setLoading(false)
      })
    } else {
      setLoading(false)
    }
  }, [router.query])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Bestellung wird verarbeitet...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>Vielen Dank! - CRM Funnel</title>
        <meta name="description" content="Deine Bestellung wurde erfolgreich abgeschlossen" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <Link href="/">
                <div className="flex items-center text-green-600 hover:text-green-800 transition-colors">
                  <Home className="w-5 h-5 mr-2" />
                  <span className="font-semibold">Zurück zur Startseite</span>
                </div>
              </Link>
              
              <h1 className="text-2xl font-bold text-gray-900">Bestellung erfolgreich</h1>
              
              <div className="w-20"></div>
            </div>
          </div>
        </header>

        {/* Success Message */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Vielen Dank für deine
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">
                  {' '}Bestellung!
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-8">
                Wir haben deine Zahlung erfolgreich erhalten. Du erhältst in Kürze eine Bestätigungs-E-Mail mit allen Details.
              </p>

              {orderDetails && (
                <div className="bg-white rounded-xl p-6 shadow-lg max-w-md mx-auto mb-8">
                  <h3 className="font-bold text-gray-900 mb-4">Bestellübersicht</h3>
                  <div className="space-y-2 text-left">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Bestellnummer:</span>
                      <span className="font-semibold">{orderDetails.order_number}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Betrag:</span>
                      <span className="font-semibold">{orderDetails.amount}€</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">E-Mail:</span>
                      <span className="font-semibold">{orderDetails.customer_email}</span>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>

            {/* Next Steps */}
            <motion.div 
              className="bg-white rounded-2xl shadow-lg p-8 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Was passiert als Nächstes?
              </h2>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">1. Bestätigungs-E-Mail</h3>
                  <p className="text-gray-600 text-sm">
                    Du erhältst sofort eine E-Mail mit deiner Bestellbestätigung und Rechnung.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Download className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">2. Zugangsinformationen</h3>
                  <p className="text-gray-600 text-sm">
                    Innerhalb von 24 Stunden erhältst du alle Zugänge und Startmaterialien.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calendar className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">3. Starttermin</h3>
                  <p className="text-gray-600 text-sm">
                    Falls ein Kurs gebucht wurde, erhältst du Informationen zum Starttermin.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Important Information */}
            <motion.div 
              className="bg-blue-50 rounded-xl p-6 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="font-bold text-blue-900 mb-4">Wichtige Informationen</h3>
              <ul className="space-y-2 text-blue-800">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Überprüfe dein E-Mail-Postfach (auch den Spam-Ordner)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Speichere unsere E-Mail-Adresse in deinen Kontakten</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Bei Fragen antworte einfach auf die Bestätigungs-E-Mail</span>
                </li>
              </ul>
            </motion.div>

            {/* Support Section */}
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Brauchst du Hilfe?
              </h3>
              <p className="text-gray-600 mb-6">
                Unser Support-Team steht dir jederzeit zur Verfügung.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <a 
                  href="mailto:support@crm-funnel.de" 
                  className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
                >
                  <Mail className="w-5 h-5 mr-2" />
                  E-Mail Support
                </a>
                
                <a 
                  href="tel:+49123456789" 
                  className="inline-flex items-center justify-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Telefon: +49 123 456789
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-8">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <p>&copy; 2024 CRM Funnel. Alle Rechte vorbehalten.</p>
            <p className="mt-2 text-gray-400">
              Vielen Dank für dein Vertrauen - wir freuen uns auf die Zusammenarbeit!
            </p>
          </div>
        </footer>
      </div>
    </>
  )
}
