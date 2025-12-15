import React, { useState, useRef, useEffect } from 'react'
import { GanttTask } from './types'
import { getTaskColor } from './utils'
import Tooltip from '../tooltip/Tooltip'

export interface GanttTaskBarProps {
  task: GanttTask
  left: number
  width: number
  height: number
  onClick?: (taskId: string, task: GanttTask) => void
  onDoubleClick?: (taskId: string, task: GanttTask) => void
  onUpdate?: (taskId: string, updates: Partial<GanttTask>) => void
  enableDragResize?: boolean
  enableDragMove?: boolean
  isChild?: boolean
}

const GanttTaskBar: React.FC<GanttTaskBarProps> = ({
  task,
  left,
  width,
  height,
  onClick,
  onDoubleClick,
  onUpdate,
  enableDragResize = false,
  enableDragMove = false,
  isChild = false,
}) => {
  const [isDragging, setIsDragging] = useState(false)
  const [isResizing, setIsResizing] = useState<'left' | 'right' | null>(null)
  const [dragStart, setDragStart] = useState({ x: 0, left: 0, width: 0 })
  const [showTooltip, setShowTooltip] = useState(false)
  const taskRef = useRef<HTMLDivElement>(null)

  const taskColor = getTaskColor(task.status, task.color)
  const progress = task.progress || 0

  const handleMouseDown = (e: React.MouseEvent, resizeDirection?: 'left' | 'right') => {
    e.stopPropagation()
    
    if (resizeDirection) {
      if (!enableDragResize) return
      setIsResizing(resizeDirection)
      setDragStart({ x: e.clientX, left, width })
    } else {
      if (!enableDragMove) return
      setIsDragging(true)
      setDragStart({ x: e.clientX, left, width })
    }
  }

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (onClick) onClick(task.id, task)
  }

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (onDoubleClick) onDoubleClick(task.id, task)
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const deltaX = e.clientX - dragStart.x
        const newLeft = dragStart.left + deltaX
        // Update position logic would go here
        // This is a simplified version - full implementation would update task dates
      } else if (isResizing) {
        const deltaX = e.clientX - dragStart.x
        if (isResizing === 'right') {
          const newWidth = Math.max(20, dragStart.width + deltaX)
          // Update width logic would go here
        } else if (isResizing === 'left') {
          const newWidth = Math.max(20, dragStart.width - deltaX)
          const newLeft = dragStart.left + deltaX
          // Update left and width logic would go here
        }
      }
    }

    const handleMouseUp = () => {
      setIsDragging(false)
      setIsResizing(null)
    }

    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [isDragging, isResizing, dragStart])

  const handleStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: '8px',
    cursor: 'ew-resize',
    zIndex: 2,
  }

  const isNotStarted = task.status === 'not-started' || !task.status

  // Calculate hours for tooltip
  const calculateHours = (start: Date, end: Date): number => {
    const diffMs = end.getTime() - start.getTime()
    const hours = diffMs / (1000 * 60 * 60)
    return Math.round(hours * 10) / 10
  }

  const approxTime = calculateHours(task.startDate, task.endDate)

  // Format status for display
  const formatStatus = (status?: string): string => {
    if (!status || status === 'not-started') return 'Not started'
    if (status === 'in-progress') return 'In process'
    if (status === 'on-hold') return 'Pending'
    if (status === 'completed') return 'Completed'
    return status
  }

  // Format date for completed tasks
  const formatCompletedDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  const getTooltipBody = (): string => {
    if (task.status === 'completed') {
      return `Completed: ${formatCompletedDate(task.endDate)}\nSpent time: ${approxTime}`
    }
    return `Approx.time: ${approxTime}`
  }

  return (
    <div
      ref={taskRef}
      className={`gantt-task-bar ${isChild ? 'child-task' : ''} ${isDragging ? 'dragging' : ''} ${isResizing ? 'resizing' : ''} ${isNotStarted ? 'not-started' : ''}`}
      style={{
        left: `${left}px`,
        width: `${width}px`,
        height: `${height}px`,
        backgroundColor: taskColor,
        cursor: enableDragMove ? 'move' : 'pointer',
      }}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      onMouseDown={(e) => handleMouseDown(e)}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {/* Progress bar */}
      {progress > 0 && !isNotStarted && (
        <div
          className="gantt-task-progress"
          style={{
            width: `${progress}%`,
          }}
        />
      )}

      {/* Tooltip */}
      {showTooltip && (
        <div className="gantt-task-tooltip">
          <Tooltip
            title={formatStatus(task.status)}
            body={getTooltipBody()}
            hasBody={true}
            placement="top"
            visible={true}
          />
        </div>
      )}

      {/* Resize handles */}
      {enableDragResize && (
        <>
          <div
            className="gantt-task-handle gantt-task-handle-left"
            style={{ ...handleStyle, left: 0 }}
            onMouseDown={(e) => handleMouseDown(e, 'left')}
          />
          <div
            className="gantt-task-handle gantt-task-handle-right"
            style={{ ...handleStyle, right: 0 }}
            onMouseDown={(e) => handleMouseDown(e, 'right')}
          />
        </>
      )}
    </div>
  )
}

export default GanttTaskBar
