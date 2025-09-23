import type { Meta, StoryObj } from '@storybook/react';
import { LineChart } from './LineChart';

// Generate sample data for stories
const generateLineData = (series: number = 1) => {
  const hours = [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22];
  const seriesNames = ['Series A', 'Series B', 'Series C', 'Series D'];
  
  return Array.from({ length: series }, (_, i) => ({
    id: seriesNames[i] || `Series ${i + 1}`,
    data: hours.map(hour => ({
      x: hour,
      y: Math.random() * 0.3 + 0.5 + Math.sin((hour + i * 2) * 0.3) * 0.1,
    })),
  }));
};

// Traffic data matching Figma design
const trafficData = [
  {
    id: 'Traffic Volume',
    data: [
      { x: 0, y: 0.62 },
      { x: 2, y: 0.64 },
      { x: 4, y: 0.72 },
      { x: 6, y: 0.76 },
      { x: 8, y: 0.84 },
      { x: 10, y: 0.82 },
      { x: 12, y: 0.72 },
      { x: 14, y: 0.68 },
      { x: 16, y: 0.74 },
      { x: 20, y: 0.76 },
      { x: 22, y: 0.82 },
    ],
  },
];

const meta: Meta<typeof LineChart> = {
  title: 'Charts/LineChart',
  component: LineChart,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A responsive line chart component built with Nivo. Perfect for visualizing trends and data over time.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    data: {
      description: 'Array of data series with points',
      control: false,
    },
    palette: {
      description: 'Color palette to use for the chart',
      control: { type: 'select' },
      options: ['default', 'blue', 'warm', 'cool'],
    },
    width: {
      description: 'Chart width in pixels',
      control: { type: 'number', min: 300, max: 1200, step: 50 },
    },
    height: {
      description: 'Chart height in pixels',
      control: { type: 'number', min: 200, max: 800, step: 50 },
    },
    showLegend: {
      description: 'Whether to show the legend',
      control: { type: 'boolean' },
    },
    interactive: {
      description: 'Whether the chart is interactive',
      control: { type: 'boolean' },
    },
    animate: {
      description: 'Whether to animate the chart',
      control: { type: 'boolean' },
    },
    curve: {
      description: 'Curve interpolation method',
      control: { type: 'select' },
      options: ['basis', 'cardinal', 'catmullRom', 'linear', 'monotoneX', 'monotoneY', 'natural', 'step', 'stepAfter', 'stepBefore'],
    },
    enableArea: {
      description: 'Whether to show area under the line',
      control: { type: 'boolean' },
    },
    areaOpacity: {
      description: 'Opacity of the area fill',
      control: { type: 'range', min: 0, max: 1, step: 0.1 },
    },
    enablePoints: {
      description: 'Whether to show data points',
      control: { type: 'boolean' },
    },
    pointSize: {
      description: 'Size of data points',
      control: { type: 'number', min: 2, max: 20, step: 1 },
    },
    enableGridX: {
      description: 'Whether to show vertical grid lines',
      control: { type: 'boolean' },
    },
    enableGridY: {
      description: 'Whether to show horizontal grid lines',
      control: { type: 'boolean' },
    },
    enableSlices: {
      description: 'Enable slice tooltips',
      control: { type: 'select' },
      options: ['x', 'y', false],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: generateLineData(1),
    height: 400,
    showLegend: false,
    interactive: true,
    animate: true,
    curve: 'catmullRom',
    enableArea: true,
    areaOpacity: 0.3,
    enablePoints: true,
    pointSize: 8,
    enableGridX: false,
    enableGridY: true,
    enableSlices: 'x',
  },
};

export const TrafficVolume: Story = {
  args: {
    data: trafficData,
    height: 400,
    showLegend: false,
    enableArea: true,
    areaOpacity: 0.6,
    curve: 'catmullRom',
    yScale: {
      type: 'linear',
      min: 0.6,
      max: 0.9,
    },
    axisLeft: {
      legend: 'Traffic volume in %',
      legendPosition: 'middle',
      legendOffset: -60,
      format: (value: any) => value.toFixed(2),
    },
    axisBottom: {
      legend: 'Time (Hour)',
      legendPosition: 'middle',
      legendOffset: 40,
    },
  },
};

