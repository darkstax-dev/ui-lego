import { TopologyNode, TopologyEdge } from '@/types/graph';
import { toPng, toSvg } from 'html-to-image';

export class ExportManager {
  static async exportAsPNG(elementId: string, filename: string = 'topology.png') {
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error('Element not found');
    }

    try {
      const dataUrl = await toPng(element, {
        quality: 1,
        pixelRatio: 2,
      });

      this.downloadFile(dataUrl, filename);
    } catch (error) {
      console.error('PNG export failed:', error);
      throw error;
    }
  }

  static async exportAsSVG(elementId: string, filename: string = 'topology.svg') {
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error('Element not found');
    }

    try {
      const dataUrl = await toSvg(element);
      this.downloadFile(dataUrl, filename);
    } catch (error) {
      console.error('SVG export failed:', error);
      throw error;
    }
  }

  static exportAsJSON(
    nodes: TopologyNode[], 
    edges: TopologyEdge[], 
    filename: string = 'topology.json'
  ) {
    const data = {
      nodes: nodes.map(node => ({
        id: node.id,
        type: node.type,
        position: node.position,
        data: node.data,
      })),
      edges: edges.map(edge => ({
        id: edge.id,
        source: edge.source,
        target: edge.target,
        type: edge.type,
        data: edge.data,
      })),
      exportedAt: new Date().toISOString(),
    };

    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    this.downloadFile(url, filename);
    URL.revokeObjectURL(url);
  }

  static importFromJSON(file: File): Promise<{ nodes: TopologyNode[]; edges: TopologyEdge[] }> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target?.result as string);
          resolve({
            nodes: data.nodes || [],
            edges: data.edges || [],
          });
        } catch (error) {
          reject(new Error('Invalid JSON file'));
        }
      };
      
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsText(file);
    });
  }

  private static downloadFile(dataUrl: string, filename: string) {
    const link = document.createElement('a');
    link.download = filename;
    link.href = dataUrl;
    link.click();
  }
}
