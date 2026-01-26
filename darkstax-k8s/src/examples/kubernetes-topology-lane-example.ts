/**
 * Kubernetes Topology Lane Example
 * 
 * This file demonstrates how to structure Kubernetes topology data for lane-based
 * visualization. It validates that data is correctly rendered according to the
 * hierarchy configuration defined in kubernetes-hierarchy.json.
 * 
 * The lane layout follows the Figma design:
 * - Vertical rotated labels on the left
 * - Hexagonal node backgrounds with backdrop blur
 * - Horizontal arrangement within lanes
 * - Status-based coloring (green, yellow, red, dark blue)
 * - Proper grouping based on hierarchy rules
 */

import { K8sNodeData, K8sNodeGroup } from '../types';
import { hierarchyConfig, getLaneCategories, buildGroupsFromRules } from '../hierarchyConfig';

/**
 * Example topology data representing a simple Kubernetes workload
 * as shown in the Figma design
 */
export const k8sLaneExampleTopology: K8sNodeData[] = [
  ...Array.from({ length: 50 }, (_, index) => {
    const n = index + 1;
    const id = `dc-${String(n).padStart(2, '0')}`;
    return {
      id,
      type: 'datacenter',
      label: `DC${String(n).padStart(2, '0')}`,
      category: 'aggregate',
      metadata: {
        Type: 'datacenter',
        Name: id,
        Description: 'Aggregate datacenter',
        ...(n > 10 ? { ParentAggregate: n <= 30 ? 'dc-01' : 'dc-02' } : {}),
      },
      status: 'active',
      connections: n <= 5 ? [`tower-${String(n).padStart(2, '0')}`] : [],
    };
  }),
  ...Array.from({ length: 50 }, (_, index) => {
    const n = index + 1;
    const id = `tower-${String(n).padStart(2, '0')}`;
    return {
      id,
      type: 'mobiletower',
      label: `Tower${String(n).padStart(2, '0')}`,
      category: 'aggregate',
      metadata: {
        Type: 'mobiletower',
        Name: id,
        Description: 'Aggregate mobile tower',
        ...(n <= 30 ? { ParentAggregate: 'dc-01' } : { ParentAggregate: 'dc-02' }),
      },
      status: 'active',
      connections: n <= 5 ? [`dc-${String(n).padStart(2, '0')}`] : [],
    };
  }),

  // Namespace
  {
    id: 'ns-workload-example',
    type: 'namespace',
    label: 'ns',
    category: 'aggregate',
    metadata: {
      Type: 'namespace',
      Name: 'workload-example',
      Description: 'Example workload namespace matching Figma design'
    },
    status: 'active'
  },

  // Pod 1 (standalone, no deployment parent - matches "pod1" in Figma)
  {
    id: 'pod-standalone-1',
    type: 'pod',
    label: 'pod1',
    category: 'load',
    metadata: {
      Type: 'pod',
      Name: 'pod1',
      Namespace: 'ns-workload-example',
      Status: 'Running',
      IP: '10.244.1.10',
      Node: 'worker-node-1',
      Containers: ['app-container']
    },
    status: 'active',
    connections: []
  },

  // Deployment with multiple pods (matches "pod1" with indicator "2" in Figma)
  {
    id: 'deploy-app',
    type: 'deployment',
    label: 'app-deployment',
    category: 'load',
    metadata: {
      Type: 'deployment',
      Name: 'app-deployment',
      Namespace: 'ns-workload-example',
      Replicas: 2,
      Strategy: 'RollingUpdate',
      Labels: {
        app: 'web-app'
      }
    },
    status: 'active',
    connections: []
  },

  // Pod 2a (part of deployment - active)
  {
    id: 'pod-app-1',
    type: 'pod',
    label: 'app-pod-1',
    category: 'load',
    metadata: {
      Type: 'pod',
      Name: 'app-pod-1',
      Namespace: 'ns-workload-example',
      Owner: 'deploy-app',
      Status: 'Running',
      IP: '10.244.1.20',
      Node: 'worker-node-1',
      Containers: ['web-app', 'sidecar']
    },
    status: 'active',
    indicatorCount: 2,
    connections: []
  },

  // Pod 2b (part of deployment - active)
  {
    id: 'pod-app-2',
    type: 'pod',
    label: 'app-pod-2',
    category: 'load',
    metadata: {
      Type: 'pod',
      Name: 'app-pod-2',
      Namespace: 'ns-workload-example',
      Owner: 'deploy-app',
      Status: 'Running',
      IP: '10.244.1.21',
      Node: 'worker-node-2',
      Containers: ['web-app', 'sidecar']
    },
    status: 'active',
    indicatorCount: 2,
    connections: []
  },

  // RDF Pod (matches "rdfpod" in Figma with yellow/warning status)
  {
    id: 'pod-rdf',
    type: 'pod',
    label: 'rdfpod',
    category: 'load',
    metadata: {
      Type: 'pod',
      Name: 'rdfpod',
      Namespace: 'ns-workload-example',
      Status: 'Pending',
      IP: '10.244.1.30',
      Node: 'worker-node-1',
      Containers: ['rdf-processor']
    },
    status: 'deploying', // This will show yellow/warning color
    connections: []
  },

  // AZ Pod (matches "az-pod" in Figma with red/error status)
  {
    id: 'pod-az',
    type: 'pod',
    label: 'az-pod',
    category: 'load',
    metadata: {
      Type: 'pod',
      Name: 'az-pod',
      Namespace: 'ns-workload-example',
      Status: 'Error',
      IP: '10.244.1.40',
      Node: 'worker-node-2',
      Containers: ['az-service']
    },
    status: 'error', // This will show red/error color
    connections: []
  },

  // Deployment (matches "azrdf-deployment" in Figma)
  {
    id: 'deploy-azrdf',
    type: 'deployment',
    label: 'azrdf-deployment',
    category: 'load',
    metadata: {
      Type: 'deployment',
      Name: 'azrdf-deployment',
      Namespace: 'ns-workload-example',
      Replicas: 1,
      Strategy: 'Recreate',
      Labels: {
        app: 'azrdf-service'
      }
    },
    status: 'active',
    connections: []
  }
];

