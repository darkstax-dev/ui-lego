import { flextree } from 'd3-flextree';
import { K8sNodeData } from '../../types';

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
  const positioned = layout(tree);
  
  const nodeMap = new Map<string, { x: number; y: number }>();
  positioned.each((d: any) => {
    nodeMap.set(d.data.id, { x: d.x, y: d.y });
  });
  
  return nodes.map(node => ({
    ...node,
    position: nodeMap.get(node.id) || node.position || { x: 0, y: 0 }
  }));
}

function buildHierarchy(nodes: K8sNodeData[]): FlextreeNode {
  const nodeMap = new Map(nodes.map(n => [n.id, { id: n.id, children: [] as FlextreeNode[] }]));
  
  const root: FlextreeNode = {
    id: 'root',
    children: Array.from(nodeMap.values())
  };
  
  return root;
}
