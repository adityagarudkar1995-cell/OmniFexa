import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
}

const variantClasses = {
  primary: 'bg-primary-600 text-white hover:bg-primary-700 shadow-sm border border-transparent',
  secondary: 'bg-surface-100 text-text-primary border border-border-default hover:bg-surface-200',
  ghost: 'text-text-secondary hover:text-text-primary hover:bg-surface-100 border border-transparent',
};

const sizeClasses = {
  sm: 'h-9 px-3 text-sm rounded-lg',
  md: 'h-11 px-5 text-sm rounded-xl',
  lg: 'h-12 px-6 text-base rounded-xl',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  href,
  className = '',
  children,
  ...props
}: ButtonProps & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const baseClasses = 'inline-flex items-center justify-center gap-2 font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2';
  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  if (href) {
    return (
      <a href={href} className={combinedClasses} {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </a>
    );
  }

  return (
    <button className={combinedClasses} {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
