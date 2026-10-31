# Environment

Copy `.env.example` and fill the values. Do not commit the real file.

| Variable | Required | Notes |
| --- | --- | --- |
| `DATABASE_URL` | yes | Postgres URL. Compose sets this inside the app service. |
| `BETTER_AUTH_SECRET` | yes | At least 32 characters on a public host. |
| `BETTER_AUTH_URL` | yes | Public origin, including `https://` on EC2. |
| `SEED_DEMO` | no | `true` only for a private demo. Never in production. |
| provider keys | no | Groq, OpenRouter, NVIDIA, OpenAI, or Anthropic. Missing keys use heuristic fallbacks. |
