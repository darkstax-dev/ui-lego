# Skydive Force Layout Analysis

## Visual Analysis of Reference Image

### Key Observations:

1. **Convex Hull Grouping**
   - Groups are rendered as **smooth, organic shapes** (not rectangles)
   - Uses **convex hull** algorithm to wrap nodes
   - Groups have **colored fills** (green, purple, orange, dark blue)
   - **Semi-transparent backgrounds** with subtle borders
   - Groups **overlap** and can contain other groups

2. **Node Positioning**
   - Nodes are **tightly clustered** within groups
   - Clear **visual separation** between different groups
   - Nodes maintain **minimum spacing** from each other
   - Groups have **padding** around their member nodes

3. **Visual Styling**
   - **Pastel colors** for group backgrounds (light green, light purple, etc.)
   - **Darker borders** around group hulls
   - Nodes appear as **small circles** with icons
   - **Hierarchical layering** - some groups contain sub-groups

4. **Physics Simulation**
   - Groups act as **force containers**
   - Nodes within same group are **attracted** to each other
   - Different groups **repel** each other
   - Creates **natural clustering** effect

## Current Implementation Issues

### Problem 1: Rectangle Groups Instead of Convex Hulls
**Current:** Using rounded rectangles for groups
**Expected:** Organic, hull-shaped boundaries that wrap nodes

### Problem 2: Group Force Implementation
**Current:** Basic group force that pulls nodes to center
**Expected:** Sophisticated clustering with:
- Intra-group attraction
- Inter-group repulsion
- Collision detection between groups
- Padding around nodes

### Problem 3: Visual Rendering
**Current:** Hard-coded blue dashed borders
**Expected:** 
- Smooth convex hull paths
- Colored fills matching group type
- Proper opacity/transparency
- Layered rendering (groups behind nodes)

## Skydive Implementation Research

### Key Technologies Used by Skydive:

1. **D3.js v4/v5** - Force simulation
2. **d3.polygonHull()** - Convex hull calculation
3. **Custom force functions** - Group clustering
4. **SVG path rendering** - Smooth group boundaries

### Critical Implementation Details:

#### 1. Convex Hull Calculation
```javascript
// Skydive uses d3.polygonHull to create organic group shapes
const hull = d3.polygonHull(groupNodes.map(n => [n.x, n.y]));
```

#### 2. Group Force Function
```javascript
// Custom force that:
// - Attracts nodes within same group
// - Repels nodes from different groups
// - Maintains group cohesion
function groupForce(alpha) {
  nodes.forEach(node => {
    if (node.group) {
      // Calculate group centroid
      // Apply attraction to centroid
      // Apply repulsion from other groups
    }
  });
}
```

#### 3. Padding Around Hull
```javascript
// Add padding to hull points
function padHull(hull, padding) {
  // Expand hull outward by padding amount
  // Creates space between nodes and group boundary
}
```

#### 4. Smooth Path Rendering
```javascript
// Use d3.line().curve() for smooth paths
const lineGenerator = d3.line()
  .curve(d3.curveCatmullRomClosed.alpha(0.5));
```

## Required Changes to Our Implementation

### 1. Replace Rectangle Groups with Convex Hulls

**File:** `src/components/D3Canvas/D3TopologyCanvas.tsx`

**Current:**
```typescript
// Using createRoundedRectPath for groups
const path = createRoundedRectPath(bounds, 25);
```

**Needed:**
```typescript
// Use d3.polygonHull for organic shapes
import * as d3Polygon from 'd3-polygon';

const points = groupNodes.map(n => [n.x, n.y]);
const hull = d3Polygon.polygonHull(points);
if (hull) {
  const paddedHull = expandHull(hull, 30); // Add padding
  const pathData = lineGenerator(paddedHull);
}
```

### 2. Implement Proper Group Forces

**File:** `src/lib/d3/forceLayout.ts`

**Add:**
```typescript
// Intra-group attraction
.force('group-attraction', (alpha) => {
  groups.forEach((members, groupId) => {
    const cx = d3.mean(members, n => n.x);
    const cy = d3.mean(members, n => n.y);
    
    members.forEach(node => {
      const dx = cx - node.x;
      const dy = cy - node.y;
      node.vx += dx * 0.1 * alpha;
      node.vy += dy * 0.1 * alpha;
    });
  });
})

// Inter-group repulsion
.force('group-repulsion', (alpha) => {
  // Repel nodes from different groups
});
```

### 3. Update Visual Styling

**Apply group colors from config:**
```typescript
groupEnter.append('path')
  .attr('class', 'group-hull')
  .attr('fill', group.style?.fillColor || 'rgba(144, 238, 144, 0.3)')
  .attr('stroke', group.style?.strokeColor || 'rgba(0, 100, 0, 0.5)')
  .attr('stroke-width', 2)
  .attr('stroke-linejoin', 'round');
```

### 4. Add Hull Padding Function

```typescript
function expandHull(hull: [number, number][], padding: number): [number, number][] {
  // Calculate centroid
  const cx = d3.mean(hull, p => p[0]);
  const cy = d3.mean(hull, p => p[1]);
  
  // Expand each point outward from centroid
  return hull.map(([x, y]) => {
    const dx = x - cx;
    const dy = y - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const scale = (dist + padding) / dist;
    return [cx + dx * scale, cy + dy * scale];
  });
}
```

## Comparison: Skydive vs Our Implementation

| Feature | Skydive | Our Current | Status |
|---------|---------|-------------|--------|
| Group Shape | Convex Hull | Rounded Rectangle | ❌ Need to fix |
| Group Colors | Config-driven pastels | Hard-coded blue | ❌ Need to fix |
| Group Forces | Attraction + Repulsion | Basic centering | ❌ Need to fix |
| Hull Padding | Yes (~30px) | No | ❌ Need to fix |
| Smooth Curves | Yes (Catmull-Rom) | No | ❌ Need to fix |
| Transparency | Yes | Partial | ⚠️ Needs adjustment |
| Layering | Groups behind nodes | Mixed | ⚠️ Needs adjustment |

## Implementation Priority

1. **HIGH:** Implement convex hull rendering
2. **HIGH:** Add hull padding function
3. **HIGH:** Apply group colors from config
4. **MEDIUM:** Implement proper group forces
5. **MEDIUM:** Add smooth curve interpolation
6. **LOW:** Optimize performance for large graphs

## Dependencies Needed

```json
{
  "d3-polygon": "^3.0.1"
}
```

## Expected Visual Result

After implementation:
- ✅ Organic, hull-shaped group boundaries
- ✅ Colored fills matching group types
- ✅ Proper padding around nodes
- ✅ Smooth, curved paths
- ✅ Natural clustering behavior
- ✅ Visual match to reference image
