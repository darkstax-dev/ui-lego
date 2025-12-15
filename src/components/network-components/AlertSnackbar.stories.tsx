import type { Meta, StoryObj } from '@storybook/react'
import { AlertSnackbar } from './AlertSnackbar'

const meta: Meta<typeof AlertSnackbar> = {
  title: 'Network Components/AlertSnackbar',
  component: AlertSnackbar,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#00112B' },
      ],
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof AlertSnackbar>

export const Default: Story = {
  args: {
    location: 'Denver',
    potentialImpact: 'PIP, Financial records',
    threatLevel: 'High',
    badActorSource: '128.39.202.55',
  },
}

export const MediumThreat: Story = {
  args: {
    location: 'New York',
    potentialImpact: 'User data, Authentication',
    threatLevel: 'Medium',
    badActorSource: '192.168.1.100',
  },
}

export const LowThreat: Story = {
  args: {
    location: 'San Francisco',
    potentialImpact: 'Public files',
    threatLevel: 'Low',
    badActorSource: '10.0.0.1',
  },
}
