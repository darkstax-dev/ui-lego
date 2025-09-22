// Color palette configuration for charts
// Based on design tokens from tokens.css

export interface ChartColorPalette {
  name: string;
  colors: string[];
  background?: string;
  text?: string;
  border?: string;
}

// Default palette extracted from design tokens
export const defaultPalette: ChartColorPalette = {
  name: 'default',
  colors: [
    'var(--color-blue-dark-950)', // Dark blue for primary data
    'var(--color-yellow-600)',    // Orange for secondary data
    'var(--color-red-700)',       // Red for tertiary data
    'var(--color-green-800)',     // Green for quaternary data
    'var(--color-blue-800)',      // Medium blue for additional data
    'var(--color-yellow-500)',    // Yellow for additional data
    'var(--color-red-600)',       // Lighter red for additional data
    'var(--color-green-600)',     // Lighter green for additional data
  ],
  background: 'var(--Gray-200)',
  text: 'var(--Text-Blue-text-Main-text)',
  border: 'var(--Stroke-Table-header)',
};

// Alternative palettes for different chart themes
export const bluePalette: ChartColorPalette = {
  name: 'blue',
  colors: [
    'var(--color-blue-dark-950)',
    'var(--color-blue-medium-950)',
    'var(--color-blue-950)',
    'var(--color-blue-800)',
    'var(--color-blue-700)',
    'var(--color-blue-gray-600)',
    'var(--color-blue-gray-500)',
    'var(--color-blue-gray-400)',
  ],
  background: 'var(--Gray-200)',
  text: 'var(--Text-Blue-text-Main-text)',
  border: 'var(--Stroke-Table-header)',
};

export const warmPalette: ChartColorPalette = {
  name: 'warm',
  colors: [
    'var(--color-red-700)',
    'var(--color-yellow-600)',
    'var(--color-red-600)',
    'var(--color-yellow-500)',
    'var(--color-red-500)',
    'var(--color-yellow-400)',
    'var(--color-red-400)',
    'var(--color-yellow-300)',
  ],
  background: 'var(--Gray-200)',
  text: 'var(--Text-Blue-text-Main-text)',
  border: 'var(--Stroke-Table-header)',
};

export const coolPalette: ChartColorPalette = {
  name: 'cool',
  colors: [
    'var(--color-blue-dark-950)',
    'var(--color-green-800)',
    'var(--color-blue-800)',
    'var(--color-green-600)',
    'var(--color-blue-700)',
    'var(--color-green-500)',
    'var(--color-blue-gray-600)',
    'var(--color-green-400)',
  ],
  background: 'var(--Gray-200)',
  text: 'var(--Text-Blue-text-Main-text)',
  border: 'var(--Stroke-Table-header)',
};

// Collection of all available palettes
export const chartPalettes: Record<string, ChartColorPalette> = {
  default: defaultPalette,
  blue: bluePalette,
  warm: warmPalette,
  cool: coolPalette,
};

// Utility function to get a palette by name
export const getPalette = (name: string = 'default'): ChartColorPalette => {
  return chartPalettes[name] || defaultPalette;
};

// Utility function to get colors from CSS variables
export const resolveColor = (cssVar: string): string => {
  if (typeof window !== 'undefined') {
    const computed = getComputedStyle(document.documentElement).getPropertyValue(cssVar.replace('var(', '').replace(')', ''));
    return computed.trim() || cssVar;
  }
  return cssVar;
};

// Utility function to resolve all colors in a palette
export const resolvePalette = (palette: ChartColorPalette): ChartColorPalette => {
  return {
    ...palette,
    colors: palette.colors.map(resolveColor),
    background: palette.background ? resolveColor(palette.background) : undefined,
    text: palette.text ? resolveColor(palette.text) : undefined,
    border: palette.border ? resolveColor(palette.border) : undefined,
  };
};
