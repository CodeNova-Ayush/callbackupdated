import React from 'react';
import { clsx } from 'clsx';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'danger' | 'glass' | 'glass-teal' | 'slide-teal';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  slideText?: React.ReactNode;
  slideRightIcon?: React.ReactNode;
  showCartoon?: boolean;
}

// Crisp, Vibrant Cartoon AI Agent Mascot
export const CartoonAgentMascot = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <span className={clsx('relative inline-flex items-center justify-center shrink-0 transition-transform duration-300 ease-out group-hover/btn:scale-125 group-hover/btn:-rotate-12', className)}>
    <svg
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full drop-shadow-md"
    >
      {/* Antenna with Glowing Gold Bulb */}
      <line x1="18" y1="2" x2="18" y2="7" stroke="#FFE600" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="18" cy="3" r="2.5" fill="#FFE600" />

      {/* Glossy White Robot Head with Dark Navy Border */}
      <rect x="4" y="7" width="28" height="24" rx="8" fill="#FFFFFF" stroke="#002936" strokeWidth="2" />

      {/* Visor Screen (Deep Midnight Blue) */}
      <rect x="7" y="10" width="22" height="14" rx="5" fill="#061A23" />

      {/* Cartoon Glowing Eyes */}
      <circle cx="13" cy="17" r="2.8" fill="#00F5D4" />
      <circle cx="23" cy="17" r="2.8" fill="#00F5D4" />
      
      {/* Eye Pupils */}
      <circle cx="13.5" cy="16.5" r="1.3" fill="#003847" />
      <circle cx="23.5" cy="16.5" r="1.3" fill="#003847" />

      {/* Eye Sparkles */}
      <circle cx="12.2" cy="15.5" r="0.9" fill="#FFFFFF" />
      <circle cx="22.2" cy="15.5" r="0.9" fill="#FFFFFF" />

      {/* Blushing Pink Cheeks */}
      <circle cx="10" cy="20.5" r="1.8" fill="#FF4D6D" />
      <circle cx="26" cy="20.5" r="1.8" fill="#FF4D6D" />

      {/* Smiling Mouth */}
      <path
        d="M15.5 19.5 Q18 22.5 20.5 19.5"
        stroke="#FFE600"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />

      {/* Ear Screws */}
      <rect x="1" y="15" width="3.5" height="7" rx="1.75" fill="#FFE600" />
      <rect x="31.5" y="15" width="3.5" height="7" rx="1.75" fill="#FFE600" />
    </svg>
  </span>
);

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  slideText,
  slideRightIcon,
  showCartoon = false,
  className,
  disabled,
  ...props
}) => {
  const baseStyles =
    'group/btn relative inline-flex items-center justify-center font-bold rounded-xl transition-all duration-300 ease-out active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none cursor-pointer overflow-hidden';

  const sizeStyles = {
    sm: 'px-3.5 py-2 text-xs gap-1.5 min-h-[38px] h-[38px]',
    md: 'px-5 py-2.5 text-xs sm:text-sm gap-2 min-h-[42px] h-[42px]',
    lg: 'px-7 py-3 text-sm sm:text-base gap-2.5 min-h-[48px] h-[48px]',
  };

  const variantStyles = {
    primary:
      'bg-[#1C152E] hover:bg-[#2B1F45] text-white shadow-sm focus:ring-[#1C152E]',
    secondary:
      'bg-white hover:bg-slate-50 text-slate-800 border border-slate-200/90 hover:border-slate-300 shadow-2xs focus:ring-[#1C152E]',
    tertiary:
      'bg-transparent hover:bg-slate-100 text-slate-700 hover:text-slate-900 focus:ring-[#1C152E]',
    danger:
      'bg-[#FF4B5E] hover:bg-[#E62A55] text-white shadow-xs focus:ring-[#FF4B5E]',
    glass:
      'bg-white/90 hover:bg-white backdrop-blur-xl text-slate-900 hover:text-[#1C152E] border border-slate-200/90 hover:border-slate-300 shadow-2xs focus:ring-[#1C152E]',
    'glass-teal':
      'bg-[#FFF0F3] hover:bg-[#FF4B5E] text-[#FF4B5E] hover:text-white border border-[#FFCCD5] hover:border-transparent shadow-2xs focus:ring-[#FF4B5E]',
    'slide-teal':
      'bg-[#1C152E] hover:bg-[#2B1F45] text-white border border-[#1C152E]/25 shadow-sm focus:ring-[#1C152E]',
  };

  const isSlideVariant = variant === 'slide-teal' || !!slideText;
  
  // Hover text only swaps if explicit slideText is provided
  const hoverText = slideText || (typeof children === 'string' ? children : '');

  const mascot = showCartoon ? <CartoonAgentMascot className="w-5 h-5 mr-1" /> : leftIcon;

  // Text color based on variant
  const textColor = variant === 'secondary' || variant === 'tertiary' || variant === 'glass' 
    ? 'text-slate-800 group-hover/btn:text-slate-950' 
    : 'text-white';

  if (isSlideVariant && !isLoading) {
    return (
      <button
        type={props.type || 'button'}
        className={clsx(baseStyles, sizeStyles[size], variantStyles[variant], className)}
        disabled={disabled}
        {...props}
      >
        {/* Layer 1: Resting Content (Mascot + Label + Icon) */}
        <span className={clsx("inline-flex items-center justify-center gap-2 font-black transition-all duration-300 ease-out group-hover/btn:translate-y-[-140%] group-hover/btn:opacity-0", textColor)}>
          {mascot}
          <span className="tracking-tight whitespace-nowrap text-inherit">{children}</span>
          {rightIcon && (
            <span className="shrink-0 inline-flex items-center transition-transform duration-300">
              {rightIcon}
            </span>
          )}
        </span>

        {/* Layer 2: Hover Content (Mascot + Premium Swap Label + Icon) */}
        <span className={clsx("absolute inset-0 flex items-center justify-center gap-2 font-black transition-all duration-300 ease-out translate-y-[140%] opacity-0 group-hover/btn:translate-y-0 group-hover/btn:opacity-100", textColor)}>
          {mascot}
          <span className="tracking-tight whitespace-nowrap text-inherit">{hoverText}</span>
          {(slideRightIcon || rightIcon) && (
            <span className="shrink-0 inline-flex items-center transition-transform duration-300 group-hover/btn:translate-x-1">
              {slideRightIcon || rightIcon}
            </span>
          )}
        </span>
      </button>
    );
  }

  return (
    <button
      className={clsx(baseStyles, sizeStyles[size], variantStyles[variant], className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin text-current shrink-0" />
      ) : mascot ? (
        <span className="shrink-0 inline-flex items-center">{mascot}</span>
      ) : null}
      <span className={clsx("inline-flex items-center font-black tracking-tight whitespace-nowrap", textColor)}>{children}</span>
      {!isLoading && rightIcon && (
        <span className="shrink-0 inline-flex items-center transition-transform duration-200 group-hover/btn:translate-x-1">
          {rightIcon}
        </span>
      )}
    </button>
  );
};
