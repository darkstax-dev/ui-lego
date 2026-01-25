export type IconType = 'lock' | 'settings' | 'alert' | 'link' | 'custom';

export interface NodeTypeConfig {
  label: string;
  icon: IconType | string;
  iconPath?: string;
  color: string;
  backgroundColor?: string;
  shape?: 'circle' | 'rect' | 'hexagon';
  size?: number;
  strokeColor?: string;
  strokeWidth?: number;
}

export interface EdgeTypeConfig {
  label: string;
  color: string;
  width?: number;
  style?: 'solid' | 'dashed' | 'dotted';
  dashArray?: string;
  animated?: boolean;
}

export interface GroupingCriteria {
  type: 'property-match' | 'pattern-match' | 'manual';
  ownerProperty?: string;
  ownerValue?: string | string[];
  memberProperty?: string;
  memberValue?: string | string[];
  pattern?: string;
  manualGroups?: Array<{
    ownerId: string;
    memberIds: string[];
  }>;
}

export interface GroupingRule {
  id: string;
  name?: string;
  enabled: boolean;
  criteria: GroupingCriteria;
  style?: {
    fillColor?: string;
    strokeColor?: string;
    strokeWidth?: number;
    strokeDashArray?: string;
    opacity?: number;
    borderRadius?: number;
    padding?: number;
  };
}

export interface ThemeConfig {
  backgroundColor?: string;
  gridColor?: string;
  gridOpacity?: number;
  selectionColor?: string;
  selectionStrokeWidth?: number;
  hoverColor?: string;
  textColor?: string;
  labelFontFamily?: string;
  labelFontSize?: number;
  labelFontWeight?: string | number;
}

export interface LayoutConfig {
  defaultAlgorithm?: 'force' | 'hierarchical' | 'manual';
  autoLayout?: boolean;
  forceLayout?: {
    chargeStrength?: number;
    linkDistance?: number;
    collideRadius?: number;
  };
  hierarchicalLayout?: {
    direction?: 'TB' | 'BT' | 'LR' | 'RL';
    levelSeparation?: number;
    nodeSeparation?: number;
  };
}

export interface TopologyMetadata {
  name: string;
  description?: string;
  version?: string;
  author?: string;
  tags?: string[];
}

export interface TopologyConfig {
  metadata: TopologyMetadata;
  nodeTypes: Record<string, NodeTypeConfig>;
  edgeTypes: Record<string, EdgeTypeConfig>;
  groupingRules?: GroupingRule[];
  theme?: ThemeConfig;
  layout?: LayoutConfig;
  features?: {
    enableSearch?: boolean;
    enableFiltering?: boolean;
    enableExport?: boolean;
    enableTimeline?: boolean;
    enableMetadataPanel?: boolean;
    enableContextMenu?: boolean;
    enableKeyboardShortcuts?: boolean;
  };
}

export interface TopologyConfigFile extends TopologyConfig {
  $schema?: string;
}
