import type { Meta, StoryObj } from '@storybook/react-vite';
import { GraphStats } from './GraphStats';

const meta: Meta<typeof GraphStats> = {
  title: 'Attack Graph/Components/GraphStats',
  component: GraphStats,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    nodes: 22,
    edges: 31,
    optimal: 8,
  },
};

export const Empty: Story = {
  args: {
    nodes: 0,
    edges: 0,
    optimal: 0,
  },
};

export const LargeNumbers: Story = {
  args: {
    nodes: 156,
    edges: 243,
    optimal: 42,
  },
};
