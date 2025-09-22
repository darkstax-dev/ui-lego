import React from 'react';
import { Bar } from '@nivo/bar';
import { ChartColorPalette, getPalette, resolvePalette } from '../palette';
import './BarChart.css';

export interface BarChartData {
  id: string;
  label: string;
  value: number;
  color?: string;
}

// Interface for grouped bar chart data (multiple categories per item)
export interface GroupedBarChartData {
  [key: string]: string | number;
}

export interface BarChartProps {
  data: BarChartData[] | GroupedBarChartData[];
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
  groupMode?: 'grouped' | 'stacked';
  layout?: 'vertical' | 'horizontal';
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
  groupMode = 'grouped',
  layout = 'vertical',
  margin = { top: 50, right: 20, bottom: 50, left: 60 },
  axisLeft = {
    tickSize: 5,
    tickPadding: 5,
    tickRotation: 0,
    legend: 'Food',
    legendPosition: 'middle',
    legendOffset: -40,
  },
  axisBottom = {
    tickSize: 5,
    tickPadding: 5,
    tickRotation: 0,
    legend: 'Country',
    legendPosition: 'middle',
    legendOffset: 32,
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
        <Bar
          data={chartData}
          keys={keys}
          indexBy={indexBy}
          margin={margin}
          padding={0.3}
          valueScale={{ type: 'linear' }}
          indexScale={{ type: 'band', round: true }}
          colors={() => resolvedPalette.colors[0]}
          borderColor="transparent"
          borderWidth={0}
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
          enableGridY={showGrid}
          gridYValues={10}
          enableLabel={false}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
          animate={animate}
          motionConfig="gentle"
          isInteractive={interactive}
          onClick={onBarClick}
          onMouseEnter={onBarHover}
          tooltip={CustomTooltip}
          width={width ?? 640}
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
