'use client';

import { SignUp } from '@clerk/nextjs';
import { Logo } from '@/components/ui/Logo';
import { ArrowRight } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useState } from 'react';

import { isRealClerkKey } from '@/components/auth/AuthProvider';

const hasClerkKey = isRealClerkKey;

function SignUpContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect_url') || '/welcome';

  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const authenticateAndProceed = (userIdentifier: string, name?: string) => {
    const finalName = name || userIdentifier.split('@')[0].replace(/[._-]/g, ' ') || 'Candidate';
    document.cookie = 'callback_auth=1; path=/; max-age=2592000; SameSite=Lax';
    if (typeof window !== 'undefined') {
      localStorage.setItem('is_authenticated', 'true');
      localStorage.setItem('user_name', finalName.charAt(0).toUpperCase() + finalName.slice(1));
      localStorage.setItem('user_email', userIdentifier.includes('@') ? userIdentifier : `${userIdentifier}@candidate.ai`);
    }
    router.push(redirectUrl);
  };

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailOrUsername) return;
    setIsSubmitting(true);
    setTimeout(() => {
      authenticateAndProceed(emailOrUsername, fullName);
    }, 400);
  };

  const handleSocialLogin = (provider: string) => {
    setIsSubmitting(true);
    setTimeout(() => {
      authenticateAndProceed(`${provider.toLowerCase()}_user@candidate.ai`, `${provider} Verified User`);
    }, 400);
  };

  return (
    <main className="min-h-screen bg-[#F8F9FA] flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden font-sans">
      {/* Ambient background glow */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#FF4B5E]/6 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -right-32 w-96 h-96 bg-[#1C152E]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-[#FF4B5E]/6 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md flex flex-col items-center gap-6 relative z-10">
        <Logo size="lg" showTagline />

        {hasClerkKey ? (
          /* Real Clerk SignUp Embed */
          <div className="w-full flex justify-center">
            <SignUp
              routing="path"
              path="/sign-up"
              signInUrl="/sign-in"
              forceRedirectUrl="/welcome"
              fallbackRedirectUrl="/welcome"
              appearance={{
                elements: {
                  cardBox: 'shadow-xl border border-slate-200/80 rounded-2xl bg-white w-full',
                  headerTitle: 'text-slate-900 font-extrabold',
                  headerSubtitle: 'text-slate-500 text-xs',
                  footerActionLink: 'text-[#FF4B5E] hover:text-[#E62A55] font-bold',
                  formButtonPrimary: 'bg-[#1C152E] hover:bg-[#2B1F45] text-white font-bold rounded-full shadow-xs',
                  socialButtonsBlockButton: 'border-slate-200 hover:bg-slate-50 text-slate-700 font-medium rounded-full',
                },
              }}
            />
          </div>
        ) : (
          /* Clean Sign Up Card */
          <div className="w-full bg-white border border-slate-200/90 rounded-3xl p-7 sm:p-8 shadow-xl shadow-slate-200/50 flex flex-col gap-4">
            <div className="flex flex-col text-left">
              <h2 className="text-2xl font-extrabold text-[#1C152E] tracking-tight">Create your account</h2>
              <p className="text-xs text-slate-500 mt-1 font-medium">
                Sign up to build, customize, and export your resume.
              </p>
            </div>

            {/* Google SSO Button */}
            <div>
              <button
                type="button"
                onClick={() => handleSocialLogin('Google')}
                disabled={isSubmitting}
                className="w-full h-11 px-4 bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-full text-xs font-semibold text-slate-700 flex items-center justify-center gap-2.5 shadow-2xs hover:shadow-xs transition-all cursor-pointer disabled:opacity-60"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.3 9 5 12 5z" />
                  <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z" />
                  <path fill="#FBBC05" d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.5.4-2.3L1.9 7.3C.7 9.7 0 12.3 0 15.2s.7 5.5 1.9 7.9l3.7-2.9z" />
                  <path fill="#34A853" d="M12 23.5c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.3-6.4-5.2L1.9 16.5C3.7 20.2 7.5 23.5 12 23.5z" />
                </svg>
                <span>Sign up with Google</span>
              </button>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-slate-200" />
              <span className="text-[11px] text-slate-400 font-medium">or</span>
              <div className="flex-1 h-px bg-slate-200" />
            </div>

            {/* Credentials Form */}
            <form onSubmit={handleAuthSubmit} className="flex flex-col gap-3">
              <div>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  placeholder="Full name"
                  className="w-full px-3.5 h-11 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#1C152E] focus:bg-white transition-all font-medium"
                />
              </div>

              <div>
                <input
                  type="text"
                  value={emailOrUsername}
                  onChange={(e) => setEmailOrUsername(e.target.value)}
                  required
                  placeholder="Email address"
                  className="w-full px-3.5 h-11 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#1C152E] focus:bg-white transition-all font-medium"
                />
              </div>

              <div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full px-3.5 h-11 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#1C152E] focus:bg-white transition-all font-medium"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !emailOrUsername}
                className="w-full h-11 mt-1 bg-[#1C152E] hover:bg-[#2B1F45] active:scale-[0.98] disabled:opacity-50 text-white font-bold text-xs rounded-full shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{isSubmitting ? 'Continuing...' : 'Create Account'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500 pt-1 border-t border-slate-100">
              <span>Already registered?</span>
              <button
                type="button"
                onClick={() => router.push('/sign-in')}
                className="font-bold text-[#FF4B5E] hover:underline cursor-pointer"
              >
                Sign In
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default function SignUpPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center text-slate-500 font-bold">Loading Sign Up...</div>}>
      <SignUpContent />
    </Suspense>
  );
}
