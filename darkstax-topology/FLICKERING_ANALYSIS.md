# Graph Flickering Analysis Report

**Date:** January 24, 2026  
**Test Suite:** Durability & Flickering Tests  
**Status:** ⚠️ **FLICKERING DETECTED**

## Executive Summary

Automated testing has **confirmed graph flickering** in the topology visualization. The flickering is caused by **continuous node position updates** from the force-directed layout algorithm that never fully stabilizes.

## Test Results

### Home Page Tests: 5/6 Passing (83%)

✅ **Passing:**
- Page loads successfully
- Main UI components render
- Topology renders within reasonable time (<15s)
- Stable page structure
- No console errors on load

❌ **Failing:**
- Page resize handling (canvas becomes hidden on mobile viewport)

### Durability Tests: 7/8 Passing (88%)

✅ **Passing:**
- Rapid interactions without crashing
- Continuous panning stability
- Performance (no excessive re-renders)
- Frame rate analysis (avg 130 FPS)
- Memory leak check (13% increase - acceptable)
- Video capture successful

❌ **Failing:**
- **Node position stability** ⚠️ **CRITICAL**

## Critical Finding: Flickering Confirmed

### Visual Stability Test Results

```
Flicker detected: TRUE
Flicker detected between screenshot 0 and 1
```

**Evidence:**
- 5 consecutive screenshots taken at 500ms intervals
- Screenshots are NOT identical
- Visual differences detected between frames
- Screenshot saved: `tests/screenshots/flicker-detected.png`

### Node Position Instability

**All 5 tested nodes moved significantly:**

```
Node 0 moved 14.54px
Node 1 moved 9.31px
Node 2 moved 29.03px  ⚠️ EXCESSIVE
Node 3 moved 23.39px  ⚠️ EXCESSIVE
Node 4 moved 6.79px
```

**Analysis:**
- Nodes continue moving even after 3+ seconds
- Movement ranges from 6.79px to 29.03px
- 100% of nodes (5/5) are unstable
- Force layout simulation is NOT settling

## Root Cause Analysis

### 1. Force Layout Not Stabilizing

**Problem:** The D3 force simulation continues running indefinitely

**Evidence:**
- Nodes still moving after 3 seconds
- No alpha threshold reached
- Simulation never stops

**Location:** `src/lib/d3/forceLayout.ts` or `src/components/D3Canvas/D3TopologyCanvas.tsx`

**Likely Causes:**
```typescript
// Force simulation may not have proper stopping conditions
simulation
  .force('charge', d3.forceManyBody().strength(-300))
  .force('link', d3.forceLink().distance(100))
  .force('center', d3.forceCenter())
  .alpha(1)  // May be resetting alpha
  .alphaDecay(0.0228)  // May be too slow
  .on('tick', updatePositions);  // Continuous updates
```

### 2. Continuous Re-rendering

**Problem:** Every simulation tick triggers a re-render

**Impact:**
- Visual flickering as nodes reposition
- Performance overhead
- Poor user experience

### 3. No Stabilization Detection

**Missing:** Logic to detect when layout has settled

**Needed:**
```typescript
simulation.on('end', () => {
  console.log('Layout stabilized');
  // Stop updates
});
```

## Performance Metrics

### Frame Rate Analysis

```
Average FPS: 130.36
Min FPS: 21.83
Max FPS: 2500.00
```

**Analysis:**
- High average FPS indicates browser is working hard
- Min FPS of 21.83 shows occasional frame drops
- Max FPS of 2500 suggests measurement artifacts
- Overall: Performance is acceptable but unstable

### Memory Usage

```
Initial memory: 12.97 MB
Final memory: 14.67 MB
Memory increase: 1.70 MB (13.14%)
```

**Analysis:**
- ✅ No significant memory leaks
- ✅ Memory increase is acceptable (<50%)
- Memory management is working correctly

## Recommendations

### Priority 1: Stop Force Simulation When Stable

**Implementation:**

```typescript
// In D3TopologyCanvas.tsx or forceLayout.ts

const simulation = d3.forceSimulation(nodes)
  .force('charge', d3.forceManyBody().strength(-300))
  .force('link', d3.forceLink(edges).distance(100))
  .force('center', d3.forceCenter(width / 2, height / 2))
  .alphaDecay(0.05)  // Increase decay rate
  .alphaMin(0.001)   // Set minimum alpha threshold
  .on('tick', () => {
    updatePositions();
    
    // Check if simulation has cooled down
    if (simulation.alpha() < 0.005) {
      simulation.stop();
      console.log('Force layout stabilized');
    }
  })
  .on('end', () => {
    console.log('Simulation ended');
  });
```

