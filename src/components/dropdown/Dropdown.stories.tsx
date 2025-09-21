import type { Meta, StoryObj } from '@storybook/react-vite'
import Dropdown from './Dropdown'
import DropdownItem from './DropdownItem'

const meta: Meta<typeof Dropdown> = {
  title: 'Components/Dropdown/Dropdown',
  component: Dropdown,
  args: { isOpen: true, position: 'relative', size: 'standard' },
}

export default meta;
type Story = StoryObj<typeof Dropdown>;

export const Default: Story = {};
