import { useEffect, useState } from 'react';
import { D3TopologyViewer } from './components/D3Canvas/D3TopologyViewer';
import { useTopologyStore } from './store/topologyStore';
import { TopologyNode, TopologyEdge } from './types/graph';

const mockNodes: TopologyNode[] = [
  {
    id: 'qr-7a85e4-1c',
    type: 'device',
    position: { x: 100, y: 200 },
    data: {
      metadata: {
        Type: 'device',
        Name: 'qr-7a85e4-1c',
        TID: 'qr-7a85e4-1c',
        State: 'UP'
      },
      label: 'qr-7a85e4-1c'
    }
  },
  {
    id: 'qr-aaa7e7ec',
    type: 'device',
    position: { x: 200, y: 300 },
    data: {
      metadata: {
        Type: 'device',
        Name: 'qr-aaa7e7ec',
        TID: 'qr-aaa7e7ec',
        State: 'UP'
      },
      label: 'qr-aaa7e7ec'
    }
  },
  {
    id: 'tap-b42d3ddb',
    type: 'device',
    position: { x: 300, y: 350 },
    data: {
      metadata: {
        Type: 'device',
        Name: 'tap-b42d3ddb',
        TID: 'tap-b42d3ddb',
        State: 'UP'
      },
      label: 'tap-b42d3ddb'
    }
  },
  {
    id: 'vnet_br0_eth1',
    type: 'ovsbridge',
    position: { x: 400, y: 300 },
    data: {
      metadata: {
        Type: 'ovsbridge',
        Name: 'vnet_br0_eth1',
        TID: 'vnet_br0_eth1',
        State: 'UP'
      },
      label: 'vnet_br0_eth1'
    }
  },
  {
    id: 'qr-dc2e-4bc',
    type: 'device',
    position: { x: 450, y: 180 },
    data: {
      metadata: {
        Type: 'device',
        Name: 'qr-dc2e-4bc',
        TID: 'qr-dc2e-4bc',
        State: 'UP'
      },
      label: 'qr-dc2e-4bc'
    }
  },
  {
    id: 'ns-aa2e-br',
    type: 'device',
    position: { x: 380, y: 200 },
    data: {
      metadata: {
        Type: 'device',
        Name: 'ns-aa2e-br',
        TID: 'ns-aa2e-br',
        State: 'UP'
      },
      label: 'ns-aa2e-br'
    }
  },
  {
    id: 'vnet_ovs_br0',
    type: 'ovsbridge',
    position: { x: 420, y: 290 },
    data: {
      metadata: {
        Type: 'ovsbridge',
        Name: 'vnet_ovs_br0',
        TID: 'vnet_ovs_br0',
        State: 'UP'
      },
      label: 'vnet_ovs_br0'
    }
  },
  {
    id: 'tap-c9f7',
    type: 'device',
    position: { x: 550, y: 180 },
    data: {
      metadata: {
        Type: 'device',
        Name: 'tap-c9f7',
        TID: 'tap-c9f7',
        State: 'UP'
      },
      label: 'tap-c9f7'
    }
  },
  {
    id: 'patch-tun',
    type: 'veth',
    position: { x: 500, y: 250 },
    data: {
      metadata: {
        Type: 'veth',
        Name: 'patch-tun',
        TID: 'patch-tun',
        State: 'UP'
      },
      label: 'patch-tun'
    }
  },
  {
    id: 'qg-ed8ccd45',
    type: 'device',
    position: { x: 550, y: 330 },
    data: {
      metadata: {
        Type: 'device',
        Name: 'qg-ed8ccd45',
        TID: 'qg-ed8ccd45',
        State: 'UP'
      },
      label: 'qg-ed8ccd45'
    }
  },
  {
    id: 'vnet_br0_eth1_2',
    type: 'ovsbridge',
    position: { x: 500, y: 380 },
    data: {
      metadata: {
        Type: 'ovsbridge',
        Name: 'vnet_br0_eth1',
        TID: 'vnet_br0_eth1_2',
        State: 'UP'
      },
      label: 'vnet_br0_eth1'
    }
  },
  {
    id: 'qr-d41033a9',
    type: 'device',
    position: { x: 580, y: 430 },
    data: {
      metadata: {
        Type: 'device',
        Name: 'qr-d41033a9',
        TID: 'qr-d41033a9',
        State: 'UP'
      },
      label: 'qr-d41033a9'
    }
  },
  {
    id: 'tap-U42d3dda',
    type: 'device',
    position: { x: 150, y: 410 },
    data: {
      metadata: {
        Type: 'device',
        Name: 'tap-U42d3dda',
        TID: 'tap-U42d3dda',
        State: 'UP'
      },
      label: 'tap-U42d3dda'
    }
  },
  {
    id: 'patch-int',
    type: 'veth',
    position: { x: 280, y: 470 },
    data: {
      metadata: {
        Type: 'veth',
        Name: 'patch-int',
        TID: 'patch-int',
        State: 'UP'
      },
      label: 'patch-int'
    }
  },
  {
    id: 'patch-int-br',
    type: 'veth',
    position: { x: 200, y: 490 },
    data: {
      metadata: {
        Type: 'veth',
        Name: 'patch-int-br',
        TID: 'patch-int-br',
        State: 'UP'
      },
      label: 'patch-int-br'
    }
  },
  {
    id: 'tap-b42d3ddb-2',
    type: 'device',
    position: { x: 150, y: 510 },
    data: {
      metadata: {
        Type: 'device',
        Name: 'tap-b42d3ddb',
        TID: 'tap-b42d3ddb-2',
        State: 'UP'
      },
      label: 'tap-b42d3ddb'
    }
  },
  {
    id: 'tap-b42d3ddb-3',
    type: 'device',
    position: { x: 250, y: 550 },
    data: {
      metadata: {
        Type: 'device',
        Name: 'tap-b42d3ddb',
        TID: 'tap-b42d3ddb-3',
        State: 'UP'
      },
      label: 'tap-b42d3ddb'
    }
  }
];

