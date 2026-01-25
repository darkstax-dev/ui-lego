import { useDroppable } from '@dnd-kit/core';
import { K8sNodeData, K8sResourceCategory } from '../../types';
import { KubernetesIconWrapper } from '../ui/KubernetesIconWrapper';
import { HierarchicalNodeGroup } from './HierarchicalNodeGroup';
import { useUIStore } from '../../store/uiStore';
import { useTopologyStore } from '../../store/topologyStore';

interface HierarchicalLaneProps {
  category: K8sResourceCategory;
  label: string;
  nodes: K8sNodeData[];
  height: number | 'auto';
}

export function HierarchicalLane({ category, label, nodes, height }: HierarchicalLaneProps) {
  const { setSelectedNode, openMetadataPanel } = useUIStore();
  const { groups, toggleGroupCollapse } = useTopologyStore();
  const { setNodeRef, isOver } = useDroppable({
    id: `lane-${category}`,
    data: { category }
  });

  const laneHeight = typeof height === 'number' ? `${height}px` : height;

  // Organize nodes into parent-child hierarchy
  const organizeHierarchy = () => {
    const parentNodes: K8sNodeData[] = [];
    const childNodesByParent = new Map<string, K8sNodeData[]>();
    const standaloneNodes: K8sNodeData[] = [];

    // Find groups for this category's nodes
    const relevantGroups = groups.filter(group => {
      const ownerNode = nodes.find(n => n.id === group.ownerId);
      return ownerNode !== undefined;
    });

    // Build parent-child map from groups
    relevantGroups.forEach(group => {
      const parentNode = nodes.find(n => n.id === group.ownerId);
      if (parentNode) {
        parentNodes.push(parentNode);
        const children = nodes.filter(n => group.memberIds.includes(n.id));
        childNodesByParent.set(group.ownerId, children);
      }
    });

    // Find standalone nodes (not parents, not children)
    const allChildIds = new Set<string>();
    childNodesByParent.forEach(children => {
      children.forEach(child => allChildIds.add(child.id));
    });
    const parentIds = new Set(parentNodes.map(n => n.id));

    nodes.forEach(node => {
      if (!parentIds.has(node.id) && !allChildIds.has(node.id)) {
        standaloneNodes.push(node);
      }
    });

    return { parentNodes, childNodesByParent, standaloneNodes };
  };

  const { parentNodes, childNodesByParent, standaloneNodes } = organizeHierarchy();

  return (
    <div
      className="flex flex-col bg-gray-200 mb-2"
      style={{ minHeight: laneHeight }}
      data-testid={`lane-${category}`}
    >
      {/* Lane Label */}
      <div className="h-[40px] bg-gray-300 flex items-center px-4 border-b border-gray-400">
        <div className="text-blue-dark-950 font-macan text-base font-medium leading-tight">
          {label}
        </div>
      </div>

      {/* Lane Content */}
      <div
        ref={setNodeRef}
        data-testid={`lane-drop-${category}`}
        className={`flex-1 p-4 relative transition-colors ${
          isOver ? 'bg-blue-100 border-2 border-blue-500 border-dashed' : ''
        }`}
      >
        {nodes.length === 0 ? (
          <div className="h-full flex items-center justify-center text-gray-500 font-macan text-sm">
            Drop {category} resources here
          </div>
        ) : (
          <div className="flex flex-wrap gap-8">
            {/* Render parent nodes with their children */}
            {parentNodes.map((parentNode) => (
              (() => {
                const group = groups.find((g) => g.ownerId === parentNode.id);

                return (
                  <HierarchicalNodeGroup
                    key={parentNode.id}
                    parentNode={parentNode}
                    childNodes={childNodesByParent.get(parentNode.id) || []}
                    collapsed={!!group?.collapsed}
                    onToggleCollapse={
                      group ? () => toggleGroupCollapse(group.id) : undefined
                    }
                  />
                );
              })()
            ))}
            
            {/* Render standalone nodes */}
            {standaloneNodes.map((node) => (
              <div
                key={node.id}
                data-node-id={node.id}
                className="cursor-pointer transition-transform hover:scale-105"
                onClick={() => {
                  setSelectedNode(node);
                  openMetadataPanel(node);
                }}
              >
                <KubernetesIconWrapper
                  type={node.type}
                  status={node.status}
                  label={node.label}
                  showIndicator={!!node.indicatorCount}
                  indicatorCount={node.indicatorCount}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
