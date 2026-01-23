# Brevo Automation Guide – E-Mail-Sequenzen (Copy/Paste)

Diese Anleitung beschreibt, wie du die E-Mail-Sequenz in **Brevo Automations** einrichtest.
Die Inhalte sind so vorbereitet, dass du sie direkt in Brevo als Templates einfügen kannst.

---

## 1) Vorbereitung in Brevo

1. **Login in Brevo**
2. Gehe zu **Kontakte → Listen**
3. Erstelle eine Liste, z. B. **Freebie-Interessenten**
4. Stelle sicher, dass neue Leads (Freebie-Formular) in diese Liste laufen
5. **Wichtig:** Die Freebie-Auslieferung erfolgt **nicht** in Brevo, sondern im Funnel (Formular + Freebie-Download)

---

## 2) Automation Workflow erstellen

1. **Automations → Create a workflow**
2. **Start-Trigger:** **Welcome message**
   - Wähle die Liste **Freebie-Interessenten**
   - Dieser Trigger ist korrekt für Listenbeitritt (statt “Contact added to a list”)
3. Füge die folgenden Schritte hinzu:
   - **E-Mail 1**: Produktvorteile (Tag 2–3)
   - **Wartezeit 2–3 Tage** → **E-Mail 2** (Business-Chance)
   - **Wartezeit 2–3 Tage** → **E-Mail 3** (Kursangebot)
   - Optional: weitere Mails (Tag 14 / 21)

> Tipp: Nutze Brevos „Delay“ Step (z. B. 2 Tage + 1 Tag Variation)

---

## 3) E-Mail Templates (Copy/Paste)

> Platzhalter: Ersetze `{{firstName}}` wenn Brevo Vorname-Feld verwendet wird.
> Falls du keinen Vornamen hast, kannst du die Anrede entfernen.

### Mail 1 (Tag 2–3) – Produktvorteile
**Betreff:** 3 Vorteile, die dein Alltag sofort spürt

**Text (Plain):**
```
Hallo {{firstName}},

hier sind 3 Vorteile, die du durch bewussteres Leben schnell merkst:

1) Mehr Klarheit im Kopf
2) Weniger Stress durch Fokus
3) Mehr Zeit für das Wesentliche

Wenn du tiefer einsteigen willst, findest du hier weitere Impulse:
https://deine-domain.com/kurse

Herzliche Grüße
Dein Team von Einfach bewusster leben
```

**HTML:**
```html
<p>Hallo {{firstName}},</p>
<p>hier sind 3 Vorteile, die du durch bewussteres Leben schnell merkst:</p>
<ol>
  <li>Mehr Klarheit im Kopf</li>
  <li>Weniger Stress durch Fokus</li>
  <li>Mehr Zeit für das Wesentliche</li>
</ol>
<p>Wenn du tiefer einsteigen willst, findest du hier weitere Impulse:</p>
<p><a href="https://deine-domain.com/kurse">https://deine-domain.com/kurse</a></p>
<p>Herzliche Grüße<br>Dein Team von Einfach bewusster leben</p>
```

---

### Mail 2 (Tag 4–5) – Business-Chance
**Betreff:** Deine Möglichkeit für ein bewusstes Business

**Text (Plain):**
```
Hallo {{firstName}},

viele unserer Teilnehmenden nutzen die Methoden nicht nur privat,
sondern bauen sich damit auch ein bewusstes Business auf.

Wenn dich das interessiert, findest du hier alle Infos:
https://deine-domain.com/business

Herzliche Grüße
Dein Team von Einfach bewusster leben
```

**HTML:**
```html
<p>Hallo {{firstName}},</p>
<p>viele unserer Teilnehmenden nutzen die Methoden nicht nur privat,
sondern bauen sich damit auch ein bewusstes Business auf.</p>
<p>Wenn dich das interessiert, findest du hier alle Infos:</p>
<p><a href="https://deine-domain.com/business">https://deine-domain.com/business</a></p>
<p>Herzliche Grüße<br>Dein Team von Einfach bewusster leben</p>
```

---

