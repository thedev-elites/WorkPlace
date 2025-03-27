
import React from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
}

const GlassCard = ({ 
  children, 
  className, 
  hoverable = false,
  ...props 
}: GlassCardProps) => {
  return (
    <div 
      className={cn(
        "glass-card p-6 animate-scale-in", 
        hoverable && "transition-all duration-300 hover:shadow-lg hover:-translate-y-1",
        className
      )} 
      {...props}
    >
      {children}
    </div>
  );
};

export default GlassCard;
