import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, Download, Mail } from 'lucide-react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function PaymentSuccess() {
  const router = useRouter()
  const { session_id, orderId } = router.query

  useEffect(() => {
    // Hier können Sie zusätzliche Logik hinzufügen:
    // - Bestellung bestätigen
    // - E-Mail senden
    // - Analytics tracken
    if (session_id || orderId) {
      console.log('Payment successful:', { session_id, orderId })
    }
  }, [session_id, orderId])

  return (
    <>
      <Head>
        <title>Zahlung erfolgreich - Vielen Dank!</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle className="w-16 h-16 text-green-600" />
          </motion.div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Zahlung erfolgreich! 🎉
          </h1>
          
          <p className="text-lg text-gray-600 mb-8">
            Vielen Dank für deinen Kauf. Deine Bestellung wurde erfolgreich abgeschlossen.
          </p>

          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center justify-center">
              <Mail className="w-5 h-5 mr-2" />
              Was passiert jetzt?
            </h3>
            <div className="text-left space-y-3">
              <div className="flex items-start">
                <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center flex-shrink-0 mr-3 mt-0.5">
                  1
                </div>
                <p className="text-gray-700">
                  Du erhältst in wenigen Minuten eine Bestätigungs-E-Mail mit allen Details
                </p>
              </div>
              <div className="flex items-start">
                <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center flex-shrink-0 mr-3 mt-0.5">
                  2
                </div>
                <p className="text-gray-700">
                  Deine Zugangsdaten werden dir per E-Mail zugeschickt
                </p>
              </div>
              <div className="flex items-start">
                <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center flex-shrink-0 mr-3 mt-0.5">
                  3
                </div>
                <p className="text-gray-700">
                  Du kannst sofort mit deinem Kurs/Produkt starten
                </p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <p className="text-sm text-gray-700">
              <strong>Keine E-Mail erhalten?</strong> Überprüfe bitte deinen Spam-Ordner 
              oder kontaktiere uns unter <a href="mailto:support@deinewebsite.de" className="text-blue-600 hover:underline">support@deinewebsite.de</a>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/"
              className="inline-block bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold px-8 py-3 rounded-lg hover:shadow-lg transition-all"
            >
              Zurück zur Startseite
            </Link>
            <a 
              href="mailto:support@deinewebsite.de"
              className="inline-block bg-white border-2 border-gray-300 text-gray-700 font-semibold px-8 py-3 rounded-lg hover:border-gray-400 transition-all"
            >
              Support kontaktieren
            </a>
          </div>
        </motion.div>
      </div>
    </>
  )
}
