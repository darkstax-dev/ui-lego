import React from 'react';
import { ResponsiveChord } from '@nivo/chord';
import { ChartColorPalette, getPalette, resolvePalette } from '../palette';
import './ChordChart.css';

export interface ChordChartProps {
  data: number[][];
  keys: string[];
  palette?: string | ChartColorPalette;
  width?: number;
  height?: number;
  valueFormat?: string | ((value: number) => string);
  padAngle?: number;
  innerRadiusRatio?: number;
  innerRadiusOffset?: number;
  arcOpacity?: number;
  arcBorderWidth?: number;
  arcBorderColor?: string | { from: string; modifiers: any[] };
  ribbonOpacity?: number;
  ribbonBorderWidth?: number;
  ribbonBorderColor?: string | { from: string; modifiers: any[] };
  enableLabel?: boolean;
  label?: string | ((datum: any) => string);
  labelOffset?: number;
  labelRotation?: number;
  labelTextColor?: string | { from: string; modifiers: any[] };
  isInteractive?: boolean;
  animate?: boolean;
  onArcClick?: (arc: any) => void;
  onRibbonClick?: (ribbon: any) => void;
  className?: string;
  margin?: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
}

export const ChordChart: React.FC<ChordChartProps> = ({
  data,
  keys,
  palette = 'default',
  width,
  height = 500,
  valueFormat,
  padAngle = 0.02,
  innerRadiusRatio = 0.96,
  innerRadiusOffset = 0.02,
  arcOpacity = 1,
  arcBorderWidth = 1,
  arcBorderColor = { from: 'color', modifiers: [['darker', 0.4]] },
  ribbonOpacity = 0.5,
  ribbonBorderWidth = 1,
  ribbonBorderColor = { from: 'color', modifiers: [['darker', 0.4]] },
  enableLabel = true,
  label = 'id',
  labelOffset = 12,
  labelRotation = -90,
  labelTextColor = { from: 'color', modifiers: [['darker', 1]] },
  isInteractive = true,
  animate = true,
  onArcClick,
  onRibbonClick,
  className = '',
  margin = { top: 60, right: 60, bottom: 90, left: 60 },
}) => {
  // Resolve the color palette
  const colorPalette = typeof palette === 'string' ? getPalette(palette) : palette;
  const resolvedPalette = resolvePalette(colorPalette);

  return (
    <div className={`chord-chart ${className}`}>
      <div className="chord-chart__container" style={{ height }}>
        <ResponsiveChord
          data={data}
          keys={keys}
          margin={margin}
          valueFormat={valueFormat}
          padAngle={padAngle}
          innerRadiusRatio={innerRadiusRatio}
          innerRadiusOffset={innerRadiusOffset}
          colors={resolvedPalette.colors}
          arcOpacity={arcOpacity}
          arcBorderWidth={arcBorderWidth}
          arcBorderColor={arcBorderColor}
          ribbonOpacity={ribbonOpacity}
          ribbonBorderWidth={ribbonBorderWidth}
          ribbonBorderColor={ribbonBorderColor}
          enableLabel={enableLabel}
          label={label}
          labelOffset={labelOffset}
          labelRotation={labelRotation}
          labelTextColor={labelTextColor}
          motionConfig={animate ? 'gentle' : 'instant'}
          isInteractive={isInteractive}
          {...(onArcClick && { onArcClick })}
          {...(onRibbonClick && { onRibbonClick })}
          theme={{
            background: 'transparent',
            text: {
              fontFamily: 'var(--font-family-macan-mono)',
              fontSize: 11,
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

export default ChordChart;
