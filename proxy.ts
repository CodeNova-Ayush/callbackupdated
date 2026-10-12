import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const clerkKey =
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ||
  'pk_test_ZmFpci1wZWFjb2NrLTIxLmNsZXJrLmFjY291bnRzLmRldiQ';
const clerkSecret =
  process.env.CLERK_SECRET_KEY ||
  'sk_test_l49C9JjgW4CY2KV3OP7Q5IOEpNmMmYJvVXkkyfqTLq';

const isRealClerkConfig = Boolean(
  clerkKey &&
  clerkKey.startsWith('pk_') &&
  !clerkKey.includes('callback.ai') &&
  !clerkKey.includes('your_clerk') &&
  clerkSecret &&
  clerkSecret.startsWith('sk_')
);

const isPublicRoute = createRouteMatcher([
  '/',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/api/(.*)',
  '/welcome',
  '/get-started',
  '/builder(.*)',
  '/agent(.*)',
  '/analyzer(.*)',
  '/jd-match(.*)',
  '/opportunities(.*)',
  '/recruiter-dashboard(.*)',
  '/skill-graph(.*)',
  '/trust-score(.*)',
  '/voice-intake(.*)',
  '/dashboard(.*)',
  '/cover-letter(.*)',
  '/import-resume(.*)',
]);

const clerkHandler = isRealClerkConfig
  ? clerkMiddleware(
      async (auth, request) => {
        if (!isPublicRoute(request)) {
          await auth.protect();
        }
      },
      { publishableKey: clerkKey, secretKey: clerkSecret }
    )
  : null;

export async function proxy(request: NextRequest, event: any) {
  if (clerkHandler) {
    try {
      const response = await clerkHandler(request, event);
      if (response) {
        return response;
      }
    } catch (err) {
      console.error('Clerk proxy handled error, continuing:', err);
      return NextResponse.next();
    }
  }
  return NextResponse.next();
}

export default proxy;

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
    '/__clerk/:path*',
  ],
};
