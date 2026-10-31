'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, X } from 'lucide-react';
import { isRealClerkKey, useAppAuth } from './AuthProvider';
import { auth_client } from '@/lib/auth-client';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  title?: string;
  subtitle?: string;
}

export function AuthModal({
  isOpen,
  onClose,
  onSuccess,
  title,
  subtitle,
}: AuthModalProps) {
  const { isSignedIn } = useAppAuth();
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const hasTriggeredRef = useRef(false);

  // Automatically trigger success callback as soon as Clerk or local session is active
  useEffect(() => {
    if (!isOpen) {
      hasTriggeredRef.current = false;
      return;
    }
    if (isSignedIn && !hasTriggeredRef.current) {
      hasTriggeredRef.current = true;
      onSuccess();
    }
  }, [isSignedIn, isOpen, onSuccess]);

  if (!isOpen) return null;

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!emailOrUsername || !password) return;
    setIsSubmitting(true);
    const result = isSignUpMode
      ? await auth_client.signUp.email({
          email: emailOrUsername,
          password,
          name: fullName || emailOrUsername.split('@')[0],
        })
      : await auth_client.signIn.email({ email: emailOrUsername, password });
    setIsSubmitting(false);
    if (!result.error) onSuccess();
  };

  const handleSocialClick = (_provider: string) => {
    return;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      {/* Background click to dismiss */}
      <div className="fixed inset-0 -z-10" onClick={onClose} />

      <div className={`w-full ${isRealClerkKey ? 'max-w-[440px]' : 'max-w-[360px]'} bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-7 shadow-2xl relative flex flex-col gap-3.5 animate-in zoom-in-95 duration-150 font-sans max-h-[92vh] overflow-y-auto`}>
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-400 hover:text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

          {/* Fallback Local Form */}
          <>
            <div className="text-left pr-6">
              <h2 className="text-xl font-extrabold text-[#1C152E] tracking-tight">
                {title || (isSignUpMode ? 'Create an account' : 'Welcome back')}
              </h2>
              <p className="text-xs text-slate-500 mt-1 font-medium">
                {subtitle || (isSignUpMode ? 'Sign up to save and export your resume.' : 'Sign in to save and export your resume.')}
              </p>
            </div>

            {/* Google SSO Button */}
            <div>
              <button
                type="button"
                onClick={() => handleSocialClick('Google')}
                disabled={isSubmitting}
                className="w-full h-10 px-4 bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-full text-xs font-semibold text-slate-700 flex items-center justify-center gap-2.5 shadow-2xs hover:shadow-xs transition-all cursor-pointer disabled:opacity-60"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.3 9 5 12 5z" />
                  <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z" />
                  <path fill="#FBBC05" d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.5.4-2.3L1.9 7.3C.7 9.7 0 12.3 0 15.2s.7 5.5 1.9 7.9l3.7-2.9z" />
                  <path fill="#34A853" d="M12 23.5c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.3-6.4-5.2L1.9 16.5C3.7 20.2 7.5 23.5 12 23.5z" />
                </svg>
                <span>{isSignUpMode ? 'Sign up with Google' : 'Continue with Google'}</span>
              </button>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-slate-200" />
              <span className="text-[11px] text-slate-400 font-medium">or</span>
              <div className="flex-1 h-px bg-slate-200" />
            </div>

            <form onSubmit={handleFormSubmit} className="flex flex-col gap-2.5">
              {isSignUpMode && (
                <div>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    placeholder="Full name"
                    className="w-full px-3.5 h-10 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#1C152E] focus:bg-white transition-all font-medium"
                  />
                </div>
              )}

              <div>
                <input
                  type="text"
                  value={emailOrUsername}
                  onChange={(e) => setEmailOrUsername(e.target.value)}
                  required
                  placeholder="Email address"
                  className="w-full px-3.5 h-10 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#1C152E] focus:bg-white transition-all font-medium"
                />
              </div>

              <div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full px-3.5 h-10 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#1C152E] focus:bg-white transition-all font-medium"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !emailOrUsername}
                className="w-full h-10 mt-1 bg-[#1C152E] hover:bg-[#2B1F45] active:scale-[0.98] disabled:opacity-50 text-white font-semibold text-xs rounded-full shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>
                  {isSubmitting
                    ? 'Continuing...'
                    : isSignUpMode
                    ? 'Create account'
                    : 'Sign in'}
                </span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>

            <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500 pt-1 border-t border-slate-100">
              <span>{isSignUpMode ? 'Already have an account?' : "Don't have an account?"}</span>
              <button
                type="button"
                onClick={() => setIsSignUpMode(!isSignUpMode)}
                className="font-semibold text-[#FF4B5E] hover:underline cursor-pointer"
              >
                {isSignUpMode ? 'Sign in' : 'Sign up'}
              </button>
            </div>
          </>
      </div>
    </div>
  );
}
