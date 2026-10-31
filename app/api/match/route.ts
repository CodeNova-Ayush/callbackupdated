import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { bad_request, guard_model, guard_user, not_found } from '@/lib/api-guard';
import { matchResumeWithJD } from '@/lib/services/jd-match-service';
import { parseAndImportOldResume } from '@/lib/services/resume-importer';
import { assert_request_size, text_from_upload, upload_error_response } from '@/lib/upload';
import { limits, text, ValidationError } from '@/lib/validate';

export async function POST(request: Request) {
  const { user, response } = await guard_user();
  if (!user) return response;
  const limited = guard_model(user.id);
  if (limited) return limited;
  try {
    assert_request_size(request);
    const contentType = request.headers.get('content-type') || '';
    let resumeId = '';
    let jdText = '';
    let uploadedFileName = '';

    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      const file = formData.get('file');
      jdText = text(formData.get('jdText'), limits.jdText);
      const existingResumeId = text(formData.get('resumeId'), limits.shortField);
      if (file instanceof File && file.size > 0) {
        uploadedFileName = text(file.name, limits.shortField);
        const rawResumeText = await text_from_upload(file);
        if (!rawResumeText.trim()) {
          return NextResponse.json({ error: 'Uploaded file could not be parsed.' }, { status: 400 });
        }
        const imported = await parseAndImportOldResume(user.id, rawResumeText.slice(0, limits.rawText), undefined, uploadedFileName);
        resumeId = imported.resumeId;
      } else if (existingResumeId) {
        resumeId = existingResumeId;
      }
    } else {
      const body = await request.json();
      resumeId = text(body.resumeId, limits.shortField);
      jdText = text(body.jdText, limits.jdText);
    }

    if (!jdText.trim()) {
      return NextResponse.json({ error: 'Please provide a target job description.' }, { status: 400 });
    }

    if (!resumeId) {
      const latest = await db.resume.findFirst({
        where: { userId: user.id },
        orderBy: { updatedAt: 'desc' },
      });
      if (!latest) {
        return NextResponse.json({ error: 'Create a resume before matching a job description.' }, { status: 400 });
      }
      resumeId = latest.id;
    }

    const match = await matchResumeWithJD(user.id, resumeId, jdText);
    return NextResponse.json({ success: true, resumeId, uploadedFileName, match });
  } catch (error) {
    if (error instanceof ValidationError) return bad_request(error.message);
    const upload = upload_error_response(error);
    if (upload) return NextResponse.json({ error: upload.error }, { status: upload.status });
    if (error instanceof Error && error.message === 'RESUME_NOT_FOUND') return not_found();
    console.error('Match error in api/match:', error instanceof Error ? error.message : 'unknown error');
    return NextResponse.json({ error: 'Failed to calculate job description match.' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  const { user, response } = await guard_user();
  if (!user) return response;
  const { searchParams } = new URL(request.url);
  const resumeId = searchParams.get('resumeId');
  const resumes = await db.resume.findMany({
    where: { userId: user.id },
    select: { id: true, title: true, updatedAt: true },
    orderBy: { updatedAt: 'desc' },
    take: 20,
  });
  let latestMatch = null;
  if (resumeId) {
    latestMatch = await db.matchResult.findFirst({
      where: { resumeId, resume: { userId: user.id } },
      orderBy: { createdAt: 'desc' },
      include: { jobDescription: true },
    });
  }
  return NextResponse.json({ resumes, latestMatch });
}
