import React from 'react';
import { ResponsiveGeoMap } from '@nivo/geo';
import { ChartColorPalette, getPalette, resolvePalette } from '../palette';
import './GeoChart.css';

export interface GeoFeature {
  type: string;
  properties: {
    name: string;
    [key: string]: any;
  };
  geometry: any;
}

export interface GeoDataPoint {
  id: string;
  value: number;
}

export interface GeoChartProps {
  features: GeoFeature[];
  data?: GeoDataPoint[];
  palette?: string | ChartColorPalette;
  width?: number;
  height?: number;
  projectionType?: 'mercator' | 'equalEarth' | 'naturalEarth1' | 'orthographic';
  projectionScale?: number;
  projectionTranslation?: [number, number];
  projectionRotation?: [number, number, number];
  fillColor?: string;
  borderWidth?: number;
  borderColor?: string;
  enableGraticule?: boolean;
  graticuleLineWidth?: number;
  graticuleLineColor?: string;
  isInteractive?: boolean;
  onFeatureClick?: (feature: GeoFeature) => void;
  className?: string;
  margin?: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
}

export const GeoChart: React.FC<GeoChartProps> = ({
  features,
  data,
  palette = 'default',
  width,
  height = 400,
  projectionType = 'mercator',
  projectionScale = 100,
  projectionTranslation = [0.5, 0.5],
  projectionRotation = [0, 0, 0],
  fillColor = '#eeeeee',
  borderWidth = 0.5,
  borderColor = '#333333',
  enableGraticule = false,
  graticuleLineWidth = 0.5,
  graticuleLineColor = '#999999',
  isInteractive = true,
  onFeatureClick,
  className = '',
  margin = { top: 0, right: 0, bottom: 0, left: 0 },
}) => {
  // Resolve the color palette
  const colorPalette = typeof palette === 'string' ? getPalette(palette) : palette;
  const resolvedPalette = resolvePalette(colorPalette);

  return (
    <div className={`geo-chart ${className}`}>
      <div className="geo-chart__container" style={{ height }}>
        <ResponsiveGeoMap
          features={features}
          margin={margin}
          projectionType={projectionType}
          projectionScale={projectionScale}
          projectionTranslation={projectionTranslation}
          projectionRotation={projectionRotation}
          fillColor={fillColor}
          borderWidth={borderWidth}
          borderColor={borderColor}
          enableGraticule={enableGraticule}
          graticuleLineWidth={graticuleLineWidth}
          graticuleLineColor={graticuleLineColor}
          isInteractive={isInteractive}
          {...(onFeatureClick && { onClick: onFeatureClick })}
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
                zIndex: 9999,
                position: 'relative',
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default GeoChart;
