import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { bad_request, guard_user, guard_write, not_found } from '@/lib/api-guard';
import { letter_fields, letter_payload } from '@/lib/cover-letter-payload';
import { ValidationError } from '@/lib/validate';

export async function GET(_request: Request, props: { params: Promise<{ id: string }> }) {
  const { user, response } = await guard_user();
  if (!user) return response;
  const params = await props.params;
  const row = await db.coverLetter.findFirst({ where: { id: params.id, userId: user.id } });
  if (!row) return not_found();
  return NextResponse.json({ letter: letter_payload(row) });
}

export async function PATCH(request: Request, props: { params: Promise<{ id: string }> }) {
  const { user, response } = await guard_user();
  if (!user) return response;
  const limited = guard_write(user.id);
  if (limited) return limited;
  const params = await props.params;
  const existing = await db.coverLetter.findFirst({ where: { id: params.id, userId: user.id } });
  if (!existing) return not_found();
  try {
    const body = await request.json();
    const row = await db.coverLetter.update({
      where: { id: existing.id },
      data: letter_fields(body, existing),
    });
    return NextResponse.json({ letter: letter_payload(row) });
  } catch (error) {
    if (error instanceof ValidationError) return bad_request(error.message);
    console.error('Failed to update cover letter:', error instanceof Error ? error.message : 'unknown error');
    return NextResponse.json({ error: 'Failed to update cover letter' }, { status: 500 });
  }
}

export async function DELETE(_request: Request, props: { params: Promise<{ id: string }> }) {
  const { user, response } = await guard_user();
  if (!user) return response;
  const params = await props.params;
  const existing = await db.coverLetter.findFirst({ where: { id: params.id, userId: user.id } });
  if (!existing) return not_found();
  await db.coverLetter.delete({ where: { id: existing.id } });
  return NextResponse.json({ success: true });
}
