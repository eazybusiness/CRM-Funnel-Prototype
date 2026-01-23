'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import { ArrowLeft, AlertCircle } from 'lucide-react'

export default function PaymentCancel() {
  const router = useRouter()

  useEffect(() => {
    // Optional: Store cancel event for analytics
    if (typeof window !== 'undefined' && router.isReady) {
      localStorage.setItem('payment_cancelled', JSON.stringify({
        timestamp: new Date().toISOString(),
        courseId: router.query.courseId,
        courseName: router.query.courseName
      }))
    }
  }, [router.isReady, router.query])

  return (
    <>
      <Head>
        <title>Zahlung abgebrochen - Einfach bewusster leben</title>
        <meta name="description" content="Die Zahlung wurde abgebrochen" />
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
            {/* Cancel Header */}
            <div className="bg-orange-50 px-8 py-12 text-center">
              <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-3xl font-light text-gray-900 mb-2">
                Zahlung abgebrochen
              </h1>
              <p className="text-gray-600">
                Deine Zahlung wurde nicht abgeschlossen
              </p>
            </div>

            {/* Content */}
            <div className="p-8">
              <div className="text-center mb-8">
                <h2 className="text-xl font-normal text-gray-900 mb-4">
                  Kein Problem! Du kannst es jederzeit erneut versuchen.
                </h2>
                <p className="text-gray-600 mb-6">
                  Falls du Fragen oder Bedenken hast, zögere nicht, uns zu kontaktieren.
                  Wir helfen dir gerne weiter.
                </p>

                {/* Reasons for cancellation */}
                <div className="text-left max-w-md mx-auto mb-8">
                  <h3 className="font-normal text-gray-900 mb-3">Mögliche Gründe:</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Du hast den Zahlungsvorgang bewusst abgebrochen</li>
                    <li>• Es gab ein technisches Problem mit PayPal</li>
                    <li>• Die Zahlung wurde von deiner Bank abgelehnt</li>
                    <li>• Du hast dich umentschieden</li>
                  </ul>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={() => window.history.back()}
                  className="block w-full bg-gray-900 text-white font-light py-3 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Zurück zum Checkout
                </button>
                <Link
                  href="/"
                  className="block w-full bg-gray-200 text-gray-700 font-light py-3 rounded-lg hover:bg-gray-300 transition-colors text-center"
                >
                  Zur Startseite
                </Link>
              </div>

              {/* Support */}
              <div className="text-center mt-8">
                <p className="text-sm text-gray-600 mb-2">
                  Brauchst du Hilfe?{' '}
                  <a href="mailto:support@einfachbewusstleben.de" className="text-gray-900 hover:underline">
                    Kontaktiere uns
                  </a>
                </p>
                <p className="text-xs text-gray-500">
                  Wir sind hier, um dir zu helfen!
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
