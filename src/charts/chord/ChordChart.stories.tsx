import type { Meta, StoryObj } from '@storybook/react-vite';
import { ChordChart } from './ChordChart';

const meta: Meta<typeof ChordChart> = {
  title: 'Charts/ChordChart',
  component: ChordChart,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: '700px', height: '600px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ChordChart>;

// Sample data: Migration flows
const migrationData = [
  [11975, 5871, 8916, 2868],
  [1951, 10048, 2060, 6171],
  [8010, 16145, 8090, 8045],
  [1013, 990, 940, 6907],
];

const migrationKeys = ['John', 'Raoul', 'Jane', 'Marcel'];

export const Default: Story = {
  args: {
    data: migrationData,
    keys: migrationKeys,
    height: 500,
    width: 600,
  },
};

export const BluePalette: Story = {
  args: {
    data: migrationData,
    keys: migrationKeys,
    palette: 'blue',
    height: 500,
    width: 600,
  },
};

export const WarmPalette: Story = {
  args: {
    data: migrationData,
    keys: migrationKeys,
    palette: 'warm',
    height: 500,
    width: 600,
  },
};

export const NoLabels: Story = {
  args: {
    data: migrationData,
    keys: migrationKeys,
    enableLabel: false,
    palette: 'cool',
    height: 500,
    width: 600,
  },
};

export const Interactive: Story = {
  args: {
    data: migrationData,
    keys: migrationKeys,
    height: 500,
    width: 600,
    onArcClick: (arc: any) => {
      console.log('Arc clicked:', arc);
      alert(`Arc: ${JSON.stringify(arc, null, 2)}`);
    },
    onRibbonClick: (ribbon: any) => {
      console.log('Ribbon clicked:', ribbon);
      alert(`Ribbon: ${JSON.stringify(ribbon, null, 2)}`);
    },
  },
};
