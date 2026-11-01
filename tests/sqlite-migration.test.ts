import assert from 'node:assert/strict';
import { map_sqlite_row, map_sqlite_tables, to_date } from '../scripts/sqlite-migration-map';

const user = map_sqlite_row('User', {
  id: 'u1',
  email: 'a@example.com',
  passwordHash: 'hash',
  name: 'Ada',
  role: 'candidate',
  createdAt: 1791776794680,
  updatedAt: 1791776794680,
});
assert.equal('passwordHash' in user, false);
assert.equal(user.emailVerified, false);
assert.ok(user.createdAt instanceof Date);
assert.equal((user.createdAt as Date).getTime(), 1791776794680);

const resume = map_sqlite_row('Resume', { id: 'r1', userId: 'u1', isActive: 0, createdAt: '2026-10-30 12:00:00', updatedAt: 1 });
assert.equal(resume.isActive, false);
assert.equal((resume.createdAt as Date).toISOString(), new Date('2026-10-30T12:00:00').toISOString());

const claim = map_sqlite_row('VerificationClaim', { id: 'c1', resumeSectionId: null, specificityScore: BigInt(75) });
assert.equal(claim.resumeSectionId, null);
assert.equal(claim.specificityScore, 75);

assert.throws(() => to_date('not a date'));

const ordered = map_sqlite_tables({
  ResumeSection: [{ id: 's1', resumeId: 'r1' }],
  Resume: [{ id: 'r1', userId: 'u1' }],
  User: [{ id: 'u1', email: 'a@example.com' }],
  AgentConversation: [],
});
assert.deepEqual(ordered.map((table) => table.model), ['User', 'Resume', 'ResumeSection']);

assert.throws(() => map_sqlite_tables({ Mystery: [{ id: 'x' }] }), /Mystery/);
assert.doesNotThrow(() => map_sqlite_tables({ Mystery: [] }));

console.log('sqlite migration mapping checks passed');
