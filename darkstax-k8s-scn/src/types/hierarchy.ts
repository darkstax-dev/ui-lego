export interface HierarchyMetadata {
  name: string;
  description?: string;
  version: string;
  author?: string;
  tags?: string[];
}

export interface HierarchyLevel {
  level: number;
  name: string;
  description?: string;
  resourceTypes: string[];
  canContain?: string[];
  displayOrder?: number;
}

export interface LaneConfig {
  display: boolean;
  height: number | 'auto';
  order?: number;
}

export interface Category {
  id: string;
  label: string;
  description?: string;
  resourceTypes: string[];
  laneConfig: LaneConfig;
  color?: string;
  icon?: string;
}

export interface GroupingCriteria {
  type: 'property-match' | 'pattern-match' | 'manual';
  ownerProperty?: string;
  ownerValue?: string;
  memberProperty?: string;
  memberValue?: string;
}

export interface LabelStyle {
  fontSize?: number;
  fontWeight?: number;
  color?: string;
}

export interface GroupStyle {
  fillColor?: string;
  strokeColor?: string;
  strokeWidth?: number;
  strokeDashArray?: string;
  borderRadius?: number;
  padding?: number;
  labelPosition?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center';
  labelStyle?: LabelStyle;
}

export interface GroupingRule {
  id: string;
  name: string;
  description?: string;
  enabled: boolean;
  priority?: number;
  criteria: GroupingCriteria;
  hierarchyLevel?: number;
  collapsible?: boolean;
  defaultCollapsed?: boolean;
  style?: GroupStyle;
}

export interface ConnectionStyle {
  color?: string;
  width?: number;
  style?: 'solid' | 'dashed' | 'dotted';
  dashArray?: string;
}

export interface RelationshipRule {
  id: string;
  name: string;
  sourceType: string;
  targetTypes: string[];
  relationship: 'contains' | 'manages' | 'routes' | 'uses' | 'mounts' | 'binds';
  matchProperty?: string;
  displayConnection?: boolean;
  connectionStyle?: ConnectionStyle;
}

export interface NodeSpacing {
  horizontal?: number;
  vertical?: number;
  groupPadding?: number;
}

export interface LabelDisplay {
  showLabels?: boolean;
  truncateLength?: number;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

export interface IndicatorDisplay {
  showContainerCount?: boolean;
  showStatusIndicator?: boolean;
  position?: string;
}

export interface DisplayRules {
  showEmptyLanes?: boolean;
  autoCollapseDepth?: number | null;
  nodeSpacing?: NodeSpacing;
  labelDisplay?: LabelDisplay;
  indicatorDisplay?: IndicatorDisplay;
}

export interface InteractionRules {
  allowDragDrop?: boolean;
  allowCollapse?: boolean;
  allowExpand?: boolean;
  contextMenuEnabled?: boolean;
  doubleClickAction?: 'expand-collapse' | 'open-details' | 'none';
  selectionMode?: 'single' | 'multiple' | 'none';
}

export interface HierarchyConfig {
  metadata: HierarchyMetadata;
  hierarchyLevels: HierarchyLevel[];
  categories: Category[];
  groupingRules: GroupingRule[];
  relationshipRules?: RelationshipRule[];
  displayRules?: DisplayRules;
  interactionRules?: InteractionRules;
}
