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
import { useUIStore } from '../../store/uiStore';
import { useTopologyStore } from '../../store/topologyStore';
import { filterNodes } from '../../lib/filterNodes';
import { kubernetesAggregateWorkloadsScenario } from '../../data/k8sTopologyScenario';
import { buildGroupsFromRules, hierarchyConfig, getLaneCategories } from '../../hierarchyConfig';
import { applyCircularLayout, applyOwnershipTreeLayout } from '../../lib/layouts/flextreeLayout';
import { KubernetesIconWrapper } from '../ui/KubernetesIconWrapper';
import { HierarchicalLane } from './HierarchicalLane';

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
  const {
    filters,
    openMetadataPanel,
    setSelectedNode,
    selectedNode,
    layoutMode,
    detailLanesExpanded,
    focusAggregateId,
  } = useUIStore();
  const { nodes, groups, setNodes, setGroups, toggleGroupCollapse } = useTopologyStore();
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const [connectionPaths, setConnectionPaths] = useState<
    Array<{ id: string; d: string; fromId: string; toId: string }>
  >([]);
  const [contextMenu, setContextMenu] = useState<null | { x: number; y: number; nodeId: string }>(null);

  useEffect(() => {
    const scenarioGroups =
      kubernetesAggregateWorkloadsScenario.groups ??
      buildGroupsFromRules(kubernetesAggregateWorkloadsScenario.nodes, hierarchyConfig.groupingRules);

    setNodes(kubernetesAggregateWorkloadsScenario.nodes);
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

    // In lane-based hierarchy mode, DOM visibility is controlled by lane paging + group expansion.
    // We still scope to the current "focus" subset so we don't try to render connections for thousands of hidden nodes.
    if (layoutMode === 'hierarchy') {
      if (!hierarchyVisibleNodeIds) return filteredNodes;
      return filteredNodes.filter((node) => hierarchyVisibleNodeIds.has(node.id));
    }

    return renderedNodes;
  }, [filteredNodes, hierarchyVisibleNodeIds, layoutMode, renderedNodes, groups]);

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

  const focusedNodeIds = useMemo(() => {
    if (!focusAggregateId) return null;

    const focused = new Set<string>();
    focused.add(focusAggregateId);

    const focusNode = nodeById.get(focusAggregateId);
    if (focusNode?.connections) {
      for (const targetId of focusNode.connections) {
        const target = nodeById.get(targetId);
        if (target?.category === 'aggregate') {
          focused.add(targetId);
        }
      }
    }

    const visitedOwners = new Set<string>();
    const queue: string[] = [focusAggregateId];

    while (queue.length > 0) {
      const ownerId = queue.shift();
      if (!ownerId) continue;
      if (visitedOwners.has(ownerId)) continue;
      visitedOwners.add(ownerId);

      const group = groupTree.byOwnerId.get(ownerId);
      if (!group) continue;

      for (const memberId of group.memberIds) {
        if (focused.has(memberId)) continue;
        focused.add(memberId);
        if (groupTree.byOwnerId.has(memberId)) {
          queue.push(memberId);
        }
      }
    }

    return focused;
  }, [focusAggregateId, groupTree.byOwnerId, nodeById]);

  const hierarchyVisibleNodeIds = useMemo(() => {
    if (layoutMode !== 'hierarchy') return null;

    if (focusAggregateId && focusedNodeIds) {
      return focusedNodeIds;
    }

    return new Set(filteredNodes.filter((n) => n.category === 'aggregate').map((n) => n.id));
  }, [filteredNodes, focusAggregateId, focusedNodeIds, layoutMode]);

  const computeConnections = () => {
    const svgEl = svgRef.current;
    const containerEl = scrollRef.current;
    if (!svgEl || !containerEl) return;

    const svgRect = svgEl.getBoundingClientRect();

    const getNodeEl = (id: string) => {
      return containerEl.querySelector(`[data-node-id="${CSS.escape(id)}"]`) as HTMLElement | null;
    };


    const getAnchor = (id: string, anchor: 'center' | 'top' | 'bottom') => {
      const el = getNodeEl(id);
      const r = el?.getBoundingClientRect();
      if (!el || !r) return null;

      // Default to the whole node tile.
      let anchorRect = r;

      // For "bottom" anchor, prefer the label itself so the line originates
      // from the label's bottom-center (when present).
      if (anchor === 'bottom') {
        const labelEl = el.querySelector('[data-anchor="node-label"]') as HTMLElement | null;
        if (labelEl) {
          anchorRect = labelEl.getBoundingClientRect();
        }
      }

      const x = anchorRect.left - svgRect.left + anchorRect.width / 2;
      const yBase = anchorRect.top - svgRect.top;

      if (anchor === 'top') {
        return { x, y: yBase };
      }

      if (anchor === 'bottom') {
        return { x, y: yBase + anchorRect.height };
      }

      return { x, y: yBase + anchorRect.height / 2 };
    };

    const renderedIds = new Set(layoutNodes.map((n) => n.id));
    const paths: Array<{ id: string; d: string; fromId: string; toId: string }> = [];

    // In lane-based hierarchy mode, draw:
    // 1) ownership (group parent -> child) connections
    // 2) lane-adjacent connections (load -> service -> network -> config/storage)
    // 3) aggregate peer connections (aggregate <-> aggregate)
    if (layoutMode === 'hierarchy') {
      const seen = new Set<string>();

      const categoryOrder = new Map(
        hierarchyConfig.categories.map((cat) => [cat.id, cat.laneConfig.order ?? 0] as const)
      );
      const getCategoryOrder = (category: K8sNodeData['category']) => categoryOrder.get(category) ?? 0;

      const workloadControllerTypes = new Set(['deployment', 'statefulset', 'job']);
      const isWorkloadController = (node: K8sNodeData) => workloadControllerTypes.has(node.type);

      const pushVerticalCurve = (fromId: string, toId: string, key: string) => {
        const from = getAnchor(fromId, 'bottom');
        const to = getAnchor(toId, 'top');
        if (!from || !to) return;

        const dy = to.y - from.y;
        const curvature = 0.5;
        const cx1 = from.x;
        const cy1 = from.y + dy * curvature;
        const cx2 = to.x;
        const cy2 = to.y - dy * curvature;

        paths.push({
          id: key,
          fromId,
          toId,
          d: `M ${from.x} ${from.y} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${to.x} ${to.y}`,
        });
      };

      groups.forEach((group) => {
        if (!renderedIds.has(group.ownerId)) return;

        const owner = nodeById.get(group.ownerId);
        if (!owner) return;

        // Aggregate groups should connect to workload controllers first (not directly to every child)
        // so the flow goes: aggregate -> workload -> pods -> service -> network -> config/storage.
        const hasWorkloadControllers =
          owner.category === 'aggregate'
            ? group.memberIds.some((memberId) => {
                const member = nodeById.get(memberId);
                return member ? isWorkloadController(member) : false;
              })
            : false;

        group.memberIds.forEach((memberId) => {
          if (!renderedIds.has(memberId)) return;
          const member = nodeById.get(memberId);
          if (!member) return;

          if (owner.category === 'aggregate') {
            if (hasWorkloadControllers) {
              if (!isWorkloadController(member)) return;
            } else {
              if (member.category !== 'load') return;
            }
          }

          const key = `${group.ownerId}->${memberId}`;
          if (seen.has(key)) return;
          seen.add(key);

          pushVerticalCurve(group.ownerId, memberId, key);
        });
      });

      // Lane-adjacent connections for non-aggregate nodes.
      layoutNodes.forEach((node) => {
        if (node.category === 'aggregate') return;
        if (!node.connections) return;
        if (!renderedIds.has(node.id)) return;

        node.connections.forEach((targetId) => {
          if (!renderedIds.has(targetId)) return;
          const target = nodeById.get(targetId);
          if (!target) return;
          if (target.category === 'aggregate') return;
          if (node.category === target.category) return;

          const orderA = getCategoryOrder(node.category);
          const orderB = getCategoryOrder(target.category);

          // Allow connections to span multiple lanes (e.g. pod -> multus, pod -> configmap).
          // We still draw as a simple vertical curve between the two lane positions.
          if (orderA === orderB) return;

          const fromId = orderA < orderB ? node.id : targetId;
          const toId = orderA < orderB ? targetId : node.id;

          const key = `lane:${fromId}->${toId}`;
          if (seen.has(key)) return;
          seen.add(key);

          pushVerticalCurve(fromId, toId, key);
        });
      });

      // Aggregate peer connections (and optional aggregate -> workload controller links from raw graph connections).
      layoutNodes.forEach((node) => {
        if (node.category !== 'aggregate') return;
        if (!node.connections) return;
        if (!renderedIds.has(node.id)) return;

        node.connections.forEach((targetId) => {
          if (!renderedIds.has(targetId)) return;
          const target = nodeById.get(targetId);
          if (!target) return;

          if (target.category === 'aggregate') {
            const key = `peer:${[node.id, targetId].sort().join('<->')}`;
            if (seen.has(key)) return;
            seen.add(key);

            const from = getAnchor(node.id, 'center');
            const to = getAnchor(targetId, 'center');
            if (!from || !to) return;

            const dx = to.x - from.x;
            const curvature = 0.35;
            const cx1 = from.x + dx * curvature;
            const cy1 = from.y;
            const cx2 = to.x - dx * curvature;
            const cy2 = to.y;

            paths.push({
              id: key,
              fromId: node.id,
              toId: targetId,
              d: `M ${from.x} ${from.y} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${to.x} ${to.y}`,
            });

            return;
          }

          // Keep aggregate->workload controller as a fallback (in case ownership grouping isn't present)
          // but avoid connecting aggregates directly to services/network/config-storage.
          if (!isWorkloadController(target)) return;

          const key = `${node.id}->${targetId}`;
          if (seen.has(key)) return;
          seen.add(key);

          pushVerticalCurve(node.id, targetId, key);
        });
      });

      setConnectionPaths(paths);
      return;
    }

    // In other layout modes, draw the graph connections from node.connections
    layoutNodes.forEach((node) => {
      if (!node.connections) return;
      const from = getAnchor(node.id, 'center');
      if (!from) return;

      node.connections.forEach((targetId) => {
        if (!renderedIds.has(targetId)) return;
        const to = getAnchor(targetId, 'center');
        if (!to) return;

        const dx = to.x - from.x;
        const curvature = 0.35;
        const cx1 = from.x + dx * curvature;
        const cy1 = from.y;
        const cx2 = to.x - dx * curvature;
        const cy2 = to.y;

        paths.push({
          id: `${node.id}-${targetId}`,
          fromId: node.id,
          toId: targetId,
          d: `M ${from.x} ${from.y} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${to.x} ${to.y}`,
        });
      });
    });

    setConnectionPaths(paths);
  };

  const computeConnectionsRef = useRef(computeConnections);
  useEffect(() => {
    computeConnectionsRef.current = computeConnections;
  });

  useLayoutEffect(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }
    rafRef.current = requestAnimationFrame(() => {
      computeConnectionsRef.current();
    });

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [layoutNodes, groups, filters, layoutMode, detailLanesExpanded]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    // Lane paging swaps out node elements without changing TopologyCanvas props/state.
    // Observe DOM changes so connection paths are recalculated when the visible node set changes.
    const mutationObserver = new MutationObserver(() => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        computeConnectionsRef.current();
      });
    });

    mutationObserver.observe(el, { childList: true, subtree: true });

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
        computeConnectionsRef.current();
      });
    };

    const onResize = () => {
      computeConnectionsRef.current();
    };

    el.addEventListener('scroll', onScroll, { passive: true });
    el.addEventListener('contextmenu', onContextMenu);
    window.addEventListener('pointerdown', onGlobalPointerDown);
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('resize', onResize);

    return () => {
      mutationObserver.disconnect();
      el.removeEventListener('scroll', onScroll);
      el.removeEventListener('contextmenu', onContextMenu);
      window.removeEventListener('pointerdown', onGlobalPointerDown);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  const onNodeClick = (node: K8sNodeData) => {
    if (node.id === 'dc-01') {
      const productionNode = nodes.find((n) => n.id === 'ns-production');
      if (productionNode) {
        setSelectedNode(productionNode);
        openMetadataPanel(productionNode);
        return;
      }
    }

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


  const laneCategories = useMemo(() => {
    return getLaneCategories(hierarchyConfig);
  }, []);

  const nodesByCategory = useMemo(() => {
    const grouped: Record<string, K8sNodeData[]> = {};

    const baseNodes =
      layoutMode === 'hierarchy' && hierarchyVisibleNodeIds
        ? filteredNodes.filter((node) => hierarchyVisibleNodeIds.has(node.id))
        : filteredNodes;

    laneCategories.forEach((lane) => {
      grouped[lane.id] = baseNodes.filter((node) => node.category === lane.id);
    });

    return grouped;
  }, [filteredNodes, hierarchyVisibleNodeIds, laneCategories, layoutMode]);

  return (
    <div ref={scrollRef} className="w-full h-full relative overflow-auto">
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
          className="absolute inset-0 pointer-events-none z-20"
          width="100%"
          height="100%"
          style={{ overflow: 'visible' }}
          data-testid="connection-layer"
        >
          {(selectedNode
            ? connectionPaths.filter((p) => p.fromId === selectedNode.id || p.toId === selectedNode.id)
            : []
          ).map((p) => (
            <path
              key={p.id}
              d={p.d}
              fill="none"
              stroke="#00112B"
              strokeWidth="2"
              strokeDasharray="8 4"
              opacity="0.8"
            />
          ))}
        </svg>

        {layoutMode === 'hierarchy' ? (
          <div className="relative z-10 flex flex-col">
            {laneCategories.map((lane) => {
              // Overview mode: aggregate lane only.
              if (lane.id !== 'aggregate' && !focusAggregateId) {
                return null;
              }

              // Focus mode: detail lanes controlled by the expanded flag.
              if (lane.id !== 'aggregate' && !detailLanesExpanded) {
                return null;
              }

              const nodesInLane = nodesByCategory[lane.id] || [];

              // Skip lanes with no nodes unless configured to show empty lanes
              if (nodesInLane.length === 0 && !hierarchyConfig.displayRules?.showEmptyLanes) {
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
