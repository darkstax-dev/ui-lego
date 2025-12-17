import type { Meta, StoryObj } from '@storybook/react';
import { AttackGraphDemo } from './AttackGraphDemo';

const meta: Meta<typeof AttackGraphDemo> = {
  title: 'Attack Graph Components/Demo',
  component: AttackGraphDemo,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof AttackGraphDemo>;

export const Default: Story = {};
