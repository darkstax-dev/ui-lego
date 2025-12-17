import type { Meta, StoryObj } from '@storybook/react-vite';
import { NodeTooltip } from './NodeTooltip';

const meta: Meta<typeof NodeTooltip> = {
  title: 'Attack Graph Components/NodeTooltip',
  component: NodeTooltip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof NodeTooltip>;

export const Default: Story = {
  args: {
    type: 'datacenter',
    priority: '9.5',
    criticality: '9.4',
    status: 'operational',
  },
};

export const HighPriority: Story = {
  args: {
    type: 'server',
    priority: '10.0',
    criticality: '9.8',
    status: 'critical',
  },
};

export const LowPriority: Story = {
  args: {
    type: 'workstation',
    priority: '3.2',
    criticality: '2.1',
    status: 'inactive',
  },
};
