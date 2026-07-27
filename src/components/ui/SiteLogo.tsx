import React from 'react';

interface SiteLogoProps {
  size?: 'sm' | 'md';
}

export default function SiteLogo({ size = 'md' }: SiteLogoProps) {
  const svgSize = size === 'sm' ? 24 : 28;

  return (
    <div className="inline-flex items-center gap-2 select-none">
      <svg
        width={svgSize}
        height={svgSize}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="logoGradient" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
            <stop stopColor="#4f46e5" />
            <stop offset="1" stopColor="#06b6d4" />
          </linearGradient>
        </defs>
        <path
          d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z"
          fill="url(#logoGradient)"
        />
        <circle cx="12" cy="12" r="4" fill="url(#logoGradient)" />
        <path
          d="M12 8L16 12L12 16L8 12L12 8Z"
          fill="#ffffff"
        />
      </svg>
      <span className="font-bold text-text-primary text-xl tracking-tight">OmniFexa</span>
    </div>
  );
}
