# Authentication

Identity is Better Auth email and password. The server instance is `lib/auth.ts`. The browser client is `lib/auth-client.ts`. Routes are mounted at `app/api/auth/[...all]/route.ts`.

`BETTER_AUTH_SECRET` must be at least 32 characters in a public deployment. `BETTER_AUTH_URL` is the origin the browser uses.

The workspace layout calls `auth.api.getSession` and redirects anonymous visitors to `/sign-in`. Every API route except `/api/auth/*` and `GET /api/health` returns 401 without a session. `lib/auth/require-user.ts` is the only place a route learns `userId`.

Sign-up cannot set `role`. The field defaults to `candidate` and is not an input. There is no anonymous demo user.
