import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Heart, Leaf, Menu, X } from 'lucide-react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <>
      <Head>
        <title>Minimalismus & bewusstes Leben | Dein Weg zu mehr Leichtigkeit</title>
        <meta name="description" content="Entdecke, wie Minimalismus und Achtsamkeit dein Leben leichter machen. Starte mit unserem kostenlosen Guide zu mehr Bewusstsein und Klarheit." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-white">
        {/* Header */}
        <header className="bg-white border-b border-gray-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <Link href="/" className="flex items-center">
                <Image 
                  src="/logo.svg" 
                  alt="Einfach bewusster leben" 
                  width={32} 
                  height={32} 
                  className="mr-2"
                />
                <span className="text-xl font-light tracking-wide text-gray-900">
                  Einfach bewusster leben
                </span>
              </Link>
              
              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center space-x-8">
                <Link href="/freebie" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Kostenloser Guide
                </Link>
                <Link href="/about" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  About me
                </Link>
                <Link href="/login" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Login
                </Link>
                <Link href="/datenschutz" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Datenschutz
                </Link>
                <Link href="/impressum" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Impressum
                </Link>
              </nav>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors"
                aria-label="Menu"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

            {/* Mobile Navigation */}
            {mobileMenuOpen && (
              <motion.nav
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="md:hidden py-4 border-t border-gray-100"
              >
                <div className="flex flex-col space-y-4">
                  <Link 
                    href="/freebie" 
                    className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Kostenloser Guide
                  </Link>
                  <Link 
                    href="/about" 
                    className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    About me
                  </Link>
                  <Link 
                    href="/login" 
                    className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link 
                    href="/datenschutz" 
                    className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Datenschutz
                  </Link>
                  <Link 
                    href="/impressum" 
                    className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Impressum
                  </Link>
                </div>
              </motion.nav>
            )}
          </div>
        </header>

        {/* Hero Section */}
        <section className="relative py-20 md:py-32 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Einfach. Bewusst. Leben.
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 font-light mb-4">
                <strong>Einfachbewussterleben</strong> ist ein Platz für Achtsamkeit, Klarheit und einen bewussten Weg hin zu mehr Einfachheit (innerlich &amp; äußerlich)
              </p>
            </motion.div>
            
            <motion.p 
              className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Ein sanfter Einstieg in das Thema Minimalismus, bewusstes Loslassen und einem achtsameren Umgang mit Konsum. 
              In diesem Guide findest Du kleine Ausmist-Impulse mit Reflexionsfragen und alltagstauglichen Übungen, die dir helfen Klarheit im Außen und Innen zu schaffen.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Link 
                href="/freebie"
                className="inline-flex items-center px-8 py-4 bg-gray-900 text-white text-lg font-light rounded-sm hover:bg-gray-800 transition-colors"
              >
                Kostenlosen Guide sichern
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Image Section */}
        <section className="py-12 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="relative h-64 md:h-96 rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/homepage_hero.png"
                alt="Minimalistisches Zuhause"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
            </div>
          </div>
        </section>

        {/* Quote Section */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-8 text-center">
              Achtsamkeit ist der Anfang von allem.
            </h2>
            <p className="text-lg text-gray-600 mb-12 text-center leading-relaxed max-w-3xl mx-auto">
              Wenn du lernst wirklich präsent zu sein, erkennst du, was dir gut tut und was dir nur Energie raubt. 
              Genau hier hat mein persönlicher Weg zum Minimalismus begonnen. Minimalismus bedeutet nicht weniger um jeden Preis sondern mehr Raum für das Wesentliche.
            </p>
          </div>
        </section>

        {/* Feature Boxes Section */}
        <section className="py-20 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 mb-4 flex items-center justify-center bg-gray-100 rounded-full shadow-sm">
                  <Sparkles className="w-8 h-8 text-gray-700" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-normal text-gray-900 mb-3">Raum für dich</h3>
                <p className="text-gray-600 leading-relaxed">
                  Mit jedem bewussten Schritt entsteht Klarheit und Leichtigkeit.
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 mb-4 flex items-center justify-center bg-gray-100 rounded-full shadow-sm">
                  <Heart className="w-8 h-8 text-gray-700" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-normal text-gray-900 mb-3">Weniger Zeug. Mehr Du.</h3>
                <p className="text-gray-600 leading-relaxed">
                  Wenn Du beginnst, Dinge loszulassen, entsteht Raum für Klarheit, für Zeit und für das, was dir wirklich wichtig ist.
                </p>
              </div>
            </div>

            <p className="text-lg text-gray-600 mt-12 text-center leading-relaxed max-w-3xl mx-auto">
              Loslassen, Ausmisten und Achtsamkeit kann Menschen helfen sich von materiellem Ballast zu befreien, Klarheit im Leben zu schaffen und bewusster im Moment zu leben. Genau dabei begleite ich Dich: Schritt für Schritt.
            </p>
          </div>
        </section>

        {/* Courses Section */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-2 text-center">
              Meine weiterführenden Inhalte für ein bewusstes Leben
            </h2>
            <p className="text-base text-gray-500 mb-12 text-center">
              so kann ich dich begleiten
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Videokurs */}
              <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
                <span className="inline-block text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">Videokurs mit Bonusmaterial und Checklisten</span>
                <h3 className="text-xl font-bold mb-2">Der Einstieg in ein leichtes Leben</h3>
                <p className="text-sm text-gray-600 mb-6">Loslassen - die stille Wirkung von Ballast</p>
                <Link 
                  href="/checkout?courseId=1&courseName=Der+Einstieg+in+ein+leichtes+Leben&price=49&description=Videokurs+mit+Bonusmaterial+und+Checklisten&duration=3+Stunden&modules=3&lessons=6"
                  className="w-full bg-gray-900 text-white py-3 rounded-lg hover:bg-gray-800 transition text-center block"
                >
                  Jetzt anmelden
                </Link>
              </div>

              {/* Ebook 1 */}
              <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
                <span className="inline-block text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">Ebook</span>
                <h3 className="text-xl font-bold mb-2">Reset für Körper und Geist: Die Stoffwechselkur</h3>
                <p className="text-sm text-gray-600 mb-6">&nbsp;</p>
                <Link 
                  href="/checkout?courseId=2&courseName=Reset+für+Körper+und+Geist&price=29&description=Ebook+Stoffwechselkur"
                  className="w-full bg-gray-900 text-white py-3 rounded-lg hover:bg-gray-800 transition text-center block"
                >
                  Jetzt anmelden
                </Link>
              </div>

              {/* Ebook 2 - demnächst */}
              <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow opacity-75">
                <span className="inline-block text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">Ebook</span>
                <h3 className="text-xl font-bold mb-2">Bewusster leben durch achtsames Essen</h3>
                <p className="text-sm text-gray-400 mb-6">demnächst verfügbar</p>
                <button 
                  disabled
                  className="w-full bg-gray-300 text-gray-500 py-3 rounded-lg cursor-not-allowed"
                >
                  Demnächst verfügbar
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-gray-900 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-light mb-6">
              Bist Du bereit?
            </h2>
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              Starte jetzt mit unserem kostenlosen Guide zu mehr Bewusstsein und Klarheit in deinem Leben.
            </p>
            <Link 
              href="/freebie"
              className="inline-flex items-center bg-gray-50 text-gray-900 font-light px-8 py-4 rounded-full hover:bg-gray-100 transition-all hover:shadow-lg"
            >
              Ja, ich bin bereit!
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-100 py-12">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm text-gray-600 mb-4 md:mb-0">
                © 2026 Einfach bewusster leben. Alle Rechte vorbehalten.
              </p>
              <div className="flex space-x-6">
                <Link href="/datenschutz" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Datenschutz
                </Link>
                <Link href="/impressum" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Impressum
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
