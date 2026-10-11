'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Upload, FileText, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, Badge } from '@/components/ui/Card';

export default function AnalyzerRootPage() {
  const router = useRouter();
  const [activeResumeId, setActiveResumeId] = useState<string | null>(null);
  const [candidateName, setCandidateName] = useState<string>('');
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const activeId = localStorage.getItem('active_resume_id');
      const name = localStorage.getItem('user_name') || localStorage.getItem('active_candidate_name') || '';
      if (activeId && activeId !== 'demo-resume-alex-1') {
        router.replace(`/analyzer/${activeId}`);
        return;
      }
      setActiveResumeId(activeId);
      setCandidateName(name);
      setChecking(false);
    }
  }, [router]);

  if (checking) return null;

  return (
    <div className="p-6 sm:p-12 max-w-4xl mx-auto w-full flex flex-col gap-8 font-sans">
      <div className="flex flex-col gap-2 text-center items-center">
        <Badge variant="aurora" size="sm">Enterprise ATS Compatibility Engine</Badge>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          ATS Resume Compatibility Audit
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-xl">
          Choose which resume to analyze, upload your existing resume file, or test with our benchmark demo profile.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Option 1: Upload Old Resume */}
        <Card hoverEffect className="p-6 bg-white border border-slate-200/90 rounded-3xl flex flex-col justify-between gap-5 group">
          <div className="flex flex-col gap-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
              <Upload className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors">
                Upload Your Resume
              </h2>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Upload your real PDF, DOCX, or TXT file to run algorithmic keyword and format checks.
              </p>
            </div>
          </div>
          <Link href="/import-resume">
            <Button variant="primary" size="sm" className="w-full" rightIcon={<ArrowRight className="w-4 h-4" />}>
              Upload & Audit
            </Button>
          </Link>
        </Card>

        {/* Option 2: Build from Scratch */}
        <Card hoverEffect className="p-6 bg-white border border-slate-200/90 rounded-3xl flex flex-col justify-between gap-5 group">
          <div className="flex flex-col gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-slate-900 group-hover:text-emerald-700 transition-colors">
                Open Resume Builder
              </h2>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Build or edit your resume in the editor with real-time in-builder ATS guidance.
              </p>
            </div>
          </div>
          <Link href="/builder">
            <Button variant="secondary" size="sm" className="w-full" rightIcon={<ArrowRight className="w-4 h-4" />}>
              Open Builder
            </Button>
          </Link>
        </Card>

        {/* Option 3: Explore Sample Demo */}
        <Card hoverEffect className="p-6 bg-white border border-slate-200/90 rounded-3xl flex flex-col justify-between gap-5 group">
          <div className="flex flex-col gap-3">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-700 flex items-center justify-center font-bold">
              <Sparkles className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-slate-900 group-hover:text-slate-700 transition-colors">
                Sample Benchmark
              </h2>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Preview the ATS Audit Suite running against our Alex Rivera demo profile.
              </p>
            </div>
          </div>
          <Link href="/analyzer/demo-resume-alex-1">
            <Button variant="secondary" size="sm" className="w-full" rightIcon={<ArrowRight className="w-4 h-4" />}>
              View Sample Demo
            </Button>
          </Link>
        </Card>
      </div>
    </div>
  );
}
