# How to deploy CallBack.ai

Follow these steps in order. Do not skip any step.

The app runs in Docker on one server (for example an AWS EC2 machine). Docker starts two things: the app and a Postgres database.

---

## 1. Before you start

- Get a Linux server (Ubuntu 22.04 or newer works well). At least 2 GB of RAM.
- Get a domain name, for example `callback.example.com`.
- Point the domain to the server's public IP address (add an `A` record in your DNS settings).
- In the server firewall (on AWS this is the "Security Group"), open only these ports:
  - `22` for SSH (allow only your own IP if you can)
  - `80` for HTTP
  - `443` for HTTPS
- Do **not** open port `3000` or `5432` to the internet.

---

## 2. Install the tools on the server

- Log in to the server:

```bash
ssh ubuntu@YOUR_SERVER_IP
```

- Install Docker and Docker Compose:

```bash
curl -fsSL https://get.docker.com | sh
```

```bash
sudo usermod -aG docker $USER
```

- Log out and log in again so the Docker group change works.
- Check Docker works:

```bash
docker compose version
```

- Install git if it is missing:

```bash
sudo apt-get update && sudo apt-get install -y git
```

---

## 3. Get the code

```bash
git clone https://github.com/CodeNova-Ayush/callbackupdated.git
```

```bash
cd callbackupdated
```

- Switch to the branch you want to deploy (use `main` once this work is merged):

```bash
git checkout main
```

---

## 4. Create the `.env` file

- Copy the example file:

```bash
cp .env.example .env
```

- Make two strong random values. Run this command **two times** and copy each result:

```bash
openssl rand -base64 32
```

- Open the file:

```bash
nano .env
```

- Fill in the values like this:

| Name | Required? | What to put |
|---|---|---|
| `BETTER_AUTH_SECRET` | Yes | The first random value. At least 32 characters. Never reuse it. Never share it. |
| `BETTER_AUTH_URL` | Yes | Your full site address with https, for example `https://callback.example.com`. No slash at the end. |
| `POSTGRES_PASSWORD` | Yes | The second random value. This is the database password. |
| `DATABASE_URL` | No (Docker builds it for you) | Leave it as it is. Only used if you run the app without Docker. |
| `SEED_DEMO` | No | Keep it `false` in production. |
| `SEED_DEMO_PASSWORD` | No | Leave empty in production. |
| `GROQ_API_KEY` | Optional | Key for Groq AI. Tried first. |
| `NVIDIA_API_KEY` | Optional | Key for NVIDIA AI. |
| `OPENROUTER_API_KEY` | Optional | Key for OpenRouter AI. |
| `OPENAI_API_KEY` | Optional | Key for OpenAI. |
| `ANTHROPIC_API_KEY` | Optional | Key for Anthropic (Claude). |

- Notes about the AI keys:
  - Add at least one AI key, or the AI features will only give simple template answers.
  - Each request tries at most 2 AI providers, in the order shown above.
- Do **not** add `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` or `CLERK_SECRET_KEY`. Login now uses Better Auth, not Clerk.
- Save the file (in nano: `Ctrl+O`, `Enter`, then `Ctrl+X`).
- Lock the file so only you can read it:

```bash
chmod 600 .env
```

- Never commit `.env` to git. It is already in `.gitignore`.

---

## 5. Start the app

```bash
docker compose up -d --build
```

- The first build takes a few minutes.
- Docker will stop with an error if `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL` or `POSTGRES_PASSWORD` is missing. If that happens, fix `.env` and run the command again.
- When the app starts, it creates or updates the database tables by itself (`prisma migrate deploy`). You do not need to run this by hand.
- Check that both containers are running and healthy:

```bash
docker compose ps
```

- Check the health page (from the server itself):

```bash
curl http://localhost:3000/api/health
```

- You should see `{"status":"ok","database":"ok"}`.
- If you see `503` or `"database":"unreachable"`, the app cannot reach Postgres. Look at the logs (step 9).

---

## 6. Add HTTPS with Caddy

The app must be served over HTTPS. Login cookies and security headers need it. Caddy gets a free certificate for you.

- Install Caddy:

