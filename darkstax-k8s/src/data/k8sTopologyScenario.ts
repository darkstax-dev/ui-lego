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
        status: 'active' as const,
        connections:
          n === 1
            ? [`tower-${String(n).padStart(2, '0')}`, 'ns-production']
            : n <= 5
              ? [`tower-${String(n).padStart(2, '0')}`]
              : [],
      };
    }),
    ...Array.from({ length: 50 }, (_, index) => {
      const n = index + 1;
      const id = `tower-${String(n).padStart(2, '0')}`;
      return {
        id,
        type: 'mobiletower' as const,
        label: `Tower${String(n).padStart(2, '0')}`,
        category: 'aggregate' as const,
        metadata: {
          Type: 'mobiletower',
          Name: id,
          Description: 'Aggregate mobile tower',
          ...(n <= 30 ? { ParentAggregate: 'dc-01' } : { ParentAggregate: 'dc-02' }),
        },
        status: 'active' as const,
        connections: n <= 5 ? [`dc-${String(n).padStart(2, '0')}`] : [],
      };
    }),
    {
      id: 'ns-production',
      type: 'namespace',
      label: 'production',
      category: 'load',
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
      category: 'load',
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
      id: 'group-deploy-frontend',
      ownerId: 'deploy-frontend',
      memberIds: ['pod-frontend-1', 'pod-frontend-2', 'pod-frontend-3'],
      collapsed: false,
      level: 1,
      depth: 2
    },
    {
      id: 'group-deploy-backend',
      ownerId: 'deploy-backend',
      memberIds: ['pod-backend-1', 'pod-backend-2', 'pod-backend-3', 'pod-backend-4'],
      collapsed: false,
      level: 1,
      depth: 2
    },
    {
      id: 'group-statefulset-db',
      ownerId: 'statefulset-db',
      memberIds: ['pod-db-1', 'pod-db-2'],
      collapsed: false,
      level: 1,
      depth: 2
    }
  ]
};

function buildAggregateNodes(): K8sNodeData[] {
  const datacenters: K8sNodeData[] = Array.from({ length: 50 }, (_, index) => {
    const n = index + 1;
    const id = `dc-${String(n).padStart(2, '0')}`;
    return {
      id,
      type: 'datacenter',
      label: `DC${String(n).padStart(2, '0')}`,
      category: 'aggregate',
      metadata: {
        Type: 'datacenter',
        Name: id,
        Description: 'Aggregate datacenter',
        ...(n > 10 ? { ParentAggregate: n <= 30 ? 'dc-01' : 'dc-02' } : {}),
      },
      status: 'active',
      connections: n <= 5 ? [`tower-${String(n).padStart(2, '0')}`] : [],
    };
  });

  const towers: K8sNodeData[] = Array.from({ length: 50 }, (_, index) => {
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
  });

  return [...datacenters, ...towers];
}

