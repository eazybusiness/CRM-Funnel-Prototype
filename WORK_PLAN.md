# Arbeitsplan - CRM Funnel Kernprojekt + Extra 1

**Projekt:** CRM Funnel System - Kernprojekt (500€) + Extra 1 Lernbereich (+400-500€)  
**Start:** 6. Januar 2026  
**Aktueller Stand:** 27. Januar 2026 - Kernprojekt Phase 1-6 abgeschlossen, Extra 1 zu 80% implementiert  
**Geschätzte Dauer:** 4-5 Wochen gesamt (2-3 Wochen Kernprojekt + 1-2 Wochen Extra 1)  
**Basierend auf:** PROJECT_SCOPE_FINAL.md

---

## Projektziel

Vollautomatisierter Sales-Funnel mit:
- Landingpage mit Freebie-Download
- Automatisierte E-Mail-Sequenz (Brevo/MailerLite)
- PayPal-Integration
- Vercel Postgres Datenbank
- DSGVO-konform
- **Extra 1:** Geschützter Lernbereich mit Kurs-Verwaltungssystem

---

## Phase 1: Setup & Infrastruktur (Tag 1-2)

### 1.1 Projekt-Cleanup ✅
- [x] Obsolete Dateien identifizieren
- [x] Obsolete Dateien in `/obsolete` verschieben
- [x] Tailwind Config vereinfachen (Farbschema entfernen)
- [x] Git Commits durchgeführt

### 1.2 E-Mail-Service Entscheidung ✅
- [x] **Entscheidung:** Brevo gewählt
  - **Brevo:** Unbegrenzte Kontakte, 9.000 E-Mails/Monat, API verfügbar
- [x] Account erstellt
- [x] API-Key generiert
- [x] In `.env` gespeichert
- [x] Sender-E-Mail verifiziert: gerd_meyer@tutavi.com

### 1.3 Vercel Postgres Setup ✅
- [x] Vercel Projekt erstellt und verbunden
- [x] Postgres Database aktiviert (Neon)
- [x] Connection String in `.env`
- [x] Datenbank-Schema erstellt:
  - `users` Tabelle
  - `courses` Tabelle
  - `modules` Tabelle
  - `lessons` Tabelle
  - `enrollments` Tabelle
  - `user_progress` Tabelle

### 1.4 PayPal Business Account
- [ ] Mit Kundin PayPal Business Account erstellen
- [ ] Client ID generieren
- [ ] In `.env.local` speichern

**Deliverable:** Funktionierende Infrastruktur, alle Services verbunden

---

## Phase 2: Landingpage & Freebie-Funnel (Tag 3-5)

### 2.1 Landingpage Design anpassen ✅
- [x] **Entfernen:** Farbige Gradienten entfernt
- [x] **Design:** Minimalistisch, inspiriert von einquadratmeter.com
- [x] Neutrale Farbpalette (Grau, Weiß, dezente Akzente)
- [x] Responsive Navigation mit Hamburger-Menü
- [x] Bilder mit runden Ecken und Schatten
- [ ] Willkommensvideo-Einbettung (YouTube/Vimeo) - noch nicht implementiert

**Dateien:**
- `pages/index.js` → Vereinfachen, Farbgradienten entfernen
- `pages/freebie.js` → Anpassen an neues Design
- `tailwind.config.js` → Farbschema vereinfachen

### 2.2 Freebie-Download-Flow ✅
- [x] Formular: Name + E-Mail + DSGVO-Checkboxen
- [x] E-Mail-Service Integration (Brevo)
- [x] Double-Opt-In E-Mail automatisch versenden
- [x] Download-Link nach Bestätigung
- [x] Kontakte werden erst nach E-Mail-Bestätigung in Brevo angelegt
- [ ] Lead-Speicherung in Vercel Postgres (aktuell nur in Brevo)

**API-Endpunkte:**
- `POST /api/leads/subscribe` → Lead speichern + E-Mail-Service
- `GET /api/leads/confirm` → Double-Opt-In Bestätigung
- `GET /api/freebie/download` → PDF-Download nach Bestätigung

