# Obsolete Files

This folder contains files that are **NOT part of the Core Project (500€)**.

These files were part of the initial prototype/demo but are not needed for the production-ready CRM Funnel.

---

## Why these files are obsolete:

### Pages (not in scope):
- `business.js`, `kurse.js`, `produkte.js` - Multi-pathway funnel (not in core scope)
- `login.js`, `request-reset.js`, `reset-password.js` - Authentication (Extra 1: Member Area)
- `member/*` - Member area with courses (Extra 1: Member Area)
- `payment/checkout.js`, `payment/success.js`, `payment/cancel.js` - Old payment flow
- `demo/crm.js` - Demo CRM dashboard (not production)

### API Routes (not in scope):
- `api/auth/*` - Authentication endpoints (Extra 1)
- `api/member/*` - Member area endpoints (Extra 1)
- `api/stripe.js`, `api/payment/create-stripe-session.js` - Stripe integration (only PayPal in scope)

### Documentation (outdated):
- Various planning documents from pre-contract phase
- Superseded by `PROJECT_SCOPE_FINAL.md` and `WORK_PLAN.md`

---

## Core Project Scope (what IS included):

1. **Landingpage** (`pages/index.js`) - Simple freebie landing page
2. **Freebie Page** (`pages/freebie.js`) - Download form
3. **Datenschutz** (`pages/datenschutz.js`) - Privacy policy
4. **API Routes:**
   - `api/subscribe.js` - Email subscription
   - `api/lead.js` - Lead management
   - `api/tracking.js` - UTM tracking
   - `api/crm/save-lead.js` - CRM integration
   - `api/email/*` - Email automation

---

## When to use these files:

These files will be needed if the client books **Extra 1: Protected Learning Area** (400-500€).

At that point, we can move them back from `/obsolete` to the main project.

---

**Last updated:** January 6, 2026
