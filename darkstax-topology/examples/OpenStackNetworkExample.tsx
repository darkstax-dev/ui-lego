import React, { useEffect } from 'react';
import { D3TopologyViewer } from '../src/components/D3Canvas/D3TopologyViewer';
import { useTopologyConfig } from '../src/hooks/useTopologyConfig';
import { useTopologyStore } from '../src/store/topologyStore';
import { GroupingEngine } from '../src/lib/config/GroupingEngine';
import openstackConfig from './configs/openstack-network-view.json';
import { openstackSampleNodes, openstackSampleEdges } from './data/openstack-sample-data';

export function OpenStackNetworkExample() {
  const { config, loading, error } = useTopologyConfig(openstackConfig);
  const { setNodes, setEdges, addGroup } = useTopologyStore();

  useEffect(() => {
    if (!config) return;

    setNodes(openstackSampleNodes);
    setEdges(openstackSampleEdges);

    const groupingEngine = new GroupingEngine();
    const groups = groupingEngine.applyGroupingRules(
      openstackSampleNodes,
      config.groupingRules || []
    );

    groups.forEach(group => addGroup(group));
  }, [config, setNodes, setEdges, addGroup]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg">Loading configuration...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-red-600">Error: {error}</div>
      </div>
    );
  }

  if (!config) {
    return null;
  }

  return (
    <div className="w-full h-screen">
      <D3TopologyViewer config={config} theme="light" />
    </div>
  );
}

export default OpenStackNetworkExample;
