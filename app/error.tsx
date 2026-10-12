'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { AlertCircle, RotateCcw, Home } from 'lucide-react';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Application Error Boundary caught error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#F5F9FB] flex flex-col items-center justify-center p-6 text-center select-none">
      <div className="w-16 h-16 rounded-3xl bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center mb-6 shadow-sm">
        <AlertCircle className="w-8 h-8" />
      </div>

      <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-2">
        Something went wrong
      </h1>
      <p className="text-sm text-slate-600 max-w-md mb-8 leading-relaxed">
        An unexpected error occurred while loading this page. You can reload this view or navigate back to your workspace.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => reset()}
          className="h-11 px-6 bg-[#1C152E] hover:bg-[#2A2045] active:scale-95 text-white text-sm font-bold rounded-2xl shadow-sm flex items-center gap-2 cursor-pointer transition-all"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Try Again</span>
        </button>

        <Link
          href="/"
          className="h-11 px-6 bg-white hover:bg-slate-50 active:scale-95 text-slate-800 text-sm font-bold rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-2 cursor-pointer transition-all"
        >
          <Home className="w-4 h-4 text-slate-500" />
          <span>Return Home</span>
        </Link>
      </div>
    </div>
  );
}
