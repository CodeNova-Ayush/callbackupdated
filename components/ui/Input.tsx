import React from 'react';
import { clsx } from 'clsx';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  rightAction?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, rightAction, className, id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-xs font-semibold text-slate-700 tracking-tight">
            {label}
          </label>
        )}
        <div className="relative w-full flex items-center">
          <input
            id={inputId}
            ref={ref}
            className={clsx(
              'w-full bg-white border rounded-xl text-sm text-slate-900 transition-all placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1C152E]/15 focus:border-[#1C152E] shadow-2xs',
              rightAction ? 'pl-3.5 pr-10 py-2.5' : 'px-3.5 py-2.5',
              error ? 'border-rose-400 text-rose-900 focus:border-rose-500 focus:ring-rose-500/15' : 'border-slate-200/90 hover:border-slate-300',
              className
            )}
            {...props}
          />
          {rightAction && (
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center shrink-0">
              {rightAction}
            </div>
          )}
        </div>
        {error && <span className="text-xs text-rose-600 font-medium">{error}</span>}
        {helperText && !error && <span className="text-xs text-slate-500">{helperText}</span>}
      </div>
    );
  }
);
Input.displayName = 'Input';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  rightAction?: React.ReactNode;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, helperText, rightAction, className, id, rows = 3, ...props }, ref) => {
    const textareaId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full flex flex-col gap-1.5">
        {(label || rightAction) && (
          <div className="flex items-center justify-between">
            {label && (
              <label htmlFor={textareaId} className="text-xs font-semibold text-gray-700 tracking-wide">
                {label}
              </label>
            )}
            {rightAction && (
              <div className="shrink-0">{rightAction}</div>
            )}
          </div>
        )}
        <textarea
          id={textareaId}
          ref={ref}
          rows={rows}
          className={clsx(
            'w-full px-3 py-2 text-base sm:text-sm bg-white border rounded-lg transition-colors placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1C152E]/20 focus:border-[#1C152E]',
            error ? 'border-red-500 text-red-900 focus:border-red-500 focus:ring-red-500/20' : 'border-gray-300 text-gray-900',
            className
          )}
          {...props}
        />
        {error && <span className="text-xs text-red-600">{error}</span>}
        {helperText && !error && <span className="text-xs text-gray-500">{helperText}</span>}
      </div>
    );
  }
);
Textarea.displayName = 'Textarea';
