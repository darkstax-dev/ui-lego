import React, { useMemo } from 'react';
import './GanttChart.css';

export interface GanttTask {
  id: string;
  name: string;
  startTime: string; // Format: "HH:MM" (24-hour format)
  endTime: string;   // Format: "HH:MM" (24-hour format)
  progress?: number; // 0-100
  color?: string;
  category?: string;
  description?: string;
  priority?: 'low' | 'medium' | 'high' | 'critical';
  assignee?: string;
  dependencies?: string[]; // Array of task IDs this task depends on
}

export interface GanttChartProps {
  tasks: GanttTask[];
  startHour?: number; // Starting hour (0-23), default 8 (8 AM)
  endHour?: number;   // Ending hour (0-23), default 20 (8 PM)
  height?: number;
  showGrid?: boolean;
  showProgress?: boolean;
  showTimeLabels?: boolean;
  showTaskLabels?: boolean;
  interactive?: boolean;
  className?: string;
  onTaskClick?: (task: GanttTask) => void;
  onTaskHover?: (task: GanttTask) => void;
  timeFormat?: '12h' | '24h'; // Display format for time labels
}

export const GanttChart: React.FC<GanttChartProps> = ({
  tasks,
  startHour = 8,
  endHour = 20,
  height = 400,
  showGrid = true,
  showProgress = true,
  showTimeLabels = true,
  showTaskLabels = true,
  interactive = true,
  className = '',
  onTaskClick,
  onTaskHover,
  timeFormat = '12h',
}) => {
  // Calculate time range and intervals
  const totalHours = endHour - startHour;
  const hourWidth = 100 / totalHours; // Percentage width per hour

  // Generate time labels
  const timeLabels = useMemo(() => {
    const labels = [];
    for (let hour = startHour; hour <= endHour; hour++) {
      if (timeFormat === '12h') {
        const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
        const period = hour < 12 ? 'AM' : 'PM';
        labels.push(`${displayHour}:00 ${period}`);
      } else {
        labels.push(`${hour.toString().padStart(2, '0')}:00`);
      }
    }
    return labels;
  }, [startHour, endHour, timeFormat]);

  // Convert time string to minutes since start of day
  const timeToMinutes = (timeStr: string): number => {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
  };

  // Calculate task positioning
  const getTaskPosition = (task: GanttTask) => {
    const startMinutes = timeToMinutes(task.startTime);
    const endMinutes = timeToMinutes(task.endTime);
    const startHourMinutes = startHour * 60;
    const totalMinutes = totalHours * 60;

    const left = ((startMinutes - startHourMinutes) / totalMinutes) * 100;
    const width = ((endMinutes - startMinutes) / totalMinutes) * 100;

    return { left: Math.max(0, left), width: Math.max(0, width) };
  };

  // Get priority class
  const getPriorityClass = (priority?: string) => {
    switch (priority) {
      case 'critical': return 'gantt-chart__task--critical';
      case 'high': return 'gantt-chart__task--high';
      case 'medium': return 'gantt-chart__task--medium';
      case 'low': return 'gantt-chart__task--low';
      default: return 'gantt-chart__task--default';
    }
  };

  // Format time for display
  const formatTime = (timeStr: string) => {
    const [hours, minutes] = timeStr.split(':').map(Number);
    if (timeFormat === '12h') {
      const displayHour = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
      const period = hours < 12 ? 'AM' : 'PM';
      return `${displayHour}:${minutes.toString().padStart(2, '0')} ${period}`;
    }
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`gantt-chart ${className}`} style={{ height }}>
      {/* Time Header */}
      {showTimeLabels && (
        <div className="gantt-chart__header">
          <div className="gantt-chart__task-labels-column">
            {showTaskLabels && <div className="gantt-chart__header-label">Tasks</div>}
          </div>
          <div className="gantt-chart__timeline-header">
            {timeLabels.map((label, index) => (
              <div
                key={index}
                className="gantt-chart__time-label"
                style={{ width: `${hourWidth}%` }}
              >
                {label}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main Chart Area */}
      <div className="gantt-chart__body">
        {/* Task Labels Column */}
        {showTaskLabels && (
          <div className="gantt-chart__task-labels-column">
            {tasks.map((task) => (
              <div key={task.id} className="gantt-chart__task-label">
                <div className="gantt-chart__task-name">{task.name}</div>
                {task.assignee && (
                  <div className="gantt-chart__task-assignee">{task.assignee}</div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Timeline Area */}
        <div className="gantt-chart__timeline">
          {/* Grid Lines */}
          {showGrid && (
            <div className="gantt-chart__grid">
              {Array.from({ length: totalHours + 1 }, (_, index) => (
                <div
                  key={index}
                  className="gantt-chart__grid-line"
                  style={{ left: `${index * hourWidth}%` }}
                />
              ))}
            </div>
          )}

          {/* Task Bars */}
          <div className="gantt-chart__tasks">
            {tasks.map((task, index) => {
              const position = getTaskPosition(task);
              const priorityClass = getPriorityClass(task.priority);

              return (
                <div
                  key={task.id}
                  className={`gantt-chart__task-row ${priorityClass}`}
                  style={{ top: `${index * 60}px` }}
                >
                  <div
                    className={`gantt-chart__task-bar ${interactive ? 'gantt-chart__task-bar--interactive' : ''}`}
                    style={{
                      left: `${position.left}%`,
                      width: `${position.width}%`,
                      backgroundColor: task.color || 'var(--color-blue-700)',
                    }}
                    onClick={() => interactive && onTaskClick?.(task)}
                    onMouseEnter={() => interactive && onTaskHover?.(task)}
                    title={`${task.name}: ${formatTime(task.startTime)} - ${formatTime(task.endTime)}`}
                  >
                    {/* Progress Bar */}
                    {showProgress && task.progress !== undefined && (
                      <div
                        className="gantt-chart__progress-bar"
                        style={{ width: `${task.progress}%` }}
                      />
                    )}

                    {/* Task Content */}
                    <div className="gantt-chart__task-content">
                      <span className="gantt-chart__task-text">{task.name}</span>
                      {task.progress !== undefined && (
                        <span className="gantt-chart__task-progress">{task.progress}%</span>
                      )}
                    </div>

                    {/* Time Labels on Bar */}
                    <div className="gantt-chart__task-times">
                      <span className="gantt-chart__start-time">{formatTime(task.startTime)}</span>
                      <span className="gantt-chart__end-time">{formatTime(task.endTime)}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Current Time Indicator */}
      <div className="gantt-chart__current-time-indicator">
        <div className="gantt-chart__current-time-line" />
      </div>
    </div>
  );
};

export default GanttChart;
