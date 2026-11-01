// Section shapes kept loose on purpose: imports, the builder, and older local saves all write them.
export interface StoredPersonalInfo {
  fullName?: string;
  title?: string;
  email?: string;
  phone?: string;
  location?: string;
  linkedin?: string;
  github?: string;
  website?: string;
  summary?: string;
  [key: string]: unknown;
}

export interface StoredExperienceItem {
  id?: string;
  role?: string;
  company?: string;
  location?: string;
  startDate?: string;
  endDate?: string;
  bullets?: string[];
  [key: string]: unknown;
}

export interface StoredEducationItem {
  id?: string;
  institution?: string;
  degree?: string;
  location?: string;
  startDate?: string;
  endDate?: string;
  gpa?: string;
  [key: string]: unknown;
}

export interface StoredProjectItem {
  id?: string;
  title?: string;
  techStack?: string;
  link?: string;
  bullets?: string[];
  [key: string]: unknown;
}

// Server or API resume record accepted by to_stored_resume.
export interface StoredResumeSource {
  id: string;
  title: string;
  sections?: { sectionType: string; content: string }[];
  candidateName?: string;
  candidateTitle?: string;
  atsScore?: number;
  analysisResults?: { atsScore?: number }[];
  trustScore?: number;
  updatedAt?: string;
  isActive?: boolean;
  template?: string;
}

export interface StoredResumeItem {
  id: string;
  title: string;
  candidateName: string;
  candidateTitle: string;
  candidateEmail?: string;
  candidatePhone?: string;
  candidateLocation?: string;
  atsScore: number;
  trustScore: number;
  updatedAt: string;
  isActive: boolean;
  template?: string;
  parsedSections: {
    personalInfo: StoredPersonalInfo;
    experience: StoredExperienceItem[];
    education: StoredEducationItem[];
    projects: StoredProjectItem[];
    skills: string[];
    certifications?: string[];
  };
}

const parse_section = (sections: { sectionType: string; content: string }[] | undefined, type: string) => {
  const section = sections?.find((item) => item.sectionType === type);
  if (!section) return type === 'personal_info' ? {} : [];
  try {
    return JSON.parse(section.content);
  } catch {
    return section.content;
  }
};

export const to_stored_resume = (resume: StoredResumeSource): StoredResumeItem => {
  const sections = resume.sections || [];
  const personal = parse_section(sections, 'personal_info') || {};
  const experience = parse_section(sections, 'experience');
  return {
    id: resume.id,
    title: resume.title,
    candidateName: personal.fullName || resume.candidateName || 'Candidate',
    candidateTitle: personal.title || experience?.[0]?.role || resume.candidateTitle || '',
    candidateEmail: personal.email || '',
    candidatePhone: personal.phone || '',
    candidateLocation: personal.location || '',
    atsScore: resume.atsScore || resume.analysisResults?.[0]?.atsScore || 0,
    trustScore: resume.trustScore || 0,
    updatedAt: resume.updatedAt || '',
    isActive: Boolean(resume.isActive),
    template: resume.template,
    parsedSections: {
      personalInfo: personal,
      experience: Array.isArray(experience) ? experience : [],
      education: parse_section(sections, 'education') || [],
      projects: parse_section(sections, 'projects') || [],
      skills: parse_section(sections, 'skills') || [],
      certifications: parse_section(sections, 'certifications') || [],
    },
  };
};

