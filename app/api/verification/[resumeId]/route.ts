import { NextResponse } from 'next/server';
import { guard_user, not_found } from '@/lib/api-guard';
import { getVerificationSummary } from '@/lib/services/verification-service';
import { get_owned_resume } from '@/lib/services/resume-service';

export async function GET(_request: Request, props: { params: Promise<{ resumeId: string }> }) {
  const { user, response } = await guard_user();
  if (!user) return response;
  const params = await props.params;
  const owned = await get_owned_resume(user.id, params.resumeId);
  if (!owned) return not_found();
  try {
    const summary = await getVerificationSummary(user.id, params.resumeId);
    return NextResponse.json({ summary });
  } catch (error) {
    console.error('Verification summary failed:', error);
    return NextResponse.json({ error: 'Verification summary failed' }, { status: 500 });
  }
}
