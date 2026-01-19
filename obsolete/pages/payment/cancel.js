import { motion } from 'framer-motion'
import { XCircle, ArrowLeft } from 'lucide-react'
import Head from 'next/head'
import Link from 'next/link'

export default function PaymentCancel() {
  return (
    <>
      <Head>
        <title>Zahlung abgebrochen</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <XCircle className="w-16 h-16 text-gray-600" />
          </motion.div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Zahlung abgebrochen
          </h1>
          
          <p className="text-lg text-gray-600 mb-8">
            Deine Zahlung wurde abgebrochen. Es wurde kein Betrag abgebucht.
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <p className="text-gray-700 mb-4">
              Möchtest du den Kauf zu einem späteren Zeitpunkt abschließen? 
              Dein Warenkorb bleibt gespeichert.
            </p>
            <p className="text-sm text-gray-600">
              Bei Fragen oder Problemen stehen wir dir gerne zur Verfügung.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/payment/checkout"
              className="inline-flex items-center justify-center bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold px-8 py-3 rounded-lg hover:shadow-lg transition-all"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Zurück zur Kasse
            </Link>
            <Link 
              href="/"
              className="inline-block bg-white border-2 border-gray-300 text-gray-700 font-semibold px-8 py-3 rounded-lg hover:border-gray-400 transition-all"
            >
              Zur Startseite
            </Link>
          </div>
        </motion.div>
      </div>
    </>
  )
}
