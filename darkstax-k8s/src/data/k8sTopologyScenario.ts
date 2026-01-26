import { K8sNodeData } from '../types';

export interface K8sTopologyScenario {
  name: string;
  description: string;
  nodes: K8sNodeData[];
  groups?: K8sNodeGroup[];
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

export const kubernetesTopologyScenario: K8sTopologyScenario = {
  name: 'Kubernetes Microservices Cluster',
  description: 'A complete Kubernetes cluster with namespaces, deployments, pods, services, and networking',
  nodes: [
    ...Array.from({ length: 50 }, (_, index) => {
      const n = index + 1;
      const id = `dc-${String(n).padStart(2, '0')}`;
      return {
        id,
        type: 'datacenter' as const,
        label: `DC${String(n).padStart(2, '0')}`,
        category: 'aggregate' as const,
        metadata: {
          Type: 'datacenter',
          Name: id,
          Description: 'Aggregate datacenter',
          ...(n > 10 ? { ParentAggregate: n <= 30 ? 'dc-01' : 'dc-02' } : {}),
        },
        status: 'active',
        connections: n <= 5 ? [`tower-${String(n).padStart(2, '0')}`] : [],
      };
    }),
    ...Array.from({ length: 50 }, (_, index) => {
      const n = index + 1;
      const id = `tower-${String(n).padStart(2, '0')}`;
      return {
        id,
        type: 'mobiletower',
        label: `Tower${String(n).padStart(2, '0')}`,
        category: 'aggregate',
        metadata: {
          Type: 'mobiletower',
          Name: id,
          Description: 'Aggregate mobile tower',
          ...(n <= 30 ? { ParentAggregate: 'dc-01' } : { ParentAggregate: 'dc-02' }),
        },
        status: 'active',
        connections: n <= 5 ? [`dc-${String(n).padStart(2, '0')}`] : [],
      };
    }),
    {
      id: 'ns-production',
      type: 'namespace',
      label: 'production',
      category: 'aggregate',
      metadata: {
        Type: 'namespace',
        Name: 'production',
        Description: 'Production namespace',
        ResourceQuota: {
          cpu: '10',
          memory: '20Gi',
          pods: '50'
        }
      },
      status: 'active',
    },
    {
      id: 'ns-staging',
      type: 'namespace',
      label: 'staging',
      category: 'aggregate',
      metadata: {
        Type: 'namespace',
        Name: 'staging',
        Description: 'Staging namespace',
        ResourceQuota: {
          cpu: '5',
          memory: '10Gi',
          pods: '25'
        }
      },
      status: 'active',
    },
    {
      id: 'deploy-frontend',
      type: 'deployment',
      label: 'frontend-deployment',
      category: 'load',
      metadata: {
        Type: 'deployment',
        Name: 'frontend-deployment',
        Namespace: 'ns-production',
        Replicas: 3,
        Strategy: 'RollingUpdate',
        Labels: {
          app: 'frontend',
          tier: 'web'
        }
      },
      status: 'active',
      connections: ['svc-frontend']
    },
    {
      id: 'pod-frontend-1',
      type: 'pod',
      label: 'frontend-pod-1',
      category: 'load',
      metadata: {
        Type: 'pod',
        Name: 'frontend-pod-1',
        Namespace: 'ns-production',
        Owner: 'deploy-frontend',
        Status: 'Running',
        IP: '10.244.1.10',
        Node: 'worker-node-1',
        Containers: ['nginx', 'sidecar-proxy']
      },
      status: 'active',
      indicatorCount: 2,
      connections: ['svc-frontend', 'configmap-frontend', 'secret-frontend']
    },
    {
      id: 'pod-frontend-2',
      type: 'pod',
      label: 'frontend-pod-2',
      category: 'load',
      metadata: {
        Type: 'pod',
        Name: 'frontend-pod-2',
        Namespace: 'ns-production',
        Owner: 'deploy-frontend',
        Status: 'Running',
        IP: '10.244.1.11',
        Node: 'worker-node-2',
        Containers: ['nginx', 'sidecar-proxy']
      },
      status: 'active',
      indicatorCount: 2,
      connections: ['svc-frontend', 'configmap-frontend', 'secret-frontend']
    },
    {
      id: 'pod-frontend-3',
      type: 'pod',
      label: 'frontend-pod-3',
      category: 'load',
      metadata: {
        Type: 'pod',
        Name: 'frontend-pod-3',
        Namespace: 'ns-production',
        Owner: 'deploy-frontend',
        Status: 'Running',
        IP: '10.244.1.12',
        Node: 'worker-node-1',
        Containers: ['nginx', 'sidecar-proxy']
      },
      status: 'deploying',
      indicatorCount: 2,
      connections: ['svc-frontend', 'configmap-frontend', 'secret-frontend']
    },
    {
      id: 'deploy-backend',
      type: 'deployment',
      label: 'backend-api-deployment',
      category: 'load',
      metadata: {
        Type: 'deployment',
        Name: 'backend-api-deployment',
        Namespace: 'ns-production',
        Replicas: 4,
        Strategy: 'RollingUpdate',
        Labels: {
          app: 'backend',
          tier: 'api'
        }
      },
      status: 'active',
      connections: ['svc-backend']
    },
    {
      id: 'pod-backend-1',
      type: 'pod',
      label: 'backend-api-1',
      category: 'load',
      metadata: {
        Type: 'pod',
        Name: 'backend-api-1',
        Namespace: 'ns-production',
        Owner: 'deploy-backend',
        Status: 'Running',
        IP: '10.244.2.20',
        Node: 'worker-node-2',
        Containers: ['nodejs-app']
      },
      status: 'active',
      indicatorCount: 1,
      connections: ['svc-backend', 'configmap-backend', 'secret-db']
    },
    {
      id: 'pod-backend-2',
      type: 'pod',
      label: 'backend-api-2',
      category: 'load',
      metadata: {
        Type: 'pod',
        Name: 'backend-api-2',
        Namespace: 'ns-production',
        Owner: 'deploy-backend',
        Status: 'Running',
        IP: '10.244.2.21',
        Node: 'worker-node-3',
        Containers: ['nodejs-app']
      },
      status: 'active',
      indicatorCount: 1,
      connections: ['svc-backend', 'configmap-backend', 'secret-db']
    },
    {
      id: 'pod-backend-3',
      type: 'pod',
      label: 'backend-api-3',
      category: 'load',
      metadata: {
        Type: 'pod',
        Name: 'backend-api-3',
        Namespace: 'ns-production',
        Owner: 'deploy-backend',
        Status: 'Error',
        IP: '10.244.2.22',
        Node: 'worker-node-1',
        Containers: ['nodejs-app']
      },
      status: 'error',
      indicatorCount: 1,
      connections: ['svc-backend', 'configmap-backend', 'secret-db']
    },
    {
      id: 'pod-backend-4',
      type: 'pod',
      label: 'backend-api-4',
      category: 'load',
      metadata: {
        Type: 'pod',
        Name: 'backend-api-4',
        Namespace: 'ns-production',
        Owner: 'deploy-backend',
        Status: 'Running',
        IP: '10.244.2.23',
        Node: 'worker-node-2',
        Containers: ['nodejs-app']
      },
      status: 'active',
      indicatorCount: 1,
      connections: ['svc-backend', 'configmap-backend', 'secret-db']
    },
    {
      id: 'statefulset-db',
      type: 'statefulset',
      label: 'postgres-statefulset',
      category: 'load',
      metadata: {
        Type: 'statefulset',
        Name: 'postgres-statefulset',
        Namespace: 'ns-production',
        Replicas: 2,
        ServiceName: 'postgres-headless',
        Labels: {
          app: 'postgres',
          tier: 'database'
        }
      },
      status: 'active',
      connections: ['svc-database']
    },
    {
      id: 'pod-db-1',
      type: 'pod',
      label: 'postgres-0',
      category: 'load',
      metadata: {
        Type: 'pod',
        Name: 'postgres-0',
        Namespace: 'ns-production',
        Owner: 'statefulset-db',
        Status: 'Running',
        IP: '10.244.3.30',
        Node: 'worker-node-3',
        Containers: ['postgres'],
        PVC: 'data-postgres-0'
      },
      status: 'active',
      indicatorCount: 1,
      connections: ['svc-database', 'pvc-db-1', 'secret-db']
    },
    {
      id: 'pod-db-2',
      type: 'pod',
      label: 'postgres-1',
      category: 'load',
      metadata: {
        Type: 'pod',
        Name: 'postgres-1',
        Namespace: 'ns-production',
        Owner: 'statefulset-db',
        Status: 'Running',
        IP: '10.244.3.31',
        Node: 'worker-node-3',
        Containers: ['postgres'],
        PVC: 'data-postgres-1'
      },
      status: 'active',
      indicatorCount: 1,
      connections: ['svc-database', 'pvc-db-2', 'secret-db']
    },
    {
      id: 'svc-frontend',
      type: 'service',
      label: 'frontend-service',
      category: 'service',
      metadata: {
        Type: 'service',
        Name: 'frontend-service',
        Namespace: 'ns-production',
        ServiceType: 'ClusterIP',
        ClusterIP: '10.96.1.10',
        Port: 80,
        TargetPort: 8080,
        Selector: { app: 'frontend' }
      },
      status: 'active',
      connections: ['ingress-main', 'pod-frontend-1', 'pod-frontend-2', 'pod-frontend-3']
    },
    {
      id: 'svc-backend',
      type: 'service',
      label: 'backend-api-service',
      category: 'service',
      metadata: {
        Type: 'service',
        Name: 'backend-api-service',
        Namespace: 'ns-production',
        ServiceType: 'ClusterIP',
        ClusterIP: '10.96.2.20',
        Port: 3000,
        TargetPort: 3000,
        Selector: { app: 'backend' }
      },
      status: 'active',
      connections: ['pod-backend-1', 'pod-backend-2', 'pod-backend-3', 'pod-backend-4']
    },
    {
      id: 'svc-database',
      type: 'service',
      label: 'postgres-headless',
      category: 'service',
      metadata: {
        Type: 'service',
        Name: 'postgres-headless',
        Namespace: 'ns-production',
        ServiceType: 'Headless',
        ClusterIP: 'None',
        Port: 5432,
        Selector: { app: 'postgres' }
      },
      status: 'active',
      connections: ['pod-db-1', 'pod-db-2']
    },
    {
      id: 'ingress-main',
      type: 'ingress',
      label: 'main-ingress',
      category: 'service',
      metadata: {
        Type: 'ingress',
        Name: 'main-ingress',
        Namespace: 'ns-production',
        IngressClass: 'nginx',
        Rules: [
          { host: 'app.example.com', path: '/', service: 'frontend-service' },
          { host: 'api.example.com', path: '/api', service: 'backend-api-service' }
        ]
      },
      status: 'active',
      connections: ['svc-frontend']
    },
    {
      id: 'multus-sriov',
      type: 'multus',
      label: 'sriov-network',
      category: 'network',
      metadata: {
        Type: 'multus',
        Name: 'sriov-network',
        Namespace: 'ns-production',
        NetworkType: 'SR-IOV',
        VLAN: 100,
        Master: 'eth1'
      },
      status: 'active',
      connections: ['pod-backend-1', 'pod-backend-2', 'pod-backend-4']
    },
    {
      id: 'configmap-frontend',
      type: 'configmap',
      label: 'frontend-config',
      category: 'config-storage',
      metadata: {
        Type: 'configmap',
        Name: 'frontend-config',
        Namespace: 'ns-production',
        Data: {
          'nginx.conf': 'server { listen 8080; ... }',
          'API_URL': 'http://backend-api-service:3000'
        }
      },
      status: 'active',
      connections: ['pod-frontend-1', 'pod-frontend-2', 'pod-frontend-3']
    },
    {
      id: 'configmap-backend',
      type: 'configmap',
      label: 'backend-config',
      category: 'config-storage',
      metadata: {
        Type: 'configmap',
        Name: 'backend-config',
        Namespace: 'ns-production',
        Data: {
          'app.json': '{ "port": 3000, "env": "production" }',
          'DB_HOST': 'postgres-headless'
        }
      },
      status: 'active',
      connections: ['pod-backend-1', 'pod-backend-2', 'pod-backend-3', 'pod-backend-4']
    },
    {
      id: 'secret-frontend',
      type: 'secret',
      label: 'frontend-secrets',
      category: 'config-storage',
      metadata: {
        Type: 'secret',
        Name: 'frontend-secrets',
        Namespace: 'ns-production',
        SecretType: 'Opaque',
        Keys: ['api-key', 'session-secret']
      },
      status: 'active',
      connections: ['pod-frontend-1', 'pod-frontend-2', 'pod-frontend-3']
    },
    {
      id: 'secret-db',
      type: 'secret',
      label: 'postgres-credentials',
      category: 'config-storage',
      metadata: {
        Type: 'secret',
        Name: 'postgres-credentials',
        Namespace: 'ns-production',
        SecretType: 'Opaque',
        Keys: ['username', 'password', 'database']
      },
      status: 'active',
      connections: ['pod-db-1', 'pod-db-2', 'pod-backend-1', 'pod-backend-2', 'pod-backend-3', 'pod-backend-4']
    },
    {
      id: 'pvc-db-1',
      type: 'persistentvolumeclaim',
      label: 'data-postgres-0',
      category: 'config-storage',
      metadata: {
        Type: 'persistentvolumeclaim',
        Name: 'data-postgres-0',
        Namespace: 'ns-production',
        StorageClass: 'fast-ssd',
        Capacity: '10Gi',
        AccessMode: 'ReadWriteOnce',
        BoundTo: 'pv-001'
      },
      status: 'active',
      connections: ['pod-db-1', 'pv-1']
    },
    {
      id: 'pvc-db-2',
      type: 'persistentvolumeclaim',
      label: 'data-postgres-1',
      category: 'config-storage',
      metadata: {
        Type: 'persistentvolumeclaim',
        Name: 'data-postgres-1',
        Namespace: 'ns-production',
        StorageClass: 'fast-ssd',
        Capacity: '10Gi',
        AccessMode: 'ReadWriteOnce',
        BoundTo: 'pv-002'
      },
      status: 'active',
      connections: ['pod-db-2', 'pv-2']
    },
    {
      id: 'pv-1',
      type: 'persistentvolume',
      label: 'pv-001',
      category: 'config-storage',
      metadata: {
        Type: 'persistentvolume',
        Name: 'pv-001',
        StorageClass: 'fast-ssd',
        Capacity: '10Gi',
        AccessMode: 'ReadWriteOnce',
        ReclaimPolicy: 'Retain',
        HostPath: '/mnt/data/pv-001'
      },
      status: 'active',
      connections: ['pvc-db-1']
    },
    {
      id: 'pv-2',
      type: 'persistentvolume',
      label: 'pv-002',
      category: 'config-storage',
      metadata: {
        Type: 'persistentvolume',
        Name: 'pv-002',
        StorageClass: 'fast-ssd',
        Capacity: '10Gi',
        AccessMode: 'ReadWriteOnce',
        ReclaimPolicy: 'Retain',
        HostPath: '/mnt/data/pv-002'
      },
      status: 'active',
      connections: ['pvc-db-2']
    },
    {
      id: 'job-migration',
      type: 'job',
      label: 'db-migration-job',
      category: 'load',
      metadata: {
        Type: 'job',
        Name: 'db-migration-job',
        Namespace: 'ns-production',
        Completions: 1,
        Parallelism: 1,
        BackoffLimit: 3,
        Status: 'Completed'
      },
      status: 'active',
      connections: ['svc-database']
    }
  ],
  groups: [
    {
      id: 'group-ns-production',
      ownerId: 'ns-production',
      memberIds: [
        'deploy-frontend', 'pod-frontend-1', 'pod-frontend-2', 'pod-frontend-3',
        'deploy-backend', 'pod-backend-1', 'pod-backend-2', 'pod-backend-3', 'pod-backend-4',
        'statefulset-db', 'pod-db-1', 'pod-db-2',
        'svc-frontend', 'svc-backend', 'svc-database',
        'ingress-main', 'multus-sriov',
        'configmap-frontend', 'configmap-backend', 'secret-frontend', 'secret-db',
        'pvc-db-1', 'pvc-db-2', 'pv-1', 'pv-2',
        'job-migration'
      ],
      collapsed: false,
      level: 0,
      depth: 1
    },
    {
      id: 'group-deploy-frontend',
      ownerId: 'deploy-frontend',
      memberIds: ['pod-frontend-1', 'pod-frontend-2', 'pod-frontend-3'],
      collapsed: false,
      level: 1,
      depth: 2,
      parentGroupId: 'group-ns-production'
    },
    {
      id: 'group-deploy-backend',
      ownerId: 'deploy-backend',
      memberIds: ['pod-backend-1', 'pod-backend-2', 'pod-backend-3', 'pod-backend-4'],
      collapsed: false,
      level: 1,
      depth: 2,
      parentGroupId: 'group-ns-production'
    },
    {
      id: 'group-statefulset-db',
      ownerId: 'statefulset-db',
      memberIds: ['pod-db-1', 'pod-db-2'],
      collapsed: false,
      level: 1,
      depth: 2,
      parentGroupId: 'group-ns-production'
    }
  ]
};
