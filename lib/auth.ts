import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { db } from '@/lib/db';
import { assert_auth_secret } from '@/lib/auth/secret';

assert_auth_secret(process.env);

const is_production = process.env.NODE_ENV === 'production';

export const auth = betterAuth({
  database: prismaAdapter(db, { provider: 'postgresql' }),
  trustedOrigins: process.env.BETTER_AUTH_URL ? [process.env.BETTER_AUTH_URL] : [],
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 10,
    maxPasswordLength: 128,
  },
  user: {
    additionalFields: {
      role: {
        type: 'string',
        defaultValue: 'candidate',
        input: false,
      },
    },
  },
  advanced: {
    useSecureCookies: is_production,
    database: {
      generateId: 'uuid',
    },
  },
});
