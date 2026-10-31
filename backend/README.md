# Backend

The `backend/` folder contains product logic engines that are called by Next.js API routes.

## Services

- `rag-agent-service.ts`: grounded living resume agent.
- `verification-service.ts`: claim verification and trust score logic.

Keep request/response handling in `app/api` and reusable business logic here.
