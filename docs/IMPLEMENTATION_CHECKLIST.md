# Implementation Checklist - CRM Funnel Migration

## Pre-Implementation Setup

### 1. Third-Party Accounts Setup
- [ ] **MailerLite Account**
  - [ ] Create free account at https://www.mailerlite.com/
  - [ ] Verify email address
  - [ ] Generate API key (Settings → Integrations → API)
  - [ ] Note down API key in password manager
  
- [ ] **PayPal Business Account**
  - [ ] Create PayPal Business account
  - [ ] Complete business verification
  - [ ] Enable PayPal Checkout
  - [ ] Get Client ID and Secret (Developer Dashboard)
  - [ ] Set up Sandbox for testing

- [ ] **Vercel Account**
  - [ ] Connect GitHub repository
  - [ ] Enable Vercel Postgres addon (free tier)
  - [ ] Note down database connection strings

---

## Phase 1: Database Setup (2 hours)

### 1.1 Vercel Postgres Setup
- [ ] Navigate to Vercel project dashboard
- [ ] Go to Storage tab
- [ ] Click "Create Database" → Select "Postgres"
- [ ] Copy connection strings to `.env.local`

### 1.2 Create Database Tables
- [ ] Create migration file: `scripts/db-setup.sql`
- [ ] Add `leads` table schema
- [ ] Add `purchases` table schema
- [ ] Add `funnel_events` table schema
- [ ] Run migration via Vercel dashboard SQL editor

**SQL Script:**
```bash
# Create file
touch scripts/db-setup.sql

# Run via Vercel dashboard or CLI
vercel env pull .env.local
npm run db:migrate
```

### 1.3 Test Database Connection
- [ ] Create test API route: `/api/test/db-connection`
- [ ] Test INSERT query
- [ ] Test SELECT query
- [ ] Verify data in Vercel dashboard

**Files to create:**
- `scripts/db-setup.sql`
- `pages/api/test/db-connection.js`

---

## Phase 2: MailerLite Integration (3 hours)

### 2.1 MailerLite Configuration
- [ ] Create 4 groups in MailerLite dashboard:
  - [ ] "Produktinteresse"
  - [ ] "Kursinteresse"
  - [ ] "Business-Interesse"
  - [ ] "Customers"
- [ ] Note down Group IDs for each
- [ ] Add Group IDs to `.env.local`

### 2.2 Email Sequences Setup (in MailerLite UI)
- [ ] **Workflow 1: Welcome Sequence (Freebie)**
  - [ ] Mail 1: Welcome + Freebie Download (immediate)
  - [ ] Mail 2: Product Benefits (2 days delay)
  - [ ] Mail 3: Business Opportunity (4 days delay)
  - [ ] Mail 4: Course Offer (7 days delay)
  - [ ] Set trigger: "Subscriber joins group"
  
- [ ] **Workflow 2: Purchase Sequence**
  - [ ] Mail 1: Purchase Confirmation (immediate)
  - [ ] Mail 2: Onboarding Tips (1 day delay)
  - [ ] Mail 3: Upsell Offer (7 days delay)
  - [ ] Set trigger: "Subscriber added to Customers group"

### 2.3 API Integration
- [ ] Create utility: `lib/mailerlite.js`
- [ ] Implement `subscribeToMailerLite(lead)`
- [ ] Implement `addToGroup(email, groupId)`
- [ ] Implement `tagAsCustomer(email, purchaseData)`

### 2.4 API Routes
- [ ] Create `/api/mailerlite/subscribe`
- [ ] Create `/api/mailerlite/tag-customer`
- [ ] Test with Postman/Thunder Client

**Files to create:**
- `lib/mailerlite.js`
- `pages/api/mailerlite/subscribe.js`
- `pages/api/mailerlite/tag-customer.js`

---

## Phase 3: Database Migration (localStorage → Vercel DB) (2 hours)

### 3.1 Create New API Routes
- [ ] **Lead Management:**
  - [ ] `POST /api/leads/create` (replaces localStorage write)
  - [ ] `GET /api/leads/[id]` (for internal use)
  
- [ ] **Event Tracking:**
  - [ ] `POST /api/tracking/event` (replaces localStorage events)

