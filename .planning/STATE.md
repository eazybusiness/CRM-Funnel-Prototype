# STATE — Session Continuity Tracker

> **Purpose:** Prevents context rot between Cascade sessions. Read this file at the start of every new conversation.

## Last Updated
- **Date:** 2026-02-24 (afternoon)
- **Session:** Fixed dashboard issues + created demo course content

## Current Phase
- **Active Milestone:** Project hygiene + planning alignment
- **Status:** Updating `.planning/` docs, task tracking, and Windsurf rules/workflows to reflect the Next.js CRM Funnel

## Current Product Snapshot
- **Product:** CRM Funnel web app ("Einfach bewusster leben")
- **Stack:** Next.js 14 + NextAuth + Neon Postgres (`@vercel/postgres`) + Brevo + PayPal
- **Deploy target:** Vercel
- **State:** Core flows implemented; remaining work mostly content + email template finalization + optional PayPal live keys

## What Was Done This Session (2026-02-24 afternoon)
- Fixed dashboard "Zu den Kursen" button (now links to `/courses` instead of homepage)
- Fixed data export error with improved error handling and fallback queries
- Created demo course content structure (PDFs + SQL script for modules/lessons)
- Updated TASK.md and REQUIREMENTS.md with clarified project status
- Committed all changes to git

## What Needs Attention Next
1. Run SQL script to populate database with demo course content: `scripts/add-demo-course-content.sql`
2. Test full purchase-to-viewing flow with demo content
3. Wait for client to provide: 3 Brevo email templates, real course content, video hosting decision
4. Optional: Format 3 Brevo placeholder emails (blocked by MCP connection)

## Current Blockers
- None

## Key Risks / Things That Commonly Break
1. **Auth redirects:** `NEXTAUTH_URL` and callback URLs
2. **CSP:** PayPal/Brevo/video embeds can break if CSP is tightened incorrectly
3. **Env drift:** local vs Vercel env vars
4. **Email deliverability:** sender verification + template content

## Assets / Docs
- `README.md`
- `docs/` (PayPal, Brevo, DB setup, milestone checklists)
- `DEPLOYMENT.md`, `VERCEL_DEPLOYMENT_GUIDE.md`
- `TASK.md`

## Context Window Notes
- **If context feels degraded:** start a new conversation and re-read `.planning/STATE.md`
- **Key files to re-read:** `.planning/PROJECT.md`, `.planning/REQUIREMENTS.md`, `.planning/ROADMAP.md`, `TASK.md`

## Session Handoff Checklist
✅ **What was accomplished:** Fixed dashboard export bug + button link; created demo course content (PDFs + SQL script); updated planning docs
🔄 **What is in progress:** Demo content ready but not yet loaded into database
🎯 **Next priority actions:** Run SQL script to populate demo content; test purchase flow; wait for client deliverables (emails, videos, PDFs)
