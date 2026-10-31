import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { guard_user, not_found } from '@/lib/api-guard';

export async function POST(_request: Request, props: { params: Promise<{ id: string }> }) {
  const { user, response } = await guard_user();
  if (!user) return response;
  const params = await props.params;
  const existing = await db.resume.findFirst({ where: { id: params.id, userId: user.id } });
  if (!existing) return not_found();
  await db.$transaction([
    db.resume.updateMany({ where: { userId: user.id }, data: { isActive: false } }),
    db.resume.update({ where: { id: existing.id }, data: { isActive: true } }),
  ]);
  return NextResponse.json({ success: true });
}
