'use client';

import React, { useState, useRef } from 'react';
import { useUser } from '@/components/auth/AuthProvider';
import { useRouter } from 'next/navigation';
import { Logo } from '@/components/ui/Logo';
import {
  Sparkles,
  Upload,
  Plus,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  FileText,
  Loader2,
  Check,
  Search,
} from 'lucide-react';
import Link from 'next/link';
import { saveResumeToStore } from '@/lib/client-resume-store';
import { TemplateMicroPreview } from '@/components/builder/TemplateMicroPreview';
import { MOCK_PERSONA } from '@/components/builder/ResumeTemplates';

interface TemplateOption {
  id: string;
  name: string;
  category: string;
  tag: string;
  ats: string;
  desc: string;
  previewImg: string;
}

const TEMPLATES_GALLERY: TemplateOption[] = [
  // =========================================================================
  // TOP: Former Bottom Templates Moved to the Top (Unique Items 1-4)
  // =========================================================================
  {
    id: 'split_duo',
    name: 'Balanced Symmetrical Duo',
    category: 'Tech & AI',
    tag: 'FULL STACK',
    ats: '99% ATS',
    desc: 'Clean cobalt blue accents with structured balance between engineering history and technical skills.',
    previewImg: '/images/templates/template-1.png',
  },
  {
    id: 'prestige_gold',
    name: 'Executive VP & Chief Officer Gold',
    category: 'Executive & Finance',
    tag: 'C-SUITE EXEC',
    ats: '98% ATS',
    desc: 'Dark obsidian top banner with refined warm gold accents for executive and boardroom candidates.',
    previewImg: '/images/templates/template-2.png',
  },
  {
    id: 'ai_ml_lead',
    name: 'PyTorch ML & Autonomous Swarms',
    category: 'Tech & AI',
    tag: 'AI / LLM LEAD',
    ats: '99% ATS',
    desc: 'Advanced machine learning systems with distributed training throughput metrics and model benchmarking.',
    previewImg: '/images/templates/template-3.png',
  },
  {
    id: 'graphite_compact',
    name: 'Dense 1-Page High-Density',
    category: 'Executive & Finance',
    tag: '10+ YRS EXP',
    ats: '99% ATS',
    desc: 'Maximum information density engineered to fit comprehensive 10-year careers cleanly onto 1 page.',
    previewImg: '/images/templates/enhancv-8.png',
  },

  // =========================================================================
  // CORE ATS SPECIALIZED TEMPLATES (Unique Items 5-27)
  // =========================================================================
  {
    id: 'cpa_audit_lead',
    name: 'Scarlett Anderson — CPA & Audit',
    category: 'Executive & Finance',
    tag: 'FINANCE / CPA',
    ats: '99% ATS',
    desc: 'Classic centered serif header with horizontal rules and maximum corporate parser compatibility.',
    previewImg: '/images/templates/enhancv-extra-1.png',
  },
  {
    id: 'global_director_ops',
    name: 'Isaac Hall — Global Director',
    category: 'Executive & Finance',
    tag: 'BOARD & ADVISOR',
    ats: '98% ATS',
    desc: 'Refined serif typography with right-aligned tabular numerals and leadership highlights.',
    previewImg: '/images/templates/enhancv-extra-2.png',
  },
  {
    id: 'backend_distributed_arch',
    name: 'Elise Carter — Backend & ML',
    category: 'Tech & AI',
    tag: 'TECH ARCHITECT',
    ats: '99% ATS',
    desc: 'Monospace terminal section tags, visual skills matrix chart, and dense metrics formatting.',
    previewImg: '/images/templates/enhancv-extra-3.png',
  },
  {
    id: 'vp_product_strategy',
    name: 'Carrie Jones — Product Lead',
    category: 'Product & Design',
    tag: 'PRODUCT LEAD',
    ats: '97% ATS',
    desc: 'Nordic emerald headers, clean divider borders, and categorized domain competencies.',
    previewImg: '/images/templates/enhancv-extra-4.png',
  },
  {
    id: 'strategic_sourcing_ops',
    name: 'Maeve Delaney — Strategic Sourcing',
    category: 'Executive & Finance',
    tag: 'GLOBAL OPS',
    ats: '97% ATS',
    desc: 'Deep dark slate console styling with bright emerald syntax highlights and terminal tags.',
    previewImg: '/images/templates/enhancv-extra-5.png',
  },
  {
    id: 'growth_marketing_dir',
    name: 'Ellen Johnson — Growth Marketing',
    category: 'Startups & YC',
    tag: 'GTM / MARKETING',
    ats: '98% ATS',
    desc: 'Sky blue accent geometry with structured infrastructure competencies and cloud metrics.',
    previewImg: '/images/templates/enhancv-extra-6.png',
  },
  {
    id: 'data_science_ml_lead',
    name: 'Grace Jackson — Data Scientist',
    category: 'Tech & AI',
    tag: 'DATA / ML',
    ats: '99% ATS',
    desc: 'Copper orange accent borders with dense monospace code tags and performance metrics.',
    previewImg: '/images/templates/enhancv-extra-7.png',
  },
  {
    id: 'enterprise_bizdev',
    name: 'Austin Adams — Business Dev Lead',
    category: 'Executive & Finance',
    tag: 'ENTERPRISE B2B',
    ats: '98% ATS',
    desc: 'Scholarly preprint typography with abstract summary box and partnership pedigree.',
    previewImg: '/images/templates/enhancv-extra-8.png',
  },
  {
    id: 'staff_ml_systems',
    name: 'David Miller — Staff ML Engineer',
    category: 'Tech & AI',
    tag: 'AI / SYSTEMS',
    ats: '99% ATS',
    desc: 'Warm amber section dividers and structured dual-column matrix for AI researchers.',
    previewImg: '/images/templates/enhancv-extra-9.png',
  },
  {
    id: 'startup_founder_pitch',
    name: 'Elena Rostova — VP of Marketing',
    category: 'Startups & YC',
    tag: 'YC FOUNDER',
    ats: '98% ATS',
    desc: 'Punchy orange accents, prominent fundraising and traction milestones, and high-signal metrics.',
    previewImg: '/images/templates/enhancv-extra-10.png',
  },
  {
    id: 'cloud_infra_sre',
    name: 'Marcus Vance — Cloud Architect',
    category: 'Tech & AI',
    tag: 'CLOUD / SRE',
    ats: '99% ATS',
    desc: 'Crisp AWS/GCP infrastructure certifications and production SLA metrics formatting.',
    previewImg: '/images/templates/enhancv-extra-11.png',
  },
  {
    id: 'biotech_pharma_lead',
    name: 'Sophia Chen — Biotech Director',
    category: 'Executive & Finance',
    tag: 'BIOTECH / CLINICAL',
    ats: '98% ATS',
    desc: 'Indigo top banner with translational medicine milestones, patent portfolio filings, and FDA progression.',
    previewImg: '/images/templates/enhancv-extra-12.png',
  },
  {
    id: 'cybersecurity_soc2',
    name: 'Liam O’Connor — Cybersecurity Lead',
    category: 'Tech & AI',
    tag: 'SECURITY / SOC-2',
    ats: '99% ATS',
    desc: 'Electric indigo divider lines with zero-trust architecture, audit compliance, and response SLAs.',
    previewImg: '/images/templates/enhancv-extra-13.png',
  },
  {
    id: 'head_of_ux_design',
    name: 'Rachel Green — Head of UX & Design',
    category: 'Product & Design',
    tag: 'DESIGN SYSTEMS',
    ats: '98% ATS',
    desc: 'Sophisticated typography with portfolio prominence and design system governance.',
    previewImg: '/images/templates/enhancv-extra-14.png',
  },
  {
    id: 'quant_research_fund',
    name: 'Alexander Wright — Quant Research',
    category: 'Executive & Finance',
    tag: 'QUANT / HEDGE FUND',
    ats: '99% ATS',
    desc: 'Deep burgundy executive headers, pedigree split, and high-impact accomplishment bullets.',
    previewImg: '/images/templates/enhancv-extra-15.png',
  },
  {
    id: 'corporate_counsel_lead',
    name: 'Claire Dupont — Corporate Counsel',
    category: 'Executive & Finance',
    tag: 'LEGAL & STRATEGY',
    ats: '99% ATS',
    desc: 'Rigorous single-column case structure with quantitative business impacts and C-suite advisory.',
    previewImg: '/images/templates/enhancv-extra-16.png',
  },
  {
    id: 'swiss_bauhaus_grid',
    name: 'Helvetica Swiss Bauhaus Grid',
    category: 'Product & Design',
    tag: 'SWISS DESIGN',
    ats: '98% ATS',
    desc: 'Ultra-clean black & red geometric alignment inspired by international typographic style.',
    previewImg: '/images/templates/enhancv-1.png',
  },
  {
    id: 'oxford_academic_fellow',
    name: 'Cambridge & Oxford Fellow',
    category: 'Executive & Finance',
    tag: 'ACADEMIC / R&D',
    ats: '99% ATS',
    desc: 'Timeless scholarly typography with honorable distinctions, credentials, and fellowships.',
    previewImg: '/images/templates/enhancv-2.png',
  },
  {
    id: 'tokyo_zen_minimal',
    name: 'Tokyo Minimalist Zen',
    category: 'Product & Design',
    tag: 'MINIMALIST',
    ats: '98% ATS',
    desc: 'Subtle hairline dividers, generous white space balance, and muted charcoal hierarchy.',
    previewImg: '/images/templates/enhancv-3.png',
  },
  {
    id: 'scandinavian_frost',
    name: 'Scandinavian Frost Clean',
    category: 'Tech & AI',
    tag: 'NORDIC TECH',
    ats: '97% ATS',
    desc: 'Frost blue accents with clean border dividers and functional human-centric layout.',
    previewImg: '/images/templates/enhancv-4.png',
  },
  {
    id: 'neo_brutalist_tech',
    name: 'Neo-Brutalist Engineering',
    category: 'Product & Design',
    tag: 'CREATIVE TECH',
    ats: '95% ATS',
    desc: 'Bold black border boxes with punchy drop shadows and high-contrast yellow headers.',
    previewImg: '/images/templates/enhancv-5.png',
  },
  {
    id: 'coral_sunset_product',
    name: 'Coral Sunset Product Designer',
    category: 'Product & Design',
    tag: 'DESIGN LEAD',
    ats: '96% ATS',
    desc: 'Warm rose coral accents with modern card backdrops and design system highlights.',
    previewImg: '/images/templates/enhancv-6.png',
  },
  {
    id: 'deep_teal_biotech',
    name: 'Deep Teal Biotech & Hardware',
    category: 'Tech & AI',
    tag: 'BIO / HARDWARE',
    ats: '97% ATS',
    desc: 'Rich teal headers with dual-column precision engineering and patent accomplishments.',
    previewImg: '/images/templates/enhancv-7.png',
  },

  // =========================================================================
  // BOTTOM: Former Top Templates Moved to the Bottom (Unique Items 28-31)
  // =========================================================================
  {
    id: 'classic_ats',
    name: 'Executive Leader Standard',
    category: 'Executive & Finance',
    tag: 'FORTUNE 500',
    ats: '99% ATS',
    desc: 'Clean two-column split with tabular dates, categorized skills, and verified achievements grid.',
    previewImg: '/images/templates/tpl-1.png',
  },
  {
    id: 'modern_executive',
    name: 'Agile Tech Architect',
    category: 'Startups & YC',
    tag: 'STARTUP CTO',
    ats: '98% ATS',
    desc: 'Warm terracotta accent border, executive summary backdrop, and structured leadership cards.',
    previewImg: '/images/templates/tpl-2.png',
  },
  {
    id: 'navy_sidebar',
    name: 'ATS Match Check Standard',
    category: 'Tech & AI',
    tag: 'STAFF / PRINCIPAL',
    ats: '99% ATS',
    desc: 'Deep slate navy headers, high-contrast subheadings, and dense system engineering layout.',
    previewImg: '/images/templates/tpl-3.png',
  },
  {
    id: 'navy_header',
    name: 'Product & Project Leader',
    category: 'Product & Design',
    tag: 'ENTERPRISE LEAD',
    ats: '97% ATS',
    desc: 'Top navy header banner with dual-column grid body and prominent technical credentials.',
    previewImg: '/images/templates/tpl-4.png',
  },

  // =========================================================================
  // FLOWCV SIGNATURE SCRAPED TEMPLATES
  // =========================================================================
  {
    id: 'flowcv_atlantic_blue',
    name: 'FlowCV Atlantic Blue Sidebar',
    category: 'FlowCV & Teal',
    tag: 'FLOWCV FLAGSHIP',
    ats: '99% ATS',
    desc: 'Deep Atlantic navy left sidebar with high-contrast credentials, modern sans typography, and ATS parsing.',
    previewImg: '/images/templates/tpl-3.png',
  },
  {
    id: 'flowcv_mercury_flow',
    name: 'FlowCV Mercury Minimal Flow',
    category: 'FlowCV & Teal',
    tag: 'FLOWCV MINIMAL',
    ats: '99% ATS',
    desc: 'Fluid single-column layout with clean centered header and generous whitespace for modern engineers.',
    previewImg: '/images/templates/enhancv-3.png',
  },
  {
    id: 'flowcv_steady_form',
    name: 'FlowCV Steady Form Grid',
    category: 'FlowCV & Teal',
    tag: 'FLOWCV BALANCED',
    ats: '98% ATS',
    desc: 'Symmetrical 60/40 two-column split with slate dividers and organized competencies sidebar.',
    previewImg: '/images/templates/template-1.png',
  },
  {
    id: 'flowcv_classic_serif',
    name: 'FlowCV Classic Serif Formal',
    category: 'FlowCV & Teal',
    tag: 'FLOWCV SERIF',
    ats: '99% ATS',
    desc: 'Monochrome editorial serif typography with dual horizontal rules for corporate and legal distinction.',
    previewImg: '/images/templates/enhancv-extra-1.png',
  },
  {
    id: 'flowcv_leaves',
    name: 'FlowCV Forest Leaves Accent',
    category: 'FlowCV & Teal',
    tag: 'FLOWCV GREEN',
    ats: '98% ATS',
    desc: 'Signature forest emerald headers and accents designed for healthcare, life sciences, and sustainability.',
    previewImg: '/images/templates/enhancv-extra-12.png',
  },
  {
    id: 'flowcv_editorial_rule',
    name: 'FlowCV Editorial Divider Rule',
    category: 'FlowCV & Teal',
    tag: 'FLOWCV EDITORIAL',
    ats: '98% ATS',
    desc: 'Minimalist hairline section dividers with wide uppercase tracking and clean bullet alignment.',
    previewImg: '/images/templates/enhancv-2.png',
  },
  {
    id: 'flowcv_precision_line',
    name: 'FlowCV Precision Tech Grid',
    category: 'FlowCV & Teal',
    tag: 'FLOWCV TECH',
    ats: '99% ATS',
    desc: 'Dark header badge, monospace technical chips, and high-density engineering accomplishments.',
    previewImg: '/images/templates/enhancv-8.png',
  },
  {
    id: 'flowcv_silver_banner',
    name: 'FlowCV Silver Slate Banner',
    category: 'FlowCV & Teal',
    tag: 'FLOWCV CORPORATE',
    ats: '98% ATS',
    desc: 'Sleek slate-gray header banner with dual-column grid body and prominent technical credentials.',
    previewImg: '/images/templates/tpl-4.png',
  },

  // =========================================================================
  // TEALHQ SIGNATURE SCRAPED TEMPLATES
  // =========================================================================
  {
    id: 'teal_modern',
    name: 'TealHQ Signature Modern Teal',
    category: 'FlowCV & Teal',
    tag: 'TEALHQ MODERN',
    ats: '99% ATS',
    desc: 'TealHQ signature deep teal accents, verified ATS callout badges, and two-column balanced layout.',
    previewImg: '/images/templates/enhancv-7.png',
  },
  {
    id: 'teal_clean_ats',
    name: 'TealHQ High-Density Single Column',
    category: 'FlowCV & Teal',
    tag: 'TEALHQ ATS 100',
    ats: '100% ATS',
    desc: 'Maximum ATS parser pass-rate with teal headers, clean chronology, and high-impact metric bullets.',
    previewImg: '/images/templates/tpl-1.png',
  },
  {
    id: 'teal_executive',
    name: 'TealHQ Executive C-Suite Banner',
    category: 'FlowCV & Teal',
    tag: 'TEALHQ EXEC',
    ats: '99% ATS',
    desc: 'Deep dark teal header masthead with executive summary callout and structured leadership highlights.',
    previewImg: '/images/templates/template-2.png',
  },
];

