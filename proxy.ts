import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const clerkKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || '';
const isRealClerkKey = Boolean(
  clerkKey &&
  clerkKey.startsWith('pk_') &&
  !clerkKey.includes('callback.ai') &&
  !clerkKey.includes('your_clerk') &&
  clerkKey !== 'pk_test_Y2xlcmsuY2FsbGJhY2suYWkk'
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
]);

const middlewareHandler = isRealClerkKey
  ? clerkMiddleware(async (auth, request) => {
      if (!isPublicRoute(request)) {
        await auth.protect();
      }
    })
  : function fallbackMiddleware(req: NextRequest) {
      return NextResponse.next();
    };

export default middlewareHandler;

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
    '/__clerk/:path*',
  ],
};
