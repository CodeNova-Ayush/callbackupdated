'use client';

import React from 'react';
import { CoverLetterItem } from '@/lib/client-cover-letter-store';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';

const LinkedinIcon: React.FC<{ className?: string }> = ({ className = 'w-3.5 h-3.5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
  </svg>
);

interface CoverLetterRendererProps {
  data: CoverLetterItem;
  isMicroPreview?: boolean;
  className?: string;
}

// Cursive handwritten signature SVG simulator
const HandwrittenSignature: React.FC<{ name: string; color?: string }> = ({
  name,
  color = '#1E3A8A',
}) => {
  return (
    <div className="relative py-1 select-none pointer-events-none">
      <svg
        viewBox="0 0 240 45"
        className="w-36 h-9 overflow-visible"
        style={{ filter: 'drop-shadow(0px 1px 1px rgba(0,0,0,0.04))' }}
      >
        <path
          d="M 10 32 C 26 8, 40 6, 52 26 C 60 42, 73 14, 86 24 C 96 32, 108 16, 120 26 C 130 34, 140 22, 152 28 C 166 34, 183 18, 196 26 C 203 30, 212 36, 222 38 M 36 30 Q 93 16, 188 26"
          fill="none"
          stroke={color}
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <text
          x="16"
          y="30"
          fontFamily="'Brush Script MT', 'Dancing Script', 'Caveat', cursive, sans-serif"
          fontSize="24"
          fontStyle="italic"
          fill={color}
          fontWeight="500"
          letterSpacing="1px"
        >
          {name}
        </text>
      </svg>
    </div>
  );
};

export const CoverLetterRenderer: React.FC<CoverLetterRendererProps> = ({
  data,
  isMicroPreview = false,
  className = '',
}) => {
  const { sender, recipient, letterDetails, style, templateId } = data;

  const fontClass =
    style?.fontFamily === 'serif'
      ? 'font-serif'
      : style?.fontFamily === 'mono'
      ? 'font-mono'
      : 'font-sans';

  const accentColor = style?.accentColor || '#1C152E';

  const isFullBleed = [
    'modern_header',
    'atlantic_blue',
    'executive_sidebar',
    'dark_leaves_border',
  ].includes(templateId);

  // Common Signature & Sign-Off Block
  const renderSignatureBlock = (align: 'left' | 'center' | 'right' = 'left', sigColor?: string) => (
    <div
      className={`flex flex-col mt-7 sm:mt-8 ${
        align === 'center' ? 'items-center text-center' : align === 'right' ? 'items-end text-right' : 'items-start text-left'
      }`}
    >
      <span className="text-slate-900 font-medium text-[13px]">{letterDetails.signOff || 'Sincerely,'}</span>
      <div className="my-0.5">
        <HandwrittenSignature
          name={letterDetails.signatureText || sender.fullName || 'Signature'}
          color={sigColor || (accentColor === '#1C152E' ? '#1E3A8A' : accentColor)}
        />
      </div>
      <span className="font-bold text-slate-950 text-[13px] tracking-tight">{sender.fullName}</span>
      {sender.jobTitle && <span className="text-slate-500 text-[11.5px] mt-0.5">{sender.jobTitle}</span>}
    </div>
  );

  // Common Paragraphs Body Block
  const renderBodyParagraphs = () => (
    <div className="flex flex-col gap-3.5 text-slate-700 text-[12.5px] sm:text-[13px] leading-[1.75] text-left">
      {letterDetails.body.map((para, idx) => (
        <p key={idx} className="whitespace-pre-line">
          {para}
        </p>
      ))}
    </div>
  );

  return (
    <div
      id={isMicroPreview ? undefined : 'cover-letter-print-sheet'}
      className={`bg-white text-slate-800 ${
        isMicroPreview ? 'shadow-none' : 'shadow-2xl rounded-xs print:shadow-none'
      } select-text box-border ${fontClass} ${className}`}
      style={{
        width: '794px',
        minHeight: '1123px',
        height: isMicroPreview ? '1123px' : undefined,
        maxWidth: '794px',
        padding: isFullBleed ? 0 : (isMicroPreview ? '40px 44px' : '52px 64px'),
        overflow: 'hidden',
        boxSizing: 'border-box',
      }}
    >
      {/* =========================================================================
          1. CLASSIC LEFT (The FlowCV Flagship Left-Aligned Format)
         ========================================================================= */}
      {(templateId === 'classic_left' || !templateId) && (
        <div className="flex flex-col text-[12.5px] leading-relaxed">
          {/* Sender Info (Left Stacked) */}
          <div className="flex flex-col gap-0.5 text-slate-600 text-[12px] mb-5">
            <h1 className="text-[24px] font-bold text-slate-950 tracking-tight leading-tight">
              {sender.fullName}
            </h1>
            {sender.jobTitle && (
              <span className="text-[13px] font-semibold text-slate-700">{sender.jobTitle}</span>
            )}
            {sender.address && <span>{sender.address}</span>}
            {sender.city && <span>{sender.city}</span>}
            {sender.email && <span>{sender.email}</span>}
            {sender.phone && <span>{sender.phone}</span>}
          </div>

          {/* Date */}
          <div className="text-slate-800 font-medium text-[12px] mb-5">
            {letterDetails.date}
          </div>

          {/* Recipient Info */}
          <div className="flex flex-col gap-0.5 text-slate-600 text-[12px] mb-6">
            <span className="font-bold text-slate-950 text-[13px]">{recipient.name}</span>
            {recipient.title && <span>{recipient.title}</span>}
            {recipient.department && <span>{recipient.department}</span>}
            <span className="font-semibold text-slate-800">{recipient.company}</span>
            {recipient.address && <span>{recipient.address}</span>}
            {recipient.city && <span>{recipient.city}</span>}
          </div>

          {/* Subject Line */}
          {letterDetails.subject && (
            <div className="text-[15px] font-bold text-slate-950 tracking-tight mb-4">
              {letterDetails.subject}
            </div>
          )}

          {/* Salutation */}
          <div className="text-slate-900 font-medium text-[13px] mb-3.5">
            {letterDetails.salutation}
          </div>

          {/* Body Paragraphs */}
          {renderBodyParagraphs()}

          {/* Sign-Off & Signature */}
          {renderSignatureBlock('left')}
        </div>
      )}

      {/* =========================================================================
          2. CLASSIC SPLIT (Sender Top-Right, Recipient Top-Left)
         ========================================================================= */}
      {templateId === 'classic_split' && (
        <div className="flex flex-col text-[12.5px] leading-relaxed">
          {/* Top Split Header: Recipient (Left) vs Sender (Right) */}
          <div className="flex justify-between items-start mb-6">
            <div className="flex flex-col gap-0.5 text-slate-600 text-[12px]">
              <span className="font-bold text-slate-950 text-[13px]">{recipient.name}</span>
              {recipient.title && <span>{recipient.title}</span>}
              {recipient.department && <span>{recipient.department}</span>}
              <span className="font-semibold text-slate-800">{recipient.company}</span>
              {recipient.address && <span>{recipient.address}</span>}
              {recipient.city && <span>{recipient.city}</span>}
            </div>

            <div className="flex flex-col items-end gap-0.5 text-slate-600 text-[12px] text-right">
              <h1 className="text-[24px] font-bold text-slate-950 tracking-tight leading-tight">
                {sender.fullName}
              </h1>
              {sender.jobTitle && (
                <span className="text-[13px] font-semibold text-slate-700">{sender.jobTitle}</span>
              )}
              {sender.address && <span>{sender.address}</span>}
              {sender.city && <span>{sender.city}</span>}
              {sender.email && <span>{sender.email}</span>}
              {sender.phone && <span>{sender.phone}</span>}
              <span className="text-slate-900 font-medium mt-1">{letterDetails.date}</span>
            </div>
          </div>

          {/* Subject Line */}
          {letterDetails.subject && (
            <div className="text-[15px] font-bold text-slate-950 tracking-tight mb-4 border-b border-slate-200 pb-2">
              {letterDetails.subject}
            </div>
          )}

          {/* Salutation */}
          <div className="text-slate-900 font-medium text-[13px] mb-3.5">
            {letterDetails.salutation}
          </div>

          {/* Body Paragraphs */}
          {renderBodyParagraphs()}

          {/* Sign-Off & Signature */}
          {renderSignatureBlock('left')}
        </div>
      )}

      {/* =========================================================================
          3. CLASSIC RIGHT (Sender Information Fully Right-Aligned)
         ========================================================================= */}
      {templateId === 'classic_right' && (
        <div className="flex flex-col text-[12.5px] leading-relaxed">
          {/* Sender on Right */}
          <div className="flex flex-col items-end text-right gap-0.5 text-slate-600 text-[12px] mb-5">
            <h1 className="text-[24px] font-bold text-slate-950 tracking-tight leading-tight">
              {sender.fullName}
            </h1>
            {sender.jobTitle && <span className="text-[13px] font-semibold text-slate-700">{sender.jobTitle}</span>}
            {sender.address && <span>{sender.address}</span>}
            {sender.city && <span>{sender.city}</span>}
            {sender.email && <span>{sender.email}</span>}
            {sender.phone && <span>{sender.phone}</span>}
            <span className="text-slate-900 font-medium mt-1">{letterDetails.date}</span>
          </div>

          {/* Recipient on Left */}
          <div className="flex flex-col gap-0.5 text-slate-600 text-[12px] mb-6">
            <span className="font-bold text-slate-950 text-[13px]">{recipient.name}</span>
            {recipient.title && <span>{recipient.title}</span>}
            {recipient.department && <span>{recipient.department}</span>}
            <span className="font-semibold text-slate-800">{recipient.company}</span>
            {recipient.address && <span>{recipient.address}</span>}
            {recipient.city && <span>{recipient.city}</span>}
          </div>

          {/* Subject Line */}
          {letterDetails.subject && (
            <div className="text-[15px] font-bold text-slate-950 tracking-tight mb-4">
              {letterDetails.subject}
            </div>
          )}

          {/* Salutation */}
          <div className="text-slate-900 font-medium text-[13px] mb-3.5">
            {letterDetails.salutation}
          </div>

          {/* Body Paragraphs */}
          {renderBodyParagraphs()}

          {/* Sign-Off & Signature */}
          {renderSignatureBlock('left')}
        </div>
      )}

      {/* =========================================================================
          4. CLASSIC COMPACT (Inline Horizontal Sender Header with Hairline Rule)
         ========================================================================= */}
      {templateId === 'classic_compact' && (
        <div className="flex flex-col text-[12.5px] leading-relaxed">
          {/* Compact Header */}
          <div className="border-b border-slate-300 pb-3.5 mb-5 flex justify-between items-baseline">
            <div>
              <h1 className="text-[24px] font-extrabold text-slate-950 tracking-tight">
                {sender.fullName}
              </h1>
              {sender.jobTitle && <span className="text-[13px] font-medium text-slate-600 block">{sender.jobTitle}</span>}
            </div>
            <div className="text-[11.5px] text-slate-600 text-right flex flex-col items-end">
              <span>{sender.email} • {sender.phone}</span>
              <span>{sender.city || sender.address}</span>
            </div>
          </div>

          {/* Date & Recipient Grid */}
          <div className="grid grid-cols-2 gap-4 mb-5">
            <div className="flex flex-col gap-0.5 text-slate-600 text-[12px]">
              <span className="font-bold text-slate-950 text-[13px]">{recipient.name}</span>
              {recipient.title && <span>{recipient.title}</span>}
              <span className="font-semibold text-slate-800">{recipient.company}</span>
              {recipient.city && <span>{recipient.city}</span>}
            </div>
            <div className="text-right text-[12px] text-slate-900 font-medium">
              {letterDetails.date}
            </div>
          </div>

          {/* Subject */}
          {letterDetails.subject && (
            <div className="text-[15px] font-bold text-slate-950 tracking-tight mb-4">
              {letterDetails.subject}
            </div>
          )}

          {/* Salutation */}
          <div className="text-slate-900 font-medium text-[13px] mb-3.5">
            {letterDetails.salutation}
          </div>

          {/* Body */}
          {renderBodyParagraphs()}

          {/* Sign-Off */}
          {renderSignatureBlock('left')}
        </div>
      )}

      {/* =========================================================================
          5. CLASSIC BOLD (Huge Bold Header Statement)
         ========================================================================= */}
      {templateId === 'classic_bold' && (
        <div className="flex flex-col text-[12.5px] leading-relaxed">
          {/* Bold Header */}
          <div className="border-b-2 border-slate-950 pb-3.5 mb-5 flex flex-col gap-1">
            <h1 className="text-[28px] font-black uppercase text-slate-950 tracking-tight leading-none">
              {sender.fullName}
            </h1>
            <div className="flex justify-between items-baseline mt-1 text-[12px] text-slate-600">
              <span className="font-bold uppercase tracking-wider text-slate-900">{sender.jobTitle}</span>
              <span className="flex items-center gap-2">
                <span>{sender.email}</span>
                <span>•</span>
                <span>{sender.phone}</span>
                <span>•</span>
                <span>{sender.city}</span>
              </span>
            </div>
          </div>

          {/* Recipient & Date */}
          <div className="flex justify-between items-start mb-5 text-[12px]">
            <div className="flex flex-col gap-0.5 text-slate-600">
              <span className="font-bold text-slate-950 text-[13px]">{recipient.name}</span>
              {recipient.title && <span>{recipient.title}</span>}
              <span className="font-semibold text-slate-800">{recipient.company}</span>
              {recipient.city && <span>{recipient.city}</span>}
            </div>
            <span className="font-bold text-slate-900">{letterDetails.date}</span>
          </div>

          {/* Subject */}
          {letterDetails.subject && (
            <div className="text-[15px] font-black uppercase tracking-wide text-slate-950 mb-4">
              {letterDetails.subject}
            </div>
          )}

          <div className="text-slate-900 font-bold text-[13px] mb-3.5">
            {letterDetails.salutation}
          </div>

          {renderBodyParagraphs()}
          {renderSignatureBlock('left')}
        </div>
      )}

      {/* =========================================================================
          6. CLASSIC DIVIDER & MINIMAL CENTERED (Centered Elegant Serif)
         ========================================================================= */}
      {(templateId === 'classic_divider' || templateId === 'minimal_centered' || templateId === 'elite_classic') && (
        <div className="flex flex-col text-[12.5px] leading-relaxed font-serif">
          {/* Centered Monogram Header */}
          <div className="text-center border-b border-slate-900 pb-4 mb-5 flex flex-col items-center gap-1 font-serif">
            <h1 className="text-[26px] font-bold tracking-wider uppercase text-slate-950">
              {sender.fullName}
            </h1>
            {sender.jobTitle && (
              <span className="text-[13px] italic text-slate-700">{sender.jobTitle}</span>
            )}
            <div className="text-[11.5px] text-slate-600 flex justify-center flex-wrap gap-3 mt-1 font-sans">
              {sender.address && <span>{sender.address}</span>}
              {sender.city && <span>• {sender.city}</span>}
              <span>• {sender.email}</span>
              <span>• {sender.phone}</span>
            </div>
          </div>

          {/* Date & Recipient */}
          <div className="flex justify-between items-start mb-5 font-sans text-[12px]">
            <div className="flex flex-col gap-0.5 text-slate-600">
              <span className="font-bold text-slate-950 text-[13px] font-serif">{recipient.name}</span>
              {recipient.title && <span>{recipient.title}</span>}
              <span className="font-semibold text-slate-800">{recipient.company}</span>
              {recipient.address && <span>{recipient.address}</span>}
              {recipient.city && <span>{recipient.city}</span>}
            </div>
            <span className="font-medium text-slate-800">{letterDetails.date}</span>
          </div>

          {/* Subject Line */}
          {letterDetails.subject && (
            <div className="text-[15px] font-bold text-slate-950 tracking-tight mb-4 font-serif border-b border-slate-200 pb-1.5">
              {letterDetails.subject}
            </div>
          )}

          <div className="text-slate-900 font-medium text-[13px] mb-3.5 font-serif">
            {letterDetails.salutation}
          </div>

          <div className="font-sans">
            {renderBodyParagraphs()}
          </div>

          {renderSignatureBlock('left')}
        </div>
      )}

      {/* =========================================================================
          7. CLASSIC ACCENT & MODERN ACCENT (Vertical / Border Accent Bar)
         ========================================================================= */}
      {(templateId === 'classic_accent' || templateId === 'modern_accent') && (
        <div className="flex flex-col text-[12.5px] leading-relaxed">
          {/* Header with Accent Border */}
          <div className="flex justify-between items-start border-b-2 pb-4 mb-5" style={{ borderColor: accentColor }}>
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-12 rounded-full" style={{ backgroundColor: accentColor }} />
              <div>
                <h1 className="text-[24px] font-extrabold text-slate-950 tracking-tight">
                  {sender.fullName}
                </h1>
                {sender.jobTitle && (
                  <span className="text-[12.5px] font-bold uppercase tracking-wider text-slate-500">
                    {sender.jobTitle}
                  </span>
                )}
              </div>
            </div>

            <div className="text-[11.5px] text-slate-600 text-right flex flex-col items-end">
              <span>{sender.email}</span>
              <span>{sender.phone}</span>
              <span>{sender.city}</span>
            </div>
          </div>

          {/* Recipient & Date */}
          <div className="flex justify-between items-start mb-5 text-[12px]">
            <div className="flex flex-col gap-0.5 text-slate-600">
              <span className="font-bold text-slate-950 text-[13px]">{recipient.name}</span>
              {recipient.title && <span>{recipient.title}</span>}
              <span className="font-semibold text-slate-800">{recipient.company}</span>
              {recipient.address && <span>{recipient.address}</span>}
              {recipient.city && <span>{recipient.city}</span>}
            </div>
            <span className="font-medium text-slate-800">{letterDetails.date}</span>
          </div>

          {/* Subject */}
          {letterDetails.subject && (
            <div className="text-[15px] font-bold text-slate-950 tracking-tight mb-4">
              {letterDetails.subject}
            </div>
          )}

          <div className="text-slate-900 font-medium text-[13px] mb-3.5">
            {letterDetails.salutation}
          </div>

          {renderBodyParagraphs()}
          {renderSignatureBlock('left')}
        </div>
      )}

      {/* =========================================================================
          8. MINIMAL COLUMN & PROFILE COLUMN (2-Column Left Contact Column)
         ========================================================================= */}
      {(templateId === 'minimal_column' || templateId === 'profile_column') && (
        <div className="grid grid-cols-12 gap-8 text-[12.5px] leading-relaxed">
          {/* Left Metadata Column */}
          <div className="col-span-4 border-r border-slate-200 pr-6 flex flex-col gap-6 text-[12px]">
            <div className="flex flex-col gap-1">
              {templateId === 'profile_column' && sender.avatarUrl && (
                <img
                  src={sender.avatarUrl}
                  alt={sender.fullName}
                  className="w-16 h-16 rounded-full object-cover mb-2 border-2 border-slate-200"
                />
              )}
              <h1 className="text-[20px] font-bold text-slate-950 tracking-tight leading-tight">
                {sender.fullName}
              </h1>
              {sender.jobTitle && (
                <span className="text-[12px] font-semibold text-slate-600">{sender.jobTitle}</span>
              )}
            </div>

            <div className="flex flex-col gap-2 pt-2 border-t border-slate-100 text-slate-600">
              <span className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="truncate">{sender.email}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>{sender.phone}</span>
              </span>
              {sender.city && (
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{sender.city}</span>
                </span>
              )}
              {sender.linkedin && (
                <span className="flex items-center gap-1.5">
                  <LinkedinIcon className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{sender.linkedin}</span>
                </span>
              )}
            </div>

            {/* Recipient Details in Left Column */}
            <div className="flex flex-col gap-1 pt-4 border-t border-slate-200">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Addressed To</span>
              <span className="font-bold text-slate-950 text-[13px]">{recipient.name}</span>
              {recipient.title && <span className="text-slate-600">{recipient.title}</span>}
              <span className="font-semibold text-slate-800">{recipient.company}</span>
              {recipient.city && <span className="text-slate-500">{recipient.city}</span>}
            </div>

            <div className="pt-2 text-slate-400 font-medium">
              <span>{letterDetails.date}</span>
            </div>
          </div>

          {/* Right Letter Body Column */}
          <div className="col-span-8 flex flex-col py-1">
            {letterDetails.subject && (
              <div className="text-[15px] font-bold text-slate-950 tracking-tight mb-4">
                {letterDetails.subject}
              </div>
            )}

            <div className="text-slate-900 font-medium text-[13px] mb-3.5">
              {letterDetails.salutation}
            </div>

            {renderBodyParagraphs()}
            {renderSignatureBlock('left')}
          </div>
        </div>
      )}

      {/* =========================================================================
          9. MODERN HEADER & ATLANTIC BLUE (Full-Bleed Colored Top Banner)
         ========================================================================= */}
      {(templateId === 'modern_header' || templateId === 'atlantic_blue') && (
        <div className="flex flex-col w-full text-[12.5px]">
          {/* Solid Header Banner */}
          <div
            className="text-white p-9 pb-7 flex justify-between items-end"
            style={{ backgroundColor: templateId === 'atlantic_blue' ? '#0F2841' : accentColor }}
          >
            <div>
              <h1 className="text-[26px] font-extrabold tracking-tight text-white leading-tight">
                {sender.fullName}
              </h1>
              {sender.jobTitle && (
                <span className="text-[13px] text-slate-300 font-medium tracking-wide">
                  {sender.jobTitle}
                </span>
              )}
            </div>
            <div className="text-right text-[12px] text-slate-200 flex flex-col items-end">
              <span>{sender.email}</span>
              <span>{sender.phone}</span>
              <span>{sender.city}</span>
            </div>
          </div>

          {/* Sheet Body Content */}
          <div className="p-12 pt-8 flex flex-col text-[12.5px] sm:text-[13px]">
            <div className="flex justify-between items-start text-[12px] mb-6">
              <div className="flex flex-col gap-0.5 text-slate-600">
                <span className="font-bold text-slate-950 text-[13px]">{recipient.name}</span>
                {recipient.title && <span>{recipient.title}</span>}
                <span className="font-semibold text-slate-800">{recipient.company}</span>
                {recipient.address && <span>{recipient.address}</span>}
                {recipient.city && <span>{recipient.city}</span>}
              </div>
              <span className="font-bold text-slate-900">{letterDetails.date}</span>
            </div>

            {letterDetails.subject && (
              <div className="text-[15px] font-bold text-slate-950 tracking-tight mb-4">
                {letterDetails.subject}
              </div>
            )}

            <div className="text-slate-900 font-medium text-[13px] mb-3.5">
              {letterDetails.salutation}
            </div>

            {renderBodyParagraphs()}
            {renderSignatureBlock('left', templateId === 'atlantic_blue' ? '#0F2841' : accentColor)}
          </div>
        </div>
      )}

      {/* =========================================================================
          10. DARK LEAVES BORDER (FlowCV Botanical Nature Motif)
         ========================================================================= */}
      {templateId === 'dark_leaves_border' && (
        <div className="flex flex-col w-full text-[12.5px]">
          {/* Nature Leaves Header Image Strip */}
          <div className="w-full h-24 bg-emerald-950 relative overflow-hidden flex items-center justify-between px-8 text-white">
            <img
              src="/images/templates/leaves-strip.png"
              alt="Botanical border"
              className="absolute inset-0 w-full h-full object-cover opacity-60"
            />
            <div className="relative z-10">
              <h1 className="text-[26px] font-serif font-bold text-white tracking-wide">
                {sender.fullName}
              </h1>
              {sender.jobTitle && (
                <span className="text-[12px] text-emerald-200 tracking-wider uppercase font-semibold">
                  {sender.jobTitle}
                </span>
              )}
            </div>
            <div className="relative z-10 text-right text-[11.5px] text-emerald-100">
              <span>{sender.email}</span>
              <br />
              <span>{sender.phone}</span>
            </div>
          </div>

          {/* Letter Body Area */}
          <div className="p-12 pl-10 flex flex-col text-[12.5px] sm:text-[13px]">
            <div className="flex justify-between items-start border-b border-emerald-900/20 pb-4 mb-5 text-[12px]">
              <div className="flex flex-col gap-0.5 text-slate-600">
                <span className="font-bold text-slate-950 text-[13px]">{recipient.name}</span>
                {recipient.title && <span>{recipient.title}</span>}
                <span className="font-semibold text-slate-800">{recipient.company}</span>
                {recipient.city && <span>{recipient.city}</span>}
              </div>
              <span className="font-semibold text-emerald-900">{letterDetails.date}</span>
            </div>

            {letterDetails.subject && (
              <div className="text-[15px] font-bold text-slate-950 tracking-tight mb-4">
                {letterDetails.subject}
              </div>
            )}

            <div className="text-slate-900 font-medium text-[13px] mb-3.5">
              {letterDetails.salutation}
            </div>

            {renderBodyParagraphs()}
            {renderSignatureBlock('left', '#064E3B')}
          </div>
        </div>
      )}

      {/* =========================================================================
          11. EXECUTIVE SIDEBAR (FlowCV Dark Left Column)
         ========================================================================= */}
      {templateId === 'executive_sidebar' && (
        <div className="grid grid-cols-12 min-h-[1123px] text-[12.5px]">
          {/* Left Dark Blue Sidebar */}
          <div className="col-span-4 bg-[#0B1E36] text-white p-8 flex flex-col gap-6 text-[12px]">
            <div className="flex flex-col gap-1">
              <h1 className="text-[22px] font-extrabold text-white tracking-tight leading-tight">
                {sender.fullName}
              </h1>
              {sender.jobTitle && (
                <span className="text-[12px] font-medium text-slate-300">{sender.jobTitle}</span>
              )}
            </div>

            <div className="flex flex-col gap-2.5 pt-4 border-t border-slate-700 text-slate-300">
              <span className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="truncate">{sender.email}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>{sender.phone}</span>
              </span>
              {sender.city && (
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{sender.city}</span>
                </span>
              )}
            </div>

            <div className="flex flex-col gap-1 pt-6 border-t border-slate-700">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Recipient</span>
              <span className="font-bold text-white text-[13px]">{recipient.name}</span>
              {recipient.title && <span className="text-slate-300">{recipient.title}</span>}
              <span className="font-semibold text-slate-200">{recipient.company}</span>
              {recipient.city && <span className="text-slate-400">{recipient.city}</span>}
            </div>

            <div className="pt-2 text-slate-400 font-medium">
              <span>{letterDetails.date}</span>
            </div>
          </div>

          {/* Right White Column */}
          <div className="col-span-8 p-12 pl-10 flex flex-col text-[12.5px] sm:text-[13px] bg-white">
            {letterDetails.subject && (
              <div className="text-[15px] font-bold text-slate-950 tracking-tight mb-4 border-b border-slate-200 pb-2">
                {letterDetails.subject}
              </div>
            )}

            <div className="text-slate-900 font-medium text-[13px] mb-3.5">
              {letterDetails.salutation}
            </div>

            {renderBodyParagraphs()}
            {renderSignatureBlock('left', '#0B1E36')}
          </div>
        </div>
      )}

      {/* =========================================================================
          12. MINIMAL LEFT & MODERN LEFT
         ========================================================================= */}
      {(templateId === 'minimal_left' || templateId === 'modern_left') && (
        <div className="flex flex-col text-[12.5px] leading-relaxed">
          {/* Clean Modern Bar Header */}
          <div className="flex justify-between items-start border-b-2 border-slate-900 pb-4 mb-5">
            <div>
              <h1 className="text-[26px] font-black tracking-tight text-slate-950 leading-tight">
                {sender.fullName}
              </h1>
              {sender.jobTitle && (
                <span className="text-[13px] font-bold uppercase tracking-widest text-slate-500">
                  {sender.jobTitle}
                </span>
              )}
            </div>
            <div className="text-[12px] text-slate-600 text-right flex flex-col items-end">
              <span>{sender.email}</span>
              <span>{sender.phone}</span>
              <span>{sender.city}</span>
            </div>
          </div>

          {/* Recipient & Date */}
          <div className="flex justify-between items-start mb-5 text-[12px]">
            <div className="flex flex-col gap-0.5 text-slate-600">
              <span className="font-bold text-slate-950 text-[13px]">{recipient.name}</span>
              {recipient.title && <span>{recipient.title}</span>}
              <span className="font-semibold text-slate-800">{recipient.company}</span>
              {recipient.city && <span>{recipient.city}</span>}
            </div>
            <span className="font-bold text-slate-900">{letterDetails.date}</span>
          </div>

          {/* Subject */}
          {letterDetails.subject && (
            <div className="text-[15px] font-bold text-slate-950 tracking-tight mb-4">
              {letterDetails.subject}
            </div>
          )}

          <div className="text-slate-900 font-medium text-[13px] mb-3.5">
            {letterDetails.salutation}
          </div>

          {renderBodyParagraphs()}
          {renderSignatureBlock('left')}
        </div>
      )}

      {/* =========================================================================
          13. FALLBACK / ALL OTHER TEMPLATES (Rosewood, Minty, Modern Photo, etc.)
         ========================================================================= */}
      {![
        'classic_left',
        'classic_split',
        'classic_right',
        'classic_compact',
        'classic_bold',
        'classic_divider',
        'classic_accent',
        'minimal_left',
        'minimal_centered',
        'minimal_column',
        'profile_column',
        'modern_left',
        'modern_accent',
        'modern_header',
        'dark_leaves_border',
        'executive_sidebar',
        'atlantic_blue',
        'elite_classic',
      ].includes(templateId) && (
        <div className="flex flex-col text-[12.5px] leading-relaxed">
          {/* Header */}
          <div className="flex justify-between items-start border-b pb-4 mb-5" style={{ borderColor: accentColor }}>
            <div>
              <h1 className="text-[25px] font-bold text-slate-950 tracking-tight">
                {sender.fullName}
              </h1>
              {sender.jobTitle && (
                <span className="text-[13px] font-semibold" style={{ color: accentColor }}>
                  {sender.jobTitle}
                </span>
              )}
            </div>
            <div className="text-[12px] text-slate-600 text-right flex flex-col items-end">
              <span>{sender.email}</span>
              <span>{sender.phone}</span>
              <span>{sender.city}</span>
            </div>
          </div>

          {/* Recipient & Date */}
          <div className="flex justify-between items-start mb-5 text-[12px]">
            <div className="flex flex-col gap-0.5 text-slate-600">
              <span className="font-bold text-slate-950 text-[13px]">{recipient.name}</span>
              {recipient.title && <span>{recipient.title}</span>}
              <span className="font-semibold text-slate-800">{recipient.company}</span>
              {recipient.city && <span>{recipient.city}</span>}
            </div>
            <span className="font-medium text-slate-800">{letterDetails.date}</span>
          </div>

          {/* Subject */}
          {letterDetails.subject && (
            <div className="text-[15px] font-bold text-slate-950 tracking-tight mb-4">
              {letterDetails.subject}
            </div>
          )}

          <div className="text-slate-900 font-medium text-[13px] mb-3.5">
            {letterDetails.salutation}
          </div>

          {renderBodyParagraphs()}
          {renderSignatureBlock('left')}
        </div>
      )}
    </div>
  );
};
