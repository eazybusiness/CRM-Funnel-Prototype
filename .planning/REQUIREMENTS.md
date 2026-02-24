# REQUIREMENTS — CRM Funnel Prototype (Next.js + Vercel)

> **Purpose:** Single source of truth for what this repository must deliver next, what is deferred, and what is out of scope.

## Must-Have (Operational Readiness)
- [ ] **Brevo email templates finalized:** welcome, purchase confirmation, password reset (final copy + formatting)
- [ ] **Brevo deliverability configured:** verified sender/domain, SPF/DKIM if using custom domain
- [ ] **Security logging:** add minimal auth/security relevant logs (without leaking PII/secrets)
- [ ] **Database schema migration tasks:** address known missing columns mentioned in `TASK.md` (security-related columns)

## Must-Have (Content)
- [ ] **Real course content added:** PDFs/videos wired into member area (replace demo content)
- [ ] **Admin course management:** ensure real content can be maintained without code changes where possible

## Should-Have
- [ ] **PayPal live mode:** switch to live API URL and credentials when client provides keys
- [ ] **Analytics:** GA4 integration if desired
- [ ] **Reduce hydration warnings:** investigate and resolve non-critical warnings if they impact UX

## Deferred
- [ ] **Full course progress tracking:** per-lesson completion + resume + reporting
- [ ] **Advanced funnel analytics:** conversion dashboards, cohort retention

## Constraints (Hard)
- **Deployment target:** Vercel
- **No secrets in repo:** all keys in `.env.local` and Vercel env vars
- **Keep CSP compatible:** PayPal/Brevo/video embeds must keep working after any header changes

## Out of Scope
- Native mobile apps
- Major redesign of brand/UX copy unless requested
- Replacing NextAuth with a different auth provider
