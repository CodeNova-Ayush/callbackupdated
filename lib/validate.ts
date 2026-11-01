export const limits = {
  title: 200,
  shortField: 200,
  tone: 40,
  question: 2_000,
  bullet: 1_000,
  coverLetterExperience: 5_000,
  jdText: 20_000,
  rawText: 50_000,
  jsonBytes: 100_000,
} as const;

export class ValidationError extends Error {}

// Returns a trimmed string, the fallback when the value is absent, or throws when it is the wrong type or too long.
export const text = (value: unknown, max: number, fallback = '') => {
  if (value === undefined || value === null || value === '') return fallback;
  if (typeof value !== 'string') throw new ValidationError('Expected text');
  const trimmed = value.trim();
  if (trimmed.length > max) throw new ValidationError(`Text is longer than ${max} characters`);
  return trimmed;
};

export const json_within = (value: unknown, max_bytes: number = limits.jsonBytes) => {
  const size = Buffer.byteLength(JSON.stringify(value ?? null), 'utf8');
  if (size > max_bytes) throw new ValidationError(`Payload is larger than ${Math.round(max_bytes / 1000)} KB`);
  return value;
};

export const integer = (value: unknown) => {
  if (typeof value !== 'number' || !Number.isInteger(value) || value < 0) throw new ValidationError('Expected a non-negative integer');
  return value;
};

export const one_of = <T extends string>(value: unknown, allowed: readonly T[], fallback: T): T => {
  if (value === undefined || value === null || value === '') return fallback;
  if (typeof value !== 'string' || !allowed.includes(value as T)) throw new ValidationError('Unsupported value');
  return value as T;
};
