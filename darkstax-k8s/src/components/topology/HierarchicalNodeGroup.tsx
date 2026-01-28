import type { MouseEvent } from 'react';
import { K8sNodeData } from '../../types';
import { KubernetesIconWrapper } from '../ui/KubernetesIconWrapper';
import { useUIStore } from '../../store/uiStore';

interface HierarchicalNodeGroupProps {
  parentNode: K8sNodeData;
  childNodes: K8sNodeData[];
  /** Total members in the underlying group (may span lanes). */
  memberCount?: number;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
  onParentClick?: (node: K8sNodeData) => void;
  onParentDoubleClick?: (node: K8sNodeData) => void;
}

export function HierarchicalNodeGroup({
  parentNode,
  childNodes,
  memberCount,
  collapsed = true,
  onToggleCollapse,
  onParentClick,
  onParentDoubleClick,
}: HierarchicalNodeGroupProps) {
  const { setSelectedNode } = useUIStore();

  const aggregatedChildCount = memberCount ?? childNodes.length;

  const handleParentClick = (e: MouseEvent) => {
    e.stopPropagation();

    if (onParentClick) {
      onParentClick(parentNode);
    } else {
      setSelectedNode(parentNode);
    }

    if (onToggleCollapse && aggregatedChildCount > 0) {
      onToggleCollapse();
    }
  };

  const handleChildClick = (node: K8sNodeData) => {
    setSelectedNode(node);
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
