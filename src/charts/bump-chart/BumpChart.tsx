import React from 'react';
import { ResponsiveBump } from '@nivo/bump';
import { ChartColorPalette, getPalette, resolvePalette } from '../palette';
import './BumpChart.css';

export interface BumpDataPoint {
  x: number | string;
  y: number | null;
}

export interface BumpSerie {
  id: string;
  data: BumpDataPoint[];
}

export interface BumpChartProps {
  data: BumpSerie[];
  palette?: string | ChartColorPalette;
  width?: number;
  height?: number;
  interpolation?: 'smooth' | 'linear';
  lineWidth?: number;
  activeLineWidth?: number;
  inactiveLineWidth?: number;
  pointSize?: number;
  activePointSize?: number;
  inactivePointSize?: number;
  pointBorderWidth?: number;
  startLabel?: boolean | string;
  endLabel?: boolean | string;
  enableGridX?: boolean;
  enableGridY?: boolean;
  isInteractive?: boolean;
  animate?: boolean;
  onSerieClick?: (point: any) => void;
  className?: string;
  margin?: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
}

export const BumpChart: React.FC<BumpChartProps> = ({
  data,
  palette = 'default',
  width,
  height = 400,
  interpolation = 'smooth',
  lineWidth = 3,
  activeLineWidth = 6,
  inactiveLineWidth = 0,
  pointSize = 10,
  activePointSize = 16,
  inactivePointSize = 0,
  pointBorderWidth = 3,
  startLabel = true,
  endLabel = true,
  enableGridX = false,
  enableGridY = true,
  isInteractive = true,
  animate = true,
  onSerieClick,
  className = '',
  margin = { top: 40, right: 100, bottom: 40, left: 60 },
}) => {
  // Resolve the color palette
  const colorPalette = typeof palette === 'string' ? getPalette(palette) : palette;
  const resolvedPalette = resolvePalette(colorPalette);

  return (
    <div className={`bump-chart ${className}`}>
      <div className="bump-chart__container" style={{ height }}>
        <ResponsiveBump
          useMesh={true}
          data={data as any}
          margin={margin}
          colors={resolvedPalette.colors}
          lineWidth={lineWidth}
          activeLineWidth={activeLineWidth}
          inactiveLineWidth={inactiveLineWidth}
          pointSize={pointSize}
          activePointSize={activePointSize}
          inactivePointSize={inactivePointSize}
          pointBorderWidth={pointBorderWidth}
          pointBorderColor={{ from: 'serie.color' }}
          startLabel={startLabel as any}
          endLabel={endLabel as any}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: '',
            legendPosition: 'middle',
            legendOffset: 32,
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'ranking',
            legendPosition: 'middle',
            legendOffset: -40,
          }}
          enableGridX={enableGridX}
          enableGridY={enableGridY}
          motionConfig={animate ? 'gentle' : 'instant'}
          isInteractive={isInteractive}
          onClick={onSerieClick}
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

export default BumpChart;
