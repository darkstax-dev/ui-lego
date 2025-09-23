import React, { useState } from 'react'
import MultiSelect, { MultiSelectOption } from './MultiSelect'

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

const MultiSelectDemo: React.FC = () => {
  const [selectedItems, setSelectedItems] = useState<MultiSelectOption[]>([
    { id: 7, label: 'trafic-light-uat', value: 'trafic-light-uat' },
    { id: 8, label: 'sumit', value: 'sumit' },
    { id: 9, label: 'sumit2', value: 'sumit2' },
  ])

  const [options, setOptions] = useState<MultiSelectOption[]>(sampleOptions)

  const handleChange = (newSelectedItems: MultiSelectOption[]) => {
    setSelectedItems(newSelectedItems)
  }

  const handleItemAdd = (newItem: MultiSelectOption) => {
    // Add to options if it's a new item
    if (!options.some(opt => opt.id === newItem.id)) {
      setOptions(prev => [...prev, newItem])
    }
  }

  const handleItemRemove = (removedItem: MultiSelectOption, index: number) => {
    console.log(`Removed item: ${removedItem.label} at index ${index}`)
  }

  const createNewItemFromQuery = (query: string): MultiSelectOption => {
    return {
      id: `custom-${Date.now()}`,
      label: query,
      value: query.toLowerCase().replace(/\s+/g, '-')
    }
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '400px' }}>
      <h3 style={{ margin: '0 0 1rem 0', color: 'var(--Text-Blue-text-Main-text)' }}>
        MultiSelect Demo
      </h3>
      
      <div style={{ marginBottom: '2rem' }}>
        <label style={{ 
          display: 'block', 
          marginBottom: '0.5rem',
          color: 'var(--input-label-text)',
          fontFamily: 'var(--font-family-macan)',
          fontSize: '14px',
          fontWeight: '450'
        }}>
          Environments
        </label>
        <MultiSelect
          options={options}
          value={selectedItems}
          onChange={handleChange}
          onItemAdd={handleItemAdd}
          onItemRemove={handleItemRemove}
          placeholder="Press enter to add"
          allowCreate={true}
          createNewItemFromQuery={createNewItemFromQuery}
        />
      </div>

      <div style={{ 
        background: 'var(--surface-card)', 
        padding: '1rem', 
        borderRadius: '4px',
        marginTop: '1rem'
      }}>
        <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--Text-Blue-text-Main-text)' }}>
          Selected Items ({selectedItems.length}):
        </h4>
        <pre style={{ 
          margin: 0, 
          fontSize: '12px',
          color: 'var(--text-blue-secondary)',
          fontFamily: 'var(--font-family-macan-mono)'
        }}>
          {JSON.stringify(selectedItems.map(item => item.value), null, 2)}
        </pre>
      </div>
    </div>
  )
}

export default MultiSelectDemo
