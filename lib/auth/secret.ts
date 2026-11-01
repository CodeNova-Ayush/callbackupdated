// Placeholder values that have shipped in this repo's examples. A server running with one of these
// signs sessions with a key anyone can read on GitHub.
export const known_placeholder_secrets = ['local-only-change-before-public-ec2-use', 'change-me', 'secret'];

type SecretEnv = { BETTER_AUTH_SECRET?: string; NODE_ENV?: string; NEXT_PHASE?: string };

// Throws when the auth secret is unsafe for a production server. `next build` also runs with
// NODE_ENV=production but never signs a session, so the build phase must not be blocked.
export const assert_auth_secret = (env: SecretEnv) => {
  // TODO(human): decide when to throw.
};
