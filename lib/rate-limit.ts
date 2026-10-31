type Bucket = { count: number; reset_at: number };

// In-memory, so limits are per process. Fine for the single EC2 container; nginx limit_req is the outer layer.
const buckets = new Map<string, Bucket>();
const prune_threshold = 5_000;

const prune_expired = (now: number) => {
  for (const [key, bucket] of buckets) {
    if (bucket.reset_at < now) buckets.delete(key);
  }
};

export const limit_request = (key: string, max = 20, window_ms = 60_000) => {
  const now = Date.now();
  if (buckets.size > prune_threshold) prune_expired(now);
  const current = buckets.get(key);
  if (!current || current.reset_at < now) {
    buckets.set(key, { count: 1, reset_at: now + window_ms });
    return true;
  }
  if (current.count >= max) return false;
  current.count += 1;
  return true;
};

export const bucket_count = () => buckets.size;

export const reset_buckets = () => buckets.clear();
