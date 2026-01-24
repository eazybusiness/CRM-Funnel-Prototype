# Google Analytics 4 Setup - Einfache Anleitung

---

## 🎯 Warum Google Analytics?

- ✅ **Kostenlos** und einfach einzurichten
- ✅ **Visuelle Reports** - keine technischen Kenntnisse nötig
- ✅ **UTM-Tracking automatisch** - sieht woher Besucher kommen
- ✅ **Kein Cookie-Banner nötig** für anonymisierte Daten
- ✅ **Mobile App** für unterwegs

---

## ⚡ Schnell-Setup (5 Minuten)

### 1. Google Analytics Account erstellen
1. Gehe zu: https://analytics.google.com/
2. "Messung einrichten" → "Web"
3. Website-URL: `crm-funnel-prototype.vercel.app`
4. Stream-Name: `Einfach bewusster leben`
5. "Stream erstellen"
6. **Measurement ID kopieren** (Format: `G-XXXXXXXXXX`)

### 2. In Website einfügen
Ich füge den Code ein in:
- `pages/_app.js` oder `components/Layout.js`

```javascript
// Google Analytics 4
import Script from 'next/script'

<Script
  src={`https://www.googletagmanager.com/gtag/js?id=G-MEASUREMENT_ID`}
  strategy="afterInteractive"
/>
<Script id="google-analytics" strategy="afterInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-MEASUREMENT_ID');
  `}
</Script>
```

---

## 📊 Was die Kundin sehen kann

### 1. Besucher-Zahlen
- Wie viele Leute besuchen die Seite
- Welche Seiten am beliebtesten sind

### 2. Woher Besucher kommen
- **Social Media:** Instagram, Facebook, WhatsApp
- **Direkt:** Leute tippen URL direkt ein
- **E-Mail:** Von deinen E-Mail-Links

### 3. Was Besucher tun
- Freebie-Downloads
- Checkout-Seiten besuchen
- Registrierungen starten

### 4. Einfache Reports
- "Acquisition → Traffic acquisition" → Siehst alle Quellen
- "Engagement → Events" → Siehst Downloads, Klicks
- "Realtime" → Siehst aktuelle Besucher

---

## 🔗 UTM-Links machen Sinn mit GA4

Mit GA4 funktionieren deine UTM-Links sofort:

```
Instagram Bio:
https://crm-funnel-prototype.vercel.app/freebie?utm_source=instagram&utm_medium=bio&utm_campaign=freebie_download

Facebook Post:
https://crm-funnel-prototype.vercel.app/?utm_source=facebook&utm_medium=post&utm_campaign=facebook_organisch
```

**In GA4 siehst du dann:**
- 50 Besucher von Instagram Bio
- 30 Besucher von Facebook Posts
- 20 Freebie Downloads von WhatsApp

---

## 🍪 Cookie-Frage mit GA4

**Standard GA4 (anonymisiert):**
- Kein Cookie-Banner nötig
- Nur anonymisierte Daten
- DSGVO-konform

**GA4 mit Werbe-Features:**
- Cookie-Banner nötig
- Personalisierte Werbung möglich
- Mehr Daten, aber mehr Aufwand

**Empfehlung:** Standard GA4 ohne Cookie-Banner

---

## 📋 Was ich für dich tun kann

### Option 1: Schnelles Setup (heute)
- [ ] GA4 Account erstellen
- [ ] Tracking-Code einfügen
- [ ] Testen ob Daten fließen
- [ ] UTM-Links anpassen

### Option 2: Komplettservice
- [ ] Alles von Option 1
- [ ] Dashboard einrichten
- [ ] Wichtige Reports vorbereiten
- [ ] Kurze Anleitung für die Kundin

---

## 🎯 Nächste Schritte

1. **Entscheidung:** Möchtest du GA4 einrichten? (Kosten: 0€)
2. **Wenn ja:** Ich brauche nur:
   - Ein OK von dir
   - Google Account für die Einrichtung (deiner oder meiner)
3. **Nach Setup:** 
   - UTM-Links funktionieren sofort
   - Kundin kann Reports in 5 Minuten lernen

---

## 💡 Vorteil für Milestone 1

Mit GA4 kannst du sagen:
✅ "Social-Media-Tracking ist aktiv"
✅ "Sie sehen woher Kunden kommen"
✅ "Einfache Auswertung ohne technische Kenntnisse"

**Das ist ein starkes Verkaufsargument!**

---

Sag mir einfach: "Ja, richte GA4 ein" und ich übernehme alles.
