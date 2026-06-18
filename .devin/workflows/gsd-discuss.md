---
description: Discuss and clarify a specific phase before planning. Captures user preferences, resolves gray areas, and creates CONTEXT.md for the phase.
---

# GSD: Discuss Phase

## Purpose
Shape the implementation BEFORE any code is written. This captures your vision, preferences, and decisions so the planner and executor have clear direction. This prevents the AI from guessing and building something you didn't want.

## When to Use
- Before planning any new phase of work
- When starting a feature that has multiple valid approaches
- When you want to ensure the AI understands your intent precisely

## Steps

### 1. Load Context
Read these files to understand current state:
- `.planning/PROJECT.md` — project overview
- `.planning/STATE.md` — current session state
- `.planning/ROADMAP.md` — which phase we're discussing
- `.planning/REQUIREMENTS.md` — what's in scope

### 2. Identify the Phase
Determine which phase number (N) is being discussed. If the user doesn't specify, use the next incomplete phase from ROADMAP.md.

### 3. Analyze Gray Areas
Based on what the phase involves, identify areas that need user input:

**For UI/Visual features:**
- Layout preferences (cards, lists, tables?)
- Information density (minimal vs detailed?)
- Interaction patterns (modals, inline editing, page navigation?)
- Empty states and loading states
- Mobile behavior

**For API/Backend features:**
- Response format and error handling
- Authentication and authorization approach
- Data validation rules
- Performance requirements

**For Content/Documentation:**
- Structure and organization
- Tone and depth
- Target audience

**For Infrastructure/DevOps:**
- Hosting and deployment preferences
- Environment management
- Monitoring and logging needs

### 4. Ask Targeted Questions
Use `ask_user_question` for each gray area. Group related questions. Don't ask about things already decided in REQUIREMENTS.md or PROJECT.md.

### 5. Create CONTEXT.md
Write the phase context file:

```
.planning/phases/phase-{N}-{slug}/CONTEXT.md
```

Include:
- **Phase goal** — one sentence
- **Decisions made** — what the user chose
- **Constraints** — what must be respected
- **Preferences** — how the user wants it to look/work/feel
- **Open questions** — anything still unresolved (if any)

### 6. Update STATE.md
Update `.planning/STATE.md` with:
- Current phase being discussed
- Key decisions made
- Any blockers identified

### 7. Git Commit
// turbo
```bash
git add .planning/
git commit -m "docs(phase-{N}): capture context and decisions for {phase-name}"
```

## Anti-Context-Rot Rules
- **CONTEXT.md is the source of truth** for implementation decisions — not chat history
- Keep CONTEXT.md under 100 lines — concise decisions, not essays
- If a decision contradicts REQUIREMENTS.md, update REQUIREMENTS.md
- Never proceed to planning without a CONTEXT.md file

## Output
Summarize:
1. Phase being discussed
2. Key decisions made (bullet list)
3. Any remaining open questions
4. Recommendation: ready to plan, or needs more discussion
