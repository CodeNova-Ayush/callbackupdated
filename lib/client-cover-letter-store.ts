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

export const read_legacy_cover_letters = (): CoverLetterItem[] => {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(COVER_LETTER_STORAGE_KEYS.LIST);
    const list = raw ? JSON.parse(raw) : [];
    return Array.isArray(list) ? list : [];
  } catch {
    return [];
  }
};

export const clear_legacy_cover_letter_keys = () => {
  if (typeof window === 'undefined') return;
  const keys = [COVER_LETTER_STORAGE_KEYS.LIST, COVER_LETTER_STORAGE_KEYS.ACTIVE_ID];
  for (let index = localStorage.length - 1; index >= 0; index -= 1) {
    const key = localStorage.key(index);
    if (key?.startsWith('callback_cover_letter_')) keys.push(key);
  }
  keys.forEach((key) => localStorage.removeItem(key));
};

export async function getStoredCoverLetters(): Promise<CoverLetterItem[]> {
  const response = await fetch('/api/cover-letters');
  if (!response.ok) return [];
  const data = await response.json();
  return Array.isArray(data.letters) ? data.letters : [];
}

export async function getCoverLetterById(id: string): Promise<CoverLetterItem | null> {
  if (!id) return null;
  const response = await fetch(`/api/cover-letters/${id}`);
  if (!response.ok) return null;
  const data = await response.json();
  return data.letter || null;
}

export async function saveCoverLetterToStore(item: CoverLetterItem): Promise<void> {
  const response = await fetch(`/api/cover-letters/${item.id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item),
  });
  if (response.status === 404) {
    const created = await fetch('/api/cover-letters', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item),
    });
    if (!created.ok) throw new Error('Failed to save cover letter');
  } else if (!response.ok) {
    throw new Error('Failed to save cover letter');
  }
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('cover_letter_saved', { detail: item }));
  }
}

export async function createNewCoverLetter(templateId: string = 'classic_left', customTitle?: string): Promise<CoverLetterItem> {
  const response = await fetch('/api/cover-letters', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...FLOWCV_DEFAULT_COVER_LETTER,
      title: customTitle || 'New Cover Letter',
      templateId,
    }),
  });
  if (!response.ok) throw new Error('Failed to create cover letter');
  const data = await response.json();
  return data.letter;
}

export async function deleteCoverLetter(id: string): Promise<void> {
  await fetch(`/api/cover-letters/${id}`, { method: 'DELETE' });
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('cover_letter_deleted', { detail: { id } }));
  }
}

export async function duplicateCoverLetter(id: string): Promise<CoverLetterItem | null> {
  const original = await getCoverLetterById(id);
  if (!original) return null;
  const response = await fetch('/api/cover-letters', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...original, title: `${original.title} (Copy)` }),
  });
  if (!response.ok) return null;
  const data = await response.json();
  return data.letter;
}

