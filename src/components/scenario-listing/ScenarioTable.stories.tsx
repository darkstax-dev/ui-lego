import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import ScenarioTable from './ScenarioTable'
import ScenarioListingDemo from './ScenarioListingDemo'
import { ScenarioItem, SortableColumn, SortDirection } from './types'

const meta: Meta<typeof ScenarioTable> = {
  id: 'components-scenario-listing-scenariotable-component',
  title: 'Components/Scenario Listing/ScenarioTable (Component)',
  component: ScenarioTable,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A comprehensive table component for displaying and managing scenario listings with sorting, selection, and action capabilities.'
      }
    }
  },
  argTypes: {
    scenarios: {
      description: 'Array of scenario items to display',
      control: { type: 'object' }
    },
    onScenarioSelect: {
      description: 'Callback fired when a scenario is selected/deselected',
      action: 'scenario-selected'
    },
    onSelectAll: {
      description: 'Callback fired when select all is toggled',
      action: 'select-all'
    },
    onSort: {
      description: 'Callback fired when a column is sorted',
      action: 'sort'
    },
    onOptionsClick: {
      description: 'Callback fired when options menu is clicked',
      action: 'options-clicked'
    }
  }
}

export default meta
type Story = StoryObj<typeof ScenarioTable>

const mockScenarios: ScenarioItem[] = [
  {
    id: '1',
    name: 'Default',
    isLocked: true,
    cluster: 'K8s dev Development',
    version: '1.5',
    lastModified: '02/12/2025 [13:29PM]',
    createdBy: 'Iryna Yefimova',
    isSelected: false
  },
  {
    id: '2',
    name: 'Untitled',
    isLocked: true,
    cluster: 'K8s dev Development',
    version: '1',
    lastModified: '02/12/2025 [13:29PM]',
    createdBy: 'Iryna Yefimova',
    isSelected: false
  },
  {
    id: '3',
    name: 'Test_scenario',
    isLocked: true,
    cluster: 'K8s dev Development',
    version: '2.0',
    lastModified: '02/12/2025 [13:29PM]',
    createdBy: 'Iryna Yefimova',
    isSelected: false
  },
  {
    id: '4',
    name: 'Meta Mapper Scenario 24-06-24 18 41 59',
    isLocked: false,
    cluster: 'K8s dev Development',
    version: '1.5',
    lastModified: '02/12/2025 [13:29PM]',
    createdBy: 'Iryna Yefimova',
    isSelected: false
  },
  {
    id: '5',
    name: 'Meta Mapper Scenario 24-06-24 18 41 59',
    isLocked: true,
    cluster: 'K8s dev Development',
    version: '1.5',
    lastModified: '02/12/2025 [13:29PM]',
    createdBy: 'Iryna Yefimova',
    isSelected: false
  }
]

export const Default: Story = {
  args: {
    scenarios: mockScenarios,
    sortColumn: undefined,
    sortDirection: null
  },
  render: (args) => (
    <div style={{ padding: '24px', background: 'var(--surface-default)' }}>
      <ScenarioTable {...args} />
    </div>
  )
}

export const WithSelection: Story = {
  args: {
    scenarios: mockScenarios.map((scenario, index) => ({
      ...scenario,
      isSelected: index < 2
    })),
    sortColumn: undefined,
    sortDirection: null
  },
  render: (args) => (
    <div style={{ padding: '24px', background: 'var(--surface-default)' }}>
      <ScenarioTable {...args} />
    </div>
  )
}

export const WithSorting: Story = {
  args: {
    scenarios: mockScenarios,
    sortColumn: 'lastModified',
    sortDirection: 'desc'
  },
  render: (args) => (
    <div style={{ padding: '24px', background: 'var(--surface-default)' }}>
      <ScenarioTable {...args} />
    </div>
  )
}

export const Interactive: Story = {
  render: () => {
    const InteractiveTable = () => {
      const [scenarios, setScenarios] = useState<ScenarioItem[]>(mockScenarios)
      const [sortColumn, setSortColumn] = useState<SortableColumn | undefined>()
      const [sortDirection, setSortDirection] = useState<SortDirection>(null)

      const handleScenarioSelect = (scenarioId: string, selected: boolean) => {
        setScenarios(prev =>
          prev.map(scenario =>
            scenario.id === scenarioId
              ? { ...scenario, isSelected: selected }
              : scenario
          )
        )
      }

      const handleSelectAll = (selected: boolean) => {
        setScenarios(prev =>
          prev.map(scenario => ({ ...scenario, isSelected: selected }))
        )
      }

      const handleSort = (column: SortableColumn) => {
        let newDirection: SortDirection = 'asc'

        if (sortColumn === column) {
          if (sortDirection === 'asc') {
            newDirection = 'desc'
          } else if (sortDirection === 'desc') {
            newDirection = null
            setSortColumn(undefined)
            setSortDirection(null)
            return
          }
        }

        setSortColumn(column)
        setSortDirection(newDirection)

        setScenarios(prev => {
          const sorted = [...prev].sort((a, b) => {
            const aValue = a[column]
            const bValue = b[column]

            if (newDirection === 'asc') {
              return aValue.localeCompare(bValue)
            } else {
              return bValue.localeCompare(aValue)
            }
          })

          return sorted
        })
      }

      const handleOptionsClick = (scenarioId: string) => {
        console.log('Options clicked for scenario:', scenarioId)
      }

      return (
        <div style={{ padding: '24px', background: 'var(--surface-default)' }}>
          <ScenarioTable
            scenarios={scenarios}
            onScenarioSelect={handleScenarioSelect}
            onSelectAll={handleSelectAll}
            onSort={handleSort}
            sortColumn={sortColumn}
            sortDirection={sortDirection}
            onOptionsClick={handleOptionsClick}
          />
        </div>
      )
    }

    return <InteractiveTable />
  }
}

export const EmptyState: Story = {
  args: {
    scenarios: [],
    sortColumn: undefined,
    sortDirection: null
  },
  render: (args) => (
    <div style={{ padding: '24px', background: 'var(--surface-default)' }}>
      <ScenarioTable {...args} />
      <div style={{
        textAlign: 'center',
        padding: '48px',
        color: 'var(--color-gray-500)',
        fontFamily: 'var(--font-family-macan)',
        fontSize: 'var(--font-size-md)'
      }}>
        No scenarios found
      </div>
    </div>
  )
}

// Full Demo Story
export const FullDemo: StoryObj = {
  render: () => <ScenarioListingDemo />,
  parameters: {
    docs: {
      description: {
        story: 'Complete scenario listing demo with all features including sorting, selection, and interactions.'
      }
    }
  }
}
