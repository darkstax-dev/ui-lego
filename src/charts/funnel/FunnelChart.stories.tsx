import type { Meta, StoryObj } from '@storybook/react-vite';
import { FunnelChart } from './FunnelChart';
import FunnelChartDemo from './FunnelChartDemo';

// Generate sample data for stories
const salesFunnelData = [
  { id: 'step_1', value: 10000, label: 'Website Visits' },
  { id: 'step_2', value: 5000, label: 'Sign Ups' },
  { id: 'step_3', value: 2500, label: 'Trial Started' },
  { id: 'step_4', value: 1200, label: 'Active Users' },
  { id: 'step_5', value: 800, label: 'Paid Customers' },
];

const recruitmentFunnelData = [
  { id: 'stage_1', value: 500, label: 'Applications' },
  { id: 'stage_2', value: 250, label: 'Phone Screen' },
  { id: 'stage_3', value: 100, label: 'First Interview' },
  { id: 'stage_4', value: 40, label: 'Second Interview' },
  { id: 'stage_5', value: 15, label: 'Offers' },
  { id: 'stage_6', value: 12, label: 'Accepted' },
];

const marketingFunnelData = [
  { id: 'awareness', value: 100000, label: 'Awareness' },
  { id: 'interest', value: 50000, label: 'Interest' },
  { id: 'consideration', value: 20000, label: 'Consideration' },
  { id: 'intent', value: 8000, label: 'Intent' },
  { id: 'purchase', value: 3000, label: 'Purchase' },
];

const meta: Meta<typeof FunnelChart> = {
  title: 'Charts/FunnelChart',
  component: FunnelChart,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A responsive funnel chart component built with Nivo. Perfect for visualizing conversion rates and multi-stage processes.',
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: '600px', height: '500px' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    data: {
      description: 'Array of funnel stages with values',
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
    direction: {
      description: 'Funnel direction',
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
    },
    interpolation: {
      description: 'Shape interpolation method',
      control: { type: 'select' },
      options: ['smooth', 'linear'],
    },
    spacing: {
      description: 'Spacing between funnel parts',
      control: { type: 'number', min: 0, max: 20, step: 1 },
    },
    shapeBlending: {
      description: 'Shape blending ratio',
      control: { type: 'number', min: 0, max: 1, step: 0.1 },
    },
    enableLabel: {
      description: 'Enable part labels',
      control: { type: 'boolean' },
    },
  },
};

export default meta;
export type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: salesFunnelData,
    height: 400,
    width: 800,
    showLegend: true,
    interactive: true,
    animate: true,
    direction: 'horizontal',
    interpolation: 'smooth',
    spacing: 3,
    shapeBlending: 0.66,
    enableLabel: true,
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

export const Vertical: Story = {
  args: {
    ...Default.args,
    direction: 'vertical',
    height: 600,
    width: 400,
  },
};

export const LinearInterpolation: Story = {
  args: {
    ...Default.args,
    interpolation: 'linear',
  },
};

export const WithSpacing: Story = {
  args: {
    ...Default.args,
    spacing: 10,
  },
};

export const NoBlending: Story = {
  args: {
    ...Default.args,
    shapeBlending: 0,
  },
};

export const FullBlending: Story = {
  args: {
    ...Default.args,
    shapeBlending: 1,
  },
};

export const NoLabels: Story = {
  args: {
    ...Default.args,
    enableLabel: false,
  },
};

export const NoLegend: Story = {
  args: {
    ...Default.args,
    showLegend: false,
  },
};

export const RecruitmentFunnel: Story = {
  args: {
    data: recruitmentFunnelData,
    height: 400,
    width: 800,
    showLegend: true,
    palette: 'cool',
    direction: 'horizontal',
    interpolation: 'smooth',
  },
};

export const MarketingFunnel: Story = {
  args: {
    data: marketingFunnelData,
    height: 400,
    width: 800,
    showLegend: true,
    palette: 'warm',
    direction: 'horizontal',
    interpolation: 'smooth',
  },
};

export const CompactVertical: Story = {
  args: {
    data: salesFunnelData,
    height: 500,
    width: 300,
    showLegend: false,
    direction: 'vertical',
    spacing: 5,
  },
};

export const NonInteractive: Story = {
  args: {
    ...Default.args,
    interactive: false,
    animate: false,
  },
};

export const Demo: Story = {
  render: () => <FunnelChartDemo />,
  parameters: {
    docs: {
      description: {
        story: 'Complete demo with multiple datasets and palette switching.',
      },
    },
  },
};
