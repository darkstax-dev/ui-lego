import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import MultiSelect, { MultiSelectOption } from './MultiSelect'

const meta = {
  title: 'Components/MultiSelect',
  component: MultiSelect,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A multi-select input component that allows users to select multiple items from a dropdown list or create new items by typing.'
      }
    }
  },
  argTypes: {
    options: {
      description: 'Array of options to display in the dropdown',
      control: 'object'
    },
    value: {
      description: 'Currently selected items (controlled)',
      control: 'object'
    },
    onChange: {
      description: 'Callback when selection changes',
      action: 'onChange'
    },
    onItemAdd: {
      description: 'Callback when a new item is added',
      action: 'onItemAdd'
    },
    onItemRemove: {
      description: 'Callback when an item is removed',
      action: 'onItemRemove'
    },
    placeholder: {
      description: 'Placeholder text for the input field',
      control: 'text'
    },
    disabled: {
      description: 'Whether the component is disabled',
      control: 'boolean'
    },
    allowCreate: {
      description: 'Whether users can create new items by typing',
      control: 'boolean'
    },
    maxHeight: {
      description: 'Maximum height of the dropdown in pixels',
      control: 'number'
    }
  }
} satisfies Meta<typeof MultiSelect>

export default meta
type Story = StoryObj<typeof meta>

const sampleOptions: MultiSelectOption[] = [
  { id: 1, label: 'production', value: 'production' },
  { id: 2, label: 'staging', value: 'staging' },
  { id: 3, label: 'development', value: 'development' },
  { id: 4, label: 'test-environment', value: 'test-environment' },
  { id: 5, label: 'qa-server', value: 'qa-server' },
  { id: 6, label: 'demo-instance', value: 'demo-instance' },
  { id: 7, label: 'trafic-light-uat', value: 'trafic-light-uat' },
  { id: 8, label: 'sumit', value: 'sumit' },
  { id: 9, label: 'sumit2', value: 'sumit2' },
]

const MultiSelectWithState = ({ value: initialValue = [], ...props }: any) => {
  const [selectedItems, setSelectedItems] = useState<MultiSelectOption[]>(initialValue)
  const [options, setOptions] = useState<MultiSelectOption[]>(sampleOptions)

  const handleChange = (newSelectedItems: MultiSelectOption[]) => {
    setSelectedItems(newSelectedItems)
    props.onChange?.(newSelectedItems)
  }

  const handleItemAdd = (newItem: MultiSelectOption) => {
    if (!options.some(opt => opt.id === newItem.id)) {
      setOptions(prev => [...prev, newItem])
    }
    props.onItemAdd?.(newItem)
  }

  const handleItemRemove = (removedItem: MultiSelectOption, index: number) => {
    props.onItemRemove?.(removedItem, index)
  }

  const createNewItemFromQuery = (query: string): MultiSelectOption => {
    return {
      id: `custom-${Date.now()}`,
      label: query,
      value: query.toLowerCase().replace(/\s+/g, '-')
    }
  }

  return (
    <MultiSelect
      {...props}
      options={options}
      value={selectedItems}
      onChange={handleChange}
      onItemAdd={handleItemAdd}
      onItemRemove={handleItemRemove}
      createNewItemFromQuery={createNewItemFromQuery}
    />
  )
}

export const Default: Story = {
  render: (args) => <MultiSelectWithState {...args} />,
  args: {
    placeholder: 'Press enter to add',
    allowCreate: true,
    maxHeight: 200
  }
}

export const WithSelectedItems: Story = {
  render: (args) => <MultiSelectWithState {...args} />,
  args: {
    value: [
      { id: 7, label: 'trafic-light-uat', value: 'trafic-light-uat' },
      { id: 8, label: 'sumit', value: 'sumit' },
      { id: 9, label: 'sumit2', value: 'sumit2' },
    ],
    placeholder: 'Press enter to add',
    allowCreate: true
  }
}

export const NoCreate: Story = {
  render: (args) => <MultiSelectWithState {...args} />,
  args: {
    placeholder: 'Select from existing options only',
    allowCreate: false
  }
}

export const Disabled: Story = {
  render: (args) => <MultiSelectWithState {...args} />,
  args: {
    value: [
      { id: 7, label: 'trafic-light-uat', value: 'trafic-light-uat' },
      { id: 8, label: 'sumit', value: 'sumit' }
    ],
    disabled: true,
    placeholder: 'Disabled multiselect'
  }
}

export const CustomPlaceholder: Story = {
  render: (args) => <MultiSelectWithState {...args} />,
  args: {
    placeholder: 'Type to search or create new tags...',
    allowCreate: true
  }
}

export const LimitedHeight: Story = {
  render: (args) => <MultiSelectWithState {...args} />,
  args: {
    placeholder: 'Press enter to add',
    allowCreate: true,
    maxHeight: 120
  }
}
