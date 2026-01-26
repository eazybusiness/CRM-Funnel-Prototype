import { useState } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { Mail } from 'lucide-react'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage('')

    // TODO: Implement actual password reset logic
    // For now, just show a success message
    setTimeout(() => {
      setMessage('Wenn diese E-Mail in unserem System existiert, erhalten Sie in Kürze eine Anleitung zum Zurücksetzen Ihres Passworts.')
      setIsLoading(false)
    }, 1000)
  }

  return (
    <>
      <Head>
        <title>Passwort vergessen - Einfach bewusster leben</title>
        <meta name="description" content="Setzen Sie Ihr Passwort zurück" />
      </Head>

      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center">
              <img 
                src="/logo.svg" 
                alt="Einfach bewusster leben" 
                width={40} 
                height={40} 
                className="mr-2"
              />
              <span className="text-xl font-light tracking-wide text-gray-900">
                Einfach bewusster leben
              </span>
            </Link>
          </div>

          <h2 className="text-2xl font-light text-gray-900 mb-6 text-center">
            Passwort vergessen
          </h2>

          <p className="text-gray-600 text-center mb-8">
            Geben Sie Ihre E-Mail-Adresse ein und wir senden Ihnen einen Link zum Zurücksetzen Ihres Passworts.
          </p>

          {message && (
            <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg text-sm mb-6">
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-normal text-gray-700 mb-2">
                E-Mail-Adresse
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  placeholder="deine@email.de"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gray-900 text-white font-light py-3 rounded-full hover:bg-gray-800 transition-all hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Wird gesendet...' : 'Link senden'}
            </button>
          </form>

          {/* Back to Login */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Zurück zum{' '}
              <Link href="/login" className="text-gray-900 hover:text-gray-700 underline">
                Login
              </Link>
            </p>
          </div>

          {/* Back to Home */}
          <div className="mt-4 text-center">
            <Link 
              href="/" 
              className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              ← Zurück zur Startseite
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
