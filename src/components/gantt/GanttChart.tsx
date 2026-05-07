import React, { useState, useMemo, useRef, useEffect } from 'react'
import { GanttChartProps, GanttTask, GanttColumn } from './types'
import GanttHeader from './GanttHeader'
import Timeline from './Timeline'
import GanttTaskBar from './GanttTaskBar'
import TimeRangeSlider from './TimeRangeSlider'
import TaskDetailsDrawer from './TaskDetailsDrawer'
import { BadgePill } from '../tag-badges'
import type { BadgePillVariant } from '../tag-badges'
import {
  getDateRange,
  generateTimelineUnits,
  calculateTaskPosition,
  flattenTasks,
  formatDate,
  getColumnWidth,
  getDateRangeForTimeView,
} from './utils'
import './GanttChart.css'

const mapStatusToBadge = (status?: string): BadgePillVariant => {
  switch (status) {
    case 'in-process': return 'in-process'
    case 'completed': return 'done'
    case 'on-hold': return 'blocked'
    case 'pending': return 'waiting'
    case 'cancelled': return 'archived'
    case 'not-started':
    default: return 'to-do'
  }
}

const defaultColumns: GanttColumn[] = [
  {
    field: 'title',
    headerName: 'Task Name',
    flex: 1,
    align: 'left',
  },
  {
    field: 'status',
    headerName: 'Status',
    width: 150,
    align: 'center',
    renderCell: (task: GanttTask) => (
      <BadgePill variant={mapStatusToBadge(task.status)} />
    ),
  },
  {
    field: 'startDate',
    headerName: 'Start Date',
    width: 120,
    align: 'center',
    valueGetter: (task) => formatDate(task.startDate),
  },
  {
    field: 'endDate',
    headerName: 'End Date',
    width: 120,
    align: 'center',
    valueGetter: (task) => formatDate(task.endDate),
  },
]

