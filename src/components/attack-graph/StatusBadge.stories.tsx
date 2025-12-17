import type { Meta, StoryObj } from '@storybook/react';
import { StatusBadge } from './StatusBadge';

const meta: Meta<typeof StatusBadge> = {
  title: 'Attack Graph Components/StatusBadge',
  component: StatusBadge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['normal', 'medium', 'high', 'critical'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof StatusBadge>;

export const Normal: Story = {
  args: {
    label: 'status',
    variant: 'normal',
  },
};

export const Medium: Story = {
  args: {
    label: 'datacenter',
    variant: 'medium',
  },
};

export const High: Story = {
  args: {
    label: 'warning',
    variant: 'high',
  },
};

export const Critical: Story = {
  args: {
    label: 'critical',
    variant: 'critical',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', flexDirection: 'column', alignItems: 'flex-start' }}>
      <StatusBadge label="status" variant="normal" />
      <StatusBadge label="datacenter" variant="medium" />
      <StatusBadge label="warning" variant="high" />
      <StatusBadge label="critical" variant="critical" />
    </div>
  ),
};
