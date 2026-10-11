'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  FLOWCV_COVER_LETTER_TEMPLATES,
  CoverLetterTemplateMeta,
} from '@/components/cover-letter/CoverLetterTemplatesData';
import { CoverLetterMicroPreview } from '@/components/cover-letter/CoverLetterMicroPreview';
import {
  CoverLetterItem,
  getStoredCoverLetters,
  createNewCoverLetter,
  deleteCoverLetter,
  duplicateCoverLetter,
} from '@/lib/client-cover-letter-store';
import {
  Plus,
  Search,
  FileText,
  Clock,
  Trash2,
  Copy,
  ExternalLink,
  Sparkles,
  CheckCircle2,
  ChevronRight,
  Layers,
} from 'lucide-react';

export default function CoverLetterDashboardPage() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [savedLetters, setSavedLetters] = useState<CoverLetterItem[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // Load existing letters
  useEffect(() => {
    const letters = getStoredCoverLetters();
    setSavedLetters(letters);
    setIsLoaded(true);

    const handleSaved = () => {
      setSavedLetters(getStoredCoverLetters());
    };
    window.addEventListener('cover_letter_saved', handleSaved);
    window.addEventListener('storage', handleSaved);
    return () => {
      window.removeEventListener('cover_letter_saved', handleSaved);
      window.removeEventListener('storage', handleSaved);
    };
  }, []);

  // Filter templates
  const filteredTemplates = FLOWCV_COVER_LETTER_TEMPLATES.filter((tpl) => {
    const matchesCategory =
      activeCategory === 'All' || tpl.category === activeCategory;
    const matchesQuery =
      tpl.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tpl.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tpl.tag.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  // Handler: Create from Template
  const handleCreateWithTemplate = (templateId: string) => {
    const newLetter = createNewCoverLetter(templateId);
    router.push(`/cover-letter/${newLetter.id}`);
  };

  // Handler: Duplicate
  const handleDuplicate = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const dup = duplicateCoverLetter(id);
    if (dup) {
      setSavedLetters(getStoredCoverLetters());
    }
  };

  // Handler: Delete
  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this cover letter?')) {
      deleteCoverLetter(id);
      setSavedLetters(getStoredCoverLetters());
    }
  };

  const categories = ['All', 'Popular', 'Simple', 'Modern', 'Creative'];

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-slate-800 pb-24">
      {/* Top Banner / Hero Header matching FlowCV Exact Aesthetic */}
      <div className="border-b border-slate-200/80 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100/80 text-indigo-700 text-xs font-semibold tracking-wide">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Executive A4 Cover Letter Suite</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Create a cover letter
              </h1>
              <p className="text-base sm:text-lg text-slate-500 max-w-2xl font-normal">
                Craft tailored, recruiter-ready cover letters in seconds with professional A4 layouts.
              </p>
            </div>

            <button
              onClick={() => handleCreateWithTemplate('classic_left')}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-semibold text-sm transition-all shadow-md hover:shadow-lg active:scale-95 shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Create New Cover Letter</span>
            </button>
          </div>

          {/* Quick Stats or Status Pill */}
          {savedLetters.length > 0 && (
            <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap items-center gap-4 text-xs text-slate-500">
              <div className="flex items-center gap-1.5 font-medium text-slate-700">
                <FileText className="w-4 h-4 text-indigo-600" />
                <span>{savedLetters.length} Saved {savedLetters.length === 1 ? 'Letter' : 'Letters'}</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Ready for 1-Click PDF Export</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-slate-500" />
                <span>22 Professional Layouts Available</span>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-12">
        {/* =========================================================================
            SECTION: USER'S EXISTING SAVED COVER LETTERS
           ========================================================================= */}
        {savedLetters.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                  Your Cover Letters
                </h2>
                <p className="text-sm text-slate-500">
                  Pick up where you left off or duplicate for another job application
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {savedLetters.map((letter) => {
                const tplMeta =
                  FLOWCV_COVER_LETTER_TEMPLATES.find((t) => t.id === letter.templateId) ||
                  FLOWCV_COVER_LETTER_TEMPLATES[0];

                const formattedDate = new Date(letter.updatedAt || letter.createdAt).toLocaleDateString(
                  'en-US',
                  { month: 'short', day: 'numeric', year: 'numeric' }
                );

                return (
                  <div
                    key={letter.id}
                    onClick={() => router.push(`/cover-letter/${letter.id}`)}
                    className="group relative bg-white border border-slate-200/90 rounded-2xl p-4 transition-all duration-200 hover:shadow-xl hover:border-indigo-300 hover:-translate-y-1 cursor-pointer flex flex-col justify-between"
                  >
                    <div>
                      {/* Micro Preview of actual letter */}
                      <div className="w-full mb-3 rounded-lg overflow-hidden bg-slate-50 border border-slate-100 shadow-2xs group-hover:shadow-sm transition-all">
                        <CoverLetterMicroPreview
                          template={tplMeta}
                          customData={letter}
                        />
                      </div>

                      {/* Title & Metadata */}
                      <h3 className="font-semibold text-slate-900 text-sm truncate group-hover:text-indigo-600 transition-colors">
                        {letter.title || 'Untitled Cover Letter'}
                      </h3>
                      <p className="text-xs text-slate-500 truncate mt-0.5">
                        {letter.recipient.company ? `To: ${letter.recipient.company}` : `Template: ${tplMeta.name}`}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{formattedDate}</span>
                      </div>

                      <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100">
                        <button
                          onClick={(e) => handleDuplicate(letter.id, e)}
                          title="Duplicate letter"
                          className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-md transition-colors"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={(e) => handleDelete(letter.id, e)}
                          title="Delete letter"
                          className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* =========================================================================
            SECTION: TEMPLATE EXPLORER (MATCHING FLOWCV SCREENSHOT)
           ========================================================================= */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-4">
            {/* Filter Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                    activeCategory === cat
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-slate-100/80 text-slate-600 hover:bg-slate-200/80'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative min-w-[240px]">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search 22 templates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900"
              />
            </div>
          </div>

          {/* TEMPLATE GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-7">
            {/* 1. First Item: "+ New blank" card (Exact match to FlowCV screenshot) */}
            <div
              onClick={() => handleCreateWithTemplate('classic_left')}
              className="group relative flex flex-col items-center justify-center aspect-[210/297] rounded-xl border-2 border-dashed border-slate-300 hover:border-slate-800 bg-slate-50/60 hover:bg-white transition-all duration-200 cursor-pointer p-6 shadow-2xs hover:shadow-lg"
            >
              <div className="w-12 h-12 rounded-full bg-white border border-slate-200 group-hover:border-slate-800 flex items-center justify-center text-slate-600 group-hover:text-slate-950 transition-colors shadow-2xs">
                <Plus className="w-6 h-6 stroke-[2.2]" />
              </div>
              <h3 className="mt-4 text-base font-bold text-slate-700 group-hover:text-slate-950 transition-colors">
                + New blank
              </h3>
              <p className="mt-1 text-xs text-slate-400 text-center font-normal">
                Start from scratch with clean slate
              </p>
            </div>

            {/* 2. FlowCV Templates Cards */}
            {filteredTemplates.map((template) => (
              <div
                key={template.id}
                onClick={() => handleCreateWithTemplate(template.id)}
                className="group flex flex-col cursor-pointer"
              >
                {/* Visual A4 Card */}
                <div className="relative w-full rounded-xl overflow-hidden border border-slate-200/80 bg-white transition-all duration-300 group-hover:shadow-xl group-hover:border-slate-900 group-hover:-translate-y-1">
                  <CoverLetterMicroPreview template={template} />

                  {/* Hover Overlay Button */}
                  <div className="absolute inset-0 bg-slate-950/20 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                    <span className="px-4 py-2.5 rounded-lg bg-slate-950 text-white text-xs font-semibold tracking-wide shadow-lg flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                      <span>Use Template</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>

                  {/* Corner Tag */}
                  {template.tag && (
                    <div className="absolute top-2.5 right-2.5">
                      <span className="px-2 py-0.5 rounded-full bg-white/90 backdrop-blur-xs text-[9px] font-bold tracking-wider text-slate-700 shadow-xs border border-slate-200/60 uppercase">
                        {template.tag}
                      </span>
                    </div>
                  )}
                </div>

                {/* Template Name in FlowCV uppercase typography */}
                <div className="mt-3.5 flex items-center justify-between">
                  <h4 className="text-[12px] font-extrabold uppercase tracking-widest text-slate-700 group-hover:text-slate-950 transition-colors">
                    {template.name}
                  </h4>
                  <div
                    className="w-2.5 h-2.5 rounded-full border border-slate-200"
                    style={{ backgroundColor: template.accentColor }}
                    title={`Accent: ${template.accentColor}`}
                  />
                </div>
                <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                  {template.desc}
                </p>
              </div>
            ))}
          </div>

          {filteredTemplates.length === 0 && (
            <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
              <FileText className="w-10 h-10 text-slate-300 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-800">No templates found</h3>
              <p className="text-xs text-slate-500 mt-1">
                Try searching for something else like "classic", "split", or "minimal".
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('All');
                }}
                className="mt-4 px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
