import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { useDroppable } from '@dnd-kit/core';
import { Minus, Plus } from 'lucide-react';
import { MultiSelect, type MultiSelectOption } from 'ui-lego';
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

const LANE_MAX_ROWS_DEFAULT = 4;
const LANE_MAX_ROWS_COMPACT = 2;
// Approximate visual size of a node tile (icon + label) used to estimate how many fit per row.
const TILE_EST_WIDTH_PX = 96;
const TILE_EST_HEIGHT_PX = 84;
const TILE_GAP_PX_DEFAULT = 32; // gap-8
const TILE_GAP_PX_AGGREGATE = 40; // gap-10

export function HierarchicalLane({ category, label, nodes, height }: HierarchicalLaneProps) {
  const {
    selectedNode,
    setSelectedNode,
    setFocusAggregate,
    clearFocus,
    focusAggregateId,
  } = useUIStore();
  const { groups, toggleGroupCollapse } = useTopologyStore();
  const { setNodeRef, isOver } = useDroppable({
    id: `lane-${category}`,
    data: { category },
  });

  const laneHeight = typeof height === 'number' ? `${height}px` : height;

  const isAggregateLane = category === 'aggregate';

  const laneContentRef = useRef<HTMLDivElement | null>(null);
  const [laneContentWidth, setLaneContentWidth] = useState(0);

  const laneItemsAreaRef = useRef<HTMLDivElement | null>(null);
  const [laneItemsAreaWidth, setLaneItemsAreaWidth] = useState(0);
  const [laneItemsAreaHeight, setLaneItemsAreaHeight] = useState(0);

  const tileMeasureRef = useRef<HTMLDivElement | null>(null);
  const [tileMeasuredWidth, setTileMeasuredWidth] = useState(0);
  const [tileMeasuredHeight, setTileMeasuredHeight] = useState(0);

  const [aggregateFilterValues, setAggregateFilterValues] = useState<MultiSelectOption[]>([]);

  const setLaneContentNodeRef = useCallback(
    (node: HTMLDivElement | null) => {
      setNodeRef(node);
      laneContentRef.current = node;
    },
    [setNodeRef]
  );

  const setLaneItemsAreaNodeRef = useCallback((node: HTMLDivElement | null) => {
    laneItemsAreaRef.current = node;
  }, []);

  const setTileMeasureNodeRef = useCallback((node: HTMLDivElement | null) => {
    tileMeasureRef.current = node;
  }, []);

  useLayoutEffect(() => {
    const el = laneContentRef.current;
    if (!el) return;

    // Set immediately, then keep it up-to-date.
    setLaneContentWidth(el.getBoundingClientRect().width);

    const observer = new ResizeObserver((entries) => {
      const next = entries[0]?.contentRect?.width;
      if (typeof next === 'number') setLaneContentWidth(next);
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, [category]);

  useLayoutEffect(() => {
    const el = laneItemsAreaRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    setLaneItemsAreaWidth(rect.width);
    setLaneItemsAreaHeight(rect.height);

    const observer = new ResizeObserver((entries) => {
      const next = entries[0]?.contentRect;
      if (!next) return;
      setLaneItemsAreaWidth(next.width);
      setLaneItemsAreaHeight(next.height);
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, [category]);

  const handleAggregateNodeClick = (node: K8sNodeData) => {
    setSelectedNode(node);
  };

  const handleAggregateNodeFocus = (node: K8sNodeData) => {
    setFocusAggregate(node.id);
    setSelectedNode(node);
  };

  const handleAggregateNodeDoubleClick = (node: K8sNodeData) => {
    // Toggle focus for the aggregate node.
    if (focusAggregateId === node.id) {
      clearFocus();
      return;
    }

    handleAggregateNodeFocus(node);
  };

  // Organize nodes into parent-child hierarchy
  const organizeHierarchy = () => {
    const parentNodes: K8sNodeData[] = [];
    const childNodesByParent = new Map<string, K8sNodeData[]>();
    const standaloneNodes: K8sNodeData[] = [];

    // Find groups for this category's nodes
    const relevantGroups = groups.filter((group) => {
      const ownerNode = nodes.find((n) => n.id === group.ownerId);
      return ownerNode !== undefined;
    });

    // Build parent-child map from groups
    relevantGroups.forEach((group) => {
      const parentNode = nodes.find((n) => n.id === group.ownerId);
      if (parentNode) {
        parentNodes.push(parentNode);
        const children = nodes.filter((n) => group.memberIds.includes(n.id));
        childNodesByParent.set(group.ownerId, children);
      }
    });

    // Find standalone nodes (not parents, not children)
    const allChildIds = new Set<string>();
    childNodesByParent.forEach((children) => {
      children.forEach((child) => allChildIds.add(child.id));
    });
    const parentIds = new Set(parentNodes.map((n) => n.id));

    nodes.forEach((node) => {
      if (!parentIds.has(node.id) && !allChildIds.has(node.id)) {
        standaloneNodes.push(node);
      }
    });

    return { parentNodes, childNodesByParent, standaloneNodes };
  };

  const { parentNodes, childNodesByParent, standaloneNodes } = organizeHierarchy();

  type TopLevelItem =
    | { kind: 'group'; node: K8sNodeData }
    | { kind: 'node'; node: K8sNodeData };

  const topLevelItems: TopLevelItem[] = useMemo(() => {
    const items: TopLevelItem[] = [
      ...parentNodes.map((node) => ({ kind: 'group' as const, node })),
      ...standaloneNodes.map((node) => ({ kind: 'node' as const, node })),
    ];

    if (!isAggregateLane) return items;

    const typeRank = (type: string) => {
      if (type === 'datacenter') return 0;
      if (type === 'mobiletower') return 1;
      return 2;
    };

    const numberSuffix = (value: string) => {
      const match = value.match(/(\d+)(?!.*\d)/);
      return match ? Number.parseInt(match[1], 10) : Number.NaN;
    };

    return items.slice().sort((a, b) => {
      const aNum = numberSuffix(a.node.id);
      const bNum = numberSuffix(b.node.id);

      if (!Number.isNaN(aNum) && !Number.isNaN(bNum) && aNum !== bNum) {
        return aNum - bNum;
      }

      const rankDiff = typeRank(a.node.type) - typeRank(b.node.type);
      if (rankDiff !== 0) return rankDiff;

      return (a.node.label ?? a.node.id).localeCompare(b.node.label ?? b.node.id);
    });
  }, [isAggregateLane, parentNodes, standaloneNodes]);

  const aggregateFilterOptions: MultiSelectOption[] = useMemo(() => {
    if (!isAggregateLane) return [];

    const byKey = new Map<string, MultiSelectOption>();
    const addValue = (value: unknown) => {
      if (typeof value !== 'string' && typeof value !== 'number') return;
      const trimmed = String(value).trim();
      if (!trimmed) return;
      const key = trimmed.toLowerCase();
      if (byKey.has(key)) return;
      byKey.set(key, { id: key, label: trimmed, value: trimmed });
    };

    for (const node of nodes) {
      addValue(node.label);
      Object.values(node.metadata || {}).forEach(addValue);
    }

    return Array.from(byKey.values()).sort((a, b) => a.label.localeCompare(b.label));
  }, [isAggregateLane, nodes]);

  const aggregateFilterTokens = useMemo(() => {
    if (!isAggregateLane) return [];
    return aggregateFilterValues
      .map((v) => String(v.value ?? v.label).trim())
      .filter(Boolean);
  }, [aggregateFilterValues, isAggregateLane]);

  const nodeMatchesAggregateFilters = useCallback(
    (node: K8sNodeData) => {
      if (!isAggregateLane) return true;
      if (aggregateFilterTokens.length === 0) return true;

      const haystack =
        `${node.label ?? ''} ` +
        Object.values(node.metadata || {})
          .filter((v) => typeof v === 'string' || typeof v === 'number')
          .join(' ');

      const lower = haystack.toLowerCase();
      return aggregateFilterTokens.some((token) => lower.includes(token.toLowerCase()));
    },
    [aggregateFilterTokens, isAggregateLane]
  );

  const filteredTopLevelItems = useMemo(() => {
    if (!isAggregateLane) return topLevelItems;
    if (aggregateFilterTokens.length === 0) return topLevelItems;

    return topLevelItems.filter((item) => {
      if (nodeMatchesAggregateFilters(item.node)) return true;
      if (item.kind !== 'group') return false;

      const children = childNodesByParent.get(item.node.id) || [];
      return children.some((child) => nodeMatchesAggregateFilters(child));
    });
  }, [aggregateFilterTokens.length, childNodesByParent, isAggregateLane, nodeMatchesAggregateFilters, topLevelItems]);

  const tileGapPx = isAggregateLane ? TILE_GAP_PX_AGGREGATE : TILE_GAP_PX_DEFAULT;

  const itemsPerRow = useMemo(() => {
    const containerWidth = laneItemsAreaWidth > 0 ? laneItemsAreaWidth : laneContentWidth;
    if (containerWidth <= 0) return 0;

    const tileWidthPx = tileMeasuredWidth > 0 ? tileMeasuredWidth : TILE_EST_WIDTH_PX;

    return Math.max(1, Math.floor((containerWidth + tileGapPx) / (tileWidthPx + tileGapPx)));
  }, [laneContentWidth, laneItemsAreaWidth, tileGapPx, tileMeasuredWidth]);

  const laneMaxRows = useMemo(() => {
    if (isAggregateLane) {
      if (focusAggregateId) return 1;

      // Aggregate lane should fill available space and paginate based on what fits.
      if (laneItemsAreaHeight > 0) {
        const tileHeightPx = tileMeasuredHeight > 0 ? tileMeasuredHeight : TILE_EST_HEIGHT_PX;
        const estRowHeight = tileHeightPx + tileGapPx;
        return Math.max(1, Math.floor((laneItemsAreaHeight + tileGapPx) / estRowHeight));
      }

      return LANE_MAX_ROWS_DEFAULT;
    }

    // Service + Network lanes should paginate after 2 rows.
    if (category === 'service' || category === 'network') return LANE_MAX_ROWS_COMPACT;

    return LANE_MAX_ROWS_DEFAULT;
  }, [category, focusAggregateId, isAggregateLane, laneItemsAreaHeight, tileGapPx, tileMeasuredHeight]);

  const pageSize = useMemo(() => {
    if (itemsPerRow <= 0) return 0;
    return itemsPerRow * laneMaxRows;
  }, [itemsPerRow, laneMaxRows]);

  const [pageIndex, setPageIndex] = useState(0);

  useEffect(() => {
    setPageIndex(0);
  }, [category, nodes.length, pageSize, aggregateFilterTokens.length]);

  useLayoutEffect(() => {
    // Measure the first visible tile so row/col calculations match the actual rendered size.
    if (!isAggregateLane || focusAggregateId) {
      setTileMeasuredWidth(0);
      setTileMeasuredHeight(0);
      return;
    }

    const el = tileMeasureRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    setTileMeasuredWidth(rect.width);
    setTileMeasuredHeight(rect.height);

    const observer = new ResizeObserver((entries) => {
      const next = entries[0]?.contentRect;
      if (!next) return;
      setTileMeasuredWidth(next.width);
      setTileMeasuredHeight(next.height);
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, [aggregateFilterTokens.length, focusAggregateId, isAggregateLane, pageIndex]);

  const lastAutoPagedSelectionRef = useRef<string | null>(null);

  useEffect(() => {
    // When a node is selected, automatically page each lane to the first connected node in that lane.
    // This ensures cross-lane relationships (e.g. pod -> multus / configmap) are visible even with paging.
    if (!selectedNode) {
      lastAutoPagedSelectionRef.current = null;
      return;
    }

    if (pageSize <= 0) return;

    // Only auto-page once per selection so users can still manually page afterward.
    if (lastAutoPagedSelectionRef.current === selectedNode.id) return;

    const nodeIdsInLane = new Set(nodes.map((n) => n.id));

    let targetId: string | null = null;
    if (nodeIdsInLane.has(selectedNode.id)) {
      targetId = selectedNode.id;
    } else if (Array.isArray(selectedNode.connections)) {
      targetId = selectedNode.connections.find((id) => nodeIdsInLane.has(id)) ?? null;
    }

    if (!targetId) return;

    const items = isAggregateLane ? filteredTopLevelItems : topLevelItems;

    const targetIndex = items.findIndex((item) => {
      if (item.node.id === targetId) return true;
      if (item.kind !== 'group') return false;
      const children = childNodesByParent.get(item.node.id) || [];
      return children.some((child) => child.id === targetId);
    });

    if (targetIndex < 0) return;

    const start = pageIndex * pageSize;
    const end = start + pageSize;
    if (targetIndex >= start && targetIndex < end) {
      lastAutoPagedSelectionRef.current = selectedNode.id;
      return;
    }

    lastAutoPagedSelectionRef.current = selectedNode.id;
    setPageIndex(Math.floor(targetIndex / pageSize));
  }, [
    childNodesByParent,
    filteredTopLevelItems,
    isAggregateLane,
    nodes,
    pageIndex,
    pageSize,
    selectedNode,
    topLevelItems,
  ]);

  const totalPages = useMemo(() => {
    const itemCount = isAggregateLane ? filteredTopLevelItems.length : topLevelItems.length;
    if (pageSize <= 0) return 1;
    return Math.max(1, Math.ceil(itemCount / pageSize));
  }, [filteredTopLevelItems.length, isAggregateLane, pageSize, topLevelItems.length]);

  const canPageBack = totalPages > 1 && pageIndex > 0;
  const canPageForward = totalPages > 1 && pageIndex + 1 < totalPages;

  const visibleItems = useMemo(() => {
    const items = isAggregateLane ? filteredTopLevelItems : topLevelItems;
    if (pageSize <= 0) return items;

    const start = pageIndex * pageSize;
    const end = start + pageSize;
    return items.slice(start, end);
  }, [filteredTopLevelItems, isAggregateLane, pageIndex, pageSize, topLevelItems]);

  const laneHasPaging = totalPages > 1;

  return (
    <div
      className="flex flex-row mb-2.5"
      style={{
        minHeight: laneHeight,
        padding: '4px',
        gap: '10px',
        background: 'var(--surface-card)',
      }}
      data-testid={`lane-${category}`}
    >
      {/* Vertical Lane Label */}
      <div
        className="flex items-center justify-center"
        style={{
          width: '45px',
          padding: '4px 8px',
          flexShrink: 0,
          background: 'var(--nav-secondary-bg)',
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
            whiteSpace: 'nowrap',
          }}
        >
          {label}
        </div>
      </div>

      {/* Lane Content */}
      <div
        ref={setLaneContentNodeRef}
        data-testid={`lane-drop-${category}`}
        className={`flex-1 p-4 relative transition-colors flex flex-col min-h-0 ${
          isOver ? 'bg-surface-subtle border-2 border-blue-700 border-dashed' : ''
        } ${laneHasPaging ? 'pb-14' : ''}`}
      >
        {isAggregateLane && (
          <div className="mb-3 flex items-start gap-2">
            <div className="min-w-[260px] max-w-[460px]" onMouseDown={(e) => e.stopPropagation()}>
              <MultiSelect
                options={aggregateFilterOptions}
                value={aggregateFilterValues}
                onChange={(val) => setAggregateFilterValues(val)}
                placeholder="Filter aggregate…"
                maxHeight={220}
                createNewItemFromQuery={(query) => ({
                  id: `aggregate-filter-${query}`,
                  label: query,
                  value: query,
                })}
              />
            </div>
          </div>
        )}

        {laneHasPaging && (
          <div
            className="absolute bottom-1 left-1 z-40 flex items-center gap-1 bg-surface-card"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <button
              className="w-7 h-7 flex items-center justify-center disabled:opacity-40"
              onClick={() => setPageIndex((v) => Math.max(0, v - 1))}
              disabled={!canPageBack}
              type="button"
              aria-label="Previous page"
              title="Previous"
            >
              <Minus className="w-4 h-4 text-primary" />
            </button>
            <div className="text-[10px] text-secondary font-macan-mono whitespace-nowrap">
              {pageIndex + 1}/{totalPages}
            </div>
            <button
              className="w-7 h-7 flex items-center justify-center disabled:opacity-40"
              onClick={() => setPageIndex((v) => Math.min(totalPages - 1, v + 1))}
              disabled={!canPageForward}
              type="button"
              aria-label="Next page"
              title="Next"
            >
              <Plus className="w-4 h-4 text-primary" />
            </button>
          </div>
        )}

        <div
          ref={setLaneItemsAreaNodeRef}
          className={`flex-1 min-h-0 flex justify-center ${
            isAggregateLane ? 'items-start pt-2' : 'items-center'
          }`}
        >
          {nodes.length === 0 ? (
            <div className="flex items-center justify-center text-secondary font-macan text-sm">
              Drop {category} resources here
            </div>
          ) : (
            <div
              className={
                isAggregateLane
                  ? 'grid w-full content-start gap-10'
                  : 'flex flex-wrap justify-center gap-8'
              }
              style={
                isAggregateLane
                  ? {
                      gridTemplateColumns: `repeat(${Math.max(1, itemsPerRow)}, max-content)`,
                      justifyContent: 'space-evenly',
                    }
                  : undefined
              }
            >
              {visibleItems.map((item, index) => {
                const shouldMeasureTile = isAggregateLane && !focusAggregateId && index === 0;
                const tileRef = shouldMeasureTile ? setTileMeasureNodeRef : undefined;

                if (item.kind === 'group') {
                  const parentNode = item.node;
                  const group = groups.find((g) => g.ownerId === parentNode.id);
                  const memberCount = group?.memberIds.length ?? 0;

                  return (
                    <div key={parentNode.id} ref={tileRef} className="inline-block">
                      <HierarchicalNodeGroup
                        parentNode={parentNode}
                        childNodes={childNodesByParent.get(parentNode.id) || []}
                        memberCount={memberCount}
                        collapsed={!!group?.collapsed}
                        onToggleCollapse={
                          memberCount > 0 && group ? () => toggleGroupCollapse(group.id) : undefined
                        }
                        onParentClick={isAggregateLane ? handleAggregateNodeClick : undefined}
                        onParentDoubleClick={isAggregateLane ? handleAggregateNodeDoubleClick : undefined}
                      />
                    </div>
                  );
                }

                const node = item.node;
                return (
                  <div
                    ref={tileRef}
                    key={node.id}
                    data-node-id={node.id}
                    className="cursor-pointer transition-transform hover:scale-105"
                    onClick={() => {
                      if (isAggregateLane) {
                        handleAggregateNodeClick(node);
                        return;
                      }

                      setSelectedNode(node);
                    }}
                    onDoubleClick={(e) => {
                      if (!isAggregateLane) return;
                      e.stopPropagation();
                      handleAggregateNodeDoubleClick(node);
                    }}
                  >
                    <KubernetesIconWrapper
                      type={node.type}
                      status={node.status}
                      label={node.label}
                      showIndicator={false}
                    />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
