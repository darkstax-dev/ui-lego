import React from 'react';
import { CirclePacking, ComputedDatum } from '@nivo/circle-packing';
import { ChartColorPalette, getPalette, resolvePalette } from '../palette';
import './CirclePackingChart.css';

export interface CirclePackingData {
  id: string;
  value?: number;
  children?: CirclePackingData[];
  color?: string;
}

// Nivo circle packing node interface - using Nivo's ComputedDatum
export type CirclePackingNode = ComputedDatum<CirclePackingData>;

export interface CirclePackingChartProps {
  data: CirclePackingData;
  palette?: string | ChartColorPalette;
  width?: number;
  height?: number;
  padding?: number;
  leavesOnly?: boolean;
  enableLabels?: boolean;
  labelTextColor?: string;
  labelsSkipRadius?: number;
  borderWidth?: number;
  borderColor?: string;
  interactive?: boolean;
  animate?: boolean;
  className?: string;
  onClick?: (node: ComputedDatum<CirclePackingData>) => void;
  onMouseEnter?: (node: ComputedDatum<CirclePackingData>) => void;
  margin?: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
}

export const CirclePackingChart: React.FC<CirclePackingChartProps> = ({
  data,
  palette = 'default',
  width,
  height = 400,
  padding = 2,
  leavesOnly = false,
  enableLabels = true,
  labelTextColor,
  labelsSkipRadius = 8,
  borderWidth = 0,
  borderColor = 'transparent',
  interactive = true,
  animate = true,
  className = '',
  onClick,
  onMouseEnter,
  margin = { top: 20, right: 20, bottom: 20, left: 20 },
}) => {
  // Resolve the color palette
  const colorPalette = typeof palette === 'string' ? getPalette(palette) : palette;
  const resolvedPalette = resolvePalette(colorPalette);

  // Ensure data has proper structure
  if (!data || (!data.children && !data.value)) {
    return (
      <div className={`circle-packing-chart ${className}`}>
        <div className="circle-packing-chart__container" style={{ height }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--Text-Blue-text-Main-text)' }}>
            No data available
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`circle-packing-chart ${className}`}>
      <div className="circle-packing-chart__container" style={{ height }}>
        <CirclePacking
          data={data}
          width={width ?? 600}
          height={height}
          margin={margin}
          colors={resolvedPalette.colors}
          padding={padding}
          leavesOnly={leavesOnly}
          enableLabels={enableLabels}
          labelsSkipRadius={labelsSkipRadius}
          labelTextColor={labelTextColor || resolvedPalette.text || 'var(--Text-Blue-text-Main-text)'}
          borderWidth={borderWidth}
          borderColor={borderColor}
          isInteractive={interactive}
          animate={animate}
          motionConfig="gentle"
          {...(onClick && { onClick })}
          {...(onMouseEnter && { onMouseEnter })}
          theme={{
            background: 'transparent',
            text: {
              fontFamily: 'var(--font-family-macan-mono)',
              fontSize: 12,
              fill: resolvedPalette.text || 'var(--Text-Blue-text-Main-text)',
            },
            labels: {
              text: {
                fontFamily: 'var(--font-family-macan-mono)',
                fontSize: 12,
                fontWeight: 500,
                fill: resolvedPalette.text || 'var(--Text-Blue-text-Main-text)',
              },
            },
            tooltip: {
              container: {
                background: resolvedPalette.background || 'var(--Gray-200)',
                border: `1px solid ${resolvedPalette.border || 'var(--Divider-Light)'}`,
                borderRadius: '4px',
                fontSize: '14px',
                fontFamily: 'var(--font-family-macan-mono)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default CirclePackingChart;
