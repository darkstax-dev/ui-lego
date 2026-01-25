import { TopologyNode, TopologyEdge } from '../../src/types/graph';

export const openstackSampleNodes: TopologyNode[] = [
  {
    id: 'qr-7a83e4-1c',
    type: 'namespace',
    data: {
      label: 'qr-7a83e4-1c',
      metadata: {
        Type: 'namespace',
        Namespace: 'qr-7a83e4-1c',
        Description: 'Router namespace'
      }
    },
    position: { x: 100, y: 200 }
  },
  {
    id: 'qr-aeafc7ec',
    type: 'tap',
    data: {
      label: 'qr-aeafc7ec',
      metadata: {
        Type: 'tap',
        Namespace: 'qr-7a83e4-1c',
        Bridge: 'tap-b42d3dd8',
        Description: 'Router interface'
      }
    },
    position: { x: 200, y: 280 }
  },
  {
    id: 'tap-b42d3dd8',
    type: 'bridge',
    data: {
      label: 'tap-b42d3dd8',
      metadata: {
        Type: 'bridge',
        Bridge: 'tap-b42d3dd8',
        Description: 'OVS Bridge'
      }
    },
    position: { x: 350, y: 380 }
  },
  {
    id: 'vnet_br0_eth1',
    type: 'vnet',
    data: {
      label: 'vnet_br0_eth1',
      metadata: {
        Type: 'vnet',
        Bridge: 'tap-b42d3dd8',
        Description: 'Virtual network interface'
      }
    },
    position: { x: 500, y: 450 }
  },
  {
    id: 'vnet_ovs_br0',
    type: 'vnet',
    data: {
      label: 'vnet_ovs_br0',
      metadata: {
        Type: 'vnet',
        Bridge: 'tap-b42d3dd8',
        Description: 'OVS virtual interface'
      }
    },
    position: { x: 650, y: 320 }
  },
  {
    id: 'qs-aa2e-br',
    type: 'namespace',
    data: {
      label: 'qs-aa2e-br',
      metadata: {
        Type: 'namespace',
        Namespace: 'qs-aa2e-br',
        Description: 'DHCP namespace'
      }
    },
    position: { x: 550, y: 180 }
  },
  {
    id: 'qr-dc2e-4bc',
    type: 'qrouter',
    data: {
      label: 'qr-dc2e-4bc',
      metadata: {
        Type: 'qrouter',
        Namespace: 'qs-aa2e-br',
        Description: 'Router port'
      }
    },
    position: { x: 700, y: 80 }
  },
  {
    id: 'tap-c9f7',
    type: 'tap',
    data: {
      label: 'tap-c9f7',
      metadata: {
        Type: 'tap',
        Namespace: 'qs-aa2e-br',
        Bridge: 'patch-tun',
        Description: 'TAP interface'
      }
    },
    position: { x: 900, y: 100 }
  },
  {
    id: 'patch-tun',
    type: 'patch',
    data: {
      label: 'patch-tun',
      metadata: {
        Type: 'patch',
        Bridge: 'patch-tun',
        Description: 'Patch port to tunnel bridge'
      }
    },
    position: { x: 780, y: 220 }
  },
  {
    id: 'vnet_br0_eth1_2',
    type: 'bridge',
    data: {
      label: 'vnet_br0_eth1',
      metadata: {
        Type: 'bridge',
        Bridge: 'vnet_br0_eth1_2',
        Description: 'Bridge interface'
      }
    },
    position: { x: 780, y: 420 }
  },
  {
    id: 'qg-ed8ccd45',
    type: 'qgateway',
    data: {
      label: 'qg-ed8ccd45',
      metadata: {
        Type: 'qgateway',
        Bridge: 'vnet_br0_eth1_2',
        Description: 'Gateway port with alert'
      }
    },
    position: { x: 880, y: 360 }
  },
  {
    id: 'qr-d41033a9',
    type: 'qrouter',
    data: {
      label: 'qr-d41033a9',
      metadata: {
        Type: 'qrouter',
        Bridge: 'vnet_br0_eth1_2',
        Description: 'Router port'
      }
    },
    position: { x: 880, y: 520 }
  },
  {
    id: 'tap-b42d3dda',
    type: 'namespace',
    data: {
      label: 'tap-b42d3dda',
      metadata: {
        Type: 'namespace',
        Namespace: 'tap-b42d3dda',
        Description: 'TAP namespace'
      }
    },
    position: { x: 180, y: 500 }
  },
  {
    id: 'tap-b42d3ddb',
    type: 'tap',
    data: {
      label: 'tap-b42d3ddb',
      metadata: {
        Type: 'tap',
        Namespace: 'tap-b42d3dda',
        Bridge: 'patch-int',
        Description: 'TAP interface'
      }
    },
    position: { x: 150, y: 620 }
  },
  {
    id: 'patch-int-br',
    type: 'bridge',
    data: {
      label: 'patch-int-br',
      metadata: {
        Type: 'bridge',
        Bridge: 'patch-int',
        Description: 'Integration bridge'
      }
    },
    position: { x: 280, y: 640 }
  },
  {
    id: 'patch-int',
    type: 'qgateway',
    data: {
      label: 'patch-int',
      metadata: {
        Type: 'qgateway',
        Bridge: 'patch-int',
        Description: 'Patch to integration bridge'
      }
    },
    position: { x: 400, y: 580 }
  },
  {
    id: 'tap-b42d3ddb-2',
    type: 'bridge',
    data: {
      label: 'tap-b42d3ddb',
      metadata: {
        Type: 'bridge',
        Bridge: 'tap-b42d3ddb-2',
        Description: 'TAP bridge'
      }
    },
    position: { x: 350, y: 730 }
  },
  {
    id: 'tap-c9f7-2',
    type: 'tap',
    data: {
      label: 'tap-c9f7',
      metadata: {
        Type: 'tap',
        Namespace: 'tap-b42d3dda',
        Bridge: 'tap-b42d3ddb-2',
        Description: 'TAP interface'
      }
    },
    position: { x: 180, y: 780 }
  }
];

