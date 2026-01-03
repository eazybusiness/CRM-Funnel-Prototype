import { useState } from 'react'
import { motion } from 'framer-motion'
import { CreditCard, Shield, CheckCircle } from 'lucide-react'
import Head from 'next/head'
import Link from 'next/link'

export default function Checkout() {
  const [paymentMethod, setPaymentMethod] = useState('paypal')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Beispiel-Produkt (kann dynamisch sein)
  const product = {
    name: 'Premium-Kurs: Bewusster Minimalismus',
    price: 97,
    currency: 'EUR',
    description: 'Dein Weg zu mehr Klarheit und bewusstem Leben'
  }

  const handlePayPalPayment = async () => {
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/payment/create-paypal-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: product.price,
          currency: product.currency,
          description: product.name
        }),
      })

      const data = await response.json()

      if (response.ok && data.approveLink) {
        // Weiterleitung zu PayPal
        window.location.href = data.approveLink
      } else {
        setError('Fehler bei der PayPal-Zahlung. Bitte versuche es erneut.')
      }
    } catch (err) {
      setError('Ein Fehler ist aufgetreten. Bitte versuche es erneut.')
    } finally {
      setLoading(false)
    }
  }

  const handleStripePayment = async () => {
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/payment/create-stripe-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: product.price,
          currency: product.currency,
          productName: product.name
        }),
      })

      const data = await response.json()

      if (response.ok && data.url) {
        // Weiterleitung zu Stripe Checkout
        window.location.href = data.url
      } else {
        setError('Fehler bei der Kreditkarten-Zahlung. Bitte versuche es erneut.')
      }
    } catch (err) {
      setError('Ein Fehler ist aufgetreten. Bitte versuche es erneut.')
    } finally {
      setLoading(false)
    }
  }

  const handlePayment = () => {
    if (paymentMethod === 'paypal') {
      handlePayPalPayment()
    } else {
      handleStripePayment()
    }
  }

  return (
    <>
      <Head>
        <title>Checkout - {product.name}</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <Link href="/" className="text-xl font-bold text-gray-900">
                ← Zurück
              </Link>
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left Side - Product Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Deine Bestellung
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-900">{product.name}</h3>
                    <p className="text-sm text-gray-600">{product.description}</p>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span>Gesamt:</span>
                    <span className="text-2xl text-green-600">
                      {product.price.toFixed(2)} {product.currency}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-gray-700">
                    <p className="font-semibold mb-1">Was du erhältst:</p>
                    <ul className="space-y-1">
                      <li>✓ Sofortiger Zugang nach Zahlung</li>
                      <li>✓ Lebenslanger Zugriff</li>
                      <li>✓ Alle Updates inklusive</li>
                      <li>✓ 30 Tage Geld-zurück-Garantie</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start">
                  <Shield className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-700">
                    <strong>Sichere Zahlung.</strong> Deine Zahlungsinformationen werden 
                    verschlüsselt übertragen und nicht auf unseren Servern gespeichert.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Right Side - Payment Methods */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Zahlungsmethode wählen
              </h2>

              <div className="space-y-4 mb-6">
                {/* PayPal Option */}
                <label
                  className={`
                    flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all
                    ${paymentMethod === 'paypal' 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                    }
                  `}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="paypal"
                    checked={paymentMethod === 'paypal'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-5 h-5 text-blue-600"
                  />
                  <div className="ml-4 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-gray-900">PayPal</span>
                      <svg className="h-6" viewBox="0 0 101 32" fill="none">
                        <path d="M12.237 2.8h8.219c3.895 0 6.917 3.022 6.917 6.917 0 3.895-3.022 6.917-6.917 6.917h-4.087l-1.358 8.219H9.215L12.237 2.8z" fill="#003087"/>
                        <path d="M35.632 2.8h8.219c3.895 0 6.917 3.022 6.917 6.917 0 3.895-3.022 6.917-6.917 6.917h-4.087l-1.358 8.219H32.61L35.632 2.8z" fill="#009cde"/>
                      </svg>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      Schnell und sicher mit PayPal bezahlen
                    </p>
                  </div>
                </label>

                {/* Credit Card Option */}
                <label
                  className={`
                    flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all
                    ${paymentMethod === 'card' 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                    }
                  `}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={paymentMethod === 'card'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-5 h-5 text-blue-600"
                  />
                  <div className="ml-4 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-gray-900">Kreditkarte</span>
                      <div className="flex space-x-2">
                        <CreditCard className="w-6 h-6 text-gray-400" />
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      Visa, Mastercard, American Express
                    </p>
                  </div>
                </label>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 text-sm">
                  {error}
                </div>
              )}

              <button
                onClick={handlePayment}
                disabled={loading}
                className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold py-4 rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Wird verarbeitet...
                  </span>
                ) : (
                  `Jetzt kaufen für ${product.price.toFixed(2)} ${product.currency}`
                )}
              </button>

              <p className="text-xs text-gray-500 text-center mt-4">
                Mit dem Kauf akzeptierst du unsere{' '}
                <Link href="/agb" className="text-blue-600 hover:underline">
                  AGB
                </Link>{' '}
                und{' '}
                <Link href="/datenschutz" className="text-blue-600 hover:underline">
                  Datenschutzerklärung
                </Link>
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  )
}
