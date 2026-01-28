import { useEffect, useState } from 'react';

export type Theme = 'light' | 'dark' | 'system';

const THEME_STORAGE_KEY = 'darkstax-theme-preference';

/**
 * Custom hook for managing theme (light/dark mode)
 * Supports system preference detection and manual override
 */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    // Check localStorage for saved preference
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null;
    return savedTheme || 'system';
  });

  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const root = document.documentElement;
    
    // Determine the actual theme to apply
    let effectiveTheme: 'light' | 'dark' = 'light';
    
    if (theme === 'system') {
      // Use system preference
      effectiveTheme = window.matchMedia('(prefers-color-scheme: dark)').matches 
        ? 'dark' 
        : 'light';
    } else {
      effectiveTheme = theme;
    }

    setResolvedTheme(effectiveTheme);

    // Apply theme to document
    if (effectiveTheme === 'dark') {
      root.setAttribute('data-theme', 'dark');
    } else {
      root.removeAttribute('data-theme');
    }

    // Save preference
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  // Listen for system preference changes when in system mode
  useEffect(() => {
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
  }, [theme]);

  const toggleTheme = () => {
    setTheme(current => {
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
