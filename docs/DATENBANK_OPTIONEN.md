# Datenbank-Optionen für CRM auf Vercel

## Aktueller Status

**Jetzt:** LocalStorage (Browser-Cache)
- ✅ Funktioniert für Demo
- ❌ Daten gehen verloren beim Cache-Löschen
- ❌ Nicht für Production geeignet

---

## Empfohlene Lösungen (alle kostenlos!)

### 1. Vercel KV (Redis) ⭐ EMPFOHLEN

**Kosten:** €0/Monat (Hobby Plan)

**Limits:**
- 256 MB Speicher
- 30.000 Commands/Monat
- ~10.000 Leads möglich

**Vorteile:**
- ✅ Offiziell von Vercel
- ✅ Ein-Klick-Setup
- ✅ Sehr schnell
- ✅ Einfache API
- ✅ DSGVO-konform

**Setup:**
1. In Vercel Dashboard: Storage → Create KV Database
2. `npm install @vercel/kv`
3. Fertig!

**Code-Beispiel:**
```javascript
import { kv } from '@vercel/kv'

// Lead speichern
export async function saveLead(lead) {
  const id = `lead:${Date.now()}`
  await kv.hset(id, lead)
  await kv.zadd('leads:index', { score: Date.now(), member: id })
  return id
}

// Alle Leads abrufen
export async function getLeads() {
  const keys = await kv.zrange('leads:index', 0, -1, { rev: true })
  const leads = await Promise.all(
    keys.map(key => kv.hgetall(key))
  )
  return leads
}
```

---

### 2. Vercel Postgres

**Kosten:** €0/Monat (powered by Neon)

**Limits:**
- 512 MB Speicher
- 60 Stunden Compute/Monat
- Unbegrenzte Leads (bis Speicher voll)

**Vorteile:**
- ✅ Echte SQL-Datenbank
- ✅ Relationale Daten
- ✅ Komplexe Abfragen

**Nachteile:**
- ⚠️ Compute-Limit (60h/Monat)
- ⚠️ Komplexer als KV

**Setup:**
1. In Vercel Dashboard: Storage → Create Postgres Database
2. `npm install @vercel/postgres`
3. Schema erstellen

**Code-Beispiel:**
```javascript
import { sql } from '@vercel/postgres'

// Lead speichern
export async function saveLead(lead) {
  const result = await sql`
    INSERT INTO leads (name, email, source, created_at)
    VALUES (${lead.name}, ${lead.email}, ${lead.source}, NOW())
    RETURNING id
  `
  return result.rows[0].id
}

// Alle Leads abrufen
export async function getLeads() {
  const result = await sql`
    SELECT * FROM leads ORDER BY created_at DESC
  `
  return result.rows
}
```

---

### 3. Firebase Firestore

**Kosten:** €0/Monat (Spark Plan)

**Limits:**
- 1 GB Speicher
- 50.000 Reads/Tag
- 20.000 Writes/Tag

**Vorteile:**
- ✅ Sehr großzügig
- ✅ Echtzeit-Updates
- ✅ Offline-Support

**Nachteile:**
- ❌ Google-Account nötig
- ❌ US-Server (DSGVO-Bedenken)
- ❌ Externe Abhängigkeit

**Setup:**
1. Firebase-Projekt erstellen
2. `npm install firebase`
3. Credentials konfigurieren

---

### 4. Google Sheets API

**Kosten:** €0/Monat

**Limits:**
- 60 Requests/Minute
- 10 Millionen Zellen

**Vorteile:**
- ✅ Kundin sieht Daten direkt
- ✅ Export sehr einfach
- ✅ Keine DB-Kenntnisse nötig

**Nachteile:**
- ❌ Langsam
- ❌ API-Limits
- ❌ Nicht für viele Leads

**Setup:**
1. Google Cloud Projekt
2. Service Account erstellen
3. `npm install googleapis`

**Code-Beispiel:**
```javascript
import { google } from 'googleapis'

const sheets = google.sheets('v4')

export async function saveLead(lead) {
  await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.SHEET_ID,
    range: 'Leads!A:E',
    valueInputOption: 'USER_ENTERED',
    resource: {
      values: [[
        lead.name,
        lead.email,
        lead.source,
        new Date().toISOString()
      ]]
    }
  })
}
```

