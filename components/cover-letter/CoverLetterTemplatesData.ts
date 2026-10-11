export interface CoverLetterTemplateMeta {
  id: string;
  name: string;
  category: 'Popular' | 'Simple' | 'Modern' | 'Creative';
  desc: string;
  tag: string;
  accentColor: string;
  fontFamily: 'sans' | 'serif' | 'mono';
  headerLayout: 'left' | 'split' | 'right' | 'compact' | 'centered' | 'column' | 'banner' | 'leaves' | 'sidebar';
}

export const FLOWCV_COVER_LETTER_TEMPLATES: CoverLetterTemplateMeta[] = [
  // ==========================================
  // POPULAR & SIMPLE CLASSIC SUITE
  // ==========================================
  {
    id: 'classic_left',
    name: 'Classic Left',
    category: 'Popular',
    desc: 'Timeless left-aligned letterhead with standard business margins, clean paragraph spacing, and cursive signature.',
    tag: 'MOST POPULAR',
    accentColor: '#1C152E',
    fontFamily: 'sans',
    headerLayout: 'left',
  },
  {
    id: 'classic_split',
    name: 'Classic Split',
    category: 'Popular',
    desc: 'Symmetrical split alignment: sender contact on the top right, recipient and date on the left.',
    tag: 'BALANCED',
    accentColor: '#1C152E',
    fontFamily: 'sans',
    headerLayout: 'split',
  },
  {
    id: 'classic_right',
    name: 'Classic Right',
    category: 'Simple',
    desc: 'Top-right justified sender contact block with formal left-aligned recipient and subject line.',
    tag: 'ELEGANT',
    accentColor: '#1C152E',
    fontFamily: 'sans',
    headerLayout: 'right',
  },
  {
    id: 'classic_compact',
    name: 'Classic Compact',
    category: 'Simple',
    desc: 'Streamlined single-line contact header with delicate separator rule for dense, high-impact readability.',
    tag: 'HIGH DENSITY',
    accentColor: '#334155',
    fontFamily: 'sans',
    headerLayout: 'compact',
  },
  {
    id: 'classic_bold',
    name: 'Classic Bold',
    category: 'Simple',
    desc: 'Bold typographic statement with 28px sender name, professional title subtitle, and crisp hairlines.',
    tag: 'BOLD STATEMENT',
    accentColor: '#0F172A',
    fontFamily: 'sans',
    headerLayout: 'left',
  },
  {
    id: 'classic_divider',
    name: 'Classic Divider',
    category: 'Simple',
    desc: 'Refined editorial styling with horizontal dividing hairline separating header from recipient details.',
    tag: 'EDITORIAL',
    accentColor: '#1E293B',
    fontFamily: 'serif',
    headerLayout: 'left',
  },
  {
    id: 'classic_accent',
    name: 'Classic Accent',
    category: 'Popular',
    desc: 'Subtle cobalt accent bar beside sender name and colored subject line for modern corporate flair.',
    tag: 'CORPORATE ACCENT',
    accentColor: '#2563EB',
    fontFamily: 'sans',
    headerLayout: 'left',
  },

  // ==========================================
  // MINIMALIST SWISS SUITE
  // ==========================================
  {
    id: 'minimal_left',
    name: 'Minimal Left',
    category: 'Simple',
    desc: 'Pure Swiss typography with generous breathing room, muted gray contact labels, and crisp letter hierarchy.',
    tag: 'SWISS MINIMAL',
    accentColor: '#475569',
    fontFamily: 'sans',
    headerLayout: 'left',
  },
  {
    id: 'minimal_centered',
    name: 'Minimal Centered',
    category: 'Popular',
    desc: 'Centered executive letterhead with bullet-separated contact details and balanced formal justification.',
    tag: 'EXECUTIVE SERIF',
    accentColor: '#0F172A',
    fontFamily: 'serif',
    headerLayout: 'centered',
  },
  {
    id: 'minimal_column',
    name: 'Minimal Column',
    category: 'Modern',
    desc: 'Asymmetrical two-column design: sender & recipient metadata in left rail, letter text in wide right column.',
    tag: '2-COLUMN GRID',
    accentColor: '#1C152E',
    fontFamily: 'sans',
    headerLayout: 'column',
  },
  {
    id: 'profile_column',
    name: 'Profile Column',
    category: 'Modern',
    desc: 'Structured left rail containing contact details, avatar, and recipient card with structured letter column.',
    tag: 'PORTFOLIO RAIL',
    accentColor: '#3B82F6',
    fontFamily: 'sans',
    headerLayout: 'column',
  },

  // ==========================================
  // MODERN CONTEMPORARY SUITE
  // ==========================================
  {
    id: 'modern_left',
    name: 'Modern Left',
    category: 'Modern',
    desc: 'Contemporary layout with vibrant left border bar, bold sender name, and pill-shaped contact tags.',
    tag: 'TECH CONTEMPORARY',
    accentColor: '#4F46E5',
    fontFamily: 'sans',
    headerLayout: 'left',
  },
  {
    id: 'modern_centered',
    name: 'Modern Centered',
    category: 'Modern',
    desc: 'Clean center-aligned top banner with modern typography and geometric spacing.',
    tag: 'GEOMETRIC',
    accentColor: '#0D9488',
    fontFamily: 'sans',
    headerLayout: 'centered',
  },
  {
    id: 'modern_accent',
    name: 'Modern Accent',
    category: 'Popular',
    desc: 'Deep indigo accent theme with bold subject line callout and colored contact icon indicators.',
    tag: 'INDIGO BOLD',
    accentColor: '#6366F1',
    fontFamily: 'sans',
    headerLayout: 'left',
  },
  {
    id: 'modern_header',
    name: 'Modern Header',
    category: 'Popular',
    desc: 'Full-bleed slate navy top banner with crisp white sender typography and pristine white letter body.',
    tag: 'NAVY BANNER',
    accentColor: '#0F2841',
    fontFamily: 'sans',
    headerLayout: 'banner',
  },
  {
    id: 'modern_photo',
    name: 'Modern Photo',
    category: 'Creative',
    desc: 'Includes candidate avatar/headshot beside contact information, ideal for design, creative, and consulting roles.',
    tag: 'WITH PHOTO',
    accentColor: '#1C152E',
    fontFamily: 'sans',
    headerLayout: 'left',
  },

  // ==========================================
  // CREATIVE & SIGNATURE SUITE
  // ==========================================
  {
    id: 'dark_leaves_border',
    name: 'Dark Leaves Border',
    category: 'Creative',
    desc: 'Signature FlowCV botanical leaf margin strip down the left edge, paired with flawless editorial letter styling.',
    tag: 'BOTANICAL LEAVES',
    accentColor: '#064E3B',
    fontFamily: 'sans',
    headerLayout: 'leaves',
  },
  {
    id: 'executive_sidebar',
    name: 'Executive Sidebar',
    category: 'Modern',
    desc: 'Solid navy left column with candidate branding, recipient details in sidebar, and executive letter text.',
    tag: 'C-SUITE SIDEBAR',
    accentColor: '#0B1E36',
    fontFamily: 'sans',
    headerLayout: 'sidebar',
  },
  {
    id: 'atlantic_blue',
    name: 'Atlantic Blue',
    category: 'Modern',
    desc: 'Refined deep navy header with sky blue highlights and crisp modern typography.',
    tag: 'ATLANTIC BLUE',
    accentColor: '#0F2841',
    fontFamily: 'sans',
    headerLayout: 'banner',
  },
  {
    id: 'rosewood_split',
    name: 'Rosewood Split',
    category: 'Creative',
    desc: 'Warm burgundy header accents with split recipient layout, paired with classic serif typography.',
    tag: 'ROSEWOOD WARMTH',
    accentColor: '#881337',
    fontFamily: 'serif',
    headerLayout: 'split',
  },
  {
    id: 'minty_minimal',
    name: 'Minty Minimal',
    category: 'Creative',
    desc: 'Subtle sage/emerald accent line with minimalist clean aesthetics and airy paragraph spacing.',
    tag: 'SAGE MINT',
    accentColor: '#0D9488',
    fontFamily: 'sans',
    headerLayout: 'left',
  },
  {
    id: 'elite_classic',
    name: 'Harvard & McKinsey Classic',
    category: 'Simple',
    desc: 'Formal Ivy-League traditional standard: centered header, formal roman serif font, and publication layout.',
    tag: 'IVY LEAGUE',
    accentColor: '#18181B',
    fontFamily: 'serif',
    headerLayout: 'centered',
  },
];
