---
description: Quick mode for ad-hoc tasks that don't need full GSD planning. Bug fixes, small features, config changes.
---

# GSD: Quick Mode

## Purpose
For tasks that don't justify the full discuss → plan → execute → verify cycle. Gives you GSD guarantees (atomic commits, state tracking) with a faster path.

## When to Use
- Bug fixes
- Small features (< 30 minutes)
- Configuration changes
- One-off tasks
- Documentation updates

## Steps

### 1. Load Minimal Context
Read:
- `.planning/PROJECT.md` — project patterns
- `.planning/STATE.md` — current state (don't conflict with active phase work)

### 2. Understand the Task
Ask the user what they want to do. If unclear, use `ask_user_question` to clarify.

### 3. Create Quick Plan
Write a brief plan in:
```
.planning/quick/{NNN}-{slug}/PLAN.md
```

Where NNN is a sequential number (001, 002, etc.).

The plan should be 10-30 lines:
- **Goal:** one sentence
- **Changes:** list of files to modify
- **Steps:** what to do
- **Verify:** how to confirm it works

### 4. Execute
Implement the changes following the plan. Keep it focused — don't scope-creep.

### 5. Verify
Run verification steps from the plan.

### 6. Commit
// turbo
```bash
git add -A
git commit -m "{type}: {description}"
```

### 7. Create Summary
Write a brief summary in:
```
.planning/quick/{NNN}-{slug}/SUMMARY.md
```

3-5 lines: what was done, what was changed, any notes.

### 8. Update State
Update `.planning/STATE.md` with the quick task completion.
Update `TASK.md` if the task was tracked there.

## Anti-Context-Rot Rules
- **Quick tasks don't interrupt phase work** — they live in `.planning/quick/`
- **Still atomic commits** — one task, one commit
- **Still tracked** — every quick task has a plan and summary
- **Don't use quick mode for complex work** — if it needs discussion, use the full flow

## Output
Brief summary:
1. What was done
2. Files changed
3. Verification result
