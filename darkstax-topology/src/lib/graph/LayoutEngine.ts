import { TopologyNode, TopologyEdge } from '@/types/graph';
import { LayoutAlgorithm } from '@/types/topology';
import { ForceLayoutEngine, ForceLayoutOptions } from '@/lib/d3/forceLayout';
import { HierarchicalLayoutEngine, HierarchicalLayoutOptions } from '@/lib/d3/hierarchicalLayout';

export class LayoutEngine {
  private forceEngine: ForceLayoutEngine | null = null;
  private hierarchicalEngine: HierarchicalLayoutEngine | null = null;
  private currentAlgorithm: LayoutAlgorithm = 'force';

  constructor(
    private width: number,
    private height: number
  ) {}

  setAlgorithm(algorithm: LayoutAlgorithm) {
    this.currentAlgorithm = algorithm;
  }

  applyLayout(
    nodes: TopologyNode[],
    edges: TopologyEdge[],
    algorithm?: LayoutAlgorithm
  ): Promise<TopologyNode[]> {
    const layoutAlgorithm = algorithm || this.currentAlgorithm;

    switch (layoutAlgorithm) {
      case 'force':
        return this.applyForceLayout(nodes, edges);
      case 'hierarchical':
        return this.applyHierarchicalLayout(nodes, edges);
      case 'manual':
        return Promise.resolve(nodes);
      default:
        return Promise.resolve(nodes);
    }
  }

  private applyForceLayout(
    nodes: TopologyNode[],
    edges: TopologyEdge[]
  ): Promise<TopologyNode[]> {
    return new Promise((resolve) => {
      const options: ForceLayoutOptions = {
        width: this.width,
        height: this.height,
        chargeStrength: -1000,
        linkDistance: 150,
        collideRadius: 80,
        alphaDecay: 0.02
      };

      this.forceEngine = new ForceLayoutEngine(options);
      const simulation = this.forceEngine.createSimulation(nodes, edges);

      let ticks = 0;
      const maxTicks = 300;

      simulation.on('tick', () => {
        ticks++;
        if (ticks >= maxTicks || simulation.alpha() < 0.01) {
          simulation.stop();
          
          const updatedNodes = nodes.map(node => {
            const d3Node = simulation.nodes().find(n => n.id === node.id);
            if (d3Node && d3Node.x !== undefined && d3Node.y !== undefined) {
              return {
                ...node,
                position: { x: d3Node.x, y: d3Node.y }
              };
            }
            return node;
          });
          
          resolve(updatedNodes);
        }
      });
    });
  }

  private applyHierarchicalLayout(
    nodes: TopologyNode[],
    edges: TopologyEdge[]
  ): Promise<TopologyNode[]> {
    const options: HierarchicalLayoutOptions = {
      width: this.width,
      height: this.height,
      levelSpacing: 200,
      nodeSpacing: 150
    };

    this.hierarchicalEngine = new HierarchicalLayoutEngine(options);
    const positionedNodes = this.hierarchicalEngine.applyLayout(nodes, edges);
    return Promise.resolve(positionedNodes);
  }

  stop() {
    if (this.forceEngine) {
      this.forceEngine.stop();
    }
  }

  restart() {
    if (this.forceEngine) {
      this.forceEngine.restart();
    }
  }
}
