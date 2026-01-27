# Sicherheit & Best Practices Checkliste

**Erstellt am:** 27. Januar 2026  
**Status:** Implementierte Maßnahmen + offene Punkte

---

## 🔐 Bereits Implementierte Sicherheitsmaßnahmen

### 1. Datenbanksicherheit ✅

#### SQL-Injection-Schutz
- **Parameterized Queries** werden in allen Datenbankabfragen verwendet
- Beispiel: `query('SELECT * FROM users WHERE email = $1', [email])`
- Keine direkten String-Concatenationen in SQL-Queries

#### Verbindungssicherheit
- **Vercel Postgres** mit automatischer SSL-Verschlüsselung
- Connection Strings nur via Environment Variables
- Datenbank-Zugriff nur von Vercel-Instanz

### 2. Authentifizierung & Session Management ✅

#### Passwort-Sicherheit
- **bcrypt** mit 12 Salt-Runden
- Keine Klartext-Passwörter gespeichert
- Sicheres Passwort-Generierung bei automatischer Account-Erstellung

#### Session-Management
- **NextAuth.js** als bewährte Lösung
- Session Timeout: 24 Stunden
- Secure Cookies in Produktion (HTTPS only)
- JWT Tokens mit NEXTAUTH_SECRET geschützt

#### Login-Flow
- Email-Validierung mit Regex
- Server-seitige Prüfung aller Credentials
- Generic Error Messages (keine User-Enumeration)

### 3. PayPal-Zahlungsabwicklung ✅

#### API-Sicherheit
- Offizielles **PayPal SDK** verwendet
- Server-seitige Order Creation & Capture
- Alle Beträge und Kurs-IDs validiert

#### Webhook-Sicherheit
- TODO: Webhook-Signatur verifizieren
- Custom ID für Kurs-Informationen

#### Doppelte Zahlungen
- TODO: Prüfung ob Payment ID bereits verarbeitet

### 4. Input-Validierung ✅

#### API-Endpunkte
- Method-Validation (GET, POST, etc.)
- Required-Field-Checks
- Type-Validation (Zahlen, Strings, Email)

#### Beispiele
```javascript
// Betrags-Validierung
if (!amount || amount <= 0) {
  return res.status(400).json({ error: 'Ungültiger Betrag' })
}

// Email-Validierung
if (!credentials?.email || !credentials?.password) {
  throw new Error('Missing email or password')
}
```

---

## ⚠️ Noch zu Implementierende Sicherheitsmaßnahmen

### Hochpriorität

#### 1. Rate Limiting für API-Endpunkte
```javascript
// Beispiel mit express-rate-limit
import rateLimit from 'express-rate-limit'

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 Minuten
  max: 100 // max 100 Requests pro IP
})
```

**Zu schützende Endpunkte:**
- `/api/auth/[...nextauth]` - Login-Brute-Force verhindern
- `/api/payment/*` - Missbrauch verhindern
- `/api/leads/*` - Spam-Schutz

#### 2. CSRF-Schutz
- Next.js hat Built-in CSRF Protection
- Sicherstellen dass X-CSRF-Token verwendet wird
- Besonders wichtig bei POST-Requests

#### 3. Content Security Policy (CSP)
In `next.config.js`:
```javascript
const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline';
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: https:;
  font-src 'self';
  connect-src 'self' https://api.paypal.com https://api.brevo.com;
`
```

### Mittlere Priorität

#### 4. XSS-Schutz für User-Content
Wenn Admin-Interface implementiert:
```javascript
import DOMPurify from 'dompurify'

const cleanContent = DOMPurify.sanitize(userInput)
```

#### 5. File Upload Security
Wenn Datei-Upload hinzugefügt:
- Dateitypen beschränken
- Max-Dateigröße
- Virus-Scanning (optional)
- Speicherort außerhalb Webroot

#### 6. Security Logging
```javascript
import winston from 'winston'

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'security.log' })
  ]
})