export const openstackSampleEdges: TopologyEdge[] = [
  {
    id: 'edge-1',
    source: 'qr-7a83e4-1c',
    target: 'qr-aeafc7ec',
    type: 'network',
    data: { label: '', metadata: { Type: 'network' } }
  },
  {
    id: 'edge-2',
    source: 'qr-aeafc7ec',
    target: 'tap-b42d3dd8',
    type: 'network',
    data: { label: '', metadata: { Type: 'network' } }
  },
  {
    id: 'edge-3',
    source: 'tap-b42d3dd8',
    target: 'vnet_br0_eth1',
    type: 'virtual',
    data: { label: '', metadata: { Type: 'virtual' } }
  },
  {
    id: 'edge-4',
    source: 'tap-b42d3dd8',
    target: 'vnet_ovs_br0',
    type: 'virtual',
    data: { label: '', metadata: { Type: 'virtual' } }
  },
  {
    id: 'edge-5',
    source: 'tap-b42d3dd8',
    target: 'qs-aa2e-br',
    type: 'network',
    data: { label: '', metadata: { Type: 'network' } }
  },
  {
    id: 'edge-6',
    source: 'qs-aa2e-br',
    target: 'qr-dc2e-4bc',
    type: 'network',
    data: { label: '', metadata: { Type: 'network' } }
  },
  {
    id: 'edge-7',
    source: 'qs-aa2e-br',
    target: 'tap-c9f7',
    type: 'network',
    data: { label: '', metadata: { Type: 'network' } }
  },
  {
    id: 'edge-8',
    source: 'tap-c9f7',
    target: 'patch-tun',
    type: 'patch',
    data: { label: '', metadata: { Type: 'patch' } }
  },
  {
    id: 'edge-9',
    source: 'patch-tun',
    target: 'vnet_br0_eth1_2',
    type: 'network',
    data: { label: '', metadata: { Type: 'network' } }
  },
  {
    id: 'edge-10',
    source: 'vnet_br0_eth1_2',
    target: 'qg-ed8ccd45',
    type: 'virtual',
    data: { label: '', metadata: { Type: 'virtual' } }
  },
  {
    id: 'edge-11',
    source: 'vnet_br0_eth1_2',
    target: 'qr-d41033a9',
    type: 'virtual',
    data: { label: '', metadata: { Type: 'virtual' } }
  },
  {
    id: 'edge-12',
    source: 'tap-b42d3dda',
    target: 'tap-b42d3ddb',
    type: 'network',
    data: { label: '', metadata: { Type: 'network' } }
  },
  {
    id: 'edge-13',
    source: 'tap-b42d3ddb',
    target: 'patch-int-br',
    type: 'network',
    data: { label: '', metadata: { Type: 'network' } }
  },
  {
    id: 'edge-14',
    source: 'patch-int-br',
    target: 'patch-int',
    type: 'patch',
    data: { label: '', metadata: { Type: 'patch' } }
  },
  {
    id: 'edge-15',
    source: 'patch-int-br',
    target: 'tap-b42d3ddb-2',
    type: 'network',
    data: { label: '', metadata: { Type: 'network' } }
  },
  {
    id: 'edge-16',
    source: 'tap-b42d3ddb-2',
    target: 'tap-c9f7-2',
    type: 'virtual',
    data: { label: '', metadata: { Type: 'virtual' } }
  },
  {
    id: 'edge-17',
    source: 'tap-b42d3dd8',
    target: 'tap-b42d3dda',
    type: 'network',
    data: { label: '', metadata: { Type: 'network' } }
  }
];
