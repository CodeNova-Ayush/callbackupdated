# Deployment

Local and EC2 both use the same Compose file. Postgres is not published to the host. The app listens on port 3000.

```bash
cp .env.example .env   # then fill BETTER_AUTH_SECRET, POSTGRES_PASSWORD, BETTER_AUTH_URL
docker compose up --build
```

Compose refuses to start without `BETTER_AUTH_SECRET`, `POSTGRES_PASSWORD` and `BETTER_AUTH_URL`. The server also refuses to boot in production with a missing, short (< 32 chars) or placeholder auth secret. Generate one with `openssl rand -base64 32`.

The app container waits for a healthy Postgres 16 service, runs `prisma migrate deploy`, then starts the Next.js standalone server as the `node` user. The image has a `HEALTHCHECK` on `/api/health`, which returns 503 when Postgres is unreachable. The image build runs `prisma generate` and `next build`. It does not run `db push` or the seed.

## Edge

Put TLS in front of the app with Caddy or nginx. The app sends HSTS, so serve it only over https. The app rate limits per user in memory (one container): 20 model calls/min, 60 writes/min, 5 bulk imports per 10 min. Add an outer per-IP `limit_req` in nginx, for example:

```nginx
limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;
limit_req_zone $binary_remote_addr zone=auth:10m rate=10r/m;
location /api/auth/ { limit_req zone=auth burst=5 nodelay; proxy_pass http://app:3000; }
location /api/      { limit_req zone=api burst=20 nodelay; client_max_body_size 6m; proxy_pass http://app:3000; }
```

Running more than one app container needs a shared rate-limit store first.

Optional model keys come from `.env`. Missing keys keep the heuristic fallbacks, and those responses carry `degraded: true`.
