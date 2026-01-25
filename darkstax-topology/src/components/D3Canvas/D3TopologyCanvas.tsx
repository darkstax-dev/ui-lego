import { useEffect, useRef, useState, useCallback } from 'react';
import * as d3 from 'd3';
import { polygonHull } from 'd3-polygon';
import { useTopologyStore } from '@/store/topologyStore';
import { TopologyNode, TopologyEdge } from '@/types/graph';
import { ForceLayoutEngine, D3SimulationNode } from '@/lib/d3/forceLayout';
import { createRoundedRectPath } from '@/utils/convexHull';
import { ContextMenu } from '@/components/controls/ContextMenu';
import { KeyboardShortcutsHelp } from '@/components/controls/KeyboardShortcutsHelp';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';
import { TopologyConfig } from '@/types/config';
import { NodeRenderer } from '@/lib/rendering/NodeRenderer';

interface D3TopologyCanvasProps {
  config?: TopologyConfig;
}

export function D3TopologyCanvas({ config }: D3TopologyCanvasProps = {}) {
  const svgRef = useRef<SVGSVGElement>(null);
  const simulationRef = useRef<ForceLayoutEngine | null>(null);
  const transformRef = useRef(d3.zoomIdentity);
  const backgroundInitializedRef = useRef(false);
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
    node?: TopologyNode;
    edge?: TopologyEdge;
  } | null>(null);
  const [showShortcuts, setShowShortcuts] = useState(false);

  const {
    nodes,
    edges,
    selectNode,
    selectEdge,
    selectedNodeId,
    selectedEdgeId,
    layoutAlgorithm,
    autoLayout,
    setNodes,
    removeNode,
    removeEdge,
    groups,
    layoutLocked,
    setLayoutStable,
    setLayoutLocked
  } = useTopologyStore();

  const handleZoomIn = useCallback(() => {
    if (!svgRef.current) return;
    const svg = d3.select(svgRef.current);
    svg.transition().call(
      d3.zoom<SVGSVGElement, unknown>().scaleBy as any,
      1.3
    );
  }, []);

  const handleZoomOut = useCallback(() => {
    if (!svgRef.current) return;
    const svg = d3.select(svgRef.current);
    svg.transition().call(
      d3.zoom<SVGSVGElement, unknown>().scaleBy as any,
      0.7
    );
  }, []);

  const handleFitView = useCallback(() => {
    if (!svgRef.current || nodes.length === 0) return;
    const svg = d3.select(svgRef.current);
    const width = svgRef.current.clientWidth;
    const height = svgRef.current.clientHeight;
    
    const bounds = {
      minX: Math.min(...nodes.map(n => n.position.x)),
      maxX: Math.max(...nodes.map(n => n.position.x)),
      minY: Math.min(...nodes.map(n => n.position.y)),
      maxY: Math.max(...nodes.map(n => n.position.y)),
    };
    
    const graphWidth = bounds.maxX - bounds.minX;
    const graphHeight = bounds.maxY - bounds.minY;
    const scale = Math.min(width / graphWidth, height / graphHeight) * 0.8;
    const centerX = (bounds.minX + bounds.maxX) / 2;
    const centerY = (bounds.minY + bounds.maxY) / 2;
    
    const transform = d3.zoomIdentity
      .translate(width / 2, height / 2)
      .scale(scale)
      .translate(-centerX, -centerY);
    
    svg.transition().duration(800).call(
      d3.zoom<SVGSVGElement, unknown>().transform as any,
      transform
    );
  }, [nodes]);

  const handleContextMenuAction = useCallback((action: string, target?: TopologyNode | TopologyEdge) => {
    if (!target) return;

    const isNode = (t: TopologyNode | TopologyEdge): t is TopologyNode => {
      return 'type' in t && typeof t.type === 'string';
    };

    switch (action) {
      case 'view-details':
        if (isNode(target)) {
          selectNode(target.id);
        } else {
          selectEdge(target.id);
        }
        break;
      case 'copy-id':
        navigator.clipboard.writeText(target.id);
        break;
      case 'hide':
        if (isNode(target)) {
          removeNode(target.id);
        } else {
          removeEdge(target.id);
        }
        break;
      case 'pin':
        console.log('Pin node:', target.id);
        break;
      case 'expand-neighbors':
        console.log('Expand neighbors:', target.id);
        break;
    }
  }, [selectNode, selectEdge, removeNode, removeEdge]);

  useKeyboardShortcuts(
    () => setShowShortcuts(true),
    handleZoomIn,
    handleZoomOut,
    handleFitView
  );

  // Initialize grid background - runs only once
  useEffect(() => {
    if (!svgRef.current || backgroundInitializedRef.current) return;

    const svg = d3.select(svgRef.current);
    const height = svgRef.current.clientHeight;

    // Add subtle dotted grid pattern in background
    const dotsGroup = svg.insert('g', ':first-child')
      .attr('class', 'canvas-dots')
      .attr('opacity', 0.12);

    const dotSpacing = 28.53; // spacing between dots
    const rows = Math.ceil(height / 24) + 1;
    const cols = 49; // Number of dots per row

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        dotsGroup.append('circle')
          .attr('cx', 20 + col * dotSpacing)
          .attr('cy', 92 + row * 24)
          .attr('r', 0.8)
          .attr('fill', '#00112B');
      }
    }

    backgroundInitializedRef.current = true;
  }, []); // Run only once

  useEffect(() => {
    if (!svgRef.current || nodes.length === 0) return;

    const svg = d3.select(svgRef.current);
    const width = svgRef.current.clientWidth;
    const height = svgRef.current.clientHeight;

    // Get or create topology container (don't remove everything)
    let g = svg.select<SVGGElement>('g.topology-container');
    if (g.empty()) {
      g = svg.append('g').attr('class', 'topology-container');
    }

    // Initialize zoom only if not already set
    if (svg.on('zoom.behavior') === undefined) {
      const zoom = d3.zoom<SVGSVGElement, unknown>()
        .scaleExtent([0.1, 4])
        .on('zoom', (event) => {
          transformRef.current = event.transform;
          g.attr('transform', event.transform);
        });

      svg.call(zoom);

      // Apply current transform
      g.attr('transform', transformRef.current.toString());
    }

    // Get or create groups for edges, nodes, and group containers
    let groupContainerGroup = g.select<SVGGElement>('g.group-containers');
    if (groupContainerGroup.empty()) {
      groupContainerGroup = g.append('g').attr('class', 'group-containers');
    }

    let edgeGroup = g.select<SVGGElement>('g.edges');
    if (edgeGroup.empty()) {
      edgeGroup = g.append('g').attr('class', 'edges');
    }

    let nodeGroup = g.select<SVGGElement>('g.nodes');
    if (nodeGroup.empty()) {
      nodeGroup = g.append('g').attr('class', 'nodes');
    }

    if (autoLayout && layoutAlgorithm === 'force') {
      // Prepare groups for the simulation
      const groupsMap = new Map<string, TopologyNode[]>();
      groups.forEach(group => {
        const groupNodes = nodes.filter(n => group.memberIds.includes(n.id));
        if (groupNodes.length > 0) {
          groupsMap.set(group.id, groupNodes);
        }
      });

      // Create or restart simulation
      if (!simulationRef.current) {
        simulationRef.current = new ForceLayoutEngine({
          width,
          height,
          chargeStrength: -800,
          linkDistance: 120,
          collideRadius: 60,
          autoStabilize: true,
          stabilizationThreshold: 0.5,
          onStabilized: () => {
            console.log('Layout stabilized - stopping simulation');
            setLayoutStable(true);
          }
        });
      }

      // Stop simulation if layout is locked
      if (layoutLocked) {
        simulationRef.current?.stop();
        return;
      }

      // Reset stabilization when restarting
      simulationRef.current.resetStabilization();
      setLayoutStable(false);

      const simulation = simulationRef.current.createSimulation(nodes, edges, groupsMap);

      // Use requestAnimationFrame to throttle updates and prevent flickering
      let rafId: number;
      simulation.on('tick', () => {
        if (rafId) cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => {
          updateEdges(edgeGroup, edges, simulation.nodes());
          updateNodes(nodeGroup, simulation.nodes(), selectNode, nodes, setContextMenu);
          updateGroupContainers(groupContainerGroup, simulation.nodes(), groups);
        });
      });

      simulation.on('end', () => {
        if (rafId) cancelAnimationFrame(rafId);
        const updatedNodes = nodes.map(node => {
          const simNode = simulation.nodes().find(n => n.id === node.id);
          if (simNode && simNode.x !== undefined && simNode.y !== undefined) {
            return {
              ...node,
              position: { x: simNode.x, y: simNode.y }
            };
          }
          return node;
        });
        setNodes(updatedNodes);
      });
    } else {
      renderEdges(edgeGroup, edges, nodes, selectedEdgeId, selectEdge);
      renderNodes(nodeGroup, nodes, selectedNodeId, selectNode, setContextMenu);

      // For static layout, convert nodes to D3 simulation nodes format for group rendering
      const staticNodes: D3SimulationNode[] = nodes.map(n => ({
        ...n,
        x: n.position.x,
        y: n.position.y
      }));
      updateGroupContainers(groupContainerGroup, staticNodes, groups);
    }

    svg.on('click', (event) => {
      if (event.target === svgRef.current) {
        selectNode(null);
        selectEdge(null);
      }
    });

    return () => {
      simulationRef.current?.stop();
    };
  }, [nodes, edges, layoutAlgorithm, autoLayout, layoutLocked, setLayoutStable]);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);

    // Update node selection highlights (using circles, not rects)
    svg.selectAll('g.node circle.node-background')
      .attr('stroke', (d: any) => d.id === selectedNodeId ? '#3b82f6' : 'rgba(255, 255, 255, 0.6)')
      .attr('stroke-width', (d: any) => d.id === selectedNodeId ? 3 : 1)
      .attr('filter', (d: any) =>
        d.id === selectedNodeId ? 'drop-shadow(0 4px 6px rgba(59, 130, 246, 0.3))' : 'none'
      );

    // Update edge selection highlights
    svg.selectAll('line.edge')
      .attr('stroke', (d: any) => {
        if (d.id === selectedEdgeId) return '#3b82f6';
        if (d.type === 'ownership') return '#94a3b8';
        return '#cbd5e1';
      })
      .attr('stroke-width', (d: any) => d.id === selectedEdgeId ? 3 : 2);

  }, [selectedNodeId, selectedEdgeId]);

  return (
    <>
      <svg
        ref={svgRef}
        id="topology-canvas"
        className="w-full h-full"
        style={{ cursor: 'grab', backgroundColor: '#CECECE' }}
      />
      
      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          node={contextMenu.node}
          edge={contextMenu.edge}
          onClose={() => setContextMenu(null)}
          onAction={handleContextMenuAction}
        />
      )}
      
      <KeyboardShortcutsHelp
        isOpen={showShortcuts}
        onClose={() => setShowShortcuts(false)}
      />
      
      <button
        onClick={() => setShowShortcuts(true)}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full shadow-lg text-xs hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors z-10"
      >
        Press <kbd className="px-1 bg-gray-100 dark:bg-gray-700 rounded">?</kbd> for shortcuts
      </button>
    </>
  );
}

