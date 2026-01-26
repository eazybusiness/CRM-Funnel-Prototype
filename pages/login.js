'use client'

import { useState } from 'react'
import { signIn, getSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Head from 'next/head'
import { Eye, EyeOff, Lock, Mail } from 'lucide-react'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      if (!email || !password) {
        setError('Bitte füllen Sie alle Felder aus')
        setIsLoading(false)
        return
      }

      const result = await signIn('credentials', {
        email,
        password,
        redirect: true,
        callbackUrl: '/member/dashboard'
      })

      // If redirect is false, we need to handle it manually
      if (result?.error) {
        setError('Ungültige E-Mail oder Passwort')
        setIsLoading(false)
      }
    } catch (error) {
      console.error('Login error:', error)
      setError('Ein Fehler ist aufgetreten. Bitte versuche es erneut.')
      setIsLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>Login - Einfach bewusster leben</title>
        <meta name="description" content="Melde dich in deinem Mitgliederbereich an" />
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
            Mitgliederbereich Login
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-normal text-gray-700 mb-2 dark:text-gray-300">
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

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-normal text-gray-700 mb-2 dark:text-gray-300">
                Passwort
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  placeholder="Dein Passwort"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gray-900 text-white font-light py-3 rounded-full hover:bg-gray-800 transition-all hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Wird geladen...' : 'Anmelden'}
            </button>
          </form>

          {/* Help Links */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Noch kein Account?{' '}
              <Link href="/register" className="text-gray-900 hover:text-gray-700 underline">
                Hier registrieren
              </Link>
            </p>
            <p className="text-sm text-gray-600 mt-2">
              <Link href="/forgot-password" className="text-gray-900 hover:text-gray-700 underline">
                Hier zurücksetzen
              </Link>
            </p>
          </div>

          {/* Back to Home */}
          <div className="mt-8 text-center">
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
