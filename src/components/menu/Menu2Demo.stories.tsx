import type { Meta, StoryObj } from '@storybook/react'
import Menu2Demo from './Menu2Demo'

const meta: Meta<typeof Menu2Demo> = {
  title: 'Components/Menu2/Demo',
  component: Menu2Demo,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof Menu2Demo>

export const Default: Story = {}
