export interface SkydiveNode {
  ID: string;
  Metadata: Record<string, any>;
  Host?: string;
  CreatedAt?: number;
  UpdatedAt?: number;
}

export interface SkydiveEdge {
  ID: string;
  Parent: string;
  Child: string;
  Metadata: Record<string, any>;
  Host?: string;
  CreatedAt?: number;
  UpdatedAt?: number;
}

export interface SkydiveSyncReplyData {
  Nodes: Record<string, SkydiveNode>;
  Edges: Record<string, SkydiveEdge>;
}
