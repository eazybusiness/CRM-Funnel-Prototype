# CRM Funnel Prototype

Complete automated CRM funnel system with social media integration and email sequences for lead generation and conversion.

## 🚀 Features

- **Multi-Platform Integration**: Instagram, Facebook, WhatsApp click-to-action with tracking
- **Automated Funnel**: Step-by-step customer journey from social media to purchase
- **Email Automation**: 4+ email sequence triggered by CRM
- **Payment Processing**: Integrated Stripe payment system
- **Responsive Design**: Mobile-first modern UI with Tailwind CSS
- **CRM Integration**: Full contact tracking and follow-up automation

## 📋 Funnel Structure

### Landing Page
- Clear selection area with three main pathways:
  - 📦 Product Information
  - 🎓 Courses & Workshops  
  - 💼 Business Opportunities

### Pathway Pages
Each pathway includes:
- Information pages with navigation
- Lead capture forms
- Payment processing
- Automated CRM triggers

### Email Sequence
1. **Mail 1** - Welcome & First Information
2. **Mail 2** - Product Benefits
3. **Mail 3** - Business Opportunity
4. **Additional Mails** - Course Offers & Upsells

## 🛠 Tech Stack

- **Frontend**: Next.js 14, React 18, Tailwind CSS
- **Backend**: Express.js, Node.js
- **Payments**: Stripe
- **Email**: Nodemailer
- **Animations**: Framer Motion
- **Icons**: Lucide React

## 📁 Project Structure

```
crm-funnel/
├── pages/              # Next.js pages
├── components/         # React components
├── styles/            # CSS & Tailwind
├── lib/               # Utilities & configurations
├── api/               # API routes
├── public/            # Static assets
└── docs/              # Documentation
```

## 🚀 Quick Start

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your API keys
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Open browser**
   Navigate to `http://localhost:3000`

## ⚙️ Configuration

### Environment Variables
Create `.env.local` file with:

```env
# Stripe
STRIPE_PUBLIC_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...

# Email
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Database (optional)
DATABASE_URL=sqlite:./crm.db
```

### Social Media Setup
1. **Instagram**: Add link in bio pointing to your funnel
2. **Facebook**: Set up CTA buttons with tracking parameters
3. **WhatsApp**: Create click-to-chat links with UTM tracking

## 📊 Tracking & Analytics

- UTM parameters for all social media traffic
- Conversion tracking at each funnel step
- Email open and click tracking
- Payment completion analytics

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Commit your changes
4. Push to branch
5. Open Pull Request

## 📄 License

MIT License - see LICENSE file for details

## 🆘 Support

For issues and questions:
- Create GitHub Issue
- Email: support@yourdomain.com

---

**Built with ❤️ for automated marketing success**
