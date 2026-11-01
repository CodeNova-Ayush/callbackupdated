'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { auth_client } from '@/lib/auth-client';
import { clear_legacy_cover_letter_keys, read_legacy_cover_letters } from '@/lib/client-cover-letter-store';
import { clear_legacy_resume_keys, read_legacy_resumes } from '@/lib/client-resume-store';

const map_user = (session_user: { id: string; name: string; email: string; image?: string | null } | undefined) => {
  if (!session_user) return null;
  const parts = session_user.name.split(' ');
  return {
    id: session_user.id,
    fullName: session_user.name,
    firstName: parts[0] || session_user.name,
    lastName: parts.slice(1).join(' '),
    primaryEmailAddress: { emailAddress: session_user.email },
    imageUrl: session_user.image || '',
  };
};

const migrate_legacy_workspace = async () => {
  const resumes = read_legacy_resumes();
  const coverLetters = read_legacy_cover_letters();
  if (resumes.length === 0 && coverLetters.length === 0) return;
  const response = await fetch('/api/workspace/import-local', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ resumes, coverLetters }),
  });
  if (response.ok) {
    clear_legacy_resume_keys();
    clear_legacy_cover_letter_keys();
    localStorage.removeItem('is_authenticated');
    localStorage.removeItem('user_name');
    localStorage.removeItem('user_email');
  }
};

const cached_profile_prefixes = ['callback_ai_saved_resume_', 'active_resume_data', 'active_candidate_name', 'is_authenticated', 'user_name', 'user_email'];

// Resume content cached in the browser must not outlive the session on a shared machine.
const clear_cached_profile = () => {
  if (typeof window === 'undefined') return;
  clear_legacy_resume_keys();
  clear_legacy_cover_letter_keys();
  Object.keys(localStorage)
    .filter((key) => cached_profile_prefixes.some((prefix) => key.startsWith(prefix)))
    .forEach((key) => localStorage.removeItem(key));
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: session } = auth_client.useSession();
  useEffect(() => {
    if (session?.user) {
      migrate_legacy_workspace().catch((error) => {
        console.error('Legacy workspace import failed:', error);
      });
    }
  }, [session?.user?.id]);
  return <>{children}</>;
}

export function useAppAuth() {
  const { data: session, isPending } = auth_client.useSession();
  const user = map_user(session?.user);
  return {
    isLoaded: !isPending,
    isSignedIn: Boolean(session?.user),
    userId: user?.id || null,
    sessionId: session?.session?.id || null,
    signOut: async (options?: { redirectUrl?: string }) => {
      await auth_client.signOut();
      clear_cached_profile();
      if (options?.redirectUrl && typeof window !== 'undefined') {
        window.location.href = options.redirectUrl;
      }
    },
    getToken: async () => null,
  };
}

export function useAppUser() {
  const { data: session, isPending } = auth_client.useSession();
  return {
    isLoaded: !isPending,
    isSignedIn: Boolean(session?.user),
    user: map_user(session?.user),
  };
}

export const useUser = useAppUser;
export const useAuth = useAppAuth;
export const isRealClerkKey = false;

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
    ? user.fullName.split(' ').map((part: string) => part[0]).join('').slice(0, 2).toUpperCase()
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
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50">
          <div className="px-3 py-1.5 border-b border-slate-100">
            <p className="text-xs font-bold text-slate-800">{user?.fullName || 'Candidate'}</p>
            <p className="text-[10px] text-slate-400 truncate">{user?.primaryEmailAddress?.emailAddress}</p>
          </div>
          <Link href="/dashboard" onClick={() => setIsOpen(false)} className="block px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-50 font-medium">
            Dashboard
          </Link>
          <button
            type="button"
            onClick={async () => {
              await signOut();
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
