import type React from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { K8sNodeData } from '../../types';
import { KubernetesIconWrapper } from '../ui/KubernetesIconWrapper';
import { useUIStore } from '../../store/uiStore';

interface HierarchicalNodeGroupProps {
  parentNode: K8sNodeData;
  childNodes: K8sNodeData[];
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}

export function HierarchicalNodeGroup({ parentNode, childNodes, collapsed = false, onToggleCollapse }: HierarchicalNodeGroupProps) {
  const { setSelectedNode, openMetadataPanel } = useUIStore();

  const aggregatedChildCount = childNodes.length;

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleCollapse?.();
  };

  const handleParentClick = () => {
    setSelectedNode(parentNode);
    openMetadataPanel(parentNode);
  };

  const handleChildClick = (node: K8sNodeData) => {
    setSelectedNode(node);
    openMetadataPanel(node);
  };

  return (
    <div className="inline-grid grid-cols-[24px_auto] gap-x-2 gap-y-6">
      {/* Collapse/Expand Button */}
      <div className="row-start-1 col-start-1 flex items-center justify-center">
        {childNodes.length > 0 && (
          <button
            onClick={handleToggle}
            className="flex-shrink-0 w-6 h-6 flex items-center justify-center bg-gray-200 hover:bg-gray-300 transition-colors rounded"
            aria-label={collapsed ? 'Expand' : 'Collapse'}
          >
            {collapsed ? (
              <ChevronRight className="w-4 h-4 text-blue-dark-950" />
            ) : (
              <ChevronDown className="w-4 h-4 text-blue-dark-950" />
            )}
          </button>
        )}
      </div>

      {/* Parent Node */}
      <div className="row-start-1 col-start-2 flex justify-center">
        <div
          data-node-id={parentNode.id}
          className="cursor-pointer transition-transform hover:scale-105"
          onClick={handleParentClick}
          onDoubleClick={(e) => {
            e.stopPropagation();
            onToggleCollapse?.();
          }}
        >
          <KubernetesIconWrapper
            type={parentNode.type}
            status={parentNode.status}
            label={parentNode.label}
            showIndicator={!!parentNode.indicatorCount}
            indicatorCount={parentNode.indicatorCount}
          />
        </div>
      </div>

      {/* Child Nodes */}
      {!collapsed && childNodes.length > 0 && (
        <div className="row-start-2 col-start-2 flex flex-wrap justify-center gap-4">
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
                showIndicator={!!childNode.indicatorCount}
                indicatorCount={childNode.indicatorCount}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
