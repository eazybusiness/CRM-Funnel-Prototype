# Project Scope - CRM Funnel System

**Erstellt für Telefonat am:** 6. Januar 2026

---

## Kernprojekt (Basis-Scope)

### 1. Landingpage mit Freebie-Download
**Inspiriert von:** einquadratmeter.com

- **Landingpage** mit klarem Call-to-Action
  - Professionelles, modernes Design (ähnlich einquadratmeter.com)
  - Willkommensvideo eingebettet
  - Formular für Freebie-Download (Name + E-Mail)
  - DSGVO-konform mit Double-Opt-In
  
- **Freebie-Delivery**
  - Automatischer Download-Link nach Anmeldung
  - PDF-Hosting integriert
  - Willkommensvideo auf Landingpage

### 2. Automatisierte E-Mail-Sequenz
**Wie in ursprünglicher Beschreibung:**

- **Mail 1:** Begrüßung & Freebie-Download-Link (sofort)
- **Mail 2:** Produktvorteile (Tag 2-3)
- **Mail 3:** Business-Chance (Tag 4-5)
- **Mail 4+:** Angebote für Kurse mit Zahlungslink (Tag 7, 14, 21)

**Texte:** Von Kundin bereitgestellt
**Zeitintervalle:** Von Kundin festgelegt
**System:** MailerLite (kostenlos bis 1.000 Kontakte)

### 3. Zahlungsintegration
- **PayPal-Integration** (Kreditkarte + PayPal-Konto)
- Zahlungslinks in E-Mails
- Automatische Zahlungsbestätigung

### 4. CRM-Dashboard (Basis)
- **Übersicht aller Anmeldungen:**
  - E-Mail-Adressen
  - Anmeldedatum
  - Quelle (Instagram, Facebook, WhatsApp)
- **E-Mail-Benachrichtigung** bei neuer Anmeldung
- **Zugriff via MailerLite-Dashboard** (keine Custom-Entwicklung nötig)

### 5. Social Media Integration
- **Links für:**
  - Instagram Bio
  - Facebook Posts
  - WhatsApp Business
- **UTM-Tracking:** Welcher Kanal bringt Conversions

### 6. DSGVO-Konformität
- Double-Opt-In (automatisch via MailerLite)
- Datenschutzerklärung
- Impressum
- Einwilligungscheckbox bei Anmeldung

---

## Technologie-Stack (Kernprojekt)

| Komponente | Technologie | Kosten |
|------------|-------------|--------|
| **Frontend** | Next.js + TailwindCSS | Kostenlos |
| **Hosting** | Vercel | Kostenlos (bis 100 GB Traffic) |
| **Datenbank** | Vercel Postgres | Kostenlos (bis 256 MB) |
| **E-Mail-Marketing** | MailerLite | Kostenlos (bis 500 Kontakte) |
| **Zahlungen** | PayPal | 2,49% + 0,35€ pro Transaktion |

**Laufende Kosten:** 0-10€/Monat für die ersten 6-12 Monate

---

## Extras (Zusatzkosten)

### Extra 1: Geschützter Lernbereich mit Kursen
**Wie von Kundin gewünscht:**

- **Passwortgeschützter Mitgliederbereich**
  - Zugang nach Zahlung
  - Individuelle Login-Daten per E-Mail
  
- **Kurs-Verwaltungssystem**
  - Modularer Aufbau (Videos + PDFs)
  - Fortschritts-Tracking
  - Unbegrenzt viele Kurse erstellbar
  
- **Content-Upload-Interface**
  - Einfaches Hochladen von Videos
  - PDF-Upload
  - Kurs-Struktur selbst erstellen (Drag & Drop)
  
- **Zugriffskontrolle**
  - Automatische Freischaltung nach Zahlung
  - Verschiedene Kurse = verschiedene Zugänge
  - Abo-Verwaltung (optional)

**Zusatzkosten:** +400-500€
**Zusätzlicher Zeitaufwand:** +10-12 Stunden

