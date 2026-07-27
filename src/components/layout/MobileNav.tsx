'use client';

import { useEffect } from 'react';
import { X } from 'lucide-react';
import { ThemeToggle } from '@/components/theme/ThemeToggle';

interface NavItem {
  label: string;
  href: string;
}

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  navItems?: NavItem[];
}

export default function MobileNav({ isOpen, onClose, navItems = [] }: MobileNavProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        className={`fixed right-0 top-0 bottom-0 w-[280px] max-w-[85vw] bg-surface-0 z-50 shadow-lg transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        <div className="flex items-center justify-end p-4 h-16 border-b border-border-default">
          <button
            onClick={onClose}
            className="flex items-center justify-center min-w-[44px] min-h-[44px] rounded-full text-text-secondary hover:text-text-primary hover:bg-surface-100 transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-4 space-y-2">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={onClose}
              className="flex items-center px-4 min-h-[44px] text-text-primary hover:text-primary-600 font-medium rounded-lg hover:bg-surface-100 transition-colors"
            >
              {item.label}
            </a>
          ))}
          {/* Fallback items if none provided */}
          {navItems.length === 0 && (
            <>
              <a
                href="#featured-tools"
                onClick={onClose}
                className="flex items-center px-4 min-h-[44px] text-text-primary hover:text-primary-600 font-medium rounded-lg hover:bg-surface-100 transition-colors"
              >
                Tools
              </a>
              <a
                href="#categories"
                onClick={onClose}
                className="flex items-center px-4 min-h-[44px] text-text-primary hover:text-primary-600 font-medium rounded-lg hover:bg-surface-100 transition-colors"
              >
                Categories
              </a>
            </>
          )}
        </nav>

        <div className="p-4 border-t border-border-default flex items-center justify-between">
          <span className="text-sm font-medium text-text-secondary">Theme</span>
          <ThemeToggle />
        </div>
      </div>
    </>
  );
}
