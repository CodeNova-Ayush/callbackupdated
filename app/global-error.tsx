'use client';

import React from 'react';
import Link from 'next/link';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#F5F9FB] flex flex-col items-center justify-center p-6 text-center font-sans">
        <div className="max-w-md bg-white p-8 rounded-3xl border border-slate-200 shadow-xl flex flex-col items-center">
          <h2 className="text-2xl font-black text-slate-900 mb-2">Application Error</h2>
          <p className="text-sm text-slate-600 mb-6">
            A critical error occurred. Please refresh or return to the main dashboard.
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => reset()}
              className="px-5 py-2.5 bg-[#1C152E] text-white text-xs font-bold rounded-xl shadow cursor-pointer"
            >
              Reload Page
            </button>
            <Link
              href="/"
              className="px-5 py-2.5 bg-slate-100 text-slate-700 text-xs font-bold rounded-xl border border-slate-200"
            >
              Go to Home
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
