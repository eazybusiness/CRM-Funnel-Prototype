# Deployment Checklist - Vercel

**Status:** Bereit für Test-Deployment  
**Datum:** 6. Januar 2026

---

## ✅ Abgeschlossen

### Design & Content
- [x] Landingpage minimalistisch redesigned
- [x] Freebie-Seite angepasst
- [x] Impressum-Seite erstellt
- [x] Unsplash Placeholder-Bilder integriert
- [x] Neutrale Farbpalette (Grau, Weiß)
- [x] Klare Kommunikation: Download-Link nach E-Mail-Bestätigung

### Code
- [x] Obsolete Dateien in `/obsolete` verschoben
- [x] Tailwind Config vereinfacht
- [x] Next.js Config für Unsplash-Bilder aktualisiert
- [x] Git Commits erstellt

---

## 🔄 Für Vercel Deployment benötigt

### 1. Vercel Projekt erstellen
```bash
# Im Projekt-Verzeichnis
vercel
```

### 2. Environment Variables setzen

**Aktuell benötigt:**
- `BREVO_API_KEY` - Brevo API Key (Test-Account)

**Später benötigt (für Production):**
- `POSTGRES_URL` - Vercel Postgres Connection String
- `PAYPAL_CLIENT_ID` - PayPal Client ID
- `PAYPAL_CLIENT_SECRET` - PayPal Client Secret

### 3. Vercel Dashboard Einstellungen
- Framework Preset: **Next.js**
- Build Command: `npm run build`
- Output Directory: `.next`
- Install Command: `npm install`

---

## 📋 Nach Deployment testen

### Funktionalität
- [ ] Landingpage lädt korrekt
- [ ] Bilder von Unsplash werden geladen
- [ ] Navigation funktioniert
- [ ] Freebie-Formular wird angezeigt
- [ ] Datenschutz-Seite erreichbar
- [ ] Impressum-Seite erreichbar
- [ ] Mobile Ansicht funktioniert

### Design
- [ ] Schriftarten laden korrekt (Inter)
- [ ] Layout ist responsive
- [ ] Animationen funktionieren
- [ ] Buttons haben Hover-Effekte

---

## 🚀 Deployment-Befehl

```bash
# Erste Deployment
vercel

# Production Deployment
vercel --prod
```

---

## 📝 Nächste Schritte nach Test-Deployment

1. **URL mit Kundin teilen** für Design-Feedback
2. **Brevo Integration** testen (wenn API-Key vorhanden)
3. **Content anpassen** basierend auf Kundin-Feedback
4. **Vercel Postgres** einrichten
5. **PayPal Integration** vorbereiten

---

## 🔗 Wichtige Links

- **Vercel Dashboard:** https://vercel.com/dashboard
- **Brevo Dashboard:** https://app.brevo.com/
- **Unsplash:** https://unsplash.com/

---

## ⚠️ Bekannte Einschränkungen (Test-Version)

- E-Mail-Versand funktioniert noch nicht (Brevo API nicht integriert)
- Formular speichert nur in localStorage (keine Datenbank)
- PayPal-Integration fehlt noch
- Impressum hat Placeholder-Daten

Diese werden in den nächsten Phasen implementiert.
