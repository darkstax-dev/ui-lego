import type { Meta, StoryObj } from '@storybook/react-vite'
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
  return Math.round(hours * 10) / 10
}

// Task data matching Figma reference
const hourlyTasks: GanttTask[] = [
  {
    id: '1',
    title: 'API Endpoint Spec',
    startDate: new Date('2025-01-15T10:30:00'),
    endDate: new Date('2025-01-15T11:30:00'),
    status: 'completed',
    progress: 100,
    assignee: 'Maria',
    priority: 'high',
    product: 'Mobile App',
    customer: 'Acme Corp',
    agentComment: 'API endpoint specification completed successfully.',
    checklist: [
      { text: 'Define request/response schema', checked: true },
      { text: 'Write API documentation', checked: true },
    ],
    attachments: [{ fileName: 'APISpec.pdf' }],
  },
  {
    id: '2',
    title: 'Inventory Restock...',
    startDate: new Date('2025-01-15T11:00:00'),
    endDate: new Date('2025-01-15T11:30:00'),
    status: 'completed',
    progress: 100,
    assignee: 'Agent name',
    priority: 'medium',
  },
  {
    id: '3',
    title: 'Optimize SQL Que...',
    startDate: new Date('2025-01-15T12:30:00'),
    endDate: new Date('2025-01-15T16:30:00'),
    status: 'in-progress',
    progress: 60,
    assignee: 'Agent name',
    priority: 'high',
  },
  {
    id: '4',
    title: 'Inventory Restock...',
    startDate: new Date('2025-01-15T14:00:00'),
    endDate: new Date('2025-01-15T16:00:00'),
    status: 'in-progress',
    progress: 40,
    assignee: 'Agent name',
    priority: 'medium',
  },
  {
    id: '5',
    title: 'Task',
    startDate: new Date('2025-01-15T16:00:00'),
    endDate: new Date('2025-01-15T16:30:00'),
    status: 'pending',
    progress: 0,
    assignee: 'Agent name',
    priority: 'low',
  },
  {
    id: '6',
    title: 'Task',
    startDate: new Date('2025-01-15T12:00:00'),
    endDate: new Date('2025-01-15T13:00:00'),
    status: 'pending',
    progress: 0,
    assignee: 'Agent name',
    priority: 'medium',
  },
  {
    id: '7',
    title: 'Design wireframes',
    startDate: new Date('2025-01-15T10:30:00'),
    endDate: new Date('2025-01-15T11:30:00'),
    status: 'completed',
    progress: 100,
    assignee: 'Agent name',
    priority: 'high',
  },
  {
    id: '8',
    title: 'Conduct user research',
    startDate: new Date('2025-01-15T11:00:00'),
    endDate: new Date('2025-01-15T13:00:00'),
    status: 'in-progress',
    progress: 30,
    assignee: 'Agent name',
    priority: 'medium',
  },
  {
    id: '9',
    title: 'Develop prototypes',
    startDate: new Date('2025-01-15T13:00:00'),
    endDate: new Date('2025-01-15T16:00:00'),
    status: 'not-started',
    progress: 0,
    assignee: 'Agent name',
    priority: 'medium',
  },
  {
    id: '10',
    title: 'Perform usability testing',
    startDate: new Date('2025-01-15T16:00:00'),
    endDate: new Date('2025-01-15T20:00:00'),
    status: 'not-started',
    progress: 0,
    assignee: 'Agent name',
    priority: 'low',
  },
]

// Simplified columns matching the Figma reference
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
    width: 60,
    align: 'center',
    renderCell: (task) => {
      const hours = calculateHours(task.startDate, task.endDate)
      return hours.toString()
    },
  },
]

const agentNames = ['Agent name', 'Agent name', 'Agent name', 'Agent name', 'Agent name']

