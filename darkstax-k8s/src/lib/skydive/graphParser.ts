import { SkydiveSyncReplyData } from '../../types/skydive';
import type { K8sNodeData, K8sNodeGroup, K8sResourceCategory, K8sResourceType } from '../../types';
import { getHierarchyLevelForResource, hierarchyConfig } from '../../hierarchyConfig';

const normalizeResourceType = (rawType?: string): K8sResourceType => {
  const type = (rawType || 'pod').toLowerCase();
  const mapping: Record<string, K8sResourceType> = {
    namespace: 'namespace',
    datacenter: 'datacenter',
    mobiletower: 'mobiletower',
    service: 'service',
    deployment: 'deployment',
    pod: 'pod',
    job: 'job',
    ingress: 'ingress',
    secret: 'secret',
    configmap: 'configmap',
    persistentvolume: 'persistentvolume',
    persistentvolumeclaim: 'persistentvolumeclaim',
    statefulset: 'statefulset',
    node: 'node',
    host: 'node',
    multus: 'multus',
  };

  return mapping[type] || 'pod';
};

const categoryByType: Record<K8sResourceType, K8sResourceCategory> = {
  namespace: 'aggregate',
  datacenter: 'aggregate',
  mobiletower: 'aggregate',
  deployment: 'load',
  pod: 'load',
  job: 'load',
  statefulset: 'load',
  service: 'service',
  ingress: 'service',
  multus: 'network',
  node: 'network',
  configmap: 'config-storage',
  secret: 'config-storage',
  persistentvolume: 'config-storage',
  persistentvolumeclaim: 'config-storage',
};

const statusFromMetadata = (metadata: Record<string, any>) => {
  const raw = String(metadata.Status || metadata.Phase || metadata.State || '').toLowerCase();
  if (raw.includes('error') || raw.includes('failed')) return 'error' as const;
  if (raw.includes('deploy') || raw.includes('pending') || raw.includes('creating')) return 'deploying' as const;
  if (raw.includes('terminated') || raw.includes('deleted') || raw.includes('stopped')) return 'terminated' as const;
  if (raw.includes('running') || raw.includes('active') || raw.includes('ready')) return 'active' as const;
  return 'ready' as const;
};

const indicatorFromMetadata = (metadata: Record<string, any>) => {
  if (typeof metadata.Replicas === 'number') return metadata.Replicas;
  if (Array.isArray(metadata.Containers)) return metadata.Containers.length;
  if (Array.isArray(metadata.Pods)) return metadata.Pods.length;
  return undefined;
};

export const parseSkydiveSyncReply = (data: SkydiveSyncReplyData): {
  nodes: K8sNodeData[];
  groups: K8sNodeGroup[];
} => {
  const edges = Object.values(data.Edges || {});
  const connections = new Map<string, string[]>();
  const ownershipEdges = edges.filter((edge) => edge.Metadata?.RelationType === 'ownership');

  edges.forEach((edge) => {
    const list = connections.get(edge.Parent) || [];
    list.push(edge.Child);
    connections.set(edge.Parent, list);
  });

  const nodes: K8sNodeData[] = Object.values(data.Nodes || {}).map((node) => {
    const metadata = node.Metadata || {};
    const type = normalizeResourceType(metadata.Type);
    const indicatorCount = indicatorFromMetadata(metadata);

    return {
      id: node.ID,
      type,
      label: metadata.Name || metadata.Label || metadata.Type || node.ID,
      category: categoryByType[type] || 'load',
      metadata,
      status: statusFromMetadata(metadata),
      indicatorCount: indicatorCount && indicatorCount > 0 ? indicatorCount : undefined,
      connections: connections.get(node.ID),
    };
  });

  const nodeById = new Map(nodes.map((node) => [node.id, node] as const));
  const groupMembers = new Map<string, string[]>();

  ownershipEdges.forEach((edge) => {
    const parentNode = nodeById.get(edge.Parent);
    const childNode = nodeById.get(edge.Child);
    if (!parentNode || !childNode) return;

    // Unlike the old logic, allow cross-category ownership (namespace contains deployments, services, etc.)
    const members = groupMembers.get(edge.Parent) || [];
    members.push(edge.Child);
    groupMembers.set(edge.Parent, members);
  });

  const groups: K8sNodeGroup[] = Array.from(groupMembers.entries()).map(([ownerId, memberIds]) => {
    const owner = nodeById.get(ownerId);
    const level = owner ? getHierarchyLevelForResource(owner.type, hierarchyConfig) : 0;

    return {
      id: `group-${ownerId}`,
      ownerId,
      memberIds,
      collapsed: false,
      level,
      depth: level + 1,
    };
  });

  return { nodes, groups };
};