export default function WelcomePage() {
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Flow Step: 'choice' -> 'templates'
  const [step, setStep] = useState<'choice' | 'templates'>('choice');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<string>('');

  const displayName = isLoaded && user ? (user.firstName || user.fullName || 'there') : '';

  // 1. Action: Select Template and Create Resume -> Navigate to Builder Sections
  const handleSelectTemplate = async (templateId: string, templateName: string) => {
    setIsCreatingNew(true);
    setSelectedTemplateId(templateId);

    try {
      const res = await fetch('/api/resumes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: `${displayName && displayName !== 'there' ? displayName : 'My'} Resume`,
          template: templateId,
          sections: [
            {
              sectionType: 'personal_info',
              title: 'Personal Details',
              orderIndex: 0,
              content: {
                fullName: displayName && displayName !== 'there' ? displayName : 'Alex Morgan',
                email: 'alex.morgan@example.com',
                headline: 'Software Engineer',
                location: 'San Francisco, CA',
              },
            },
          ],
        }),
      });

      const data = await res.json();
      const resumeId = data.resume?.id || data.id || `resume-${Date.now()}`;

      // Save initial cache with selectedTemplate and full rich mock persona so builder opens fully filled
      const cacheKey = 'callback_ai_saved_resume_' + resumeId;
      const initialCache = {
        personalInfo: {
          fullName: displayName && displayName !== 'there' ? displayName : MOCK_PERSONA.fullName,
          email: MOCK_PERSONA.email,
          headline: MOCK_PERSONA.title,
          location: MOCK_PERSONA.location,
          phone: MOCK_PERSONA.phone,
          linkedin: MOCK_PERSONA.linkedin,
          github: MOCK_PERSONA.github,
          website: MOCK_PERSONA.website,
          summary: MOCK_PERSONA.summary,
        },
        experiences: MOCK_PERSONA.experiences,
        education: MOCK_PERSONA.education,
        projects: MOCK_PERSONA.projects,
        skills: MOCK_PERSONA.skills,
        selectedTemplate: templateId,
      };
      localStorage.setItem(cacheKey, JSON.stringify(initialCache));
      localStorage.setItem('has_onboarded', 'true');
      localStorage.setItem('active_resume_id', resumeId);
      window.dispatchEvent(new Event('active_resume_changed'));

      // Transition straight to the Builder section editor
      router.push(`/builder/${resumeId}?template=${templateId}`);
    } catch (err) {
      console.error('Template creation error, using fallback:', err);
      const fallbackId = `resume-${Date.now()}`;
      const cacheKey = 'callback_ai_saved_resume_' + fallbackId;
      const initialCache = {
        personalInfo: {
          fullName: displayName && displayName !== 'there' ? displayName : MOCK_PERSONA.fullName,
          email: MOCK_PERSONA.email,
          headline: MOCK_PERSONA.title,
          location: MOCK_PERSONA.location,
          phone: MOCK_PERSONA.phone,
          linkedin: MOCK_PERSONA.linkedin,
          github: MOCK_PERSONA.github,
          website: MOCK_PERSONA.website,
          summary: MOCK_PERSONA.summary,
        },
        experiences: MOCK_PERSONA.experiences,
        education: MOCK_PERSONA.education,
        projects: MOCK_PERSONA.projects,
        skills: MOCK_PERSONA.skills,
        selectedTemplate: templateId,
      };
      localStorage.setItem(cacheKey, JSON.stringify(initialCache));
      localStorage.setItem('has_onboarded', 'true');
      localStorage.setItem('active_resume_id', fallbackId);
      window.dispatchEvent(new Event('active_resume_changed'));
      router.push(`/builder/${fallbackId}?template=${templateId}`);
    } finally {
      setIsCreatingNew(false);
    }
  };

  // 2. Action: Upload and Parse Existing Resume
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadStatus('Reading resume file...');

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('customTitle', file.name.replace(/\.[^/.]+$/, ''));

      setUploadStatus('AI parsing sections & experience...');

      const response = await fetch('/api/resumes/import', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to parse resume');
      }

      setUploadStatus('Opening workspace...');

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

      router.push(`/builder/${importedId}`);
    } catch (err: any) {
      console.error(err);
      alert(err.message || 'Could not parse resume file. Opening template selector...');
      setStep('templates');
    } finally {
      setIsUploading(false);
    }
  };


  const filteredTemplates = TEMPLATES_GALLERY.filter((t) => {
    const matchesCat = selectedCategory === 'All' || t.category === selectedCategory;
    const matchesQuery = !searchQuery || t.name.toLowerCase().includes(searchQuery.toLowerCase()) || t.tag.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col justify-between font-sans selection:bg-[#FFF0F3] selection:text-[#FF4B5E]">
      {/* Hidden File Input for Direct Upload */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.docx,.txt"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Top Header — Clean, Minimal */}
      <header className="w-full px-4 sm:px-8 py-4 sm:py-5 flex items-center justify-between border-b border-slate-200/80 bg-white/80 backdrop-blur-md sticky top-0 z-20">
        <Logo size="sm" showTagline={false} />

        <div className="flex items-center gap-3">
          {step === 'templates' && (
            <button
              type="button"
              onClick={() => setStep('choice')}
              className="text-xs font-bold text-slate-600 hover:text-slate-950 px-3.5 py-2 rounded-full hover:bg-slate-100 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
          )}

          {isSignedIn ? (
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
              <span className="w-2 h-2 rounded-full bg-[#FF4B5E]" />
              <span>{user?.firstName || 'Account'}</span>
            </div>
          ) : (
            <Link
              href="/"
              className="text-xs font-semibold text-slate-600 hover:text-slate-900 px-3.5 py-2 rounded-full hover:bg-slate-100 transition-colors"
            >
              Home
            </Link>
          )}
        </div>
      </header>

      {/* ==================================================================== */}
      {/* STAGE 1: CHOICE VIEW (Start from Scratch vs Upload) */}
      {/* ==================================================================== */}
      {step === 'choice' && (
        <main className="w-full max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-14 flex flex-col items-center text-center gap-6 sm:gap-8 my-auto animate-in fade-in duration-200">
          
          {/* Sub-header Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#FFF0F3] border border-[#FFCCD5] rounded-full text-[#FF4B5E] text-xs font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF4B5E] animate-pulse" />
            <span>No sign-up required • Free instant builder</span>
          </div>

          {/* Title */}
          <div className="flex flex-col gap-2 max-w-xl">
            <h1 className="text-2xl sm:text-4xl font-extrabold text-[#1C152E] tracking-tight leading-tight">
              How would you like to start?
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-normal leading-relaxed">
              Create an ATS-proof resume from scratch or import your existing file to auto-populate sections.
            </p>
          </div>

          {/* Uploading Status Overlay */}
          {isUploading && (
            <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl p-6 shadow-md flex items-center justify-center gap-3">
              <Loader2 className="w-5 h-5 text-[#1C152E] animate-spin" />
              <span className="text-xs sm:text-sm font-semibold text-slate-700">{uploadStatus}</span>
            </div>
          )}

          {/* The Two Primary Action Cards */}
          {!isUploading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full text-left">
              
              {/* Card 1: Start from Scratch -> Opens Template Selection */}
              <div
                onClick={() => setStep('templates')}
                className="bg-white border-2 border-slate-200 hover:border-[#1C152E] rounded-2xl p-5 sm:p-6 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between gap-5 cursor-pointer group active:scale-[0.99]"
              >
                <div className="flex flex-col gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#FFF0F3] text-[#FF4B5E] flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Plus className="w-5 h-5 stroke-[2.5]" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-950 group-hover:text-[#1C152E] transition-colors">
                      Start from Scratch
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      Pick from 40+ ATS-certified templates and let AI generate optimized bullet points.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  className="w-full h-11 px-5 bg-[#1C152E] hover:bg-[#2B1F45] text-white text-xs sm:text-sm font-bold rounded-full shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <span>Create New Resume</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Card 2: Import Existing Resume */}
              <div
                onClick={() => fileInputRef.current?.click()}
                className="bg-white border-2 border-slate-200 hover:border-[#1C152E] rounded-2xl p-5 sm:p-6 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between gap-5 cursor-pointer group active:scale-[0.99]"
              >
                <div className="flex flex-col gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#FFF0F3] text-[#FF4B5E] flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Upload className="w-5 h-5 stroke-[2.5]" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-950 group-hover:text-[#1C152E] transition-colors">
                      Upload Existing Resume
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      Upload your PDF or DOCX file to extract work history, skills, and get instant score.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  className="w-full h-11 px-5 bg-[#1C152E] hover:bg-[#2B1F45] text-white text-xs sm:text-sm font-bold rounded-full shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Upload className="w-4 h-4" />
                  <span>Upload PDF or DOCX</span>
                </button>
              </div>

            </div>
          )}

        </main>
      )}

      {/* ==================================================================== */}
      {/* STAGE 2: TEMPLATE SELECTOR VIEW (Shown after clicking Create New) */}
      {/* ==================================================================== */}
      {step === 'templates' && (
        <main className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10 flex flex-col gap-6 animate-in fade-in duration-200">
          
          {/* Header & Title */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200/80 pb-5">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FF4B5E] bg-[#FFF0F3] px-3 py-1 rounded-full border border-[#FFCCD5] mb-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#FF4B5E]" />
                <span>Step 1 of 2 • Select Template</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1C152E] tracking-tight">
                Select Your Resume Template
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Choose a design to start building your sections. You can switch templates anytime in the builder.
              </p>
            </div>

            {/* Back button */}
            <button
              type="button"
              onClick={() => setStep('choice')}
              className="self-start sm:self-auto text-xs font-bold text-slate-700 hover:text-[#1C152E] px-4 py-2 border border-slate-200 bg-white rounded-full shadow-2xs flex items-center gap-1.5 cursor-pointer hover:bg-slate-50"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Change Starting Method</span>
            </button>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {['All', 'FlowCV & Teal', 'Executive & Finance', 'Startups & YC', 'Tech & AI', 'Product & Design'].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#1C152E] text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Template Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredTemplates.map((template, idx) => (
              <div
                key={`${template.id}-${idx}`}
                className="bg-white rounded-2xl border-2 border-slate-200 hover:border-[#1C152E] overflow-hidden shadow-2xs hover:shadow-lg transition-all flex flex-col justify-between group"
              >
                {/* Authentic Scaled Mini-DOM Template Preview in True A4 Aspect Ratio */}
                <div className="relative aspect-[210/297] bg-white overflow-hidden flex items-center justify-center p-0">
                  <TemplateMicroPreview
                    templateId={template.id}
                    className="w-full h-full"
                  />
                  
                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase bg-white/95 backdrop-blur-xs text-slate-800 shadow-2xs border border-slate-200/80">
                      {template.tag}
                    </span>
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#1C152E] text-white shadow-2xs">
                      {template.ats}
                    </span>
                  </div>
                </div>

                {/* Card Info & Select Button */}
                <div className="p-4 flex flex-col gap-3 border-t border-slate-100 bg-white">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 truncate">
                      {template.name}
                    </h3>
                    <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5 leading-relaxed">
                      {template.desc}
                    </p>
                  </div>

                  <button
                    type="button"
                    disabled={isCreatingNew && selectedTemplateId === template.id}
                    onClick={() => handleSelectTemplate(template.id, template.name)}
                    className="w-full h-10 px-4 bg-[#1C152E] hover:bg-[#2B1F45] active:scale-[0.98] text-white text-xs font-bold rounded-full shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    {isCreatingNew && selectedTemplateId === template.id ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Opening Builder...</span>
                      </>
                    ) : (
                      <>
                        <span>Use This Template</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>

        </main>
      )}

      {/* Footer */}
      <footer className="w-full py-4 px-6 text-center text-xs text-slate-400 border-t border-slate-200/70 bg-white/40">
        <span>Callback — Free ATS Resume Builder</span>
      </footer>
    </div>
  );
}

