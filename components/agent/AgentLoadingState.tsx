'use client';

import React from 'react';
import { Bot, Sparkles } from 'lucide-react';

interface AgentLoadingStateProps {
  candidateName?: string;
  statusText?: string;
}

export const AgentLoadingState: React.FC<AgentLoadingStateProps> = ({
  candidateName = 'Candidate',
  statusText = 'Grounding response against verified records & RAG vector index...',
}) => {
  return (
    <div className="flex items-start gap-3.5 my-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
      {/* Radiating Spinner Mascot Avatar */}
      <div className="relative w-10 h-10 rounded-full bg-[#1C152E] text-white flex items-center justify-center shrink-0 shadow-[0_4px_16px_rgba(28,21,46,0.25)] border border-white/40">
        <Bot className="w-5 h-5 animate-pulse" />
        <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[#FF4B5E] border-2 border-white ring-1 ring-[#FF4B5E]/30 animate-ping" />
      </div>

      {/* Loading Bubble with Radiating Blade Spinner */}
      <div className="px-5 py-3.5 bg-white/90 backdrop-blur-xl border border-slate-200/80 rounded-2xl rounded-tl-xs shadow-xs text-xs font-semibold text-slate-700 flex items-center gap-4">
        {/* Custom Radiating 10-blade Spinner (Uiverse) */}
        <div className="agent-radiating-spinner shrink-0">
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
        </div>

        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-1.5 text-[#FF4B5E] font-black text-[11px] uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 animate-spin" />
            <span>{candidateName}'s Agent Thinking</span>
          </div>
          <span className="text-slate-500 text-[11.5px] font-medium">{statusText}</span>
        </div>
      </div>
    </div>
  );
};
