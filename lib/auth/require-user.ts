import { headers } from 'next/headers';
import { auth } from '@/lib/auth';
import { db } from '@/lib/db';

export const require_user = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user?.id) return null;
  return db.user.findUnique({ where: { id: session.user.id } });
};
