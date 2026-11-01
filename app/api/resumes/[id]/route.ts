import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { bad_request, guard_user, guard_write, not_found } from '@/lib/api-guard';
import { json_within, limits, text, ValidationError } from '@/lib/validate';
import { get_owned_resume } from '@/lib/services/resume-service';

const content_string = (value: unknown) => (typeof value === 'string' ? value : JSON.stringify(value ?? {}));

export async function GET(_request: Request, props: { params: Promise<{ id: string }> }) {
  const { user, response } = await guard_user();
  if (!user) return response;
  const params = await props.params;
  const resume = await get_owned_resume(user.id, params.id);
  if (!resume) return not_found();
  return NextResponse.json({ resume });
}

export async function POST(request: Request, props: { params: Promise<{ id: string }> }) {
  const { user, response } = await guard_user();
  if (!user) return response;
  const params = await props.params;
  const existing = await get_owned_resume(user.id, params.id);
  if (!existing) return not_found();
  const limited = guard_write(user.id);
  if (limited) return limited;
  try {
    const body = json_within(await request.json(), limits.jsonBytes * 3) as Record<string, unknown>;
    const title = text(body.title, limits.title, existing.title);
    const template = text(body.template, limits.shortField, existing.template);
    const section_defs = [
      { sectionType: 'personal_info', order: 0, content: body.personalInfo || {} },
      { sectionType: 'experience', order: 1, content: body.experiences || body.experience || [] },
      { sectionType: 'education', order: 2, content: body.education || [] },
      { sectionType: 'skills', order: 3, content: body.skills || [] },
      { sectionType: 'projects', order: 4, content: body.projects || [] },
      { sectionType: 'certifications', order: 5, content: body.certifications || [] },
    ];
    await db.$transaction([
      db.resumeSection.deleteMany({ where: { resumeId: existing.id } }),
      db.resume.update({
        where: { id: existing.id },
        data: {
          title,
          template,
          sections: {
            create: section_defs.map((section) => ({
              sectionType: section.sectionType,
              order: section.order,
              content: content_string(section.content),
            })),
          },
        },
      }),
    ]);
    const resume = await get_owned_resume(user.id, existing.id);
    return NextResponse.json({ success: true, resume });
  } catch (error) {
    if (error instanceof ValidationError) return bad_request(error.message);
    console.error('Failed to sync resume:', error instanceof Error ? error.message : 'unknown error');
    return NextResponse.json({ error: 'Failed to sync resume' }, { status: 500 });
  }
}
