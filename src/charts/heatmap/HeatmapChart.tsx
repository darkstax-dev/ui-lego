import React from 'react';
import { ResponsiveHeatMap } from '@nivo/heatmap';
import { ChartColorPalette, getPalette, resolvePalette } from '../palette';
import './HeatmapChart.css';

export interface HeatmapDataPoint {
  x: string | number;
  y: number | null;
}

export interface HeatmapSerie {
  id: string;
  data: HeatmapDataPoint[];
}

export interface HeatmapChartProps {
  data: HeatmapSerie[];
  palette?: string | ChartColorPalette;
  width?: number;
  height?: number;
  valueFormat?: string | ((value: number) => string);
  forceSquare?: boolean;
  sizeVariation?: number;
  cellSpacing?: number;
  enableLabels?: boolean;
  labelTextColor?: string;
  enableGridX?: boolean;
  enableGridY?: boolean;
  isInteractive?: boolean;
  animate?: boolean;
  onCellClick?: (cell: any) => void;
  className?: string;
  margin?: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
}

export const HeatmapChart: React.FC<HeatmapChartProps> = ({
  data,
  palette = 'default',
  width,
  height = 400,
  valueFormat = '>-.2s',
  forceSquare = false,
  sizeVariation = 0,
  cellSpacing = 2,
  enableLabels = true,
  labelTextColor = 'inherit:darker(1.4)',
  enableGridX = false,
  enableGridY = false,
  isInteractive = true,
  animate = true,
  onCellClick,
  className = '',
  margin = { top: 60, right: 90, bottom: 60, left: 90 },
}) => {
  // Resolve the color palette
  const colorPalette = typeof palette === 'string' ? getPalette(palette) : palette;
  const resolvedPalette = resolvePalette(colorPalette);

  // Create a color function based on the palette
  const getColor = (cell: any) => {
    const value = cell.value;
    const maxValue = Math.max(...data.flatMap(serie => serie.data.map(d => d.y || 0)));
    const minValue = Math.min(...data.flatMap(serie => serie.data.map(d => d.y || 0)));
    const range = maxValue - minValue;
    const normalizedValue = range > 0 ? (value - minValue) / range : 0;
    
    // Map the normalized value to a color from the palette
    const colorIndex = Math.floor(normalizedValue * (resolvedPalette.colors.length - 1));
    return resolvedPalette.colors[Math.min(colorIndex, resolvedPalette.colors.length - 1)];
  };

  return (
    <div className={`heatmap-chart ${className}`}>
      <div className="heatmap-chart__container" style={{ height }}>
        <ResponsiveHeatMap
          data={data}
          margin={margin}
          valueFormat={valueFormat}
          colors={getColor}
          forceSquare={forceSquare}
          sizeVariation={sizeVariation as any}
          enableLabels={enableLabels}
          labelTextColor={{ from: 'color', modifiers: [['darker', 1.4]] }}
          axisTop={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: -90,
            legend: '',
            legendOffset: 46,
          }}
          axisRight={null}
          axisBottom={null}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: '',
            legendPosition: 'middle',
            legendOffset: -72,
          }}
          enableGridX={enableGridX}
          enableGridY={enableGridY}
          motionConfig={animate ? 'gentle' : 'instant'}
          isInteractive={isInteractive}
          {...(onCellClick && { onClick: onCellClick })}
          theme={{
            background: 'transparent',
            text: {
              fontFamily: 'var(--font-family-macan-mono)',
              fontSize: 11,
              fill: resolvedPalette.text || 'var(--Text-Blue-text-Main-text)',
            },
            axis: {
              domain: {
                line: {
                  stroke: '#777777',
                  strokeWidth: 0,
                },
              },
              legend: {
                text: {
                  fontFamily: 'var(--font-family-macan-mono)',
                  fontSize: 12,
                  fill: 'var(--Text-Gray-text-Main-text)',
                },
              },
              ticks: {
                line: {
                  stroke: '#777777',
                  strokeWidth: 1,
                },
                text: {
                  fontFamily: 'var(--font-family-macan-mono)',
                  fontSize: 11,
                  fill: 'var(--Text-Blue-text-Main-text)',
                },
              },
            },
            tooltip: {
              container: {
                background: resolvedPalette.background || '#ffffff',
                border: `1px solid ${resolvedPalette.border || '#ddd'}`,
                fontSize: '14px',
                fontFamily: 'var(--font-family-macan-mono)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                zIndex: 9999,
                position: 'relative',
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default HeatmapChart;
