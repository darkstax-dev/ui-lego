import type { Meta, StoryObj } from '@storybook/react'
import MenuDemo from './MenuDemo'

const meta: Meta<typeof MenuDemo> = {
  title: 'Main Components/Basic Menu/Menu Demo',
  component: MenuDemo,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof MenuDemo>

export const Default: Story = {}
