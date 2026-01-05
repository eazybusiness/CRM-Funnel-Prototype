# Technical Architecture - CRM Funnel (Optimized)

## System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        Social Media Traffic                      │
│              (Instagram, Facebook, WhatsApp + UTM)              │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                     Next.js Frontend (Vercel)                    │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐         │
│  │ Landingpage  │  │   Funnel     │  │   Checkout   │         │
│  │  (3 Options) │→ │   Pages      │→ │   (PayPal)   │         │
│  └──────────────┘  └──────────────┘  └──────────────┘         │
└────────────┬────────────────┬────────────────┬─────────────────┘
             │                │                │
             ▼                ▼                ▼
┌────────────────────┐ ┌──────────────┐ ┌──────────────────┐
│  Vercel Postgres   │ │  MailerLite  │ │  PayPal API      │
│  ┌──────────────┐  │ │  ┌────────┐  │ │  ┌────────────┐  │
│  │    leads     │  │ │  │ Groups │  │ │  │  Payments  │  │
│  │  purchases   │  │ │  │ Emails │  │ │  │  Webhooks  │  │
│  │funnel_events │  │ │  │Workflow│  │ │  └────────────┘  │
│  └──────────────┘  │ │  └────────┘  │ └──────────────────┘
└────────────────────┘ └──────────────┘
```

---

## Technology Stack

### Frontend
- **Framework:** Next.js 13+ (React)
- **Styling:** TailwindCSS + Custom Components
- **Animations:** Framer Motion
- **Icons:** Lucide React

### Backend
- **Runtime:** Node.js (Vercel Serverless Functions)
- **API:** Next.js API Routes
- **Database:** Vercel Postgres (PostgreSQL)
- **ORM:** `@vercel/postgres` (SQL queries)

### Third-Party Services
- **Email:** MailerLite REST API
- **Payments:** PayPal Smart Payment Buttons
- **Hosting:** Vercel (Edge Network)

---

## Database Schema

### Table: `leads`
```sql
CREATE TABLE leads (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  phone VARCHAR(50),
  interest VARCHAR(50) NOT NULL, -- 'product', 'course', 'business'
  source VARCHAR(100), -- UTM source (instagram, facebook, whatsapp)
  utm_campaign VARCHAR(100),
  utm_medium VARCHAR(100),
  utm_content VARCHAR(100),
  mailerlite_id VARCHAR(100), -- MailerLite Subscriber ID
  opted_in BOOLEAN DEFAULT false,
  opt_in_date TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_leads_email ON leads(email);
CREATE INDEX idx_leads_interest ON leads(interest);
CREATE INDEX idx_leads_source ON leads(source);
```

### Table: `purchases`
```sql
CREATE TABLE purchases (
  id SERIAL PRIMARY KEY,
  lead_id INTEGER REFERENCES leads(id) ON DELETE CASCADE,
  paypal_order_id VARCHAR(255) UNIQUE NOT NULL,
  paypal_payer_id VARCHAR(255),
  product_name VARCHAR(255) NOT NULL,
  product_type VARCHAR(50), -- 'product', 'course', 'business_package'
  amount DECIMAL(10,2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'EUR',
  status VARCHAR(50) NOT NULL, -- 'pending', 'completed', 'failed', 'refunded'
  payment_method VARCHAR(50), -- 'paypal', 'credit_card', 'debit_card'
  created_at TIMESTAMP DEFAULT NOW(),
  completed_at TIMESTAMP
);

CREATE INDEX idx_purchases_lead_id ON purchases(lead_id);
CREATE INDEX idx_purchases_status ON purchases(status);
CREATE INDEX idx_purchases_paypal_order_id ON purchases(paypal_order_id);
```

### Table: `funnel_events`
```sql
CREATE TABLE funnel_events (
  id SERIAL PRIMARY KEY,
  lead_id INTEGER REFERENCES leads(id) ON DELETE SET NULL,
  session_id VARCHAR(100), -- For tracking before lead creation
  event_type VARCHAR(100) NOT NULL, -- 'page_view', 'form_submit', 'checkout_start', 'purchase', 'email_open', 'email_click'
  page_url VARCHAR(500),
  referrer VARCHAR(500),
  user_agent TEXT,
  ip_address VARCHAR(45),
  metadata JSONB, -- Additional event data
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_funnel_events_lead_id ON funnel_events(lead_id);
CREATE INDEX idx_funnel_events_type ON funnel_events(event_type);
CREATE INDEX idx_funnel_events_session_id ON funnel_events(session_id);
CREATE INDEX idx_funnel_events_created_at ON funnel_events(created_at);
```

---

## API Routes

### Lead Management

#### `POST /api/leads/create`
**Purpose:** Create new lead and sync to MailerLite

**Request Body:**
```json
{
  "name": "Max Mustermann",
  "email": "max@example.com",
  "phone": "+49123456789",
  "interest": "course",
  "source": "instagram",
  "utm_campaign": "summer_promo",
  "consent": true
}
```

**Response:**
```json
{
  "success": true,
  "lead": {
    "id": 123,
    "email": "max@example.com",
    "mailerlite_id": "ml_abc123"
  }
}
```

**Flow:**
1. Validate input + consent checkbox
2. Insert into `leads` table
3. Call MailerLite API to add subscriber
4. Assign to appropriate MailerLite group
5. Return lead data

---

#### `GET /api/leads/[id]`
**Purpose:** Retrieve lead details (for internal use)

**Response:**
```json
{
  "id": 123,
  "email": "max@example.com",
  "name": "Max Mustermann",
  "interest": "course",
  "opted_in": true,
  "created_at": "2024-01-05T12:00:00Z"
}
```

---

### MailerLite Integration

#### `POST /api/mailerlite/subscribe`
**Purpose:** Add subscriber to MailerLite

**Internal Function:**
```javascript
async function subscribeToMailerLite(lead) {
  const response = await fetch('https://api.mailerlite.com/api/v2/subscribers', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-MailerLite-ApiKey': process.env.MAILERLITE_API_KEY
    },
    body: JSON.stringify({
      email: lead.email,
      name: lead.name,
      fields: {
        phone: lead.phone,
        interest: lead.interest,
        source: lead.source
      },
      groups: [getGroupIdByInterest(lead.interest)],
      resubscribe: false,
      type: 'active' // Skip double opt-in if already confirmed
    })
  });
  
  return response.json();
}
```

**MailerLite Groups:**
- `group_products` → Produktinteresse
- `group_courses` → Kursinteresse
- `group_business` → Business-Interesse
- `group_customers` → Käufer (nach Purchase)

---

#### `POST /api/mailerlite/tag-customer`
**Purpose:** Add "Customer" tag after purchase

**Request Body:**
```json
{
  "email": "max@example.com",
  "purchase_id": 456,
  "product_name": "Kurs: Minimalismus Basics"
}
```

**Flow:**
1. Find subscriber in MailerLite by email
2. Add to `group_customers`
3. Add custom field: `last_purchase_date`
4. Trigger purchase email workflow

---

### Payment Processing

#### `POST /api/payment/create-order`
**Purpose:** Create PayPal order

**Request Body:**
```json
{
  "product_name": "Kurs: Minimalismus Basics",
  "product_type": "course",
  "amount": 49.00,
  "currency": "EUR",
  "lead_id": 123
}
```

**Response:**
```json
{
  "order_id": "paypal_order_xyz789",
  "approval_url": "https://www.paypal.com/checkoutnow?token=xyz789"
}
```

---

#### `POST /api/payment/capture-order`
**Purpose:** Capture PayPal payment after approval

**Request Body:**
```json
{
  "order_id": "paypal_order_xyz789",
  "lead_id": 123
}
```

**Flow:**
1. Capture payment via PayPal API
2. Insert into `purchases` table (status: 'completed')
3. Call `/api/mailerlite/tag-customer`
4. Track event in `funnel_events`
5. Return success

---

#### `POST /api/payment/webhook`
**Purpose:** Handle PayPal webhooks (IPN)

**Events:**
- `PAYMENT.CAPTURE.COMPLETED` → Update purchase status
- `PAYMENT.CAPTURE.DENIED` → Mark as failed
- `PAYMENT.CAPTURE.REFUNDED` → Update status to refunded

---

### Tracking

#### `POST /api/tracking/event`
**Purpose:** Track funnel events

**Request Body:**
```json
{
  "event_type": "page_view",
  "page_url": "/kurse",
  "lead_id": 123,
  "session_id": "sess_abc123",
  "metadata": {
    "utm_source": "instagram",
    "device": "mobile"
  }
}
```

**Usage:**
- Track user journey through funnel
- Analyze conversion rates
- Identify drop-off points

---

## Environment Variables

```bash
# Database
POSTGRES_URL="postgres://user:pass@host/db"
POSTGRES_PRISMA_URL="postgres://user:pass@host/db?pgbouncer=true"
POSTGRES_URL_NON_POOLING="postgres://user:pass@host/db"

# MailerLite
MAILERLITE_API_KEY="your_mailerlite_api_key"
MAILERLITE_GROUP_PRODUCTS="12345"
MAILERLITE_GROUP_COURSES="12346"
MAILERLITE_GROUP_BUSINESS="12347"
MAILERLITE_GROUP_CUSTOMERS="12348"

# PayPal
PAYPAL_CLIENT_ID="your_paypal_client_id"
PAYPAL_CLIENT_SECRET="your_paypal_client_secret"
PAYPAL_MODE="sandbox" # or "live"

# App
NEXT_PUBLIC_APP_URL="https://your-domain.vercel.app"
NODE_ENV="production"
```

---

## Data Flow Diagrams

### 1. Lead Capture Flow

```
User fills form
      ↓
Consent checkbox checked?
      ↓ YES
POST /api/leads/create
      ↓
Insert into Vercel DB (leads table)
      ↓
POST to MailerLite API
      ↓
Assign to Group (based on interest)
      ↓
MailerLite triggers Welcome Email (Mail 1)
      ↓
Redirect to /success page
```

### 2. Purchase Flow

```
User clicks "Kaufen"
      ↓
POST /api/payment/create-order
      ↓
PayPal Order created
      ↓
Redirect to PayPal Checkout
      ↓
User completes payment
      ↓
PayPal redirects to /payment/success?order_id=xyz
      ↓
POST /api/payment/capture-order
      ↓
Insert into purchases table
      ↓
POST /api/mailerlite/tag-customer
      ↓
MailerLite adds "Customer" tag
      ↓
MailerLite triggers Purchase Email (Mail 1)
      ↓
Display success message + order details
```

### 3. Email Automation Flow (MailerLite)

```
New Subscriber added to Group
      ↓
MailerLite Workflow triggered
      ↓
Mail 1: Welcome (immediately)
      ↓
Wait 2 days
      ↓
Mail 2: Product Benefits
      ↓
Wait 2 days
      ↓
Mail 3: Business Opportunity
      ↓
Wait 3 days
      ↓
Mail 4: Course Offer
      ↓
... (continues based on configuration)
```

---

## Security Considerations

### 1. Data Protection
- **Encryption:** All data in transit (HTTPS/TLS)
- **Database:** Vercel Postgres with encrypted connections
- **API Keys:** Stored in environment variables (never in code)

### 2. DSGVO Compliance
- **Consent:** Required checkbox before data collection
- **Double Opt-In:** Handled by MailerLite
- **Data Deletion:** User can request via email (manual process)
- **Data Export:** MailerLite provides export functionality

### 3. Payment Security
- **PCI Compliance:** Not required (PayPal handles card data)
- **Webhook Verification:** Verify PayPal webhook signatures
- **No Card Storage:** All payment data stays with PayPal

### 4. API Security
- **Rate Limiting:** Vercel automatic rate limiting
- **Input Validation:** Zod schemas for all API inputs
- **SQL Injection:** Parameterized queries only
- **CORS:** Restricted to own domain

---

## Performance Optimization

### 1. Frontend
- **Static Generation:** Landing pages pre-rendered
- **Image Optimization:** Next.js Image component
- **Code Splitting:** Automatic route-based splitting
- **CDN:** Vercel Edge Network (global)

### 2. Backend
- **Database Pooling:** Vercel Postgres connection pooling
- **API Caching:** Cache MailerLite group IDs
- **Serverless:** Auto-scaling with Vercel Functions

### 3. Monitoring
- **Vercel Analytics:** Page views, performance metrics
- **Error Tracking:** Console logs in Vercel dashboard
- **Database Monitoring:** Vercel Postgres dashboard

---

## Deployment Strategy

### 1. Development
```bash
# Local development
npm run dev

# Database migrations
npm run db:migrate

# Test MailerLite integration
npm run test:mailerlite
```

### 2. Staging (Vercel Preview)
- Automatic deployment on PR
- Preview URL for testing
- Uses staging environment variables

### 3. Production (Vercel)
```bash
# Deploy to production
git push origin main

# Vercel auto-deploys
# - Runs build
# - Applies migrations
# - Updates environment
```

### 4. Rollback
- Instant rollback via Vercel dashboard
- Previous deployments preserved
- Zero-downtime deployments

---

## Maintenance & Monitoring

### Daily
- Check Vercel deployment status
- Monitor error logs

### Weekly
- Review MailerLite email performance
- Check PayPal transaction logs
- Analyze funnel conversion rates

### Monthly
- Database cleanup (old funnel_events)
- Review and optimize email sequences
- Update product prices if needed

---

## Scalability

### Current Limits (Free Tier)
- **Vercel:** 100 GB bandwidth/month
- **Vercel Postgres:** 256 MB storage
- **MailerLite:** 1,000 subscribers

### Scaling Path
1. **0-1,000 leads:** Free tier sufficient
2. **1,000-10,000 leads:** 
   - Upgrade MailerLite ($10/month)
   - Vercel stays free
3. **10,000+ leads:**
   - Upgrade Vercel Postgres ($20/month)
   - Consider dedicated email service

---

## Backup & Recovery

### Database Backups
- **Automatic:** Vercel Postgres daily backups (7 days retention)
- **Manual:** Export via Vercel dashboard
- **Recovery:** Point-in-time restore available

### Code Backups
- **Git Repository:** GitHub (primary)
- **Vercel:** Deployment history (all versions)

### Email Templates
- **MailerLite:** Built-in version history
- **Export:** Manual export of templates recommended

---

## Future Enhancements (Out of Scope)

### Phase 2 (Optional)
- Admin dashboard for lead management
- Advanced analytics (conversion funnels)
- A/B testing for landing pages
- SMS notifications (Twilio)

### Phase 3 (Optional)
- Member area with authentication
- Course hosting platform integration
- Affiliate program tracking
- Multi-language support

---

## Support & Documentation

### For Developer
- This document (Technical Architecture)
- `PROJECT_SCOPE_OPTIMIZED.md` (Business requirements)
- `README.md` (Setup instructions)

### For Client
- MailerLite documentation (email editing)
- PayPal Business dashboard guide
- Social media link setup guide
- FAQ document (common issues)

---

## Contacts & Resources

### APIs
- **MailerLite API Docs:** https://developers.mailerlite.com/
- **PayPal API Docs:** https://developer.paypal.com/
- **Vercel Postgres Docs:** https://vercel.com/docs/storage/vercel-postgres

### Support
- **Vercel Support:** support@vercel.com
- **MailerLite Support:** support@mailerlite.com
- **PayPal Support:** https://www.paypal.com/businesshelp