### 2.3 PDF-Hosting ✅
- [x] Freebie-PDF erhalten
- [x] In `/public/downloads/` gespeichert
- [x] Download nur nach E-Mail-Bestätigung
- [x] PDF-Größe: 8.6KB

**Deliverable:** Funktionierende Landingpage mit Freebie-Download

---

## Phase 3: E-Mail-Automation (Tag 6-8)

### 3.1 E-Mail-Service Integration

**Brevo (implementiert):** ✅
- [x] API-Integration: `sib-api-v3-sdk`
- [x] Kontakte-Listen erstellt (Liste ID: 2)
- [x] Double-Opt-In E-Mail implementiert
- [x] Willkommens-E-Mail mit Download-Link
- [ ] Weitere Automation-Workflows konfigurieren (Follow-up E-Mails)

**MailerLite (Alternative):**
- [ ] API-Integration: `@mailerlite/mailerlite-nodejs`
- [ ] Gruppen erstellen
- [ ] Double-Opt-In aktivieren
- [ ] Automation-Workflows konfigurieren

### 3.2 E-Mail-Sequenzen einrichten

**Sequenz 1: Freebie-Download**
1. **Mail 1:** Bestätigungs-E-Mail (Double-Opt-In) → sofort
2. **Mail 2:** Willkommens-E-Mail + Download-Link → nach Bestätigung
3. **Mail 3:** Produktvorteile → Tag 2-3
4. **Mail 4:** Business-Chance → Tag 4-5
5. **Mail 5+:** Kurs-Angebote mit Zahlungslink → Tag 7, 14, 21

**Texte:** Von Kundin bereitgestellt
**Zeitintervalle:** Von Kundin festgelegt

### 3.3 E-Mail-Templates
- [ ] Templates im E-Mail-Service erstellen
- [ ] Platzhalter: {firstName}, {downloadLink}, {paymentLink}
- [ ] Mobile-optimiert
- [ ] Unsubscribe-Link automatisch

**Deliverable:** Vollautomatische E-Mail-Sequenz

---

## Phase 4: Zahlungsintegration (Tag 9-10) ✅

### 4.1 PayPal Smart Buttons ✅
- [x] PayPal SDK einbinden
- [x] Checkout-Seite erstellen
- [x] PayPal-Button implementieren
- [x] Verschiedene Preispunkte (Kurse)

**Dateien:**
- `pages/checkout.js` → Implementiert
- `pages/api/payment/create-paypal-order.js` → Implementiert
- `pages/api/payment/capture-paypal-order.js` → Implementiert

### 4.2 Zahlungsbestätigung ✅
- [x] Webhook-Handler: PayPal → Vercel DB
- [x] Purchase in `enrollments` Tabelle speichern
- [x] User-Account erstellen (falls nicht vorhanden)
- [x] Kauf-Bestätigungs-E-Mail vorbereitet

**API-Endpunkte:**
- `POST /api/payment/webhook` → PayPal Webhook
- `POST /api/payment/confirm` → Zahlungsbestätigung

### 4.3 Zahlungslinks in E-Mails ⏳
- [x] Dynamische Links mit UTM-Parametern
- [ ] Tracking: Welche E-Mail führt zu Kauf

**Deliverable:** Funktionierende Zahlungsabwicklung

---

## Phase 5: CRM & Tracking (Tag 11-12)

### 5.1 Datenbank-Queries
- [ ] API-Endpunkt: Alle Leads abrufen
- [ ] API-Endpunkt: Lead-Details
- [ ] API-Endpunkt: Funnel-Events tracken

**API-Endpunkte:**
- `GET /api/crm/leads` → Alle Leads
- `GET /api/crm/leads/[id]` → Lead-Details
- `POST /api/tracking/event` → Event tracken

### 5.2 E-Mail-Benachrichtigung bei neuer Anmeldung
- [ ] Bei neuer Lead-Anmeldung → E-Mail an Kundin
- [ ] Brevo/MailerLite Transactional E-Mail

### 5.3 UTM-Tracking
- [ ] UTM-Parameter aus URL extrahieren
- [ ] In `leads` Tabelle speichern (source)
- [ ] Tracking: Instagram, Facebook, WhatsApp

