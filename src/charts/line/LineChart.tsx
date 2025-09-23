import React from 'react';
import { Line } from '@nivo/line';
import { ChartColorPalette, getPalette, resolvePalette } from '../palette';
import './LineChart.css';

export interface LineChartData {
  id: string | number;
  color?: string;
  data: Array<{
    x: string | number;
    y: string | number;
  }>;
}

export interface LineChartProps {
  data: LineChartData[];
  palette?: string | ChartColorPalette;
  width?: number;
  height?: number;
  showLegend?: boolean;
  interactive?: boolean;
  animate?: boolean;
  className?: string;
  curve?: 'basis' | 'cardinal' | 'catmullRom' | 'linear' | 'monotoneX' | 'monotoneY' | 'natural' | 'step' | 'stepAfter' | 'stepBefore';
  enableArea?: boolean;
  areaOpacity?: number;
  enablePoints?: boolean;
  pointSize?: number;
  pointBorderWidth?: number;
  enableGridX?: boolean;
  enableGridY?: boolean;
  enableSlices?: 'x' | 'y' | false;
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
    format?: string | ((value: any) => string);
  };
  axisBottom?: {
    tickSize?: number;
    tickPadding?: number;
    tickRotation?: number;
    legend?: string;
    legendPosition?: 'start' | 'middle' | 'end';
    legendOffset?: number;
    format?: string | ((value: any) => string);
  };
  yScale?: {
    type: 'linear' | 'log' | 'symlog' | 'point';
    min?: number | 'auto';
    max?: number | 'auto';
    reverse?: boolean;
  };
  xScale?: {
    type: 'linear' | 'log' | 'symlog' | 'point' | 'time';
    min?: number | 'auto';
    max?: number | 'auto';
    reverse?: boolean;
  };
  onPointClick?: (point: any) => void;
  onPointHover?: (point: any) => void;
}

export const LineChart: React.FC<LineChartProps> = ({
  data,
  palette = 'default',
  width,
  height = 400,
  showLegend = false,
  interactive = true,
  animate = true,
  className = '',
  curve = 'catmullRom',
  enableArea = true,
  areaOpacity = 0.3,
  enablePoints = true,
  pointSize = 8,
  pointBorderWidth = 2,
  enableGridX = false,
  enableGridY = true,
  enableSlices = 'x',
  margin = { top: 50, right: 60, bottom: 50, left: 60 },
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
  yScale = {
    type: 'linear',
    min: 'auto',
    max: 'auto',
  },
  xScale = {
    type: 'point',
  },
  onPointClick,
  onPointHover,
}) => {
  // Resolve the color palette
  const colorPalette = typeof palette === 'string' ? getPalette(palette) : palette;
  const resolvedPalette = resolvePalette(colorPalette);

  // Map data with colors from palette
  const chartData = data.map((series, index) => ({
    ...series,
    color: series.color || resolvedPalette.colors[index % resolvedPalette.colors.length],
  }));

  // Custom tooltip component
  const CustomTooltip = ({ point }: any) => (
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
        {point.serieId}
      </div>
      <div style={{ marginBottom: '4px', fontSize: '12px', color: 'var(--Text-Gray-text-Main-text)' }}>
        X: {point.data.xFormatted} | Y: {point.data.yFormatted}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div
          style={{
            width: '12px',
            height: '12px',
            backgroundColor: point.serieColor,
            borderRadius: '50%',
          }}
        />
        <span>Value: {point.data.y}</span>
      </div>
    </div>
  );

  // Custom point component with enhanced styling
  const CustomPoint = ({ point }: any) => (
    <g>
      <circle
        cx={point.x}
        cy={point.y}
        r={pointSize}
        fill={point.serieColor}
        stroke="white"
        strokeWidth={pointBorderWidth}
        style={{
          filter: 'drop-shadow(0px 1px 2px rgba(12, 12, 13, 0.1))',
        }}
      />
      <circle
        cx={point.x}
        cy={point.y}
        r={pointSize / 2}
        fill={point.serieColor}
      />
    </g>
  );

  return (
    <div className={`line-chart ${className}`}>
      <div className="line-chart__container" style={{ height }}>
        <Line
          data={chartData}
          margin={margin}
          xScale={xScale}
          yScale={yScale}
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
          enableGridX={enableGridX}
          enableGridY={enableGridY}
          colors={({ color }) => color}
          pointComponent={CustomPoint}
          pointSize={pointSize}
          pointColor={{ theme: 'background' }}
          pointBorderWidth={pointBorderWidth}
          pointBorderColor={{ from: 'serieColor' }}
          enablePoints={enablePoints}
          enableArea={enableArea}
          areaOpacity={areaOpacity}
          curve={curve}
          lineWidth={3}
          enableSlices={enableSlices}
          useMesh={interactive}
          animate={animate}
          motionConfig="gentle"
          onClick={onPointClick}
          onMouseEnter={onPointHover}
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
            crosshair: {
              line: {
                stroke: 'var(--color-blue-dark-950)',
                strokeWidth: 1,
                strokeOpacity: 0.35,
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
        <div className="line-chart__legend">
          {chartData.map((series, index) => (
            <div key={series.id} className="line-chart__legend-item">
              <div
                className="line-chart__legend-color"
                style={{ backgroundColor: series.color }}
              />
              <div className="line-chart__legend-text">
                <div className="line-chart__legend-label">{series.id}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LineChart;
