import { TopologyNode, TopologyEdge } from '@/types/graph';

export interface QueryResult {
  nodes: TopologyNode[];
  edges: TopologyEdge[];
}

export class FilterEngine {
  private nodes: TopologyNode[];
  private edges: TopologyEdge[];

  constructor(nodes: TopologyNode[], edges: TopologyEdge[]) {
    this.nodes = nodes;
    this.edges = edges;
  }

  executeQuery(query: string): QueryResult {
    try {
      query = query.trim();

      if (!query) {
        return { nodes: this.nodes, edges: this.edges };
      }

      const steps = this.parseQuery(query);
      
      let result: any = null;
      let isNodeQuery = false;
      let isEdgeQuery = false;

      for (const step of steps) {
        if (step.method === 'V') {
          result = [...this.nodes];
          isNodeQuery = true;
        } else if (step.method === 'E') {
          result = [...this.edges];
          isEdgeQuery = true;
        } else if (step.method === 'Has' && result) {
          result = this.applyHasFilter(result, step.args);
        } else if (step.method === 'HasKey' && result) {
          result = this.applyHasKeyFilter(result, step.args);
        } else if (step.method === 'Limit' && result) {
          result = result.slice(0, parseInt(step.args[0]));
        }
      }

      if (isNodeQuery) {
        return { nodes: result || [], edges: [] };
      } else if (isEdgeQuery) {
        return { nodes: [], edges: result || [] };
      }

      return { nodes: this.nodes, edges: this.edges };
    } catch (error) {
      console.error('Query execution error:', error);
      return { nodes: this.nodes, edges: this.edges };
    }
  }

  private parseQuery(query: string): Array<{ method: string; args: string[] }> {
    const steps: Array<{ method: string; args: string[] }> = [];
    
    const stepRegex = /\.(\w+)\(([^)]*)\)/g;
    let match;

    while ((match = stepRegex.exec(query)) !== null) {
      const method = match[1];
      const argsStr = match[2];
      const args = argsStr ? argsStr.split(',').map(arg => arg.trim().replace(/['"]/g, '')) : [];
      
      steps.push({ method, args });
    }

    return steps;
  }

  private applyHasFilter(items: any[], args: string[]): any[] {
    if (args.length < 2) return items;

    const [key, value] = args;

    return items.filter(item => {
      const metadata = item.data?.metadata || item.metadata;
      if (!metadata) return false;

      const actualValue = metadata[key];
      
      if (typeof actualValue === 'string') {
        return actualValue === value;
      } else if (typeof actualValue === 'number') {
        return actualValue === parseFloat(value);
      } else if (typeof actualValue === 'boolean') {
        return actualValue === (value === 'true');
      }

      return String(actualValue) === value;
    });
  }

  private applyHasKeyFilter(items: any[], args: string[]): any[] {
    if (args.length < 1) return items;

    const key = args[0];

    return items.filter(item => {
      const metadata = item.data?.metadata || item.metadata;
      return metadata && key in metadata;
    });
  }

  highlightNodes(searchTerm: string): Set<string> {
    const highlighted = new Set<string>();
    if (!searchTerm) return highlighted;

    const term = searchTerm.toLowerCase();

    this.nodes.forEach(node => {
      const label = node.data.label.toLowerCase();
      const type = node.type.toLowerCase();
      const id = node.id.toLowerCase();

      if (label.includes(term) || type.includes(term) || id.includes(term)) {
        highlighted.add(node.id);
      }

      const metadata = node.data.metadata;
      const metadataStr = JSON.stringify(metadata).toLowerCase();
      if (metadataStr.includes(term)) {
        highlighted.add(node.id);
      }
    });

    return highlighted;
  }
}
