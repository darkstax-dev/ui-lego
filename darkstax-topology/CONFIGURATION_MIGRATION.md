# Configuration Migration Summary

## Overview

The DarkStax Topology component has been refactored from a **hard-coded** implementation to a **JSON config-driven** architecture. This makes the component highly reusable across different use cases without code modifications.

## What Changed

### Before: Hard-Coded Implementation

**Problems:**
- Node types, colors, and icons hard-coded in rendering logic
- Grouping rules manually defined in `App.tsx`
- Legend items statically defined
- Required code changes for different use cases
- Not reusable across projects

**Example of hard-coded logic:**
```typescript
// In D3TopologyCanvas.tsx - lines 428-448
if (nodeId.includes('vnet') || nodeId.includes('qr-')) {
  // Lock icon
  iconGroup.append('path').attr('d', '...').attr('fill', '#072B56');
} else if (nodeType.includes('alert')) {
  // Alert icon
  iconGroup.append('path').attr('d', '...').attr('fill', '#D9322A');
}
```

### After: Config-Driven Implementation

**Benefits:**
- ✅ All visual styles defined in JSON configuration
- ✅ Dynamic grouping rules based on node properties
- ✅ Legend auto-generated from configuration
- ✅ Multiple pre-built configurations for different domains
- ✅ Fully reusable across projects
- ✅ No code changes needed for new use cases

**Example of config-driven approach:**
```json
{
  "nodeTypes": {
    "device": {
      "label": "Network Device",
      "icon": "lock",
      "color": "#072B56"
    }
  }
}
```

## New Architecture

### Core Components

1. **Configuration Types** (`src/types/config.ts`)
   - TypeScript interfaces for all configuration options
   - Type-safe configuration structure

2. **Configuration Loader** (`src/lib/config/ConfigLoader.ts`)
   - Loads and validates JSON configurations
   - Merges partial configurations
   - Exports configurations

3. **Grouping Engine** (`src/lib/config/GroupingEngine.ts`)
   - Applies grouping rules dynamically
   - Supports property-match, pattern-match, and manual grouping
   - Variable substitution in rules

4. **Rendering Engines**
   - `NodeRenderer` (`src/lib/rendering/NodeRenderer.ts`) - Config-driven node rendering
   - `EdgeRenderer` (`src/lib/rendering/EdgeRenderer.ts`) - Config-driven edge rendering

5. **React Hook** (`src/hooks/useTopologyConfig.ts`)
   - Easy configuration management in React components
   - File upload support
   - JSON string parsing
   - Configuration merging

6. **Configurable Legend** (`src/components/legend/ConfigurableLegend.tsx`)
   - Dynamically generates legend from configuration
   - Replaces hard-coded `TopologyLegend`

## Configuration Structure

```
{
  metadata: {
    name, description, version, author, tags
  },
  nodeTypes: {
    [typeName]: {
      label, icon, color, backgroundColor, size, shape, ...
    }
  },
  edgeTypes: {
    [typeName]: {
      label, color, width, style, dashArray, animated
    }
  },
  groupingRules: [
    {
      id, name, enabled,
      criteria: { type, ownerProperty, memberProperty, ... },
      style: { fillColor, strokeColor, ... }
    }
  ],
  theme: {
    backgroundColor, selectionColor, textColor, ...
  },
  layout: {
    defaultAlgorithm, autoLayout, forceLayout, hierarchicalLayout
  },
  features: {
    enableSearch, enableFiltering, enableExport, ...
  }
}
```

## Example Configurations

Three pre-built configurations are included:

### 1. Network Topology (`examples/configs/network-topology.json`)
**Use Case:** OpenStack network infrastructure
- Node types: device, ovsbridge, veth, host, netns
- Edge types: network, ownership, policy
- Grouping: Auto-group by OVS bridge

### 2. Kubernetes Topology (`examples/configs/kubernetes-topology.json`)
**Use Case:** Kubernetes cluster visualization
- Node types: pod, service, deployment, namespace, node
- Edge types: network, ownership, policy, service
- Grouping: By namespace and deployment

