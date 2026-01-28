import { X } from 'lucide-react';
import { useUIStore } from '../../store/uiStore';

export function MetadataPanel() {
  const {
    selectedNode,
    metadataPanelOpen,
    closeMetadataPanel,
    metadataPanelTab,
    setMetadataPanelTab,
  } = useUIStore();

  if (!metadataPanelOpen) return null;

  return (
    <aside className="absolute top-0 right-0 bottom-0 z-30 w-[420px] max-w-[90vw] border-l shadow-[-4px_0px_20px_-10px_rgba(12,12,13,0.2)] flex flex-col" style={{ backgroundColor: '#CECECE', borderLeftColor: '#C8C8C8' }}>
      <div className="flex items-center justify-between" style={{ padding: '24px 16px 0 16px' }}>
        <div className="flex items-center gap-0">
          <button
            type="button"
            className="font-macan-mono transition-colors"
            style={{
              padding: '4px 12px',
              borderRadius: '4px 4px 0 0',
              borderBottom: metadataPanelTab === 'metadata' ? '1px solid #00112B' : '1px solid #78797A',
              color: metadataPanelTab === 'metadata' ? '#00112B' : '#78797A',
              fontSize: '16px',
              fontWeight: 500,
              lineHeight: '110%',
              background: 'transparent',
              border: 'none',
              borderBottom: metadataPanelTab === 'metadata' ? '1px solid #00112B' : '1px solid #78797A',
            }}
            onClick={() => setMetadataPanelTab('metadata')}
          >
            Metadata
          </button>
          <button
            type="button"
            className="font-macan-mono transition-colors"
            style={{
              padding: '4px 12px',
              borderRadius: '4px 4px 0 0',
              borderBottom: metadataPanelTab === 'raw' ? '1px solid #00112B' : '1px solid #78797A',
              color: metadataPanelTab === 'raw' ? '#00112B' : '#78797A',
              fontSize: '16px',
              fontWeight: 500,
              lineHeight: '110%',
              background: 'transparent',
              border: 'none',
              borderBottom: metadataPanelTab === 'raw' ? '1px solid #00112B' : '1px solid #78797A',
            }}
            onClick={() => setMetadataPanelTab('raw')}
          >
            Raw
          </button>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            className="w-8 h-8 inline-flex items-center justify-center hover:opacity-80"
            style={{ background: 'transparent' }}
            onClick={closeMetadataPanel}
            aria-label="Close details panel"
          >
            <X className="w-4 h-4" style={{ color: '#78797A' }} />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto" style={{ padding: '24px 16px' }}>
        {!selectedNode ? (
          <div className="text-sm font-macan" style={{ color: '#78797A' }}>Select a node in the graph to view metadata.</div>
        ) : (
          <>
            {metadataPanelTab === 'metadata' && (
              <>
                <div className="mb-4">
                  <h3 className="text-sm font-medium mb-2 font-macan-mono uppercase" style={{ color: '#78797A', fontSize: '12px', fontWeight: 600, letterSpacing: '0.1em' }}>Overview</h3>
                  <div className="p-3 space-y-2" style={{ backgroundColor: '#DFDFDF', border: '1px solid #C8C8C8' }}>
                    <div className="flex items-start gap-2">
                      <span className="text-xs uppercase tracking-wide font-macan-mono" style={{ color: '#78797A', letterSpacing: '0.1em' }}>ID</span>
                      <span className="text-sm font-macan-mono break-all" style={{ color: '#00112B' }}>{selectedNode.id}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-xs uppercase tracking-wide font-macan-mono" style={{ color: '#78797A', letterSpacing: '0.1em' }}>Type</span>
                      <span className="text-sm font-macan capitalize" style={{ color: '#00112B' }}>{selectedNode.type}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-xs uppercase tracking-wide font-macan-mono" style={{ color: '#78797A', letterSpacing: '0.1em' }}>Label</span>
                      <span className="text-sm font-macan" style={{ color: '#00112B' }}>{selectedNode.label}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-xs uppercase tracking-wide font-macan-mono" style={{ color: '#78797A', letterSpacing: '0.1em' }}>Category</span>
                      <span className="text-sm font-macan capitalize" style={{ color: '#00112B' }}>{selectedNode.category}</span>
                    </div>
                  </div>
                </div>

                {selectedNode.status && (
                  <div className="mb-4">
                    <h3 className="text-sm font-medium mb-2 font-macan-mono uppercase" style={{ color: '#78797A', fontSize: '12px', fontWeight: 600, letterSpacing: '0.1em' }}>Status</h3>
                    <p className="text-sm font-macan capitalize" style={{ color: '#00112B' }}>{selectedNode.status}</p>
                  </div>
                )}

                <div className="mb-4">
                  <h3 className="text-sm font-medium mb-2 font-macan-mono uppercase" style={{ color: '#78797A', fontSize: '12px', fontWeight: 600, letterSpacing: '0.1em' }}>Key Metadata</h3>
                  <div className="p-3 space-y-2 text-sm font-macan" style={{ backgroundColor: '#DFDFDF', border: '1px solid #C8C8C8', color: '#00112B' }}>
                    {(
                      ['Name', 'Namespace', 'Owner', 'Replicas', 'Status', 'IP', 'Node'] as const
                    )
                      .filter((key) => selectedNode.metadata?.[key] !== undefined)
                      .map((key) => (
                        <div key={key} className="flex justify-between gap-3">
                          <span style={{ color: '#78797A' }}>{key}</span>
                          <span className="text-right" style={{ color: '#00112B' }}>
                            {Array.isArray(selectedNode.metadata?.[key])
                              ? selectedNode.metadata?.[key].join(', ')
                              : String(selectedNode.metadata?.[key])}
                          </span>
                        </div>
                      ))}
                    {(
                      ['Name', 'Namespace', 'Owner', 'Replicas', 'Status', 'IP', 'Node'] as const
                    ).every((key) => selectedNode.metadata?.[key] === undefined) && (
                      <div style={{ color: '#78797A' }}>No highlighted metadata fields.</div>
                    )}
                  </div>
                </div>

                <div className="mb-4">
                  <h3 className="text-sm font-medium mb-2 font-macan-mono uppercase" style={{ color: '#78797A', fontSize: '12px', fontWeight: 600, letterSpacing: '0.1em' }}>Connections</h3>
                  <div className="p-3 text-sm font-macan" style={{ backgroundColor: '#DFDFDF', border: '1px solid #C8C8C8', color: '#00112B' }}>
                    {selectedNode.connections?.length ? (
                      <ul className="list-disc list-inside space-y-1">
                        {selectedNode.connections.map((connection) => (
                          <li key={connection} className="break-all">
                            {connection}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <span style={{ color: '#78797A' }}>No connections available.</span>
                    )}
                  </div>
                </div>

                {selectedNode.position && (
                  <div className="mb-4">
                    <h3 className="text-sm font-medium mb-2 font-macan-mono uppercase" style={{ color: '#78797A', fontSize: '12px', fontWeight: 600, letterSpacing: '0.1em' }}>Position</h3>
                    <p className="text-sm font-macan-mono" style={{ color: '#00112B' }}>
                      x: {selectedNode.position.x}, y: {selectedNode.position.y}
                    </p>
                  </div>
                )}
              </>
            )}

            {metadataPanelTab === 'raw' && (
              <div className="mb-4">
                <h3 className="text-sm font-medium mb-2 font-macan-mono uppercase" style={{ color: '#78797A', fontSize: '12px', fontWeight: 600, letterSpacing: '0.1em' }}>Raw Metadata</h3>
                <div className="p-3" style={{ backgroundColor: '#DFDFDF', border: '1px solid #C8C8C8' }}>
                  <pre className="m-0 whitespace-pre-wrap break-words text-[13px] font-mono" style={{ color: '#00112B' }}>
                    {JSON.stringify(selectedNode.metadata || {}, null, 2)}
                  </pre>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </aside>
  );
}
