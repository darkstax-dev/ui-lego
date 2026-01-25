# OpenStack Network Topology Example

This example demonstrates how to create a network topology visualization matching the OpenStack network view with grouped namespaces.

## Configuration

The configuration file `configs/openstack-network-view.json` defines:

### Node Types

1. **Bridge** (Settings icon, dark blue)
   - Network bridges like `tap-b42d3dd8`, `vnet_br0_eth1`
   - Central connection points in the topology

2. **Virtual Network Interface** (Lock icon, dark blue)
   - Virtual network interfaces like `vnet_br0_eth1`, `vnet_ovs_br0`
   - Secured network endpoints

3. **TAP Interface** (Link icon, light blue)
   - TAP devices like `tap-c9f7`, `qr-aeafc7ec`
   - Network tap points

4. **Patch Port** (Link icon, light blue)
   - Patch connections like `patch-tun`, `patch-int`
   - Bridge interconnections

5. **Quantum Router Port** (Lock icon, dark blue)
   - Router ports like `qr-dc2e-4bc`, `qr-d41033a9`
   - Routing endpoints

6. **Quantum Gateway Port** (Alert icon, red)
   - Gateway ports with alerts like `qg-ed8ccd45`, `patch-int`
   - Critical gateway points

7. **Network Namespace** (Settings icon, green)
   - Namespaces like `qr-7a83e4-1c`, `qs-aa2e-br`, `tap-b42d3dda`
   - Isolation boundaries (group owners)

### Grouping Rules

Two grouping strategies are configured:

#### 1. Group by Network Namespace
- **Owner:** Nodes with `Type === "namespace"`
- **Members:** Nodes where `Namespace === owner.id`
- **Style:** Light white background with subtle gray border
- **Purpose:** Groups all network components within the same namespace

#### 2. Group by OVS Bridge
- **Owner:** Nodes with `Type === "bridge"`
- **Members:** Nodes where `Bridge === owner.id`
- **Purpose:** Groups interfaces connected to the same bridge

### Visual Theme

Matches the reference image:
- **Background:** Light gray (`#CECECE`)
- **Grid:** Dark blue dots with low opacity
- **Groups:** White/light backgrounds with rounded corners
- **Labels:** Monospace font for technical identifiers

## Usage

### Import and Use the Component

```tsx
import { OpenStackNetworkExample } from './examples/OpenStackNetworkExample';

function App() {
  return <OpenStackNetworkExample />;
}
```

### Load Configuration Programmatically

```typescript
import { useTopologyConfig } from '@/hooks/useTopologyConfig';
import openstackConfig from './configs/openstack-network-view.json';

const { config } = useTopologyConfig(openstackConfig);
```

### Apply Grouping Rules

```typescript
import { GroupingEngine } from '@/lib/config/GroupingEngine';

const engine = new GroupingEngine();
const groups = engine.applyGroupingRules(nodes, config.groupingRules);
```

## Sample Data Structure

Nodes must include metadata for grouping:

```typescript
{
  id: 'qr-aeafc7ec',
  type: 'tap',
  data: {
    label: 'qr-aeafc7ec',
    metadata: {
      Type: 'tap',
      Namespace: 'qr-7a83e4-1c',  // For namespace grouping
      Bridge: 'tap-b42d3dd8',      // For bridge grouping
      Description: 'Router interface'
    }
  },
  position: { x: 200, y: 280 }
}
```

## Key Features Demonstrated

1. **Multi-level Grouping**
   - Namespace-level groups (primary containers)
   - Bridge-level groups (secondary containers)

2. **Icon Differentiation**
   - Settings icons for bridges and namespaces
   - Lock icons for secure interfaces
   - Link icons for network connections
   - Alert icons for critical/warning nodes

3. **Visual Hierarchy**
   - Grouped nodes with rounded containers
   - Subtle backgrounds and borders
   - Clear visual separation

4. **Network Topology Patterns**
   - Hub-and-spoke (bridges as hubs)
   - Namespace isolation
   - Patch connections between bridges

## Customization

### Change Group Styles

Edit `groupingRules` in the config:

```json
{
  "style": {
    "fillColor": "rgba(255, 255, 255, 0.6)",
    "strokeColor": "rgba(100, 116, 139, 0.25)",
    "borderRadius": 25,
    "padding": 40
  }
}
```

### Add New Node Types

Add to `nodeTypes`:

```json
{
  "nodeTypes": {
    "my-custom-type": {
      "label": "Custom Node",
      "icon": "settings",
      "color": "#FF6B6B"
    }
  }
}
```

### Modify Layout

Adjust force-directed layout parameters:

```json
{
  "layout": {
    "forceLayout": {
      "chargeStrength": -1200,
      "linkDistance": 140,
      "collideRadius": 70
    }
  }
}
```

## Matching the Reference Image

The configuration is designed to replicate the visual style shown in the reference:

- ✅ Three distinct grouped regions (namespaces)
- ✅ Light gray background
- ✅ White group containers with rounded corners
- ✅ Proper icon types (settings, lock, link, alert)
- ✅ Appropriate node colors (dark blue, light blue, red)
- ✅ Network connection lines
- ✅ Monospace labels

## Files

- **Config:** `examples/configs/openstack-network-view.json`
- **Sample Data:** `examples/data/openstack-sample-data.ts`
- **Example Component:** `examples/OpenStackNetworkExample.tsx`
- **This Guide:** `examples/README.md`
