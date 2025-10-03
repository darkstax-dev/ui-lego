import React, { useState } from 'react';
import { GanttChart, GanttTask } from './GanttChart';
import './GanttChartDemo.css';

// Sample data for different scenarios
const sampleTasks: GanttTask[] = [
  {
    id: 'task-1',
    name: 'Project Planning',
    startTime: '09:00',
    endTime: '10:30',
    progress: 100,
    priority: 'high',
    assignee: 'Alice Johnson',
    category: 'Planning',
    description: 'Initial project planning and requirement gathering',
    color: '#0072ff',
  },
  {
    id: 'task-2',
    name: 'Design Review',
    startTime: '10:45',
    endTime: '12:00',
    progress: 75,
    priority: 'medium',
    assignee: 'Bob Smith',
    category: 'Design',
    description: 'Review and approve design mockups',
    dependencies: ['task-1'],
  },
  {
    id: 'task-3',
    name: 'Development Sprint',
    startTime: '13:00',
    endTime: '17:00',
    progress: 45,
    priority: 'critical',
    assignee: 'Carol Davis',
    category: 'Development',
    description: 'Core feature development',
    dependencies: ['task-2'],
  },
  {
    id: 'task-4',
    name: 'Testing Phase',
    startTime: '15:30',
    endTime: '18:00',
    progress: 20,
    priority: 'high',
    assignee: 'David Wilson',
    category: 'QA',
    description: 'Comprehensive testing and bug fixes',
    dependencies: ['task-3'],
  },
  {
    id: 'task-5',
    name: 'Documentation',
    startTime: '11:00',
    endTime: '14:00',
    progress: 60,
    priority: 'low',
    assignee: 'Eve Brown',
    category: 'Documentation',
    description: 'Update project documentation',
  },
  {
    id: 'task-6',
    name: 'Client Meeting',
    startTime: '16:00',
    endTime: '17:30',
    progress: 0,
    priority: 'medium',
    assignee: 'Frank Miller',
    category: 'Meeting',
    description: 'Present progress to client',
    dependencies: ['task-3'],
  },
];

const productionTasks: GanttTask[] = [
  {
    id: 'prod-1',
    name: 'Server Deployment',
    startTime: '08:00',
    endTime: '10:00',
    progress: 90,
    priority: 'critical',
    assignee: 'DevOps Team',
    category: 'Infrastructure',
  },
  {
    id: 'prod-2',
    name: 'Database Migration',
    startTime: '10:30',
    endTime: '12:30',
    progress: 100,
    priority: 'critical',
    assignee: 'DB Admin',
    category: 'Database',
  },
  {
    id: 'prod-3',
    name: 'Load Testing',
    startTime: '13:00',
    endTime: '15:00',
    progress: 30,
    priority: 'high',
    assignee: 'QA Team',
    category: 'Testing',
  },
  {
    id: 'prod-4',
    name: 'Monitoring Setup',
    startTime: '15:30',
    endTime: '17:30',
    progress: 0,
    priority: 'medium',
    assignee: 'SRE Team',
    category: 'Monitoring',
  },
];

const meetingTasks: GanttTask[] = [
  {
    id: 'meet-1',
    name: 'Daily Standup',
    startTime: '09:00',
    endTime: '09:30',
    progress: 100,
    priority: 'medium',
    assignee: 'Scrum Master',
    category: 'Meeting',
  },
  {
    id: 'meet-2',
    name: 'Architecture Review',
    startTime: '10:00',
    endTime: '11:30',
    progress: 100,
    priority: 'high',
    assignee: 'Tech Lead',
    category: 'Review',
  },
  {
    id: 'meet-3',
    name: 'Sprint Planning',
    startTime: '14:00',
    endTime: '16:00',
    progress: 50,
    priority: 'high',
    assignee: 'Product Owner',
    category: 'Planning',
  },
  {
    id: 'meet-4',
    name: 'Retrospective',
    startTime: '16:30',
    endTime: '17:30',
    progress: 0,
    priority: 'medium',
    assignee: 'Team',
    category: 'Meeting',
  },
];

