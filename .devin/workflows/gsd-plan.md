---
description: Create an atomic, verifiable implementation plan for a phase. Breaks work into small tasks with clear acceptance criteria.
---

# GSD: Plan Phase

## Purpose
Create a detailed, atomic implementation plan that any AI session can pick up and execute without needing additional context. Each task should be small enough to complete in a single focused effort without context degradation.

## When to Use
- After completing `gsd-discuss` for a phase
- When you need to break down a large feature into executable steps
- When resuming work on a previously discussed phase

## Steps

### 1. Load Full Context
Read ALL of these files:
- `.planning/PROJECT.md` — project overview and patterns
- `.planning/STATE.md` — current state
- `.planning/ROADMAP.md` — phase details
- `.planning/REQUIREMENTS.md` — scope constraints
- `.planning/phases/phase-{N}-{slug}/CONTEXT.md` — user decisions for this phase

### 2. Research (if needed)
Before planning, investigate:
- Existing code patterns in the codebase (use `code_search`)
- How similar features are already implemented
- Library/framework documentation for unfamiliar APIs
- Edge cases and potential pitfalls

Document findings briefly in the plan.

### 3. Create Atomic Task Plans
Break the phase into 2-5 atomic tasks. Each task must be:

**Small:** Completable in one focused effort (< 30 minutes of AI work)
**Independent:** Can be understood without reading other tasks
**Verifiable:** Has a clear "done" condition
**Atomic:** One commit per task

For each task, define:
```markdown
### Task {N}.{T}: {Name}

**Files to create/modify:**
- `path/to/file.js` — what changes

**Action:**
Step-by-step what to implement. Be specific about:
- Function signatures
- Data structures
- Error handling approach
- Which existing patterns to follow

**Verify:**
How to confirm this task is complete:
- Expected behavior
- Test commands to run
- What success looks like

**Done when:**
One-sentence acceptance criterion.
```

### 4. Check Plan Quality
Before finalizing, verify:
- [ ] Every task maps to a requirement in REQUIREMENTS.md
- [ ] No task requires context from another task to understand
- [ ] Every task has a verification step
- [ ] File paths are correct and exist (or will be created)
- [ ] The plan follows patterns from PROJECT.md
- [ ] Total tasks ≤ 5 (split into sub-phases if more)

### 5. Write PLAN.md
Save to:
```
.planning/phases/phase-{N}-{slug}/PLAN.md
```

Include:
- **Phase overview** — what this phase delivers
- **Prerequisites** — what must be true before starting
- **Tasks** — the atomic task list
- **Verification** — how to verify the entire phase works
- **Rollback** — how to undo if something goes wrong (git revert)

### 6. Update STATE.md
Update `.planning/STATE.md`:
- Phase status: "planned"
- Number of tasks
- Estimated complexity

### 7. Git Commit
// turbo
```bash
git add .planning/
git commit -m "docs(phase-{N}): create implementation plan for {phase-name}"
```

## Anti-Context-Rot Rules
- **Each task must be self-contained** — include all context needed to execute it
- **Reference file paths explicitly** — never say "the relevant file"
- **Include code patterns** — show the style to follow, don't just describe it
- **Keep PLAN.md under 200 lines** — if longer, split into sub-phases
- **Plans are disposable** — if execution reveals the plan is wrong, create a new one

## Output
Summarize:
1. Number of tasks created
2. Estimated complexity (simple / moderate / complex)
3. Any risks or dependencies identified
4. Ready to execute? (yes/no + reason if no)
