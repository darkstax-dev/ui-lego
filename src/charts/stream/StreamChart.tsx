import React from 'react';
import { Stream } from '@nivo/stream';
import { ChartColorPalette, getPalette, resolvePalette } from '../palette';
import './StreamChart.css';

export interface StreamChartData {
  [key: string]: string | number;
}

export interface StreamChartProps {
  data: StreamChartData[];
  keys: string[];
  palette?: string | ChartColorPalette;
  width?: number;
  height?: number;
  showLegend?: boolean;
  interactive?: boolean;
  animate?: boolean;
  className?: string;
  curve?: 'basis' | 'cardinal' | 'catmullRom' | 'linear' | 'monotoneX' | 'monotoneY' | 'natural' | 'step' | 'stepAfter' | 'stepBefore';
  offsetType?: 'diverging' | 'expand' | 'none' | 'silhouette' | 'wiggle';
  order?: 'ascending' | 'descending' | 'insideOut' | 'none' | 'reverse';
  margin?: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
  axisLeft?: {
    tickSize?: number;
    tickPadding?: number;
    tickRotation?: number;
    legend?: string;
    legendPosition?: 'start' | 'middle' | 'end';
    legendOffset?: number;
  };
  axisBottom?: {
    tickSize?: number;
    tickPadding?: number;
    tickRotation?: number;
    legend?: string;
    legendPosition?: 'start' | 'middle' | 'end';
    legendOffset?: number;
  };
  onLayerClick?: (layer: any) => void;
  onLayerHover?: (layer: any) => void;
}

export const StreamChart: React.FC<StreamChartProps> = ({
  data,
  keys,
  palette = 'default',
  width,
  height = 400,
  showLegend = true,
  interactive = true,
  animate = true,
  className = '',
  curve = 'catmullRom',
  offsetType = 'wiggle',
  order = 'none',
  margin = { top: 50, right: 110, bottom: 50, left: 60 },
  axisLeft = {
    tickSize: 5,
    tickPadding: 5,
    tickRotation: 0,
    legend: 'Value',
    legendPosition: 'middle',
    legendOffset: -40,
  },
  axisBottom = {
    tickSize: 5,
    tickPadding: 5,
    tickRotation: 0,
    legend: 'Time',
    legendPosition: 'middle',
    legendOffset: 36,
  },
  onLayerClick,
  onLayerHover,
}) => {
  // Resolve the color palette
  const colorPalette = typeof palette === 'string' ? getPalette(palette) : palette;
  const resolvedPalette = resolvePalette(colorPalette);

  // Custom tooltip component
  const CustomTooltip = ({ layer }: any) => (
    <div
      style={{
        background: resolvedPalette.background || '#ffffff',
        padding: '12px',
        border: `1px solid ${resolvedPalette.border || '#ddd'}`,
        borderRadius: '4px',
        fontFamily: 'var(--font-family-macan-mono)',
        fontSize: '14px',
        color: resolvedPalette.text || '#000',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
      }}
    >
      <div style={{ fontWeight: 600, marginBottom: '4px' }}>
        {layer.id}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div
          style={{
            width: '12px',
            height: '12px',
            backgroundColor: layer.color,
            borderRadius: '2px',
          }}
        />
        <span>
          Value: {layer.value !== undefined ? layer.value.toLocaleString() : 'N/A'}
        </span>
      </div>
    </div>
  );

  return (
    <div className={`stream-chart ${className}`}>
      <div className="stream-chart__container" style={{ height }}>
        <Stream
          data={data}
          keys={keys}
          margin={margin}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            ...axisBottom,
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legendPosition: axisBottom.legendPosition as any,
          }}
          axisLeft={{
            ...axisLeft,
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legendPosition: axisLeft.legendPosition as any,
          }}
          enableGridX={false}
          enableGridY={true}
          curve={curve}
          offsetType={offsetType}
          order={order}
          colors={({ id }) => {
            const keyIndex = keys.indexOf(id as string);
            return resolvedPalette.colors[keyIndex % resolvedPalette.colors.length];
          }}
          fillOpacity={0.85}
          borderColor="transparent"
          borderWidth={0}
          isInteractive={interactive}
          animate={animate}
          motionConfig="gentle"
          onMouseEnter={onLayerHover}
          tooltip={CustomTooltip}
          width={width ?? 800}
          height={height}
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
                borderRadius: '4px',
                fontSize: '14px',
                fontFamily: 'var(--font-family-macan-mono)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
              },
            },
          }}
        />
      </div>

      {/* Custom Legend */}
      {showLegend && (
        <div className="stream-chart__legend">
          {keys.map((key, index) => (
            <div key={key} className="stream-chart__legend-item">
              <div
                className="stream-chart__legend-color"
                style={{ 
                  backgroundColor: resolvedPalette.colors[index % resolvedPalette.colors.length] 
                }}
              />
              <div className="stream-chart__legend-text">
                <div className="stream-chart__legend-label">{key}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StreamChart;
