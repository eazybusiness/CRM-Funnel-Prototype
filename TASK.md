# Task Log - CRM Funnel Prototype

## Latest Update: 2026-06-20

---

### ✅ Erledigt – Session 20. Juni 2026 (Vimeo Integration)

#### Vimeo Video Integration
- [x] Kostenlose Vorschau-Video auf Checkout-Seite eingebettet (Vimeo ID: 1201351155)
- [x] Responsive Video-Player mit 16:9 Aspect Ratio und Domain-Privacy vorbereitet
- [x] Sichere API für bezahlte Vimeo-Videos erstellt (`/api/member/videos/[courseSlug].js`)
  - Prüft User-Authentifizierung und Kurs-Zugangsberechtigung
  - Liefert strukturierte Video-URLs nach Modulen und Lektionen
- [x] Datenbank-Struktur für Vimeo URLs vorbereitet (`video_url` Feld in lessons Tabelle)
- [x] SQL-Skript erstellt (`scripts/add-vimeo-urls.sql`) für das Hinzufügen geschützter Video-URLs
- [x] Umfassende Anleitung für Stefanie erstellt (`docs/vimeo-setup-guide.md`)
  - Schritt-für-Schritt Anleitung für Vimeo Domain Restrictions
  - Security Best Practices und Troubleshooting
  - Embed-Parameter und Datenschutz-Einstellungen

#### Test & Vorbereitung
- [x] Entwicklungsserver gestartet und Checkout-Seite mit Video-Preview getestet
- [x] Browser-Preview unter http://localhost:3000 verfügbar
- [x] Todo-Liste aktualisiert und Aufgaben als erledigt markiert

#### Video-Kurs Struktur (11 Videos, 3 Module)
- [x] Vollständige Video-Kurs-Struktur in Datenbank erstellt (SQL: `scripts/add-video-course-content.sql`)
- [x] Modul 1: Grundlagen (4 Videos: 1.0 Vorschau, 1.1-1.3)
- [x] Modul 2: Umsetzung (3 Videos: 2.1-2.3)  
- [x] Modul 3: Nachhaltigkeit (4 Videos: 3.1-3.3 + Abschluss)
- [x] Video-Kurs auf Homepage hinzugefügt (97€, 11 Videos in 3 Modulen)
- [x] Checkout-Seite aktualisiert: Video-Vorschau nur für Video-Kurs (nicht für Ebook)
- [x] Video-Übersichtsseite erstellt (`/member/course/[slug]/videos`) mit Karten-Ansicht
- [x] "Alle Videos" Button auf Kurs-Seite für Video-Kurs hinzugefügt
- [x] Sichere Video-API implementiert mit Zugriffsprüfung für zahlende Nutzer

#### Test & Vorbereitung
- [x] Entwicklungsserver läuft und bereit für Tests
- [x] Vollständiger User-Flow implementiert: Homepage → Checkout → Kauf → Mitgliederbereich → Videos

#### Nächste Schritte (wenn Stefanie bereit ist)
- [ ] Domain Restrictions in Vimeo für alle Video-IDs konfigurieren
- [ ] SQL-Skript `scripts/add-video-course-content.sql` in Datenbank ausführen
- [ ] Vollständigen User-Flow mit echtem Kauf testen

---

---

### ✅ Erledigt – Session 19. Juni 2026

#### Zweiter Freebie-Funnel (Stoffwechsel)
- [x] Navigation-Dropdown auf Startseite: „Kostenloser Guide" → Untermenü mit „Minimalismus" und „Stoffwechsel" (Desktop + Mobile)
- [x] Neue Landingpage `/stoffwechsel-freebie` erstellt (Kopie von `/freebie` mit angepasstem Text für Stoffwechsel-Guide)
- [x] Neue API-Route `/api/subscribe-stoffwechsel` erstellt (eigene Double-Opt-In Flow mit `source=stoffwechsel`)
- [x] `/api/confirm` erweitert: liest `source`-Parameter → Liste #5 (Stoffwechsel-Interessenten) + `stoffwechsel-freebie.pdf`
- [x] Brevo Liste #5 „Stoffwechsel-Interessenten" ist vorhanden (vom User bereits eingerichtet)