---

### Extra 2: Erweitertes Admin-Backend
**Für detaillierte Kundenverwaltung:**

- **Custom-Dashboard** (über MailerLite hinaus)
  - Alle Kunden mit Kaufhistorie
  - Kurs-Zugriffe einsehen
  - Manuelle Freischaltungen
  - Export-Funktionen (CSV)
  
- **Erweiterte Statistiken**
  - Conversion-Rates pro Kanal
  - Umsatz-Übersicht
  - Kurs-Performance

**Zusatzkosten:** +200-250€
**Zusätzlicher Zeitaufwand:** +5-6 Stunden

---

### Extra 3: Zweiter Funnel / Themenbereich
**Kundin fragt:** "Weiteres Thema über Landingpage oder via E-Mail-Marketing?"

**Option A: Zweite Landingpage** (empfohlen)
- Separater Link (z.B. für zweites Instagram-Thema)
- Eigene E-Mail-Sequenz
- Klare Trennung der Zielgruppen

**Option B: Via E-Mail-Marketing**
- Angebot in bestehender E-Mail-Sequenz
- Einfacher, aber weniger fokussiert

**Zusatzkosten:** +150-200€ (Option A) / +50€ (Option B)

---

### Extra 4: Abo-Funktion
**Für wiederkehrende Zahlungen:**

- Monatliche/Jährliche Abos
- Automatische Verlängerung
- Abo-Verwaltung für Kundin
- Zugriff endet bei Nicht-Zahlung

**Zusatzkosten:** +200-250€
**Hinweis:** PayPal Subscriptions oder Stripe erforderlich

---

### Extra 5: Webshop-Integration
**Für physische/digitale Produkte:**

- Produktkatalog
- Warenkorb
- Bestellverwaltung
- Versandintegration (optional)

**Zusatzkosten:** +500-700€
**Hinweis:** Kann später ergänzt werden

---

### Extra 6: Design-Anpassungen nach Launch
**Nach Projektabschluss:**

- **Erste 3 Monate:** Kleinere Anpassungen inklusive
- **Danach:** Stundenweise Abrechnung (50€/Std.)
- **Große Redesigns:** Nach Aufwand

---

## Skalierbarkeit & Flexibilität

### ✅ Unbegrenzt Kurse
- Ja, beliebig viele Kurse mit unterschiedlichen Links möglich
- Jeder Kurs kann eigene Zugangsregeln haben

### ✅ Nachträgliche Anpassungen
- Design-Änderungen: Jederzeit möglich
- Neue Features: Als Extras buchbar
- Abo-Funktion: Kann später ergänzt werden
- Webshop: Kann später ergänzt werden

### ✅ Backups & Sicherheit
- Automatische Backups via Vercel
- Cloud-basiert (keine lokalen Server)
- SSL-Verschlüsselung inklusive

---

## Empfohlenes Vorgehen

### Phase 1: Kernprojekt (Basis-Scope)
**Dauer:** 2-3 Wochen
**Kosten:** 500€

**Lieferumfang:**
1. Landingpage mit Freebie-Download
2. Automatisierte E-Mail-Sequenz (4+ Mails)
3. PayPal-Integration
4. CRM-Dashboard (MailerLite)
5. Social-Media-Links
6. DSGVO-konform

**Ergebnis:** Voll funktionsfähiger Funnel, sofort einsatzbereit

---

### Phase 2: Geschützter Lernbereich (Extra 1)
**Dauer:** 1-2 Wochen
**Kosten:** +400-500€

**Lieferumfang:**
1. Passwortgeschützter Mitgliederbereich
2. Kurs-Upload-System
3. Video + PDF-Integration
4. Automatische Zugangsfreischaltung nach Zahlung

**Ergebnis:** Vollständige Kurs-Plattform

---

### Phase 3: Weitere Extras (optional)
**Nach Bedarf:**
- Erweitertes Admin-Backend
- Zweiter Funnel
- Abo-Funktion
- Webshop

