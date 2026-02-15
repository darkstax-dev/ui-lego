import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { FeedManager } from './FeedManager';
import type { FeedManagerProps } from './FeedManager';

const meta: Meta<typeof FeedManager> = {
  title: 'Geospatial/FeedManager',
  component: FeedManager,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Feed Manager component for managing data feeds, camera feeds, and object detection alerts in geospatial command center applications. Supports light and dark themes.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    activeTab: {
      control: 'select',
      options: ['emergency', 'feeds', 'activity'],
      description: 'Active tab selection',
    },
    distance: {
      control: { type: 'range', min: 0, max: 1000, step: 10 },
      description: 'Distance in miles for feed radius',
    },
    onTabChange: { action: 'tab changed' },
    onDistanceChange: { action: 'distance changed' },
    onFeedToggle: { action: 'feed toggled' },
    onCameraChange: { action: 'camera changed' },
    onSubmit: { action: 'submitted' },
    onClose: { action: 'closed' },
  },
};

export default meta;
type Story = StoryObj<typeof FeedManager>;

// Sample data for stories
const sampleDetectedItems = [
  {
    id: '1',
    confidence: 97,
    name: 'Baseball Bat',
    status: 'unauthorized' as const,
    selected: true,
  },
  {
    id: '2',
    confidence: 64,
    name: 'Lead Pipe',
    status: 'unauthorized' as const,
    selected: false,
  },
  {
    id: '3',
    confidence: 64,
    name: 'Club',
    status: 'illegal' as const,
    selected: false,
  },
  {
    id: '4',
    confidence: 4,
    name: 'Flame',
    status: 'illegal' as const,
    selected: false,
  },
];

const sampleCameraFeeds = [
  {
    id: 'east_coast',
    location: 'East_Coast',
    imageUrl: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400&h=200&fit=crop',
  },
  {
    id: 'west_coast',
    location: 'West_Coast',
    imageUrl: 'https://images.unsplash.com/photo-1581094794329-c8112f85a58f?w=400&h=200&fit=crop',
  },
  {
    id: 'north_side',
    location: 'North_Side',
    imageUrl: 'https://images.unsplash.com/photo-1590735213920-68192a487bc3?w=400&h=200&fit=crop',
  },
];

const sampleFeedData = {
  damagingWinds: 'High',
  hailPossible: 'Yes',
  hurricane: 'Category 2',
  flooding: 'Moderate',
  locationAffected: 'Downtown District',
  trailLastUpdate: '2 hours ago',
  estPersons: '1,500',
  stateOfEmergency: 'Active',
};

/**
 * Default Feed Manager view with all features enabled.
 * Shows the complete component with tabs, contributing feeds,
 * camera feeds, and object detection.
 */
export const Default: Story = {
  args: {
    activeTab: 'feeds',
    distance: 400,
    selectedCamera: 'east_coast',
    cameraFeeds: sampleCameraFeeds,
    detectedItems: sampleDetectedItems,
    impactDetection: 'Flood warning',
    detectionTitle: 'Weapon',
    primaryDetection: {
      name: 'Pipe',
      confidence: 97,
      location: 'Eastside',
      model: '765',
    },
    alertOfficers: '',
  },
};

/**
 * Feed Manager with complete feed data including weather
 * and emergency information.
 */
export const WithFeedData: Story = {
  args: {
    activeTab: 'feeds',
    distance: 400,
    feedData: sampleFeedData,
    selectedCamera: 'east_coast',
    cameraFeeds: sampleCameraFeeds,
    detectedItems: sampleDetectedItems,
    impactDetection: 'Severe storm alert',
    detectionTitle: 'Weapon',
    primaryDetection: {
      name: 'Pipe',
      confidence: 97,
      location: 'Eastside',
      model: '765',
    },
  },
};

/**
 * Emergency tab view focused on critical alerts
 * and immediate response data.
 */
export const EmergencyTab: Story = {
  args: {
    activeTab: 'emergency',
    distance: 200,
    feedData: {
      flooding: 'Critical',
      locationAffected: 'River District',
      estPersons: '3,000',
      stateOfEmergency: 'Active',
    },
    impactDetection: 'Severe flooding',
    detectedItems: [],
  },
};

/**
 * Activity tab view showing recent feed activity
 * and detection history.
 */
export const ActivityTab: Story = {
  args: {
    activeTab: 'activity',
    distance: 500,
    selectedCamera: 'west_coast',
    cameraFeeds: sampleCameraFeeds,
    detectedItems: sampleDetectedItems,
  },
};

/**
 * Minimal setup with only basic features enabled.
 * Useful for simple monitoring scenarios.
 */
export const Minimal: Story = {
  args: {
    activeTab: 'feeds',
    distance: 400,
    contributingFeeds: [
      { id: 'nwas', label: 'NWAS', enabled: true },
    ],
  },
};

/**
 * Object detection focused view with multiple
 * detected items and varying threat levels.
 */