### Mail 3 (Tag 7) – Kursangebot + Zahlungslink
**Betreff:** Starte jetzt mit dem Kurs „Minimalismus Grundlagen“

**Text (Plain):**
```
Hallo {{firstName}},

wenn du jetzt richtig starten willst, ist dieser Kurs ideal:
„Minimalismus Grundlagen“ – klar, strukturiert, sofort umsetzbar.

Hier geht’s direkt zur Zahlung:
https://deine-domain.com/checkout?courseId=1&courseName=Minimalismus%20Grundlagen&price=49

Fragen? Antworte einfach auf diese E-Mail.

Herzliche Grüße
Dein Team von Einfach bewusster leben
```

**HTML:**
```html
<p>Hallo {{firstName}},</p>
<p>wenn du jetzt richtig starten willst, ist dieser Kurs ideal:</p>
<p><strong>„Minimalismus Grundlagen“</strong> – klar, strukturiert, sofort umsetzbar.</p>
<p><a href="https://deine-domain.com/checkout?courseId=1&courseName=Minimalismus%20Grundlagen&price=49">Jetzt Kurs kaufen</a></p>
<p>Fragen? Antworte einfach auf diese E-Mail.</p>
<p>Herzliche Grüße<br>Dein Team von Einfach bewusster leben</p>
```

---

### Mail 4 (Tag 14) – Reminder + Social Proof
**Betreff:** Noch unsicher? Hier ist, was andere sagen

**Text (Plain):**
```
Hallo {{firstName}},

kurzer Reminder: Der Kurs „Minimalismus Grundlagen“ hilft dir, direkt Struktur zu schaffen.

Viele Teilnehmer berichten von:
- klareren Prioritäten
- weniger Stress
- mehr Fokus

Hier kannst du starten:
https://deine-domain.com/checkout?courseId=1&courseName=Minimalismus%20Grundlagen&price=49

Herzliche Grüße
Dein Team von Einfach bewusster leben
```

**HTML:**
```html
<p>Hallo {{firstName}},</p>
<p>kurzer Reminder: Der Kurs <strong>„Minimalismus Grundlagen“</strong> hilft dir, direkt Struktur zu schaffen.</p>
<ul>
  <li>klareren Prioritäten</li>
  <li>weniger Stress</li>
  <li>mehr Fokus</li>
</ul>
<p><a href="https://deine-domain.com/checkout?courseId=1&courseName=Minimalismus%20Grundlagen&price=49">Jetzt starten</a></p>
<p>Herzliche Grüße<br>Dein Team von Einfach bewusster leben</p>
```

---

### Mail 5 (Tag 21) – Letzter Reminder
**Betreff:** Letzte Erinnerung – Start jederzeit möglich

**Text (Plain):**
```
Hallo {{firstName}},

letzte Erinnerung: Dein Einstieg in den Kurs ist jederzeit möglich.
Wenn du bereit bist, starte hier:
https://deine-domain.com/checkout?courseId=1&courseName=Minimalismus%20Grundlagen&price=49

Herzliche Grüße
Dein Team von Einfach bewusster leben
```

**HTML:**
```html
<p>Hallo {{firstName}},</p>
<p>letzte Erinnerung: Dein Einstieg in den Kurs ist jederzeit möglich.</p>
<p><a href="https://deine-domain.com/checkout?courseId=1&courseName=Minimalismus%20Grundlagen&price=49">Jetzt starten</a></p>
<p>Herzliche Grüße<br>Dein Team von Einfach bewusster leben</p>
```

---

## 4) Checklisten

- [ ] Liste „Freebie-Interessenten“ in Brevo erstellt
- [ ] Automations-Workflow gebaut
- [ ] Mail 1–5 eingefügt
- [ ] Links auf Live-Domain angepasst
- [ ] Absendername + Reply-To geprüft

---

## 5) Hinweise
- Ersetze `https://deine-domain.com` mit der echten Domain.
- Wenn Kurse später andere IDs/Preise haben, bitte Links anpassen.
- Für Produktion: PayPal auf **Live** umstellen (`PAYPAL_API_URL=https://api-m.paypal.com`).
