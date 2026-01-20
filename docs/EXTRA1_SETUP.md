# Extra 1 - Geschützter Lernbereich - Setup Guide

## Übersicht
Dieser Guide erklärt die Einrichtung des geschützten Lernbereichs (Extra 1) für das CRM Funnel System.

## Voraussetzungen
- Vercel Account mit aktivierter Postgres-Datenbank
- PayPal Business Account
- Node.js und npm installiert

## 1. Datenbank einrichten

### Vercel Postgres aktivieren
1. Gehe zu deinem Vercel Projekt Dashboard
2. Navigiere zu "Storage" → "Create Database"
3. Wähle "Postgres" aus
4. Kopiere die Connection Strings in deine `.env` Datei

### Datenbank-Schema erstellen
Führe das SQL-Script aus:
```bash
# Verbinde dich mit deiner Vercel Postgres Datenbank
# Führe scripts/db-schema.sql aus
```

Oder über Vercel Dashboard:
1. Gehe zu Storage → Dein Postgres DB → Query
2. Kopiere den Inhalt von `scripts/db-schema.sql`
3. Führe das Script aus

## 2. Environment Variables

Erstelle eine `.env.local` Datei mit folgenden Variablen:

```env
# Database (von Vercel Postgres)
POSTGRES_URL="postgres://..."
POSTGRES_PRISMA_URL="postgres://..."
POSTGRES_URL_NON_POOLING="postgres://..."

# NextAuth
NEXTAUTH_SECRET="generiere-einen-random-string-min-32-zeichen"
NEXTAUTH_URL="http://localhost:3000"  # Für Production: https://deine-domain.com

# PayPal (bereits vorhanden)
PAYPAL_CLIENT_ID=...
PAYPAL_CLIENT_SECRET=...

# Brevo (bereits vorhanden)
BREVO_API_KEY=...
```

### NEXTAUTH_SECRET generieren
```bash
openssl rand -base64 32
```

## 3. Dependencies installieren

```bash
npm install
```

Neue Packages:
- `next-auth@^4.24.0` - Authentifizierung
- `@vercel/postgres@^0.5.0` - Datenbank-Verbindung

## 4. Datenbank-Tabellen

Das Schema erstellt folgende Tabellen:

### users
- Benutzer-Accounts für Mitgliederbereich
- Login-Daten (E-Mail, Passwort-Hash)
- Profil-Informationen

### courses
- Kurs-Informationen (Titel, Beschreibung, Preis)
- Slug für URL
- PayPal Plan ID

### modules
- Kurs-Module (Kapitel/Abschnitte)
- Sortierung

### lessons
- Einzelne Lektionen (Videos/PDFs)
- Video-URLs (YouTube/Vimeo)
- PDF-URLs
- Dauer

### enrollments
- Verknüpfung User ↔ Course
- PayPal Payment ID
- Ablaufdatum (optional)

### user_progress
- Fortschritt pro Lektion
- Abschluss-Zeitstempel
- Prozent-Fortschritt

## 5. Erste Schritte nach Installation

### Test-User erstellen
1. Gehe zu `/register`
2. Erstelle einen Account
3. Logge dich ein unter `/login`

### Test-Kurs erstellen
Füge einen Test-Kurs in die Datenbank ein:

```sql
-- Kurs erstellen
INSERT INTO courses (title, description, slug, price, is_active)
VALUES ('Minimalismus Grundlagen', 'Lerne die Grundlagen des minimalistischen Lebens', 'minimalismus-grundlagen', 49.00, true);

-- Modul erstellen
INSERT INTO modules (course_id, title, description, sort_order)
VALUES (1, 'Einführung', 'Grundlagen des Minimalismus', 0);

-- Lektion erstellen
INSERT INTO lessons (module_id, title, description, video_url, duration_minutes, sort_order, is_free)
VALUES (1, 'Was ist Minimalismus?', 'Eine Einführung in die Philosophie', 'https://www.youtube.com/embed/dQw4w9WgXcQ', 15, 0, true);

-- User zum Kurs einschreiben (User ID 1)
INSERT INTO enrollments (user_id, course_id, enrolled_at, is_active)
VALUES (1, 1, NOW(), true);
```

## 6. PayPal Integration

### Webhook für automatische Einschreibung
1. Gehe zu PayPal Developer Dashboard
2. Erstelle einen Webhook für: `PAYMENT.SALE.COMPLETED`
3. URL: `https://deine-domain.com/api/payment/webhook`
4. Der Webhook erstellt automatisch User-Accounts und Enrollments

## 7. Video-Hosting

### Empfohlene Optionen:

**Option 1: YouTube (Unlisted)**
- Kostenlos
- Einfach zu verwenden
- Videos auf "Nicht gelistet" setzen
- Embed-URLs verwenden

**Option 2: Vimeo Pro**
- ~$20/Monat
- Domain-Restriction möglich
- Besserer Kopierschutz
- Professioneller

**Option 3: Cloudflare Stream**
- ~$1/1000 Minuten
- Sehr guter Kopierschutz
- DRM-Support
- Wasserzeichen möglich

## 8. Kurs-Upload-Workflow

### Für die Kundin:
1. Videos auf YouTube/Vimeo hochladen
2. PDFs in `/public/courses/` Ordner legen
3. Kurs-Daten in Datenbank eintragen (später: Admin-Interface)

### Admin-Interface (in Entwicklung)
- Drag & Drop Kurs-Builder
- Video-Upload-Interface
- PDF-Management
- Preis-Verwaltung

## 9. Sicherheit

### Implementierte Maßnahmen:
- ✅ Passwort-Hashing mit bcrypt
- ✅ Session-basierte Authentifizierung (NextAuth)
- ✅ Zugriffskontrolle auf Kurs-Seiten
- ✅ HTTPS (via Vercel)

### Empfohlene Maßnahmen:
- Domain-Restriction für Videos (Vimeo/Cloudflare)
- Wasserzeichen mit User-E-Mail
- Rechtsklick-Schutz (CSS)
- Download-Verhinderung (nicht 100% sicher)

## 10. Testing

### Lokale Entwicklung
```bash
npm run dev
```

Teste:
1. Registrierung: http://localhost:3000/register
2. Login: http://localhost:3000/login
3. Dashboard: http://localhost:3000/member/dashboard
4. Kurs: http://localhost:3000/member/course/minimalismus-grundlagen

### Production Deployment
```bash
git push origin main
```

Vercel deployed automatisch.

## 11. Troubleshooting

### "Database connection failed"
- Prüfe POSTGRES_URL in `.env.local`
- Stelle sicher, dass Vercel Postgres aktiviert ist

### "NextAuth error"
- Prüfe NEXTAUTH_SECRET in `.env.local`
- Prüfe NEXTAUTH_URL (muss mit Domain übereinstimmen)

### "No access to course"
- Prüfe ob User in `enrollments` Tabelle eingetragen ist
- Prüfe `is_active = true`

## 12. Nächste Schritte

- [ ] Admin-Interface für Kurs-Verwaltung
- [ ] Video-Upload-System
- [ ] Fortschritts-Zertifikate
- [ ] E-Mail-Benachrichtigungen bei Kurs-Abschluss
- [ ] Kommentar-System für Lektionen

## Support

Bei Fragen oder Problemen:
- Dokumentation: `/docs`
- GitHub Issues: Repository Issues
- E-Mail: support@deine-domain.com
