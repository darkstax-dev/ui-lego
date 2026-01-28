import { useUIStore } from '../../store/uiStore';
import { X } from 'lucide-react';

export function MetadataPanel() {
  const { selectedNode, metadataPanelOpen, closeMetadataPanel } = useUIStore();
  
  if (!metadataPanelOpen || !selectedNode) return null;
  
  return (
    <div className="w-96 h-full border-l flex flex-col shadow-[-16px_0px_16px_-8px_rgba(12,12,13,0.1)]" style={{ backgroundColor: '#CECECE', borderLeftColor: '#C8C8C8' }}>
      {/* Header */}
      <div className="flex items-center justify-between" style={{ padding: '24px 16px', borderBottom: '1px dashed #ADADAD' }}>
        <h2 className="font-macan-mono text-lg font-semibold uppercase" style={{ color: '#00112B', fontSize: '16px', fontWeight: 600, letterSpacing: '0.1em' }}>
          Node Details
        </h2>
        <button
          onClick={closeMetadataPanel}
          className="w-8 h-8 flex items-center justify-center hover:opacity-80 transition-opacity"
          style={{ background: 'transparent' }}
          aria-label="Close metadata panel"
        >
          <X className="w-5 h-5" style={{ color: '#78797A' }} />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto" style={{ padding: '24px 16px' }}>
        {/* ID */}
        <div className="mb-4">
          <h3 className="text-sm font-medium text-gray-500 mb-2 font-macan">ID</h3>
          <p className="text-sm font-macan-mono text-blue-dark-950">{selectedNode.id}</p>
        </div>
        
        {/* Type */}
        <div className="mb-4">
          <h3 className="text-sm font-medium text-gray-500 mb-2 font-macan">Type</h3>
          <p className="text-sm font-macan text-blue-dark-950 capitalize">{selectedNode.type}</p>
        </div>
        
        {/* Label */}
        <div className="mb-4">
          <h3 className="text-sm font-medium text-gray-500 mb-2 font-macan">Label</h3>
          <p className="text-sm font-macan text-blue-dark-950">{selectedNode.label}</p>
        </div>
        
        {/* Category */}
        <div className="mb-4">
          <h3 className="text-sm font-medium text-gray-500 mb-2 font-macan">Category</h3>
          <p className="text-sm font-macan text-blue-dark-950 capitalize">{selectedNode.category}</p>
        </div>
        
        {/* Status */}
        {selectedNode.status && (
          <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-500 mb-2 font-macan">Status</h3>
            <p className="text-sm font-macan text-blue-dark-950 capitalize">{selectedNode.status}</p>
          </div>
        )}
        
        {/* Metadata */}
        <div className="mb-4">
          <h3 className="text-sm font-medium text-gray-500 mb-2 font-macan">Metadata</h3>
          <div className="bg-gray-100 p-3 rounded">
            <pre className="m-0 whitespace-pre-wrap break-words text-[13px] font-mono text-blue-dark-950">
              {JSON.stringify(selectedNode.metadata || {}, null, 2)}
            </pre>
          </div>
        </div>
        
        {/* Position (if available) */}
        {selectedNode.position && (
          <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-500 mb-2 font-macan">Position</h3>
            <p className="text-sm font-macan-mono text-blue-dark-950">
              x: {selectedNode.position.x}, y: {selectedNode.position.y}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
