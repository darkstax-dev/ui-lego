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
  const { setSelectedNode } = useUIStore();
  const { groups, toggleGroupCollapse } = useTopologyStore();
  const { setNodeRef, isOver } = useDroppable({
    id: `lane-${category}`,
    data: { category }
  });

  const HEIGHT_BUMP_PX = 6;
  const heightBumpCategories: K8sResourceCategory[] = ['load', 'service', 'network', 'storage', 'config'];
  const shouldBumpLaneHeight = heightBumpCategories.includes(category);

  const laneMinHeight =
    typeof height === 'number'
      ? `${height + (shouldBumpLaneHeight ? HEIGHT_BUMP_PX : 0)}px`
      : height;

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
      className="flex flex-row"
      style={{
        minHeight: laneMinHeight,
        padding: '4px',
        paddingBottom: shouldBumpLaneHeight && height === 'auto' ? `${4 + HEIGHT_BUMP_PX}px` : undefined,
        gap: '10px',
        alignSelf: 'stretch',
        background: 'var(--surface-card)',
        marginBottom: '4px'
      }}
      data-testid={`lane-${category}`}
    >
      {/* Vertical Rotated Lane Label */}
      <div
        style={{
          display: 'flex',
          width: '29px',
          padding: '4px 6px',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '10px',
          flexShrink: 0,
          alignSelf: 'stretch',
          background: 'var(--nav-secondary-bg)'
        }}
      >
        <div
          style={{
            transform: 'rotate(-90deg)',
            color: 'var(--text-blue-main)',
            textAlign: 'center',
            fontFamily: 'Macan, -apple-system, Roboto, Helvetica, sans-serif',
            fontSize: '24px',
            fontWeight: 500,
            lineHeight: '120%',
            letterSpacing: '-0.48px',
            whiteSpace: 'nowrap'
          }}
        >
          {label}
        </div>
      </div>

      {/* Lane Content */}
      <div
        ref={setNodeRef}
        data-testid={`lane-drop-${category}`}
        className={`relative transition-colors ${
          isOver ? 'bg-blue-100 border-2 border-blue-500 border-dashed' : ''
        }`}
        style={{
          flex: 1,
          padding: '16px'
        }}
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
                onClick={() => setSelectedNode(node)}
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
