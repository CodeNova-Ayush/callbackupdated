import { PrismaClient } from '@prisma/client';

const global_for_prisma = globalThis as unknown as { prisma?: PrismaClient };

const create_prisma_client = () =>
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  });

export const db = global_for_prisma.prisma || create_prisma_client();

if (process.env.NODE_ENV !== 'production') global_for_prisma.prisma = db;
