# Call Prep Guide — CRM Funnel Prototype (Meta Ad → Funnel → Checkout → CRM → Email)

## 0) Goal of the call (what you want to achieve)
- Align on the prospect’s business goal and current situation.
- Confirm scope: funnel pages, tracking, lead capture, checkout, CRM handoff, email automation.
- Agree on next steps: short discovery, written proposal, timeline, price range, responsibilities.

## 1) 60-second intro (your opening script)
Use this to start confidently:

"Thanks for your time. I’ll quickly understand your goal and current setup, then I’ll walk you through how the Meta-Ad-to-Funnel flow works end-to-end: tracking via UTM, step-by-step funnel, lead capture, optional checkout, CRM sync, and email automation. At the end we’ll agree on the next step: either a short requirements workshop or a proposal with timeline and pricing."

## 2) Structure / agenda (15–30 min)
- 2–3 min: Goals and target audience
- 5–7 min: Current setup (website, ads, CRM, email)
- 5–7 min: Funnel flow walkthrough (demo)
- 3–5 min: Requirements and constraints (payment, CRM, hosting)
- 2–3 min: Next steps + timeline + budget range

## 3) High-level explanation of the prototype (what it is)
### What the prototype demonstrates
- A Meta ad entry point using UTM parameters (e.g. `utm_source=facebook`, `utm_campaign=...`).
- A landing page with 3 paths (Products, Courses, Business).
- A step-by-step funnel (wizard/stepper) to reduce drop-offs.
- Lead capture and event tracking (demo event log).
- A demo checkout flow without exposing secrets.
- A demo CRM dashboard showing captured leads and funnel events.
- Email automation endpoints (welcome + follow-ups) that can be connected to real SMTP/provider.

### What is demo vs production
- Demo mode: payment verification is simulated (no Stripe secrets on the frontend).
- Production mode: payment runs through Stripe (server-side secrets in environment variables).
- Demo CRM: uses browser storage for demonstration; production: send leads/events to a real CRM via API/webhook.

## 4) Core funnel story you should tell (business language)
- Traffic comes from Meta ads.
- We track campaign/source via UTM.
- Visitors are guided step-by-step to one clear conversion.
- Conversion is either:
  - Lead (book a call / request info), or
  - Direct purchase (checkout)
- Every action is measurable (events), and triggers automated follow-up (email/CRM).

## 5) Discovery questions (ask these early)
### Business
- What is the main offer? (product / course / service)
- Primary funnel goal: lead generation or direct checkout?
- Who is the target audience and what is the main pain point?
- What is the average order value / lead value?

### Ads & tracking
- Which platforms: Facebook / Instagram / WhatsApp?
- Do you already run campaigns? What is working/not working?
- Do you need pixel + conversion API (CAPI) setup?
- Do you need multi-step attribution (first-touch vs last-touch)?

### Website & hosting
- Where will it be hosted? (constraints like “no Node.js” matter)
- Do you need a static build for hosting environments like IONOS?

### CRM
- Which CRM do you use today? (HubSpot, Pipedrive, Zoho, HighLevel, custom)
- Required pipeline stages? (new lead, contacted, qualified, won, lost)
- Who follows up: sales team, owner, or automated?

### Email automation
- Do you already have an email provider? (SendGrid/Mailgun/SES/SMTP)
- Do you need sequences for:
  - Lead captured
  - Abandoned checkout
  - Post-purchase onboarding
- Any compliance requirements (double opt-in, unsubscribe, GDPR)?

### Payment
- Do you want Stripe? Any alternative?
- Do you sell one-time payments, subscriptions, or installments?
- Do you need invoices/VAT?

## 6) “Inputs we need from you” checklist (what you ask the customer to provide)
### Required (minimum)
- Offer details: packages, pricing, what’s included.
- Copy assets: brand tone, value proposition, FAQ.
- Tracking: list of UTM parameters used in ads.
- GDPR/legal pages (or we can provide placeholders).

### If payment is included
- Stripe account.
- Stripe products/prices (or permission to create them).
- Server-side environment variables (never in frontend):
  - `STRIPE_SECRET_KEY`
  - `STRIPE_WEBHOOK_SECRET` (if webhooks are used)

### If CRM is included
- CRM name and desired pipeline/stages.
- API key/OAuth credentials or a webhook endpoint.
- Field mapping requirements (name, email, phone, UTM fields, offer selected, notes).

### If emails are included
- SMTP/provider credentials (server-side only).
- From address + domain readiness (SPF/DKIM/DMARC recommended).
- Email templates and schedule (welcome + follow-ups).

## 7) Typical questions you will get — and good answers
### “How do we know the lead came from Facebook?”
- “We pass UTM parameters from the ad to the landing page and store them with the lead. In production, we can also set up Meta Pixel and optionally Conversion API for better attribution.”

### “Is the checkout real?”
- “In the demo it’s a safe mock flow (no secrets). In production we use Stripe Checkout with server-side keys and verification.”

### “Does it connect to our CRM?”
- “Yes. The prototype shows the exact data structure and flow. For production we connect via your CRM’s API or webhook and map fields/pipeline stages.”

### “Can you automate emails?”
- “Yes. We trigger sequences on lead creation/purchase. In production we wire it to your email provider and make sure compliance is respected.”

### “How long does it take?”
- “Depending on scope: a basic funnel + lead capture + tracking is typically 1–2 weeks. With CRM + email + payment integration usually 2–4 weeks. We can confirm after the discovery call.”

### “What do you need from us to start?”
- “Offer copy/pricing, brand assets, and access/credentials for the tools you already use (CRM/email/payment). If you don’t have them yet, I can recommend a setup.”

## 8) Objections and how to respond
### “We’re comparing 3 providers.”
- “That makes sense. To make it comparable: I can send you a one-page scope, timeline, and deliverables list. If we do a 15–20 min alignment call, I can tailor it exactly to your systems.”

### “We’re not sure about budget.”
- “We can approach it in phases. Phase 1: funnel + tracking + lead capture. Phase 2: payment + CRM + email automation. This reduces risk and keeps budget controlled.”

### “We want to keep it simple.”
- “Perfect. The funnel is designed to be simple for the user and measurable for you. We’ll start with the minimum viable funnel and add automation only where it helps conversion.”

## 9) Demo walkthrough checklist (what to show)
- Open a URL with UTMs (Meta-ad simulation)
- Landing page: pick one path
- Step-by-step funnel: show the stepper
- Submit lead: show that it’s captured
- Checkout: demo mode explanation
- Demo CRM dashboard: show leads + events
- Mention email automation (triggered by lead/purchase)

## 10) Next steps (end of call script)
"If you’re happy with the approach, the next step is: I send you a short requirements checklist and a proposal with timeline and deliverables. If you share which CRM/email/payment you use, I’ll include the exact integration plan."

## 11) What NOT to do (avoid pitfalls)
- Do not promise “everything” without scope.
- Do not discuss or share secret keys in email or screen share.
- Do not over-focus on tech. Keep the story about conversion and automation.

## 12) Your pre-call checklist (5 minutes)
- Have 2–3 time slots ready for next meeting.
- Know the key differentiator: end-to-end measurable funnel + automation.
- Have the demo URL with UTMs prepared.
- Have a simple phased plan ready (Phase 1 / Phase 2).

