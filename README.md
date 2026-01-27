# CRM Funnel - Einfach bewusster leben

Complete automated CRM funnel system with course sales, member area, and email automation for "Einfach bewusster leben".

## 🚀 Current Features

### ✅ Fully Implemented
- **User Authentication**: Registration, login, password reset
- **Course System**: Course display, checkout, enrollment
- **Member Area**: Protected dashboard with course access
- **Payment Processing**: PayPal integration (sandbox ready)
- **Database**: PostgreSQL with user and course management
- **Responsive Design**: Mobile-first modern UI

### 🔄 In Progress
- **Email Automation**: Brevo integration setup needed
- **Course Management**: Admin interface for content
- **Analytics**: Google Analytics 4 integration

## 📋 System Overview

### Customer Journey
1. **Homepage** → Course overview
2. **Course Page** → Detailed information
3. **Checkout** → PayPal payment
4. **Success** → Course access granted
5. **Member Dashboard** → Course access & progress

### Pages Structure
```
/                    - Homepage with course section
/register           - User registration
/login              - User login
/forgot-password    - Password reset
/checkout           - Course checkout with PayPal
/member/dashboard   - Protected member area
/payment/success    - Payment confirmation
/payment/cancel     - Payment cancellation
/auth/error         - Authentication errors
```

## 🛠 Tech Stack

- **Frontend**: Next.js 14, React 18, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL (Neon on Vercel)
- **Authentication**: NextAuth.js
- **Payments**: PayPal REST API
- **Email**: Brevo (ready for setup)
- **Deployment**: Vercel

## 📁 Project Structure

```
crm-funnel/
├── pages/              # Next.js pages
│   ├── api/           # API routes
│   ├── auth/          # Authentication pages
│   ├── member/        # Protected member area
│   └── payment/       # Payment pages
├── lib/               # Utilities (auth, db)
├── styles/            # CSS & Tailwind
├── public/            # Static assets
├── docs/              # Documentation
├── scripts/           # Database scripts
└── middleware.js      # Route protection
```

## 🚀 Quick Start

### 1. Install dependencies
```bash
npm install
```

### 2. Set up environment variables
```bash
cp .env.example .env.local
# Edit .env.local with your API keys
```

### 3. Database setup
See: `/docs/VERCEL_DATABASE_SETUP.md`

### 4. Run development server
```bash
npm run dev
```

### 5. Open browser
Navigate to `http://localhost:3000`

## ⚙️ Environment Variables

```env
# Database (Neon)
POSTGRES_URL=postgres://user:pass@host/db
POSTGRES_PRISMA_URL=postgres://user:pass@host/db?pgbouncer=true
POSTGRES_URL_NON_POOLING=postgres://user:pass@host/db

# PayPal
PAYPAL_CLIENT_ID=your-paypal-client-id
PAYPAL_CLIENT_SECRET=your-paypal-client-secret
PAYPAL_API_URL=https://api-m.sandbox.paypal.com
PAYPAL_WEBHOOK_ID=your-webhook-id

# Email (Brevo)
BREVO_API_KEY=your-brevo-api-key
EMAIL_FROM="Dein Name" <noreply@yourdomain.com>

# NextAuth
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=https://yourdomain.com
```

## 📊 Current Status

### ✅ Working Features
- User registration and login
- Course purchase with PayPal
- Member dashboard
- Database operations
- Responsive design

### 🔄 Setup Required
- Brevo email configuration
- PayPal live credentials
- Google Analytics (optional)

## 📚 Documentation

- `/docs/PAYPAL_SETUP_GUIDE.md` - PayPal configuration
- `/docs/BREVO_AUTOMATION_GUIDE.md` - Email setup
- `/docs/VERCEL_DATABASE_SETUP.md` - Database setup
- `/docs/MILESTONE1_CHECKLIST.md` - Project milestones
- `/task.md` - Current task log

## 🧪 Testing

### Test Accounts
1. **Registration**: Create test account at `/register`
2. **Login**: Use credentials at `/login`
3. **Purchase**: Test course flow with PayPal sandbox
4. **Member Area**: Access dashboard after purchase

### PayPal Sandbox
- Use PayPal developer sandbox for testing
- See `/docs/PAYPAL_SETUP_GUIDE.md` for details

## 🚀 Deployment

### Vercel (Recommended)
1. Connect repository to Vercel
2. Add environment variables
3. Deploy automatically

### Manual
```bash
npm run build
npm start
```

## 📋 Next Steps

1. Configure Brevo for emails
2. Add real course content
3. Set up PayPal live mode
4. Implement course management
5. Add analytics tracking

## 🆘 Troubleshooting

See documentation in `/docs/` folder:
- Database issues: `VERCEL_DATABASE_SETUP.md`
- Registration problems: `REGISTRATION_FIX.md`
- PayPal issues: `PAYPAL_SETUP_GUIDE.md`

---

**Last updated**: 2026-01-27
**Version**: 1.0.0-beta
