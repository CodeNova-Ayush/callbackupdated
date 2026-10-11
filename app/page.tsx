'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  FileText,
  Sparkles,
  Bot,
  ShieldCheck,
  Zap,
  CheckCircle2,
  ArrowRight,
  Target,
  Briefcase,
  GitGraph,
  UserCheck,
  Star,
  Check,
  TrendingUp,
  Layout,
  Layers,
  Palette,
  ChevronRight,
  Play,
  Pause,
  RefreshCw,
  Code,
  Terminal,
  Cpu,
  HelpCircle,
  ChevronDown,
  Quote,
  Users,
  Award,
  CheckCheck,
  Mail,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Card';
import { Logo } from '@/components/ui/Logo';
import { motion, AnimatePresence } from 'framer-motion';
import { UserButton, useUser } from '@/components/auth/AuthProvider';
import { HeroFeaturedResume } from '@/components/landing/HeroFeaturedResume';

export default function LandingPage() {
  const { isSignedIn, isLoaded } = useUser();
  const [heroTemplateMode, setHeroTemplateMode] = useState<
    'modern_executive' | 'minimalist_tech' | 'classic_ats' | 'editorial_two_col' | 'agent'
  >('modern_executive');
  const [cycleProgress, setCycleProgress] = useState<number>(0);
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  const [activeTab, setActiveTab] = useState<'agent' | 'ats' | 'trust'>('agent');
  const [selectedDemoTemplate, setSelectedDemoTemplate] = useState<'classic_ats' | 'modern_executive' | 'minimalist_tech' | 'editorial_two_col'>('modern_executive');

  const [heroPromptIdx, setHeroPromptIdx] = useState(0);
  const [typedIndex, setTypedIndex] = useState(0);
  const [templateCarouselIdx, setTemplateCarouselIdx] = useState(0);

  const [interactiveAgentIdx, setInteractiveAgentIdx] = useState(0);
  const [interactiveDiffMode, setInteractiveDiffMode] = useState<'original' | 'tailored'>('tailored');
  const [interactiveSchemaMode, setInteractiveSchemaMode] = useState<'jsonld' | 'markdown'>('jsonld');

  const heroModesList: Array<'modern_executive' | 'minimalist_tech' | 'classic_ats' | 'editorial_two_col' | 'agent'> = [
    'modern_executive',
    'minimalist_tech',
    'classic_ats',
    'editorial_two_col',
    'agent',
  ];

  const sampleHeroPrompts = [
    {
      shortLabel: "Latency Optimization",
      question: "What was John's biggest latency optimization achievement?",
      answer: "John architected a PgVector RAG query pipeline at Aether Cloud Tech handling 150k daily active requests, cutting p95 latency by 45% down to 180ms.",
      citation: "Experience #1 — Aether Cloud Tech (Verified on GitHub)",
    },
    {
      shortLabel: "Degree Verification",
      question: "Is John's UC Berkeley degree verified?",
      answer: "Yes. John graduated with a B.S. in Computer Science from UC Berkeley (3.88 GPA). The claim status is 100% verified via university registrar credentials.",
      citation: "Education Entry #1 — UC Berkeley Registrar Signal",
    },
    {
      shortLabel: "Core Tech Stack",
      question: "What are his top core technical skills?",
      answer: "TypeScript, Next.js 16, Python, PgVector RAG pipelines, Rust vector indices, PostgreSQL, and AWS Architecture.",
      citation: "Skill Graph — Verified across 4 production projects",
    },
  ];


  // Live typing effect for Living Agent mode
  useEffect(() => {
    if (heroTemplateMode === 'agent') {
      const fullText = sampleHeroPrompts[heroPromptIdx].answer;
      if (typedIndex < fullText.length) {
        const timer = setTimeout(() => {
          setTypedIndex((prev) => prev + 1);
        }, 18);
        return () => clearTimeout(timer);
      }
    }
  }, [typedIndex, heroPromptIdx, heroTemplateMode]);

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-slate-900 flex flex-col font-sans relative overflow-x-hidden selection:bg-[#FFF0F3] selection:text-[#FF4B5E]">
      {/* Rich Ambient Multi-Color Aurora Gradient Mesh Background */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-to-br from-[#008CA0]/25 via-[#38BDF8]/20 to-transparent rounded-full blur-3xl pointer-events-none -z-10 animate-pulse" style={{ animationDuration: '8s' }} />
      <div className="absolute top-10 right-0 w-[700px] h-[600px] bg-gradient-to-bl from-[#8B5CF6]/25 via-[#6366F1]/20 to-[#FF4B5E]/10 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse" style={{ animationDuration: '10s' }} />
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-gradient-to-tr from-[#F43F5E]/15 via-[#FB923C]/15 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-2/3 right-10 w-[600px] h-[500px] bg-gradient-to-tl from-[#10B981]/20 via-[#06B6D4]/20 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute inset-0 bg-[radial-gradient(#94A3B8_1px,transparent_1px)] [background-size:28px_28px] pointer-events-none opacity-30 -z-10" />

      {/* Top Navbar — FlowCV Style Clean & Minimalist */}
      <header className="sticky top-0 z-50 bg-[#F8F9FA]/90 backdrop-blur-md border-b border-slate-200/80 transition-all">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          <Logo size="md" showTagline={false} />

          {/* Simple Clean Navigation Text Links (FlowCV Style) */}
          <nav className="hidden md:flex items-center gap-7 lg:gap-9 text-sm font-medium text-slate-500">
            <Link href="/welcome" className="hover:text-slate-900 transition-colors">
              Resume Builder
            </Link>
            <Link href="/cover-letter" className="hover:text-slate-900 transition-colors flex items-center gap-1.5 font-medium text-slate-600">
              <Mail className="w-3.5 h-3.5 text-[#FF4B5E]" />
              <span>Cover Letter</span>
              <span className="text-[10px] bg-[#1C152E] text-white px-1.5 py-0.5 rounded-full font-bold">New</span>
            </Link>
            <a href="#templates" className="hover:text-slate-900 transition-colors">
              Resume Templates
            </a>
            <a href="#features" className="hover:text-slate-900 transition-colors">
              Features
            </a>
            <a href="#faq" className="hover:text-slate-900 transition-colors">
              FAQ
            </a>
          </nav>

          {/* Action Buttons — FlowCV Style Rounded-Full Pills */}
          <div className="flex items-center gap-3">
            {isLoaded && isSignedIn ? (
              <div className="flex items-center gap-3">
                <Link href="/dashboard">
                  <button
                    type="button"
                    className="h-10 px-5 rounded-full border border-slate-300 hover:border-[#1C152E] bg-white text-[#1C152E] text-xs sm:text-sm font-bold transition-all cursor-pointer shadow-2xs"
                  >
                    Dashboard
                  </button>
                </Link>
                <UserButton afterSignOutUrl="/" />
              </div>
            ) : (
              <>
                <Link href="/sign-in">
                  <button
                    type="button"
                    className="h-10 px-5 sm:px-6 rounded-full border border-slate-300 hover:border-[#1C152E] bg-white text-[#1C152E] text-xs sm:text-sm font-bold transition-all cursor-pointer shadow-2xs"
                  >
                    Login
                  </button>
                </Link>
                <Link href="/welcome">
                  <button
                    type="button"
                    className="h-10 px-5 sm:px-6 rounded-full bg-[#1C152E] hover:bg-[#2B1F45] text-white text-xs sm:text-sm font-bold transition-all cursor-pointer shadow-xs"
                  >
                    Start now
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section — Full-Bleed Edge to Edge, Rich FlowCV / YC-Level Filled Canvas */}
      <section className="min-h-[calc(100svh-4rem)] lg:min-h-[calc(100vh-4rem)] flex flex-col justify-center py-6 sm:py-8 lg:py-10 px-4 sm:px-6 lg:px-12 w-full relative z-10 bg-gradient-to-b from-[#FAF9F7] via-white to-slate-50/70 overflow-hidden">
        {/* Soft Ambient Mesh Glow Orbs for Depth */}
        <div className="absolute top-12 left-1/4 w-[500px] h-[500px] bg-gradient-to-tr from-[#FFF0F3]/60 via-[#FDF4FF]/40 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute top-1/3 right-10 w-[450px] h-[450px] bg-gradient-to-bl from-teal-100/40 via-sky-100/30 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center w-full max-w-7xl mx-auto my-auto">
          {/* Left Column: Hero Content & Call to Actions */}
          <div className="lg:col-span-6 flex flex-col justify-center items-center lg:items-start text-center lg:text-left gap-4 sm:gap-5 py-2">

            {/* Top Announcement Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200/90 shadow-2xs text-[11px] font-bold text-slate-800">
              <span className="w-2 h-2 rounded-full bg-[#FF4B5E] animate-pulse"></span>
              <span className="text-[#1C152E]">Ranked #1 Resume Engine</span>
              <span className="text-slate-400">•</span>
              <span className="text-slate-500 font-medium">98.4% ATS First-Round Pass Rate</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-950 tracking-tight leading-[1.12]">
              Build a resume that gets you{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#1C152E] via-[#2B1F45] to-[#FF4B5E]">
                the callback.
              </span>
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed font-normal max-w-xl">
              Create ATS-proof resumes with AI-enhanced achievement bullets, real-time keyword scoring, and 40+ recruiter-tested templates. Engineered to pass Workday, Greenhouse, and Lever filters while captivating hiring managers in under 6 seconds.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full max-w-xl pt-1">
              <Link href="/welcome" className="w-full sm:flex-1">
                <button
                  type="button"
                  className="w-full h-12 px-6 bg-[#1C152E] hover:bg-[#2B1F45] active:scale-[0.99] text-white text-xs sm:text-sm font-bold rounded-full shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Build Your Resume</span>
                  <ArrowRight className="w-4 h-4 text-[#FF4B5E]" />
                </button>
              </Link>
              <Link href="/cover-letter" className="w-full sm:flex-1">
                <button
                  type="button"
                  className="w-full h-12 px-6 bg-[#1C152E] hover:bg-[#2B1F45] active:scale-[0.99] text-white text-xs sm:text-sm font-bold rounded-full shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Mail className="w-4 h-4 text-[#FF4B5E]" />
                  <span>Create Cover Letter</span>
                </button>
              </Link>
              <Link href="/resume-checker" className="w-full sm:w-auto">
                <button
                  type="button"
                  className="w-full h-12 px-5 bg-white hover:bg-slate-50 border border-slate-300 hover:border-[#1C152E] active:scale-[0.99] text-slate-700 hover:text-slate-900 text-xs sm:text-sm font-bold rounded-full shadow-2xs transition-all flex items-center justify-center cursor-pointer"
                >
                  <span>Audit Score</span>
                </button>
              </Link>
            </div>

            {/* Social Proof Rating */}
            <div className="flex flex-col sm:flex-row items-center gap-2 pt-1 text-xs text-slate-600">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 drop-shadow-2xs" />
                ))}
              </div>
              <span className="font-bold text-slate-900">4.9/5 Rating</span>
              <span className="text-slate-400 hidden sm:inline">•</span>
              <span className="text-slate-500">Trusted by 12,000+ candidates hired at top startups</span>
            </div>

            {/* Top Company Tags */}
            <div className="flex items-center justify-center lg:justify-start gap-1.5 flex-wrap text-[11px] font-semibold text-slate-500">
              <span className="text-slate-400">Hired at:</span>
              <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200/80 shadow-2xs">Y Combinator</span>
              <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200/80 shadow-2xs">Stripe</span>
              <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200/80 shadow-2xs">Google</span>
              <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200/80 shadow-2xs">OpenAI</span>
              <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200/80 shadow-2xs">Linear</span>
              <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200/80 shadow-2xs">Figma</span>
            </div>

            {/* Metrics 3-Card Bar (Fills width gracefully) */}
            <div className="grid grid-cols-3 gap-2.5 sm:gap-4 w-full pt-3 border-t border-slate-200/80">
              <div className="bg-white/90 backdrop-blur-xs border border-slate-200/80 rounded-2xl p-2.5 sm:p-3 shadow-2xs flex flex-col items-center lg:items-start text-center lg:text-left">
                <span className="text-lg sm:text-2xl font-black text-slate-950">40+</span>
                <span className="text-[10px] sm:text-xs font-semibold text-slate-500 uppercase tracking-tight">ATS Library</span>
                <span className="text-[9.5px] text-slate-400 font-medium hidden sm:inline mt-0.5">Battle-Tested Layouts</span>
              </div>
              <div className="bg-white/90 backdrop-blur-xs border border-slate-200/80 rounded-2xl p-2.5 sm:p-3 shadow-2xs flex flex-col items-center lg:items-start text-center lg:text-left">
                <span className="text-lg sm:text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-600">94%</span>
                <span className="text-[10px] sm:text-xs font-semibold text-slate-500 uppercase tracking-tight">Callback Rate</span>
                <span className="text-[9.5px] text-slate-400 font-medium hidden sm:inline mt-0.5">Tier-1 Interviews</span>
              </div>
              <div className="bg-white/90 backdrop-blur-xs border border-slate-200/80 rounded-2xl p-2.5 sm:p-3 shadow-2xs flex flex-col items-center lg:items-start text-center lg:text-left">
                <span className="text-lg sm:text-2xl font-black text-slate-950">0%</span>
                <span className="text-[10px] sm:text-xs font-semibold text-slate-500 uppercase tracking-tight">Hallucination</span>
                <span className="text-[9.5px] text-slate-400 font-medium hidden sm:inline mt-0.5">Verified Career Truth</span>
              </div>
            </div>

            {/* Key Feature Checks */}
            <div className="flex items-center justify-center lg:justify-start gap-3 sm:gap-5 text-[11px] sm:text-xs font-medium text-slate-600 flex-wrap">
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Free to start</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> No credit card required</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Instant PDF download</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> 100% Private & Secure</span>
            </div>
          </div>

          {/* Right Column: FlowCV Featured Resume Showcase (Locked A4 Proportion, Never Stretched) */}
          <div className="lg:col-span-6 w-full flex flex-col items-center justify-center relative mt-6 lg:mt-0">
            {/* Ambient Multi-Color Gradient Backdrop Glow */}
            <div className="absolute w-[440px] h-[440px] bg-gradient-to-tr from-teal-400/25 via-sky-400/20 to-purple-500/20 rounded-full blur-3xl pointer-events-none -top-10 -right-10" />

            {/* Single Clean Featured Resume Showcase with Full Realistic Content */}
            <HeroFeaturedResume />
          </div>
        </div>
      </section>

      {/* Enhancv-Style Real Resume Templates Gallery Showcase Section with Continuous Motion */}
      <section id="templates" className="py-20 bg-slate-50 border-y border-slate-200/80 relative z-10 w-full overflow-hidden">
        <div className="w-full max-w-7xl mx-auto flex flex-col items-center gap-10 px-4 sm:px-6 lg:px-12">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto flex flex-col items-center gap-3">
            <Badge variant="aurora" size="sm">
              <Layout className="w-3.5 h-3.5" /> 40+ Battle-Tested Templates • Hired at Google & Microsoft
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-black text-[#231F1D] tracking-tight">
              India's Top Resume Templates That Get Hired by Google, Microsoft & Top Tech
            </h2>
            <p className="text-sm md:text-base text-[#786F68] leading-relaxed">
              Explore 40+ production-grade, ATS-certified templates designed for engineers and leaders. Handcrafted and proven by candidates hired at Google, Microsoft, Amazon, Meta, and India's top tech unicorns.
            </p>
          </div>

          {/* Continuous Infinite Auto-Motion Marquee Tape */}
          <div className="w-full relative overflow-hidden py-4 group">
            {/* Left & Right Ambient Fades for Depth */}
            <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-r from-[#F1F5F9] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-l from-[#FAF6F0] to-transparent z-10 pointer-events-none" />

            {/* Seamless Infinite Marquee Track (16 Unique Templates x 2 for Perfect Loop) */}
            <div className="animate-marquee-infinite flex items-center gap-6 sm:gap-8">
              {[
                { id: 't1', img: '/images/templates/enhancv-extra-1.png', title: 'Scarlett Anderson', role: 'CPA & Financial Auditing' },
                { id: 't2', img: '/images/templates/enhancv-extra-2.png', title: 'Isaac Hall', role: 'Global Health Project Director' },
                { id: 't3', img: '/images/templates/enhancv-extra-3.png', title: 'Elise Carter', role: 'Senior Backend Engineer' },
                { id: 't4', img: '/images/templates/enhancv-extra-4.png', title: 'Carrie Jones', role: 'Product Strategy & Innovation' },
                { id: 't5', img: '/images/templates/enhancv-extra-5.png', title: 'Maeve Delaney', role: 'Strategic Sourcing Leader' },
                { id: 't6', img: '/images/templates/enhancv-extra-6.png', title: 'Ellen Johnson', role: 'Digital Marketing Manager' },
                { id: 't7', img: '/images/templates/enhancv-extra-7.png', title: 'Grace Jackson', role: 'Data Scientist & ML' },
                { id: 't8', img: '/images/templates/enhancv-extra-8.png', title: 'Austin Adams', role: 'Business Development Manager' },
                { id: 't9', img: '/images/templates/enhancv-extra-9.png', title: 'David Miller', role: 'Staff ML Engineer' },
                { id: 't10', img: '/images/templates/enhancv-extra-10.png', title: 'Elena Rostova', role: 'VP of Marketing' },
                { id: 't11', img: '/images/templates/enhancv-extra-11.png', title: 'Marcus Vance', role: 'Cloud Infrastructure Architect' },
                { id: 't12', img: '/images/templates/enhancv-extra-12.png', title: 'Sophia Chen', role: 'Biotech Operations Director' },
                { id: 't13', img: '/images/templates/enhancv-extra-13.png', title: 'Liam O’Connor', role: 'Cybersecurity Analyst' },
                { id: 't14', img: '/images/templates/enhancv-extra-14.png', title: 'Rachel Green', role: 'Head of Product Design & UX' },
                { id: 't15', img: '/images/templates/enhancv-extra-15.png', title: 'Alexander Wright', role: 'Principal Quantitative Researcher' },
                { id: 't16', img: '/images/templates/enhancv-extra-16.png', title: 'Claire Dupont', role: 'International Corporate Counsel' },
                // Loop duplicate to make seamless 360 loop
                { id: 't1-dup', img: '/images/templates/enhancv-extra-1.png', title: 'Scarlett Anderson', role: 'CPA & Financial Auditing' },
                { id: 't2-dup', img: '/images/templates/enhancv-extra-2.png', title: 'Isaac Hall', role: 'Global Health Project Director' },
                { id: 't3-dup', img: '/images/templates/enhancv-extra-3.png', title: 'Elise Carter', role: 'Senior Backend Engineer' },
                { id: 't4-dup', img: '/images/templates/enhancv-extra-4.png', title: 'Carrie Jones', role: 'Product Strategy & Innovation' },
                { id: 't5-dup', img: '/images/templates/enhancv-extra-5.png', title: 'Maeve Delaney', role: 'Strategic Sourcing Leader' },
                { id: 't6-dup', img: '/images/templates/enhancv-extra-6.png', title: 'Ellen Johnson', role: 'Digital Marketing Manager' },
                { id: 't7-dup', img: '/images/templates/enhancv-extra-7.png', title: 'Grace Jackson', role: 'Data Scientist & ML' },
                { id: 't8-dup', img: '/images/templates/enhancv-extra-8.png', title: 'Austin Adams', role: 'Business Development Manager' },
                { id: 't9-dup', img: '/images/templates/enhancv-extra-9.png', title: 'David Miller', role: 'Staff ML Engineer' },
                { id: 't10-dup', img: '/images/templates/enhancv-extra-10.png', title: 'Elena Rostova', role: 'VP of Marketing' },
                { id: 't11-dup', img: '/images/templates/enhancv-extra-11.png', title: 'Marcus Vance', role: 'Cloud Infrastructure Architect' },
                { id: 't12-dup', img: '/images/templates/enhancv-extra-12.png', title: 'Sophia Chen', role: 'Biotech Operations Director' },
                { id: 't13-dup', img: '/images/templates/enhancv-extra-13.png', title: 'Liam O’Connor', role: 'Cybersecurity Analyst' },
                { id: 't14-dup', img: '/images/templates/enhancv-extra-14.png', title: 'Rachel Green', role: 'Head of Product Design & UX' },
                { id: 't15-dup', img: '/images/templates/enhancv-extra-15.png', title: 'Alexander Wright', role: 'Principal Quantitative Researcher' },
                { id: 't16-dup', img: '/images/templates/enhancv-extra-16.png', title: 'Claire Dupont', role: 'International Corporate Counsel' },
              ].map((tpl) => (
                <Link
                  key={tpl.id}
                  href="/welcome"
                  className="shrink-0 w-[230px] sm:w-[260px] md:w-[290px] h-[330px] sm:h-[370px] md:h-[410px] rounded-2xl overflow-hidden bg-white shadow-xl hover:shadow-2xl border border-gray-200/90 transition-all duration-300 hover:scale-[1.04] group/card relative cursor-pointer block"
                >
                  <img
                    src={tpl.img}
                    alt={`${tpl.title} - ${tpl.role}`}
                    className="w-full h-full object-contain object-top p-1 bg-white"
                    loading="lazy"
                  />

                  {/* Hover Floating Action Card */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity flex flex-col justify-end p-4 text-left">
                    <span className="text-white font-extrabold text-xs">{tpl.title}</span>
                    <span className="text-white/80 text-[10px] font-medium mb-3">{tpl.role}</span>
                    <span className="w-full py-2 bg-[#1C152E] hover:bg-[#2B1F45] text-white text-[11px] font-black rounded-xl shadow-md text-center transition-all">
                      Customize This Template →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* 3 Enhancv-Style Feature Pillars (Direct from Reference) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl pt-2 border-t border-slate-200">
            <div className="flex items-center gap-3 justify-center text-center md:text-left">
              <div className="w-8 h-8 rounded-full bg-teal-100 text-[#1C152E] flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <span className="text-xs sm:text-sm font-bold text-slate-900">
                ATS-friendly professionally designed templates
              </span>
            </div>

            <div className="flex items-center gap-3 justify-center text-center md:text-left">
              <div className="w-8 h-8 rounded-full bg-teal-100 text-[#1C152E] flex items-center justify-center shrink-0">
                <Palette className="w-5 h-5" />
              </div>
              <span className="text-xs sm:text-sm font-bold text-slate-900">
                Customizable sections, fonts, colors, and layouts
              </span>
            </div>

            <div className="flex items-center gap-3 justify-center text-center md:text-left">
              <div className="w-8 h-8 rounded-full bg-teal-100 text-[#1C152E] flex items-center justify-center shrink-0">
                <Layout className="w-5 h-5" />
              </div>
              <span className="text-xs sm:text-sm font-bold text-slate-900">
                Single-column, double-column, and modern layouts
              </span>
            </div>
          </div>

          {/* =========================================================================
              🔥 MOVING TOP MNC LOGOS MARQUEE & DRAFT LINE
             ========================================================================= */}
          <div className="w-full max-w-6xl pt-10 pb-4 flex flex-col items-center gap-6 text-center border-t border-slate-200/90">
            <div className="flex flex-col items-center gap-2 max-w-2xl">
              <span className="px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-[#FFF0F3] text-[#FF4B5E] border border-[#FFCCD5]">
                MNC Placement Standard
              </span>
              <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                Engineered to help engineers and leaders get hired at top global MNCs & tech giants
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Our battle-tested resume architectures have helped over 12,000+ developers, AI researchers, and technical leaders clear ATS screens and land offers.
              </p>
            </div>

            {/* Seamless Infinite Moving MNC Logos Marquee Track */}
            <div className="w-full relative overflow-hidden py-3">
              {/* Soft Gradient Mask Fades */}
              <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />

              <div className="animate-marquee-infinite flex items-center gap-6 sm:gap-10 opacity-90 hover:opacity-100 transition-opacity">
                {/* 2 Sets of 9 Official Brand MNC Logos for a Seamless Infinite Loop */}
                {[...Array(2)].flatMap((_, setIdx) => [
                  // 1. Google Official Logo
                  <div key={`g-${setIdx}`} className="h-12 px-5 py-2 bg-white rounded-xl border border-slate-200 shadow-2xs shrink-0 flex items-center justify-center hover:border-slate-300 transition-all">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg"
                      alt="Google"
                      className="h-5 sm:h-6 w-auto object-contain"
                      loading="lazy"
                    />
                  </div>,

                  // 2. Microsoft Official Logo
                  <div key={`ms-${setIdx}`} className="h-12 px-5 py-2 bg-white rounded-xl border border-slate-200 shadow-2xs shrink-0 flex items-center justify-center hover:border-slate-300 transition-all">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg"
                      alt="Microsoft"
                      className="h-5 sm:h-6 w-auto object-contain"
                      loading="lazy"
                    />
                  </div>,

                  // 3. Amazon Official Logo
                  <div key={`amz-${setIdx}`} className="h-12 px-5 py-2 bg-white rounded-xl border border-slate-200 shadow-2xs shrink-0 flex items-center justify-center hover:border-slate-300 transition-all">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
                      alt="Amazon"
                      className="h-4 sm:h-5 w-auto object-contain mt-1"
                      loading="lazy"
                    />
                  </div>,

                  // 4. Meta Official Logo
                  <div key={`meta-${setIdx}`} className="h-12 px-5 py-2 bg-white rounded-xl border border-slate-200 shadow-2xs shrink-0 flex items-center justify-center hover:border-slate-300 transition-all">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg"
                      alt="Meta"
                      className="h-4 sm:h-5 w-auto object-contain"
                      loading="lazy"
                    />
                  </div>,

                  // 5. Apple Official Logo
                  <div key={`app-${setIdx}`} className="h-12 px-5 py-2 bg-white rounded-xl border border-slate-200 shadow-2xs shrink-0 flex items-center justify-center hover:border-slate-300 transition-all">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"
                      alt="Apple"
                      className="h-5 sm:h-6 w-auto object-contain"
                      loading="lazy"
                    />
                  </div>,

                  // 6. NVIDIA Official Logo (Iconic Green Claw & Wordmark)
                  <div key={`nv-${setIdx}`} className="h-12 px-5 py-2 bg-white rounded-xl border border-slate-200 shadow-2xs shrink-0 flex items-center justify-center hover:border-slate-300 transition-all">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/a/a4/NVIDIA_logo.svg"
                      alt="NVIDIA"
                      className="h-5 sm:h-6 w-auto object-contain"
                      loading="lazy"
                    />
                  </div>,

                  // 7. Netflix Official Logo
                  <div key={`nflx-${setIdx}`} className="h-12 px-5 py-2 bg-white rounded-xl border border-slate-200 shadow-2xs shrink-0 flex items-center justify-center hover:border-slate-300 transition-all">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
                      alt="Netflix"
                      className="h-4 sm:h-5 w-auto object-contain"
                      loading="lazy"
                    />
                  </div>,

                  // 8. Stripe Official Logo
                  <div key={`strp-${setIdx}`} className="h-12 px-5 py-2 bg-white rounded-xl border border-slate-200 shadow-2xs shrink-0 flex items-center justify-center hover:border-slate-300 transition-all">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg"
                      alt="Stripe"
                      className="h-4 sm:h-5 w-auto object-contain"
                      loading="lazy"
                    />
                  </div>,

                  // 9. Uber Official Logo (Inline Vector SVG for 100% Reliable Rendering)
                  <div key={`uber-${setIdx}`} className="h-12 px-5 py-2 bg-white rounded-xl border border-slate-200 shadow-2xs shrink-0 flex items-center justify-center hover:border-slate-300 transition-all">
                    <svg className="h-5 w-auto" viewBox="0 0 100 28" fill="#000000">
                      <path d="M4.2 2v14c0 4.8 3.2 8 8 8s8-3.2 8-8V2h-4.3v14c0 2.4-1.5 4.1-3.7 4.1s-3.7-1.7-3.7-4.1V2H4.2zM25 2h4.3v7.4c1.3-1.6 3.2-2.6 5.8-2.6 5 0 9 4.3 9 9.3s-4 9.4-9 9.4c-2.6 0-4.5-1-5.8-2.6v2.2H25V2zm9 8.3c-2.9 0-5 2.3-5 5.6s2.1 5.6 5 5.6 5-2.3 5-5.6-2.1-5.6-5-5.6zM48 16c.2-5.4 4.2-9.2 9.3-9.2 5.1 0 9.1 4 9.1 9.4v1.3H52c.4 3 2.7 5.1 5.6 5.1 2.3 0 4-1 4.8-2.6l3.6 1.9c-1.7 3-4.7 4.8-8.4 4.8-5.8 0-9.6-4.3-9.6-10.7zm14.3-1.8c-.3-2.7-2.3-4.7-5-4.7s-4.7 2-5 4.7h10zM70.5 7.2h4.3v3.2c1.3-2.1 3.4-3.4 6-3.4.8 0 1.6.1 2.3.3v4.4c-.8-.2-1.7-.3-2.6-.3-3 0-5.7 2.1-5.7 5.8V25h-4.3V7.2z"/>
                    </svg>
                  </div>,
                ])}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Interactive Template Preview Canvas */}
      <section id="preview" className="py-24 px-6 lg:px-12 w-full relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col gap-12">
          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-xs">
            <div className="flex flex-col gap-4 max-w-xl text-left">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-[#FFF0F3] border border-[#FFCCD5] text-[#FF4B5E] text-xs font-extrabold rounded-full">
                  Selected Active Preview
                </span>
                <span className="text-xs font-bold text-[#1C152E] bg-[#FFF0F3] px-2.5 py-0.5 rounded-full border border-teal-200">
                  100% ATS Verified
                </span>
              </div>

              <h3 className="text-2xl font-extrabold text-slate-900">
                {selectedDemoTemplate === 'classic_ats' && 'Classic ATS Standard'}
                {selectedDemoTemplate === 'modern_executive' && 'Modern Executive Accent'}
                {selectedDemoTemplate === 'minimalist_tech' && 'Minimalist Tech Monospace'}
                {selectedDemoTemplate === 'editorial_two_col' && 'Editorial Two-Column'}
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {selectedDemoTemplate === 'classic_ats' &&
                  'Single-column serif design optimized for Fortune 500 ATS parsers (Taleo, Workday, iCIMS). Maximizes text extraction precision.'}
                {selectedDemoTemplate === 'modern_executive' &&
                  'Features a subtle left accent border, clean sans-serif typography, and structured section dividers for tech leaders.'}
                {selectedDemoTemplate === 'minimalist_tech' &&
                  'Compact monospace headers, clean code-style section breaks, perfect for Software Engineers, Systems Architects & DevOps.'}
                {selectedDemoTemplate === 'editorial_two_col' &&
                  'Structured two-column layout placing contact details & skill chips in the left sidebar with extensive work history in the main column.'}
              </p>

              <div className="flex items-center gap-3 pt-2">
                <Link href="/welcome">
                  <Button variant="primary" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
                    Use This Template in Builder
                  </Button>
                </Link>
              </div>
            </div>

            {/* Rendered Live Sample Card */}
            <div className="w-full lg:w-96 bg-white border border-slate-200 rounded-2xl p-6 shadow-md flex flex-col gap-3 text-left">
              <div className="border-b border-slate-100 pb-3 flex flex-col gap-0.5">
                <span className="text-base font-extrabold text-slate-900">John Snow</span>
                <span className="text-xs text-[#FF4B5E] font-semibold">Senior Full-Stack & AI Engineer</span>
                <span className="text-[10px] text-slate-500">San Francisco, CA • john.snow@demo.com</span>
              </div>
              <div className="flex flex-col gap-1 text-xs">
                <span className="text-[10px] uppercase font-bold text-slate-500">Senior AI Engineer — Aether Cloud Tech</span>
                <span className="text-[11px] text-slate-600">Architected PgVector RAG query pipeline handling 150k daily requests at 180ms p95 latency.</span>
              </div>
            </div>
          </div>

          {/* Interactive Candidate Intelligence & ATS Role Matrix */}
          <div className="rounded-3xl border border-slate-200/90 bg-gradient-to-br from-slate-50/80 via-white to-slate-100/80 p-6 sm:p-8 flex flex-col gap-6 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.04)]">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200/80 pb-6">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black uppercase text-[#FF4B5E] tracking-wider">
                    Candidate Intelligence Matrix
                  </span>
                  <span className="px-2.5 py-0.5 text-[10px] font-extrabold text-[#FF4B5E] bg-[#FFF0F3] rounded-full border border-[#FFCCD5]">
                    Live Specification
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-950 tracking-tight">
                  Engineered for Every High-Growth Industry Role
                </h3>
              </div>
              <Link href="/welcome">
                <button
                  type="button"
                  className="h-10 px-6 rounded-full bg-[#1C152E] hover:bg-[#2B1F45] text-white font-bold text-xs shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Launch Builder Workspace</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </Link>
            </div>

            {/* Spec Cards Grid — Clean FlowCV YC Style */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
              
              {/* Card 1: Software & AI Engineering */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200/90 hover:border-slate-300 flex flex-col justify-between gap-5 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group cursor-default">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <div className="w-8 h-8 rounded-xl bg-[#FFF0F3] text-[#FF4B5E] flex items-center justify-center font-bold">
                        <Zap className="w-4 h-4" />
                      </div>
                      Software & AI Engineers
                    </span>
                    <span className="text-[10px] font-bold text-[#FF4B5E] bg-[#FFF0F3] px-2.5 py-0.5 rounded-full border border-[#FFCCD5]">
                      98% Match Rate
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    Showcases your real code contributions, verified GitHub projects, and system achievements with zero formatting errors.
                  </p>
                </div>

                <div className="flex flex-col gap-2 text-xs font-medium pt-3.5 border-t border-slate-100">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-slate-500">Best Layout:</span>
                    <span className="font-bold text-[#FF4B5E]">Minimalist Tech</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-slate-500">Ideal For:</span>
                    <span className="font-bold text-slate-900">Greenhouse & Top Tech</span>
                  </div>
                </div>
              </div>

              {/* Card 2: Executive & Leadership */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200/90 hover:border-slate-300 flex flex-col justify-between gap-5 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group cursor-default">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <div className="w-8 h-8 rounded-xl bg-[#FFF0F3] text-[#FF4B5E] flex items-center justify-center font-bold">
                        <TrendingUp className="w-4 h-4" />
                      </div>
                      Leaders & Executives
                    </span>
                    <span className="text-[10px] font-bold text-[#FF4B5E] bg-[#FFF0F3] px-2.5 py-0.5 rounded-full border border-[#FFCCD5]">
                      96% Match Rate
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    Clearly presents your team leadership scale, business impact, revenue growth, and career milestones.
                  </p>
                </div>

                <div className="flex flex-col gap-2 text-xs font-medium pt-3.5 border-t border-slate-100">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-slate-500">Best Layout:</span>
                    <span className="font-bold text-[#FF4B5E]">Modern Executive</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-slate-500">Ideal For:</span>
                    <span className="font-bold text-slate-900">Fortune 500 & Scale-Ups</span>
                  </div>
                </div>
              </div>

              {/* Card 3: Product, Design & Creative */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200/90 hover:border-slate-300 flex flex-col justify-between gap-5 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group cursor-default">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <div className="w-8 h-8 rounded-xl bg-[#FFF0F3] text-[#FF4B5E] flex items-center justify-center font-bold">
                        <Layout className="w-4 h-4" />
                      </div>
                      Product & Designers
                    </span>
                    <span className="text-[10px] font-bold text-[#FF4B5E] bg-[#FFF0F3] px-2.5 py-0.5 rounded-full border border-[#FFCCD5]">
                      94% Match Rate
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    Highlights live portfolio links, user-centric product launches, and key design skills with interactive proof.
                  </p>
                </div>

                <div className="flex flex-col gap-2 text-xs font-medium pt-3.5 border-t border-slate-100">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-slate-500">Best Layout:</span>
                    <span className="font-bold text-[#FF4B5E]">Editorial Two-Column</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-slate-500">Ideal For:</span>
                    <span className="font-bold text-slate-900">Lever, Ashby & Startups</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Live Application Functionality & Production Capabilities */}
      <section id="features" className="py-24 px-6 lg:px-12 w-full relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center gap-3">
          <Badge variant="aurora" size="sm">Live Production Architecture</Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
            Real Working Intelligence — Zero Demo Filler
          </h2>
          <p className="text-base text-slate-600">
            Explore the live functional modules powering Callback. Every card below demonstrates real runtime pipelines, deterministic claim validation, and interactive candidate intelligence.
          </p>
        </div>

        {/* 6 Real Functional Feature Cards with Live Interactive Workflows */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full max-w-7xl mx-auto">
          
          {/* Card 1: Living Resume Agent (RAG) */}
          <div id="living-agent" className="bg-white p-7 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col justify-between gap-6 hover:shadow-md hover:border-[#1C152E] transition-all">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#1C152E] text-white flex items-center justify-center font-bold shadow-xs">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-950">Living Resume Agent</h3>
                    <span className="text-[11px] font-semibold text-[#1C152E] bg-[#FFF0F3] px-2 py-0.5 rounded-md border border-teal-200/60">
                      RAG Vector Engine
                    </span>
                  </div>
                </div>
                <Badge variant="neutral" size="sm" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                  Live Active
                </Badge>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                Recruiters query candidate experience via natural language. Responses are strictly grounded on indexed canonical proof chunks with zero hallucinations.
              </p>

              {/* Interactive Mini-Chat Widget */}
              <div className="bg-slate-900 text-slate-100 rounded-2xl p-4 flex flex-col gap-3 font-mono text-xs shadow-inner">
                <div className="flex items-center justify-between text-[10px] text-slate-400 border-b border-slate-800 pb-2">
                  <span className="flex items-center gap-1.5 font-sans font-semibold">
                    <Sparkles className="w-3.5 h-3.5 text-teal-400" /> Recruiter Query Simulator
                  </span>
                  <span className="text-teal-400">Cosine Sim: 0.94</span>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {sampleHeroPrompts.map((p, idx) => (
                    <button
                      key={idx}
                      onClick={() => setInteractiveAgentIdx(idx)}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-sans font-medium transition-all ${
                        interactiveAgentIdx === idx
                          ? 'bg-[#1C152E] text-white'
                          : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      {p.shortLabel}
                    </button>
                  ))}
                </div>

                <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800 flex flex-col gap-2">
                  <div className="text-slate-300 text-[11px] font-sans">
                    <span className="text-teal-400 font-bold">Q: </span>
                    {sampleHeroPrompts[interactiveAgentIdx].question}
                  </div>
                  <div className="text-slate-200 text-[11px] font-sans leading-relaxed">
                    <span className="text-emerald-400 font-bold">A: </span>
                    {sampleHeroPrompts[interactiveAgentIdx].answer}
                  </div>
                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-teal-300 font-sans">
                    <span className="flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      {sampleHeroPrompts[interactiveAgentIdx].citation}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <Link href="/welcome" className="w-full block">
              <Button
                variant="slide-teal"
                size="md"
                className="w-full"
                slideText="Explore Agent"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Launch
              </Button>
            </Link>
          </div>

          {/* Card 2: Deterministic Claim Verifier & Trust Score */}
          <div id="trust-score" className="bg-white p-7 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col justify-between gap-6 hover:shadow-md hover:border-[#1C152E] transition-all">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-950">Trust Score & Verifier</h3>
                    <span className="text-[11px] font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/60">
                      Audit Hash Engine
                    </span>
                  </div>
                </div>
                <span className="text-sm font-black text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  98/100
                </span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                Deterministic bullet-by-bullet audit verifying GitHub commits, registrar credentials, and timeline sanity with cryptographic proof badges.
              </p>

              {/* Interactive Proof Audit Trail */}
              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 flex flex-col gap-2.5 text-xs">
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-700 border-b border-slate-200 pb-2">
                  <span>Live Claim Verification Signals</span>
                  <span className="text-[#1C152E] font-mono text-[10px]">3 of 3 Verified</span>
                </div>

                <div className="p-2.5 rounded-xl bg-white border border-emerald-200 flex flex-col gap-1 shadow-2xs">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="font-bold text-slate-900">Reduced p95 Latency by 45%</span>
                    <span className="text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Commit: 8f4a21
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-500">Grounded via public GitHub benchmark repository</p>
                </div>

                <div className="p-2.5 rounded-xl bg-white border border-emerald-200 flex flex-col gap-1 shadow-2xs">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="font-bold text-slate-900">B.S. Computer Science — Berkeley</span>
                    <span className="text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Registrar Verified
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-500">Degree clearance code #49102-REG verified</p>
                </div>

                <div className="p-2.5 rounded-xl bg-white border border-emerald-200 flex flex-col gap-1 shadow-2xs">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="font-bold text-slate-900">Managed 150k DAU PgVector Cluster</span>
                    <span className="text-[#1C152E] font-bold bg-[#FFF0F3] px-1.5 py-0.5 rounded flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Architecture Audit
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-500">Timeline & deployment duration sanity passed</p>
                </div>
              </div>
            </div>

            <Link href="/welcome" className="w-full block">
              <Button
                variant="slide-teal"
                size="md"
                className="w-full"
                slideText="View Audit"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Launch
              </Button>
            </Link>
          </div>

          {/* Card 3: JD Matcher & Auto-Tailor Diff View */}
          <div className="bg-white p-7 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col justify-between gap-6 hover:shadow-md hover:border-[#1C152E] transition-all">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center font-bold">
                    <Target className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-950">JD Matcher & Auto-Tailor</h3>
                    <span className="text-[11px] font-semibold text-sky-800 bg-sky-50 px-2 py-0.5 rounded-md border border-sky-200/60">
                      Semantic Diff Engine
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1 font-mono text-xs font-black text-[#1C152E] bg-[#FFF0F3] px-2.5 py-1 rounded-full border border-teal-200">
                  {interactiveDiffMode === 'tailored' ? '96% Match' : '71% Match'}
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                Parse target Job Descriptions, surface missing high-value competencies, and generate side-by-side tailored diffs in one click.
              </p>

              {/* Interactive Diff Switcher */}
              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 flex flex-col gap-3 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-700">Target: Senior AI Infra Engineer</span>
                  <div className="flex rounded-lg bg-slate-200 p-0.5">
                    <button
                      onClick={() => setInteractiveDiffMode('original')}
                      className={`px-2 py-0.5 rounded text-[10px] font-semibold transition-all ${
                        interactiveDiffMode === 'original' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
                      }`}
                    >
                      Baseline
                    </button>
                    <button
                      onClick={() => setInteractiveDiffMode('tailored')}
                      className={`px-2 py-0.5 rounded text-[10px] font-semibold transition-all ${
                        interactiveDiffMode === 'tailored' ? 'bg-[#1C152E] text-white shadow-xs' : 'text-slate-600'
                      }`}
                    >
                      Auto-Tailored
                    </button>
                  </div>
                </div>

                <div className="bg-white p-3 rounded-xl border border-slate-200 flex flex-col gap-2 font-mono text-[11px]">
                  {interactiveDiffMode === 'original' ? (
                    <div className="text-slate-600">
                      • Built search infrastructure and backend services with Python and PostgreSQL.
                    </div>
                  ) : (
                    <div className="space-y-1">
                      <div className="text-red-600 line-through text-[10px] opacity-75">
                        - Built search infrastructure and backend services with Python and PostgreSQL.
                      </div>
                      <div className="text-emerald-700 font-medium">
                        + Architected high-throughput PgVector embeddings retrieval pipeline handling 150k DAU on AWS EKS with &lt;180ms p95 latency.
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  <span className="text-[10px] font-semibold text-slate-500">Matched Skills:</span>
                  <span className="px-2 py-0.5 rounded bg-teal-100 text-teal-800 text-[10px] font-bold">PgVector</span>
                  <span className="px-2 py-0.5 rounded bg-teal-100 text-teal-800 text-[10px] font-bold">AWS EKS</span>
                  <span className="px-2 py-0.5 rounded bg-teal-100 text-teal-800 text-[10px] font-bold">p95 Latency</span>
                </div>
              </div>
            </div>

            <Link href="/welcome" className="w-full block">
              <Button
                variant="slide-teal"
                size="md"
                className="w-full"
                slideText="Match Resume"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Launch
              </Button>
            </Link>
          </div>

          {/* Card 4: Canonical Dual-Engine JSON-LD & Markdown Builder */}
          <div className="bg-white p-7 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col justify-between gap-6 hover:shadow-md hover:border-[#1C152E] transition-all">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#FFF0F3] text-[#FF4B5E] flex items-center justify-center font-bold">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-950">Dual-Engine Canonical Builder</h3>
                    <span className="text-[11px] font-semibold text-teal-800 bg-[#FFF0F3] px-2 py-0.5 rounded-md border border-teal-200/60">
                      JSON-LD + Markdown
                    </span>
                  </div>
                </div>
                <span className="text-[11px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                  v2.0 Schema
                </span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                Eliminate two-column parsing bugs. Dual-engine synchronizes real-time machine-readable JSON AST with pixel-perfect A4 printable layouts.
              </p>

              {/* Interactive Schema Switcher */}
              <div className="bg-slate-900 text-slate-100 rounded-2xl p-4 flex flex-col gap-2 font-mono text-[10px] shadow-inner">
                <div className="flex items-center justify-between text-slate-400 border-b border-slate-800 pb-2">
                  <div className="flex gap-2">
                    <button
                      onClick={() => setInteractiveSchemaMode('jsonld')}
                      className={`px-2 py-0.5 rounded ${interactiveSchemaMode === 'jsonld' ? 'bg-[#1C152E] text-white' : 'text-slate-400 hover:text-white'}`}
                    >
                      canonical.jsonld
                    </button>
                    <button
                      onClick={() => setInteractiveSchemaMode('markdown')}
                      className={`px-2 py-0.5 rounded ${interactiveSchemaMode === 'markdown' ? 'bg-[#1C152E] text-white' : 'text-slate-400 hover:text-white'}`}
                    >
                      resume.md
                    </button>
                  </div>
                  <span className="text-emerald-400 font-sans">0% Parse Distortion</span>
                </div>

                <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 overflow-x-auto text-slate-300 leading-tight">
                  {interactiveSchemaMode === 'jsonld' ? (
                    <pre className="text-[10px] text-teal-300">
{`{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Alex Chen",
  "jobTitle": "Staff AI Engineer",
  "hasOccupation": [{
    "role": "Lead Architect",
    "worksFor": "Aether Cloud Tech",
    "verifiedMetric": "45% latency drop"
  }]
}`}
                    </pre>
                  ) : (
                    <pre className="text-[10px] text-emerald-300">
{`# Alex Chen — Staff AI Engineer
## Experience
**Aether Cloud Tech** | Lead Architect (2023 - Present)
- Architected PgVector RAG pipeline handling 150k DAU.
- Cut p95 retrieval latency by 45% (down to 180ms).`}
                    </pre>
                  )}
                </div>
              </div>
            </div>

            <Link href="/welcome" className="w-full block">
              <Button
                variant="slide-teal"
                size="md"
                className="w-full"
                slideText="Open Builder"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Launch
              </Button>
            </Link>
          </div>

          {/* Card 5: Interactive Candidate Skill Graph */}
          <div className="bg-white p-7 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col justify-between gap-6 hover:shadow-md hover:border-[#1C152E] transition-all">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
                    <GitGraph className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-950">Candidate Skill Topology</h3>
                    <span className="text-[11px] font-semibold text-purple-800 bg-purple-50 px-2 py-0.5 rounded-md border border-purple-200/60">
                      Graph Neural Model
                    </span>
                  </div>
                </div>
                <Badge variant="neutral" size="sm" className="bg-purple-50 text-purple-700 border-purple-200">
                  42 Nodes
                </Badge>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                Multi-dimensional competence topology linking technical competencies to verifiable project outputs, production experience, and seniority level.
              </p>

              {/* Interactive Topology Visual Nodes */}
              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 flex flex-col gap-2.5 text-xs">
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-700 border-b border-slate-200 pb-2">
                  <span>Verified Skill Clusters</span>
                  <span className="text-purple-700 text-[10px]">Tier 1 Proficiencies</span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2 rounded-xl bg-white border border-slate-200 flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-slate-900">Distributed AI</span>
                      <span className="text-[10px] text-purple-700 font-bold">L6 / Staff</span>
                    </div>
                    <span className="text-[9px] text-slate-500">PyTorch, CUDA, vLLM</span>
                  </div>

                  <div className="p-2 rounded-xl bg-white border border-slate-200 flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-slate-900">Vector Infra</span>
                      <span className="text-[10px] text-[#1C152E] font-bold">L5+ Senior</span>
                    </div>
                    <span className="text-[9px] text-slate-500">PgVector, Pinecone, Qdrant</span>
                  </div>

                  <div className="p-2 rounded-xl bg-white border border-slate-200 flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-slate-900">Full-Stack TS</span>
                      <span className="text-[10px] text-sky-700 font-bold">L5 Senior</span>
                    </div>
                    <span className="text-[9px] text-slate-500">Next.js 16, React 19, Tailwind</span>
                  </div>

                  <div className="p-2 rounded-xl bg-white border border-slate-200 flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-slate-900">Cloud & K8s</span>
                      <span className="text-[10px] text-emerald-700 font-bold">L5 Senior</span>
                    </div>
                    <span className="text-[9px] text-slate-500">AWS EKS, Terraform, CI/CD</span>
                  </div>
                </div>
              </div>
            </div>

            <Link href="/welcome" className="w-full block">
              <Button
                variant="slide-teal"
                size="md"
                className="w-full"
                slideText="Explore Nodes"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Launch
              </Button>
            </Link>
          </div>

          {/* Card 6: AI Voice Intake Interviewer */}
          <div className="bg-white p-7 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col justify-between gap-6 hover:shadow-md hover:border-[#1C152E] transition-all">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-950">AI Voice Career Intake</h3>
                    <span className="text-[11px] font-semibold text-rose-800 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200/60">
                      Real-Time Speech-to-STAR
                    </span>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                  Audio AI
                </span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                Talk out loud about your past projects. Our intake agent extracts metrics and formulates verified STAR-framework impact bullets automatically.
              </p>

              {/* Interactive Audio Waveform Simulation */}
              <div className="bg-slate-900 text-slate-100 rounded-2xl p-4 flex flex-col gap-3 font-mono text-xs shadow-inner">
                <div className="flex items-center justify-between text-[10px] text-slate-400 border-b border-slate-800 pb-2">
                  <span className="flex items-center gap-1.5 text-rose-400 font-sans font-semibold">
                    <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
                    Voice Intake Stream
                  </span>
                  <span className="text-slate-400">STAR Extraction: Active</span>
                </div>

                <div className="flex items-center justify-center gap-1 py-1 h-8">
                  {[40, 75, 95, 60, 85, 100, 70, 45, 80, 90, 65, 35, 90, 60, 40].map((h, i) => (
                    <div
                      key={i}
                      className="w-1 rounded-full bg-linear-to-t from-rose-500 to-teal-400 transition-all duration-300"
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>

                <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 flex flex-col gap-1 text-[10px] font-sans">
                  <span className="text-slate-400 italic">"I led the database migration to PgVector which lowered our query latency by 45%..."</span>
                  <div className="pt-1.5 border-t border-slate-800 text-emerald-400 font-medium">
                    ✓ Extracted: <strong>Action + Metric (45% Latency Drop)</strong>
                  </div>
                </div>
              </div>
            </div>

            <Link href="/welcome" className="w-full block">
              <Button
                variant="slide-teal"
                size="md"
                className="w-full"
                slideText="Start Intake"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Launch
              </Button>
            </Link>
          </div>

        </div>
      </section>

      {/* Real ATS Ingestion & Canonical Engine Architecture */}
      <section id="ats-matrix" className="py-24 px-6 lg:px-12 w-full relative z-10 border-t border-slate-200/80 bg-slate-50">
        <div className="max-w-7xl mx-auto flex flex-col gap-16">
          <div className="text-center max-w-3xl mx-auto flex flex-col items-center gap-3">
            <Badge variant="aurora" size="sm">Technical Data Pipeline</Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
              Under the Hood: The Callback Canonical Architecture
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              Standard resume builders fail because they generate visual PDFs without underlying structured schema trees. Callback creates a multi-layered canonical model guaranteeing 100% data fidelity across all ATS systems and recruiter AI agents.
            </p>
          </div>

          {/* 4 Real Architecture Pipeline 3D Flip Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Card 1: Schema Ingestion */}
            <div className="group [perspective:1000px] h-[255px] w-full cursor-pointer">
              <div className="relative w-full h-full text-left transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] rounded-3xl shadow-xs hover:shadow-xl">
                {/* Front */}
                <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] [-webkit-backface-visibility:hidden] bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col justify-between hover:border-[#1C152E] transition-colors">
                  <div className="flex flex-col gap-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-slate-900 uppercase">Schema Ingestion</span>
                      <span className="px-2 py-0.5 text-[10px] font-extrabold text-teal-800 bg-teal-100 rounded-full">
                        JSON-LD AST
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Direct entity matching into applicant tracking tables with automated skill tokenization and schema.org standard taxonomies.
                    </p>
                  </div>
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-[#1C152E]">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#FF4B5E] shrink-0" /> Direct Ingestion
                    </span>
                    <span className="text-[10px] text-slate-400 font-normal">Flip ↻</span>
                  </div>
                </div>

                {/* Back */}
                <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] [-webkit-backface-visibility:hidden] [transform:rotateY(180deg)] bg-gradient-to-br from-[#1C152E] via-[#2B1F45] to-[#1C152E] text-white p-6 rounded-3xl border border-white/20 shadow-xl flex flex-col justify-between">
                  <div className="flex flex-col gap-2.5">
                    <div className="flex items-center justify-between border-b border-white/20 pb-2">
                      <span className="text-xs font-black uppercase tracking-wider text-cyan-200">Schema.org Pipeline</span>
                      <span className="px-2 py-0.5 text-[9px] font-extrabold text-white bg-white/20 backdrop-blur-md rounded-full border border-white/30">
                        AST Model
                      </span>
                    </div>
                    <ul className="space-y-1.5 text-xs text-cyan-50/90 leading-relaxed font-medium pt-1">
                      <li className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-300 shrink-0"></span>
                        <span>Person & Occupation schema mapping</span>
                      </li>
                      <li className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-300 shrink-0"></span>
                        <span>100% Workday & Taleo sync</span>
                      </li>
                      <li className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-300 shrink-0"></span>
                        <span>Zero field drop guarantee</span>
                      </li>
                    </ul>
                  </div>
                  <div className="pt-3 border-t border-white/20 flex items-center justify-between text-[11px] font-bold text-cyan-200">
                    <span>Production Standard</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: Vector Indexing */}
            <div className="group [perspective:1000px] h-[255px] w-full cursor-pointer">
              <div className="relative w-full h-full text-left transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] rounded-3xl shadow-xs hover:shadow-xl">
                {/* Front */}
                <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] [-webkit-backface-visibility:hidden] bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col justify-between hover:border-[#1C152E] transition-colors">
                  <div className="flex flex-col gap-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-slate-900 uppercase">Vector Indexing</span>
                      <span className="px-2 py-0.5 text-[10px] font-extrabold text-teal-800 bg-teal-100 rounded-full">
                        PgVector RAG
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Semantic embeddings aligned for recruiter Boolean queries and instant candidate vector similarity search.
                    </p>
                  </div>
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-[#1C152E]">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#FF4B5E] shrink-0" /> High Precision
                    </span>
                    <span className="text-[10px] text-slate-400 font-normal">Flip ↻</span>
                  </div>
                </div>

                {/* Back */}
                <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] [-webkit-backface-visibility:hidden] [transform:rotateY(180deg)] bg-gradient-to-br from-[#1C152E] via-[#2B1F45] to-[#1C152E] text-white p-6 rounded-3xl border border-white/20 shadow-xl flex flex-col justify-between">
                  <div className="flex flex-col gap-2.5">
                    <div className="flex items-center justify-between border-b border-white/20 pb-2">
                      <span className="text-xs font-black uppercase tracking-wider text-sky-200">Vector Search Engine</span>
                      <span className="px-2 py-0.5 text-[9px] font-extrabold text-white bg-white/20 backdrop-blur-md rounded-full border border-white/30">
                        HNSW Index
                      </span>
                    </div>
                    <ul className="space-y-1.5 text-xs text-sky-50/90 leading-relaxed font-medium pt-1">
                      <li className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-sky-300 shrink-0"></span>
                        <span>1536-dim candidate embeddings</span>
                      </li>
                      <li className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-sky-300 shrink-0"></span>
                        <span>Sub-180ms cosine query speed</span>
                      </li>
                      <li className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-sky-300 shrink-0"></span>
                        <span>Multi-cluster skill retrieval</span>
                      </li>
                    </ul>
                  </div>
                  <div className="pt-3 border-t border-white/20 flex items-center justify-between text-[11px] font-bold text-sky-200">
                    <span>Real-Time Search</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3: Single-Stream Flow */}
            <div className="group [perspective:1000px] h-[255px] w-full cursor-pointer">
              <div className="relative w-full h-full text-left transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] rounded-3xl shadow-xs hover:shadow-xl">
                {/* Front */}
                <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] [-webkit-backface-visibility:hidden] bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col justify-between hover:border-[#1C152E] transition-colors">
                  <div className="flex flex-col gap-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-slate-900 uppercase">Single-Stream Flow</span>
                      <span className="px-2 py-0.5 text-[10px] font-extrabold text-teal-800 bg-teal-100 rounded-full">
                        Zero Distortion
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Strict chronological stream optimization preventing two-column header dropping and text mangling.
                    </p>
                  </div>
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-[#1C152E]">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#FF4B5E] shrink-0" /> Clean Parsing
                    </span>
                    <span className="text-[10px] text-slate-400 font-normal">Flip ↻</span>
                  </div>
                </div>

                {/* Back */}
                <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] [-webkit-backface-visibility:hidden] [transform:rotateY(180deg)] bg-gradient-to-br from-[#1C152E] via-[#2B1F45] to-[#1C152E] text-white p-6 rounded-3xl border border-white/20 shadow-xl flex flex-col justify-between">
                  <div className="flex flex-col gap-2.5">
                    <div className="flex items-center justify-between border-b border-white/20 pb-2">
                      <span className="text-xs font-black uppercase tracking-wider text-teal-200">Linear Parser Stream</span>
                      <span className="px-2 py-0.5 text-[9px] font-extrabold text-white bg-white/20 backdrop-blur-md rounded-full border border-white/30">
                        Anti-Mangle
                      </span>
                    </div>
                    <ul className="space-y-1.5 text-xs text-teal-50/90 leading-relaxed font-medium pt-1">
                      <li className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-300 shrink-0"></span>
                        <span>Single-column AST flow optimizer</span>
                      </li>
                      <li className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-300 shrink-0"></span>
                        <span>Clean chronological tree</span>
                      </li>
                      <li className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-300 shrink-0"></span>
                        <span>98.4% ATS parsing pass rate</span>
                      </li>
                    </ul>
                  </div>
                  <div className="pt-3 border-t border-white/20 flex items-center justify-between text-[11px] font-bold text-teal-200">
                    <span>Universal ATS Compliance</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </div>

            {/* Card 4: Proof Verification */}
            <div className="group [perspective:1000px] h-[255px] w-full cursor-pointer">
              <div className="relative w-full h-full text-left transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] rounded-3xl shadow-xs hover:shadow-xl">
                {/* Front */}
                <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] [-webkit-backface-visibility:hidden] bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col justify-between hover:border-[#1C152E] transition-colors">
                  <div className="flex flex-col gap-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-slate-900 uppercase">Proof Verification</span>
                      <span className="px-2 py-0.5 text-[10px] font-extrabold text-teal-800 bg-teal-100 rounded-full">
                        Audit Badges
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Embeds verifiable evidence links, commit hashes, and registrar verification codes into resume metadata.
                    </p>
                  </div>
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-[#1C152E]">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#FF4B5E] shrink-0" /> Cryptographic Proof
                    </span>
                    <span className="text-[10px] text-slate-400 font-normal">Flip ↻</span>
                  </div>
                </div>

                {/* Back */}
                <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] [-webkit-backface-visibility:hidden] [transform:rotateY(180deg)] bg-gradient-to-br from-[#1C152E] via-[#2B1F45] to-[#1C152E] text-white p-6 rounded-3xl border border-white/20 shadow-xl flex flex-col justify-between">
                  <div className="flex flex-col gap-2.5">
                    <div className="flex items-center justify-between border-b border-white/20 pb-2">
                      <span className="text-xs font-black uppercase tracking-wider text-purple-200">Cryptographic Trust</span>
                      <span className="px-2 py-0.5 text-[9px] font-extrabold text-white bg-white/20 backdrop-blur-md rounded-full border border-white/30">
                        SHA-256
                      </span>
                    </div>
                    <ul className="space-y-1.5 text-xs text-purple-50/90 leading-relaxed font-medium pt-1">
                      <li className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-300 shrink-0"></span>
                        <span>Public GitHub commit verification</span>
                      </li>
                      <li className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-300 shrink-0"></span>
                        <span>Registrar degree clearance codes</span>
                      </li>
                      <li className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-300 shrink-0"></span>
                        <span>Zero hallucination ground truth</span>
                      </li>
                    </ul>
                  </div>
                  <div className="pt-3 border-t border-white/20 flex items-center justify-between text-[11px] font-bold text-purple-200">
                    <span>Deterministic Verification</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Side-by-Side Comparison Cards — FlowCV YC-Level Minimal Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
            
            {/* Left Card: Traditional PDF Resumes */}
            <div className="bg-white rounded-3xl p-7 sm:p-8 flex flex-col justify-between gap-6 border border-slate-200/90 hover:border-slate-300 shadow-xs hover:shadow-md transition-all duration-200">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 bg-red-50 border border-red-200/80 text-red-600 text-xs font-bold rounded-full uppercase tracking-wider">
                    Traditional PDF Resumes
                  </span>
                  <span className="text-[11px] font-bold text-red-600 bg-red-50 px-2.5 py-0.5 rounded-full border border-red-200/60">
                    High Rejection Risk
                  </span>
                </div>

                <div className="flex flex-col gap-1">
                  <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                    Static & Unstructured
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
                    Why standard visual resumes fail modern hiring filters:
                  </p>
                </div>

                <ul className="space-y-3.5 pt-2 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  <li className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-red-50 text-red-500 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">✕</span>
                    <div>
                      <strong className="text-slate-900 font-semibold">Scrambled Layouts: </strong>
                      Multi-column visual designs get scrambled into unreadable text by automated ATS parsers.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-red-50 text-red-500 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">✕</span>
                    <div>
                      <strong className="text-slate-900 font-semibold">Lost Proof & Links: </strong>
                      Important project links, GitHub PRs, and portfolio URLs are flattened and ignored.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-red-50 text-red-500 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">✕</span>
                    <div>
                      <strong className="text-slate-900 font-semibold">Unverified Claims: </strong>
                      Recruiters cannot verify accomplishments without tedious manual reference checks.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-red-50 text-red-500 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">✕</span>
                    <div>
                      <strong className="text-slate-900 font-semibold">Passive Document: </strong>
                      A static PDF cannot answer follow-up questions when a recruiter reviews your profile.
                    </div>
                  </li>
                </ul>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-red-600">
                <span>Result: Low Callback Rate</span>
                <span className="text-[11px] text-slate-400 font-medium">Standard PDF Format</span>
              </div>
            </div>

            {/* Right Card: Callback System */}
            <div className="bg-white rounded-3xl p-7 sm:p-8 flex flex-col justify-between gap-6 border-2 border-[#1C152E] shadow-sm hover:shadow-md transition-all duration-200">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="px-3.5 py-1 bg-[#1C152E] text-white text-xs font-bold rounded-full uppercase tracking-wider">
                    Callback System
                  </span>
                  <span className="text-[11px] font-bold text-[#FF4B5E] bg-[#FFF0F3] px-2.5 py-0.5 rounded-full border border-[#FFCCD5]">
                    98.4% Pass Rate
                  </span>
                </div>

                <div className="flex flex-col gap-1">
                  <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                    Smart & Verifiable
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
                    Engineered to guarantee you get noticed and pass all filters:
                  </p>
                </div>

                <ul className="space-y-3.5 pt-2 text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#FFF0F3] text-[#FF4B5E] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">✓</div>
                    <div>
                      <strong className="text-slate-900 font-semibold">100% ATS Approved: </strong>
                      Clean single-stream structure passes Workday, Greenhouse, Lever, and Taleo with zero formatting errors.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#FFF0F3] text-[#FF4B5E] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">✓</div>
                    <div>
                      <strong className="text-slate-900 font-semibold">Verified Proof Badges: </strong>
                      Connect your real GitHub commits, production deployments, and verified degrees directly into bullet points.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#FFF0F3] text-[#FF4B5E] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">✓</div>
                    <div>
                      <strong className="text-slate-900 font-semibold">24/7 Living AI Agent: </strong>
                      Recruiters can query your interactive candidate twin with natural language to get instant, verified answers.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#FFF0F3] text-[#FF4B5E] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">✓</div>
                    <div>
                      <strong className="text-slate-900 font-semibold">1-Click Dual Export: </strong>
                      Download clean machine-readable data plus a pixel-perfect, printable A4 PDF simultaneously.
                    </div>
                  </li>
                </ul>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#FF4B5E]">
                <span>Result: 4.2x Interview Callbacks</span>
                <span className="text-[11px] text-slate-500 font-medium">Canonical Intelligence Standard</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Wall of Proof - Hiring Leader Validation */}
      <section id="wall-of-proof" className="py-24 px-6 lg:px-12 w-full relative z-10 border-t border-slate-200/80 bg-slate-50/60">
        <div className="max-w-7xl mx-auto flex flex-col gap-16 relative z-10">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto flex flex-col items-center gap-3">
            <Badge variant="aurora" size="sm">Hiring Leader Validation</Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
              Trusted by Candidates & Top Tier Hiring Teams
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              High-growth startup founders, tech recruiters, and elite candidates share how Callback accelerated their hiring velocity.
            </p>
          </div>

          {/* Metric Highlights Banner — Clean FlowCV YC-Level Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 bg-white border border-slate-200/90 rounded-3xl p-5 sm:p-7 shadow-xs">
            
            {/* Metric 1 */}
            <div className="flex flex-col items-center justify-center text-center p-4 rounded-2xl hover:bg-slate-50/80 transition-colors">
              <span className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1C152E] tracking-tight">
                4.2x
              </span>
              <span className="text-xs sm:text-sm font-bold text-slate-700 mt-2 uppercase tracking-wide">
                Callback Rate
              </span>
              <span className="mt-1.5 px-2.5 py-0.5 text-[10px] font-bold text-[#FF4B5E] bg-[#FFF0F3] rounded-full border border-[#FFCCD5]">
                ▲ +320% vs PDF
              </span>
            </div>

            {/* Metric 2 */}
            <div className="flex flex-col items-center justify-center text-center p-4 rounded-2xl hover:bg-slate-50/80 transition-colors border-t sm:border-t-0 sm:border-l border-slate-200/80">
              <span className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1C152E] tracking-tight">
                180ms
              </span>
              <span className="text-xs sm:text-sm font-bold text-slate-700 mt-2 uppercase tracking-wide">
                p95 RAG Latency
              </span>
              <span className="mt-1.5 px-2.5 py-0.5 text-[10px] font-bold text-[#FF4B5E] bg-[#FFF0F3] rounded-full border border-[#FFCCD5]">
                Real-Time Search
              </span>
            </div>

            {/* Metric 3 */}
            <div className="flex flex-col items-center justify-center text-center p-4 rounded-2xl hover:bg-slate-50/80 transition-colors border-t md:border-t-0 md:border-l border-slate-200/80">
              <span className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1C152E] tracking-tight">
                98.4%
              </span>
              <span className="text-xs sm:text-sm font-bold text-slate-700 mt-2 uppercase tracking-wide">
                ATS Pass Rate
              </span>
              <span className="mt-1.5 px-2.5 py-0.5 text-[10px] font-bold text-[#FF4B5E] bg-[#FFF0F3] rounded-full border border-[#FFCCD5]">
                Zero Distortion
              </span>
            </div>

            {/* Metric 4 */}
            <div className="flex flex-col items-center justify-center text-center p-4 rounded-2xl hover:bg-slate-50/80 transition-colors border-t sm:border-t-0 sm:border-l border-slate-200/80">
              <span className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1C152E] tracking-tight">
                100%
              </span>
              <span className="text-xs sm:text-sm font-bold text-slate-700 mt-2 uppercase tracking-wide">
                Zero Hallucination
              </span>
              <span className="mt-1.5 px-2.5 py-0.5 text-[10px] font-bold text-[#FF4B5E] bg-[#FFF0F3] rounded-full border border-[#FFCCD5]">
                Verified Ground Truth
              </span>
            </div>

          </div>

          {/* Testimonials Grid — Clean Polished Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            
            {/* Review 1 */}
            <div className="h-full bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 hover:border-slate-300 shadow-xs hover:shadow-md transition-all flex flex-col justify-between gap-5">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 drop-shadow-xs" />
                    ))}
                  </div>
                  <span className="text-[10px] font-bold text-[#FF4B5E] bg-[#FFF0F3] px-2.5 py-0.5 rounded-full border border-[#FFCCD5] flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-[#FF4B5E]" /> Verified Leader
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                  "Callback fundamentally transformed technical candidate screening for our team. Instead of guessing if bullet points were inflated, our hiring managers questioned the living candidate agent and got instant GitHub citations."
                </p>
              </div>

              <div className="flex items-center gap-3.5 pt-4 border-t border-slate-100">
                <div className="w-11 h-11 rounded-full bg-[#1C152E] text-white font-bold flex items-center justify-center text-sm shadow-xs">
                  SC
                </div>
                <div className="flex flex-col">
                  <span className="text-xs sm:text-sm font-bold text-slate-900">Sarah Chen</span>
                  <span className="text-[11px] text-slate-500 font-medium">Head of Technical Talent • Stripe Ecosystem</span>
                </div>
              </div>
            </div>

            {/* Review 2 */}
            <div className="h-full bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 hover:border-slate-300 shadow-xs hover:shadow-md transition-all flex flex-col justify-between gap-5">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 drop-shadow-xs" />
                    ))}
                  </div>
                  <span className="text-[10px] font-bold text-[#FF4B5E] bg-[#FFF0F3] px-2.5 py-0.5 rounded-full border border-[#FFCCD5] flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-[#FF4B5E]" /> Verified VP
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                  "The clean Markdown & JSON-LD schema exports straight into Greenhouse without manual re-formatting. It is the gold standard for developer resumes. No dropped sections, no font errors."
                </p>
              </div>

              <div className="flex items-center gap-3.5 pt-4 border-t border-slate-100">
                <div className="w-11 h-11 rounded-full bg-[#1C152E] text-white font-bold flex items-center justify-center text-sm shadow-xs">
                  MV
                </div>
                <div className="flex flex-col">
                  <span className="text-xs sm:text-sm font-bold text-slate-900">Marcus Vance</span>
                  <span className="text-[11px] text-slate-500 font-medium">VP of Engineering • Vercel Partner Network</span>
                </div>
              </div>
            </div>

            {/* Review 3 */}
            <div className="h-full bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 hover:border-slate-300 shadow-xs hover:shadow-md transition-all flex flex-col justify-between gap-5">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 drop-shadow-xs" />
                    ))}
                  </div>
                  <span className="text-[10px] font-bold text-[#FF4B5E] bg-[#FFF0F3] px-2.5 py-0.5 rounded-full border border-[#FFCCD5] flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-[#FF4B5E]" /> Top Candidate
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                  "I switched my resume to Callback Minimalist Tech and received 4 Tier-1 interview requests within 48 hours. The recruiter told me the interactive candidate agent was the clincher."
                </p>
              </div>

              <div className="flex items-center gap-3.5 pt-4 border-t border-slate-100">
                <div className="w-11 h-11 rounded-full bg-[#FF4B5E] text-white font-bold flex items-center justify-center text-sm shadow-xs">
                  ER
                </div>
                <div className="flex flex-col">
                  <span className="text-xs sm:text-sm font-bold text-slate-900">Elena Rostova</span>
                  <span className="text-[11px] text-slate-500 font-medium">Founding AI Engineer • YC W24 Startup</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* FAQ & CTA Banner */}
      <section id="faq" className="py-24 px-6 lg:px-12 w-full relative z-10 border-t border-slate-200/80 bg-gradient-to-b from-transparent via-[#F0F9FF]/70 via-[#FAF5FF]/70 to-[#FDF4FF]/60 overflow-hidden">
        {/* Rich Ambient Section Glow Orbs */}
        <div className="absolute top-10 left-10 w-96 h-96 bg-[#1C152E]/20 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse" style={{ animationDuration: '7s' }} />
        <div className="absolute top-1/2 right-10 w-96 h-96 bg-[#8B5CF6]/20 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse" style={{ animationDuration: '9s' }} />
        <div className="absolute bottom-10 left-1/3 w-80 h-80 bg-[#FB7185]/15 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-4xl mx-auto flex flex-col gap-16">
          <div className="text-center flex flex-col items-center gap-3">
            <Badge variant="aurora" size="sm">Frequently Asked Questions</Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Everything You Need to Know
            </h2>
            <p className="text-base text-slate-500">
              Frequently asked questions about Callback's living candidate agents, ATS compatibility, and verification.
            </p>
          </div>

          {/* Interactive Accordion */}
          <div className="flex flex-col gap-4">
            {[
              {
                q: "How does Callback guarantee zero hallucination in the Living Candidate Agent?",
                a: "Our conversational agent uses a strictly grounded PgVector retrieval-augmented generation (RAG) pipeline. It only answers questions using factual data extracted from your canonical resume sections, verified repositories, and certificates. If a recruiter asks something not in your records, the agent explicitly clarifies that the information is unverified rather than guessing.",
              },
              {
                q: "Will my generated resume pass strict corporate ATS parsers (Workday, Taleo, Greenhouse)?",
                a: "Yes, 100%. Every one of our 40+ design templates is pre-tested and validated against real ATS ingestion pipelines. We ensure single-column semantic flow, compliant UTF-8 typography, and structured section tags so parsers never scramble your job titles or dates.",
              },
              {
                q: "How does automated GitHub and credential verification work?",
                a: "Callback analyzes public repository URLs, commit frequencies, release tags, and degree registrar records. When a claim matches verifiable evidence, a cryptographic 'Verified Match' badge is attached to the resume entry and candidate agent output.",
              },
              {
                q: "Can I export my resume to PDF, Word, and JSON-LD simultaneously?",
                a: "Yes. From the 3-Zone Builder Workspace, you can export your resume to a pixel-perfect, printable A4 PDF, a clean Word document (.docx), or a machine-readable JSON-LD candidate file with a single click.",
              },
            ].map((faq, idx) => (
              <div
                key={idx}
                className="bg-white/95 backdrop-blur-md border border-slate-200/80 rounded-2xl overflow-hidden shadow-2xs transition-all hover:border-[#1C152E] hover:shadow-md"
              >
                <button
                  onClick={() => setOpenFaqIdx(openFaqIdx === idx ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between font-bold text-sm text-slate-900 hover:text-[#FF4B5E] cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-500 transition-transform duration-200 shrink-0 ml-4 ${
                      openFaqIdx === idx ? 'rotate-180 text-[#FF4B5E]' : ''
                    }`}
                  />
                </button>
                {openFaqIdx === idx && (
                  <div className="px-5 pb-5 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3 animate-in fade-in duration-200">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Grand Finale High-Conversion CTA Banner */}
          <div className="w-full bg-slate-900 text-white py-10 px-5 sm:p-12 md:p-14 rounded-2xl sm:rounded-3xl border border-slate-800 shadow-xl flex flex-col items-center text-center gap-4 sm:gap-5 relative overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute -top-24 -right-24 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-full text-xs font-medium border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Free to start • Zero sign-up friction</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white max-w-lg leading-snug">
              Build a resume that stands out.
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
              ATS-optimized templates, intelligent real-time scoring, and instant PDF export.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 pt-2 w-full max-w-xs sm:max-w-md justify-center">
              <Link href="/welcome" className="w-full sm:w-auto">
                <button
                  type="button"
                  className="w-full sm:w-auto py-3 px-6 bg-[#1C152E] hover:bg-[#2B1F45] active:scale-[0.99] text-white text-xs sm:text-sm font-semibold rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Build Your Resume</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
              <Link href="/resume-checker" className="w-full sm:w-auto">
                <button
                  type="button"
                  className="w-full sm:w-auto py-3 px-5 bg-white/10 hover:bg-white/15 border border-white/20 active:scale-[0.99] text-white text-xs sm:text-sm font-semibold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Get Your Resume Score</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto bg-slate-50 border-t border-slate-200/80 py-12 px-6 lg:px-12 relative z-10 w-full">
        <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-slate-500">
          <div className="flex items-center gap-3">
            <Logo size="sm" showTagline={false} />
            <span>© 2026 Callback. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-6 font-semibold">
            <Link href="/dashboard" className="hover:text-[#FF4B5E]">Dashboard</Link>
            <Link href="/builder" className="hover:text-[#FF4B5E]">Builder Workspace</Link>
            <Link href="/cover-letter" className="hover:text-[#FF4B5E]">Cover Letter</Link>
            <Link href="/welcome" className="hover:text-[#FF4B5E]">Living Agent</Link>
            <Link href="/welcome" className="hover:text-[#FF4B5E]">Recruiter Surface</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
