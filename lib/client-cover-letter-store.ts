/**
 * ============================================================================
 * 💌 GLOBAL CLIENT COVER LETTER STORE & SYNCHRONIZER
 * ============================================================================
 * Provides an immutable, persistent single-source-of-truth in the browser
 * for Cover Letters across the CallBack application.
 */

export interface CoverLetterSender {
  fullName: string;
  jobTitle?: string;
  email: string;
  phone: string;
  address?: string;
  city?: string;
  linkedin?: string;
  website?: string;
  avatarUrl?: string;
}

export interface CoverLetterRecipient {
  name: string;
  title?: string;
  company: string;
  address?: string;
  city?: string;
  department?: string;
}

export interface CoverLetterDetails {
  date: string;
  subject: string;
  salutation: string;
  body: string[];
  signOff: string;
  signatureText: string;
  signatureStyle?: 'classic' | 'casual' | 'formal';
}

export interface CoverLetterStyle {
  accentColor?: string;
  fontFamily?: 'sans' | 'serif' | 'mono';
  fontSize?: 'sm' | 'md' | 'lg';
  lineSpacing?: 'compact' | 'normal' | 'relaxed';
}

export interface CoverLetterItem {
  id: string;
  title: string;
  templateId: string;
  sender: CoverLetterSender;
  recipient: CoverLetterRecipient;
  letterDetails: CoverLetterDetails;
  style: CoverLetterStyle;
  updatedAt: string;
  createdAt: string;
}

export const COVER_LETTER_STORAGE_KEYS = {
  LIST: 'callback_ai_all_cover_letters_v1',
  ACTIVE_ID: 'active_cover_letter_id',
};

// FlowCV Authentic Default Cover Letter Persona (Alex Taylor / Marketing Manager)
export const FLOWCV_DEFAULT_COVER_LETTER: Omit<CoverLetterItem, 'id' | 'createdAt' | 'updatedAt'> = {
  title: 'Application for Marketing Manager',
  templateId: 'classic_left',
  sender: {
    fullName: 'Alex Taylor',
    jobTitle: 'Senior Marketing Manager',
    email: 'alex.taylor@example.com',
    phone: '+44 123 456 7890',
    address: '123 Example Street',
    city: 'Example City 12345',
    linkedin: 'linkedin.com/in/alextaylor',
    website: 'alextaylor.design',
    avatarUrl: '/images/templates/andrew-avatar.jpg',
  },
  recipient: {
    name: 'Ms. Jane Doe',
    title: 'Head of People & Talent',
    company: 'Example Company Ltd.',
    address: '42 Company Street',
    city: 'Business City 67890',
    department: 'Human Resources Department',
  },
  letterDetails: {
    date: '24 January 2027',
    subject: 'Application for Marketing Manager',
    salutation: 'Dear Ms. Doe,',
    body: [
      'I am writing to apply for the Marketing Manager position at Example Company Ltd. With my professional experience in digital marketing and my interest in developing effective marketing initiatives, I am confident that I can make a valuable contribution to your team.',
      'In my previous role at Exemplar Corporation, I was responsible for planning, implementing, and optimizing various marketing campaigns. This allowed me to further develop my expertise in online marketing, campaign management, and data analysis. Through a structured and solution-oriented approach, I successfully delivered projects efficiently and achieved measurable results.',
      'What particularly appeals to me about this position is the opportunity to apply my experience across a diverse range of responsibilities while taking on new challenges. Example Company Ltd. offers an exciting environment in which I can further develop my skills and actively contribute to the company\'s success.',
      'I would welcome the opportunity to discuss my motivation and qualifications with you in more detail. Thank you for your time and consideration.',
    ],
    signOff: 'Sincerely,',
    signatureText: 'Alex Taylor',
    signatureStyle: 'classic',
  },
  style: {
    accentColor: '#1C152E',
    fontFamily: 'sans',
    fontSize: 'md',
    lineSpacing: 'relaxed',
  },
};

/**
 * Get all stored cover letters from localStorage
 */
export function getStoredCoverLetters(): CoverLetterItem[] {
  if (typeof window === 'undefined') return [];

  try {
    const raw = localStorage.getItem(COVER_LETTER_STORAGE_KEYS.LIST);
    if (raw) {
      const list = JSON.parse(raw);
      if (Array.isArray(list)) {
        return list;
      }
    }
  } catch (e) {
    console.warn('[CoverLetterStore] Failed to read cover letters:', e);
  }

  return [];
}

/**
 * Get single cover letter by ID
 */
