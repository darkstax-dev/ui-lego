import { TopologyNode, TopologyEdge } from '@/types/graph';

export interface HierarchicalLayoutOptions {
  width: number;
  height: number;
  levelSpacing?: number;
  nodeSpacing?: number;
}

export class HierarchicalLayoutEngine {
  private options: HierarchicalLayoutOptions;

  constructor(options: HierarchicalLayoutOptions) {
    this.options = {
      levelSpacing: 200,
      nodeSpacing: 150,
      ...options
    };
  }

  applyLayout(nodes: TopologyNode[], _edges: TopologyEdge[]): TopologyNode[] {
    const { width, levelSpacing, nodeSpacing } = this.options;

    const levels = this.buildLevels(nodes);
    
    const positionedNodes: TopologyNode[] = [];
    let currentY = 100;

    levels.forEach(levelNodes => {
      const totalWidth = levelNodes.length * nodeSpacing!;
      const startX = (width - totalWidth) / 2;

      levelNodes.forEach((node, index) => {
        positionedNodes.push({
          ...node,
          position: {
            x: startX + (index * nodeSpacing!),
            y: currentY
          }
        });
      });

      currentY += levelSpacing!;
    });

    return positionedNodes;
  }

  private buildLevels(nodes: TopologyNode[]): TopologyNode[][] {
    const typeOrder: Record<string, number> = {
      host: 0,
      namespace: 1,
      deployment: 1,
      pod: 2,
      container: 3,
      service: 2,
      netns: 4,
      ovsbridge: 4,
      veth: 5,
      device: 5,
      internal: 5,
      networkpolicy: 2
    };

    const levels: Map<number, TopologyNode[]> = new Map();

    nodes.forEach(node => {
      const level = typeOrder[node.type] ?? 6;
      if (!levels.has(level)) {
        levels.set(level, []);
      }
      levels.get(level)!.push(node);
    });

    return Array.from(levels.entries())
      .sort((a, b) => a[0] - b[0])
      .map(([_, nodes]) => nodes);
  }
}
