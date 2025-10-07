export interface ScenarioItem {
  id: string
  name: string
  isLocked: boolean
  cluster: string
  version: string
  lastModified: string
  createdBy: string
  isSelected?: boolean
}

export type SortDirection = 'asc' | 'desc' | null

export type SortableColumn = 'name' | 'cluster' | 'version' | 'lastModified' | 'createdBy'

export interface ScenarioTableProps {
  scenarios: ScenarioItem[]
  onScenarioSelect?: (scenarioId: string, selected: boolean) => void
  onSelectAll?: (selected: boolean) => void
  onSort?: (column: SortableColumn) => void
  sortColumn?: SortableColumn
  sortDirection?: SortDirection
  onOptionsClick?: (scenarioId: string, event?: React.MouseEvent) => void
  className?: string
}

export interface ScenarioTableWithOptionsProps extends Omit<ScenarioTableProps, 'onOptionsClick'> {
  onOpen?: (scenarioId: string) => void
  onVersionHistory?: (scenarioId: string) => void
  onEdit?: (scenarioId: string) => void
  onScenarioAccessibility?: (scenarioId: string) => void
  onScenarioNodes?: (scenarioId: string) => void
  onDeploy?: (scenarioId: string) => void
  onRun?: (scenarioId: string) => void
  onDeleteNamespace?: (scenarioId: string, namespaces: string[]) => void
  onDelete?: (scenarioId: string) => void
}

export interface ScenarioTableHeaderProps {
  onSelectAll?: (selected: boolean) => void
  allSelected?: boolean
  someSelected?: boolean
  onSort?: (column: SortableColumn) => void
  sortColumn?: SortableColumn
  sortDirection?: SortDirection
}

export interface ScenarioTableRowProps {
  scenario: ScenarioItem
  onSelect?: (scenarioId: string, selected: boolean) => void
  onOptionsClick?: (scenarioId: string, event?: React.MouseEvent) => void
}