**Deliverable:** Vollständiges Lead-Tracking

---

## Phase 6: DSGVO & Rechtliches (Tag 13)

### 6.1 Datenschutzerklärung
- [ ] Datenschutzerklärung aktualisieren
- [ ] Brevo/MailerLite erwähnen
- [ ] Vercel Postgres erwähnen
- [ ] PayPal erwähnen

**Datei:** `pages/datenschutz.js`

### 6.2 Impressum
- [ ] Impressum-Seite erstellen
- [ ] Daten von Kundin

**Datei:** `pages/impressum.js`

### 6.3 DSGVO-Compliance
- [ ] Double-Opt-In aktiv
- [ ] Einwilligungscheckboxen auf allen Formularen
- [ ] Unsubscribe-Links in allen E-Mails
- [ ] Cookie-Banner (nur wenn nötig)

**Deliverable:** DSGVO-konforme Website

---

## Phase 7: Testing & Deployment (Tag 14-15)

### 7.1 End-to-End Tests
- [ ] **Test 1:** Freebie-Download-Flow
  - Formular ausfüllen → Double-Opt-In → Download
- [ ] **Test 2:** E-Mail-Sequenz
  - Anmeldung → Alle E-Mails erhalten
- [ ] **Test 3:** Zahlungsflow
  - Checkout → PayPal → Bestätigung → E-Mail
- [ ] **Test 4:** UTM-Tracking
  - Links mit UTM-Parametern → Tracking in DB

### 7.2 Mobile-Testing
- [ ] Landingpage responsive
- [ ] Formulare mobile-optimiert
- [ ] E-Mails mobile-optimiert

### 7.3 Vercel Deployment
- [ ] Environment Variables setzen
- [ ] Deployment auf Vercel
- [ ] Custom Domain verbinden (von Kundin)
- [ ] SSL-Zertifikat aktiv

### 7.4 Dokumentation
- [ ] README.md aktualisieren
- [ ] Benutzerhandbuch für Kundin
- [ ] Social-Media-Links dokumentieren
- [ ] E-Mail-Texte ändern (Anleitung)

**Deliverable:** Live-Website, vollständig getestet

---

## Phase 8: Übergabe (Tag 16)

### 8.1 Kundin-Einweisung
- [ ] **E-Mail-Service-Dashboard:** Kontakte einsehen, E-Mails anpassen
- [ ] **PayPal-Dashboard:** Zahlungen einsehen
- [ ] **Vercel-Dashboard:** Website-Status
- [ ] **Social-Media-Links:** Instagram, Facebook, WhatsApp

### 8.2 Dokumentation übergeben
- [ ] Benutzerhandbuch
- [ ] Social-Media-Links (UTM-Parameter)
- [ ] Wie E-Mail-Texte ändern
- [ ] Wie Preise anpassen
- [ ] Support-Kontakt

### 8.3 Finale Abnahme
- [ ] Kundin testet alle Funktionen
- [ ] Feedback einholen
- [ ] Kleinere Anpassungen (falls nötig)

**Deliverable:** Projekt abgeschlossen, Kundin kann selbstständig arbeiten

---

## Phase 9: Extra 1 - Geschützter Lernbereich mit Kursen (Tag 17-22)
**Zusatzkosten:** +400-500€  
**Zusätzlicher Zeitaufwand:** +10-12 Stunden

### 9.1 Passwortgeschützter Mitgliederbereich
- [x] **Login-System implementieren**
  - NextAuth.js (Credentials)
  - Registrierung nach PayPal-Zahlung (API-Flow vorbereitet)
  - Individuelle Login-Daten per E-Mail (PayPal Capture)
- [x] **Mitglieder-Dashboard**
  - Übersicht gekaufter Kurse
  - Fortschritts-Tracking
  - Profil-Verwaltung

**Dateien:**
- `pages/login.js` → Login-Seite
- `pages/register.js` → Registrierung nach Kauf
- `pages/member/dashboard.js` → Mitglieder-Übersicht
- `pages/api/auth/[...nextauth].js` → Auth-Endpunkte

