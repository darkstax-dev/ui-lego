import React from 'react';
import { ResponsiveTreeMap } from '@nivo/treemap';
import { ChartColorPalette, getPalette, resolvePalette } from '../palette';
import './TreemapChart.css';

export interface TreemapDataNode {
  id: string;
  name: string;
  value?: number;
  children?: TreemapDataNode[];
  color?: string;
}

export interface TreemapChartProps {
  data: TreemapDataNode;
  palette?: string | ChartColorPalette;
  width?: number;
  height?: number;
  tile?: 'squarify' | 'resquarify' | 'slice' | 'dice' | 'sliceDice';
  leavesOnly?: boolean;
  innerPadding?: number;
  outerPadding?: number;
  borderWidth?: number;
  borderColor?: string;
  enableLabel?: boolean;
  label?: string | ((node: any) => string);
  labelSkipSize?: number;
  labelTextColor?: string | { from: string; modifiers: any[] };
  orientLabel?: boolean;
  enableParentLabel?: boolean;
  parentLabel?: string | ((node: any) => string);
  parentLabelSize?: number;
  parentLabelTextColor?: string | { from: string; modifiers: any[] };
  isInteractive?: boolean;
  animate?: boolean;
  onNodeClick?: (node: TreemapDataNode) => void;
  className?: string;
  margin?: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
}

export const TreemapChart: React.FC<TreemapChartProps> = ({
  data,
  palette = 'default',
  width,
  height = 400,
  tile = 'squarify',
  leavesOnly = false,
  innerPadding = 3,
  outerPadding = 3,
  borderWidth = 1,
  borderColor = 'white',
  enableLabel = true,
  label = 'name',
  labelSkipSize = 12,
  labelTextColor = { from: 'color', modifiers: [['darker', 1.2]] },
  orientLabel = true,
  enableParentLabel = true,
  parentLabel = 'name',
  parentLabelSize = 24,
  parentLabelTextColor = { from: 'color', modifiers: [['darker', 2]] },
  isInteractive = true,
  animate = true,
  onNodeClick,
  className = '',
  margin = { top: 10, right: 10, bottom: 10, left: 10 },
}) => {
  // Resolve the color palette
  const colorPalette = typeof palette === 'string' ? getPalette(palette) : palette;
  const resolvedPalette = resolvePalette(colorPalette);

  return (
    <div className={`treemap-chart ${className}`}>
      <div className="treemap-chart__container" style={{ height }}>
        <ResponsiveTreeMap
          data={data}
          margin={margin}
          identity="name"
          value="value"
          tile={tile}
          leavesOnly={leavesOnly}
          innerPadding={innerPadding}
          outerPadding={outerPadding}
          colors={resolvedPalette.colors}
          borderWidth={borderWidth}
          borderColor={borderColor}
          enableLabel={enableLabel}
          label={label}
          labelSkipSize={labelSkipSize}
          labelTextColor={labelTextColor}
          orientLabel={orientLabel}
          enableParentLabel={enableParentLabel}
          parentLabel={parentLabel}
          parentLabelSize={parentLabelSize}
          parentLabelTextColor={parentLabelTextColor}
          motionConfig={animate ? 'gentle' : 'instant'}
          isInteractive={isInteractive}
          {...(onNodeClick && { onClick: onNodeClick })}
          theme={{
            background: 'transparent',
            text: {
              fontFamily: 'var(--font-family-macan-mono)',
              fontSize: 12,
              fill: resolvedPalette.text || 'var(--Text-Blue-text-Main-text)',
            },
            tooltip: {
              container: {
                background: resolvedPalette.background || '#ffffff',
                border: `1px solid ${resolvedPalette.border || '#ddd'}`,
                fontSize: '14px',
                fontFamily: 'var(--font-family-macan-mono)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default TreemapChart;
