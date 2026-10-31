import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { bad_request, guard_bulk, guard_user } from '@/lib/api-guard';
import { letter_fields } from '@/lib/cover-letter-payload';
import { json_within, limits, text, ValidationError } from '@/lib/validate';

const MAX_ITEMS = 50;
const MAX_BODY_BYTES = 2_000_000;

const as_record = (value: unknown) => (value && typeof value === 'object' ? value as Record<string, unknown> : {});

export async function POST(request: Request) {
  const { user, response } = await guard_user();
  if (!user) return response;
  const limited = guard_bulk(user.id);
  if (limited) return limited;
  try {
    const body = as_record(json_within(await request.json(), MAX_BODY_BYTES));
    const resumes = Array.isArray(body.resumes) ? body.resumes : [];
    const letters = Array.isArray(body.coverLetters) ? body.coverLetters : [];
    if (resumes.length > MAX_ITEMS || letters.length > MAX_ITEMS) {
      return bad_request(`Import at most ${MAX_ITEMS} resumes and ${MAX_ITEMS} cover letters at once`);
    }

    const resume_writes = resumes.map((item) => {
      const record = as_record(item);
      const sections = as_record(record.parsedSections);
      return db.resume.create({
        data: {
          userId: user.id,
          title: text(record.title, limits.title, 'Imported resume'),
          template: text(record.template, limits.shortField, 'classic_ats'),
          isActive: false,
          sections: {
            create: [
              { sectionType: 'personal_info', order: 0, content: JSON.stringify(sections.personalInfo || {}) },
              { sectionType: 'experience', order: 1, content: JSON.stringify(sections.experience || []) },
              { sectionType: 'education', order: 2, content: JSON.stringify(sections.education || []) },
              { sectionType: 'skills', order: 3, content: JSON.stringify(sections.skills || []) },
              { sectionType: 'projects', order: 4, content: JSON.stringify(sections.projects || []) },
              { sectionType: 'certifications', order: 5, content: JSON.stringify(sections.certifications || []) },
            ],
          },
        },
      });
    });
    const letter_writes = letters.map((item) =>
      db.coverLetter.create({ data: { userId: user.id, ...letter_fields(as_record(item)) } })
    );

    // All or nothing, so a failed import can be retried without leaving half the workspace behind.
    const created = await db.$transaction([...resume_writes, ...letter_writes]);
    const resumeIds = created.slice(0, resume_writes.length).map((row) => row.id);
    return NextResponse.json({ success: true, resumeIds });
  } catch (error) {
    if (error instanceof ValidationError) return bad_request(error.message);
    console.error('Local workspace import failed:', error instanceof Error ? error.message : 'unknown error');
    return NextResponse.json({ error: 'Failed to import local workspace' }, { status: 500 });
  }
}
