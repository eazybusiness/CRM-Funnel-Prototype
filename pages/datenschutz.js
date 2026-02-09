import Head from 'next/head'
import Link from 'next/link'

export default function Datenschutz() {
  return (
    <>
      <Head>
        <title>Datenschutzerklärung</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <Link href="/" className="text-xl font-bold text-gray-900">
                ← Zurück
              </Link>
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Datenschutzerklärung</h1>

          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Datenschutz auf einen Blick</h2>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Allgemeine Hinweise</h3>
              <p className="text-gray-700 mb-4">
                Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen 
                Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit 
                denen Sie persönlich identifiziert werden können.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Datenerfassung auf dieser Website</h3>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">Wer ist verantwortlich für die Datenerfassung auf dieser Website?</h4>
              <p className="text-gray-700 mb-4">
                Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten 
                können Sie dem Abschnitt „Hinweis zur verantwortlichen Stelle" in dieser Datenschutzerklärung entnehmen.
              </p>

              <h4 className="text-lg font-semibold text-gray-800 mb-2">Wie erfassen wir Ihre Daten?</h4>
              <p className="text-gray-700 mb-4">
                Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich 
                z. B. um Daten handeln, die Sie in ein Kontaktformular oder ein Newsletter-Anmeldeformular eingeben.
              </p>
              <p className="text-gray-700 mb-4">
                Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website durch unsere 
                IT-Systeme erfasst. Das sind vor allem technische Daten (z. B. Internetbrowser, Betriebssystem oder 
                Uhrzeit des Seitenaufrufs).
              </p>

              <h4 className="text-lg font-semibold text-gray-800 mb-2">Wofür nutzen wir Ihre Daten?</h4>
              <p className="text-gray-700 mb-4">
                Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten.
              </p>
              <p className="text-gray-700 mb-4">
                Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden.
              </p>
              <p className="text-gray-700 mb-4">
                Wenn Sie sich für unseren Newsletter oder einen kostenlosen Guide anmelden, verwenden wir Ihre 
                Daten für den Versand des angeforderten PDFs sowie für weitere automatisierte E-Mails mit 
                Informationen und Angeboten.
              </p>

              <h4 className="text-lg font-semibold text-gray-800 mb-2">Welche Rechte haben Sie bezüglich Ihrer Daten?</h4>
              <p className="text-gray-700 mb-4">
                Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer 
                gespeicherten personenbezogenen Daten zu erhalten.
              </p>
              <p className="text-gray-700 mb-4">
                Sie haben außerdem ein Recht, die Berichtigung oder Löschung dieser Daten zu verlangen.
              </p>
              <p className="text-gray-700 mb-4">
                Wenn Sie eine Einwilligung zur Datenverarbeitung erteilt haben, können Sie diese Einwilligung 
                jederzeit für die Zukunft widerrufen.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Hosting & Datenbank</h2>
              <p className="text-gray-700 mb-4">
                Diese Website wird bei dem Dienstleister <strong>Vercel</strong> gehostet. Vercel stellt die
                technische Infrastruktur zur Verfügung, über die unsere Seiten ausgeliefert werden.
              </p>
              <p className="text-gray-700 mb-4">
                Für die Speicherung von Daten (z. B. Benutzerkonten oder Kursdaten) nutzen wir die Datenbanklösung{' '}
                <strong>Vercel Postgres (Neon)</strong>. Die Daten werden auf Servern der jeweiligen Anbieter gespeichert.
              </p>
              <p className="text-gray-700 mb-4">
                Es kann nicht ausgeschlossen werden, dass personenbezogene Daten auch in Drittländer (z. B. die USA) 
                übertragen werden. Die Übermittlung erfolgt auf Grundlage geeigneter Garantien gemäß Art. 46 DSGVO.
              </p>
              <p className="text-gray-700 mb-4">
                Weitere Informationen finden Sie in den Datenschutzerklärungen der Anbieter, z. B. von Vercel.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Allgemeine Hinweise und Pflichtinformationen</h2>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Datenschutz</h3>
              <p className="text-gray-700 mb-4">
                Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst.
              </p>
              <p className="text-gray-700 mb-4">
                Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend den gesetzlichen 
                Datenschutzvorschriften sowie dieser Datenschutzerklärung.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Hinweis zur verantwortlichen Stelle</h3>
              <p className="text-gray-700 mb-4">
                Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:
              </p>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <p className="text-gray-700">
                  <strong>Stefanie Dinçer</strong><br />
                  Vorstadt 37<br />
                  35460 Staufenberg<br />
                  <br />
                  Telefon: 0176 / 555 676 33<br />
                  E-Mail: stefaniedincer@einfachbewussterleben.de
                </p>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Speicherdauer</h3>
              <p className="text-gray-700 mb-4">
                Soweit innerhalb dieser Datenschutzerklärung keine speziellere Speicherdauer genannt wurde, 
                verbleiben Ihre personenbezogenen Daten bei uns, bis der Zweck für die Datenverarbeitung 
                entfällt oder Sie Ihre Einwilligung widerrufen.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Widerruf Ihrer Einwilligung zur Datenverarbeitung</h3>
              <p className="text-gray-700 mb-4">
                Viele Datenverarbeitungsvorgänge sind nur mit Ihrer ausdrücklichen Einwilligung möglich.
              </p>
              <p className="text-gray-700 mb-4">
                Sie können eine bereits erteilte Einwilligung jederzeit widerrufen.
              </p>
              <p className="text-gray-700 mb-4">
                Die Rechtmäßigkeit der bis zum Widerruf erfolgten Datenverarbeitung bleibt vom Widerruf unberührt.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Recht auf Datenübertragbarkeit</h3>
              <p className="text-gray-700 mb-4">
                Sie haben das Recht, Daten, die wir auf Grundlage Ihrer Einwilligung oder in Erfüllung eines 
                Vertrags automatisiert verarbeiten, an sich oder an einen Dritten in einem gängigen, 
                maschinenlesbaren Format aushändigen zu lassen.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Auskunft, Löschung und Berichtigung</h3>
              <p className="text-gray-700 mb-4">
                Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit das Recht auf unentgeltliche 
                Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger und den 
                Zweck der Datenverarbeitung sowie ggf. ein Recht auf Berichtigung oder Löschung dieser Daten.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Datenerfassung auf dieser Website</h2>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Server-Log-Dateien</h3>
              <p className="text-gray-700 mb-4">
                Der Provider der Seiten erhebt und speichert automatisch Informationen in sogenannten 
                Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt. Dies sind:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>Browsertyp und Browserversion</li>
                <li>verwendetes Betriebssystem</li>
                <li>Referrer URL</li>
                <li>Hostname des zugreifenden Rechners</li>
                <li>Uhrzeit der Serveranfrage</li>
                <li>IP-Adresse</li>
              </ul>
              <p className="text-gray-700 mb-4">
                Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO zur Sicherstellung eines 
                störungsfreien Betriebs der Website.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Kontaktformular / Newsletter-Anmeldung</h3>
              <p className="text-gray-700 mb-4">
                Wenn Sie uns per Kontaktformular oder Newsletter-Anmeldung Anfragen zukommen lassen, werden Ihre 
                Angaben aus dem Formular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung 
                der Anfrage sowie für den Versand des angeforderten PDFs und weiterer E-Mails gespeichert.
              </p>
              <p className="text-gray-700 mb-4">
                Die Verarbeitung dieser Daten erfolgt auf Grundlage Ihrer Einwilligung gemäß Art. 6 Abs. 1 lit. a DSGVO.
              </p>
              <p className="text-gray-700 mb-4">
                Sie können diese Einwilligung jederzeit widerrufen.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Newsletter-Daten</h3>
              <p className="text-gray-700 mb-4">
                Wenn Sie den auf der Website angebotenen Newsletter oder einen kostenlosen Guide beziehen möchten, 
                benötigen wir von Ihnen eine E-Mail-Adresse sowie Informationen, welche uns die Überprüfung 
                gestatten, dass Sie der Inhaber der angegebenen E-Mail-Adresse sind und mit dem Empfang der 
                E-Mails einverstanden sind.
              </p>
              <p className="text-gray-700 mb-4">
                <strong>Double-Opt-in-Verfahren:</strong> Die Anmeldung erfolgt im Double-Opt-in-Verfahren. 
                Nach der Anmeldung erhalten Sie eine E-Mail, in der Sie um die Bestätigung Ihrer Anmeldung 
                gebeten werden.
              </p>
              <p className="text-gray-700 mb-4">
                Zum Nachweis Ihrer Einwilligung speichern wir den Zeitpunkt der Anmeldung, den Zeitpunkt der 
                Bestätigung sowie die IP-Adresse.
              </p>
              <p className="text-gray-700 mb-4">
                Nach erfolgreicher Bestätigung erhalten Sie:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>eine E-Mail mit einem Download-Link zum bereitgestellten PDF</li>
                <li>anschließend weitere automatisierte E-Mails mit Informationen und Angeboten (E-Mail-Funnel)</li>
              </ul>
              <p className="text-gray-700 mb-4">
                Sie können Ihre Einwilligung jederzeit widerrufen. In jeder E-Mail befindet sich hierzu ein 
                entsprechender Abmeldelink.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Dienste von Drittanbietern</h2>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">E-Mail-Versand (Brevo)</h3>
              <p className="text-gray-700 mb-4">
                Für den Versand von E-Mails und Newslettern nutzen wir den Dienst <strong>Brevo</strong>{' '}
                (ehemals Sendinblue).
              </p>
              <p className="text-gray-700 mb-4">
                Wenn Sie sich für unseren Newsletter oder einen kostenlosen Guide anmelden, werden Ihre 
                E-Mail-Adresse und ggf. Ihr Name bei Brevo gespeichert. Der Versand erfolgt im 
                Double-Opt-in-Verfahren.
              </p>
              <p className="text-gray-700 mb-4">
                Brevo verarbeitet die Daten ausschließlich nach unseren Weisungen. Ein Vertrag zur 
                Auftragsverarbeitung (AVV) wurde abgeschlossen.
              </p>
              <p className="text-gray-700 mb-4">
                Sie können den Empfang jederzeit über den Abmeldelink in jeder E-Mail widerrufen.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Zahlungsdienstleister (PayPal)</h3>
              <p className="text-gray-700 mb-4">
                Für die Abwicklung von Zahlungen nutzen wir <strong>PayPal</strong>.
              </p>
              <p className="text-gray-700 mb-4">
                Wenn Sie einen Kurs oder ein digitales Produkt kaufen, werden Zahlungsdaten (z. B. Name, 
                Rechnungsadresse, Zahlungsinformationen) direkt von PayPal verarbeitet.
              </p>
              <p className="text-gray-700 mb-4">
                Wir erhalten keinen Zugriff auf Ihre vollständigen Zahlungsdaten (z. B. Kreditkartennummern).
              </p>
            </section>

            <section className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Kontakt bei Datenschutzfragen</h3>
              <p className="text-gray-700 mb-2">
                Bei Fragen zum Datenschutz können Sie sich jederzeit an uns wenden:
              </p>
              <p className="text-gray-700">
                <strong>E-Mail:</strong> stefaniedincer@einfachbewussterleben.de
              </p>
            </section>

            <p className="text-sm text-gray-500 mt-8">
              Stand: Februar 2026
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
