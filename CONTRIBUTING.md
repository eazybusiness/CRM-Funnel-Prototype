# Contributing to CRM Funnel Prototype

Vielen Dank für dein Interesse an der Mitwirkung an diesem Projekt! Diese Anleitung hilft dir, schnell einzusteigen.

## 🚀 Quick Start

1. **Fork das Repository**
   ```bash
   # Klicke auf "Fork" oben auf der GitHub-Seite
   ```

2. **Klone dein Fork**
   ```bash
   git clone https://github.com/DEIN_USERNAME/crm-funnel.git
   cd crm-funnel
   ```

3. **Installiere Abhängigkeiten**
   ```bash
   npm install
   ```

4. **Setze Umgebungsvariablen**
   ```bash
   cp .env.example .env
   # Editiere .env mit deinen API-Schlüsseln
   ```

5. **Starte den Development Server**
   ```bash
   npm run dev
   ```

## 📋 Wie man mitmacht

### Bug Reports

Wenn du einen Bug findest:

1. **Suche nach existing Issues** - Stelle sicher, dass der Bug nicht bereits gemeldet wurde
2. **Erstelle ein Issue** mit:
   - Klarem Titel
   - Detaillierter Beschreibung
   - Schritten zur Reproduktion
   - Erwartetem vs. tatsächlichen Verhalten
   - Screenshots wenn möglich

### Feature Requests

Für neue Funktionen:

1. **Diskutiere zuerst** im Issue Tracker
2. **Erstelle ein Issue** mit:
   - Use Case/Begründung
   - Akzeptanzkriterien
   - Mockups wenn relevant

### Code Contributions

1. **Erstelle einen Issue** für deine geplante Änderung
2. **Erstelle einen Branch** von `main`
   ```bash
   git checkout -b feature/deine-feature-name
   ```
3. **Mache deine Änderungen**
   - Folge dem Code Style
   - Füge Tests hinzu
   - Update Dokumentation
4. **Commit deine Änderungen**
   ```bash
   git commit -m "feat: füge neue Funktion hinzu"
   ```
5. **Push und erstelle Pull Request**
   ```bash
   git push origin feature/deine-feature-name
   ```

## 🎯 Entwicklungsguidelines

### Code Style

- **JavaScript/React**: ESLint Konfiguration verwenden
- **CSS**: Tailwind CSS Klassen bevorzugen
- **Kommentare**: Wichtige Logik erklären
- **Dateibenennung**: KeBab-Case für Dateien, PascalCase für Komponenten

### Projektstruktur

```
crm-funnel/
├── pages/              # Next.js Seiten
│   ├── api/           # API Endpoints
│   ├── index.js       # Landing Page
│   ├── produkte.js    # Produkte Funnel
│   ├── kurse.js       # Kurse Funnel
│   └── business.js    # Business Funnel
├── components/         # React Komponenten
│   ├── SocialShare.js
│   ├── TrackingPixel.js
│   └── SocialCTA.js
├── styles/            # CSS/Styling
├── lib/               # Utilities
└── public/            # Statische Assets
```

### Testing

- **Unit Tests**: Jest für Komponenten
- **Integration Tests**: API Endpoints
- **E2E Tests**: Playwright für User Flows

```bash
# Tests ausführen
npm test

# E2E Tests
npm run test:e2e
```

## 🔄 Git Workflow

### Branch Names

- `feature/description` - Neue Features
- `fix/description` - Bug Fixes
- `docs/description` - Dokumentation
- `refactor/description` - Refactoring

### Commit Messages

Folge [Conventional Commits](https://www.conventionalcommits.org/):

```
type(scope): description

feat(landing): add social media integration
fix(payment): resolve stripe webhook issue
docs(readme): update installation instructions
```

### Pull Request Process

1. **Update README.md** wenn nötig
2. **Füge Tests hinzu** für neue Funktionen
3. **Stelle sicher, dass CI passt**
4. **Requeste Review** von mindestens einem Maintainer
5. **Warte auf Approval** vor Merge

## 🛠 Development Setup

### Benötigte Tools

- **Node.js** (v18 oder höher)
- **npm** oder **yarn**
- **Git**
- **VS Code** (empfohlen mit Extensions)

### VS Code Extensions

```json
{
  "recommendations": [
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss",
    "ms-vscode.vscode-eslint",
    "ms-vscode.vscode-json"
  ]
}
```

### Environment Variablen

Kopiere `.env.example` zu `.env.local` und konfiguriere:

```env
# Stripe
STRIPE_PUBLIC_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...

# Email
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Analytics
FACEBOOK_PIXEL_ID=your-pixel-id
GOOGLE_ANALYTICS_ID=GA-XXXXXXXXX
```

## 📱 Lokale Entwicklung

### Stripe Testing

1. **Stripe CLI installieren**
   ```bash
   npm install -g stripe-cli
   ```

2. **Local Webhooks starten**
   ```bash
   stripe listen --forward-to localhost:3000/api/stripe
   ```

### Email Testing

Verwende [Mailtrap](https://mailtrap.io) oder [Ethereal](https://ethereal.email) für lokale Email-Tests.

## 🚀 Deployment

### Vercel (empfohlen)

1. **Connect GitHub Repository**
2. **Configure Environment Variables**
3. **Deploy on Push to main**

### Docker

```bash
# Build
docker build -t crm-funnel .

# Run
docker run -p 3000:3000 crm-funnel
```

## 🤝 Community

- **Discord**: [Link zum Discord Server]
- **Discussions**: GitHub Discussions
- **Issues**: GitHub Issues

## 📄 Lizenz

Mit der Contribution stimmst du zu, dass deine Beiträge unter der gleichen MIT Lizenz wie das Projekt veröffentlicht werden.

## 🙏 Danksagungen

- Alle Contributors
- Die Open Source Community
- Nutzer, die Feedback geben

---

**Hast du Fragen?** Zögere nicht, ein Issue zu erstellen oder im Discord zu fragen!
