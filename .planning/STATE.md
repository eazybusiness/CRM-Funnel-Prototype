# STATE — Session Continuity Tracker

> **Purpose:** Prevents context rot between Cascade sessions. Read this file at the start of every new conversation.

## Last Updated
- **Date:** 2026-02-24
- **Session:** Normalize `.planning/` + `.windsurf/` to match this CRM Funnel repo

## Current Phase
- **Active Milestone:** Project hygiene + planning alignment
- **Status:** Updating `.planning/` docs, task tracking, and Windsurf rules/workflows to reflect the Next.js CRM Funnel

## Current Product Snapshot
- **Product:** CRM Funnel web app ("Einfach bewusster leben")
- **Stack:** Next.js 14 + NextAuth + Neon Postgres (`@vercel/postgres`) + Brevo + PayPal
- **Deploy target:** Vercel
- **State:** Core flows implemented; remaining work mostly content + email template finalization + optional PayPal live keys

## What Was Done This Session (2026-02-24)
- Renamed `task.md` -> `TASK.md`
- Fixed `.windsurf` workflows/rules to reference `TASK.md`
- Removed unrelated planning files from `.planning/`
- Started rewriting `.planning/PROJECT.md` to match this repository

## What Needs Attention Next
1. Finish rewriting `.planning/STATE.md`, `.planning/ROADMAP.md`, `.planning/REQUIREMENTS.md`
2. Decide whether to remove unrelated workspace rule files (`python_rules.md`, `dart_flutter_rules.md`)
3. Commit the planning/rules cleanup milestone
4. (Next product work) finalize Brevo templates and optionally switch PayPal to live keys

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
✅ **What was accomplished:** Task tracking + workflow references normalized; unrelated planning docs removed; PROJECT.md rewritten
🔄 **What is in progress:** Rewriting remaining `.planning/` core docs and cleaning workspace rules
🎯 **Next priority actions:** Update ROADMAP/REQUIREMENTS; commit cleanup; then proceed with Brevo template finalization
