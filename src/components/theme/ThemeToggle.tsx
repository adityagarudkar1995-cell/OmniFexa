'use client';

import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from './ThemeProvider';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const cycleTheme = () => {
    const next = theme === 'system' ? 'light' : theme === 'light' ? 'dark' : 'system';
    setTheme(next);
  };

  const label =
    theme === 'system'
      ? 'Theme: System preference'
      : theme === 'light'
        ? 'Theme: Light mode'
        : 'Theme: Dark mode';

  return (
    <button
      onClick={cycleTheme}
      aria-label={label}
      title={label}
      className="flex h-11 w-11 items-center justify-center rounded-xl
                 text-text-secondary hover:text-text-primary
                 hover:bg-surface-100 transition-colors duration-200
                 focus-visible:outline-2 focus-visible:outline-primary-500"
    >
      {theme === 'system' && <Monitor className="h-5 w-5" aria-hidden="true" />}
      {theme === 'light' && <Sun className="h-5 w-5" aria-hidden="true" />}
      {theme === 'dark' && <Moon className="h-5 w-5" aria-hidden="true" />}
    </button>
  );
}
