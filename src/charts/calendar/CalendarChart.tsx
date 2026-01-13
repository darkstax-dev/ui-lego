import React from 'react';
import { ResponsiveCalendar } from '@nivo/calendar';
import { ChartColorPalette, getPalette, resolvePalette } from '../palette';
import './CalendarChart.css';

export interface CalendarDataPoint {
  day: string;
  value: number;
}

export interface CalendarChartProps {
  data: CalendarDataPoint[];
  from: string | Date;
  to: string | Date;
  palette?: string | ChartColorPalette;
  width?: number;
  height?: number;
  emptyColor?: string;
  minValue?: number | 'auto';
  maxValue?: number | 'auto';
  direction?: 'horizontal' | 'vertical';
  monthBorderWidth?: number;
  monthBorderColor?: string;
  monthLegendOffset?: number;
  dayBorderWidth?: number;
  dayBorderColor?: string;
  daySpacing?: number;
  isInteractive?: boolean;
  onDayClick?: (day: CalendarDataPoint) => void;
  className?: string;
  margin?: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
}

export const CalendarChart: React.FC<CalendarChartProps> = ({
  data,
  from,
  to,
  palette = 'default',
  width,
  height = 200,
  emptyColor = '#eeeeee',
  minValue = 'auto',
  maxValue = 'auto',
  direction = 'horizontal',
  monthBorderWidth = 2,
  monthBorderColor = '#ffffff',
  monthLegendOffset = 10,
  dayBorderWidth = 2,
  dayBorderColor = '#ffffff',
  daySpacing = 0,
  isInteractive = true,
  onDayClick,
  className = '',
  margin = { top: 40, right: 40, bottom: 40, left: 40 },
}) => {
  // Resolve the color palette
  const colorPalette = typeof palette === 'string' ? getPalette(palette) : palette;
  const resolvedPalette = resolvePalette(colorPalette);

  return (
    <div className={`calendar-chart ${className}`}>
      <div className="calendar-chart__container" style={{ height }}>
        <ResponsiveCalendar
          data={data}
          from={from}
          to={to}
          margin={margin}
          emptyColor={emptyColor}
          colors={resolvedPalette.colors}
          minValue={minValue}
          maxValue={maxValue}
          direction={direction}
          monthBorderWidth={monthBorderWidth}
          monthBorderColor={monthBorderColor}
          monthLegendOffset={monthLegendOffset}
          dayBorderWidth={dayBorderWidth}
          dayBorderColor={dayBorderColor}
          daySpacing={daySpacing}
          isInteractive={isInteractive}
          {...(onDayClick && { onClick: onDayClick })}
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

export default CalendarChart;
