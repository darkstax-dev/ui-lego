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

export const Default: Story = {
  render: (args) => (
    <Dropdown {...args}>
      <DropdownItem size="big" variant="default">Kubernetes dashboard</DropdownItem>
      <DropdownItem size="big" variant="default">Cluster settings</DropdownItem>
      <DropdownItem size="big" variant="danger">Delete cluster</DropdownItem>
    </Dropdown>
  )
};

export const Scrollable: Story = {
  args: { scrollable: true, maxHeight: 258 },
  render: (args) => (
    <Dropdown {...args}>
      {Array.from({ length: 10 }).map((_, i) => (
        <DropdownItem key={i} size="big" variant="default">Item {i + 1}</DropdownItem>
      ))}
    </Dropdown>
  )
};

export const Compact: Story = {
  args: { size: 'compact' },
  render: (args) => (
    <Dropdown {...args}>
      <DropdownItem size="small" variant="default">Item 1</DropdownItem>
      <DropdownItem size="small" variant="default">Item 2</DropdownItem>
      <DropdownItem size="small" variant="danger">Delete Item</DropdownItem>
    </Dropdown>
  )
};
