# PROJECT — CRM Funnel Prototype (Next.js + Vercel)

> **One-liner:** A Next.js 14 web app for an automated CRM funnel with authentication, freebie double opt-in, course sales (PayPal), member dashboard, and Brevo email automation — deployed on Vercel with Neon Postgres.

## How do I run things?
- **Install:** `npm install`
- **Env:** `cp .env.example .env.local` and fill values
- **Dev:** `npm run dev` then open `http://localhost:3000`
- **Build:** `npm run build`
- **Start (prod):** `npm start`

## Tech Stack
- **Frontend:** Next.js (pages router), React 18, Tailwind CSS, Headless UI, Framer Motion
- **Backend:** Next.js API routes
- **Auth:** NextAuth (`pages/api/auth/[...nextauth].js` + `lib/auth.js`)
- **Database:** Postgres via `@vercel/postgres` (`lib/db.js`)
- **Email:** Brevo (`sib-api-v3-sdk` + API routes)
- **Payments:** PayPal (sandbox/live)
- **Deployment:** Vercel (`vercel.json`)

## Architecture (Where to look)
- **Pages:** `pages/`
- **API routes:** `pages/api/`
- **Shared logic:** `lib/`
- **UI components:** `components/`
- **Route protection:** `middleware.js`
- **Docs:** `docs/`

## Key Patterns (Non-Negotiables)
- **One source of truth for work:** `.planning/` + `TASK.md`
- **Atomic commits:** one task = one commit
- **No secrets in git:** only via environment variables / Vercel env
- **Prefer existing patterns:** copy/adapt from similar routes/components rather than inventing new structure

## Edge Cases / Common Pitfalls
- **CSP breaks payments/embeds:** changes in `next.config.js` headers can break PayPal or video embeds
- **NextAuth callback loops:** mismatched `NEXTAUTH_URL` / `NEXTAUTH_SECRET` causes login redirect issues
- **DB connectivity differences:** local `.env.local` vs Vercel env can cause production-only failures
- **Brevo deliverability:** sender domain, SPF/DKIM, and template content can affect delivery

## How we work in this repo
1. Start with `.planning/STATE.md` and `TASK.md`
2. For bigger work: `/gsd-discuss` → `/gsd-plan` → `/gsd-execute` → `/gsd-verify`
3. For quick fixes: `/gsd-quick`
4. Always update `.planning/STATE.md` before ending the session
