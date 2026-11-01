import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { bad_request, guard_user, guard_write, not_found } from '@/lib/api-guard';
import { section_belongs_to_user, updateResumeSection } from '@/lib/services/resume-service';
import { json_within, ValidationError } from '@/lib/validate';

export async function PATCH(request: Request, props: { params: Promise<{ id: string }> }) {
  const { user, response } = await guard_user();
  if (!user) return response;
  const limited = guard_write(user.id);
  if (limited) return limited;
  const params = await props.params;
  try {
    const body = await request.json();
    const updated = await updateResumeSection(user.id, params.id, json_within(body.content));
    if (!updated) return not_found();
    return NextResponse.json({ section: updated });
  } catch (error) {
    if (error instanceof ValidationError) return bad_request(error.message);
    console.error('Failed to update section:', error instanceof Error ? error.message : 'unknown error');
    return NextResponse.json({ error: 'Failed to update section' }, { status: 500 });
  }
}

export async function DELETE(_request: Request, props: { params: Promise<{ id: string }> }) {
  const { user, response } = await guard_user();
  if (!user) return response;
  const params = await props.params;
  const owned = await section_belongs_to_user(user.id, params.id);
  if (!owned) return not_found();
  await db.resumeSection.delete({ where: { id: params.id } });
  return NextResponse.json({ success: true });
}
