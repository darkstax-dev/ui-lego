import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { PieChartDemo } from './pie/PieChartDemo';
import { BarChartDemo } from './bar/BarChartDemo';
import { LineChartDemo } from './line/LineChartDemo';
import { StreamChartDemo } from './stream/StreamChartDemo';

const AllChartsDemoComponent: React.FC = () => {
  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{
        fontFamily: 'var(--font-family-macan-mono)',
        fontSize: '24px',
        marginBottom: '40px',
        color: 'var(--Text-Blue-text-Main-text)',
        textAlign: 'center',
      }}>
        Chart Library Showcase
      </h1>

      <div style={{ marginBottom: '60px' }}>
        <PieChartDemo />
      </div>

      <div style={{ marginBottom: '60px' }}>
        <BarChartDemo />
      </div>

      <div style={{ marginBottom: '60px' }}>
        <LineChartDemo />
      </div>

      <div style={{ marginBottom: '60px' }}>
        <StreamChartDemo />
      </div>
    </div>
  );
};

const meta: Meta<typeof AllChartsDemoComponent> = {
  title: 'Charts/All Demos',
  component: AllChartsDemoComponent,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A comprehensive showcase of all available chart components with various configurations and styling options.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const AllCharts: Story = {};

// Individual chart demo stories
export const PieCharts: Story = {
  render: () => <PieChartDemo />,
  parameters: {
    docs: {
      description: {
        story: 'Pie chart demos showing different configurations, palettes, and data presentations.',
      },
    },
  },
};

export const BarCharts: Story = {
  render: () => <BarChartDemo />,
  parameters: {
    docs: {
      description: {
        story: 'Bar chart demos with grouped and single series data, various orientations and styling.',
      },
    },
  },
};

export const LineCharts: Story = {
  render: () => <LineChartDemo />,
  parameters: {
    docs: {
      description: {
        story: 'Line chart demos including traffic data visualization, multi-series charts, and different curve styles.',
      },
    },
  },
};

export const StreamCharts: Story = {
  render: () => <StreamChartDemo />,
  parameters: {
    docs: {
      description: {
        story: 'Stream chart demos with multiple data layers, different offset types, and styling variations.',
      },
    },
  },
};
