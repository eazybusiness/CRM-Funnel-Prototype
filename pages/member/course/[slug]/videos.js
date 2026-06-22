'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import Link from 'next/link'
import { ArrowLeft, PlayCircle, Lock, BookOpen } from 'lucide-react'

export default function VideoCoursePage() {
  const router = useRouter()
  const { slug } = router.query
  const { data: session, status } = useSession()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Redirect to login if not authenticated
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    }
  }, [status, router])

  useEffect(() => {
    if (slug && session) {
      fetchVideos()
    }
  }, [slug, session])

  const fetchVideos = async () => {
    try {
      const response = await fetch(`/api/member/videos/${slug}`)
      if (response.status === 401) {
        router.push('/login')
        return
      }
      if (response.status === 403) {
        router.push('/member/dashboard')
        return
      }
      if (!response.ok) throw new Error('Kurs nicht gefunden')
      const result = await response.json()
      setData(result)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (loading || status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <h1 className="text-xl font-light text-gray-900 mb-2">Kein Zugriff</h1>
          <p className="text-gray-600 mb-4">{error || 'Dieser Kurs ist nicht verfügbar.'}</p>
          <Link
            href="/member/dashboard"
            className="inline-flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Zurück zum Dashboard
          </Link>
        </div>
      </div>
    )
  }

  // Prevent SSR issues
  if (typeof window === 'undefined') return null

  const { course, modules, totalVideos } = data

  return (
    <>
      <Head>
        <title>{course.title} – Videos</title>
        <meta name="description" content={`Alle Videos für ${course.title}`} />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between py-4">
              <Link 
                href={`/member/course/${slug}`}
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 mr-1" />
                <span>Zurück zum Kurs</span>
              </Link>
              <span className="text-sm text-gray-500">
                {totalVideos} Videos · {modules.length} Module
              </span>
            </div>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Course Header */}
          <div className="bg-white rounded-2xl shadow-sm p-8 mb-8">
            <h1 className="text-3xl font-light text-gray-900 mb-2">{course.title}</h1>
            {course.description && (
              <p className="text-gray-600 mb-6">{course.description}</p>
            )}
            <div className="flex items-center space-x-6 text-sm text-gray-600">
              <div className="flex items-center">
                <BookOpen className="w-4 h-4 mr-2" />
                <span>{modules.length} Module</span>
              </div>
              <div className="flex items-center">
                <PlayCircle className="w-4 h-4 mr-2" />
                <span>{totalVideos} Videos</span>
              </div>
            </div>
          </div>

          {/* Modules */}
          <div className="space-y-8">
            {modules.map((module) => (
              <div key={module.id} className="bg-white rounded-2xl shadow-sm p-8">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-normal text-gray-900">{module.title}</h2>
                  <span className="text-sm text-gray-500">
                    {module.lessons.length} Videos
                  </span>
                </div>

                {module.description && (
                  <p className="text-gray-600 mb-6 text-sm">{module.description}</p>
                )}

                <div className="divide-y divide-gray-100">
                  {module.lessons.map((lesson) => (
                    <div
                      key={lesson.id}
                      className="flex items-center justify-between py-4 first:pt-0 last:pb-0"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          {lesson.videoUrl ? (
                            <div className="w-9 h-9 bg-blue-50 rounded-full flex items-center justify-center">
                              <PlayCircle className="w-5 h-5 text-blue-600" />
                            </div>
                          ) : (
                            <div className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center">
                              <Lock className="w-4 h-4 text-gray-400" />
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="text-gray-900 font-light">{lesson.title}</p>
                          {lesson.description && (
                            <p className="text-sm text-gray-500 mt-0.5">{lesson.description}</p>
                          )}
                        </div>
                      </div>

                      {lesson.videoUrl ? (
                        <a
                          href={lesson.videoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-shrink-0 inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-light rounded-lg hover:bg-blue-700 transition-colors ml-4"
                        >
                          <PlayCircle className="w-4 h-4 mr-2" />
                          Video ansehen
                        </a>
                      ) : (
                        <span className="flex-shrink-0 inline-flex items-center px-4 py-2 bg-gray-100 text-gray-400 text-sm font-light rounded-lg ml-4 cursor-not-allowed">
                          <Lock className="w-4 h-4 mr-2" />
                          Demnächst
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </>
  )
}

export async function getServerSideProps() {
  return { props: {} }
}
