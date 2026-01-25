import { useMemo, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { HierarchicalLane } from './HierarchicalLane';
import { GroupController } from '../controls/GroupController';
import { useUIStore } from '../../store/uiStore';
import { useTopologyStore } from '../../store/topologyStore';
import { filterNodes } from '../../lib/filterNodes';
import { skydiveTopology } from '../../data/skydiveTopology';
import { parseSkydiveSyncReply } from '../../lib/skydive/graphParser';
import { applyCircularLayout, applyFlextreeLayout, applyOwnershipTreeLayout } from '../../lib/layouts/flextreeLayout';
import { KubernetesIconWrapper } from '../ui/KubernetesIconWrapper';
import { hierarchyConfig, getLaneCategories } from '../../hierarchyConfig';


export function TopologyCanvas() {
  const { filters, openMetadataPanel, setSelectedNode, layoutMode } = useUIStore();
  const { nodes, groups, setNodes, setGroups } = useTopologyStore();
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const [connectionPaths, setConnectionPaths] = useState<Array<{ id: string; d: string }>>([]);
  const [contextMenu, setContextMenu] = useState<null | { x: number; y: number; nodeId: string }>(null);

  useEffect(() => {
    const { nodes: parsedNodes, groups: parsedGroups } = parseSkydiveSyncReply(skydiveTopology);
    setNodes(parsedNodes);
    setGroups(parsedGroups);
  }, [setNodes, setGroups]);

  const isHiddenByCollapsedGroup = useMemo(() => {
    const collapsedGroups = groups.filter((g) => g.collapsed);
    return (nodeId: string) => collapsedGroups.some((g) => g.memberIds.includes(nodeId));
  }, [groups]);

  const filteredNodes = useMemo(() => {
    if (filters.length === 0) return nodes;
    
    const activeQueries = filters.filter(f => f.active).map(f => f.query);
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
  }, [layoutMode, renderedNodes]);

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

  const laneCategories: Array<{ id: string; label: string; height: number | 'auto' }> = [
    { id: 'aggregate', label: 'Namespaces', height: 'auto' as const },
    { id: 'load', label: 'Load', height: 200 },
    { id: 'service', label: 'Service', height: 200 },
    { id: 'network', label: 'Network', height: 200 },
    { id: 'config-storage', label: 'Config and Storage', height: 'auto' as const },
  ];

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
          d: `M ${from.x} ${from.y} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${to.x} ${to.y}`
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

  return (
    <div ref={scrollRef} className="w-full h-full relative overflow-auto">
      {/* Group Controller */}
      <GroupController />
      
      {/* Canvas with dotted grid background */}
      <div className="w-full min-h-full bg-gray-300 relative p-5 pt-5">
        {/* Dotted Grid Background */}
        <div
          className="absolute inset-0 pointer-events-none opacity-25"
          style={{
            backgroundImage: `radial-gradient(circle, #00112B 1px, transparent 1px)`,
            backgroundSize: '28.53px 26px',
            backgroundPosition: '0 0',
          }}
        />

        {/* Connection Lines Overlay */}
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

        {/* Hierarchical Lanes */}
        {layoutMode === 'hierarchy' ? (
          <div className="relative z-10 flex flex-col">
            {laneCategories.map((lane) => (
              <HierarchicalLane
                key={lane.id}
                category={lane.id as any}
                label={lane.label}
                nodes={filteredNodes.filter(n => n.category === lane.id)}
                height={lane.height}
              />
            ))}
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

        <div className="absolute bottom-6 right-6 flex flex-col gap-2 z-20">
          <button className="px-4 h-10 rounded-full bg-blue-700 text-white text-sm font-macan shadow hover:bg-blue-600">
            infrastructure
          </button>
          <button className="px-4 h-10 rounded-full bg-blue-700 text-white text-sm font-macan shadow hover:bg-blue-600">
            kubernetes
          </button>
        </div>

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
                  setSelectedNode(node);
                  openMetadataPanel(node);
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
