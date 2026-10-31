import { NextResponse } from 'next/server';
import { bad_request, guard_model, guard_user, not_found } from '@/lib/api-guard';
import { limits } from '@/lib/validate';
import { askLivingResumeAgent } from '@/lib/services/rag-agent-service';
import { get_owned_resume } from '@/lib/services/resume-service';

export async function POST(request: Request, props: { params: Promise<{ resumeId: string }> }) {
  const { user, response } = await guard_user();
  if (!user) return response;
  const limited = guard_model(user.id);
  if (limited) return limited;
  const params = await props.params;
  const owned = await get_owned_resume(user.id, params.resumeId);
  if (!owned) return not_found();
  try {
    const body = await request.json();
    const question = typeof body.question === 'string' ? body.question.trim() : '';
    if (!question) {
      return NextResponse.json({ error: 'Question string is required' }, { status: 400 });
    }
    if (question.length > limits.question) {
      return bad_request(`Question is longer than ${limits.question} characters`);
    }
    const answer = await askLivingResumeAgent(user.id, params.resumeId, question);
    return NextResponse.json({ answer });
  } catch (error) {
    console.error('Agent chat failed:', error);
    return NextResponse.json({ error: 'Agent chat failed' }, { status: 500 });
  }
}
