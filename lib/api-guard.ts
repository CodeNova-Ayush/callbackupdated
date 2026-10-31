import { NextResponse } from 'next/server';
import { require_user } from '@/lib/auth/require-user';
import { limit_request } from '@/lib/rate-limit';

export const unauthorized = () => NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

export const not_found = () => NextResponse.json({ error: 'Not found' }, { status: 404 });

export const too_many_requests = () => NextResponse.json({ error: 'Too many requests' }, { status: 429 });

export const guard_user = async () => {
  const user = await require_user();
  if (!user) return { user: null, response: unauthorized() };
  return { user, response: null as null };
};

export const bad_request = (error: string) => NextResponse.json({ error }, { status: 400 });

export const guard_model = (user_id: string) => {
  if (!limit_request(`model:${user_id}`)) return too_many_requests();
  return null;
};

export const guard_write = (user_id: string) => {
  if (!limit_request(`write:${user_id}`, 60)) return too_many_requests();
  return null;
};

export const guard_bulk = (user_id: string) => {
  if (!limit_request(`bulk:${user_id}`, 5, 10 * 60_000)) return too_many_requests();
  return null;
};
