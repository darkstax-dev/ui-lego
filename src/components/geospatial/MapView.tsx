import React, { useRef, useEffect, useState } from 'react';
import Map, { MapRef, Layer, Source } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';
import '../../tokens.css';
import './MapView.css';

export interface MapLocation {
  longitude: number;
  latitude: number;
}

export interface MapViewProps {
  /** Initial center point of the map */
  initialCenter?: MapLocation;
  /** Initial zoom level (0-24) */
  initialZoom?: number;
  /** Initial pitch for 3D view (0-85) */
  initialPitch?: number;
  /** Initial bearing/rotation (0-360) */
  initialBearing?: number;
  /** Map style - 'streets', 'satellite', 'dark', or 'light' */
  mapStyle?: 'streets' | 'satellite' | 'dark' | 'light';
  /** Custom Mapbox style URL */
  customStyleUrl?: string;
  /** Enable 3D buildings */
  enable3DBuildings?: boolean;
  /** Height of the map container */
  height?: string | number;
  /** Width of the map container */
  width?: string | number;
  /** Children to render on top of map (e.g., markers, overlays) */
  children?: React.ReactNode;
  /** Callback when map is loaded */
  onLoad?: () => void;
  /** Mapbox access token - required */
  mapboxAccessToken: string;
  /** Additional CSS classes */
  className?: string;
}

const MAPBOX_STYLES = {
  streets: 'mapbox://styles/mapbox/streets-v12',
  satellite: 'mapbox://styles/mapbox/satellite-streets-v12',
  dark: 'mapbox://styles/mapbox/dark-v11',
  light: 'mapbox://styles/mapbox/light-v11',
};

export const MapView: React.FC<MapViewProps> = ({
  initialCenter = { longitude: -74.006, latitude: 40.7128 }, // New York
  initialZoom = 15,
  initialPitch = 60,
  initialBearing = 0,
  mapStyle = 'dark',
  customStyleUrl,
  enable3DBuildings = true,
  height = '100%',
  width = '100%',
  children,
  onLoad,
  mapboxAccessToken,
  className = '',
}) => {
  const mapRef = useRef<MapRef>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  const styleUrl = customStyleUrl || MAPBOX_STYLES[mapStyle];

  useEffect(() => {
    if (!isMapLoaded || !enable3DBuildings || !mapRef.current) return;

    const map = mapRef.current.getMap();

    // Wait for style to load before adding 3D buildings
    if (!map.isStyleLoaded()) {
      map.once('styledata', () => {
        add3DBuildingsLayer(map);
      });
    } else {
      add3DBuildingsLayer(map);
    }
  }, [isMapLoaded, enable3DBuildings]);

  const add3DBuildingsLayer = (map: mapboxgl.Map) => {
    const layers = map.getStyle()?.layers;
    if (!layers) return;

    // Find the first symbol layer in the map style
    let firstSymbolId: string | undefined;
    for (const layer of layers) {
      if (layer.type === 'symbol') {
        firstSymbolId = layer.id;
        break;
      }
    }

    // Check if 3d-buildings layer already exists
    if (map.getLayer('3d-buildings')) {
      return;
    }

    // Add 3D building layer
    map.addLayer(
      {
        id: '3d-buildings',
        source: 'composite',
        'source-layer': 'building',
        filter: ['==', 'extrude', 'true'],
        type: 'fill-extrusion',
        minzoom: 14,
        paint: {
          'fill-extrusion-color': [
            'case',
            ['boolean', ['feature-state', 'hover'], false],
            '#4a90e2',
            '#aaa'
          ],
          'fill-extrusion-height': [
            'interpolate',
            ['linear'],
            ['zoom'],
            15,
            0,
            15.05,
            ['get', 'height'],
          ],
          'fill-extrusion-base': [
            'interpolate',
            ['linear'],
            ['zoom'],
            15,
            0,
            15.05,
            ['get', 'min_height'],
          ],
          'fill-extrusion-opacity': 0.6,
        },
      },
      firstSymbolId
    );
  };

  const handleMapLoad = () => {
    setIsMapLoaded(true);
    onLoad?.();
  };

  return (
    <div 
      className={`map-view ${className}`}
      style={{ 
        height: typeof height === 'number' ? `${height}px` : height,
        width: typeof width === 'number' ? `${width}px` : width,
      }}
    >
      <Map
        ref={mapRef}
        mapboxAccessToken={mapboxAccessToken}
        initialViewState={{
          longitude: initialCenter.longitude,
          latitude: initialCenter.latitude,
          zoom: initialZoom,
          pitch: initialPitch,
          bearing: initialBearing,
        }}
        mapStyle={styleUrl}
        onLoad={handleMapLoad}
        attributionControl={false}
        style={{ width: '100%', height: '100%' }}
      >
        {children}
      </Map>
    </div>
  );
};

export default MapView;