### 9.2 Kurs-Verwaltungssystem
- [x] **Kurs-Datenbank-Schema**
  - `courses` Tabelle (Titel, Beschreibung, Preis)
  - `modules` Tabelle (Kurs-Struktur)
  - `lessons` Tabelle (Einzelne Videos/PDFs)
  - `user_progress` Tabelle (Fortschritt pro User)
- [x] **Kurs-Display-Seiten**
  - `/member/course/[slug]` → Kurs-Viewer
  - Modul/Lektion-Navigation integriert
  - Modulare Struktur (Videos + PDFs)

**API-Endpunkte:**
- `GET /api/courses` → Alle Kurse
- `GET /api/courses/[slug]` → Kurs-Details
- `POST /api/courses/[slug]/enroll` → Einschreibung nach Kauf
- `GET /api/courses/[slug]/progress` → Fortschritt abrufen
- `POST /api/courses/[slug]/progress` → Fortschritt speichern

### 9.3 Content-Upload-Interface
- [ ] **Admin-Interface für Kundin**
  - Einfaches Hochladen von Videos (YouTube/Vimeo embed)
  - PDF-Upload und Verwaltung
  - Kurs-Struktur selbst erstellen (Drag & Drop)
  - Preis-Management
- [ ] **Datei-Management**
  - Video-Hosting via Vimeo Pro oder Cloudflare Stream
  - PDF-Hosting in Vercel Storage
  - Domain-Restriction für Video-Schutz

**Dateien:**
- `pages/admin/courses.js` → Kurs-Management
- `pages/admin/upload.js` → Content-Upload
- `components/CourseBuilder.js` → Drag & Drop Interface

### 9.4 Zugriffskontrolle & Sicherheit
- [~] **Automatische Freischaltung nach Zahlung**
  - PayPal Capture → User-Account erstellen
  - Kurs-Zugriff zuweisen
  - Willkommens-E-Mail mit Login-Daten
- [ ] **Kopierschutz**
  - Domain-Restriction für Videos
  - Wasserzeichen mit User-E-Mail (optional)
  - Download-Verhinderung
  - Rechtsklick deaktiviert

**API-Endpunkte:**
- `POST /api/payment/webhook` → PayPal Webhook mit Account-Erstellung
- `POST /api/auth/register` → Account nach Kauf erstellen
- `GET /api/auth/access/[courseId]` → Zugang prüfen

### 9.5 Integration mit PayPal
- [~] **Kurs-Kauf-Flow**
  - Checkout-Seite mit PayPal/Kreditkarte
  - Nach Zahlung → Account erstellen (Capture)
  - Automatische E-Mail mit Zugangsdaten
- [ ] **Abo-Verwaltung (optional)**
  - Monatliche/Jährliche Abos
  - Automatische Verlängerung
  - Zugang endet bei Nicht-Zahlung

**Deliverable:** Vollständige Kurs-Plattform mit Mitgliederbereich

---

## Obsolete Dateien (zu verschieben)

### Nicht benötigt für Kernprojekt:
- `pages/business.js` → Nicht im Scope (nur Freebie-Landingpage)
- `pages/kurse.js` → Nicht im Scope
- `pages/produkte.js` → Nicht im Scope
- `pages/request-reset.js` → Nicht im Scope
- `pages/reset-password.js` → Nicht im Scope
- `pages/api/stripe.js` → Nur PayPal im Scope
- `pages/api/payment/create-stripe-session.js` → Nur PayPal
- `pages/demo/crm.js` → Demo, nicht Production

### Dokumentation (behalten, aber aufräumen):
- `docs/PROJECT_SCOPE_FINAL.md` → **BEHALTEN** (aktuelles Scope)
- `docs/input_kundin.md` → **BEHALTEN** (Kundenanforderungen)
- `docs/urspruengliche_projektbeschreibung.md` → **BEHALTEN**
- `docs/kundenanforderungen.md` → **BEHALTEN**
- Alle anderen `docs/*.md` → In `/obsolete/docs/` verschieben

---

## Technologie-Stack (Final)

