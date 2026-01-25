export type TopologyMode = 'live' | 'history';
export type LayoutAlgorithm = 'force' | 'hierarchical' | 'manual';
export type TimeType = 'absolute' | 'relative';

export interface TopologyConfig {
  websocketUrl?: string;
  mode?: TopologyMode;
  layoutAlgorithm?: LayoutAlgorithm;
  autoLayout?: boolean;
  enableMinimap?: boolean;
  enableControls?: boolean;
  theme?: 'light' | 'dark';
}

export interface BandwidthConfig {
  threshold: 'absolute' | 'relative';
  updatePeriod: number;
  active: number;
  warning: number;
  alert: number;
}
