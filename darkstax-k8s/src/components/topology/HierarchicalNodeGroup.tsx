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
    <div className="inline-flex flex-col gap-2">
      {/* Parent Node with Collapse/Expand Button */}
      <div className="relative inline-flex items-center gap-2">
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
        <div className="flex flex-wrap gap-4 ml-8">
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