#### Offene Aufgaben für Stoffwechsel-Funnel
- [ ] Brevo Automation für Stoffwechsel anlegen und Templates 13–17 zuordnen
- [ ] PDF-Datei `stoffwechsel-freebie.pdf` unter `/public/downloads/` ablegen
- [ ] Template 17 (Mail 5): E-Book-Link einsetzen (aktuell Platzhalter `LINK_EBOOK_HIER_EINSETZEN`)

---

### ✅ Erledigt – Session 18. Juni 2026

#### Brevo / E-Mail-Flow
- [x] Brevo API Key reaktiviert (war deaktiviert)
- [x] Brevo IP-Blocking deaktiviert (blockierte Vercels dynamische AWS-IPs)
- [x] Kontakt-Attribute `DOUBLE_OPT_IN` (Boolean) und `OPT_IN_DATE` (Date) in Brevo angelegt (fehlten komplett)
- [x] Automation-Trigger auf Liste #2 (`Freebie-Interessenten`) gesetzt – war fälschlicherweise auf Liste #3
- [x] Automation läuft jetzt korrekt: Kontakt in Liste #2 → Willkommens-Mail wird gesendet ✅
- [x] Freebie-Download-Mail wird jetzt direkt aus `confirm.js` gesendet (nicht mehr auf Brevo-Automation angewiesen)
- [x] Sender-Name in allen transaktionalen E-Mails auf `Stefanie Dinçer` geändert (war `Tutavi Coaching` / `Einfach Leichter`)

#### Design
- [x] Bestätigungsseite (`/api/confirm`) komplett überarbeitet: minimalistisch, keine Emojis, kein bunter Button

#### Dokumentation
- [x] `PROJECT_INFO.md` erstellt mit allen Account-Infos (Vercel, GitHub, Brevo, Neon, IONOS)

### ⏳ Noch offen – direkt nach Freitag

#### Brevo / E-Mail
- [ ] Domain `einfachbewussterleben.de` in Brevo authentifizieren (DKIM/DMARC bei IONOS eintragen) → Absender-E-Mail von `gerd_meyer@tutavi.com` auf `@einfachbewussterleben.de` umstellen
- [ ] 5 Brevo Automation-Mails (Freebie 1) mit Stefanies finalen Texten ersetzen (Datei: `client_input/neue_emaistrecke_...Bewusstsein.txt`) – Mail 4 hat noch keinen Betreff (bei Stefanie erfragen)
- [ ] Bestätigungs-Mail (`subscribe.js`) Design auf Website-Stil anpassen (aktuell noch alter Placeholder-Text)

#### Zweiter Funnel (Stoffwechsel)
- [x] 5 Brevo-Templates erstellt (IDs 13–17): `Stoffwechsel_Mail1` bis `Stoffwechsel_Mail5`
- [x] Landingpage `/stoffwechsel-freebie` erstellt mit angepasstem Text
- [x] API-Route `/api/subscribe-stoffwechsel` erstellt
- [x] `/api/confirm` erweitert für source=stoffwechsel → Liste #5
- [x] Navigation-Dropdown auf Startseite (Minimalismus / Stoffwechsel)
- [ ] **Template 17 (Mail 5):** E-Book-Link einsetzen – aktuell Platzhalter `LINK_EBOOK_HIER_EINSETZEN`. Stefanie muss zuerst den Link in Canva ins PDF einbauen, dann neues PDF hochladen, dann Link per API updaten (1 Minute Aufwand)
- [ ] Neue Brevo Automation anlegen für Stoffwechsel-Funnel und Templates 13–17 zuordnen
- [ ] PDF-Datei `stoffwechsel-freebie.pdf` unter `/public/downloads/` ablegen

#### PayPal
- [ ] PayPal Live-Credentials von Stefanie einholen und in Vercel eintragen
- [ ] `PAYPAL_API_URL` auf Live-Endpoint umstellen

#### Übergabe
- [ ] Vercel-Projekt auf Stefanies Account übertragen
- [ ] GitHub-Repo auf Stefanies Account übertragen
- [ ] Brevo-Account Owner-E-Mail auf Stefanies Adresse ändern (oder neuen Account + Migration)
- [ ] Neon-Datenbank auf Stefanies Account übertragen

