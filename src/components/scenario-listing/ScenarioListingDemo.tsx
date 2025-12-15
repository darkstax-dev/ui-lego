import React, { useState } from 'react'
import ScenarioTable from './ScenarioTable'
import { ScenarioItem, SortableColumn, SortDirection } from './types'

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
  },
  {
    id: '6',
    name: 'Meta Mapper Scenario 24-06-24 18 41 59',
    isLocked: false,
    cluster: 'K8s dev Development',
    version: '1.5',
    lastModified: '02/12/2025 [13:29PM]',
    createdBy: 'Iryna Yefimova',
    isSelected: false
  },
  {
    id: '7',
    name: 'Meta Mapper Scenario 24-06-24 18 41 59',
    isLocked: false,
    cluster: 'K8s dev Development',
    version: '1.5',
    lastModified: '02/12/2025 [13:29PM]',
    createdBy: 'Iryna Yefimova',
    isSelected: false
  },
  {
    id: '8',
    name: 'Meta Mapper Scenario 24-06-24 18 41 59',
    isLocked: true,
    cluster: 'K8s dev Development',
    version: '1.5',
    lastModified: '02/12/2025 [13:29PM]',
    createdBy: 'Iryna Yefimova',
    isSelected: false
  },
  {
    id: '9',
    name: 'Meta Mapper Scenario 24-06-24 18 41 59',
    isLocked: false,
    cluster: 'K8s dev Development',
    version: '1.5',
    lastModified: '02/12/2025 [13:29PM]',
    createdBy: 'Iryna Yefimova',
    isSelected: false
  },
  {
    id: '10',
    name: 'Meta Mapper Scenario 24-06-24 18 41 59',
    isLocked: false,
    cluster: 'K8s dev Development',
    version: '1.5',
    lastModified: '02/12/2025 [13:29PM]',
    createdBy: 'Iryna Yefimova',
    isSelected: false
  },
  {
    id: '11',
    name: 'Meta Mapper Scenario 24-06-24 18 41 59',
    isLocked: true,
    cluster: 'K8s dev Development',
    version: '1.5',
    lastModified: '02/12/2025 [13:29PM]',
    createdBy: 'Iryna Yefimova',
    isSelected: false
  },
  {
    id: '12',
    name: 'Meta Mapper Scenario 24-06-24 18 41 59',
    isLocked: false,
    cluster: 'K8s dev Development',
    version: '1.5',
    lastModified: '02/12/2025 [13:29PM]',
    createdBy: 'Iryna Yefimova',
    isSelected: false
  }
]

const ScenarioListingDemo: React.FC = () => {
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


  return (
    <div style={{ padding: '24px', background: 'var(--surface-default)' }}>
      <h2 style={{ 
        marginBottom: '24px', 
        color: 'var(--text-blue-main)',
        fontFamily: 'var(--font-family-macan-mono-stencil)',
        fontSize: 'var(--font-size-xl)',
        fontWeight: 'var(--font-weight-medium)',
        textTransform: 'uppercase',
        letterSpacing: '0.05em'
      }}>
        Scenario Listing
      </h2>
      
      <ScenarioTable
        scenarios={scenarios}
        onScenarioSelect={handleScenarioSelect}
        onSelectAll={handleSelectAll}
        onSort={handleSort}
        sortColumn={sortColumn}
        sortDirection={sortDirection}
        onOpen={(scenarioId) => console.log('Open', scenarioId)}
        onVersionHistory={(scenarioId) => console.log('Version History', scenarioId)}
        onEdit={(scenarioId) => console.log('Edit', scenarioId)}
        onScenarioAccessibility={(scenarioId) => console.log('Scenario Accessibility', scenarioId)}
        onScenarioNodes={(scenarioId) => console.log('Scenario Nodes', scenarioId)}
        onDeploy={(scenarioId) => console.log('Deploy', scenarioId)}
        onRun={(scenarioId) => console.log('Run', scenarioId)}
        onDeleteNamespace={(scenarioId) => console.log('Delete Namespace', scenarioId)}
        onDelete={(scenarioId) => console.log('Delete', scenarioId)}
      />
    </div>
  )
}

export default ScenarioListingDemo
