import type { Meta, StoryObj } from '@storybook/react';
import { VisualizationModes } from './VisualizationModes';

const meta: Meta<typeof VisualizationModes> = {
  title: 'Controls/VisualizationModes',
  component: VisualizationModes,
  decorators: [
    (Story) => (
      <div style={{ width: '100%', height: '200px', position: 'relative', background: '#f3f4f6' }}>
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof VisualizationModes>;

export const Default: Story = {};
