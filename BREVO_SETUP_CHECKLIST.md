# Brevo Setup Checklist

## ⚠️ Wichtig: Warum keine E-Mails ankommen

Es gibt zwei häufige Gründe:

### 1. **Sender-E-Mail nicht verifiziert**
Brevo erlaubt nur das Versenden von E-Mails von verifizierten Absender-Adressen.

### 2. **Keine Kontaktliste erstellt**
Kontakte müssen einer Liste zugeordnet werden.

---

## 🔧 Setup-Schritte in Brevo

### **Schritt 1: Sender-E-Mail verifizieren**

1. **Gehe zu Brevo Dashboard:** https://app.brevo.com/
2. **Klicke auf:** Settings (Zahnrad oben rechts) → **Senders, Domains & Dedicated IPs**
3. **Klicke auf:** "Add a sender"
4. **Füge eine E-Mail-Adresse hinzu:**
   - Option A: Deine eigene Domain (z.B. `info@deinewebsite.de`)
   - Option B: Gmail/Outlook (z.B. `deine@gmail.com`)
5. **Bestätige die E-Mail:** Brevo sendet dir eine Bestätigungs-E-Mail
6. **Klicke auf den Link** in der E-Mail

**WICHTIG:** Verwende diese verifizierte E-Mail dann im Code!

---

### **Schritt 2: Kontaktliste erstellen**

1. **Gehe zu:** Contacts → Lists
2. **Klicke auf:** "Create a list"
3. **Name:** "Freebie Subscribers" (oder ähnlich)
4. **Notiere die List ID** (steht in der URL oder in den Details)
5. **Aktualisiere den Code** mit der richtigen List ID

---

### **Schritt 3: Code anpassen**

Nach der Verifizierung musst du die Sender-E-Mail im Code ändern:

```javascript
// In /pages/api/subscribe.js Zeile 54
sendSmtpEmail.sender = { 
  name: 'Einfach Leichter', 
  email: 'DEINE-VERIFIZIERTE-EMAIL@domain.de'  // ← Hier ändern!
}
```

Und die List ID anpassen:

```javascript
// In /pages/api/subscribe.js Zeile 37
createContact.listIds = [DEINE_LIST_ID]  // ← Hier die richtige ID eintragen
```

---

## 🧪 Testen

### **Option 1: Schnelltest mit deiner eigenen E-Mail**

Wenn du keine eigene Domain hast:

1. Verwende deine **persönliche E-Mail** (Gmail, Outlook, etc.) als Sender
2. Verifiziere sie in Brevo
3. Teste das Formular mit einer **anderen E-Mail-Adresse** als Empfänger

**Beispiel:**
- Sender (verifiziert): `deine@gmail.com`
- Empfänger (Test): `test@gmail.com`

### **Option 2: Mit eigener Domain**

Falls du eine eigene Domain hast:

1. Füge eine E-Mail wie `info@deinewebsite.de` hinzu
2. Verifiziere sie
3. Optional: Richte SPF/DKIM ein für bessere Zustellbarkeit

---

## 📊 Logs überprüfen

### **In Vercel:**
1. Gehe zu: **Deployments** → **[Neuestes Deployment]** → **Functions**
2. Suche nach `/api/subscribe`
3. Schaue in die Logs

Du solltest sehen:
```
Kontakt in Brevo angelegt: test@example.com
Double Opt-In E-Mail via Brevo gesendet an: test@example.com
Brevo Response: {...}
```

### **In Brevo:**
1. Gehe zu: **Campaigns** → **Transactional**
2. Hier siehst du alle versendeten E-Mails
3. Status: "Sent", "Delivered", "Bounced", etc.

---

## 🚨 Troubleshooting

### **Problem: "Sender not verified"**
**Lösung:** Verifiziere die Sender-E-Mail in Brevo (siehe Schritt 1)

### **Problem: "Invalid list ID"**
**Lösung:** 
1. Erstelle eine Liste in Brevo
2. Notiere die List ID
3. Aktualisiere den Code

### **Problem: E-Mail kommt nicht an**
**Mögliche Ursachen:**
1. Sender nicht verifiziert
2. E-Mail landet im Spam-Ordner (prüfe Spam!)
3. Brevo Free Account hat Limits (300 E-Mails/Tag)
4. Falsche API-Key

**Lösung:**
1. Prüfe Brevo Dashboard → Transactional Emails
2. Schaue in Vercel Logs nach Fehlern
3. Prüfe Spam-Ordner beim Empfänger

---

## 📝 Nächste Schritte

Nach erfolgreichem Setup:

1. ✅ Sender-E-Mail verifiziert
2. ✅ Kontaktliste erstellt
3. ✅ Code aktualisiert mit richtiger E-Mail und List ID
4. ✅ Zu GitHub gepusht
5. ✅ Vercel automatisch neu deployed
6. ✅ Test durchgeführt

---

## 💡 Best Practices

- **Verwende eine professionelle E-Mail** (nicht noreply@)
- **Erstelle separate Listen** für verschiedene Funnels
- **Aktiviere Double Opt-In** für DSGVO-Konformität
- **Überwache die Zustellrate** in Brevo Analytics

---

## 🔗 Hilfreiche Links

- **Brevo Dashboard:** https://app.brevo.com/
- **Brevo Docs - Sender verifizieren:** https://help.brevo.com/hc/en-us/articles/209467485
- **Brevo Docs - API:** https://developers.brevo.com/docs
- **Vercel Logs:** https://vercel.com/dashboard

---

**Sobald die Sender-E-Mail verifiziert ist, sollten die E-Mails ankommen! 🎉**
