import { NextResponse } from 'next/server';
import { bad_request, guard_user, not_found } from '@/lib/api-guard';
import { integer, limits, text, ValidationError } from '@/lib/validate';
import { reorderSections } from '@/lib/services/resume-service';

export async function POST(request: Request) {
  const { user, response } = await guard_user();
  if (!user) return response;
  try {
    const body = await request.json();
    const raw = Array.isArray(body.orders) ? body.orders : [];
    if (raw.length > 50) return bad_request('Too many sections');
    const orders = raw.map((item: { id?: unknown; order?: unknown }) => ({
      id: text(item?.id, limits.shortField),
      order: integer(item?.order),
    }));
    const updated = await reorderSections(user.id, orders);
    if (!updated) return not_found();
    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof ValidationError) return bad_request(error.message);
    console.error('Failed to reorder sections:', error instanceof Error ? error.message : 'unknown error');
    return NextResponse.json({ error: 'Failed to reorder sections' }, { status: 500 });
  }
}
