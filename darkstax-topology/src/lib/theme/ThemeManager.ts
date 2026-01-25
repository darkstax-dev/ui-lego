export interface TopologyTheme {
  name: string;
  colors: {
    background: string;
    foreground: string;
    primary: string;
    secondary: string;
    accent: string;
    muted: string;
    border: string;
    nodeTypes: {
      host: string;
      container: string;
      pod: string;
      service: string;
      network: string;
    };
    edgeTypes: {
      network: string;
      ownership: string;
      policy: string;
    };
    status: {
      up: string;
      down: string;
      warning: string;
    };
  };
}

export const themes: Record<string, TopologyTheme> = {
  light: {
    name: 'Light',
    colors: {
      background: '#ffffff',
      foreground: '#1f2937',
      primary: '#3b82f6',
      secondary: '#6b7280',
      accent: '#8b5cf6',
      muted: '#f3f4f6',
      border: '#e5e7eb',
      nodeTypes: {
        host: '#0072ff',
        container: '#2eb969',
        pod: '#ed8b30',
        service: '#00112b',
        network: '#ff3b31',
      },
      edgeTypes: {
        network: '#10b981',
        ownership: '#d1d5db',
        policy: '#ef4444',
      },
      status: {
        up: '#10b981',
        down: '#ef4444',
        warning: '#f59e0b',
      },
    },
  },
  dark: {
    name: 'Dark',
    colors: {
      background: '#111827',
      foreground: '#f9fafb',
      primary: '#60a5fa',
      secondary: '#9ca3af',
      accent: '#a78bfa',
      muted: '#1f2937',
      border: '#374151',
      nodeTypes: {
        host: '#3b82f6',
        container: '#34d399',
        pod: '#fbbf24',
        service: '#60a5fa',
        network: '#f87171',
      },
      edgeTypes: {
        network: '#34d399',
        ownership: '#6b7280',
        policy: '#f87171',
      },
      status: {
        up: '#34d399',
        down: '#f87171',
        warning: '#fbbf24',
      },
    },
  },
  highContrast: {
    name: 'High Contrast',
    colors: {
      background: '#000000',
      foreground: '#ffffff',
      primary: '#00ffff',
      secondary: '#ffff00',
      accent: '#ff00ff',
      muted: '#1a1a1a',
      border: '#ffffff',
      nodeTypes: {
        host: '#00ffff',
        container: '#00ff00',
        pod: '#ffff00',
        service: '#ff00ff',
        network: '#ff0000',
      },
      edgeTypes: {
        network: '#00ff00',
        ownership: '#ffffff',
        policy: '#ff0000',
      },
      status: {
        up: '#00ff00',
        down: '#ff0000',
        warning: '#ffff00',
      },
    },
  },
};

export class ThemeManager {
  private currentTheme: TopologyTheme;

  constructor(themeName: string = 'light') {
    this.currentTheme = themes[themeName] || themes.light;
  }

  setTheme(themeName: string) {
    if (themes[themeName]) {
      this.currentTheme = themes[themeName];
      this.applyTheme();
    }
  }

  getTheme(): TopologyTheme {
    return this.currentTheme;
  }

  private applyTheme() {
    const root = document.documentElement;
    
    Object.entries(this.currentTheme.colors).forEach(([key, value]) => {
      if (typeof value === 'string') {
        root.style.setProperty(`--topology-${key}`, value);
      } else if (typeof value === 'object') {
        Object.entries(value).forEach(([subKey, subValue]) => {
          root.style.setProperty(`--topology-${key}-${subKey}`, subValue);
        });
      }
    });
  }
}
