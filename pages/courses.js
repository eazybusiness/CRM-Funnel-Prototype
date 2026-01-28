import Head from 'next/head'
import Link from 'next/link'
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
          <h1 className="text-3xl font-light text-gray-900 mb-6">Kurse</h1>
          <p className="text-gray-600 mb-10 max-w-2xl">
            Auf dieser Seite siehst du eine Übersicht aller aktuell verfügbaren Kurse.
            Diese Seite ist nicht im Menü verlinkt und kann z.&nbsp;B. nur über einen
            direkten Link in einer E-Mail aufgerufen werden.
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

                  <div className="mt-auto flex items-center justify-between">
                    <Link
                      href={`/member/course/${course.slug}`}
                      className="inline-flex items-center rounded-lg bg-gray-900 px-4 py-2 text-sm font-light text-white hover:bg-gray-800"
                    >
                      Mehr erfahren
                    </Link>
                    <span className="text-xs text-gray-400">Slug: {course.slug}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </>
  )
}
