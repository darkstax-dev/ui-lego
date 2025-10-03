import type { Meta, StoryObj } from '@storybook/react'
import ScenarioTableWithOptions from './ScenarioTableWithOptions'
import { ScenarioItem } from './types'

const meta: Meta<typeof ScenarioTableWithOptions> = {
  title: 'Components/Scenario Listing/ScenarioTableWithOptions',
  component: ScenarioTableWithOptions,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A scenario table with integrated option bar that appears when clicking the three dots menu.'
      }
    }
  },
  argTypes: {
    scenarios: {
      description: 'Array of scenario items to display'
    },
    onScenarioSelect: {
      description: 'Callback when a scenario is selected/deselected'
    },
    onSelectAll: {
      description: 'Callback when select all is toggled'
    },
    onSort: {
      description: 'Callback when a column is sorted'
    },
    onOpen: {
      description: 'Callback when Open action is clicked'
    },
    onVersionHistory: {
      description: 'Callback when Version History action is clicked'
    },
    onEdit: {
      description: 'Callback when Edit action is clicked'
    },
    onScenarioAccessibility: {
      description: 'Callback when Scenario Accessibility action is clicked'
    },
    onScenarioNodes: {
      description: 'Callback when Scenario Nodes action is clicked'
    },
    onDeploy: {
      description: 'Callback when Deploy action is clicked'
    },
    onRun: {
      description: 'Callback when Run action is clicked'
    },
    onDeleteNamespace: {
      description: 'Callback when Delete Namespace action is clicked'
    },
    onDelete: {
      description: 'Callback when Delete action is clicked'
    }
  }
}

export default meta
type Story = StoryObj<typeof ScenarioTableWithOptions>

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
  },
  {
    id: '4',
    name: 'Development_testing',
    isLocked: false,
    cluster: 'k8s dev Development',
    version: '1.2',
    lastModified: '29/11/2025 [14:20PM]',
    createdBy: 'Mike Wilson',
    isSelected: false
  },
  {
    id: '5',
    name: 'Integration_tests',
    isLocked: true,
    cluster: 'k8s test Testing',
    version: '2.1',
    lastModified: '28/11/2025 [09:30AM]',
    createdBy: 'Lisa Chen',
    isSelected: false
  }
]

export const Default: Story = {
  args: {
    scenarios: mockScenarios,
    onScenarioSelect: (scenarioId: string, selected: boolean) => {
      console.log('Scenario select:', scenarioId, selected)
    },
    onSelectAll: (selected: boolean) => {
      console.log('Select all:', selected)
    },
    onSort: (column) => {
      console.log('Sort by:', column)
    },
    onOpen: (scenarioId: string) => {
      console.log('Open scenario:', scenarioId)
    },
    onVersionHistory: (scenarioId: string) => {
      console.log('Version history:', scenarioId)
    },
    onEdit: (scenarioId: string) => {
      console.log('Edit scenario:', scenarioId)
    },
    onScenarioAccessibility: (scenarioId: string) => {
      console.log('Scenario accessibility:', scenarioId)
    },
    onScenarioNodes: (scenarioId: string) => {
      console.log('Scenario nodes:', scenarioId)
    },
    onDeploy: (scenarioId: string) => {
      console.log('Deploy scenario:', scenarioId)
    },
    onRun: (scenarioId: string) => {
      console.log('Run scenario:', scenarioId)
    },
    onDeleteNamespace: (scenarioId: string) => {
      console.log('Delete namespace:', scenarioId)
    },
    onDelete: (scenarioId: string) => {
      console.log('Delete scenario:', scenarioId)
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Default scenario table with option bar integration. Click the three dots (⋮) in any row to see the option bar.'
      }
    }
  }
}

export const WithSelectedItems: Story = {
  args: {
    ...Default.args,
    scenarios: mockScenarios.map((scenario, index) => ({
      ...scenario,
      isSelected: index < 2
    }))
  },
  parameters: {
    docs: {
      description: {
        story: 'Scenario table with some items pre-selected.'
      }
    }
  }
}

export const EmptyState: Story = {
  args: {
    ...Default.args,
    scenarios: []
  },
  parameters: {
    docs: {
      description: {
        story: 'Scenario table with no data.'
      }
    }
  }
}
