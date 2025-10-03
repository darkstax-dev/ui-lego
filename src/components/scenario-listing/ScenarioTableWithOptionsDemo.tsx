import React, { useState } from 'react'
import ScenarioTableWithOptions from './ScenarioTableWithOptions'
import { ScenarioItem, SortableColumn, SortDirection } from './types'

const mockScenarios: ScenarioItem[] = [
  {
    id: '1',
    name: 'Test_scenario',
    isLocked: false,
    cluster: 'k8s dev Development',
    version: '2.0',
    lastModified: '02/12/2025 [13:29PM]',
    createdBy: 'Iryna Yefimova',
    isSelected: false
  },
  {
    id: '2',
    name: 'Production_deployment',
    isLocked: true,
    cluster: 'k8s prod Production',
    version: '1.5',
    lastModified: '01/12/2025 [10:15AM]',
    createdBy: 'John Smith',
    isSelected: false
  },
  {
    id: '3',
    name: 'Staging_environment',
    isLocked: false,
    cluster: 'k8s staging Staging',
    version: '1.8',
    lastModified: '30/11/2025 [16:45PM]',
    createdBy: 'Sarah Johnson',
    isSelected: true
  }
]

const ScenarioTableWithOptionsDemo: React.FC = () => {
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
      }
    }
    
    setSortColumn(newDirection ? column : undefined)
    setSortDirection(newDirection)
    
    if (newDirection) {
      setScenarios(prev => [...prev].sort((a, b) => {
        const aValue = a[column]
        const bValue = b[column]
        const comparison = aValue.localeCompare(bValue)
        return newDirection === 'asc' ? comparison : -comparison
      }))
    }
  }

  // Option handlers
  const handleOpen = (scenarioId: string) => {
    console.log('Opening scenario:', scenarioId)
    alert(`Opening scenario: ${scenarios.find(s => s.id === scenarioId)?.name}`)
  }

  const handleVersionHistory = (scenarioId: string) => {
    console.log('Version history for scenario:', scenarioId)
    alert(`Version history for: ${scenarios.find(s => s.id === scenarioId)?.name}`)
  }

  const handleEdit = (scenarioId: string) => {
    console.log('Editing scenario:', scenarioId)
    alert(`Editing scenario: ${scenarios.find(s => s.id === scenarioId)?.name}`)
  }

  const handleScenarioAccessibility = (scenarioId: string) => {
    console.log('Scenario accessibility for:', scenarioId)
    alert(`Scenario accessibility for: ${scenarios.find(s => s.id === scenarioId)?.name}`)
  }

  const handleScenarioNodes = (scenarioId: string) => {
    console.log('Scenario nodes for:', scenarioId)
    alert(`Scenario nodes for: ${scenarios.find(s => s.id === scenarioId)?.name}`)
  }

  const handleDeploy = (scenarioId: string) => {
    console.log('Deploying scenario:', scenarioId)
    alert(`Deploying scenario: ${scenarios.find(s => s.id === scenarioId)?.name}`)
  }

  const handleRun = (scenarioId: string) => {
    console.log('Running scenario:', scenarioId)
    alert(`Running scenario: ${scenarios.find(s => s.id === scenarioId)?.name}`)
  }

  const handleDeleteNamespace = (scenarioId: string) => {
    console.log('Deleting namespace for scenario:', scenarioId)
    alert(`Deleting namespace for: ${scenarios.find(s => s.id === scenarioId)?.name}`)
  }

  const handleDelete = (scenarioId: string) => {
    console.log('Deleting scenario:', scenarioId)
    const scenarioName = scenarios.find(s => s.id === scenarioId)?.name
    if (confirm(`Are you sure you want to delete "${scenarioName}"?`)) {
      setScenarios(prev => prev.filter(scenario => scenario.id !== scenarioId))
    }
  }

  return (
    <div style={{ padding: '20px', background: 'var(--background-primary)', minHeight: '100vh' }}>
      <h2 style={{ marginBottom: '20px', color: 'var(--text-primary)' }}>
        Scenario Table with Options Demo
      </h2>
      <p style={{ marginBottom: '20px', color: 'var(--text-secondary)' }}>
        Click the three dots (⋮) in any row to open the option bar for that scenario.
      </p>
      
      <ScenarioTableWithOptions
        scenarios={scenarios}
        onScenarioSelect={handleScenarioSelect}
        onSelectAll={handleSelectAll}
        onSort={handleSort}
        sortColumn={sortColumn}
        sortDirection={sortDirection}
        onOpen={handleOpen}
        onVersionHistory={handleVersionHistory}
        onEdit={handleEdit}
        onScenarioAccessibility={handleScenarioAccessibility}
        onScenarioNodes={handleScenarioNodes}
        onDeploy={handleDeploy}
        onRun={handleRun}
        onDeleteNamespace={handleDeleteNamespace}
        onDelete={handleDelete}
      />
    </div>
  )
}

export default ScenarioTableWithOptionsDemo
