import React from 'react';
import { ResponsiveRadar } from '@nivo/radar';
import { ChartColorPalette, getPalette, resolvePalette } from '../palette';
import './RadarChart.css';

export interface RadarDataPoint {
  [key: string]: string | number;
}

export interface RadarChartProps {
  data: RadarDataPoint[];
  keys: string[];
  indexBy: string;
  palette?: string | ChartColorPalette;
  width?: number;
  height?: number;
  maxValue?: number | 'auto';
  valueFormat?: string | ((value: number) => string);
  curve?: 'linearClosed' | 'basisClosed' | 'catmullRomClosed' | 'cardinalClosed';
  borderWidth?: number;
  borderColor?: string;
  gridLevels?: number;
  gridShape?: 'circular' | 'linear';
  gridLabelOffset?: number;
  enableDots?: boolean;
  dotSize?: number;
  dotColor?: string;
  dotBorderWidth?: number;
  dotBorderColor?: string;
  enableDotLabel?: boolean;
  fillOpacity?: number;
  blendMode?: string;
  isInteractive?: boolean;
  animate?: boolean;
  onDotClick?: (dot: any) => void;
  className?: string;
  margin?: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
}

export const RadarChart: React.FC<RadarChartProps> = ({
  data,
  keys,
  indexBy,
  palette = 'default',
  width,
  height = 500,
  maxValue = 'auto',
  valueFormat,
  curve = 'linearClosed',
  borderWidth = 2,
  borderColor = 'inherit',
  gridLevels = 5,
  gridShape = 'circular',
  gridLabelOffset = 36,
  enableDots = true,
  dotSize = 8,
  dotColor = 'inherit',
  dotBorderWidth = 0,
  dotBorderColor = 'inherit',
  enableDotLabel = false,
  fillOpacity = 0.25,
  blendMode = 'multiply',
  isInteractive = true,
  animate = true,
  onDotClick,
  className = '',
  margin = { top: 70, right: 80, bottom: 40, left: 80 },
}) => {
  // Resolve the color palette
  const colorPalette = typeof palette === 'string' ? getPalette(palette) : palette;
  const resolvedPalette = resolvePalette(colorPalette);

  return (
    <div className={`radar-chart ${className}`}>
      <div className="radar-chart__container" style={{ height }}>
        <ResponsiveRadar
          data={data}
          keys={keys}
          indexBy={indexBy}
          margin={margin}
          maxValue={maxValue}
          valueFormat={valueFormat}
          curve={curve}
          borderWidth={borderWidth}
          borderColor={{ from: 'color' }}
          gridLevels={gridLevels}
          gridShape={gridShape}
          gridLabelOffset={gridLabelOffset}
          enableDots={enableDots}
          dotSize={dotSize}
          dotColor={{ from: 'color' }}
          dotBorderWidth={dotBorderWidth}
          dotBorderColor={{ from: 'color' }}
          enableDotLabel={enableDotLabel}
          colors={resolvedPalette.colors}
          fillOpacity={fillOpacity}
          blendMode={blendMode}
          motionConfig={animate ? 'gentle' : 'instant'}
          isInteractive={isInteractive}
          {...(onDotClick && { onClick: onDotClick })}
          theme={{
            background: 'transparent',
            text: {
              fontFamily: 'var(--font-family-macan-mono)',
              fontSize: 12,
              fill: resolvedPalette.text || 'var(--Text-Blue-text-Main-text)',
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

export default RadarChart;
