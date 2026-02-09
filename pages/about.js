import { useState } from 'react'
import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'

export default function About() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <>
      <Head>
        <title>About me - Einfach bewusster leben</title>
        <meta name="description" content="Erfahre mehr über meinen persönlichen Weg zum Minimalismus und bewusstem Leben." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
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
                <Link href="/about" className="text-sm text-gray-900 font-medium transition-colors">
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
                    className="text-sm text-gray-900 font-medium transition-colors"
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

        {/* About Content */}
        <section className="py-16 md:py-24 px-4">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Photo */}
              <div className="relative w-48 h-48 md:w-64 md:h-64 mx-auto mb-12 rounded-full overflow-hidden shadow-xl">
                <Image
                  src="/stefanie.jpg"
                  alt="Stefanie"
                  fill
                  className="object-cover"
                />
              </div>

              <h1 className="text-3xl md:text-4xl font-light text-gray-900 mb-12 text-center">
                About me
              </h1>

              <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
                <p>
                  2024 begann für mich mit einer leisen, aber tiefgehenden Veränderung. 
                  Ich fing an auszumisten – und zwar nicht nur Schränke und Schubladen, 
                  sondern auch Gedanken, Gewohnheiten und Überzeugungen.
                </p>

                <p>
                  Dabei stellten sich mir immer wieder die selben Fragen:
                </p>

                <p className="text-gray-900 font-medium italic text-xl">
                  Was ist wirklich wichtig?<br />
                  Wie viel Zeit bleibt uns?<br />
                  Wie gut fühlt es sich an, wenn äußere Ordnung innere Klarheit schafft?
                </p>

                <p>
                  Minimalismus wurde für mich schnell mehr als nur Ordnung schaffen.
                </p>

                <p>
                  Im November 2024 bekam diese Reise eine neue Tiefe. 
                  Eine große Hautkrebswunde auf meiner Stirn konfrontierte mich sehr direkt 
                  mit meiner Verletzlichkeit. 
                  Gespräche mit meiner Ärztin über krebserregende und hormonell wirksame 
                  Stoffe in Alltagsprodukten öffneten mir die Augen.
                </p>

                <p>
                  Plötzlich wurde mir bewusst, wie sehr wir im Alltag Dinge akzeptieren, ohne 
                  sie zu hinterfragen – und welchen Preis das haben kann. 
                  Meine Einstellung zu Konsum veränderte sich grundlegend.
                </p>

                <p>
                  Ich begann eine Ausbildung zur Trainerin für Achtsamkeit & 
                  Stressbewältigung nach MBSR (mindfulness based stress reduction), suchte 
                  nach cleanen, unbedenklichen Produkten für mich und meine Familie und 
                  hinterfragte konsequent alles, was ich täglich nutzte. Zudem wurde achtsames 
                  Essen und eine gesunde Ernährung ein selbstverständlicher Teil meines 
                  Alltags. Durch die Stoffwechselkur lernte ich, meinen Körper wieder bewusster 
                  wahrzunehmen und auf seine echten Bedürfnisse zu hören.
                </p>

                <p>
                  Heute beschäftige ich mich nur noch mit dem, was mir wirklich wichtig ist:
                </p>

                <p className="text-gray-900 font-medium text-xl">
                  Bewusst leben.<br />
                  Achtsam wählen.<br />
                  Weniger besitzen – dafür aber mehr spüren.
                </p>

                <p>
                  Minimalismus bedeutet für mich Freiheit – und das im Außen und besonders im 
                  Inneren.
                </p>

                <p>
                  Dieser Guide ist aus genau diesem Weg entstanden. 
                  Nicht aus Perfektion – sondern aus Erfahrung und aus der Überzeugung heraus, 
                  dass ein bewusstes Leben leicht sein darf.
                </p>
              </div>

              {/* CTA */}
              <div className="mt-16 text-center">
                <Link 
                  href="/freebie"
                  className="inline-flex items-center px-8 py-4 bg-gray-900 text-white text-lg font-light rounded-sm hover:bg-gray-800 transition-colors"
                >
                  Kostenlosen Guide sichern
                </Link>
              </div>
            </motion.div>
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
