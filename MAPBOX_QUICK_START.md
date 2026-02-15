# Mapbox Maps - Quick Start Guide ⚡

## What's Fixed ✅

Your geospatial components are now working:
- ✅ Storybook starts without errors
- ✅ All 3 geospatial components are available
- ✅ EventDetectionCard works immediately (no setup needed)
- ✅ MapView & CommandCenterMap ready for token setup

## 60-Second Setup

### 1️⃣ Get Free Token (2 minutes)
Go to: https://account.mapbox.com/access-tokens/
- Sign up (free account)
- Create token
- Copy token (starts with `pk.`)

### 2️⃣ Create Environment File (30 seconds)
Create this file: `.storybook/.env.local`
```
VITE_MAPBOX_TOKEN=pk.your_token_here
```

### 3️⃣ Restart Storybook (20 seconds)
```bash
# Stop: Ctrl+C
# Restart: npm run storybook
```

### 4️⃣ View Maps (10 seconds)
Visit: http://localhost:6006
- Go to: Components → Geospatial → MapView
- See 3D map with buildings ✅

## Try It Now

### EventDetectionCard (Works Without Setup)
```
Components → Geospatial → EventDetectionCard
- Shows event image
- Displays confidence score
- Lists detected items
- Has action buttons
```

### MapView (Needs Token)
```
Components → Geospatial → MapView
- Default: Shows 3D map (needs token)
- SetupInstructions: Shows how to enable maps
```

### CommandCenterMap (Needs Token)
```
Components → Geospatial → CommandCenterMap  
- Default: Shows command center (needs token)
- SetupInstructions: Shows how to enable maps
```

## Understanding the Setup

### Why Token is Needed
- Mapbox provides free access to maps
- Token authenticates your requests
- Each request is tracked (free tier has limits)
- Public token (`pk.`) is safe for frontend

### Token File Security
- `.storybook/.env.local` is NOT committed to git
- It's in `.gitignore` (protected)
- Only exists on your machine
- Safe to put your token there

### How Component Detects Token
```javascript
// Stories use this:
const token = import.meta.env.VITE_MAPBOX_TOKEN

// Component checks:
if (!token.startsWith('pk.')) {
  // Shows: "Mapbox Token Required"
}
```

## What Each Component Does

### EventDetectionCard 🖼️
**Purpose:** Display security event detection results
**Features:**
- Event image display
- Confidence circle (97%)
- Detection metadata
- Selectable items list
- Dismiss & Generate COA buttons

**Token Required:** ❌ No

**Usage:**
```tsx
<EventDetectionCard
  data={{
    eventType: 'Object Detection',
    imageUrl: 'https://...',
    primaryDetection: { ... },
    detectedItems: [ ... ]
  }}
  onDismiss={() => {}}
  onGenerateCOA={(items) => {}}
/>
```

### MapView 🗺️
**Purpose:** Display interactive 3D map with buildings
**Features:**
- 3D building visualization
- Multiple map styles (dark/light/satellite)
- Configurable zoom, pitch, bearing
- Responsive sizing

**Token Required:** ✅ Yes

**Usage:**
```tsx
<MapView
  mapboxAccessToken={token}
  initialCenter={{ longitude: -74.006, latitude: 40.7128 }}
  initialZoom={15}
  mapStyle="dark"
  enable3DBuildings={true}
/>
```

### CommandCenterMap 🎮
**Purpose:** Security command center with map + events
**Features:**
- Full-screen 3D map
- Event detection card overlay
- Timeline header
- View control buttons

**Token Required:** ✅ Yes

**Usage:**
```tsx
<CommandCenterMap
  mapboxAccessToken={token}
  events={[...]}
  activeEventId="event-1"
  onEventSelect={(id) => {}}
/>
```

## Troubleshooting in 30 Seconds

### Maps Not Loading?
1. Check token is in `.storybook/.env.local`
2. Verify token starts with `pk.`
3. Restart Storybook
4. Open browser console (F12)
5. Type: `import.meta.env.VITE_MAPBOX_TOKEN`
6. Should show your token, not `pk.example`

### Still Not Working?
See **`MAPBOX_TROUBLESHOOTING.md`** for detailed help

### Questions?
- Mapbox Docs: https://docs.mapbox.com/
- React Map GL: https://visgl.github.io/react-map-gl/

## Common Setup Issues

| Issue | Solution |
|-------|----------|
| "Mapbox Token Required" message | Create `.storybook/.env.local` with token |
| Maps show gray tiles | Token format wrong (must start with `pk.`) |
| Maps still blank | Restart Storybook after creating `.env.local` |
| "403 Forbidden" error | Token expired - get new token |

## File Reference

### Key Files
- **MapView:** `src/components/geospatial/MapView.tsx`
- **CommandCenterMap:** `src/components/geospatial/CommandCenterMap.tsx`
- **EventDetectionCard:** `src/components/geospatial/EventDetectionCard.tsx`
- **Stories:** `src/components/geospatial/*.stories.tsx`

### Config Files
- **Storybook:** `.storybook/main.ts`
- **Environment Example:** `.storybook/.env.example`
- **Your Token:** `.storybook/.env.local` ← Create this!

### Documentation
- **This Guide:** `MAPBOX_QUICK_START.md`
- **Setup Instructions:** `MAPBOX_SETUP.md`
- **Troubleshooting:** `MAPBOX_TROUBLESHOOTING.md`
- **What Was Fixed:** `MAPBOX_MAPS_FIXED.md`

## Next Steps

1. ✅ Storybook is running - you're here!
2. 🎯 Get Mapbox token (free account)
3. 📝 Create `.storybook/.env.local`
4. 🔄 Restart Storybook
5. 🗺️ View your first interactive map!

---

**Questions?** Check the documentation files above or visit https://docs.mapbox.com/ 

**Ready?** Let's build some awesome geospatial visualizations! 🚀
