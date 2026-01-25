import type { Meta, StoryObj } from '@storybook/react';
import { TopologyLegend } from './TopologyLegend';

const meta: Meta<typeof TopologyLegend> = {
  title: 'Components/TopologyLegend',
  component: TopologyLegend,
  decorators: [
    (Story) => (
      <div style={{ padding: '20px', background: '#f9fafb' }}>
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof TopologyLegend>;

export const Default: Story = {};
