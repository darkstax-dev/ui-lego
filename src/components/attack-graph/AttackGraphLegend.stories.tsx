import type { Meta, StoryObj } from '@storybook/react-vite';
import { AttackGraphLegend } from './AttackGraphLegend';

const meta: Meta<typeof AttackGraphLegend> = {
  title: 'Attack Graph/Components/AttackGraphLegend',
  component: AttackGraphLegend,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
