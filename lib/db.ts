import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

function createPrismaClient(): PrismaClient {
  try {
    const dbUrl = process.env.DATABASE_URL || '';
    const isRemote =
      dbUrl.startsWith('postgres') ||
      dbUrl.startsWith('mysql') ||
      dbUrl.startsWith('prisma://') ||
      dbUrl.startsWith('mongodb');

    if (!isRemote && (process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME)) {
      const tmpDbPath = '/tmp/dev.db';
      if (!fs.existsSync(tmpDbPath)) {
        const prismaDbPath = path.join(/*turbopackIgnore: true*/ process.cwd(), 'prisma', 'dev.db');
        if (fs.existsSync(prismaDbPath)) {
          try {
            fs.copyFileSync(prismaDbPath, tmpDbPath);
          } catch (err) {
            console.error('Error copying sqlite db to /tmp:', err);
          }
        }
      }
      return new PrismaClient({
        datasources: {
          db: {
            url: fs.existsSync(tmpDbPath) ? `file:${tmpDbPath}` : 'file:./prisma/dev.db',
          },
        },
        log: ['error'],
      });
    }
  } catch (e) {
    console.error('Failed to setup Vercel db path:', e);
  }

  const fallbackUrl = process.env.DATABASE_URL || 'file:./prisma/dev.db';
  return new PrismaClient({
    datasources: {
      db: {
        url: fallbackUrl,
      },
    },
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });
}

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const db = globalForPrisma.prisma || createPrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db;

