import React from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { ChartColorPalette, getPalette, resolvePalette } from '../palette';
import './BarChart.css';

export interface BarChartData {
  id: string;
  label: string;
  value: number;
  color?: string;
}

export interface BarChartProps {
  data: BarChartData[];
  palette?: string | ChartColorPalette;
  width?: number;
  height?: number;
  indexBy?: string;
  keys?: string[];
  showLegend?: boolean;
  showGrid?: boolean;
  interactive?: boolean;
  animate?: boolean;
  className?: string;
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
  onBarClick?: (bar: any) => void;
  onBarHover?: (bar: any) => void;
}

export const BarChart: React.FC<BarChartProps> = ({
  data,
  palette = 'default',
  width,
  height = 400,
  indexBy = 'id',
  keys = ['value'],
  showLegend = false,
  showGrid = true,
  interactive = true,
  animate = true,
  className = '',
  margin = { top: 40, right: 40, bottom: 60, left: 60 },
  axisLeft = {
    tickSize: 0,
    tickPadding: 16,
    tickRotation: 0,
    legend: 'Food',
    legendPosition: 'middle',
    legendOffset: -50,
  },
  axisBottom = {
    tickSize: 0,
    tickPadding: 16,
    tickRotation: 0,
    legend: 'Country',
    legendPosition: 'middle',
    legendOffset: 40,
  },
  onBarClick,
  onBarHover,
}) => {
  // Resolve the color palette
  const colorPalette = typeof palette === 'string' ? getPalette(palette) : palette;
  const resolvedPalette = resolvePalette(colorPalette);

  // Transform data for Nivo bar chart format
  const chartData = data.map((item, index) => ({
    [indexBy]: item.id,
    label: item.label,
    value: item.value,
    color: item.color || resolvedPalette.colors[0], // Use first color for all bars to match design
  }));

  // Custom tooltip component
  const CustomTooltip = ({ id, value, color, data }: any) => (
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
        {data.label || id}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div
          style={{
            width: '12px',
            height: '12px',
            backgroundColor: color,
            borderRadius: '2px',
          }}
        />
        <span>{value}</span>
      </div>
    </div>
  );

  return (
    <div className={`bar-chart ${className}`}>
      <div className="bar-chart__container" style={{ height }}>
        <ResponsiveBar
          data={chartData}
          keys={keys}
          indexBy={indexBy}
          margin={margin}
          padding={0.6}
          valueScale={{ type: 'linear' }}
          indexScale={{ type: 'band', round: true }}
          colors={() => resolvedPalette.colors[0]} // Use single color for all bars
          borderColor="transparent"
          borderWidth={0}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            ...axisBottom,
            tickSize: 0,
            tickPadding: 16,
            tickRotation: 0,
          }}
          axisLeft={{
            ...axisLeft,
            tickSize: 0,
            tickPadding: 16,
            tickRotation: 0,
          }}
          enableGridX={false}
          enableGridY={showGrid}
          gridYValues={10}
          enableLabel={false}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor="inherit:darker(1.6)"
          animate={animate}
          motionConfig="gentle"
          isInteractive={interactive}
          onClick={onBarClick}
          onMouseEnter={onBarHover}
          tooltip={CustomTooltip}
          theme={{
            background: 'transparent',
            text: {
              fontFamily: 'var(--font-family-macan-mono)',
              fontSize: 12,
              fill: resolvedPalette.text || 'var(--Text-Blue-text-Secondary-text)',
            },
            axis: {
              domain: {
                line: {
                  stroke: 'transparent',
                  strokeWidth: 0,
                },
              },
              legend: {
                text: {
                  fontFamily: 'var(--font-family-macan-mono)',
                  fontSize: 12,
                  fill: 'var(--Text-Gray-text-Main-text)',
                  fontWeight: 450,
                  letterSpacing: '1.2px',
                },
              },
              ticks: {
                line: {
                  stroke: 'transparent',
                  strokeWidth: 0,
                },
                text: {
                  fontFamily: 'var(--font-family-macan-mono)',
                  fontSize: 12,
                  fill: 'var(--Text-Blue-text-Secondary-text)',
                  fontWeight: 450,
                  letterSpacing: '1.2px',
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
        <div className="bar-chart__legend">
          {chartData.map((item, index) => (
            <div key={item[indexBy]} className="bar-chart__legend-item">
              <div
                className="bar-chart__legend-color"
                style={{ backgroundColor: item.color }}
              />
              <div className="bar-chart__legend-text">
                <div className="bar-chart__legend-label">{item.label}</div>
                <div className="bar-chart__legend-value">
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

export default BarChart;
