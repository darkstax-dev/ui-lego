import type { Meta, StoryObj } from '@storybook/react'
import GanttChart from './GanttChart'
import { GanttTask, GanttColumn } from './types'

const meta: Meta<typeof GanttChart> = {
  title: 'Components/GanttChart',
  component: GanttChart,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof GanttChart>

// Calculate hours between two dates
const calculateHours = (startDate: Date, endDate: Date): number => {
  const diffMs = endDate.getTime() - startDate.getTime()
  const hours = diffMs / (1000 * 60 * 60)
  return Math.round(hours * 10) / 10 // Round to 1 decimal place
}

// Task data for time-based views
const hourlyTasks: GanttTask[] = [
  {
    id: '1',
    title: 'API Endpoint Spec',
    startDate: new Date('2025-01-15T10:30:00'),
    endDate: new Date('2025-01-15T11:00:00'),
    status: 'completed',
    progress: 100,
    assignee: 'Alice',
    priority: 'high',
  },
  {
    id: '2',
    title: 'Inventory Restock',
    startDate: new Date('2025-01-15T11:00:00'),
    endDate: new Date('2025-01-15T11:30:00'),
    status: 'completed',
    progress: 100,
    assignee: 'Bob',
    priority: 'medium',
  },
  {
    id: '3',
    title: 'Optimize SQL Query',
    startDate: new Date('2025-01-15T12:30:00'),
    endDate: new Date('2025-01-15T15:00:00'),
    status: 'in-progress',
    progress: 60,
    assignee: 'Carol',
    priority: 'high',
  },
  {
    id: '4',
    title: 'Inventory Restock',
    startDate: new Date('2025-01-15T14:30:00'),
    endDate: new Date('2025-01-15T16:30:00'),
    status: 'in-progress',
    progress: 40,
    assignee: 'David',
    priority: 'medium',
  },
  {
    id: '5',
    title: 'Task',
    startDate: new Date('2025-01-15T16:00:00'),
    endDate: new Date('2025-01-15T16:30:00'),
    status: 'on-hold',
    progress: 0,
    assignee: 'Eve',
    priority: 'low',
  },
  {
    id: '6',
    title: 'Task',
    startDate: new Date('2025-01-15T19:00:00'),
    endDate: new Date('2025-01-15T22:00:00'),
    status: 'not-started',
    progress: 0,
    assignee: 'Frank',
    priority: 'medium',
  },
]

// Simplified columns matching the reference image
const simplifiedColumns: GanttColumn[] = [
  {
    field: 'title',
    headerName: 'TASK NAME',
    flex: 1,
    align: 'left',
  },
  {
    field: 'hours',
    headerName: 'HOURS',
    width: 100,
    align: 'left',
    renderCell: (task) => {
      const hours = calculateHours(task.startDate, task.endDate)
      return hours.toString()
    },
  },
  {
    field: 'assignee',
    headerName: 'AGENT NAME',
    width: 150,
    align: 'left',
  },
]

export const Default: Story = {
  args: {
    data: hourlyTasks,
    columns: simplifiedColumns,
    viewMode: '30min',
    rowHeight: 50,
    taskBarHeight: 32,
    showTimeRangeSlider: true,
    timeRangeStart: new Date('2025-01-15T10:30:00'),
    timeRangeEnd: new Date('2025-01-15T23:30:00'),
    onTaskClick: (taskId, task) => {
      console.log('Task clicked:', taskId, task)
    },
    onTaskDoubleClick: (taskId, task) => {
      console.log('Task double-clicked:', taskId, task)
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Gantt chart with 30-minute intervals, time range slider, and simplified columns showing task name, hours, and agent name.',
      },
    },
  },
}

export const ThirtyMinuteView: Story = {
  args: {
    data: hourlyTasks,
    columns: simplifiedColumns,
    viewMode: '30min',
    rowHeight: 50,
    taskBarHeight: 32,
    showTimeRangeSlider: true,
    timeRangeStart: new Date('2025-01-15T10:30:00'),
    timeRangeEnd: new Date('2025-01-15T23:30:00'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Gantt chart with 30-minute intervals and time range slider. Similar to the reference image with hourly task scheduling.',
      },
    },
  },
}

export const HourlyView: Story = {
  args: {
    data: hourlyTasks,
    columns: simplifiedColumns,
    viewMode: 'hour',
    rowHeight: 50,
    taskBarHeight: 32,
    showTimeRangeSlider: true,
    timeRangeStart: new Date('2025-01-15T10:00:00'),
    timeRangeEnd: new Date('2025-01-15T23:00:00'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Gantt chart with hourly intervals and time range slider for fine-grained time management.',
      },
    },
  },
}