### 3.2 Update Frontend Components
- [ ] **File: `pages/freebie.js`**
  - [ ] Remove `localStorage.setItem('crm_funnel_demo_leads')`
  - [ ] Replace with `fetch('/api/leads/create')`
  - [ ] Add error handling
  
- [ ] **File: `pages/produkte.js`**
  - [ ] Remove `writeDemoLead()` function
  - [ ] Replace with API call to `/api/leads/create`
  
- [ ] **File: `pages/kurse.js`**
  - [ ] Remove `writeDemoLead()` function
  - [ ] Replace with API call to `/api/leads/create`
  
- [ ] **File: `pages/business.js`**
  - [ ] Remove `writeDemoLead()` function
  - [ ] Replace with API call to `/api/leads/create`
  
- [ ] **File: `pages/checkout.js`**
  - [ ] Remove `writeDemoEvent()` function
  - [ ] Replace with API call to `/api/tracking/event`

### 3.3 Update Demo CRM Page
- [ ] **File: `pages/demo/crm.js`**
  - [ ] Remove localStorage reads
  - [ ] Add API call to `/api/leads/list`
  - [ ] Add API call to `/api/tracking/events`
  - [ ] Keep as demo/testing page (optional)

**Files to modify:**
- `pages/freebie.js`
- `pages/produkte.js`
- `pages/kurse.js`
- `pages/business.js`
- `pages/checkout.js`
- `pages/demo/crm.js`

**Files to create:**
- `pages/api/leads/create.js`
- `pages/api/leads/[id].js`
- `pages/api/leads/list.js`
- `pages/api/tracking/event.js`
- `pages/api/tracking/events.js`

---

## Phase 4: PayPal Integration (2 hours)

### 4.1 Remove Stripe Code
- [ ] Delete `pages/api/stripe.js`
- [ ] Delete `pages/api/payment/create-stripe-session.js`
- [ ] Remove Stripe from `package.json`
- [ ] Remove Stripe environment variables

### 4.2 PayPal Smart Buttons Setup
- [ ] Update `pages/payment/checkout.js`
- [ ] Add PayPal SDK script tag
- [ ] Implement PayPal Buttons component
- [ ] Handle `createOrder` callback
- [ ] Handle `onApprove` callback
- [ ] Handle `onError` callback

### 4.3 PayPal API Routes
- [ ] Update `/api/payment/create-paypal-order.js`
  - [ ] Use PayPal REST API
  - [ ] Store order in database (status: 'pending')
  
- [ ] Update `/api/payment/capture-paypal-order.js`
  - [ ] Capture payment
  - [ ] Update database (status: 'completed')
  - [ ] Call `/api/mailerlite/tag-customer`
  - [ ] Track purchase event

- [ ] Create `/api/payment/paypal-webhook.js`
  - [ ] Verify webhook signature
  - [ ] Handle `PAYMENT.CAPTURE.COMPLETED`
  - [ ] Handle `PAYMENT.CAPTURE.DENIED`
  - [ ] Handle `PAYMENT.CAPTURE.REFUNDED`

### 4.4 Test PayPal Integration
- [ ] Test with PayPal Sandbox
- [ ] Test successful payment flow
- [ ] Test failed payment
- [ ] Verify database entries
- [ ] Verify MailerLite tag added

**Files to delete:**
- `pages/api/stripe.js`
- `pages/api/payment/create-stripe-session.js`

**Files to modify:**
- `pages/payment/checkout.js`
- `pages/api/payment/create-paypal-order.js`
- `pages/api/payment/capture-paypal-order.js`

**Files to create:**
- `pages/api/payment/paypal-webhook.js`

---

## Phase 5: DSGVO Compliance (1 hour)

### 5.1 Update Forms with Consent Checkbox
- [ ] **File: `pages/freebie.js`**
  - [ ] Add consent checkbox
  - [ ] Link to `/datenschutz`
  - [ ] Disable submit if not checked
  - [ ] Store consent in database
  
- [ ] **File: `pages/produkte.js`**
  - [ ] Add consent checkbox to form
  
- [ ] **File: `pages/kurse.js`**
  - [ ] Add consent checkbox to form
  