### 3. Cloud Infrastructure (`examples/configs/cloud-infrastructure.json`)
**Use Case:** Multi-cloud infrastructure (AWS/Azure/GCP)
- Node types: vpc, subnet, ec2, rds, loadbalancer, s3, lambda
- Edge types: network, ownership, policy, data
- Grouping: By VPC and subnet

## Migration Path

### Step 1: Choose or Create Configuration

Option A: Use existing configuration
```typescript
import networkConfig from './examples/configs/network-topology.json';
```

Option B: Create custom configuration
```json
{
  "metadata": { "name": "My Topology" },
  "nodeTypes": { /* ... */ },
  "edgeTypes": { /* ... */ }
}
```

### Step 2: Update Component Usage

**Old Way:**
```typescript
<D3TopologyViewer theme="light" websocketUrl={url} />
```

**New Way:**
```typescript
import { useTopologyConfig } from '@/hooks/useTopologyConfig';
import myConfig from './configs/my-topology.json';

function MyTopology() {
  const { config } = useTopologyConfig(myConfig);
  
  return config ? (
    <D3TopologyViewer 
      config={config}
      theme="light" 
      websocketUrl={url} 
    />
  ) : null;
}
```

### Step 3: Remove Hard-Coded Logic

The following files contain hard-coded logic that should be replaced:

1. **`src/App.tsx`** (lines 441-457)
   - Hard-coded group definitions
   - Replace with `groupingRules` in config

2. **`src/components/D3Canvas/D3TopologyCanvas.tsx`** (lines 428-448, 599-615)
   - Hard-coded icon selection
   - Replace with `NodeRenderer` using config

3. **`src/components/legend/TopologyLegend.tsx`** (lines 12-24)
   - Hard-coded legend items
   - Replace with `ConfigurableLegend`

4. **`src/types/graph.ts`** (lines 1-13)
   - Hard-coded `NodeType` enum
   - Now defined dynamically in config

## Key Features

### 1. Dynamic Node Types

No longer limited to predefined types. Define any node type:

```json
{
  "nodeTypes": {
    "my-custom-type": {
      "label": "Custom Type",
      "icon": "settings",
      "color": "#FF6B6B"
    }
  }
}
```

### 2. Flexible Grouping Rules

Three grouping strategies:

**Property Match:**
```json
{
  "criteria": {
    "type": "property-match",
    "ownerProperty": "Type",
    "ownerValue": "vpc",
    "memberProperty": "VpcId",
    "memberValue": "${ownerId}"
  }
}
```

**Pattern Match:**
```json
{
  "criteria": {
    "type": "pattern-match",
    "pattern": "^prod-.*"
  }
}
```

**Manual:**
```json
{
  "criteria": {
    "type": "manual",
    "manualGroups": [
      { "ownerId": "server-1", "memberIds": ["db-1", "cache-1"] }
    ]
  }
}
```

### 3. Theme Customization

Full control over visual appearance:

```json
{
  "theme": {
    "backgroundColor": "#FAFBFC",
    "selectionColor": "#3b82f6",
    "textColor": "#2C3E50",
    "labelFontFamily": "Inter, sans-serif"
  }
}
```

### 4. Layout Configuration

Fine-tune layout algorithms:

```json
{
  "layout": {
    "defaultAlgorithm": "force",
    "forceLayout": {
      "chargeStrength": -800,
      "linkDistance": 120
    }
  }
}
```

## API Reference

### ConfigLoader

```typescript
import { ConfigLoader } from '@/lib/config/ConfigLoader';

const loader = ConfigLoader.getInstance();

// Load from object
const config = loader.loadFromObject(configObject);

// Load from JSON string
const config = loader.loadFromJSON(jsonString);

// Merge configurations
const merged = loader.mergeConfig(partialConfig);

// Export configuration
const json = loader.exportConfig();
```

### useTopologyConfig Hook

```typescript
const {
  config,        // Current configuration
  loading,       // Loading state
  error,         // Error message
  loadFromFile,  // Load from File object
  loadFromJSON,  // Load from JSON string
  updateConfig,  // Merge partial config
  exportConfig   // Export as JSON string
} = useTopologyConfig(initialConfig);
```

