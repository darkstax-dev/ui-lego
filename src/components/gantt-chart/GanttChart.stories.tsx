import type { Meta, StoryObj } from '@storybook/react-vite';
import { GanttChart, GanttTask } from './GanttChart';

const meta: Meta<typeof GanttChart> = {
  title: 'Components/GanttChart',
  component: GanttChart,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A customizable Gantt chart component optimized for 12-hour timeframes with priority-based styling and progress tracking.',
      },
    },
  },
  argTypes: {
    tasks: {
      description: 'Array of tasks to display in the Gantt chart',
      control: { type: 'object' },
    },
    startHour: {
      description: 'Starting hour for the timeline (0-23)',
      control: { type: 'number', min: 0, max: 23 },
    },
    endHour: {
      description: 'Ending hour for the timeline (0-23)',
      control: { type: 'number', min: 0, max: 23 },
    },
    height: {
      description: 'Height of the chart in pixels',
      control: { type: 'number' },
    },
    showGrid: {
      description: 'Show vertical grid lines',
      control: { type: 'boolean' },
    },
    showProgress: {
      description: 'Show progress bars on tasks',
      control: { type: 'boolean' },
    },
    showTimeLabels: {
      description: 'Show time labels in header',
      control: { type: 'boolean' },
    },
    showTaskLabels: {
      description: 'Show task labels column',
      control: { type: 'boolean' },
    },
    timeFormat: {
      description: 'Time format for labels',
      control: { type: 'select' },
      options: ['12h', '24h'],
    },
    interactive: {
      description: 'Enable interactive features',
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample tasks for stories
const basicTasks: GanttTask[] = [
  {
    id: 'task-1',
    name: 'Morning Meeting',
    startTime: '09:00',
    endTime: '10:00',
    progress: 100,
    priority: 'medium',
    assignee: 'Team Lead',
  },
  {
    id: 'task-2',
    name: 'Development Work',
    startTime: '10:30',
    endTime: '15:00',
    progress: 65,
    priority: 'high',
    assignee: 'Developer',
  },
  {
    id: 'task-3',
    name: 'Code Review',
    startTime: '15:30',
    endTime: '17:00',
    progress: 30,
    priority: 'medium',
    assignee: 'Senior Dev',
  },
];

const projectTasks: GanttTask[] = [
  {
    id: 'proj-1',
    name: 'Project Kickoff',
    startTime: '09:00',
    endTime: '10:30',
    progress: 100,
    priority: 'high',
    assignee: 'Project Manager',
    category: 'Meeting',
    description: 'Initial project planning and team alignment',
  },
  {
    id: 'proj-2',
    name: 'Requirements Analysis',
    startTime: '11:00',
    endTime: '13:00',
    progress: 80,
    priority: 'critical',
    assignee: 'Business Analyst',
    category: 'Analysis',
    description: 'Gather and document project requirements',
  },
  {
    id: 'proj-3',
    name: 'Design Phase',
    startTime: '14:00',
    endTime: '17:00',
    progress: 45,
    priority: 'high',
    assignee: 'UX Designer',
    category: 'Design',
    description: 'Create wireframes and mockups',
  },
  {
    id: 'proj-4',
    name: 'Technical Planning',
    startTime: '10:00',
    endTime: '12:00',
    progress: 90,
    priority: 'medium',
    assignee: 'Tech Lead',
    category: 'Planning',
    description: 'Architecture and technical decisions',
  },
];

const productionTasks: GanttTask[] = [
  {
    id: 'prod-1',
    name: 'Pre-deployment Check',
    startTime: '08:00',
    endTime: '09:00',
    progress: 100,
    priority: 'critical',
    assignee: 'DevOps Engineer',
    color: '#d9322a',
  },
  {
    id: 'prod-2',
    name: 'Database Migration',
    startTime: '09:30',
    endTime: '11:00',
    progress: 100,
    priority: 'critical',
    assignee: 'Database Admin',
    color: '#d9322a',
  },
  {
    id: 'prod-3',
    name: 'Application Deployment',
    startTime: '11:30',
    endTime: '14:00',
    progress: 75,
    priority: 'critical',
    assignee: 'DevOps Team',
    color: '#d9322a',
  },
  {
    id: 'prod-4',
    name: 'Smoke Testing',
    startTime: '14:30',
    endTime: '16:00',
    progress: 40,
    priority: 'high',
    assignee: 'QA Engineer',
    color: '#ed8b30',
  },
  {
    id: 'prod-5',
    name: 'Monitoring Setup',
    startTime: '16:30',
    endTime: '18:00',
    progress: 0,
    priority: 'medium',
    assignee: 'SRE Team',
    color: '#0072ff',
  },
];

const meetingTasks: GanttTask[] = [
  {
    id: 'meet-1',
    name: 'Daily Standup',
    startTime: '09:00',
    endTime: '09:15',
    progress: 100,
    priority: 'low',
    assignee: 'Scrum Master',
  },
  {
    id: 'meet-2',
    name: 'Sprint Planning',
    startTime: '10:00',
    endTime: '12:00',
    progress: 100,
    priority: 'high',
    assignee: 'Product Owner',
  },
  {
    id: 'meet-3',
    name: 'Client Demo',
    startTime: '14:00',
    endTime: '15:00',
    progress: 50,
    priority: 'critical',
    assignee: 'Sales Team',
  },
  {
    id: 'meet-4',
    name: 'Team Retrospective',
    startTime: '16:00',
    endTime: '17:00',
    progress: 0,
    priority: 'medium',
    assignee: 'Team',
  },
];

export const Default: Story = {
  args: {
    tasks: basicTasks,
    startHour: 8,
    endHour: 18,
    height: 300,
    showGrid: true,
    showProgress: true,
    showTimeLabels: true,
    showTaskLabels: true,
    timeFormat: '12h',
    interactive: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Default Gantt chart with basic tasks and standard configuration.',
      },
    },
  },
};

