import type { Meta, StoryObj } from '@storybook/react'
import ActivityInputOutput from './ActivityInputOutput'

const meta: Meta<typeof ActivityInputOutput> = {
  title: 'Components/ActivityInputOutput',
  component: ActivityInputOutput,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof ActivityInputOutput>

export const Default: Story = {
  args: {},
}

export const CustomHeight: Story = {
  args: {
    className: 'custom-height',
  },
  decorators: [
    (Story) => (
      <div style={{ height: '800px' }}>
        <Story />
      </div>
    ),
  ],
}
