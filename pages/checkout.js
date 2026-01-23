'use client'

import { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, CreditCard, ShieldCheck, CheckCircle, Clock, BookOpen, User } from 'lucide-react'

export default function CourseCheckout() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  // Get course data from query params
  const course = {
    id: router.query.courseId || '',
    name: router.query.courseName || 'Kurs',
    price: parseFloat(router.query.price) || 0,
    description: router.query.description || '',
    duration: router.query.duration || '',
    modules: parseInt(router.query.modules) || 0,
    lessons: parseInt(router.query.lessons) || 0,
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
          amount: course.price,
          currency: 'EUR',
          description: `Kurs: ${course.name}`,
          courseId: course.id,
          courseName: course.name,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Fehler bei der Zahlung')
      }

      // Redirect to PayPal
      window.location.href = data.approveLink

    } catch (error) {
      console.error('Payment error:', error)
      setError(error.message || 'Ein Fehler ist aufgetreten. Bitte versuche es erneut.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-light text-gray-900 mb-2">
            Zahlung erfolgreich!
          </h1>
          <p className="text-gray-600 mb-6">
            Du erhältst in Kürze eine E-Mail mit deinen Zugangsdaten.
          </p>
          <Link
            href="/"
            className="inline-flex items-center bg-gray-900 text-white font-light px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors"
          >
            Zur Startseite
          </Link>
        </div>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>Kurs Checkout - Einfach bewusster leben</title>
        <meta name="description" content="Kaufe deinen Kurs bei Einfach bewusster leben" />
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
                <span>Zurück</span>
              </Link>
            </div>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Course Details */}
            <div>
              <h1 className="text-3xl font-light text-gray-900 mb-8">
                Kurs Checkout
              </h1>

              <div className="bg-white rounded-2xl shadow-sm p-8 mb-6">
                <h2 className="text-xl font-normal text-gray-900 mb-4">
                  {course.name}
                </h2>
                
                {course.description && (
                  <p className="text-gray-600 mb-6">
                    {course.description}
                  </p>
                )}

                <div className="space-y-3 mb-6">
                  {course.modules > 0 && (
                    <div className="flex items-center text-gray-600">
                      <BookOpen className="w-5 h-5 mr-3" />
                      <span>{course.modules} Module</span>
                    </div>
                  )}
                  {course.lessons > 0 && (
                    <div className="flex items-center text-gray-600">
                      <User className="w-5 h-5 mr-3" />
                      <span>{course.lessons} Lektionen</span>
                    </div>
                  )}
                  {course.duration && (
                    <div className="flex items-center text-gray-600">
                      <Clock className="w-5 h-5 mr-3" />
                      <span>{course.duration}</span>
                    </div>
                  )}
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-light text-gray-900">Gesamtsumme</span>
                    <span className="text-2xl font-light text-gray-900">
                      €{course.price.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="bg-white rounded-2xl shadow-sm p-8">
                <h3 className="text-lg font-normal text-gray-900 mb-4">
                  Was du erhältst:
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Lebenslanger Zugang zum Kurs</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Sofortiger Start nach dem Kauf</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Video-Lektionen in HD-Qualität</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Downloadbare PDF-Materialien</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Fortschrittstracking</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Persönlicher Mitgliederbereich</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Payment */}
            <div>
              <div className="bg-white rounded-2xl shadow-sm p-8">
                <h3 className="text-xl font-normal text-gray-900 mb-6">
                  Zahlungsmethode
                </h3>

                {/* PayPal Payment */}
                <div className="mb-6">
                  <div className="bg-gray-50 rounded-lg p-6 text-center">
                    <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <CreditCard className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="text-lg font-normal text-gray-900 mb-2">
                      PayPal & Kreditkarte
                    </h4>
                    <p className="text-sm text-gray-600 mb-4">
                      Zahle sicher mit PayPal oder deiner Kreditkarte
                    </p>
                    <ul className="text-xs text-gray-500 space-y-1">
                      <li>• PayPal Account</li>
                      <li>• Visa, Mastercard, American Express</li>
                      <li>• Sofortige Aktivierung</li>
                    </ul>
                  </div>
                </div>

                {/* Security Notice */}
                <div className="flex items-center text-sm text-gray-600 mb-6">
                  <ShieldCheck className="w-4 h-4 mr-2 text-green-500" />
                  <span>Sichere Verschlüsselung • SSL-Zertifiziert</span>
                </div>

                {/* Error */}
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                    {error}
                  </div>
                )}

                {/* Pay Button */}
                <button
                  onClick={handlePayPalPayment}
                  disabled={loading || !course.price}
                  className="w-full bg-blue-600 text-white font-light py-4 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Wird verarbeitet...</span>
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-5 h-5" />
                      <span>Mit PayPal bezahlen</span>
                    </>
                  )}
                </button>

                <p className="text-xs text-gray-500 text-center mt-4">
                  Nach der Zahlung erhältst du sofortige Zugangsdaten per E-Mail
                </p>
              </div>

              {/* Money Back Guarantee */}
              <div className="bg-green-50 rounded-2xl p-6 mt-6">
                <div className="flex items-center mb-2">
                  <ShieldCheck className="w-5 h-5 text-green-600 mr-2" />
                  <h4 className="font-normal text-gray-900">14 Tage Geld-zurück-Garantie</h4>
                </div>
                <p className="text-sm text-gray-600">
                  Nicht zufrieden? Du erhältst dein Geld zurück - keine Fragen gestellt.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
