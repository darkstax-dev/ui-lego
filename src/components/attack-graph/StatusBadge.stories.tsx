import type { Meta, StoryObj } from '@storybook/react-vite';
import { StatusBadge } from './StatusBadge';

const meta: Meta<typeof StatusBadge> = {
  title: 'Attack Graph/Components/StatusBadge',
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

export const Editable: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', flexDirection: 'column', alignItems: 'flex-start' }}>
      <p style={{ fontFamily: 'Macan Mono Trial, monospace', fontSize: '14px', color: '#00112B', marginBottom: '8px' }}>
        Click on the labels to edit the text
      </p>
      <StatusBadge label="status" variant="normal" editable />
      <StatusBadge label="datacenter" variant="medium" editable />
      <StatusBadge label="warning" variant="high" editable />
      <StatusBadge label="critical" variant="critical" editable />
    </div>
  ),
};
