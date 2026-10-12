'use client';

import React, { Component, ReactNode } from 'react';
import { ClerkProvider } from '@clerk/nextjs';
import { AuthProvider } from './AuthProvider';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

/**
 * Resilient Error Boundary that intercepts any Clerk initialization or cross-domain failures.
 * If Clerk fails (e.g. mobile Safari ITP, offline, ad-blocker, DNS/SSL error on CNAME),
 * it seamlessly falls back to LocalAuthProvider without ever crashing the application.
 */
class ClerkErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.warn('[SafeClerkProvider] Clerk failed to load or connect, gracefully falling back to LocalAuth:', error);
  }

  render() {
    if (this.state.hasError) {
      return <AuthProvider>{this.props.children}</AuthProvider>;
    }
    return this.props.children;
  }
}

export function SafeClerkProvider({
  children,
  publishableKey,
}: {
  children: ReactNode;
  publishableKey?: string;
}) {
  const cleanKey = (publishableKey || '').trim();
  const isValidClerk = Boolean(
    cleanKey &&
    cleanKey.startsWith('pk_') &&
    cleanKey.length > 20 &&
    !cleanKey.includes('callback.ai') &&
    !cleanKey.includes('your_clerk')
  );

  // If no valid publishable key exists, bypass ClerkProvider completely
  if (!isValidClerk) {
    return <AuthProvider>{children}</AuthProvider>;
  }

  // If running on a Vercel-hosted domain without a custom DNS CNAME, proxy through /__clerk
  const isVercelDomain = typeof window !== 'undefined' && window.location.hostname.includes('vercel.app');
  const proxyUrl = isVercelDomain ? '/__clerk' : undefined;

  return (
    <ClerkErrorBoundary>
      <ClerkProvider
        publishableKey={cleanKey}
        proxyUrl={proxyUrl}
        signInFallbackRedirectUrl="/dashboard"
        signUpFallbackRedirectUrl="/dashboard"
      >
        <AuthProvider>{children}</AuthProvider>
      </ClerkProvider>
    </ClerkErrorBoundary>
  );
}
