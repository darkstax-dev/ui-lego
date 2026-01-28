import { useEffect, useState } from 'react';

export type Theme = 'light' | 'dark' | 'system';

const THEME_STORAGE_KEY = 'darkstax-theme-preference';

/**
 * Custom hook for managing theme (light/dark mode)
 * Supports system preference detection and manual override
 */
export function useTheme() {
  // For visual testing we allow forcing the initial theme via URL:
  //   ?theme=light or ?theme=dark
  // When a theme is forced by URL, we do NOT persist it to localStorage.
  const [shouldPersist] = useState(() => {
    const urlTheme = new URLSearchParams(window.location.search).get('theme');
    return urlTheme !== 'light' && urlTheme !== 'dark';
  });

  const [theme, setTheme] = useState<Theme>(() => {
    const urlTheme = new URLSearchParams(window.location.search).get('theme');
    if (urlTheme === 'light' || urlTheme === 'dark') return urlTheme;

    // Check localStorage for saved preference
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null;
    return savedTheme || 'system';
  });

  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const root = document.documentElement;

    const effectiveTheme: 'light' | 'dark' =
      theme === 'system'
        ? window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light'
        : theme;

    setResolvedTheme(effectiveTheme);

    // Apply theme to document
    if (effectiveTheme === 'dark') {
      root.setAttribute('data-theme', 'dark');
    } else {
      root.removeAttribute('data-theme');
    }

    // Save preference
    if (shouldPersist) {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    }
  }, [theme, shouldPersist]);

  // Listen for system preference changes when in system mode
  useEffect(() => {
    if (!shouldPersist) return;
    if (theme !== 'system') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (e: MediaQueryListEvent) => {
      const root = document.documentElement;
      const newTheme = e.matches ? 'dark' : 'light';
      setResolvedTheme(newTheme);

      if (newTheme === 'dark') {
        root.setAttribute('data-theme', 'dark');
      } else {
        root.removeAttribute('data-theme');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme, shouldPersist]);

  const toggleTheme = () => {
    setTheme((current) => {
      if (current === 'light') return 'dark';
      if (current === 'dark') return 'system';
      return 'light';
    });
  };

  return {
    theme,
    resolvedTheme,
    setTheme,
    toggleTheme,
  };
}
