import type { Meta, StoryObj } from '@storybook/react-vite';
import { NodeTooltip } from './NodeTooltip';

const meta: Meta<typeof NodeTooltip> = {
  title: 'Attack Graph/Components/NodeTooltip',
  component: NodeTooltip,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '300px',
        padding: '40px'
      }}>
        <div style={{ position: 'relative' }}>
          <Story />
        </div>
      </div>
    ),
  ],
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof NodeTooltip>;

export const Default: Story = {
  args: {
    type: 'datacenter',
    priority: '9.5',
    criticality: '9.4',
    status: 'operational',
    typeBackgroundColor: 'rgba(4, 81, 164, 0.20)',
    typeTextColor: '#0451A4',
  },
};

export const Server: Story = {
  args: {
    type: 'server',
    priority: '10.0',
    criticality: '9.8',
    status: 'critical',
    typeBackgroundColor: 'rgba(52, 168, 83, 0.20)',
    typeTextColor: '#34A853',
  },
};

export const Workstation: Story = {
  args: {
    type: 'workstation',
    priority: '3.2',
    criticality: '2.1',
    status: 'inactive',
    typeBackgroundColor: 'rgba(234, 67, 53, 0.20)',
    typeTextColor: '#EA4335',
  },
};
