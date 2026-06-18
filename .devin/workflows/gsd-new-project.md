---
description: Initialize a new project or brownfield codebase with GSD spec-driven development. Creates .planning/ directory with PROJECT.md, REQUIREMENTS.md, ROADMAP.md, and STATE.md.
---

# GSD: New Project Initialization

## Purpose
Sets up the spec-driven development framework for a new or existing project. This is the equivalent of GSD's `/gsd:new-project` and `/gsd:map-codebase` combined, adapted for Cascade.

## When to Use
- Starting a brand new project from scratch
- Onboarding an existing codebase into the GSD workflow
- Resetting project planning after major scope changes

## Steps

### 1. Understand the Project
Ask the user targeted questions until you fully understand:
- **What** they're building (one-liner + detailed description)
- **Who** it's for (target users/customers)
- **Tech stack** preferences or constraints
- **Scope** — what's v1, what's deferred, what's out of scope
- **Constraints** — budget, timeline, compliance, existing code

Use the `ask_user_question` tool for structured choices. Don't stop until you have clarity on all gray areas.

### 2. Map Existing Codebase (Brownfield Only)
If there's existing code:
// turbo
```bash
find . -type f -name "*.js" -o -name "*.ts" -o -name "*.py" -o -name "*.jsx" -o -name "*.tsx" | head -50
```
- Read key files (package.json, requirements.txt, main entry points)
- Identify architecture patterns, conventions, and tech stack
- Note any technical debt or inconsistencies

### 3. Create `.planning/` Directory
Create these files in `.planning/`:

- **PROJECT.md** — One-liner, tech stack, architecture, key patterns, constraints, key files
- **REQUIREMENTS.md** — V1 scope, deferred items, out of scope (with checkboxes)
- **ROADMAP.md** — Phases mapped to requirements, with status tracking
- **STATE.md** — Session continuity tracker (empty template for now)

### 4. Create Phase Context Templates
For each phase in the roadmap, create a placeholder:
```
.planning/phases/phase-{N}-{slug}/
  CONTEXT.md    (created during discuss-phase)
  PLAN.md       (created during plan-phase)
  SUMMARY.md    (created during execute-phase)
  VERIFY.md     (created during verify-phase)
```

### 5. Initialize State Tracking
Populate `STATE.md` with:
- Current date
- Active milestone and phase
- What needs attention first
- Known blockers

### 6. Git Commit
// turbo
```bash
git add .planning/
git commit -m "feat: initialize GSD spec-driven development framework"
```

## Anti-Context-Rot Rules
- **PROJECT.md** must fit in ~200 lines — it's the "elevator pitch" for the AI
- **STATE.md** must be updated at the END of every session
- **REQUIREMENTS.md** is the single source of truth for scope decisions
- **ROADMAP.md** tracks progress — never rely on memory alone

## Output
After completion, summarize:
1. Project understanding (1 paragraph)
2. Number of phases planned
3. What the first actionable phase is
4. Any blockers or questions remaining
