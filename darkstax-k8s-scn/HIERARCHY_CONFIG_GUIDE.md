# Kubernetes Hierarchy Configuration Guide

## Overview

The Kubernetes topology canvas now uses a **configurable JSON-based hierarchy system** to define how resources are displayed, grouped, and organized. This allows for flexible customization of the visual hierarchy without code changes.

## Configuration Files

### Primary Configuration
- **Location**: `src/config/kubernetes-hierarchy.json`
- **Schema**: `src/schemas/hierarchy-config.schema.json`
- **Types**: `src/types/hierarchy.ts`

## Configuration Structure

### 1. Metadata
Basic information about the configuration:

```json
{
  "metadata": {
    "name": "Kubernetes Resource Hierarchy",
    "description": "Hierarchical display configuration",
    "version": "1.0.0",
    "author": "DarkStax",
    "tags": ["kubernetes", "k8s", "hierarchy"]
  }
}
```

### 2. Hierarchy Levels

Defines the vertical hierarchy of resources (0 = top level):

```json
{
  "hierarchyLevels": [
    {
      "level": 0,
      "name": "Cluster & Namespace",
      "resourceTypes": ["namespace"],
      "canContain": ["deployment", "statefulset", "service", ...]
    },
    {
      "level": 1,
      "name": "Workload Controllers",
      "resourceTypes": ["deployment", "statefulset", "job"],
      "canContain": ["pod"]
    },
    {
      "level": 2,
      "name": "Pods",
      "resourceTypes": ["pod"],
      "canContain": []
    }
  ]
}
```

**Key Properties:**
- `level`: Numeric hierarchy level (0 = top)
- `resourceTypes`: K8s resource types at this level
- `canContain`: Which resource types can be children
- `displayOrder`: Visual ordering preference

### 3. Categories (Lanes)

Defines horizontal swim lanes for organizing resources:

```json
{
  "categories": [
    {
      "id": "load",
      "label": "Load",
      "description": "Workload resources",
      "resourceTypes": ["deployment", "statefulset", "job", "pod"],
      "laneConfig": {
        "display": true,
        "height": 200,
        "order": 1
      },
      "color": "#326CE5",
      "icon": "cpu"
    }
  ]
}
```

**Category Types:**
- `aggregate`: Namespaces (not displayed as lane)
- `load`: Workloads (deployments, pods, etc.)
- `service`: Services and ingress
- `network`: Advanced networking (Multus)
- `config-storage`: ConfigMaps, Secrets, PVCs, PVs

### 4. Grouping Rules

Defines how resources are grouped hierarchically:

```json
{
  "groupingRules": [
    {
      "id": "group-by-namespace",
      "name": "Group by Namespace",
      "enabled": true,
      "priority": 1,
      "criteria": {
        "type": "property-match",
        "ownerProperty": "Type",
        "ownerValue": "namespace",
        "memberProperty": "Namespace",
        "memberValue": "${ownerId}"
      },
      "hierarchyLevel": 0,
      "collapsible": true,
      "defaultCollapsed": false,
      "style": {
        "fillColor": "rgba(78, 205, 196, 0.05)",
        "strokeColor": "rgba(78, 205, 196, 0.4)",
        "strokeWidth": 2,
        "strokeDashArray": "10, 5",
        "borderRadius": 30,
        "padding": 40
      }
    }
  ]
}
```

**Criteria Types:**
- `property-match`: Match based on metadata properties
- `pattern-match`: Match based on regex patterns
- `manual`: Manually defined groups

**Variable Substitution:**
- `${ownerId}`: Replaced with the owner node's ID

### 5. Relationship Rules

Defines connections between resource types:

```json
{
  "relationshipRules": [
    {
      "id": "deployment-manages-pods",
      "name": "Deployment Manages Pods",
      "sourceType": "deployment",
      "targetTypes": ["pod"],
      "relationship": "manages",
      "matchProperty": "Owner",
      "displayConnection": true,
      "connectionStyle": {
        "color": "rgba(255, 107, 107, 0.4)",
        "width": 2,
        "style": "dashed",
        "dashArray": "5, 5"
      }
    }
  ]
}
```

**Relationship Types:**
- `contains`: Namespace → Resources
- `manages`: Controller → Pods
- `routes`: Service/Ingress → Pods
- `uses`: Pod → ConfigMap/Secret
- `mounts`: Pod → PVC
- `binds`: PVC → PV