export const ObjectDetectionFocus: Story = {
  args: {
    activeTab: 'feeds',
    distance: 400,
    selectedCamera: 'east_coast',
    cameraFeeds: sampleCameraFeeds,
    impactDetection: 'Weapon detected',
    detectionTitle: 'Multiple Weapons',
    detectedItems: [
      {
        id: '1',
        confidence: 97,
        name: 'Baseball Bat',
        status: 'unauthorized',
        selected: true,
      },
      {
        id: '2',
        confidence: 89,
        name: 'Knife',
        status: 'illegal',
        selected: true,
      },
      {
        id: '3',
        confidence: 76,
        name: 'Pipe',
        status: 'unauthorized',
        selected: false,
      },
      {
        id: '4',
        confidence: 68,
        name: 'Chain',
        status: 'unauthorized',
        selected: false,
      },
      {
        id: '5',
        confidence: 45,
        name: 'Unknown Object',
        status: 'authorized',
        selected: false,
      },
    ],
    primaryDetection: {
      name: 'Baseball Bat',
      confidence: 97,
      location: 'Main Entrance',
      model: '892',
    },
  },
};

/**
 * Camera feed monitoring view with multiple locations
 * and impact detection alerts.
 */
export const CameraFeedMonitoring: Story = {
  args: {
    activeTab: 'feeds',
    distance: 600,
    selectedCamera: 'north_side',
    cameraFeeds: [
      {
        id: 'entrance_a',
        location: 'Entrance_A',
        imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=200&fit=crop',
      },
      {
        id: 'entrance_b',
        location: 'Entrance_B',
        imageUrl: 'https://images.unsplash.com/photo-1581094794329-c8112f85a58f?w=400&h=200&fit=crop',
      },
      {
        id: 'parking_lot',
        location: 'Parking_Lot',
        imageUrl: 'https://images.unsplash.com/photo-1590735213920-68192a487bc3?w=400&h=200&fit=crop',
      },
      {
        id: 'perimeter',
        location: 'Perimeter',
        imageUrl: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400&h=200&fit=crop',
      },
    ],
    impactDetection: 'Unauthorized access',
    contributingSources: [
      { id: 'nwas', name: 'NWAS' },
      { id: 'neh', name: 'NEH' },
      { id: 'faa', name: 'FAA' },
      { id: 'local_pd', name: 'Local PD' },
    ],
  },
};

/**
 * Weather emergency scenario with severe conditions
 * and multiple data sources.
 */
export const WeatherEmergency: Story = {
  args: {
    activeTab: 'emergency',
    distance: 800,
    feedData: {
      damagingWinds: 'Extreme',
      hailPossible: 'Confirmed',
      hurricane: 'Category 4',
      flooding: 'Severe',
      locationAffected: 'Coastal Region',
      trailLastUpdate: '15 min ago',
      estPersons: '12,000',
      stateOfEmergency: 'Declared',
    },
    contributingFeeds: [
      { id: 'nwas', label: 'NWAS', enabled: true },
      { id: 'emergency', label: 'Emergency', enabled: true },
      { id: 'highway', label: 'Highway Patrol', enabled: true },
      { id: 'social', label: 'Social feed', enabled: true },
    ],
    contributingSources: [
      { id: 'nwas', name: 'NWAS' },
      { id: 'neh', name: 'NEH' },
      { id: 'faa', name: 'FAA' },
      { id: 'noaa', name: 'NOAA' },
      { id: 'fema', name: 'FEMA' },
    ],
    impactDetection: 'Hurricane warning',
    alertOfficers: 'All emergency responders on high alert. Evacuation in progress for coastal zones.',
  },
};

/**
 * Interactive demo showing all callback functions.
 * Open the Actions panel to see events as you interact.
 */
export const InteractiveDemo: Story = {
  args: {
    activeTab: 'feeds',
    distance: 400,
    selectedCamera: 'east_coast',
    cameraFeeds: sampleCameraFeeds,
    detectedItems: sampleDetectedItems,
    feedData: sampleFeedData,
    impactDetection: 'Multiple detections',
    detectionTitle: 'Weapon',
    primaryDetection: {
      name: 'Pipe',
      confidence: 97,
      location: 'Eastside',
      model: '765',
    },
    contributingSources: [
      { id: 'nwas', name: 'NWAS' },
      { id: 'neh', name: 'NEH' },
      { id: 'faa', name: 'FAA' },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          'Interact with this story to see all available callbacks in the Actions panel. Try changing tabs, adjusting distance, toggling feeds, and submitting data.',
      },
    },
  },
};

/**
 * Dark theme variant of the Feed Manager.
 * Demonstrates the component in dark mode styling.
 */
