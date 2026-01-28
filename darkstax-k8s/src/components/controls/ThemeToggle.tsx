import { Moon, Sun, Monitor } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

/**
 * Theme toggle button component
 * Cycles through: light -> dark -> system
 */
export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  const getIcon = () => {
    switch (theme) {
      case 'light':
        return <Sun className="w-5 h-5" />;
      case 'dark':
        return <Moon className="w-5 h-5" />;
      case 'system':
        return <Monitor className="w-5 h-5" />;
      default:
        return <Sun className="w-5 h-5" />;
    }
  };

  const getLabel = () => {
    switch (theme) {
      case 'light':
        return 'Switch to dark theme';
      case 'dark':
        return 'Switch to system theme';
      case 'system':
        return 'Switch to light theme';
      default:
        return 'Toggle theme';
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="w-9 h-9 flex items-center justify-center rounded hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 transition-colors"
      aria-label={getLabel()}
      title={getLabel()}
    >
      {getIcon()}
    </button>
  );
}
