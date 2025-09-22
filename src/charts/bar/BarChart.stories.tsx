import type { Meta, StoryObj } from '@storybook/react';
import BarChart from './BarChart';
import BarChartDemo from './BarChartDemo';

const meta: Meta<typeof BarChart> = {
  title: 'Charts/Bar Chart',
  component: BarChart,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A configurable bar chart component built with Nivo that uses design tokens for consistent styling. Based on the Figma design with protocol usage data.',
      },
    },
  },
  tags: ['autodocs'],
  args: {
    data: [
      { id: 'ssh', label: 'SSH', value: 0.43 },
      { id: 'ftp', label: 'FTP', value: 0.3 },
      { id: 'http', label: 'HTTP', value: 0.065 },
      { id: 'other', label: 'Other', value: 0.15 },
    ],
    palette: 'default',
    showLegend: false,
    showGrid: true,
    interactive: true,
    animate: true,
    height: 400,
    axisLeft: {
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: 'Food',
      legendPosition: 'middle',
      legendOffset: -40,
    },
    axisBottom: {
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: 'Country',
      legendPosition: 'middle',
      legendOffset: 32,
    },
  },
  argTypes: {
    palette: {
      control: 'select',
      options: ['default', 'blue', 'warm', 'cool'],
      description: 'Color palette for the chart',
    },
    showLegend: {
      control: 'boolean',
      description: 'Whether to show the legend',
    },
    showGrid: {
      control: 'boolean',
      description: 'Whether to show grid lines',
    },
    interactive: {
      control: 'boolean',
      description: 'Whether the chart is interactive',
    },
    animate: {
      control: 'boolean',
      description: 'Whether to animate the chart',
    },
    height: {
      control: { type: 'range', min: 200, max: 600, step: 50 },
      description: 'Height of the chart',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample data based on Figma design
const protocolData = [
  { id: 'ssh', label: 'SSH', value: 0.43 },
  { id: 'ftp', label: 'FTP', value: 0.30 },
  { id: 'http', label: 'HTTP', value: 0.065 },
  { id: 'other', label: 'Other', value: 0.15 },
];

const salesData = [
  { id: 'q1', label: 'Q1 Sales', value: 125000 },
  { id: 'q2', label: 'Q2 Sales', value: 148000 },
  { id: 'q3', label: 'Q3 Sales', value: 167000 },
  { id: 'q4', label: 'Q4 Sales', value: 152000 },
];

const performanceData = [
  { id: 'cpu', label: 'CPU Usage', value: 85.3 },
  { id: 'memory', label: 'Memory', value: 67.8 },
  { id: 'disk', label: 'Disk I/O', value: 23.1 },
  { id: 'network', label: 'Network', value: 92.4 },
];

const regionData = [
  { id: 'us-east', label: 'US East', value: 342 },
  { id: 'us-west', label: 'US West', value: 278 },
  { id: 'europe', label: 'Europe', value: 198 },
  { id: 'asia', label: 'Asia', value: 156 },
  { id: 'australia', label: 'Australia', value: 89 },
];

export const Default: Story = {
  args: {
    data: protocolData,
    palette: 'default',
    showLegend: false,
    showGrid: true,
    interactive: true,
    animate: true,
    height: 400,
    axisLeft: {
      tickSize: 0,
      tickPadding: 16,
      tickRotation: 0,
      legend: 'Food',
      legendPosition: 'middle',
      legendOffset: -50,
    },
    axisBottom: {
      tickSize: 0,
      tickPadding: 16,
      tickRotation: 0,
      legend: 'Country',
      legendPosition: 'middle',
      legendOffset: 40,
    },
  },
};

export const WithLegend: Story = {
  args: {
    data: salesData,
    palette: 'blue',
    showLegend: true,
    showGrid: true,
    interactive: true,
    animate: true,
    height: 400,
    axisLeft: {
      tickSize: 0,
      tickPadding: 16,
      tickRotation: 0,
      legend: 'Revenue ($)',
      legendPosition: 'middle',
      legendOffset: -50,
    },
    axisBottom: {
      tickSize: 0,
      tickPadding: 16,
      tickRotation: 0,
      legend: 'Quarter',
      legendPosition: 'middle',
      legendOffset: 40,
    },
  },
};

export const Performance: Story = {
  args: {
    data: performanceData,
    palette: 'warm',
    showLegend: false,
    showGrid: true,
    interactive: true,
    animate: true,
    height: 350,
    axisLeft: {
      tickSize: 0,
      tickPadding: 16,
      tickRotation: 0,
      legend: 'Usage (%)',
      legendPosition: 'middle',
      legendOffset: -50,
    },
    axisBottom: {
      tickSize: 0,
      tickPadding: 16,
      tickRotation: 0,
      legend: 'Metric',
      legendPosition: 'middle',
      legendOffset: 40,
    },
  },
};

export const Regional: Story = {
  args: {
    data: regionData,
    palette: 'cool',
    showLegend: false,
    showGrid: true,
    interactive: true,
    animate: true,
    height: 400,
    axisLeft: {
      tickSize: 0,
      tickPadding: 16,
      tickRotation: 0,
      legend: 'Activity Count',
      legendPosition: 'middle',
      legendOffset: -50,
    },
    axisBottom: {
      tickSize: 0,
      tickPadding: 16,
      tickRotation: 0,
      legend: 'Region',
      legendPosition: 'middle',
      legendOffset: 40,
    },
  },
};

export const Compact: Story = {
  args: {
    data: protocolData,
    palette: 'blue',
    showLegend: false,
    showGrid: false,
    interactive: true,
    animate: true,
    height: 300,
    margin: { top: 20, right: 20, bottom: 40, left: 40 },
    axisLeft: {
      tickSize: 0,
      tickPadding: 12,
      tickRotation: 0,
    },
    axisBottom: {
      tickSize: 0,
      tickPadding: 12,
      tickRotation: 0,
    },
  },
};

export const Interactive: Story = {
  args: {
    ...Default.args,
    onBarClick: (bar: any) => {
      alert(`Clicked on ${bar.data.label}: ${bar.data.value}`);
    },
    onBarHover: (bar: any) => {
      console.log('Hovered:', bar.data.label);
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Click on bars to see interactions. Check console for hover events.',
      },
    },
  },
};

export const CustomMargins: Story = {
  args: {
    data: salesData,
    palette: 'warm',
    showLegend: false,
    showGrid: true,
    interactive: true,
    animate: true,
    height: 450,
    margin: { top: 60, right: 80, bottom: 80, left: 80 },
    axisLeft: {
      tickSize: 0,
      tickPadding: 20,
      tickRotation: 0,
      legend: 'Revenue ($)',
      legendPosition: 'middle',
      legendOffset: -60,
    },
    axisBottom: {
      tickSize: 0,
      tickPadding: 20,
      tickRotation: 0,
      legend: 'Quarter',
      legendPosition: 'middle',
      legendOffset: 50,
    },
  },
};

export const NoGrid: Story = {
  args: {
    data: performanceData,
    palette: 'default',
    showLegend: false,
    showGrid: false,
    interactive: true,
    animate: true,
    height: 350,
    axisLeft: {
      tickSize: 0,
      tickPadding: 16,
      tickRotation: 0,
      legend: 'Usage (%)',
      legendPosition: 'middle',
      legendOffset: -50,
    },
    axisBottom: {
      tickSize: 0,
      tickPadding: 16,
      tickRotation: 0,
      legend: 'Metric',
      legendPosition: 'middle',
      legendOffset: 40,
    },
  },
};

export const Demo: Story = {
  render: () => <BarChartDemo />,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Complete demo with multiple datasets, palette switching, and interactive controls.',
      },
    },
  },
};
