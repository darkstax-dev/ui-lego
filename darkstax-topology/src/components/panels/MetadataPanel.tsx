import { Info } from 'lucide-react';
import { useTopologyStore } from '@/store/topologyStore';
import { useState } from 'react';

export function MetadataPanel() {
  const { selectedNodeId, nodes } = useTopologyStore();
  const [activeTab, setActiveTab] = useState('captures');
  const [metadataExpanded, setMetadataExpanded] = useState(true);
  const [featuresExpanded, setFeaturesExpanded] = useState(false);
  const [metricsExpanded, setMetricsExpanded] = useState(false);
  const [ovsMetricsExpanded, setOvsMetricsExpanded] = useState(false);

  const selectedNode = nodes.find(n => n.id === selectedNodeId);

  if (!selectedNode) {
    return (
      <div className="w-[607px] h-full flex items-center justify-center" style={{ backgroundColor: '#CECECE', borderLeft: '1px solid #C8C8C8' }}>
        <div className="text-center p-8">
          <Info className="w-12 h-12" style={{ color: '#78797A' }} />
          <p style={{ color: '#78797A', marginTop: '12px', fontFamily: 'Macan Mono Trial, monospace', fontSize: '14px' }}>
            Select a node or edge to view details
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-[607px] h-full flex flex-col" style={{ backgroundColor: '#CECECE', borderLeft: '1px solid #C8C8C8' }}>
      {/* Tabs and CREATE Button */}
      <div className="flex flex-col px-4 pt-6 gap-8" style={{ background: '#CECECE' }}>
        <div className="flex justify-between items-center">
          {/* Tabs */}
          <div className="flex items-start">
            {['captures', 'generator', 'flows', 'alerts'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="px-3 py-1 flex justify-center items-center"
                style={{
                  borderRadius: '4px 4px 0 0',
                  borderBottom: activeTab === tab ? '1px solid #00112B' : '1px solid #78797A',
                  color: activeTab === tab ? '#00112B' : '#78797A',
                  fontFamily: 'Macan Mono Trial, monospace',
                  fontSize: '16px',
                  fontWeight: 500,
                  lineHeight: '110%',
                  textTransform: 'capitalize'
                }}
              >
                {tab}
              </button>
            ))}
          </div>
          
          {/* CREATE Button */}
          <button
            className="flex px-4 py-2 justify-center items-center"
            style={{
              border: '1px solid #D9322A',
              color: '#D9322A',
              fontFamily: 'Macan Mono Trial, monospace',
              fontSize: '14px',
              fontWeight: 600,
              lineHeight: '110%',
              letterSpacing: '1.4px',
              textTransform: 'uppercase'
            }}
          >
            CREATE
          </button>
        </div>

        {/* METADATA Section Header */}
        <div className="flex flex-col gap-4">
          <button
            onClick={() => setMetadataExpanded(!metadataExpanded)}
            className="flex justify-between items-center py-2"
          >
            <span style={{
              color: '#00112B',
              fontFamily: 'Macan Mono Trial, monospace',
              fontSize: '16px',
              fontWeight: 600,
              lineHeight: '110%',
              letterSpacing: '1.6px',
              textTransform: 'uppercase'
            }}>
              METADATA
            </span>
            <span
              aria-hidden="true"
              style={{
                width: 24,
                height: 24,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#00112B',
                fontSize: '24px',
                fontWeight: 600,
                lineHeight: 1,
              }}
            >
              {metadataExpanded ? '−' : '+'}
            </span>
          </button>

          {/* METADATA Content */}
          {metadataExpanded && selectedNode && (
            <div className="flex flex-col p-4 gap-4" style={{ backgroundColor: '#DFDFDF' }}>
              {/* Metadata Fields from Figma */}
              <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-2">
                  <span style={{ color: '#78797A', fontFamily: 'Macan Mono Trial, monospace', fontSize: '12px', fontWeight: 450, lineHeight: '120%', letterSpacing: '1.2px' }}>
                    Driver:
                  </span>
                  <span style={{ color: '#00112B', fontFamily: 'Macan Mono Trial, monospace', fontSize: '14px', fontWeight: 450, lineHeight: '120%' }}>
                    {selectedNode.data.metadata.Driver || 'openvswitch'}
                  </span>
                </div>

                <div className="flex flex-col gap-2">
                  <span style={{ color: '#78797A', fontFamily: 'Macan Mono Trial, monospace', fontSize: '12px', fontWeight: 450, lineHeight: '120%', letterSpacing: '1.2px' }}>
                    EncapType:
                  </span>
                  <span style={{ color: '#00112B', fontFamily: 'Macan Mono Trial, monospace', fontSize: '15px', fontWeight: 450, lineHeight: '120%' }}>
                    {selectedNode.data.metadata.EncapType || 'ether'}
                  </span>
                </div>

                {selectedNode.data.metadata.ExtID && (
                  <div className="flex flex-col gap-2">
                    <span style={{ color: '#78797A', fontFamily: 'Macan Mono Trial, monospace', fontSize: '12px', fontWeight: 450, lineHeight: '120%', letterSpacing: '1.2px' }}>
                      ExtID:
                    </span>
                    <span style={{ color: '#00112B', fontFamily: 'Macan Mono Trial, monospace', fontSize: '14px', fontWeight: 450, lineHeight: '120%', whiteSpace: 'pre-wrap' }}>
                      {typeof selectedNode.data.metadata.ExtID === 'object' 
                        ? Object.entries(selectedNode.data.metadata.ExtID).map(([k, v]) => `${k}: ${v}`).join('\n')
                        : selectedNode.data.metadata.ExtID
                      }
                    </span>
                  </div>
                )}

                {selectedNode.data.metadata.IPV4 && (
                  <div className="flex flex-col gap-2">
                    <span style={{ color: '#78797A', fontFamily: 'Macan Mono Trial, monospace', fontSize: '12px', fontWeight: 450, lineHeight: '120%', letterSpacing: '1.2px' }}>
                      IPV4:
                    </span>
                    <span style={{ color: '#00112B', fontFamily: 'Macan Mono Trial, monospace', fontSize: '15px', fontWeight: 450, lineHeight: '120%' }}>
                      {selectedNode.data.metadata.IPV4}
                    </span>
                  </div>
                )}

                {selectedNode.data.metadata.IPV6 && (
                  <div className="flex flex-col gap-2">
                    <span style={{ color: '#78797A', fontFamily: 'Macan Mono Trial, monospace', fontSize: '12px', fontWeight: 450, lineHeight: '120%', letterSpacing: '1.2px' }}>
                      IPV6:
                    </span>
                    <span style={{ color: '#00112B', fontFamily: 'Macan Mono Trial, monospace', fontSize: '15px', fontWeight: 450, lineHeight: '120%' }}>
                      {selectedNode.data.metadata.IPV6}
                    </span>
                  </div>
                )}

                <div className="flex flex-col gap-2">
                  <span style={{ color: '#78797A', fontFamily: 'Macan Mono Trial, monospace', fontSize: '12px', fontWeight: 450, lineHeight: '120%', letterSpacing: '1.2px' }}>
                    Name:
                  </span>
                  <span style={{ color: '#00112B', fontFamily: 'Macan Mono Trial, monospace', fontSize: '15px', fontWeight: 450, lineHeight: '120%' }}>
                    {selectedNode.data.label || selectedNode.id}
                  </span>
                </div>

                {selectedNode.data.metadata.State && (
                  <div className="flex flex-col gap-2">
                    <span style={{ color: '#78797A', fontFamily: 'Macan Mono Trial, monospace', fontSize: '12px', fontWeight: 450, lineHeight: '120%', letterSpacing: '1.2px' }}>
                      State:
                    </span>
                    <span style={{ color: '#00112B', fontFamily: 'Macan Mono Trial, monospace', fontSize: '15px', fontWeight: 450, lineHeight: '120%' }}>
                      {selectedNode.data.metadata.State}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Divider */}
        <div style={{ width: '575px', height: '1px', background: '#ADADAD' }} />

        {/* FEATURES Section */}
        <div className="flex flex-col gap-4">
          <button
            onClick={() => setFeaturesExpanded(!featuresExpanded)}
            className="flex justify-between items-center"
          >
            <span style={{
              color: '#00112B',
              fontFamily: 'Macan Mono Trial, monospace',
              fontSize: '16px',
              fontWeight: 600,
              lineHeight: '110%',
              letterSpacing: '1.6px',
              textTransform: 'uppercase'
            }}>
              FEATURES
            </span>
            <span
              aria-hidden="true"
              style={{
                width: 24,
                height: 24,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#00112B',
                fontSize: '24px',
                fontWeight: 600,
                lineHeight: 1,
              }}
            >
              {featuresExpanded ? '−' : '+'}
            </span>
          </button>
        </div>

        {/* Divider */}
        <div style={{ width: '575px', height: '1px', background: '#ADADAD' }} />

        {/* METRICS Section */}
        <div className="flex flex-col gap-4">
          <button
            onClick={() => setMetricsExpanded(!metricsExpanded)}
            className="flex justify-between items-center"
          >
            <span style={{
              color: '#00112B',
              fontFamily: 'Macan Mono Trial, monospace',
              fontSize: '16px',
              fontWeight: 600,
              lineHeight: '110%',
              letterSpacing: '1.6px',
              textTransform: 'uppercase'
            }}>
              METRICS
            </span>
            <span
              aria-hidden="true"
              style={{
                width: 24,
                height: 24,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#00112B',
                fontSize: '24px',
                fontWeight: 600,
                lineHeight: 1,
              }}
            >
              {metricsExpanded ? '−' : '+'}
            </span>
          </button>
        </div>

        {/* Divider */}
        <div style={{ width: '575px', height: '1px', background: '#ADADAD' }} />

        {/* OVS METRICS Section */}
        <div className="flex flex-col gap-4">
          <button
            onClick={() => setOvsMetricsExpanded(!ovsMetricsExpanded)}
            className="flex justify-between items-center"
          >
            <span style={{
              color: '#00112B',
              fontFamily: 'Macan Mono Trial, monospace',
              fontSize: '16px',
              fontWeight: 600,
              lineHeight: '110%',
              letterSpacing: '1.6px',
              textTransform: 'uppercase'
            }}>
              OVS METRICS
            </span>
            <span
              aria-hidden="true"
              style={{
                width: 24,
                height: 24,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#00112B',
                fontSize: '24px',
                fontWeight: 600,
                lineHeight: 1,
              }}
            >
              {ovsMetricsExpanded ? '−' : '+'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