### GroupingEngine

```typescript
import { GroupingEngine } from '@/lib/config/GroupingEngine';

const engine = new GroupingEngine();
const groups = engine.applyGroupingRules(nodes, config.groupingRules || []);
```

### NodeRenderer

```typescript
import { NodeRenderer } from '@/lib/rendering/NodeRenderer';

const renderer = new NodeRenderer(config.nodeTypes);
const nodeConfig = renderer.getNodeConfig(node.type);
renderer.renderNode(nodeGroup, node);
```

### EdgeRenderer

```typescript
import { EdgeRenderer } from '@/lib/rendering/EdgeRenderer';

const renderer = new EdgeRenderer(config.edgeTypes);
const edgeStyle = renderer.getEdgeStyle(edge);
renderer.applyEdgeStyle(edgeElement, edge);
```

## File Structure

```
darkstax-topology/
├── src/
│   ├── types/
│   │   └── config.ts                    # Configuration TypeScript types
│   ├── lib/
│   │   ├── config/
│   │   │   ├── ConfigLoader.ts          # Configuration loader & validator
│   │   │   └── GroupingEngine.ts        # Grouping rules engine
│   │   └── rendering/
│   │       ├── NodeRenderer.ts          # Config-driven node rendering
│   │       └── EdgeRenderer.ts          # Config-driven edge rendering
│   ├── hooks/
│   │   └── useTopologyConfig.ts         # React hook for config management
│   └── components/
│       └── legend/
│           └── ConfigurableLegend.tsx   # Dynamic legend component
├── examples/
│   ├── configs/
│   │   ├── network-topology.json        # Network infrastructure config
│   │   ├── kubernetes-topology.json     # Kubernetes cluster config
│   │   └── cloud-infrastructure.json    # Cloud resources config
│   └── schemas/
│       └── topology-config.schema.json  # JSON Schema for validation
├── CONFIG_GUIDE.md                      # Comprehensive configuration guide
└── CONFIGURATION_MIGRATION.md           # This file
```

## Benefits Summary

### For Developers
- ✅ No code changes for new use cases
- ✅ Type-safe configuration with TypeScript
- ✅ JSON Schema validation
- ✅ Easy to test and maintain
- ✅ Separation of concerns (data vs. presentation)

### For Users
- ✅ Visual customization without coding
- ✅ Reusable across projects
- ✅ Version-controlled configurations
- ✅ Easy to share and collaborate
- ✅ Quick prototyping

### For Organizations
- ✅ Standardized topology definitions
- ✅ Consistent visual language
- ✅ Reduced development time
- ✅ Better maintainability
- ✅ Domain-specific configurations

## Next Steps

1. **Review Example Configurations**
   - Explore `examples/configs/` directory
   - Understand different use cases

2. **Read Configuration Guide**
   - See `CONFIG_GUIDE.md` for detailed documentation
   - Learn all configuration options

3. **Create Your Configuration**
   - Start with an example config
   - Customize for your use case
   - Validate with JSON Schema

4. **Integrate Into Your App**
   - Use `useTopologyConfig` hook
   - Pass config to `D3TopologyViewer`
   - Test and iterate

## Support & Resources

- **Configuration Guide:** `CONFIG_GUIDE.md`
- **Example Configs:** `examples/configs/`
- **JSON Schema:** `examples/schemas/topology-config.schema.json`
- **TypeScript Types:** `src/types/config.ts`

## Backward Compatibility

The existing `D3TopologyViewer` component still works without configuration for backward compatibility. However, it's recommended to migrate to the config-driven approach for better maintainability and reusability.

**Legacy Usage (still works):**
```typescript
<D3TopologyViewer theme="light" />
```

**Recommended Usage:**
```typescript
<D3TopologyViewer config={myConfig} theme="light" />
```

## Conclusion

This migration transforms the DarkStax Topology component from a single-purpose, hard-coded implementation into a flexible, reusable UI library suitable for various topology visualization needs across different domains (networking, cloud, Kubernetes, etc.).