// Loggen von:
// - Fehlgeschlagene Login-Versuche
// - Verdächtige API-Aufrufe
// - Payment-Anomalien
```

---

## 🔍 Sicherheits-Checkliste

### Payment Flow
- [x] PayPal API Credentials in Environment Variables
- [x] Server-seitige Validierung aller Beträge
- [x] Kurs-IDs vor Übermittlung prüfen
- [ ] PayPal Webhook-Signatur verifizieren
- [ ] Doppelte Zahlungen verhindern (Payment ID Check)
- [ ] Refund-Handling implementieren
- [ ] Payment-Logs für Audits

### Login System
- [x] bcrypt mit min. 12 Runden
- [x] Session Timeout 24 Stunden
- [x] Secure Cookies in Produktion
- [ ] Account-Lockout nach 5 Fehlversuchen
- [ ] Password-Strength-Anforderungen (min. 8 Zeichen)
- [ ] Password-Reset-Flow mit Token
- [ ] 2FA Option (für Admin-Accounts)

### DSGVO-Compliance
- [x] Double-Opt-In für Newsletter
- [x] DSGVO-Checkboxen auf Formularen
- [ ] Recht auf Löschung implementieren (`DELETE /api/user`)
- [ ] Daten-Export Funktion (`GET /api/user/export`)
- [ ] Cookie-Banner (falls Tracking aktiviert)
- [ ] Privacy Policy aktualisieren

### Infrastructure
- [x] SSL-Zertifikat (automatisch via Vercel)
- [x] Environment Variables für Secrets
- [x] No sensitive data in client-side code
- [ ] Backup-Strategy für Datenbank
- [ ] Monitoring für verdächtige Aktivitäten

---

## 🚨 Sicherheits-Vorfälle - Was tun?

### 1. Verdacht auf Datenleck
1. sofort alle Passwörter zurücksetzen
2. Kundin informieren
3. Logs prüfen
4. Sicherheits-Review durchführen

### 2. PayPal-Anomalien
1. PayPal-Logs prüfen
2. Webhook-Logs analysieren
3. Betroffene User informieren

### 3. Brute-Force-Angriffe
1. IP-Adresse blockieren
2. Rate Limiting aktivieren
3. Logs ansehen

---

## 📋 Monatliche Security-Checks

### ToDo Liste (jeden Monat)
- [ ] Dependencies auf Updates prüfen (`npm audit`)
- [ ] Access Logs auf verdächtige Muster prüfen
- [ ] PayPal-Transaktionen überprüfen
- [ ] User-Accounts mit ungewöhnlicher Aktivität prüfen
- [ ] Backup-Test durchführen

### Tools für Security-Checks
1. **OWASP ZAP** - Automatische Security-Scans
2. **npm audit** - Dependency-Vulnerabilities
3. **Vercel Analytics** - Traffic-Muster
4. **PayPal Dashboard** - Zahlungs-Anomalien

---

## 📚 Nützliche Security-Ressourcen

### Dokumentation
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Next.js Security Best Practices](https://nextjs.org/docs/advanced-features/security)
- [PayPal Security Guidelines](https://developer.paypal.com/docs/api-basics/security/)

### npm Packages für Security
```json
{
  "helmet": "HTTP-Header Security",
  "express-rate-limit": "Rate Limiting",
  "dompurify": "XSS-Schutz",
  "winston": "Security Logging",
  "bcrypt": "Passwort-Hashing (bereits verwendet)"
}
```

---

## 👤 Verantwortlichkeiten

### Entwickler (Aktuell)
- Implementierung aller Security-Maßnahmen
- Monatliche Security-Checks
- Incident Response

### Kundin (Nach Übergabe)
- Starke Passwörter verwenden
- Verdächtige Emails melden
- PayPal-Account überwachen

---

**Letzte Überprüfung:** 27. Januar 2026  
**Nächste Überprüfung:** 27. Februar 2026
