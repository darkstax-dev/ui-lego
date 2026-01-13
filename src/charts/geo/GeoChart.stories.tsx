import type { Meta, StoryObj } from '@storybook/react-vite';
import { GeoChart, GeoFeature } from './GeoChart';
import { useState, useEffect } from 'react';

const meta: Meta<typeof GeoChart> = {
  title: 'Charts/GeoChart',
  component: GeoChart,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A geographic map chart component. Note: This component requires GeoJSON data to render properly. The examples use world map data from Natural Earth.',
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: '900px', height: '500px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof GeoChart>;

// Simplified world features for demonstration
// In production, you would load actual GeoJSON data from a file or API
const sampleFeatures: GeoFeature[] = [
  {
    type: 'Feature',
    properties: { name: 'North America' },
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [-170, 70],
          [-170, 15],
          [-50, 15],
          [-50, 70],
          [-170, 70],
        ],
      ],
    },
  },
  {
    type: 'Feature',
    properties: { name: 'South America' },
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [-80, 10],
          [-80, -55],
          [-35, -55],
          [-35, 10],
          [-80, 10],
        ],
      ],
    },
  },
  {
    type: 'Feature',
    properties: { name: 'Europe' },
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [-10, 70],
          [-10, 35],
          [40, 35],
          [40, 70],
          [-10, 70],
        ],
      ],
    },
  },
  {
    type: 'Feature',
    properties: { name: 'Africa' },
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [-20, 35],
          [-20, -35],
          [50, -35],
          [50, 35],
          [-20, 35],
        ],
      ],
    },
  },
  {
    type: 'Feature',
    properties: { name: 'Asia' },
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [40, 75],
          [40, 10],
          [150, 10],
          [150, 75],
          [40, 75],
        ],
      ],
    },
  },
  {
    type: 'Feature',
    properties: { name: 'Australia' },
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [110, -10],
          [110, -45],
          [155, -45],
          [155, -10],
          [110, -10],
        ],
      ],
    },
  },
];

export const Default: Story = {
  args: {
    features: sampleFeatures,
    height: 400,
    width: 800,
  },
};

export const WithGraticule: Story = {
  args: {
    features: sampleFeatures,
    enableGraticule: true,
    height: 400,
    width: 800,
  },
};

export const EqualEarthProjection: Story = {
  args: {
    features: sampleFeatures,
    projectionType: 'equalEarth',
    height: 400,
    width: 800,
  },
};

export const Orthographic: Story = {
  args: {
    features: sampleFeatures,
    projectionType: 'orthographic',
    projectionScale: 200,
    height: 400,
    width: 600,
  },
};

export const Interactive: Story = {
  args: {
    features: sampleFeatures,
    height: 400,
    width: 800,
    onFeatureClick: (feature: GeoFeature) => {
      console.log('Feature clicked:', feature);
      alert(`Clicked: ${feature.properties.name}`);
    },
  },
};
