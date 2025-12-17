import type { Meta, StoryObj } from '@storybook/react';
import { ConnectorLine } from './ConnectorLine';

const meta: Meta<typeof ConnectorLine> = {
  title: 'Attack Graph Components/ConnectorLine',
  component: ConnectorLine,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ConnectorLine>;

export const Default: Story = {
  args: {
    startX: 0,
    startY: 0,
    endX: 200,
    endY: 300,
    curved: true,
  },
};

export const Straight: Story = {
  args: {
    startX: 0,
    startY: 0,
    endX: 150,
    endY: 150,
    curved: false,
  },
};

export const ShortCurved: Story = {
  args: {
    startX: 0,
    startY: 0,
    endX: 100,
    endY: 100,
    curved: true,
  },
};
