# E-Mail Templates - Follow-up Sequenz

**Hinweis:** Dies sind Beispiel-Texte. Diese können später in Brevo durch die finalen Texte ersetzt werden.

---

## Mail 3: Produktvorteile (Tag +2 nach Bestätigung)

**Betreff:** Wie dir [Produkt] helfen kann 🌱

**HTML-Version:**

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f3f4f6;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f3f4f6; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <tr>
            <td style="padding: 40px 40px 20px 40px; text-align: center;">
              <h1 style="color: #1f2937; margin: 0 0 20px 0; font-size: 28px;">
                Hast du dein Freebie schon angeschaut? 📖
              </h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 0 40px 30px 40px;">
              <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                Hallo {{contact.FIRSTNAME}},
              </p>
              <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                ich hoffe, du konntest schon einen Blick in dein Freebie werfen. 
                Viele unserer Community-Mitglieder berichten, dass bereits diese ersten Schritte 
                einen spürbaren Unterschied gemacht haben.
              </p>
              <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 0 0 30px 0;">
                Aber das ist erst der Anfang. Wenn du wirklich nachhaltige Veränderungen erreichen möchtest, 
                kann ich dir unseren vollständigen Kurs ans Herz legen.
              </p>
              
              <div style="background-color: #f0fdf4; border-left: 4px solid #10b981; padding: 20px; margin: 30px 0;">
                <h3 style="color: #1f2937; margin: 0 0 10px 0; font-size: 18px;">
                  Was dich im Kurs erwartet:
                </h3>
                <ul style="color: #4b5563; margin: 0; padding-left: 20px; line-height: 1.8;">
                  <li>Schritt-für-Schritt Video-Anleitungen</li>
                  <li>Praktische Übungen für den Alltag</li>
                  <li>Bewährte Methoden aus der Praxis</li>
                  <li>Zugang zur exklusiven Community</li>
                  <li>Lebenslanger Zugriff auf alle Inhalte</li>
                </ul>
              </div>

              <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 30px 0 0 0;">
                Ich erzähle dir in den nächsten Tagen mehr darüber. 
                Bis dahin: Viel Erfolg mit deinem Freebie!
              </p>
              <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 10px 0 0 0;">
                Herzliche Grüße<br>
                <strong>Gerd Meyer</strong><br>
                <span style="color: #6b7280; font-size: 14px;">Tutavi Coaching</span>
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding: 30px 40px; background-color: #f9fafb; border-radius: 0 0 8px 8px;">
              <p style="color: #6b7280; font-size: 12px; line-height: 1.6; margin: 0; text-align: center;">
                Du erhältst diese E-Mail, weil du dich für unser Freebie angemeldet hast.<br>
                <a href="{{unsubscribe}}" style="color: #3b82f6; text-decoration: none;">Abmelden</a> | 
                <a href="{{mirror}}" style="color: #3b82f6; text-decoration: none;">Im Browser öffnen</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
```

**Text-Version:**

```
Hast du dein Freebie schon angeschaut?

Hallo {{contact.FIRSTNAME}},

ich hoffe, du konntest schon einen Blick in dein Freebie werfen. 
Viele unserer Community-Mitglieder berichten, dass bereits diese ersten Schritte 
einen spürbaren Unterschied gemacht haben.

Aber das ist erst der Anfang. Wenn du wirklich nachhaltige Veränderungen erreichen möchtest, 
kann ich dir unseren vollständigen Kurs ans Herz legen.

Was dich im Kurs erwartet:
- Schritt-für-Schritt Video-Anleitungen
- Praktische Übungen für den Alltag
- Bewährte Methoden aus der Praxis
- Zugang zur exklusiven Community
- Lebenslanger Zugriff auf alle Inhalte

Ich erzähle dir in den nächsten Tagen mehr darüber. 
Bis dahin: Viel Erfolg mit deinem Freebie!

Herzliche Grüße
Gerd Meyer
Tutavi Coaching

