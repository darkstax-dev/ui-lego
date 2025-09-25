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
  margin = { top: 50, right: 60, bottom: 70, left: 80 },
  axisLeft = {
    tickSize: 5,
    tickPadding: 8,
    tickRotation: 0,
    legend: 'Value',
    legendPosition: 'middle',
    legendOffset: -60,
  },
  axisBottom = {
    tickSize: 5,
    tickPadding: 5,
    tickRotation: 0,
    legend: 'Time',
    legendPosition: 'middle',
    legendOffset: 40,
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

  // compute a sensible baseline for the area so the shaded area doesn't overflow the axis region
  const numericValues = data.flatMap(s => s.data.map(p => Number(p.y)));
  const computedAreaBaseline = typeof yScale?.min === 'number'
    ? (yScale as any).min
    : Math.min(...(numericValues.length ? numericValues : [0]));

  // Custom tooltip component
  const CustomTooltip = ({ point }: any) => (
    <div className="line-chart__tooltip">
      <div className="line-chart__tooltip-title">{point.serieId}</div>
      <div className="line-chart__tooltip-sub">X: {point.data.xFormatted} | Y: {point.data.yFormatted}</div>
      <div className="line-chart__tooltip-row">
        <div className="line-chart__tooltip-dot" style={{ backgroundColor: point.serieColor }} />
        <span className="line-chart__tooltip-value">Value: {point.data.y}</span>
      </div>
    </div>
  );

  // Custom point component with enhanced styling
  const CustomPoint = ({ point }: any) => (
    <g className="line-chart__point-group">
      <circle
        className="line-chart__point"
        cx={point.x}
        cy={point.y}
        r={pointSize}
        fill={point.serieColor}
        stroke="white"
        strokeWidth={pointBorderWidth}
      />
      <circle
        className="line-chart__point-inner"
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
          xScale={xScale as any}
          yScale={yScale as any}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            ...axisBottom,
            tickSize: axisBottom.tickSize,
            tickPadding: axisBottom.tickPadding,
            tickRotation: axisBottom.tickRotation,
            legendPosition: axisBottom.legendPosition as any,
          }}
          axisLeft={{
            ...axisLeft,
            tickSize: axisLeft.tickSize,
            tickPadding: axisLeft.tickPadding,
            tickRotation: axisLeft.tickRotation,
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
          areaBaselineValue={computedAreaBaseline}
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
