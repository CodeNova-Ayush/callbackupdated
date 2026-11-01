import { NextResponse } from 'next/server';
import { bad_request, guard_model, guard_user } from '@/lib/api-guard';
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
    let rawText = '';
    let customTitle: string | undefined;
    let fileName: string | undefined;

    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      const file = formData.get('file');
      customTitle = text(formData.get('customTitle'), limits.title) || undefined;
      const directText = text(formData.get('rawText'), limits.rawText);
      if (file instanceof File && file.size > 0) {
        fileName = text(file.name, limits.shortField);
        rawText = await text_from_upload(file);
      }
      if (!rawText && directText) rawText = directText;
    } else {
      const body = await request.json();
      rawText = text(body.rawText, limits.rawText);
      customTitle = text(body.customTitle, limits.title) || undefined;
      fileName = text(body.fileName, limits.shortField) || undefined;
    }

    if (!rawText.trim()) {
      return NextResponse.json(
        { error: 'Please provide valid resume text or upload a readable PDF/DOCX/TXT file.' },
        { status: 400 }
      );
    }

    const result = await parseAndImportOldResume(user.id, rawText.slice(0, limits.rawText), customTitle, fileName);
    return NextResponse.json({
      success: true,
      ...result,
      flagshipUrls: {
        builder: `/builder/${result.resumeId}`,
        atsAudit: `/analyzer/${result.resumeId}`,
        jdMatcher: `/jd-match/${result.resumeId}`,
      },
    });
  } catch (error) {
    if (error instanceof ValidationError) return bad_request(error.message);
    const upload = upload_error_response(error);
    if (upload) return NextResponse.json({ error: upload.error }, { status: upload.status });
    console.error('Failed to import old resume:', error instanceof Error ? error.message : 'unknown error');
    return NextResponse.json({ error: 'Failed to parse and import resume.' }, { status: 500 });
  }
}
