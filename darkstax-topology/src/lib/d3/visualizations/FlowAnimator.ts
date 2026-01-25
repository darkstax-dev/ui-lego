import * as d3 from 'd3';
import { TopologyEdge } from '@/types/graph';

export interface FlowConfig {
  speed: number;
  particleCount: number;
  particleSize: number;
  color: string;
}

export class FlowAnimator {
  private svg: d3.Selection<SVGGElement, unknown, null, undefined>;
  private config: FlowConfig;
  private animationFrameId: number | null = null;

  constructor(
    svg: d3.Selection<SVGGElement, unknown, null, undefined>,
    config: FlowConfig
  ) {
    this.svg = svg;
    this.config = config;
  }

  start(edges: TopologyEdge[]) {
    this.stop();

    const particleLayer = this.svg.append('g')
      .attr('class', 'flow-particles');

    edges.forEach(edge => {
      if (!edge.data.bandwidth || edge.data.bandwidth < 0.1) return;

      const edgeElement = this.svg.select(`[data-edge-id="${edge.id}"]`);
      if (edgeElement.empty()) return;

      const pathLength = (edgeElement.node() as SVGPathElement)?.getTotalLength() || 0;
      const particleCount = Math.ceil(this.config.particleCount * edge.data.bandwidth);

      for (let i = 0; i < particleCount; i++) {
        this.createParticle(particleLayer, edge, pathLength, i / particleCount);
      }
    });
  }

  private createParticle(
    layer: d3.Selection<SVGGElement, unknown, null, undefined>,
    edge: TopologyEdge,
    pathLength: number,
    offset: number
  ) {
    const particle = layer.append('circle')
      .attr('class', 'flow-particle')
      .attr('r', this.config.particleSize)
      .attr('fill', this.config.color)
      .attr('opacity', 0.8);

    const animate = () => {
      const duration = (10000 / this.config.speed) * (1 / (edge.data.bandwidth || 1));
      
      particle
        .attr('offset', offset)
        .transition()
        .duration(duration)
        .ease(d3.easeLinear)
        .attrTween('transform', () => {
          return (t: number) => {
            const edgeElement = this.svg.select(`[data-edge-id="${edge.id}"]`);
            if (edgeElement.empty()) return '';
            
            const point = (edgeElement.node() as SVGPathElement)
              ?.getPointAtLength(((t + offset) % 1) * pathLength);
            
            return point ? `translate(${point.x}, ${point.y})` : '';
          };
        })
        .on('end', animate);
    };

    animate();
  }

  stop() {
    this.svg.selectAll('.flow-particles').remove();
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }
}
