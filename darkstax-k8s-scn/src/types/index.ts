export type K8sResourceType =
  | 'namespace'
  | 'service'
  | 'deployment'
  | 'pod'
  | 'job'
  | 'ingress'
  | 'secret'
  | 'configmap'
  | 'persistentvolume'
  | 'persistentvolumeclaim'
  | 'statefulset'
  | 'node'
  | 'multus';

export type K8sResourceCategory =
  | 'load'
  | 'service'
  | 'network'
  | 'storage'
  | 'config'
  | 'aggregate';

export interface K8sResourceTemplate {
  id: string;
  type: K8sResourceType;
  label: string;
  category: K8sResourceCategory;
  description: string;
}

export interface K8sNodeData {
  id: string;
  type: K8sResourceType;
  label: string;
  category: K8sResourceCategory;
  metadata: Record<string, any>;
  status?: 'ready' | 'deploying' | 'active' | 'error' | 'terminated';
  position?: { x: number; y: number };
  indicatorCount?: number;
  connections?: string[]; // IDs of connected nodes
  groupId?: string;
  collapsed?: boolean;
  hidden?: boolean;
}

export interface Filter {
  id: string;
  label: string;
  query: string;
  active: boolean;
}

export type LayoutMode = 'hierarchy' | 'force' | 'tree';

export interface StatusLegendItem {
  status: string;
  label: string;
  color: string;
}

export interface K8sNodeGroup {
  id: string;
  ownerId: string;
  memberIds: string[];
  collapsed: boolean;
  level: number;
  depth: number;
  parentGroupId?: string;
}
