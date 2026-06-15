import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input = ({ label, className = '', ...props }: InputProps) => {
  return (
    <div className="w-full flex flex-col gap-2">
      {label && <label className="text-xs font-medium text-text-secondary tracking-wider uppercase">{label}</label>}
      <input 
        className={`w-full bg-bg-primary text-text-primary border border-white/8 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-accent-primary/50 placeholder:text-text-secondary/40 transition-colors ${className}`}
        {...props}
      />
    </div>
  );
};