export const GanttChartDemo: React.FC = () => {
  const [selectedDataset, setSelectedDataset] = useState<'project' | 'production' | 'meetings'>('project');
  const [showGrid, setShowGrid] = useState(true);
  const [showProgress, setShowProgress] = useState(true);
  const [showTimeLabels, setShowTimeLabels] = useState(true);
  const [showTaskLabels, setShowTaskLabels] = useState(true);
  const [timeFormat, setTimeFormat] = useState<'12h' | '24h'>('12h');
  const [startHour, setStartHour] = useState(8);
  const [endHour, setEndHour] = useState(20);
  const [selectedTask, setSelectedTask] = useState<GanttTask | null>(null);

  const getCurrentTasks = () => {
    switch (selectedDataset) {
      case 'production': return productionTasks;
      case 'meetings': return meetingTasks;
      default: return sampleTasks;
    }
  };

  const handleTaskClick = (task: GanttTask) => {
    setSelectedTask(task);
  };

  const handleTaskHover = (task: GanttTask) => {
    console.log('Hovered task:', task.name);
  };

  return (
    <div className="gantt-chart-demo">
      <div className="gantt-chart-demo__header">
        <h2 className="heading-subheading-macan">Gantt Chart Demo</h2>
        <p className="body-base-macan-book">
          Interactive Gantt chart component with 12-hour timeline support, 
          priority-based styling, and progress tracking.
        </p>
      </div>

      {/* Controls */}
      <div className="gantt-chart-demo__controls">
        <div className="gantt-chart-demo__control-group">
          <label className="gantt-chart-demo__label">Dataset:</label>
          <select
            value={selectedDataset}
            onChange={(e) => setSelectedDataset(e.target.value as any)}
            className="gantt-chart-demo__select"
          >
            <option value="project">Project Tasks</option>
            <option value="production">Production Deployment</option>
            <option value="meetings">Daily Meetings</option>
          </select>
        </div>

        <div className="gantt-chart-demo__control-group">
          <label className="gantt-chart-demo__label">Time Format:</label>
          <select
            value={timeFormat}
            onChange={(e) => setTimeFormat(e.target.value as '12h' | '24h')}
            className="gantt-chart-demo__select"
          >
            <option value="12h">12 Hour (AM/PM)</option>
            <option value="24h">24 Hour</option>
          </select>
        </div>

        <div className="gantt-chart-demo__control-group">
          <label className="gantt-chart-demo__label">Start Hour:</label>
          <input
            type="number"
            min="0"
            max="23"
            value={startHour}
            onChange={(e) => setStartHour(Number(e.target.value))}
            className="gantt-chart-demo__input"
          />
        </div>

        <div className="gantt-chart-demo__control-group">
          <label className="gantt-chart-demo__label">End Hour:</label>
          <input
            type="number"
            min="0"
            max="23"
            value={endHour}
            onChange={(e) => setEndHour(Number(e.target.value))}
            className="gantt-chart-demo__input"
          />
        </div>
      </div>

      {/* Toggle Controls */}
      <div className="gantt-chart-demo__toggles">
        <label className="gantt-chart-demo__toggle">
          <input
            type="checkbox"
            checked={showGrid}
            onChange={(e) => setShowGrid(e.target.checked)}
          />
          <span>Show Grid</span>
        </label>

        <label className="gantt-chart-demo__toggle">
          <input
            type="checkbox"
            checked={showProgress}
            onChange={(e) => setShowProgress(e.target.checked)}
          />
          <span>Show Progress</span>
        </label>

        <label className="gantt-chart-demo__toggle">
          <input
            type="checkbox"
            checked={showTimeLabels}
            onChange={(e) => setShowTimeLabels(e.target.checked)}
          />
          <span>Show Time Labels</span>
        </label>

        <label className="gantt-chart-demo__toggle">
          <input
            type="checkbox"
            checked={showTaskLabels}
            onChange={(e) => setShowTaskLabels(e.target.checked)}
          />
          <span>Show Task Labels</span>
        </label>
      </div>

      {/* Gantt Chart */}
      <div className="gantt-chart-demo__chart">
        <GanttChart
          tasks={getCurrentTasks()}
          startHour={startHour}
          endHour={endHour}
          height={400}
          showGrid={showGrid}
          showProgress={showProgress}
          showTimeLabels={showTimeLabels}
          showTaskLabels={showTaskLabels}
          timeFormat={timeFormat}
          interactive={true}
          onTaskClick={handleTaskClick}
          onTaskHover={handleTaskHover}
        />
      </div>

      {/* Task Details Panel */}
      {selectedTask && (
        <div className="gantt-chart-demo__details">
          <h3 className="gantt-chart-demo__details-title">Task Details</h3>
          <div className="gantt-chart-demo__details-content">
            <div className="gantt-chart-demo__detail-item">
              <strong>Name:</strong> {selectedTask.name}
            </div>
            <div className="gantt-chart-demo__detail-item">
              <strong>Time:</strong> {selectedTask.startTime} - {selectedTask.endTime}
            </div>
            <div className="gantt-chart-demo__detail-item">
              <strong>Progress:</strong> {selectedTask.progress || 0}%
            </div>
            <div className="gantt-chart-demo__detail-item">
              <strong>Priority:</strong> 
              <span className={`gantt-chart-demo__priority gantt-chart-demo__priority--${selectedTask.priority}`}>
                {selectedTask.priority || 'default'}
              </span>
            </div>
            {selectedTask.assignee && (
              <div className="gantt-chart-demo__detail-item">
                <strong>Assignee:</strong> {selectedTask.assignee}
              </div>
            )}
            {selectedTask.category && (
              <div className="gantt-chart-demo__detail-item">
                <strong>Category:</strong> {selectedTask.category}
              </div>
            )}
            {selectedTask.description && (
              <div className="gantt-chart-demo__detail-item">
                <strong>Description:</strong> {selectedTask.description}
              </div>
            )}
            {selectedTask.dependencies && selectedTask.dependencies.length > 0 && (
              <div className="gantt-chart-demo__detail-item">
                <strong>Dependencies:</strong> {selectedTask.dependencies.join(', ')}
              </div>
            )}
          </div>
          <button
            onClick={() => setSelectedTask(null)}
            className="gantt-chart-demo__close-button"
          >
            Close
          </button>
        </div>
      )}

      {/* Legend */}
      <div className="gantt-chart-demo__legend">
        <h4 className="gantt-chart-demo__legend-title">Priority Legend</h4>
        <div className="gantt-chart-demo__legend-items">
          <div className="gantt-chart-demo__legend-item">
            <div className="gantt-chart-demo__legend-color gantt-chart-demo__legend-color--critical"></div>
            <span>Critical</span>
          </div>
          <div className="gantt-chart-demo__legend-item">
            <div className="gantt-chart-demo__legend-color gantt-chart-demo__legend-color--high"></div>
            <span>High</span>
          </div>
          <div className="gantt-chart-demo__legend-item">
            <div className="gantt-chart-demo__legend-color gantt-chart-demo__legend-color--medium"></div>
            <span>Medium</span>
          </div>
          <div className="gantt-chart-demo__legend-item">
            <div className="gantt-chart-demo__legend-color gantt-chart-demo__legend-color--low"></div>
            <span>Low</span>
          </div>
        </div>
      </div>

    </div>
  );
};

export default GanttChartDemo;
