// Pure row mapping from the old SQLite schema (prisma/dev.db) to the Postgres schema.
// Kept free of Prisma and node:sqlite imports so tests can run without a database.

export type SqliteRow = Record<string, unknown>;

export interface MappedTable {
  model: string;
  rows: Record<string, unknown>[];
}

// Insert order respects foreign keys: parents before children.
export const MIGRATION_ORDER = [
  'User',
  'JobPosting',
  'Resume',
  'ResumeSection',
  'SkillGraph',
  'JobDescription',
  'MatchResult',
  'AnalysisResult',
  'VerificationClaim',
  'EmbeddingChunk',
  'AgentConversation',
  'ApplicationDraft',
] as const;

const DATE_COLUMNS = new Set(['createdAt', 'updatedAt']);
const BOOLEAN_COLUMNS = new Set(['isActive']);

// Old columns with no home in the Postgres schema.
const DROPPED_COLUMNS: Record<string, string[]> = {
  // Better Auth keeps passwords on Account, and the old hash format is not compatible.
  User: ['passwordHash'],
};

// Prisma's SQLite connector stores DateTime as epoch milliseconds; older rows may be ISO text.
export function to_date(value: unknown): Date {
  if (value instanceof Date) return value;
  if (typeof value === 'number' || typeof value === 'bigint') return new Date(Number(value));
  if (typeof value === 'string') {
    const date = /^\d+$/.test(value) ? new Date(Number(value)) : new Date(value.replace(' ', 'T'));
    if (!Number.isNaN(date.getTime())) return date;
  }
  throw new Error(`Unparseable SQLite date value of type ${typeof value}`);
}

export function map_sqlite_row(table: string, row: SqliteRow): Record<string, unknown> {
  const dropped = DROPPED_COLUMNS[table] || [];
  const mapped: Record<string, unknown> = {};

  for (const [column, value] of Object.entries(row)) {
    if (dropped.includes(column)) continue;
    if (value === null || value === undefined) mapped[column] = null;
    else if (DATE_COLUMNS.has(column)) mapped[column] = to_date(value);
    else if (BOOLEAN_COLUMNS.has(column)) mapped[column] = Boolean(Number(value));
    else if (typeof value === 'bigint') mapped[column] = Number(value);
    else mapped[column] = value;
  }

  if (table === 'User') mapped.emailVerified = false;
  return mapped;
}

export function map_sqlite_tables(tables: Record<string, SqliteRow[]>): MappedTable[] {
  const unknown = Object.keys(tables).filter(
    (table) => tables[table].length > 0 && !(MIGRATION_ORDER as readonly string[]).includes(table),
  );
  if (unknown.length) throw new Error(`No mapping for SQLite tables with data: ${unknown.join(', ')}`);

  return MIGRATION_ORDER.filter((model) => tables[model]?.length).map((model) => ({
    model,
    rows: tables[model].map((row) => map_sqlite_row(model, row)),
  }));
}
