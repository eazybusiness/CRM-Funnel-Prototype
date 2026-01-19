# Vercel Deployment Anleitung

## Schnellstart

Dieses Projekt ist für Vercel optimiert und kann in wenigen Minuten deployed werden.

---

## Voraussetzungen

- GitHub Account (bereits vorhanden ✓)
- Vercel Account (bereits vorhanden ✓)
- Git Repository (bereits vorhanden ✓)

---

## Deployment-Schritte

### 1. Repository zu GitHub pushen

```bash
cd /home/nop/CascadeProjects/demos/crm-funnel
git add -A
git commit -m "chore: prepare for Vercel deployment"
git push origin main
```

### 2. Auf Vercel deployen

#### Option A: Über Vercel Dashboard (Empfohlen)
1. Gehe zu [vercel.com/dashboard](https://vercel.com/dashboard)
2. Klicke auf "Add New" → "Project"
3. Wähle dein GitHub Repository aus
4. Vercel erkennt automatisch Next.js
5. Klicke auf "Deploy"

#### Option B: Über Vercel CLI
```bash
npm install -g vercel
vercel login
vercel
```

### 3. Umgebungsvariablen hinzufügen

Nach dem ersten Deployment:

1. Gehe zu Project Settings → Environment Variables
2. Füge folgende Variablen hinzu:

```
NEXT_PUBLIC_BASE_URL=https://dein-projekt.vercel.app

# E-Mail (MailerLite)
SMTP_HOST=smtp.mailerlite.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=deine@email.de
SMTP_PASS=dein-mailerlite-api-key
SMTP_FROM="Dein Name" <noreply@deinewebsite.de>

# PayPal (Optional - später)
PAYPAL_CLIENT_ID=deine-client-id
PAYPAL_CLIENT_SECRET=dein-secret
PAYPAL_API_URL=https://api-m.sandbox.paypal.com

# Stripe (Optional - später)
STRIPE_PUBLIC_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
```

3. Klicke auf "Redeploy" um die Variablen zu aktivieren

---

## Häufige Deployment-Probleme & Lösungen

### Problem 1: Build schlägt fehl

**Fehler:** `Module not found` oder `Cannot find module`

**Lösung:**
```bash
# Lokale node_modules löschen und neu installieren
rm -rf node_modules package-lock.json
npm install
npm run build
```

Falls es lokal funktioniert, committe und pushe erneut.

### Problem 2: API Routes funktionieren nicht

**Fehler:** `404 Not Found` bei `/api/*` Routen

**Lösung:**
- Vercel unterstützt Next.js API Routes automatisch
- Stelle sicher, dass Dateien in `pages/api/` liegen
- Prüfe, dass `export default function handler` verwendet wird

### Problem 3: Umgebungsvariablen nicht verfügbar

**Fehler:** `undefined` bei `process.env.VARIABLE`

**Lösung:**
1. Variablen in Vercel Dashboard hinzufügen
2. Projekt neu deployen
3. Für Client-Side: `NEXT_PUBLIC_` Prefix verwenden

### Problem 4: SMTP/E-Mail funktioniert nicht

**Fehler:** E-Mails werden nicht versendet

**Lösung:**
1. Prüfe SMTP-Credentials in Vercel Environment Variables
2. Teste mit Ethereal Email (Test-SMTP):
   ```
   SMTP_HOST=smtp.ethereal.email
   SMTP_PORT=587
   SMTP_USER=test@ethereal.email
   SMTP_PASS=test-password
   ```
3. Logs in Vercel Dashboard prüfen

---

## Vercel-spezifische Konfiguration

### vercel.json
```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/next"
    }
  ],
  "env": {
    "NODE_ENV": "production"
  }
}
```

### next.config.js
```javascript
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['localhost'],
  },
  env: {
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  },
}
```

---

## Nach dem Deployment

### 1. Funktionstest durchführen

Teste folgende Funktionen:
- [ ] Hauptseite lädt
- [ ] Freebie-Seite (`/freebie`) funktioniert
- [ ] CRM-Dashboard (`/demo/crm`) ist erreichbar
- [ ] Formular-Absendung funktioniert
- [ ] E-Mail-Versand (wenn konfiguriert)

### 2. Custom Domain verbinden (Optional)

1. Gehe zu Project Settings → Domains
2. Klicke auf "Add Domain"
3. Gib deine Domain ein (z.B. `deinewebsite.de`)
4. Folge den DNS-Anweisungen
5. SSL-Zertifikat wird automatisch erstellt

**DNS-Einstellungen:**
```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### 3. Analytics aktivieren (Optional)

Vercel bietet kostenloses Analytics:
1. Gehe zu Analytics Tab
2. Klicke auf "Enable Analytics"
3. Fertig!

---

## Lokale Entwicklung

```bash
# Dependencies installieren
npm install

# Development Server starten
npm run dev

# Production Build testen
npm run build
npm start
```

**Lokale URL:** http://localhost:3000

---

## Automatische Deployments

Vercel deployt automatisch bei jedem Git Push:

- **Main Branch** → Production Deployment
- **Andere Branches** → Preview Deployment

### Preview Deployments

Jeder Pull Request bekommt eine eigene Preview-URL:
```
https://dein-projekt-git-branch-name.vercel.app
```

---

## Monitoring & Logs

### Logs anschauen

1. Gehe zu Vercel Dashboard
2. Wähle dein Projekt
3. Klicke auf "Deployments"
4. Wähle ein Deployment
5. Klicke auf "View Function Logs"

### Fehler debuggen

```bash
# Lokale Logs
npm run dev

# Vercel Logs (CLI)
vercel logs
```

---

## Performance-Optimierung

### Automatisch von Vercel:
- ✅ Global CDN
- ✅ Automatisches Caching
- ✅ Image Optimization
- ✅ Compression (Gzip/Brotli)
- ✅ HTTP/2

### Manuell optimierbar:
- Bilder als WebP
- Code Splitting
- Lazy Loading
- ISR (Incremental Static Regeneration)

---

## Kosten

### Hobby Plan (Kostenlos):
- ✅ Unbegrenzte Deployments
- ✅ 100 GB Bandwidth
- ✅ Serverless Functions
- ✅ SSL-Zertifikate
- ✅ Analytics (100k Events)

**Perfekt für:** Start und kleine Projekte

### Pro Plan ($20/Monat):
- ✅ Alles vom Hobby Plan
- ✅ Mehr Bandwidth
- ✅ Prioritäts-Support
- ✅ Team-Features

**Upgrade wenn:** Traffic wächst (>100k Besucher/Monat)

---

## Backup & Rollback

### Rollback zu vorheriger Version

1. Gehe zu Deployments
2. Wähle ein altes Deployment
3. Klicke auf "Promote to Production"

### Backup-Strategie

- Git Repository ist das Backup
- Vercel speichert alle Deployments
- Datenbank separat sichern (falls vorhanden)

---

## Sicherheit

### Automatisch von Vercel:
- ✅ HTTPS/SSL
- ✅ DDoS Protection
- ✅ Firewall
- ✅ Security Headers

### Best Practices:
- Umgebungsvariablen für Secrets
- Keine API-Keys im Code
- CORS richtig konfigurieren
- Rate Limiting für APIs

---

## Support

### Bei Problemen:

1. **Vercel Dokumentation:** [vercel.com/docs](https://vercel.com/docs)
2. **Next.js Dokumentation:** [nextjs.org/docs](https://nextjs.org/docs)
3. **Vercel Support:** support@vercel.com
4. **Community:** [github.com/vercel/vercel/discussions](https://github.com/vercel/vercel/discussions)

---

## Checkliste: Deployment

### Vor dem Deployment:
- [x] Code committed und gepusht
- [x] `npm run build` funktioniert lokal
- [x] `.env.example` aktualisiert
- [x] Dokumentation vollständig

### Während des Deployments:
- [ ] Vercel Projekt erstellt
- [ ] GitHub Repository verbunden
- [ ] Umgebungsvariablen hinzugefügt
- [ ] Erstes Deployment erfolgreich

### Nach dem Deployment:
- [ ] Alle Seiten getestet
- [ ] E-Mail-Funktionen getestet
- [ ] CRM-Dashboard getestet
- [ ] Custom Domain verbunden (optional)
- [ ] Analytics aktiviert (optional)

---

## Nächste Schritte

1. ✅ Repository zu GitHub pushen
2. ✅ Auf Vercel deployen
3. ✅ Umgebungsvariablen konfigurieren
4. ✅ Funktionstest durchführen
5. ⏳ Kundin einweisen
6. ⏳ Custom Domain verbinden

---

**Das System ist bereit für Vercel!** 🚀

*Letzte Aktualisierung: Januar 2026*
