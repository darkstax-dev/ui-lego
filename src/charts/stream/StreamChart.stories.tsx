import type { Meta, StoryObj } from '@storybook/react-vite';
import { StreamChart } from './StreamChart';
import StreamChartDemo from './StreamChartDemo';

// Generate sample data for stories
const generateData = (points: number = 11) => {
  const data = [];
  for (let i = 0; i < points; i++) {
    data.push({
      x: i,
      Engineering: Math.floor(Math.random() * 200) + 300 + Math.sin(i * 0.5) * 100,
      Design: Math.floor(Math.random() * 150) + 150 + Math.cos(i * 0.3) * 80,
      Marketing: Math.floor(Math.random() * 120) + 100 + Math.sin(i * 0.8) * 60,
      Sales: Math.floor(Math.random() * 80) + 50 + Math.cos(i * 0.6) * 40,
    });
  }
  return data;
};

const sampleData = generateData();

const meta: Meta<typeof StreamChart> = {
  title: 'Charts/StreamChart',
  component: StreamChart,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A responsive stream chart component built with Nivo. Perfect for visualizing data flow over time with multiple categories.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    data: {
      description: 'Array of data points with keys for each stream layer',
      control: false,
    },
    keys: {
      description: 'Array of keys to create stream layers from',
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
    offsetType: {
      description: 'Stream offset type',
      control: { type: 'select' },
      options: ['diverging', 'expand', 'none', 'silhouette', 'wiggle'],
    },
    order: {
      description: 'Layer ordering method',
      control: { type: 'select' },
      options: ['ascending', 'descending', 'insideOut', 'none', 'reverse'],
    },
  },
};

export default meta;
export type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: sampleData,
    keys: ['Engineering', 'Design', 'Marketing', 'Sales'],
    height: 400,
    showLegend: true,
    interactive: true,
    animate: true,
    curve: 'catmullRom',
    offsetType: 'wiggle',
    order: 'none',
  },
};

export const BluePalette: Story = {
  args: {
    ...Default.args,
    palette: 'blue',
  },
};

export const WarmPalette: Story = {
  args: {
    ...Default.args,
    palette: 'warm',
  },
};

export const CoolPalette: Story = {
  args: {
    ...Default.args,
    palette: 'cool',
  },
};

export const Silhouette: Story = {
  args: {
    ...Default.args,
    offsetType: 'silhouette',
    curve: 'basis',
  },
};

export const Diverging: Story = {
  args: {
    ...Default.args,
    offsetType: 'diverging',
    curve: 'cardinal',
  },
};

export const Expand: Story = {
  args: {
    ...Default.args,
    offsetType: 'expand',
    curve: 'natural',
  },
};

export const LinearCurve: Story = {
  args: {
    ...Default.args,
    curve: 'linear',
  },
};

export const NoLegend: Story = {
  args: {
    ...Default.args,
    showLegend: false,
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
  },
};

// Simple 3-category example
export const Simple: Story = {
  args: {
    data: generateData(8),
    keys: ['Category A', 'Category B', 'Category C'],
    height: 350,
    showLegend: true,
    palette: 'cool',
    curve: 'catmullRom',
    offsetType: 'wiggle',
  },
};

// Many categories example
export const ManyCategories: Story = {
  args: {
    data: Array.from({ length: 10 }, (_, i) => ({
      x: i,
      'Category 1': Math.floor(Math.random() * 100) + 50,
      'Category 2': Math.floor(Math.random() * 100) + 50,
      'Category 3': Math.floor(Math.random() * 100) + 50,
      'Category 4': Math.floor(Math.random() * 100) + 50,
      'Category 5': Math.floor(Math.random() * 100) + 50,
      'Category 6': Math.floor(Math.random() * 100) + 50,
    })),
    keys: ['Category 1', 'Category 2', 'Category 3', 'Category 4', 'Category 5', 'Category 6'],
    height: 400,
    showLegend: true,
    palette: 'default',
  },
};

export const Demo: Story = {
  render: () => <StreamChartDemo />,
  parameters: {
    docs: {
      description: {
        story: 'Complete demo with multiple datasets and palette switching.',
      },
    },
  },
};
