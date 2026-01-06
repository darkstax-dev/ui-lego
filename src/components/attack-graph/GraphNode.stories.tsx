import type { Meta, StoryObj } from '@storybook/react-vite';
import { GraphNode } from './GraphNode';

const meta: Meta<typeof GraphNode> = {
  title: 'Attack Graph/Components/GraphNode',
  component: GraphNode,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof GraphNode>;

export const Default: Story = {
  args: {
    label: 'Node\nName',
  },
};

export const WithTooltip: Story = {
  args: {
    label: 'Node\nName',
    tooltipData: {
      type: 'datacenter',
      priority: '9.5',
      criticality: '9.4',
      status: 'operational',
    },
  },
};

export const CustomLabel: Story = {
  args: {
    label: 'Server\n001',
    tooltipData: {
      type: 'server',
      priority: '7.2',
      criticality: '8.1',
      status: 'active',
    },
  },
};
