'use client';

import React, { useRef, useState, useEffect } from 'react';
import { CoverLetterItem, FLOWCV_DEFAULT_COVER_LETTER } from '@/lib/client-cover-letter-store';
import { CoverLetterRenderer } from './CoverLetterRenderer';
import { CoverLetterTemplateMeta } from './CoverLetterTemplatesData';

interface CoverLetterMicroPreviewProps {
  template: CoverLetterTemplateMeta;
  customData?: Partial<CoverLetterItem>;
  className?: string;
}

export const CoverLetterMicroPreview: React.FC<CoverLetterMicroPreviewProps> = ({
  template,
  customData,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState<number>(0.28);

  useEffect(() => {
    if (!containerRef.current) return;

    const updateScale = () => {
      if (containerRef.current) {
        const width = containerRef.current.clientWidth;
        if (width > 0) {
          setScale(width / 794);
        }
      }
    };

    updateScale();

    const resizeObserver = new ResizeObserver(() => {
      updateScale();
    });

    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  // Assemble full data instance for rendering
  const previewData: CoverLetterItem = {
    id: `preview_${template.id}`,
    title: template.name,
    templateId: template.id,
    sender: {
      ...FLOWCV_DEFAULT_COVER_LETTER.sender,
      ...(customData?.sender || {}),
    },
    recipient: {
      ...FLOWCV_DEFAULT_COVER_LETTER.recipient,
      ...(customData?.recipient || {}),
    },
    letterDetails: {
      ...FLOWCV_DEFAULT_COVER_LETTER.letterDetails,
      ...(customData?.letterDetails || {}),
    },
    style: {
      ...FLOWCV_DEFAULT_COVER_LETTER.style,
      accentColor: template.accentColor,
      fontFamily: template.fontFamily,
      ...(customData?.style || {}),
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full aspect-[210/297] overflow-hidden rounded-md bg-white border border-slate-200/90 shadow-xs pointer-events-none select-none transition-shadow ${className}`}
    >
      <div
        style={{
          width: '794px',
          height: '1123px',
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
          position: 'absolute',
          top: 0,
          left: 0,
        }}
      >
        <CoverLetterRenderer data={previewData} isMicroPreview={true} />
      </div>
    </div>
  );
};
