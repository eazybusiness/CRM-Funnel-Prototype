# E-Mail-Service Entscheidung: Brevo vs MailerLite

**Datum:** 6. Januar 2026  
**Für:** CRM Funnel Kernprojekt

---

## Vergleich

| Feature | Brevo (empfohlen) | MailerLite |
|---------|-------------------|------------|
| **Kontakte (Free)** | ✅ **Unbegrenzt** | ⚠️ 500 |
| **E-Mails/Monat (Free)** | 9.000 (300/Tag) | 12.000 |
| **API-Zugang** | ✅ Ja | ✅ Ja |
| **Automation** | ✅ Ja | ✅ Ja |
| **Double-Opt-In** | ✅ Ja | ✅ Ja |
| **Transactional E-Mails** | ✅ Ja | ✅ Ja |
| **DSGVO** | ✅ EU-Server | ✅ EU-konform |
| **Support** | E-Mail + Chat | E-Mail |
| **Dokumentation** | Sehr gut | Sehr gut |

---

## Empfehlung: Brevo

### Vorteile für dieses Projekt:

1. **Unbegrenzte Kontakte**
   - Kundin kann ohne Limit wachsen
   - Keine Upgrade-Notwendigkeit bei 500 Kontakten

2. **Ausreichende E-Mails**
   - 9.000 E-Mails/Monat reichen für Start
   - Bei 500 Kontakten = 18 E-Mails pro Kontakt/Monat

3. **Vollständige API**
   - Kontakte hinzufügen
   - Tags/Listen verwalten
   - Transactional E-Mails
   - Automation-Trigger

4. **DSGVO-konform**
   - Server in EU
   - Double-Opt-In integriert
   - Unsubscribe automatisch

5. **Kostenlos für lange Zeit**
   - Erst bei >9.000 E-Mails/Monat Kosten
   - Dann: ~25€/Monat für 20.000 E-Mails

---

## Alternative: MailerLite

### Wann MailerLite wählen:

- Kundin erwartet <500 Kontakte langfristig
- Mehr E-Mails pro Kontakt nötig (12.000 vs 9.000)
- Präferenz für MailerLite-UI

### Nachteile:

- **Limit von 500 Kontakten** (seit Sept 2025)
- Bei 501 Kontakten: Upgrade auf 10€/Monat nötig
- Weniger Skalierbarkeit

---

## Technische Integration

### Brevo (Sendinblue)

**NPM Package:**
```bash
npm install @sendinblue/client
```

**API-Endpunkte:**
- Kontakt hinzufügen: `POST /contacts`
- Liste/Tag zuweisen: `POST /contacts/lists/{listId}/contacts/add`
- Transactional E-Mail: `POST /smtp/email`

**Automation:**
- Via Brevo Dashboard konfigurieren
- Trigger: Tag, Liste, Event
- Workflows: Drag & Drop Editor

### MailerLite

**NPM Package:**
```bash
npm install @mailerlite/mailerlite-nodejs
```

**API-Endpunkte:**
- Subscriber hinzufügen: `POST /subscribers`
- Gruppe zuweisen: `POST /groups/{groupId}/subscribers`
- Automation: Via Dashboard

---

## Entscheidung

**Empfehlung:** ✅ **Brevo**

**Begründung:**
- Unbegrenzte Kontakte = keine Wachstumslimits
- Ausreichende E-Mails für Start
- Bessere Skalierbarkeit
- Gleiche Features wie MailerLite

**Nächste Schritte:**
1. Brevo-Account erstellen (mit Kundin)
2. API-Key generieren
3. Listen/Tags erstellen
4. Automation-Workflows konfigurieren

---

## Setup-Anleitung

### 1. Brevo-Account erstellen
- https://www.brevo.com/
- Kostenloser Account (keine Kreditkarte nötig)
- E-Mail-Adresse der Kundin verwenden

### 2. API-Key generieren
- Dashboard → Account → SMTP & API
- "Create a new API key"
- Name: "CRM Funnel Production"
- Permissions: Full access
- Key kopieren → `.env.local`

### 3. Listen erstellen
- **Liste 1:** "Freebie Subscribers"
- **Liste 2:** "Customers"

### 4. Automation-Workflows
- **Workflow 1:** Freebie-Sequenz (4+ E-Mails)
- **Workflow 2:** Kauf-Sequenz (3 E-Mails)

### 5. Double-Opt-In aktivieren
- Settings → Forms → Double Opt-In: ON
- Bestätigungs-E-Mail Template anpassen

---

## Kosten-Hochrechnung

### Szenario 1: 500 Kontakte, 4 E-Mails/Monat
- E-Mails/Monat: 2.000
- Kosten: **0€** (unter 9.000 Limit)

### Szenario 2: 1.000 Kontakte, 4 E-Mails/Monat
- E-Mails/Monat: 4.000
- Kosten: **0€** (unter 9.000 Limit)

### Szenario 3: 2.000 Kontakte, 6 E-Mails/Monat
- E-Mails/Monat: 12.000
- Kosten: **~25€/Monat** (20.000 E-Mails Plan)

**Vergleich MailerLite:**
- Bei 501 Kontakten: 10€/Monat (egal wie viele E-Mails)
- Bei 1.000 Kontakten: 15€/Monat

---

## Fazit

Brevo ist die bessere Wahl für dieses Projekt wegen:
- Unbegrenzten Kontakten
- Besserer Skalierbarkeit
- Gleichen Features
- Längerer kostenloser Nutzung

**Status:** ⏳ Warte auf finale Entscheidung mit Kundin
