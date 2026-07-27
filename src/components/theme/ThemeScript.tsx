/**
 * Inline script to prevent flash of wrong theme.
 * Runs before React hydration by being injected as a raw <script> in the <head>.
 */
export function ThemeScript() {
  const themeScript = `
    (function() {
      try {
        var stored = localStorage.getItem('omnifexa-theme');
        var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        var theme = stored === 'dark' || stored === 'light' ? stored : (prefersDark ? 'dark' : 'light');
        document.documentElement.classList.add('theme-' + theme);
      } catch (e) {}
    })();
  `;

  return (
    <script
      dangerouslySetInnerHTML={{ __html: themeScript }}
      suppressHydrationWarning
    />
  );
}
