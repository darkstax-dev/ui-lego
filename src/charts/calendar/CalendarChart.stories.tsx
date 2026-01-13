import type { Meta, StoryObj } from '@storybook/react-vite';
import { CalendarChart, CalendarDataPoint } from './CalendarChart';

const meta: Meta<typeof CalendarChart> = {
  title: 'Charts/CalendarChart',
  component: CalendarChart,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: '1000px', height: '300px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof CalendarChart>;

// Sample data: Activity over a year
const generateCalendarData = (): CalendarDataPoint[] => {
  const data: CalendarDataPoint[] = [];
  const startDate = new Date('2023-01-01');
  const endDate = new Date('2023-12-31');
  
  for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
    data.push({
      day: d.toISOString().split('T')[0],
      value: Math.floor(Math.random() * 400),
    });
  }
  
  return data;
};

const activityData = generateCalendarData();

export const Default: Story = {
  args: {
    data: activityData,
    from: '2023-01-01',
    to: '2023-12-31',
    height: 200,
    width: 900,
  },
};

export const BluePalette: Story = {
  args: {
    data: activityData,
    from: '2023-01-01',
    to: '2023-12-31',
    palette: 'blue',
    height: 200,
    width: 900,
  },
};

export const WarmPalette: Story = {
  args: {
    data: activityData,
    from: '2023-01-01',
    to: '2023-12-31',
    palette: 'warm',
    height: 200,
    width: 900,
  },
};

export const Vertical: Story = {
  args: {
    data: activityData,
    from: '2023-01-01',
    to: '2023-12-31',
    direction: 'vertical',
    palette: 'cool',
    height: 600,
    width: 200,
  },
};

export const Interactive: Story = {
  args: {
    data: activityData,
    from: '2023-01-01',
    to: '2023-12-31',
    height: 200,
    width: 900,
    onDayClick: (day: CalendarDataPoint) => {
      console.log('Day clicked:', day);
      alert(`Date: ${day.day}, Value: ${day.value}`);
    },
  },
};