- [ ] **File: `pages/business.js`**
  - [ ] Add consent checkbox to form

### 5.2 Update Privacy Policy
- [ ] **File: `pages/datenschutz.js`**
  - [ ] Add section about MailerLite
  - [ ] Add section about Vercel Postgres
  - [ ] Add section about PayPal
  - [ ] Add data retention policy
  - [ ] Add user rights (access, deletion, export)
  - [ ] Add contact email for DSGVO requests

### 5.3 Double Opt-In Configuration
- [ ] Verify MailerLite double opt-in is enabled
- [ ] Test confirmation email flow
- [ ] Customize confirmation email template (optional)

### 5.4 Remove Unnecessary Tracking
- [ ] Verify no third-party tracking scripts
- [ ] Remove Google Analytics (if present)
- [ ] Remove Facebook Pixel (if present)
- [ ] Keep only essential functionality

**Files to modify:**
- `pages/freebie.js`
- `pages/produkte.js`
- `pages/kurse.js`
- `pages/business.js`
- `pages/datenschutz.js`

---

## Phase 6: Testing & Quality Assurance (2 hours)

### 6.1 End-to-End Testing

**Test Case 1: Freebie Download Flow**
- [ ] Visit landing page with UTM parameters
- [ ] Click "Produktinformationen"
- [ ] Fill out form with test email
- [ ] Check consent checkbox
- [ ] Submit form
- [ ] Verify success page displayed
- [ ] Check database: Lead created
- [ ] Check MailerLite: Subscriber added to correct group
- [ ] Check email: Welcome email received

**Test Case 2: Purchase Flow**
- [ ] Navigate to `/kurse`
- [ ] Select a course
- [ ] Click "Jetzt kaufen"
- [ ] Redirected to PayPal checkout
- [ ] Complete payment (Sandbox)
- [ ] Redirected to success page
- [ ] Check database: Purchase recorded
- [ ] Check MailerLite: "Customer" tag added
- [ ] Check email: Purchase confirmation received

**Test Case 3: Email Automation**
- [ ] Create test subscriber in MailerLite
- [ ] Verify Mail 1 sent immediately
- [ ] Wait 2 days (or manually trigger)
- [ ] Verify Mail 2 sent
- [ ] Verify all emails in sequence

### 6.2 Error Handling Tests
- [ ] Test form submission without consent
- [ ] Test duplicate email submission
- [ ] Test invalid email format
- [ ] Test PayPal payment failure
- [ ] Test MailerLite API failure (disconnect internet)
- [ ] Verify error messages displayed

### 6.3 Mobile Testing
- [ ] Test on mobile device (iOS)
- [ ] Test on mobile device (Android)
- [ ] Verify responsive design
- [ ] Test PayPal mobile checkout

### 6.4 Performance Testing
- [ ] Run Lighthouse audit
- [ ] Check page load times
- [ ] Verify images optimized
- [ ] Check API response times

---

## Phase 7: Deployment (1 hour)

### 7.1 Environment Variables
- [ ] Add all variables to Vercel dashboard:
  - [ ] `POSTGRES_URL`
  - [ ] `MAILERLITE_API_KEY`
  - [ ] `MAILERLITE_GROUP_PRODUCTS`
  - [ ] `MAILERLITE_GROUP_COURSES`
  - [ ] `MAILERLITE_GROUP_BUSINESS`
  - [ ] `MAILERLITE_GROUP_CUSTOMERS`
  - [ ] `PAYPAL_CLIENT_ID`
  - [ ] `PAYPAL_CLIENT_SECRET`
  - [ ] `PAYPAL_MODE` (set to "live")
  - [ ] `NEXT_PUBLIC_APP_URL`

### 7.2 Domain Setup
- [ ] Add custom domain in Vercel
- [ ] Update DNS records
- [ ] Verify SSL certificate

### 7.3 PayPal Webhook Configuration
- [ ] Go to PayPal Developer Dashboard
- [ ] Add webhook URL: `https://yourdomain.com/api/payment/paypal-webhook`
- [ ] Subscribe to events:
  - [ ] `PAYMENT.CAPTURE.COMPLETED`
  - [ ] `PAYMENT.CAPTURE.DENIED`
  - [ ] `PAYMENT.CAPTURE.REFUNDED`

