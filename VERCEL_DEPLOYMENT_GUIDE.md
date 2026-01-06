# Vercel Deployment Guide

## ✅ Was bereits erledigt ist

- [x] GitHub Repository aktualisiert mit allen neuen Features
- [x] Brevo SDK installiert und E-Mail-Integration implementiert
- [x] Responsive Navigation für Mobile und Desktop
- [x] Design verbessert mit runden Ecken, Schatten und modernen Effekten
- [x] `.env` in `.gitignore` (sensible Daten werden nicht gepusht)

---

## 🚀 Deployment-Schritte

### 1. Vercel Dashboard öffnen

Gehe zu: https://vercel.com/dashboard

### 2. Neues Projekt erstellen (oder bestehendes aktualisieren)

#### Option A: Neues Projekt
1. Klicke auf **"Add New..."** → **"Project"**
2. Wähle **"Import Git Repository"**
3. Wähle dein GitHub Repository: `eazybusiness/CRM-Funnel-Prototype`
4. Klicke auf **"Import"**

#### Option B: Bestehendes Projekt aktualisieren
1. Öffne dein bestehendes Projekt
2. Vercel deployed automatisch bei jedem Push auf `main`
3. Überprüfe den Deployment-Status unter **"Deployments"**

### 3. Framework-Einstellungen (automatisch erkannt)

Vercel sollte automatisch erkennen:
- **Framework Preset:** Next.js
- **Build Command:** `npm run build`
- **Output Directory:** `.next`
- **Install Command:** `npm install`

Falls nicht, stelle diese manuell ein.

### 4. Environment Variables setzen

**WICHTIG:** Gehe zu **Settings** → **Environment Variables**

Füge folgende Variablen hinzu:

**Variable 1: BREVO_API_KEY**
- **Name:** `BREVO_API_KEY`
- **Value:** Dein Brevo API Key (aus deiner `.env` Datei)
- **Environment:** Production, Preview, Development (alle auswählen)

**Variable 2: NEXT_PUBLIC_BASE_URL**
- **Name:** `NEXT_PUBLIC_BASE_URL`
- **Value:** `https://[deine-vercel-url].vercel.app`
- **Environment:** Production, Preview, Development (alle auswählen)

**Hinweis:** Die `NEXT_PUBLIC_BASE_URL` musst du nach dem ersten Deployment aktualisieren, wenn du die finale URL kennst.

Optional (für später, wenn du SMTP direkt nutzen möchtest):
- `SMTP_Server`: smtp-relay.brevo.com
- `Port`: 587
- `Login`: Dein Brevo SMTP Login

### 5. Deployment starten

1. Klicke auf **"Deploy"**
2. Warte, bis der Build abgeschlossen ist (ca. 2-3 Minuten)
3. Vercel zeigt dir die URL deiner Website

---

## 🧪 Nach dem Deployment testen

### Funktionalität checken:

1. **Landingpage laden**
   - [ ] Seite lädt ohne Fehler
   - [ ] Bilder von Unsplash werden angezeigt
   - [ ] Animationen funktionieren

2. **Navigation testen**
   - [ ] Desktop-Navigation funktioniert
   - [ ] Mobile-Navigation (Hamburger-Menü) funktioniert
   - [ ] Links zu Datenschutz und Impressum funktionieren

3. **Freebie-Formular testen**
   - [ ] Formular wird angezeigt
   - [ ] Eingabefelder funktionieren
   - [ ] **WICHTIG:** Teste E-Mail-Versand mit deiner eigenen E-Mail
   - [ ] Prüfe, ob Bestätigungs-E-Mail von Brevo ankommt

4. **Responsive Design**
   - [ ] Mobile Ansicht (Smartphone)
   - [ ] Tablet Ansicht
   - [ ] Desktop Ansicht

---

## 🔧 Troubleshooting

### Problem: E-Mails werden nicht versendet

**Lösung:**
1. Überprüfe, ob `BREVO_API_KEY` in Vercel Environment Variables gesetzt ist
2. Gehe zu Brevo Dashboard und prüfe API-Key
3. Schaue in Vercel Logs: **Deployments** → **[Dein Deployment]** → **Functions** → **Logs**

### Problem: Bilder werden nicht geladen

**Lösung:**
1. Überprüfe `next.config.js` - `images.unsplash.com` sollte in `domains` sein
2. Redeploy das Projekt

### Problem: 404 Fehler auf Unterseiten

**Lösung:**
1. Stelle sicher, dass alle Seiten im `/pages` Ordner sind
2. Redeploy das Projekt

---

## 📊 Vercel Logs überprüfen

Um zu sehen, ob E-Mails erfolgreich versendet werden:

1. Gehe zu deinem Projekt in Vercel
2. Klicke auf **"Deployments"**
3. Wähle das aktuelle Deployment
4. Klicke auf **"Functions"**
5. Suche nach `/api/subscribe`
6. Schaue in die Logs

Du solltest sehen:
```
Double Opt-In E-Mail via Brevo gesendet an: [email]
```

---

## 🎯 Nächste Schritte nach erfolgreichem Deployment

1. **URL mit Kundin teilen** für Design-Feedback
2. **E-Mail-Versand testen** mit echter E-Mail-Adresse
3. **Content anpassen** basierend auf Feedback
4. **Custom Domain** einrichten (optional)
5. **Vercel Postgres** für Datenbank einrichten (Phase 2)
6. **PayPal Integration** implementieren (Phase 3)

---

## 🔗 Wichtige Links

- **Vercel Dashboard:** https://vercel.com/dashboard
- **Brevo Dashboard:** https://app.brevo.com/
- **GitHub Repository:** https://github.com/eazybusiness/CRM-Funnel-Prototype
- **Brevo API Docs:** https://developers.brevo.com/docs

---

## ⚠️ Bekannte Einschränkungen (aktuelle Version)

- ✅ E-Mail-Versand funktioniert (Brevo integriert)
- ❌ Keine Datenbank (Leads werden nicht gespeichert)
- ❌ Kein Double Opt-In Confirmation-Link (noch nicht implementiert)
- ❌ PayPal-Integration fehlt noch
- ⚠️ Impressum hat Placeholder-Daten (muss von Kundin ausgefüllt werden)

---

## 💡 Tipps

- **Automatisches Deployment:** Jeder Push auf `main` triggert automatisch ein neues Deployment
- **Preview Deployments:** Branches erstellen automatisch Preview-URLs
- **Rollback:** In Vercel kannst du jederzeit zu einem früheren Deployment zurückkehren
- **Analytics:** Aktiviere Vercel Analytics für Besucherstatistiken

---

**Viel Erfolg beim Deployment! 🚀**
