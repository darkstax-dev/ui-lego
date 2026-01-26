import { flextree } from 'd3-flextree';
import { K8sNodeData, K8sNodeGroup } from '../../types';

interface FlextreeNode {
  id: string;
  children?: FlextreeNode[];
}

interface LayoutOptions {
  nodeWidth?: number;
  nodeHeight?: number;
  spacing?: number;
}

export function applyFlextreeLayout(
  nodes: K8sNodeData[],
  options: LayoutOptions = {}
): K8sNodeData[] {
  const { nodeWidth = 150, nodeHeight = 80, spacing = 50 } = options;

  if (nodes.length === 0) return nodes;

  const hierarchy = buildHierarchy(nodes);

  const layout = flextree({
    nodeSize: () => [nodeWidth + spacing, nodeHeight + spacing],
    spacing: spacing
  });

  const tree = layout.hierarchy(hierarchy);
  const positioned: any = layout(tree);

  const nodeMap = new Map<string, { x: number; y: number }>();
  positioned.each((d: any) => {
    nodeMap.set(d.data.id, { x: d.x, y: d.y });
  });

  return nodes.map(node => ({
    ...node,
    position: nodeMap.get(node.id) || node.position || { x: 0, y: 0 }
  }));
}

export function applyOwnershipTreeLayout(
  nodes: K8sNodeData[],
  groups: K8sNodeGroup[],
  options: LayoutOptions = {}
): K8sNodeData[] {
  const { nodeWidth = 150, nodeHeight = 80, spacing = 50 } = options;
  if (nodes.length === 0) return nodes;

  const hierarchy = buildOwnershipHierarchy(nodes, groups);
  const layout = flextree({
    nodeSize: () => [nodeWidth + spacing, nodeHeight + spacing],
    spacing: spacing,
  });

  const tree = layout.hierarchy(hierarchy);
  const positioned: any = layout(tree);

  const nodeMap = new Map<string, { x: number; y: number }>();
  positioned.each((d: any) => {
    nodeMap.set(d.data.id, { x: d.x, y: d.y });
  });

  return nodes.map(node => ({
    ...node,
    position: nodeMap.get(node.id) || node.position || { x: 0, y: 0 },
  }));
}

export function applyCircularLayout(
  nodes: K8sNodeData[],
  options: { radius?: number; center?: { x: number; y: number } } = {}
): K8sNodeData[] {
  if (nodes.length === 0) return nodes;

  const radius = options.radius ?? Math.max(220, nodes.length * 28);
  const center = options.center ?? { x: radius + 120, y: radius + 120 };

  return nodes.map((node, index) => {
    const angle = (2 * Math.PI * index) / nodes.length;
    return {
      ...node,
      position: {
        x: center.x + radius * Math.cos(angle),
        y: center.y + radius * Math.sin(angle),
      }
    };
  });
}

function buildHierarchy(nodes: K8sNodeData[]): FlextreeNode {
  const nodeMap = new Map(nodes.map(n => [n.id, { id: n.id, children: [] as FlextreeNode[] }]));

  const root: FlextreeNode = {
    id: 'root',
    children: Array.from(nodeMap.values())
  };

  return root;
}

function buildOwnershipHierarchy(nodes: K8sNodeData[], groups: K8sNodeGroup[]): FlextreeNode {
  const nodeMap = new Map(nodes.map((node) => [
    node.id,
    { id: node.id, children: [] as FlextreeNode[] }
  ]));

  const memberIds = new Set<string>();

  groups.forEach((group) => {
    const ownerNode = nodeMap.get(group.ownerId);
    if (!ownerNode) return;

    group.memberIds.forEach((memberId) => {
      const memberNode = nodeMap.get(memberId);
      if (!memberNode) return;
      if (!ownerNode.children?.includes(memberNode)) {
        ownerNode.children?.push(memberNode);
      }
      memberIds.add(memberId);
    });
  });

  const root: FlextreeNode = {
    id: 'root',
    children: nodes
      .filter((node) => !memberIds.has(node.id))
      .map((node) => nodeMap.get(node.id)!)
  };

  return root;
}
