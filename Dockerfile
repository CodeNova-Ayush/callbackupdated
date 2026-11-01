FROM node:22-bookworm-slim AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --ignore-scripts

FROM node:22-bookworm-slim AS builder
RUN apt-get update && apt-get install -y openssl ca-certificates && rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# prisma generate only needs a syntactically valid URL; it never connects.
ARG BUILD_DATABASE_URL=postgresql://build:build@localhost:5432/build
RUN DATABASE_URL="$BUILD_DATABASE_URL" npx prisma generate && DATABASE_URL="$BUILD_DATABASE_URL" npx next build

FROM node:22-bookworm-slim AS runner
RUN apt-get update && apt-get install -y openssl ca-certificates && rm -rf /var/lib/apt/lists/*
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma
# Only the Prisma CLI and its engines, for `migrate deploy` at startup.
COPY --from=builder /app/node_modules/prisma /opt/prisma/node_modules/prisma
COPY --from=builder /app/node_modules/@prisma /opt/prisma/node_modules/@prisma
COPY --from=builder /app/prisma /opt/prisma/prisma
COPY --from=builder /app/package.json /opt/prisma/package.json
COPY docker/entrypoint.sh ./entrypoint.sh
RUN chmod +x entrypoint.sh
USER node
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --start-period=30s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:3000/api/health').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"
CMD ["./entrypoint.sh"]
