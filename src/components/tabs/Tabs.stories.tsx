import type { Meta, StoryObj } from '@storybook/react'
import Tabs from './Tabs'

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs/Tabs',
  component: Tabs,
  args: {
    items: [
      { value: 'one', label: 'One' },
      { value: 'two', label: 'Two' },
      { value: 'three', label: 'Three' }
    ],
    activeTab: 'one'
  },
  parameters: { docs: { description: { component: 'Tablist with roving tabindex and keyboard navigation.' } } }
}
export default meta

type Story = StoryObj<typeof Tabs>

export const Default: Story = {}
