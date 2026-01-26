import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Maximize2,
  Minimize2,
} from 'lucide-react';
import type { K8sNodeData, K8sNodeGroup } from '../../types';
import { GroupController } from '../controls/GroupController';
import { useUIStore } from '../../store/uiStore';
import { useTopologyStore } from '../../store/topologyStore';
import { filterNodes } from '../../lib/filterNodes';
import { kubernetesTopologyScenario } from '../../data/k8sTopologyScenario';
import { buildGroupsFromRules, hierarchyConfig } from '../../hierarchyConfig';
import { applyCircularLayout, applyOwnershipTreeLayout } from '../../lib/layouts/flextreeLayout';
import { KubernetesIconWrapper } from '../ui/KubernetesIconWrapper';

const DEFAULT_GROUP_SIZE = 4;
const DEFAULT_MAX_EXPAND_SIZE = 8;

function NodeTile({ node, onClick }: { node: K8sNodeData; onClick: (node: K8sNodeData) => void }) {
  return (
    <div
      data-node-id={node.id}
      className="cursor-pointer transition-transform hover:scale-105"
      onClick={() => onClick(node)}
    >
      <KubernetesIconWrapper
        type={node.type}
        status={node.status}
        label={node.label}
        showIndicator={!!node.indicatorCount}
        indicatorCount={node.indicatorCount}
      />
    </div>
  );
}

