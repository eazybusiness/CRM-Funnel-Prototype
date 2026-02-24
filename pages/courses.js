import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { X, CheckCircle, Clock, BookOpen, PlayCircle, FileText } from 'lucide-react'
import { query } from '../lib/db'

export async function getServerSideProps() {
  try {
    const result = await query(
      `SELECT id, title, description, slug, price FROM courses ORDER BY id ASC`
    )

    return {
      props: {
        courses: result.rows || [],
      },
    }
  } catch (error) {
    console.error('Error loading courses:', error)
    return {
      props: {
        courses: [],
        error: 'Kurse konnten nicht geladen werden.',
      },
    }
  }
}

export default function CoursesPage({ courses, error }) {
  const router = useRouter()
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [showModal, setShowModal] = useState(false)

  const handleCourseClick = (course) => {
    setSelectedCourse(course)
    setShowModal(true)
  }

  const handlePurchase = () => {
    if (selectedCourse) {
      router.push(`/checkout?courseId=${selectedCourse.id}&courseName=${encodeURIComponent(selectedCourse.title)}&price=${selectedCourse.price}&description=${encodeURIComponent(selectedCourse.description || '')}`)
    }
  }

  return (
    <>
      <Head>
        <title>Kurse - Einfach bewusster leben</title>
        <meta
          name="description"
          content="Übersicht aller verfügbaren Kurse von Einfach bewusster leben."
        />
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <header className="bg-white border-b border-gray-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between py-6">
              <Link href="/" className="text-sm text-gray-600 hover:text-gray-900">
                ← Zurück zur Startseite
              </Link>
              <span className="text-sm text-gray-400">
                Kursübersicht (Direktlink, nicht im Menü verlinkt)
              </span>
            </div>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <h1 className="text-3xl font-light text-gray-900 mb-6">Meine Kurse & Inhalte</h1>
          <p className="text-gray-600 mb-10 max-w-2xl">
            Entdecke meine Kurse und Inhalte für ein bewussteres Leben. Wähle einen Kurs aus, um mehr zu erfahren und ihn zu kaufen.
          </p>

          {error && (
            <div className="mb-8 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {(!courses || courses.length === 0) && !error && (
            <div className="rounded-xl border border-gray-200 bg-white p-8 text-center text-gray-600">
              Aktuell sind noch keine Kurse hinterlegt. Sobald Kurse angelegt sind,
              werden sie hier automatisch angezeigt.
            </div>
          )}

          {courses && courses.length > 0 && (
            <div className="grid gap-6 md:grid-cols-2">
              {courses.map((course) => (
                <div
                  key={course.id}
                  className="flex h-full flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="mb-4">
                    <h2 className="text-xl font-light text-gray-900 mb-1">
                      {course.title}
                    </h2>
                    {course.price != null && (
                      <p className="text-sm font-medium text-gray-900">
                        {course.price.toFixed ? `€${course.price.toFixed(2)}` : `€${course.price}`}
                      </p>
                    )}
                  </div>

                  <p className="flex-1 text-sm text-gray-600 mb-6">
                    {course.description || 'Weitere Informationen folgen in Kürze.'}
                  </p>

                  <div className="mt-auto">
                    <button
                      onClick={() => handleCourseClick(course)}
                      className="w-full bg-gray-900 text-white py-3 rounded-lg hover:bg-gray-800 transition text-center mb-2"
                    >
                      Mehr Infos & Kaufen
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>

        {/* Course Info Modal */}
        {showModal && selectedCourse && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" onClick={() => setShowModal(false)}>
            <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              {/* Modal Header */}
              <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-light text-gray-900 mb-2">
                    {selectedCourse.title}
                  </h2>
                  <p className="text-2xl font-medium text-gray-900">
                    €{selectedCourse.price?.toFixed ? selectedCourse.price.toFixed(2) : selectedCourse.price}
                  </p>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="px-8 py-6">
                {/* Description */}
                <div className="mb-8">
                  <h3 className="text-lg font-normal text-gray-900 mb-3">Über diesen Kurs</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {selectedCourse.description || 'Ein umfassender Kurs, der dir hilft, bewusster und achtsamer zu leben. Lerne praktische Techniken und Methoden, die du sofort in deinem Alltag umsetzen kannst.'}
                  </p>
                </div>

                {/* Course Details */}
                <div className="mb-8">
                  <h3 className="text-lg font-normal text-gray-900 mb-4">Das erwartet dich</h3>
                  <div className="grid md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-gray-50 rounded-lg p-4 text-center">
                      <BookOpen className="w-8 h-8 text-gray-700 mx-auto mb-2" />
                      <p className="text-sm font-medium text-gray-900">3 Module</p>
                      <p className="text-xs text-gray-600">Strukturiert & übersichtlich</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4 text-center">
                      <PlayCircle className="w-8 h-8 text-gray-700 mx-auto mb-2" />
                      <p className="text-sm font-medium text-gray-900">6 Lektionen</p>
                      <p className="text-xs text-gray-600">Video & Audio</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4 text-center">
                      <Clock className="w-8 h-8 text-gray-700 mx-auto mb-2" />
                      <p className="text-sm font-medium text-gray-900">3 Stunden</p>
                      <p className="text-xs text-gray-600">Gesamtdauer</p>
                    </div>
                  </div>
                </div>

                {/* Module Overview */}
                <div className="mb-8">
                  <h3 className="text-lg font-normal text-gray-900 mb-4">Kursinhalt</h3>
                  <div className="space-y-3">
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-2">Modul 1: Loslassen beginnen</h4>
                      <p className="text-sm text-gray-600 mb-3">Einführung in die Kunst des Loslassens</p>
                      <ul className="space-y-2">
                        <li className="flex items-start text-sm text-gray-600">
                          <PlayCircle className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                          <span>Lektion 1: Warum Loslassen? (15 Min.)</span>
                        </li>
                        <li className="flex items-start text-sm text-gray-600">
                          <PlayCircle className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                          <span>Lektion 2: Erste Schritte (20 Min.)</span>
                        </li>
                      </ul>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-2">Modul 2: Ballast erkennen</h4>
                      <p className="text-sm text-gray-600 mb-3">Wie du erkennst, was dich belastet</p>
                      <ul className="space-y-2">
                        <li className="flex items-start text-sm text-gray-600">
                          <PlayCircle className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                          <span>Lektion 1: Ballast identifizieren (18 Min.)</span>
                        </li>
                        <li className="flex items-start text-sm text-gray-600">
                          <PlayCircle className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                          <span>Lektion 2: Prioritäten setzen (22 Min.)</span>
                        </li>
                      </ul>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-2">Modul 3: Leichtigkeit leben</h4>
                      <p className="text-sm text-gray-600 mb-3">Praktische Schritte zu mehr Leichtigkeit</p>
                      <ul className="space-y-2">
                        <li className="flex items-start text-sm text-gray-600">
                          <PlayCircle className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                          <span>Lektion 1: Routinen entwickeln (25 Min.)</span>
                        </li>
                        <li className="flex items-start text-sm text-gray-600">
                          <PlayCircle className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                          <span>Lektion 2: Dranbleiben (20 Min.)</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Benefits */}
                <div className="mb-8">
                  <h3 className="text-lg font-normal text-gray-900 mb-4">Das bekommst du</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600">Lebenslanger Zugriff auf alle Kursinhalte</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600">Hochwertige Video-Lektionen</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600">Downloadbare PDF-Arbeitsmaterialien</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600">Praktische Übungen für den Alltag</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600">Zugriff von allen Geräten (Desktop, Tablet, Smartphone)</span>
                    </li>
                  </ul>
                </div>

                {/* Purchase Button */}
                <div className="sticky bottom-0 bg-white pt-6 border-t border-gray-200">
                  <button
                    onClick={handlePurchase}
                    className="w-full bg-gray-900 text-white font-light py-4 rounded-lg hover:bg-gray-800 transition-colors text-lg"
                  >
                    Jetzt kaufen für €{selectedCourse.price?.toFixed ? selectedCourse.price.toFixed(2) : selectedCourse.price}
                  </button>
                  <p className="text-xs text-gray-500 text-center mt-3">
                    Sichere Zahlung über PayPal • 14 Tage Geld-zurück-Garantie
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
