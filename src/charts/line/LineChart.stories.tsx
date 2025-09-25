import type { Meta, StoryObj } from '@storybook/react-vite';
import { LineChart } from './LineChart';
import LineChartDemo from './LineChartDemo';

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
export type Story = StoryObj<typeof meta>;

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

export const Demo: Story = {
  render: () => <LineChartDemo />,
  parameters: {
    docs: {
      description: {
        story: 'Complete demo with multiple datasets and palette switching.',
      },
    },
  },
};
