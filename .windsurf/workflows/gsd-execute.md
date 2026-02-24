---
description: Execute an implementation plan task by task. Each task gets atomic git commits and verification.
---

# GSD: Execute Phase

## Purpose
Systematically execute the implementation plan created by `gsd-plan`. Each task is implemented, verified, and committed independently. This ensures clean git history and easy rollback.

## When to Use
- After `gsd-plan` has created a PLAN.md for the phase
- When resuming execution of a partially completed phase
- After `gsd-verify` has created fix plans

## Steps

### 1. Load Execution Context
Read these files:
- `.planning/phases/phase-{N}-{slug}/PLAN.md` — the implementation plan
- `.planning/phases/phase-{N}-{slug}/CONTEXT.md` — user decisions
- `.planning/PROJECT.md` — project patterns (for code style)
- `.planning/STATE.md` — check which tasks are already done

### 2. Identify Next Task
Find the first incomplete task in PLAN.md. If resuming, check STATE.md for the last completed task.

### 3. Execute Task
For each task:

**a) Read relevant existing code first**
- Always read the files you're about to modify
- Understand the existing patterns before writing new code

**b) Implement the changes**
- Follow the exact instructions in PLAN.md
- Follow patterns from PROJECT.md
- Follow decisions from CONTEXT.md
- Write tests if the task involves new functions/endpoints

**c) Verify the task**
- Run the verification steps from PLAN.md
- If tests exist, run them
- Check for linting errors or obvious issues

**d) Commit atomically**
// turbo
```bash
git add -A
git commit -m "{type}(phase-{N}): {task-description}"
```

Commit types: `feat`, `fix`, `docs`, `refactor`, `test`, `style`, `chore`

### 4. Update Progress
After each task, update `.planning/STATE.md`:
- Mark task as completed
- Note any issues encountered
- Update "last completed" timestamp

### 5. Handle Failures
If a task fails verification:
1. **Don't panic** — check the error message carefully
2. **Fix forward** — if the fix is small (< 5 lines), fix and re-commit
3. **Create fix plan** — if the fix is complex, document it and move to next task
4. **Never skip verification** — a task isn't done until it's verified

### 6. Phase Completion
After all tasks are done:

**a) Create SUMMARY.md**
```
.planning/phases/phase-{N}-{slug}/SUMMARY.md
```
Include:
- What was implemented
- Files created/modified
- Any deviations from the plan
- Issues encountered and how they were resolved

**b) Update ROADMAP.md**
Mark the phase as complete.

**c) Update TASK.md**
Update the project's task tracker with completed items.

**d) Final commit**
// turbo
```bash
git add .planning/ TASK.md
git commit -m "docs(phase-{N}): complete phase {N} — {phase-name}"
```

## Anti-Context-Rot Rules
- **Re-read PLAN.md before each task** — don't rely on memory from previous tasks
- **One task at a time** — complete and commit before starting the next
- **If context feels degraded** — stop, update STATE.md, suggest user starts new conversation
- **Never modify PLAN.md during execution** — if the plan is wrong, create a fix plan instead
- **Always verify** — untested code is broken code

## Output
After each task, briefly report:
1. Task completed (name)
2. Verification result (pass/fail)
3. Next task (or phase complete)

After all tasks, summarize:
1. All tasks completed
2. Any issues or deviations
3. Recommendation: ready for verification (`gsd-verify`) or needs fixes
