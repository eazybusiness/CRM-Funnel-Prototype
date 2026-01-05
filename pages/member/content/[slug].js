import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ArrowLeft, Lock, PlayCircle, FileText, Download } from 'lucide-react';

export default function ContentViewer() {
  const router = useRouter();
  const { slug } = router.query;
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (slug) {
      loadContent();
    }
  }, [slug]);

  const loadContent = async () => {
    try {
      const response = await fetch(`/api/member/content/${slug}`);
      
      if (response.status === 401) {
        router.push('/login');
        return;
      }

      if (response.status === 403) {
        setError('Du hast keinen Zugriff auf diesen Inhalt. Bitte kaufe den Kurs, um Zugang zu erhalten.');
        setLoading(false);
        return;
      }

      if (!response.ok) {
        throw new Error('Content not found');
      }

      const data = await response.json();
      setContent(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Lädt Inhalt...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Zugriff verweigert</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/member/dashboard"
              className="px-4 py-2 text-gray-700 hover:text-gray-900"
            >
              Zurück zum Dashboard
            </Link>
            <Link
              href="/kurse"
              className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700"
            >
              Kurse ansehen
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!content) {
    return null;
  }

  const renderContent = () => {
    if (content.content_type === 'freebie' || content.content_type === 'product') {
      const data = content.content_data;
      return (
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Downloads</h2>
          <div className="space-y-4">
            {data.items?.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-purple-300 transition-colors">
                <div className="flex items-center gap-3">
                  <FileText className="w-6 h-6 text-purple-600" />
                  <div>
                    <p className="font-semibold text-gray-900">{item.name}</p>
                    <p className="text-sm text-gray-600">{item.type.toUpperCase()}</p>
                  </div>
                </div>
                <a
                  href={item.url || '#'}
                  className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Download
                </a>
              </div>
            )) || (
              <div className="text-center py-8 text-gray-600">
                <p>Download-Link wird nach dem Kauf per E-Mail zugesendet.</p>
              </div>
            )}
          </div>
        </div>
      );
    }

    if (content.content_type === 'course') {
      const data = content.content_data;
      return (
        <div className="space-y-6">
          {data.modules?.map((module) => (
            <div key={module.id} className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">{module.title}</h2>
              <div className="space-y-3">
                {module.lessons?.map((lesson) => (
                  <div
                    key={lesson.id}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-purple-300 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <PlayCircle className="w-6 h-6 text-purple-600" />
                      <div>
                        <p className="font-semibold text-gray-900">{lesson.title}</p>
                        <p className="text-sm text-gray-600">{lesson.duration}</p>
                      </div>
                    </div>
                    <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                      Abspielen
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )) || (
            <div className="bg-white rounded-xl shadow-lg p-8 text-center text-gray-600">
              <p>Kurs-Inhalte werden gerade vorbereitet...</p>
            </div>
          )}
        </div>
      );
    }
  };

  return (
    <>
      <Head>
        <title>{content.title} - Mitgliederbereich</title>
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <Link
              href="/member/dashboard"
              className="inline-flex items-center gap-2 text-gray-700 hover:text-gray-900 mb-4"
            >
              <ArrowLeft className="w-5 h-5" />
              Zurück zum Dashboard
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">{content.title}</h1>
            {content.description && (
              <p className="text-gray-600 mt-2">{content.description}</p>
            )}
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {renderContent()}
        </main>
      </div>
    </>
  );
}
