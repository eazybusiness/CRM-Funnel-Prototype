# Status & Testing – Einfach bewusster leben (Extra 1)

Dieses Dokument fasst den aktuellen Stand zusammen, zeigt **wo** die Features zu finden sind und **wie** sie getestet werden können.

---

## ✅ Bereits umgesetzt (Stand heute)

### Mitgliederbereich (Extra 1)
- Login & Registrierung
- Dashboard mit Kursübersicht
- Kurs-Viewer (Module + Lektionen)
- Fortschritt-API (mocked)
- Zugriffsschutz via Middleware

### PayPal Integration
- Checkout-Seite (PayPal/Kreditkarte)
- PayPal Order/Capture APIs
- Webhook für automatische Einschreibung
- E-Mail-Versand via Brevo (Willkommensmails)

### Admin (Basis)
- Admin-Kursübersicht (UI-Skeleton)

### Demo-Daten
- Demo-Kurs Seed Script

---

## 🔗 Wichtige URLs (lokal)

- Startseite: `/`
- Freebie: `/freebie`
- Login: `/login`
- Registrierung: `/register`
- Mitglieder-Dashboard: `/member/dashboard`
- Kurs-Viewer: `/member/course/minimalismus-grundlagen`
- Checkout: `/checkout?courseId=1&courseName=Minimalismus%20Grundlagen&price=49`
- Admin-Kurse: `/admin/courses`

---

## ✅ So kannst du testen

### 1) Login & Mitgliederbereich
1. Öffne `/register` und lege einen Test-User an
2. Logge dich unter `/login` ein
3. Prüfe Dashboard und Kursseite

### 2) Demo-Kursdaten
1. Führe `scripts/demo-course-seed.sql` in der DB aus
2. Öffne `/member/course/minimalismus-grundlagen`

### 3) PayPal Sandbox
1. PayPal Sandbox Account anlegen
2. `PAYPAL_CLIENT_ID`, `PAYPAL_CLIENT_SECRET` setzen
3. Checkout testen über `/checkout?courseId=1&courseName=Minimalismus%20Grundlagen&price=49`

### 4) Webhook
1. PayPal Webhook auf `/api/payment/webhook` setzen
2. `PAYPAL_WEBHOOK_ID` eintragen
3. Zahlung durchführen → User + Enrollment wird erstellt

---

## 📌 Was wir noch von der Kundin brauchen

1. **PayPal Live-Daten** (Client ID, Secret)
2. **Brevo Zugang / API Key** (Live)
3. **Kursinhalte** (Texte, Videos, PDFs)
4. **Kurs-Preise & Namen** (final)
5. **Domain/Live-URL** (für Links in Emails)
6. **Tonality für Mail-Sequenzen** (falls Anpassungen gewünscht)

---

## 📄 Relevante Dokumente

- `/docs/EXTRA1_SETUP.md` – Setup & Betrieb
- `/docs/BREVO_AUTOMATION_GUIDE.md` – Brevo Workflow + Templates
- `/docs/PROJECT_SCOPE_FINAL.md` – Projektumfang
- `/docs/EXTRA1_PROGRESS.md` – Fortschritt