export const read_legacy_resumes = () => {
  if (typeof window === 'undefined') return [];
  const collected: StoredResumeItem[] = [];
  const raw = localStorage.getItem('callback_ai_all_resumes_v2');
  if (raw) {
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) collected.push(...parsed);
    } catch {
      // ignore a corrupt legacy list
    }
  }
  for (let index = 0; index < localStorage.length; index += 1) {
    const key = localStorage.key(index);
    if (!key?.startsWith('callback_ai_saved_resume_')) continue;
    try {
      const parsed = JSON.parse(localStorage.getItem(key) || '');
      collected.push({
        id: key.replace('callback_ai_saved_resume_', ''),
        title: parsed.personalInfo?.fullName ? `${parsed.personalInfo.fullName}'s Resume` : 'Imported resume',
        candidateName: parsed.personalInfo?.fullName || 'Candidate',
        candidateTitle: parsed.experiences?.[0]?.role || '',
        candidateEmail: parsed.personalInfo?.email || '',
        atsScore: 0,
        trustScore: 0,
        updatedAt: parsed.updatedAt || '',
        isActive: false,
        template: parsed.selectedTemplate,
        parsedSections: {
          personalInfo: parsed.personalInfo || {},
          experience: parsed.experiences || parsed.experience || [],
          education: parsed.education || [],
          projects: parsed.projects || [],
          skills: parsed.skills || [],
          certifications: parsed.certifications || [],
        },
      });
    } catch {
      // skip one unreadable legacy resume
    }
  }
  return collected;
};

export const clear_legacy_resume_keys = () => {
  if (typeof window === 'undefined') return;
  const keys = ['callback_ai_all_resumes_v2', 'active_resume_id', 'active_resume_title', 'active_resume_data', 'callback_active_resume_id'];
  for (let index = localStorage.length - 1; index >= 0; index -= 1) {
    const key = localStorage.key(index);
    if (key?.startsWith('callback_ai_saved_resume_')) keys.push(key);
  }
  keys.forEach((key) => localStorage.removeItem(key));
};

// Every key that has ever held resume content or candidate identity in the browser.
export const RESUME_CACHE_KEYS = [
  'callback_ai_all_resumes_v2',
  'active_resume_id',
  'active_resume_title',
  'active_resume_data',
  'active_candidate_name',
  'callback_active_resume_id',
];
export const RESUME_CACHE_KEY_PREFIXES = ['callback_ai_saved_resume_'];

// Call on sign-out so the next person on this browser sees none of it.
export const clear_resume_cache_keys = () => {
  if (typeof window === 'undefined') return;
  try {
    const keys = [...RESUME_CACHE_KEYS];
    for (let index = localStorage.length - 1; index >= 0; index -= 1) {
      const key = localStorage.key(index);
      if (key && RESUME_CACHE_KEY_PREFIXES.some((prefix) => key.startsWith(prefix))) keys.push(key);
    }
    keys.forEach((key) => localStorage.removeItem(key));
  } catch {
    // storage blocked: nothing to clear
  }
};

export async function getStoredResumes(): Promise<StoredResumeItem[]> {
  const response = await fetch('/api/resumes');
  if (!response.ok) return [];
  const data = await response.json();
  return Array.isArray(data.resumes) ? data.resumes.map(to_stored_resume) : [];
}

export async function getResumeFromStore(resumeId: string): Promise<StoredResumeItem | null> {
  const response = await fetch(`/api/resumes/${resumeId}`);
  if (!response.ok) return null;
  const data = await response.json();
  return data.resume ? to_stored_resume(data.resume) : null;
}

export async function getActiveStoredResume(): Promise<StoredResumeItem | null> {
  const resumes = await getStoredResumes();
  const active = resumes.find((resume) => resume.isActive) || resumes[0];
  if (!active) return null;
  return getResumeFromStore(active.id);
}

export async function saveResumeToStore(item: StoredResumeItem): Promise<void> {
  const response = await fetch(`/api/resumes/${item.id}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title: item.title,
      template: item.template,
      personalInfo: item.parsedSections.personalInfo,
      experiences: item.parsedSections.experience,
      education: item.parsedSections.education,
      skills: item.parsedSections.skills,
      projects: item.parsedSections.projects,
      certifications: item.parsedSections.certifications,
    }),
  });
  if (!response.ok) throw new Error('Failed to save resume');
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('active_resume_changed'));
  }
}

export async function setActiveResume(resumeId: string): Promise<void> {
  await fetch(`/api/resumes/${resumeId}/activate`, { method: 'POST' });
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('active_resume_changed'));
  }
}

export async function getActiveCandidateName(fallback = 'Candidate Profile'): Promise<string> {
  const active = await getActiveStoredResume();
  return active?.candidateName || fallback;
}