---

## Preisübersicht

| Leistung | Preis |
|----------|-------|
| **Kernprojekt** (Funnel + E-Mail-Automation) | **500€** |
| + Geschützter Lernbereich mit Kursen | +400-500€ |
| + Erweitertes Admin-Backend | +200-250€ |
| + Zweiter Funnel/Themenbereich | +150-200€ |
| + Abo-Funktion | +200-250€ |
| + Webshop-Integration | +500-700€ |

**Gesamt (Kernprojekt + Lernbereich):** 900-1.000€

---

## Was Kundin liefert

1. **Texte für E-Mails** (alle 4+ Mails)
2. **Freebie-PDF** (fertig zum Upload)
3. **Willkommensvideo** (Link oder Datei)
4. **Bilder/Logo** für Landingpage
5. **Kursinhalte** (Videos + PDFs) - falls Extra 1 gebucht
6. **PayPal-Business-Account** (oder wird gemeinsam erstellt)

---

## Was Kundin erhält

### Nach Kernprojekt:
1. Live-Website auf eigener Domain
2. MailerLite-Dashboard-Zugang (alle Kontakte einsehen)
3. Automatisierte E-Mail-Sequenzen (laufen ohne Zutun)
4. PayPal-Integration (Zahlungen automatisch)
5. Social-Media-Links (Instagram/Facebook/WhatsApp)
6. Dokumentation für Selbstverwaltung

### Nach Extra 1 (Lernbereich):
7. Kurs-Upload-Interface (selbst Kurse erstellen)
8. Mitglieder-Verwaltung
9. Automatische Zugangsfreischaltung

---

## Technische Fragen beantwortet

### ✅ Wie einfach Kurse erstellen?
**Mit Extra 1:** Sehr einfach via Upload-Interface
- Videos hochladen (oder YouTube/Vimeo einbetten)
- PDFs hochladen
- Module per Drag & Drop sortieren
- Keine Code-Kenntnisse nötig

### ✅ E-Mail-Benachrichtigung bei Anmeldung?
**Ja**, automatisch via MailerLite konfigurierbar

### ✅ Zweites Thema über Landingpage oder E-Mail?
**Empfehlung:** Zweite Landingpage (klare Trennung)
**Alternative:** Via E-Mail-Marketing (günstiger, aber weniger fokussiert)

### ✅ Nachträgliche Anpassungen möglich?
**Ja:**
- Abo-Funktion: Kann später ergänzt werden
- Webshop: Kann später ergänzt werden
- Design: Erste 3 Monate kleinere Anpassungen inklusive

### ✅ Unbegrenzt Kurse?
**Ja**, mit Extra 1 beliebig viele Kurse mit unterschiedlichen Links

### ✅ Backups & Cloud?
**Ja**, automatische Backups via Vercel (Cloud-basiert)

---

## Nächste Schritte

1. **Telefonat:** Scope besprechen, Extras festlegen
2. **Entscheidung:** Kernprojekt + welche Extras?
3. **Start:** MailerLite + PayPal-Account erstellen
4. **Entwicklung:** Phase 1 (Kernprojekt) starten
5. **Übergabe:** Live-System + Einweisung

---

## Empfehlung für Telefonat

**Vorschlag:**
1. **Sofort starten:** Kernprojekt (500€)
   - Funnel läuft, E-Mails automatisiert, Zahlungen funktionieren
   - Kundin kann sofort Leads sammeln
   
2. **Parallel planen:** Extra 1 (Lernbereich)
   - Während Kernprojekt läuft, Kursinhalte vorbereiten
   - Nach 2-3 Wochen Lernbereich ergänzen
   
3. **Später erweitern:** Weitere Extras nach Bedarf
   - Abo-Funktion, Webshop, etc. wenn Business wächst

**Gesamtinvestition (empfohlen):** 900-1.000€
**Zeitrahmen:** 4-5 Wochen für Kern + Lernbereich
