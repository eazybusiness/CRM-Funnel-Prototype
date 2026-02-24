---
trigger: model_decision
---

### 🔄 Project Awareness & Context
- **Always read** `.planning/STATE.md` and `.planning/PROJECT.md` at the start of a new conversation.
- **Check `TASK.md`** before starting new work and update it when tasks are completed.

### 🧱 Code Structure & Modularity
- **Keep files small** (prefer < 300 lines; refactor if approaching 500 lines).
- **Keep components focused**: one component per file unless they are tightly coupled.
- **Prefer existing patterns** in `pages/`, `lib/`, and `components/`.

### 🧪 Testing & Reliability
- If adding or changing logic, add/update tests.
- For this repository (Next.js pages router), prefer:
  - **Unit tests** for helpers in `lib/`
  - **Light integration tests** for API routes (request/response)

### 📎 Style & Conventions
- **Language**: JavaScript/Node.js (Next.js 14, React 18).
- Keep code readable and consistent with existing formatting.
- Use environment variables; never commit secrets.

### 🔐 Security & Ops
- Keep auth logic centralized in `lib/auth.js` and `pages/api/auth/[...nextauth].js`.
- Treat `middleware.js` as the source of truth for route protection.
- When changing headers/CSP, verify PayPal/Brevo/Vimeo/GA continue to work.

### ✅ Deployment
- Target platform: **Vercel**.
- Database: **Neon Postgres** via `@vercel/postgres`.
- Verify `npm run build` succeeds before considering deployment-ready.
