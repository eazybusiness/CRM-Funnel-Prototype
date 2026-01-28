import Head from 'next/head'
import Link from 'next/link'

export default function Impressum() {
  return (
    <>
      <Head>
        <title>Impressum - Einfach bewusster leben</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white border-b border-gray-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
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
              <Link href="/" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                Zurück
              </Link>
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-4 py-12 md:py-20">
          <h1 className="text-4xl font-light text-gray-900 mb-8">Impressum</h1>

          <div className="prose prose-gray max-w-none">
            <h2 className="text-2xl font-light text-gray-900 mt-8 mb-4">Angaben gemäß § 5 TMG</h2>
            <p className="text-gray-600 mb-4">
              <strong>PLATZHALTER - Name der Kundin</strong><br />
              PLATZHALTER - Straße und Hausnummer<br />
              PLATZHALTER - PLZ und Ort
            </p>

            <h2 className="text-2xl font-light text-gray-900 mt-8 mb-4">Kontakt</h2>
            <p className="text-gray-600 mb-4">
              <strong>E-Mail:</strong> PLATZHALTER - E-Mail-Adresse<br />
              <strong>Telefon:</strong> PLATZHALTER - Telefonnummer
            </p>

            <h2 className="text-2xl font-light text-gray-900 mt-8 mb-4">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
            <p className="text-gray-600 mb-4">
              <strong>PLATZHALTER - Name der Kundin</strong><br />
              PLATZHALTER - Straße und Hausnummer<br />
              PLATZHALTER - PLZ und Ort
            </p>

            <h2 className="text-2xl font-light text-gray-900 mt-8 mb-4">EU-Streitschlichtung</h2>
            <p className="text-gray-600 mb-4">
              Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: 
              <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="text-gray-900 underline ml-1">
                https://ec.europa.eu/consumers/odr/
              </a>
              <br />
              Unsere E-Mail-Adresse finden Sie oben im Impressum.
            </p>

            <h2 className="text-2xl font-light text-gray-900 mt-8 mb-4">Verbraucherstreitbeilegung/Universalschlichtungsstelle</h2>
            <p className="text-gray-600 mb-4">
              Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer 
              Verbraucherschlichtungsstelle teilzunehmen.
            </p>

            <h2 className="text-2xl font-light text-gray-900 mt-8 mb-4">Haftung für Inhalte</h2>
            <p className="text-gray-600 mb-4">
              Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den 
              allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht 
              verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen 
              zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
            </p>

            <h2 className="text-2xl font-light text-gray-900 mt-8 mb-4">Haftung für Links</h2>
            <p className="text-gray-600 mb-4">
              Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. 
              Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der 
              verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
            </p>

            <h2 className="text-2xl font-light text-gray-900 mt-8 mb-4">Urheberrecht</h2>
            <p className="text-gray-600 mb-4">
              Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen 
              Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der 
              Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
            </p>

            <p className="text-sm text-gray-500 mt-12">
              Stand: {new Date().toLocaleDateString('de-DE')}
            </p>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-100 py-12 mt-20">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm text-gray-600 mb-4 md:mb-0">
                © 2026 Einfach bewusster leben. Alle Rechte vorbehalten.
              </p>
              <div className="flex space-x-6">
                <Link href="/datenschutz" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Datenschutz
                </Link>
                <Link href="/impressum" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Impressum
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
