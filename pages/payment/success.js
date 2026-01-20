'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import { CheckCircle, ArrowLeft, Mail, Lock } from 'lucide-react'

export default function PaymentSuccess() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    const capturePayment = async () => {
      try {
        const { orderId, token, courseName } = router.query
        const paypalOrderId = orderId || token

        if (!paypalOrderId) {
          setError('Bestell-ID fehlt')
          setLoading(false)
          return
        }

        const response = await fetch('/api/payment/capture-paypal-order', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ orderId: paypalOrderId }),
        })

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || 'Fehler bei der Zahlungsabwicklung')
        }

        setSuccess(true)
        
        // Store success info for potential future use
        if (typeof window !== 'undefined') {
          localStorage.setItem('last_purchase', JSON.stringify({
            courseName,
            timestamp: new Date().toISOString(),
            isNewUser: data.isNewUser
          }))
        }

      } catch (error) {
        console.error('Payment capture error:', error)
        setError(error.message || 'Ein Fehler ist aufgetreten')
      } finally {
        setLoading(false)
      }
    }

    if (router.isReady) {
      capturePayment()
    }
  }, [router.isReady, router.query])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Zahlung wird verarbeitet...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">❌</span>
          </div>
          <h1 className="text-2xl font-light text-gray-900 mb-2">
            Fehler bei der Zahlung
          </h1>
          <p className="text-gray-600 mb-6">
            {error}
          </p>
          <div className="space-y-3">
            <Link
              href="/"
              className="block w-full bg-gray-900 text-white font-light px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
            >
              Zur Startseite
            </Link>
            <button
              onClick={() => window.location.reload()}
              className="block w-full bg-gray-200 text-gray-700 font-light px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Erneut versuchen
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>Zahlung erfolgreich - Einfach bewusster leben</title>
        <meta name="description" content="Deine Zahlung war erfolgreich" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center py-4">
              <Link 
                href="/"
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 mr-1" />
                <span>Zur Startseite</span>
              </Link>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            {/* Success Header */}
            <div className="bg-green-50 px-8 py-12 text-center">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-3xl font-light text-gray-900 mb-2">
                Zahlung erfolgreich!
              </h1>
              <p className="text-gray-600">
                Vielen Dank für deinen Kauf
              </p>
            </div>

            {/* Content */}
            <div className="p-8">
              <div className="text-center mb-8">
                <h2 className="text-xl font-normal text-gray-900 mb-4">
                  Was passiert jetzt?
                </h2>
                <div className="space-y-4 text-left max-w-md mx-auto">
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                      <Mail className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-normal text-gray-900">1. E-Mail erhalten</h3>
                      <p className="text-sm text-gray-600">
                        Du erhältst in wenigen Minuten eine E-Mail mit deinen Zugangsdaten.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                      <Lock className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-normal text-gray-900">2. Einloggen</h3>
                      <p className="text-sm text-gray-600">
                        Nutze die E-Mail und das temporäre Passwort aus der E-Mail.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                      <CheckCircle className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-normal text-gray-900">3. Loslegen!</h3>
                      <p className="text-sm text-gray-600">
                        Ändere dein Passwort und starte direkt mit deinem Kurs.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Important Notice */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
                <h3 className="font-normal text-gray-900 mb-2">Wichtiger Hinweis</h3>
                <p className="text-sm text-gray-600">
                  Bitte überprüfe auch deinen Spam-Ordner, falls du die E-Mail nicht in deinem Posteingang findest.
                  Das temporäre Passwort solltest du nach dem ersten Login ändern.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Link
                  href="/login"
                  className="block w-full bg-gray-900 text-white font-light py-3 rounded-lg hover:bg-gray-800 transition-colors text-center"
                >
                  Jetzt einloggen
                </Link>
                <Link
                  href="/"
                  className="block w-full bg-gray-200 text-gray-700 font-light py-3 rounded-lg hover:bg-gray-300 transition-colors text-center"
                >
                  Zur Startseite
                </Link>
              </div>

              {/* Support */}
              <div className="text-center mt-8">
                <p className="text-sm text-gray-600">
                  Fragen oder Probleme?{' '}
                  <a href="mailto:support@einfachbewusstleben.de" className="text-gray-900 hover:underline">
                    Kontaktiere uns
                  </a>
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
