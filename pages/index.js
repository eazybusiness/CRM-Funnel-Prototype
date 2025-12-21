import { useState } from 'react'
import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Package, 
  GraduationCap, 
  Briefcase, 
  ArrowRight
} from 'lucide-react'
import Head from 'next/head'
import Link from 'next/link'
import UtmBanner from '../components/UtmBanner'

function writeDemoEvent(type, payload) {
  if (typeof window === 'undefined') return
  const key = 'crm_funnel_demo_events'
  const events = JSON.parse(localStorage.getItem(key) || '[]')
  const id = (globalThis.crypto?.randomUUID?.() || String(Date.now()))
  events.unshift({ id, ts: new Date().toISOString(), type, payload })
  localStorage.setItem(key, JSON.stringify(events.slice(0, 200)))
}

export default function Home() {
  const [selectedPath, setSelectedPath] = useState(null)

  const pathways = [
    {
      id: 'products',
      title: 'Produktinformationen',
      description: 'Entdecke unsere innovativen Produkte und ihre Vorteile',
      icon: Package,
      color: 'from-blue-500 to-blue-600',
      href: '/produkte'
    },
    {
      id: 'courses',
      title: 'Kurse & Workshops',
      description: 'Erlange neue Fähigkeiten durch unsere Schulungen',
      icon: GraduationCap,
      color: 'from-green-500 to-green-600',
      href: '/kurse'
    },
    {
      id: 'business',
      title: 'Business-Möglichkeiten',
      description: 'Erfahre mehr über unsere Geschäftschancen',
      icon: Briefcase,
      color: 'from-purple-500 to-purple-600',
      href: '/business'
    }
  ]

  useEffect(() => {
    writeDemoEvent('landing_page_visit', {
      path: '/',
      referrer: typeof document !== 'undefined' ? document.referrer : null
    })
  }, [])

  return (
    <>
      <Head>
        <title>CRM Funnel - Dein Weg zum Erfolg</title>
        <meta name="description" content="Entdecke Produkte, Kurse und Business-Möglichkeiten" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <UtmBanner />
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div className="flex items-center">
                <h1 className="text-2xl font-bold text-gray-900">CRM Funnel</h1>
              </div>

              <Link href="/demo/crm" className="text-sm font-semibold text-blue-600 hover:text-blue-800">
                Demo CRM Dashboard
              </Link>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1 
              className="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Willkommen auf deinem
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                {' '}Erfolgsweg
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Wähle den Weg, der am besten zu deinen Zielen passt. 
              Wir begleiten dich Schritt für Schritt zum Erfolg.
            </motion.p>
          </div>
        </section>

        {/* Selection Area */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Was interessiert dich am meisten?
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {pathways.map((path, index) => (
                <motion.div
                  key={path.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  onMouseEnter={() => setSelectedPath(path.id)}
                  onMouseLeave={() => setSelectedPath(null)}
                >
                  <Link href={path.href}>
                    <div className={`
                      relative bg-white rounded-2xl shadow-lg p-8 cursor-pointer
                      transform transition-all duration-300 hover:scale-105 hover:shadow-2xl
                      ${selectedPath === path.id ? 'ring-4 ring-blue-400' : ''}
                    `}>
                      {/* Gradient Overlay */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${path.color} opacity-0 rounded-2xl transition-opacity duration-300`} />
                      
                      {/* Content */}
                      <div className="relative z-10">
                        <div className={`w-16 h-16 bg-gradient-to-br ${path.color} rounded-xl flex items-center justify-center mb-6 mx-auto`}>
                          <path.icon className="w-8 h-8 text-white" />
                        </div>
                        
                        <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                          {path.title}
                        </h3>
                        
                        <p className="text-gray-600 text-center mb-6">
                          {path.description}
                        </p>
                        
                        <div className="flex items-center justify-center text-blue-600 font-semibold">
                          <span>Jetzt entdecken</span>
                          <ArrowRight className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </Link>
                  <button
                    type="button"
                    onClick={() => writeDemoEvent('pathway_selected', { pathway: path.id, href: path.href })}
                    className="sr-only"
                  >
                    Track
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Trust Indicators */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Warum uns vertrauen?
              </h3>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Package className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Qualitätsprodukte</h4>
                <p className="text-gray-600">Getestete und zertifizierte Lösungen</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <GraduationCap className="w-6 h-6 text-green-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Expertenschulungen</h4>
                <p className="text-gray-600">Von Profis für Profis entwickelt</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Briefcase className="w-6 h-6 text-purple-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Erfolgschancen</h4>
                <p className="text-gray-600">Bewährte Geschäftsmodelle</p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center">
              <h4 className="text-xl font-bold mb-4">Bereit für den nächsten Schritt?</h4>
              <p className="text-gray-400 mb-8">
                Wähle oben deinen Weg und starte heute deine Erfolgsgeschichte.
              </p>
            </div>
            
            <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
              <p>&copy; 2024 CRM Funnel. Alle Rechte vorbehalten.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
