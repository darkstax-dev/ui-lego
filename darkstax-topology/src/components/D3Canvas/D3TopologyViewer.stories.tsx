import type { Meta, StoryObj } from '@storybook/react';
import { D3TopologyViewer } from './D3TopologyViewer';

const meta: Meta<typeof D3TopologyViewer> = {
  title: 'Topology/D3TopologyViewer',
  component: D3TopologyViewer,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof D3TopologyViewer>;

export const Default: Story = {
  args: {
    wsUrl: 'ws://localhost:8080',
    autoConnect: false,
  },
};

export const WithAutoConnect: Story = {
  args: {
    wsUrl: 'ws://localhost:8080',
    autoConnect: true,
  },
};
