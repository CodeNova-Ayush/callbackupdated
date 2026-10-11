'use client';

import React, { useState, useEffect, use } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import {
  FileText,
  GripVertical,
  Plus,
  Trash2,
  Sparkles,
  Download,
  ZoomIn,
  ZoomOut,
  User,
  Briefcase,
  GraduationCap,
  FolderGit2,
  Wrench,
  Layout,
  RotateCcw,
  CheckCircle2,
  Save,
  Loader2,
  RefreshCw,
  PanelLeftClose,
  PanelLeftOpen,
  PanelRightClose,
  PanelRightOpen,
  Maximize2,
  Minimize2,
  SlidersHorizontal,
  Smartphone,
  ChevronLeft,
  ChevronRight,
  Eye,
  Edit3,
  Layers,
  Search,
  X,
  Pencil,
  Star,
  Printer,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input, Textarea } from '@/components/ui/Input';
import { Card, Badge } from '@/components/ui/Card';
import { Modal } from '@/components/ui/Modal';
import { ResumeTemplateRenderer, TemplateId, ResumeData } from '@/components/builder/ResumeTemplates';
import { ResumeSectionEditor } from '@/components/builder/ResumeSectionEditor';
import { TemplateMicroPreview } from '@/components/builder/TemplateMicroPreview';
import { useAppAuth, useAppUser } from '@/components/auth/AuthProvider';
import { AuthModal } from '@/components/auth/AuthModal';
import { saveResumeToStore } from '@/lib/client-resume-store';

const DEMO_DATA: ResumeData = {
  personalInfo: {
    fullName: 'ALEX RIVERA',
    email: 'alex.rivera@neuralflow.ai',
    phone: '+1 (555) 439-8821',
    location: 'San Francisco, CA',
    linkedin: 'linkedin.com/in/alexrivera-ai',
    github: 'github.com/alexrivera',
    summary:
      'Staff Software Engineer and Systems Architect with 6+ years of experience engineering high-throughput distributed infrastructure, low-latency LLM inference pipelines, and enterprise-grade full-stack platforms. Founder of SynthBase (YC W24, acquired) and core contributor to open-source agent frameworks. Proven track record scaling microservices to 10M+ daily active requests with 99.99% uptime, cutting p99 query latencies by 60%, and orchestrating multi-region cloud deployments on AWS and GCP. Passionate about autonomous agents, vector indexing, and developer tooling.',
  },
  experiences: [
    {
      id: 'exp-1',
      role: 'Founding Staff AI Engineer',
      company: 'NeuralFlow Systems (AI Agents & RAG Infra)',
      location: 'San Francisco, CA',
      startDate: 'Jun 2024',
      endDate: 'Present',
      bullets: [
        'Architected asynchronous distributed task-queue engine handling 120k peak req/sec at sub-45ms p95 latency.',
        'Engineered custom semantic cache & hybrid vector retrieval pipeline, reducing LLM API token spend by 48%.',
        'Designed multi-tenant access control and end-to-end telemetry streaming across Kubernetes clusters.',
        'Led technical strategy and mentored an engineering team of 8 full-stack and ML infrastructure developers.',
      ],
    },
    {
      id: 'exp-2',
      role: 'Senior Full-Stack Engineer',
      company: 'Stripe (Core Billing & Payment Routing)',
      location: 'San Francisco, CA',
      startDate: 'Jan 2022',
      endDate: 'May 2024',
      bullets: [
        'Led frontend and backend architecture for next-gen adaptive payment flow using React, TypeScript, and Go.',
        'Optimized PostgreSQL shard indexing strategies, cutting complex ledger reconciliation runtimes from 8.4s to 320ms.',
        'Instituted automated canary deployment workflows and integration testing suites, achieving zero-downtime releases.',
      ],
    },
    {
      id: 'exp-3',
      role: 'Full Stack Engineering Intern',
      company: 'Vercel (Developer Experience & Edge)',
      location: 'Remote',
      startDate: 'May 2021',
      endDate: 'Dec 2021',
      bullets: [
        'Built Next.js edge runtime middleware extensions and analytics dashboard for enterprise team tiers.',
        'Implemented incremental static regeneration (ISR) stress testing harnesses and automated regression monitors.',
        'Collaborated directly with framework core team to optimize Cold Start latency by 35%.',
      ],
    },
    {
      id: 'exp-4',
      role: 'Lead Architect & Hackathon Winner',
      company: 'ApexAgent – Global AI Hackathon Champion',
      location: 'San Francisco, CA',
      startDate: 'Oct 2023',
      endDate: 'Oct 2023',
      bullets: [
        'Spearheaded architecture of autonomous reasoning pipeline utilizing LangChain, Next.js 14, and PgVector.',
        'Won 1st Place Grand Prize among 1,200+ international engineering teams.',
      ],
    },
  ],
  education: [
    {
      id: 'edu-1',
      degree: 'M.S. in Computer Science (AI & Systems)',
      institution: 'Stanford University',
      location: 'Stanford, CA',
      startDate: '2020',
      endDate: '2022',
      gpa: '3.92 / 4.0',
    },
    {
      id: 'edu-2',
      degree: 'B.S. in Electrical Engineering & Computer Science (EECS)',
      institution: 'University of California, Berkeley',
      location: 'Berkeley, CA',
      startDate: '2016',
      endDate: '2020',
      gpa: '3.88 / 4.0',
    },
  ],
  projects: [
    {
      id: 'proj-1',
      title: 'SynthBase — Multi-Agent Developer Infrastructure',
      techStack: 'Next.js 15, TypeScript, Python, PgVector, Claude 3.5 Sonnet',
      link: 'github.com/alexrivera/synthbase',
      bullets: [
        'Built autonomous agent evaluation workspace processing 500k monthly LLM runs with real-time telemetry.',
        'Acquired by enterprise AI analytics group in 2025; starred by 8.5k developers on GitHub.',
      ],
    },
  ],
  skills: [
    'TypeScript',
    'Python',
    'Go',
    'Rust',
    'C++',
    'JavaScript',
    'React',
    'Next.js',
    'Node.js',
    'PostgreSQL',
    'PgVector',
    'Redis',
    'AWS',
    'GCP',
    'Docker',
    'Kubernetes',
    'Terraform',
    'Git',
    'LLM Orchestration',
    'Multi-Agent Systems',
    'RAG Pipelines',
  ],
};

const EMPTY_DATA: ResumeData = {
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    github: '',
    summary: '',
  },
  experiences: [],
  education: [],
  projects: [],
  skills: [],
};