function TypeCluster({
  clusterKey,
  nodeType,
  nodes,
  onNodeClick,
  groupSize = DEFAULT_GROUP_SIZE,
  maxExpandSize = DEFAULT_MAX_EXPAND_SIZE,
}: {
  clusterKey: string;
  nodeType: string;
  nodes: K8sNodeData[];
  onNodeClick: (node: K8sNodeData) => void;
  groupSize?: number;
  maxExpandSize?: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const [offset, setOffset] = useState(0);
  const [fullSize, setFullSize] = useState(false);

  const hasPaging = nodes.length > groupSize;
  const canShowFullToggle = nodes.length > maxExpandSize;

  const visibleNodes = useMemo(() => {
    if (!expanded) return [];
    if (!hasPaging) return nodes;
    if (fullSize) return nodes;
    return nodes.slice(offset, offset + groupSize);
  }, [expanded, fullSize, hasPaging, nodes, offset, groupSize]);

  const canPageLeft = offset > 0;
  const canPageRight = offset + groupSize < nodes.length;

  return (
    <div className="inline-flex flex-col gap-2" data-testid={`type-cluster-${clusterKey}`}
    >
      <button
        className="inline-flex items-center gap-2 rounded bg-white/70 border border-gray-400/40 px-2 py-1 hover:bg-white transition-colors"
        onClick={() => {
          setExpanded((v) => !v);
          setOffset(0);
          setFullSize(false);
        }}
        type="button"
      >
        {expanded ? (
          <ChevronDown className="w-4 h-4 text-blue-dark-950" />
        ) : (
          <ChevronRight className="w-4 h-4 text-blue-dark-950" />
        )}
        <span className="text-xs font-macan text-blue-dark-950 truncate max-w-[180px]">
          {nodeType}(s)
        </span>
        <span className="text-[10px] text-gray-600">{nodes.length}</span>
      </button>

      {expanded && (
        <div className="flex flex-col gap-2">
          {hasPaging && !fullSize && (
            <div className="flex items-center gap-1">
              <button
                className="w-6 h-6 flex items-center justify-center rounded bg-white/70 border border-gray-400/40 disabled:opacity-40"
                onClick={() => setOffset(0)}
                disabled={!canPageLeft}
                type="button"
                aria-label="First"
              >
                <ChevronsLeft className="w-4 h-4 text-blue-dark-950" />
              </button>
              <button
                className="w-6 h-6 flex items-center justify-center rounded bg-white/70 border border-gray-400/40 disabled:opacity-40"
                onClick={() => setOffset((v) => Math.max(0, v - groupSize))}
                disabled={!canPageLeft}
                type="button"
                aria-label="Previous"
              >
                <ChevronLeft className="w-4 h-4 text-blue-dark-950" />
              </button>
              <button
                className="w-6 h-6 flex items-center justify-center rounded bg-white/70 border border-gray-400/40 disabled:opacity-40"
                onClick={() => setOffset((v) => Math.min(nodes.length - groupSize, v + groupSize))}
                disabled={!canPageRight}
                type="button"
                aria-label="Next"
              >
                <ChevronRight className="w-4 h-4 text-blue-dark-950" />
              </button>
              <button
                className="w-6 h-6 flex items-center justify-center rounded bg-white/70 border border-gray-400/40 disabled:opacity-40"
                onClick={() => setOffset(Math.max(0, nodes.length - groupSize))}
                disabled={!canPageRight}
                type="button"
                aria-label="Last"
              >
                <ChevronsRight className="w-4 h-4 text-blue-dark-950" />
              </button>

              {canShowFullToggle && (
                <button
                  className="ml-2 w-6 h-6 flex items-center justify-center rounded bg-white/70 border border-gray-400/40"
                  onClick={() => setFullSize(true)}
                  type="button"
                  aria-label="Show all"
                >
                  <Maximize2 className="w-4 h-4 text-blue-dark-950" />
                </button>
              )}
            </div>
          )}

          {fullSize && canShowFullToggle && (
            <div className="flex items-center gap-2">
              <button
                className="w-6 h-6 flex items-center justify-center rounded bg-white/70 border border-gray-400/40"
                onClick={() => {
                  setFullSize(false);
                  setOffset(0);
                }}
                type="button"
                aria-label="Show paged"
              >
                <Minimize2 className="w-4 h-4 text-blue-dark-950" />
              </button>
              <div className="text-[10px] text-gray-600 font-macan">Showing all</div>
            </div>
          )}

          <div className="flex flex-wrap gap-4">
            {visibleNodes.map((node) => (
              <NodeTile key={node.id} node={node} onClick={onNodeClick} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function buildGroupTree(groups: K8sNodeGroup[]) {
  const byId = new Map<string, K8sNodeGroup>();
  const byOwnerId = new Map<string, K8sNodeGroup>();
  const memberToGroups = new Map<string, K8sNodeGroup[]>();

  for (const group of groups) {
    byId.set(group.id, group);
    byOwnerId.set(group.ownerId, group);
    for (const memberId of group.memberIds) {
      const list = memberToGroups.get(memberId) || [];
      list.push(group);
      memberToGroups.set(memberId, list);
    }
  }

  const parentByGroupId = new Map<string, string>();

  for (const group of groups) {
    const candidates = (memberToGroups.get(group.ownerId) || []).filter((g) => g.level < group.level);
    if (candidates.length === 0) continue;
    candidates.sort((a, b) => b.level - a.level);
    parentByGroupId.set(group.id, candidates[0].id);
  }

  const childrenByGroupId = new Map<string, K8sNodeGroup[]>();
  for (const group of groups) {
    const parentId = parentByGroupId.get(group.id);
    if (!parentId) continue;
    const list = childrenByGroupId.get(parentId) || [];
    list.push(group);
    childrenByGroupId.set(parentId, list);
  }

  childrenByGroupId.forEach((list) => {
    list.sort((a, b) => a.level - b.level || a.ownerId.localeCompare(b.ownerId));
  });

  const rootGroups = groups
    .filter((g) => !parentByGroupId.has(g.id))
    .slice()
    .sort((a, b) => a.level - b.level || a.ownerId.localeCompare(b.ownerId));

  return { byId, byOwnerId, parentByGroupId, childrenByGroupId, rootGroups };
}

export function TopologyCanvas() {
  const { filters, openMetadataPanel, setSelectedNode, layoutMode } = useUIStore();
  const { nodes, groups, setNodes, setGroups, toggleGroupCollapse } = useTopologyStore();
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const [connectionPaths, setConnectionPaths] = useState<Array<{ id: string; d: string }>>([]);
  const [contextMenu, setContextMenu] = useState<null | { x: number; y: number; nodeId: string }>(null);

  useEffect(() => {
    const scenarioGroups =
      kubernetesTopologyScenario.groups ??
      buildGroupsFromRules(kubernetesTopologyScenario.nodes, hierarchyConfig.groupingRules);

    setNodes(kubernetesTopologyScenario.nodes);
    setGroups(scenarioGroups);
  }, [setNodes, setGroups]);

  const isHiddenByCollapsedGroup = useMemo(() => {
    const collapsedGroups = groups.filter((g) => g.collapsed);
    return (nodeId: string) => collapsedGroups.some((g) => g.memberIds.includes(nodeId));
  }, [groups]);

  const filteredNodes = useMemo(() => {
    if (filters.length === 0) return nodes;

    const activeQueries = filters.filter((f) => f.active).map((f) => f.query);
    if (activeQueries.length === 0) return nodes;

    return activeQueries.reduce((acc, query) => {
      return filterNodes(acc, query);
    }, nodes);
  }, [nodes, filters]);

  const renderedNodes = useMemo(() => {
    return filteredNodes.filter((n) => !isHiddenByCollapsedGroup(n.id));
  }, [filteredNodes, isHiddenByCollapsedGroup]);

  const layoutNodes = useMemo(() => {
    if (layoutMode === 'tree') {
      return applyOwnershipTreeLayout(renderedNodes, groups, { nodeWidth: 120, nodeHeight: 80, spacing: 60 });
    }
    if (layoutMode === 'force') {
      return applyCircularLayout(renderedNodes);
    }
    return renderedNodes;
  }, [layoutMode, renderedNodes, groups]);

  const layoutBounds = useMemo(() => {
    if (layoutMode === 'hierarchy') return null;
    const positions = layoutNodes
      .map((node) => node.position)
      .filter((pos): pos is { x: number; y: number } => !!pos);
    if (positions.length === 0) return null;

    const padding = 120;
    const xs = positions.map((pos) => pos.x);
    const ys = positions.map((pos) => pos.y);
    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);
    const minY = Math.min(...ys);
    const maxY = Math.max(...ys);

    return {
      width: maxX - minX + padding * 2,
      height: maxY - minY + padding * 2,
      offsetX: minX - padding,
      offsetY: minY - padding,
    };
  }, [layoutMode, layoutNodes]);

  const nodeById = useMemo(() => {
    return new Map(filteredNodes.map((n) => [n.id, n] as const));
  }, [filteredNodes]);

  const groupTree = useMemo(() => buildGroupTree(groups), [groups]);

  const groupedNodeIds = useMemo(() => {
    const ids = new Set<string>();
    groups.forEach((g) => {
      ids.add(g.ownerId);
      g.memberIds.forEach((id) => ids.add(id));
    });
    return ids;
  }, [groups]);

  const ungroupedNodes = useMemo(() => {
    return filteredNodes.filter((node) => !groupedNodeIds.has(node.id));
  }, [filteredNodes, groupedNodeIds]);

  const computeConnections = () => {
    const svgEl = svgRef.current;
    const containerEl = scrollRef.current;
    if (!svgEl || !containerEl) return;

    const svgRect = svgEl.getBoundingClientRect();

    const getCenter = (id: string) => {
      const el = containerEl.querySelector(`[data-node-id="${CSS.escape(id)}"]`) as HTMLElement | null;
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return {
        x: r.left - svgRect.left + r.width / 2,
        y: r.top - svgRect.top + r.height / 2,
      };
    };

    const renderedIds = new Set(layoutNodes.map((n) => n.id));
    const paths: Array<{ id: string; d: string }> = [];

    layoutNodes.forEach((node) => {
      if (!node.connections) return;
      const from = getCenter(node.id);
      if (!from) return;

      node.connections.forEach((targetId) => {
        if (!renderedIds.has(targetId)) return;
        const to = getCenter(targetId);
        if (!to) return;

        const dx = to.x - from.x;
        const curvature = 0.35;
        const cx1 = from.x + dx * curvature;
        const cy1 = from.y;
        const cx2 = to.x - dx * curvature;
        const cy2 = to.y;

        paths.push({
          id: `${node.id}-${targetId}`,
          d: `M ${from.x} ${from.y} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${to.x} ${to.y}`,
        });
      });
    });

    setConnectionPaths(paths);
  };

  useLayoutEffect(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }
    rafRef.current = requestAnimationFrame(() => {
      computeConnections();
    });

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [layoutNodes, groups, filters]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onContextMenu = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const nodeEl = target.closest('[data-node-id]') as HTMLElement | null;
      const nodeId = nodeEl?.getAttribute('data-node-id');
      if (!nodeId) return;

      e.preventDefault();
      e.stopPropagation();

      const r = el.getBoundingClientRect();
      setContextMenu({
        x: e.clientX - r.left + el.scrollLeft,
        y: e.clientY - r.top + el.scrollTop,
        nodeId,
      });
    };

    const onGlobalPointerDown = () => {
      setContextMenu(null);
    };

    const onKeyDown = (ev: KeyboardEvent) => {
      if (ev.key === 'Escape') {
        setContextMenu(null);
      }
    };

    const onScroll = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        computeConnections();
      });
    };

    const onResize = () => {
      computeConnections();
    };

    el.addEventListener('scroll', onScroll, { passive: true });
    el.addEventListener('contextmenu', onContextMenu);
    window.addEventListener('pointerdown', onGlobalPointerDown);
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('resize', onResize);

    return () => {
      el.removeEventListener('scroll', onScroll);
      el.removeEventListener('contextmenu', onContextMenu);
      window.removeEventListener('pointerdown', onGlobalPointerDown);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  const onNodeClick = (node: K8sNodeData) => {
    setSelectedNode(node);
    openMetadataPanel(node);
  };

  const renderGroup = (group: K8sNodeGroup, depth: number) => {
    const ownerNode = nodeById.get(group.ownerId);
    if (!ownerNode) return null;

    const childGroups = groupTree.childrenByGroupId.get(group.id) || [];

    const leafNodes = group.memberIds
      .filter((id) => !groupTree.byOwnerId.has(id))
      .filter((id) => !isHiddenByCollapsedGroup(id))
      .map((id) => nodeById.get(id))
      .filter((node): node is K8sNodeData => !!node);

    const leafNodesByType = leafNodes.reduce((acc, node) => {
      const list = acc.get(node.type) || [];
      list.push(node);
      acc.set(node.type, list);
      return acc;
    }, new Map<string, K8sNodeData[]>());

    return (
      <div
        key={group.id}
        className="rounded-lg border border-gray-400/40 bg-white/70"
        style={{
          padding: '12px',
          marginLeft: depth === 0 ? 0 : 18,
        }}
        data-testid={`hierarchy-group-${group.id}`}
      >
        <div className="flex items-center gap-2">
          {group.memberIds.length > 0 && (
            <button
              className="flex-shrink-0 w-6 h-6 flex items-center justify-center bg-gray-200 hover:bg-gray-300 transition-colors rounded"
              onClick={(e) => {
                e.stopPropagation();
                toggleGroupCollapse(group.id);
              }}
              aria-label={group.collapsed ? 'Expand' : 'Collapse'}
              type="button"
            >
              {group.collapsed ? (
                <ChevronRight className="w-4 h-4 text-blue-dark-950" />
              ) : (
                <ChevronDown className="w-4 h-4 text-blue-dark-950" />
              )}
            </button>
          )}

          <NodeTile node={ownerNode} onClick={onNodeClick} />

          <div className="text-[10px] text-gray-600 font-macan">
            {group.memberIds.length}m{group.collapsed && ' ✓'}
          </div>
        </div>

        {!group.collapsed && (childGroups.length > 0 || leafNodes.length > 0) && (
          <div className="mt-4 flex flex-col gap-4">
            {childGroups.length > 0 && (
              <div className="flex flex-wrap gap-6">
                {childGroups.map((child) => renderGroup(child, depth + 1))}
              </div>
            )}

            {leafNodes.length > 0 && (
              <div className="flex flex-wrap gap-6">
                {Array.from(leafNodesByType.entries()).flatMap(([type, nodesForType]) => {
                  if (nodesForType.length > DEFAULT_GROUP_SIZE) {
                    return [
                      <TypeCluster
                        key={`${group.id}:${type}`}
                        clusterKey={`${group.id}:${type}`}
                        nodeType={type}
                        nodes={nodesForType}
                        onNodeClick={onNodeClick}
                      />,
                    ];
                  }

                  return nodesForType.map((node) => <NodeTile key={node.id} node={node} onClick={onNodeClick} />);
                })}
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  const hierarchyRoots = useMemo(() => {
    // Prefer level 0 roots (e.g. namespaces). If none exist, fall back to whatever roots we have.
    const rootsWithOwner = groupTree.rootGroups.filter((g) => nodeById.has(g.ownerId));
    const level0 = rootsWithOwner.filter((g) => g.level === 0);
    return level0.length > 0 ? level0 : rootsWithOwner;
  }, [groupTree.rootGroups, nodeById]);

  return (
    <div ref={scrollRef} className="w-full h-full relative overflow-auto">
      <GroupController />

      <div className="w-full min-h-full bg-gray-300 relative p-5 pt-5">
        <div
          className="absolute inset-0 pointer-events-none opacity-25"
          style={{
            backgroundImage: `radial-gradient(circle, #00112B 1px, transparent 1px)`,
            backgroundSize: '28.53px 26px',
            backgroundPosition: '0 0',
          }}
        />

        <svg
          ref={svgRef}
          className="absolute inset-0 pointer-events-none"
          width="100%"
          height="100%"
          style={{ overflow: 'visible' }}
          data-testid="connection-layer"
        >
          {connectionPaths.map((p) => (
            <path
              key={p.id}
              d={p.d}
              fill="none"
              stroke="#00112B"
              strokeWidth="1"
              strokeDasharray="6 6"
              opacity="0.4"
            />
          ))}
        </svg>

        {layoutMode === 'hierarchy' ? (
          <div className="relative z-10 flex flex-col gap-8">
            <div className="flex flex-wrap gap-8">
              {hierarchyRoots.map((group) => renderGroup(group, 0))}
            </div>

            {ungroupedNodes.length > 0 && (
              <div className="rounded-lg border border-gray-400/40 bg-white/60 p-4">
                <div className="text-xs font-macan font-semibold text-blue-dark-950 mb-3">Ungrouped</div>
                <div className="flex flex-wrap gap-6">
                  {ungroupedNodes
                    .filter((n) => !isHiddenByCollapsedGroup(n.id))
                    .map((node) => (
                      <NodeTile key={node.id} node={node} onClick={onNodeClick} />
                    ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div
            className="relative z-10"
            style={{
              minHeight: layoutBounds?.height,
              minWidth: layoutBounds?.width,
            }}
          >
            {layoutNodes.map((node) => (
              <div
                key={node.id}
                data-node-id={node.id}
                className="absolute cursor-pointer transition-transform hover:scale-105"
                style={{
                  left: (node.position?.x ?? 0) - (layoutBounds?.offsetX ?? 0),
                  top: (node.position?.y ?? 0) - (layoutBounds?.offsetY ?? 0),
                }}
                onClick={() => onNodeClick(node)}
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

        {contextMenu && (
          <div
            className="absolute z-30 bg-white border border-gray-300 rounded shadow-lg py-1 min-w-[180px]"
            style={{ left: contextMenu.x, top: contextMenu.y }}
            onPointerDown={(e) => e.stopPropagation()}
          >
            <button
              className="w-full text-left px-3 py-2 text-sm font-macan text-blue-dark-950 hover:bg-gray-100"
              onClick={() => {
                const node = nodeById.get(contextMenu.nodeId);
                if (node) {
                  onNodeClick(node);
                }
                setContextMenu(null);
              }}
            >
              Open details
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
