import type { Meta, StoryObj } from '@storybook/react-vite';
import { GraphNode } from './GraphNode';

const meta: Meta<typeof GraphNode> = {
  title: 'Attack Graph/Components/GraphNode',
  component: GraphNode,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '400px',
        padding: '40px'
      }}>
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof GraphNode>;

export const Default: Story = {
  args: {
    label: 'Node\nName',
  },
};

export const DatacenterWithTooltip: Story = {
  args: {
    label: 'Data\nCenter',
    tooltipData: {
      type: 'datacenter',
      priority: '9.5',
      criticality: '9.4',
      status: 'operational',
    },
  },
};

export const ServerWithTooltip: Story = {
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

export const WorkstationWithTooltip: Story = {
  args: {
    label: 'Work\nStation',
    tooltipData: {
      type: 'workstation',
      priority: '3.8',
      criticality: '4.2',
      status: 'inactive',
    },
  },
};
