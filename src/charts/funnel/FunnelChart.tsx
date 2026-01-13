import React from 'react';
import { ResponsiveFunnel } from '@nivo/funnel';
import { ChartColorPalette, getPalette, resolvePalette } from '../palette';
import './FunnelChart.css';

export interface FunnelChartData {
  id: string;
  value: number;
  label: string;
}

export interface FunnelChartProps {
  data: FunnelChartData[];
  palette?: string | ChartColorPalette;
  width?: number;
  height?: number;
  showLegend?: boolean;
  interactive?: boolean;
  animate?: boolean;
  className?: string;
  direction?: 'horizontal' | 'vertical';
  interpolation?: 'smooth' | 'linear';
  spacing?: number;
  shapeBlending?: number;
  enableLabel?: boolean;
  labelColor?: string;
  beforeSeparatorLength?: number;
  beforeSeparatorOffset?: number;
  afterSeparatorLength?: number;
  afterSeparatorOffset?: number;
  currentPartSizeExtension?: number;
  currentBorderWidth?: number;
  margin?: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
  onClick?: (part: any) => void;
  onMouseEnter?: (part: any) => void;
}

export const FunnelChart: React.FC<FunnelChartProps> = ({
  data,
  palette = 'default',
  width,
  height = 400,
  showLegend = true,
  interactive = true,
  animate = true,
  className = '',
  direction = 'horizontal',
  interpolation = 'smooth',
  spacing = 3,
  shapeBlending = 0.66,
  enableLabel = true,
  labelColor = '#ffffff',
  beforeSeparatorLength = 0,
  beforeSeparatorOffset = 0,
  afterSeparatorLength = 0,
  afterSeparatorOffset = 0,
  currentPartSizeExtension = 10,
  currentBorderWidth = 40,
  margin = { top: 40, right: 40, bottom: 40, left: 40 },
  onClick,
  onMouseEnter,
}) => {
  // Resolve the color palette
  const colorPalette = typeof palette === 'string' ? getPalette(palette) : palette;
  const resolvedPalette = resolvePalette(colorPalette);

  // Map data with colors from palette
  const chartData = data.map((item, index) => ({
    ...item,
    color: resolvedPalette.colors[index % resolvedPalette.colors.length],
  }));

  // Custom tooltip component
  const CustomTooltip = ({ part }: any) => {
    const percentage = data.length > 0 && data[0].value > 0
      ? ((part.data.value / data[0].value) * 100).toFixed(1)
      : '0.0';
    
    return (
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
          {part.data.label}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div
            style={{
              width: '12px',
              height: '12px',
              backgroundColor: part.data.color,
              borderRadius: '2px',
            }}
          />
          <span>
            {part.data.value.toLocaleString()} ({percentage}%)
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className={`funnel-chart ${className}`}>
      <div className="funnel-chart__container" style={{ height }}>
        <ResponsiveFunnel
          data={chartData}
          margin={margin}
          direction={direction}
          interpolation={interpolation}
          spacing={spacing}
          shapeBlending={shapeBlending}
          colors={(part: any) => part?.data?.color || resolvedPalette.colors[0]}
          borderWidth={0}
          borderColor="transparent"
          enableLabel={enableLabel}
          labelColor={labelColor}
          beforeSeparatorLength={beforeSeparatorLength}
          beforeSeparatorOffset={beforeSeparatorOffset}
          afterSeparatorLength={afterSeparatorLength}
          afterSeparatorOffset={afterSeparatorOffset}
          currentPartSizeExtension={currentPartSizeExtension}
          currentBorderWidth={currentBorderWidth}
          isInteractive={interactive}
          animate={animate}
          motionConfig="gentle"
          {...(onClick && { onClick })}
          {...(onMouseEnter && { onMouseEnter })}
          tooltip={CustomTooltip}
          theme={{
            background: 'transparent',
            text: {
              fontFamily: 'var(--font-family-macan-mono)',
              fontSize: 14,
              fill: labelColor,
              fontWeight: 500,
            },
            tooltip: {
              container: {
                background: resolvedPalette.background || '#ffffff',
                border: `1px solid ${resolvedPalette.border || '#ddd'}`,
                borderRadius: '4px',
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

      {/* Custom Legend */}
      {showLegend && (
        <div className="funnel-chart__legend">
          {chartData.map((item, index) => {
            const percentage = data.length > 0 && data[0].value > 0
              ? ((item.value / data[0].value) * 100).toFixed(1)
              : '0.0';
            
            return (
              <div key={item.id} className="funnel-chart__legend-item">
                <div
                  className="funnel-chart__legend-color"
                  style={{ backgroundColor: item.color }}
                />
                <div className="funnel-chart__legend-text">
                  <div className="funnel-chart__legend-label">{item.label}</div>
                  <div className="funnel-chart__legend-value">
                    {item.value.toLocaleString()} ({percentage}%)
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default FunnelChart;