function updateEdges(
  group: d3.Selection<SVGGElement, unknown, null, undefined>,
  edges: TopologyEdge[],
  nodes: D3SimulationNode[]
) {
  const edgeSelection = group
    .selectAll<SVGLineElement, TopologyEdge>('line.edge')
    .data(edges, (d) => d.id);

  edgeSelection.exit().remove();

  const edgeEnter = edgeSelection
    .enter()
    .append('line')
    .attr('class', 'edge')
    .attr('stroke', (d) => d.type === 'ownership' ? '#94a3b8' : '#cbd5e1')
    .attr('stroke-width', 2)
    .attr('stroke-dasharray', (d) => d.type === 'ownership' ? '5,5' : 'none');

  edgeSelection.merge(edgeEnter)
    .attr('x1', (d) => {
      const source = nodes.find(n => n.id === d.source);
      return source?.x || 0;
    })
    .attr('y1', (d) => {
      const source = nodes.find(n => n.id === d.source);
      return source?.y || 0;
    })
    .attr('x2', (d) => {
      const target = nodes.find(n => n.id === d.target);
      return target?.x || 0;
    })
    .attr('y2', (d) => {
      const target = nodes.find(n => n.id === d.target);
      return target?.y || 0;
    });
}

function updateNodes(
  group: d3.Selection<SVGGElement, unknown, null, undefined>,
  nodes: D3SimulationNode[],
  selectNode: (id: string | null) => void,
  allNodes: TopologyNode[],
  setContextMenu: (menu: { x: number; y: number; node?: TopologyNode; edge?: TopologyEdge } | null) => void
) {
  const nodeSelection = group
    .selectAll<SVGGElement, D3SimulationNode>('g.node')
    .data(nodes, (d) => d.id);

  nodeSelection.exit().remove();

  const nodeEnter = nodeSelection
    .enter()
    .append('g')
    .attr('class', 'node')
    .style('cursor', 'pointer')
    .on('click', function(event, d) {
      event.stopPropagation();
      selectNode(d.id);
    })
    .on('contextmenu', function(event, d) {
      event.preventDefault();
      const node = allNodes.find(n => n.id === d.id);
      if (node) {
        setContextMenu({
          x: event.clientX,
          y: event.clientY,
          node,
        });
      }
    })
    .call(d3.drag<SVGGElement, D3SimulationNode>()
      .on('start', dragStarted)
      .on('drag', dragged)
      .on('end', dragEnded)
    );

  // Add circular frosted-glass background
  nodeEnter.append('circle')
    .attr('class', 'node-background')
    .attr('r', 26)
    .attr('fill', 'rgba(255, 255, 255, 0.4)')
    .style('backdrop-filter', 'blur(4px)')
    .style('-webkit-backdrop-filter', 'blur(4px)');

  // Add icon (using SVG path - will be different per node type)
  nodeEnter.append('g')
    .attr('class', 'node-icon')
    .attr('transform', 'translate(-16, -16)')
    .each(function(d: any) {
      const iconGroup = d3.select(this);
      const nodeId = d.id || '';
      const nodeType = d.type || 'default';

      // Add different icons based on node type or id pattern
      if (nodeId.includes('vnet') || nodeId.includes('qr-') || nodeType.toLowerCase().includes('interface') || nodeType.toLowerCase().includes('port')) {
        // Lock icon
        iconGroup.append('path')
          .attr('d', 'M23.4 10.4008H26C26.3448 10.4008 26.6755 10.5377 26.9193 10.7815C27.1631 11.0253 27.3 11.356 27.3 11.7008V27.3008C27.3 27.6456 27.1631 27.9762 26.9193 28.22C26.6755 28.4638 26.3448 28.6008 26 28.6008H5.20002C4.85524 28.6008 4.52458 28.4638 4.28079 28.22C4.03699 27.9762 3.90002 27.6456 3.90002 27.3008V11.7008C3.90002 11.356 4.03699 11.0253 4.28079 10.7815C4.52458 10.5377 4.85524 10.4008 5.20002 10.4008H7.80002V9.10078C7.80002 7.03209 8.62181 5.04813 10.0846 3.58535C11.5474 2.12256 13.5313 1.30078 15.6 1.30078C17.6687 1.30078 19.6527 2.12256 21.1155 3.58535C22.5782 5.04813 23.4 7.03209 23.4 9.10078V10.4008ZM14.3 20.4524V23.4008H16.9V20.4524C17.3957 20.1662 17.7831 19.7245 18.0021 19.1957C18.2211 18.6669 18.2596 18.0806 18.1114 17.5278C17.9633 16.9749 17.6369 16.4864 17.1828 16.138C16.7287 15.7896 16.1724 15.6007 15.6 15.6007C15.0277 15.6007 14.4713 15.7896 14.0172 16.138C13.5632 16.4864 13.2368 16.9749 13.0886 17.5278C12.9405 18.0806 12.9789 18.6669 13.1979 19.1957C13.417 19.7245 13.8044 20.1662 14.3 20.4524ZM20.8 10.4008V9.10078C20.8 7.72166 20.2522 6.39901 19.277 5.42383C18.3018 4.44864 16.9792 3.90078 15.6 3.90078C14.2209 3.90078 12.8983 4.44864 11.9231 5.42383C10.9479 6.39901 10.4 7.72166 10.4 9.10078V10.4008H20.8Z')
          .attr('fill', '#072B56');
      } else if (nodeType.includes('alert') || nodeType.includes('warning')) {
        // Alert icon
        iconGroup.append('path')
          .attr('d', 'M16.7258 3.89994L29.1096 25.3499C29.2237 25.5476 29.2838 25.7717 29.2838 25.9999C29.2838 26.2281 29.2237 26.4523 29.1096 26.6499C28.9955 26.8476 28.8314 27.0117 28.6338 27.1258C28.4362 27.2399 28.212 27.2999 27.9838 27.2999H3.21623C2.98803 27.2999 2.76386 27.2399 2.56624 27.1258C2.36862 27.0117 2.20451 26.8476 2.09042 26.6499C1.97632 26.4523 1.91626 26.2281 1.91626 25.9999C1.91626 25.7717 1.97633 25.5476 2.09043 25.3499L14.4742 3.89994C14.5883 3.70233 14.7524 3.53824 14.9501 3.42415C15.1477 3.31006 15.3718 3.25 15.6 3.25C15.8282 3.25 16.0524 3.31006 16.25 3.42415C16.4476 3.53824 16.6117 3.70233 16.7258 3.89994ZM14.3 20.7999V23.3999H16.9V20.7999H14.3ZM14.3 11.6999V18.1999H16.9V11.6999H14.3Z')
          .attr('fill', '#D9322A');
      } else if (nodeType.includes('link') || nodeType.includes('patch')) {
        // Links icon
        iconGroup.append('path')
          .attr('d', 'M12.8326 3.88714C12.5184 3.57142 12.0801 3.37645 11.5928 3.37645C11.1074 3.37645 10.6725 3.57142 10.362 3.88714H10.3531C10.0398 4.20131 9.84484 4.63992 9.84484 5.12535C9.84484 5.61263 10.0398 6.04755 10.3531 6.35987L10.362 6.36696C10.6725 6.68113 11.1074 6.87426 11.5928 6.87426C12.0801 6.87426 12.5184 6.68113 12.8326 6.36696L12.8372 6.35987C13.152 6.04755 13.3451 5.61263 13.3451 5.12535C13.3451 4.63992 13.152 4.20131 12.8372 3.88714H12.8326ZM11.5928 27.8269C12.0801 27.8269 12.5184 27.6286 12.8326 27.3181L12.8372 27.3088C13.152 26.999 13.3451 26.5604 13.3451 26.0783C13.3451 25.5911 13.152 25.1543 12.8372 24.8386H12.8326C12.5184 24.5192 12.0801 24.326 11.5928 24.326C11.1074 24.326 10.6725 24.5192 10.362 24.8386H10.3531C10.0398 25.1543 9.84484 25.5911 9.84484 26.0783C9.84484 26.5604 10.0398 26.999 10.3531 27.3088L10.362 27.3181C10.6725 27.6286 11.1074 27.8269 11.5928 27.8269Z')
          .attr('fill', '#072B56');
      } else {
        // Default settings icon
        iconGroup.append('path')
          .attr('d', 'M12.9402 2.87411C14.6938 2.50638 16.5046 2.5055 18.2585 2.87151C18.3754 3.64278 18.6645 4.3778 19.1045 5.02194C19.5446 5.66608 20.1241 6.20277 20.8 6.59211C21.4755 6.9828 22.2303 7.21619 23.0083 7.27494C23.7864 7.33368 24.5677 7.21626 25.2941 6.93141C26.4879 8.26789 27.3922 9.83696 27.95 11.5399C27.3408 12.0269 26.8491 12.6448 26.5115 13.3479C26.1739 14.051 25.9991 14.8212 26 15.6011C26 17.2443 26.7618 18.7094 27.9526 19.6623C27.3915 21.3638 26.4861 22.9317 25.2928 24.2682C24.5666 23.9836 23.7855 23.8663 23.0077 23.925C22.2299 23.9837 21.4753 24.217 20.8 24.6075C20.1246 24.9967 19.5456 25.5331 19.1058 26.1767C18.666 26.8204 18.3769 27.5548 18.2598 28.3255C16.5064 28.6941 14.6957 28.6959 12.9415 28.3307C12.8252 27.5587 12.5363 26.8229 12.0963 26.1781C11.6563 25.5332 11.0765 24.996 10.4 24.6062C9.72451 24.2157 8.96965 23.9826 8.19158 23.924C7.41352 23.8655 6.63227 23.9832 5.90594 24.2682C4.71201 22.9313 3.80774 21.3618 3.25004 19.6584C3.85895 19.1717 4.35043 18.5542 4.68801 17.8516C5.02559 17.1489 5.2006 16.3793 5.20004 15.5998C5.20067 14.8197 5.02546 14.0494 4.6874 13.3463C4.34935 12.6432 3.85717 12.0253 3.24744 11.5386C3.80861 9.83707 4.71399 8.26924 5.90724 6.93271C6.63348 7.21735 7.41455 7.33467 8.19237 7.27592C8.97019 7.21718 9.72477 6.9839 10.4 6.59341C11.0754 6.20419 11.6545 5.66784 12.0943 5.02419C12.534 4.38053 12.8232 3.6461 12.9402 2.87541V2.87411ZM15.6 19.5011C16.6344 19.5011 17.6264 19.0902 18.3578 18.3588C19.0891 17.6274 19.5 16.6355 19.5 15.6011C19.5 14.5668 19.0891 13.5748 18.3578 12.8434C17.6264 12.112 16.6344 11.7011 15.6 11.7011C14.5657 11.7011 13.5737 12.112 12.8423 12.8434C12.1109 13.5748 11.7 14.5668 11.7 15.6011C11.7 16.6355 12.1109 17.6274 12.8423 18.3588C13.5737 19.0902 14.5657 19.5011 15.6 19.5011Z')
          .attr('fill', '#072B56');
      }
    });

  // Add label below icon
  nodeEnter.append('text')
    .attr('class', 'node-label')
    .attr('x', 0)
    .attr('y', 48)
    .attr('text-anchor', 'middle')
    .attr('font-size', '14px')
    .attr('font-family', 'Macan Mono Trial, monospace')
    .attr('font-weight', '500')
    .attr('fill', '#00112B');

  const nodeMerge = nodeSelection.merge(nodeEnter);

  nodeMerge
    .attr('transform', (d) => `translate(${d.x}, ${d.y})`);

  nodeMerge.select('text.node-label')
    .text((d) => {
      const label = d.data.label || d.id;
      return label.length > 15 ? label.substring(0, 15) + '...' : label;
    });
}

