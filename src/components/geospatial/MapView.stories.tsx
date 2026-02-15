import type { Meta, StoryObj } from '@storybook/react-vite';
import { MapView } from './MapView';

// IMPORTANT: To use these stories, you must provide a valid Mapbox access token
// Steps:
// 1. Get a free token at: https://account.mapbox.com/access-tokens/
// 2. Create .storybook/.env.local with: VITE_MAPBOX_TOKEN=pk.your_token_here
// 3. Restart Storybook
// For now, using placeholder - maps won't render without a valid token
const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN ||
  'pk.eyJ1IjoiZXhhbXBsZSIsImEiOiJjbGV4YW1wbGUifQ.example';

const meta: Meta<typeof MapView> = {
  title: 'Components/Geospatial/MapView',
  component: MapView,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `Interactive 3D map component using Mapbox GL.

**Setup Instructions:**

1. Get a Mapbox access token at https://account.mapbox.com/access-tokens/
2. For Storybook, create \`.storybook/.env.local\`:
   \`\`\`bash
   VITE_MAPBOX_TOKEN=pk.your_token_here
   \`\`\`
3. Pass token to component:
   \`\`\`tsx
   <MapView mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN} />
   \`\`\`

**Features:**
- 3D building visualization at zoom 14+
- Multiple map styles (dark, light, satellite, streets)
- Configurable pitch, bearing, zoom, and center
- Responsive design
- Theme support`,
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: '100vw', height: '100vh' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof MapView>;

// New York City
// Setup Instructions Story
export const SetupInstructions: Story = {
  render: () => (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <h2>Mapbox Map Setup Required</h2>
      <p style={{ fontSize: '16px', marginBottom: '20px' }}>
        To view interactive maps in Storybook, follow these steps:
      </p>
      <ol style={{ textAlign: 'left', display: 'inline-block', fontSize: '14px' }}>
        <li style={{ marginBottom: '12px' }}>
          Visit <a href="https://account.mapbox.com/access-tokens/" target="_blank" rel="noreferrer">
            account.mapbox.com/access-tokens/
          </a>
        </li>
        <li style={{ marginBottom: '12px' }}>
          Create a free account and generate a token (starts with <code>pk.</code>)
        </li>
        <li style={{ marginBottom: '12px' }}>
          Create <code>.storybook/.env.local</code> file with:
          <pre style={{
            backgroundColor: '#f5f5f5',
            padding: '12px',
            borderRadius: '4px',
            margin: '8px 0',
            textAlign: 'left',
          }}>
            VITE_MAPBOX_TOKEN=pk.your_token_here
          </pre>
        </li>
        <li style={{ marginBottom: '12px' }}>
          Restart Storybook: <code>npm run storybook</code>
        </li>
      </ol>
      <p style={{ marginTop: '20px', opacity: 0.7 }}>
        After setup, all map stories below will display interactive 3D maps.
      </p>
    </div>
  ),
};

export const Default: Story = {
  args: {
    mapboxAccessToken: MAPBOX_TOKEN,
    initialCenter: { longitude: -74.006, latitude: 40.7128 },
    initialZoom: 15,
    mapStyle: 'dark',
    enable3DBuildings: true,
  },
};

// San Francisco with 3D buildings
export const SanFrancisco3D: Story = {
  args: {
    mapboxAccessToken: MAPBOX_TOKEN,
    initialCenter: { longitude: -122.4194, latitude: 37.7749 },
    initialZoom: 16,
    initialPitch: 60,
    initialBearing: 20,
    mapStyle: 'dark',
    enable3DBuildings: true,
  },
};

// London - Light theme
export const LondonLight: Story = {
  args: {
    mapboxAccessToken: MAPBOX_TOKEN,
    initialCenter: { longitude: -0.1276, latitude: 51.5074 },
    initialZoom: 15,
    initialPitch: 45,
    mapStyle: 'light',
    enable3DBuildings: true,
  },
};

// Tokyo - Satellite view
export const TokyoSatellite: Story = {
  args: {
    mapboxAccessToken: MAPBOX_TOKEN,
    initialCenter: { longitude: 139.6917, latitude: 35.6895 },
    initialZoom: 16,
    initialPitch: 60,
    mapStyle: 'satellite',
    enable3DBuildings: true,
  },
};

// Dubai - Top-down view
export const DubaiTopDown: Story = {
  args: {
    mapboxAccessToken: MAPBOX_TOKEN,
    initialCenter: { longitude: 55.2708, latitude: 25.2048 },
    initialZoom: 15,
    initialPitch: 0,
    mapStyle: 'streets',
    enable3DBuildings: false,
  },
};

// Singapore - High pitch 3D view
export const Singapore3D: Story = {
  args: {
    mapboxAccessToken: MAPBOX_TOKEN,
    initialCenter: { longitude: 103.8198, latitude: 1.3521 },
    initialZoom: 17,
    initialPitch: 70,
    initialBearing: 45,
    mapStyle: 'dark',
    enable3DBuildings: true,
  },
};

// Chicago - Streets style
export const ChicagoStreets: Story = {
  args: {
    mapboxAccessToken: MAPBOX_TOKEN,
    initialCenter: { longitude: -87.6298, latitude: 41.8781 },
    initialZoom: 15,
    initialPitch: 55,
    mapStyle: 'streets',
    enable3DBuildings: true,
  },
};

// Custom size
export const CustomSize: Story = {
  args: {
    mapboxAccessToken: MAPBOX_TOKEN,
    initialCenter: { longitude: -74.006, latitude: 40.7128 },
    initialZoom: 14,
    initialPitch: 45,
    mapStyle: 'dark',
    enable3DBuildings: true,
    height: 600,
    width: 800,
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '20px', background: '#f5f5f5' }}>
        <Story />
      </div>
    ),
  ],
};
