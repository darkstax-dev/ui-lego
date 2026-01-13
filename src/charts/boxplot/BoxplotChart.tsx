import React from 'react';
import { ResponsiveBoxPlot } from '@nivo/boxplot';
import { ChartColorPalette, getPalette, resolvePalette } from '../palette';
import './BoxplotChart.css';

export interface BoxplotDataPoint {
  group: string;
  subgroup?: string;
  mu?: number;
  sd?: number;
  n?: number;
  value?: number;
}

export interface BoxplotChartProps {
  data: BoxplotDataPoint[];
  palette?: string | ChartColorPalette;
  width?: number;
  height?: number;
  layout?: 'horizontal' | 'vertical';
  minValue?: number | 'auto';
  maxValue?: number | 'auto';
  subGroupBy?: string;
  padding?: number;
  innerPadding?: number;
  borderRadius?: number;
  borderWidth?: number;
  borderColor?: string;
  medianWidth?: number;
  medianColor?: string;
  whiskerWidth?: number;
  whiskerColor?: string;
  enableGridX?: boolean;
  enableGridY?: boolean;
  isInteractive?: boolean;
  animate?: boolean;
  onBoxClick?: (box: any) => void;
  className?: string;
  margin?: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
}

export const BoxplotChart: React.FC<BoxplotChartProps> = ({
  data,
  palette = 'default',
  width,
  height = 400,
  layout = 'vertical',
  minValue = 'auto',
  maxValue = 'auto',
  subGroupBy,
  padding = 0.12,
  innerPadding = 3,
  borderRadius = 2,
  borderWidth = 2,
  borderColor = 'inherit',
  medianWidth = 2,
  medianColor = 'var(--color-blue-dark-950)',
  whiskerWidth = 2,
  whiskerColor = 'inherit',
  enableGridX = true,
  enableGridY = true,
  isInteractive = true,
  animate = true,
  onBoxClick,
  className = '',
  margin = { top: 60, right: 80, bottom: 60, left: 80 },
}) => {
  // Resolve the color palette
  const colorPalette = typeof palette === 'string' ? getPalette(palette) : palette;
  const resolvedPalette = resolvePalette(colorPalette);

  return (
    <div className={`boxplot-chart ${className}`}>
      <div className="boxplot-chart__container" style={{ height }}>
        <ResponsiveBoxPlot
          data={data}
          margin={margin}
          layout={layout}
          minValue={minValue}
          maxValue={maxValue}
          subGroupBy={subGroupBy}
          padding={padding}
          innerPadding={innerPadding}
          borderRadius={borderRadius}
          borderWidth={borderWidth}
          borderColor={{ from: 'color' }}
          medianWidth={medianWidth}
          medianColor={{ from: 'color', modifiers: [['darker', 0.3]] }}
          whiskerWidth={whiskerWidth}
          whiskerColor={{ from: 'color' }}
          colors={resolvedPalette.colors}
          enableGridX={enableGridX}
          enableGridY={enableGridY}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: layout === 'vertical' ? 'group' : 'value',
            legendPosition: 'middle',
            legendOffset: 32,
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: layout === 'vertical' ? 'value' : 'group',
            legendPosition: 'middle',
            legendOffset: -40,
          }}
          motionConfig={animate ? 'gentle' : 'instant'}
          isInteractive={isInteractive}
          {...(onBoxClick && { onClick: onBoxClick })}
          theme={{
            background: 'transparent',
            text: {
              fontFamily: 'var(--font-family-macan-mono)',
              fontSize: 12,
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
                  fontSize: 12,
                  fill: 'var(--Text-Blue-text-Main-text)',
                },
              },
            },
            grid: {
              line: {
                stroke: '#C8C8C8',
                strokeWidth: 1,
                strokeDasharray: '3.2 3.2',
              },
            },
            tooltip: {
              container: {
                background: resolvedPalette.background || '#ffffff',
                border: `1px solid ${resolvedPalette.border || '#ddd'}`,
                fontSize: '14px',
                fontFamily: 'var(--font-family-macan-mono)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default BoxplotChart;
