import * as d3 from 'd3';
import { TopologyEdge } from '@/types/graph';
import { EdgeTypeConfig } from '@/types/config';

export class EdgeRenderer {
  private edgeTypeConfigs: Record<string, EdgeTypeConfig>;

  constructor(edgeTypeConfigs: Record<string, EdgeTypeConfig>) {
    this.edgeTypeConfigs = edgeTypeConfigs;
  }

  getEdgeConfig(edgeType: string): EdgeTypeConfig {
    return this.edgeTypeConfigs[edgeType] || this.getDefaultConfig();
  }

  private getDefaultConfig(): EdgeTypeConfig {
    return {
      label: 'Unknown',
      color: '#cbd5e1',
      width: 2,
      style: 'solid',
    };
  }

  getEdgeStyle(edge: TopologyEdge): {
    color: string;
    width: number;
    dashArray: string;
  } {
    const config = this.getEdgeConfig(edge.type);

    let dashArray = 'none';
    if (config.style === 'dashed') {
      dashArray = config.dashArray || '5,5';
    } else if (config.style === 'dotted') {
      dashArray = config.dashArray || '2,2';
    }

    return {
      color: config.color,
      width: config.width || 2,
      dashArray,
    };
  }

  applyEdgeStyle(
    edgeElement: d3.Selection<SVGLineElement, TopologyEdge, SVGGElement, unknown>,
    edge: TopologyEdge
  ): void {
    const style = this.getEdgeStyle(edge);

    edgeElement
      .attr('stroke', style.color)
      .attr('stroke-width', style.width)
      .attr('stroke-dasharray', style.dashArray);
  }

  updateEdgeSelection(
    svg: d3.Selection<SVGSVGElement, unknown, null, undefined>,
    selectedEdgeId: string | null,
    selectionColor: string = '#3b82f6',
    selectionWidth: number = 3
  ): void {
    svg.selectAll('line.edge')
      .attr('stroke', (d: any) => {
        if (d.id === selectedEdgeId) return selectionColor;
        const config = this.getEdgeConfig(d.type);
        return config.color;
      })
      .attr('stroke-width', (d: any) => 
        d.id === selectedEdgeId ? selectionWidth : this.getEdgeConfig(d.type).width || 2
      );
  }
}
