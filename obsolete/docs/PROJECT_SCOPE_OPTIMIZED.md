# Optimierter Project Scope - CRM Funnel (500€)

## Projektziel
Vollautomatisierter Sales-Funnel mit E-Mail-Automation für Social-Media-Traffic (Instagram, Facebook, WhatsApp) mit minimalem Wartungsaufwand.

---

## 1. Technologie-Stack (Optimiert für minimalen Aufwand)

### Frontend & Hosting
- **Framework:** Next.js (bereits vorhanden)
- **Hosting:** Vercel (kostenlos, automatisches Deployment)
- **Styling:** TailwindCSS (bereits implementiert)

### Backend & Datenbank
- **Datenbank:** Vercel Postgres (kostenlos bis 256 MB)
  - Speichert: Leads, Käufe, Tracking-Events
  - Ersetzt: localStorage (DSGVO-konform)
- **API Routes:** Next.js API Routes (bereits vorhanden)

### E-Mail-Marketing
- **Service:** MailerLite (kostenlos bis 1.000 Kontakte)
- **Integration:** REST API
- **Funktionen:**
  - Automatische E-Mail-Sequenzen
  - Segmentierung nach Interesse (Produkte/Kurse/Business)
  - Double-Opt-In
  - Unsubscribe-Management

### Zahlungsabwicklung
- **Service:** PayPal (nur PayPal)
  - PayPal-Button-Integration (kein API-Key nötig)
  - Unterstützt: PayPal-Konto + Kreditkarten + Debitkarten
  - Webhook für Zahlungsbestätigung
- **Entfernt:** Stripe (nicht im Original-Scope)

---

## 2. Funktionsumfang (Im 500€-Budget)

### ✅ Funnel-Struktur
- **Landingpage** mit 3 Auswahloptionen:
  - 📦 Produktinformationen
  - 🎓 Kurse & Workshops
  - 💼 Business-Möglichkeiten
- **Unterseiten** für jede Kategorie
- **Formulare** mit DSGVO-konformer Einwilligung
- **Checkout-Seite** mit PayPal-Integration

### ✅ Lead-Management
- **Datenerfassung:** Name, E-Mail, Interesse, Quelle (UTM)
- **Speicherung:** Vercel Postgres Datenbank
- **Automatische Übertragung:** Lead → MailerLite (via API)
- **Tracking:** Funnel-Events (Seitenaufrufe, Formular-Submits, Käufe)

### ✅ E-Mail-Automation (MailerLite)
**Sequenz 1: Freebie-Download**
- Mail 1: Begrüßung + Download-Link (sofort)
- Mail 2: Produktvorteile (Tag 2)
- Mail 3: Business-Chance (Tag 4)
- Mail 4+: Weitere Kurs-Angebote (Tag 7, 14, 21)

**Sequenz 2: Nach Kauf**
- Mail 1: Kaufbestätigung + Zugang (sofort)
- Mail 2: Onboarding-Tipps (Tag 1)
- Mail 3: Upsell-Angebot (Tag 7)

**Konfiguration:** Komplett in MailerLite-Dashboard (kein Code nötig)

### ✅ Zahlungsabwicklung
- **PayPal Smart Payment Buttons**
  - Akzeptiert: PayPal, Kreditkarten, Debitkarten
  - Checkout-Flow: Auf PayPal-Seite (keine PCI-Compliance nötig)
- **Webhook-Integration:** Zahlungsbestätigung → Vercel DB + MailerLite-Tag

### ✅ Social Media Integration
- **UTM-Parameter-Tracking:** Automatische Erfassung der Quelle
- **Click-to-Action-Links:**
  - Instagram Bio-Link
  - Facebook Post-Links
  - WhatsApp Business-Link
- **Tracking:** Welcher Kanal bringt die meisten Conversions

### ✅ DSGVO-Minimal (Rechtssicher)
- **Datenschutzerklärung:** Vorhanden (`/datenschutz`)
- **Impressum:** Vorhanden
- **Einwilligungscheckbox:** Bei jedem Formular
  - "Ich stimme der Datenschutzerklärung zu und möchte E-Mails erhalten"
- **Double-Opt-In:** Via MailerLite automatisch
- **Kein Cookie-Banner nötig:** Keine Tracking-Cookies, nur funktionale Speicherung

---

## 3. NICHT im Scope (Zusatzkosten)

### ❌ Passwortgeschützter Mitgliederbereich
- **Grund:** Nicht im Original-Angebot erwähnt
- **Alternative:** Kurs-Zugang via E-Mail-Link (z.B. Teachable, Kajabi)
- **Zusatzkosten:** +300-400€