const mockEdges: TopologyEdge[] = [
  {
    id: 'e-qr7a-qraaa',
    source: 'qr-7a85e4-1c',
    target: 'qr-aaa7e7ec',
    type: 'network',
    data: {
      metadata: {
        RelationType: 'layer2'
      }
    }
  },
  {
    id: 'e-qraaa-tap',
    source: 'qr-aaa7e7ec',
    target: 'tap-b42d3ddb',
    type: 'network',
    data: {
      metadata: {
        RelationType: 'layer2'
      }
    }
  },
  {
    id: 'e-tap-vnet',
    source: 'tap-b42d3ddb',
    target: 'vnet_br0_eth1',
    type: 'network',
    data: {
      metadata: {
        RelationType: 'layer2'
      }
    }
  },
  {
    id: 'e-vnet-vnetovs',
    source: 'vnet_br0_eth1',
    target: 'vnet_ovs_br0',
    type: 'network',
    data: {
      metadata: {
        RelationType: 'layer2'
      }
    }
  },
  {
    id: 'e-qrdc-nsaa',
    source: 'qr-dc2e-4bc',
    target: 'ns-aa2e-br',
    type: 'network',
    data: {
      metadata: {
        RelationType: 'layer2'
      }
    }
  },
  {
    id: 'e-nsaa-vnetovs',
    source: 'ns-aa2e-br',
    target: 'vnet_ovs_br0',
    type: 'network',
    data: {
      metadata: {
        RelationType: 'layer2'
      }
    }
  },
  {
    id: 'e-vnetovs-patch',
    source: 'vnet_ovs_br0',
    target: 'patch-tun',
    type: 'network',
    data: {
      metadata: {
        RelationType: 'layer2'
      }
    }
  },
  {
    id: 'e-patch-tapc9',
    source: 'patch-tun',
    target: 'tap-c9f7',
    type: 'network',
    data: {
      metadata: {
        RelationType: 'layer2'
      }
    }
  },
  {
    id: 'e-vnetovs-qged',
    source: 'vnet_ovs_br0',
    target: 'qg-ed8ccd45',
    type: 'network',
    data: {
      metadata: {
        RelationType: 'layer2'
      }
    }
  },
  {
    id: 'e-qged-vnet2',
    source: 'qg-ed8ccd45',
    target: 'vnet_br0_eth1_2',
    type: 'network',
    data: {
      metadata: {
        RelationType: 'layer2'
      }
    }
  },
  {
    id: 'e-vnet2-qrd4',
    source: 'vnet_br0_eth1_2',
    target: 'qr-d41033a9',
    type: 'network',
    data: {
      metadata: {
        RelationType: 'layer2'
      }
    }
  },
  {
    id: 'e-tapU-patchint',
    source: 'tap-U42d3dda',
    target: 'patch-int',
    type: 'network',
    data: {
      metadata: {
        RelationType: 'layer2'
      }
    }
  },
  {
    id: 'e-patchint-patchintbr',
    source: 'patch-int',
    target: 'patch-int-br',
    type: 'network',
    data: {
      metadata: {
        RelationType: 'layer2'
      }
    }
  },
  {
    id: 'e-patchintbr-tap2',
    source: 'patch-int-br',
    target: 'tap-b42d3ddb-2',
    type: 'network',
    data: {
      metadata: {
        RelationType: 'layer2'
      }
    }
  },
  {
    id: 'e-tap2-tap3',
    source: 'tap-b42d3ddb-2',
    target: 'tap-b42d3ddb-3',
    type: 'network',
    data: {
      metadata: {
        RelationType: 'layer2'
      }
    }
  },
  {
    id: 'e-tapU-qraaa',
    source: 'tap-U42d3dda',
    target: 'qr-aaa7e7ec',
    type: 'network',
    data: {
      metadata: {
        RelationType: 'layer2'
      }
    }
  }
];

