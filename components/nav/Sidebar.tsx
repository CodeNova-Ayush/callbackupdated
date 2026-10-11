'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAppAuth as useAuth, useAppUser as useUser } from '@/components/auth/AuthProvider';
import {
  LayoutDashboard,
  FileText,
  Sparkles,
  Target,
  Upload,
  LogOut,
  Menu,
  X,
  Mail,
} from 'lucide-react';
import { Logo } from '@/components/ui/Logo';
import { clsx } from 'clsx';
import { getActiveStoredResume } from '@/lib/client-resume-store';

interface NavGroup {
  groupName: string;
  items: {
    name: string;
    href: string;
    icon: React.ElementType;
    badge?: string;
  }[];
}

export const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const { signOut } = useAuth();
  const { isLoaded, user } = useUser();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const resumeIdMatch = pathname.match(/\/(builder|analyzer|jd-match)\/([^\/]+)/);
  const [activeResumeId, setActiveResumeId] = useState<string>(() => {
    if (resumeIdMatch) return resumeIdMatch[2];
    if (typeof window !== 'undefined') {
      return localStorage.getItem('active_resume_id') || 'demo-resume-alex-1';
    }
    return 'demo-resume-alex-1';
  });

  React.useEffect(() => {
    if (resumeIdMatch) {
      if (resumeIdMatch[2] !== 'demo-resume-alex-1') {
        setActiveResumeId(resumeIdMatch[2]);
        if (typeof window !== 'undefined') {
          localStorage.setItem('active_resume_id', resumeIdMatch[2]);
        }
      }
    } else if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('active_resume_id');
      if (stored) setActiveResumeId(stored);
    }
  }, [pathname, resumeIdMatch]);

  React.useEffect(() => {
    const handleStorageChange = () => {
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem('active_resume_id');
        if (stored) setActiveResumeId(stored);
      }
    };
    window.addEventListener('active_resume_changed', handleStorageChange);
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('active_resume_changed', handleStorageChange);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const [candidateName, setCandidateName] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('active_candidate_name') || 'Candidate Profile';
    }
    return 'Candidate Profile';
  });
  const [candidateEmail, setCandidateEmail] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('active_candidate_email') || 'candidate@callback.ai';
    }
    return 'candidate@callback.ai';
  });

  const syncIdentityFromStorage = () => {
    if (typeof window !== 'undefined') {
      const activeStored = getActiveStoredResume();
      if (activeStored) {
        if (activeStored.candidateName && activeStored.candidateName !== 'Candidate Profile') {
          setCandidateName(activeStored.candidateName);
        }
        if (activeStored.candidateEmail) {
          setCandidateEmail(activeStored.candidateEmail);
        }
        if (activeStored.id) {
          setActiveResumeId(activeStored.id);
        }
        return;
      }

      const storedName = localStorage.getItem('active_candidate_name');
      const storedEmail = localStorage.getItem('active_candidate_email');
      const storedId = localStorage.getItem('active_resume_id');
      if (storedName && storedName !== 'Alex Rivera') setCandidateName(storedName);
      if (storedEmail && !storedEmail.includes('alex.rivera')) setCandidateEmail(storedEmail);
      if (storedId) setActiveResumeId(storedId);
    }
  };

  React.useEffect(() => {
    syncIdentityFromStorage();
    const handleStorageChange = () => {
      syncIdentityFromStorage();
    };
    window.addEventListener('active_resume_changed', handleStorageChange);
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('active_resume_changed', handleStorageChange);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  React.useEffect(() => {
    if (!isLoaded || !user) return;

    const primaryEmail = user.primaryEmailAddress?.emailAddress || (user as any).emailAddresses?.[0]?.emailAddress;
    const name = user.fullName || user.firstName || primaryEmail?.split('@')[0];
    if (name && (candidateName === 'Candidate Profile' || candidateName === 'Alex Rivera')) {
      setCandidateName(name);
      if (typeof window !== 'undefined') localStorage.setItem('active_candidate_name', name);
    }
    if (primaryEmail && (candidateEmail === 'candidate@callback.ai' || candidateEmail.includes('alex.rivera'))) {
      setCandidateEmail(primaryEmail);
      if (typeof window !== 'undefined') localStorage.setItem('active_candidate_email', primaryEmail);
    }
  }, [isLoaded, user]);

  React.useEffect(() => {
    if (!activeResumeId || activeResumeId === 'demo-resume-alex-1') {
      const activeStored = getActiveStoredResume();
      if (activeStored && activeStored.id !== 'demo-resume-alex-1') {
        setActiveResumeId(activeStored.id);
        setCandidateName(activeStored.candidateName);
        if (activeStored.candidateEmail) setCandidateEmail(activeStored.candidateEmail);
      }
      return;
    }

    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('callback_ai_saved_resume_' + activeResumeId);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (parsed.personalInfo?.fullName) {
            setCandidateName(parsed.personalInfo.fullName);
          }
          if (parsed.personalInfo?.email) {
            setCandidateEmail(parsed.personalInfo.email);
          }
          return;
        } catch {}
      }
    }

    fetch(`/api/resumes/${activeResumeId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.resume && data.resume.id !== 'demo-resume-alex-1') {
          let name = '';
          if (data.resume.sections) {
            const pInfo = data.resume.sections.find((s: any) => s.sectionType === 'personal_info');
            if (pInfo) {
              try {
                const parsed = typeof pInfo.content === 'string' ? JSON.parse(pInfo.content) : pInfo.content;
                if (parsed.fullName || parsed.name) name = parsed.fullName || parsed.name;
                if (parsed.email && !parsed.email.includes('alex.rivera')) setCandidateEmail(parsed.email);
              } catch {}
            }
          }
          if (!name && data.resume.title) {
            name = data.resume.title.split('—')[0].trim();
          }
          if (name && name !== 'Alex Rivera') {
            setCandidateName(name);
            if (typeof window !== 'undefined') {
              localStorage.setItem('active_candidate_name', name);
            }
          }
        }
      })
      .catch(() => {});
  }, [activeResumeId]);

  // Close mobile drawer on navigation
  React.useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const initials =
    candidateName
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2) || 'CP';

  // Minimal, highly-optimized navigation groups for production launch
  const navGroups: NavGroup[] = [
    {
      groupName: 'Resume Workspace',
      items: [
        { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
        { name: 'Resume Builder', href: '/builder', icon: FileText },
        { name: 'Cover Letter', href: '/cover-letter', icon: Mail, badge: 'New' },
        { name: 'Upload & Audit', href: '/import-resume', icon: Upload, badge: 'ATS Audit' },
      ],
    },
    {
      groupName: 'Insights & Optimization',
      items: [
        { name: 'ATS Analyzer', href: '/analyzer', icon: Sparkles },
        { name: 'JD Matcher', href: '/jd-match', icon: Target },
      ],
    },
  ];

  const renderNavLinks = () => (
    <div className="flex flex-col gap-5">
      {navGroups.map((group, idx) => (
        <div key={idx} className="flex flex-col gap-1">
          <span className="px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
            {group.groupName}
          </span>

          <div className="flex flex-col gap-0.5">
            {group.items.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href.startsWith('/builder') && pathname.startsWith('/builder')) ||
                (item.href.startsWith('/cover-letter') && pathname.startsWith('/cover-letter')) ||
                (item.href.startsWith('/analyzer') && pathname.startsWith('/analyzer')) ||
                (item.href.startsWith('/jd-match') && pathname.startsWith('/jd-match'));
              const Icon = item.icon;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  prefetch={true}
                  className={clsx(
                    'flex items-center justify-between px-3 py-2.5 text-[13.5px] rounded-xl transition-all',
                    isActive
                      ? 'bg-[#1C152E] text-white font-bold shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/90 font-medium'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={clsx('w-4 h-4 shrink-0', isActive ? 'text-white' : 'text-slate-400')} />
                    <span>{item.name}</span>
                  </div>

                  {item.badge && (
                    <span
                      className={clsx(
                        'px-2 py-0.5 text-[10px] font-bold rounded-md leading-none shrink-0',
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-[#FFF0F3] text-[#FF4B5E] border border-[#FFCCD5]'
                      )}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <>
      {/* Mobile Top Header (Hidden on Desktop) */}
      <header className="md:hidden sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 px-4 py-2.5 flex items-center justify-between no-print">
        <Logo size="sm" showTagline={false} />
        <div className="flex items-center gap-2">
          {!pathname.startsWith('/builder') && (
            <Link
              href="/builder"
              className="px-2.5 py-1 text-xs font-bold text-[#1C152E] bg-slate-100 border border-slate-200 rounded-lg flex items-center gap-1.5"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Builder</span>
            </Link>
          )}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Backdrop & Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex no-print">
          <div
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="relative w-72 max-w-[85vw] bg-white h-full flex flex-col shadow-2xl z-10 animate-in slide-in-from-left duration-200">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <Logo size="sm" showTagline />
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              {renderNavLinks()}
            </div>

            <div className="p-4 border-t border-slate-100 bg-slate-50/70 flex items-center justify-between">
              <div className="flex items-center gap-2.5 overflow-hidden">
                <div className="w-8 h-8 rounded-full bg-[#1C152E] text-white flex items-center justify-center text-xs font-bold shrink-0">
                  {initials}
                </div>
                <div className="flex flex-col truncate">
                  <span className="text-xs font-semibold text-slate-900 truncate">{candidateName}</span>
                  <span className="text-[11px] text-slate-500 truncate">{candidateEmail}</span>
                </div>
              </div>
              <button
                type="button"
                onClick={async () => {
                  localStorage.removeItem('is_authenticated');
                  localStorage.removeItem('user_name');
                  localStorage.removeItem('user_email');
                  await signOut({ redirectUrl: '/sign-in' });
                }}
                className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-lg transition-colors cursor-pointer"
                title="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Sticky Sidebar */}
      <aside className="hidden md:flex w-64 bg-white/85 backdrop-blur-xl border-r border-slate-200/70 h-screen sticky top-0 flex-col shrink-0 select-none z-30 print:hidden no-print">
        {/* Brand Header */}
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
          <Logo size="md" showTagline />
        </div>

        {/* Navigation Group Items */}
        <div className="flex-1 overflow-y-auto px-3.5 py-5 flex flex-col gap-6 scrollbar-thin scrollbar-thumb-slate-200">
          {renderNavLinks()}
        </div>

        {/* User Footer Profile */}
        <div className="p-3 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
          <div className="flex items-center gap-2.5 overflow-hidden pl-1">
            <div className="w-8 h-8 rounded-full bg-[#1C152E] text-white flex items-center justify-center text-xs font-bold shrink-0">
              {initials}
            </div>
            <div className="flex flex-col truncate">
              <span className="text-xs font-semibold text-slate-900 truncate">{candidateName}</span>
              <span className="text-[11px] text-slate-500 truncate">{candidateEmail}</span>
            </div>
          </div>
          <button
            type="button"
            onClick={async () => {
              localStorage.removeItem('is_authenticated');
              localStorage.removeItem('user_name');
              localStorage.removeItem('user_email');
              await signOut({ redirectUrl: '/sign-in' });
            }}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-lg transition-colors cursor-pointer"
            title="Sign Out / Switch Account"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </aside>
    </>
  );
};