export const DarkTheme: Story = {
  args: {
    activeTab: 'feeds',
    distance: 400,
    selectedCamera: 'east_coast',
    cameraFeeds: sampleCameraFeeds,
    detectedItems: sampleDetectedItems,
    feedData: sampleFeedData,
    impactDetection: 'Flood warning',
    detectionTitle: 'Weapon',
    primaryDetection: {
      name: 'Pipe',
      confidence: 97,
      location: 'Eastside',
      model: '765',
    },
  },
  decorators: [
    (Story) => (
      <div data-theme="dark" style={{ background: '#00112B', padding: '20px', minHeight: '100vh' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

/**
 * Component with close button enabled.
 * Demonstrates the dismissible variant.
 */
export const WithCloseButton: Story = {
  args: {
    activeTab: 'feeds',
    distance: 400,
    selectedCamera: 'east_coast',
    cameraFeeds: sampleCameraFeeds,
    detectedItems: sampleDetectedItems,
    impactDetection: 'Alert detected',
    detectionTitle: 'Weapon',
    primaryDetection: {
      name: 'Pipe',
      confidence: 97,
      location: 'Eastside',
      model: '765',
    },
    onClose: () => console.log('Close clicked'),
  },
};

/**
 * Setup instructions for implementing Feed Manager
 * in your geospatial application.
 */
export const SetupInstructions: Story = {
  render: () => (
    <div style={{ padding: '20px', maxWidth: '800px', fontFamily: 'Macan, sans-serif' }}>
      <h1 style={{ fontSize: '32px', marginBottom: '16px' }}>Feed Manager Setup</h1>
      
      <section style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '24px', marginBottom: '12px' }}>Installation</h2>
        <p style={{ marginBottom: '8px' }}>Import the FeedManager component:</p>
        <pre style={{ background: '#f5f5f5', padding: '12px', borderRadius: '4px', overflow: 'auto' }}>
          {`import { FeedManager } from './components/geospatial/FeedManager';`}
        </pre>
      </section>

      <section style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '24px', marginBottom: '12px' }}>Basic Usage</h2>
        <pre style={{ background: '#f5f5f5', padding: '12px', borderRadius: '4px', overflow: 'auto' }}>
{`<FeedManager
  activeTab="feeds"
  distance={400}
  contributingFeeds={[
    { id: 'nwas', label: 'NWAS', enabled: true },
  ]}
  onTabChange={(tab) => console.log('Tab changed:', tab)}
  onSubmit={(data) => console.log('Submitted:', data)}
/>`}
        </pre>
      </section>

      <section style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '24px', marginBottom: '12px' }}>Features</h2>
        <ul style={{ lineHeight: '1.8' }}>
          <li><strong>Multiple Tabs:</strong> Emergency, Feeds, and Activity views</li>
          <li><strong>Distance Slider:</strong> Adjustable feed radius from 0-1000 miles</li>
          <li><strong>Contributing Feeds:</strong> Toggle multiple data sources</li>
          <li><strong>Camera Feeds:</strong> Monitor multiple camera locations</li>
          <li><strong>Object Detection:</strong> View and select detected items with confidence scores</li>
          <li><strong>Threat Assessment:</strong> Visual indicators for unauthorized and illegal items</li>
          <li><strong>Impact Detection:</strong> Real-time alert notifications</li>
          <li><strong>Situational Awareness:</strong> Text area for alert officers</li>
          <li><strong>Theme Support:</strong> Automatic light/dark theme switching</li>
        </ul>
      </section>

      <section style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '24px', marginBottom: '12px' }}>Integration Example</h2>
        <pre style={{ background: '#f5f5f5', padding: '12px', borderRadius: '4px', overflow: 'auto' }}>
{`// Complete example with all features
const MyApp = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  
  const handleSubmit = (data) => {
    // Send data to backend
    fetch('/api/submit-alert', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  };
  
  return (
    <FeedManager
      activeTab="feeds"
      distance={400}
      cameraFeeds={cameraData}
      detectedItems={detections}
      onSubmit={handleSubmit}
    />
  );
};`}
        </pre>
      </section>

      <section style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '24px', marginBottom: '12px' }}>Props Reference</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #ddd' }}>
              <th style={{ textAlign: 'left', padding: '8px' }}>Prop</th>
              <th style={{ textAlign: 'left', padding: '8px' }}>Type</th>
              <th style={{ textAlign: 'left', padding: '8px' }}>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #ddd' }}>
              <td style={{ padding: '8px' }}>activeTab</td>
              <td style={{ padding: '8px' }}>string</td>
              <td style={{ padding: '8px' }}>Active tab: 'emergency' | 'feeds' | 'activity'</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #ddd' }}>
              <td style={{ padding: '8px' }}>distance</td>
              <td style={{ padding: '8px' }}>number</td>
              <td style={{ padding: '8px' }}>Feed radius in miles (0-1000)</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #ddd' }}>
              <td style={{ padding: '8px' }}>detectedItems</td>
              <td style={{ padding: '8px' }}>array</td>
              <td style={{ padding: '8px' }}>List of detected objects with confidence scores</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #ddd' }}>
              <td style={{ padding: '8px' }}>onSubmit</td>
              <td style={{ padding: '8px' }}>function</td>
              <td style={{ padding: '8px' }}>Callback when submit button is clicked</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Complete setup guide and integration instructions for the Feed Manager component.',
      },
    },
  },
};
