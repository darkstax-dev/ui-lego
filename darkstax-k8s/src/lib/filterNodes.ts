import { K8sNodeData } from '../types';

export function filterNodes(
  nodes: K8sNodeData[], 
  query: string
): K8sNodeData[] {
  if (!query.trim()) return nodes;
  
  const lowerQuery = query.toLowerCase();
  
  return nodes.filter(node => {
    const metadata = node.metadata || {};
    const highlightedMetadata = [
      metadata.Name,
      metadata.Namespace,
      metadata.Owner,
      metadata.Status,
      metadata.IP,
      metadata.Node,
      Array.isArray(metadata.Containers) ? metadata.Containers.join(' ') : undefined,
    ];

    const searchableText = [
      node.id,
      node.type,
      node.label,
      node.category,
      node.status || '',
      node.connections?.join(' ') || '',
      highlightedMetadata.filter(Boolean).join(' '),
      JSON.stringify(metadata)
    ].join(' ').toLowerCase();

    return searchableText.includes(lowerQuery);
  });
}

export function parseGremlinQuery(query: string): any {
  return { type: 'simple', value: query };
}
