'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import Link from 'next/link';
import { ClerkProvider as RealClerkProvider, useAuth as useRealAuth, useUser as useRealUser } from '@clerk/nextjs';

const rawKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || '';
export const isRealClerkKey = Boolean(
  rawKey &&
  rawKey.startsWith('pk_') &&
  !rawKey.includes('callback.ai') &&
  !rawKey.includes('your_clerk') &&
  rawKey !== 'pk_test_Y2xlcmsuY2FsbGJhY2suYWkk'
);

const DEFAULT_USER = {
  id: 'user_alex_rivera',
  fullName: 'Alex Rivera',
  firstName: 'Alex',
  lastName: 'Rivera',
  primaryEmailAddress: { emailAddress: 'alex.rivera@neuralflow.ai' },
  imageUrl: '',
};

interface AuthContextType {
  isSignedIn: boolean;
  isLoaded: boolean;
  user: typeof DEFAULT_USER | null;
  signOut: () => Promise<void>;
  login: (userIdentifier: string, name?: string) => void;
}

const LocalAuthContext = createContext<AuthContextType>({
  isSignedIn: false,
  isLoaded: true,
  user: null,
  signOut: async () => {},
  login: () => {},
});

function LocalAuthProvider({ children }: { children: React.ReactNode }) {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [user, setUser] = useState<typeof DEFAULT_USER | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isAuth = localStorage.getItem('is_authenticated') === 'true';
      const storedName = localStorage.getItem('user_name');
      const storedEmail = localStorage.getItem('user_email');
      if (isAuth && storedEmail && !storedEmail.includes('neuralflow.ai')) {
        setIsSignedIn(true);
        setUser({
          ...DEFAULT_USER,
          id: 'user_' + (storedEmail ? storedEmail.split('@')[0] : 'candidate'),
          fullName: storedName || DEFAULT_USER.fullName,
          firstName: storedName ? storedName.split(' ')[0] : DEFAULT_USER.firstName,
          lastName: storedName ? storedName.split(' ').slice(1).join(' ') : DEFAULT_USER.lastName,
          primaryEmailAddress: { emailAddress: storedEmail },
        });
      } else {
        setIsSignedIn(false);
        setUser(null);
      }
      setIsLoaded(true);
    }
  }, []);

  const login = (userIdentifier: string, name?: string) => {
    const finalName = name || userIdentifier.split('@')[0].replace(/[._-]/g, ' ') || 'Candidate';
    const capName = finalName.charAt(0).toUpperCase() + finalName.slice(1);
    const email = userIdentifier.includes('@') ? userIdentifier : `${userIdentifier}@candidate.ai`;
    if (typeof window !== 'undefined') {
      localStorage.setItem('is_authenticated', 'true');
      localStorage.setItem('user_name', capName);
      localStorage.setItem('user_email', email);
      document.cookie = 'callback_auth=1; path=/; max-age=2592000; SameSite=Lax';
    }
    setIsSignedIn(true);
    setUser({
      ...DEFAULT_USER,
      id: 'user_' + email.split('@')[0],
      fullName: capName,
      firstName: capName.split(' ')[0],
      lastName: capName.split(' ').slice(1).join(' '),
      primaryEmailAddress: { emailAddress: email },
    });
  };

  const signOut = async () => {
    setIsSignedIn(false);
    setUser(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('is_authenticated');
      localStorage.removeItem('user_name');
      localStorage.removeItem('user_email');
      document.cookie = 'callback_auth=; path=/; max-age=0';
    }
  };

  return (
    <LocalAuthContext.Provider
      value={{
        isSignedIn,
        isLoaded,
        user: isSignedIn ? user : null,
        signOut,
        login,
      }}
    >
      {children}
    </LocalAuthContext.Provider>
  );
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  if (isRealClerkKey) {
    return <RealClerkProvider>{children}</RealClerkProvider>;
  }
  return <LocalAuthProvider>{children}</LocalAuthProvider>;
}

export function useAppAuth() {
  const localCtx = useContext(LocalAuthContext);
  if (isRealClerkKey) {
    try {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const realAuth = useRealAuth();
      return {
        ...realAuth,
        login: localCtx.login,
      };
    } catch {
      // fallback
    }
  }
  return {
    isLoaded: localCtx.isLoaded,
    isSignedIn: localCtx.isSignedIn,
    userId: localCtx.user?.id || null,
    sessionId: 'sess_local_dev',
    signOut: localCtx.signOut,
    login: localCtx.login,
    getToken: async () => 'mock_dev_token',
  };
}

export function useAppUser() {
  const localCtx = useContext(LocalAuthContext);
  if (isRealClerkKey) {
    try {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const realUser = useRealUser();
      return {
        ...realUser,
        login: localCtx.login,
      };
    } catch {
      // fallback
    }
  }
  return {
    isLoaded: localCtx.isLoaded,
    isSignedIn: localCtx.isSignedIn,
    user: localCtx.user,
    login: localCtx.login,
  };
}

export const useUser = useAppUser;
export const useAuth = useAppAuth;

export function UserButton({ afterSignOutUrl = '/' }: { afterSignOutUrl?: string }) {
  const { isSignedIn, signOut } = useAppAuth();
  const { user } = useAppUser();
  const [isOpen, setIsOpen] = useState(false);

  if (!isSignedIn) {
    return (
      <Link
        href="/sign-in"
        className="px-3.5 py-1.5 rounded-full bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 font-bold text-xs shadow-2xs hover:shadow-xs transition-all cursor-pointer flex items-center gap-1.5"
      >
        <span>Sign In</span>
      </Link>
    );
  }

  const initials = user?.fullName
    ? user.fullName
        .split(' ')
        .map((n: string) => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : 'U';

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-8 h-8 rounded-full bg-[#1C152E] text-white flex items-center justify-center font-bold text-xs shadow-xs hover:ring-2 hover:ring-[#1C152E]/20 transition-all cursor-pointer"
      >
        {initials}
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
          <div className="px-3 py-1.5 border-b border-slate-100">
            <p className="text-xs font-bold text-slate-800">{user?.fullName || 'Candidate'}</p>
            <p className="text-[10px] text-slate-400 truncate">{user?.primaryEmailAddress?.emailAddress || 'candidate@pwioi.com'}</p>
          </div>
          <Link
            href="/dashboard"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-50 font-medium"
          >
            Dashboard
          </Link>
          <button
            type="button"
            onClick={async () => {
              if (signOut) await signOut();
              setIsOpen(false);
              window.location.href = afterSignOutUrl;
            }}
            className="w-full text-left px-3 py-1.5 text-xs text-rose-600 hover:bg-rose-50 font-bold cursor-pointer"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}