export const ProjectSchedule: Story = {
  args: {
    tasks: projectTasks,
    startHour: 9,
    endHour: 17,
    height: 350,
    showGrid: true,
    showProgress: true,
    showTimeLabels: true,
    showTaskLabels: true,
    timeFormat: '12h',
    interactive: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Project schedule with different priority levels and detailed task information.',
      },
    },
  },
};

export const ProductionDeployment: Story = {
  args: {
    tasks: productionTasks,
    startHour: 8,
    endHour: 20,
    height: 400,
    showGrid: true,
    showProgress: true,
    showTimeLabels: true,
    showTaskLabels: true,
    timeFormat: '24h',
    interactive: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Production deployment schedule with critical tasks and custom colors.',
      },
    },
  },
};

export const MeetingSchedule: Story = {
  args: {
    tasks: meetingTasks,
    startHour: 9,
    endHour: 17,
    height: 300,
    showGrid: true,
    showProgress: true,
    showTimeLabels: true,
    showTaskLabels: true,
    timeFormat: '12h',
    interactive: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Daily meeting schedule with various meeting types and durations.',
      },
    },
  },
};

export const Minimal: Story = {
  args: {
    tasks: basicTasks,
    startHour: 9,
    endHour: 17,
    height: 250,
    showGrid: false,
    showProgress: false,
    showTimeLabels: true,
    showTaskLabels: false,
    timeFormat: '24h',
    interactive: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Minimal Gantt chart without grid, progress bars, or task labels.',
      },
    },
  },
};

export const CompactView: Story = {
  args: {
    tasks: [
      {
        id: 'compact-1',
        name: 'Task A',
        startTime: '10:00',
        endTime: '12:00',
        progress: 75,
        priority: 'high',
      },
      {
        id: 'compact-2',
        name: 'Task B',
        startTime: '13:00',
        endTime: '15:00',
        progress: 50,
        priority: 'medium',
      },
      {
        id: 'compact-3',
        name: 'Task C',
        startTime: '15:30',
        endTime: '17:00',
        progress: 25,
        priority: 'low',
      },
    ],
    startHour: 10,
    endHour: 17,
    height: 200,
    showGrid: true,
    showProgress: true,
    showTimeLabels: true,
    showTaskLabels: true,
    timeFormat: '12h',
    interactive: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Compact view with shorter time range and fewer tasks.',
      },
    },
  },
};

export const EarlyMorning: Story = {
  args: {
    tasks: [
      {
        id: 'early-1',
        name: 'System Backup',
        startTime: '06:00',
        endTime: '07:30',
        progress: 100,
        priority: 'critical',
        assignee: 'System Admin',
      },
      {
        id: 'early-2',
        name: 'Database Maintenance',
        startTime: '07:45',
        endTime: '09:00',
        progress: 80,
        priority: 'high',
        assignee: 'DBA Team',
      },
      {
        id: 'early-3',
        name: 'Server Health Check',
        startTime: '09:15',
        endTime: '10:00',
        progress: 60,
        priority: 'medium',
        assignee: 'DevOps',
      },
    ],
    startHour: 6,
    endHour: 10,
    height: 250,
    showGrid: true,
    showProgress: true,
    showTimeLabels: true,
    showTaskLabels: true,
    timeFormat: '24h',
    interactive: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Early morning schedule for system maintenance tasks.',
      },
    },
  },
};

export const Interactive: Story = {
  args: {
    tasks: projectTasks,
    startHour: 9,
    endHour: 17,
    height: 350,
    showGrid: true,
    showProgress: true,
    showTimeLabels: true,
    showTaskLabels: true,
    timeFormat: '12h',
    interactive: true,
    onTaskClick: (task: GanttTask) => {
      alert(`Clicked on task: ${task.name}\nTime: ${task.startTime} - ${task.endTime}\nProgress: ${task.progress}%`);
    },
    onTaskHover: (task: GanttTask) => {
      console.log(`Hovered over: ${task.name}`);
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive Gantt chart with click and hover handlers. Click on tasks to see details.',
      },
    },
  },
};
