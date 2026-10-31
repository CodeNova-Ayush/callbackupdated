import { NextResponse } from 'next/server';
import { guard_model, guard_user, not_found } from '@/lib/api-guard';
import { analyzeResume } from '@/lib/services/ats-service';
import { get_owned_resume } from '@/lib/services/resume-service';

export async function POST(_request: Request, props: { params: Promise<{ id: string }> }) {
  const { user, response } = await guard_user();
  if (!user) return response;
  const limited = guard_model(user.id);
  if (limited) return limited;
  const params = await props.params;
  const owned = await get_owned_resume(user.id, params.id);
  if (!owned) return not_found();
  try {
    const analysis = await analyzeResume(user.id, params.id);
    return NextResponse.json({ analysis });
  } catch (error) {
    console.error('Resume analysis failed:', error);
    return NextResponse.json({ error: 'Analysis failed' }, { status: 500 });
  }
}