export const MultiSeries: Story = {
  args: {
    data: generateLineData(3),
    height: 400,
    showLegend: true,
    enableArea: false,
    pointSize: 6,
    curve: 'catmullRom',
  },
};

export const AreaBaseline: Story = {
  args: {
    data: trafficData,
    height: 420,
    showLegend: false,
    enableArea: true,
    areaOpacity: 0.5,
    curve: 'catmullRom',
    yScale: { type: 'linear', min: 0.5, max: 0.9 },
    axisLeft: { legend: 'Value', legendPosition: 'middle', legendOffset: -70, tickPadding: 10, format: (v: any) => Number(v).toFixed(2) },
    axisBottom: { legend: 'Time', legendPosition: 'middle', legendOffset: 40 },
  },
};

export const SmoothVsStepped: Story = {
  args: {
    data: generateLineData(2),
    height: 380,
    showLegend: true,
    enableArea: true,
    areaOpacity: 0.25,
    curve: 'catmullRom',
    pointSize: 6,
  },
};

export const LargeMarginSpacing: Story = {
  args: {
    ...Default.args,
    data: generateLineData(1),
    height: 400,
    curve: 'catmullRom',
    enableArea: true,
    areaOpacity: 0.3,
    axisLeft: { legend: 'Value', legendPosition: 'middle', legendOffset: -80, tickPadding: 12 },
    axisBottom: { legend: 'Time', legendPosition: 'middle', legendOffset: 44 },
    margin: { top: 50, right: 60, bottom: 80, left: 90 },
  },
};

export const BluePalette: Story = {
  args: {
    ...Default.args,
    palette: 'blue',
    data: generateLineData(2),
    showLegend: true,
  },
};

export const WarmPalette: Story = {
  args: {
    ...Default.args,
    palette: 'warm',
    data: generateLineData(2),
    showLegend: true,
    enableArea: false,
  },
};

export const CoolPalette: Story = {
  args: {
    ...Default.args,
    palette: 'cool',
    data: generateLineData(2),
    showLegend: true,
    curve: 'cardinal',
  },
};

export const LinearCurve: Story = {
  args: {
    ...Default.args,
    curve: 'linear',
    enableArea: false,
    pointSize: 10,
  },
};

export const StepCurve: Story = {
  args: {
    ...Default.args,
    curve: 'step',
    enableArea: false,
    enableGridX: true,
    pointSize: 6,
  },
};

export const AreaChart: Story = {
  args: {
    ...Default.args,
    data: generateLineData(3),
    showLegend: true,
    enableArea: true,
    areaOpacity: 0.4,
    enablePoints: false,
    curve: 'cardinal',
  },
};

export const NoPoints: Story = {
  args: {
    ...Default.args,
    enablePoints: false,
    curve: 'basis',
  },
};

export const NoArea: Story = {
  args: {
    ...Default.args,
    enableArea: false,
    pointSize: 10,
  },
};

export const CustomSize: Story = {
  args: {
    ...Default.args,
    width: 600,
    height: 300,
  },
};

export const NonInteractive: Story = {
  args: {
    ...Default.args,
    interactive: false,
    animate: false,
    enableSlices: false,
  },
};

// Performance data example
export const PerformanceMetrics: Story = {
  args: {
    data: [
      {
        id: 'CPU Usage',
        data: Array.from({ length: 24 }, (_, i) => ({
          x: i,
          y: Math.random() * 30 + 20 + Math.sin(i * 0.5) * 10,
        })),
      },
      {
        id: 'Memory Usage',
        data: Array.from({ length: 24 }, (_, i) => ({
          x: i,
          y: Math.random() * 40 + 30 + Math.cos(i * 0.3) * 8,
        })),
      },
      {
        id: 'Network I/O',
        data: Array.from({ length: 24 }, (_, i) => ({
          x: i,
          y: Math.random() * 20 + 10 + Math.sin(i * 0.8) * 5,
        })),
      },
    ],
    height: 400,
    showLegend: true,
    palette: 'cool',
    enableArea: true,
    areaOpacity: 0.2,
    curve: 'catmullRom',
    axisLeft: {
      legend: 'Usage (%)',
      legendPosition: 'middle',
      legendOffset: -40,
    },
    axisBottom: {
      legend: 'Time (Hours)',
      legendPosition: 'middle',
      legendOffset: 36,
    },
  },
};
