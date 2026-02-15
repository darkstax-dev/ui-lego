import React, { useState } from 'react';
import { MapView, MapLocation } from './MapView';
import { EventDetectionCard, EventDetectionData, DetectedItem } from './EventDetectionCard';
import '../../tokens.css';
import './CommandCenterMap.css';

export interface EventMarker {
  id: string;
  location: MapLocation;
  eventData: EventDetectionData;
}

export interface CommandCenterMapProps {
  /** Mapbox access token - required */
  mapboxAccessToken: string;
  /** Initial center point of the map */
  initialCenter?: MapLocation;
  /** Initial zoom level (0-24) */
  initialZoom?: number;
  /** Map style - 'streets', 'satellite', 'dark', or 'light' */
  mapStyle?: 'streets' | 'satellite' | 'dark' | 'light';
  /** Enable 3D buildings */
  enable3DBuildings?: boolean;
  /** Array of event markers to display */
  events?: EventMarker[];
  /** Active event ID to show in card */
  activeEventId?: string;
  /** Callback when an event is selected */
  onEventSelect?: (eventId: string) => void;
  /** Callback when event card is dismissed */
  onEventDismiss?: (eventId: string) => void;
  /** Callback when COA is generated */
  onGenerateCOA?: (eventId: string, selectedItems: DetectedItem[]) => void;
  /** Callback when event card is closed */
  onEventClose?: (eventId: string) => void;
  /** Height of the map container */
  height?: string | number;
  /** Width of the map container */
  width?: string | number;
  /** Additional CSS classes */
  className?: string;
  /** Show timeline at bottom */
  showTimeline?: boolean;
  /** Timeline hours to display */
  timelineHours?: number[];
}

export const CommandCenterMap: React.FC<CommandCenterMapProps> = ({
  mapboxAccessToken,
  initialCenter,
  initialZoom = 16,
  mapStyle = 'dark',
  enable3DBuildings = true,
  events = [],
  activeEventId,
  onEventSelect,
  onEventDismiss,
  onGenerateCOA,
  onEventClose,
  height = '100vh',
  width = '100%',
  className = '',
  showTimeline = true,
  timelineHours = Array.from({ length: 14 }, (_, i) => i),
}) => {
  const [localActiveEventId, setLocalActiveEventId] = useState<string | undefined>(activeEventId);

  const currentActiveEventId = activeEventId !== undefined ? activeEventId : localActiveEventId;
  const activeEvent = events.find(e => e.id === currentActiveEventId);

  const handleEventSelect = (eventId: string) => {
    setLocalActiveEventId(eventId);
    onEventSelect?.(eventId);
  };

  const handleEventDismiss = () => {
    if (currentActiveEventId) {
      onEventDismiss?.(currentActiveEventId);
      setLocalActiveEventId(undefined);
    }
  };

  const handleGenerateCOA = (selectedItems: DetectedItem[]) => {
    if (currentActiveEventId) {
      onGenerateCOA?.(currentActiveEventId, selectedItems);
    }
  };

  const handleEventClose = () => {
    if (currentActiveEventId) {
      onEventClose?.(currentActiveEventId);
      setLocalActiveEventId(undefined);
    }
  };

  return (
    <div 
      className={`command-center-map ${className}`}
      style={{ 
        height: typeof height === 'number' ? `${height}px` : height,
        width: typeof width === 'number' ? `${width}px` : width,
      }}
    >
      {/* Timeline Header */}
      {showTimeline && (
        <div className="command-center-map__timeline">
          {timelineHours.map((hour) => (
            <div key={hour} className="command-center-map__timeline-item">
              <span className="body-base-mono-medium">{hour.toString().padStart(3, '0')}</span>
            </div>
          ))}
        </div>
      )}

      {/* Map Container */}
      <div className="command-center-map__container">
        <MapView
          mapboxAccessToken={mapboxAccessToken}
          initialCenter={initialCenter}
          initialZoom={initialZoom}
          mapStyle={mapStyle}
          enable3DBuildings={enable3DBuildings}
          height="100%"
          width="100%"
        >
          {/* Event markers would go here */}
        </MapView>

        {/* Event Detection Card Overlay */}
        {activeEvent && (
          <div className="command-center-map__event-card">
            <EventDetectionCard
              data={activeEvent.eventData}
              onDismiss={handleEventDismiss}
              onGenerateCOA={handleGenerateCOA}
              onClose={handleEventClose}
            />
          </div>
        )}

        {/* View Controls */}
        <div className="command-center-map__controls">
          <button className="command-center-map__control-btn">
            <span className="body-base-mono-book">2D wiew</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path fillRule="evenodd" clipRule="evenodd" d="M13.3295 8.66667H8.66626V13.3299H9.99862V10.9412L13.057 14L13.5281 13.5289L13.9992 13.0579L10.9407 9.99903H13.3295V8.66667ZM2.66964 7.33333H7.33291V2.67007H6.00055V5.05885L2.94212 2L2.47106 2.47106L2 2.94212L5.05843 6.00097H2.66964V7.33333Z" fill="currentColor"/>
            </svg>
          </button>
          <button className="command-center-map__control-btn">
            <span className="body-base-mono-book">Reset view</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommandCenterMap;
