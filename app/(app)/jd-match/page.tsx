'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Target, Upload, FileText, Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, Badge } from '@/components/ui/Card';

export default function JdMatchRootPage() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const activeId = localStorage.getItem('active_resume_id');
      if (activeId && activeId !== 'demo-resume-alex-1') {
        router.replace(`/jd-match/${activeId}`);
        return;
      }
      setChecking(false);
    }
  }, [router]);

  if (checking) return null;

  return (
    <div className="p-6 sm:p-12 max-w-4xl mx-auto w-full flex flex-col gap-8 font-sans">
      <div className="flex flex-col gap-2 text-center items-center">
        <Badge variant="aurora" size="sm">Algorithmic Job Matcher</Badge>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Job Description Compatibility Matcher
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-xl">
          Select or upload your resume to compare against any job posting, uncover missing tech keywords, and optimize for recruiter screening.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Option 1: Upload Real Resume */}
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
                Upload your existing PDF or DOCX file to compare your real experience against any target job.
              </p>
            </div>
          </div>
          <Link href="/import-resume">
            <Button variant="primary" size="sm" className="w-full" rightIcon={<ArrowRight className="w-4 h-4" />}>
              Upload & Match
            </Button>
          </Link>
        </Card>

        {/* Option 2: Build in Editor */}
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
                Build or customize your resume in our editor with the built-in real-time JD Match pop-up card.
              </p>
            </div>
          </div>
          <Link href="/builder">
            <Button variant="secondary" size="sm" className="w-full" rightIcon={<ArrowRight className="w-4 h-4" />}>
              Open Builder
            </Button>
          </Link>
        </Card>

        {/* Option 3: Explore Sample Demo Match */}
        <Card hoverEffect className="p-6 bg-white border border-slate-200/90 rounded-3xl flex flex-col justify-between gap-5 group">
          <div className="flex flex-col gap-3">
            <div className="w-12 h-12 rounded-2xl bg-cyan-50 text-cyan-700 flex items-center justify-center font-bold">
              <Target className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-slate-900 group-hover:text-cyan-700 transition-colors">
                Sample Benchmark
              </h2>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Explore how the matcher scores Alex Rivera against a Senior AI Engineer job description.
              </p>
            </div>
          </div>
          <Link href="/jd-match/demo-resume-alex-1">
            <Button variant="secondary" size="sm" className="w-full" rightIcon={<ArrowRight className="w-4 h-4" />}>
              View Sample Demo
            </Button>
          </Link>
        </Card>
      </div>
    </div>
  );
}
