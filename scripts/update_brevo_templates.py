"""
Update Brevo email templates with Stefanie's final content.
Backups are stored in docs/brevo_backup/
"""

import urllib.request
import urllib.error
import json
import os

API_KEY = os.environ.get("BREVO_API_KEY", "")
BASE_URL = "https://api.brevo.com/v3/smtp/templates"
SENDER = {"name": "Stefanie Dinçer", "email": "gerd_meyer@tutavi.com"}


def build_html(subject, body_paragraphs):
    """Build clean minimal HTML email from paragraphs list."""
    paragraphs_html = "\n".join(
        f'<p style="color: #374151; font-size: 15px; line-height: 1.8; margin: 0 0 16px 0;">{p}</p>'
        for p in body_paragraphs
    )
    return f"""<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{subject}</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f9fafb;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9fafb; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px;">
          <tr>
            <td style="padding: 48px 40px 32px 40px;">
              {paragraphs_html}
            </td>
          </tr>
          <tr>
            <td style="padding: 20px 40px 32px 40px; border-top: 1px solid #f3f4f6;">
              <p style="color: #9ca3af; font-size: 12px; margin: 0;">
                Viele Grüße<br>Stefanie Dinçer &ndash; einfachbewussterleben.de<br><br>
                <a href="{{{{unsubscribe}}}}" style="color: #9ca3af;">Abmelden</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>"""


def build_text(paragraphs):
    """Build plain text version."""
    return "\n\n".join(paragraphs) + "\n\nViele Grüße\nStefanie Dinçer - einfachbewussterleben.de"


def update_template(template_id, subject, paragraphs):
    """Update a single Brevo template via API."""
    html = build_html(subject, paragraphs)
    text = build_text(paragraphs)

    payload = json.dumps({
        "sender": SENDER,
        "subject": subject,
        "htmlContent": html,
        "textContent": text,
        "isActive": True
    }).encode("utf-8")

    req = urllib.request.Request(
        f"{BASE_URL}/{template_id}",
        data=payload,
        method="PUT",
        headers={
            "accept": "application/json",
            "content-type": "application/json",
            "api-key": API_KEY
        }
    )
    try:
        with urllib.request.urlopen(req) as resp:
            print(f"✅ Template {template_id} updated: {subject}")
    except urllib.error.HTTPError as e:
        print(f"❌ Template {template_id} failed: {e.code} {e.read().decode()}")


# === TEMPLATE DEFINITIONS ===
# Note: {{contact.FIRSTNAME}} is Brevo's variable for first name

