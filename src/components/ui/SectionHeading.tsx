import React from 'react';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  badge?: string;
  align?: 'left' | 'center';
}

export default function SectionHeading({
  title,
  subtitle,
  badge,
  align = 'center',
}: SectionHeadingProps) {
  return (
    <div className={`flex flex-col ${align === 'center' ? 'items-center text-center' : 'items-start text-left'}`}>
      {badge && (
        <span className="mb-3 text-sm font-semibold tracking-wide uppercase text-primary-600">
          {badge}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl font-bold text-text-primary">
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-3 text-lg text-text-secondary max-w-2xl ${align === 'center' ? 'mx-auto' : ''}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
