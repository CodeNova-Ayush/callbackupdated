'use client';

import React, { memo, useRef, useState, useEffect } from 'react';
import { ResumeTemplateRenderer, TemplateId, MOCK_PERSONA } from './ResumeTemplates';

interface TemplateMicroPreviewProps {
  templateId: TemplateId | string;
  className?: string;
}

export const TemplateMicroPreview: React.FC<TemplateMicroPreviewProps> = memo(({
  templateId,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  // Default scale for typical card width (~360px / 794px ~ 0.46)
  const [scale, setScale] = useState<number>(0.46);

  useEffect(() => {
    if (!containerRef.current) return;

    const updateScale = () => {
      if (containerRef.current) {
        const cw = containerRef.current.clientWidth;
        if (cw > 0) {
          // Exactly scale 794px A4 width to card container width
          setScale(cw / 794);
        }
      }
    };

    updateScale();
    const observer = new ResizeObserver(updateScale);
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={`w-full h-full relative overflow-hidden bg-white select-none pointer-events-none ${className}`}
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
        className="bg-white shadow-none"
      >
        <ResumeTemplateRenderer
          templateId={templateId as TemplateId}
          data={MOCK_PERSONA as any}
          zoomLevel={100}
          isMicroPreview={true}
        />
      </div>
    </div>
  );
});

TemplateMicroPreview.displayName = 'TemplateMicroPreview';
