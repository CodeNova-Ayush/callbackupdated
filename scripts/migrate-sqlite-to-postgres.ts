// One-off copy of the legacy SQLite database (prisma/dev.db) into Postgres.
// Usage: npm run migrate:sqlite [-- path/to/dev.db] [-- --allow-remote]
// Idempotent: every row is upserted on its id, so re-running leaves counts unchanged.
import { createRequire } from 'node:module';
import path from 'node:path';
import { db } from '../lib/db';
import { map_sqlite_tables, type SqliteRow } from './sqlite-migration-map';

// node:sqlite ships with Node 22.5+, but the pinned @types/node predates its declarations.
interface SqliteDatabase {
  prepare(sql: string): { all(): unknown[] };
  close(): void;
}
const { DatabaseSync } = createRequire(import.meta.url)('node:sqlite') as {
  DatabaseSync: new (file: string, options: { readOnly: boolean }) => SqliteDatabase;
};

const LOCAL_HOSTS = new Set(['localhost', '127.0.0.1', '::1', '[::1]', 'postgres', 'db']);

function read_sqlite(file: string): Record<string, SqliteRow[]> {
  const sqlite = new DatabaseSync(file, { readOnly: true });
  try {
    const tables = sqlite
      .prepare(`SELECT name FROM sqlite_master WHERE type = 'table' AND name NOT LIKE 'sqlite_%' AND name NOT LIKE '\\_prisma%' ESCAPE '\\'`)
      .all() as { name: string }[];
    const rows: Record<string, SqliteRow[]> = {};
    for (const { name } of tables) {
      rows[name] = sqlite.prepare(`SELECT * FROM "${name}"`).all() as SqliteRow[];
    }
    return rows;
  } finally {
    sqlite.close();
  }
}

function assert_local_database(allow_remote: boolean) {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error('DATABASE_URL is not set');
  const host = new URL(url).hostname;
  if (!LOCAL_HOSTS.has(host) && !allow_remote) {
    throw new Error(`Refusing to write to non-local host "${host}". Pass --allow-remote to confirm.`);
  }
}

async function main() {
  const args = process.argv.slice(2);
  const allow_remote = args.includes('--allow-remote');
  const file = path.resolve(args.find((arg) => !arg.startsWith('--')) || 'prisma/dev.db');
  assert_local_database(allow_remote);

  const tables = map_sqlite_tables(read_sqlite(file));
  const users = tables.find((table) => table.model === 'User')?.rows || [];

  // A Postgres user with the same email but another id would break the unique index mid-transaction.
  const clashes = await db.user.count({
    where: { OR: users.map((user) => ({ email: user.email as string, NOT: { id: user.id as string } })) },
  });
  if (users.length && clashes) {
    throw new Error(`${clashes} SQLite user email(s) already belong to different Postgres users. Nothing written.`);
  }

  await db.$transaction(
    async (tx) => {
      for (const { model, rows } of tables) {
        const delegate = (tx as unknown as Record<string, { upsert: (args: unknown) => Promise<unknown> }>)[
          model.charAt(0).toLowerCase() + model.slice(1)
        ];
        for (const row of rows) {
          await delegate.upsert({ where: { id: row.id }, create: row, update: row });
        }
      }
    },
    { timeout: 120_000 },
  );

  for (const { model, rows } of tables) {
    const delegate = (db as unknown as Record<string, { count: () => Promise<number> }>)[
      model.charAt(0).toLowerCase() + model.slice(1)
    ];
    console.log(`${model}: ${rows.length} from SQLite, ${await delegate.count()} in Postgres`);
  }

  if (users.length) {
    console.log(
      `${users.length} migrated user(s) have no Better Auth credential. ` +
        'Sign-up rejects their existing email, so they need a password reset (configure sendResetPassword) to reach their data.',
    );
  }
}

main()
  .catch((error) => {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  })
  .finally(() => db.$disconnect());
