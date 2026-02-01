import { X } from 'lucide-react';
import { useUIStore } from '../../store/uiStore';

function formatStatus(status: string) {
  const normalized = status.trim().toLowerCase();

  if (normalized.includes('error') || normalized.includes('fail')) {
    return { label: status, className: 'bg-red-600 text-white' };
  }

  if (normalized.includes('active') || normalized.includes('ready') || normalized.includes('healthy')) {
    return { label: status, className: 'bg-green-800 text-white' };
  }

  return { label: status, className: 'bg-blue-950 text-white' };
}

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
    <aside className="metadata-panel absolute top-0 right-0 bottom-0 z-30 w-[420px] max-w-[90vw] border-l border-divider shadow-[-4px_0px_20px_-10px_rgba(12,12,13,0.2)] flex flex-col">
      <div className="px-4 pt-6">
        <div className="flex items-center justify-between">
          <div className="flex items-end gap-6">
            <button
              type="button"
              className={`pb-2 font-macan-mono text-[16px] font-medium leading-[110%] bg-transparent border-0 border-b-2 -mb-px transition-colors ${
                metadataPanelTab === 'metadata'
                  ? 'text-primary border-text-primary'
                  : 'text-secondary border-transparent hover:text-primary'
              }`}
              onClick={() => setMetadataPanelTab('metadata')}
            >
              Metadata
            </button>
            <button
              type="button"
              className={`pb-2 font-macan-mono text-[16px] font-medium leading-[110%] bg-transparent border-0 border-b-2 -mb-px transition-colors ${
                metadataPanelTab === 'raw'
                  ? 'text-primary border-text-primary'
                  : 'text-secondary border-transparent hover:text-primary'
              }`}
              onClick={() => setMetadataPanelTab('raw')}
            >
              Raw
            </button>
          </div>

          <button
            type="button"
            className="w-8 h-8 mb-1 inline-flex items-center justify-center hover:opacity-80 text-secondary"
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
                <section className="flex flex-col gap-4">
                  <h3 className="font-macan-mono uppercase text-primary text-[16px] font-semibold tracking-[1.6px] leading-[110%]">
                    Overview
                  </h3>

                  <div className="metadata-panel__card p-4">
                    <div className="grid grid-cols-2 gap-x-6 gap-y-6">
                      <div className="flex flex-col gap-2 min-w-0">
                        <span className="font-macan-mono text-[12px] font-book tracking-[1.2px] text-secondary">
                          ID
                        </span>
                        <span className="font-macan-mono text-[14px] font-book text-primary break-words">
                          {selectedNode.id}
                        </span>
                      </div>

                      <div className="flex flex-col gap-2 min-w-0">
                        <span className="font-macan-mono text-[12px] font-book tracking-[1.2px] text-secondary">
                          Type
                        </span>
                        <span className="font-macan-mono text-[14px] font-book text-primary break-words capitalize">
                          {selectedNode.type}
                        </span>
                      </div>

                      <div className="flex flex-col gap-2 min-w-0">
                        <span className="font-macan-mono text-[12px] font-book tracking-[1.2px] text-secondary">
                          Label
                        </span>
                        <span className="font-macan text-[14px] font-book text-primary break-words">
                          {selectedNode.label}
                        </span>
                      </div>

                      <div className="flex flex-col gap-2 min-w-0">
                        <span className="font-macan-mono text-[12px] font-book tracking-[1.2px] text-secondary">
                          Category
                        </span>
                        <span className="font-macan-mono text-[14px] font-book text-primary break-words capitalize">
                          {selectedNode.category}
                        </span>
                      </div>

                      {selectedNode.status && (
                        <div className="flex flex-col gap-2 min-w-0">
                          <span className="font-macan-mono text-[12px] font-book tracking-[1.2px] text-secondary">
                            Status
                          </span>
                          <div className="flex items-center">
                            {(() => {
                              const { label, className } = formatStatus(selectedNode.status);
                              return (
                                <span
                                  className={`inline-flex items-center px-2 py-1 font-macan-mono text-[12px] font-medium uppercase leading-none ${className}`}
                                >
                                  {label}
                                </span>
                              );
                            })()}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </section>

                <section className="flex flex-col gap-4">
                  <h3 className="font-macan-mono uppercase text-primary text-[16px] font-semibold tracking-[1.6px] leading-[110%]">
                    Key Metadata
                  </h3>

                  <div className="metadata-panel__card p-4">
                    <div className="flex flex-col gap-3 text-[14px] font-macan">
                      {(
                        ['Name', 'Namespace', 'Owner', 'Replicas', 'Status', 'IP', 'Node'] as const
                      )
                        .filter((key) => selectedNode.metadata?.[key] !== undefined)
                        .map((key) => (
                          <div key={key} className="flex items-start justify-between gap-4">
                            <span className="text-secondary font-macan-mono text-[12px] tracking-[1.2px] font-book">
                              {key}
                            </span>
                            <span className="text-primary text-right font-macan-mono text-[14px] font-book break-words max-w-[65%]">
                              {Array.isArray(selectedNode.metadata?.[key])
                                ? selectedNode.metadata?.[key].join(', ')
                                : String(selectedNode.metadata?.[key])}
                            </span>
                          </div>
                        ))}

                      {(
                        ['Name', 'Namespace', 'Owner', 'Replicas', 'Status', 'IP', 'Node'] as const
                      ).every((key) => selectedNode.metadata?.[key] === undefined) && (
                        <div className="text-secondary text-[14px] font-macan">No highlighted metadata fields.</div>
                      )}
                    </div>
                  </div>
                </section>

                <section className="flex flex-col gap-4">
                  <h3 className="font-macan-mono uppercase text-primary text-[16px] font-semibold tracking-[1.6px] leading-[110%]">
                    Connections
                  </h3>

                  <div className="metadata-panel__card p-4 text-primary">
                    {selectedNode.connections?.length ? (
                      <ul className="list-disc list-inside space-y-1 text-[14px] font-macan-mono font-book">
                        {selectedNode.connections.map((connection) => (
                          <li key={connection} className="break-all">
                            {connection}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <span className="text-secondary text-[14px] font-macan">No connections available.</span>
                    )}
                  </div>
                </section>

                {selectedNode.position && (
                  <section className="flex flex-col gap-4">
                    <h3 className="font-macan-mono uppercase text-primary text-[16px] font-semibold tracking-[1.6px] leading-[110%]">
                      Position
                    </h3>

                    <div className="metadata-panel__card p-4">
                      <p className="text-[14px] font-macan-mono font-book text-primary">
                        x: {selectedNode.position.x}, y: {selectedNode.position.y}
                      </p>
                    </div>
                  </section>
                )}
              </>
            )}

            {metadataPanelTab === 'raw' && (
              <section className="flex flex-col gap-4">
                <h3 className="font-macan-mono uppercase text-primary text-[16px] font-semibold tracking-[1.6px] leading-[110%]">
                  Raw Metadata
                </h3>

                <div className="metadata-panel__card p-4">
                  <pre className="m-0 whitespace-pre-wrap break-words text-[13px] font-mono text-primary">
                    {JSON.stringify(selectedNode.metadata || {}, null, 2)}
                  </pre>
                </div>
              </section>
            )}
          </>
        )}
      </div>
    </aside>
  );
}
