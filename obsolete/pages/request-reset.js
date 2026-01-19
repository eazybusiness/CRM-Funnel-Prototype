import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Mail, ArrowLeft } from 'lucide-react';

export default function RequestReset() {
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth/request-reset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Request failed');
      }

      setSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Passwort zurücksetzen</title>
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Passwort zurücksetzen</h1>
            <p className="text-gray-600">Wir senden dir einen Link zum Zurücksetzen</p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            {success ? (
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">E-Mail versendet!</h2>
                <p className="text-gray-600 mb-6">
                  Falls ein Account mit dieser E-Mail existiert, haben wir dir einen Link zum Zurücksetzen gesendet.
                </p>
                <Link
                  href="/login"
                  className="inline-flex items-center text-purple-600 hover:text-purple-700 font-semibold"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Zurück zum Login
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                    {error}
                  </div>
                )}

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    E-Mail-Adresse
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="deine@email.com"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Wird gesendet...' : 'Reset-Link senden'}
                </button>

                <div className="text-center">
                  <Link href="/login" className="text-sm text-gray-600 hover:text-gray-900">
                    ← Zurück zum Login
                  </Link>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
