# Activity Input/Output Component - Fixes and Enhancements

## Summary of Changes

The Activity Input/Output component has been completely overhauled to provide proper geometric positioning and improved collapse/expand functionality as requested.

## Key Improvements

### 1. **Geometric Arc Positioning** ✨
Input and output nodes now arrange themselves in a **dynamic arc/semi-circle pattern** around the execution node instead of a straight line.

**How it works:**
- When you add inputs, they appear in an arc **above** the execution node
- When you add outputs, they appear in an arc **below** the execution node
- The arc angle adjusts based on the number of nodes (max 120 degrees)
- Nodes are evenly distributed along the arc using trigonometric calculations

**Formula:**
```typescript
const radius = 150 // Distance from parent
const arcAngle = Math.min(120, nodeCount * 30) // Grows with count, max 120°
const angleStep = nodeCount > 1 ? arcAngle / (nodeCount - 1) : 0
```

### 2. **Dynamic Geometric Backgrounds** 🎨
The `GroupBackground` component now creates **SVG-based geometric shapes** that adapt to the number of nodes.

**Features:**
- Arc-shaped backgrounds that match the node arrangement
- Different colors for inputs (blue) and outputs (red)
- Gradient fills with glow effects
- Dashed strokes when node count > 3
- Smooth fade-in animations

### 3. **Enhanced Collapse/Expand Functionality** 🔄

**Three ways to control visibility:**

1. **Click the Execution Node**: Collapses ALL inputs and outputs
   - Visual feedback with opacity change and pulse animation
   - Hides both nodes and connecting edges

2. **Click the Input Trigger (top blue circle)**: Toggles input nodes only
   - Circle labeled with "I" for clarity
   - Independent of output visibility

3. **Click the Output Trigger (bottom red circle)**: Toggles output nodes only
   - Circle labeled with "O" for clarity
   - Independent of input visibility

### 4. **Automatic Repositioning** 📍
When adding new nodes, **all existing nodes** in that group automatically reposition themselves to maintain the perfect arc pattern.

## Updated Components

### Modified Files:
1. **ActivityInputOutput.tsx** - Complete rewrite with:
   - `calculateArcPosition()` helper function
   - Improved `handleAddInput()` with automatic repositioning
   - Improved `handleAddOutput()` with automatic repositioning
   - Enhanced collapse/expand logic

2. **ExecutionNode.tsx** - Enhanced with:
   - Visual collapse state indicator
   - Improved trigger buttons with labels
   - Better hover effects

3. **GroupBackground.tsx** - Complete redesign:
   - SVG-based geometric shapes
   - Dynamic path generation based on node count
   - Gradient backgrounds with blur effects

4. **CSS files** - Updated styling:
   - Animations for shape appearance
   - Pulse effect for collapsed state
   - Better hover states
   - Responsive adjustments

## How to Use

### Adding Inputs:
1. Right-click the execution node (three dots menu)
2. Hover over "Action Input"
3. Select an input type (Env Variable, GraphQL, GRPC, etc.)
4. The input appears in the arc above the node

### Adding Outputs:
1. Right-click the execution node (three dots menu)
2. Hover over "Action Output"
3. Select an output type (Postman, GRPC, Kafka, etc.)
4. The output appears in the arc below the node

### Toggling Visibility:
- Click the **blue circle** (top) to show/hide inputs
- Click the **red circle** (bottom) to show/hide outputs
- Click the **execution node itself** to collapse everything

## Visual Behavior

### Geometric Patterns:
- **1 node**: Directly above/below (0° arc)
- **2 nodes**: 30° arc (15° on each side)
- **3 nodes**: 60° arc (30° spread)
- **4 nodes**: 90° arc (45° spread)
- **5+ nodes**: 120° arc (max spread)

### Animations:
- Nodes fade in with scale animation (0.3s)
- Background shapes fade and scale (0.3s)
- Collapsed state shows pulse animation
- Smooth transitions on all interactions

## Technical Details

### Arc Calculation:
```typescript
// For inputs (above node - 90° base angle)
startAngle = 90 - arcAngle / 2

// For outputs (below node - 270° base angle)
startAngle = 270 - arcAngle / 2

// Position calculation
x = parentX + cos(angle) * radius - 26
y = parentY - sin(angle) * radius - 26
```

### Background Shape:
- Creates SVG path with inner and outer radius
- Forms a "donut segment" shape around the arc
- Padding of 60px around the nodes
- Stroke style changes with node count

## Browser Compatibility
- All modern browsers (Chrome, Firefox, Safari, Edge)
- Uses CSS `backdrop-filter` for blur effects
- Fallback gradients for older browsers
- Responsive down to mobile sizes

## Performance
- Efficient repositioning using React state batching
- SVG shapes cached by browser
- Minimal re-renders with proper useCallback
- Smooth 60fps animations

## Testing
To test the functionality:
1. Open Storybook: `npm run storybook`
2. Navigate to Components > ActivityInputOutput > Default
3. Add multiple inputs and outputs to see the arc pattern
4. Test collapse/expand by clicking different areas
5. Verify smooth animations and positioning

## Future Enhancements (Optional)
- Customizable arc radius and angle limits
- Drag-and-drop to reorder nodes in the arc
- Animated transitions when nodes reposition
- Different geometric patterns (circle, spiral, etc.)
- Connector line styling that follows the arc