export default function BuilderPage(props: { params: Promise<{ resumeId: string }> }) {
  const params = use(props.params);
  const resumeId = params.resumeId || 'demo-resume-alex-1';
  const isDemoResume = resumeId === 'demo-resume-alex-1';

  // Start with default rich executive data so the resume is always fully filled like top templates
  const initialData = DEMO_DATA;

  const [activeSection, setActiveSection] = useState<string>('personal_info');
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateId>('classic_ats');
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [isEnhancing, setIsEnhancing] = useState<string | null>(null);
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState<boolean>(false);
  const [isExportPreviewModalOpen, setIsExportPreviewModalOpen] = useState<boolean>(false);
  const [templateCategory, setTemplateCategory] = useState<string>('All');
  const [templateSearchQuery, setTemplateSearchQuery] = useState<string>('');
  const [isExportingPDF, setIsExportingPDF] = useState<boolean>(false);
  const [downloadSuccessMsg, setDownloadSuccessMsg] = useState<string | null>(null);
  const [lastSavedTime, setLastSavedTime] = useState<string>('Just now');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const [isEditorCollapsed, setIsEditorCollapsed] = useState<boolean>(false);
  const [previewWidthPreset, setPreviewWidthPreset] = useState<'standard' | 'wide' | 'expanded'>('wide');

  const router = useRouter();

  // Auth Protection for Export / Download / Completion
  const { isSignedIn } = useAppAuth();
  const { user } = useAppUser();
  const isUserAuthenticated = Boolean(
    isSignedIn &&
    user?.primaryEmailAddress?.emailAddress &&
    typeof window !== 'undefined' &&
    localStorage.getItem('is_authenticated') === 'true' &&
    localStorage.getItem('user_email') &&
    !localStorage.getItem('user_email')?.includes('neuralflow.ai')
  );
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authModalTitle, setAuthModalTitle] = useState<string>('Save Your Resume');
  const [authModalSubtitle, setAuthModalSubtitle] = useState<string>(
    'Sign in or create a free account to continue.'
  );
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);

  // Mobile Responsiveness & Phone Simulator States
  const [isMobileScreen, setIsMobileScreen] = useState<boolean>(false);
  const [isMobileSimulator, setIsMobileSimulator] = useState<boolean>(false);
  const [mobileTab, setMobileTab] = useState<'form' | 'preview' | 'sections'>('form');
  const [mobilePreviewZoom, setMobilePreviewZoom] = useState<'fit' | '100'>('fit');
  const [mobileContainerWidth, setMobileContainerWidth] = useState<number>(380);

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== 'undefined') {
        setIsMobileScreen(window.innerWidth < 1024);
        setMobileContainerWidth(window.innerWidth);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Resume State
  const [personalInfo, setPersonalInfo] = useState(initialData.personalInfo);
  const [experiences, setExperiences] = useState(initialData.experiences);
  const [education, setEducation] = useState(initialData.education);
  const [projects, setProjects] = useState(initialData.projects);
  const [skills, setSkills] = useState<string[]>(initialData.skills);
  const [newSkillInput, setNewSkillInput] = useState('');

  // 1. Load from Browser Local Storage or Database on mount
  useEffect(() => {
    let loadedFromLocal = false;
    if (typeof window !== 'undefined') {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const templateFromUrl = urlParams.get('template') as TemplateId | null;
        if (templateFromUrl) {
          setSelectedTemplate(templateFromUrl);
        }

        const saved = localStorage.getItem('callback_ai_saved_resume_' + resumeId);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed.personalInfo) {
            setPersonalInfo({
              ...DEMO_DATA.personalInfo,
              ...parsed.personalInfo,
              summary: parsed.personalInfo.summary || DEMO_DATA.personalInfo.summary,
            });
          }
          if (parsed.experiences && parsed.experiences.length > 0) {
            setExperiences(parsed.experiences);
          } else {
            setExperiences(DEMO_DATA.experiences);
          }
          if (parsed.education && parsed.education.length > 0) {
            setEducation(parsed.education);
          } else {
            setEducation(DEMO_DATA.education);
          }
          if (parsed.projects && parsed.projects.length > 0) {
            setProjects(parsed.projects);
          } else {
            setProjects(DEMO_DATA.projects);
          }
          if (parsed.skills && parsed.skills.length > 0) {
            setSkills(parsed.skills);
          } else {
            setSkills(DEMO_DATA.skills);
          }
          if (templateFromUrl) {
            setSelectedTemplate(templateFromUrl);
          } else if (parsed.selectedTemplate) {
            setSelectedTemplate(parsed.selectedTemplate);
          }
          setLastSavedTime('Loaded from Local Storage');
          loadedFromLocal = true;
        }
      } catch (e) {
        console.error('Error loading resume from local storage:', e);
      }
    }

    // If not loaded from local storage, fetch from server API
    if (!loadedFromLocal) {
      fetch(`/api/resumes/${resumeId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.resume?.template) {
            setSelectedTemplate(data.resume.template as TemplateId);
          }
          if (data.resume?.sections) {
            const pi = data.resume.sections.find((s: any) => s.sectionType === 'personal_info');
            const exp = data.resume.sections.find((s: any) => s.sectionType === 'experience');
            const edu = data.resume.sections.find((s: any) => s.sectionType === 'education');
            const proj = data.resume.sections.find((s: any) => s.sectionType === 'projects');
            const sk = data.resume.sections.find((s: any) => s.sectionType === 'skills');

            if (pi) {
              try {
                const parsed = typeof pi.content === 'string' ? JSON.parse(pi.content) : pi.content;
                if (parsed.fullName) setPersonalInfo(parsed);
              } catch {}
            }
            if (exp) {
              try {
                const parsed = typeof exp.content === 'string' ? JSON.parse(exp.content) : exp.content;
                if (Array.isArray(parsed) && parsed.length > 0) setExperiences(parsed);
              } catch {}
            }
            if (edu) {
              try {
                const parsed = typeof edu.content === 'string' ? JSON.parse(edu.content) : edu.content;
                if (Array.isArray(parsed) && parsed.length > 0) setEducation(parsed);
              } catch {}
            }
            if (proj) {
              try {
                const parsed = typeof proj.content === 'string' ? JSON.parse(proj.content) : proj.content;
                if (Array.isArray(parsed) && parsed.length > 0) setProjects(parsed);
              } catch {}
            }
            if (sk) {
              try {
                const parsed = typeof sk.content === 'string' ? JSON.parse(sk.content) : sk.content;
                if (Array.isArray(parsed) && parsed.length > 0) setSkills(parsed);
              } catch {}
            }
            setLastSavedTime('Loaded from Profile');
          }
        })
        .catch((err) => console.error('Builder resume fetch error:', err));
    }
  }, [resumeId]);

  // 2. Auto-save to Browser Local Storage on edits
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const timer = setTimeout(() => {
        try {
          const payload = {
            personalInfo,
            experiences,
            education,
            projects,
            skills,
            selectedTemplate,
            updatedAt: new Date().toISOString(),
          };
          localStorage.setItem('callback_ai_saved_resume_' + resumeId, JSON.stringify(payload));
          setLastSavedTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
        } catch (e) {
          console.error('Error saving to local storage:', e);
        }
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [personalInfo, experiences, education, projects, skills, selectedTemplate, resumeId]);

  const sectionsList = [
    { id: 'personal_info', title: 'Personal Information', icon: User },
    { id: 'experience', title: 'Work Experience', icon: Briefcase, count: experiences.length },
    { id: 'projects', title: 'Projects & Work', icon: FolderGit2, count: projects.length },
    { id: 'education', title: 'Education', icon: GraduationCap, count: education.length },
    { id: 'skills', title: 'Skills & Tech Stack', icon: Wrench, count: skills.length },
  ];

  const sectionIds = sectionsList.map((s) => s.id);
  const currentSectionIdx = sectionIds.indexOf(activeSection);
  const handleNextSection = () => {
    const nextIdx = (currentSectionIdx + 1) % sectionIds.length;
    setActiveSection(sectionIds[nextIdx]);
  };
  const handlePrevSection = () => {
    const prevIdx = (currentSectionIdx - 1 + sectionIds.length) % sectionIds.length;
    setActiveSection(sectionIds[prevIdx]);
  };

  const handleClearData = () => {
    setPersonalInfo(EMPTY_DATA.personalInfo);
    setExperiences([]);
    setEducation([]);
    setProjects([]);
    setSkills([]);
  };

  const handleLoadDemo = () => {
    setPersonalInfo(DEMO_DATA.personalInfo);
    setExperiences(DEMO_DATA.experiences);
    setEducation(DEMO_DATA.education);
    setProjects(DEMO_DATA.projects);
    setSkills(DEMO_DATA.skills);
  };

  const handleAddSkill = () => {
    if (!newSkillInput.trim()) return;
    setSkills([...skills, newSkillInput.trim()]);
    setNewSkillInput('');
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter((s) => s !== skillToRemove));
  };

  // Inline AI Bullet Enhancer
  const handleEnhanceBullet = async (sectionType: 'experience' | 'projects', itemIdx: number, bulletIdx: number, originalText: string) => {
    setIsEnhancing(`${sectionType}-${itemIdx}-${bulletIdx}`);
    try {
      const res = await fetch('/api/ai/enhance-bullet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ originalBullet: originalText }),
      });
      const data = await res.json();
      if (data.enhancedBullet) {
        if (sectionType === 'experience') {
          setExperiences((prev) => {
            const updated = [...prev];
            if (updated[itemIdx]) {
              const bullets = [...updated[itemIdx].bullets];
              bullets[bulletIdx] = data.enhancedBullet;
              updated[itemIdx] = { ...updated[itemIdx], bullets };
            }
            return updated;
          });
        } else {
          setProjects((prev) => {
            const updated = [...prev];
            if (updated[itemIdx]) {
              const bullets = [...updated[itemIdx].bullets];
              bullets[bulletIdx] = data.enhancedBullet;
              updated[itemIdx] = { ...updated[itemIdx], bullets };
            }
            return updated;
          });
        }
      }
    } catch (err) {
      console.error('Enhance failed:', err);
    } finally {
      setIsEnhancing(null);
    }
  };

  const handleDownloadLocalFile = (format: 'html' | 'txt' | 'json' = 'html') => {
    if (!isSignedIn) {
      setAuthModalTitle('Save & Download');
      setAuthModalSubtitle('Sign in or create a free account to download.');
      setPendingAction(() => () => handleDownloadLocalFile(format));
      setIsAuthModalOpen(true);
      return;
    }

    try {
      const candidateNameClean = personalInfo.fullName ? personalInfo.fullName.replace(/\s+/g, '_') : 'Resume';
      let fileContent = '';
      let mimeType = 'text/html;charset=utf-8';
      let extension = 'html';

      if (format === 'json') {
        fileContent = JSON.stringify(resumeData, null, 2);
        mimeType = 'application/json;charset=utf-8';
        extension = 'json';
      } else if (format === 'txt') {
        fileContent = `${personalInfo.fullName || 'Candidate Name'}
${[personalInfo.email, personalInfo.phone, personalInfo.location, personalInfo.linkedin, personalInfo.github].filter(Boolean).join(' | ')}

SUMMARY:
${personalInfo.summary || ''}

WORK EXPERIENCE:
${experiences.map(e => `${e.role} at ${e.company} (${e.startDate} - ${e.endDate})\n${e.location}\n` + e.bullets.map(b => `  • ${b}`).join('\n')).join('\n\n')}

EDUCATION:
${education.map(ed => `${ed.degree} - ${ed.institution} (${ed.startDate} - ${ed.endDate}) ${ed.gpa ? `[GPA: ${ed.gpa}]` : ''}`).join('\n')}

PROJECTS:
${projects.map(p => `${p.title} (${p.techStack})\n` + p.bullets.map(b => `  • ${b}`).join('\n')).join('\n\n')}

SKILLS:
${skills.join(', ')}
`;
        mimeType = 'text/plain;charset=utf-8';
        extension = 'txt';
      } else {
        fileContent = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${personalInfo.fullName || 'Resume'} — Callback Export</title>
  <style>
    body { font-family: 'Helvetica Neue', Arial, sans-serif; margin: 40px; color: #111827; line-height: 1.6; }
    h1 { font-size: 26px; margin-bottom: 4px; color: #111827; text-transform: uppercase; }
    .contact { font-size: 13px; color: #4B5563; margin-bottom: 20px; border-bottom: 2px solid #111827; padding-bottom: 8px; }
    .section-title { font-size: 14px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; color: #111827; border-bottom: 1px solid #D1D5DB; margin-top: 20px; margin-bottom: 10px; padding-bottom: 4px; }
    .item-header { display: flex; justify-content: space-between; font-weight: bold; font-size: 14px; }
    .item-sub { font-style: italic; font-size: 13px; color: #4B5563; margin-bottom: 6px; }
    ul { margin-top: 4px; padding-left: 20px; font-size: 13px; }
    li { margin-bottom: 4px; }
    .skills-list { font-size: 13px; }
  </style>
</head>
<body>
  <h1>${personalInfo.fullName || 'Candidate Name'}</h1>
  <div class="contact">
    ${[personalInfo.email, personalInfo.phone, personalInfo.location, personalInfo.linkedin, personalInfo.github].filter(Boolean).join(' | ')}
  </div>
  ${personalInfo.summary ? `
    <div class="section-title">Professional Summary</div>
    <p style="font-size: 13px;">${personalInfo.summary}</p>
  ` : ''}
  ${experiences.length > 0 ? `
    <div class="section-title">Work Experience</div>
    ${experiences.map(e => `
      <div style="margin-bottom: 14px;">
        <div class="item-header"><span>${e.role} — ${e.company}</span><span>${e.startDate} – ${e.endDate}</span></div>
        <div class="item-sub">${e.location}</div>
        <ul>${e.bullets.map(b => `<li>${b}</li>`).join('')}</ul>
      </div>
    `).join('')}
  ` : ''}
  ${education.length > 0 ? `
    <div class="section-title">Education</div>
    ${education.map(ed => `
      <div style="margin-bottom: 10px;">
        <div class="item-header"><span>${ed.degree} — ${ed.institution}</span><span>${ed.startDate} – ${ed.endDate}</span></div>
        <div class="item-sub">${ed.location} ${ed.gpa ? `| GPA: ${ed.gpa}` : ''}</div>
      </div>
    `).join('')}
  ` : ''}
  ${projects.length > 0 ? `
    <div class="section-title">Projects</div>
    ${projects.map(p => `
      <div style="margin-bottom: 10px;">
        <div class="item-header"><span>${p.title}</span><span>${p.techStack}</span></div>
        <ul>${p.bullets.map(b => `<li>${b}</li>`).join('')}</ul>
      </div>
    `).join('')}
  ` : ''}
  ${skills.length > 0 ? `
    <div class="section-title">Skills & Technologies</div>
    <div class="skills-list">${skills.join(' • ')}</div>
  ` : ''}
</body>
</html>`;
      }

      const fileName = `${candidateNameClean}_Resume.${extension}`;
      const blob = new Blob([fileContent], { type: mimeType });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Download local file error:', err);
    }
  };

  const handleFinishResume = () => {
    // 1. Force save to Local Storage & Global Client Resume Store
    const candidateNameClean = personalInfo.fullName ? personalInfo.fullName.replace(/\s+/g, ' ') : 'Candidate';
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(
          'callback_ai_saved_resume_' + resumeId,
          JSON.stringify({
            personalInfo,
            experiences,
            education,
            projects,
            skills,
            activeSection,
            selectedTemplate,
            zoomLevel,
            savedAt: new Date().toISOString(),
          })
        );
        localStorage.setItem('has_onboarded', 'true');
        localStorage.setItem('active_resume_id', resumeId);
        saveResumeToStore({
          id: resumeId,
          title: `${candidateNameClean}'s Resume`,
          candidateName: personalInfo.fullName || 'Candidate',
          candidateTitle: experiences[0]?.role || 'Software Engineer',
          candidateEmail: personalInfo.email || '',
          candidatePhone: personalInfo.phone || '',
          candidateLocation: personalInfo.location || '',
          atsScore: 96,
          trustScore: 98,
          updatedAt: 'Just now',
          isActive: true,
          template: selectedTemplate,
          parsedSections: {
            personalInfo,
            experience: experiences,
            education,
            projects,
            skills,
          },
        });
        window.dispatchEvent(new Event('active_resume_changed'));
        setLastSavedTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      } catch (e) {
        console.error('Failed to save resume locally:', e);
      }
    }

    if (!isUserAuthenticated) {
      setAuthModalTitle('Save Your Resume');
      setAuthModalSubtitle('Sign in or create a free account to continue.');
      setPendingAction(() => () => {
        setDownloadSuccessMsg('Resume linked to your account! Navigating to Dashboard...');
        setTimeout(() => {
          router.push('/dashboard');
        }, 1200);
      });
      setIsAuthModalOpen(true);
      return;
    }

    setDownloadSuccessMsg('Resume saved successfully! Navigating to Dashboard...');
    setTimeout(() => {
      router.push('/dashboard');
    }, 1000);
  };

  const [previewModalZoom, setPreviewModalZoom] = useState<number | 'fit'>('fit');

  const handleOpenExportPreview = () => {
    setIsExportPreviewModalOpen(true);
  };

  const handleExportPDF = async () => {
    if (!isUserAuthenticated) {
      setAuthModalTitle('Save & Download');
      setAuthModalSubtitle('Sign in or create a free account to download.');
      setPendingAction(() => () => handleExportPDF());
      setIsAuthModalOpen(true);
      return;
    }

    setIsExportingPDF(true);
    setDownloadSuccessMsg(null);

    const cleanName = personalInfo.fullName
      ? personalInfo.fullName.replace(/[^a-zA-Z0-9_\s-]/g, '').trim().replace(/\s+/g, '_')
      : 'Candidate';
    const fileName = `${cleanName}_Resume_ATS.pdf`;

    // 1. Force save to Local Storage immediately
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(
          'callback_ai_saved_resume_' + resumeId,
          JSON.stringify({
            personalInfo,
            experiences,
            education,
            projects,
            skills,
            selectedTemplate,
            updatedAt: new Date().toISOString(),
          })
        );
        setLastSavedTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      } catch (e) {
        console.error('Failed to save to local storage:', e);
      }
    }

    const printElement = document.getElementById('resume-print-sheet');
    if (!printElement) {
      window.print();
      setIsExportingPDF(false);
      return;
    }

    // 2. Try High-Fidelity Server-Side PDF Export (Puppeteer A4 Vector)
    try {
      const res = await fetch('/api/export-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          html: printElement.outerHTML,
          title: cleanName,
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

        setDownloadSuccessMsg(`✓ Successfully downloaded ${fileName} to your device!`);
        setTimeout(() => setDownloadSuccessMsg(null), 5000);
        setIsExportingPDF(false);
        return;
      }
    } catch (serverErr) {
      console.warn('Server PDF generation failed, falling back to client-side canvas:', serverErr);
    }

    // 3. Client-Side jsPDF Fallback
    try {
      const originalTransform = printElement.style.transform;
      printElement.style.transform = 'none';

      const canvas = await html2canvas(printElement, {
        scale: 2.2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        windowWidth: printElement.scrollWidth,
        windowHeight: printElement.scrollHeight,
      });

      printElement.style.transform = originalTransform;

      const imgData = canvas.toDataURL('image/jpeg', 0.98);
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        compress: true,
      });

      const pdfWidth = 210;
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, Math.min(pdfHeight, 297));
      
      pdf.save(fileName);

      setDownloadSuccessMsg(`✓ Successfully downloaded ${fileName} to your device!`);
      setTimeout(() => setDownloadSuccessMsg(null), 5000);
    } catch (err) {
      console.warn('Direct PDF export canvas failed, fallback to native browser print:', err);
      const originalTitle = document.title;
      document.title = `${cleanName}_Resume_ATS`;
      window.print();
      setTimeout(() => {
        document.title = originalTitle;
      }, 1000);
    } finally {
      setIsExportingPDF(false);
    }
  };

  // Automatically trigger PDF export after returning from sign-in with ?auto_download=true
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('auto_download') === 'true' && isSignedIn) {
        handleExportPDF();
        window.history.replaceState({}, '', window.location.pathname);
      }
    }
  }, [isSignedIn]);

  const resumeData: ResumeData = {
    personalInfo,
    experiences,
    education,
    projects,
    skills,
  };

  const templatesGallery = [
    // =========================================================================
    // TOP: Former Bottom Templates Moved to the Top (Unique Items 1-4)
    // =========================================================================
    {
      id: 'split_duo',
      name: 'Balanced Symmetrical Duo',
      tag: 'FULL STACK',
      category: 'Tech & AI',
      ats: '99% ATS',
      desc: 'Clean cobalt blue accents with structured balance between engineering history and technical skills.',
      previewImg: '/images/templates/template-1.png',
    },
    {
      id: 'prestige_gold',
      name: 'Executive VP & Chief Officer Gold',
      tag: 'C-SUITE EXEC',
      category: 'Executive & Finance',
      ats: '98% ATS',
      desc: 'Dark obsidian top banner with refined warm gold accents for executive and boardroom candidates.',
      previewImg: '/images/templates/template-2.png',
    },
    {
      id: 'ai_ml_lead',
      name: 'PyTorch ML & Autonomous Swarms',
      tag: 'AI / LLM LEAD',
      category: 'Tech & AI',
      ats: '99% ATS',
      desc: 'Advanced machine learning systems with distributed training throughput metrics and model benchmarking.',
      previewImg: '/images/templates/template-3.png',
    },
    {
      id: 'graphite_compact',
      name: 'Dense 1-Page High-Density',
      tag: '10+ YRS EXP',
      category: 'Executive & Finance',
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
      tag: 'FINANCE / CPA',
      category: 'Executive & Finance',
      ats: '99% ATS',
      desc: 'Classic centered serif header with horizontal rules and maximum corporate parser compatibility.',
      previewImg: '/images/templates/enhancv-extra-1.png',
    },
    {
      id: 'global_director_ops',
      name: 'Isaac Hall — Global Director',
      tag: 'BOARD & ADVISOR',
      category: 'Executive & Finance',
      ats: '98% ATS',
      desc: 'Refined serif typography with right-aligned tabular numerals and leadership highlights.',
      previewImg: '/images/templates/enhancv-extra-2.png',
    },
    {
      id: 'backend_distributed_arch',
      name: 'Elise Carter — Backend & ML',
      tag: 'TECH ARCHITECT',
      category: 'Tech & AI',
      ats: '99% ATS',
      desc: 'Monospace terminal section tags, visual skills matrix chart, and dense metrics formatting.',
      previewImg: '/images/templates/enhancv-extra-3.png',
    },
    {
      id: 'vp_product_strategy',
      name: 'Carrie Jones — Product Lead',
      tag: 'PRODUCT LEAD',
      category: 'Product & Design',
      ats: '97% ATS',
      desc: 'Nordic emerald headers, clean divider borders, and categorized domain competencies.',
      previewImg: '/images/templates/enhancv-extra-4.png',
    },
    {
      id: 'strategic_sourcing_ops',
      name: 'Maeve Delaney — Strategic Sourcing',
      tag: 'GLOBAL OPS',
      category: 'Executive & Finance',
      ats: '97% ATS',
      desc: 'Deep dark slate console styling with bright emerald syntax highlights and terminal tags.',
      previewImg: '/images/templates/enhancv-extra-5.png',
    },
    {
      id: 'growth_marketing_dir',
      name: 'Ellen Johnson — Growth Marketing',
      tag: 'GTM / MARKETING',
      category: 'Startups & YC',
      ats: '98% ATS',
      desc: 'Sky blue accent geometry with structured infrastructure competencies and cloud metrics.',
      previewImg: '/images/templates/enhancv-extra-6.png',
    },
    {
      id: 'data_science_ml_lead',
      name: 'Grace Jackson — Data Scientist',
      tag: 'DATA / ML',
      category: 'Tech & AI',
      ats: '99% ATS',
      desc: 'Copper orange accent borders with dense monospace code tags and performance metrics.',
      previewImg: '/images/templates/enhancv-extra-7.png',
    },
    {
      id: 'enterprise_bizdev',
      name: 'Austin Adams — Business Dev Lead',
      tag: 'ENTERPRISE B2B',
      category: 'Executive & Finance',
      ats: '98% ATS',
      desc: 'Scholarly preprint typography with abstract summary box and partnership pedigree.',
      previewImg: '/images/templates/enhancv-extra-8.png',
    },
    {
      id: 'staff_ml_systems',
      name: 'David Miller — Staff ML Engineer',
      tag: 'AI / SYSTEMS',
      category: 'Tech & AI',
      ats: '99% ATS',
      desc: 'Warm amber section dividers and structured dual-column matrix for AI researchers.',
      previewImg: '/images/templates/enhancv-extra-9.png',
    },
    {
      id: 'startup_founder_pitch',
      name: 'Elena Rostova — VP of Marketing',
      tag: 'YC FOUNDER',
      category: 'Startups & YC',
      ats: '98% ATS',
      desc: 'Punchy orange accents, prominent fundraising and traction milestones, and high-signal metrics.',
      previewImg: '/images/templates/enhancv-extra-10.png',
    },
    {
      id: 'cloud_infra_sre',
      name: 'Marcus Vance — Cloud Architect',
      tag: 'CLOUD / SRE',
      category: 'Tech & AI',
      ats: '99% ATS',
      desc: 'Crisp AWS/GCP infrastructure certifications and production SLA metrics formatting.',
      previewImg: '/images/templates/enhancv-extra-11.png',
    },
    {
      id: 'biotech_pharma_lead',
      name: 'Sophia Chen — Biotech Director',
      tag: 'BIOTECH / CLINICAL',
      category: 'Executive & Finance',
      ats: '98% ATS',
      desc: 'Indigo top banner with translational medicine milestones, patent portfolio filings, and FDA progression.',
      previewImg: '/images/templates/enhancv-extra-12.png',
    },
    {
      id: 'cybersecurity_soc2',
      name: 'Liam O’Connor — Cybersecurity Lead',
      tag: 'SECURITY / SOC-2',
      category: 'Tech & AI',
      ats: '99% ATS',
      desc: 'Electric indigo divider lines with zero-trust architecture, audit compliance, and response SLAs.',
      previewImg: '/images/templates/enhancv-extra-13.png',
    },
    {
      id: 'head_of_ux_design',
      name: 'Rachel Green — Head of UX & Design',
      tag: 'DESIGN SYSTEMS',
      category: 'Product & Design',
      ats: '98% ATS',
      desc: 'Sophisticated typography with portfolio prominence and design system governance.',
      previewImg: '/images/templates/enhancv-extra-14.png',
    },
    {
      id: 'quant_research_fund',
      name: 'Alexander Wright — Quant Research',
      tag: 'QUANT / HEDGE FUND',
      category: 'Executive & Finance',
      ats: '99% ATS',
      desc: 'Deep burgundy executive headers, pedigree split, and high-impact accomplishment bullets.',
      previewImg: '/images/templates/enhancv-extra-15.png',
    },
    {
      id: 'corporate_counsel_lead',
      name: 'Claire Dupont — Corporate Counsel',
      tag: 'LEGAL & STRATEGY',
      category: 'Executive & Finance',
      ats: '99% ATS',
      desc: 'Rigorous single-column case structure with quantitative business impacts and C-suite advisory.',
      previewImg: '/images/templates/enhancv-extra-16.png',
    },
    {
      id: 'swiss_bauhaus_grid',
      name: 'Helvetica Swiss Bauhaus Grid',
      tag: 'SWISS DESIGN',
      category: 'Product & Design',
      ats: '98% ATS',
      desc: 'Ultra-clean black & red geometric alignment inspired by international typographic style.',
      previewImg: '/images/templates/enhancv-1.png',
    },
    {
      id: 'oxford_academic_fellow',
      name: 'Cambridge & Oxford Fellow',
      tag: 'ACADEMIC / R&D',
      category: 'Academic & Strategy',
      ats: '99% ATS',
      desc: 'Timeless scholarly typography with honorable distinctions, credentials, and fellowships.',
      previewImg: '/images/templates/enhancv-2.png',
    },
    {
      id: 'tokyo_zen_minimal',
      name: 'Tokyo Minimalist Zen',
      tag: 'MINIMALIST',
      category: 'Product & Design',
      ats: '98% ATS',
      desc: 'Subtle hairline dividers, generous white space balance, and muted charcoal hierarchy.',
      previewImg: '/images/templates/enhancv-3.png',
    },
    {
      id: 'scandinavian_frost',
      name: 'Scandinavian Frost Clean',
      tag: 'NORDIC TECH',
      category: 'Tech & AI',
      ats: '97% ATS',
      desc: 'Frost blue accents with clean border dividers and functional human-centric layout.',
      previewImg: '/images/templates/enhancv-4.png',
    },
    {
      id: 'neo_brutalist_tech',
      name: 'Neo-Brutalist Engineering',
      tag: 'CREATIVE TECH',
      category: 'Product & Design',
      ats: '95% ATS',
      desc: 'Bold black border boxes with punchy drop shadows and high-contrast yellow headers.',
      previewImg: '/images/templates/enhancv-5.png',
    },
    {
      id: 'coral_sunset_product',
      name: 'Coral Sunset Product Designer',
      tag: 'DESIGN LEAD',
      category: 'Product & Design',
      ats: '96% ATS',
      desc: 'Warm rose coral accents with modern card backdrops and design system highlights.',
      previewImg: '/images/templates/enhancv-6.png',
    },
    {
      id: 'deep_teal_biotech',
      name: 'Deep Teal Biotech & Hardware',
      tag: 'BIO / HARDWARE',
      category: 'Tech & AI',
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
      tag: 'FORTUNE 500',
      category: 'Executive & Finance',
      ats: '99% ATS',
      desc: 'Clean two-column split with tabular dates, categorized skills, and verified achievements grid.',
      previewImg: '/images/templates/tpl-1.png',
    },
    {
      id: 'modern_executive',
      name: 'Agile Tech Architect',
      tag: 'STARTUP CTO',
      category: 'Startups & YC',
      ats: '98% ATS',
      desc: 'Warm terracotta accent border, executive summary backdrop, and structured leadership cards.',
      previewImg: '/images/templates/tpl-2.png',
    },
    {
      id: 'navy_sidebar',
      name: 'ATS Match Check Standard',
      tag: 'STAFF / PRINCIPAL',
      category: 'Tech & AI',
      ats: '99% ATS',
      desc: 'Deep slate navy headers, high-contrast subheadings, and dense system engineering layout.',
      previewImg: '/images/templates/tpl-3.png',
    },
    {
      id: 'navy_header',
      name: 'Product & Project Leader',
      tag: 'ENTERPRISE LEAD',
      category: 'Product & Design',
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

  return (
    <div className="h-screen flex flex-col bg-[#ECEEF2] overflow-hidden select-none">
      {/* Top Builder Toolbar (Desktop only - mobile uses unified top app bar) */}
      <header className="hidden md:flex h-14 sm:h-16 bg-white/95 backdrop-blur-xl border-b border-slate-200/90 px-3 sm:px-6 items-center justify-between shrink-0 no-print shadow-xs relative z-20">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-2 mr-1 sm:mr-2">
            <div className="w-8 h-8 rounded-full bg-[#1C152E] text-white flex items-center justify-center shadow-xs shrink-0">
              <FileText className="w-4 h-4" />
            </div>
            <div className="flex flex-col hidden sm:flex">
              <span className="font-black text-xs text-slate-900 leading-tight truncate max-w-[140px] md:max-w-none">
                {personalInfo.fullName ? `${personalInfo.fullName}` : 'New Resume'}
              </span>
              <span className="text-[10px] font-bold text-slate-400">
                {isMobileSimulator || isMobileScreen ? 'Mobile Optimized' : '3-Zone Studio'}
              </span>
            </div>
          </div>

          <div className="h-6 w-px bg-slate-200 hidden md:block" />

          {/* Templates Button */}
          <button
            type="button"
            onClick={() => setIsTemplateModalOpen(true)}
            className="px-3 sm:px-4 py-2 bg-white hover:bg-slate-50 border border-slate-200/90 hover:border-[#1C152E] text-slate-800 hover:text-[#1C152E] text-xs font-bold rounded-full shadow-2xs hover:shadow-xs flex items-center gap-1.5 sm:gap-2 transition-all cursor-pointer group"
            title="Choose from 40+ ATS-ready executive templates"
          >
            <Layout className="w-3.5 h-3.5 text-[#FF4B5E] group-hover:scale-110 transition-transform" />
            <span className="hidden xs:inline">Templates</span>
            <span className="px-2 py-0.5 bg-[#FFF0F3] text-[9.5px] font-bold text-[#FF4B5E] border border-[#FFCCD5] rounded-full transition-colors capitalize truncate max-w-[80px] sm:max-w-none">
              {selectedTemplate.replace(/_/g, ' ')}
            </span>
          </button>

          {/* Mobile Simulator Toggle Button (Desktop & Tablet) */}
          <button
            type="button"
            onClick={() => {
              setIsMobileSimulator(!isMobileSimulator);
              if (!isMobileSimulator) setMobileTab('form');
            }}
            className={`px-3 sm:px-4 py-2 border text-xs font-bold rounded-full shadow-2xs flex items-center gap-1.5 transition-all cursor-pointer ${
              isMobileSimulator
                ? 'bg-[#1C152E] text-white border-[#1C152E] ring-2 ring-[#1C152E]/20 shadow-xs'
                : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700 hover:text-[#1C152E]'
            }`}
            title={isMobileSimulator ? 'Return to Desktop 3-Zone View' : 'Toggle Smartphone Simulator View'}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="hidden md:inline">{isMobileSimulator ? 'Desktop Mode' : 'Mobile Simulator'}</span>
          </button>

          {/* Start Fresh Button */}
          <button
            type="button"
            onClick={handleClearData}
            className="hidden lg:flex px-3 py-1.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-600 hover:text-slate-900 text-xs font-bold rounded-xl shadow-2xs items-center gap-1.5 transition-all cursor-pointer"
            title="Clear all fields to start completely fresh"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
            <span>Start Fresh</span>
          </button>

          {/* Load Demo Data Button */}
          {!isDemoResume && (
            <button
              type="button"
              onClick={handleLoadDemo}
              className="hidden xl:flex px-3 py-1.5 bg-indigo-50/80 hover:bg-indigo-100/80 border border-indigo-200/80 text-indigo-700 text-xs font-bold rounded-xl shadow-2xs items-center gap-1.5 transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>Demo</span>
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Local Storage Auto-Save Live Badge */}
          <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 bg-emerald-50/90 border border-emerald-200/80 rounded-full text-[10.5px] font-extrabold text-emerald-800 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Auto-saved locally</span>
          </div>

          {/* Precision Zoom Controls (Desktop only) */}
          <div className="hidden md:flex items-center gap-1 bg-white border border-slate-200/90 rounded-xl p-1 shadow-2xs">
            <button
              onClick={() => setZoomLevel((z) => Math.max(70, z - 10))}
              className="w-6 h-6 flex items-center justify-center hover:bg-slate-100 rounded-lg text-slate-600 transition-colors cursor-pointer"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="text-[11px] font-black text-slate-800 px-1.5 min-w-[38px] text-center font-mono">
              {zoomLevel}%
            </span>
            <button
              onClick={() => setZoomLevel((z) => Math.min(130, z + 10))}
              className="w-6 h-6 flex items-center justify-center hover:bg-slate-100 rounded-lg text-slate-600 transition-colors cursor-pointer"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Save .JSON Button */}
          <button
            type="button"
            onClick={() => handleDownloadLocalFile('json')}
            className="hidden sm:flex h-10 px-4 bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 text-slate-700 text-xs font-semibold rounded-full shadow-2xs items-center gap-2 transition-all cursor-pointer"
            title="Save raw JSON resume file to your device"
          >
            <Save className="w-3.5 h-3.5 text-slate-500" />
            <span className="hidden md:inline">Save .JSON</span>
          </button>

          {/* Preview & Export PDF Flagship Button */}
          <button
            type="button"
            onClick={handleOpenExportPreview}
            className="h-10 px-4 sm:px-5 bg-[#1c152e] hover:bg-[#2b1f45] active:scale-[0.98] text-white font-bold text-xs rounded-full shadow-sm hover:shadow flex items-center gap-2 transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-white" />
            <span><span className="hidden sm:inline">Preview & </span>Export PDF</span>
          </button>

          {/* Finish & Save Resume Flagship Button */}
          <button
            type="button"
            onClick={handleFinishResume}
            className="h-10 px-4 sm:px-5 bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white font-bold text-xs rounded-full shadow-sm hover:shadow flex items-center gap-2 transition-all cursor-pointer"
            title="Complete your resume and save it to your candidate account"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-white" />
            <span>Finish & Save</span>
          </button>
        </div>
      </header>

      {/* Floating Download Success Toast */}
      {downloadSuccessMsg && (
        <div className="fixed top-20 right-8 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-2xl border border-teal-500/40 flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-300">
          <CheckCircle2 className="w-5 h-5 text-teal-400 shrink-0" />
          <div className="flex flex-col">
            <span className="text-xs font-bold">{downloadSuccessMsg}</span>
            <span className="text-[10px] text-slate-300">File is saved in your device Downloads folder & Local Storage</span>
          </div>
          <button onClick={() => setDownloadSuccessMsg(null)} className="ml-2 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer" aria-label="Close notification"><X className="w-3.5 h-3.5" /></button>
        </div>
      )}

      {/* Helper Render Functions */}
      {(() => null)()}

      {/* Main Studio Area (Desktop 3-Zone vs Mobile Simulator) */}
      {(isMobileScreen || isMobileSimulator) ? (
        <div className="flex-1 flex overflow-hidden bg-slate-900/95 relative">
          {/* If desktop user simulating phone: Render interactive iPhone mockup */}
          {(!isMobileScreen && isMobileSimulator) ? (
            <div className="flex-1 flex flex-col items-center justify-start py-5 px-4 overflow-y-auto w-full">
              {/* Simulator Top Controls Ribbon */}
              <div className="w-full max-w-[420px] mb-3 flex items-center justify-between px-4 py-2 bg-slate-800/90 rounded-2xl border border-slate-700/80 text-white text-xs shadow-lg shrink-0">
                <div className="flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-cyan-400" />
                  <span className="font-extrabold tracking-wide">iPhone 15 Pro Simulator</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-slate-400 font-mono">390 × 844 px</span>
                  <button
                    onClick={() => setIsMobileSimulator(false)}
                    className="px-2.5 py-1 bg-slate-700 hover:bg-slate-600 rounded-lg text-[11px] font-bold transition-colors cursor-pointer"
                  >
                    Exit Simulator
                  </button>
                </div>
              </div>

              {/* iPhone 15 Pro Titanium Mockup Shell */}
              <div className="w-[390px] h-[810px] bg-slate-950 rounded-[52px] p-3 shadow-2xl border-4 border-slate-700/80 ring-1 ring-slate-600/50 relative flex flex-col shrink-0">
                {/* Dynamic Island */}
                <div className="absolute top-5 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-full z-40 flex items-center justify-end px-3 pointer-events-none">
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-800" />
                </div>

                {/* Simulated Phone Screen */}
                <div className="w-full h-full rounded-[42px] overflow-hidden bg-[#F5F9FB] flex flex-col relative pt-7">
                  {/* Minimal Segmented Tab Switcher */}
                  <div className="bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-3 py-2 flex items-center justify-between gap-2 shrink-0 z-20">
                    <div className="flex-1 flex items-center bg-slate-100 p-0.5 rounded-xl border border-slate-200/60">
                      <button
                        type="button"
                        onClick={() => setMobileTab('sections')}
                        className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                          mobileTab === 'sections' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
                        }`}
                      >
                        <Layers className="w-3.5 h-3.5" />
                        <span>Sections</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setMobileTab('form')}
                        className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                          mobileTab === 'form' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
                        }`}
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Editor</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setMobileTab('preview')}
                        className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                          mobileTab === 'preview' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
                        }`}
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Preview</span>
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={handleOpenExportPreview}
                      className="h-8 px-2.5 bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-700 text-xs font-semibold rounded-xl flex items-center gap-1 border border-slate-200/80 transition-all cursor-pointer shrink-0"
                      title="Export PDF"
                    >
                      <Download className="w-3.5 h-3.5 text-slate-600" />
                      <span>PDF</span>
                    </button>
                  </div>

                  {/* Body Container */}
                  <div className="flex-1 overflow-y-auto">
                    {mobileTab === 'sections' && (
                      <div className="p-4 flex flex-col gap-2.5 pb-12">
                        <div className="flex items-center justify-between mb-0.5 px-0.5">
                          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Sections</span>
                          <span className="text-[11px] text-[#10B981] font-medium">Tap to edit</span>
                        </div>
                        {sectionsList.map((sec) => {
                          const Icon = sec.icon;
                          const isActive = activeSection === sec.id;
                          return (
                            <button
                              key={sec.id}
                              onClick={() => {
                                setActiveSection(sec.id);
                                setMobileTab('form');
                              }}
                              className={`p-3 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                                isActive ? 'bg-emerald-50/50 border-[#10B981] ring-1 ring-[#10B981]/25' : 'bg-white border-slate-200/80 hover:border-slate-300'
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${isActive ? 'bg-[#10B981] text-white shadow-xs' : 'bg-slate-100 text-slate-600'}`}>
                                  <Icon className="w-4 h-4" />
                                </div>
                                <div className="flex flex-col">
                                  <span className="text-xs font-semibold text-slate-900">{sec.title}</span>
                                  <span className="text-[10.5px] text-slate-500">
                                    {sec.id === 'personal_info' ? (personalInfo.fullName || 'Tap to fill details') : `${sec.count || 0} entries added`}
                                  </span>
                                </div>
                              </div>
                              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                            </button>
                          );
                        })}
                      </div>
                    )}

                    {mobileTab === 'form' && (
                      <div className="p-4">
                        <ResumeSectionEditor
                          activeSection={activeSection}
                          sectionTitle={sectionsList.find((s) => s.id === activeSection)?.title}
                          personalInfo={personalInfo}
                          setPersonalInfo={setPersonalInfo}
                          experiences={experiences}
                          setExperiences={setExperiences}
                          projects={projects}
                          setProjects={setProjects}
                          education={education}
                          setEducation={setEducation}
                          skills={skills}
                          setSkills={setSkills}
                          newSkillInput={newSkillInput}
                          setNewSkillInput={setNewSkillInput}
                          handleAddSkill={handleAddSkill}
                          handleRemoveSkill={handleRemoveSkill}
                          handleEnhanceBullet={handleEnhanceBullet}
                          isEnhancing={isEnhancing}
                          isMobileView={true}
                          handlePrevSection={handlePrevSection}
                          handleNextSection={handleNextSection}
                          onFinishResume={handleFinishResume}
                          onPreviewClick={() => setMobileTab('preview')}
                        />
                      </div>
                    )}

                    {/* Preview Tab (Always mounted in DOM so PDF capture works seamlessly from any tab) */}
                    <div className={mobileTab === 'preview' ? 'flex flex-col h-full pb-20' : 'fixed -left-[9999px] top-0 pointer-events-none opacity-0 -z-50'}>
                      {/* Templates ribbon */}
                      <div className="bg-white border-b border-slate-200 px-3 py-1.5 flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0">
                        <span className="text-[10px] font-bold text-slate-400 shrink-0">Template:</span>
                        {[
                          { id: 'split_duo', label: 'Balanced Duo' },
                          { id: 'prestige_gold', label: 'Prestige Gold' },
                          { id: 'ai_ml_lead', label: 'AI/ML Lead' },
                          { id: 'graphite_compact', label: '1-Page Compact' },
                          { id: 'classic_ats', label: 'Classic ATS' },
                          { id: 'navy_sidebar', label: 'Navy Split' },
                        ].map((tpl) => (
                          <button
                            key={tpl.id}
                            onClick={() => setSelectedTemplate(tpl.id as TemplateId)}
                            className={`px-2.5 py-1 text-[10.5px] font-bold rounded-full shrink-0 cursor-pointer ${
                              selectedTemplate === tpl.id ? 'bg-[#1C152E] text-white' : 'bg-slate-100 text-slate-700'
                            }`}
                          >
                            {tpl.label}
                          </button>
                        ))}
                        <button
                          onClick={() => setIsTemplateModalOpen(true)}
                          className="px-2.5 py-1 text-[10.5px] font-bold text-[#FF4B5E] bg-[#FFF0F3] border border-[#FFCCD5] rounded-full shrink-0"
                        >
                          More ▾
                        </button>
                      </div>

                      {/* Scale controls */}
                      <div className="px-3 py-1 bg-slate-100 border-b border-slate-200 flex items-center justify-between text-xs shrink-0">
                        <span className="text-[10.5px] font-bold text-slate-500">A4 Printable Sheet</span>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => setMobilePreviewZoom('fit')}
                            className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${
                              mobilePreviewZoom === 'fit' ? 'bg-[#1C152E] text-white' : 'bg-white text-slate-700 border border-slate-200'
                            }`}
                          >
                            Fit Screen
                          </button>
                          <button
                            onClick={() => setMobilePreviewZoom('100')}
                            className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${
                              mobilePreviewZoom === '100' ? 'bg-[#1C152E] text-white' : 'bg-white text-slate-700 border border-slate-200'
                            }`}
                          >
                            100%
                          </button>
                        </div>
                      </div>

                      {/* Scaled Preview Canvas */}
                      <div className="flex-1 overflow-y-auto p-3 flex justify-center items-start">
                        <div
                          style={{
                            width: mobilePreviewZoom === 'fit' ? `${794 * 0.44}px` : '794px',
                            height: mobilePreviewZoom === 'fit' ? `${1123 * 0.44}px` : '1123px',
                            position: 'relative',
                            flexShrink: 0,
                          }}
                        >
                          <div
                            style={{
                              transform: mobilePreviewZoom === 'fit' ? 'scale(0.44)' : 'scale(1)',
                              transformOrigin: 'top left',
                              width: '794px',
                              position: 'absolute',
                              top: 0,
                              left: 0,
                            }}
                          >
                            <ResumeTemplateRenderer
                              templateId={selectedTemplate}
                              data={resumeData}
                              zoomLevel={100}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Native Real Mobile View (Fills smartphone display 100%) */
            <div className="flex-1 flex flex-col bg-[#F5F9FB] overflow-hidden select-none relative w-full h-full">
              {/* Minimal YC-Style Segmented Tab Switcher */}
              <div className="bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-3 py-2 flex items-center justify-between gap-2 shrink-0 z-20">
                <div className="flex-1 max-w-sm mx-auto flex items-center bg-slate-100 p-0.5 rounded-xl border border-slate-200/60">
                  <button
                    type="button"
                    onClick={() => setMobileTab('sections')}
                    className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      mobileTab === 'sections'
                        ? 'bg-white text-slate-900 shadow-xs'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>Sections</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setMobileTab('form')}
                    className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      mobileTab === 'form'
                        ? 'bg-white text-slate-900 shadow-xs'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Editor</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setMobileTab('preview')}
                    className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      mobileTab === 'preview'
                        ? 'bg-white text-slate-900 shadow-xs'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Preview</span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleOpenExportPreview}
                  className="h-8 px-2.5 bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-700 text-xs font-semibold rounded-xl flex items-center gap-1 border border-slate-200/80 transition-all cursor-pointer shrink-0"
                  title="Export PDF"
                >
                  <Download className="w-3.5 h-3.5 text-slate-600" />
                  <span>PDF</span>
                </button>
              </div>

              {/* Main Content Area */}
              <div className="flex-1 overflow-y-auto">
                {mobileTab === 'sections' && (
                  <div className="p-4 flex flex-col gap-2.5 pb-12">
                    <div className="flex items-center justify-between mb-0.5 px-0.5">
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Sections</span>
                      <span className="text-[11px] text-[#10B981] font-medium">Tap to edit</span>
                    </div>
                    {sectionsList.map((sec) => {
                      const Icon = sec.icon;
                      const isActive = activeSection === sec.id;
                      return (
                        <button
                          key={sec.id}
                          onClick={() => {
                            setActiveSection(sec.id);
                            setMobileTab('form');
                          }}
                          className={`p-3 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                            isActive ? 'bg-emerald-50/50 border-[#10B981] ring-1 ring-[#10B981]/25' : 'bg-white border-slate-200/80 hover:border-slate-300'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${isActive ? 'bg-[#10B981] text-white shadow-xs' : 'bg-slate-100 text-slate-600'}`}>
                              <Icon className="w-4 h-4" />
                            </div>
                            <div className="flex flex-col">
                              <span className="text-xs font-semibold text-slate-900">{sec.title}</span>
                              <span className="text-[10.5px] text-slate-500">
                                {sec.id === 'personal_info' ? (personalInfo.fullName || 'Tap to fill details') : `${sec.count || 0} entries added`}
                              </span>
                            </div>
                          </div>
                          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                        </button>
                      );
                    })}
                  </div>
                )}

                {mobileTab === 'form' && (
                  <div className="p-4">
                    <ResumeSectionEditor
                      activeSection={activeSection}
                      sectionTitle={sectionsList.find((s) => s.id === activeSection)?.title}
                      personalInfo={personalInfo}
                      setPersonalInfo={setPersonalInfo}
                      experiences={experiences}
                      setExperiences={setExperiences}
                      projects={projects}
                      setProjects={setProjects}
                      education={education}
                      setEducation={setEducation}
                      skills={skills}
                      setSkills={setSkills}
                      newSkillInput={newSkillInput}
                      setNewSkillInput={setNewSkillInput}
                      handleAddSkill={handleAddSkill}
                      handleRemoveSkill={handleRemoveSkill}
                      handleEnhanceBullet={handleEnhanceBullet}
                      isEnhancing={isEnhancing}
                      isMobileView={true}
                      handlePrevSection={handlePrevSection}
                      handleNextSection={handleNextSection}
                      onFinishResume={handleFinishResume}
                      onPreviewClick={() => setMobileTab('preview')}
                    />
                  </div>
                )}

                {/* Preview Tab (Always mounted in DOM so PDF capture works seamlessly from any tab) */}
                <div className={mobileTab === 'preview' ? 'flex flex-col h-full pb-24' : 'fixed -left-[9999px] top-0 pointer-events-none opacity-0 -z-50'}>
                  {/* Templates ribbon */}
                  <div className="bg-white border-b border-slate-200 px-3 py-2 flex items-center gap-2 overflow-x-auto no-scrollbar shrink-0">
                    <span className="text-[10px] font-bold text-slate-400 shrink-0">Template:</span>
                    {[
                      { id: 'split_duo', label: 'Balanced Duo' },
                      { id: 'prestige_gold', label: 'Prestige Gold' },
                      { id: 'ai_ml_lead', label: 'AI/ML Lead' },
                      { id: 'graphite_compact', label: '1-Page Compact' },
                      { id: 'classic_ats', label: 'Classic ATS' },
                      { id: 'navy_sidebar', label: 'Navy Split' },
                    ].map((tpl) => (
                      <button
                        key={tpl.id}
                        onClick={() => setSelectedTemplate(tpl.id as TemplateId)}
                        className={`px-3.5 py-1.5 text-xs font-bold rounded-full shrink-0 cursor-pointer ${
                          selectedTemplate === tpl.id ? 'bg-[#1C152E] text-white' : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {tpl.label}
                      </button>
                    ))}
                    <button
                      onClick={() => setIsTemplateModalOpen(true)}
                      className="px-3.5 py-1.5 text-xs font-bold text-[#FF4B5E] bg-[#FFF0F3] border border-[#FFCCD5] rounded-full shrink-0"
                    >
                      Browse 40+ ▾
                    </button>
                  </div>

                  {/* Scale controls */}
                  <div className="px-4 py-2 bg-slate-100 border-b border-slate-200 flex items-center justify-between text-xs shrink-0">
                    <span className="text-[11px] font-bold text-slate-500">A4 Single-Page Format</span>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => setMobilePreviewZoom('fit')}
                        className={`px-3 py-1 text-[11px] font-bold rounded-full ${
                          mobilePreviewZoom === 'fit' ? 'bg-[#1C152E] text-white' : 'bg-white text-slate-700 border border-slate-200'
                        }`}
                      >
                        Fit Screen
                      </button>
                      <button
                        onClick={() => setMobilePreviewZoom('100')}
                        className={`px-3 py-1 text-[11px] font-bold rounded-full ${
                          mobilePreviewZoom === '100' ? 'bg-[#1C152E] text-white' : 'bg-white text-slate-700 border border-slate-200'
                        }`}
                      >
                        100%
                      </button>
                    </div>
                  </div>

                  {/* Scaled Preview Canvas */}
                  <div className="flex-1 overflow-y-auto p-4 flex justify-center items-start">
                    {(() => {
                      const scaleVal = Math.min(0.9, Math.max(0.38, (mobileContainerWidth - 32) / 794));
                      return (
                        <div
                          style={{
                            width: mobilePreviewZoom === 'fit' ? `${794 * scaleVal}px` : '794px',
                            height: mobilePreviewZoom === 'fit' ? `${1123 * scaleVal}px` : '1123px',
                            position: 'relative',
                            flexShrink: 0,
                          }}
                        >
                          <div
                            style={{
                              transform: mobilePreviewZoom === 'fit' ? `scale(${scaleVal})` : 'scale(1)',
                              transformOrigin: 'top left',
                              width: '794px',
                              position: 'absolute',
                              top: 0,
                              left: 0,
                            }}
                          >
                            <ResumeTemplateRenderer
                              templateId={selectedTemplate}
                              data={resumeData}
                              zoomLevel={100}
                            />
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Standard Full Desktop 3-Zone Studio Layout */
        <div className="flex-1 flex min-h-0 overflow-hidden">
          {/* Zone 1 (Left): Section List Navigation */}
          <aside
            className={`${
              isSidebarCollapsed ? 'w-16 p-2 items-center' : 'w-48 xl:w-52 p-3'
            } bg-slate-50/95 border-r border-slate-200/90 flex flex-col gap-1 overflow-y-auto shrink-0 select-none no-print transition-all duration-300`}
          >
            <div className="flex items-center justify-between px-2 py-2 mb-1">
              {!isSidebarCollapsed && (
                <span className="text-[11px] font-black text-slate-500 uppercase tracking-wider">
                  Sections
                </span>
              )}
              <button
                onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                className="p-1 hover:bg-slate-200/70 rounded-lg text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                title={isSidebarCollapsed ? 'Expand Sections Sidebar' : 'Collapse Sections Sidebar'}
              >
                {isSidebarCollapsed ? <PanelLeftOpen className="w-4 h-4" /> : <PanelLeftClose className="w-4 h-4" />}
              </button>
            </div>

            {sectionsList.map((sec) => {
              const Icon = sec.icon;
              const isActive = activeSection === sec.id;
              return (
                <button
                  key={sec.id}
                  onClick={() => setActiveSection(sec.id)}
                  title={sec.title}
                  className={`flex items-center ${
                    isSidebarCollapsed ? 'justify-center p-2.5' : 'justify-between px-3.5 py-2'
                  } rounded-full text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#1C152E] text-white shadow-sm'
                      : 'text-slate-700 hover:bg-white border border-transparent hover:border-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {!isSidebarCollapsed && (
                      <GripVertical className={`w-3 h-3 ${isActive ? 'text-white/70' : 'text-slate-400'}`} />
                    )}
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                    {!isSidebarCollapsed && <span>{sec.title}</span>}
                  </div>
                  {!isSidebarCollapsed && typeof sec.count === 'number' && (
                    <span
                      className={`px-1.5 py-0.5 rounded-full text-[9.5px] font-bold ${
                        isActive ? 'bg-white/20 text-white' : 'bg-white text-slate-700 border border-slate-200'
                      }`}
                    >
                      {sec.count}
                    </span>
                  )}
                </button>
              );
            })}
          </aside>

          {/* Zone 2 (Center Hero): Live Printable A4 Resume Preview Document */}
          <section className="flex-1 min-w-0 bg-[#ECEEF2] flex flex-col overflow-hidden relative transition-all duration-300">
            {/* Quick Template Switcher & Width Controls Ribbon Bar */}
            <div className="bg-white/95 backdrop-blur-md border-b border-slate-200/90 px-4 py-2 flex items-center justify-between gap-3 shrink-0 shadow-2xs no-print">
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
                <span className="text-[10.5px] font-black text-slate-500 uppercase tracking-wider flex items-center gap-1 shrink-0 mr-1">
                  <Layout className="w-3.5 h-3.5 text-[#FF4B5E]" /> Templates:
                </span>
                {[
                  { id: 'flowcv_atlantic_blue', label: 'FlowCV Atlantic' },
                  { id: 'teal_modern', label: 'TealHQ Modern' },
                  { id: 'split_duo', label: 'Balanced Duo' },
                  { id: 'prestige_gold', label: 'Prestige Gold' },
                  { id: 'classic_ats', label: 'Classic ATS' },
                  { id: 'navy_sidebar', label: 'Navy Split' },
                  { id: 'swiss_bauhaus_grid', label: 'Swiss Grid' },
                ].map((tpl) => (
                  <button
                    key={tpl.id}
                    onClick={() => setSelectedTemplate(tpl.id as TemplateId)}
                    className={`px-3 py-1 text-[11px] font-bold rounded-full border transition-all shrink-0 cursor-pointer ${
                      selectedTemplate === tpl.id
                        ? 'bg-[#1C152E] text-white border-[#1C152E] shadow-xs'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-[#1C152E] hover:bg-slate-50'
                    }`}
                  >
                    {tpl.label}
                  </button>
                ))}
                <button
                  onClick={() => setIsTemplateModalOpen(true)}
                  className="px-3 py-1 text-[11px] font-bold text-[#FF4B5E] bg-[#FFF0F3] border border-[#FFCCD5] hover:bg-[#FFE5EB] rounded-full transition-all shrink-0 flex items-center gap-1 cursor-pointer"
                >
                  Browse 40+ ▾
                </button>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <div className="flex items-center bg-slate-100 p-0.5 rounded-full border border-slate-200">
                  <button
                    type="button"
                    onClick={() => {
                      setPreviewWidthPreset('standard');
                      setIsSidebarCollapsed(false);
                      setIsEditorCollapsed(false);
                    }}
                    className={`px-3 py-1 rounded-full text-[10.5px] font-extrabold transition-all cursor-pointer ${
                      previewWidthPreset === 'standard' && !isEditorCollapsed ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    Standard
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setPreviewWidthPreset('wide');
                      setIsSidebarCollapsed(true);
                      setIsEditorCollapsed(false);
                    }}
                    className={`px-3 py-1 rounded-full text-[10.5px] font-extrabold transition-all cursor-pointer ${
                      previewWidthPreset === 'wide' && !isEditorCollapsed ? 'bg-[#1C152E] text-white shadow-2xs' : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    Wide Preview
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setPreviewWidthPreset('expanded');
                      setIsSidebarCollapsed(true);
                      setIsEditorCollapsed(true);
                    }}
                    className={`px-3 py-1 rounded-full text-[10.5px] font-extrabold transition-all cursor-pointer ${
                      isEditorCollapsed ? 'bg-slate-900 text-white shadow-2xs' : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    Max View
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setIsEditorCollapsed(!isEditorCollapsed)}
                  className={`p-1.5 border rounded-full transition-all cursor-pointer ${
                    isEditorCollapsed
                      ? 'bg-[#FFF0F3] text-[#FF4B5E] border-[#FFCCD5] shadow-xs'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                  }`}
                  title={isEditorCollapsed ? 'Open Editor Panel' : 'Hide Editor Panel (Expand Preview)'}
                >
                  {isEditorCollapsed ? <PanelRightOpen className="w-4 h-4" /> : <PanelRightClose className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Centered Canvas Scroll Area */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 flex flex-col items-center">
              {/* Text-Editable Resume Notification Pill */}
              <div className="mb-3 inline-flex items-center gap-2 text-xs font-semibold text-[#1C152E] bg-white border border-slate-200/90 shadow-2xs px-4 py-1.5 rounded-full select-none shrink-0">
                <span className="w-2 h-2 rounded-full bg-[#FF4B5E] animate-pulse" />
                <Pencil className="w-3.5 h-3.5 text-[#FF4B5E]" />
                <span>Live Text-Editable Resume — Click any heading, bullet, or text directly on the page to type & edit</span>
              </div>
              <ResumeTemplateRenderer
                templateId={selectedTemplate}
                data={resumeData}
                zoomLevel={zoomLevel}
              />
            </div>

            {isEditorCollapsed && (
              <button
                onClick={() => setIsEditorCollapsed(false)}
                className="absolute top-14 right-6 z-30 px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-2xl shadow-xl flex items-center gap-2 cursor-pointer transition-all hover:scale-105 border border-slate-700"
              >
                <PanelRightOpen className="w-4 h-4 text-teal-400" />
                <span>Edit {sectionsList.find((s) => s.id === activeSection)?.title || 'Section'}</span>
              </button>
            )}
          </section>

          {/* Zone 3 (Right): Active Section Editor Form & AI Tools */}
          {!isEditorCollapsed && (
            <main
              className={`${
                previewWidthPreset === 'expanded'
                  ? 'w-[320px]'
                  : previewWidthPreset === 'wide'
                  ? 'w-[360px] xl:w-[390px]'
                  : 'w-[420px] xl:w-[460px]'
              } shrink-0 bg-white border-l border-slate-200/90 flex flex-col overflow-y-auto p-5 gap-6 no-print transition-all duration-300`}
            >
              <ResumeSectionEditor
                activeSection={activeSection}
                personalInfo={personalInfo}
                setPersonalInfo={setPersonalInfo}
                experiences={experiences}
                setExperiences={setExperiences}
                projects={projects}
                setProjects={setProjects}
                education={education}
                setEducation={setEducation}
                skills={skills}
                setSkills={setSkills}
                newSkillInput={newSkillInput}
                setNewSkillInput={setNewSkillInput}
                handleAddSkill={handleAddSkill}
                handleRemoveSkill={handleRemoveSkill}
                handleEnhanceBullet={handleEnhanceBullet}
                isEnhancing={isEnhancing}
                isMobileView={false}
                handlePrevSection={handlePrevSection}
                handleNextSection={handleNextSection}
                onFinishResume={handleFinishResume}
              />
            </main>
          )}
        </div>
      )}
      
      {/* Interactive 30+ Resume Templates Gallery Modal with Real Photos & Search */}
      <Modal
        isOpen={isTemplateModalOpen}
        onClose={() => setIsTemplateModalOpen(false)}
        title="Select Professional Resume Template Design"
        maxWidth="xl"
      >
        <div className="flex flex-col gap-4 max-h-[80vh] overflow-hidden p-1">
          {/* Header Controls: Categories & Search Bar */}
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between border-b border-slate-200 pb-3 shrink-0">
            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
              {[
                { id: 'All', label: 'All Templates' },
                { id: 'FlowCV & Teal', label: 'FlowCV & Teal' },
                { id: 'Executive & Finance', label: 'Executive & Finance' },
                { id: 'Tech & AI', label: 'Tech & AI' },
                { id: 'Product & Design', label: 'Product & Design' },
                { id: 'Startups & YC', label: 'Startups & YC' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setTemplateCategory(cat.id)}
                  className={`px-3.5 py-1.5 text-xs font-bold rounded-full border transition-all shrink-0 cursor-pointer ${
                    templateCategory === cat.id
                      ? 'bg-[#1C152E] text-white border-[#1C152E] shadow-xs'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-[#1C152E] hover:bg-slate-50'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Keyword Search */}
            <div className="relative shrink-0 sm:w-64">
              <input
                type="text"
                value={templateSearchQuery}
                onChange={(e) => setTemplateSearchQuery(e.target.value)}
                placeholder="Search by role or style..."
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-full focus:outline-none focus:border-[#1C152E] focus:bg-white"
              />
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
              {templateSearchQuery && (
                <button
                  onClick={() => setTemplateSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 rounded cursor-pointer"
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* 40+ Real Photographic Template Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 overflow-y-auto pr-1 flex-1">
            {templatesGallery
              .filter((tpl) => {
                const matchesCat = templateCategory === 'All' || tpl.category === templateCategory;
                const matchesSearch =
                  !templateSearchQuery ||
                  tpl.name.toLowerCase().includes(templateSearchQuery.toLowerCase()) ||
                  tpl.tag.toLowerCase().includes(templateSearchQuery.toLowerCase()) ||
                  tpl.desc.toLowerCase().includes(templateSearchQuery.toLowerCase());
                return matchesCat && matchesSearch;
              })
              .map((tpl) => (
                <div
                  key={tpl.id}
                  onClick={() => {
                    setSelectedTemplate(tpl.id as TemplateId);
                    setIsTemplateModalOpen(false);
                  }}
                  className={`group relative bg-white rounded-2xl border p-3 flex flex-col justify-between gap-3 transition-all duration-200 cursor-pointer shadow-xs hover:shadow-xl ${
                    selectedTemplate === tpl.id
                      ? 'border-[#1C152E] ring-2 ring-[#1C152E]/30 shadow-md'
                      : 'border-slate-200 hover:border-[#1C152E]'
                  }`}
                >
                  {/* Header Badges */}
                  <div className="flex justify-between items-center gap-1">
                    <span className="text-[9px] font-black uppercase text-[#FF4B5E] bg-[#FFF0F3] border border-[#FFCCD5] px-2.5 py-0.5 rounded-full truncate max-w-[120px] flex items-center gap-1">
                      <Star className="w-2.5 h-2.5 text-[#FF4B5E] fill-[#FF4B5E]" />
                      <span>{tpl.tag}</span>
                    </span>
                    <span className="text-[9px] font-extrabold text-[#1C152E] bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-full shrink-0">
                      {tpl.ats}
                    </span>
                  </div>

                  {/* REAL AUTHENTIC MINI-DOM TEMPLATE PREVIEW */}
                  <div className="h-44 w-full bg-slate-50 rounded-xl border border-slate-100 overflow-hidden relative shadow-2xs group-hover:shadow-md transition-all flex items-center justify-center p-0">
                    <TemplateMicroPreview
                      templateId={tpl.id}
                      className="w-full h-full"
                    />

                    {/* Hover Overlay Button */}
                    <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-2 backdrop-blur-[2px]">
                      <span className="px-4 py-2 bg-[#1C152E] text-white text-xs font-bold rounded-full shadow-md">
                        Select Template
                      </span>
                    </div>
                  </div>

                  {/* Text Meta */}
                  <div className="flex flex-col gap-0.5 text-left">
                    <span className="text-xs font-bold text-slate-900 flex items-center justify-between">
                      <span className="truncate">{tpl.name}</span>
                      {selectedTemplate === tpl.id && (
                        <CheckCircle2 className="w-4 h-4 text-[#1C152E] shrink-0 ml-1" />
                      )}
                    </span>
                    <span className="text-[10px] text-slate-500 leading-tight line-clamp-2">{tpl.desc}</span>
                  </div>

                  {/* Action Button */}
                  <div
                    className={`w-full py-2 text-xs font-bold rounded-full text-center shadow-xs transition-all ${
                      selectedTemplate === tpl.id
                        ? 'bg-[#1C152E] text-white'
                        : 'bg-slate-100 text-slate-800 group-hover:bg-[#1C152E] group-hover:text-white'
                    }`}
                  >
                    {selectedTemplate === tpl.id ? 'Active Template' : 'Use Template'}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </Modal>

      {/* Interactive PDF Export & Vector Print Preview Modal */}
      <Modal
        isOpen={isExportPreviewModalOpen}
        onClose={() => setIsExportPreviewModalOpen(false)}
        title="Resume Export & Print Preview"
        maxWidth="4xl"
      >
        <div className="flex flex-col gap-4 max-h-[85vh] overflow-hidden p-1">
          {/* Top Control Bar */}
          <div className="bg-white border-b border-slate-200/90 pb-3.5 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3 shrink-0">
            <div className="flex flex-col text-left">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-slate-900 tracking-tight">
                  {personalInfo.fullName ? personalInfo.fullName.trim().replace(/\s+/g, '_') : 'Candidate'}_Resume_ATS.pdf
                </span>
                <span className="text-[10px] font-bold text-slate-700 bg-slate-100 border border-slate-200 px-2.5 py-0.5 rounded-full">
                  100% ATS Vector
                </span>
              </div>
              <span className="text-xs text-slate-500 mt-0.5 font-normal">
                Standard A4 (210 × 297 mm) • Native crisp vector typography
              </span>
            </div>

            {/* Modal Controls & Action Buttons */}
            <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
              {/* Preview Scale Zoom Bar */}
              <div className="flex items-center bg-slate-100 p-1 rounded-full border border-slate-200/90 mr-1">
                {[
                  { label: 'Fit', value: 'fit' },
                  { label: '50%', value: 50 },
                  { label: '75%', value: 75 },
                  { label: '100%', value: 100 },
                ].map((z) => (
                  <button
                    key={String(z.value)}
                    type="button"
                    onClick={() => setPreviewModalZoom(z.value as any)}
                    className={`px-3 py-1 text-xs font-semibold rounded-full transition-all cursor-pointer ${
                      previewModalZoom === z.value
                        ? 'bg-white text-slate-900 shadow-2xs font-bold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {z.label}
                  </button>
                ))}
              </div>

              {/* 1. Direct PDF File Download (FlowCV Obsidian Pill) */}
              <button
                type="button"
                disabled={isExportingPDF}
                onClick={handleExportPDF}
                className="h-10 px-5 rounded-full font-bold text-xs bg-[#1c152e] hover:bg-[#2b1f45] active:scale-[0.98] text-white shadow-sm flex items-center gap-2 transition-all cursor-pointer disabled:opacity-60"
              >
                {isExportingPDF ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-white" />
                ) : (
                  <Download className="w-3.5 h-3.5 text-white" />
                )}
                <span>{isExportingPDF ? 'Downloading...' : 'Download PDF File'}</span>
              </button>

              {/* 2. Native Print / Vector PDF Option (FlowCV White Pill) */}
              <button
                type="button"
                onClick={() => {
                  if (!isUserAuthenticated) {
                    setAuthModalTitle('Save & Print Your Resume');
                    setAuthModalSubtitle('Create a free account or sign in to print and export your resume.');
                    setPendingAction(() => () => {
                      const cleanName = personalInfo.fullName
                        ? personalInfo.fullName.replace(/[^a-zA-Z0-9_\s-]/g, '').trim().replace(/\s+/g, '_')
                        : 'Candidate';
                      const originalTitle = document.title;
                      document.title = `${cleanName}_Resume_ATS`;
                      window.print();
                      setTimeout(() => {
                        document.title = originalTitle;
                      }, 1000);
                    });
                    setIsAuthModalOpen(true);
                    return;
                  }
                  const cleanName = personalInfo.fullName
                    ? personalInfo.fullName.replace(/[^a-zA-Z0-9_\s-]/g, '').trim().replace(/\s+/g, '_')
                    : 'Candidate';
                  const originalTitle = document.title;
                  document.title = `${cleanName}_Resume_ATS`;
                  window.print();
                  setTimeout(() => {
                    document.title = originalTitle;
                  }, 1000);
                }}
                className="h-10 px-4 rounded-full font-semibold text-xs bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 border border-slate-200 hover:border-slate-300 shadow-2xs flex items-center gap-2 transition-all cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5 text-slate-600" />
                <span>Print / Save</span>
              </button>

              {/* 3. JSON Backup (FlowCV White Pill) */}
              <button
                type="button"
                onClick={() => {
                  if (!isUserAuthenticated) {
                    setAuthModalTitle('Export Resume Data');
                    setAuthModalSubtitle('Create a free account or sign in to export your resume data file.');
                    setPendingAction(() => () => handleDownloadLocalFile('json'));
                    setIsAuthModalOpen(true);
                    return;
                  }
                  handleDownloadLocalFile('json');
                }}
                className="h-10 px-4 rounded-full font-semibold text-xs bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 border border-slate-200 hover:border-slate-300 shadow-2xs flex items-center gap-2 transition-all cursor-pointer"
                title="Save .JSON file"
              >
                <Save className="w-3.5 h-3.5 text-slate-600" />
                <span>Save .JSON</span>
              </button>
            </div>
          </div>

          {/* Full Centered A4 Scaled Preview Container with Exact Bounding Box */}
          {(() => {
            const effectiveScale =
              previewModalZoom === 'fit'
                ? 0.58
                : typeof previewModalZoom === 'number'
                ? previewModalZoom / 100
                : 0.58;
            const scaledWidth = Math.round(794 * effectiveScale);
            const scaledHeight = Math.round(1123 * effectiveScale);

            return (
              <div className="flex-1 overflow-auto bg-[#F4F5F7] rounded-2xl p-4 sm:p-8 flex justify-center items-start border border-slate-200/80 min-h-[460px]">
                <div
                  style={{
                    width: `${scaledWidth}px`,
                    height: `${scaledHeight}px`,
                  }}
                  className="relative shadow-[0_20px_50px_rgba(0,0,0,0.13)] rounded-sm overflow-hidden bg-white shrink-0 mx-auto transition-all"
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
                    <ResumeTemplateRenderer
                      templateId={selectedTemplate}
                      data={resumeData}
                      zoomLevel={100}
                    />
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      </Modal>

      {/* Sign In / Sign Up Gate Modal on Download or Export */}
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
        title={authModalTitle}
        subtitle={authModalSubtitle}
      />
    </div>
  );
}
