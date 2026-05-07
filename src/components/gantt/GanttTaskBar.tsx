import React, { useState, useRef, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { GanttTask } from './types'

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
  const [tooltipBelow, setTooltipBelow] = useState(false)
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 })
  const taskRef = useRef<HTMLDivElement>(null)

  const process = task.process || 0 

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

  // Determine status class for CSS
  const getStatusClass = (): string => {
    switch (task.status) {
      case 'in-process': return 'in-process'
      case 'completed': return 'completed'
      case 'on-hold': return 'on-hold'
      case 'pending': return 'pending'
      case 'not-started': return 'not-started'
      default: return 'not-started'
    }
  }

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
    if (status === 'in-process') return 'In process'
    if (status === 'on-hold' || status === 'pending') return 'Pending'
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

  const getTooltipTitle = (): string => {
    if (task.status === 'completed') {
      return `Completed ${formatCompletedDate(task.endDate)}`
    }
    return formatStatus(task.status)
  }

  const getTooltipBody = (): string => {
    if (task.status === 'completed') {
      return `Spent time: ${approxTime}`
    }
    return `Approx.time: ${approxTime}`
  }

  return (
    <div
      ref={taskRef}
      className={`gantt-task-bar ${getStatusClass()} ${isChild ? 'child-task' : ''} ${isDragging ? 'dragging' : ''} ${isResizing ? 'resizing' : ''}`}
      style={{
        left: `${left}px`,
        width: `${width}px`,
        height: `${height}px`,
        ...(task.color ? { backgroundColor: task.color } : {}),
        cursor: enableDragMove ? 'move' : 'pointer',
      }}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      onMouseDown={(e) => handleMouseDown(e)}
      onMouseEnter={() => {
        if (taskRef.current) {
          const rect = taskRef.current.getBoundingClientRect()
          const below = rect.top < 180
          setTooltipBelow(below)
          setTooltipPos({
            x: rect.left + rect.width / 2,
            y: below ? rect.bottom + 10 : rect.top - 10,
          })
        }
        setShowTooltip(true)
      }}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {/* Process bar (solid portion) */}
      {process > 0 && !isNotStarted && (
        <div
          className="gantt-task-process"
          style={{
            width: `${process}%`,
          }}
        />
      )}

      {/* Hatched remaining portion for in-process tasks */}
      {task.status === 'in-process' && process > 0 && process < 100 && (
        <div
          className="gantt-task-remaining"
          style={{
            width: `${100 - process}%`,
          }}
        />
      )}

      {/* Tooltip rendered via portal so it escapes overflow:auto containers */}
      {showTooltip && ReactDOM.createPortal(
        <div
          className={`gantt-task-tooltip ${tooltipBelow ? 'gantt-task-tooltip--below' : ''}`}
          style={{
            position: 'fixed',
            left: tooltipPos.x,
            top: tooltipPos.y,
            transform: tooltipBelow ? 'translateX(-50%)' : 'translateX(-50%) translateY(-100%)',
            zIndex: 10000,
            pointerEvents: 'none',
          }}
        >
          <div className="gantt-task-tooltip-content">
            <span className="gantt-task-tooltip-title">{getTooltipTitle()}</span>
            <span className="gantt-task-tooltip-body">{getTooltipBody()}</span>
          </div>
        </div>,
        document.body,
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
