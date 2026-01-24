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
              <h1 className="text-4xl md:text-6xl font-light text-gray-900 mb-6 leading-tight">
                Minimalismus, der wirklich zu Dir passt
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 font-light mb-4">
                im Alltag, Zuhause & im Kopf
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

        {/* Raum für Dich Section */}
        <section className="py-20 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-8 text-center">
              Raum für Dich
            </h2>
            <p className="text-lg text-gray-600 mb-12 text-center leading-relaxed">
              Stell dir vor, Du lebst in einer Umgebung, in der sich nur Deine Lieblingssachen befinden.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 mb-4 flex items-center justify-center bg-white rounded-full shadow-sm">
                  <Sparkles className="w-8 h-8 text-gray-700" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-normal text-gray-900 mb-3">Raum für Dich</h3>
                <p className="text-gray-600 leading-relaxed">
                  Schaffe Platz für das, was wirklich zählt. Weniger Ballast bedeutet mehr Freiheit 
                  und Energie für die Dinge, die dir wichtig sind.
                </p>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 mb-4 flex items-center justify-center bg-white rounded-full shadow-sm">
                  <Heart className="w-8 h-8 text-gray-700" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-normal text-gray-900 mb-3">Weniger Zeug. Mehr Du.</h3>
                <p className="text-gray-600 leading-relaxed">
                  Entdecke, wie du mit weniger Besitz mehr Lebensqualität gewinnst. 
                  Minimalismus ist keine Verzicht, sondern bewusste Entscheidung.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Weniger Zeug. Mehr Du. */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-light text-gray-900 mb-8 text-center">
              Weniger Zeug. Mehr Du.
            </h2>
            <p className="text-lg text-gray-600 mb-12 text-center leading-relaxed max-w-3xl mx-auto">
              Wenn Du beginnst, Dinge loszulassen, entsteht Raum – für Klarheit, für Zeit und für das, 
              was Dir wirklich wichtig ist. Genau dabei begleite ich Dich: Schritt für Schritt. 
              Mit Struktur. Ohne Druck. In Deinem Tempo.
            </p>

            <div className="space-y-8">
              <div className="border-l-2 border-gray-200 pl-6">
                <h3 className="text-xl font-normal text-gray-900 mb-2">Mehr Ordnung</h3>
                <p className="text-gray-600 leading-relaxed">
                  Wirkliche Ordnung entsteht nicht durch ständiges Aufräumen – sondern durch Loslassen. 
                  Wenn Du nur noch behältst, was Du wirklich brauchst und liebst, wird Dein Zuhause klarer, 
                  leichter, freier. Schritt für Schritt.
                </p>
              </div>

              <div className="border-l-2 border-gray-200 pl-6">
                <h3 className="text-xl font-normal text-gray-900 mb-2">Mehr Zeit</h3>
                <p className="text-gray-600 leading-relaxed">
                  Weniger Dinge bedeuten auch: weniger Entscheidungen, weniger Ablenkung, weniger Aufwand. 
                  So bleibt Dir mehr Zeit – für Dich, Deine Menschen und das, was Dir wirklich wichtig ist.
                </p>
              </div>

              <div className="border-l-2 border-gray-200 pl-6">
                <h3 className="text-xl font-normal text-gray-900 mb-2">Mehr Leichtigkeit</h3>
                <p className="text-gray-600 leading-relaxed">
                  Wenn nur noch Deine Lieblingsdinge bleiben, wird auch Dein Alltag leichter. 
                  Kein Ballast mehr, der Dich ausbremst. Kein schlechtes Gewissen im Regal. 
                  Sondern Raum – innen wie außen.
                </p>
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