### 7.4 Final Deployment
- [ ] Commit all changes to `main` branch
- [ ] Push to GitHub
- [ ] Verify Vercel auto-deployment
- [ ] Check deployment logs for errors
- [ ] Test production site

---

## Phase 8: Documentation & Handover (1 hour)

### 8.1 Client Documentation
- [ ] Create `docs/CLIENT_GUIDE.md`
  - [ ] How to access MailerLite dashboard
  - [ ] How to edit email templates
  - [ ] How to view contacts and statistics
  - [ ] How to access PayPal dashboard
  - [ ] How to view transactions
  - [ ] Social media link setup guide
  - [ ] FAQ section

### 8.2 Social Media Links
- [ ] Generate UTM links for Instagram
  - [ ] Example: `https://yourdomain.com?utm_source=instagram&utm_medium=bio&utm_campaign=launch`
- [ ] Generate UTM links for Facebook
- [ ] Generate UTM links for WhatsApp
- [ ] Create shortened links (bit.ly or similar)
- [ ] Document in client guide

### 8.3 Training Session
- [ ] Schedule 1-hour video call with client
- [ ] Screen share MailerLite dashboard walkthrough
- [ ] Show how to edit email content
- [ ] Show how to view contacts
- [ ] Show PayPal dashboard
- [ ] Answer questions
- [ ] Record session for reference

### 8.4 Final Deliverables
- [ ] Send client guide document
- [ ] Send social media links
- [ ] Send MailerLite login credentials
- [ ] Send PayPal business account details
- [ ] Send Vercel project access (if requested)
- [ ] Send recording of training session

---

## Post-Launch Checklist

### Week 1
- [ ] Monitor error logs daily
- [ ] Check email delivery rates
- [ ] Verify PayPal transactions
- [ ] Quick response to client questions

### Week 2
- [ ] Review analytics (if implemented)
- [ ] Check conversion rates
- [ ] Optimize email subject lines (if needed)
- [ ] Address any bugs

### Month 1
- [ ] Review overall performance
- [ ] Gather client feedback
- [ ] Suggest optimizations
- [ ] Close project officially

---

## Rollback Plan (If Issues Arise)

### Emergency Rollback
- [ ] Vercel dashboard → Deployments
- [ ] Find last working deployment
- [ ] Click "Promote to Production"
- [ ] Notify client of temporary rollback

### Database Rollback
- [ ] Vercel Postgres dashboard
- [ ] Restore from backup (7-day retention)
- [ ] Re-run migrations if needed

---

## Time Estimate Summary

| Phase | Estimated Time |
|-------|----------------|
| Pre-Implementation Setup | 1 hour |
| Phase 1: Database Setup | 2 hours |
| Phase 2: MailerLite Integration | 3 hours |
| Phase 3: Database Migration | 2 hours |
| Phase 4: PayPal Integration | 2 hours |
| Phase 5: DSGVO Compliance | 1 hour |
| Phase 6: Testing & QA | 2 hours |
| Phase 7: Deployment | 1 hour |
| Phase 8: Documentation & Handover | 1 hour |
| **Total** | **15 hours** |

**Budget Check:** 15 hours × 33€/hour = **495€** ✅ (within 500€ budget)

---

## Notes & Tips

### Development Tips
- Work in feature branches, merge to `main` when tested
- Test each phase before moving to next
- Keep `.env.local` backed up securely
- Use Postman collections for API testing

### Common Issues
- **MailerLite API rate limits:** Max 120 requests/minute
- **Vercel function timeout:** Max 10 seconds (hobby plan)
- **PayPal Sandbox:** Use test credentials, not real money

### Useful Commands
```bash
# Pull environment variables from Vercel
vercel env pull .env.local

# Run database migrations
npm run db:migrate

# Test API routes locally
npm run dev

# Deploy to Vercel
git push origin main
```

---

## Sign-Off

- [ ] All phases completed
- [ ] All tests passed
- [ ] Client trained and satisfied
- [ ] Documentation delivered
- [ ] Project closed
- [ ] Invoice sent

**Project Completion Date:** _______________

**Developer Signature:** _______________

**Client Signature:** _______________
