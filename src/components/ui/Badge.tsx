import React from 'react';

interface BadgeProps {
  variant?: 'default' | 'primary' | 'status';
  className?: string;
  children: React.ReactNode;
}

const variantClasses = {
  default: 'bg-surface-100 text-text-secondary border border-border-default',
  primary: 'bg-primary-50 text-primary-600 dark:bg-primary-900/30 dark:border-primary-800 border border-transparent',
  status: 'bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800',
};

export default function Badge({ variant = 'default', className = '', children }: BadgeProps) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${variantClasses[variant]} ${className}`}>
      {children}
    </span>
  );
}
