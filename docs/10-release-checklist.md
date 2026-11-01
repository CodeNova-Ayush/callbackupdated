# Release checklist

- `BETTER_AUTH_SECRET` is unique and at least 32 characters (the server refuses to start otherwise).
- `POSTGRES_PASSWORD` is set and not reused elsewhere.
- `BETTER_AUTH_URL` is the https origin.
- `SEED_DEMO` is unset.
- CI is green: `npm run lint`, `npm run typecheck`, `npm test`, `npm run build`, `npm audit --omit=dev --audit-level=high`.
- Legacy SQLite data has been migrated once with `npm run migrate:sqlite` and row counts checked.
- `docker compose up --build` reaches a healthy app and applies migrations.
- `GET /api/health` returns 200 without a session, and 503 with Postgres stopped.
- `GET /api/resumes` returns 401 without a session.
- A signed-in user receives 404 for another user's resume id.
- Response headers include HSTS and Permissions-Policy and omit `X-Powered-By`.
- Uploading a renamed binary as `.pdf` returns 415; a file over 5 MB returns 413.
- The 21st model call within a minute returns 429.
- The image build does not run `db push` or the seed, and the container runs as `node`.
