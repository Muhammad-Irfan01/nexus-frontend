import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  children: React.ReactNode;
}

export const Button = ({ variant = 'primary', children, className = '', ...props }: ButtonProps) => {
  const baseStyles = "px-6 py-3 rounded-lg font-medium text-sm transition-all duration-200 flex items-center justify-center gap-2 tracking-wide";
  
  const variants = {
    primary: "bg-accent-primary text-text-primary hover:bg-[#6b4ae6] shadow-[0_0_20px_rgba(124,92,252,0.3)] border border-white/10",
    secondary: "bg-bg-card text-text-primary border border-white/8 hover:bg-bg-secondary",
    ghost: "text-text-secondary hover:text-text-primary hover:bg-white/4"
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};