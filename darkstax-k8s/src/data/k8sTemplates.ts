import { K8sResourceTemplate } from '../types';

export const k8sResourceTemplates: K8sResourceTemplate[] = [
  // Aggregate / Cluster
  {
    id: 'tpl-namespace',
    type: 'namespace',
    label: 'Namespace',
    category: 'aggregate',
    description: 'Kubernetes namespace'
  },
  {
    id: 'tpl-node',
    type: 'node',
    label: 'Node',
    category: 'aggregate',
    description: 'Cluster node'
  },
  
  // Workloads / Load
  {
    id: 'tpl-deployment',
    type: 'deployment',
    label: 'Deployment',
    category: 'load',
    description: 'Deployment resource'
  },
  {
    id: 'tpl-pod',
    type: 'pod',
    label: 'Pod',
    category: 'load',
    description: 'Pod resource'
  },
  {
    id: 'tpl-job',
    type: 'job',
    label: 'Job',
    category: 'load',
    description: 'Job resource'
  },
  {
    id: 'tpl-statefulset',
    type: 'statefulset',
    label: 'StatefulSet',
    category: 'load',
    description: 'StatefulSet resource'
  },
  
  // Networking / Service
  {
    id: 'tpl-service',
    type: 'service',
    label: 'Service',
    category: 'service',
    description: 'Service resource'
  },
  {
    id: 'tpl-ingress',
    type: 'ingress',
    label: 'Ingress',
    category: 'service',
    description: 'Ingress resource'
  },
  
  // Network
  {
    id: 'tpl-multus',
    type: 'multus',
    label: 'Multus',
    category: 'network',
    description: 'Multus CNI'
  },
  
  // Config
  {
    id: 'tpl-secret',
    type: 'secret',
    label: 'Secret',
    category: 'config',
    description: 'Secret resource'
  },
  {
    id: 'tpl-configmap',
    type: 'configmap',
    label: 'ConfigMap',
    category: 'config',
    description: 'ConfigMap resource'
  },
  {
    id: 'tpl-pv',
    type: 'persistentvolume',
    label: 'PersistentVolume',
    category: 'storage',
    description: 'PersistentVolume resource'
  },
  {
    id: 'tpl-pvc',
    type: 'persistentvolumeclaim',
    label: 'PVC',
    category: 'storage',
    description: 'PersistentVolumeClaim resource'
  },
];

export const statusColors = {
  ready: { hex: 'var(--status-ready)', label: 'Not deployed / Ready' },
  deploying: { hex: 'var(--status-deploying)', label: 'Deploying' },
  active: { hex: 'var(--status-active)', label: 'Active / Deployed / Running' },
  error: { hex: 'var(--status-error)', label: 'Error' },
  terminated: { hex: 'var(--status-terminated)', label: 'Terminated' },
};
