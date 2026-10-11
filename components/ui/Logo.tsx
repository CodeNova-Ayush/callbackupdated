'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  showTagline?: boolean;
}

export function Logo({ className = '', size = 'md', showText = true, showTagline = false }: LogoProps) {
  const iconSizes = {
    sm: 'w-6 h-6',
    md: 'w-7 h-7 sm:w-8 sm:h-8',
    lg: 'w-9 h-9 sm:w-10 sm:h-10',
  };

  const textSizes = {
    sm: 'text-base sm:text-lg',
    md: 'text-lg sm:text-xl',
    lg: 'text-2xl sm:text-3xl',
  };

  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-2.5 font-bold tracking-tight text-slate-900 hover:opacity-90 transition-opacity select-none group ${className}`}
    >
      {/* PW Official Emblem */}
      <div className={`relative flex items-center justify-center shrink-0 ${iconSizes[size]}`}>
        <Image
          src="/images/pw-logo.png"
          alt="PW Logo"
          width={40}
          height={40}
          className="w-full h-full object-contain rounded-full shadow-2xs group-hover:scale-105 transition-transform duration-200"
          priority
        />
      </div>

      {/* Minimal YC-Level Wordmark (No .ai, Clean Grotesque Sans) */}
      {showText && (
        <div className="flex flex-col text-left">
          <div className="flex items-center leading-none">
            <span
              className={`text-slate-950 font-bold tracking-[-0.035em] font-sans ${textSizes[size]}`}
            >
              Callback
            </span>
          </div>
          {showTagline && (
            <span className="text-[9px] text-slate-400 font-semibold tracking-wider uppercase mt-0.5 font-sans hidden sm:inline">
              Autonomous Resume Agent
            </span>
          )}
        </div>
      )}
    </Link>
  );
}

export default Logo;
