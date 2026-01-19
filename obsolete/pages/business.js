import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  ArrowLeft, 
  CheckCircle, 
  TrendingUp,
  DollarSign,
  Users,
  Globe,
  Target,
  Rocket,
  Building
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

export default function Business() {
  const router = useRouter()
  const [selectedPlan, setSelectedPlan] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    plan: '',
    currentSituation: '',
    goals: '',
    experience: 'none'
  })

  const businessPlans = [
    {
      id: 'partner',
      name: 'Partner Programm',
      price: '0€ Start',
      commission: '20% Provision',
      description: 'Verdiene durch Empfehlungen',
      features: [
        'Keine Startkosten',
        '20% Provision auf alle Verkäufe',
        'Marketing Materialien',
        'Partner Dashboard',
        'Monatliche Boni',
        'Community Support'
      ],
      icon: Users,
      color: 'from-blue-500 to-blue-600',
      popular: true
    },
    {
      id: 'franchise',
      name: 'Franchise Lizenz',
      price: '2.997€',
      potential: '5.000€/ Monat',
      description: 'Eigene Geschäftseinheit aufbauen',
      features: [
        'Exklusives Territorium',
        'Vollständiges Business System',
        'Intensive Schulung',
        'Marketing Budget',
        'Persönlicher Coach',
        'Niederlassungsrecht'
      ],
      icon: Building,
      color: 'from-green-500 to-green-600',
      popular: false
    },
    {
      id: 'master',
      name: 'Master Distributor',
      price: '9.997€',
      potential: '15.000€/ Monat',
      description: 'Maximale Verdienstmöglichkeiten',
      features: [
        'Mehrere Territorien',
        'Team Aufbau möglich',
        'Höchste Provisionsraten',
        'Equity Beteiligung',
        'Strategische Partnerschaft',
        'International Expansion'
      ],
      icon: Rocket,
      color: 'from-purple-500 to-purple-600',
      popular: false
    }
  ]

  const benefits = [
    {
      title: 'Flexibilität',
      description: 'Arbeite wann und wo du möchtest',
      icon: Globe
    },
    {
      title: 'Skalierbarkeit',
      description: 'Wachse nach deinem eigenen Tempo',
      icon: TrendingUp
    },
    {
      title: 'Unterstützung',
      description: 'Volles Team und Marketing Support',
      icon: Users
    },
    {
      title: 'Erfolgsmodell',
      description: 'Bewährtes System mit hoher Erfolgsquote',
      icon: Target
    }
  ]

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan.id)
    setFormData({ ...formData, plan: plan.name })
    writeDemoEvent('pathway_selected', { pathway: 'business', offer: plan.name, price: plan.price })
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
          source: 'business',
          timestamp: new Date().toISOString()
        })
      })

      if (response.ok) {
        const chosen = businessPlans.find(p => p.id === selectedPlan)
        const amount = chosen?.id === 'partner' ? 0 : chosen?.id === 'franchise' ? 2997 : chosen?.id === 'master' ? 9997 : 0

        writeDemoLead({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          source: 'business',
          plan: formData.plan,
          offer: formData.plan,
          currentSituation: formData.currentSituation,
          experience: formData.experience,
          goals: formData.goals,
        })
        writeDemoEvent('form_submitted', { pathway: 'business', offer: formData.plan, email: formData.email })

        await router.push(`/checkout?demo=1&source=business&offer=${encodeURIComponent(formData.plan)}&amount=${encodeURIComponent(String(amount))}&name=${encodeURIComponent(formData.name)}&email=${encodeURIComponent(formData.email)}`)
      }
    } catch (error) {
      alert('Fehler: Bitte versuchen Sie es später erneut.')
    }
  }

  return (
    <>
      <Head>
        <title>Business-Möglichkeiten - CRM Funnel</title>
        <meta name="description" content="Entdecke lukrative Business-Möglichkeiten und werde dein eigener Chef" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
        <UtmBanner />
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <Link href="/">
                <div className="flex items-center text-purple-600 hover:text-purple-800 transition-colors">
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  <span className="font-semibold">Zurück</span>
                </div>
              </Link>

              <h1 className="text-2xl font-bold text-gray-900">Business-Möglichkeiten</h1>

              <Link href="/demo/crm" className="text-sm font-semibold text-purple-700 hover:text-purple-900">Demo CRM</Link>
            </div>
          </div>
        </header>

        <div className="max-w-6xl mx-auto px-4 pt-6">
          <FunnelStepper steps={["Auswahl", "Daten", "Checkout"]} currentStep={selectedPlan ? 2 : 1} />
        </div>

        {/* Hero Section */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Werde dein eigener
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
                {' '}Chef
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-xl text-gray-600 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Nutze bewährte Geschäftsmodelle und erreiche finanzielle Unabhängigkeit.
            </motion.p>
          </div>
        </section>

        {/* Business Plans */}
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Wähle deinen Weg zum Erfolg
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {businessPlans.map((plan, index) => (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  className="relative"
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                      <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                        Empfohlen
                      </span>
                    </div>
                  )}
                  
                  <div className={`
                    bg-white rounded-2xl shadow-lg p-8 h-full
                    transform transition-all duration-300 hover:scale-105 hover:shadow-2xl
                    ${selectedPlan === plan.id ? 'ring-4 ring-purple-400' : ''}
                    ${plan.popular ? 'border-2 border-orange-200' : ''}
                  `}>
                    <div className={`w-16 h-16 bg-gradient-to-br ${plan.color} rounded-xl flex items-center justify-center mx-auto mb-6`}>
                      <plan.icon className="w-8 h-8 text-white" />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-900 mb-2 text-center">
                      {plan.name}
                    </h3>
                    
                    <div className="text-center mb-4">
                      <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
                      {plan.commission && (
                        <div className="text-green-600 font-semibold mt-1">{plan.commission}</div>
                      )}
                      {plan.potential && (
                        <div className="text-purple-600 font-semibold mt-1">Potenzial: {plan.potential}</div>
                      )}
                    </div>
                    
                    <p className="text-gray-600 text-center mb-6">
                      {plan.description}
                    </p>
                    
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-purple-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <button
                      onClick={() => handlePlanSelect(plan)}
                      className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200 ${
                        selectedPlan === plan.id
                          ? 'bg-purple-500 hover:bg-purple-600 text-white'
                          : `bg-gradient-to-r ${plan.color} hover:opacity-90 text-white`
                      }`}
                    >
                      {selectedPlan === plan.id ? 'Ausgewählt' : 'Diesen Plan wählen'}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Warum unser Modell funktioniert
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600">
                    {benefit.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Success Stories */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Erfolge unserer Partner
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                    <DollarSign className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Sarah M.</h4>
                    <p className="text-sm text-gray-600">Partner seit 6 Monaten</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "Ich habe in den ersten 3 Monaten bereits 4.500€ verdient. 
                  Das System funktioniert wirklich!"
                </p>
                <div className="mt-4 text-green-600 font-bold">
                  +4.500€ Umsatz
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <TrendingUp className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Thomas K.</h4>
                    <p className="text-sm text-gray-600">Franchise seit 1 Jahr</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "Als Franchise Partner habe ich mein eigenes Team aufgebaut 
                  und verdiene jetzt über 8.000€ pro Monat."
                </p>
                <div className="mt-4 text-blue-600 font-bold">
                  +8.000€/ Monat
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Registration Form */}
        {selectedPlan && (
          <motion.section 
            className="py-16 px-4 bg-gradient-to-r from-purple-50 to-indigo-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Starte deine Business-Karriere
                </h2>
                <p className="text-gray-600">
                  Fülle das Formular aus und wir melden uns innerhalb von 24 Stunden für ein persönliches Gespräch.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8">
                <div className="grid md:grid-cols-2 gap-6">
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
                </div>

                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Telefonnummer *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="form-input"
                    placeholder="+49 123 456789"
                  />
                </div>

                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Aktuelle Situation *
                  </label>
                  <select
                    value={formData.currentSituation}
                    onChange={(e) => setFormData({ ...formData, currentSituation: e.target.value })}
                    className="form-input"
                  >
                    <option value="">Bitte wählen</option>
                    <option value="employed">Angestellt</option>
                    <option value="selfemployed">Selbstständig</option>
                    <option value="unemployed">Arbeitssuchend</option>
                    <option value="student">Student</option>
                    <option value="other">Sonstiges</option>
                  </select>
                </div>

                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Business-Erfahrung *
                  </label>
                  <select
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    className="form-input"
                  >
                    <option value="none">Keine Erfahrung</option>
                    <option value="some">Einige Erfahrung</option>
                    <option value="experienced">Erfahren</option>
                    <option value="expert">Experte</option>
                  </select>
                </div>

                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Deine Ziele (optional)
                  </label>
                  <textarea
                    value={formData.goals}
                    onChange={(e) => setFormData({ ...formData, goals: e.target.value })}
                    className="form-input"
                    rows={3}
                    placeholder="Was möchtest du mit deinem Business erreichen?"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full mt-8 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-purple-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
                >
                  Gespräch vereinbaren
                </button>

                <div className="mt-6 p-4 bg-purple-50 rounded-lg">
                  <div className="flex items-start">
                    <Rocket className="w-5 h-5 text-purple-600 mr-2 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-purple-800">
                      <strong>Verpflichtungsfrei:</strong> Das Gespräch ist unverbindlich und dient dazu, 
                      die passende Möglichkeit für dich zu finden.
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </motion.section>
        )}

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