---
Du erhältst diese E-Mail, weil du dich für unser Freebie angemeldet hast.
Abmelden: {{unsubscribe}}
```

---

## Mail 4: Business-Chance (Tag +4 nach Bestätigung)

**Betreff:** Eine Chance, die ich mit dir teilen möchte 💼

**HTML-Version:**

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f3f4f6;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f3f4f6; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <tr>
            <td style="padding: 40px 40px 20px 40px; text-align: center;">
              <h1 style="color: #1f2937; margin: 0 0 20px 0; font-size: 28px;">
                Mehr als nur ein Kurs 🚀
              </h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 0 40px 30px 40px;">
              <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                Hallo {{contact.FIRSTNAME}},
              </p>
              <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                heute möchte ich etwas Besonderes mit dir teilen. 
                Viele unserer Kursteilnehmer haben nicht nur ihr eigenes Leben verändert, 
                sondern daraus auch eine berufliche Chance gemacht.
              </p>
              <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 0 0 30px 0;">
                Stell dir vor, du könntest anderen Menschen helfen, während du gleichzeitig 
                ein zusätzliches Einkommen aufbaust – flexibel, von überall aus.
              </p>
              
              <div style="background-color: #f0fdf4; border-left: 4px solid #10b981; padding: 20px; margin: 30px 0;">
                <h3 style="color: #1f2937; margin: 0 0 10px 0; font-size: 18px;">
                  Das Business-Modell:
                </h3>
                <ul style="color: #4b5563; margin: 0; padding-left: 20px; line-height: 1.8;">
                  <li>Werde Teil unseres Partner-Netzwerks</li>
                  <li>Empfehle unsere Produkte und verdiene mit</li>
                  <li>Flexible Arbeitszeiten, ortsunabhängig</li>
                  <li>Umfassende Schulung und Support</li>
                  <li>Keine Vorkenntnisse nötig</li>
                </ul>
              </div>

              <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 30px 0 20px 0;">
                Wenn dich das interessiert, antworte einfach auf diese E-Mail. 
                Ich erzähle dir gerne mehr darüber, wie das funktioniert.
              </p>
              <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                Oder du schaust dir erst einmal unseren Kurs an – viele starten genau so.
              </p>
              <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 10px 0 0 0;">
                Herzliche Grüße<br>
                <strong>Gerd Meyer</strong><br>
                <span style="color: #6b7280; font-size: 14px;">Tutavi Coaching</span>
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding: 30px 40px; background-color: #f9fafb; border-radius: 0 0 8px 8px;">
              <p style="color: #6b7280; font-size: 12px; line-height: 1.6; margin: 0; text-align: center;">
                Du erhältst diese E-Mail, weil du dich für unser Freebie angemeldet hast.<br>
                <a href="{{unsubscribe}}" style="color: #3b82f6; text-decoration: none;">Abmelden</a> | 
                <a href="{{mirror}}" style="color: #3b82f6; text-decoration: none;">Im Browser öffnen</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
```

**Text-Version:**

```
Mehr als nur ein Kurs

Hallo {{contact.FIRSTNAME}},

heute möchte ich etwas Besonderes mit dir teilen. 
Viele unserer Kursteilnehmer haben nicht nur ihr eigenes Leben verändert, 
sondern daraus auch eine berufliche Chance gemacht.

Stell dir vor, du könntest anderen Menschen helfen, während du gleichzeitig 
ein zusätzliches Einkommen aufbaust – flexibel, von überall aus.

Das Business-Modell:
- Werde Teil unseres Partner-Netzwerks
- Empfehle unsere Produkte und verdiene mit
- Flexible Arbeitszeiten, ortsunabhängig
- Umfassende Schulung und Support
- Keine Vorkenntnisse nötig

Wenn dich das interessiert, antworte einfach auf diese E-Mail. 
Ich erzähle dir gerne mehr darüber, wie das funktioniert.

Oder du schaust dir erst einmal unseren Kurs an – viele starten genau so.

Herzliche Grüße
Gerd Meyer
Tutavi Coaching

---
Du erhältst diese E-Mail, weil du dich für unser Freebie angemeldet hast.
Abmelden: {{unsubscribe}}
```

---

## Mail 5: Kurs-Angebot (Tag +7 nach Bestätigung)

**Betreff:** Bereit für den nächsten Schritt? 🎓

