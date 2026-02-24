# ROADMAP — CRM Funnel Prototype (Next.js + Vercel)

> **Purpose:** Phased roadmap to maintain and extend the CRM funnel application (auth, freebie double opt-in, course sales, member area, Brevo automation) with a clean delivery process using `.planning/` and `TASK.md`.

## Phase 0: Planning + Repo Hygiene (Immediate)
| Milestone | Description | Status |
|----------|-------------|--------|
| 0.1 | Align `.planning/*` to this repo | 🔄 In progress |
| 0.2 | Normalize task tracking to `TASK.md` | ✅ Done |
| 0.3 | Clean `.windsurf` rules/workflows to match Next.js | � In progress |

**Deliverables:**
- `.planning/{PROJECT,STATE,ROADMAP,REQUIREMENTS}.md` reflect this codebase
- Windsurf rules/workflows reference correct paths

## Phase 1: Operational Readiness (Next)
| Milestone | Description | Status |
|----------|-------------|--------|
| 1.1 | Brevo templates finalized (content + formatting) | 📋 Planned |
| 1.2 | PayPal live credentials switch (optional) | 📋 Planned |
| 1.3 | Security logging/monitoring additions | 📋 Planned |

## Phase 2: Course Content + Admin Improvements
| Milestone | Description | Status |
|----------|-------------|--------|
| 2.1 | Add real course content (PDF/video) | 📋 Planned |
| 2.2 | Improve course admin management UI | 📋 Planned |
| 2.3 | Progress tracking / lesson completion | 📋 Planned |

## Phase 3: Analytics + Optimization
| Milestone | Description | Status |
|----------|-------------|--------|
| 3.1 | GA4 tracking (if desired) | 📋 Planned |
| 3.2 | Funnel conversion instrumentation | 📋 Planned |

## Always-On Operating Rhythm
- **Weekly:** Review `TASK.md`, ship 1-3 small improvements with atomic commits
- **Before deploy:** `npm run build` locally and verify env vars exist in Vercel
