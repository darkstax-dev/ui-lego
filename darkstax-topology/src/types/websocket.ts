export type WebSocketMessageType = 
  | 'SyncRequest'
  | 'SyncReply'
  | 'NodeAdded'
  | 'NodeUpdated'
  | 'NodeDeleted'
  | 'EdgeAdded'
  | 'EdgeDeleted';

export interface WebSocketMessage {
  Type: WebSocketMessageType;
  Obj?: any;
  Status?: number;
}

export interface SyncReplyData {
  Nodes: Record<string, SkydiveNode>;
  Edges: Record<string, SkydiveEdge>;
}

export interface SkydiveNode {
  ID: string;
  Metadata: any;
  Host: string;
  CreatedAt: number;
  UpdatedAt: number;
}

export interface SkydiveEdge {
  ID: string;
  Parent: string;
  Child: string;
  Metadata: any;
  Host: string;
  CreatedAt: number;
  UpdatedAt: number;
}
