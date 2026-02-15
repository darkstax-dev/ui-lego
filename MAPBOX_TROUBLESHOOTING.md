# Mapbox Map Rendering Troubleshooting Guide

## Current Status

The Storybook issues have been fixed:
- ✅ Installed missing dependencies (lucide-react, clsx)
- ✅ Updated Storybook config to remove conflicting addons
- ✅ Added error handling to MapView component
- ✅ Added setup instruction stories

## Why Maps Aren't Loading

### Root Causes

1. **Missing Mapbox Token** (Most Common)
   - Mapbox requires an access token to authenticate requests
   - Without a valid token, maps cannot render
   - You'll see: "Mapbox Token Required" message in the UI

2. **Invalid Token Format**
   - Token must start with `pk.` (public token)
   - Token must be valid (not expired or revoked)
   - You'll see error in browser console

3. **Token Not Set in Environment**
   - Storybook reads token from `VITE_MAPBOX_TOKEN` environment variable
   - Without this, placeholder token is used (which is invalid)

## Quick Fix Steps

### Step 1: Get a Mapbox Token

```bash
# Option A: Visit website
https://account.mapbox.com/access-tokens/

# Option B: Create account and token
1. Click "Sign up"
2. Fill in credentials
3. Go to "Tokens" page
4. Click "Create a token"
5. Name it (e.g., "Storybook Dev")
6. Click "Create token"
7. Copy the token (starts with pk.eyJ...)
```

### Step 2: Create Environment File

```bash
# Create this file in the .storybook directory
# DO NOT COMMIT THIS FILE - it contains your token

.storybook/.env.local:
```
VITE_MAPBOX_TOKEN=pk.eyJ1IjoieW91cnVzZXJuYW1lIiwiYSI6ImNsZXhhbXBsZSJ9.example
```
```

### Step 3: Restart Storybook

```bash
# Stop current Storybook (Ctrl+C)
# Then restart:
npm run storybook
```

### Step 4: Verify Setup