#### Vimeo / Kursinhalte
- [x] Kostenlose Vorschau-Video auf Checkout-Seite eingebettet (Vimeo ID: 1201351155)
- [x] Sichere API für bezahlte Vimeo-Videos erstellt (`/api/member/videos/[courseSlug].js`)
- [x] Datenbank-Struktur für Vimeo URLs vorbereitet (`video_url` Feld in lessons Tabelle)
- [x] Anleitung für Stefanie erstellt: `docs/vimeo-setup-guide.md`
- [ ] Echte Kursvideos von Stefanie via Vimeo einbetten (wenn URLs bereitgestellt)
- [ ] Vimeo: Domain-Restriction konfigurieren (Anleitung bereitgestellt)

### 💰 Offene Rechnungen (Stand 18. Juni 2026)
- Kernprojekt Restbetrag: **250€**
- Extra 1 (Mitgliederbereich, gebaut aber nicht abgenommen): **250€**
- Neu zu besprechen Freitag: ~380–510€ (Funnel 2, E-Mails, Übergabe, Vimeo)

---

## Latest Update: 2026-02-24 (afternoon)

### ✅ Completed Tasks

#### Authentication System
- [x] Fixed registration API database connection
- [x] Added SessionProvider to _app.js
- [x] Fixed login redirect issues
- [x] Added German error messages
- [x] Created forgot password page
- [x] Fixed dark mode text visibility

#### Database Setup
- [x] Connected Neon database to Vercel
- [x] Created all required tables
- [x] Added demo course data
- [x] Fixed database schema (first_name, last_name columns)

#### Course System
- [x] Added course section to homepage
- [x] Implemented PayPal checkout flow
- [x] Created payment success/cancel pages
- [x] Added course enrollment after payment
- [x] Member dashboard shows enrolled courses

#### Documentation
- [x] Created PayPal setup guide
- [x] Created database troubleshooting guide
- [x] Created registration fix documentation
- [x] Created customer-friendly status documents
- [x] Created milestone 1 checklist
- [x] Created comprehensive security checklist and review

### 🔄 In Progress

#### Email Integration
- [x] Configure Brevo API key in production
- [x] Configure automation rules
- [x] Test email delivery
- [x] 1 email received from customer (final content)
- [ ] Format 3 placeholder emails with HTML/CSS (pending Brevo MCP connection)
- [ ] Replace 3 placeholder emails with customer-provided content (when received)

#### PayPal Live Setup
- [x] PayPal sandbox checkout tested (PayPal + credit card guest checkout)
- [ ] Switch to PayPal live credentials (customer provides)

### 📋 Next Steps (Priority Order)

#### 1. Immediate Fixes (No Client Needed)
- [x] Fix dashboard data export error
- [x] Fix "Zu den Kursen" button to link to /courses page
- [x] Create demo course content (placeholder YouTube unlisted videos + sample PDFs)
- [ ] Add demo content to database for testing (SQL script ready: `scripts/add-demo-course-content.sql`)

#### 2. Waiting on Client
- [ ] Final content for 3 Brevo email templates
- [ ] Real course content (PDFs/videos) to replace demo content
- [ ] Optional: PayPal live credentials
- [ ] Decision: YouTube unlisted vs Vimeo for video hosting

#### 3. Course Management (Future)
- [x] Create /courses page
- [ ] Add course progress tracking
- [ ] Implement lesson completion

#### 3. Email Templates
- [ ] Design welcome email template
- [ ] Design course purchase confirmation
- [ ] Create password reset template
- [ ] Set up automated email sequences

#### 4. Security Enhancements
- [x] Implement rate limiting for API endpoints
- [x] Add account lockout after failed login attempts
- [x] Add password strength requirements
- [x] Configure Content Security Policy (CSP)
- [x] Implement right to data deletion (DSGVO)
- [x] Implement data export function (DSGVO)
- [x] Security logging (current level is sufficient)

### 🐛 Known Issues

