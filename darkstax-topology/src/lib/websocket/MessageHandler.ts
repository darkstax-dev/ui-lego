import { WebSocketMessage, SyncReplyData, SkydiveNode, SkydiveEdge } from '@/types/websocket';
import { TopologyNode, TopologyEdge } from '@/types/graph';
import { BandwidthCalculator } from '@/lib/d3/bandwidth';

export class MessageHandler {
  private onSyncReply?: (nodes: TopologyNode[], edges: TopologyEdge[]) => void;
  private onNodeAdded?: (node: TopologyNode) => void;
  private onNodeUpdated?: (node: TopologyNode) => void;
  private onNodeDeleted?: (nodeId: string) => void;
  private onEdgeAdded?: (edge: TopologyEdge) => void;
  private onEdgeDeleted?: (edgeId: string) => void;

  constructor(handlers: {
    onSyncReply?: (nodes: TopologyNode[], edges: TopologyEdge[]) => void;
    onNodeAdded?: (node: TopologyNode) => void;
    onNodeUpdated?: (node: TopologyNode) => void;
    onNodeDeleted?: (nodeId: string) => void;
    onEdgeAdded?: (edge: TopologyEdge) => void;
    onEdgeDeleted?: (edgeId: string) => void;
  }) {
    this.onSyncReply = handlers.onSyncReply;
    this.onNodeAdded = handlers.onNodeAdded;
    this.onNodeUpdated = handlers.onNodeUpdated;
    this.onNodeDeleted = handlers.onNodeDeleted;
    this.onEdgeAdded = handlers.onEdgeAdded;
    this.onEdgeDeleted = handlers.onEdgeDeleted;
  }

  handle(message: WebSocketMessage) {
    switch (message.Type) {
      case 'SyncReply':
        this.handleSyncReply(message.Obj);
        break;
      case 'NodeAdded':
        this.handleNodeAdded(message.Obj);
        break;
      case 'NodeUpdated':
        this.handleNodeUpdated(message.Obj);
        break;
      case 'NodeDeleted':
        this.handleNodeDeleted(message.Obj);
        break;
      case 'EdgeAdded':
        this.handleEdgeAdded(message.Obj);
        break;
      case 'EdgeDeleted':
        this.handleEdgeDeleted(message.Obj);
        break;
    }
  }

  private handleSyncReply(data: SyncReplyData) {
    if (!this.onSyncReply) return;

    const nodes: TopologyNode[] = Object.values(data.Nodes || {}).map(this.convertSkydiveNode);
    const edges: TopologyEdge[] = Object.values(data.Edges || {}).map(this.convertSkydiveEdge);

    this.onSyncReply(nodes, edges);
  }

  private handleNodeAdded(node: SkydiveNode) {
    if (!this.onNodeAdded) return;
    this.onNodeAdded(this.convertSkydiveNode(node));
  }

  private handleNodeUpdated(node: SkydiveNode) {
    if (!this.onNodeUpdated) return;
    this.onNodeUpdated(this.convertSkydiveNode(node));
  }

  private handleNodeDeleted(node: SkydiveNode) {
    if (!this.onNodeDeleted) return;
    this.onNodeDeleted(node.ID);
  }

  private handleEdgeAdded(edge: SkydiveEdge) {
    if (!this.onEdgeAdded) return;
    this.onEdgeAdded(this.convertSkydiveEdge(edge));
  }

  private handleEdgeDeleted(edge: SkydiveEdge) {
    if (!this.onEdgeDeleted) return;
    this.onEdgeDeleted(edge.ID);
  }

  private convertSkydiveNode(node: SkydiveNode): TopologyNode {
    const bandwidth = BandwidthCalculator.calculate(node.Metadata.LastUpdateMetric);

    return {
      id: node.ID,
      type: node.Metadata.Type,
      position: { 
        x: Math.random() * 1000, 
        y: Math.random() * 600 
      },
      data: {
        metadata: node.Metadata,
        label: node.Metadata.Name || node.Metadata.Type || 'Unknown',
        bandwidth: bandwidth.normalized
      }
    };
  }

  private convertSkydiveEdge(edge: SkydiveEdge): TopologyEdge {
    const relationType = edge.Metadata.RelationType || 'layer2';
    
    let edgeType: 'network' | 'ownership' | 'policy' = 'network';
    if (relationType === 'ownership') {
      edgeType = 'ownership';
    }

    return {
      id: edge.ID,
      source: edge.Parent,
      target: edge.Child,
      type: edgeType,
      data: {
        metadata: edge.Metadata
      }
    };
  }
}
