import * as d3 from 'd3-force';
import { TopologyNode, TopologyEdge } from '@/types/graph';

export interface ForceLayoutOptions {
  width: number;
  height: number;
  chargeStrength?: number;
  linkDistance?: number;
  linkStrength?: number;
  collideRadius?: number;
  centerStrength?: number;
  alphaDecay?: number;
  alphaMin?: number;
  velocityDecay?: number;
  groupPadding?: number;
  groupStrength?: number;
  autoStabilize?: boolean;
  stabilizationThreshold?: number;
  onStabilized?: () => void;
}

export interface D3SimulationNode extends TopologyNode {
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
  fx?: number | null;
  fy?: number | null;
  index?: number;
}

export interface D3SimulationLink {
  source: string | D3SimulationNode;
  target: string | D3SimulationNode;
  distance?: number;
  strength?: number;
}

export class ForceLayoutEngine {
  private simulation: d3.Simulation<D3SimulationNode, D3SimulationLink> | null = null;
  private options: Required<Omit<ForceLayoutOptions, 'onStabilized'>> & { onStabilized?: () => void };
  private isStabilized: boolean = false;
  private stabilizationCheckCount: number = 0;

  constructor(options: ForceLayoutOptions) {
    this.options = {
      chargeStrength: -800,
      linkDistance: 120,
      linkStrength: 0.7,
      collideRadius: 60,
      centerStrength: 0.1,
      alphaDecay: 0.05,
      alphaMin: 0.001,
      velocityDecay: 0.4,
      groupPadding: 20,
      groupStrength: 0.5,
      autoStabilize: true,
      stabilizationThreshold: 0.5,
      ...options
    };
  }

  createSimulation(
    nodes: TopologyNode[], 
    edges: TopologyEdge[],
    groups?: Map<string, TopologyNode[]>
  ): d3.Simulation<D3SimulationNode, D3SimulationLink> {
    const { 
      width, 
      height, 
      chargeStrength, 
      linkDistance, 
      linkStrength,
      collideRadius, 
      centerStrength, 
      alphaDecay,
      alphaMin,
      velocityDecay
    } = this.options;

    const d3Nodes: D3SimulationNode[] = nodes.map(node => ({
      ...node,
      x: node.position.x || width / 2 + (Math.random() - 0.5) * 100,
      y: node.position.y || height / 2 + (Math.random() - 0.5) * 100,
    }));

    const d3Links: D3SimulationLink[] = edges.map(edge => ({
      source: edge.source,
      target: edge.target,
      distance: this.calculateLinkDistance(edge),
      strength: this.calculateLinkStrength(edge)
    }));

    this.simulation = d3.forceSimulation(d3Nodes)
      .velocityDecay(velocityDecay)
      .alphaDecay(alphaDecay)
      .alphaMin(alphaMin);

    this.simulation
      .force('charge', d3.forceManyBody()
        .strength(chargeStrength)
        .distanceMax(500)
      )
      .force('link', d3.forceLink<D3SimulationNode, D3SimulationLink>(d3Links)
        .id(d => d.id)
        .distance(d => d.distance || linkDistance)
        .strength(d => d.strength || linkStrength)
      )
      .force('collide', d3.forceCollide<D3SimulationNode>()
        .radius(collideRadius)
        .strength(0.7)
      )
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('x', d3.forceX(width / 2).strength(centerStrength))
      .force('y', d3.forceY(height / 2).strength(centerStrength));

    if (groups && groups.size > 0) {
      this.addGroupForces(groups);
    }

    // Add stabilization detection
    if (this.options.autoStabilize) {
      this.simulation.on('tick', () => {
        this.checkStabilization();
      });
    }

    return this.simulation;
  }

  private calculateLinkDistance(edge: TopologyEdge): number {
    const baseDistance = 120;
    
    if (edge.type === 'ownership') {
      return baseDistance * 0.6;
    }
    
    if (edge.type === 'policy') {
      return baseDistance * 1.5;
    }
    
    let distance = baseDistance;
    if (edge.data.bandwidth) {
      distance *= (1 - edge.data.bandwidth * 0.3);
    }
    
    return distance;
  }

  private calculateLinkStrength(edge: TopologyEdge): number {
    if (edge.type === 'ownership') {
      return 1.0;
    }
    
    if (edge.type === 'policy') {
      return 0.3;
    }
    
    return 0.7;
  }

  private addGroupForces(groups: Map<string, TopologyNode[]>) {
    const { groupStrength } = this.options;
    
    this.simulation?.force('group', (alpha) => {
      groups.forEach((members) => {
        if (members.length < 2) return;
        
        let cx = 0, cy = 0;
        members.forEach(node => {
          cx += node.x || 0;
          cy += node.y || 0;
        });
        cx /= members.length;
        cy /= members.length;
        
        members.forEach(node => {
          if (node.x !== undefined && node.y !== undefined) {
            const dx = cx - node.x;
            const dy = cy - node.y;
            node.vx = (node.vx || 0) + dx * groupStrength * alpha;
            node.vy = (node.vy || 0) + dy * groupStrength * alpha;
          }
        });
      });
    });
  }

  restart() {
    if (this.simulation) {
      this.simulation.alpha(1).restart();
    }
  }

  stop() {
    if (this.simulation) {
      this.simulation.stop();
    }
  }

  private checkStabilization() {
    if (!this.simulation || this.isStabilized) return;

    const alpha = this.simulation.alpha();
    const nodes = this.simulation.nodes();

    // Check alpha threshold
    if (alpha < 0.005) {
      this.stabilize();
      return;
    }

    // Check velocity threshold
    const maxVelocity = Math.max(
      ...nodes.map(n => Math.sqrt((n.vx || 0) ** 2 + (n.vy || 0) ** 2))
    );

    if (maxVelocity < (this.options.stabilizationThreshold || 0.5)) {
      this.stabilizationCheckCount++;
      
      // Require 3 consecutive checks below threshold to confirm stabilization
      if (this.stabilizationCheckCount >= 3) {
        this.stabilize();
      }
    } else {
      this.stabilizationCheckCount = 0;
    }
  }

  private stabilize() {
    if (this.isStabilized) return;
    
    this.isStabilized = true;
    this.simulation?.stop();
    
    console.log('Force layout stabilized');
    
    if (this.options.onStabilized) {
      this.options.onStabilized();
    }
  }

  isLayoutStabilized(): boolean {
    return this.isStabilized;
  }

  resetStabilization() {
    this.isStabilized = false;
    this.stabilizationCheckCount = 0;
  }

  getSimulation() {
    return this.simulation;
  }

  updateParameters(params: Partial<ForceLayoutOptions>) {
    Object.assign(this.options, params);
    
    if (!this.simulation) return;
    
    if (params.chargeStrength !== undefined) {
      this.simulation.force('charge', d3.forceManyBody()
        .strength(params.chargeStrength)
        .distanceMax(500)
      );
    }
    
    if (params.collideRadius !== undefined) {
      this.simulation.force('collide', d3.forceCollide<D3SimulationNode>()
        .radius(params.collideRadius)
        .strength(0.7)
      );
    }
    
    this.restart();
  }
}
