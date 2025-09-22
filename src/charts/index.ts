// Charts Library Exports
// Main entry point for all chart components and utilities

// Pie Chart exports
export { default as PieChart } from './pie/PieChart';
export { default as PieChartDemo } from './pie/PieChartDemo';
export type { PieChartProps, PieChartData } from './pie/PieChart';

// Bar Chart exports
export { default as BarChart } from './bar/BarChart';
export { default as BarChartDemo } from './bar/BarChartDemo';
export type { BarChartProps, BarChartData } from './bar/BarChart';

// Color Palette exports
export {
  defaultPalette,
  bluePalette,
  warmPalette,
  coolPalette,
  chartPalettes,
  getPalette,
  resolveColor,
  resolvePalette,
} from './palette';
export type { ChartColorPalette } from './palette';

// Re-export for convenience
export * from './pie/PieChart';
export * from './bar/BarChart';
export * from './palette';
