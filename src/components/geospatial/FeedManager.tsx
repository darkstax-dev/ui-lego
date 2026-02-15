import React, { useState } from 'react';
import '../../tokens.css';
import './FeedManager.css';

export interface ContributingFeed {
  id: string;
  label: string;
  enabled: boolean;
}

export interface FeedData {
  damagingWinds?: string;
  hailPossible?: string;
  hurricane?: string;
  flooding?: string;
  locationAffected?: string;
  trailLastUpdate?: string;
  estPersons?: string;
  stateOfEmergency?: string;
}

export interface ContributingSource {
  id: string;
  name: string;
}

export interface CameraFeed {
  id: string;
  location: string;
  imageUrl: string;
}

export interface FeedDetectionItem {
  id: string;
  confidence: number;
  name: string;
  status: 'unauthorized' | 'illegal' | 'authorized';
  selected?: boolean;
}

export interface FeedManagerProps {
  /** Active tab: 'emergency' | 'feeds' | 'activity' */
  activeTab?: 'emergency' | 'feeds' | 'activity';
  /** Distance in miles for feed radius */
  distance?: number;
  /** Contributing feeds list */
  contributingFeeds?: ContributingFeed[];
  /** Feed data fields */
  feedData?: FeedData;
  /** Contributing information sources */
  contributingSources?: ContributingSource[];
  /** Available camera feeds */
  cameraFeeds?: CameraFeed[];
  /** Selected camera feed */
  selectedCamera?: string;
  /** Impact detection message */
  impactDetection?: string;
  /** Object detection title */
  detectionTitle?: string;
  /** Detected items list */
  detectedItems?: FeedDetectionItem[];
  /** Primary detection data */
  primaryDetection?: {
    name: string;
    confidence: number;
    location: string;
    model: string;
  };
  /** Situational alert text */
  alertOfficers?: string;
  /** Callbacks */
  onTabChange?: (tab: 'emergency' | 'feeds' | 'activity') => void;
  onDistanceChange?: (distance: number) => void;
  onFeedToggle?: (feedId: string, enabled: boolean) => void;
  onCameraChange?: (cameraId: string) => void;
  onSubmit?: (data: {
    selectedItems: FeedDetectionItem[];
    alertText: string;
  }) => void;
  onClose?: () => void;
  className?: string;
}

