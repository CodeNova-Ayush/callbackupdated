# Database

Prisma uses PostgreSQL through `DATABASE_URL`. `lib/db.ts` is the only client. Local Compose uses database `callback` on the `postgres` service and stores data in the `pgdata` volume.

Schema changes ship as SQL in `prisma/migrations`. The container runs `prisma migrate deploy`. Do not use `db push --accept-data-loss`.

`Resume` and `CoverLetter` rows belong to a user. Queries include `userId`. A foreign id returns 404. The seed runs only when `SEED_DEMO=true` and `NODE_ENV` is not `production`. It creates at most one demo user and never deletes existing rows.

## Migrating the old SQLite data

`prisma/dev.db` holds data from before the Postgres move. `npm run migrate:sqlite` copies every table with rows into the database in `DATABASE_URL`, in one transaction, upserting on `id`. Running it again changes nothing. Pass another file path as the first argument to read a different SQLite file. The script refuses non-local hosts unless you pass `--allow-remote`.

Old users keep their ids, so their resumes stay attached, but `passwordHash` is dropped: Better Auth stores credentials on `Account` and cannot read the old hash. These users have no way to sign in yet. Sign-up rejects an email that already exists, so they need a password reset, which requires `sendResetPassword` in `lib/auth.ts`. The script prints how many users are affected. It stops before writing if a Postgres user already owns one of the emails under a different id.

Delete `prisma/dev.db` only after the counts it prints match.
