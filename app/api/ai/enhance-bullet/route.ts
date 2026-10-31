import { NextResponse } from 'next/server';
import { enhanceBulletPoint } from '@/lib/services/ai-assist-service';
import { bad_request, guard_model, guard_user } from '@/lib/api-guard';
import { limits, text, ValidationError } from '@/lib/validate';

export async function POST(request: Request) {
  const { user, response } = await guard_user();
  if (!user) return response;
  const limited = guard_model(user.id);
  if (limited) return limited;
  try {
    let input;
    try {
      const body = await request.json();
      input = {
        originalBullet: text(body.originalBullet || body.bullet || body.text, limits.bullet),
        role: text(body.role, limits.shortField) || undefined,
        company: text(body.company, limits.shortField) || undefined,
        targetSkill: text(body.targetSkill, limits.shortField) || undefined,
      };
    } catch (error) {
      return bad_request(error instanceof ValidationError ? error.message : 'Invalid request body');
    }
    if (!input.originalBullet) {
      return NextResponse.json({ error: 'Valid bullet or speech text string is required' }, { status: 400 });
    }
    const result = await enhanceBulletPoint(input);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Enhancement API route error:', error instanceof Error ? error.message : 'unknown error');
    return NextResponse.json({
      enhancedBullet: 'Led key initiatives, driving measurable improvements and high operational impact.',
      improvements: ['Applied executive phrasing'],
      extractedSkills: ['Leadership', 'Problem Solving'],
      degraded: true,
    }, { status: 200 });
  }
}
