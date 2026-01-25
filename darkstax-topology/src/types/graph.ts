export type NodeType = 
  | 'host' 
  | 'netns' 
  | 'ovsbridge' 
  | 'veth' 
  | 'device' 
  | 'internal' 
  | 'container' 
  | 'pod'
  | 'service' 
  | 'networkpolicy'
  | 'deployment'
  | 'namespace';

export interface NodeMetadata {
  Type: NodeType;
  Name: string;
  TID: string;
  Speed?: number;
  Driver?: string;
  State?: string;
  MAC?: string;
  IPV4?: string;
  IPV6?: string;
  IfIndex?: number;
  Manager?: string;
  Neutron?: any;
  OfPort?: number;
  UUID?: string;
  Captures?: any[];
  LastUpdateMetric?: MetricData;
  [key: string]: any;
}

export interface MetricData {
  Start: number;
  Last: number;
  RxBytes: number;
  TxBytes: number;
  RxPackets: number;
  TxPackets: number;
  RTT?: number;
}

export interface TopologyNode {
  id: string;
  type: NodeType;
  position: { x: number; y: number };
  data: {
    metadata: NodeMetadata;
    label: string;
    groupId?: string;
    collapsed?: boolean;
    bandwidth?: number;
    selected?: boolean;
  };
  hidden?: boolean;
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
  fx?: number | null;
  fy?: number | null;
}

export interface TopologyEdge {
  id: string;
  source: string;
  target: string;
  type: 'network' | 'ownership' | 'policy';
  data: {
    metadata: {
      RelationType: 'ownership' | 'layer2' | 'layer3';
      [key: string]: any;
    };
    bandwidth?: number;
    bandwidthBaseline?: number;
    latency?: number;
    label?: string;
  };
  animated?: boolean;
  style?: React.CSSProperties;
}

export interface NodeGroup {
  id: string;
  ownerId: string;
  memberIds: string[];
  collapsed: boolean;
  level: number;
  depth: number;
  parentGroupId?: string;
}
