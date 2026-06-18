---
description: Verify completed phase work with user acceptance testing. Walk through deliverables one by one and create fix plans for any issues.
---

# GSD: Verify Phase

## Purpose
Confirm that the completed phase actually works as intended. This is user acceptance testing (UAT) — not just "does the code compile" but "does it do what I wanted."

## When to Use
- After `gsd-execute` completes all tasks for a phase
- When the user wants to review completed work
- After fix plans have been executed

## Steps

### 1. Load Context
Read:
- `.planning/phases/phase-{N}-{slug}/PLAN.md` — what was planned
- `.planning/phases/phase-{N}-{slug}/SUMMARY.md` — what was actually done
- `.planning/phases/phase-{N}-{slug}/CONTEXT.md` — what the user wanted
- `.planning/REQUIREMENTS.md` — scope check

### 2. Extract Testable Deliverables
From the plan and summary, create a checklist of things the user should be able to do now. Be specific:
- "Can you navigate to /member/dashboard and see your enrolled courses?"
- "Does the PayPal checkout button appear on the course page?"
- "Is the email sent within 30 seconds of form submission?"

### 3. Walk Through Verification
Present each deliverable to the user one at a time using `ask_user_question`:
- **Pass** — works as expected
- **Partial** — works but not quite right (describe issue)
- **Fail** — doesn't work at all (describe what happens)

### 4. Automated Checks
Run any available automated verification:
// turbo
```bash
# Run tests if they exist
npm test 2>/dev/null || echo "No test suite found"

# Check for build errors
npm run build 2>/dev/null || echo "Build check skipped"

# Lint check
npm run lint 2>/dev/null || echo "No linter configured"
```

### 5. Handle Issues
For each failed or partial item:

**a) Diagnose the root cause**
- Read the relevant code
- Check error logs
- Identify whether it's a code bug, missing feature, or misunderstanding

**b) Create fix plan**
Write a targeted fix plan in:
```
.planning/phases/phase-{N}-{slug}/FIX-{issue-number}.md
```

Each fix plan follows the same atomic task format as PLAN.md.

### 6. Create VERIFY.md
Save verification results to:
```
.planning/phases/phase-{N}-{slug}/VERIFY.md
```

Include:
- Date of verification
- Each deliverable: pass/partial/fail
- Issues found (with fix plan references)
- Overall verdict: PASSED / NEEDS FIXES

### 7. Update STATE.md
Update `.planning/STATE.md`:
- Phase verification status
- Any fix plans created
- Next action (move to next phase, or re-execute fixes)

### 8. Git Commit
// turbo
```bash
git add .planning/
git commit -m "docs(phase-{N}): verification results for {phase-name}"
```

## Anti-Context-Rot Rules
- **Verify against CONTEXT.md decisions** — not against what you think the user wanted
- **One deliverable at a time** — don't overwhelm with a huge checklist
- **Fix plans are new plans** — they go through the same execute flow
- **Never mark a phase as complete without verification**

## Output
Summarize:
1. Total deliverables checked
2. Passed / Partial / Failed counts
3. Fix plans created (if any)
4. Verdict: phase complete, or needs fixes
5. Next recommended action
