import { motion } from 'framer-motion'
import { 
  XCircle, 
  ArrowLeft,
  MessageCircle,
  Phone,
  Mail,
  Home
} from 'lucide-react'
import Head from 'next/head'
import Link from 'next/link'

export default function Cancel() {
  return (
    <>
      <Head>
        <title>Bestellung abgebrochen - CRM Funnel</title>
        <meta name="description" content="Deine Bestellung wurde abgebrochen. Du kannst es jederzeit erneut versuchen." />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <Link href="/">
                <div className="flex items-center text-red-600 hover:text-red-800 transition-colors">
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  <span className="font-semibold">Zurück zur Startseite</span>
                </div>
              </Link>
              
              <h1 className="text-2xl font-bold text-gray-900">Bestellung abgebrochen</h1>
              
              <div className="w-20"></div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <XCircle className="w-10 h-10 text-red-600" />
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Deine Bestellung wurde
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600">
                  {' '}abgebrochen
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-8">
                Kein Problem! Du kannst es jederzeit erneut versuchen. 
                Falls du Fragen oder Bedenken hast, helfen wir dir gerne weiter.
              </p>
            </motion.div>

            {/* Why Cancel Section */}
            <motion.div 
              className="bg-white rounded-2xl shadow-lg p-8 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Gab es ein Problem?
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="font-bold text-gray-900 mb-3">🔧 Technische Probleme?</h3>
                  <p className="text-gray-600 mb-4">
                    Manchmal kann es zu technischen Schwierigkeiten kommen. 
                    Unser Team hilft dir schnell weiter.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Zahlungsfehler</li>
                    <li>• Seite nicht geladen</li>
                    <li>• Formularprobleme</li>
                  </ul>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="font-bold text-gray-900 mb-3">💰 Bedenken bei der Zahlung?</h3>
                  <p className="text-gray-600 mb-4">
                    Wir verstehen, dass Investitionsentscheidungen Zeit brauchen. 
                    Lass uns gemeinsam die passende Lösung finden.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Ratenzahlung möglich</li>
                    <li>• 30-Tage-Garantie</li>
                    <li>• Kostenlose Beratung</li>
                  </ul>
                </div>
              </div>

              <div className="text-center">
                <h3 className="font-bold text-gray-900 mb-4">Wie können wir helfen?</h3>
                <p className="text-gray-600 mb-6">
                  Wähle die für dich passende Kontaktmethode:
                </p>
                
                <div className="grid md:grid-cols-3 gap-4">
                  <a 
                    href="tel:+49123456789"
                    className="flex items-center justify-center p-4 bg-green-100 hover:bg-green-200 rounded-lg transition-colors"
                  >
                    <Phone className="w-5 h-5 text-green-600 mr-2" />
                    <div className="text-left">
                      <div className="font-semibold text-green-900">Telefon</div>
                      <div className="text-sm text-green-700">+49 123 456789</div>
                    </div>
                  </a>
                  
                  <a 
                    href="mailto:support@crm-funnel.de"
                    className="flex items-center justify-center p-4 bg-blue-100 hover:bg-blue-200 rounded-lg transition-colors"
                  >
                    <Mail className="w-5 h-5 text-blue-600 mr-2" />
                    <div className="text-left">
                      <div className="font-semibold text-blue-900">E-Mail</div>
                      <div className="text-sm text-blue-700">support@crm-funnel.de</div>
                    </div>
                  </a>
                  
                  <a 
                    href="https://wa.me/49123456789?text=Ich%20habe%20eine%20Frage%20zu%20meiner%20Bestellung"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center p-4 bg-green-100 hover:bg-green-200 rounded-lg transition-colors"
                  >
                    <MessageCircle className="w-5 h-5 text-green-600 mr-2" />
                    <div className="text-left">
                      <div className="font-semibold text-green-900">WhatsApp</div>
                      <div className="text-sm text-green-700">Live Chat</div>
                    </div>
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Alternative Options */}
            <motion.div 
              className="bg-orange-50 rounded-xl p-6 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="font-bold text-orange-900 mb-4">
                🎁 Alternative Optionen
              </h3>
              <div className="space-y-3 text-orange-800">
                <p>
                  <strong>Kostenloser Einstieg:</strong> Beginne mit unserem kostenlosen Starter-Paket 
                  und Upgrade später, wenn du zufrieden bist.
                </p>
                <p>
                  <strong>Testperiode:</strong> Nutze unsere 14-tägige Testversion ohne Risiko.
                </p>
                <p>
                  <strong>Gruppenrabatt:</strong> Frag nach unseren Sonderkonditionen für Teams.
                </p>
              </div>
            </motion.div>

            {/* Call to Action */}
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Bist du bereit, es erneut zu versuchen?
              </h3>
              <p className="text-gray-600 mb-6">
                Wir sind hier, um dir den bestmöglichen Service zu bieten.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <Link href="/produkte">
                  <button className="inline-flex items-center justify-center px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg transition-colors">
                    Produkte erneut ansehen
                  </button>
                </Link>
                
                <Link href="/">
                  <button className="inline-flex items-center justify-center px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg transition-colors">
                    <Home className="w-5 h-5 mr-2" />
                    Zur Startseite
                  </button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-8">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <p>&copy; 2024 CRM Funnel. Alle Rechte vorbehalten.</p>
            <p className="mt-2 text-gray-400">
              Wir helfen dir gerne weiter - zögere nicht, uns zu kontaktieren!
            </p>
          </div>
        </footer>
      </div>
    </>
  )
}