1. **React Hydration Warnings**: Non-critical, appear in production build
2. **Dashboard export data button**: Returns error (needs debugging)
3. **Dashboard "Zu den Kursen" button**: Links to homepage instead of /courses page
4. **Missing demo course content**: Need placeholder videos (YouTube unlisted or Vimeo) and PDFs for testing course purchase/viewing flow
5. **Brevo email formatting**: 3 placeholder emails need HTML/CSS formatting (blocked by MCP connection)

### 📊 Current Status

- **Authentication**: ✅ Fully functional
- **Database**: ✅ Connected and working
- **Payments**: ✅ PayPal sandbox working (guest checkout enabled)
- **Course Display**: ✅ Homepage shows courses
- **Member Area**: ✅ Dashboard functional
- **Email System**: ✅ Brevo integrated (content/formatting pending)
- **Admin Panel**: ✅ Course admin available

### 🎯 Milestone Progress

#### Milestone 1 (50%) - 100% Complete
- [x] Live-Deployment des CRM-Funnels
- [x] Integration deiner spezifischen Produkte/Kurse
- [x] Einrichtung deiner E-Mail-Infrastruktur

#### Extra 1 (E-Learning Login) - 90% Complete
- [x] Login Bereich für E‑Learning
- [x] Zugriff auf gekaufte Kurse
- [ ] Echte Kurse/Inhalte (PDF/Video) von Kundin einpflegen

#### Next Milestone Preparation
- Collect real course content from client
- Get PayPal business account details
- Design email templates
- Decide on tracking/analytics needs

---

## Recent Changes Summary

### 2026-02-24 (afternoon session - part 2)
- Fixed `/courses` page with proper purchase flow:
  - Changed text from "nur per E-Mail Link" to proper course catalog description
  - Added "Mehr Infos & Kaufen" button instead of "Mehr erfahren"
  - Created comprehensive course info modal with demo content
  - Modal shows: modules, lessons, duration, benefits, full course outline
  - Proper flow: /courses → modal → checkout → PayPal → member area
- Investigated entire purchase logic (homepage, /courses, checkout, member area)

### 2026-02-24 (afternoon session - part 1)
- Fixed dashboard "Zu den Kursen" button to link to `/courses` page instead of homepage
- Fixed data export error with improved error handling and fallback queries
- Created demo course content structure:
  - Added placeholder PDF files in `/public/demo-content/`
  - Created SQL script to populate modules and lessons with demo content
  - Documented demo content setup in `docs/DEMO_CONTENT.md`
- Updated TASK.md and REQUIREMENTS.md with clarified project status

### 2026-02-24 (morning session)
- Normalized planning workspace: removed unrelated `.planning/*` documents and rewrote `.planning/{PROJECT,STATE,ROADMAP,REQUIREMENTS}.md` to match this CRM Funnel repo
- Renamed `task.md` to `TASK.md`
- Updated `.windsurf` workflows/rules to reference `TASK.md`
- Added `.windsurf/rules/workspace_rules/nextjs_rules.md` and updated `/init` workflow to use it

### 2026-02-09
- Updated Startseite: new hero text ("Einfach. Bewusst. Leben."), quote section, feature boxes, courses section
- Updated Datenschutz page with complete client-provided privacy policy (real contact data)
- Created About Me page (/about) with Stefanie's personal story
- Added "About me" navigation link to all pages (index, freebie, about)
- Added Nachname (last name) field to freebie signup form
- Updated subscribe.js API to handle lastName
- Updated confirm.js API to parse lastName from token and store in Brevo (LASTNAME attribute)
- Updated internal notification email to include Nachname
- Course section renamed to "Meine weiterführenden Inhalte für ein bewusstes Leben"
- Courses updated: Videokurs, Stoffwechselkur Ebook, Achtsames Essen Ebook (demnächst)

### 2026-02-04
- Created client status doc (Milestone 1 completed)
- Improved PayPal checkout (guest checkout / credit card)
- Adjusted checkout copy
- Freebie image reverted to cropped horizontal look

### 2026-01-27
- Added course section to homepage with demo course
- Created comprehensive PayPal setup guide
- Fixed all authentication issues
- Database fully operational

### 2026-01-26
- Fixed registration white text issue
- Connected Neon database
- Resolved NextAuth configuration
- Added proper error handling

---

**Last updated**: 2026-02-09
**Next review**: After client provides real course content and (optional) PayPal live keys
