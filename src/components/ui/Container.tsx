import React from 'react';

interface ContainerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  children: React.ReactNode;
}

const sizeClasses = {
  sm: 'max-w-screen-sm',
  md: 'max-w-screen-md',
  lg: 'max-w-screen-lg',
  xl: 'max-w-screen-xl',
};

export default function Container({ size = 'xl', className = '', children }: ContainerProps) {
  const maxWidthClass = sizeClasses[size] || sizeClasses.xl;

  return (
    <div className={`mx-auto px-4 sm:px-6 lg:px-8 ${maxWidthClass} ${className}`}>
      {children}
    </div>
  );
}
