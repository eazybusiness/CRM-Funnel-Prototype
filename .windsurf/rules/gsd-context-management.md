---
trigger: always_on
---

## GSD Context Management — Anti-Context-Rot Rules

### Session Start Protocol
At the start of EVERY new conversation:
1. Read `.planning/STATE.md` — understand where we left off
2. Read `.planning/PROJECT.md` — refresh project understanding
3. Check `.planning/ROADMAP.md` — know the current phase
4. Check `TASK.md` — know active tasks

### Session End Protocol
Before ending ANY session, update `.planning/STATE.md` with:
- What was accomplished this session
- What is currently in progress
- What is blocked and why
- Any new issues discovered
- Next priority actions
- Commit the STATE.md update

### Context Freshness Rules
- **Never rely on chat memory for project decisions** — always reference `.planning/` files
- **If you feel uncertain about project context** — re-read PROJECT.md and STATE.md
- **If a conversation is getting long (>20 exchanges)** — suggest the user starts a fresh conversation after updating STATE.md
- **Every implementation decision must trace back** to REQUIREMENTS.md or a phase CONTEXT.md

### File Size Limits (prevents context overload)
- `PROJECT.md` — max 200 lines (elevator pitch for the AI)
- `STATE.md` — max 80 lines (current state only, not history)
- `CONTEXT.md` per phase — max 100 lines (decisions, not essays)
- `PLAN.md` per phase — max 200 lines (split into sub-phases if larger)
- `SUMMARY.md` per phase — max 50 lines (what was done, not how)

### Atomic Commits
- One task = one commit
- Commit message format: `{type}(phase-{N}): {description}`
- Types: feat, fix, docs, refactor, test, style, chore
- Never batch unrelated changes into one commit

### Planning Directory Structure
```
.planning/
  PROJECT.md          — project overview (read every session)
  STATE.md            — session continuity (read+write every session)
  REQUIREMENTS.md     — scope decisions (read when planning)
  ROADMAP.md          — phase progress (read when planning)
  phases/
    phase-{N}-{slug}/
      CONTEXT.md      — user decisions (from gsd-discuss)
      PLAN.md         — implementation plan (from gsd-plan)
      SUMMARY.md      — what was done (from gsd-execute)
      VERIFY.md       — verification results (from gsd-verify)
      FIX-{N}.md      — fix plans (from gsd-verify, if needed)
  quick/
    {NNN}-{slug}/
      PLAN.md         — quick task plan
      SUMMARY.md      — quick task summary
```

### GSD Workflow Commands
Use these Cascade workflows in order:
1. `/gsd-new-project` — Initialize project planning (once)
2. `/gsd-discuss` — Clarify phase requirements with user
3. `/gsd-plan` — Create atomic implementation plan
4. `/gsd-execute` — Execute plan task by task
5. `/gsd-verify` — User acceptance testing
6. `/gsd-quick` — Ad-hoc tasks outside the phase flow
