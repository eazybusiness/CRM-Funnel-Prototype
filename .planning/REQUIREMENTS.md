# REQUIREMENTS — CRM Funnel Prototype (Next.js + Vercel)

> **Purpose:** Single source of truth for what this repository must deliver next, what is deferred, and what is out of scope.

## Must-Have (Operational Readiness)
- [x] **Security:** Current implementation is sufficient
- [ ] **Brevo email templates finalized:** 1/4 received from client, 3 need final copy + HTML/CSS formatting (blocked by MCP connection)
- [x] **Brevo deliverability configured:** verified sender/domain working

## Must-Have (Immediate Fixes - No Client Needed)
- [ ] **Fix dashboard data export:** Currently returns error
- [ ] **Fix "Zu den Kursen" button:** Should link to /courses page, not homepage
- [ ] **Create demo course content:** Placeholder videos (YouTube unlisted or Vimeo) + sample PDFs for testing
- [ ] **Wire demo content to database:** Enable full purchase-to-viewing flow testing

## Must-Have (Content - Waiting on Client)
- [ ] **Real course content:** Client to provide PDFs/videos to replace demo content
- [ ] **Video hosting decision:** Client deciding between YouTube unlisted (preferred by client) vs Vimeo (copy protection)

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
