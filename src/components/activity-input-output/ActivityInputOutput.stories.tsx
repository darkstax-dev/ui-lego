import type { Meta, StoryObj } from '@storybook/react-vite'
import ActivityInputOutput from './ActivityInputOutput'
import './ActivityInputOutput.stories.css'

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
  decorators: [
    (Story) => (
      <div className="activity-input-output-story-fullscreen">
        <Story />
      </div>
    ),
  ],
}

export const CustomHeight: Story = {
  args: {
    className: 'custom-height',
  },
  decorators: [
    (Story) => (
      <div className="activity-input-output-story-fullscreen">
        <Story />
      </div>
    ),
  ],
}