1. Open Storybook (http://localhost:6006)
2. Navigate to: Components → Geospatial → MapView
3. You should see the map load with 3D buildings
4. If you see "Mapbox Token Required", token isn't being loaded

## Verification Checklist

Use this checklist to diagnose issues:

### Is Storybook Running?
```bash
# Check if Storybook is running
# Visit http://localhost:6006 in your browser
# You should see Storybook interface
```

### Is Token File Created?
```bash
# Check if .env.local exists
ls -la .storybook/.env.local

# Should output:
# -rw-r--r-- ... .env.local
```

### Is Token in Environment?
```bash
# In browser console (F12), check:
console.log(import.meta.env.VITE_MAPBOX_TOKEN)

# Should output your token (pk.eyJ...)
# NOT undefined or 'pk.example'
```

### Is Token Valid Format?
```bash
# Token must:
✓ Start with "pk." (public key)
✓ Be at least 20 characters long
✓ Not contain spaces
✓ Not be the placeholder token

# Invalid examples:
✗ "pk.example"
✗ "sk.eyJ..." (secret key)
✗ undefined
✗ empty string
```

## Debugging Steps

### Step 1: Check Browser Console

```bash
# Open DevTools (F12)
# Go to Console tab
# Look for errors like:
- "Mapbox token not found"
- "Invalid token"
- "Unauthorized access"
- "CORS error"
```

### Step 2: Check Environment Variable

```javascript
// In browser console, paste:
console.log('Token:', import.meta.env.VITE_MAPBOX_TOKEN)
console.log('Is valid:', import.meta.env.VITE_MAPBOX_TOKEN?.startsWith('pk.'))
console.log('Length:', import.meta.env.VITE_MAPBOX_TOKEN?.length)
```

### Step 3: Check Mapbox Status

```bash
# Verify Mapbox service is operational:
https://status.mapbox.com/

# If degraded/down, maps won't load (nothing to do until fixed)
```

### Step 4: Check Network Requests

```bash
# In DevTools Network tab:
# Look for requests to:
- api.mapbox.com (should be 200/201)
- tiles.mapbox.com (should be 200)
- styles.mapbox.com (should be 200)

# If seeing 401/403:
- Token is invalid or expired
- Token doesn't have required permissions

# If seeing CORS errors:
- Mapbox API might be down
- Or your network is blocking it
```

## Common Issues & Solutions

### Issue: "Mapbox Token Required" Message

**Symptoms:**
- See error message in map container
- No map displayed

**Causes:**
1. `.env.local` file not created
2. `.env.local` has wrong token
3. Storybook not restarted after creating `.env.local`

**Solutions:**
```bash
# 1. Create the file
echo 'VITE_MAPBOX_TOKEN=pk.your_token_here' > .storybook/.env.local

# 2. Restart Storybook
# Stop (Ctrl+C) and run:
npm run storybook

# 3. Verify in browser console
import.meta.env.VITE_MAPBOX_TOKEN
# Should output: pk.eyJ...
```

### Issue: "Invalid Token" Error in Console

**Symptoms:**
- Console shows: "Invalid Mapbox token"
- Maps don't render

**Causes:**
1. Token is placeholder (pk.example)
2. Token is expired/revoked
3. Token format is wrong

**Solutions:**
```bash
# 1. Get new token from https://account.mapbox.com/access-tokens/
# 2. Update .storybook/.env.local
# 3. Verify token format (must start with pk.eyJ...)
# 4. Restart Storybook
```

### Issue: CORS Error in Console

**Symptoms:**
- Console shows: "CORS policy..."
- Network tab shows 403 responses

**Causes:**
1. Mapbox API rate limit exceeded
2. Token doesn't have required scopes
3. Mapbox service issue

**Solutions:**
```bash
# 1. Check status: https://status.mapbox.com/
# 2. Verify token has maps:read scope
#    - Go to account.mapbox.com/access-tokens/
#    - Click your token
#    - Ensure "Maps" is checked
# 3. Wait 5 minutes and refresh
```

### Issue: Map Loads but No Tiles Visible

**Symptoms:**
- Map container visible
- Gray/blank tiles showing
- Zoom/pan controls work

**Causes:**
1. Zoom level too low for data
2. Map center is ocean/sea
3. Network connectivity issue

**Solutions:**
```bash
# Try different zoom levels:
initialZoom={14}  // Try 14+

# Try different location:
initialCenter={{ longitude: 0, latitude: 0 }}

# Check network in DevTools - should see tile requests
```

### Issue: 3D Buildings Not Showing

**Symptoms:**
- Map loads with tiles
- No 3D buildings rendered
- No errors in console

**Causes:**
1. Zoom level < 14 (buildings only show at higher zoom)
2. `enable3DBuildings={false}`
3. Map style doesn't support buildings

**Solutions:**
```tsx
// Ensure minimum zoom level
initialZoom={15}  // Must be >= 14

// Ensure 3D buildings enabled
enable3DBuildings={true}

// Use supported map style
mapStyle="dark"  // or 'light', 'streets'
// Note: 'satellite' may not show building outlines clearly
```

## Environment Setup Reference

### File Locations

```
project-root/
├── .storybook/
│   ├── .env.example         ← Template (committed)
│   ├── .env.local           ← Your token (NOT committed)
│   ├── main.ts
│   └── preview.ts
│
├── src/
│   └── components/
│       └── geospatial/
│           ├── MapView.tsx
│           ├── CommandCenterMap.tsx
│           └── *.stories.tsx
│
├── .env.example             ← Root level template
└── .gitignore               ← .env.local is ignored
```

### Git Safety

The `.env.local` file is protected by `.gitignore`:
```bash
# Check .gitignore includes:
*.local
.env
.env.local

# Verify your token won't be committed:
git status
# Should NOT show .storybook/.env.local
```

## Advanced Troubleshooting

### Access Mapbox Directly

```bash
# Test token with Mapbox API:
curl "https://api.mapbox.com/styles/v1/mapbox/streets-v12?access_token=YOUR_TOKEN"

# Should return 200 with style JSON
# Should NOT return:
# - 401 (Unauthorized)
# - 403 (Forbidden)
# - 404 (Not found)
```

### Check Mapbox Credentials

```bash
# Visit Mapbox account
https://account.mapbox.com/access-tokens/

# Verify:
✓ Token is listed (not deleted)
✓ Token is active (toggle is ON)
✓ Token hasn't expired
✓ Token has "Maps" scope enabled
```

### Monitor Network Performance

```bash
# In DevTools Network tab:
# 1. Filter by "mapbox"
# 2. Reload map stories
# 3. Check all requests are 200 OK
# 4. If seeing 401/403:
#    - Token is invalid
#    - Need new token
```

## Working Examples

### Minimal Working Example

```tsx
import { MapView } from './components/geospatial';

function App() {
  const token = import.meta.env.VITE_MAPBOX_TOKEN;
  
  if (!token) {
    return <div>Token not configured</div>;
  }

  return (
    <MapView
      mapboxAccessToken={token}
      initialCenter={{ longitude: -74.006, latitude: 40.7128 }}
      initialZoom={15}
      mapStyle="dark"
      enable3DBuildings={true}
      height="100vh"
    />
  );
}
```

### With Error Handling

```tsx
import { MapView } from './components/geospatial';
import { useState } from 'react';

function App() {
  const token = import.meta.env.VITE_MAPBOX_TOKEN;
  const [mapLoaded, setMapLoaded] = useState(false);

  return (
    <div>
      {mapLoaded && <div>Map loaded!</div>}
      <MapView
        mapboxAccessToken={token}
        initialCenter={{ longitude: -74.006, latitude: 40.7128 }}
        initialZoom={15}
        onLoad={() => setMapLoaded(true)}
      />
    </div>
  );
}
```

## Support & Resources

### Mapbox Documentation
- Main: https://docs.mapbox.com/
- Access Tokens: https://docs.mapbox.com/accounts/guides/tokens/
- GL JS: https://docs.mapbox.com/mapbox-gl-js/
- Pricing: https://www.mapbox.com/pricing/

### React Map GL
- Docs: https://visgl.github.io/react-map-gl/
- GitHub: https://github.com/visgl/react-map-gl

### Getting Help
1. Check browser console for specific errors
2. Review this troubleshooting guide
3. Check Mapbox status page
4. Review Mapbox documentation
5. Test token directly with Mapbox API