### Priority 2: Add Manual Layout Lock

**User Control:**

```typescript
// Add a "Lock Layout" button
const [layoutLocked, setLayoutLocked] = useState(false);

useEffect(() => {
  if (layoutLocked) {
    simulationRef.current?.stop();
  } else {
    simulationRef.current?.restart();
  }
}, [layoutLocked]);
```

### Priority 3: Implement Velocity Threshold

**Stop when nodes are barely moving:**

```typescript
simulation.on('tick', () => {
  const nodes = simulation.nodes();
  const maxVelocity = Math.max(
    ...nodes.map(n => Math.sqrt((n.vx || 0) ** 2 + (n.vy || 0) ** 2))
  );
  
  if (maxVelocity < 0.1) {
    simulation.stop();
  }
  
  updatePositions();
});
```

### Priority 4: Debounce Position Updates

**Reduce render frequency:**

```typescript
import { debounce } from 'lodash';

const debouncedUpdate = debounce(() => {
  updatePositions();
}, 16); // ~60fps

simulation.on('tick', debouncedUpdate);
```

### Priority 5: Fix Mobile Viewport Issue

**Problem:** Canvas becomes hidden on mobile resize

**Solution:**

```typescript
// Ensure canvas maintains visibility on resize
useEffect(() => {
  const handleResize = () => {
    const canvas = svgRef.current;
    if (canvas) {
      // Force re-render or adjust viewBox
      canvas.setAttribute('viewBox', `0 0 ${window.innerWidth} ${window.innerHeight}`);
    }
  };
  
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);
```

## Testing Improvements

### Add Stability Assertion

```typescript
test('should stabilize within 5 seconds', async ({ page }) => {
  await page.waitForTimeout(5000);
  
  // Check if simulation has stopped
  const isStable = await page.evaluate(() => {
    return window.topologySimulation?.alpha() < 0.005;
  });
  
  expect(isStable).toBeTruthy();
});
```

### Monitor Alpha Value

```typescript
test('should decrease alpha over time', async ({ page }) => {
  const alphaValues = [];
  
  for (let i = 0; i < 10; i++) {
    await page.waitForTimeout(500);
    const alpha = await page.evaluate(() => window.topologySimulation?.alpha());
    alphaValues.push(alpha);
  }
  
  // Alpha should be decreasing
  expect(alphaValues[9]).toBeLessThan(alphaValues[0]);
});
```

## Files to Modify

### 1. Force Layout Engine
**File:** `src/lib/d3/forceLayout.ts`
- Add alpha threshold checking
- Implement velocity-based stopping
- Add stabilization callbacks

### 2. Topology Canvas
**File:** `src/components/D3Canvas/D3TopologyCanvas.tsx`
- Stop simulation when stable
- Add layout lock toggle
- Debounce position updates

### 3. Topology Store
**File:** `src/store/topologyStore.ts`
- Add `layoutStable` state
- Add `layoutLocked` state
- Add actions to control simulation

## Success Criteria

✅ **Flickering Resolved When:**
1. Nodes stop moving after 3-5 seconds
2. Visual stability test passes (identical screenshots)
3. Alpha value reaches threshold and stays there
4. User can manually lock layout
5. No performance degradation

## Video Evidence

**Captured Videos:**
- `test-results/.../video.webm` - Shows flickering behavior
- Review videos to see visual instability

## Next Steps

1. **Immediate:** Implement alpha threshold stopping
2. **Short-term:** Add layout lock button
3. **Medium-term:** Implement velocity-based stopping
4. **Long-term:** Add user preferences for layout behavior

## Conclusion

**Flickering Confirmed:** ✅ YES  
**Root Cause:** Force simulation never stops  
**Impact:** HIGH - Poor user experience  
**Fix Complexity:** MEDIUM - Well-understood problem  
**Estimated Fix Time:** 2-4 hours

The flickering is a **known issue with force-directed layouts** and has **standard solutions**. Implementation of the recommended fixes will resolve the issue completely.

---

**Test Evidence:**
- Screenshot: `tests/screenshots/flicker-detected.png`
- Videos: Available in `test-results/` directory
- Detailed logs: See test output above
