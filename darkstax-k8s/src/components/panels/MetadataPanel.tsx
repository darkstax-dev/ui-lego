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
    <aside className="absolute top-0 right-0 bottom-0 z-30 w-[420px] max-w-[90vw] bg-white border-l border-gray-200 shadow-[-4px_0px_20px_-10px_rgba(12,12,13,0.2)] flex flex-col">
      <div className="flex items-center justify-between px-4 h-12 border-b border-gray-200">
        <div className="flex items-center gap-4 text-sm font-macan text-blue-dark-950">
          <button
            type="button"
            className={`pb-2 border-b-2 transition-colors ${
              metadataPanelTab === 'metadata'
                ? 'border-blue-700 text-blue-700'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setMetadataPanelTab('metadata')}
          >
            Metadata
          </button>
          <button
            type="button"
            className={`pb-2 border-b-2 transition-colors ${
              metadataPanelTab === 'raw'
                ? 'border-blue-700 text-blue-700'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setMetadataPanelTab('raw')}
          >
            Raw
          </button>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-500 font-macan">Details</span>
          <button
            type="button"
            className="w-8 h-8 inline-flex items-center justify-center rounded hover:bg-gray-100"
            onClick={closeMetadataPanel}
            aria-label="Close details panel"
          >
            <X className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-4">
        {!selectedNode ? (
          <div className="text-sm text-gray-500 font-macan">Select a node in the graph to view metadata.</div>
        ) : (
          <>
            {metadataPanelTab === 'metadata' && (
              <>
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-500 mb-2 font-macan">Overview</h3>
                  <div className="bg-gray-100 p-3 rounded space-y-2">
                    <div className="flex items-start gap-2">
                      <span className="text-xs uppercase tracking-wide text-gray-500 font-macan">ID</span>
                      <span className="text-sm font-macan-mono text-blue-dark-950 break-all">{selectedNode.id}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-xs uppercase tracking-wide text-gray-500 font-macan">Type</span>
                      <span className="text-sm font-macan text-blue-dark-950 capitalize">{selectedNode.type}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-xs uppercase tracking-wide text-gray-500 font-macan">Label</span>
                      <span className="text-sm font-macan text-blue-dark-950">{selectedNode.label}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-xs uppercase tracking-wide text-gray-500 font-macan">Category</span>
                      <span className="text-sm font-macan text-blue-dark-950 capitalize">{selectedNode.category}</span>
                    </div>
                  </div>
                </div>

                {selectedNode.status && (
                  <div className="mb-4">
                    <h3 className="text-sm font-medium text-gray-500 mb-2 font-macan">Status</h3>
                    <p className="text-sm font-macan text-blue-dark-950 capitalize">{selectedNode.status}</p>
                  </div>
                )}

                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-500 mb-2 font-macan">Key Metadata</h3>
                  <div className="bg-gray-100 p-3 rounded space-y-2 text-sm text-blue-dark-950 font-macan">
                    {(
                      ['Name', 'Namespace', 'Owner', 'Replicas', 'Status', 'IP', 'Node'] as const
                    )
                      .filter((key) => selectedNode.metadata?.[key] !== undefined)
                      .map((key) => (
                        <div key={key} className="flex justify-between gap-3">
                          <span className="text-gray-500">{key}</span>
                          <span className="text-right">
                            {Array.isArray(selectedNode.metadata?.[key])
                              ? selectedNode.metadata?.[key].join(', ')
                              : String(selectedNode.metadata?.[key])}
                          </span>
                        </div>
                      ))}
                    {(
                      ['Name', 'Namespace', 'Owner', 'Replicas', 'Status', 'IP', 'Node'] as const
                    ).every((key) => selectedNode.metadata?.[key] === undefined) && (
                      <div className="text-gray-500">No highlighted metadata fields.</div>
                    )}
                  </div>
                </div>

                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-500 mb-2 font-macan">Connections</h3>
                  <div className="bg-gray-100 p-3 rounded text-sm text-blue-dark-950 font-macan">
                    {selectedNode.connections?.length ? (
                      <ul className="list-disc list-inside space-y-1">
                        {selectedNode.connections.map((connection) => (
                          <li key={connection} className="break-all">
                            {connection}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <span className="text-gray-500">No connections available.</span>
                    )}
                  </div>
                </div>

                {selectedNode.position && (
                  <div className="mb-4">
                    <h3 className="text-sm font-medium text-gray-500 mb-2 font-macan">Position</h3>
                    <p className="text-sm font-macan-mono text-blue-dark-950">
                      x: {selectedNode.position.x}, y: {selectedNode.position.y}
                    </p>
                  </div>
                )}
              </>
            )}

            {metadataPanelTab === 'raw' && (
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-500 mb-2 font-macan">Raw Metadata</h3>
                <div className="bg-gray-100 p-3 rounded">
                  <pre className="m-0 whitespace-pre-wrap break-words text-[13px] font-mono text-blue-dark-950">
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
