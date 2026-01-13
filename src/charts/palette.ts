/**
 * Chart Color Palettes
 * Defines color schemes for chart components using CSS variables
 */

export interface ChartColorPalette {
  name: string;
  colors: string[];
  background?: string;
  text?: string;
  border?: string;
}

/**
 * Resolves a CSS variable to its computed value
 * @param cssVar - CSS variable in format 'var(--variable-name)' or a direct color value
 * @returns The resolved color value or the original string if not a CSS variable
 */
export const resolveColor = (cssVar: string): string => {
  if (!cssVar || !cssVar.startsWith('var(')) {
    return cssVar;
  }

  // Extract variable name from var(--variable-name)
  const match = cssVar.match(/var\((--[^)]+)\)/);
  if (!match) return cssVar;

  const variableName = match[1];

  // Try to get computed style from document
  if (typeof window !== 'undefined' && document.documentElement) {
    const computedValue = getComputedStyle(document.documentElement)
      .getPropertyValue(variableName)
      .trim();
    
    if (computedValue) {
      return computedValue;
    }
  }

  // Fallback values for common variables
  const fallbackColors: Record<string, string> = {
    '--Primary-Blue-primary-Main': '#0066FF',
    '--Primary-Blue-primary-Light': '#3385FF',
    '--Primary-Blue-primary-Dark': '#0052CC',
    '--Secondary-Green-secondary-Main': '#00CC66',
    '--Secondary-Green-secondary-Light': '#33D685',
    '--Secondary-Green-secondary-Dark': '#00A352',
    '--Secondary-Purple-secondary-Main': '#9933FF',
    '--Secondary-Purple-secondary-Light': '#AD5CFF',
    '--Secondary-Purple-secondary-Dark': '#7A29CC',
    '--Secondary-Orange-secondary-Main': '#FF9933',
    '--Secondary-Orange-secondary-Light': '#FFAD5C',
    '--Secondary-Orange-secondary-Dark': '#CC7A29',
    '--Secondary-Red-secondary-Main': '#FF3366',
    '--Secondary-Red-secondary-Light': '#FF5C85',
    '--Secondary-Red-secondary-Dark': '#CC2952',
    '--Secondary-Yellow-secondary-Main': '#FFCC00',
    '--Secondary-Yellow-secondary-Light': '#FFD633',
    '--Secondary-Yellow-secondary-Dark': '#CCA300',
    '--Secondary-Teal-secondary-Main': '#00CCCC',
    '--Secondary-Teal-secondary-Light': '#33D6D6',
    '--Secondary-Teal-secondary-Dark': '#00A3A3',
    '--Secondary-Pink-secondary-Main': '#FF66CC',
    '--Secondary-Pink-secondary-Light': '#FF85D6',
    '--Secondary-Pink-secondary-Dark': '#CC52A3',
    '--Text-Blue-text-Main-text': '#1A1A1A',
    '--Text-Blue-text-Secondary-text': '#666666',
    '--Background-Blue-background-Main-background': '#FFFFFF',
    '--Background-Blue-background-Secondary-background': '#F5F5F5',
    '--Border-Blue-border-Main-border': '#E0E0E0',
  };

  return fallbackColors[variableName] || cssVar;
};

/**
 * Resolves all CSS variables in a palette to their computed values
 * @param palette - Palette with CSS variables
 * @returns Palette with resolved color values
 */
export const resolvePalette = (palette: ChartColorPalette): ChartColorPalette => {
  return {
    ...palette,
    colors: palette.colors.map(resolveColor),
    background: palette.background ? resolveColor(palette.background) : undefined,
    text: palette.text ? resolveColor(palette.text) : undefined,
    border: palette.border ? resolveColor(palette.border) : undefined,
  };
};

/**
 * Default color palette
 * Uses primary and secondary brand colors
 */
export const defaultPalette: ChartColorPalette = {
  name: 'default',
  colors: [
    'var(--Primary-Blue-primary-Main)',
    'var(--Secondary-Green-secondary-Main)',
    'var(--Secondary-Purple-secondary-Main)',
    'var(--Secondary-Orange-secondary-Main)',
    'var(--Secondary-Red-secondary-Main)',
    'var(--Secondary-Yellow-secondary-Main)',
    'var(--Secondary-Teal-secondary-Main)',
    'var(--Secondary-Pink-secondary-Main)',
  ],
  background: 'var(--Background-Blue-background-Main-background)',
  text: 'var(--Text-Blue-text-Main-text)',
  border: 'var(--Border-Blue-border-Main-border)',
};

/**
 * Blue-focused color palette
 * Various shades of blue for monochromatic charts
 */
export const bluePalette: ChartColorPalette = {
  name: 'blue',
  colors: [
    'var(--Primary-Blue-primary-Main)',
    'var(--Primary-Blue-primary-Light)',
    'var(--Primary-Blue-primary-Dark)',
    'var(--Secondary-Teal-secondary-Main)',
    'var(--Secondary-Teal-secondary-Light)',
    'var(--Secondary-Purple-secondary-Main)',
    'var(--Secondary-Purple-secondary-Light)',
    'var(--Secondary-Purple-secondary-Dark)',
  ],
  background: 'var(--Background-Blue-background-Main-background)',
  text: 'var(--Text-Blue-text-Main-text)',
  border: 'var(--Border-Blue-border-Main-border)',
};

/**
 * Warm color palette
 * Warm tones (reds, oranges, yellows)
 */
export const warmPalette: ChartColorPalette = {
  name: 'warm',
  colors: [
    'var(--Secondary-Red-secondary-Main)',
    'var(--Secondary-Orange-secondary-Main)',
    'var(--Secondary-Yellow-secondary-Main)',
    'var(--Secondary-Red-secondary-Light)',
    'var(--Secondary-Orange-secondary-Light)',
    'var(--Secondary-Yellow-secondary-Light)',
    'var(--Secondary-Red-secondary-Dark)',
    'var(--Secondary-Orange-secondary-Dark)',
  ],
  background: 'var(--Background-Blue-background-Main-background)',
  text: 'var(--Text-Blue-text-Main-text)',
  border: 'var(--Border-Blue-border-Main-border)',
};

/**
 * Cool color palette
 * Cool tones (blues, greens, purples)
 */
export const coolPalette: ChartColorPalette = {
  name: 'cool',
  colors: [
    'var(--Primary-Blue-primary-Main)',
    'var(--Secondary-Green-secondary-Main)',
    'var(--Secondary-Purple-secondary-Main)',
    'var(--Secondary-Teal-secondary-Main)',
    'var(--Primary-Blue-primary-Light)',
    'var(--Secondary-Green-secondary-Light)',
    'var(--Secondary-Purple-secondary-Light)',
    'var(--Secondary-Teal-secondary-Light)',
  ],
  background: 'var(--Background-Blue-background-Main-background)',
  text: 'var(--Text-Blue-text-Main-text)',
  border: 'var(--Border-Blue-border-Main-border)',
};

/**
 * Collection of all available palettes
 */
export const chartPalettes: Record<string, ChartColorPalette> = {
  default: defaultPalette,
  blue: bluePalette,
  warm: warmPalette,
  cool: coolPalette,
};

/**
 * Get a palette by name
 * @param name - Name of the palette
 * @returns The requested palette or default palette if not found
 */
export const getPalette = (name: string): ChartColorPalette => {
  return chartPalettes[name] || defaultPalette;
};
