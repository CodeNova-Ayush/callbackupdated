<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# CallBack.ai — Agent Instructions

This repository is **CallBack.ai** (`buildersprog` in `package.json`): a candidate-and-recruiter workspace that turns a resume into a structured profile, an ATS-safe document, and a grounded living agent.

A parent `AGENTS.md` in `leapx-projects/` describes PatentOS. That document does not apply here. Do not import patent stages, approval gates, prior-art rules, or PatentOS complexity limits into this app.

## Purpose

CallBack.ai exists to fix the broken loop between a static resume and a hiring conversation.

Candidates build and import a resume, score it for ATS fit, match it to a job description, verify claims, and let a recruiter question a living agent that answers only from that candidate's material. Recruiters get a companion surface over the same profile. The product assists drafting and evaluation. It does not submit applications to employers, and it must not present model output as a hiring decision.

## What is implemented

Next.js 16 App Router, React 19, TypeScript strict, Tailwind CSS v4. `app/` stays at the repository root. Dev runs with `next dev --webpack`. Route handler `params` are a Promise.

| Surface | Role |
| --- | --- |
| `app/page.tsx`, `app/welcome`, `app/get-started` | Public entry |
| `app/(app)/*` | Workspace: dashboard, builder, analyzer, agent, JD match, trust score, skill graph, opportunities, voice intake, import, cover letter, recruiter dashboard |
| `app/(auth)/*` | Login, register, Clerk sign-in and sign-up |
| `app/api/*` | Resume CRUD, import, analyze, sections, match, verification, agent chat, bullet and cover-letter assist, PDF export |
| `components/` | UI, templates, sidebar, auth, Three.js canvases |
| `frontend/` | Static HTML prototypes. Not the running app. Do not move `app/` under `frontend/`. |

## Architecture

Keep this layering. Do not add a third place for the same logic.

1. **Route handlers** in `app/api` parse the request, call a service, and return JSON. They stay thin.
2. **Engines** in `backend/services` own ATS scoring, JD matching, the living-resume agent, and claim verification. `lib/services/ats-scorer.ts`, `jd-matcher.ts`, `rag-agent-service.ts`, and `verification-service.ts` re-export those engines. New scoring, matching, grounding, or verification logic goes in `backend/services`, not in a page.
3. **Orchestration** in the other `lib/services` files talks to Prisma and the model provider: resume persistence, import, document parsing, ATS analysis, JD-match persistence, and bullet or cover-letter assist.
4. **Models** go through `executeMultiProviderLLM` in `lib/services/llm-provider.ts`. Provider order is environment-driven (Groq, OpenRouter, NVIDIA, OpenAI, Anthropic). Do not call a provider SDK from a page or route.
5. **Prisma** is the server record. The client is created in `lib/db.ts`, including the serverless SQLite copy to `/tmp/dev.db` and an in-memory resume cache in `lib/services/resume-service.ts`. `database/db.ts` and `lib/db/index.ts` re-export that client. Do not create another `PrismaClient`.

### Two resume stores

Both are live. Touching one does not update the other.

- **Browser store.** `lib/client-resume-store.ts` and `lib/client-cover-letter-store.ts` are what the workspace pages use (dashboard, builder, analyzer, agent, opportunities, skill graph, cover letter). Data lives in `localStorage`.
- **Server store.** Prisma models, reached through `app/api` and `lib/services/resume-service.ts`. Resume section `content` is a JSON string, not HTML.

Cover letters have no Prisma model. They are client-store only.

Direction: Prisma is the canonical resume. When a change needs durable, shared, or recruiter-visible data, write it through the API and schema. Keep the client store working for the current workspace, and do not grow it into a second schema. When the two disagree, say so instead of silently syncing them.

### Canonical resume shape

`Resume` has ordered `ResumeSection` rows. `sectionType` is one of `personal_info`, `education`, `experience`, `projects`, `skills`, `certifications`, `achievements`, `positions_of_responsibility`, `languages`, `interests`. Templates in `components/builder` render that JSON. ATS export depends on selectable text and A4 print CSS, not on a screenshot of the page.

Related server models: `AnalysisResult`, `VerificationClaim`, `SkillGraph`, `EmbeddingChunk`, `AgentConversation`, `JobDescription`, `MatchResult`, `JobPosting`, `ApplicationDraft`. `User.role` is `candidate` or `recruiter`. SQLite is the local database. Postgres is a deployment target, not the current schema provider.

### Living agent

`askLivingResumeAgent` answers from the candidate's resume sections and returns cited sources. The agent must not invent employers, dates, metrics, or credentials that are absent from the supplied profile. Prompt changes belong in `backend/services/rag-agent-service.ts`. The chat route is `POST /api/agent/[resumeId]/chat`.

### Auth

Clerk is optional. `proxy.ts` (this Next.js version's request proxy, not `middleware.ts`) runs Clerk only when both a real `pk_` publishable key and `sk_` secret are set. Otherwise `components/auth/AuthProvider.tsx` uses a local demo session in `localStorage`. Most app routes are currently public in the proxy matcher, including `/api`. Do not assume `auth.protect()` runs on every API route. If a change must be user-scoped, enforce it in that route and map the Clerk user onto the Prisma `User`. Do not commit secrets or placeholder keys that look real.

## Direction

Build toward one living candidate profile that the builder, analyzer, matcher, trust score, skill graph, opportunities board, and recruiter surface all read.

Near-term engineering:

- One canonical resume in Prisma, with the browser store as a client cache rather than a rival model.
- Thin routes, engines in `backend/services`, model calls only through `llm-provider`.
- Grounded agent answers and evidence-backed trust scores. Show what was verified and what was not.
- ATS-safe templates and export that stay text-selectable and A4-accurate.

Later scale, only when asked: Postgres, a real vector index instead of `EmbeddingChunk.vectorJson`, background parsing and verification, and caching of repeated recruiter questions. Avatar interviews, on-chain credentials, and auto-submit to job boards are not part of the current app. Do not start them because a presentation mentions them.

## Working rules

- Read the local Next.js docs before using an App Router, route-handler, or proxy API.
- Match existing names: camelCase functions, PascalCase components. `@/*` maps to the repo root.
- Preserve demo behavior when Clerk or provider keys are missing. The app is expected to run locally without them.
- Do not put database access, provider keys, or resume content into client components except through the existing browser stores and intentional API calls.
- Do not treat `frontend/` or the presentation markdown as the source of truth when it conflicts with `app/`, `lib/`, `backend/`, or `prisma/schema.prisma`.
- `docs/` is a map of routes and deployment notes. Update it when a route or model you touched is described there and the description is now wrong.
- Verify UI changes in the browser. Verify API and schema changes with the relevant route or a focused test, and state what you could not run.
