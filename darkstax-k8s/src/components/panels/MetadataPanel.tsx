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
    <aside className="absolute top-0 right-0 bottom-0 z-30 w-[420px] max-w-[90vw] border-l border-divider flex flex-col bg-surface-default">
      <div className="flex items-center justify-between" style={{ padding: '24px 16px 0 16px' }}>
        <div className="flex items-center gap-0">
          <button
            type="button"
            className={`px-3 py-1 font-macan-mono text-[16px] font-medium leading-[110%] bg-transparent border-0 border-b-[2px] transition-colors ${
              metadataPanelTab === 'metadata'
                ? 'text-primary border-text-primary'
                : 'text-secondary border-transparent'
            }`}
            onClick={() => setMetadataPanelTab('metadata')}
          >
            Metadata
          </button>
          <button
            type="button"
            className={`px-3 py-1 font-macan-mono text-[16px] font-medium leading-[110%] bg-transparent border-0 border-b-[2px] transition-colors ${
              metadataPanelTab === 'raw'
                ? 'text-primary border-text-primary'
                : 'text-secondary border-transparent'
            }`}
            onClick={() => setMetadataPanelTab('raw')}
          >
            Raw
          </button>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            className="w-8 h-8 inline-flex items-center justify-center hover:opacity-80 text-secondary"
            onClick={closeMetadataPanel}
            aria-label="Close details panel"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto" style={{ padding: '24px 16px', gap: '24px', display: 'flex', flexDirection: 'column' }}>
        {!selectedNode ? (
          <div className="text-sm font-macan text-secondary">Select a node in the graph to view metadata.</div>
        ) : (
          <>
            {metadataPanelTab === 'metadata' && (
              <>
                <div className="flex flex-col gap-4">
                  <h3 className="font-macan-mono uppercase text-primary text-base font-semibold tracking-[1.6px] leading-[110%]">Overview</h3>
                  <div className="p-4 flex flex-col gap-2 bg-surface-card">
                    <div className="flex items-start gap-2">
                      <span className="text-xs uppercase tracking-[1.2px] font-macan-mono text-secondary font-book leading-[120%]">ID</span>
                      <span className="text-sm font-macan-mono break-all text-primary font-book leading-[120%]">{selectedNode.id}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-xs uppercase tracking-[1.2px] font-macan-mono text-secondary font-book leading-[120%]">Type</span>
                      <span className="text-sm font-macan capitalize text-primary font-book leading-[120%]">{selectedNode.type}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-xs uppercase tracking-[1.2px] font-macan-mono text-secondary font-book leading-[120%]">Label</span>
                      <span className="text-sm font-macan text-primary font-book leading-[120%]">{selectedNode.label}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-xs uppercase tracking-[1.2px] font-macan-mono text-secondary font-book leading-[120%]">Category</span>
                      <span className="text-sm font-macan capitalize text-primary font-book leading-[120%]">{selectedNode.category}</span>
                    </div>
                  </div>
                </div>

                {selectedNode.status && (
                  <div className="flex flex-col gap-2">
                    <h3 className="font-macan-mono uppercase text-primary text-base font-semibold tracking-[1.6px] leading-[110%]">Status</h3>
                    <p className="text-sm font-macan capitalize text-primary font-book leading-[120%]">{selectedNode.status}</p>
                  </div>
                )}

                <div className="flex flex-col gap-4">
                  <h3 className="font-macan-mono uppercase text-primary text-base font-semibold tracking-[1.6px] leading-[110%]">Key Metadata</h3>
                  <div className="p-4 flex flex-col gap-2 text-sm font-macan bg-surface-card text-primary">
                    {(
                      ['Name', 'Namespace', 'Owner', 'Replicas', 'Status', 'IP', 'Node'] as const
                    )
                      .filter((key) => selectedNode.metadata?.[key] !== undefined)
                      .map((key) => (
                        <div key={key} className="flex justify-between gap-3">
                          <span className="text-secondary font-book leading-[120%]">{key}</span>
                          <span className="text-right text-primary font-book leading-[120%]">
                            {Array.isArray(selectedNode.metadata?.[key])
                              ? selectedNode.metadata?.[key].join(', ')
                              : String(selectedNode.metadata?.[key])}
                          </span>
                        </div>
                      ))}
                    {(
                      ['Name', 'Namespace', 'Owner', 'Replicas', 'Status', 'IP', 'Node'] as const
                    ).every((key) => selectedNode.metadata?.[key] === undefined) && (
                      <div className="text-secondary font-book leading-[120%]">No highlighted metadata fields.</div>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <h3 className="font-macan-mono uppercase text-primary text-base font-semibold tracking-[1.6px] leading-[110%]">Connections</h3>
                  <div className="p-4 text-sm font-macan bg-surface-card text-primary">
                    {selectedNode.connections?.length ? (
                      <ul className="list-disc list-inside flex flex-col gap-1">
                        {selectedNode.connections.map((connection) => (
                          <li key={connection} className="break-all font-book leading-[120%]">
                            {connection}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <span className="text-secondary font-book leading-[120%]">No connections available.</span>
                    )}
                  </div>
                </div>

                {selectedNode.position && (
                  <div className="flex flex-col gap-2">
                    <h3 className="font-macan-mono uppercase text-primary text-base font-semibold tracking-[1.6px] leading-[110%]">Position</h3>
                    <p className="text-sm font-macan-mono text-primary font-book leading-[120%]">
                      x: {selectedNode.position.x}, y: {selectedNode.position.y}
                    </p>
                  </div>
                )}
              </>
            )}

            {metadataPanelTab === 'raw' && (
              <div className="flex flex-col gap-4">
                <h3 className="font-macan-mono uppercase text-primary text-base font-semibold tracking-[1.6px] leading-[110%]">Raw Metadata</h3>
                <div className="p-4 bg-surface-card">
                  <pre className="m-0 whitespace-pre-wrap break-words text-[13px] font-mono text-primary font-book leading-[120%]">
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