**HTML-Version:**

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f3f4f6;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f3f4f6; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <tr>
            <td style="padding: 40px 40px 20px 40px; text-align: center;">
              <h1 style="color: #1f2937; margin: 0 0 20px 0; font-size: 28px;">
                Dein Weg zur Veränderung beginnt jetzt 🌟
              </h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 0 40px 30px 40px;">
              <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                Hallo {{contact.FIRSTNAME}},
              </p>
              <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                du hast jetzt eine Woche Zeit gehabt, dich mit den Grundlagen vertraut zu machen. 
                Vielleicht hast du schon erste Erfolge gesehen?
              </p>
              <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 0 0 30px 0;">
                Wenn du bereit bist, den nächsten Schritt zu gehen, dann ist jetzt der perfekte Zeitpunkt. 
                Unser vollständiger Kurs gibt dir alle Werkzeuge an die Hand, die du brauchst.
              </p>
              
              <div style="background-color: #f0fdf4; border-left: 4px solid #10b981; padding: 20px; margin: 30px 0;">
                <h3 style="color: #1f2937; margin: 0 0 10px 0; font-size: 18px;">
                  Das bekommst du:
                </h3>
                <ul style="color: #4b5563; margin: 0; padding-left: 20px; line-height: 1.8;">
                  <li>12 umfassende Video-Module</li>
                  <li>Praktische Workbooks und Checklisten</li>
                  <li>Zugang zur exklusiven Community</li>
                  <li>Monatliche Live-Q&A-Sessions</li>
                  <li>Lebenslanger Zugriff auf alle Updates</li>
                  <li>30 Tage Geld-zurück-Garantie</li>
                </ul>
              </div>

              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="padding: 30px 0;">
                    <a href="{{checkout_url}}" 
                       style="background: #1f2937; 
                              color: #ffffff; 
                              text-decoration: none; 
                              padding: 16px 40px; 
                              border-radius: 8px; 
                              font-weight: bold; 
                              font-size: 16px;
                              display: inline-block;">
                      Jetzt Kurs buchen
                    </a>
                  </td>
                </tr>
              </table>

              <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 30px 0 0 0;">
                Investiere in dich selbst. Du bist es wert.
              </p>
              <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 10px 0 0 0;">
                Herzliche Grüße<br>
                <strong>Gerd Meyer</strong><br>
                <span style="color: #6b7280; font-size: 14px;">Tutavi Coaching</span>
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding: 30px 40px; background-color: #f9fafb; border-radius: 0 0 8px 8px;">
              <p style="color: #6b7280; font-size: 12px; line-height: 1.6; margin: 0; text-align: center;">
                Du erhältst diese E-Mail, weil du dich für unser Freebie angemeldet hast.<br>
                <a href="{{unsubscribe}}" style="color: #3b82f6; text-decoration: none;">Abmelden</a> | 
                <a href="{{mirror}}" style="color: #3b82f6; text-decoration: none;">Im Browser öffnen</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
```

**Text-Version:**

```
Dein Weg zur Veränderung beginnt jetzt

Hallo {{contact.FIRSTNAME}},

du hast jetzt eine Woche Zeit gehabt, dich mit den Grundlagen vertraut zu machen. 
Vielleicht hast du schon erste Erfolge gesehen?

Wenn du bereit bist, den nächsten Schritt zu gehen, dann ist jetzt der perfekte Zeitpunkt. 
Unser vollständiger Kurs gibt dir alle Werkzeuge an die Hand, die du brauchst.

Das bekommst du:
- 12 umfassende Video-Module
- Praktische Workbooks und Checklisten
- Zugang zur exklusiven Community
- Monatliche Live-Q&A-Sessions
- Lebenslanger Zugriff auf alle Updates
- 30 Tage Geld-zurück-Garantie

Jetzt Kurs buchen: {{checkout_url}}

Investiere in dich selbst. Du bist es wert.

Herzliche Grüße
Gerd Meyer
Tutavi Coaching

---
Du erhältst diese E-Mail, weil du dich für unser Freebie angemeldet hast.
Abmelden: {{unsubscribe}}
```

---

## Brevo Automation Setup - Anleitung

### Workflow erstellen:

1. **In Brevo Dashboard:** Automation → Create a workflow
2. **Trigger:** "Contact attribute updated" → `DOUBLE_OPT_IN` = `true`
3. **Workflow-Schritte:**
   - Warte 2 Tage → Sende Mail 3 (Produktvorteile)
   - Warte 2 Tage → Sende Mail 4 (Business-Chance)
   - Warte 3 Tage → Sende Mail 5 (Kurs-Angebot)

### Platzhalter in Brevo:
- `{{contact.FIRSTNAME}}` → Vorname des Kontakts
- `{{unsubscribe}}` → Automatischer Abmelde-Link
- `{{mirror}}` → Link zur Web-Version
- `{{checkout_url}}` → Manuell ersetzen mit: `https://crm-funnel-prototype.vercel.app/checkout`

### Design-Konsistenz:
- Alle Buttons: `#1f2937` (dunkelgrau)
- Schriftart: Arial, sans-serif
- Akzentfarbe: `#10b981` (grün) für Boxen
- Minimalistisch, keine Farbverläufe

---

## Nächste Schritte:

1. ✅ Templates in Brevo erstellen (HTML + Text)
2. ✅ Automation Workflow einrichten
3. ✅ Checkout-URL anpassen
4. ✅ Workflow testen mit Test-Kontakt
5. ✅ Workflow aktivieren

**Hinweis:** Diese Texte sind Platzhalter und sollten durch die finalen Texte der Kundin ersetzt werden.
