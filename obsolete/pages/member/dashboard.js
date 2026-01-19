import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { BookOpen, Package, Gift, LogOut, User, ChevronRight } from 'lucide-react';

export default function MemberDashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [content, setContent] = useState({ freeContent: [], paidContent: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const userRes = await fetch('/api/auth/me');
      if (!userRes.ok) {
        router.push('/login');
        return;
      }
      const userData = await userRes.json();
      setUser(userData.user);

      const contentRes = await fetch('/api/member/content');
      const contentData = await contentRes.json();
      setContent(contentData);
    } catch (error) {
      console.error('Auth check failed:', error);
      router.push('/login');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Lädt...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Mein Dashboard - Mitgliederbereich</title>
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Willkommen zurück, {user?.name || 'dort'}!</h1>
                <p className="text-gray-600 mt-1">{user?.email}</p>
              </div>
              <div className="flex items-center gap-4">
                <Link
                  href="/member/account"
                  className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors"
                >
                  <User className="w-5 h-5" />
                  <span className="hidden sm:inline">Account</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 text-red-600 hover:text-red-700 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="hidden sm:inline">Abmelden</span>
                </button>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {content.paidContent.length > 0 && (
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-purple-600" />
                Deine gekauften Inhalte
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {content.paidContent.map((item) => (
                  <Link
                    key={item.id}
                    href={`/member/content/${item.slug}`}
                    className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6 group"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                        {item.content_type === 'course' ? (
                          <BookOpen className="w-6 h-6 text-white" />
                        ) : (
                          <Package className="w-6 h-6 text-white" />
                        )}
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600 transition-colors" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-600 mb-4">{item.description}</p>
                    <div className="text-xs text-gray-500">
                      Gekauft am {new Date(item.granted_at).toLocaleDateString('de-DE')}
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {content.freeContent.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Gift className="w-6 h-6 text-green-600" />
                Kostenlose Inhalte
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {content.freeContent.map((item) => (
                  <Link
                    key={item.id}
                    href={`/member/content/${item.slug}`}
                    className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6 group"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                        <Gift className="w-6 h-6 text-white" />
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-green-600 transition-colors" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {content.paidContent.length === 0 && (
            <div className="bg-white rounded-xl shadow-lg p-12 text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Noch keine Kurse gekauft</h3>
              <p className="text-gray-600 mb-6">
                Entdecke unsere Kurse und starte deine Reise zum bewussten Leben
              </p>
              <Link
                href="/kurse"
                className="inline-block bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all"
              >
                Kurse entdecken
              </Link>
            </div>
          )}
        </main>
      </div>
    </>
  );
}
