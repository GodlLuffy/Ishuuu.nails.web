import React from 'react';
import Link from 'next/link';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'light';
  href?: string;
  target?: string;
  rel?: string;
  children: React.ReactNode;
  className?: string;
}

export function Button({
  variant = 'primary',
  href,
  target,
  rel,
  children,
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-xs font-semibold tracking-[0.14em] uppercase transition-all duration-300 cursor-pointer select-none';

  const variants = {
    primary: 'bg-[#1F1A18] text-white hover:bg-[#C5A059] shadow-sm hover:shadow-md hover:-translate-y-0.5',
    secondary: 'border border-[#1F1A18] text-[#1F1A18] bg-transparent hover:bg-[#1F1A18] hover:text-white hover:-translate-y-0.5',
    light: 'bg-[#FAF8F6] text-[#1F1A18] hover:bg-[#C5A059] hover:text-white shadow-sm hover:shadow-md hover:-translate-y-0.5',
  };

  const combinedClasses = `${baseStyles} ${variants[variant]} ${className}`.trim();

  if (href) {
    if (href.startsWith('http') || href.startsWith('tel:') || href.startsWith('mailto:') || href.startsWith('https://wa.me')) {
      return (
        <a href={href} target={target} rel={rel} className={combinedClasses}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={combinedClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button className={combinedClasses} {...props}>
      {children}
    </button>
  );
}
