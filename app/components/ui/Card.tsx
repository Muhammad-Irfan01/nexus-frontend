import React from 'react';

export const Card = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => {
  return (
    <div className={`glass-card glass-glow-border rounded-nexus p-6 relative overflow-hidden ${className}`}>
      {children}
    </div>
  );
};