```bash
sudo apt-get install -y caddy
```

- Open the Caddy config:

```bash
sudo nano /etc/caddy/Caddyfile
```

- Replace everything in the file with this (use your real domain):

```
callback.example.com {
    request_body {
        max_size 6MB
    }
    reverse_proxy localhost:3000
}
```

- Restart Caddy:

```bash
sudo systemctl restart caddy
```

- Open `https://callback.example.com` in your browser. You should see the app with a lock icon.
- If you prefer nginx, see `docs/02-deployment.md`. It has an nginx example with extra rate limits.

---

## 7. Move the old data (only once, only if you have `prisma/dev.db`)

Old users and resumes live in an old SQLite file called `prisma/dev.db`. It is not in git anymore, so you must copy it to the server yourself.

- On **your own computer**, copy the file to the server:

```bash
scp prisma/dev.db ubuntu@YOUR_SERVER_IP:~/callbackupdated/prisma/dev.db
```

- On the **server**, run the move script inside a temporary Node container. Replace `YOUR_POSTGRES_PASSWORD` with the value from `.env`:

```bash
docker run --rm --network callbackupdated_default -v "$PWD":/app -w /app node:22 sh -c "npm ci && DATABASE_URL=postgresql://callback:YOUR_POSTGRES_PASSWORD@postgres:5432/callback npx tsx scripts/migrate-sqlite-to-postgres.ts --allow-remote"
```

- The script prints how many rows it copied for each table. Check the numbers look right.
- It is safe to run again. A second run changes nothing.
- When the numbers are correct, delete the file from the server:

```bash
rm prisma/dev.db
```

- Important: old users **cannot log in yet**. Their old passwords could not be moved. They will need a "reset password" feature, which is not built yet. Their resumes are kept and will show up once they can log in.
- If your network name is different, find it with `docker network ls` (look for the one ending in `_default`).

---

## 8. Final checks

Do all of these in the browser at your https address:

- Sign up a new account and log in.
- Import a resume (paste text or upload a PDF).
- Open the resume in the builder.
- Run the ATS analyzer.
- Run the JD matcher.
- Ask the resume agent a question.
- Log out and log in again.

Also check these from your own computer:

```bash
curl -I https://callback.example.com
```

- You should see `strict-transport-security` and `permissions-policy` in the output.
- You should **not** see `x-powered-by`.

```bash
curl -i https://callback.example.com/api/resumes
```

- You should get `401` (because you are not logged in). This means the data is protected.

---

## 9. Everyday commands

- See the app logs:

```bash
docker compose logs -f app
```

- See the database logs:

```bash
docker compose logs -f postgres
```

- Restart the app:

```bash
docker compose restart app
```

- Stop everything (data is kept):

```bash
docker compose down
```

- **Never** run `docker compose down -v`. The `-v` deletes the database for ever.

---

## 10. Deploy a new version

```bash
cd ~/callbackupdated
```

```bash
git pull
```

```bash
docker compose up -d --build
```

- New database changes are applied by themselves when the app starts.
- Check health again:

```bash
curl http://localhost:3000/api/health
```

---

## 11. Back up the database

- Make a backup file:

```bash
docker compose exec -T postgres pg_dump -U callback callback > backup-$(date +%F).sql
```

- Copy the backup off the server (run on your own computer):

```bash
scp ubuntu@YOUR_SERVER_IP:~/callbackupdated/backup-*.sql .
```

- Do this at least once a day. Keep backups somewhere safe, not only on the server.
- To restore a backup:

```bash
docker compose exec -T postgres psql -U callback callback < backup-YYYY-MM-DD.sql
```

---

## 12. Rules to remember

- Run only **one** app container. The rate limits live in the app's memory, so two copies would each have their own limits.
- Keep `.env` secret. If it leaks, make new values for `BETTER_AUTH_SECRET` and `POSTGRES_PASSWORD` and restart. Changing the secret logs everyone out.
- Do not open ports `3000` or `5432` to the internet. Only Caddy (ports 80 and 443) should be public.
- Keep `SEED_DEMO=false` in production.
- Before each release, make sure CI is green on GitHub (lint, typecheck, tests, build).
