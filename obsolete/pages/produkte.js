import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  ArrowLeft, 
  CheckCircle, 
  Star, 
  ShoppingCart,
  Package,
  Zap,
  Shield,
  TrendingUp
} from 'lucide-react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import FunnelStepper from '../components/FunnelStepper'
import UtmBanner from '../components/UtmBanner'

function writeDemoEvent(type, payload) {
  if (typeof window === 'undefined') return
  const key = 'crm_funnel_demo_events'
  const events = JSON.parse(localStorage.getItem(key) || '[]')
  const id = (globalThis.crypto?.randomUUID?.() || String(Date.now()))
  events.unshift({ id, ts: new Date().toISOString(), type, payload })
  localStorage.setItem(key, JSON.stringify(events.slice(0, 200)))
}

function writeDemoLead(lead) {
  if (typeof window === 'undefined') return
  const key = 'crm_funnel_demo_leads'
  const leads = JSON.parse(localStorage.getItem(key) || '[]')
  const id = (globalThis.crypto?.randomUUID?.() || String(Date.now()))
  leads.unshift({ id, createdAt: new Date().toISOString(), ...lead })
  localStorage.setItem(key, JSON.stringify(leads.slice(0, 200)))
}

export default function Produkte() {
  const router = useRouter()
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    product: ''
  })

  const products = [
    {
      id: 'starter',
      name: 'Starter Paket',
      price: '97€',
      description: 'Perfekt für den Einstieg',
      features: [
        'Grundlegende Produkte',
        'E-Mail Support',
        '30 Tage Testphase',
        'Schnellstart Guide'
      ],
      icon: Package,
      color: 'from-blue-500 to-blue-600',
      popular: false
    },
    {
      id: 'professional',
      name: 'Professional Paket',
      price: '297€',
      description: 'Für ambitionierte Anwender',
      features: [
        'Alle Starter Funktionen',
        'Erweiterte Tools',
        'Priorität Support',
        'Zusätzliche Ressourcen',
        'Community Zugang'
      ],
      icon: Zap,
      color: 'from-green-500 to-green-600',
      popular: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise Paket',
      price: '997€',
      description: 'Maximale Leistung für Profis',
      features: [
        'Alle Professional Funktionen',
        'Premium Support',
        'Individuelle Anpassungen',
        '1-on-1 Coaching',
        'Exklusive Inhalte',
        'API Zugang'
      ],
      icon: Shield,
      color: 'from-purple-500 to-purple-600',
      popular: false
    }
  ]

  const handleProductSelect = (product) => {
    setSelectedProduct(product.id)
    setFormData({ ...formData, product: product.name })
    writeDemoEvent('pathway_selected', { pathway: 'products', offer: product.name, price: product.price })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          source: 'products',
          timestamp: new Date().toISOString()
        })
      })

      if (response.ok) {
        const chosen = products.find(p => p.id === selectedProduct)
        const amount = chosen?.id === 'starter' ? 97 : chosen?.id === 'professional' ? 297 : chosen?.id === 'enterprise' ? 997 : 197

        writeDemoLead({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          source: 'products',
          product: formData.product,
          offer: formData.product,
        })
        writeDemoEvent('form_submitted', { pathway: 'products', offer: formData.product, email: formData.email })

        await router.push(`/checkout?demo=1&source=products&offer=${encodeURIComponent(formData.product)}&amount=${encodeURIComponent(String(amount))}&name=${encodeURIComponent(formData.name)}&email=${encodeURIComponent(formData.email)}`)
      }
    } catch (error) {
      alert('Fehler: Bitte versuchen Sie es später erneut.')
    }
  }

  return (
    <>
      <Head>
        <title>Produkte - CRM Funnel</title>
        <meta name="description" content="Entdecke unsere Produkte und finde die perfekte Lösung für dich" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <UtmBanner />
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <Link href="/">
                <div className="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  <span className="font-semibold">Zurück</span>
                </div>
              </Link>
              
              <h1 className="text-2xl font-bold text-gray-900">Produktinformationen</h1>
              
              <Link href="/demo/crm" className="text-sm font-semibold text-blue-600 hover:text-blue-800">Demo CRM</Link>
            </div>
          </div>
        </header>

        <div className="max-w-6xl mx-auto px-4 pt-6">
          <FunnelStepper steps={["Auswahl", "Daten", "Checkout"]} currentStep={selectedProduct ? 2 : 1} />
        </div>

        {/* Hero Section */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Die richtigen Produkte für deinen
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                {' '}Erfolg
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-xl text-gray-600 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Wähle das Paket, das am besten zu deinen Zielen und Bedürfnissen passt.
            </motion.p>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {products.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  className="relative"
                >
                  {product.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                      <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                        Beliebt
                      </span>
                    </div>
                  )}
                  
                  <div className={`
                    bg-white rounded-2xl shadow-lg p-8 h-full
                    transform transition-all duration-300 hover:scale-105 hover:shadow-2xl
                    ${selectedProduct === product.id ? 'ring-4 ring-blue-400' : ''}
                    ${product.popular ? 'border-2 border-orange-200' : ''}
                  `}>
                    <div className={`w-16 h-16 bg-gradient-to-br ${product.color} rounded-xl flex items-center justify-center mx-auto mb-6`}>
                      <product.icon className="w-8 h-8 text-white" />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-900 mb-2 text-center">
                      {product.name}
                    </h3>
                    
                    <div className="text-center mb-4">
                      <span className="text-3xl font-bold text-gray-900">{product.price}</span>
                    </div>
                    
                    <p className="text-gray-600 text-center mb-6">
                      {product.description}
                    </p>
                    
                    <ul className="space-y-3 mb-8">
                      {product.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <button
                      onClick={() => handleProductSelect(product)}
                      className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200 ${
                        selectedProduct === product.id
                          ? 'bg-green-500 hover:bg-green-600 text-white'
                          : `bg-gradient-to-r ${product.color} hover:opacity-90 text-white`
                      }`}
                    >
                      {selectedProduct === product.id ? 'Ausgewählt' : 'Dieses Paket wählen'}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form */}
        {selectedProduct && (
          <motion.section 
            className="py-16 px-4 bg-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Fast geschafft!
                </h2>
                <p className="text-gray-600">
                  Gib deine Daten ein und wir senden dir alle Informationen zum {
                    products.find(p => p.id === selectedProduct)?.name
                  }.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Vollständiger Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="form-input"
                    placeholder="Max Mustermann"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    E-Mail Adresse *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="form-input"
                    placeholder="max@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Telefonnummer (optional)
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="form-input"
                    placeholder="+49 123 456789"
                  />
                </div>

                <button
                  type="submit"
                  className="form-button flex items-center justify-center"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Informationen anfordern
                </button>
              </form>

              <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                <div className="flex items-start">
                  <Shield className="w-5 h-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-blue-800">
                    <strong>Datenschutz:</strong> Deine Daten werden sicher behandelt und nur zur Verarbeitung deiner Anfrage verwendet. Du kannst dich jederzeit abmelden.
                  </div>
                </div>
              </div>
            </div>
          </motion.section>
        )}

        {/* Benefits Section */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Warum Tausende uns vertrauen
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-yellow-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">4.9/5 Sterne</h3>
                <p className="text-gray-600">Zufriedene Kunden bewerten uns exzellent</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">98% Erfolgsquote</h3>
                <p className="text-gray-600">Unsere Kunden erreichen ihre Ziele</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Package className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">30 Tage Garantie</h3>
                <p className="text-gray-600">Zufriedenheit oder Geld zurück</p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-8">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <p>&copy; 2024 CRM Funnel. Alle Rechte vorbehalten.</p>
          </div>
        </footer>
      </div>
    </>
  )
}
