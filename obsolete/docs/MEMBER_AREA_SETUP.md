# Member Area Setup Guide

## Übersicht

Der passwortgeschützte Mitgliederbereich ist jetzt implementiert und ermöglicht automatische Zugriffskontrolle basierend auf PayPal-Käufen.

---

## Was wurde implementiert?

### ✅ Authentifizierung
- **Login-System** mit E-Mail + Passwort
- **JWT-Tokens** (HttpOnly Cookies, 7 Tage Gültigkeit)
- **Passwort-Hashing** mit bcrypt
- **Passwort-Reset** via E-Mail-Link

### ✅ Automatische Account-Erstellung
- Nach PayPal-Kauf wird automatisch ein User-Account erstellt
- Temporäres Passwort wird generiert und per E-Mail versendet
- User erhält Login-Daten + Link zum Mitgliederbereich

### ✅ Content-Zugriffskontrolle
- Zugriff basiert auf `user_content_access` Tabelle
- Automatische Verknüpfung: Purchase → User → Content
- Unterscheidung zwischen Free Content (für alle) und Paid Content (nur nach Kauf)

### ✅ Mitgliederbereich-Seiten
- `/login` - Login-Seite
- `/request-reset` - Passwort vergessen
- `/reset-password?token=xyz` - Neues Passwort setzen
- `/member/dashboard` - Übersicht aller Inhalte
- `/member/content/[slug]` - Content-Viewer (Kurse, Produkte)
- `/member/account` - Account-Einstellungen + Kaufhistorie

---

## Datenbank-Setup

### 1. Migration ausführen

**In Vercel Postgres SQL Editor:**

```sql
-- Kopiere den Inhalt von scripts/db-member-area-setup.sql
-- und führe ihn im Vercel Postgres SQL Editor aus
```

**Oder via CLI:**

```bash
# Verbinde mit Vercel Postgres
vercel env pull .env.local

# Führe Migration aus (manuell im Vercel Dashboard)
```

### 2. Tabellen-Struktur

**Neue Tabellen:**
- `users` - User-Accounts (E-Mail, Passwort-Hash, Name)
- `content_items` - Verfügbare Inhalte (Kurse, Produkte, Freebies)
- `user_content_access` - Zugriffskontrolle (User → Content)

**Erweiterte Tabellen:**
- `purchases` - Jetzt mit `user_id` verknüpft

---

## Environment Variables

**Füge zu `.env.local` hinzu:**

```bash
# JWT Authentication
JWT_SECRET=your-very-long-random-secret-key-here-min-32-chars
JWT_EXPIRES_IN=7d

# App URL (wichtig für E-Mail-Links)
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**JWT Secret generieren:**

```bash
# Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# OpenSSL
openssl rand -hex 32
```

---

## Wie funktioniert der Flow?

### 1. Kauf-Flow (Automatisch)

```
User kauft Kurs via PayPal
    ↓
PayPal Webhook: /api/payment/capture-paypal-order
    ↓
Check: Existiert User mit dieser E-Mail?
    ↓
├─ NEIN → Erstelle User-Account
│         ├─ Generiere temporäres Passwort
│         ├─ Speichere in users Tabelle
│         └─ Sende Welcome-E-Mail mit Login-Daten
│
└─ JA → Nutze existierenden Account
    ↓
Erstelle Purchase-Eintrag (mit user_id)
    ↓
Gewähre Content-Zugriff (user_content_access)
    ↓
Sende E-Mail: "Neuer Inhalt verfügbar"
```

### 2. Login-Flow

```
User besucht /login
    ↓
Gibt E-Mail + Passwort ein
    ↓
POST /api/auth/login
    ↓
Verifiziere Credentials (bcrypt.compare)
    ↓
├─ VALID → Erstelle JWT Token
│          ├─ Setze HttpOnly Cookie
│          └─ Redirect zu /member/dashboard
│
└─ INVALID → Zeige Fehler
```

### 3. Content-Zugriff

```
User klickt auf Kurs im Dashboard
    ↓
GET /member/content/[slug]
    ↓
Check JWT Token (requireAuth)
    ↓
Check Content-Zugriff (checkContentAccess)
    ↓
├─ Free Content → Zeige Inhalt
├─ Paid Content + Has Access → Zeige Inhalt
└─ Paid Content + No Access → Zeige "Kauf erforderlich"
```

---

## Content-Items anlegen

### Beispiel: Neuen Kurs hinzufügen

```sql
INSERT INTO content_items (slug, title, description, content_type, access_level, price, content_data)
VALUES (
  'course_neuer_kurs',
  'Neuer Kurs: Titel',
  'Beschreibung des Kurses',
  'course',
  'paid',
  49.00,
  '{
    "modules": [
      {
        "id": 1,
        "title": "Modul 1: Einführung",
        "lessons": [
          {
            "id": 1,
            "title": "Lektion 1",
            "duration": "15:30",
            "video_url": "https://..."
          }
        ]
      }
    ]
  }'
);
```

### Beispiel: Freebie hinzufügen

```sql
INSERT INTO content_items (slug, title, description, content_type, access_level, price, content_data)
VALUES (
  'freebie_guide',
  'Kostenloser Guide',
  'Beschreibung',
  'freebie',
  'free',
  0.00,
  '{"type": "pdf", "url": "/downloads/guide.pdf"}'
);
```

---

## PayPal-Integration anpassen

### Checkout-Seite muss folgende Daten senden:

```javascript
// Bei PayPal Capture
const response = await fetch('/api/payment/capture-paypal-order', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    orderId: 'PAYPAL_ORDER_ID',
    productSlug: 'course_minimalismus_basics', // ← Wichtig!
    productName: 'Kurs: Minimalismus Basics',
    leadEmail: 'user@example.com', // Falls PayPal keine E-Mail liefert
    leadName: 'Max Mustermann'
  })
});
```

**Wichtig:** `productSlug` muss mit `slug` in `content_items` Tabelle übereinstimmen!

---

## Testing

### 1. Lokales Testing

```bash
# Server starten
npm run dev