function dragStarted(event: any, d: D3SimulationNode) {
  if (!event.active) {
    d3.select(event.sourceEvent.view).select('svg').datum();
  }
  d.fx = d.x;
  d.fy = d.y;
}

function dragged(event: any, d: D3SimulationNode) {
  d.fx = event.x;
  d.fy = event.y;
}

function dragEnded(event: any, d: D3SimulationNode) {
  if (!event.active) {
    d3.select(event.sourceEvent.view).select('svg').datum();
  }
  d.fx = null;
  d.fy = null;
}

function renderEdges(
  group: d3.Selection<SVGGElement, unknown, null, undefined>,
  edges: TopologyEdge[],
  nodes: TopologyNode[],
  selectedEdgeId: string | null,
  selectEdge: (id: string | null) => void
) {
  const edgeSelection = group
    .selectAll<SVGLineElement, TopologyEdge>('line')
    .data(edges, (d) => d.id);

  edgeSelection.exit().remove();

  const edgeEnter = edgeSelection
    .enter()
    .append('line')
    .attr('class', 'edge')
    .attr('stroke', (d) => {
      if (d.type === 'ownership') return '#94a3b8';
      return '#cbd5e1';
    })
    .attr('stroke-width', 2)
    .attr('stroke-dasharray', (d) => d.type === 'ownership' ? '5,5' : 'none')
    .on('click', function(event, d) {
      event.stopPropagation();
      selectEdge(d.id);
    });

  edgeSelection.merge(edgeEnter)
    .attr('x1', (d) => {
      const sourceNode = nodes.find(n => n.id === d.source);
      return sourceNode ? sourceNode.position.x : 0;
    })
    .attr('y1', (d) => {
      const sourceNode = nodes.find(n => n.id === d.source);
      return sourceNode ? sourceNode.position.y : 0;
    })
    .attr('x2', (d) => {
      const targetNode = nodes.find(n => n.id === d.target);
      return targetNode ? targetNode.position.x : 0;
    })
    .attr('y2', (d) => {
      const targetNode = nodes.find(n => n.id === d.target);
      return targetNode ? targetNode.position.y : 0;
    })
    .attr('stroke', (d) => {
      if (d.id === selectedEdgeId) return '#3b82f6';
      if (d.type === 'ownership') return '#94a3b8';
      return '#cbd5e1';
    })
    .attr('stroke-width', (d) => d.id === selectedEdgeId ? 3 : 2);
}

