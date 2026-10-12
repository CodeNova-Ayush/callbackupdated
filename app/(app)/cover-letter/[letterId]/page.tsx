'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import {
  CoverLetterItem,
  getCoverLetterById,
  saveCoverLetterToStore,
  createNewCoverLetter,
  FLOWCV_DEFAULT_COVER_LETTER,
} from '@/lib/client-cover-letter-store';
import {
  FLOWCV_COVER_LETTER_TEMPLATES,
  CoverLetterTemplateMeta,
} from '@/components/cover-letter/CoverLetterTemplatesData';
import { CoverLetterRenderer } from '@/components/cover-letter/CoverLetterRenderer';
import {
  ArrowLeft,
  Printer,
  Sparkles,
  Palette,
  User,
  Building2,
  FileEdit,
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  Check,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Layout,
  Eye,
  Edit3,
  Loader2,
  Copy,
  ChevronDown,
  Mic,
  MicOff,
} from 'lucide-react';
import { useAppAuth, useAppUser } from '@/components/auth/AuthProvider';
import { AuthModal } from '@/components/auth/AuthModal';

export default function CoverLetterEditorPage() {
  const params = useParams();
  const router = useRouter();
  const letterId = typeof params?.letterId === 'string' ? params.letterId : '';

  const { isSignedIn } = useAppAuth();
  const { user } = useAppUser();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);

  const checkIsAuthenticated = () => {
    if (isSignedIn) return true;
    if (typeof window !== 'undefined') {
      return localStorage.getItem('is_authenticated') === 'true';
    }
    return false;
  };

  const [letterData, setLetterData] = useState<CoverLetterItem | null>(null);
  const [activeTab, setActiveTab] = useState<'content' | 'design' | 'ai'>('content');
  const [mobileViewMode, setMobileViewMode] = useState<'edit' | 'preview'>('edit');
  const [zoomMode, setZoomMode] = useState<'fit' | 'custom'>('fit');
  const [customZoom, setCustomZoom] = useState<number>(100);
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving'>('saved');
  const [isExportingPDF, setIsExportingPDF] = useState<boolean>(false);

  // AI Generator state
  const [isGeneratingAI, setIsGeneratingAI] = useState<boolean>(false);
  const [aiRole, setAiRole] = useState<string>('');
  const [aiCompany, setAiCompany] = useState<string>('');
  const [aiTone, setAiTone] = useState<string>('professional');

  // Calculate true available width for right preview pane to prevent any overflow or clipping
  const getCalculatedAvailableWidth = () => {
    if (typeof window === 'undefined') return 560;
    if (window.innerWidth >= 1024) {
      // Desktop: Available width = viewport - sidebar (256) - form panel (480 or 540) - gaps/padding (84)
      const leftPanelWidth = window.innerWidth >= 1280 ? 540 : 480;
      const sidebarWidth = 256;
      const margins = 84;
      const computed = window.innerWidth - sidebarWidth - leftPanelWidth - margins;
      return Math.max(340, computed);
    }
    // Mobile / Tablet: viewport width - screen padding (32)
    return Math.max(300, window.innerWidth - 32);
  };

  const previewContainerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number>(560);

  // Load letter
  useEffect(() => {
    if (!letterId) return;

    const existing = getCoverLetterById(letterId);
    if (existing) {
      setLetterData(existing);
      setAiRole(existing.sender.jobTitle || '');
      setAiCompany(existing.recipient.company || '');
    } else {
      // Create new with this id or fallback
      const created = createNewCoverLetter('classic_left');
      setLetterData({
        ...created,
        id: letterId,
      });
      setAiRole(created.sender.jobTitle || '');
      setAiCompany(created.recipient.company || '');
    }
  }, [letterId]);

  // Handle dynamic container width calculation for perfect auto-fit
  useEffect(() => {
    const updateWidth = () => {
      setContainerWidth(getCalculatedAvailableWidth());
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => {
      window.removeEventListener('resize', updateWidth);
    };
  }, [mobileViewMode]);

  // Voice-to-Text Dictation States & Handler
  const [listeningIndex, setListeningIndex] = useState<number | null>(null);
  const [isListeningPrompt, setIsListeningPrompt] = useState<boolean>(false);

  const handleVoiceToText = (target: number | 'prompt') => {
    if (typeof window === 'undefined') return;

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Voice dictation is supported in Chrome, Safari, Edge, and modern browsers.');
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      if (target === 'prompt') {
        setIsListeningPrompt(true);
      } else {
        setListeningIndex(target);
      }

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (target === 'prompt') {
          setAiRole((prev) => (prev ? `${prev} ${transcript}` : transcript));
        } else {
          updateLetter((prev) => {
            const newBody = [...prev.letterDetails.body];
            const original = newBody[target] || '';
            newBody[target] = original ? `${original} ${transcript}` : transcript;
            return {
              ...prev,
              letterDetails: { ...prev.letterDetails, body: newBody },
            };
          });
        }
      };

      recognition.onerror = () => {
        if (target === 'prompt') setIsListeningPrompt(false);
        else setListeningIndex(null);
      };

      recognition.onend = () => {
        if (target === 'prompt') setIsListeningPrompt(false);
        else setListeningIndex(null);
      };

      recognition.start();
    } catch {
      if (target === 'prompt') setIsListeningPrompt(false);
      else setListeningIndex(null);
    }
  };

  // Auto-save debouncer
  const updateLetter = (updater: (prev: CoverLetterItem) => CoverLetterItem) => {
    setLetterData((prev) => {
      if (!prev) return null;
      const updated = updater(prev);
      setSaveStatus('saving');
      saveCoverLetterToStore(updated);
      setTimeout(() => setSaveStatus('saved'), 400);
      return updated;
    });
  };

  // Preset Colors
  const PRESET_COLORS = [
    { name: 'Midnight Slate', hex: '#1C152E' },
    { name: 'Atlantic Blue', hex: '#0F2841' },
    { name: 'Royal Indigo', hex: '#2563EB' },
    { name: 'Deep Emerald', hex: '#059669' },
    { name: 'Burgundy Wine', hex: '#991B1B' },
    { name: 'Executive Navy', hex: '#0B1E36' },
    { name: 'Rosewood', hex: '#831843' },
    { name: 'Graphite', hex: '#334155' },
  ];

  if (!letterData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex items-center gap-3 text-slate-500 font-medium text-sm">
          <Loader2 className="w-5 h-5 animate-spin text-indigo-600" />
          <span>Loading cover letter...</span>
        </div>
      </div>
    );
  }

  // Active Template
  const activeTemplateMeta =
    FLOWCV_COVER_LETTER_TEMPLATES.find((t) => t.id === letterData.templateId) ||
    FLOWCV_COVER_LETTER_TEMPLATES[0];

  // AI Generate Handler
  const handleGenerateAI = async () => {
    setIsGeneratingAI(true);
    try {
      const res = await fetch('/api/ai/cover-letter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          role: aiRole || letterData.sender.jobTitle || 'Marketing Manager',
          company: aiCompany || letterData.recipient.company || 'Example Company Ltd.',
          candidateName: letterData.sender.fullName || 'Alex Taylor',
          tone: aiTone,
        }),
      });

      if (!res.ok) throw new Error('AI generation failed');
      const data = await res.json();

      if (data.paragraphs && Array.isArray(data.paragraphs)) {
        updateLetter((prev) => ({
          ...prev,
          letterDetails: {
            ...prev.letterDetails,
            subject: data.subject || prev.letterDetails.subject,
            salutation: data.salutation || prev.letterDetails.salutation,
            body: data.paragraphs,
            signOff: data.signOff || prev.letterDetails.signOff,
          },
          recipient: {
            ...prev.recipient,
            company: aiCompany || prev.recipient.company,
          },
        }));
        setActiveTab('content');
      }
    } catch (e) {
      console.error(e);
      alert('Could not generate letter. Please try again.');
    } finally {
      setIsGeneratingAI(false);
    }
  };

  // High-Fidelity Vector PDF Export + Direct Client-Side Download Fallback
  const handleExportPDF = async (forceSkipAuth = false) => {
    if (!forceSkipAuth && !checkIsAuthenticated()) {
      setPendingAction(() => () => handleExportPDF(true));
      setIsAuthModalOpen(true);
      return;
    }

    if (!letterData) return;

    setIsExportingPDF(true);
    const fileName = `Cover_Letter_${(letterData.sender.fullName || 'Candidate').replace(/\s+/g, '_')}.pdf`;

    const printElement =
      document.getElementById('cover-letter-export-sheet') ||
      document.getElementById('cover-letter-dedicated-export') ||
      document.getElementById('cover-letter-dedicated-print');

    if (!printElement) {
      window.print();
      setIsExportingPDF(false);
      return;
    }

    // 1. Try High-Fidelity Server-Side PDF Export first
    try {
      const res = await fetch('/api/export-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          html: printElement.outerHTML,
          title: letterData.title || 'Cover Letter',
        }),
      });

      if (res.ok) {
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        setIsExportingPDF(false);
        return;
      }
    } catch (e) {
      console.warn('Server export failed, falling back to client jsPDF:', e);
    }

    // 2. High-Fidelity Client-Side jsPDF + html2canvas Single Page Direct Download
    try {
      const canvas = await html2canvas(printElement, {
        scale: 2.2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        windowWidth: 794,
        windowHeight: 1123,
      });

      const imgData = canvas.toDataURL('image/jpeg', 0.98);
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        compress: true,
      });

      pdf.addImage(imgData, 'JPEG', 0, 0, 210, 297, undefined, 'FAST');
      pdf.save(fileName);
    } catch (err) {
      console.warn('Canvas export failed, falling back to window.print:', err);
      window.print();
    } finally {
      setIsExportingPDF(false);
    }
  };

  // Automatically trigger PDF export after returning from sign-in with ?auto_download=true
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const isAuth =
        isSignedIn || localStorage.getItem('is_authenticated') === 'true';
      if (urlParams.get('auto_download') === 'true' && isAuth) {
        window.history.replaceState({}, '', window.location.pathname);
        setTimeout(() => {
          handleExportPDF(true);
        }, 300);
      }
    }
  }, [isSignedIn]);

  return (
    <div className="min-h-screen bg-[#F4F4F6] text-slate-900 flex flex-col">
      {/* =========================================================================
          TOP NAVIGATION & ACTION BAR
         ========================================================================= */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200/90 shadow-2xs print:hidden">
        <div className="max-w-[1700px] mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4">
          {/* Left: Back & Title */}
          <div className="flex items-center gap-3 min-w-0">
            <Link
              href="/cover-letter"
              className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors shrink-0"
              title="Back to All Cover Letters"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>

            <div className="flex flex-col min-w-0">
              <input
                type="text"
                value={letterData.title}
                onChange={(e) =>
                  updateLetter((prev) => ({ ...prev, title: e.target.value }))
                }
                className="font-bold text-sm sm:text-base text-slate-900 bg-transparent border-none focus:outline-none focus:ring-1 focus:ring-indigo-500 rounded px-1 -ml-1 truncate max-w-[200px] sm:max-w-xs md:max-w-md"
                placeholder="Untitled Cover Letter"
              />
              <div className="flex items-center gap-2 text-[11px] text-slate-400 px-1">
                <span className="font-medium text-slate-600 truncate">
                  {activeTemplateMeta.name}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 text-emerald-600 font-medium">
                  <Check className="w-3 h-3" />
                  {saveStatus === 'saved' ? 'Auto-saved' : 'Saving...'}
                </span>
              </div>
            </div>
          </div>

          {/* Center (Mobile Only): View Switcher */}
          <div className="flex lg:hidden items-center p-1 bg-slate-100 rounded-xl border border-slate-200/80">
            <button
              onClick={() => setMobileViewMode('edit')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                mobileViewMode === 'edit'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600'
              }`}
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit</span>
            </button>
            <button
              onClick={() => setMobileViewMode('preview')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                mobileViewMode === 'preview'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Preview</span>
            </button>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2">
            <button
              disabled={isExportingPDF}
              onClick={() => handleExportPDF()}
              className="inline-flex items-center justify-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 disabled:bg-slate-700 text-white font-semibold text-xs sm:text-sm transition-all shadow-sm active:scale-95 shrink-0 cursor-pointer"
              title="Download PDF or Print"
            >
              {isExportingPDF ? (
                <Loader2 className="w-4 h-4 animate-spin text-white" />
              ) : (
                <Printer className="w-4 h-4" />
              )}
              <span className="hidden sm:inline">
                {isExportingPDF ? 'Exporting PDF...' : 'Export PDF / Print'}
              </span>
              <span className="sm:hidden">{isExportingPDF ? 'PDF...' : 'PDF'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* =========================================================================
          MAIN WORKSPACE LAYOUT (2-COLUMN ON DESKTOP, TABBED ON MOBILE)
         ========================================================================= */}
      <div className="flex-1 max-w-[1700px] w-full mx-auto p-3 sm:p-5 flex flex-col lg:flex-row gap-6 print:hidden">
        {/* =======================================================================
            LEFT COLUMN: EDITOR FORMS & CONTROLS
           ======================================================================= */}
        <div
          className={`w-full lg:w-[480px] xl:w-[540px] flex-col gap-4 shrink-0 ${
            mobileViewMode === 'preview' ? 'hidden lg:flex' : 'flex'
          }`}
        >
          {/* Sub Navigation Tabs */}
          <div className="flex items-center p-1 bg-white rounded-2xl border border-slate-200/90 shadow-2xs">
            <button
              onClick={() => setActiveTab('content')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'content'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <FileEdit className="w-4 h-4" />
              <span>Content</span>
            </button>
            <button
              onClick={() => setActiveTab('design')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'design'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Palette className="w-4 h-4" />
              <span>Templates & Style</span>
            </button>
            <button
              onClick={() => setActiveTab('ai')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'ai'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-indigo-600 hover:text-indigo-800'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>AI Writer</span>
            </button>
          </div>

          {/* TAB 1: CONTENT FORM */}
          {activeTab === 'content' && (
            <div className="space-y-4">
              {/* SENDER SECTION */}
              <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-2xs space-y-4">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-sm border-b border-slate-100 pb-3">
                  <User className="w-4 h-4 text-indigo-600" />
                  <span>Sender Information (Your Details)</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={letterData.sender.fullName}
                      onChange={(e) =>
                        updateLetter((prev) => ({
                          ...prev,
                          sender: { ...prev.sender, fullName: e.target.value },
                          letterDetails: {
                            ...prev.letterDetails,
                            signatureText: e.target.value,
                          },
                        }))
                      }
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:border-indigo-600 font-medium"
                      placeholder="Alex Taylor"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Job Title
                    </label>
                    <input
                      type="text"
                      value={letterData.sender.jobTitle || ''}
                      onChange={(e) =>
                        updateLetter((prev) => ({
                          ...prev,
                          sender: { ...prev.sender, jobTitle: e.target.value },
                        }))
                      }
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:border-indigo-600"
                      placeholder="Senior Marketing Manager"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={letterData.sender.email}
                      onChange={(e) =>
                        updateLetter((prev) => ({
                          ...prev,
                          sender: { ...prev.sender, email: e.target.value },
                        }))
                      }
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:border-indigo-600"
                      placeholder="alex.taylor@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="text"
                      value={letterData.sender.phone}
                      onChange={(e) =>
                        updateLetter((prev) => ({
                          ...prev,
                          sender: { ...prev.sender, phone: e.target.value },
                        }))
                      }
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:border-indigo-600"
                      placeholder="+44 123 456 7890"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Street Address
                    </label>
                    <input
                      type="text"
                      value={letterData.sender.address || ''}
                      onChange={(e) =>
                        updateLetter((prev) => ({
                          ...prev,
                          sender: { ...prev.sender, address: e.target.value },
                        }))
                      }
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:border-indigo-600"
                      placeholder="123 Example Street"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      City, Postal Code
                    </label>
                    <input
                      type="text"
                      value={letterData.sender.city || ''}
                      onChange={(e) =>
                        updateLetter((prev) => ({
                          ...prev,
                          sender: { ...prev.sender, city: e.target.value },
                        }))
                      }
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:border-indigo-600"
                      placeholder="Example City 12345"
                    />
                  </div>
                </div>
              </div>

              {/* RECIPIENT SECTION */}
              <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-2xs space-y-4">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-sm border-b border-slate-100 pb-3">
                  <Building2 className="w-4 h-4 text-indigo-600" />
                  <span>Recipient Information (Target Employer)</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Recipient / Contact Person
                    </label>
                    <input
                      type="text"
                      value={letterData.recipient.name}
                      onChange={(e) =>
                        updateLetter((prev) => ({
                          ...prev,
                          recipient: { ...prev.recipient, name: e.target.value },
                        }))
                      }
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:border-indigo-600"
                      placeholder="Ms. Jane Doe"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Department or Role
                    </label>
                    <input
                      type="text"
                      value={letterData.recipient.department || ''}
                      onChange={(e) =>
                        updateLetter((prev) => ({
                          ...prev,
                          recipient: { ...prev.recipient, department: e.target.value },
                        }))
                      }
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:border-indigo-600"
                      placeholder="Human Resources Department"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Company Name *
                    </label>
                    <input
                      type="text"
                      value={letterData.recipient.company}
                      onChange={(e) =>
                        updateLetter((prev) => ({
                          ...prev,
                          recipient: { ...prev.recipient, company: e.target.value },
                        }))
                      }
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:border-indigo-600 font-medium"
                      placeholder="Example Company Ltd."
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Company Street Address
                    </label>
                    <input
                      type="text"
                      value={letterData.recipient.address || ''}
                      onChange={(e) =>
                        updateLetter((prev) => ({
                          ...prev,
                          recipient: { ...prev.recipient, address: e.target.value },
                        }))
                      }
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:border-indigo-600"
                      placeholder="42 Company Street"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Company City & Zip
                    </label>
                    <input
                      type="text"
                      value={letterData.recipient.city || ''}
                      onChange={(e) =>
                        updateLetter((prev) => ({
                          ...prev,
                          recipient: { ...prev.recipient, city: e.target.value },
                        }))
                      }
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:border-indigo-600"
                      placeholder="Business City 67890"
                    />
                  </div>
                </div>
              </div>

              {/* LETTER DETAILS & PARAGRAPHS */}
              <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-2xs space-y-4">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-sm border-b border-slate-100 pb-3">
                  <FileEdit className="w-4 h-4 text-indigo-600" />
                  <span>Letter Details & Body</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Date
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={letterData.letterDetails.date}
                        onChange={(e) =>
                          updateLetter((prev) => ({
                            ...prev,
                            letterDetails: { ...prev.letterDetails, date: e.target.value },
                          }))
                        }
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:border-indigo-600"
                        placeholder="24 January 2027"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const today = new Date().toLocaleDateString('en-GB', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                          });
                          updateLetter((prev) => ({
                            ...prev,
                            letterDetails: { ...prev.letterDetails, date: today },
                          }));
                        }}
                        className="px-2.5 py-1 text-[10px] font-bold bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-600 whitespace-nowrap"
                      >
                        Today
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Salutation
                    </label>
                    <input
                      type="text"
                      value={letterData.letterDetails.salutation}
                      onChange={(e) =>
                        updateLetter((prev) => ({
                          ...prev,
                          letterDetails: { ...prev.letterDetails, salutation: e.target.value },
                        }))
                      }
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:border-indigo-600"
                      placeholder="Dear Ms. Doe,"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Subject Line *
                    </label>
                    <input
                      type="text"
                      value={letterData.letterDetails.subject}
                      onChange={(e) =>
                        updateLetter((prev) => ({
                          ...prev,
                          letterDetails: { ...prev.letterDetails, subject: e.target.value },
                        }))
                      }
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-800 font-bold focus:outline-none focus:border-indigo-600"
                      placeholder="Application for Marketing Manager"
                    />
                  </div>
                </div>

                {/* Paragraphs List */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-700">Body Paragraphs</span>
                    <button
                      type="button"
                      onClick={() =>
                        updateLetter((prev) => ({
                          ...prev,
                          letterDetails: {
                            ...prev.letterDetails,
                            body: [...prev.letterDetails.body, ''],
                          },
                        }))
                      }
                      className="flex items-center gap-1 text-xs text-indigo-600 hover:text-indigo-800 font-semibold"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Paragraph</span>
                    </button>
                  </div>

                  {letterData.letterDetails.body.map((para, index) => (
                    <div
                      key={index}
                      className="p-3 rounded-xl border border-slate-200/90 bg-slate-50/50 space-y-2 group"
                    >
                      <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium">
                        <span>Paragraph {index + 1}</span>
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => handleVoiceToText(index)}
                            className={`px-2 py-0.5 rounded-md text-[11px] font-bold flex items-center gap-1 transition-all cursor-pointer ${
                              listeningIndex === index
                                ? 'bg-rose-100 text-rose-700 animate-pulse ring-1 ring-rose-400'
                                : 'text-slate-500 hover:text-indigo-600 hover:bg-white'
                            }`}
                            title="Dictate paragraph using Microphone (Voice-to-Text)"
                          >
                            <Mic className="w-3 h-3 text-rose-500" />
                            <span>{listeningIndex === index ? 'Listening...' : 'Voice Dictate'}</span>
                          </button>

                          {index > 0 && (
                            <button
                              type="button"
                              onClick={() => {
                                updateLetter((prev) => {
                                  const newBody = [...prev.letterDetails.body];
                                  const temp = newBody[index];
                                  newBody[index] = newBody[index - 1];
                                  newBody[index - 1] = temp;
                                  return {
                                    ...prev,
                                    letterDetails: { ...prev.letterDetails, body: newBody },
                                  };
                                });
                              }}
                              className="p-1 hover:text-slate-800 hover:bg-white rounded"
                              title="Move Up"
                            >
                              <ArrowUp className="w-3 h-3" />
                            </button>
                          )}
                          {index < letterData.letterDetails.body.length - 1 && (
                            <button
                              type="button"
                              onClick={() => {
                                updateLetter((prev) => {
                                  const newBody = [...prev.letterDetails.body];
                                  const temp = newBody[index];
                                  newBody[index] = newBody[index + 1];
                                  newBody[index + 1] = temp;
                                  return {
                                    ...prev,
                                    letterDetails: { ...prev.letterDetails, body: newBody },
                                  };
                                });
                              }}
                              className="p-1 hover:text-slate-800 hover:bg-white rounded"
                              title="Move Down"
                            >
                              <ArrowDown className="w-3 h-3" />
                            </button>
                          )}
                          {letterData.letterDetails.body.length > 1 && (
                            <button
                              type="button"
                              onClick={() => {
                                updateLetter((prev) => ({
                                  ...prev,
                                  letterDetails: {
                                    ...prev.letterDetails,
                                    body: prev.letterDetails.body.filter((_, i) => i !== index),
                                  },
                                }));
                              }}
                              className="p-1 hover:text-red-600 hover:bg-red-50 rounded"
                              title="Delete Paragraph"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                      </div>

                      <textarea
                        rows={3}
                        value={para}
                        onChange={(e) => {
                          const val = e.target.value;
                          updateLetter((prev) => {
                            const newBody = [...prev.letterDetails.body];
                            newBody[index] = val;
                            return {
                              ...prev,
                              letterDetails: { ...prev.letterDetails, body: newBody },
                            };
                          });
                        }}
                        className="w-full p-2.5 rounded-lg border border-slate-200 bg-white text-xs leading-relaxed text-slate-800 focus:outline-none focus:border-indigo-600"
                        placeholder="Write your paragraph..."
                      />
                    </div>
                  ))}
                </div>

                {/* Sign-off & Signature */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Sign-off
                    </label>
                    <input
                      type="text"
                      value={letterData.letterDetails.signOff}
                      onChange={(e) =>
                        updateLetter((prev) => ({
                          ...prev,
                          letterDetails: { ...prev.letterDetails, signOff: e.target.value },
                        }))
                      }
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:border-indigo-600"
                      placeholder="Sincerely,"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Signature Name
                    </label>
                    <input
                      type="text"
                      value={letterData.letterDetails.signatureText}
                      onChange={(e) =>
                        updateLetter((prev) => ({
                          ...prev,
                          letterDetails: { ...prev.letterDetails, signatureText: e.target.value },
                        }))
                      }
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:border-indigo-600"
                      placeholder="Alex Taylor"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: DESIGN & TEMPLATES */}
          {activeTab === 'design' && (
            <div className="space-y-4">
              {/* Template Picker */}
              <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-2xs space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                    <Layout className="w-4 h-4 text-indigo-600" />
                    <span>Cover Letter Template Layout</span>
                  </div>
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                    22 Options
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-[380px] overflow-y-auto pr-1">
                  {FLOWCV_COVER_LETTER_TEMPLATES.map((tpl) => {
                    const isSelected = letterData.templateId === tpl.id;
                    return (
                      <div
                        key={tpl.id}
                        onClick={() => {
                          updateLetter((prev) => ({
                            ...prev,
                            templateId: tpl.id,
                            style: {
                              ...prev.style,
                              accentColor: tpl.accentColor,
                              fontFamily: tpl.fontFamily,
                            },
                          }));
                        }}
                        className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all flex flex-col justify-between ${
                          isSelected
                            ? 'border-indigo-600 bg-indigo-50/50 shadow-2xs ring-2 ring-indigo-600/10'
                            : 'border-slate-200 hover:border-slate-400 bg-white'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-1 mb-1.5">
                          <span className="text-[11px] font-bold text-slate-800 line-clamp-1">
                            {tpl.name}
                          </span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-indigo-600 shrink-0" />}
                        </div>
                        <span className="text-[9px] uppercase font-bold tracking-wider text-slate-400">
                          {tpl.category}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Accent Color & Typography */}
              <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-2xs space-y-4">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-sm border-b border-slate-100 pb-3">
                  <Palette className="w-4 h-4 text-indigo-600" />
                  <span>Color & Typography</span>
                </div>

                {/* Accent Colors */}
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-2">
                    Accent Color
                  </label>
                  <div className="flex flex-wrap items-center gap-2">
                    {PRESET_COLORS.map((c) => {
                      const isSelected = letterData.style.accentColor === c.hex;
                      return (
                        <button
                          key={c.hex}
                          type="button"
                          onClick={() =>
                            updateLetter((prev) => ({
                              ...prev,
                              style: { ...prev.style, accentColor: c.hex },
                            }))
                          }
                          className={`w-7 h-7 rounded-full border transition-transform flex items-center justify-center ${
                            isSelected ? 'scale-110 ring-2 ring-indigo-600 ring-offset-2' : 'hover:scale-105'
                          }`}
                          style={{ backgroundColor: c.hex }}
                          title={c.name}
                        >
                          {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                        </button>
                      );
                    })}

                    {/* Custom Hex */}
                    <div className="flex items-center gap-1.5 ml-2">
                      <input
                        type="color"
                        value={letterData.style.accentColor || '#1C152E'}
                        onChange={(e) =>
                          updateLetter((prev) => ({
                            ...prev,
                            style: { ...prev.style, accentColor: e.target.value },
                          }))
                        }
                        className="w-7 h-7 rounded-lg border border-slate-200 cursor-pointer p-0 bg-transparent"
                      />
                      <span className="text-[11px] text-slate-400 font-mono">Custom</span>
                    </div>
                  </div>
                </div>

                {/* Font Family */}
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-2">
                    Font Family
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'sans', name: 'Sans-Serif', fontClass: 'font-sans' },
                      { id: 'serif', name: 'Serif (Classic)', fontClass: 'font-serif' },
                      { id: 'mono', name: 'Monospace', fontClass: 'font-mono' },
                    ].map((f) => {
                      const isSelected = letterData.style.fontFamily === f.id;
                      return (
                        <button
                          key={f.id}
                          type="button"
                          onClick={() =>
                            updateLetter((prev) => ({
                              ...prev,
                              style: {
                                ...prev.style,
                                fontFamily: f.id as 'sans' | 'serif' | 'mono',
                              },
                            }))
                          }
                          className={`py-2 px-3 rounded-xl border text-xs font-semibold transition-all ${f.fontClass} ${
                            isSelected
                              ? 'border-indigo-600 bg-indigo-50 text-indigo-900 shadow-2xs'
                              : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          {f.name}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: AI ASSISTANT */}
          {activeTab === 'ai' && (
            <div className="bg-white rounded-2xl border border-indigo-200 p-5 shadow-2xs space-y-4">
              <div className="flex items-center gap-2 text-indigo-950 font-bold text-sm border-b border-indigo-100 pb-3">
                <Sparkles className="w-4 h-4 text-indigo-600" />
                <span>AI Cover Letter Generator (Gemini Powered)</span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                Describe the target job and company, and CallBack AI will craft a personalized, compelling cover letter in seconds.
              </p>

              <div className="space-y-3 text-xs">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-[11px] font-semibold text-slate-700">
                      Target Job Title
                    </label>
                    <button
                      type="button"
                      onClick={() => handleVoiceToText('prompt')}
                      className={`px-2 py-0.5 rounded text-[10px] font-bold flex items-center gap-1 transition-all cursor-pointer ${
                        isListeningPrompt
                          ? 'bg-rose-100 text-rose-700 animate-pulse ring-1 ring-rose-400'
                          : 'text-slate-500 hover:text-indigo-600 hover:bg-slate-100'
                      }`}
                      title="Dictate Target Job Title using Microphone"
                    >
                      <Mic className="w-3 h-3 text-rose-500" />
                      <span>{isListeningPrompt ? 'Listening...' : 'Voice Dictate'}</span>
                    </button>
                  </div>
                  <input
                    type="text"
                    value={aiRole}
                    onChange={(e) => setAiRole(e.target.value)}
                    placeholder="e.g. Senior Product Marketing Manager"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-600 text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Target Company
                  </label>
                  <input
                    type="text"
                    value={aiCompany}
                    onChange={(e) => setAiCompany(e.target.value)}
                    placeholder="e.g. Stripe, Linear, or Airbnb"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-600 text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Tone of Voice
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'professional', label: 'Professional & Polished' },
                      { id: 'confident', label: 'Bold & Confident' },
                      { id: 'enthusiastic', label: 'Enthusiastic & Passionate' },
                      { id: 'executive', label: 'Senior Executive' },
                    ].map((t) => (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setAiTone(t.id)}
                        className={`p-2 rounded-xl border text-[11px] font-medium transition-all text-left ${
                          aiTone === t.id
                            ? 'border-indigo-600 bg-indigo-50 text-indigo-900 font-semibold'
                            : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  disabled={isGeneratingAI}
                  onClick={handleGenerateAI}
                  className="w-full mt-2 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold text-xs transition-all shadow-md flex items-center justify-center gap-2 active:scale-95"
                >
                  {isGeneratingAI ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Writing Cover Letter with AI...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Generate Tailored Cover Letter</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* =======================================================================
            RIGHT COLUMN: LIVE A4 SHEET PREVIEW (DESKTOP STICKY, MOBILE RESPONSIVE)
           ======================================================================= */}
        <div
          ref={previewContainerRef}
          className={`flex-1 flex-col items-center min-w-0 w-full overflow-hidden ${
            mobileViewMode === 'edit' ? 'hidden lg:flex' : 'flex'
          }`}
        >
          {/* Zoom & Screen Controls Toolbar */}
          {(() => {
            const autoFitScale = Math.min(1.0, Math.max(0.35, (containerWidth - 24) / 794));
            const effectiveScale = zoomMode === 'fit' ? autoFitScale : (customZoom / 100);
            const scaledWidth = Math.round(794 * effectiveScale);
            const scaledHeight = Math.round(1123 * effectiveScale);

            return (
              <>
                <div className="w-full max-w-[794px] mb-4 flex items-center justify-between px-2 text-xs text-slate-500">
                  <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                    <span>A4 Document Preview</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-200 text-slate-600 font-bold">
                      Executive A4 Format
                    </span>
                  </span>

                  {/* Zoom Controls */}
                  <div className="flex items-center gap-1 bg-white border border-slate-200/90 rounded-xl p-1 shadow-2xs">
                    <button
                      onClick={() => {
                        setZoomMode('custom');
                        setCustomZoom((z) => Math.max(40, z - 10));
                      }}
                      className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg cursor-pointer"
                      title="Zoom Out"
                    >
                      <ZoomOut className="w-3.5 h-3.5" />
                    </button>
                    <span className="font-mono text-xs font-semibold px-2 text-slate-700 min-w-[46px] text-center">
                      {Math.round(effectiveScale * 100)}%
                    </span>
                    <button
                      onClick={() => {
                        setZoomMode('custom');
                        setCustomZoom((z) => Math.min(150, z + 10));
                      }}
                      className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg cursor-pointer"
                      title="Zoom In"
                    >
                      <ZoomIn className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setZoomMode('fit')}
                      className={`px-2 py-1 text-[11px] font-semibold rounded-lg cursor-pointer transition-colors ${
                        zoomMode === 'fit'
                          ? 'bg-slate-900 text-white'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                      }`}
                    >
                      Fit
                    </button>
                    <button
                      onClick={() => {
                        setZoomMode('custom');
                        setCustomZoom(100);
                      }}
                      className={`px-2 py-1 text-[11px] font-semibold rounded-lg cursor-pointer transition-colors ${
                        zoomMode === 'custom' && customZoom === 100
                          ? 'bg-slate-900 text-white'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                      }`}
                    >
                      100%
                    </button>
                  </div>
                </div>

                {/* Scaled A4 Sheet Display */}
                <div className="w-full flex-1 overflow-x-auto flex flex-col items-center py-2 px-1 pb-16">
                  <div
                    style={{
                      width: `${scaledWidth}px`,
                      height: `${scaledHeight}px`,
                      maxWidth: zoomMode === 'fit' ? '100%' : undefined,
                    }}
                    className="relative shadow-[0_15px_40px_rgba(0,0,0,0.12)] rounded-xs overflow-hidden bg-white mx-auto transition-all shrink-0"
                  >
                    <div
                      style={{
                        width: '794px',
                        minHeight: '1123px',
                        transform: `scale(${effectiveScale})`,
                        transformOrigin: 'top left',
                      }}
                      className="bg-white"
                    >
                      <CoverLetterRenderer data={letterData} />
                    </div>
                  </div>
                </div>
              </>
            );
          })()}
        </div>
      </div>

      {/* Dedicated Off-Screen 1-Page A4 Sheet for Vector & Canvas Export (Never hidden from DOM layout) */}
      <div
        id="cover-letter-dedicated-export"
        aria-hidden="true"
        style={{
          position: 'fixed',
          left: '-10000px',
          top: 0,
          width: '794px',
          height: '1123px',
          maxHeight: '1123px',
          overflow: 'hidden',
          zIndex: -9999,
          pointerEvents: 'none',
          backgroundColor: '#ffffff',
        }}
      >
        <div
          id="cover-letter-export-sheet"
          className="bg-white"
          style={{
            width: '794px',
            height: '1123px',
            maxHeight: '1123px',
            overflow: 'hidden',
            boxSizing: 'border-box',
          }}
        >
          {letterData && <CoverLetterRenderer data={letterData} isMicroPreview={false} />}
        </div>
      </div>

      {/* Auth Gate Modal for Cover Letter Download */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => {
          setIsAuthModalOpen(false);
          setPendingAction(null);
        }}
        onSuccess={() => {
          setIsAuthModalOpen(false);
          if (pendingAction) {
            const nextAction = pendingAction;
            setPendingAction(null);
            nextAction();
          }
        }}
        title="Save & Download Cover Letter"
        subtitle="Sign in or create a free account to download your cover letter."
      />
    </div>
  );
}
