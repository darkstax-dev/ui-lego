import type { Meta, StoryObj } from '@storybook/react'
import DarkstaxDashboard from './DarkstaxDashboard'

const meta: Meta<typeof DarkstaxDashboard> = {
  title: 'Pages/DarkstaxDashboard',
  component: DarkstaxDashboard,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof DarkstaxDashboard>

export const Default: Story = {}
