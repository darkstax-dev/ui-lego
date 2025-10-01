import type { Meta, StoryObj } from '@storybook/react-vite';
import CirclePackingChart, { CirclePackingNode } from './CirclePackingChart';
import CirclePackingChartDemo from './CirclePackingChartDemo';
import { ComputedDatum } from '@nivo/circle-packing';
import { CirclePackingData } from './CirclePackingChart';

const meta: Meta<typeof CirclePackingChart> = {
  title: 'Charts/Circle Packing Chart',
  component: CirclePackingChart,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A configurable circle packing chart component built with Nivo that uses design tokens for consistent styling. Perfect for visualizing hierarchical data structures.',
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
    leavesOnly: {
      control: 'boolean',
      description: 'Whether to show only leaf nodes (innermost circles)',
    },
    enableLabels: {
      control: 'boolean',
      description: 'Whether to show labels on circles',
    },
    interactive: {
      control: 'boolean',
      description: 'Whether the chart is interactive',
    },
    animate: {
      control: 'boolean',
      description: 'Whether to animate the chart',
    },
    padding: {
      control: { type: 'range', min: 0, max: 10, step: 1 },
      description: 'Padding between circles',
    },
    height: {
      control: { type: 'range', min: 200, max: 600, step: 50 },
      description: 'Height of the chart',
    },
    labelsSkipRadius: {
      control: { type: 'range', min: 0, max: 20, step: 1 },
      description: 'Minimum radius to show labels',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample data for technology stack
const technologyData = {
  id: 'root',
  children: [
    {
      id: 'Frontend',
      children: [
        { id: 'React', value: 45 },
        { id: 'Vue', value: 28 },
        { id: 'Angular', value: 22 },
        { id: 'Svelte', value: 15 },
      ],
    },
    {
      id: 'Backend',
      children: [
        { id: 'Node.js', value: 38 },
        { id: 'Python', value: 35 },
        { id: 'Java', value: 32 },
        { id: 'Go', value: 18 },
        { id: 'Rust', value: 12 },
      ],
    },
    {
      id: 'Database',
      children: [
        { id: 'PostgreSQL', value: 42 },
        { id: 'MongoDB', value: 35 },
        { id: 'Redis', value: 25 },
        { id: 'MySQL', value: 20 },
      ],
    },
  ],
};

// Sample data for company structure
const companyData = {
  id: 'Company',
  children: [
    {
      id: 'Engineering',
      children: [
        { id: 'Frontend', value: 12 },
        { id: 'Backend', value: 15 },
        { id: 'DevOps', value: 8 },
        { id: 'Mobile', value: 10 },
      ],
    },
    {
      id: 'Product',
      children: [
        { id: 'PM', value: 6 },
        { id: 'Design', value: 8 },
        { id: 'Research', value: 4 },
      ],
    },
    {
      id: 'Sales',
      children: [
        { id: 'Enterprise', value: 8 },
        { id: 'SMB', value: 6 },
        { id: 'Support', value: 5 },
      ],
    },
  ],
};

// Sample data for market share
const marketData = {
  id: 'Market',
  children: [
    {
      id: 'Mobile OS',
      children: [
        { id: 'Android', value: 71 },
        { id: 'iOS', value: 28 },
        { id: 'Other', value: 1 },
      ],
    },
    {
      id: 'Browsers',
      children: [
        { id: 'Chrome', value: 65 },
        { id: 'Safari', value: 19 },
        { id: 'Edge', value: 8 },
        { id: 'Firefox', value: 6 },
        { id: 'Other', value: 2 },
      ],
    },
    {
      id: 'Cloud',
      children: [
        { id: 'AWS', value: 33 },
        { id: 'Azure', value: 22 },
        { id: 'GCP', value: 9 },
        { id: 'Other', value: 36 },
      ],
    },
  ],
};

export const Default: Story = {
  args: {
    data: technologyData,
    palette: 'default',
    height: 400,
    padding: 2,
    leavesOnly: false,
    enableLabels: true,
    interactive: true,
    animate: true,
    labelsSkipRadius: 8,
    borderWidth: 1,
    borderColor: 'var(--Divider-Light)',
  },
};

export const LeavesOnly: Story = {
  args: {
    data: technologyData,
    palette: 'blue',
    height: 400,
    padding: 3,
    leavesOnly: true,
    enableLabels: true,
    interactive: true,
    animate: true,
    labelsSkipRadius: 8,
    borderWidth: 1,
    borderColor: 'var(--Divider-Light)',
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows only the leaf nodes (innermost circles) for a cleaner visualization.',
      },
    },
  },
};

export const CompanyStructure: Story = {
  args: {
    data: companyData,
    palette: 'warm',
    height: 350,
    padding: 4,
    leavesOnly: false,
    enableLabels: true,
    interactive: true,
    animate: true,
    labelsSkipRadius: 6,
    borderWidth: 1,
    borderColor: 'var(--Divider-Light)',
  },
  parameters: {
    docs: {
      description: {
        story: 'Visualizing company organizational structure with warm color palette.',
      },
    },
  },
};

export const MarketShare: Story = {
  args: {
    data: marketData,
    palette: 'cool',
    height: 450,
    padding: 2,
    leavesOnly: false,
    enableLabels: true,
    interactive: true,
    animate: true,
    labelsSkipRadius: 6,
    borderWidth: 1,
    borderColor: 'var(--Divider-Light)',
  },
  parameters: {
    docs: {
      description: {
        story: 'Market share visualization using cool color palette.',
      },
    },
  },
};

export const Compact: Story = {
  args: {
    data: companyData,
    palette: 'default',
    height: 300,
    padding: 1,
    leavesOnly: true,
    enableLabels: false,
    interactive: true,
    animate: true,
    labelsSkipRadius: 15,
    borderWidth: 0,
  },
  parameters: {
    docs: {
      description: {
        story: 'Compact version without labels for a minimalist look.',
      },
    },
  },
};

export const HighPadding: Story = {
  args: {
    data: technologyData,
    palette: 'blue',
    height: 400,
    padding: 8,
    leavesOnly: false,
    enableLabels: true,
    interactive: true,
    animate: true,
    labelsSkipRadius: 5,
    borderWidth: 1,
    borderColor: 'var(--Divider-Light)',
  },
  parameters: {
    docs: {
      description: {
        story: 'High padding between circles for better separation.',
      },
    },
  },
};

export const Interactive: Story = {
  args: {
    ...Default.args,
    onClick: (node: ComputedDatum<CirclePackingData>) => {
      alert(`Clicked on ${node.id}${node.value ? ` (${node.value})` : ''}`);
    },
    onMouseEnter: (node: ComputedDatum<CirclePackingData>) => {
      console.log('Hovered:', node.id);
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Click on circles to see interactions. Check console for hover events.',
      },
    },
  },
};

export const Demo: Story = {
  render: () => <CirclePackingChartDemo />,
  parameters: {
    docs: {
      description: {
        story: 'Complete demo with multiple datasets, palette switching, and interactive controls.',
      },
    },
  },
};