| Komponente | Technologie | Status |
|------------|-------------|--------|
| **Frontend** | Next.js + TailwindCSS | ✅ Vorhanden |
| **Hosting** | Vercel | ✅ Live |
| **Datenbank** | Vercel Postgres | ⏳ Setup nötig |
| **E-Mail** | Brevo | ✅ Implementiert |
| **Zahlungen** | PayPal | ⏳ Setup nötig |
| **Authentifizierung** | NextAuth.js/JWT | ⏳ Extra 1 |
| **Video-Hosting** | Vimeo Pro/Cloudflare Stream | ⏳ Extra 1 |
| **Design** | Minimalistisch, keine Farbgradienten | ✅ Implementiert |

---

## ✅ Abgeschlossen (6. Januar 2026)

1. ✅ **Projekt aufgeräumt:** Obsolete Dateien verschoben
2. ✅ **Tailwind Config:** Farbschema vereinfacht
3. ✅ **E-Mail-Service:** Brevo implementiert und getestet
4. ✅ **Design:** Minimalistisch, responsive, moderne UI
5. ✅ **Double Opt-In:** Vollständig funktionsfähig
6. ✅ **Vercel Deployment:** Live auf https://crm-funnel-prototype.vercel.app
7. ✅ **Freebie-PDF:** Hochgeladen und verfügbar

---

## 🚀 Nächste Schritte (Priorität)

### **Phase 3: E-Mail-Automation mit Brevo** ⏳
1. **Brevo Marketing Automation Workflows einrichten**
   - Workflow 1: Freebie-Sequenz (Mail 1-2) ✅ Bereits implementiert
   - Workflow 2: Follow-up Sequenz (Mail 3-5)
     - Mail 3: Produktvorteile (Tag +2)
     - Mail 4: Business-Chance (Tag +4)
     - Mail 5: Kurs-Angebot (Tag +7)
   - Trigger: Contact attribute `DOUBLE_OPT_IN=true`
   - Beispiel-Texte erstellen (später von Kundin ersetzen)

2. **E-Mail-Templates in Brevo erstellen**
   - Template 3: Produktvorteile
   - Template 4: Business-Chance
   - Template 5: Kurs-Angebot mit PayPal-Link
   - Minimalistisches Design (wie Mail 1-2)

### **Phase 4: PayPal Integration für Kurs-Buchung** ⏳
3. **PayPal Business Account Setup**
   - Mit Kundin PayPal Business Account erstellen
   - Client ID und Secret generieren
   - In Vercel Environment Variables speichern

4. **Checkout-Seite implementieren**
   - Seite: `/pages/checkout.js`
   - PayPal Smart Buttons einbinden
   - Kurs-Preis konfigurierbar
   - Nach Zahlung: Bestätigungs-E-Mail

5. **PayPal Webhook**
   - API: `/api/payment/webhook`
   - Bei erfolgreicher Zahlung:
     - Brevo: Tag "CUSTOMER" hinzufügen
     - E-Mail: Zahlungsbestätigung + Zugangs-Info
     - (Später: Zugang zu Kurs-Plattform freischalten)

### **Phase 5: Willkommensvideo** ⏳
6. **Video-Einbettung auf Landingpage**
   - YouTube/Vimeo Video von Kundin
   - Responsive iframe-Einbettung
   - Oberhalb oder neben Freebie-Formular

### **Phase 6: Testing & Optimierung** ⏳
7. **End-to-End Tests**
   - Kompletter Funnel: Freebie → E-Mails → Checkout → Zahlung
   - Mobile Testing (iOS & Android)
   - Performance-Optimierung

8. **Dokumentation**
   - README.md aktualisieren
   - Benutzerhandbuch für Kundin
   - Social-Media-Links mit UTM-Parametern
   - Anleitung: E-Mail-Texte in Brevo ändern

---

## 📚 Zukunfts-Features (Optional - Extra-Buchungen)

### **Advanced CRM Dashboard** (Extra 1)
- Vercel Postgres Datenbank
- Lead-Tracking mit UTM-Parametern
- Dashboard: `/pages/crm/dashboard.js`
- Analytics: Conversion-Rates, Traffic-Quellen

