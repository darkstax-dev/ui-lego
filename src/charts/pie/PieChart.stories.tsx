import type { Meta, StoryObj } from '@storybook/react';
import PieChart from './PieChart';
import PieChartDemo from './PieChartDemo';

const meta: Meta<typeof PieChart> = {
  title: 'Charts/Pie Chart',
  component: PieChart,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A configurable pie chart component built with Nivo that uses design tokens for consistent styling.',
      },
    },
  },
  tags: ['autodocs'],
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
    interactive: {
      control: 'boolean',
      description: 'Whether the chart is interactive',
    },
    animate: {
      control: 'boolean',
      description: 'Whether to animate the chart',
    },
    innerRadius: {
      control: { type: 'range', min: 0, max: 0.9, step: 0.1 },
      description: 'Inner radius of the donut (0 for full pie)',
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
const programmingLanguagesData = [
  { id: 'haskell', label: 'haskell', value: 37.1 },
  { id: 'rust', label: 'Rust', value: 588 },
  { id: 'stylus', label: 'stylus', value: 109 },
  { id: 'lisp', label: 'Lisp', value: 279 },
  { id: 'ruby', label: 'Ruby', value: 265 },
];

const salesData = [
  { id: 'q1', label: 'Q1 Sales', value: 125000 },
  { id: 'q2', label: 'Q2 Sales', value: 148000 },
  { id: 'q3', label: 'Q3 Sales', value: 167000 },
  { id: 'q4', label: 'Q4 Sales', value: 152000 },
];

export const Default: Story = {
  args: {
    data: programmingLanguagesData,
    total: '5,2M',
    totalLabel: 'TOTAL',
    palette: 'default',
    showLegend: true,
    interactive: true,
    animate: true,
    height: 400,
    innerRadius: 0.6,
  },
};

export const CompactDonut: Story = {
  args: {
    data: programmingLanguagesData,
    total: '5,2M',
    totalLabel: 'TOTAL',
    palette: 'blue',
    showLegend: false,
    interactive: true,
    animate: true,
    height: 300,
    innerRadius: 0.75,
  },
};

export const FullPie: Story = {
  args: {
    data: salesData,
    total: 592000,
    totalLabel: 'REVENUE',
    palette: 'warm',
    showLegend: true,
    interactive: true,
    animate: true,
    height: 350,
    innerRadius: 0,
  },
};

export const CoolPalette: Story = {
  args: {
    data: [
      { id: 'product-a', label: 'Product A', value: 45 },
      { id: 'product-b', label: 'Product B', value: 28 },
      { id: 'product-c', label: 'Product C', value: 15 },
      { id: 'product-d', label: 'Product D', value: 12 },
    ],
    total: '100%',
    totalLabel: 'MARKET',
    palette: 'cool',
    showLegend: true,
    interactive: true,
    animate: true,
    height: 400,
    innerRadius: 0.5,
  },
};

export const Interactive: Story = {
  args: {
    ...Default.args,
    onSliceClick: (slice: any) => {
      alert(`Clicked on ${slice.data.label}: ${slice.data.value}`);
    },
    onSliceHover: (slice: any) => {
      console.log('Hovered:', slice.data.label);
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Click on slices to see interactions. Check console for hover events.',
      },
    },
  },
};

export const Demo: Story = {
  render: () => <PieChartDemo />,
  parameters: {
    docs: {
      description: {
        story: 'Complete demo with multiple datasets and palette switching.',
      },
    },
  },
};
