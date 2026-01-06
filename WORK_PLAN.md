# Arbeitsplan - CRM Funnel Kernprojekt

**Projekt:** CRM Funnel System - Kernprojekt (500€)  
**Start:** 6. Januar 2026  
**Geschätzte Dauer:** 2-3 Wochen  
**Basierend auf:** PROJECT_SCOPE_FINAL.md

---

## Projektziel

Vollautomatisierter Sales-Funnel mit:
- Landingpage mit Freebie-Download
- Automatisierte E-Mail-Sequenz (Brevo/MailerLite)
- PayPal-Integration
- Vercel Postgres Datenbank
- DSGVO-konform

---

## Phase 1: Setup & Infrastruktur (Tag 1-2)

### 1.1 Projekt-Cleanup ✅
- [x] Obsolete Dateien identifizieren
- [ ] Obsolete Dateien in `/obsolete` verschieben
- [ ] Tailwind Config vereinfachen (Farbschema entfernen)
- [ ] Git Commit: "Project cleanup for production"

### 1.2 E-Mail-Service Entscheidung
- [ ] **Entscheidung:** Brevo vs MailerLite
  - **Brevo:** Unbegrenzte Kontakte, 9.000 E-Mails/Monat, API verfügbar
  - **MailerLite:** 500 Kontakte, 12.000 E-Mails/Monat, API verfügbar
- [ ] Account erstellen (mit Kundin oder für Kundin)
- [ ] API-Key generieren
- [ ] In `.env.local` speichern

### 1.3 Vercel Postgres Setup
- [ ] Vercel Projekt erstellen/verbinden
- [ ] Postgres Database aktivieren
- [ ] Connection String in `.env.local`
- [ ] Datenbank-Schema erstellen:
  - `leads` Tabelle
  - `purchases` Tabelle
  - `funnel_events` Tabelle

### 1.4 PayPal Business Account
- [ ] Mit Kundin PayPal Business Account erstellen
- [ ] Client ID generieren
- [ ] In `.env.local` speichern

**Deliverable:** Funktionierende Infrastruktur, alle Services verbunden

---

## Phase 2: Landingpage & Freebie-Funnel (Tag 3-5)

### 2.1 Landingpage Design anpassen
- [ ] **Entfernen:** Farbige Gradienten (Kundin möchte keine Farbspiegel)
- [ ] **Design:** Minimalistisch, inspiriert von einquadratmeter.com
- [ ] Neutrale Farbpalette (Grau, Weiß, dezente Akzente)
- [ ] Willkommensvideo-Einbettung (YouTube/Vimeo)

**Dateien:**
- `pages/index.js` → Vereinfachen, Farbgradienten entfernen
- `pages/freebie.js` → Anpassen an neues Design
- `tailwind.config.js` → Farbschema vereinfachen

### 2.2 Freebie-Download-Flow
- [ ] Formular: Name + E-Mail + DSGVO-Checkboxen
- [ ] Lead-Speicherung in Vercel Postgres (nicht localStorage)
- [ ] E-Mail-Service Integration (Brevo/MailerLite)
- [ ] Double-Opt-In E-Mail automatisch versenden
- [ ] Download-Link nach Bestätigung

**API-Endpunkte:**
- `POST /api/leads/subscribe` → Lead speichern + E-Mail-Service
- `GET /api/leads/confirm` → Double-Opt-In Bestätigung
- `GET /api/freebie/download` → PDF-Download nach Bestätigung

### 2.3 PDF-Hosting
- [ ] Freebie-PDF von Kundin erhalten
- [ ] In `/public/downloads/` speichern (geschützt)
- [ ] Download nur nach E-Mail-Bestätigung

**Deliverable:** Funktionierende Landingpage mit Freebie-Download

---

## Phase 3: E-Mail-Automation (Tag 6-8)

### 3.1 E-Mail-Service Integration

**Brevo (empfohlen):**
- [ ] API-Integration: `@sendinblue/client`
- [ ] Kontakte-Listen erstellen
- [ ] Double-Opt-In Template
- [ ] Automation-Workflows konfigurieren

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

## Phase 4: Zahlungsintegration (Tag 9-10)

### 4.1 PayPal Smart Buttons
- [ ] PayPal SDK einbinden
- [ ] Checkout-Seite erstellen
- [ ] PayPal-Button implementieren
- [ ] Verschiedene Preispunkte (Kurse)

**Dateien:**
- `pages/checkout.js` → Vereinfachen
- `pages/api/payment/create-paypal-order.js` → Implementieren
- `pages/api/payment/capture-paypal-order.js` → Implementieren

### 4.2 Zahlungsbestätigung
- [ ] Webhook-Handler: PayPal → Vercel DB
- [ ] Purchase in `purchases` Tabelle speichern
- [ ] E-Mail-Service: Tag "Customer" hinzufügen
- [ ] Kauf-Bestätigungs-E-Mail triggern

**API-Endpunkte:**
- `POST /api/payment/webhook` → PayPal Webhook
- `POST /api/payment/confirm` → Zahlungsbestätigung

### 4.3 Zahlungslinks in E-Mails
- [ ] Dynamische Links mit UTM-Parametern
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

## Obsolete Dateien (zu verschieben)

### Nicht benötigt für Kernprojekt:
- `pages/business.js` → Nicht im Scope (nur Freebie-Landingpage)
- `pages/kurse.js` → Nicht im Scope
- `pages/produkte.js` → Nicht im Scope
- `pages/login.js` → Nicht im Scope (kein Mitgliederbereich)
- `pages/request-reset.js` → Nicht im Scope
- `pages/reset-password.js` → Nicht im Scope
- `pages/member/*` → Nicht im Scope (Extra 1)
- `pages/api/auth/*` → Nicht im Scope
- `pages/api/member/*` → Nicht im Scope
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
| **Hosting** | Vercel | ⏳ Setup nötig |
| **Datenbank** | Vercel Postgres | ⏳ Setup nötig |
| **E-Mail** | Brevo oder MailerLite | ⏳ Entscheidung + Setup |
| **Zahlungen** | PayPal | ⏳ Setup nötig |
| **Design** | Minimalistisch, keine Farbgradienten | ⏳ Anpassung nötig |

---

## Nächste Schritte (Sofort)

1. **Projekt aufräumen:** Obsolete Dateien verschieben
2. **Tailwind Config:** Farbschema vereinfachen
3. **E-Mail-Service:** Entscheidung Brevo vs MailerLite
4. **Git Commit:** "Project cleanup and work plan"
5. **Phase 1 starten:** Infrastruktur-Setup

---

## Erfolgsmetriken

- ✅ Landingpage live
- ✅ Freebie-Download funktioniert
- ✅ E-Mail-Sequenz läuft automatisch
- ✅ Zahlungen funktionieren
- ✅ DSGVO-konform
- ✅ Kundin kann selbstständig arbeiten
- ✅ Dokumentation vollständig

**Geschätzter Zeitaufwand:** 12-15 Stunden (passt zu 500€ bei 40-45€/Std.)
