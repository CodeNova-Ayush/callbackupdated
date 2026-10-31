import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { bad_request, guard_user, guard_write } from '@/lib/api-guard';
import { letter_fields, letter_payload } from '@/lib/cover-letter-payload';
import { ValidationError } from '@/lib/validate';

export async function GET() {
  const { user, response } = await guard_user();
  if (!user) return response;
  const rows = await db.coverLetter.findMany({
    where: { userId: user.id },
    orderBy: { updatedAt: 'desc' },
  });
  return NextResponse.json({ letters: rows.map(letter_payload) });
}

export async function POST(request: Request) {
  const { user, response } = await guard_user();
  if (!user) return response;
  const limited = guard_write(user.id);
  if (limited) return limited;
  try {
    const body = await request.json();
    const row = await db.coverLetter.create({
      data: { userId: user.id, ...letter_fields(body) },
    });
    return NextResponse.json({ letter: letter_payload(row) });
  } catch (error) {
    if (error instanceof ValidationError) return bad_request(error.message);
    console.error('Failed to create cover letter:', error instanceof Error ? error.message : 'unknown error');
    return NextResponse.json({ error: 'Failed to create cover letter' }, { status: 500 });
  }
}
