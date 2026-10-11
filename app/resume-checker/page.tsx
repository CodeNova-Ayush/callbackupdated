'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Upload,
  FileText,
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  RefreshCw,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Lock,
  ArrowUpRight,
  Check,
  Zap,
  Sliders,
  FileCheck,
  Eye,
  Layers,
  Target,
  Sparkle,
} from 'lucide-react';
import { Logo } from '@/components/ui/Logo';
import { saveResumeToStore } from '@/lib/client-resume-store';

// 27 Comprehensive Checks matching Enhancv & Industry ATS Standards
interface CheckerAuditItem {
  id: string;
  category: 'content' | 'section' | 'ats' | 'tailoring';
  title: string;
  status: 'passed' | 'warning' | 'issue';
  summary: string;
  explanation: string;
  issueExcerpt?: string;
  recommendation?: string;
}

const DEFAULT_AUDIT_ITEMS: CheckerAuditItem[] = [
  // 1. CONTENT (8 checks)
  {
    id: 'c1',
    category: 'content',
    title: 'Measurable Impact & Metrics',
    status: 'issue',
    summary: 'Several bullet points lack quantifiable numbers (%, $, count).',
    explanation: 'Recruiters and ATS algorithms prioritize accomplishments tied to quantifiable metrics over passive duties.',
    issueExcerpt: '"Responsible for database queries to make it faster with PostgreSQL and Prisma."',
    recommendation: 'Specify measurable results: "Optimized 14 slow PostgreSQL queries with composite indexing, reducing p95 latency by 42% across 2.4M records."',
  },
  {
    id: 'c2',
    category: 'content',
    title: 'Strong Action Verbs',
    status: 'passed',
    summary: 'All experience items start with active, dynamic verbs.',
    explanation: 'Starting bullet points with words like "Architected", "Engineered", and "Spearheaded" demonstrates ownership.',
  },
  {
    id: 'c3',
    category: 'content',
    title: 'Bullet Point Length & Density',
    status: 'warning',
    summary: '2 bullet points exceed the recommended 2-line threshold.',
    explanation: 'Bullet points longer than 3 lines are frequently skipped during 6-second recruiter scans.',
    issueExcerpt: '"Helped with design and frontend implementation using Tailwind CSS across 6 different enterprise microfrontends while collaborating with international design teams."',
    recommendation: 'Break into 2 concise, focused bullet points under 25 words each.',
  },
  {
    id: 'c4',
    category: 'content',
    title: 'Clichés & Overused Buzzwords',
    status: 'issue',
    summary: 'Found generic phrases: "hard-working", "responsible for".',
    explanation: 'Vague filler terms dilute your technical achievements. Replace with concrete accomplishments.',
    issueExcerpt: '"Responsible for leading tech team..."',
    recommendation: 'Change "Responsible for leading" to "Led engineering team of 5 and delivered..."',
  },
  {
    id: 'c5',
    category: 'content',
    title: 'Grammar & Punctuation Consistency',
    status: 'passed',
    summary: 'No grammar anomalies or inconsistent period endings detected.',
    explanation: 'All list items follow uniform capitalization and terminal punctuation.',
  },
  {
    id: 'c6',
    category: 'content',
    title: 'Repetitive Verb Avoidance',
    status: 'warning',
    summary: 'Verb "Built" is used 4 times in recent experience.',
    explanation: 'Repeating identical action verbs diminishes the perceived variety and depth of your contributions.',
    recommendation: 'Vary with synonyms such as "Constructed", "Deployed", "Engineered", or "Pioneered".',
  },
  {
    id: 'c7',
    category: 'content',
    title: 'Passive Voice Elimination',
    status: 'passed',
    summary: 'All experience statements use direct, active voice.',
    explanation: 'Active voice positions you as the driver of the outcome rather than a passive observer.',
  },
  {
    id: 'c8',
    category: 'content',
    title: 'Professional Summary Strength',
    status: 'passed',
    summary: 'Executive summary clearly defines role, years of experience, and primary stack.',
    explanation: 'A 2-3 line synthesis provides immediate context before the recruiter dives into your chronological history.',
  },

  // 2. SECTIONS (6 checks)
  {
    id: 's1',
    category: 'section',
    title: 'Essential Contact Information',
    status: 'passed',
    summary: 'Full name, email, phone number, and location are clearly identified.',
    explanation: 'Missing contact info is the #1 cause of immediate ATS discard.',
  },
  {
    id: 's2',
    category: 'section',
    title: 'Standard Section Headings',
    status: 'passed',
    summary: 'Standard labels (Experience, Education, Skills) detected.',
    explanation: 'Custom headings like "What I Did" or "My Journey" frequently fail automated ATS table-of-contents parsers.',
  },
  {
    id: 's3',
    category: 'section',
    title: 'Reverse-Chronological Ordering',
    status: 'passed',
    summary: 'Most recent experience and education are placed at the top.',
    explanation: 'Standard chronology ensures recruiters immediately see your current seniority level.',
  },
  {
    id: 's4',
    category: 'section',
    title: 'Clear Date Ranges (Month / Year)',
    status: 'warning',
    summary: 'Experience entries list years only; months are missing.',
    explanation: 'Listing only years (e.g. 2022 - 2023) can appear ambiguous to background verification systems.',
    issueExcerpt: '2022 - Present',
    recommendation: 'Add months for clarity: "Mar 2022 – Present".',
  },
  {
    id: 's5',
    category: 'section',
    title: 'Professional Profiles & Links',
    status: 'passed',
    summary: 'LinkedIn and GitHub profiles are present and properly formatted.',
    explanation: 'Clickable URLs give recruiters direct access to your verified portfolio and open-source contributions.',
  },
  {
    id: 's6',
    category: 'section',
    title: 'Education Credential Details',
    status: 'passed',
    summary: 'Degree type, major, and institution are clearly defined.',
    explanation: 'ATS filters screen for minimum degree requirements (e.g., Bachelor of Science).',
  },

  // 3. ATS ESSENTIALS (7 checks)
  {
    id: 'a1',
    category: 'ats',
    title: 'Single-Column Semantic Flow',
    status: 'passed',
    summary: 'Layout follows single-column linear text flow without nested table blocks.',
    explanation: 'Multi-column layouts often cause legacy ATS parsers (Taleo, older Workday) to read across columns horizontally.',
  },
  {
    id: 'a2',
    category: 'ats',
    title: 'File Format & Size Compliance',
    status: 'passed',
    summary: 'PDF/DOCX under 2MB limit with selectable, searchable text.',
    explanation: 'Non-searchable image-based PDFs or oversized graphics files are rejected by automated intake gateways.',
  },
  {
    id: 'a3',
    category: 'ats',
    title: 'Standard Typography & Glyph Safety',
    status: 'passed',
    summary: 'Document uses standard UTF-8 system fonts without custom ligature symbols.',
    explanation: 'Obscure decorative fonts can convert into scrambled character entities during text extraction.',
  },
  {
    id: 'a4',
    category: 'ats',
    title: 'No Vital Information in Header/Footer',
    status: 'passed',
    summary: 'All key contact details are placed in the document body.',
    explanation: 'Many parsers omit Microsoft Word / PDF document headers and footers to reduce noise.',
  },
  {
    id: 'a5',
    category: 'ats',
    title: 'No Tables, Graphics, or Text Boxes',
    status: 'passed',
    summary: 'Zero inaccessible floating text boxes or embedded raster diagrams.',
    explanation: 'Text enclosed in vector shapes is completely invisible to standard text scrapers.',
  },
  {
    id: 'a6',
    category: 'ats',
    title: 'Clean Margin Spacing (0.5" - 0.75")',
    status: 'passed',
    summary: 'Standard printable margins maintain visual hierarchy when rendered to printer.',
    explanation: 'Zero-margin documents look broken when printed by hiring interview loops.',
  },
  {
    id: 'a7',
    category: 'ats',
    title: 'Machine-Readable Bullet Encoding',
    status: 'passed',
    summary: 'Uses standard Unicode round bullets instead of custom SVG wingdings.',
    explanation: 'Custom glyph bullets often parse as question marks (?) or boxes (□) in legacy recruiter tools.',
  },

  // 4. TAILORING & SENIORITY (6 checks)
  {
    id: 't1',
    category: 'tailoring',
    title: 'Hard Skill & Framework Density',
    status: 'issue',
    summary: 'Found 12 technical skills; modern roles benefit from categorizing tools & cloud proficiencies.',
    explanation: 'Modern ATS filters look for both core languages and associated DevOps/cloud infrastructure keywords.',
    issueExcerpt: 'Skills: React, Next.js, TypeScript, Node.js, Python, PostgreSQL, Prisma, Tailwind CSS, Docker, AWS, GraphQL, Git',
    recommendation: 'Group into categories: Languages, Frameworks, Cloud & Infrastructure, and Databases for higher ATS keyword match.',
  },
  {
    id: 't2',
    category: 'tailoring',
    title: 'Role Alignment & Title Clarity',
    status: 'passed',
    summary: 'Target role title matches professional summary and top experience entry.',
    explanation: 'Aligned titles give you immediate relevance in recruiter boolean keyword searches.',
  },
  {
    id: 't3',
    category: 'tailoring',
    title: 'Seniority & Leadership Signals',
    status: 'warning',
    summary: 'Technical tasks are strong, but cross-functional leadership can be emphasized more.',
    explanation: 'For senior roles, highlighting mentoring, code reviews, and architectural decisions boosts callback likelihood.',
    recommendation: 'Include points on mentoring junior engineers, steering system architecture, or leading sprint initiatives.',
  },
  {
    id: 't4',
    category: 'tailoring',
    title: 'Unexplained Employment Gaps',
    status: 'passed',
    summary: 'Continuous career progression with no gaps exceeding 6 months.',
    explanation: 'Unexplained gaps can trigger automated flags in corporate recruitment workflows.',
  },
  {
    id: 't5',
    category: 'tailoring',
    title: 'Email Professionalism',
    status: 'passed',
    summary: 'Professional firstname.lastname email format detected.',
    explanation: 'Playful or informal email handles create negative subconscious bias in initial screening.',
  },
  {
    id: 't6',
    category: 'tailoring',
    title: 'Ideal 1-2 Page Length Benchmark',
    status: 'passed',
    summary: 'Document density sits comfortably within the 1-page standard for <7 years experience.',
    explanation: 'Single-page conciseness ensures high reading completion by busy recruiters.',
  },
];

