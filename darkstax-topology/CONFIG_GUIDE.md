# Topology Configuration Guide

## Overview

The DarkStax Topology component is now fully **config-driven**, allowing you to create reusable topology visualizations for various use cases without modifying code. This guide explains how to configure the topology viewer using JSON configuration files.

## Table of Contents

1. [Quick Start](#quick-start)
2. [Configuration Schema](#configuration-schema)
3. [Node Type Configuration](#node-type-configuration)
4. [Edge Type Configuration](#edge-type-configuration)
5. [Grouping Rules](#grouping-rules)
6. [Theme Customization](#theme-customization)
7. [Layout Configuration](#layout-configuration)
8. [Feature Toggles](#feature-toggles)
9. [Example Configurations](#example-configurations)
10. [API Usage](#api-usage)

---

## Quick Start

### 1. Create a Configuration File

Create a JSON file with your topology configuration:

```json
{
  "metadata": {
    "name": "My Topology",
    "description": "Custom topology visualization",
    "version": "1.0.0"
  },
  "nodeTypes": {
    "server": {
      "label": "Server",
      "icon": "settings",
      "color": "#0072ff"
    }
  },
  "edgeTypes": {
    "connection": {
      "label": "Connection",
      "color": "#cbd5e1",
      "width": 2,
      "style": "solid"
    }
  }
}
```

### 2. Load Configuration in Your Component

```typescript
import { D3TopologyViewer } from '@/components/D3Canvas/D3TopologyViewer';
import { useTopologyConfig } from '@/hooks/useTopologyConfig';
import myConfig from './configs/my-topology.json';

function MyTopology() {
  const { config } = useTopologyConfig(myConfig);
  
  return config ? (
    <D3TopologyViewer config={config} />
  ) : (
    <div>Loading configuration...</div>
  );
}
```

---

## Configuration Schema

### Root Structure

```typescript
{
  "$schema": "path/to/topology-config.schema.json",  // Optional JSON Schema reference
  "metadata": { /* Metadata object */ },
  "nodeTypes": { /* Node type definitions */ },
  "edgeTypes": { /* Edge type definitions */ },
  "groupingRules": [ /* Optional grouping rules */ ],
  "theme": { /* Optional theme settings */ },
  "layout": { /* Optional layout settings */ },
  "features": { /* Optional feature toggles */ }
}
```

### Metadata (Required)

```json
{
  "metadata": {
    "name": "Topology Name",           // Required
    "description": "Description",       // Optional
    "version": "1.0.0",                // Optional
    "author": "Author Name",           // Optional
    "tags": ["tag1", "tag2"]           // Optional
  }
}
```

---

## Node Type Configuration

Define visual appearance and behavior for each node type in your topology.

### Node Type Schema

```typescript
{
  "nodeTypes": {
    "nodeTypeName": {
      "label": string,              // Required: Display name
      "icon": IconType | string,    // Required: Icon identifier
      "color": string,              // Required: Primary color (hex/rgb)
      "iconPath": string,           // Optional: Custom SVG path
      "backgroundColor": string,    // Optional: Background color
      "shape": "circle" | "rect" | "hexagon",  // Optional: Node shape
      "size": number,               // Optional: Node size in pixels
      "strokeColor": string,        // Optional: Border color
      "strokeWidth": number         // Optional: Border width
    }
  }
}
```

### Built-in Icons

- `lock` - Security/locked resources
- `settings` - Configuration/general nodes
- `alert` - Warnings/alerts
- `link` - Connections/links
- `custom` - Use with `iconPath` for custom SVG

### Example: Node Types

```json
{
  "nodeTypes": {
    "server": {
      "label": "Server",
      "icon": "settings",
      "color": "#0072ff",
      "backgroundColor": "rgba(0, 114, 255, 0.1)",
      "size": 30
    },
    "database": {
      "label": "Database",
      "icon": "lock",
      "color": "#527FFF",
      "backgroundColor": "rgba(82, 127, 255, 0.1)",
      "size": 28
    },
    "custom-node": {
      "label": "Custom",
      "icon": "custom",
      "iconPath": "M12 2L2 7l10 5 10-5-10-5z...",
      "color": "#FF6B6B"
    }
  }
}
```

---

## Edge Type Configuration

Define visual styles for different types of connections between nodes.

### Edge Type Schema

```typescript
{
  "edgeTypes": {
    "edgeTypeName": {
      "label": string,                    // Required: Display name
      "color": string,                    // Required: Line color
      "width": number,                    // Optional: Line width (default: 2)
      "style": "solid" | "dashed" | "dotted",  // Optional: Line style
      "dashArray": string,                // Optional: Custom dash pattern
      "animated": boolean                 // Optional: Animate the edge
    }
  }
}
```

### Example: Edge Types

```json
{
  "edgeTypes": {
    "network": {
      "label": "Network Connection",
      "color": "#146EB4",
      "width": 2,
      "style": "solid"
    },
    "ownership": {
      "label": "Owns/Contains",
      "color": "#95A5A6",
      "width": 2,
      "style": "dashed",
      "dashArray": "6,4"
    },
    "data-flow": {
      "label": "Data Flow",
      "color": "#569A31",
      "width": 3,
      "style": "solid",
      "animated": true
    }
  }
}
```

---

## Grouping Rules

Define rules to automatically group related nodes together with visual containers.

### Grouping Rule Types

#### 1. Property Match

Group nodes based on matching property values:

```json
{
  "groupingRules": [
    {
      "id": "group-by-vpc",
      "name": "Group by VPC",
      "enabled": true,
      "criteria": {
        "type": "property-match",
        "ownerProperty": "Type",
        "ownerValue": "vpc",
        "memberProperty": "VpcId",
        "memberValue": "${ownerId}"
      },
      "style": {
        "fillColor": "rgba(255, 153, 0, 0.05)",
        "strokeColor": "rgba(255, 153, 0, 0.4)",
        "strokeWidth": 3,
        "strokeDashArray": "12, 6",
        "borderRadius": 35,
        "padding": 50
      }
    }
  ]
}
```

**How it works:**
- Finds all nodes where `Type === "vpc"` (owners)
- For each owner, finds nodes where `VpcId === owner.id` (members)
- Creates a visual group container around them

**Variable Substitution:**
- `${ownerId}` - Replaced with the owner node's ID

#### 2. Pattern Match

Group nodes based on ID or label patterns:

```json
{
  "criteria": {
    "type": "pattern-match",
    "pattern": "^prod-.*"
  }
}
```

#### 3. Manual Groups

Explicitly define groups:

```json
{
  "criteria": {
    "type": "manual",
    "manualGroups": [
      {
        "ownerId": "main-server",
        "memberIds": ["db-1", "db-2", "cache-1"]
      }
    ]
  }
}
```

### Group Style Options

```typescript
{
  "style": {
    "fillColor": string,        // Background color
    "strokeColor": string,      // Border color
    "strokeWidth": number,      // Border width
    "strokeDashArray": string,  // Border dash pattern
    "opacity": number,          // Overall opacity
    "borderRadius": number,     // Corner radius
    "padding": number           // Space around grouped nodes
  }
}
```

---

## Theme Customization

Customize the overall visual appearance of the topology viewer.

### Theme Schema

```json
{
  "theme": {
    "backgroundColor": "#FAFBFC",
    "gridColor": "#D1D5DB",
    "gridOpacity": 0.1,
    "selectionColor": "#3b82f6",
    "selectionStrokeWidth": 3,
    "hoverColor": "#60a5fa",
    "textColor": "#2C3E50",
    "labelFontFamily": "Inter, sans-serif",
    "labelFontSize": 13,
    "labelFontWeight": 500
  }
}
```

### Theme Properties

| Property | Type | Description |
|----------|------|-------------|
| `backgroundColor` | string | Canvas background color |
| `gridColor` | string | Grid dot color |
| `gridOpacity` | number | Grid opacity (0-1) |
| `selectionColor` | string | Selected node/edge highlight color |
| `selectionStrokeWidth` | number | Selection border width |
| `hoverColor` | string | Hover state color |
| `textColor` | string | Label text color |
| `labelFontFamily` | string | Font family for labels |
| `labelFontSize` | number | Font size in pixels |
| `labelFontWeight` | string/number | Font weight |

---

## Layout Configuration

Configure automatic layout algorithms and their parameters.

### Layout Schema

```json
{
  "layout": {
    "defaultAlgorithm": "force",
    "autoLayout": true,
    "forceLayout": {
      "chargeStrength": -800,
      "linkDistance": 120,
      "collideRadius": 60
    },
    "hierarchicalLayout": {
      "direction": "TB",
      "levelSeparation": 150,
      "nodeSeparation": 100
    }
  }
}
```

### Layout Algorithms

#### Force-Directed Layout

Simulates physical forces between nodes:

```json
{
  "forceLayout": {
    "chargeStrength": -800,    // Repulsion force (negative = repel)
    "linkDistance": 120,       // Desired edge length
    "collideRadius": 60        // Collision detection radius
  }
}
```

#### Hierarchical Layout

Arranges nodes in layers:

```json
{
  "hierarchicalLayout": {
    "direction": "TB",         // TB, BT, LR, RL
    "levelSeparation": 150,    // Vertical spacing
    "nodeSeparation": 100      // Horizontal spacing
  }
}
```

---

## Feature Toggles

Enable or disable specific features of the topology viewer.

```json
{
  "features": {
    "enableSearch": true,
    "enableFiltering": true,
    "enableExport": true,
    "enableTimeline": true,
    "enableMetadataPanel": true,
    "enableContextMenu": true,
    "enableKeyboardShortcuts": true
  }
}
```

---

## Example Configurations

### Network Infrastructure

See: `examples/configs/network-topology.json`

Use case: OpenStack network topology, virtual networks, bridges

### Kubernetes Cluster

See: `examples/configs/kubernetes-topology.json`

Use case: K8s pods, services, deployments, namespaces

### Cloud Infrastructure

See: `examples/configs/cloud-infrastructure.json`

Use case: AWS/Azure/GCP resources, VPCs, instances, databases

---

## API Usage

### Using the Configuration Hook

```typescript
import { useTopologyConfig } from '@/hooks/useTopologyConfig';

function MyComponent() {
  const { 
    config, 
    loading, 
    error, 
    loadFromFile, 
    loadFromJSON,
    updateConfig,
    exportConfig 
  } = useTopologyConfig(initialConfig);

  // Load from file
  const handleFileUpload = async (file: File) => {
    await loadFromFile(file);
  };

  // Load from JSON string
  const handleJSONLoad = (jsonString: string) => {
    loadFromJSON(jsonString);
  };

  // Update configuration
  const handleThemeChange = () => {
    updateConfig({
      theme: {
        backgroundColor: '#000000'
      }
    });
  };

  // Export configuration
  const handleExport = () => {
    const json = exportConfig();
    console.log(json);
  };

  return (
    <div>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {config && <D3TopologyViewer config={config} />}
    </div>
  );
}
```

### Programmatic Configuration Loading

```typescript
import { ConfigLoader } from '@/lib/config/ConfigLoader';

const loader = ConfigLoader.getInstance();

// Load from object
const config = loader.loadFromObject({
  metadata: { name: "My Topology" },
  nodeTypes: { /* ... */ },
  edgeTypes: { /* ... */ }
});

// Load from JSON string
const config2 = loader.loadFromJSON(jsonString);

// Merge configurations
const merged = loader.mergeConfig({
  theme: { backgroundColor: '#fff' }
});

// Export
const exported = loader.exportConfig();
```

### Using Grouping Engine

```typescript
import { GroupingEngine } from '@/lib/config/GroupingEngine';

const engine = new GroupingEngine();
const groups = engine.applyGroupingRules(nodes, config.groupingRules || []);
```

---

## Best Practices

### 1. **Organize Configurations by Use Case**

Create separate config files for different domains:
- `network-topology.json` - Network infrastructure
- `kubernetes-topology.json` - Container orchestration
- `cloud-topology.json` - Cloud resources

### 2. **Use Consistent Color Schemes**

Maintain visual consistency across node and edge types:

```json
{
  "nodeTypes": {
    "primary": { "color": "#0072ff" },
    "secondary": { "color": "#2eb969" },
    "warning": { "color": "#ed8b30" },
    "danger": { "color": "#D9322A" }
  }
}
```

### 3. **Leverage Grouping Rules**

Use property-match rules for dynamic grouping:

```json
{
  "groupingRules": [
    {
      "criteria": {
        "type": "property-match",
        "ownerProperty": "Type",
        "ownerValue": ["vpc", "subnet"],
        "memberProperty": "ParentId",
        "memberValue": "${ownerId}"
      }
    }
  ]
}
```

### 4. **Version Your Configurations**

Include version information for tracking:

```json
{
  "metadata": {
    "version": "1.2.0",
    "tags": ["production", "v1.2"]
  }
}
```

### 5. **Test Configurations**

Validate your configuration before deployment:

```typescript
try {
  const config = ConfigLoader.getInstance().loadFromObject(myConfig);
  console.log('Configuration valid!');
} catch (error) {
  console.error('Invalid configuration:', error);
}
```

---

## Troubleshooting

### Configuration Not Loading

**Issue:** Configuration fails to load

**Solution:** Check that all required fields are present:
- `metadata.name`
- At least one `nodeTypes` entry
- At least one `edgeTypes` entry

### Grouping Rules Not Working

**Issue:** Groups not appearing

**Solution:**
1. Verify `enabled: true` in the rule
2. Check that property names match your node metadata
3. Ensure nodes have the required properties

### Icons Not Displaying

**Issue:** Custom icons not showing

**Solution:**
1. Use valid SVG path data in `iconPath`
2. Ensure `icon: "custom"` when using custom paths
3. Check that built-in icon names are correct

---

## Migration Guide

### From Hard-Coded to Config-Driven

**Before:**
```typescript
// Hard-coded in component
const nodeColor = node.type === 'device' ? '#072B56' : '#0072ff';
```

**After:**
```json
{
  "nodeTypes": {
    "device": { "color": "#072B56" },
    "other": { "color": "#0072ff" }
  }
}
```

---

## Support

For questions or issues:
- Check example configurations in `examples/configs/`
- Review JSON schema in `examples/schemas/topology-config.schema.json`
- Consult TypeScript types in `src/types/config.ts`
