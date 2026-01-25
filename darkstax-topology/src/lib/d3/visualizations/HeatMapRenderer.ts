import * as d3 from 'd3';
import { TopologyNode, TopologyEdge } from '@/types/graph';

export interface HeatMapConfig {
  metric: 'bandwidth' | 'latency' | 'cpu' | 'memory';
  colorScale: 'sequential' | 'diverging';
  opacity: number;
}

export class HeatMapRenderer {
  private svg: d3.Selection<SVGGElement, unknown, null, undefined>;
  private config: HeatMapConfig;

  constructor(
    svg: d3.Selection<SVGGElement, unknown, null, undefined>,
    config: HeatMapConfig
  ) {
    this.svg = svg;
    this.config = config;
  }

  render(nodes: TopologyNode[], edges: TopologyEdge[]) {
    const values = this.extractMetricValues(nodes);
    const colorScale = this.createColorScale(values);

    const nodeGroups = this.svg.selectAll<SVGGElement, TopologyNode>('.node')
      .data(nodes, (d) => d.id);

    nodeGroups.each((d, i, nodeElements) => {
      const node = d3.select(nodeElements[i]);
      const value = this.getMetricValue(d);

      node.select('.heatmap-overlay').remove();
      
      node.append('circle')
        .attr('class', 'heatmap-overlay')
        .attr('r', 30)
        .attr('fill', colorScale(value))
        .attr('opacity', this.config.opacity)
        .attr('pointer-events', 'none')
        .transition()
        .duration(500)
        .attr('r', 25);
    });

    const edgeGroups = this.svg.selectAll<SVGPathElement, TopologyEdge>('.edge')
      .data(edges, (d) => d.id);

    edgeGroups.each((d, i, edgeElements) => {
      const edge = d3.select(edgeElements[i]);
      const bandwidth = d.data.bandwidth || 0;
      edge.transition()
        .duration(500)
        .attr('stroke', colorScale(bandwidth))
        .attr('stroke-width', Math.max(1, bandwidth * 5));
    });
  }

  private extractMetricValues(nodes: TopologyNode[]): number[] {
    return nodes.map(node => this.getMetricValue(node)).filter(v => v !== null) as number[];
  }

  private getMetricValue(node: TopologyNode): number {
    switch (this.config.metric) {
      case 'bandwidth':
        return node.data.bandwidth || 0;
      case 'latency':
        return node.data.metadata.LastUpdateMetric?.RTT || 0;
      case 'cpu':
        return (node.data.metadata.LastUpdateMetric?.RxBytes || 0) / 1000000;
      case 'memory':
        return (node.data.metadata.LastUpdateMetric?.TxBytes || 0) / 1000000;
      default:
        return 0;
    }
  }

  private createColorScale(values: number[]): d3.ScaleSequential<string> {
    const extent = d3.extent(values) as [number, number];
    
    if (this.config.colorScale === 'sequential') {
      return d3.scaleSequential(d3.interpolateYlOrRd)
        .domain(extent);
    } else {
      const midpoint = (extent[0] + extent[1]) / 2;
      return d3.scaleSequential(d3.interpolateRdYlGn)
        .domain([extent[1], midpoint, extent[0]]);
    }
  }

  clear() {
    this.svg.selectAll('.heatmap-overlay').remove();
  }
}
