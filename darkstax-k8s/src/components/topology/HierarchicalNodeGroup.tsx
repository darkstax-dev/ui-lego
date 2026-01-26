import type React from 'react';
import { K8sNodeData } from '../../types';
import { KubernetesIconWrapper } from '../ui/KubernetesIconWrapper';
import { useUIStore } from '../../store/uiStore';
import { useTopologyStore } from '../../store/topologyStore';

interface HierarchicalNodeGroupProps {
  parentNode: K8sNodeData;
  childNodes: K8sNodeData[];
  collapsed?: boolean;
  onToggleCollapse?: () => void;
  onParentClick?: (node: K8sNodeData) => void;
  onParentDoubleClick?: (node: K8sNodeData) => void;
}

export function HierarchicalNodeGroup({
  parentNode,
  childNodes,
  collapsed = false,
  onToggleCollapse,
  onParentClick,
  onParentDoubleClick,
}: HierarchicalNodeGroupProps) {
  const { setSelectedNode, openMetadataPanel } = useUIStore();
  const { nodes } = useTopologyStore();

  const aggregatedChildCount = childNodes.length;

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleCollapse?.();
  };

  const handleParentClick = () => {
    if (onParentClick) {
      onParentClick(parentNode);
      return;
    }

    if (parentNode.id === 'dc-01') {
      const productionNode = nodes.find((n) => n.id === 'ns-production');
      if (productionNode) {
        setSelectedNode(productionNode);
        openMetadataPanel(productionNode);
        return;
      }
    }

    setSelectedNode(parentNode);
    openMetadataPanel(parentNode);
  };

  const handleChildClick = (node: K8sNodeData) => {
    setSelectedNode(node);
    openMetadataPanel(node);
  };

  return (
    <div className="inline-grid grid-cols-1 gap-y-6 justify-items-center">
      {/* Parent Node */}
      <div
        data-node-id={parentNode.id}
        className="cursor-pointer transition-transform hover:scale-105"
        onClick={handleParentClick}
        onDoubleClick={(e) => {
          e.stopPropagation();
          onParentDoubleClick?.(parentNode);
        }}
      >
        <KubernetesIconWrapper
          type={parentNode.type}
          status={parentNode.status}
          label={parentNode.label}
          showIndicator={aggregatedChildCount > 0}
          indicatorCount={aggregatedChildCount}
        />
      </div>

      {/* Child Nodes */}
      {!collapsed && childNodes.length > 0 && (
        <div className="flex flex-wrap justify-center gap-4">
          {childNodes.map((childNode) => (
            <div
              key={childNode.id}
              data-node-id={childNode.id}
              className="cursor-pointer transition-transform hover:scale-105"
              onClick={() => handleChildClick(childNode)}
            >
              <KubernetesIconWrapper
                type={childNode.type}
                status={childNode.status}
                label={childNode.label}
                showIndicator={false}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
