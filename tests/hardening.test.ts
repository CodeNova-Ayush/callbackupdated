import assert from 'node:assert/strict';
import { bucket_count, limit_request, reset_buckets } from '../lib/rate-limit';
import { integer, json_within, one_of, text, ValidationError } from '../lib/validate';
import { detect_upload_kind } from '../lib/upload';
import { assert_auth_secret } from '../lib/auth/secret';

reset_buckets();
for (let i = 0; i < 3; i += 1) assert.equal(limit_request('model:a', 3), true);
assert.equal(limit_request('model:a', 3), false);
assert.equal(limit_request('model:b', 3), true);

reset_buckets();
for (let i = 0; i < 5_001; i += 1) limit_request(`expired:${i}`, 1, -1);
limit_request('fresh', 1);
assert.ok(bucket_count() < 10, 'expired buckets are pruned once the map grows past the threshold');

assert.equal(text('  hi  ', 10), 'hi');
assert.equal(text(undefined, 10, 'fallback'), 'fallback');
assert.throws(() => text('x'.repeat(11), 10), ValidationError);
assert.throws(() => text(42, 10), ValidationError);
assert.throws(() => json_within({ big: 'x'.repeat(200) }, 100), ValidationError);
assert.equal(integer(3), 3);
assert.throws(() => integer('3'), ValidationError);
assert.throws(() => integer(-1), ValidationError);
assert.equal(one_of(undefined, ['a', 'b'] as const, 'a'), 'a');
assert.throws(() => one_of('c', ['a', 'b'] as const, 'a'), ValidationError);

assert.equal(detect_upload_kind(Buffer.from('%PDF-1.7\n...')), 'pdf');
assert.equal(detect_upload_kind(Buffer.from([0x50, 0x4b, 0x03, 0x04, 0x14])), 'docx');
assert.equal(detect_upload_kind(Buffer.from('Ada Lovelace\nEngineer')), 'text');
assert.equal(detect_upload_kind(Buffer.from([0x4d, 0x5a, 0x90, 0x00])), null, 'binary such as a renamed .exe is rejected');

const strong = 'k'.repeat(44);
assert.doesNotThrow(() => assert_auth_secret({ NODE_ENV: 'development' }));
assert.doesNotThrow(() => assert_auth_secret({ NODE_ENV: 'production', NEXT_PHASE: 'phase-production-build' }));
assert.doesNotThrow(() => assert_auth_secret({ NODE_ENV: 'production', BETTER_AUTH_SECRET: strong }));
assert.throws(() => assert_auth_secret({ NODE_ENV: 'production' }));
assert.throws(() => assert_auth_secret({ NODE_ENV: 'production', BETTER_AUTH_SECRET: 'short' }));
assert.throws(() => assert_auth_secret({ NODE_ENV: 'production', BETTER_AUTH_SECRET: 'local-only-change-before-public-ec2-use' }));

console.log('hardening checks passed');
