# Milestone 1 Checkliste (50% - Live-Deployment)

**Aktuell erfüllt:** ✅ CRM-Funnel ist technisch fertig und live auf Vercel

---

## 🎯 Was noch fehlt für Milestone 1:

### 1️⃣ Integration deiner spezifischen Produkte/Kurse
- [ ] **Demo-Daten löschen** - Aktuell sind Test-Kurse in der DB
- [ ] **Deine echten Kurse einpflegen** über Admin-Bereich
  - Titel, Beschreibungen, Preise
  - Module und Lektionen erstellen
  - Videos und PDFs hochladen
- [ ] **Preise anpassen** (aktuell 49€ Demo-Preis)
- [ ] **Kurs-Links für E-Mails** generieren

### 2️⃣ E-Mail-Infrastruktur komplett einrichten
- [ ] **Brevo Automation finalisieren**
  - E-Mail-Designs anpassen
  - Timing prüfen (Tag 2, 3, 4, 7, 14, 21)
  - Vorlagen mit deinen Texten füllen
- [ ] **Double-Opt-In bestätigen** funktioniert bereits
- [ ] **Test-Emails senden** um Sequenz zu prüfen

### 3️⃣ Social-Media-Tracking mit deinen Pixeln
- [ ] **Meta Pixel (Facebook/Instagram) einfügen**
  - Pixel-ID von dir benötigt
  - Auf allen Seiten implementieren
  - Conversion Events tracken (Lead, Purchase)
- [ ] **UTM-Parameter für Links**
  - Instagram Bio: `?utm_source=instagram&utm_medium=bio`
  - Facebook Posts: `?utm_source=facebook&utm_medium=post`
  - WhatsApp: `?utm_source=whatsapp&utm_medium=link`
- [ ] **Google Analytics (optional)**
  - Wenn gewünscht: GA4 einrichten

### 4️⃣ Live-Deployment finalisieren
- [x] ✅ Website läuft auf Vercel
- [ ] **Echte PayPal-Daten eintragen**
  - Aktuell: Sandbox (Test)
  - Benötigt: Live API Keys
- [ ] **Domain verbinden** (falls nicht schon geschehen)
- [ ] **SSL-Zertifikat** (automatisch bei Vercel)

---

## ⚡ Schnellste Umsetzung (Reihenfolge):

### 1. Deine Kurse einpflegen (2-3 Stunden)
```bash
1. Demo-Daten löschen (SQL in docs/DEMO_DATA_PAYPAL_SETUP.md)
2. Admin-Bereich aufrufen: /admin/courses
3. Deine echten Kurse erstellen
```

### 2. PayPal Live-Account (30 Minuten)
```bash
1. PayPal Business Account erstellen
2. API Keys generieren
3. In .env.local eintragen
4. Deployment neu starten
```

### 3. Meta Pixel (15 Minuten)
```bash
1. Pixel-ID von dir besorgen
2. In _app.js oder Layout einfügen
3. Testen mit Pixel Helper
```

### 4. E-Mail-Designs (1-2 Stunden)
```bash
1. Bei Brevo einloggen
2. Automation anpassen
3. Test-Lauf starten
```

---

## 🚀 Was ich sofort für dich machen kann:

### Option A: Schnelle Umsetzung (heute/morgen)
- Demo-Daten löschen
- Admin-Bereich für deine Kurse fertigstellen
- Pixel-Platzhalter einfügen (du füllst nur ID ein)
- UTM-Links für Social Media erstellen

### Option B: Komplettservice
- Ich übernehme die gesamte Einrichtung
- Du gibst mir nur:
  - Deine Kurs-Inhalte
  - PayPal-Daten
  - Meta Pixel-ID
  - E-Mail-Texte

---

## 📊 Aktueller Fortschritt: 70% von Milestone 1

| Komponente | Status | Fehlt |
|------------|--------|-------|
| CRM-Funnel Technik | ✅ 100% | - |
| Live-Deployment | ✅ 100% | - |
| Deine Produkte/Kurse | ⏳ 20% | Inhalte einpflegen |
| E-Mail-Infrastruktur | ✅ 90% | Design anpassen |
| Social Media Tracking | ⏳ 0% | Pixel einfügen |

---

## 🎯 Nächster Schritt:

**Was möchtest du zuerst machen?**
1. Deine Kurse einpflegen (ich helfe dir dabei)
2. PayPal Live-Account einrichten
3. Meta Pixel integrieren
4. E-Mail-Designs finalisieren

Sag mir, worauf du dich konzentrieren möchtest, und ich erledige den Rest!