export const Default: Story = {
  args: {
    data: hourlyTasks,
    columns: simplifiedColumns,
    viewMode: '30min',
    rowHeight: 50,
    taskBarHeight: 32,
    showTimeRangeSlider: true,
    showHeader: true,
    headerTitle: '[GANTT CHART]',
    projectName: 'Project name',
    agentNames: agentNames,
    selectedAgent: 'Agent name',
    timeRangeStart: new Date('2025-01-15T08:00:00'),
    timeRangeEnd: new Date('2025-01-15T22:00:00'),
    defaultGridSectionWidth: 200,
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
        story: 'Gantt chart matching Figma design with 30-minute intervals, time range slider, task statuses with proper colors, and tooltips showing Approx.time or Spent time.',
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
    showHeader: true,
    headerTitle: '[GANTT CHART]',
    projectName: 'Project name',
    agentNames: agentNames,
    timeRangeStart: new Date('2025-01-15T08:00:00'),
    timeRangeEnd: new Date('2025-01-15T22:00:00'),
    defaultGridSectionWidth: 200,
  },
  parameters: {
    docs: {
      description: {
        story: 'Gantt chart with 30-minute intervals and time range slider.',
      },
    },
  },
}

// Empty Gantt chart data — tasks with 0 hours and no bars
const emptyTasks: GanttTask[] = [
  {
    id: 'e1',
    title: 'API Endpoint Spec',
    startDate: new Date('2025-01-15T07:00:00'),
    endDate: new Date('2025-01-15T07:00:00'),
    status: 'not-started',
    progress: 0,
    assignee: 'Agent name',
  },
  {
    id: 'e2',
    title: 'Inventory Restock...',
    startDate: new Date('2025-01-15T07:00:00'),
    endDate: new Date('2025-01-15T07:00:00'),
    status: 'not-started',
    progress: 0,
    assignee: 'Agent name',
  },
  {
    id: 'e3',
    title: 'Optimize SQL Que...',
    startDate: new Date('2025-01-15T07:00:00'),
    endDate: new Date('2025-01-15T07:00:00'),
    status: 'not-started',
    progress: 0,
    assignee: 'Agent name',
  },
  {
    id: 'e4',
    title: 'Inventory Restock...',
    startDate: new Date('2025-01-15T07:00:00'),
    endDate: new Date('2025-01-15T07:00:00'),
    status: 'not-started',
    progress: 0,
    assignee: 'Agent name',
  },
  {
    id: 'e5',
    title: 'Task',
    startDate: new Date('2025-01-15T07:00:00'),
    endDate: new Date('2025-01-15T07:00:00'),
    status: 'not-started',
    progress: 0,
    assignee: 'Agent name',
  },
  {
    id: 'e6',
    title: 'Task',
    startDate: new Date('2025-01-15T07:00:00'),
    endDate: new Date('2025-01-15T07:00:00'),
    status: 'not-started',
    progress: 0,
    assignee: 'Agent name',
  },
]

export const EmptyChart: Story = {
  args: {
    data: emptyTasks,
    columns: simplifiedColumns,
    viewMode: '30min',
    rowHeight: 50,
    taskBarHeight: 32,
    showTimeRangeSlider: true,
    timeInputMode: true,
    showHeader: true,
    headerTitle: '[GANTT CHART]',
    projectName: 'Project name',
    agentNames: agentNames,
    selectedAgent: '',
    defaultGridSectionWidth: 200,
  },
  parameters: {
    docs: {
      description: {
        story: 'Empty Gantt chart with no task bars. Shows Select Date, Start time, and End time input fields in the header controls area.',
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
    showHeader: true,
    headerTitle: '[GANTT CHART]',
    projectName: 'Project name',
    agentNames: agentNames,
    timeRangeStart: new Date('2025-01-15T08:00:00'),
    timeRangeEnd: new Date('2025-01-15T22:00:00'),
    defaultGridSectionWidth: 200,
  },
  parameters: {
    docs: {
      description: {
        story: 'Gantt chart with hourly intervals and time range slider.',
      },
    },
  },
}
