# Projektinfos – Einfach bewusster leben (Stefanie Dinçer)

## Accounts & Zugänge (alle aktuell auf Nils' Namen)

| Service | Account / URL | Inhaber | Plan |
|---|---|---|---|
| **Vercel** | https://vercel.com/eazybusiness-projects/crm-funnel-prototype | Nils (eazybusiness) | Free |
| **Live-URL** | https://crm-funnel-prototype.vercel.app | Nils | Free |
| **GitHub** | https://github.com/eazybusiness/CRM-Funnel-Prototype | Nils (eazybusiness) | – |
| **Brevo** | gerd_meyer@tutavi.com | Nils | Free |
| **Neon DB** | neon-cyan-umbrella | Nils | Free |

> ⚠️ **Wichtig:** Alle Services laufen aktuell auf Nils' Accounts.
> Für die Übergabe an Stefanie müssen diese auf ihre eigenen Accounts übertragen werden.

---

## Übergabe-ToDo (vor Go-Live)

- [ ] Vercel-Projekt auf Stefanies Account übertragen (oder neues Projekt anlegen)
- [ ] GitHub-Repo auf Stefanies Account übertragen oder forken
- [ ] Brevo: Absender-Domain klären (siehe unten ⚠️)
- [ ] Neon-Datenbank auf Stefanies Account übertragen
- [ ] Alle Env-Vars in neuem Vercel-Projekt neu setzen
- [ ] PayPal Live-Credentials von Stefanie eintragen (sie trägt selbst ein oder per Video-Call)

---

## ⚠️ Brevo: Absender-Domain & Authentifizierung

**Problem:** E-Mails gehen aktuell von `gerd_meyer@tutavi.com` raus – nicht von Stefanies Domain.

**Ihre Domain** `einfachbewussterleben.de` ist in Brevo bereits eingetragen, aber **nicht authentifiziert** (kein DKIM/DMARC). Ohne Authentifizierung landen E-Mails im Spam.

### Option A: Domain in Nils' Brevo-Account authentifizieren (kurzfristig)
- Stefanie muss DKIM/DMARC-Einträge in ihrem DNS (Domain-Hoster) setzen
- Dann kann `@einfachbewussterleben.de` als Absender genutzt werden
- **Vorteil:** Schnell, kein Account-Wechsel
- **Nachteil:** Brevo-Account bleibt bei Nils – keine saubere Übergabe
- **Free Plan:** Domain-Authentifizierung ist im Brevo Free Plan möglich ✅

### Option B: Eigenen Brevo-Account für Stefanie (empfohlen für Übergabe)
- Neuen Brevo-Account unter Stefanies E-Mail anlegen
- Alle Templates + Automationen manuell neu einrichten (~2-3h Aufwand)
- Domain authentifizieren in ihrem Account
- **Vorteil:** Saubere Übergabe, sie hat volle Kontrolle
- **Nachteil:** Erheblicher manueller Aufwand → Extrakosten

### Empfehlung für Freitag:
→ **Erstmal Option A** (schnell für Launch), dann nach Go-Live sauber zu Option B migrieren.
→ Stefanie braucht Zugang zu ihrem Domain-Hoster (wo sie `einfachbewussterleben.de` registriert hat).
→ **Domain-Hoster: IONOS** (https://www.ionos.de → Mein IONOS → Domains → DNS)

---

## E-Mail-Strecken (Brevo)

### Freebie 1: Minimalismus / Bewusstsein
- **Trigger:** Double-Opt-In bestätigt
- **5 Mails** – Texte von Stefanie in: `client_input/neue_emaistrecke_Email nach Herunterladen des kostenlosen Guides zu mehr Bewusstsein.txt`
- **Status:** Alte Platzhalter-Texte in Brevo, müssen durch Stefanies finale Texte ersetzt werden
- ⚠️ Mail 4 hat keinen Betreff – bei Stefanie nachfragen
- ⚠️ Mail 1 enthält keinen Download-Link – technisch nötig, klären ob vergessen

### Freebie 2: Stoffwechsel
- **Trigger:** Eigener Double-Opt-In (zweiter Funnel, noch nicht gebaut)
- **5 Mails** – Texte von Stefanie in: `client_input/Stoffwechsel_emails.txt`
- **Status:** Noch nicht in Brevo eingetragen, zweiter Funnel noch nicht gebaut

---

## Offene Rechnungen (Stand Juni 2026)

| Position | Beschreibung | Betrag |
|---|---|---|
| Kernprojekt Restbetrag | 50% Anzahlung offen | 250€ |
| Extra 1 (Mitgliederbereich) | Gebaut, nicht abgenommen, nicht bezahlt | 250€ |
| **Gesamt offen** | | **500€** |

### Neue Extras (noch nicht beauftragt, für Freitag besprechen)

| Position | Beschreibung | Preis |
|---|---|---|
| Zweiter Funnel (Stoffwechsel) | Eigene Landingpage + Brevo-Sequenz | 150–200€ |
| 10 E-Mail-Templates manuell einpflegen | 5x Freebie 1 ersetzen + 5x Freebie 2 neu | 100–150€ |
| Vimeo-Integration + Video einbetten | Kursvideos in Mitgliederbereich | 80€ |
| PayPal Live-Schaltung | Sandbox → Live, Webhook, Vercel | inklusive |
| Vercel/Brevo/Neon Übergabe | Transfer aller Accounts auf Stefanie | 50–80€ |
| **Gesamtpaket neu** | | **~380–510€** |

---

## Technischer Stand (Juni 2026)

### ✅ Fertig & funktioniert
- Landingpage, About, Impressum, Datenschutz
- Freebie 1 Download-Flow (Double-Opt-In → Brevo → PDF)
- Login, Registrierung, Passwort-Reset
- Member-Dashboard mit Kursübersicht
- Kurs-Viewer (Video-Embed + PDF)
- Fortschritts-Tracking
- PayPal Sandbox-Checkout
- `/courses` Übersichtsseite
- DSGVO, Rate Limiting, Sicherheit

### ⚠️ Gebaut, aber nicht live/konfiguriert
- PayPal Live (braucht Stefanies Credentials)
- Brevo-Mailtexte (Platzhalter drin, finale Texte fehlen)
- Echte Kursinhalte in DB (Demo-Daten, keine echten Videos/PDFs)

### ❌ Noch nicht gebaut
- Zweiter Funnel (Stoffwechsel-Landingpage)
- Vimeo-Einbettung der echten Kursvideos
- Admin-Interface für Kurs-Upload (Drag & Drop)
- Vercel/Account-Übergabe an Stefanie
