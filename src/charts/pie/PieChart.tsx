import React from 'react';
import { ResponsivePie } from '@nivo/pie';
import { ChartColorPalette, getPalette, resolvePalette } from '../palette';
import './PieChart.css';

export interface PieChartData {
  id: string;
  label: string;
  value: number;
  color?: string;
}

export interface PieChartProps {
  data: PieChartData[];
  palette?: string | ChartColorPalette;
  total?: string | number;
  totalLabel?: string;
  width?: number;
  height?: number;
  innerRadius?: number;
  padAngle?: number;
  cornerRadius?: number;
  showLegend?: boolean;
  interactive?: boolean;
  animate?: boolean;
  className?: string;
  onSliceClick?: (slice: any) => void;
  onSliceHover?: (slice: any) => void;
}

export const PieChart: React.FC<PieChartProps> = ({
  data,
  palette = 'default',
  total,
  totalLabel = 'TOTAL',
  width,
  height = 400,
  innerRadius = 0.6,
  padAngle = 1,
  cornerRadius = 2,
  showLegend = true,
  interactive = true,
  animate = true,
  className = '',
  onSliceClick,
  onSliceHover,
}) => {
  // Resolve the color palette
  const colorPalette = typeof palette === 'string' ? getPalette(palette) : palette;
  const resolvedPalette = resolvePalette(colorPalette);

  // Map data with colors from palette
  const chartData = data.map((item, index) => ({
    ...item,
    color: item.color || resolvedPalette.colors[index % resolvedPalette.colors.length],
  }));

  // Calculate total if not provided
  const calculatedTotal = total || data.reduce((sum, item) => sum + item.value, 0);
  const formattedTotal = typeof calculatedTotal === 'number' 
    ? calculatedTotal.toLocaleString() 
    : calculatedTotal;

  // Custom tooltip component
  const CustomTooltip = ({ datum }: any) => (
    <div
      style={{
        background: resolvedPalette.background || '#ffffff',
        padding: '12px',
        border: `1px solid ${resolvedPalette.border || '#ddd'}`,
        borderRadius: '4px',
        fontFamily: 'var(--font-family-macan-mono)',
        fontSize: '14px',
        color: resolvedPalette.text || '#000',
      }}
    >
      <div style={{ fontWeight: 600, marginBottom: '4px' }}>
        {datum.label}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div
          style={{
            width: '12px',
            height: '12px',
            backgroundColor: datum.color,
            borderRadius: '2px',
          }}
        />
        <span>
          {datum.value.toLocaleString()} ({((datum.value / (calculatedTotal as number)) * 100).toFixed(1)}%)
        </span>
      </div>
    </div>
  );

  return (
    <div className={`pie-chart ${className}`}>
      <div className="pie-chart__container" style={{ height }}>
        <ResponsivePie
          data={chartData}
          margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
          innerRadius={innerRadius}
          padAngle={padAngle}
          cornerRadius={cornerRadius}
          colors={({ data }) => data.color}
          borderWidth={0}
          borderColor="transparent"
          enableArcLinkLabels={false}
          enableArcLabels={false}
          isInteractive={interactive}
          animate={animate}
          motionConfig="gentle"
          onClick={onSliceClick}
          onMouseEnter={onSliceHover}
          tooltip={CustomTooltip}
          theme={{
            background: 'transparent',
            text: {
              fontFamily: 'var(--font-family-macan-mono)',
              fontSize: 14,
              fill: resolvedPalette.text || '#000',
            },
            tooltip: {
              container: {
                background: resolvedPalette.background || '#ffffff',
                border: `1px solid ${resolvedPalette.border || '#ddd'}`,
                borderRadius: '4px',
                fontSize: '14px',
                fontFamily: 'var(--font-family-macan-mono)',
              },
            },
          }}
        />
        
        {/* Center label */}
        <div className="pie-chart__center-label">
          <div className="pie-chart__center-title">{totalLabel}</div>
          <div className="pie-chart__center-value">{formattedTotal}</div>
        </div>
      </div>

      {/* Custom Legend */}
      {showLegend && (
        <div className="pie-chart__legend">
          {chartData.map((item, index) => (
            <div key={item.id} className="pie-chart__legend-item">
              <div
                className="pie-chart__legend-color"
                style={{ backgroundColor: item.color }}
              />
              <div className="pie-chart__legend-text">
                <div className="pie-chart__legend-label">{item.label}</div>
                <div className="pie-chart__legend-value">
                  {item.value.toLocaleString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PieChart;
