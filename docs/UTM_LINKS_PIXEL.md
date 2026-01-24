# Social Media UTM-Links & Pixel-Platzhalter

---

## 📱 UTM-Links für Social Media (fertig zum Kopieren)

### Instagram Bio Link
```
https://crm-funnel-prototype.vercel.app/freebie?utm_source=instagram&utm_medium=bio&utm_campaign=freebie_download
```

### Instagram Story Links
```
Für Swipe-Up:
https://crm-funnel-prototype.vercel.app/?utm_source=instagram&utm_medium=story&utm_campaign=landing

Für Freebie:
https://crm-funnel-prototype.vercel.app/freebie?utm_source=instagram&utm_medium=story&utm_campaign=freebie_story
```

### Facebook Post Links
```
Allgemeiner Post:
https://crm-funnel-prototype.vercel.app/?utm_source=facebook&utm_medium=post&utm_campaign=facebook_organisch

Freebie-Angebot:
https://crm-funnel-prototype.vercel.app/freebie?utm_source=facebook&utm_medium=post&utm_campaign=freebie_facebook

Kurs-Angebot:
https://crm-funnel-prototype.vercel.app/checkout?utm_source=facebook&utm_medium=post&utm_campaign=kursangebot_facebook
```

### WhatsApp Business Links
```
Direkt zur Landingpage:
https://crm-funnel-prototype.vercel.app/?utm_source=whatsapp&utm_medium=chat&utm_campaign=whatsapp_link

Freebie versenden:
https://crm-funnel-prototype.vercel.app/freebie?utm_source=whatsapp&utm_medium=chat&utm_campaign=freebie_whatsapp
```

### E-Mail Signaturen
```
https://crm-funnel-prototype.vercel.app/?utm_source=email&utm_medium=signature&utm_campaign=email_signatur
```

---

## 🎯 Meta Pixel Platzhalter (einzufügen wenn gewünscht)

### Facebook/Instagram Pixel
```html
<!-- In pages/_app.js oder components/Layout.js -->
<Script id="facebook-pixel" strategy="afterInteractive">
  {`
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', 'HIER-PIXEL-ID-EINFÜGEN');
    fbq('track', 'PageView');
  `}
</Script>
<noscript><img height="1" width="1" style="display:none"
  src="https://www.facebook.com/tr?id=HIER-PIXEL-ID-EINFÜGEN&ev=PageView&noscript=1"
/></noscript>
```

### Conversion Events (Beispiele)
```javascript
// Bei Freebie-Anmeldung
fbq('track', 'Lead', {
  content_name: 'Freebie Download',
  content_category: 'Lead Generation'
});

// Bei Kurs-Kauf
fbq('track', 'Purchase', {
  value: 49.00,
  currency: 'EUR',
  content_name: 'Minimalismus Grundlagen'
});

// Bei Checkout-Beginn
fbq('track', 'InitiateCheckout', {
  content_name: 'Minimalismus Grundlagen',
  value: 49.00,
  currency: 'EUR'
});
```

---

## 🍪 Cookie-Banner - Brauchen wir das?

### Aktuelle Situation:
- **Keine Cookies aktiv** (nur technische Session-Cookies)
- **Kein Tracking** (kein Pixel, keine Analytics)
- **Keine persönliche Werbung**

### Wann Cookie-Banner nötig:
1. **Meta Pixel aktivieren** → Ja, Banner nötig
2. **Google Analytics** → Ja, Banner nötig  
3. **Nur Session-Cookies** → Nein, kein Banner nötig

### Einfache Cookie-Lösung (falls gewünscht):
```javascript
// Minimaler Cookie Banner
{showCookieBanner && (
  <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 z-50">
    <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between">
      <p className="text-sm mb-2 sm:mb-0">
        Wir verwenden Cookies für Tracking und personalisierte Werbung. 
        <a href="/datenschutz" className="underline ml-1">Mehr erfahren</a>
      </p>
      <button 
        onClick={() => setShowCookieBanner(false)}
        className="bg-white text-gray-900 px-4 py-2 rounded-full text-sm"
      >
        OK
      </button>
    </div>
  </div>
)}
```

---

## 📋 Checkliste für dich

### UTM-Links
- [x] ✅ Alle Links erstellt
- [ ] Links in Bio/Posts einfügen
- [ ] Testen: Klickt man an, kommt man auf die richtige Seite?

### Pixel & Cookies
- [ ] **Entscheidung:** Möchtest du Tracking? (Ja/Nein)
  - **Ja:** Ich füge Pixel + Cookie-Banner ein
  - **Nein:** Alles bleibt wie jetzt (kein Tracking)

### Vorteile mit Tracking:
- Siehst, welche Kanäle Umsatz bringen
- Kannst gezielt nachoptimieren
- Retargeting möglich

### Vorteile ohne Tracking:
- Keine Cookie-Banner nötig
- DSGVO-konformer ohne extra Aufwand
- Nutzerfreundlicher

---

## 🎯 Nächste Schritte

1. **UTM-Links:** Kannst du sofort verwenden
2. **Pixel/Cookies:** Bitte melde Rückmeldung:
   - "Ja, ich will Tracking" → Ich implementiere alles
   - "Nein, ohne Tracking" → Lassen wir es so

3. **Demo-Kurse:** Bleiben drin, bis deine echten Kurse fertig sind

Sag mir einfach Bescheid bezüglich Tracking!
