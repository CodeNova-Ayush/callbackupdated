'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Logo } from '@/components/ui/Logo';
import {
  FileText,
  Upload,
  Sparkles,
  Plus,
  ArrowRight,
  CheckCircle2,
  FileCheck,
  Loader2,
  Bot,
  ShieldCheck,
  Sparkle,
} from 'lucide-react';
import { ResumeAtmosphereCanvas } from '@/components/common/ResumeAtmosphereCanvas';
import { saveResumeToStore } from '@/lib/client-resume-store';

export default function GetStartedChoicePage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<string>('');
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // 1. Action: Create New Resume from Scratch
  const handleCreateNewResume = async () => {
    setIsCreatingNew(true);
    setErrorMessage(null);
    try {
      const res = await fetch('/api/resumes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: 'My Professional Resume',
          template: 'modern_executive',
          sections: [
            {
              sectionType: 'personal_info',
              title: 'Personal Details',
              orderIndex: 0,
              content: {
                fullName: 'New Candidate',
                email: 'candidate@example.com',
                headline: 'Software Engineer & Tech Leader',
                location: 'San Francisco, CA',
              },
            },
          ],
        }),
      });

      const data = await res.json();
      const resumeId = data.resume?.id || data.id || `resume-${Date.now()}`;

      // Set global active resume across all features
      localStorage.setItem('has_onboarded', 'true');
      localStorage.setItem('active_resume_id', resumeId);
      window.dispatchEvent(new Event('active_resume_changed'));

      router.push(`/builder/${resumeId}`);
    } catch (err: any) {
      console.error('Failed to create resume:', err);
      // Fallback
      const fallbackId = `resume-${Date.now()}`;
      localStorage.setItem('has_onboarded', 'true');
      localStorage.setItem('active_resume_id', fallbackId);
      window.dispatchEvent(new Event('active_resume_changed'));
      router.push(`/builder/${fallbackId}`);
    } finally {
      setIsCreatingNew(false);
    }
  };

  // 2. Action: Trigger File Dialog for Local Storage Upload
  const handleTriggerUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // 3. Action: Handle Uploaded Old Resume
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setErrorMessage(null);
    setUploadStatus('Reading resume file from local storage...');

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('customTitle', file.name.replace(/\.[^/.]+$/, ''));

      setUploadStatus('AI Parsing sections, work experience & skills...');

      const response = await fetch('/api/resumes/import', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to parse resume');
      }

      setUploadStatus('Syncing active resume across all platform features...');

      // Save globally to localStorage for all features
      const importedId = data.resumeId;
      localStorage.setItem('has_onboarded', 'true');
      localStorage.setItem('active_resume_id', importedId);
      if (data.parsedSections) {
        saveResumeToStore({
          id: importedId,
          title: data.title || file.name,
          candidateName: data.parsedSections.personalInfo?.fullName || 'Candidate',
          candidateTitle: data.parsedSections.personalInfo?.title || 'Software Engineer',
          candidateEmail: data.parsedSections.personalInfo?.email || '',
          candidatePhone: data.parsedSections.personalInfo?.phone || '',
          candidateLocation: data.parsedSections.personalInfo?.location || '',
          atsScore: data.atsScore || 96,
          trustScore: 98,
          updatedAt: 'Just now',
          isActive: true,
          parsedSections: data.parsedSections,
        });
      }

      // Automatically transition to the 3-zone builder with the imported resume
      setTimeout(() => {
        router.push(`/builder/${importedId}`);
      }, 600);
    } catch (err: any) {
      console.error('Upload error:', err);
      setErrorMessage(err.message || 'Could not parse resume. Please try another file.');
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col justify-between font-sans relative overflow-hidden selection:bg-[#FFF0F3] selection:text-[#FF4B5E]">
      {/* Corner-Framing 3D Resume Atmosphere Canvas */}
      <ResumeAtmosphereCanvas />

      {/* Ambient background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-b from-[#FF4B5E]/6 via-[#1C152E]/4 to-transparent blur-3xl pointer-events-none -z-10" />
      <div className="absolute inset-0 bg-[radial-gradient(#CBD5E1_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-40 -z-10" />

      {/* Hidden File Input for Local Storage Picker */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".pdf,.docx,.doc,.txt,.json"
        className="hidden"
      />

      {/* Top Navbar */}
      <header className="w-full px-6 lg:px-12 py-6 flex items-center justify-between relative z-10">
        <Logo size="md" showTagline />
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white border border-slate-200 rounded-full shadow-2xs">
          <span className="w-2 h-2 rounded-full bg-[#FF4B5E]" />
          <span className="text-xs font-bold text-slate-800">Step 2 of 2 • Resume Setup</span>
        </div>
      </header>

      {/* Main Choice Stage */}
      <main className="w-full max-w-4xl mx-auto px-6 py-8 flex flex-col items-center text-center gap-8 relative z-10">
        <div className="flex flex-col gap-3">
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#1C152E] tracking-tight leading-[1.15]">
            Choose Your Starting Point
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto font-medium">
            Start fresh with our intelligent visual builder or import your existing resume to automatically power all AI features.
          </p>
        </div>

        {/* Error message alert */}
        {errorMessage && (
          <div className="w-full max-w-xl p-4 bg-rose-50 border border-rose-200 rounded-2xl text-xs font-bold text-rose-700 text-left flex items-center gap-3">
            <span>⚠️ {errorMessage}</span>
          </div>
        )}

        {/* Loading / Uploading Overlay State */}
        {isUploading && (
          <div className="w-full max-w-xl p-8 bg-white border-2 border-[#1C152E] rounded-3xl shadow-xl shadow-slate-900/10 flex flex-col items-center gap-4 animate-in fade-in zoom-in-95 duration-300">
            <div className="w-14 h-14 rounded-2xl bg-[#FFF0F3] text-[#FF4B5E] flex items-center justify-center animate-pulse">
              <Loader2 className="w-7 h-7 animate-spin" />
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="text-lg font-black text-slate-900">Processing Your Resume</h3>
              <p className="text-xs text-slate-500 font-bold">{uploadStatus}</p>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mt-2">
              <div className="bg-[#1C152E] h-full rounded-full w-4/5 animate-pulse" />
            </div>
          </div>
        )}

        {/* The Two Flagship High-Quality Choice Cards */}
        {!isUploading && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl">
            {/* Flagship Option 1: Create New Resume */}
            <div
              onClick={handleCreateNewResume}
              className="group relative bg-white/95 backdrop-blur-md hover:bg-white border-2 border-slate-200/90 hover:border-[#1C152E] rounded-3xl p-8 shadow-md hover:shadow-xl hover:shadow-slate-900/10 flex flex-col justify-between items-start text-left gap-6 transition-all duration-300 cursor-pointer overflow-hidden ring-1 ring-slate-200/60 hover:ring-2 hover:ring-[#1C152E]/20"
            >
              {/* Top badge */}
              <div className="absolute top-4 right-4">
                <span className="px-3 py-1 bg-[#FFF0F3] text-[#FF4B5E] border border-[#FFCCD5] text-[10px] font-bold uppercase tracking-wider rounded-full shadow-2xs">
                  Instant Setup
                </span>
              </div>

              <div className="flex flex-col gap-4">
                <div className="w-14 h-14 rounded-2xl bg-[#FFF0F3] text-[#FF4B5E] flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm">
                  <Plus className="w-7 h-7" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <span className="text-[11px] font-black text-[#FF4B5E] uppercase tracking-wider">Start from Scratch</span>
                  <h2 className="text-2xl font-black text-slate-950 group-hover:text-[#1C152E] transition-colors">
                    Create New Resume
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                    Build an ATS-optimized resume from the ground up using our 40+ executive templates and real-time AI bullet enhancer.
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <button
                type="button"
                disabled={isCreatingNew}
                className="w-full h-11 px-6 bg-[#1C152E] hover:bg-[#2B1F45] active:scale-[0.98] text-white font-bold text-xs rounded-full shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                {isCreatingNew ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Creating Workspace...</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    <span>Create Blank Resume</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </div>

            {/* Flagship Option 2: Import Old Resume */}
            <div
              onClick={handleTriggerUpload}
              className="group relative bg-white/95 backdrop-blur-md hover:bg-white border-2 border-slate-200/90 hover:border-[#1C152E] rounded-3xl p-8 shadow-md hover:shadow-xl hover:shadow-slate-900/10 flex flex-col justify-between items-start text-left gap-6 transition-all duration-300 cursor-pointer overflow-hidden ring-1 ring-slate-200/60 hover:ring-2 hover:ring-[#1C152E]/20"
            >
              {/* Top badge */}
              <div className="absolute top-4 right-4">
                <span className="px-3 py-1 bg-[#1C152E] text-white text-[10px] font-bold uppercase tracking-wider rounded-full shadow-xs">
                  Recommended
                </span>
              </div>

              <div className="flex flex-col gap-4">
                <div className="w-14 h-14 rounded-2xl bg-[#FFF0F3] text-[#FF4B5E] flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm">
                  <Upload className="w-7 h-7" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <span className="text-[11px] font-black text-[#FF4B5E] uppercase tracking-wider">Sync Across All Features</span>
                  <h2 className="text-2xl font-black text-slate-950 group-hover:text-[#1C152E] transition-colors">
                    Import Old Resume
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                    Upload your PDF or DOCX file. AI will instantly extract your profile and auto-populate your Builder, Living Agent, and ATS scores everywhere.
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <button
                type="button"
                className="w-full h-11 px-6 bg-[#1C152E] hover:bg-[#2B1F45] active:scale-[0.98] text-white font-bold text-xs rounded-full shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <FileCheck className="w-4 h-4" />
                <span>Upload Resume File (PDF / DOCX)</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        )}

        {/* Global Persistence Note */}
        <div className="flex items-center gap-2 text-xs text-slate-500 font-bold">
          <ShieldCheck className="w-4 h-4 text-[#1C152E]" />
          <span>Uploaded once • Automatically powers Builder, Analyzer, Agent, JD Match, and Trust Score</span>
        </div>

        {/* Step Progression & Direct Dashboard Navigation */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-xs font-semibold text-slate-500 pt-1">
          <Link href="/import-resume" className="hover:text-[#FF4B5E] hover:underline flex items-center gap-1">
            <span>Prefer dedicated ATS file reviewer?</span>
            <span className="font-bold text-[#FF4B5E]">Open Detailed Import Tool →</span>
          </Link>
          <span className="hidden sm:inline text-slate-300">•</span>
          <Link
            href="/dashboard"
            onClick={() => localStorage.setItem('has_onboarded', 'true')}
            className="hover:text-[#1C152E] hover:underline flex items-center gap-1"
          >
            <span>Proceed directly to</span>
            <span className="font-bold text-[#1C152E]">Dashboard →</span>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-6 px-6 text-center text-xs text-slate-400 border-t border-slate-200/80">
        <span>Callback — Autonomous Candidate Agent Platform</span>
      </footer>
    </div>
  );
}
