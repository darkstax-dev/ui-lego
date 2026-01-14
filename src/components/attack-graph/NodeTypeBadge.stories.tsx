import type { Meta, StoryObj } from '@storybook/react-vite';
import { NodeTypeBadge } from './NodeTypeBadge';

const meta: Meta<typeof NodeTypeBadge> = {
  title: 'Attack Graph/Components/NodeTypeBadge',
  component: NodeTypeBadge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof NodeTypeBadge>;

export const Datacenter: Story = {
  args: {
    label: 'datacenter',
    backgroundColor: 'rgba(4, 81, 164, 0.20)',
    textColor: '#0451A4',
  },
};

export const Server: Story = {
  args: {
    label: 'server',
    backgroundColor: 'rgba(52, 168, 83, 0.20)',
    textColor: '#34A853',
  },
};

export const Workstation: Story = {
  args: {
    label: 'workstation',
    backgroundColor: 'rgba(234, 67, 53, 0.20)',
    textColor: '#EA4335',
  },
};

export const CustomColors: Story = {
  args: {
    label: 'custom',
    backgroundColor: 'rgba(251, 188, 4, 0.20)',
    textColor: '#FBBC04',
  },
};
