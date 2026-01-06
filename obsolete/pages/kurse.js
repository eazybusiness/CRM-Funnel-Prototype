import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  ArrowLeft, 
  CheckCircle, 
  Calendar,
  Users,
  Award,
  BookOpen,
  Target,
  Clock
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

export default function Kurse() {
  const router = useRouter()
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: '',
    experience: 'beginner'
  })

  const courses = [
    {
      id: 'basic',
      name: 'Grundlagen Kurs',
      price: '197€',
      duration: '4 Wochen',
      level: 'Anfänger',
      description: 'Perfekt für den Einstieg in die Thematik',
      features: [
        '8 Video-Module',
        'Live Q&A Sessions',
        'Arbeitsmaterialien',
        'Zertifikat',
        'Community Zugang'
      ],
      icon: BookOpen,
      color: 'from-green-500 to-green-600',
      nextStart: '15. Januar 2024',
      spots: 15
    },
    {
      id: 'advanced',
      name: 'Aufbaukurs',
      price: '497€',
      duration: '6 Wochen',
      level: 'Fortgeschritten',
      description: 'Vertiefung und praktische Anwendung',
      features: [
        '12 Video-Module',
        'Wöchentliche Live-Coaching',
        'Praxisprojekte',
        '1-on-1 Mentoring',
        'Erweitertes Zertifikat'
      ],
      icon: Target,
      color: 'from-blue-500 to-blue-600',
      nextStart: '1. Februar 2024',
      spots: 8
    },
    {
      id: 'master',
      name: 'Masterclass',
      price: '997€',
      duration: '8 Wochen',
      level: 'Experte',
      description: 'Für professionelle Umsetzung',
      features: [
        '16 Video-Module',
        'Intensive Workshops',
        'Echte Fallstudien',
        'Persönliche Betreuung',
        'Master Zertifikat',
        'Alumni Netzwerk'
      ],
      icon: Award,
      color: 'from-purple-500 to-purple-600',
      nextStart: '15. Februar 2024',
      spots: 5
    }
  ]

  const workshops = [
    {
      title: 'Intensiv-Workshop',
      date: '20-21. Januar 2024',
      location: 'Berlin',
      price: '297€',
      duration: '2 Tage',
      description: 'Praktische Anwendung in kleinen Gruppen'
    },
    {
      title: 'Online-Workshop',
      date: '27. Januar 2024',
      location: 'Online (Zoom)',
      price: '97€',
      duration: '1 Tag',
      description: 'Interaktives Lernen von zu Hause'
    }
  ]

  const handleCourseSelect = (course) => {
    setSelectedCourse(course.id)
    setFormData({ ...formData, course: course.name })
    writeDemoEvent('pathway_selected', { pathway: 'courses', offer: course.name, price: course.price })
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
          source: 'courses',
          timestamp: new Date().toISOString()
        })
      })

      if (response.ok) {
        const chosen = courses.find(c => c.id === selectedCourse)
        const amount = chosen?.id === 'basic' ? 197 : chosen?.id === 'advanced' ? 497 : chosen?.id === 'master' ? 997 : 197

        writeDemoLead({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          source: 'courses',
          course: formData.course,
          offer: formData.course,
          experience: formData.experience,
        })
        writeDemoEvent('form_submitted', { pathway: 'courses', offer: formData.course, email: formData.email })

        await router.push(`/checkout?demo=1&source=courses&offer=${encodeURIComponent(formData.course)}&amount=${encodeURIComponent(String(amount))}&name=${encodeURIComponent(formData.name)}&email=${encodeURIComponent(formData.email)}`)
      }
    } catch (error) {
      alert('Fehler: Bitte versuchen Sie es später erneut.')
    }
  }

  return (
    <>
      <Head>
        <title>Kurse & Workshops - CRM Funnel</title>
        <meta name="description" content="Entfessele dein Potenzial mit unseren professionellen Kursen und Workshops" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
        <UtmBanner />
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <Link href="/">
                <div className="flex items-center text-green-600 hover:text-green-800 transition-colors">
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  <span className="font-semibold">Zurück</span>
                </div>
              </Link>

              <h1 className="text-2xl font-bold text-gray-900">Kurse & Workshops</h1>

              <Link href="/demo/crm" className="text-sm font-semibold text-green-700 hover:text-green-900">Demo CRM</Link>
            </div>
          </div>
        </header>

        <div className="max-w-6xl mx-auto px-4 pt-6">
          <FunnelStepper steps={["Auswahl", "Daten", "Checkout"]} currentStep={selectedCourse ? 2 : 1} />
        </div>

        {/* Hero Section */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Entfessele dein
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">
                {' '}Potenzial
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-xl text-gray-600 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Lerne von den Besten und erreiche deine Ziele schneller als je zuvor.
            </motion.p>
          </div>
        </section>

        {/* Courses Section */}
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Unsere Online Kurse
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {courses.map((course, index) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  className="relative"
                >
                  <div className={`
                    bg-white rounded-2xl shadow-lg p-8 h-full
                    transform transition-all duration-300 hover:scale-105 hover:shadow-2xl
                    ${selectedCourse === course.id ? 'ring-4 ring-green-400' : ''}
                  `}>
                    <div className={`w-16 h-16 bg-gradient-to-br ${course.color} rounded-xl flex items-center justify-center mx-auto mb-6`}>
                      <course.icon className="w-8 h-8 text-white" />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-900 mb-2 text-center">
                      {course.name}
                    </h3>
                    
                    <div className="text-center mb-4">
                      <span className="text-3xl font-bold text-gray-900">{course.price}</span>
                      <span className="text-gray-500 ml-2">/{course.duration}</span>
                    </div>
                    
                    <div className="flex justify-center space-x-4 mb-4 text-sm text-gray-600">
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {course.duration}
                      </span>
                      <span className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {course.level}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 text-center mb-6">
                      {course.description}
                    </p>
                    
                    <div className="mb-6 p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-green-800 font-medium">Nächster Start:</span>
                        <span className="text-green-600">{course.nextStart}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm mt-1">
                        <span className="text-green-800 font-medium">Noch Plätze:</span>
                        <span className="text-orange-600 font-semibold">{course.spots}</span>
                      </div>
                    </div>
                    
                    <ul className="space-y-3 mb-8">
                      {course.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <button
                      onClick={() => handleCourseSelect(course)}
                      className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200 ${
                        selectedCourse === course.id
                          ? 'bg-green-500 hover:bg-green-600 text-white'
                          : `bg-gradient-to-r ${course.color} hover:opacity-90 text-white`
                      }`}
                    >
                      {selectedCourse === course.id ? 'Ausgewählt' : 'Anmelden'}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Workshops Section */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Präsenz Workshops
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {workshops.map((workshop, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 * index }}
                  className="bg-gray-50 rounded-xl p-6 border border-gray-200"
                >
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                      <Calendar className="w-6 h-6 text-orange-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {workshop.title}
                      </h3>
                      <p className="text-gray-600 mb-4">{workshop.description}</p>
                      
                      <div className="space-y-2 text-sm text-gray-600 mb-4">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-2" />
                          {workshop.date}
                        </div>
                        <div className="flex items-center">
                          <Users className="w-4 h-4 mr-2" />
                          {workshop.location}
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-2" />
                          {workshop.duration}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-gray-900">{workshop.price}</span>
                        <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors">
                          Anmelden
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Registration Form */}
        {selectedCourse && (
          <motion.section 
            className="py-16 px-4 bg-gradient-to-r from-green-50 to-emerald-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Anmeldung für {
                    courses.find(c => c.id === selectedCourse)?.name
                  }
                </h2>
                <p className="text-gray-600">
                  Sichere dir jetzt deinen Platz und starte deine Reise zum Erfolg.
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

                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Dein Erfahrungslevel *
                  </label>
                  <select
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    className="form-input"
                  >
                    <option value="beginner">Anfänger</option>
                    <option value="intermediate">Fortgeschritten</option>
                    <option value="expert">Experte</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full mt-8 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-green-700 hover:to-emerald-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
                >
                  Jetzt anmelden & Platz sichern
                </button>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-start">
                    <Award className="w-5 h-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-blue-800">
                      <strong>Zertifikat:</strong> Nach erfolgreicher Teilnahme erhältst du ein anerkanntes Zertifikat.
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