### ❌ Admin-Backend für Kundendaten
- **Grund:** Nicht im Original-Angebot erwähnt
- **Alternative:** MailerLite-Dashboard (alle Kontakte + Statistiken)
- **Zusatzkosten:** +150-200€ für Custom-Backend

### ❌ Kreditkarten-Direktintegration (Stripe)
- **Grund:** Nicht im Original-Angebot, PayPal akzeptiert bereits Kreditkarten
- **Alternative:** PayPal Smart Buttons (inkludiert Kreditkarten)

---

## 4. Datenbank-Schema (Vercel Postgres)

### Tabelle: `leads`
```sql
CREATE TABLE leads (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  interest VARCHAR(50), -- 'product', 'course', 'business'
  source VARCHAR(100), -- UTM-Parameter
  mailerlite_id VARCHAR(100), -- MailerLite Subscriber ID
  opted_in BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Tabelle: `purchases`
```sql
CREATE TABLE purchases (
  id SERIAL PRIMARY KEY,
  lead_id INTEGER REFERENCES leads(id),
  paypal_order_id VARCHAR(255) UNIQUE NOT NULL,
  product_name VARCHAR(255),
  amount DECIMAL(10,2),
  currency VARCHAR(3) DEFAULT 'EUR',
  status VARCHAR(50), -- 'pending', 'completed', 'failed'
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Tabelle: `funnel_events`
```sql
CREATE TABLE funnel_events (
  id SERIAL PRIMARY KEY,
  lead_id INTEGER REFERENCES leads(id),
  event_type VARCHAR(100), -- 'page_view', 'form_submit', 'checkout_start', 'purchase'
  page_url VARCHAR(500),
  metadata JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## 5. MailerLite-Integration

### API-Endpunkte (zu implementieren)
1. **POST `/api/mailerlight/subscribe`**
   - Fügt Lead zu MailerLite hinzu
   - Setzt Gruppe basierend auf Interesse
   - Triggert automatische E-Mail-Sequenz

2. **POST `/api/mailerlight/tag-purchase`**
   - Fügt "Customer"-Tag nach Kauf hinzu
   - Triggert Kauf-E-Mail-Sequenz

### MailerLite-Gruppen
- `Freebie - Produktinteresse`
- `Freebie - Kursinteresse`
- `Freebie - Business-Interesse`
- `Customers` (nach Kauf)

### Automation in MailerLite (einmalig konfigurieren)
- **Workflow 1:** Neue Subscriber → Willkommens-Sequenz (4 E-Mails)
- **Workflow 2:** Tag "Customer" → Kauf-Sequenz (3 E-Mails)

---

## 6. PayPal-Integration (Vereinfacht)

### Implementierung
```javascript
// PayPal Smart Payment Buttons (kein API-Key nötig)
<script src="https://www.paypal.com/sdk/js?client-id=YOUR_CLIENT_ID&currency=EUR"></script>

paypal.Buttons({
  createOrder: (data, actions) => {
    return actions.order.create({
      purchase_units: [{
        amount: { value: '49.00' }
      }]
    });
  },
  onApprove: async (data, actions) => {
    const order = await actions.order.capture();
    // Webhook an /api/payment/paypal-success
  }
}).render('#paypal-button-container');
```

### Webhook-Handler
- **POST `/api/payment/paypal-webhook`**
  - Speichert Kauf in Vercel DB
  - Sendet Lead-Daten an MailerLite mit "Customer"-Tag
  - Triggert Kauf-E-Mail-Sequenz

---

## 7. Implementierungs-Checkliste

### Phase 1: Datenbank-Setup (2 Std.)
- [ ] Vercel Postgres aktivieren
- [ ] Tabellen erstellen (`leads`, `purchases`, `funnel_events`)
- [ ] Connection-String in `.env.local`

### Phase 2: MailerLite-Integration (3 Std.)
- [ ] MailerLite-Account erstellen (kostenlos)
- [ ] API-Key generieren
- [ ] Gruppen erstellen (Produkte/Kurse/Business/Customers)
- [ ] API-Endpunkte implementieren (`/api/mailerlight/*`)
- [ ] E-Mail-Sequenzen in MailerLite konfigurieren

### Phase 3: localStorage → Vercel DB Migration (2 Std.)
- [ ] Alle `localStorage`-Calls ersetzen
- [ ] API-Routes für Lead-Speicherung (`/api/leads/save`)
- [ ] API-Routes für Event-Tracking (`/api/tracking/event`)

### Phase 4: PayPal-Integration (2 Std.)
- [ ] Stripe-Code entfernen
- [ ] PayPal Smart Buttons implementieren
- [ ] Webhook-Handler für Zahlungsbestätigung
- [ ] Test-Käufe durchführen

### Phase 5: DSGVO-Anpassungen (1 Std.)
- [ ] Einwilligungscheckbox zu allen Formularen
- [ ] Datenschutzerklärung aktualisieren (MailerLite + Vercel erwähnen)
- [ ] Double-Opt-In via MailerLite testen

### Phase 6: Testing & Deployment (2 Std.)
- [ ] End-to-End-Test: Social Link → Formular → E-Mail → Kauf
- [ ] MailerLite-Sequenzen testen
- [ ] PayPal-Sandbox-Test
- [ ] Vercel-Deployment
- [ ] Dokumentation für Kundin

**Gesamtaufwand:** ~12 Stunden (passt zu 500€ bei 40-45€/Std.)

---

## 8. Übergabe an Kundin

### Was die Kundin erhält:
1. **Funktionsfähiger Funnel** (live auf Vercel)
2. **MailerLite-Dashboard-Zugang**
   - Kontakte einsehen
   - E-Mail-Texte anpassen
   - Statistiken abrufen
3. **PayPal-Business-Account-Zugang**
   - Zahlungen einsehen
   - Auszahlungen verwalten
4. **Dokumentation:**
   - Social-Media-Links (Instagram/Facebook/WhatsApp)
   - Wie E-Mail-Texte ändern (MailerLite)
   - Wie Preise anpassen (PayPal-Buttons)

### Was die Kundin NICHT braucht:
- ❌ Kein Admin-Backend (MailerLite-Dashboard reicht)
- ❌ Kein Server-Zugriff (Vercel managed)
- ❌ Keine Code-Kenntnisse (alles über MailerLite-UI)

---

## 9. Laufende Kosten (für Kundin)

| Service | Kostenlos bis | Danach |
|---------|---------------|--------|
| **Vercel** | 100 GB Bandwidth | $20/Monat |
| **Vercel Postgres** | 256 MB | $20/Monat |
| **MailerLite** | 1.000 Kontakte | $10/Monat (2.500 Kontakte) |
| **PayPal** | Unbegrenzt | 2,49% + 0,35€ pro Transaktion |

**Realistisch:** 0-10€/Monat für die ersten 6-12 Monate

---

## 10. Vorteile dieser Lösung

### ✅ Für dich (Entwickler)
- Minimaler Code-Aufwand (MailerLite übernimmt E-Mail-Logik)
- Keine Cron-Jobs nötig
- Keine komplexe Authentication
- Schnelles Deployment (Vercel)
- Wenig Wartung

### ✅ Für Kundin
- Einfaches Dashboard (MailerLite)
- Keine technischen Kenntnisse nötig
- Niedrige laufende Kosten
- Professionelle E-Mail-Automation
- Skalierbar (bis 1.000 Kontakte kostenlos)

### ✅ DSGVO-konform
- Double-Opt-In (MailerLite)
- Datenhoheit (eigene Vercel-DB)
- Unsubscribe-Links (automatisch)
- Keine unnötigen Cookies

---

## 11. Abgrenzung zu Zusatzleistungen

| Feature | Im Scope (500€) | Zusatzkosten |
|---------|------------------|--------------|
| Funnel mit 3 Kategorien | ✅ | - |
| Lead-Erfassung + DB | ✅ | - |
| E-Mail-Automation (4+ Mails) | ✅ | - |
| PayPal-Checkout | ✅ | - |
| Social-Media-Links | ✅ | - |
| DSGVO-Basis | ✅ | - |
| **Mitgliederbereich** | ❌ | +300-400€ |
| **Admin-Backend** | ❌ | +150-200€ |
| **Stripe-Integration** | ❌ | +150€ |
| **Cookie-Consent-Banner** | ❌ | +100€ |
| **Custom-CRM-Dashboard** | ❌ | +200€ |

---

## Nächste Schritte

1. **Kundin informieren:** Neuer Scope-Dokument vorlegen
2. **MailerLite-Account:** Kundin erstellt Account (oder du mit ihrer E-Mail)
3. **PayPal-Business:** Kundin erstellt PayPal-Business-Account
4. **Vercel-Deployment:** Projekt auf Vercel deployen
5. **Implementierung:** Nach obiger Checkliste (12 Std.)
6. **Übergabe:** Dokumentation + Einweisung (1 Std. Call)

**Projektdauer:** 2-3 Wochen (bei Teilzeit-Arbeit)
