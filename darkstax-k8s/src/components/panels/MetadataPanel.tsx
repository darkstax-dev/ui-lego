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
    <aside className="absolute top-0 right-0 bottom-0 z-30 w-[420px] max-w-[90vw] border-l border-divider shadow-[-4px_0px_20px_-10px_rgba(12,12,13,0.2)] flex flex-col bg-surface-default">
      <div className="flex items-center justify-between px-4 pt-6">
        <div className="flex items-center gap-0">
          <button
            type="button"
            className={`px-3 py-1 font-macan-mono text-[16px] font-medium leading-[110%] bg-transparent border-0 border-b-[2px] transition-colors ${
              metadataPanelTab === 'metadata'
                ? 'text-primary border-text-primary'
                : 'text-secondary border-divider'
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
                : 'text-secondary border-divider'
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

      <div className="flex-1 overflow-auto px-4 py-6 flex flex-col gap-6">
        {!selectedNode ? (
          <div className="text-sm font-macan text-secondary">Select a node in the graph to view metadata.</div>
        ) : (
          <>
            {metadataPanelTab === 'metadata' && (
              <>
                <div className="mb-4">
                  <h3 className="text-xs font-semibold mb-2 font-macan-mono uppercase text-secondary tracking-wider">Overview</h3>
                  <div className="p-3 space-y-2 bg-[#DFDFDF] border border-divider">
                    <div className="flex items-start gap-2">
                      <span className="text-xs uppercase tracking-wide font-macan-mono text-secondary">ID</span>
                      <span className="text-sm font-macan-mono break-all text-primary">{selectedNode.id}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-xs uppercase tracking-wide font-macan-mono text-secondary">Type</span>
                      <span className="text-sm font-macan capitalize text-primary">{selectedNode.type}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-xs uppercase tracking-wide font-macan-mono text-secondary">Label</span>
                      <span className="text-sm font-macan text-primary">{selectedNode.label}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-xs uppercase tracking-wide font-macan-mono text-secondary">Category</span>
                      <span className="text-sm font-macan capitalize text-primary">{selectedNode.category}</span>
                    </div>
                  </div>
                </div>

                {selectedNode.status && (
                  <div className="mb-4">
                    <h3 className="text-xs font-semibold mb-2 font-macan-mono uppercase text-secondary tracking-wider">Status</h3>
                    <p className="text-sm font-macan capitalize text-primary">{selectedNode.status}</p>
                  </div>
                )}

                <div className="mb-4">
                  <h3 className="text-xs font-semibold mb-2 font-macan-mono uppercase text-secondary tracking-wider">Key Metadata</h3>
                  <div className="p-3 space-y-2 text-sm font-macan bg-[#DFDFDF] border border-divider text-primary">
                    {(
                      ['Name', 'Namespace', 'Owner', 'Replicas', 'Status', 'IP', 'Node'] as const
                    )
                      .filter((key) => selectedNode.metadata?.[key] !== undefined)
                      .map((key) => (
                        <div key={key} className="flex justify-between gap-3">
                          <span className="text-secondary">{key}</span>
                          <span className="text-right text-primary">
                            {Array.isArray(selectedNode.metadata?.[key])
                              ? selectedNode.metadata?.[key].join(', ')
                              : String(selectedNode.metadata?.[key])}
                          </span>
                        </div>
                      ))}
                    {(
                      ['Name', 'Namespace', 'Owner', 'Replicas', 'Status', 'IP', 'Node'] as const
                    ).every((key) => selectedNode.metadata?.[key] === undefined) && (
                      <div className="text-secondary">No highlighted metadata fields.</div>
                    )}
                  </div>
                </div>

                <div className="mb-4">
                  <h3 className="text-xs font-semibold mb-2 font-macan-mono uppercase text-secondary tracking-wider">Connections</h3>
                  <div className="p-3 text-sm font-macan bg-[#DFDFDF] border border-divider text-primary">
                    {selectedNode.connections?.length ? (
                      <ul className="list-disc list-inside space-y-1">
                        {selectedNode.connections.map((connection) => (
                          <li key={connection} className="break-all">
                            {connection}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <span className="text-secondary">No connections available.</span>
                    )}
                  </div>
                </div>

                {selectedNode.position && (
                  <div className="mb-4">
                    <h3 className="text-xs font-semibold mb-2 font-macan-mono uppercase text-secondary tracking-wider">Position</h3>
                    <p className="text-sm font-macan-mono text-primary">
                      x: {selectedNode.position.x}, y: {selectedNode.position.y}
                    </p>
                  </div>
                )}
              </>
            )}

            {metadataPanelTab === 'raw' && (
              <div className="mb-4">
                <h3 className="text-xs font-semibold mb-2 font-macan-mono uppercase text-secondary tracking-wider">Raw Metadata</h3>
                <div className="p-3 bg-[#DFDFDF] border border-divider">
                  <pre className="m-0 whitespace-pre-wrap break-words text-[13px] font-mono text-primary">
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