function renderNodes(
  group: d3.Selection<SVGGElement, unknown, null, undefined>,
  nodes: TopologyNode[],
  selectedNodeId: string | null,
  selectNode: (id: string | null) => void,
  setContextMenu: (menu: { x: number; y: number; node?: TopologyNode; edge?: TopologyEdge } | null) => void
) {
  const nodeSelection = group
    .selectAll<SVGGElement, TopologyNode>('g.node')
    .data(nodes, (d) => d.id);

  nodeSelection.exit().remove();

  const nodeEnter = nodeSelection
    .enter()
    .append('g')
    .attr('class', 'node')
    .on('click', function(event, d) {
      event.stopPropagation();
      selectNode(d.id);
    })
    .on('contextmenu', function(event, d) {
      event.preventDefault();
      setContextMenu({
        x: event.clientX,
        y: event.clientY,
        node: d,
      });
    });

  // Add circular frosted-glass background
  nodeEnter
    .append('circle')
    .attr('class', 'node-background')
    .attr('r', 26)
    .attr('fill', 'rgba(255, 255, 255, 0.4)')
    .attr('stroke', 'rgba(255, 255, 255, 0.6)')
    .attr('stroke-width', 1)
    .style('backdrop-filter', 'blur(4px)')
    .style('-webkit-backdrop-filter', 'blur(4px)');

  // Add icon based on node type using config-driven rendering
  nodeEnter.append('g')
    .attr('class', 'node-icon')
    .attr('transform', 'translate(-16, -16)')
    .each(function(d: TopologyNode) {
      const iconGroup = d3.select(this);
      const nodeType = d.type || 'default';
      
      // Use config-driven rendering if available
      if (config?.nodeTypes?.[nodeType]) {
        const nodeRenderer = new NodeRenderer(config.nodeTypes);
        const nodeConfig = nodeRenderer.getNodeConfig(nodeType);
        const iconPath = nodeRenderer.getIconPath(nodeConfig.icon);
        
        iconGroup.append('path')
          .attr('d', iconPath)
          .attr('fill', nodeConfig.color);
      } else {
        // Fallback to pattern-based rendering for backward compatibility
        const nodeId = d.id || '';
        
        if (nodeId.includes('vnet') || nodeId.includes('qr-') || nodeType.toLowerCase().includes('interface') || nodeType.toLowerCase().includes('port')) {
          iconGroup.append('path')
            .attr('d', 'M23.4 10.4008H26C26.3448 10.4008 26.6755 10.5377 26.9193 10.7815C27.1631 11.0253 27.3 11.356 27.3 11.7008V27.3008C27.3 27.6456 27.1631 27.9762 26.9193 28.22C26.6755 28.4638 26.3448 28.6008 26 28.6008H5.20002C4.85524 28.6008 4.52458 28.4638 4.28079 28.22C4.03699 27.9762 3.90002 27.6456 3.90002 27.3008V11.7008C3.90002 11.356 4.03699 11.0253 4.28079 10.7815C4.52458 10.5377 4.85524 10.4008 5.20002 10.4008H7.80002V9.10078C7.80002 7.03209 8.62181 5.04813 10.0846 3.58535C11.5474 2.12256 13.5313 1.30078 15.6 1.30078C17.6687 1.30078 19.6527 2.12256 21.1155 3.58535C22.5782 5.04813 23.4 7.03209 23.4 9.10078V10.4008ZM14.3 20.4524V23.4008H16.9V20.4524C17.3957 20.1662 17.7831 19.7245 18.0021 19.1957C18.2211 18.6669 18.2596 18.0806 18.1114 17.5278C17.9633 16.9749 17.6369 16.4864 17.1828 16.138C16.7287 15.7896 16.1724 15.6007 15.6 15.6007C15.0277 15.6007 14.4713 15.7896 14.0172 16.138C13.5632 16.4864 13.2368 16.9749 13.0886 17.5278C12.9405 18.0806 12.9789 18.6669 13.1979 19.1957C13.417 19.7245 13.8044 20.1662 14.3 20.4524ZM20.8 10.4008V9.10078C20.8 7.72166 20.2522 6.39901 19.277 5.42383C18.3018 4.44864 16.9792 3.90078 15.6 3.90078C14.2209 3.90078 12.8983 4.44864 11.9231 5.42383C10.9479 6.39901 10.4 7.72166 10.4 9.10078V10.4008H20.8Z')
            .attr('fill', '#072B56');
        } else if (nodeType.includes('alert') || nodeType.includes('warning') || nodeType.includes('gateway')) {
          iconGroup.append('path')
            .attr('d', 'M16.7258 3.89994L29.1096 25.3499C29.2237 25.5476 29.2838 25.7717 29.2838 25.9999C29.2838 26.2281 29.2237 26.4523 29.1096 26.6499C28.9955 26.8476 28.8314 27.0117 28.6338 27.1258C28.4362 27.2399 28.212 27.2999 27.9838 27.2999H3.21623C2.98803 27.2999 2.76386 27.2399 2.56624 27.1258C2.36862 27.0117 2.20451 26.8476 2.09042 26.6499C1.97632 26.4523 1.91626 26.2281 1.91626 25.9999C1.91626 25.7717 1.97633 25.5476 2.09043 25.3499L14.4742 3.89994C14.5883 3.70233 14.7524 3.53824 14.9501 3.42415C15.1477 3.31006 15.3718 3.25 15.6 3.25C15.8282 3.25 16.0524 3.31006 16.25 3.42415C16.4476 3.53824 16.6117 3.70233 16.7258 3.89994ZM14.3 20.7999V23.3999H16.9V20.7999H14.3ZM14.3 11.6999V18.1999H16.9V11.6999H14.3Z')
            .attr('fill', '#D9322A');
        } else if (nodeType.includes('link') || nodeType.includes('patch')) {
          iconGroup.append('path')
            .attr('d', 'M12.8326 3.88714C12.5184 3.57142 12.0801 3.37645 11.5928 3.37645C11.1074 3.37645 10.6725 3.57142 10.362 3.88714H10.3531C10.0398 4.20131 9.84484 4.63992 9.84484 5.12535C9.84484 5.61263 10.0398 6.04755 10.3531 6.35987L10.362 6.36696C10.6725 6.68113 11.1074 6.87426 11.5928 6.87426C12.0801 6.87426 12.5184 6.68113 12.8326 6.36696L12.8372 6.35987C13.152 6.04755 13.3451 5.61263 13.3451 5.12535C13.3451 4.63992 13.152 4.20131 12.8372 3.88714H12.8326ZM11.5928 27.8269C12.0801 27.8269 12.5184 27.6286 12.8326 27.3181L12.8372 27.3088C13.152 26.999 13.3451 26.5604 13.3451 26.0783C13.3451 25.5911 13.152 25.1543 12.8372 24.8386H12.8326C12.5184 24.5192 12.0801 24.326 11.5928 24.326C11.1074 24.326 10.6725 24.5192 10.362 24.8386H10.3531C10.0398 25.1543 9.84484 25.5911 9.84484 26.0783C9.84484 26.5604 10.0398 26.999 10.3531 27.3088L10.362 27.3181C10.6725 27.6286 11.1074 27.8269 11.5928 27.8269Z')
            .attr('fill', '#072B56');
        } else {
          iconGroup.append('path')
            .attr('d', 'M12.9402 2.87411C14.6938 2.50638 16.5046 2.5055 18.2585 2.87151C18.3754 3.64278 18.6645 4.3778 19.1045 5.02194C19.5446 5.66608 20.1241 6.20277 20.8 6.59211C21.4755 6.9828 22.2303 7.21619 23.0083 7.27494C23.7864 7.33368 24.5677 7.21626 25.2941 6.93141C26.4879 8.26789 27.3922 9.83696 27.95 11.5399C27.3408 12.0269 26.8491 12.6448 26.5115 13.3479C26.1739 14.051 25.9991 14.8212 26 15.6011C26 17.2443 26.7618 18.7094 27.9526 19.6623C27.3915 21.3638 26.4861 22.9317 25.2928 24.2682C24.5666 23.9836 23.7855 23.8663 23.0077 23.925C22.2299 23.9837 21.4753 24.217 20.8 24.6075C20.1246 24.9967 19.5456 25.5331 19.1058 26.1767C18.666 26.8204 18.3769 27.5548 18.2598 28.3255C16.5064 28.6941 14.6957 28.6959 12.9415 28.3307C12.8252 27.5587 12.5363 26.8229 12.0963 26.1781C11.6563 25.5332 11.0765 24.996 10.4 24.6062C9.72451 24.2157 8.96965 23.9826 8.19158 23.924C7.41352 23.8655 6.63227 23.9832 5.90594 24.2682C4.71201 22.9313 3.80774 21.3618 3.25004 19.6584C3.85895 19.1717 4.35043 18.5542 4.68801 17.8516C5.02559 17.1489 5.2006 16.3793 5.20004 15.5998C5.20067 14.8197 5.02546 14.0494 4.6874 13.3463C4.34935 12.6432 3.85717 12.0253 3.24744 11.5386C3.80861 9.83707 4.71399 8.26924 5.90724 6.93271C6.63348 7.21735 7.41455 7.33467 8.19237 7.27592C8.97019 7.21718 9.72477 6.9839 10.4 6.59341C11.0754 6.20419 11.6545 5.66784 12.0943 5.02419C12.534 4.38053 12.8232 3.6461 12.9402 2.87541V2.87411ZM15.6 19.5011C16.6344 19.5011 17.6264 19.0902 18.3578 18.3588C19.0891 17.6274 19.5 16.6355 19.5 15.6011C19.5 14.5668 19.0891 13.5748 18.3578 12.8434C17.6264 12.112 16.6344 11.7011 15.6 11.7011C14.5657 11.7011 13.5737 12.112 12.8423 12.8434C12.1109 13.5748 11.7 14.5668 11.7 15.6011C11.7 16.6355 12.1109 17.6274 12.8423 18.3588C13.5737 19.0902 14.5657 19.5011 15.6 19.5011Z')
            .attr('fill', '#072B56');
        }
      }
    });

  // Add label below icon
  nodeEnter
    .append('text')
    .attr('class', 'node-label')
    .attr('x', 0)
    .attr('y', 48)
    .attr('text-anchor', 'middle')
    .attr('font-size', '14px')
    .attr('font-family', 'Macan Mono Trial, monospace')
    .attr('font-weight', '500')
    .attr('fill', '#00112B');

  const nodeMerge = nodeSelection.merge(nodeEnter);

  nodeMerge
    .attr('transform', (d) => `translate(${d.position.x}, ${d.position.y})`)
    .style('cursor', 'pointer');

  nodeMerge
    .select('circle.node-background')
    .attr('stroke', (d) => d.id === selectedNodeId ? '#3b82f6' : 'rgba(255, 255, 255, 0.6)')
    .attr('stroke-width', (d) => d.id === selectedNodeId ? 3 : 1)
    .attr('filter', (d) => d.id === selectedNodeId ? 'drop-shadow(0 4px 6px rgba(59, 130, 246, 0.3))' : 'none');

  nodeMerge
    .select('text.node-label')
    .text((d) => {
      const label = d.data.label || d.id;
      return label.length > 15 ? label.substring(0, 15) + '...' : label;
    });
}

