/**
 * Kubernetes Lane Example Viewer
 * 
 * This component demonstrates the lane-based topology visualization
 * using the example data. It can be used to validate that the rendering
 * matches the Figma design specifications.
 * 
 * Usage:
 *   import { K8sLaneExampleViewer } from './examples/K8sLaneExampleViewer';
 *   <K8sLaneExampleViewer />
 */

import { useEffect, useMemo } from 'react';
import { HierarchicalLane } from '../components/topology/HierarchicalLane';
import { useUIStore } from '../store/uiStore';
import { useTopologyStore } from '../store/topologyStore';
import { 
  k8sLaneExampleTopology, 
  getK8sLaneExampleGroups, 
  getK8sLaneCategories,
  validateTopologyData,
  runExample 
} from './kubernetes-topology-lane-example';

export function K8sLaneExampleViewer() {
  const { detailLanesExpanded } = useUIStore();
  const { setNodes, setGroups } = useTopologyStore();

  // Initialize example data
  useEffect(() => {
    // Validate data before using
    const validation = validateTopologyData(k8sLaneExampleTopology);
    
    if (!validation.valid) {
      console.error('❌ Topology data validation failed:', validation.errors);
      return;
    }

    if (validation.warnings.length > 0) {
      console.warn('⚠️ Topology data warnings:', validation.warnings);
    }

    // Set nodes and groups in the store
    setNodes(k8sLaneExampleTopology);
    setGroups(getK8sLaneExampleGroups());

    // Run example validation in console
    console.log('🚀 Running K8s Lane Example...');
    runExample();
  }, [setNodes, setGroups]);

  // Get lane categories from hierarchy config
  const laneCategories = useMemo(() => {
    return getK8sLaneCategories();
  }, []);

  // Group nodes by category for lane rendering
  const nodesByCategory = useMemo(() => {
    const grouped: Record<string, typeof k8sLaneExampleTopology> = {};
    
    laneCategories.forEach(lane => {
      grouped[lane.id] = k8sLaneExampleTopology.filter(
        node => node.category === lane.id
      );
    });
    
    return grouped;
  }, [laneCategories]);

  return (
    <div className="w-full h-full overflow-auto bg-gray-300">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-white border-b border-gray-300 px-6 py-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-macan font-semibold text-blue-dark-950">
              Kubernetes Topology - Lane Example
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Demonstrates lane-based visualization matching Figma design
            </p>
          </div>
          <div className="flex gap-2">
            <div className="px-3 py-1 rounded-full bg-green-100 text-green-800 text-xs font-medium">
              {k8sLaneExampleTopology.filter(n => n.status === 'active').length} Active
            </div>
            <div className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 text-xs font-medium">
              {k8sLaneExampleTopology.filter(n => n.status === 'deploying').length} Deploying
            </div>
            <div className="px-3 py-1 rounded-full bg-red-100 text-red-800 text-xs font-medium">
              {k8sLaneExampleTopology.filter(n => n.status === 'error').length} Error
            </div>
          </div>
        </div>
      </div>

      {/* Canvas with lanes */}
      <div className="p-6">
        <div
          className="relative"
          style={{
            backgroundImage: `radial-gradient(circle, #00112B 1px, transparent 1px)`,
            backgroundSize: '28.53px 26px',
            backgroundPosition: '0 0',
          }}
        >
          <div className="relative z-10">
            {laneCategories.map((lane) => {
              if (lane.id !== 'aggregate' && !detailLanesExpanded) {
                return null;
              }

              const nodesInLane = nodesByCategory[lane.id] || [];

              // Skip lanes with no nodes for cleaner display
              if (nodesInLane.length === 0) {
                return null;
              }

              return (
                <HierarchicalLane
                  key={lane.id}
                  category={lane.id as any}
                  label={lane.label}
                  nodes={nodesInLane}
                  height={lane.height}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="fixed bottom-6 right-6 bg-white rounded-lg shadow-lg border border-gray-200 p-4 max-w-sm">
        <h3 className="text-sm font-macan font-semibold text-blue-dark-950 mb-3">
          Status Legend
        </h3>
        <div className="space-y-2 text-xs">
          <div className="flex items-center gap-2">
            <div 
              className="w-4 h-4 rounded" 
              style={{ backgroundColor: 'rgba(16, 133, 65, 0.3)', border: '2px solid #108541' }}
            />
            <span>Active / Ready</span>
          </div>
          <div className="flex items-center gap-2">
            <div 
              className="w-4 h-4 rounded" 
              style={{ backgroundColor: 'rgba(237, 139, 48, 0.3)', border: '2px solid #ED8B30' }}
            />
            <span>Deploying / Warning</span>
          </div>
          <div className="flex items-center gap-2">
            <div 
              className="w-4 h-4 rounded" 
              style={{ backgroundColor: 'rgba(182, 38, 31, 0.3)', border: '2px solid #B6261F' }}
            />
            <span>Error / Failed</span>
          </div>
          <div className="flex items-center gap-2">
            <div 
              className="w-4 h-4 rounded" 
              style={{ backgroundColor: 'rgba(0, 17, 43, 0.3)', border: '2px solid #00112B' }}
            />
            <span>Default / Unknown</span>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-gray-200">
          <h4 className="text-xs font-semibold text-gray-700 mb-2">Figma Design Features:</h4>
          <ul className="text-xs text-gray-600 space-y-1">
            <li>✓ Vertical rotated lane labels</li>
            <li>✓ Hexagonal node backgrounds</li>
            <li>✓ Backdrop blur effect</li>
            <li>✓ Status-based stroke colors</li>
            <li>✓ Horizontal node arrangement</li>
            <li>✓ Hierarchy-based grouping</li>
          </ul>
        </div>
      </div>

      {/* Debug Info (can be removed in production) */}
      <div className="fixed bottom-6 left-6 bg-white rounded-lg shadow-lg border border-gray-200 p-4 max-w-xs text-xs">
        <h3 className="font-semibold text-blue-dark-950 mb-2">Debug Info</h3>
        <div className="space-y-1 text-gray-600">
          <div>Total Nodes: {k8sLaneExampleTopology.length}</div>
          <div>Total Groups: {getK8sLaneExampleGroups().length}</div>
          <div>Lanes: {laneCategories.length}</div>
          <div className="pt-2 mt-2 border-t border-gray-200">
            Open browser console to see validation results
          </div>
        </div>
      </div>
    </div>
  );
}

export default K8sLaneExampleViewer;