const GanttChart: React.FC<GanttChartProps> = ({
  data,
  columns = defaultColumns,
  viewMode = 'day',
  onTaskClick,
  onTaskDoubleClick,
  onTaskUpdate,
  onDataUpdate,
  defaultGridSectionWidth = 600,
  defaultExpanded = true,
  groupingColumn,
  locale = 'en',
  rowHeight = 50,
  taskBarHeight = 32,
  isLoading = false,
  showWeekends = true,
  enableDragResize = false,
  enableDragMove = false,
  searchQuery = '',
  className = '',
  timeRangeStart,
  timeRangeEnd,
  onTimeRangeChange,
  showTimeRangeSlider = false,
  timeInputMode = false,
  headerTitle = '[GANTT CHART]',
  showHeader = true,
  projectName = 'Project name',
  agentNames = [],
  selectedAgent = '',
  onAgentChange,
  onSearchChange,
}) => {
  const [expandedTasks, setExpandedTasks] = useState<Set<string>>(new Set())
  const [hoveredTaskId, setHoveredTaskId] = useState<string | null>(null)
  const [gridWidth, setGridWidth] = useState(defaultGridSectionWidth)
  const [internalSearchValue, setInternalSearchValue] = useState(searchQuery)
  const [selectedTask, setSelectedTask] = useState<GanttTask | null>(null)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const chartRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  const handleSearchChange = (value: string) => {
    setInternalSearchValue(value)
    if (onSearchChange) {
      onSearchChange(value)
    }
  }

  const effectiveSearchQuery = searchQuery || internalSearchValue

  const handleTaskBarClick = (taskId: string, task: GanttTask) => {
    setSelectedTask(task)
    setDrawerOpen(true)
    if (onTaskClick) onTaskClick(taskId, task)
  }

  // Time range state for time-based views
  const isTimeBasedView = viewMode === 'hour' || viewMode === '30min'
  const [internalTimeStart, setInternalTimeStart] = useState<Date>(() => {
    if (timeRangeStart) return timeRangeStart
    const now = new Date()
    now.setHours(10, 30, 0, 0) // Default to 10:30 AM
    return now
  })
  const [internalTimeEnd, setInternalTimeEnd] = useState<Date>(() => {
    if (timeRangeEnd) return timeRangeEnd
    const now = new Date()
    now.setHours(22, 30, 0, 0) // Default to 10:30 PM
    return now
  })

  const handleTimeRangeChange = (start: Date, end: Date) => {
    setInternalTimeStart(start)
    setInternalTimeEnd(end)
    if (onTimeRangeChange) {
      onTimeRangeChange(start, end)
    }
  }

  // Initialize expanded tasks
  useEffect(() => {
    if (defaultExpanded) {
      const allTaskIds = new Set<string>()
      data.forEach(task => {
        if (task.children && task.children.length > 0) {
          allTaskIds.add(task.id)
        }
      })
      setExpandedTasks(allTaskIds)
    }
  }, [data, defaultExpanded])

  // Filter tasks based on search query
  const filteredData = useMemo(() => {
    if (!effectiveSearchQuery) return data

    const filterTask = (task: GanttTask): GanttTask | null => {
      const matchesSearch = task.title.toLowerCase().includes(effectiveSearchQuery.toLowerCase()) ||
        task.assignee?.toLowerCase().includes(effectiveSearchQuery.toLowerCase()) ||
        task.status?.toLowerCase().includes(effectiveSearchQuery.toLowerCase())

      const filteredChildren = task.children?.map(filterTask).filter((t): t is GanttTask => t !== null)

      if (matchesSearch || (filteredChildren && filteredChildren.length > 0)) {
        return {
          ...task,
          children: filteredChildren,
        }
      }

      return null
    }

    return data.map(filterTask).filter((t): t is GanttTask => t !== null)
  }, [data, effectiveSearchQuery])

  // Calculate date range and timeline units
  const dateRange = useMemo(() => {
    if (isTimeBasedView && (timeRangeStart || internalTimeStart)) {
      const start = timeRangeStart || internalTimeStart
      const end = timeRangeEnd || internalTimeEnd
      return { start, end }
    }
    return getDateRange(filteredData)
  }, [filteredData, isTimeBasedView, timeRangeStart, timeRangeEnd, internalTimeStart, internalTimeEnd])

  const timelineUnits = useMemo(
    () => generateTimelineUnits(dateRange, viewMode),
    [dateRange, viewMode]
  )

  // Calculate min/max time for slider (24-hour range)
  const { minTime, maxTime } = useMemo(() => {
    const baseDate = timeRangeStart || internalTimeStart
    const min = new Date(baseDate)
    min.setHours(0, 0, 0, 0)
    const max = new Date(baseDate)
    max.setHours(23, 59, 59, 999)
    return { minTime: min, maxTime: max }
  }, [timeRangeStart, internalTimeStart])

  // Calculate timeline width
  const columnWidth = getColumnWidth(viewMode)
  const visibleUnits = showWeekends 
    ? timelineUnits 
    : timelineUnits.filter(unit => !unit.isWeekend)
  const timelineWidth = visibleUnits.length * columnWidth

  // Flatten tasks for rendering
  const flatTasks = useMemo(() => {
    const result: Array<{ task: GanttTask; level: number; isChild: boolean }> = []

    const flatten = (task: GanttTask, level: number = 0, isChild: boolean = false) => {
      result.push({ task, level, isChild })
      
      if (task.children && task.children.length > 0 && expandedTasks.has(task.id)) {
        task.children.forEach(child => flatten(child, level + 1, true))
      }
    }

    filteredData.forEach(task => flatten(task))
    return result
  }, [filteredData, expandedTasks])

  const toggleTaskExpansion = (taskId: string) => {
    setExpandedTasks(prev => {
      const next = new Set(prev)
      if (next.has(taskId)) {
        next.delete(taskId)
      } else {
        next.add(taskId)
      }
      return next
    })
  }

  const renderCell = (task: GanttTask, column: GanttColumn): React.ReactNode => {
    if (column.renderCell) {
      return column.renderCell(task)
    }

    if (column.valueGetter) {
      const value = column.valueGetter(task)
      if (value instanceof Date) {
        return formatDate(value, locale)
      }
      return String(value)
    }

    const value = task[column.field as keyof GanttTask]
    
    if (value instanceof Date) {
      return formatDate(value, locale)
    }

    return String(value || '')
  }

  if (isLoading) {
    return (
      <div className={`gantt-chart loading ${className}`}>
        <div className="gantt-loading">
          <div className="gantt-loading-spinner" />
          <span>Loading...</span>
        </div>
      </div>
    )
  }

  return (
    <div className={`gantt-chart-container ${className}`}>
      {/* Page Header */}
      {showHeader && (
        <GanttHeader
          title={headerTitle}
          projectName={projectName}
          agentNames={agentNames}
          selectedAgent={selectedAgent}
          onAgentChange={onAgentChange}
          searchValue={internalSearchValue}
          onSearchChange={handleSearchChange}
          sliderNode={
            (isTimeBasedView || showTimeRangeSlider) ? (
              <TimeRangeSlider
                startTime={timeRangeStart || internalTimeStart}
                endTime={timeRangeEnd || internalTimeEnd}
                minTime={minTime}
                maxTime={maxTime}
                onChange={handleTimeRangeChange}
                selectedDate={timeRangeStart}
                inputMode={timeInputMode}
                onDateChange={(newDate) => {
                  const currentStart = timeRangeStart || internalTimeStart
                  const currentEnd = timeRangeEnd || internalTimeEnd
                  
                  const newStart = new Date(newDate)
                  newStart.setHours(currentStart.getHours(), currentStart.getMinutes(), 0, 0)
                  
                  const newEnd = new Date(newDate)
                  newEnd.setHours(currentEnd.getHours(), currentEnd.getMinutes(), 0, 0)
                  
                  handleTimeRangeChange(newStart, newEnd)
                }}
              />
            ) : undefined
          }
        />
      )}

      {/* Chart Area */}
      <div ref={chartRef} className="gantt-chart">

        {/* Column Headers + Timeline Header */}
        <div className="gantt-header">
          <div className="gantt-grid-header" style={{ width: `${gridWidth}px` }}>
            {columns.map((column, index) => (
              <div
                key={`${column.field}-${index}`}
                className={`gantt-header-cell gantt-header-cell--${column.field}`}
                style={{
                  width: column.width ? `${column.width}px` : undefined,
                  flex: column.flex,
                  textAlign: column.align,
                }}
              >
                {column.headerName}
              </div>
            ))}
          </div>
          <div className="gantt-timeline-header-wrapper" style={{ width: `${timelineWidth}px` }}>
            <Timeline units={visibleUnits} viewMode={viewMode} showWeekends={showWeekends} />
          </div>
        </div>

        {/* Body */}
        <div ref={scrollRef} className="gantt-body">
          <div className="gantt-body-content">
            {/* Grid Section */}
            <div className="gantt-grid" style={{ width: `${gridWidth}px` }}>
              {flatTasks.map(({ task, level, isChild }) => {
                const hasChildren = task.children && task.children.length > 0
                const isExpanded = expandedTasks.has(task.id)

                return (
                  <div
                    key={task.id}
                    className={`gantt-row ${isChild ? 'child-row' : ''} ${hoveredTaskId === task.id ? 'hovered' : ''}`}
                    style={{ height: `${rowHeight}px` }}
                    onMouseEnter={() => setHoveredTaskId(task.id)}
                    onMouseLeave={() => setHoveredTaskId(null)}
                  >
                    {columns.map((column, colIndex) => (
                      <div
                        key={`${task.id}-${column.field}-${colIndex}`}
                        className={`gantt-cell gantt-cell--${column.field}`}
                        style={{
                          width: column.width ? `${column.width}px` : undefined,
                          flex: column.flex,
                          textAlign: column.align,
                          paddingLeft: column.field === 'title' ? `${level * 20 + 20}px` : undefined,
                        }}
                      >
                        {column.field === 'title' && hasChildren && (
                          <button
                            className={`gantt-expand-btn ${isExpanded ? 'expanded' : ''}`}
                            onClick={() => toggleTaskExpansion(task.id)}
                            aria-label={isExpanded ? 'Collapse' : 'Expand'}
                          >
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                              <path
                                d={isExpanded ? 'M2 5L6 9L10 5' : 'M5 2L9 6L5 10'}
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </button>
                        )}
                        <span
                          className="gantt-cell-content"
                          title={column.field === 'title' ? String(task.title || '') : undefined}
                        >{renderCell(task, column)}</span>
                      </div>
                    ))}
                  </div>
                )
              })}
            </div>

            {/* Chart Section */}
            <div className="gantt-timeline-body" style={{ width: `${timelineWidth}px` }}>
              {/* Horizontal row lines */}
              <div className="gantt-row-lines">
                {flatTasks.map(({ task }, index) => (
                  <div
                    key={`row-line-${task.id}`}
                    className="gantt-row-line"
                    style={{
                      top: `${(index + 1) * rowHeight}px`,
                    }}
                  />
                ))}
              </div>

              {/* Vertical grid lines */}
              <div className="gantt-grid-lines">
                {visibleUnits.map((unit, index) => (
                  <div
                    key={`grid-line-${index}`}
                    className={`gantt-grid-line ${unit.isWeekend ? 'weekend' : ''}`}
                    style={{
                      left: `${index * columnWidth}px`,
                      width: `${columnWidth}px`,
                    }}
                  />
                ))}
              </div>

              {/* Task bars */}
              <div className="gantt-tasks">
                {flatTasks.map(({ task, isChild }, index) => {
                  const position = calculateTaskPosition(task, dateRange, timelineWidth)
                  const top = index * rowHeight + (rowHeight - taskBarHeight) / 2

                  return (
                    <div
                      key={task.id}
                      className="gantt-task-wrapper"
                      style={{
                        top: `${top}px`,
                        height: `${taskBarHeight}px`,
                      }}
                    >
                      <GanttTaskBar
                        task={task}
                        left={position.left}
                        width={position.width}
                        height={taskBarHeight}
                        onClick={handleTaskBarClick}
                        onDoubleClick={onTaskDoubleClick}
                        onUpdate={onTaskUpdate}
                        enableDragResize={enableDragResize}
                        enableDragMove={enableDragMove}
                        isChild={isChild}
                      />
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <TaskDetailsDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        task={selectedTask}
        onTaskUpdate={onTaskUpdate}
      />
    </div>
  )
}

export default GanttChart