function updateGroupContainers(
  group: d3.Selection<SVGGElement, unknown, null, undefined>,
  nodes: D3SimulationNode[],
  groups: Array<{
    id: string;
    ownerId: string;
    memberIds: string[];
  }>
) {
  if (!groups || groups.length === 0) {
    group.selectAll('path.group-hull').remove();
    return;
  }

  const selection = group
    .selectAll<SVGPathElement, any>('path.group-hull')
    .data(groups, (d: any) => d.id);

  selection.exit().remove();

  const enter = selection
    .enter()
    .append('path')
    .attr('class', 'group-hull')
    .attr('stroke-linejoin', 'round')
    .attr('stroke-linecap', 'round')
    .attr('pointer-events', 'none');

  selection.merge(enter).each(function(groupData, index) {
    const groupNodes = nodes.filter(n => groupData.memberIds.includes(n.id));
    
    if (groupNodes.length === 0) return;

    // Get node positions for hull calculation
    const points: [number, number][] = groupNodes.map(n => [n.x || 0, n.y || 0]);
    
    // Calculate convex hull
    const hull = polygonHull(points);
    
    if (!hull || hull.length < 3) return;

    // Expand hull with padding
    const padding = 30;
    const expandedHull = expandHull(hull, padding);
    
    // Generate smooth path using curve interpolation
    const lineGenerator = d3.line()
      .curve(d3.curveCatmullRomClosed.alpha(0.5));
    
    const pathData = lineGenerator(expandedHull);
    
    // Color palette for groups (Skydive-style)
    const groupColors = [
      { fill: 'rgba(144, 238, 144, 0.3)', stroke: 'rgba(34, 139, 34, 0.6)' },  // Light green
      { fill: 'rgba(221, 160, 221, 0.3)', stroke: 'rgba(147, 112, 219, 0.6)' }, // Light purple
      { fill: 'rgba(255, 218, 185, 0.3)', stroke: 'rgba(255, 140, 0, 0.6)' },   // Light orange
      { fill: 'rgba(173, 216, 230, 0.3)', stroke: 'rgba(70, 130, 180, 0.6)' },  // Light blue
      { fill: 'rgba(255, 182, 193, 0.3)', stroke: 'rgba(220, 20, 60, 0.6)' },   // Light pink
    ];
    
    const colorIndex = index % groupColors.length;
    const colors = groupColors[colorIndex];
    
    d3.select(this)
      .attr('d', pathData)
      .attr('fill', colors.fill)
      .attr('stroke', colors.stroke)
      .attr('stroke-width', 2);
  });
}

// Helper function to expand convex hull outward
function expandHull(hull: [number, number][], padding: number): [number, number][] {
  // Calculate centroid
  const cx = hull.reduce((sum, p) => sum + p[0], 0) / hull.length;
  const cy = hull.reduce((sum, p) => sum + p[1], 0) / hull.length;
  
  // Expand each point outward from centroid
  return hull.map(([x, y]) => {
    const dx = x - cx;
    const dy = y - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist === 0) return [x, y];
    const scale = (dist + padding) / dist;
    return [cx + dx * scale, cy + dy * scale] as [number, number];
  });
}
