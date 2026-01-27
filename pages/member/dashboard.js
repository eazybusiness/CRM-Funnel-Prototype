'use client'

import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { BookOpen, PlayCircle, FileText, LogOut, User, Clock, CheckCircle, Settings, Download, Trash2 } from 'lucide-react'

export default function MemberDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [enrollments, setEnrollments] = useState([])
  const [loading, setLoading] = useState(true)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isExporting, setIsExporting] = useState(false)

  // Prevent SSR issues
  if (typeof window === 'undefined') {
    return null
  }

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    }
  }, [status, router])

  useEffect(() => {
    if (session?.user?.id) {
      fetchEnrollments()
    }
  }, [session])

  const fetchEnrollments = async () => {
    try {
      const response = await fetch('/api/member/enrollments')
      if (response.ok) {
        const data = await response.json()
        setEnrollments(data.enrollments || [])
      }
    } catch (error) {
      console.error('Error fetching enrollments:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' })
  }

  const handleExportData = async () => {
    setIsExporting(true)
    try {
      const response = await fetch('/api/user/export-data')
      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `meine_daten_${new Date().toISOString().split('T')[0]}.json`
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
      } else {
        alert('Fehler beim Exportieren Ihrer Daten')
      }
    } catch (error) {
      console.error('Export error:', error)
      alert('Fehler beim Exportieren Ihrer Daten')
    } finally {
      setIsExporting(false)
    }
  }

  const handleDeleteAccount = async () => {
    setIsDeleting(true)
    try {
      const response = await fetch('/api/user/delete-account', {
        method: 'DELETE'
      })
      if (response.ok) {
        alert('Ihr Account wurde erfolgreich gelöscht.')
        signOut({ callbackUrl: '/' })
      } else {
        const data = await response.json()
        alert(data.error || 'Fehler beim Löschen des Accounts')
      }
    } catch (error) {
      console.error('Delete error:', error)
      alert('Fehler beim Löschen des Accounts')
    } finally {
      setIsDeleting(false)
      setShowDeleteConfirm(false)
    }
  }

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <>
      <Head>
        <title>Mitgliederbereich - Einfach bewusster leben</title>
        <meta name="description" content="Dein persönlicher Mitgliederbereich" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <Link href="/" className="flex items-center">
                <img 
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

              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <User className="w-5 h-5 text-gray-600" />
                  <span className="text-sm text-gray-700">
                    {session.user.firstName} {session.user.lastName}
                  </span>
                </div>
                <button
                  onClick={handleSignOut}
                  className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Abmelden</span>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome Section */}
          <div className="bg-white rounded-2xl shadow-sm p-8 mb-8">
            <h1 className="text-3xl font-light text-gray-900 mb-4">
              Willkommen zurück, {session.user.firstName}!
            </h1>
            <p className="text-gray-600">
              Hier findest du alle deine Kurse und deinen Lernfortschritt.
            </p>
          </div>

          {/* Settings Section */}
          <div className="bg-white rounded-2xl shadow-sm p-8 mb-8">
            <div className="flex items-center space-x-3 mb-6">
              <Settings className="w-6 h-6 text-gray-700" />
              <h2 className="text-xl font-light text-gray-900">Account-Einstellungen</h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleExportData}
                  disabled={isExporting}
                  className="flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                  <Download className="w-4 h-4" />
                  <span>{isExporting ? 'Exportiere...' : 'Meine Daten exportieren'}</span>
                </button>
                
                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  className="flex items-center justify-center space-x-2 px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Account löschen</span>
                </button>
              </div>
              
              <p className="text-sm text-gray-600">
                Gemäß DSGVO haben Sie das Recht auf Ihre Daten und deren Löschung.
              </p>
            </div>
          </div>

          {/* Courses Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrollments.map((enrollment) => (
              <div key={enrollment.id} className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                        <BookOpen className="w-6 h-6 text-gray-700" />
                      </div>
                      <div>
                        <h3 className="text-lg font-normal text-gray-900">
                          {enrollment.course.title}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {enrollment.course.modules?.length || 0} Module
                        </p>
                      </div>
                    </div>
                    {enrollment.progress_percentage > 0 && (
                      <div className="text-right">
                        <div className="text-2xl font-light text-gray-900">
                          {Math.round(enrollment.progress_percentage)}%
                        </div>
                        <div className="text-xs text-gray-600">Fortschritt</div>
                      </div>
                    )}
                  </div>

                  <p className="text-gray-600 mb-6 line-clamp-2">
                    {enrollment.course.description}
                  </p>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <PlayCircle className="w-4 h-4" />
                        <span>{enrollment.course.lessons?.length || 0} Lektionen</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{enrollment.course.duration || 0} Min.</span>
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  {enrollment.progress_percentage > 0 && (
                    <div className="mb-4">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gray-900 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${enrollment.progress_percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  )}

                  <Link
                    href={`/member/course/${enrollment.course.slug}`}
                    className="w-full bg-gray-900 text-white font-light py-2 rounded-lg hover:bg-gray-800 transition-colors text-center block"
                  >
                    {enrollment.progress_percentage > 0 ? 'Weiterlernen' : 'Kurs starten'}
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {enrollments.length === 0 && (
            <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-light text-gray-900 mb-2">
                Noch keine Kurse
              </h3>
              <p className="text-gray-600 mb-6">
                Du hast noch keine Kurse gekauft. Schau dir unsere Angebote an!
              </p>
              <Link
                href="/"
                className="inline-flex items-center bg-gray-900 text-white font-light px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors"
              >
                Zu den Kursen
              </Link>
            </div>
          )}
        </main>

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full">
              <h3 className="text-xl font-light text-gray-900 mb-4">
                Account wirklich löschen?
              </h3>
              <p className="text-gray-600 mb-6">
                Dies kann nicht rückgängig gemacht werden. Alle Ihre Daten einschließlich Kursfortschritte und Käufe werden permanent gelöscht.
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  disabled={isDeleting}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                  Abbrechen
                </button>
                <button
                  onClick={handleDeleteAccount}
                  disabled={isDeleting}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
                >
                  {isDeleting ? 'Lösche...' : 'Ja, löschen'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export async function getServerSideProps() {
  return {
    props: {},
  }
}
