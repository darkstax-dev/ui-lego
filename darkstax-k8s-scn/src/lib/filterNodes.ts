import { K8sNodeData } from '../types';

export function filterNodes(
  nodes: K8sNodeData[], 
  query: string
): K8sNodeData[] {
  if (!query.trim()) return nodes;
  
  const lowerQuery = query.toLowerCase();
  
  return nodes.filter(node => {
    const searchableText = [
      node.id,
      node.type,
      node.label,
      node.category,
      node.status || '',
      JSON.stringify(node.metadata)
    ].join(' ').toLowerCase();
    
    return searchableText.includes(lowerQuery);
  });
}

export function parseGremlinQuery(query: string): any {
  return { type: 'simple', value: query };
}
