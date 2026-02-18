import type { Meta, StoryObj } from '@storybook/react'
import CognitiveServerDashboard from './CognitiveServerDashboard'

const meta: Meta<typeof CognitiveServerDashboard> = {
  title: 'Upcoming Pages/CognitiveServerDashboard',
  component: CognitiveServerDashboard,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof CognitiveServerDashboard>

export const Default: Story = {}
