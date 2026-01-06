import type { Meta, StoryObj } from '@storybook/react-vite'
import { Toast } from './Toast'

const meta: Meta<typeof Toast> = {
  title: 'Network Components/Toast',
  component: Toast,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#F5F5F5' },
        { name: 'dark', value: '#333333' },
      ],
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    location: 'Denver',
    potentialImpact: 'PIP, Financial records',
    threatLevel: 'High',
    badActorSource: '128.39.202.55',
  },
}

export const DifferentLocation: Story = {
  args: {
    location: 'New York',
    potentialImpact: 'Customer data, Infrastructure',
    threatLevel: 'Critical',
    badActorSource: '192.168.1.100',
  },
}

export const LowThreat: Story = {
  args: {
    location: 'San Francisco',
    potentialImpact: 'Minor data access',
    threatLevel: 'Low',
    badActorSource: '10.0.0.25',
  },
}
