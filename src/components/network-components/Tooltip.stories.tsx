import type { Meta, StoryObj } from '@storybook/react-vite'
import { Tooltip } from './Tooltip'

const meta: Meta<typeof Tooltip> = {
  title: 'Network Components/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Top: Story = {
  args: {
    placement: 'top',
    children: '209.122.164.144\nTown',
  },
}

export const Bottom: Story = {
  args: {
    placement: 'bottom',
    children: '209.122.164.144\nTown',
  },
}

export const IPAddress: Story = {
  args: {
    placement: 'top',
    children: '192.168.1.100',
  },
}

export const MultiLine: Story = {
  args: {
    placement: 'top',
    children: 'Server: web-01\nIP: 10.0.0.5\nStatus: Active',
  },
}

export const LongText: Story = {
  args: {
    placement: 'top',
    children: 'This is a longer tooltip message that demonstrates text wrapping in the tooltip component.',
  },
}