export const FeedManager: React.FC<FeedManagerProps> = ({
  activeTab = 'feeds',
  distance = 400,
  contributingFeeds = [
    { id: 'nwas', label: 'NWAS', enabled: true },
    { id: 'emergency', label: 'Emergency', enabled: false },
    { id: 'highway', label: 'Highway Patrol', enabled: false },
    { id: 'social', label: 'Social feed', enabled: false },
  ],
  feedData = {},
  contributingSources = [
    { id: 'nwas', name: 'NWAS' },
    { id: 'neh', name: 'NEH' },
    { id: 'faa', name: 'FAA' },
  ],
  cameraFeeds = [],
  selectedCamera = '',
  impactDetection = 'Flood warning',
  detectionTitle = 'Weapon',
  detectedItems = [],
  primaryDetection = {
    name: 'Pipe',
    confidence: 97,
    location: 'Eastside',
    model: '765',
  },
  alertOfficers = '',
  onTabChange,
  onDistanceChange,
  onFeedToggle,
  onCameraChange,
  onSubmit,
  onClose,
  className = '',
}) => {
  const [currentTab, setCurrentTab] = useState(activeTab);
  const [currentDistance, setCurrentDistance] = useState(distance);
  const [feeds, setFeeds] = useState(contributingFeeds);
  const [selectedItems, setSelectedItems] = useState<Set<string>>(
    new Set(detectedItems.filter(item => item.selected).map(item => item.id))
  );
  const [alertText, setAlertText] = useState(alertOfficers);
  const [isDetectionExpanded, setIsDetectionExpanded] = useState(true);

  const handleTabChange = (tab: 'emergency' | 'feeds' | 'activity') => {
    setCurrentTab(tab);
    onTabChange?.(tab);
  };

  const handleDistanceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    setCurrentDistance(value);
    onDistanceChange?.(value);
  };

  const handleFeedToggle = (feedId: string) => {
    const updatedFeeds = feeds.map(feed =>
      feed.id === feedId ? { ...feed, enabled: !feed.enabled } : feed
    );
    setFeeds(updatedFeeds);
    const feed = updatedFeeds.find(f => f.id === feedId);
    if (feed) {
      onFeedToggle?.(feedId, feed.enabled);
    }
  };

  const toggleDetectedItem = (id: string) => {
    const newSelected = new Set(selectedItems);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedItems(newSelected);
  };

  const handleSubmit = () => {
    const selected = detectedItems.filter(item => selectedItems.has(item.id));
    onSubmit?.({
      selectedItems: selected,
      alertText,
    });
  };

  const getStatusColor = (status: FeedDetectionItem['status']) => {
    switch (status) {
      case 'unauthorized':
        return 'var(--Yellow-500, var(--color-yellow-500))';
      case 'illegal':
        return 'var(--red-600-cta, var(--color-red-600))';
      case 'authorized':
        return 'var(--color-green-600)';
      default:
        return 'var(--color-gray-500)';
    }
  };

  const getStatusLabel = (status: FeedDetectionItem['status']) => {
    switch (status) {
      case 'unauthorized':
        return 'UnAuthorized';
      case 'illegal':
        return 'Illegal';
      case 'authorized':
        return 'Authorized';
      default:
        return 'Unknown';
    }
  };

  return (
    <div className={`feed-manager ${className}`}>
      {/* Header with Tabs */}
      <div className="feed-manager__header">
        <div className="feed-manager__tabs">
          <button
            className={`feed-manager__tab ${currentTab === 'emergency' ? 'active' : ''}`}
            onClick={() => handleTabChange('emergency')}
          >
            <span className="body-base-mono-medium">Emergency</span>
          </button>
          <button
            className={`feed-manager__tab ${currentTab === 'feeds' ? 'active' : ''}`}
            onClick={() => handleTabChange('feeds')}
          >
            <span className="body-base-mono-medium">Feeds</span>
          </button>
          <button
            className={`feed-manager__tab ${currentTab === 'activity' ? 'active' : ''}`}
            onClick={() => handleTabChange('activity')}
          >
            <span className="body-base-mono-medium">Activity</span>
          </button>
        </div>
        {onClose && (
          <button
            className="feed-manager__close-btn"
            onClick={onClose}
            aria-label="Close"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M11.9997 10.5867L16.9497 5.63672L18.3637 7.05072L13.4137 12.0007L18.3637 16.9507L16.9497 18.3647L11.9997 13.4147L7.04974 18.3647L5.63574 16.9507L10.5857 12.0007L5.63574 7.05072L7.04974 5.63672L11.9997 10.5867Z" fill="currentColor"/>
            </svg>
          </button>
        )}
      </div>

      {/* Content Container */}
      <div className="feed-manager__content">
        {/* Distance Slider */}
        <div className="feed-manager__section">
          <div className="feed-manager__distance">
            <span className="body-small-mono-book feed-manager__distance-label">
              Distance: {currentDistance} mi
            </span>
            <input
              type="range"
              min="0"
              max="1000"
              value={currentDistance}
              onChange={handleDistanceChange}
              className="feed-manager__slider"
            />
          </div>
        </div>

        {/* Contributing Feeds */}
        <div className="feed-manager__section">
          <h3 className="body-base-mono-medium feed-manager__section-title">
            Contributing feeds
          </h3>
          <div className="feed-manager__checkboxes">
            {feeds.map(feed => (
              <label key={feed.id} className="feed-manager__checkbox-label">
                <input
                  type="checkbox"
                  checked={feed.enabled}
                  onChange={() => handleFeedToggle(feed.id)}
                  className="feed-manager__checkbox-input"
                />
                <span className="feed-manager__checkbox-box" />
                <span className="body-base-macan-book">{feed.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Feed Data Fields */}
        {Object.keys(feedData).length > 0 && (
          <div className="feed-manager__section">
            {feedData.damagingWinds && (
              <div className="feed-manager__field">
                <span className="body-small-mono-book feed-manager__field-label">
                  Damaging winds
                </span>
                <span className="body-base-mono-book">{feedData.damagingWinds}</span>
              </div>
            )}
            {feedData.hailPossible && (
              <div className="feed-manager__field">
                <span className="body-small-mono-book feed-manager__field-label">
                  Hall possible
                </span>
                <span className="body-base-mono-book">{feedData.hailPossible}</span>
              </div>
            )}
            {feedData.flooding && (
              <div className="feed-manager__field">
                <span className="body-small-mono-book feed-manager__field-label">
                  Flooding
                </span>
                <span className="body-base-mono-book">{feedData.flooding}</span>
              </div>
            )}
          </div>
        )}

        {/* See Details Button */}
        {Object.keys(feedData).length > 0 && (
          <div className="feed-manager__section">
            <button className="feed-manager__button-secondary">
              <span className="emphasis-body-mono-sm">SEE DETAILS</span>
            </button>
          </div>
        )}

        {/* Contributing Information Sources */}
        {contributingSources.length > 0 && (
          <div className="feed-manager__section">
            <h3 className="body-small-mono-book feed-manager__section-subtitle">
              Contributing Information Sources
            </h3>
            <div className="feed-manager__sources">
              {contributingSources.map(source => (
                <span key={source.id} className="body-base-mono-book feed-manager__source-tag">
                  {source.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Camera Feeds */}
        {cameraFeeds.length > 0 && (
          <div className="feed-manager__section">
            <h3 className="body-base-mono-medium feed-manager__section-title">
              Camera feeds
            </h3>
            <select
              value={selectedCamera}
              onChange={(e) => onCameraChange?.(e.target.value)}
              className="feed-manager__select"
            >
              {cameraFeeds.map(feed => (
                <option key={feed.id} value={feed.id}>
                  {feed.location}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Impact Detection */}
        {impactDetection && (
          <div className="feed-manager__section">
            <div className="feed-manager__field">
              <span className="body-small-mono-book feed-manager__field-label">
                Impact detection
              </span>
              <span
                className="body-base-mono-book feed-manager__impact-value"
                style={{ color: 'var(--Yellow-500, var(--color-yellow-500))' }}
              >
                {impactDetection}
              </span>
            </div>
          </div>
        )}

        {/* Camera Feed Image */}
        {cameraFeeds.length > 0 && selectedCamera && (
          <div className="feed-manager__section">
            <div className="feed-manager__image-container">
              <img
                src={cameraFeeds.find(f => f.id === selectedCamera)?.imageUrl || ''}
                alt="Camera feed"
                className="feed-manager__image"
              />
            </div>
          </div>
        )}

        {/* Object Detection Section */}
        {detectedItems.length > 0 && (
          <div className="feed-manager__detection">
            <button
              className="feed-manager__detection-header"
              onClick={() => setIsDetectionExpanded(!isDetectionExpanded)}
            >
              <div className="feed-manager__detection-title">
                <span className="body-base-mono-medium">
                  Object detection: {detectionTitle}
                </span>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10.7218 2.49866L18.6602 16.2487C18.7333 16.3753 18.7718 16.519 18.7718 16.6653C18.7718 16.8116 18.7333 16.9553 18.6602 17.082C18.587 17.2087 18.4818 17.3139 18.3552 17.387C18.2285 17.4601 18.0848 17.4987 17.9385 17.4987H2.06183C1.91555 17.4987 1.77185 17.4601 1.64517 17.387C1.51849 17.3139 1.41329 17.2087 1.34016 17.082C1.26702 16.9553 1.22851 16.8116 1.22852 16.6653C1.22852 16.519 1.26702 16.3753 1.34016 16.2487L9.27849 2.49866C9.35164 2.37199 9.45683 2.2668 9.58351 2.19367C9.71019 2.12053 9.85389 2.08203 10.0002 2.08203C10.1464 2.08203 10.2901 2.12053 10.4168 2.19367C10.5435 2.2668 10.6487 2.37199 10.7218 2.49866ZM9.16683 13.332V14.9987H10.8335V13.332H9.16683ZM9.16683 7.49866V11.6653H10.8335V7.49866H9.16683Z" fill="#23A45A"/>
                </svg>
              </div>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                className={`feed-manager__expand-icon ${isDetectionExpanded ? 'expanded' : ''}`}
              >
                <path d="M11.9997 13.1727L16.9497 8.22266L18.3637 9.63666L11.9997 16.0007L5.63574 9.63666L7.04974 8.22266L11.9997 13.1727Z" fill="currentColor"/>
              </svg>
            </button>

            {isDetectionExpanded && primaryDetection && (
              <>
                {/* Confidence and Details */}
                <div className="feed-manager__confidence">
                  <div className="feed-manager__confidence-circle">
                    <svg width="46" height="46" viewBox="0 0 46 46" fill="none">
                      <circle cx="23" cy="23" r="21.5" stroke="var(--color-gray-400)" strokeWidth="3"/>
                      <path
                        d="M23 0C17.6096 -6.42802e-08 12.3904 1.8933 8.25366 5.34935C4.11694 8.8054 1.32551 13.6046 0.366739 18.9091C-0.592032 24.2136 0.342768 29.6863 3.00793 34.3718C5.67309 39.0572 9.89928 42.6578 14.9487 44.5447C19.998 46.4317 25.5497 46.4852 30.6345 44.6959C35.7193 42.9067 40.0142 39.3883 42.7691 34.755C45.5241 30.1218 46.5643 24.6681 45.7079 19.3461C44.8516 14.0242 42.1532 9.17204 38.0838 5.63689L36.1849 7.82277C39.7419 10.9129 42.1006 15.1542 42.8492 19.8061C43.5977 24.4581 42.6885 29.2252 40.2804 33.2752C37.8722 37.3251 34.1181 40.4006 29.6734 41.9646C25.2288 43.5286 20.3759 43.4818 15.9623 41.8324C11.5486 40.183 7.85442 37.0358 5.52478 32.9401C3.19514 28.8445 2.37803 24.0608 3.21609 19.4241C4.05416 14.7874 6.49417 10.5924 10.1101 7.57143C13.7261 4.55047 18.2882 2.89552 23 2.89552V0Z"
                        fill="var(--color-green-500)"
                      />
                      <text
                        fill="var(--Text-Blue-text-Main-text)"
                        style={{ whiteSpace: 'pre' } as React.CSSProperties}
                        fontFamily="Macan"
                        fontSize="16"
                        letterSpacing="-0.02em"
                      >
                        <tspan x="7" y="30.0039">{primaryDetection.confidence}%</tspan>
                      </text>
                    </svg>
                  </div>
                  <div className="feed-manager__details">
                    <div className="feed-manager__detail-row">
                      <span className="body-small-mono-book feed-manager__detail-label">
                        Object Confidence:
                      </span>
                      <span className="body-base-mono-book">{primaryDetection.name}</span>
                    </div>
                    <div className="feed-manager__detail-row">
                      <span className="body-small-mono-book feed-manager__detail-label">
                        Location Camera:
                      </span>
                      <span className="body-base-mono-book">{primaryDetection.location}</span>
                    </div>
                    <div className="feed-manager__detail-row">
                      <span className="body-small-mono-book feed-manager__detail-label">
                        Confidence Model
                      </span>
                      <span className="body-base-mono-book">{primaryDetection.model}</span>
                    </div>
                  </div>
                </div>

                {/* Detected Items List */}
                <div className="feed-manager__items">
                  {detectedItems.map(item => (
                    <div key={item.id} className="feed-manager__item">
                      <div className="feed-manager__item-info">
                        <span className="body-base-macan-book">{item.confidence}%</span>
                        <span className="body-base-macan-book">{item.name}</span>
                      </div>
                      <div className="feed-manager__item-actions">
                        <span
                          className="body-base-mono-book"
                          style={{ color: getStatusColor(item.status) }}
                        >
                          {getStatusLabel(item.status)}
                        </span>
                        <label className="feed-manager__checkbox">
                          <input
                            type="checkbox"
                            checked={selectedItems.has(item.id)}
                            onChange={() => toggleDetectedItem(item.id)}
                          />
                          <span className="feed-manager__checkbox-box-small" />
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {/* Situational Section */}
        <div className="feed-manager__section">
          <h3 className="body-base-mono-medium feed-manager__section-title">
            Situational
          </h3>
          <textarea
            value={alertText}
            onChange={(e) => setAlertText(e.target.value)}
            placeholder="Alert offices"
            className="feed-manager__textarea"
            rows={4}
          />
        </div>

        {/* Submit Button */}
        <div className="feed-manager__section">
          <button
            className="feed-manager__button-primary"
            onClick={handleSubmit}
          >
            <span className="emphasis-body-mono-sm">SUBMIT</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedManager;