export function getCoverLetterById(id: string): CoverLetterItem | null {
  if (typeof window === 'undefined' || !id) return null;

  const all = getStoredCoverLetters();
  const found = all.find((item) => item.id === id);
  if (found) return found;

  // If not found in list, check direct key
  try {
    const direct = localStorage.getItem(`callback_cover_letter_${id}`);
    if (direct) {
      return JSON.parse(direct);
    }
  } catch {}

  // If requested default demo id
  if (id === 'default-demo-letter') {
    return {
      ...FLOWCV_DEFAULT_COVER_LETTER,
      id: 'default-demo-letter',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  }

  return null;
}

/**
 * Save or update cover letter in store
 */
export function saveCoverLetterToStore(item: CoverLetterItem): void {
  if (typeof window === 'undefined' || !item?.id) return;

  try {
    const now = new Date().toISOString();
    const updatedItem: CoverLetterItem = {
      ...item,
      updatedAt: now,
    };

    // Save individual key
    localStorage.setItem(`callback_cover_letter_${item.id}`, JSON.stringify(updatedItem));

    // Update list key
    const all = getStoredCoverLetters();
    const idx = all.findIndex((l) => l.id === item.id);
    if (idx >= 0) {
      all[idx] = updatedItem;
    } else {
      all.unshift(updatedItem);
    }

    localStorage.setItem(COVER_LETTER_STORAGE_KEYS.LIST, JSON.stringify(all));
    localStorage.setItem(COVER_LETTER_STORAGE_KEYS.ACTIVE_ID, item.id);

    // Notify listeners
    window.dispatchEvent(new CustomEvent('cover_letter_saved', { detail: updatedItem }));
  } catch (e) {
    console.error('[CoverLetterStore] Failed to save cover letter:', e);
  }
}

/**
 * Create a new cover letter
 */
export function createNewCoverLetter(templateId: string = 'classic_left', customTitle?: string): CoverLetterItem {
  const id = `cl_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const now = new Date().toISOString();

  // Pre-fill sender from active stored resume if available
  let senderOverrides: Partial<CoverLetterSender> = {};
  if (typeof window !== 'undefined') {
    try {
      const activeName = localStorage.getItem('active_candidate_name');
      const activeEmail = localStorage.getItem('active_candidate_email');
      const activeTitle = localStorage.getItem('active_candidate_title');
      if (activeName && activeName !== 'Candidate Profile') {
        senderOverrides.fullName = activeName;
      }
      if (activeEmail && !activeEmail.includes('candidate@callback')) {
        senderOverrides.email = activeEmail;
      }
      if (activeTitle) {
        senderOverrides.jobTitle = activeTitle;
      }
    } catch {}
  }

  const newItem: CoverLetterItem = {
    ...FLOWCV_DEFAULT_COVER_LETTER,
    id,
    title: customTitle || 'New Cover Letter',
    templateId,
    sender: {
      ...FLOWCV_DEFAULT_COVER_LETTER.sender,
      ...senderOverrides,
    },
    letterDetails: {
      ...FLOWCV_DEFAULT_COVER_LETTER.letterDetails,
      signatureText: senderOverrides.fullName || FLOWCV_DEFAULT_COVER_LETTER.sender.fullName,
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
    },
    createdAt: now,
    updatedAt: now,
  };

  saveCoverLetterToStore(newItem);
  return newItem;
}

/**
 * Delete a cover letter
 */
export function deleteCoverLetter(id: string): void {
  if (typeof window === 'undefined' || !id) return;

  try {
    localStorage.removeItem(`callback_cover_letter_${id}`);
    const all = getStoredCoverLetters().filter((item) => item.id !== id);
    localStorage.setItem(COVER_LETTER_STORAGE_KEYS.LIST, JSON.stringify(all));
    window.dispatchEvent(new CustomEvent('cover_letter_deleted', { detail: { id } }));
  } catch (e) {
    console.error('[CoverLetterStore] Failed to delete cover letter:', e);
  }
}

/**
 * Duplicate a cover letter
 */
export function duplicateCoverLetter(id: string): CoverLetterItem | null {
  const original = getCoverLetterById(id);
  if (!original) return null;

  const newId = `cl_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const now = new Date().toISOString();

  const duplicated: CoverLetterItem = {
    ...original,
    id: newId,
    title: `${original.title} (Copy)`,
    createdAt: now,
    updatedAt: now,
  };

  saveCoverLetterToStore(duplicated);
  return duplicated;
}
