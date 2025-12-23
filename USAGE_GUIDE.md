# Activity Input/Output - User Guide

## Quick Start

### Step 1: Open the Component
Navigate to the Storybook component:
```
Components → ActivityInputOutput → Default
```

## Using the Component

### Adding Input Nodes

1. **Right-click** on an execution node (or click the three dots)
2. Select **"Action Input"**
3. Choose an input type from the submenu:
   - Env Variable Input
   - Graphql Input
   - GRPC Input
   - Postman Input
   - Kafka Input

**Result:** The input node appears in an **arc pattern above** the execution node

### Adding Output Nodes

1. **Right-click** on an execution node (or click the three dots)
2. Select **"Action Output"**
3. Choose an output type from the submenu:
   - Postman Output
   - Grpc Output
   - Kafka Output
   - Nats Output
   - Env Variable Output
   - S3 Destination Output

**Result:** The output node appears in an **arc pattern below** the execution node

## Geometric Shape Behavior

### How the Arc Pattern Works

The nodes arrange themselves in a **semi-circular arc** that expands as you add more nodes:

```
        [Input 1]
      /           \
  [Input 2]   [Input 3]
       \     |     /
        [EXECUTION]
       /     |     \
  [Output 1] | [Output 3]
          [Output 2]
```

### Arc Sizing

| Number of Nodes | Arc Angle | Visual Pattern |
|-----------------|-----------|----------------|
| 1 node          | 0°        | Directly above/below |
| 2 nodes         | 30°       | Slight spread |
| 3 nodes         | 60°       | Medium arc |
| 4 nodes         | 90°       | Wide arc |
| 5+ nodes        | 120°      | Maximum spread |

## Toggling Visibility

### Method 1: Toggle Input Group Only
- **Click** the **blue circle** at the top of the execution node
- Label: "I" for Input
- Action: Shows/hides all input nodes

### Method 2: Toggle Output Group Only
- **Click** the **red circle** at the bottom of the execution node
- Label: "O" for Output
- Action: Shows/hides all output nodes

### Method 3: Collapse Everything
- **Click** the execution node itself (the main icon area)
- Action: Hides both inputs AND outputs
- Visual feedback: Node becomes slightly transparent with pulse effect

## Visual Feedback

### When Nodes Appear
- ✨ Smooth fade-in animation (0.3s)
- 📏 Geometric background shape appears
- 🎨 Blue tint for inputs, red tint for outputs
- 🔗 Connection lines automatically drawn

### When Nodes are Hidden
- 🌫️ Fade-out animation
- 📦 Nodes collapse back into the execution node
- 🎭 Execution node shows "collapsed" state

### Background Shapes
- 🌈 Gradient fills (blue for inputs, red for outputs)
- 💫 Subtle glow effect around the arc
- ➰ Dashed strokes when you have 4+ nodes
- 📐 Expands to accommodate more nodes

## Tips and Tricks

### Best Practices

1. **Start Small**: Add 1-2 nodes first to see the pattern
2. **Test Collapse**: Click the execution node to see everything hide
3. **Use Toggles**: Use the blue/red circles for quick show/hide
4. **Add More**: Notice how existing nodes reposition when you add new ones

### Common Workflows

**Scenario 1: Building a Data Pipeline**
```
1. Add "Kafka Input" (appears in arc above)
2. Add "S3 Destination Output" (appears in arc below)
3. Toggle visibility as needed during design
```

**Scenario 2: Multiple Inputs/Outputs**
```
1. Add 3-4 inputs (forms a nice arc above)
2. Add 3-4 outputs (forms matching arc below)
3. Collapse when you need to focus on other nodes
```

### Keyboard Shortcuts
Currently controlled via mouse/click interactions. Future versions may include:
- `I` - Toggle inputs
- `O` - Toggle outputs
- `C` - Collapse all

## Troubleshooting

### Nodes Not Appearing?
- Check if the group is expanded (look for the geometric background)
- Click the blue (input) or red (output) circle to toggle visibility

### Nodes in Wrong Position?
- The component automatically repositions all nodes in the arc
- Try adding another node - they should all realign

### Background Not Visible?
- The background is semi-transparent by design
- It should appear as a subtle arc shape behind the nodes
- Check if nodes are actually expanded (not hidden)

## Advanced Features

### Automatic Repositioning
When you add a new node, ALL existing nodes in that group automatically reposition themselves to maintain a perfect arc pattern.

**Example:**
- Start with 2 inputs (30° arc)
- Add a 3rd input
- All 3 inputs reposition to a 60° arc
- Background shape updates to match

### Independent Groups
- Input visibility is independent of output visibility
- You can show inputs while hiding outputs (and vice versa)
- Use the execution node click to collapse both at once

### Visual States
The execution node has three visual states:
1. **Normal**: Default appearance
2. **Hover**: Slightly lighter background
3. **Collapsed**: Transparent with pulse animation

## Examples

### Example 1: Simple Input/Output Flow
```
Input: Graphql Input (above)
   ↓
[Execution Node]
   ↓
Output: Postman Output (below)
```

### Example 2: Multiple Inputs, Single Output
```
     [Kafka]    [GRPC]
        \       /
      [Graphql]
          |
    [Execution Node]
          |
    [S3 Destination]
```

### Example 3: Complete Pipeline
```
  [Env Var]  [Kafka]  [GRPC]
      \        |       /
    [Execution Node]
      /        |       \
[Postman]   [Kafka]  [Nats]
```

## Next Steps

1. **Experiment**: Try adding different combinations of inputs and outputs
2. **Test Collapse**: Practice using all three collapse methods
3. **Build Flows**: Create complete data pipelines with multiple nodes
4. **Connect Nodes**: Use the handles to connect execution nodes together

## Support

If you encounter issues:
1. Check this guide for common solutions
2. Review the ACTIVITY_INPUT_OUTPUT_FIXES.md for technical details
3. Open an issue with a description and screenshot

---

**Happy Building! 🚀**