---

### 5. Supabase (PostgreSQL)

**Kosten:** €0/Monat (Free Tier)

**Limits:**
- 500 MB Datenbank
- 50.000 Requests/Monat
- 2 GB Bandwidth

**Vorteile:**
- ✅ Sehr einfache API
- ✅ Realtime-Features
- ✅ Auth inklusive
- ✅ EU-Server möglich

**Nachteile:**
- ⚠️ Externe Anmeldung
- ⚠️ Projekt pausiert nach 7 Tagen Inaktivität

---

## 📊 Vergleich

| Lösung | Kosten | Setup | Speed | DSGVO | Empfehlung |
|--------|--------|-------|-------|-------|------------|
| **Vercel KV** | €0 | ⭐⭐⭐ | ⭐⭐⭐ | ✅ | **BESTE** |
| Vercel Postgres | €0 | ⭐⭐ | ⭐⭐⭐ | ✅ | Gut |
| Firebase | €0 | ⭐⭐ | ⭐⭐⭐ | ⚠️ | OK |
| Google Sheets | €0 | ⭐ | ⭐ | ⚠️ | Nur für Start |
| Supabase | €0 | ⭐⭐ | ⭐⭐ | ✅ | Gut |

---

## 🎯 Empfehlung für Stefanie

### Start: **Vercel KV**

**Warum?**
- Kostenlos
- Einfachste Integration
- Keine externe Anmeldung
- Perfekt für 0-10.000 Leads
- DSGVO-konform

**Migration später möglich zu:**
- Vercel Postgres (bei komplexeren Anforderungen)
- Supabase (bei mehr Features)
- Eigener Server (bei sehr großem Wachstum)

---

## 🔧 Implementierung

### Option 1: Vercel KV (30 Min Arbeit)

**Schritte:**
1. Vercel KV aktivieren
2. API-Routes anpassen
3. CRM-Dashboard anpassen
4. Testen
5. Deployen

**Code-Änderungen:**
- `pages/api/crm/save-lead.js` - KV statt LocalStorage
- `pages/demo/crm.js` - API-Calls statt LocalStorage
- Neue Route: `pages/api/crm/get-leads.js`

### Option 2: Google Sheets (45 Min Arbeit)

**Schritte:**
1. Google Cloud Projekt
2. Service Account
3. Sheet erstellen & teilen
4. API-Integration
5. Testen

**Vorteil:** Kundin sieht Daten direkt in Sheets

---

## 💡 Meine Empfehlung

**Für Stefanie: Vercel KV**

**Begründung:**
1. ✅ Passt perfekt zum Rest (alles bei Vercel)
2. ✅ Keine zusätzlichen Accounts
3. ✅ Sehr einfach für sie zu verstehen
4. ✅ Kostenlos
5. ✅ Skaliert mit ihr

**Alternative:** Google Sheets
- Wenn sie Daten direkt sehen möchte
- Wenn sie mit Sheets vertraut ist
- Für den Anfang OK, später zu KV wechseln

---

## ⏱ Umsetzung

**Ich kann das umsetzen:**
- Vercel KV: 30 Minuten
- Google Sheets: 45 Minuten
- Vercel Postgres: 60 Minuten

**Im Projektpreis (500€) enthalten!**

---

## 🎓 Für Stefanie erklärt

**Aktuell:**
"Deine Leads werden im Browser gespeichert. Wenn du den Browser-Cache löschst, sind sie weg."

**Mit Vercel KV:**
"Deine Leads werden auf einem Server gespeichert. Sie bleiben für immer, egal was passiert. Du kannst von jedem Gerät darauf zugreifen."

**Kosten:** €0 extra!

---

## 📋 Entscheidungshilfe

**Frage an Stefanie:**

*"Möchtest du deine Leads lieber:*
1. *In einer Datenbank (unsichtbar für dich, aber sehr professionell)* → **Vercel KV**
2. *In einem Google Sheet (du siehst sie direkt wie in Excel)* → **Google Sheets**

*Beide Optionen sind kostenlos und im Preis enthalten!"*

---

**Empfehlung: Vercel KV - Professionell, einfach, kostenlos!**
