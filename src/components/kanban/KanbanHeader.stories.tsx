import type { Meta, StoryObj } from '@storybook/react-vite'
import KanbanHeader from './KanbanHeader'

const meta: Meta<typeof KanbanHeader> = {
  title: 'Components/Kanban/KanbanHeader',
  component: KanbanHeader,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    title: '[Kanban board]',
  },
}

export default meta
type Story = StoryObj<typeof KanbanHeader>

export const Default: Story = {}

export const WithSearchValue: Story = {
  args: {
    searchValue: 'Inventory',
  },
}

export const FilterActive: Story = {
  args: {
    filterActive: true,
  },
}

export const WithCallbacks: Story = {
  args: {
    onSearchChange: (value) => {
      console.log('Search changed:', value)
    },
    onSettingsClick: () => {
      console.log('Settings clicked')
      alert('Settings clicked!')
    },
    onFilterClick: () => {
      console.log('Filter clicked')
      alert('Filter clicked!')
    },
  },
}

export const CustomTitle: Story = {
  args: {
    title: 'My Custom Board',
  },
}

export const Interactive: Story = {
  args: {
    onSearchChange: (value) => {
      console.log('Search:', value)
    },
    onSettingsClick: () => {
      console.log('Settings clicked')
    },
    onFilterClick: () => {
      console.log('Filter toggled')
    },
  },
}
