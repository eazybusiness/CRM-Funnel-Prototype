'use client'

import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { Plus, Edit, Eye, BookOpen, FileText, Video, ArrowLeft } from 'lucide-react'

const demoCourses = [
  {
    id: 1,
    title: 'Minimalismus Grundlagen',
    price: 49,
    status: 'Aktiv',
    modules: 3,
    lessons: 12,
    updatedAt: '2026-01-20'
  },
  {
    id: 2,
    title: 'Bewusst leben im Alltag',
    price: 79,
    status: 'Entwurf',
    modules: 4,
    lessons: 18,
    updatedAt: '2026-01-18'
  }
]

export default function AdminCourses() {
  const [courses] = useState(demoCourses)

  return (
    <>
      <Head>
        <title>Kurs-Management - Admin</title>
        <meta name="description" content="Admin Kursverwaltung" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <header className="bg-white border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between py-4">
              <Link href="/" className="flex items-center text-gray-600 hover:text-gray-900">
                <ArrowLeft className="w-5 h-5 mr-2" />
                <span>Zurück zur Website</span>
              </Link>
              <Link
                href="/admin/courses/new"
                className="inline-flex items-center bg-gray-900 text-white font-light px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                Neuer Kurs
              </Link>
            </div>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-2xl shadow-sm p-8 mb-8">
            <h1 className="text-3xl font-light text-gray-900 mb-2">
              Kurs-Management
            </h1>
            <p className="text-gray-600">
              Verwalte deine Kurse, Module und Lektionen.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-xl font-normal text-gray-900">Alle Kurse</h2>
              <div className="text-sm text-gray-600">{courses.length} Kurse</div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kurs</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Preis</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Inhalte</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aktualisiert</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Aktionen</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {courses.map(course => (
                    <tr key={course.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                            <BookOpen className="w-5 h-5 text-gray-600" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">{course.title}</div>
                            <div className="text-sm text-gray-500">ID: {course.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">€{course.price}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          course.status === 'Aktiv' 
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {course.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-4">
                          <span className="flex items-center">
                            <FileText className="w-4 h-4 mr-1" />
                            {course.modules} Module
                          </span>
                          <span className="flex items-center">
                            <Video className="w-4 h-4 mr-1" />
                            {course.lessons} Lektionen
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{course.updatedAt}</td>
                      <td className="px-6 py-4 text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-2">
                          <button className="text-gray-600 hover:text-gray-900 p-1">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="text-gray-600 hover:text-gray-900 p-1">
                            <Edit className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-8 bg-blue-50 rounded-2xl p-6">
            <h3 className="text-lg font-normal text-gray-900 mb-2">Nächste Schritte</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Kursdaten aus der Datenbank laden</li>
              <li>• Kurs-Editor hinzufügen</li>
              <li>• Upload-Funktionen für Videos/PDFs integrieren</li>
            </ul>
          </div>
        </main>
      </div>
    </>
  )
}
