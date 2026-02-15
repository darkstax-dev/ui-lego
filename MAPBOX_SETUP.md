# Mapbox Token Setup for Geospatial Components

## Quick Start

The geospatial components (MapView, CommandCenterMap, EventDetectionCard) require a Mapbox access token to render maps.

### Step 1: Get a Mapbox Token

1. Visit https://account.mapbox.com/
2. Create a free account (or sign in if you have one)
3. Navigate to **Tokens** in the left sidebar
4. Click **Create a token**
5. Configure:
   - Token name: something like "Storybook Dev" or "My App"
   - Scopes: Keep default (Public token is fine)
   - Resource restrictions: Optional (leave as default)
6. Click **Create token**
7. **Copy the token** (it starts with `pk.eyJ...`)

### Step 2: Setup for Storybook

**Option A: Using Environment File (Recommended)**

1. Create `.storybook/.env.local` file (don't commit this):
   ```bash
   VITE_MAPBOX_TOKEN=pk.your_token_here
   ```

2. The token will be automatically available in Storybook

**Option B: Direct Usage in Code**

```tsx
import { MapView } from './components/geospatial';

<MapView
  mapboxAccessToken="pk.your_token_here"
  initialCenter={{ longitude: -74.006, latitude: 40.7128 }}
  initialZoom={16}
/>
```

### Step 3: Verify Setup

1. Start Storybook:
   ```bash
   npm run storybook
   ```

2. Navigate to:
   - Components → Geospatial → MapView
   - Components → Geospatial → CommandCenterMap

3. The maps should render and display tiles correctly

## Troubleshooting

### "Error: Mapbox GL requires a valid access token"

**Cause:** Token is missing or invalid

**Solution:**
1. Verify your token is correct (starts with `pk.`)
2. Check that `.storybook/.env.local` exists
3. Restart Storybook after creating `.env.local`
4. Check browser console for specific error

### "Cannot read property 'style' of undefined"

**Cause:** Map container isn't sized properly

**Solution:**
- Ensure the MapView has explicit height/width
- Check that parent container has dimensions

### Token appears but maps don't show

**Cause:** Token doesn't have necessary permissions

**Solution:**
1. Go to Mapbox tokens page
2. Click on your token
3. Verify it has "Maps" permission enabled

## File Locations

```
project-root/
├── .storybook/
│   ├── .env.example          # Template (commit this)
│   └── .env.local            # Your token (gitignored - don't commit)
│
├── src/
│   └── components/
│       └── geospatial/
│           ├── MapView.stories.tsx
│           ├── CommandCenterMap.stories.tsx
│           └── EventDetectionCard.stories.tsx
│
└── .env.example              # Root level example
```

## Security Notes

- **Never commit `.env.local`** - these files are ignored by git
- **Never expose tokens in public repos** - use environment variables instead
- Public tokens are safe for web apps (they have usage limits)
- For production, use Mapbox GL account-based authentication

## For Production

In production applications:

1. Use a backend to serve maps with private tokens
2. Or use Mapbox account-based authentication
3. Consider using Mapbox Map IDs for style management

## API Reference

### MapView Component

```tsx
interface MapViewProps {
  mapboxAccessToken: string;  // REQUIRED
  initialCenter?: { longitude: number; latitude: number };
  initialZoom?: number;
  initialPitch?: number;
  initialBearing?: number;
  mapStyle?: 'streets' | 'satellite' | 'dark' | 'light';
  enable3DBuildings?: boolean;
  height?: string | number;
  width?: string | number;
}
```

### CommandCenterMap Component

```tsx
interface CommandCenterMapProps {
  mapboxAccessToken: string;  // REQUIRED
  initialCenter?: { longitude: number; latitude: number };
  initialZoom?: number;
  mapStyle?: 'streets' | 'satellite' | 'dark' | 'light';
  enable3DBuildings?: boolean;
  events?: EventMarker[];
  activeEventId?: string;
  onEventSelect?: (eventId: string) => void;
  onEventDismiss?: (eventId: string) => void;
  onGenerateCOA?: (eventId: string, items: DetectedItem[]) => void;
  showTimeline?: boolean;
  height?: string | number;
  width?: string | number;
}
```

## More Info

- Mapbox Documentation: https://docs.mapbox.com/
- Mapbox GL JS: https://docs.mapbox.com/mapbox-gl-js/
- Pricing: https://www.mapbox.com/pricing/ (free tier available)