# Öffne http://localhost:3000
```

### 2. Test-User manuell erstellen

```sql
-- Passwort: "test123"
-- Hash generiert mit bcrypt, rounds=10
INSERT INTO users (email, password_hash, name, email_verified)
VALUES (
  'test@example.com',
  '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy',
  'Test User',
  true
);
```

**Login testen:**
- E-Mail: `test@example.com`
- Passwort: `test123`

### 3. Content-Zugriff manuell gewähren

```sql
-- Gewähre Test-User Zugriff auf Kurs
INSERT INTO user_content_access (user_id, content_item_id)
VALUES (
  (SELECT id FROM users WHERE email = 'test@example.com'),
  (SELECT id FROM content_items WHERE slug = 'course_minimalismus_basics')
);
```

---

## Sicherheit

### ✅ Implementiert
- Passwort-Hashing mit bcrypt (10 rounds)
- JWT Tokens in HttpOnly Cookies (kein localStorage)
- Secure Cookies in Production (HTTPS only)
- SameSite=Strict Cookie-Flag
- SQL Injection Prevention (Parameterized Queries)
- CSRF Protection (SameSite Cookies)

### ⚠️ Noch zu implementieren (optional)
- Rate Limiting für Login-Versuche
- 2-Factor Authentication (2FA)
- Session-Invalidierung bei Passwort-Änderung
- IP-basierte Login-Benachrichtigungen

---

## E-Mail-Templates

### Welcome E-Mail (Neuer User)
- Betreff: "Dein Zugang zu [Product] ist bereit!"
- Inhalt: Login-Daten + temporäres Passwort
- CTA: "Jetzt anmelden" → `/login`

### Content Available E-Mail (Bestehender User)
- Betreff: "Neuer Inhalt verfügbar: [Product]"
- Inhalt: Hinweis auf neuen Inhalt
- CTA: "Zum Dashboard" → `/member/dashboard`

### Password Reset E-Mail
- Betreff: "Passwort zurücksetzen"
- Inhalt: Reset-Link (gültig 1 Stunde)
- CTA: "Passwort zurücksetzen" → `/reset-password?token=xyz`

---

## Troubleshooting

### Problem: "Not authenticated" Fehler

**Lösung:**
- Check JWT_SECRET in `.env.local`
- Check Cookie-Settings (HttpOnly, Secure in Production)
- Clear Browser Cookies

### Problem: "Access denied" bei Content

**Lösung:**
```sql
-- Check ob User Zugriff hat
SELECT * FROM user_content_access
WHERE user_id = [USER_ID]
AND content_item_id = (SELECT id FROM content_items WHERE slug = '[SLUG]');

-- Falls nicht, manuell gewähren
INSERT INTO user_content_access (user_id, content_item_id)
VALUES ([USER_ID], [CONTENT_ID]);
```

### Problem: PayPal erstellt keinen User

**Lösung:**
- Check `productSlug` wird korrekt übergeben
- Check E-Mail-Konfiguration (SMTP)
- Check Logs in Vercel Dashboard

---

## Deployment auf Vercel

### 1. Environment Variables setzen

```bash
# Vercel Dashboard → Settings → Environment Variables
JWT_SECRET=<generated-secret>
JWT_EXPIRES_IN=7d
NEXT_PUBLIC_APP_URL=https://yourdomain.com
POSTGRES_URL=<from-vercel-postgres>
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=<your-email>
EMAIL_PASS=<app-password>
EMAIL_FROM="Your Name <noreply@yourdomain.com>"
```

### 2. Database Migration

```bash
# Im Vercel Postgres Dashboard → SQL Editor
# Führe scripts/db-member-area-setup.sql aus
```

### 3. Deploy

```bash
git push origin main
# Vercel deployt automatisch
```

### 4. Test Production

- Besuche `https://yourdomain.com/login`
- Test PayPal Sandbox-Kauf
- Check E-Mail-Empfang
- Test Login mit generierten Credentials

---

## Kosten-Übersicht

| Service | Kostenlos bis | Kosten danach |
|---------|---------------|---------------|
| **Vercel Postgres** | 256 MB | $20/Monat |
| **Vercel Hosting** | 100 GB Bandwidth | $20/Monat |
| **E-Mail (Gmail)** | Unbegrenzt | Kostenlos |
| **PayPal** | Unbegrenzt | 2,49% + 0,35€/Transaktion |

**Realistisch:** 0€/Monat für die ersten 6-12 Monate

---

## Nächste Schritte

### Für Entwicklung:
1. ✅ Datenbank-Migration ausführen
2. ✅ Environment Variables setzen
3. ✅ Test-User erstellen
4. ✅ Content-Items anlegen
5. ✅ PayPal-Integration testen

### Für Kundin:
1. Content-Items mit echten Kursinhalten füllen
2. Video-URLs hinzufügen (z.B. Vimeo, YouTube)
3. Download-Links für Produkte/Freebies
4. E-Mail-Templates anpassen (Branding)
5. Produktpreise festlegen

---

## Support

Bei Fragen oder Problemen:
- Check Vercel Logs: `vercel logs`
- Check Database: Vercel Postgres Dashboard
- Check E-Mails: SMTP-Logs

**Dokumentation:**
- `MEMBER_AREA_ARCHITECTURE.md` - Technische Details
- `PROJECT_SCOPE_OPTIMIZED.md` - Projekt-Übersicht
- `IMPLEMENTATION_CHECKLIST.md` - Implementierungs-Schritte
