import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { bad_request, guard_user, guard_write, not_found } from '@/lib/api-guard';
import { limits, text, ValidationError } from '@/lib/validate';
import { format_resume_list_item, getUserResumes } from '@/lib/services/resume-service';

export async function GET() {
  const { user, response } = await guard_user();
  if (!user) return response;
  const resumes = await getUserResumes(user.id);
  return NextResponse.json({ resumes: resumes.map(format_resume_list_item) });
}

export async function POST(request: Request) {
  const { user, response } = await guard_user();
  if (!user) return response;
  const limited = guard_write(user.id);
  if (limited) return limited;
  try {
    const body = await request.json();
    const title = text(body.title, limits.title, 'Untitled Resume');
    const template = text(body.template, limits.shortField, 'classic_ats');
    await db.resume.updateMany({ where: { userId: user.id, isActive: true }, data: { isActive: false } });
    const resume = await db.resume.create({
      data: {
        userId: user.id,
        title,
        template,
        isActive: true,
        sections: {
          create: [
            { sectionType: 'personal_info', order: 0, content: JSON.stringify({ fullName: user.name, email: user.email }) },
            { sectionType: 'experience', order: 1, content: '[]' },
            { sectionType: 'education', order: 2, content: '[]' },
            { sectionType: 'skills', order: 3, content: '[]' },
            { sectionType: 'projects', order: 4, content: '[]' },
          ],
        },
      },
    });
    return NextResponse.json({ success: true, id: resume.id, resume });
  } catch (error) {
    if (error instanceof ValidationError) return bad_request(error.message);
    console.error('Failed to create resume:', error instanceof Error ? error.message : 'unknown error');
    return NextResponse.json({ error: 'Failed to create resume' }, { status: 500 });
  }
}

export const empty_not_found = not_found;