### 6. Display Rules

General display configuration:

```json
{
  "displayRules": {
    "showEmptyLanes": true,
    "autoCollapseDepth": null,
    "nodeSpacing": {
      "horizontal": 32,
      "vertical": 24,
      "groupPadding": 40
    },
    "labelDisplay": {
      "showLabels": true,
      "truncateLength": 20,
      "position": "bottom"
    },
    "indicatorDisplay": {
      "showContainerCount": true,
      "showStatusIndicator": true,
      "position": "top-right"
    }
  }
}
```

### 7. Interaction Rules

User interaction configuration:

```json
{
  "interactionRules": {
    "allowDragDrop": true,
    "allowCollapse": true,
    "allowExpand": true,
    "contextMenuEnabled": true,
    "doubleClickAction": "expand-collapse",
    "selectionMode": "single"
  }
}
```

## Visual Hierarchy

```
┌─────────────────────────────────────────────────────────┐
│ Namespace (Level 0)                                     │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ Deployment (Level 1)                                │ │
│ │ ┌──────┐  ┌──────┐  ┌──────┐                       │ │
│ │ │ Pod  │  │ Pod  │  │ Pod  │  (Level 2)            │ │
│ │ └──────┘  └──────┘  └──────┘                       │ │
│ └─────────────────────────────────────────────────────┘ │
│                                                         │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ StatefulSet (Level 1)                               │ │
│ │ ┌──────┐  ┌──────┐                                 │ │
│ │ │ Pod  │  │ Pod  │  (Level 2)                      │ │
│ │ └──────┘  └──────┘                                 │ │
│ └─────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

## Usage in Code

### Loading Configuration

```typescript
import { hierarchyConfig, getLaneCategories, buildGroupsFromRules } from '../../lib/hierarchyConfig';

// Get lane categories for display
const laneCategories = getLaneCategories(hierarchyConfig);

// Build groups from rules
const groups = buildGroupsFromRules(nodes, hierarchyConfig.groupingRules);
```

### Utility Functions

```typescript
// Get category for a resource type
const category = getCategoryForResourceType('pod', hierarchyConfig);

// Check if resource is collapsible
const isCollapsible = isResourceCollapsible('deployment', hierarchyConfig);

// Get hierarchy level
const level = getHierarchyLevelForResource('namespace', hierarchyConfig);

// Check containment rules
const canContain = canResourceContain('namespace', 'deployment', hierarchyConfig);
```

## Customization Examples

### Adding a New Resource Type

1. Add to `hierarchyLevels`:
```json
{
  "level": 1,
  "resourceTypes": ["daemonset"],
  "canContain": ["pod"]
}
```

2. Add to appropriate `category`:
```json
{
  "id": "load",
  "resourceTypes": ["deployment", "statefulset", "daemonset", "pod"]
}
```

3. Add grouping rule:
```json
{
  "id": "group-by-daemonset",
  "criteria": {
    "ownerValue": "daemonset",
    "memberProperty": "Owner"
  }
}
```

### Changing Lane Order

Modify the `order` property in `laneConfig`:

```json
{
  "id": "service",
  "laneConfig": {
    "order": 1  // Move to first position
  }
}
```

### Customizing Group Styles

Modify the `style` object in grouping rules:

```json
{
  "style": {
    "fillColor": "rgba(100, 200, 255, 0.1)",
    "strokeColor": "#64C8FF",
    "strokeWidth": 3,
    "borderRadius": 15,
    "padding": 50
  }
}
```

## Benefits

1. **No Code Changes**: Modify hierarchy without touching TypeScript
2. **Reusable**: Same config can be used across different views
3. **Validated**: JSON schema ensures correctness
4. **Extensible**: Easy to add new resource types
5. **Maintainable**: Centralized configuration
6. **Type-Safe**: Full TypeScript support

## Files Modified

- `src/config/kubernetes-hierarchy.json` - Main configuration
- `src/schemas/hierarchy-config.schema.json` - JSON schema
- `src/types/hierarchy.ts` - TypeScript types
- `src/lib/hierarchyConfig.ts` - Configuration utilities
- `src/components/topology/TopologyCanvas.tsx` - Uses configuration

## Future Enhancements

- [ ] Support for custom node renderers
- [ ] Dynamic rule evaluation
- [ ] Multiple configuration profiles
- [ ] Visual configuration editor
- [ ] Export/import configurations
- [ ] Configuration validation UI
