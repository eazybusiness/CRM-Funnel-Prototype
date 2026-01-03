# Benutzerhandbuch - CRM Funnel System

## Willkommen! 👋

Dieses Handbuch erklärt dir Schritt für Schritt, wie du dein CRM-Funnel-System verwendest, anpasst und verwaltest.

---

## 📋 Inhaltsverzeichnis

1. [Erste Schritte](#erste-schritte)
2. [Freebie-Landingpage verwalten](#freebie-landingpage-verwalten)
3. [E-Mail-Sequenzen einrichten](#e-mail-sequenzen-einrichten)
4. [Zahlungen verwalten](#zahlungen-verwalten)
5. [Texte anpassen](#texte-anpassen)
6. [Design anpassen](#design-anpassen)
7. [Häufige Aufgaben](#häufige-aufgaben)
8. [Fehlerbehebung](#fehlerbehebung)

---

## Erste Schritte

### Was ist dieses System?

Dein CRM-Funnel-System ist eine Website, die:
- Besucher mit einem kostenlosen Freebie anzieht
- E-Mail-Adressen DSGVO-konform sammelt (Double-Opt-In)
- Automatisch E-Mail-Sequenzen versendet
- Zahlungen über PayPal und Kreditkarte akzeptiert
- Langfristige Beziehungen zu deiner Community aufbaut

### Systemübersicht

```
Besucher → Freebie-Seite → E-Mail-Anmeldung → Bestätigungs-E-Mail 
→ Download-Link → Willkommens-E-Mail → Follow-up-E-Mails
```

---

## Freebie-Landingpage verwalten

### Wo finde ich die Freebie-Seite?

Die Hauptseite für dein Freebie befindet sich unter:
- **URL:** `https://deinewebsite.de/freebie`
- **Datei:** `pages/freebie.js`

### Texte auf der Freebie-Seite ändern

1. Öffne die Datei `pages/freebie.js`
2. Suche nach den Texten, die du ändern möchtest
3. Wichtige Bereiche:

#### Hauptüberschrift ändern:
```javascript
<h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
  Dein kostenloser Guide zu mehr{' '}
  <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600">
    Bewusstsein
  </span>
</h1>
```

#### Beschreibungstext ändern:
```javascript
<p className="text-xl text-gray-600 mb-8">
  Entdecke praktische Tipps und Strategien für einen minimalistischen 
  und bewussten Lebensstil...
</p>
```

#### Vorteile anpassen:
```javascript
<div className="flex items-start">
  <CheckCircle className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-1" />
  <div>
    <h3 className="font-semibold text-gray-900">Sofort umsetzbar</h3>
    <p className="text-gray-600">Praktische Übungen für den Alltag</p>
  </div>
</div>
```

### Freebie-PDF hochladen

1. Erstelle einen Ordner `public/downloads` (falls nicht vorhanden)
2. Lege deine PDF-Datei dort ab: `public/downloads/freebie.pdf`
3. Die Datei ist dann automatisch verfügbar unter: `https://deinewebsite.de/downloads/freebie.pdf`

**Wichtig:** Die PDF-Datei sollte:
- Professionell gestaltet sein
- Dein Branding enthalten
- Wertvollen Inhalt bieten
- Nicht zu groß sein (max. 5 MB)

---

## E-Mail-Sequenzen einrichten

### E-Mail-Tool verbinden (MailerLite Beispiel)

1. **MailerLite Account erstellen:**
   - Gehe zu [mailerlite.com](https://www.mailerlite.com)
   - Registriere dich kostenlos
   - Bestätige deine E-Mail-Adresse

2. **API-Key generieren:**
   - Gehe zu Einstellungen → Integrations → Developer API
   - Klicke auf "Generate new token"
   - Kopiere den API-Key

3. **API-Key in dein System eintragen:**
   - Öffne die Datei `.env.local`
   - Füge hinzu:
   ```
   SMTP_HOST=smtp.mailerlite.com
   SMTP_PORT=587
   SMTP_USER=deine@email.de
   SMTP_PASS=dein-mailerlite-api-key
   SMTP_FROM="Dein Name" <noreply@deinewebsite.de>
   ```

### E-Mail-Sequenzen erstellen

#### 1. Bestätigungs-E-Mail (Double-Opt-In)
**Datei:** `pages/api/subscribe.js`

Diese E-Mail wird automatisch versendet, wenn sich jemand anmeldet.

**Was du anpassen kannst:**
- Absendername
- Betreffzeile
- E-Mail-Text
- Design

**Beispiel-Anpassung:**
```javascript
subject: 'Bitte bestätige deine E-Mail-Adresse',
```
Ändere zu:
```javascript
subject: '🌱 Nur noch ein Schritt zu deinem Freebie',
```

#### 2. Willkommens-E-Mail mit Download
**Datei:** `pages/api/confirm.js`

Diese E-Mail enthält den Download-Link für dein Freebie.

**Wichtige Anpassungen:**
```javascript
<p style="color: #4b5563; font-size: 16px; line-height: 1.6;">
  Herzlich willkommen! Schön, dass du dabei bist.
</p>
```

Personalisiere den Text nach deinem Stil!

#### 3. Follow-up-E-Mails erstellen

Für automatische Follow-up-E-Mails empfehle ich, diese direkt in MailerLite zu erstellen:

**In MailerLite:**
1. Gehe zu "Automation" → "Create Workflow"
2. Wähle "When subscriber joins a group"
3. Erstelle deine E-Mail-Sequenz:

**Beispiel-Sequenz:**
- **Tag 0:** Willkommens-E-Mail (automatisch vom System)
- **Tag 3:** Wertvoller Tipp #1
- **Tag 7:** Inspirierende Geschichte
- **Tag 14:** Exklusives Angebot
- **Tag 21:** Community-Einladung
- **Tag 30:** Feedback-Anfrage

### E-Mail-Texte schreiben - Best Practices

#### Betreffzeilen:
- ✅ Kurz und prägnant (max. 50 Zeichen)
- ✅ Persönlich und authentisch
- ✅ Neugier wecken, aber nicht clickbaity
- ❌ Keine Großbuchstaben (NICHT SO)
- ❌ Keine übertriebenen Versprechen

**Gute Beispiele:**
- "Dein erster Schritt zu mehr Klarheit 🌱"
- "Was ich heute gelernt habe..."
- "Eine Frage an dich"

#### E-Mail-Inhalt:
- ✅ Persönliche Ansprache (Du-Form)
- ✅ Kurze Absätze (max. 3-4 Zeilen)
- ✅ Ein klarer Call-to-Action
- ✅ Deine persönliche Note
- ❌ Keine Verkaufssprache
- ❌ Nicht zu lang (max. 300 Wörter)

**Struktur:**
1. Persönliche Begrüßung
2. Wertvoller Inhalt/Tipp
3. Call-to-Action (optional)
4. Persönliche Verabschiedung

---

## Zahlungen verwalten

### PayPal einrichten

1. **PayPal Business Account erstellen:**
   - Gehe zu [paypal.com/business](https://www.paypal.com/business)
   - Registriere dich als Business Account
   - Verifiziere dein Konto

2. **API-Credentials generieren:**
   - Gehe zu Developer Dashboard
   - Erstelle eine App
   - Kopiere Client ID und Secret

3. **In System eintragen:**
   ```
   PAYPAL_CLIENT_ID=deine-client-id
   PAYPAL_CLIENT_SECRET=dein-secret
   PAYPAL_API_URL=https://api-m.paypal.com (für Live)
   ```

### Stripe einrichten

1. **Stripe Account erstellen:**
   - Gehe zu [stripe.com](https://stripe.com)
   - Registriere dich
   - Verifiziere dein Konto

2. **API-Keys kopieren:**
   - Gehe zu Developers → API Keys
   - Kopiere Publishable Key und Secret Key

3. **In System eintragen:**
   ```
   STRIPE_PUBLIC_KEY=pk_live_...
   STRIPE_SECRET_KEY=sk_live_...
   ```

### Preise ändern

**Datei:** `pages/payment/checkout.js`

```javascript
const product = {
  name: 'Premium-Kurs: Bewusster Minimalismus',
  price: 97,  // ← Hier den Preis ändern
  currency: 'EUR',
  description: 'Dein Weg zu mehr Klarheit und bewusstem Leben'
}
```

### Zahlungsbestätigungen anpassen

**Erfolgsseite:** `pages/payment/success.js`
**Abbruchseite:** `pages/payment/cancel.js`

Passe die Texte nach deinen Wünschen an.

---

## Texte anpassen

### Hauptseite (Landing Page)

**Datei:** `pages/index.js`

#### Überschrift ändern:
```javascript
<h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
  Willkommen auf deinem
  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
    {' '}Erfolgsweg
  </span>
</h1>
```

#### Untertitel ändern:
```javascript
<p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
  Wähle den Weg, der am besten zu deinen Zielen passt. 
  Wir begleiten dich Schritt für Schritt zum Erfolg.
</p>
```

### Datenschutzerklärung anpassen

**Datei:** `pages/datenschutz.js`

**Wichtig:** Füge deine persönlichen Daten ein:
- [ ] Dein Name
- [ ] Deine Adresse
- [ ] Deine E-Mail
- [ ] Deine Telefonnummer

Suche nach `[IHR NAME]` und ersetze alle Platzhalter.

---

## Design anpassen

### Farben ändern

**Datei:** `tailwind.config.js`

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#10b981',    // Grün
        secondary: '#3b82f6',  // Blau
        // Füge deine eigenen Farben hinzu
      }
    }
  }
}
```

### Schriftarten ändern

**Datei:** `pages/_app.js`

```javascript
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })
```

Ersetze `Inter` durch eine andere Google Font.

### Logo hinzufügen

1. Lege dein Logo in `public/logo.png` ab
2. Füge es in der Navigation ein:

```javascript
<img src="/logo.png" alt="Logo" className="h-8" />
```

---

## Häufige Aufgaben

### Neue Seite hinzufügen

1. Erstelle eine neue Datei in `pages/`, z.B. `pages/ueber-mich.js`
2. Kopiere die Struktur von einer bestehenden Seite
3. Passe den Inhalt an
4. Verlinke die Seite in der Navigation

### Formular-Felder hinzufügen

**Beispiel:** Telefonnummer zum Anmeldeformular hinzufügen

In `pages/freebie.js`:

```javascript
const [formData, setFormData] = useState({
  firstName: '',
  email: '',
  phone: '',  // ← Neu
  consent: false,
  dataProtection: false
})
```

Füge das Eingabefeld hinzu:
```javascript
<div>
  <label htmlFor="phone">Telefon (optional)</label>
  <input
    type="tel"
    id="phone"
    name="phone"
    value={formData.phone}
    onChange={handleChange}
  />
</div>
```

### Bilder hinzufügen

1. Lege Bilder in `public/images/` ab
2. Verwende sie so:

```javascript
<img src="/images/mein-bild.jpg" alt="Beschreibung" />
```

---

## Fehlerbehebung

### E-Mails kommen nicht an

**Checkliste:**
- [ ] SMTP-Einstellungen korrekt in `.env.local`?
- [ ] API-Key von MailerLite gültig?
- [ ] Spam-Ordner überprüft?
- [ ] E-Mail-Adresse korrekt verifiziert?

**Lösung:**
1. Überprüfe die Konsole auf Fehlermeldungen
2. Teste mit einer anderen E-Mail-Adresse
3. Kontaktiere den E-Mail-Provider-Support

### Zahlungen funktionieren nicht

**Checkliste:**
- [ ] PayPal/Stripe im Live-Modus?
- [ ] API-Keys korrekt eingetragen?
- [ ] Konto verifiziert?

**Lösung:**
1. Überprüfe die Browser-Konsole (F12)
2. Teste im Sandbox-Modus
3. Überprüfe die API-Logs bei PayPal/Stripe

### Seite lädt nicht

**Checkliste:**
- [ ] Server läuft? (`npm run dev` oder `npm start`)
- [ ] Alle Dependencies installiert? (`npm install`)
- [ ] Keine Syntax-Fehler im Code?

**Lösung:**
1. Terminal überprüfen auf Fehlermeldungen
2. Browser-Cache leeren
3. Server neu starten

### Double-Opt-In funktioniert nicht

**Checkliste:**
- [ ] Bestätigungs-Link korrekt generiert?
- [ ] `NEXT_PUBLIC_BASE_URL` korrekt gesetzt?
- [ ] Token nicht abgelaufen? (24 Stunden)

**Lösung:**
1. Überprüfe die URL in der E-Mail
2. Teste mit einer neuen Anmeldung
3. Überprüfe die API-Logs

---

## Support & Hilfe

### Wo bekomme ich Hilfe?

1. **Dokumentation:**
   - README.md - Technische Übersicht
   - HOSTING_GUIDE.md - Hosting-Optionen
   - Dieses Handbuch - Bedienung

2. **Community:**
   - Next.js Dokumentation: [nextjs.org/docs](https://nextjs.org/docs)
   - Tailwind CSS: [tailwindcss.com/docs](https://tailwindcss.com/docs)

3. **Technischer Support:**
   - E-Mail: [DEINE SUPPORT-EMAIL]
   - Support-Stunden: [X] Stunden inklusive

### Wartungsvertrag (Optional)

Nach der Übergabe kannst du einen Wartungsvertrag abschließen:
- Monatliche Updates
- Prioritäts-Support
- Backup-Service
- Performance-Optimierung

---

## Checkliste: Nach der Übergabe

- [ ] Alle Zugangsdaten erhalten und getestet
- [ ] E-Mail-Tool eingerichtet und getestet
- [ ] PayPal/Stripe eingerichtet und getestet
- [ ] Eigene Texte eingefügt
- [ ] Datenschutzerklärung personalisiert
- [ ] Impressum erstellt
- [ ] Freebie-PDF hochgeladen
- [ ] Test-Anmeldung durchgeführt
- [ ] Test-Zahlung durchgeführt
- [ ] Domain verbunden
- [ ] SSL-Zertifikat aktiv
- [ ] Backup-Strategie festgelegt

---

## Tipps für den Erfolg

### Content-Strategie

1. **Regelmäßigkeit:**
   - Versende E-Mails in festen Abständen
   - Bleibe konsistent in deiner Kommunikation

2. **Mehrwert:**
   - Jede E-Mail sollte Wert bieten
   - Nicht nur verkaufen, sondern helfen

3. **Authentizität:**
   - Bleibe dir selbst treu
   - Teile persönliche Geschichten

### Community-Aufbau

1. **Engagement fördern:**
   - Stelle Fragen in deinen E-Mails
   - Bitte um Feedback
   - Reagiere auf Antworten

2. **Segmentierung:**
   - Teile deine Liste nach Interessen
   - Versende relevante Inhalte

3. **Langfristigkeit:**
   - Denke in Jahren, nicht Monaten
   - Baue echte Beziehungen auf

---

## Nächste Schritte

1. ✅ Dieses Handbuch durchlesen
2. ✅ System testen (Anmeldung, E-Mails, Zahlung)
3. ✅ Eigene Texte einfügen
4. ✅ Freebie erstellen und hochladen
5. ✅ E-Mail-Sequenzen schreiben
6. ✅ Test-Launch mit kleiner Gruppe
7. ✅ Feedback sammeln und optimieren
8. ✅ Offizieller Launch

---

## Viel Erfolg! 🚀

Du hast jetzt alle Werkzeuge, um dein CRM-Funnel-System erfolgreich zu nutzen. 

Denke daran:
- Starte klein und wachse organisch
- Höre auf deine Community
- Bleibe authentisch
- Habe Geduld

Bei Fragen stehe ich dir gerne zur Verfügung!

**Kontakt:**
- E-Mail: [DEINE EMAIL]
- Support-Stunden: [X] Stunden inklusive

---

*Letzte Aktualisierung: Januar 2026*
