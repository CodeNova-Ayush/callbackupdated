# CallBack.ai

CallBack.ai is an AI resume workspace for candidates and recruiters. A person imports or builds a structured resume, checks ATS fit, matches it to a job, verifies claims, and exposes a living agent that answers only from that profile. Recruiters review the same profile. The app does not apply to jobs and does not treat model output as a hiring decision.

Package name: `buildersprog`. Stack: Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4, Prisma 5, optional Clerk. Local database is SQLite. Dev command is `npm run dev` (`next dev --webpack`).

This repo is not PatentOS. Ignore patent-workflow rules from any parent `AGENTS.md`.

## Architecture

```text
app/(app) pages ── localStorage stores ── browser workspace
app/api routes ── lib/services orchestration ── Prisma (lib/db.ts)
                         │
                         └── backend/services engines
                               ATS, JD match, living agent, verification
                         └── llm-provider (multi-provider)
```

- Pages under `app/(app)` are the product: dashboard, builder, analyzer, agent, JD match, trust score, skill graph, opportunities, voice intake, import, cover letter, recruiter dashboard.
- `frontend/` is an old static prototype. The running UI is `app/` and `components/`.
- Resume section bodies are JSON strings on `ResumeSection`. Templates render that JSON into selectable A4 documents.
- `backend/services` is the engine layer. Four `lib/services` files only re-export it. Other `lib/services` files own import, persistence, analysis, and model orchestration.
- All model calls go through `executeMultiProviderLLM`.
- `lib/db.ts` is the only Prisma client. It copies SQLite to `/tmp` on serverless and `resume-service` keeps an in-memory resume cache. `database/db.ts` re-exports `lib/db.ts`.

## Persistence split

The workspace UI reads and writes `lib/client-resume-store.ts` and `lib/client-cover-letter-store.ts`. API routes read and write Prisma. They are not synced. Cover letters exist only in the browser store.

Prisma is the canonical resume. New durable or recruiter-visible data belongs in the schema and API. Keep the client store working until a change deliberately replaces it. Do not add a third store.

## Auth and agent behavior

Clerk runs only when real `pk_` and `sk_` keys exist (`proxy.ts` and `AuthProvider`). Otherwise the app uses a local demo session. Many routes, including `/api`, are public in the proxy matcher. Scope a route in that route if the data must belong to a user.

The living agent must cite the candidate's sections and must not invent jobs, dates, metrics, or credentials.

## Direction

One profile shared by the builder, analyzer, matcher, trust score, skill graph, opportunities, and recruiter view. Next engineering step is to make Prisma that profile and demote the browser store to a cache. Later scale (Postgres, a vector index, background jobs) waits until it is requested. Avatar interviews, on-chain credentials, and auto-apply are out of scope.

## Before editing

Read `AGENTS.md` and, for Next.js APIs, `node_modules/next/dist/docs/` after install. Prefer `prisma/schema.prisma` and the service files over `PROJECT_PRESENTATION.md` when they disagree. Match the camelCase already used in this codebase.
