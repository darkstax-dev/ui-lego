import { ViewMode, TimelineUnit, DateRange, GanttTask } from './types'

export const getDateRange = (tasks: GanttTask[]): DateRange => {
  if (tasks.length === 0) {
    const now = new Date()
    return {
      start: new Date(now.getFullYear(), now.getMonth(), 1),
      end: new Date(now.getFullYear(), now.getMonth() + 3, 0),
    }
  }

  let minDate = new Date(tasks[0].startDate)
  let maxDate = new Date(tasks[0].endDate)

  const processTask = (task: GanttTask) => {
    const start = new Date(task.startDate)
    const end = new Date(task.endDate)
    
    if (start < minDate) minDate = start
    if (end > maxDate) maxDate = end
    
    if (task.children) {
      task.children.forEach(processTask)
    }
  }

  tasks.forEach(processTask)

  // Add padding based on view mode - default to 7 days
  const padding = 7 * 24 * 60 * 60 * 1000 // 7 days
  return {
    start: new Date(minDate.getTime() - padding),
    end: new Date(maxDate.getTime() + padding),
  }
}

export const getDateRangeForTimeView = (baseDate: Date, hoursRange: number = 24): DateRange => {
  const start = new Date(baseDate)
  start.setHours(0, 0, 0, 0)
  const end = new Date(start)
  end.setHours(hoursRange, 0, 0, 0)
  return { start, end }
}

export const generateTimelineUnits = (
  dateRange: DateRange,
  viewMode: ViewMode
): TimelineUnit[] => {
  const units: TimelineUnit[] = []
  const current = new Date(dateRange.start)
  const end = new Date(dateRange.end)

  while (current <= end) {
    let unitStart: Date
    let unitEnd: Date
    let label: string

    switch (viewMode) {
      case 'month': {
        unitStart = new Date(current.getFullYear(), current.getMonth(), 1)
        unitEnd = new Date(current.getFullYear(), current.getMonth() + 1, 0, 23, 59, 59)
        label = unitStart.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
        current.setMonth(current.getMonth() + 1)
        break
      }
      case 'week': {
        const dayOfWeek = current.getDay()
        const diff = current.getDate() - dayOfWeek
        unitStart = new Date(current.getFullYear(), current.getMonth(), diff)
        unitEnd = new Date(unitStart)
        unitEnd.setDate(unitEnd.getDate() + 6)
        unitEnd.setHours(23, 59, 59)
        label = `Week ${getWeekNumber(unitStart)}`
        current.setDate(current.getDate() + 7)
        break
      }
      case 'day': {
        unitStart = new Date(current.getFullYear(), current.getMonth(), current.getDate())
        unitEnd = new Date(unitStart)
        unitEnd.setHours(23, 59, 59)
        label = unitStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
        const isWeekend = unitStart.getDay() === 0 || unitStart.getDay() === 6
        units.push({ label, startDate: unitStart, endDate: unitEnd, isWeekend })
        current.setDate(current.getDate() + 1)
        continue
      }
      case 'hour': {
        unitStart = new Date(current)
        unitEnd = new Date(current)
        unitEnd.setHours(unitEnd.getHours() + 1)
        label = formatTimeLabel(unitStart)
        units.push({ label, startDate: unitStart, endDate: unitEnd })
        current.setHours(current.getHours() + 1)
        continue
      }
      case '30min': {
        unitStart = new Date(current)
        unitEnd = new Date(current)
        unitEnd.setMinutes(unitEnd.getMinutes() + 30)
        label = formatTimeLabel(unitStart)
        units.push({ label, startDate: unitStart, endDate: unitEnd })
        current.setMinutes(current.getMinutes() + 30)
        continue
      }
    }

    units.push({ label, startDate: unitStart, endDate: unitEnd })
  }

  return units
}

const getWeekNumber = (date: Date): number => {
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1)
  const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7)
}

export const calculateTaskPosition = (
  task: GanttTask,
  dateRange: DateRange,
  totalWidth: number
): { left: number; width: number } => {
  const totalDuration = dateRange.end.getTime() - dateRange.start.getTime()
  const taskStart = new Date(task.startDate).getTime()
  const taskEnd = new Date(task.endDate).getTime()

  const startOffset = taskStart - dateRange.start.getTime()
  const taskDuration = taskEnd - taskStart

  const left = (startOffset / totalDuration) * totalWidth
  const width = (taskDuration / totalDuration) * totalWidth

  return { left: Math.max(0, left), width: Math.max(20, width) }
}

export const getTaskColor = (status?: string, color?: string): string => {
  if (color) return color
  
  switch (status) {
    case 'completed':
      return '#00112B' // Dark blue
    case 'in-progress':
      return '#0451A4' // Blue
    case 'on-hold':
      return '#D9322A' // Red (pending)
    case 'cancelled':
      return '#D9322A' // Red
    case 'not-started':
      return '#CECECE' // Gray with stripe pattern
    default:
      return '#CECECE' // Gray with stripe pattern
  }
}

export const flattenTasks = (tasks: GanttTask[]): GanttTask[] => {
  const result: GanttTask[] = []
  
  const flatten = (task: GanttTask) => {
    result.push(task)
    if (task.children) {
      task.children.forEach(flatten)
    }
  }
  
  tasks.forEach(flatten)
  return result
}

export const formatDate = (date: Date, locale: string = 'en'): string => {
  return date.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export const addDays = (date: Date, days: number): Date => {
  const result = new Date(date)
  result.setDate(result.getDate() + days)
  return result
}

export const isSameDay = (date1: Date, date2: Date): boolean => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  )
}

export const getColumnWidth = (viewMode: ViewMode): number => {
  switch (viewMode) {
    case '30min':
      return 80
    case 'hour':
      return 60
    case 'day':
      return 40
    case 'week':
      return 100
    case 'month':
      return 120
    default:
      return 100
  }
}

export const formatTimeLabel = (date: Date): string => {
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const period = hours >= 12 ? 'PM' : 'AM'
  const displayHours = hours % 12 || 12
  const displayMinutes = minutes.toString().padStart(2, '0')
  return `${displayHours}:${displayMinutes}${period}`
}

export const formatTimeRange = (start: Date, end: Date): string => {
  return `${formatTimeLabel(start)} - ${formatTimeLabel(end)}`
}
