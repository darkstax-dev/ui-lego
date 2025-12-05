import type { Meta, StoryObj } from '@storybook/react-vite';
import { RadarChart } from './RadarChart';

const meta: Meta<typeof RadarChart> = {
  title: 'Charts/RadarChart',
  component: RadarChart,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: '600px', height: '600px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof RadarChart>;

// Sample data: Skills assessment
const skillsData = [
  {
    skill: 'JavaScript',
    alice: 110,
    bob: 93,
    charlie: 95,
  },
  {
    skill: 'Python',
    alice: 95,
    bob: 110,
    charlie: 87,
  },
  {
    skill: 'Database',
    alice: 87,
    bob: 75,
    charlie: 110,
  },
  {
    skill: 'DevOps',
    alice: 78,
    bob: 95,
    charlie: 82,
  },
  {
    skill: 'Security',
    alice: 92,
    bob: 88,
    charlie: 91,
  },
];

export const Default: Story = {
  args: {
    data: skillsData,
    keys: ['alice', 'bob', 'charlie'],
    indexBy: 'skill',
    height: 500,
    width: 600,
  },
};

export const BluePalette: Story = {
  args: {
    data: skillsData,
    keys: ['alice', 'bob', 'charlie'],
    indexBy: 'skill',
    palette: 'blue',
    height: 500,
    width: 600,
  },
};

export const WarmPalette: Story = {
  args: {
    data: skillsData,
    keys: ['alice', 'bob', 'charlie'],
    indexBy: 'skill',
    palette: 'warm',
    height: 500,
    width: 600,
  },
};

export const LinearGrid: Story = {
  args: {
    data: skillsData,
    keys: ['alice', 'bob', 'charlie'],
    indexBy: 'skill',
    gridShape: 'linear',
    palette: 'cool',
    height: 500,
    width: 600,
  },
};

export const Interactive: Story = {
  args: {
    data: skillsData,
    keys: ['alice', 'bob', 'charlie'],
    indexBy: 'skill',
    height: 500,
    width: 600,
    onDotClick: (dot: any) => {
      console.log('Dot clicked:', dot);
      alert(`Clicked: ${JSON.stringify(dot, null, 2)}`);
    },
  },
};