function buildAggregateWorkloadNodes(aggregateNodes: K8sNodeData[]): K8sNodeData[] {
  const nodes: K8sNodeData[] = [...aggregateNodes];

  aggregateNodes.forEach((aggregateNode, index) => {
    const suffix = aggregateNode.id;
    const namespace = 'ns-agg-workloads';

    const serviceId = `svc-${suffix}`;
    const multusAId = `multus-${suffix}-a`;
    const multusBId = `multus-${suffix}-b`;
    const configMapId = `configmap-${suffix}`;
    const secretId = `secret-${suffix}`;
    const pvcId = `pvc-${suffix}`;
    const pvId = `pv-${suffix}`;

    nodes.push(
      {
        id: serviceId,
        type: 'service',
        label: `svc-${suffix}`,
        category: 'service',
        metadata: {
          Type: 'service',
          Name: `svc-${suffix}`,
          Namespace: namespace,
          ParentAggregate: aggregateNode.id,
          Ports: [{ name: 'http', port: 80, targetPort: 8080 }],
        },
        status: 'active',
      },
      {
        id: multusAId,
        type: 'multus',
        label: `net-a-${suffix}`,
        category: 'network',
        metadata: {
          Type: 'multus',
          Name: `net-a-${suffix}`,
          Namespace: namespace,
          ParentAggregate: aggregateNode.id,
          CNI: 'macvlan',
        },
        status: 'active',
      },
      {
        id: multusBId,
        type: 'multus',
        label: `net-b-${suffix}`,
        category: 'network',
        metadata: {
          Type: 'multus',
          Name: `net-b-${suffix}`,
          Namespace: namespace,
          ParentAggregate: aggregateNode.id,
          CNI: 'bridge',
        },
        status: 'active',
      },
      {
        id: configMapId,
        type: 'configmap',
        label: `cm-${suffix}`,
        category: 'config-storage',
        metadata: {
          Type: 'configmap',
          Name: `cm-${suffix}`,
          Namespace: namespace,
          ParentAggregate: aggregateNode.id,
          Keys: ['APP_MODE', 'LOG_LEVEL'],
        },
        status: 'active',
      },
      {
        id: secretId,
        type: 'secret',
        label: `secret-${suffix}`,
        category: 'config-storage',
        metadata: {
          Type: 'secret',
          Name: `secret-${suffix}`,
          Namespace: namespace,
          ParentAggregate: aggregateNode.id,
          Keys: ['DB_PASSWORD', 'API_TOKEN'],
        },
        status: 'active',
      },
      {
        id: pvcId,
        type: 'persistentvolumeclaim',
        label: `pvc-${suffix}`,
        category: 'config-storage',
        metadata: {
          Type: 'persistentvolumeclaim',
          Name: `pvc-${suffix}`,
          Namespace: namespace,
          ParentAggregate: aggregateNode.id,
          StorageClass: 'fast-ssd',
          Capacity: '10Gi',
          AccessMode: 'ReadWriteOnce',
        },
        status: 'active',
        connections: [pvId],
      },
      {
        id: pvId,
        type: 'persistentvolume',
        label: `pv-${suffix}`,
        category: 'config-storage',
        metadata: {
          Type: 'persistentvolume',
          Name: `pv-${suffix}`,
          ParentAggregate: aggregateNode.id,
          StorageClass: 'fast-ssd',
          Capacity: '10Gi',
          AccessMode: 'ReadWriteOnce',
          ReclaimPolicy: 'Retain',
        },
        status: 'active',
        connections: [pvcId],
      }
    );

    const workloadKind = index % 3;
    const baseConnections = [serviceId, multusAId, multusBId, configMapId, secretId, pvcId];

    if (workloadKind === 0) {
      const controllerId = `deploy-${suffix}`;
      const podAId = `pod-${suffix}-a`;
      const podBId = `pod-${suffix}-b`;

      nodes.push(
        {
          id: controllerId,
          type: 'deployment',
          label: `deploy-${suffix}`,
          category: 'load',
          metadata: {
            Type: 'deployment',
            Name: `deploy-${suffix}`,
            Namespace: namespace,
            ParentAggregate: aggregateNode.id,
            Replicas: 2,
          },
          status: 'active',
          indicatorCount: 2,
          connections: [serviceId],
        },
        {
          id: podAId,
          type: 'pod',
          label: `pod-${suffix}-a`,
          category: 'load',
          metadata: {
            Type: 'pod',
            Name: `pod-${suffix}-a`,
            Namespace: namespace,
            ParentAggregate: aggregateNode.id,
            Owner: controllerId,
            Status: 'Running',
            IP: `10.244.${(index % 220) + 1}.10`,
            Containers: ['app', 'sidecar-proxy'],
          },
          status: 'active',
          indicatorCount: 6,
          connections: baseConnections,
        },
        {
          id: podBId,
          type: 'pod',
          label: `pod-${suffix}-b`,
          category: 'load',
          metadata: {
            Type: 'pod',
            Name: `pod-${suffix}-b`,
            Namespace: namespace,
            ParentAggregate: aggregateNode.id,
            Owner: controllerId,
            Status: index % 7 === 0 ? 'Pending' : 'Running',
            IP: `10.244.${(index % 220) + 1}.11`,
            Containers: ['app', 'sidecar-proxy'],
          },
          status: index % 7 === 0 ? 'deploying' : 'active',
          indicatorCount: 6,
          connections: baseConnections,
        }
      );

      aggregateNode.connections = Array.from(new Set([...(aggregateNode.connections || []), controllerId]));
      return;
    }

    if (workloadKind === 1) {
      const controllerId = `statefulset-${suffix}`;
      const podAId = `pod-${suffix}-0`;
      const podBId = `pod-${suffix}-1`;

      nodes.push(
        {
          id: controllerId,
          type: 'statefulset',
          label: `sts-${suffix}`,
          category: 'load',
          metadata: {
            Type: 'statefulset',
            Name: `sts-${suffix}`,
            Namespace: namespace,
            ParentAggregate: aggregateNode.id,
            Replicas: 2,
            ServiceName: serviceId,
          },
          status: 'active',
          indicatorCount: 2,
          connections: [serviceId, pvcId],
        },
        {
          id: podAId,
          type: 'pod',
          label: `pod-${suffix}-0`,
          category: 'load',
          metadata: {
            Type: 'pod',
            Name: `pod-${suffix}-0`,
            Namespace: namespace,
            ParentAggregate: aggregateNode.id,
            Owner: controllerId,
            Status: 'Running',
            IP: `10.245.${(index % 220) + 1}.20`,
            Containers: ['db'],
          },
          status: 'active',
          indicatorCount: 6,
          connections: baseConnections,
        },
        {
          id: podBId,
          type: 'pod',
          label: `pod-${suffix}-1`,
          category: 'load',
          metadata: {
            Type: 'pod',
            Name: `pod-${suffix}-1`,
            Namespace: namespace,
            ParentAggregate: aggregateNode.id,
            Owner: controllerId,
            Status: index % 11 === 0 ? 'Error' : 'Running',
            IP: `10.245.${(index % 220) + 1}.21`,
            Containers: ['db'],
          },
          status: index % 11 === 0 ? 'error' : 'active',
          indicatorCount: 6,
          connections: baseConnections,
        }
      );

      aggregateNode.connections = Array.from(new Set([...(aggregateNode.connections || []), controllerId]));
      return;
    }

    const podId = `pod-${suffix}-diag`;
    nodes.push({
      id: podId,
      type: 'pod',
      label: `diag-${suffix}`,
      category: 'load',
      metadata: {
        Type: 'pod',
        Name: `diag-${suffix}`,
        Namespace: namespace,
        ParentAggregate: aggregateNode.id,
        Status: 'Running',
        IP: `10.246.${(index % 220) + 1}.30`,
        Containers: ['netshoot'],
      },
      status: 'active',
      indicatorCount: 6,
      connections: baseConnections,
    });

    aggregateNode.connections = Array.from(new Set([...(aggregateNode.connections || []), podId]));
  });

  return nodes;
}

export const kubernetesAggregateWorkloadsScenario: K8sTopologyScenario = {
  name: 'Aggregate Workloads Cluster',
  description:
    'Same aggregate nodes, but each aggregate owns a workload (pod/deployment/statefulset) with services, multus networks, PV/PVC, configmaps, and secrets.',
  nodes: buildAggregateWorkloadNodes(buildAggregateNodes()),
};
