# Registration Fix - Schritt für Schritt Anleitung

## 🐛 Problem: Registrierung funktioniert nicht

**Fehlermeldung:** "Ein Fehler ist aufgetreten. Bitte versuche es erneut."

**Ursache:** Die Datenbank-Tabelle hat nicht die richtigen Spalten.

---

## ⚡ Schnelle Lösung (5 Minuten)

### 1. Datenbank aktualisieren
1. Gehe zu: https://vercel.com/
2. Dein Projekt → Storage → Postgres
3. Klicke auf "Query" 
4. Füge dieses SQL ein:

```sql
-- Migration Script: Add first_name and last_name to users table

-- Add new columns
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS first_name VARCHAR(255),
ADD COLUMN IF NOT EXISTS last_name VARCHAR(255),
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP DEFAULT NOW();

-- Update existing records
UPDATE users SET updated_at = NOW() WHERE updated_at IS NULL;
```

5. Klicke auf "Execute"

### 2. Warten auf Deployment
- Die Änderung ist sofort aktiv
- Nichts weiter zu tun!

---

## 🧪 Testen

Gehe zu: https://crm-funnel-prototype.vercel.app/register

Teste mit:
- Vorname: Test
- Nachname: User
- E-Mail: test@example.com
- Passwort: 123456

**Ergebnis:** Sollte jetzt funktionieren!

---

## 📋 Was wurde geändert?

### Vorher:
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255),  <-- Falsch!
  ...
);
```

### Nachher:
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(255),  <-- Richtig!
  last_name VARCHAR(255),   <-- Richtig!
  ...
);
```

---

## 🔍 Wenn es immer noch nicht geht

### 1. Browser-Cache leeren
- Strg + F5 (Windows)
- Cmd + Shift + R (Mac)

### 2. Incognito/Private Tab verwenden
- Manchmal lag es am Browser-Cache

### 3. Fehler-Logs prüfen
1. Vercel Dashboard → Functions
2. `/api/auth/register` ansehen
3. Fehlermeldung dort notieren

---

## 📞 Hilfe benötigt?

Wenn es immer noch nicht funktioniert:
1. Screenshot der Fehlermeldung machen
2. Browser und Version angeben
3. Wann du es versucht hast

---

## ✅ Nächste Schritte

Nachdem die Registrierung geht:
1. Login testen: https://crm-funnel-prototype.vercel.app/login
2. Mitgliederbereich testen: https://crm-funnel-prototype.vercel.app/member/dashboard
3. Alles commiten und pushen

**Das war's!** 😊