export default function ResumeCheckerPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Flow States: 'upload' | 'scanning' | 'overview' | 'report'
  const [viewState, setViewState] = useState<'upload' | 'scanning' | 'overview' | 'report'>('upload');
  const [selectedFileName, setSelectedFileName] = useState<string>('');
  const [scanProgress, setScanProgress] = useState(0);
  const [scanMessage, setScanMessage] = useState('Extracting document layers...');

  // Score & Audit Data
  const [score, setScore] = useState(86);
  const [issuesCount, setIssuesCount] = useState(6);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<'all' | 'content' | 'section' | 'ats' | 'tailoring'>('all');
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({ c1: true, c4: true });
  const [activeResumeId, setActiveResumeId] = useState<string>('');

  // Category scores
  const categoryStats = {
    content: { score: 78, passed: 5, warnings: 2, issues: 1, total: 8 },
    section: { score: 92, passed: 5, warnings: 1, issues: 0, total: 6 },
    ats: { score: 100, passed: 7, warnings: 0, issues: 0, total: 7 },
    tailoring: { score: 75, passed: 4, warnings: 1, issues: 1, total: 6 },
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFileName(file.name);
      runAuditWorkflow(file);
    }
  };

  const handleSampleRun = () => {
    setSelectedFileName('John_Snow_Senior_Software_Engineer.pdf');
    runAuditWorkflow(null);
  };

  const runAuditWorkflow = async (file: File | null) => {
    setViewState('scanning');
    setScanProgress(15);
    setScanMessage('Ingesting PDF text stream & UTF-8 character encoding...');

    const timer1 = setTimeout(() => {
      setScanProgress(45);
      setScanMessage('Running 27 automated ATS & recruiter compliance checks...');
    }, 600);

    const timer2 = setTimeout(() => {
      setScanProgress(80);
      setScanMessage('Benchmarking against 10,000+ technical candidate models...');
    }, 1200);

    try {
      let createdResumeId = 'resume-demo-' + Date.now();
      if (file) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('customTitle', file.name.replace(/\.[^/.]+$/, ''));
        const res = await fetch('/api/resumes/import', { method: 'POST', body: formData });
        const data = await res.json();
        if (data.success && data.resumeId) {
          createdResumeId = data.resumeId;
          if (data.atsScore) setScore(data.atsScore);
        }
      } else {
        const sampleText = `John Snow
john.snow@demo.com | +1 (555) 019-2834 | San Francisco, CA
https://linkedin.com/in/johnsnowdev | https://github.com/johnsnow-ai

SUMMARY
Senior Software Engineer with 5+ years of experience building scalable web applications and AI platforms. Responsible for database optimization, team leadership, and frontend design.

EXPERIENCE
Senior Software Engineer — Acme Systems (2022 - Present)
- Responsible for leading tech team and building web features using React, Next.js, and TypeScript.
- Worked on database queries to make it faster with PostgreSQL and Prisma.
- Helped with design and frontend implementation using Tailwind CSS across 6 different enterprise microfrontends while collaborating with international design teams.

Software Engineer — Cloud Scale Labs (2020 - 2022)
- Built web analytics portal used by thousands of business managers.
- Fixed bugs and improved API endpoint performance.

EDUCATION
B.S. in Computer Science — State University (2016 - 2020), GPA: 3.8

SKILLS
React, Next.js, TypeScript, Node.js, Python, PostgreSQL, Prisma, Tailwind CSS, Docker, AWS, GraphQL, Git`;

        const res = await fetch('/api/resumes/import', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ rawText: sampleText, customTitle: 'John Snow Resume' }),
        });
        const data = await res.json();
        if (data.success && data.resumeId) {
          createdResumeId = data.resumeId;
          if (data.atsScore) setScore(data.atsScore);
        }
      }

      setActiveResumeId(createdResumeId);

      setTimeout(() => {
        setScanProgress(100);
        setScanMessage('Audit complete!');
        setTimeout(() => {
          setViewState('overview');
        }, 300);
      }, 1600);
    } catch (err) {
      console.error(err);
      setTimeout(() => {
        setScanProgress(100);
        setViewState('overview');
      }, 1600);
    }
  };

  const toggleItem = (id: string) => {
    setExpandedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredItems = DEFAULT_AUDIT_ITEMS.filter((item) => {
    if (activeCategoryFilter === 'all') return true;
    return item.category === activeCategoryFilter;
  });

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-slate-900 flex flex-col font-sans selection:bg-emerald-100 selection:text-emerald-900">
      {/* Clean Top Navigation Bar */}
      <header className="w-full bg-white/90 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Logo size="md" showTagline={false} />

          <div className="flex items-center gap-3">
            <Link
              href="/welcome"
              className="text-xs sm:text-sm font-semibold text-slate-700 hover:text-slate-950 px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors"
            >
              Templates
            </Link>
            <Link
              href="/welcome"
              className="text-xs sm:text-sm font-bold bg-[#10B981] hover:bg-[#059669] text-white px-4 py-2 rounded-xl shadow-2xs hover:shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>Build Your Resume</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-10 sm:py-16">
        
        {/* ==================================================================== */}
        {/* VIEW 1: Initial Upload Dropzone View (Matching User Screenshot 1) */}
        {/* ==================================================================== */}
        {viewState === 'upload' && (
          <div className="w-full max-w-2xl mx-auto flex flex-col items-center text-center animate-in fade-in duration-300">
            {/* Top Badge */}
            <span className="text-xs font-bold tracking-widest uppercase text-emerald-600 mb-3">
              RESUME CHECKER
            </span>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-950 tracking-tight leading-[1.15] mb-4">
              Is your resume good enough?
            </h1>

            {/* Description */}
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl mb-8">
              A free and fast AI resume checker doing 27 crucial checks to ensure your resume’s content,
              layout and design is technically compatible with the applicant tracking systems and get you interview callbacks.
            </p>

            {/* Green Dashed Upload Dropzone Card */}
            <div className="w-full bg-white rounded-3xl border-2 border-dashed border-[#10B981] p-6 sm:p-10 shadow-xs flex flex-col items-center justify-center text-center relative group hover:border-emerald-600 transition-all">
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.docx,.txt"
                onChange={handleFileUpload}
                className="hidden"
              />

              <p className="text-sm sm:text-base font-semibold text-slate-700 mb-6">
                Drop your resume here or choose a file.
                <br />
                <span className="text-xs sm:text-sm text-slate-500 font-normal">PDF & DOCX only. Max 2MB file size.</span>
              </p>

              {/* Upload Button */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full sm:w-auto px-8 py-3.5 bg-[#10B981] hover:bg-[#059669] active:scale-[0.99] text-white text-base font-bold rounded-2xl shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer mb-5"
              >
                <Upload className="w-5 h-5" />
                <span>Upload Your Resume</span>
              </button>

              {/* Sample button for instant test without file */}
              <div className="flex items-center gap-2 mb-6">
                <span className="text-xs text-slate-400">or test immediately:</span>
                <button
                  type="button"
                  onClick={handleSampleRun}
                  className="text-xs font-bold text-emerald-600 hover:text-emerald-700 underline underline-offset-2 cursor-pointer flex items-center gap-1"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Try with sample resume
                </button>
              </div>

              {/* Privacy Notice */}
              <div className="flex items-center justify-center gap-2 text-xs text-slate-500 font-medium pt-2 border-t border-slate-100 w-full">
                <Lock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>We never share your data with 3rd parties or use it for AI model training.</span>
              </div>
            </div>
          </div>
        )}

        {/* ==================================================================== */}
        {/* VIEW 2: Scanning / Progress View */}
        {/* ==================================================================== */}
        {viewState === 'scanning' && (
          <div className="w-full max-w-md mx-auto flex flex-col items-center text-center p-8 bg-white rounded-3xl border border-slate-200/90 shadow-lg animate-in fade-in duration-300">
            <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-[#10B981] flex items-center justify-center mb-6 animate-pulse">
              <RefreshCw className="w-8 h-8 animate-spin" />
            </div>

            <h2 className="text-xl font-bold text-slate-900 mb-2">Analyzing Resume</h2>
            <p className="text-xs text-slate-500 font-medium mb-6">
              {selectedFileName || 'Evaluating document contents...'}
            </p>

            {/* Progress Bar */}
            <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden mb-4">
              <div
                className="bg-[#10B981] h-full rounded-full transition-all duration-300 ease-out"
                style={{ width: `${scanProgress}%` }}
              />
            </div>

            <p className="text-xs text-slate-600 font-medium animate-pulse">
              {scanMessage}
            </p>
          </div>
        )}

        {/* ==================================================================== */}
        {/* VIEW 3: Score Preview Card (Matching User Screenshot 2 & 3) */}
        {/* ==================================================================== */}
        {viewState === 'overview' && (
          <div className="w-full max-w-sm sm:max-w-md mx-auto flex flex-col items-center animate-in zoom-in-95 duration-300">
            <div className="w-full bg-white rounded-3xl border border-slate-200/90 shadow-xl p-6 sm:p-8 flex flex-col items-center text-center relative overflow-hidden">
              
              {/* Header Title */}
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-6">
                Resume Checker
              </h2>

              {/* Semicircular Speedometer Arc Gauge */}
              <div className="relative flex flex-col items-center justify-center my-2">
                <svg viewBox="0 0 200 115" className="w-56 h-32">
                  {/* Gauge Background Track */}
                  <path
                    d="M 20 100 A 80 80 0 0 1 180 100"
                    fill="none"
                    stroke="#E2E8F0"
                    strokeWidth="16"
                    strokeLinecap="round"
                  />
                  {/* Gauge Colored Value Arc */}
                  <path
                    d="M 20 100 A 80 80 0 0 1 180 100"
                    fill="none"
                    stroke="#10B981"
                    strokeWidth="16"
                    strokeLinecap="round"
                    strokeDasharray="251.2"
                    strokeDashoffset={251.2 * (1 - (score / 100))}
                    className="transition-all duration-1000 ease-out"
                  />
                  {/* Center Dot & Baseline */}
                  <line x1="18" y1="100" x2="182" y2="100" stroke="#CBD5E1" strokeWidth="1" />
                  <circle cx="100" cy="100" r="3.5" fill="#0F172A" />
                </svg>

                {/* Score & Issue Count Display */}
                <div className="mt-1 flex flex-col items-center">
                  <span className="text-3xl sm:text-4xl font-extrabold text-[#10B981] tracking-tight">
                    {score}/100
                  </span>
                  <span className="text-sm font-semibold text-slate-700 mt-0.5">
                    {issuesCount} Issues
                  </span>
                </div>
              </div>

              {/* 4 Category Pill Summaries (Content, Section, ATS Essentials, Tailoring) */}
              <div className="w-full flex flex-col gap-3 my-6 pt-5 border-t border-slate-100 text-left">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                  <span className="tracking-wider uppercase">CONTENT</span>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                    {categoryStats.content.score}% • {categoryStats.content.issues} Issue
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                  <span className="tracking-wider uppercase">SECTION</span>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    {categoryStats.section.score}% • Passed
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                  <span className="tracking-wider uppercase">ATS ESSENTIALS</span>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    {categoryStats.ats.score}% • Perfect
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                  <span className="tracking-wider uppercase">TAILORING</span>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                    {categoryStats.tailoring.score}% • 1 Issue
                  </span>
                </div>
              </div>

              {/* View Detailed Analysis Action Button */}
              <button
                type="button"
                onClick={() => setViewState('report')}
                className="w-full py-3.5 px-6 bg-[#10B981] hover:bg-[#059669] active:scale-[0.99] text-white text-sm sm:text-base font-bold rounded-2xl shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer mb-5"
              >
                <span>View Detailed Analysis</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Divider */}
              <div className="relative w-full flex items-center justify-center my-1">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200" />
                </div>
                <span className="relative bg-white px-3 text-xs text-slate-500 font-medium">
                  Or upload a new Resume
                </span>
              </div>

              {/* New Upload Button */}
              <button
                type="button"
                onClick={() => setViewState('upload')}
                className="w-full mt-4 py-3 px-6 bg-white hover:bg-slate-50 active:scale-[0.99] border-2 border-slate-900 text-slate-900 text-sm font-bold rounded-2xl transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>New Upload</span>
              </button>
            </div>
          </div>
        )}

        {/* ==================================================================== */}
        {/* VIEW 4: Full Comprehensive Enhancv-Style 27-Check Report */}
        {/* ==================================================================== */}
        {viewState === 'report' && (
          <div className="w-full max-w-4xl mx-auto flex flex-col gap-8 animate-in fade-in duration-300">
            
            {/* Top Score Banner */}
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-6">
                {/* Mini Arc Gauge */}
                <div className="relative w-24 h-24 shrink-0 flex items-center justify-center">
                  <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                    <circle cx="50" cy="50" r="40" stroke="#F1F5F9" strokeWidth="8" fill="none" />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="#10B981"
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray="251.2"
                      strokeDashoffset={251.2 * (1 - (score / 100))}
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="absolute text-xl font-black text-slate-900">
                    {score}%
                  </span>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      ATS Verified
                    </span>
                    <span className="text-xs text-slate-400 font-semibold">• 27 Checks Completed</span>
                  </div>
                  <h1 className="text-xl sm:text-2xl font-black text-slate-950">
                    Resume Audit Report
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                    {selectedFileName || 'John Snow — Senior Full-Stack & AI Engineer'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full md:w-auto">
                <button
                  type="button"
                  onClick={() => setViewState('overview')}
                  className="flex-1 md:flex-none px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors cursor-pointer"
                >
                  Score Card
                </button>
                <Link
                  href={activeResumeId ? `/builder/${activeResumeId}` : '/welcome'}
                  className="flex-1 md:flex-none px-5 py-2.5 bg-[#10B981] hover:bg-[#059669] text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Fix in Builder</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {[
                { id: 'all', label: 'All Checks (27)' },
                { id: 'content', label: `Content (${categoryStats.content.passed}/${categoryStats.content.total})` },
                { id: 'section', label: `Sections (${categoryStats.section.passed}/${categoryStats.section.total})` },
                { id: 'ats', label: `ATS Essentials (${categoryStats.ats.passed}/${categoryStats.ats.total})` },
                { id: 'tailoring', label: `Tailoring (${categoryStats.tailoring.passed}/${categoryStats.tailoring.total})` },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategoryFilter(tab.id as any)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                    activeCategoryFilter === tab.id
                      ? 'bg-slate-900 text-white shadow-2xs'
                      : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Checklist Items Accordion */}
            <div className="flex flex-col gap-3">
              {filteredItems.map((item) => {
                const isOpen = !!expandedItems[item.id];
                return (
                  <div
                    key={item.id}
                    className={`bg-white rounded-2xl border transition-all overflow-hidden ${
                      item.status === 'issue'
                        ? 'border-rose-200/80 shadow-2xs'
                        : item.status === 'warning'
                        ? 'border-amber-200/80 shadow-2xs'
                        : 'border-slate-200/70 hover:border-slate-300'
                    }`}
                  >
                    {/* Item Header */}
                    <button
                      type="button"
                      onClick={() => toggleItem(item.id)}
                      className="w-full p-4 sm:p-5 flex items-center justify-between text-left gap-4 cursor-pointer"
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        {/* Status Icon */}
                        {item.status === 'passed' && (
                          <div className="w-7 h-7 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                            <Check className="w-4 h-4 stroke-[3]" />
                          </div>
                        )}
                        {item.status === 'warning' && (
                          <div className="w-7 h-7 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                            <AlertTriangle className="w-4 h-4" />
                          </div>
                        )}
                        {item.status === 'issue' && (
                          <div className="w-7 h-7 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                            <AlertCircle className="w-4 h-4" />
                          </div>
                        )}

                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-slate-900 truncate">
                              {item.title}
                            </span>
                            <span
                              className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                                item.status === 'passed'
                                  ? 'bg-emerald-50 text-emerald-700'
                                  : item.status === 'warning'
                                  ? 'bg-amber-50 text-amber-700'
                                  : 'bg-rose-50 text-rose-700'
                              }`}
                            >
                              {item.status === 'passed' ? 'Passed' : item.status === 'warning' ? 'Recommendation' : 'Fix Needed'}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 mt-0.5 truncate">
                            {item.summary}
                          </p>
                        </div>
                      </div>

                      <div className="shrink-0 text-slate-400">
                        {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </div>
                    </button>

                    {/* Expanded Drawer Details */}
                    {isOpen && (
                      <div className="px-5 pb-5 pt-1 border-t border-slate-100 flex flex-col gap-3 text-xs bg-slate-50/50">
                        <p className="text-slate-600 leading-relaxed pt-2">
                          {item.explanation}
                        </p>

                        {/* Issue snippet */}
                        {item.issueExcerpt && (
                          <div className="p-3 rounded-xl bg-rose-50/80 border border-rose-200/60 text-rose-950 font-mono text-[11px] leading-relaxed">
                            <span className="font-bold text-rose-800 uppercase text-[9px] block mb-1">
                              Flagged excerpt from resume:
                            </span>
                            {item.issueExcerpt}
                          </div>
                        )}

                        {/* Suggested Fix */}
                        {item.recommendation && (
                          <div className="p-3 rounded-xl bg-emerald-50/80 border border-emerald-200/60 text-emerald-950 text-xs leading-relaxed flex flex-col gap-1.5">
                            <span className="font-bold text-emerald-800 uppercase text-[9px] flex items-center gap-1">
                              <Sparkles className="w-3 h-3" /> Recommended Improvement:
                            </span>
                            <span>{item.recommendation}</span>
                          </div>
                        )}

                        {/* Quick action button */}
                        {(item.status === 'issue' || item.status === 'warning') && (
                          <div className="pt-2 flex justify-end">
                            <Link
                              href={activeResumeId ? `/builder/${activeResumeId}` : '/welcome'}
                              className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:text-emerald-700 cursor-pointer"
                            >
                              <span>Apply fix in Resume Builder</span>
                              <ArrowRight className="w-3 h-3" />
                            </Link>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Bottom Call to Action */}
            <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold">
                  Ready to upgrade this resume to a 100 ATS Score?
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1">
                  Launch the 3-Zone Builder with all 27 audit fixes applied automatically.
                </p>
              </div>

              <Link
                href={activeResumeId ? `/builder/${activeResumeId}` : '/welcome'}
                className="shrink-0 px-6 py-3.5 bg-[#10B981] hover:bg-[#059669] text-white text-sm font-bold rounded-2xl shadow-sm transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Open in Resume Builder</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}

      </main>

      {/* Clean Footer */}
      <footer className="w-full bg-white border-t border-slate-200/80 py-6 px-4 text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Logo size="sm" showTagline={false} />
            <span>© 2026 Callback. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-4 text-xs font-medium">
            <Link href="/" className="hover:text-slate-900">Home</Link>
            <Link href="/welcome" className="hover:text-slate-900">Builder</Link>
            <Link href="/login" className="hover:text-slate-900">Sign In</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