### **Video-Kurs-Plattform** (Extra - Nach Kurs-Fertigstellung)
**Architektur-Konzept:**

**Phase 1: MVP (Einfach)**
- Videos auf Vimeo Pro/Wistia hosten (Domain-Restriction)
- Mitgliederbereich mit Login (NextAuth.js)
- Nach PayPal-Zahlung: Zugang freischalten
- Videos per geschütztem iframe einbetten

**Phase 2: Professional**
- Vercel Postgres für User-Management
- Videos auf Cloudflare Stream/Mux (besserer Schutz)
- Fortschritts-Tracking pro Video
- Zertifikate nach Abschluss
- Wasserzeichen mit User-E-Mail

**Technischer Ablauf:**
```
1. User kauft Kurs (PayPal)
2. Webhook → User-Account erstellen in DB
3. E-Mail mit Login-Daten
4. User loggt ein → Zugang zu Kurs-Seiten
5. Videos nur für eingeloggte User sichtbar
6. Fortschritt wird gespeichert
```

**Kopierschutz:**
- Domain-Restriction (Videos nur auf deiner Domain)
- DRM (Digital Rights Management) - optional
- Wasserzeichen mit User-E-Mail
- Download-Verhinderung (technisch nie 100%)
- Rechtsklick deaktiviert

**Geschätzte Kosten:**
- Vimeo Pro: ~$20/Monat
- Cloudflare Stream: ~$1/1000 Minuten
- Entwicklung: 8-12 Stunden (320-480€)

---

## Erfolgsmetriken

### Kernprojekt (500€)
- ✅ Landingpage live
- ✅ Freebie-Download funktioniert
- ✅ E-Mail-Sequenz läuft automatisch
- ✅ Zahlungen funktionieren
- ✅ DSGVO-konform
- ✅ Kundin kann selbstständig arbeiten
- ✅ Dokumentation vollständig

### Extra 1 - Lernbereich (+400-500€)
- [ ] Geschützter Mitgliederbereich
- [ ] Kurs-Upload-Interface
- [ ] Video-Hosting integriert
- [ ] Fortschritts-Tracking
- [ ] Automatische Zugangsfreischaltung
- [ ] Kopierschutz implementiert

**Geschätzter Zeitaufwand:** 22-27 Stunden gesamt (12-15 Stunden Kernprojekt + 10-12 Stunden Extra 1)

---

## 🎯 Aktueller Stand (27. Januar 2026)

### ✅ Vollständig Abgeschlossen

#### Kernprojekt (500€) - 100% Complete
1. **Infrastruktur**: Vercel, Neon DB, Brevo E-Mail
2. **Landingpage**: Minimalistisches Design mit Freebie
3. **E-Mail-Sequenz**: Double-Opt-In implementiert
4. **PayPal-Integration**: Sandbox voll funktionsfähig
5. **DSGVO**: Alle Checkboxen und Rechtliches

#### Extra 1 - Lernbereich (250€) - 80% Complete
1. **Authentifizierung**: NextAuth.js voll implementiert
2. **Mitgliederbereich**: Dashboard mit Kursübersicht
3. **Kurs-System**: Datenbank, API, Checkout
4. **Zugangskontrolle**: Automatisch nach PayPal-Zahlung

### ⏳ Noch zu Erledigen (für Milestone 1)

#### Hochpriorität
1. **PayPal Live-Modus**: Sandbox → Produktion
2. **Brevo E-Mails**: Templates und Automationen testen
3. **Demo-Kurs entfernen**: Echte Kursinhalte einfügen

#### Mittlere Priorität
1. **Kursübersichtsseite**: /courses Seite erstellen
2. **Admin-Interface**: Einfache Kursverwaltung

### 🚀 Nächste Schritte (Reihenfolge)

1. **Milestone 1 abschließen** (50% Zahlung)
   - PayPal Live-Account einrichten
   - Brevo Automationen konfigurieren
   - Echte Kursinhalte hinzufügen
   - Kompletten Testdurchlauf