templates = [
    {
        "id": 5,
        "subject": "Herzlich willkommen! So schön, dass du da bist",
        "paragraphs": [
            "Hallo {{contact.FIRSTNAME}},",
            "wie schön, dass du dir den kostenlosen Guide zu mehr Bewusstsein heruntergeladen hast.",
            "Es zeigt mir, dass in dir der Wunsch lebt, Ballast loszulassen und bewusster durchs Leben zu gehen. Genau dort beginnt oft die größte Veränderung - und zwar mit einer einzigen Entscheidung.",
            "In den nächsten Tagen möchte ich dich mit einigen Gedanken und Impulsen begleiten. Mein Ziel ist es, dass du nicht nur etwas liest, sondern auch umsetzt, um dich im Alltag zu unterstützen.",
            "Für heute lade ich dich zu einer kleinen Reflexion ein:<br><br><em>Was halte ich gerade fest, obwohl es mir längst nicht mehr gut tut?</em>",
            "Du musst darauf keine perfekte Antwort finden. Oft reicht es schon, die Frage ehrlich erst mal zuzulassen.",
            "Ich wünsche dir viel Freude beim Lesen des Guides und hoffe, dass er dir neue Perspektiven eröffnet.",
        ]
    },
    {
        "id": 1,
        "subject": "Wie alles begann sich zu verändern",
        "paragraphs": [
            "Hi {{contact.FIRSTNAME}},",
            "vielleicht hast du schon Zeit gefunden, in deinen kostenlosen Guide reinzulesen. Ich möchte dir heute einen Einblick in meine Geschichte und den Anfang meines bewussteren Lebens geben:",
            "Im Jahr 2024 wurde bei mir eine große Hautkrebsstelle auf der Stirn entdeckt. Durch eine Creme zur Bekämpfung des Krebses entzündete sich diese Stelle Tag für Tag mehr und wurde dadurch auch deutlich sichtbarer für mich und meine Mitmenschen. Plötzlich stand die Frage im Raum, die alles veränderte:",
            "<em>Was ist eigentlich wirklich wichtig?</em>",
            "Durch Gespräche mit der Hautärztin in der Klinik veränderte sich auch das Bewusstsein für Dinge, die ich täglich konsumierte. Denn bis zu diesem Zeitpunkt machte ich mir relativ wenig Gedanken darüber, welche Inhaltsstoffe meine Pflegeprodukte haben oder wie viele Dinge ich in meinem Haushalt habe, die nicht gerade gesundheitsfördernd sind.",
            "Denn mir wurde klar: Leben ist endlich. Nicht unendlich.",
            "Genau daraus ist etwas in Bewegung gekommen. Ich habe angefangen zu beobachten, wie sehr äußere Ordnung und Klarheit mit der inneren Ordnung verbunden sind. Wie bewusst ausgewählte Dinge blieben, während schnell und unüberlegt gekaufte Dinge gehen mussten.",
            "Von dort an habe ich begonnen, loszulassen. Bis heute sind mehrere 1000 Dinge aus meinem Zuhause ausgezogen.<br><br>Mein Leben wurde leichter. Weniger Ablenkung. Mehr Klarheit. Mehr Fokus auf das, was mir wirklich wichtig ist.",
            "Heute fühlt sich mein Alltag einfacher an. Irgendwie echter und auch freier. Genau das ist der Weg, den ich mit dir teilen möchte.",
        ]
    },
    {
        "id": 2,
        "subject": "Irrtümer und Blockaden auf dem Weg zu einem leichteren Leben",
        "paragraphs": [
            "Hallo {{contact.FIRSTNAME}},",
            "auf dem Weg zu einem bewussteren und leichteren Leben tauchen ziemlich typische Denkfehler und innere Blockaden auf. Viele davon wirken harmlos oder sogar logisch. Sie halten aber genau das fest, was man eigentlich loswerden will.",
            "<strong>Die häufigsten Irrtümer und Blockaden:</strong>",
            "<strong>1. "Ich brauche das vielleicht irgendwann noch"</strong><br>Problem: Du organisierst dein Leben um eine mögliche Version von dir, die vielleicht nie eintritt.<br>Ergebnis: Dinge bleiben vorsorglich da und blockieren den Raum - physisch und mental.",
            "<strong>2. Emotionale Bindung wird mit Wert verwechselt</strong><br>Problem: Ein Objekt wird zum Stellvertreter für einen Moment, eine Person oder ein Lebensgefühl.<br>Ergebnis: Du hältst nicht das Ding fest, sondern die Vergangenheit.",
            "<strong>3. "Das war teuer."</strong><br>Problem: Der Blick geht zurück auf den Kauf und nicht nach vorne auf den zukünftigen Nutzen.<br>Ergebnis: Man behält Dinge, die man eigentlich nicht braucht, um sich den Verlust nicht einzugestehen.",
            "Genau diese inneren Muster haben mich auch in meinen Anfängen lange davon abgehalten, wirklich loszulassen.",
        ]
    },
    {
        "id": 3,
        "subject": "Erkennen ist nur der erste Schritt",
        "paragraphs": [
            "Hey {{contact.FIRSTNAME}},",
            "nachdem ich angefangen habe, all diese Muster zu erkennen - wie "vielleicht brauche ich das noch" - wurde etwas ziemlich deutlich:",
            "<em>Erkennen ist nur der erste Schritt.</em>",
            "Im Alltag passiert es nämlich so: Du gehst in einen Raum, öffnest einen Schrank, nimmst etwas in die Hand, und plötzlich bist du wieder in deinem alten Muster.",
            "Genau deshalb bleiben viele beim Ausmisten stehen. Weil sie ihre Muster nicht verstanden haben und weil ihnen jemand fehlt, der sie durch diesen Prozess führt.",
            "Über die Zeit mit mehreren 1000 Dingen weniger hat sich daraus ein klarer Prozess entwickelt. Ein Weg, der nicht auf Perfektion basiert, sondern auf kleinen und machbaren Schritten. Ein Weg, der dir hilft, zu verstehen, zu handeln und langfristig bewusster zu werden.",
            "Genau diesen Prozess habe ich in einem Videokurs zusammengefasst. Dort nehme ich dich Schritt für Schritt mit durch den gesamten Ablauf - vom inneren Loslassen bis zum bewussten Konsum.",
            "Wenn du verstehen willst, warum wir festhalten, und lernen möchtest, wie du es Schritt für Schritt veränderst, dann ist das genau für dich gemacht:<br><br><a href='https://crm-funnel-prototype.vercel.app/courses' style='color: #1f2937; font-weight: bold;'>Zum Videokurs</a>",
        ]
    },
    {
        "id": 4,
        "subject": ""Ich weiß nicht, wo ich anfangen soll"",
        "paragraphs": [
            "Hello again {{contact.FIRSTNAME}},",
            "viele Menschen sagen mir, dass sie eigentlich bereit sind, Dinge loszulassen. Aber genau am Anfang blockiert irgendwas.",
            "<em>"Ich weiß nicht, wo ich anfangen soll."</em>",
            "Das ist ehrlich gesagt völlig normal.",
            "Das Problem ist nicht der Mangel an Motivation. Das eigentliche Problem ist die Überforderung durch die Menge an Dingen. Wenn du einmal bewusst in deine Wohnung oder dein Haus schaust, siehst du nicht ein paar Dinge zum Aussortieren, sondern eine unklare große Gesamtheit.",
            "Deshalb passiert meistens eines von zwei Dingen:<br>- Du fängst erst gar nicht an.<br>- Oder du fängst irgendwo an und hörst schnell wieder auf.",
            "Ich kenne das sehr gut, weil es mir genauso ging. Man fühlt sich einfach überfordert.",
            "Der entscheidende Unterschied kam erst, als ich aufgehört habe, alles auf einmal lösen zu wollen - und stattdessen konstant in kleinen Schritten ausgemistet habe.<br><br>Kleine Bereiche. Eindeutige Entscheidungen. Nicht perfekt. Aber machbar.",
            "Genau darauf basiert auch der Prozess, den ich im Videokurs zeige. Wenn du gerade genau an diesem Punkt stehst - "Eigentlich will ich ja" und "Ich weiß nicht wie und wo" - dann ist das oft der Moment, in dem Bewusstsein und Struktur alles verändern.",
        ]
    },
]

if __name__ == "__main__":
    print("Updating Brevo templates...")
    for t in templates:
        update_template(t["id"], t["subject"], t["paragraphs"])
    print("\nDone.")
