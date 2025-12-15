export type ViewMode = 'month' | 'week' | 'day' | 'hour' | '30min'

export type TaskStatus = 'not-started' | 'in-progress' | 'completed' | 'on-hold' | 'cancelled'

export interface GanttTask {
  id: string
  title: string
  startDate: Date
  endDate: Date
  status?: TaskStatus
  progress?: number // 0-100
  assignee?: string
  priority?: 'low' | 'medium' | 'high'
  color?: string
  children?: GanttTask[]
  parentId?: string
  projectId?: string
  metadata?: Record<string, unknown>
}

export interface GanttColumn {
  field: keyof GanttTask | string
  headerName: string
  width?: number
  flex?: number
  align?: 'left' | 'center' | 'right'
  editable?: boolean
  type?: 'text' | 'date' | 'datetime' | 'number' | 'select'
  valueGetter?: (task: GanttTask) => string | number | Date
  renderCell?: (task: GanttTask) => React.ReactNode
}

export interface GroupingConfig {
  field: keyof GanttTask | string
}

export interface GanttChartProps {
  data: GanttTask[]
  columns?: GanttColumn[]
  viewMode?: ViewMode
  onTaskClick?: (taskId: string, task: GanttTask) => void
  onTaskDoubleClick?: (taskId: string, task: GanttTask) => void
  onTaskUpdate?: (taskId: string, updates: Partial<GanttTask>) => void
  onDataUpdate?: (newData: GanttTask[], oldData: GanttTask[]) => void
  defaultGridSectionWidth?: number
  defaultExpanded?: boolean
  groupingColumn?: GroupingConfig
  locale?: 'en' | 'ko' | 'ja' | 'zh' | 'es'
  rowHeight?: number
  taskBarHeight?: number
  isLoading?: boolean
  showWeekends?: boolean
  enableDragResize?: boolean
  enableDragMove?: boolean
  searchQuery?: string
  className?: string
  timeRangeStart?: Date
  timeRangeEnd?: Date
  onTimeRangeChange?: (start: Date, end: Date) => void
  showTimeRangeSlider?: boolean
}

export interface TimelineUnit {
  label: string
  startDate: Date
  endDate: Date
  isWeekend?: boolean
}

export interface DateRange {
  start: Date
  end: Date
}