function App() {
  const { setNodes, setEdges, setLayoutAlgorithm, setAutoLayout, addGroup, layoutAlgorithm } = useTopologyStore();
  const [useMockData, setUseMockData] = useState(true);
  const [showMetadata, setShowMetadata] = useState(true);

  const websocketUrl = useMockData ? undefined : 'ws://localhost:8082/ws/agent/topology';

  useEffect(() => {
    if (useMockData) {
      setNodes(mockNodes);
      setEdges(mockEdges);
      setLayoutAlgorithm('force');
      setAutoLayout(true);

      // Add example groups for demonstration
      addGroup({
        id: 'group-vnet-devices',
        ownerId: 'vnet_ovs_br0',
        memberIds: ['qr-dc2e-4bc', 'ns-aa2e-br', 'patch-tun', 'tap-c9f7'],
        collapsed: false,
        level: 1,
        depth: 1
      });

      addGroup({
        id: 'group-tap-cluster',
        ownerId: 'tap-b42d3ddb',
        memberIds: ['tap-U42d3dda', 'patch-int', 'patch-int-br', 'tap-b42d3ddb-2', 'tap-b42d3ddb-3'],
        collapsed: false,
        level: 1,
        depth: 1
      });
    }
  }, [useMockData, setNodes, setEdges, setLayoutAlgorithm, setAutoLayout, addGroup]);

  return (
    <div className="w-screen h-screen flex flex-col" style={{ backgroundColor: 'var(--color-gray-300)' }}>
      <div style={{ backgroundColor: 'var(--nav-secondary-bg)', borderBottom: '1px solid var(--divider-light)' }} className="px-4 py-2 flex items-center gap-4">
        <h1 className="emphasis-body-mono-sm" style={{ color: 'var(--text-blue-main)' }}>TOPOLOGY</h1>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={useMockData}
            onChange={(e) => setUseMockData(e.target.checked)}
            className="rounded"
          />
          <span className="body-small-macan-book" style={{ color: 'var(--text-blue-main)' }}>Use Mock Data</span>
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={showMetadata}
            onChange={(e) => setShowMetadata(e.target.checked)}
            className="rounded"
          />
          <span className="body-small-macan-book" style={{ color: 'var(--text-blue-main)' }}>Show Metadata Panel</span>
        </label>
        <select 
          value={layoutAlgorithm}
          onChange={(e) => setLayoutAlgorithm(e.target.value as any)}
          className="px-2 py-1 body-small-macan-book"
          style={{ backgroundColor: 'var(--Inputs-Input-Background)', color: 'var(--text-blue-main)', border: '1px solid var(--divider-light)' }}
          aria-label="Layout algorithm selector"
        >
          <option value="force">Force Layout</option>
          <option value="hierarchical">Hierarchical Layout</option>
          <option value="manual">Manual Layout</option>
        </select>
        {!useMockData && (
          <span className="body-small-mono-book" style={{ color: 'var(--text-gray-main)' }}>
            WebSocket: {websocketUrl}
          </span>
        )}
      </div>
      <div className="flex-1">
        <D3TopologyViewer 
          theme="light"
          websocketUrl={websocketUrl}
          showMetadataPanel={showMetadata}
        />
      </div>
    </div>
  );
}

export default App;
