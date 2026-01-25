import { useState } from 'react';
import { Download, FileJson, Image, FileImage } from 'lucide-react';
import { useTopologyStore } from '@/store/topologyStore';
import { ExportManager } from '@/lib/graph/ExportManager';
import { cn } from '@/utils/cn';

export function ExportControls() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const { nodes, edges } = useTopologyStore();

  const handleExportPNG = async () => {
    setIsExporting(true);
    try {
      await ExportManager.exportAsPNG('topology-canvas', 'topology.png');
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportSVG = async () => {
    setIsExporting(true);
    try {
      await ExportManager.exportAsSVG('topology-canvas', 'topology.svg');
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportJSON = () => {
    ExportManager.exportAsJSON(nodes, edges, 'topology.json');
  };

  return (
    <div className="absolute top-4 right-96 z-10">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'p-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border transition-colors flex items-center gap-2',
          isOpen 
            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
            : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
        )}
        title="Export Topology"
      >
        <Download className="w-5 h-5" />
      </button>

      {isOpen && (
        <div className="absolute top-12 right-0 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 p-2">
          <button
            onClick={handleExportPNG}
            disabled={isExporting}
            className="w-full px-3 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 rounded flex items-center gap-2 text-sm disabled:opacity-50"
          >
            <Image className="w-4 h-4" />
            Export as PNG
          </button>

          <button
            onClick={handleExportSVG}
            disabled={isExporting}
            className="w-full px-3 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 rounded flex items-center gap-2 text-sm disabled:opacity-50"
          >
            <FileImage className="w-4 h-4" />
            Export as SVG
          </button>

          <button
            onClick={handleExportJSON}
            className="w-full px-3 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 rounded flex items-center gap-2 text-sm"
          >
            <FileJson className="w-4 h-4" />
            Export as JSON
          </button>
        </div>
      )}
    </div>
  );
}