/**
 * Build groups based on the hierarchy rules defined in kubernetes-hierarchy.json
 * This demonstrates how namespaces group their resources and deployments group their pods
 */
export function getK8sLaneExampleGroups(): K8sNodeGroup[] {
  return buildGroupsFromRules(k8sLaneExampleTopology, hierarchyConfig.groupingRules);
}

/**
 * Get lane categories for rendering
 * This uses the hierarchy configuration to determine which lanes to display
 */
export function getK8sLaneCategories() {
  return getLaneCategories(hierarchyConfig);
}

/**
 * Helper function to validate the topology data structure
 * Ensures all required fields are present and properly typed
 */
export function validateTopologyData(nodes: K8sNodeData[]): {
  valid: boolean;
  errors: string[];
  warnings: string[];
} {
  const errors: string[] = [];
  const warnings: string[] = [];

  nodes.forEach((node, index) => {
    // Required fields validation
    if (!node.id) errors.push(`Node at index ${index}: Missing required field 'id'`);
    if (!node.type) errors.push(`Node ${node.id || index}: Missing required field 'type'`);
    if (!node.label) warnings.push(`Node ${node.id || index}: Missing recommended field 'label'`);
    if (!node.category) errors.push(`Node ${node.id || index}: Missing required field 'category'`);
    if (!node.metadata) errors.push(`Node ${node.id || index}: Missing required field 'metadata'`);

    // Metadata validation
    if (node.metadata) {
      if (!node.metadata.Type) errors.push(`Node ${node.id}: metadata.Type is required`);
      if (!node.metadata.Name) errors.push(`Node ${node.id}: metadata.Name is required`);
    }

    // Category validation
    const validCategories = ['load', 'service', 'network', 'config-storage', 'aggregate'];
    if (node.category && !validCategories.includes(node.category)) {
      errors.push(`Node ${node.id}: Invalid category '${node.category}'. Must be one of: ${validCategories.join(', ')}`);
    }

    // Status validation
    const validStatuses = ['ready', 'deploying', 'active', 'error', 'terminated'];
    if (node.status && !validStatuses.includes(node.status)) {
      warnings.push(`Node ${node.id}: Unknown status '${node.status}'. Valid statuses: ${validStatuses.join(', ')}`);
    }

    // Connections validation
    if (node.connections) {
      node.connections.forEach(connId => {
        const targetExists = nodes.some(n => n.id === connId);
        if (!targetExists) {
          warnings.push(`Node ${node.id}: Connection target '${connId}' not found in topology`);
        }
      });
    }

    // Indicator count validation
    if (node.indicatorCount !== undefined && node.indicatorCount < 0) {
      warnings.push(`Node ${node.id}: indicatorCount should be non-negative`);
    }
  });

  return {
    valid: errors.length === 0,
    errors,
    warnings
  };
}

