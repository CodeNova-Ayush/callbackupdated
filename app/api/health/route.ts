import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await db.$queryRaw`SELECT 1`;
    return NextResponse.json({ status: 'ok', database: 'ok' });
  } catch (error) {
    console.error('Health check database probe failed:', error instanceof Error ? error.message : 'unknown error');
    return NextResponse.json({ status: 'degraded', database: 'unreachable' }, { status: 503 });
  }
}
