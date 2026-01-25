# Debug Steps for Flickering Issue

## Quick Verification Steps

### 1. Check Browser Console
Open http://localhost:5173 and check the browser console for:
- Look for: `"Force layout stabilized"` message
- Look for: `"Layout stabilized - stopping simulation"` message
- If you don't see these messages after 5 seconds, the stabilization is not working

### 2. Check Layout Lock Button
- Look for a Lock/Unlock button at the top-center of the screen
- If you don't see it, the UI component didn't load
- Try clicking it to manually lock the layout

### 3. Verify Changes Applied
The dev server needs to be restarted for TypeScript changes to take effect:

```bash
# Kill the current dev server
# Then restart:
cd /Users/ppatel/Documents/dstax-workspace/ui-elements/ui-lego/darkstax-topology
npm run dev
```

### 4. Check Network Tab
- Open browser DevTools → Network tab
- Look for `forceLayout.ts` being loaded
- Check the timestamp - it should be recent (after your changes)

### 5. Force Reload
- Press `Cmd + Shift + R` (Mac) or `Ctrl + Shift + R` (Windows/Linux)
- This clears the cache and forces a fresh load

## Common Issues

### Issue 1: Changes Not Applied
**Symptom:** No "Layout stabilized" message in console
**Solution:** Restart dev server (see step 3 above)

### Issue 2: TypeScript Errors
**Symptom:** Console shows TypeScript errors
**Solution:** Check terminal running `npm run dev` for errors

### Issue 3: Component Not Rendering
**Symptom:** No Lock button visible
**Solution:** Check console for React errors

### Issue 4: Simulation Still Running
**Symptom:** Nodes keep moving after 5+ seconds
**Solution:** 
1. Open browser console
2. Type: `window.topologySimulation = simulationRef.current` (if exposed)
3. Check if stabilization logic is being called

## Manual Test

1. Open http://localhost:5173
2. Wait 5 seconds
3. Take a screenshot
4. Wait another 5 seconds
5. Take another screenshot
6. Compare - nodes should be in same positions

## Expected Behavior

**After Fix:**
- Nodes move for 3-5 seconds
- Console shows: "Layout stabilized - stopping simulation"
- Nodes stop moving completely
- Lock button appears at top-center
- Green dot appears on Lock button when stable

**Current (Broken):**
- Nodes move continuously
- No console messages
- No Lock button (or button doesn't work)
- Nodes never stop moving

## Quick Fix to Test

Add this to browser console to manually stop the simulation:

```javascript
// Find the SVG element
const svg = document.querySelector('#topology-canvas');

// This won't work directly, but you can check if simulation is running
// by watching node positions in the Elements inspector
```

## Files to Check

1. `/src/lib/d3/forceLayout.ts` - Should have `checkStabilization()` method
2. `/src/components/D3Canvas/D3TopologyCanvas.tsx` - Should pass `onStabilized` callback
3. `/src/components/controls/LayoutLockButton.tsx` - Should exist
4. `/src/store/topologyStore.ts` - Should have `layoutLocked` and `layoutStable` state

## Restart Dev Server

```bash
# In terminal where dev server is running:
# Press Ctrl+C to stop

# Then restart:
npm run dev
```

Wait for "ready" message, then reload browser with Cmd+Shift+R
