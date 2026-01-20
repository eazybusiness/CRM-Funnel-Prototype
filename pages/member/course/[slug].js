'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import Head from 'next/head'
import { ChevronLeft, PlayCircle, FileText, CheckCircle, Lock } from 'lucide-react'

export default function CoursePage() {
  const router = useRouter()
  const { slug } = router.query
  const { data: session, status } = useSession()
  const [course, setCourse] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedLesson, setSelectedLesson] = useState(null)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    }
  }, [status, router])

  useEffect(() => {
    if (slug && session) {
      fetchCourse()
    }
  }, [slug, session])

  const fetchCourse = async () => {
    try {
      const response = await fetch(`/api/courses/${slug}`)
      if (response.ok) {
        const data = await response.json()
        setCourse(data.course)
        // Set first lesson as selected
        if (data.course.modules?.[0]?.lessons?.[0]) {
          setSelectedLesson(data.course.modules[0].lessons[0])
        }
      } else if (response.status === 403) {
        router.push('/member/dashboard')
      }
    } catch (error) {
      console.error('Error fetching course:', error)
    } finally {
      setLoading(false)
    }
  }

  const markLessonComplete = async (lessonId) => {
    try {
      await fetch('/api/member/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lessonId, completed: true })
      })
      // Refresh course data
      fetchCourse()
    } catch (error) {
      console.error('Error marking lesson complete:', error)
    }
  }

  if (loading || status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  if (!course) {
    return null
  }

  return (
    <>
      <Head>
        <title>{course.title} - Einfach bewusster leben</title>
        <meta name="description" content={course.description} />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center py-4">
              <Link 
                href="/member/dashboard"
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ChevronLeft className="w-5 h-5 mr-1" />
                <span>Zurück zum Dashboard</span>
              </Link>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Sidebar - Course Structure */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-8">
                <h2 className="text-xl font-light text-gray-900 mb-4">
                  {course.title}
                </h2>
                <p className="text-sm text-gray-600 mb-6">
                  {course.description}
                </p>

                {/* Modules and Lessons */}
                <div className="space-y-4">
                  {course.modules?.map((module) => (
                    <div key={module.id} className="border-b border-gray-200 pb-4 last:border-0">
                      <h3 className="font-normal text-gray-900 mb-2">
                        {module.title}
                      </h3>
                      <div className="space-y-2">
                        {module.lessons?.map((lesson) => (
                          <button
                            key={lesson.id}
                            onClick={() => setSelectedLesson(lesson)}
                            className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                              selectedLesson?.id === lesson.id
                                ? 'bg-gray-900 text-white'
                                : 'hover:bg-gray-100 text-gray-700'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                {lesson.videoUrl ? (
                                  <PlayCircle className="w-4 h-4" />
                                ) : (
                                  <FileText className="w-4 h-4" />
                                )}
                                <span className="text-sm">{lesson.title}</span>
                              </div>
                              {lesson.completed && (
                                <CheckCircle className="w-4 h-4 text-green-500" />
                              )}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Content - Lesson Viewer */}
            <div className="lg:col-span-2">
              {selectedLesson ? (
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                  {/* Video Player */}
                  {selectedLesson.videoUrl && (
                    <div className="aspect-video bg-gray-900">
                      <iframe
                        src={selectedLesson.videoUrl}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  )}

                  {/* Lesson Info */}
                  <div className="p-8">
                    <h1 className="text-3xl font-light text-gray-900 mb-4">
                      {selectedLesson.title}
                    </h1>
                    
                    {selectedLesson.description && (
                      <p className="text-gray-600 mb-6">
                        {selectedLesson.description}
                      </p>
                    )}

                    {/* PDF Download */}
                    {selectedLesson.pdfUrl && (
                      <div className="mb-6">
                        <a
                          href={selectedLesson.pdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center space-x-2 text-gray-900 hover:text-gray-700 transition-colors"
                        >
                          <FileText className="w-5 h-5" />
                          <span>PDF herunterladen</span>
                        </a>
                      </div>
                    )}

                    {/* Mark Complete Button */}
                    {!selectedLesson.completed && (
                      <button
                        onClick={() => markLessonComplete(selectedLesson.id)}
                        className="w-full bg-gray-900 text-white font-light py-3 rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center space-x-2"
                      >
                        <CheckCircle className="w-5 h-5" />
                        <span>Als abgeschlossen markieren</span>
                      </button>
                    )}

                    {selectedLesson.completed && (
                      <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center space-x-2">
                        <CheckCircle className="w-5 h-5" />
                        <span>Lektion abgeschlossen</span>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
                  <Lock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-light text-gray-900 mb-2">
                    Wähle eine Lektion
                  </h3>
                  <p className="text-gray-600">
                    Wähle eine Lektion aus der Seitenleiste, um zu beginnen.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