/**
 * Helper function to get nodes by lane category
 * Useful for testing lane-specific rendering
 */
export function getNodesByCategory(nodes: K8sNodeData[], category: string): K8sNodeData[] {
  return nodes.filter(node => node.category === category);
}

/**
 * Helper function to get status color mapping
 * Maps status to the colors defined in the Figma design
 */
export function getStatusColor(status?: string): { stroke: string; fill: string } {
  const statusColors = {
    'active': { stroke: '#108541', fill: 'rgba(16, 133, 65, 0.2)' },      // Green
    'deploying': { stroke: '#ED8B30', fill: 'rgba(237, 139, 48, 0.2)' },  // Yellow/Orange
    'error': { stroke: '#B6261F', fill: 'rgba(182, 38, 31, 0.2)' },       // Red
    'ready': { stroke: '#108541', fill: 'rgba(16, 133, 65, 0.2)' },       // Green
    'terminated': { stroke: '#868D97', fill: 'rgba(134, 141, 151, 0.2)' }, // Gray
    'default': { stroke: '#00112B', fill: 'rgba(0, 17, 43, 0.2)' }        // Dark blue
  };

  return statusColors[status || 'default'] || statusColors.default;
}

/**
 * Example usage and validation
 */
export function runExample() {
  console.log('=== Kubernetes Topology Lane Example ===\n');

  // Validate the topology data
  const validation = validateTopologyData(k8sLaneExampleTopology);
  console.log('Validation Results:');
  console.log(`Valid: ${validation.valid}`);
  
  if (validation.errors.length > 0) {
    console.log('\nErrors:');
    validation.errors.forEach(err => console.log(`  ❌ ${err}`));
  }
  
  if (validation.warnings.length > 0) {
    console.log('\nWarnings:');
    validation.warnings.forEach(warn => console.log(`  ⚠️  ${warn}`));
  }

  // Display lane categories
  const lanes = getK8sLaneCategories();
  console.log('\nLane Categories:');
  lanes.forEach(lane => {
    const nodesInLane = getNodesByCategory(k8sLaneExampleTopology, lane.id);
    console.log(`  📊 ${lane.label} (${lane.id}): ${nodesInLane.length} nodes`);
    nodesInLane.forEach(node => {
      const statusColor = getStatusColor(node.status);
      console.log(`     - ${node.label} [${node.status || 'N/A'}] ${statusColor.stroke}`);
    });
  });

  // Display groups
  const groups = getK8sLaneExampleGroups();
  console.log('\nHierarchy Groups:');
  groups.forEach(group => {
    const owner = k8sLaneExampleTopology.find(n => n.id === group.ownerId);
    console.log(`  🔗 ${owner?.label || group.ownerId}: ${group.memberIds.length} members`);
  });

  console.log('\n=== Example Complete ===');
}

// Export everything for use in the application
export default {
  topology: k8sLaneExampleTopology,
  getGroups: getK8sLaneExampleGroups,
  getLanes: getK8sLaneCategories,
  validate: validateTopologyData,
  runExample
};