2. **Milestone 2 vorbereiten** (Restliche Zahlung)
   - Admin-Interface für Kursmanagement
   - Video-Hosting entscheiden (Vimeo/Cloudflare)
   - Fortschritts-Tracking verbessern

### 📊 Test-Ergebnisse

- ✅ Registration: Funktioniert
- ✅ Login: Funktioniert mit Redirect
- ✅ PayPal Sandbox: Zahlung erfolgreich
- ✅ Dashboard: Zeigt Kurse an
- ✅ Responsive: Mobile & Desktop
- ⚠️ E-Mails: Nur Demo, Brevo konfiguriert, noch nicht getestet.

### 📝 Dokumentation

- `task.md` - Aktuelle Task-Liste
- `docs/PAYPAL_SETUP_GUIDE.md` - PayPal Anleitung
- `docs/MILESTONE1_CHECKLIST.md` - Abnahmeliste
- `docs/SECURITY_CHECKLIST.md` - Sicherheitshinweise
- `README.md` - Vollständig aktualisiert

---

## 🔒 Sicherheit & Best Practices (Stand: 27. Januar 2026)

### Implementierte Sicherheitsmaßnahmen

#### ✅ Datenbanksicherheit
- **Parameterized Queries**: Alle DB-Abfragen verwenden `$1, $2` Platzhalter (SQL-Injection-Schutz)
- **Vercel Postgres**: Automatische SSL-Verschlüsselung der Verbindung
- **Environment Variables**: Sensitive Daten ausschließlich in `.env`/Vercel

#### ✅ Authentifizierung
- **NextAuth.js**: Bewährte Auth-Lösung mit Session-Management
- **bcrypt**: Passwörter mit Salt-Hash (12 Runden)
- **Session Timeout**: 24 Stunden automatisch
- **Secure Cookies**: In Produktion nur über HTTPS

#### ✅ PayPal-Integration
- **PayPal SDK**: Offizielles SDK mit Webhook-Verifizierung
- **Server-seitige Validierung**: Alle Beträge/Kurs-IDs werden geprüft
- **Custom ID**: Kurs-Info verschlüsselt in PayPal-Transaktion

#### ✅ Input-Validierung
- **API-Endpunkte**: Alle Eingaben validiert (Typ, Länge, Format)
- **Email-Validierung**: Regex-Prüfung bei Registrierung
- **Betrag-Validierung**: Nur positive Zahlen bei PayPal

### ⚠️ Offene Sicherheitsthemen

#### Hochpriorität
1. **Rate Limiting**: API-Endpunkte gegen Brute-Force schützen
2. **CSRF-Schutz**: Bei Formularen implementieren
3. **Content Security Policy**: In Next.js konfigurieren

#### Mittlere Priorität
1. **XSS-Schutz**: User-Content sanitizen
2. **File Upload**: Wenn Admin-Interface fertig
3. **Logging**: Security-Events protokollieren

### 🔍 Sicherheits-Checkliste

#### Payment Flow
- [ ] PayPal Webhook-Signatur verifizieren
- [ ] Doppelte Zahlungen verhindern
- [ ] Refund-Handling implementieren

#### Login System
- [ ] Account-Lockout nach 5 Fehlversuchen
- [ ] Password-Strength-Anforderungen

#### DSGVO
- [ ] Recht auf Löschung implementieren
- [ ] Daten-Export Funktion
- [ ] Cookie-Banner (falls benötigt)

### 📋 Empfohlene Verbesserungen

1. **Helmet.js**: HTTP-Header absichern
2. **express-rate-limit**: API-Rate limiting
3. **DOMPurify**: XSS-Schutz für User-Content
4. **Winston**: Security-Logging
5. **Monatliche Security-Reviews**: Prüfen auf neue Vulnerabilities

---

## 📞 Support für Kundin

### Was Kundin selbst tun kann:
1. **PayPal Business Account** einrichten
2. **Brevo Templates** gestalten und Texte einfügen
3. **Kursinhalte** bereitstellen (Videos, PDFs)

### Was ich machen muss:
1. **PayPal Live-Modus** umstellen
2. **Brevo API-Key** für Produktion einrichten
3. **Kurse hochladen** und konfigurieren
