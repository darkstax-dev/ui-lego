import React from 'react';
import { ResponsiveScatterPlot } from '@nivo/scatterplot';
import { ChartColorPalette, getPalette, resolvePalette } from '../palette';
import './ScatterplotChart.css';

export interface ScatterplotDataPoint {
  x: number;
  y: number;
}

export interface ScatterplotSerie {
  id: string;
  data: ScatterplotDataPoint[];
}

export interface ScatterplotChartProps {
  data: ScatterplotSerie[];
  palette?: string | ChartColorPalette;
  width?: number;
  height?: number;
  xScale?: {
    type: 'linear' | 'log' | 'symlog';
    min?: number | 'auto';
    max?: number | 'auto';
  };
  yScale?: {
    type: 'linear' | 'log' | 'symlog';
    min?: number | 'auto';
    max?: number | 'auto';
  };
  nodeSize?: number | { key: string; values: [number, number]; sizes: [number, number] };
  blendMode?: 'normal' | 'multiply' | 'screen' | 'overlay' | 'darken' | 'lighten';
  enableGridX?: boolean;
  enableGridY?: boolean;
  isInteractive?: boolean;
  useMesh?: boolean;
  animate?: boolean;
  onNodeClick?: (node: any) => void;
  className?: string;
  margin?: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
}

export const ScatterplotChart: React.FC<ScatterplotChartProps> = ({
  data,
  palette = 'default',
  width,
  height = 400,
  xScale = { type: 'linear', min: 'auto', max: 'auto' },
  yScale = { type: 'linear', min: 'auto', max: 'auto' },
  nodeSize = 9,
  blendMode = 'multiply',
  enableGridX = true,
  enableGridY = true,
  isInteractive = true,
  useMesh = true,
  animate = true,
  onNodeClick,
  className = '',
  margin = { top: 60, right: 140, bottom: 70, left: 90 },
}) => {
  // Resolve the color palette
  const colorPalette = typeof palette === 'string' ? getPalette(palette) : palette;
  const resolvedPalette = resolvePalette(colorPalette);

  return (
    <div className={`scatterplot-chart ${className}`}>
      <div className="scatterplot-chart__container" style={{ height }}>
        <ResponsiveScatterPlot
          data={data}
          margin={margin}
          xScale={xScale}
          yScale={yScale}
          colors={resolvedPalette.colors}
          nodeSize={nodeSize}
          blendMode={blendMode}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'weight',
            legendPosition: 'middle',
            legendOffset: 46,
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'size',
            legendPosition: 'middle',
            legendOffset: -60,
          }}
          enableGridX={enableGridX}
          enableGridY={enableGridY}
          legends={[
            {
              anchor: 'bottom-right',
              direction: 'column',
              justify: false,
              translateX: 130,
              translateY: 0,
              itemWidth: 100,
              itemHeight: 12,
              itemsSpacing: 5,
              itemDirection: 'left-to-right',
              symbolSize: 12,
              symbolShape: 'circle',
              effects: [
                {
                  on: 'hover',
                  style: {
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
          motionConfig={animate ? 'gentle' : 'instant'}
          isInteractive={isInteractive}
          useMesh={useMesh}
          {...(onNodeClick && { onClick: onNodeClick })}
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

export default ScatterplotChart;
