import type { Meta, StoryObj } from '@storybook/react'
import Dropdown from './Dropdown'
import DropdownItem from './DropdownItem'

const meta: Meta<typeof Dropdown> = {
  title: 'Components/Dropdown/Dropdown',
  component: Dropdown,
  args: { isOpen: true, position: 'relative', size: 'standard' },
  parameters: { docs: { description: { component: 'Menu-like dropdown with keyboard navigation and roles.' } } }
}
export default meta

type Story = StoryObj<typeof Dropdown>

export const Default: Story = {
  render: (args) => (
    <Dropdown {...args}>
      <DropdownItem>First</DropdownItem>
      <DropdownItem>Second</DropdownItem>
      <DropdownItem>Third</DropdownItem>
    </Dropdown>
  )
}
