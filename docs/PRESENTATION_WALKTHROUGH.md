# Live Walk‑through – CRM Funnel für „Einfach bewusster leben“

**Datum:** [Datum des Meetings]  
**URL:** https://crm-funnel-prototype.vercel.app/  
**Status:** Kernprojekt + Extra 1 (Mitgliederbereich) – Demo‑Daten, PayPal Sandbox, Brevo‑Integration ready

---

## 1. Übersicht – Was wir zeigen

| Bereich | Was es ist | Live‑Link | Anmerkungen |
|---------|-------------|-----------|-------------|
| Landingpage | Startseite mit Kurs‑Übersicht, Freebie‑Formular | https://crm-funnel-prototype.vercel.app/ | Minimalistisches Design, responsive |
| Freebie‑Funnel | Double‑Opt‑In → Download | https://crm-funnel-prototype.vercel.app/freebie | E-Mail‑Sequenz via Brevo (Demo) |
| Authentifizierung | Registrierung & Login | https://crm-funnel-prototype.vercel.app/register | Passwort‑Hash, Session‑Management |
| Mitglieder‑Dashboard | Übersicht gekaufter Kurse | https://crm-funnel-prototype.vercel.app/member/dashboard | Nur nach Login |
| Kurs‑Viewer | Geschützte Kursseite | https://crm-funnel-prototype.vercel.app/member/course/minimalismus-grundlagen | Demo‑Kurs mit Modulen/Lektionen |
| Checkout | PayPal‑Bezahlung | https://crm-funnel-prototype.vercel.app/checkout?courseId=1&courseName=Minimalismus%20Grundlagen&price=49 | Sandbox |
| Payment‑Bestätigung | Nach Zahlung | https://crm-funnel-prototype.vercel.app/payment/success | Webhook‑Ready |
| Rechtliches | Impressum & Datenschutz | https://crm-funnel-prototype.vercel.app/impressum | DSGVO‑konform |
| Versteckte Kursübersicht | Öffentlich, nicht im Menü | https://crm-funnel-prototype.vercel.app/courses | Direktlink für E‑Mail‑Kampagnen |

---

## 2. Walk‑through – Schritt für Schritt

### 2.1 Landingpage (ca. 2 Min)

- **Link:** https://crm-funnel-prototype.vercel.app/
- **Zeigpunkte:**
  - Minimalistisches Design (keine Farbgradienten)
  - Kurs‑Sektion (Demo‑Kurs sichtbar)
  - Freebie‑Formular (Name + E-Mail + Checkboxen)
  - Mobile‑Ansicht (responsive)

---

### 2.2 Freebie‑Funnel (ca. 3 Min)

- **Link:** https://crm-funnel-prototype.vercel.app/freebie
- **Ablauf zeigen:**
  1. Formular ausfüllen → Double‑Opt‑In
  2. Bestätigungs‑Mail (Demo via Brevo)
  3. Download‑Link nach Bestätigung
- **Hinweis:** E‑Mail‑Sequenz ist Demo‑Setup; finale Texte folgen.

---

### 2.3 Authentifizierung (ca. 2 Min)

- **Registrierung:** https://crm-funnel-prototype.vercel.app/register
  - Passwort‑Hashing, Session‑Management
- **Login:** https://crm-funnel-prototype.vercel.app/login
  - Redirect nach Login
- **Passwort‑Reset:** https://crm-funnel-prototype.vercel.app/forgot-password
  - Optional, falls Zeit bleibt

---

### 2.4 Mitglieder‑Dashboard (ca. 2 Min)

- **Link:** https://crm-funnel-prototype.vercel.app/member/dashboard
- **Zeigpunkte:**
  - Übersicht gekaufter Kurse (Demo‑Daten)
  - Fortschritts‑Anzeige (Demo)
  - Logout‑Funktion

---

### 2.5 Kurs‑Viewer (ca. 3 Min)

- **Link:** https://crm-funnel-prototype.vercel.app/member/course/minimalismus-grundlagen
- **Zeigpunkte:**
  - Modul‑Struktur
  - Lektionen (Video‑Placeholder, PDF‑Placeholder)
  - Fortschritt speichern (Demo)
  - Geschützt: Nur nach Login

---

### 2.6 Checkout & PayPal (ca. 3 Min)

- **Link:** https://crm-funnel-prototype.vercel.app/checkout?courseId=1&courseName=Minimalismus%20Grundlagen&price=49
- **Ablauf zeigen:**
  1. PayPal‑Button (Sandbox)
  2. Test‑Zahlung durchführen (PayPal Sandbox Account)
  3. Webhook‑Ready → Einschreibung nach Zahlung
- **Hinweis:** Nur Sandbox, Live‑Setup später.

---

### 2.7 Rechtliches (ca. 1 Min)

- **Impressum:** https://crm-funnel-prototype.vercel.app/impressum
- **Datenschutz:** https://crm-funnel-prototype.vercel.app/datenschutz
- **Zeigpunkte:**
  - DSGVO‑Checkboxen auf Formularen
  - Double‑Opt‑In
  - Datenschutzerklärung aktualisiert (Brevo, Vercel Postgres, PayPal)

---

### 2.8 Versteckte Kursübersicht (ca. 1 Min)

- **Link:** https://crm-funnel-prototype.vercel.app/courses
- **Zeigpunkte:**
  - Öffentliche Seite, nicht im Menü
  - Für E‑Mail‑Kampagnen gedacht
  - „Mehr erfahren“ → Kurs‑Detail

---

## 3. Was wir **nicht** zeigen (außer explizit gefragt)

- Admin‑Interface (`/admin/courses`) – noch nicht produktiv
- API‑Endpunkte – nur technisch
- Interne Logs / Security‑Logging – nicht im UI sichtbar

---

## 4. Nächste Schritte (für die Kundin)

| Was | Wer | Wann |
|-----|-----|------|
| PayPal Live‑Account einrichten | Kundin | Nach Meeting |
| Brevo Live‑API-Key & finale Templates | Kundin | Nach Meeting |
| Echte Kursinhalte (Videos/PDFs) liefern | Kundin | Nach Meeting |
| Live‑Deployment mit echten Daten | Ich | Nach Lieferung |

---

## 5. Offene Fragen (falls die Kundin fragt)

- **Video‑Hosting:** Kleine Videos können auf Vercel liegen; für große Inhalte später Vimeo/Cloudflare möglich.
- **Admin‑Upload:** Nicht im Kernprojekt; kann als Extra gebucht werden.
- **UTM‑Tracking:** Links sind dokumentiert; Auswertung über Brevo/Analytics.
- **Zahlungs‑Webhook:** Funktioniert in Sandbox; Live‑Setup nach PayPal‑Credentials.

---

**Viel Erfolg beim Meeting!**  
Falls du während der Demo eine bestimmte Funktion live zeigen möchtest, hier sind alle Links nochmal kompakt:

- https://crm-funnel-prototype.vercel.app/
- https://crm-funnel-prototype.vercel.app/freebie
- https://crm-funnel-prototype.vercel.app/register
- https://crm-funnel-prototype.vercel.app/login
- https://crm-funnel-prototype.vercel.app/member/dashboard
- https://crm-funnel-prototype.vercel.app/member/course/minimalismus-grundlagen
- https://crm-funnel-prototype.vercel.app/checkout?courseId=1&courseName=Minimalismus%20Grundlagen&price=49
- https://crm-funnel-prototype.vercel.app/payment/success
- https://crm-funnel-prototype.vercel.app/impressum
- https://crm-funnel-prototype.vercel.app/datenschutz
- https://crm-funnel-prototype.vercel.app/courses
