import * as d3 from 'd3';
import { TopologyNode } from '@/types/graph';

export interface ClusterConfig {
  groupBy: 'type' | 'namespace' | 'state';
  showLabels: boolean;
  padding: number;
}

export class ClusterRenderer {
  private svg: d3.Selection<SVGGElement, unknown, null, undefined>;
  private config: ClusterConfig;

  constructor(
    svg: d3.Selection<SVGGElement, unknown, null, undefined>,
    config: ClusterConfig
  ) {
    this.svg = svg;
    this.config = config;
  }

  render(nodes: TopologyNode[]) {
    const clusters = this.groupNodes(nodes);

    const hullLayer = this.svg.select('.cluster-hulls');
    if (hullLayer.empty()) {
      this.svg.insert('g', ':first-child')
        .attr('class', 'cluster-hulls');
    }

    const hulls = this.svg.select('.cluster-hulls')
      .selectAll<SVGPathElement, [string, TopologyNode[]]>('.cluster-hull')
      .data(Array.from(clusters.entries()), d => d[0]);

    const hullsEnter = hulls.enter()
      .append('path')
      .attr('class', 'cluster-hull')
      .attr('fill', (_d, i) => d3.schemeCategory10[i % 10])
      .attr('fill-opacity', 0.1)
      .attr('stroke', (_d, i) => d3.schemeCategory10[i % 10])
      .attr('stroke-width', 2)
      .attr('stroke-opacity', 0.5);

    hulls.merge(hullsEnter)
      .transition()
      .duration(500)
      .attr('d', d => this.createHullPath(d[1]));

    hulls.exit()
      .transition()
      .duration(300)
      .attr('fill-opacity', 0)
      .attr('stroke-opacity', 0)
      .remove();

    if (this.config.showLabels) {
      this.renderClusterLabels(clusters);
    }
  }

  private groupNodes(nodes: TopologyNode[]): Map<string, TopologyNode[]> {
    const clusters = new Map<string, TopologyNode[]>();
    
    nodes.forEach(node => {
      let key: string;
      
      switch (this.config.groupBy) {
        case 'type':
          key = node.type;
          break;
        case 'namespace':
          key = node.data.metadata.Namespace || 'default';
          break;
        case 'state':
          key = node.data.metadata.State || 'unknown';
          break;
        default:
          key = 'default';
      }

      if (!clusters.has(key)) {
        clusters.set(key, []);
      }
      clusters.get(key)!.push(node);
    });

    return clusters;
  }

  private createHullPath(nodes: TopologyNode[]): string {
    if (nodes.length < 3) return '';

    const points = nodes.map(n => [n.position.x, n.position.y] as [number, number]);

    const hull = d3.polygonHull(points);
    if (!hull) return '';

    const centroid = d3.polygonCentroid(hull);
    const expandedHull = hull.map(point => {
      const dx = point[0] - centroid[0];
      const dy = point[1] - centroid[1];
      const distance = Math.sqrt(dx * dx + dy * dy);
      const scale = (distance + this.config.padding) / distance;
      
      return [
        centroid[0] + dx * scale,
        centroid[1] + dy * scale
      ] as [number, number];
    });

    const line = d3.line().curve(d3.curveCatmullRomClosed);
    return line(expandedHull) || '';
  }

  private renderClusterLabels(clusters: Map<string, TopologyNode[]>) {
    const labelLayer = this.svg.select('.cluster-labels');
    if (labelLayer.empty()) {
      this.svg.append('g').attr('class', 'cluster-labels');
    }

    const labels = this.svg.select('.cluster-labels')
      .selectAll<SVGTextElement, [string, TopologyNode[]]>('.cluster-label')
      .data(Array.from(clusters.entries()), d => d[0]);

    const labelsEnter = labels.enter()
      .append('text')
      .attr('class', 'cluster-label')
      .attr('text-anchor', 'middle')
      .attr('font-size', 14)
      .attr('font-weight', 'bold')
      .attr('fill', '#333')
      .attr('opacity', 0);

    labels.merge(labelsEnter)
      .text(d => `${d[0]} (${d[1].length})`)
      .transition()
      .duration(500)
      .attr('opacity', 1)
      .attr('x', d => {
        const points = d[1].map(n => n.position.x);
        return d3.mean(points) || 0;
      })
      .attr('y', d => {
        const points = d[1].map(n => n.position.y);
        return (d3.min(points) || 0) - 20;
      });

    labels.exit()
      .transition()
      .duration(300)
      .attr('opacity', 0)
      .remove();
  }

  clear() {
    this.svg.selectAll('.cluster-hulls').remove();
    this.svg.selectAll('.cluster-labels').remove();
  }
}
