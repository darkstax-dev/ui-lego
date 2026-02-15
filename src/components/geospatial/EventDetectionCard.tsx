import React, { useState } from 'react';
import '../../tokens.css';
import './EventDetectionCard.css';

export interface DetectedItem {
  id: string;
  confidence: number;
  name: string;
  status: 'unauthorized' | 'illegal' | 'authorized';
  selected?: boolean;
}

export interface EventDetectionData {
  eventType: string;
  imageUrl: string;
  primaryDetection: {
    name: string;
    confidence: number;
    location: string;
    model: string;
  };
  detectedItems: DetectedItem[];
}

export interface EventDetectionCardProps {
  data: EventDetectionData;
  onDismiss?: () => void;
  onGenerateCOA?: (selectedItems: DetectedItem[]) => void;
  onClose?: () => void;
  className?: string;
}

export const EventDetectionCard: React.FC<EventDetectionCardProps> = ({
  data,
  onDismiss,
  onGenerateCOA,
  onClose,
  className = '',
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [selectedItems, setSelectedItems] = useState<Set<string>>(
    new Set(data.detectedItems.filter(item => item.selected).map(item => item.id))
  );

  const toggleItem = (id: string) => {
    const newSelected = new Set(selectedItems);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedItems(newSelected);
  };

  const handleGenerateCOA = () => {
    const selected = data.detectedItems.filter(item => selectedItems.has(item.id));
    onGenerateCOA?.(selected);
  };

  const getStatusColor = (status: DetectedItem['status']) => {
    switch (status) {
      case 'unauthorized':
        return 'var(--color-yellow-500)';
      case 'illegal':
        return 'var(--color-red-600)';
      case 'authorized':
        return 'var(--color-green-600)';
      default:
        return 'var(--color-gray-500)';
    }
  };

  const getStatusLabel = (status: DetectedItem['status']) => {
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
    <div className={`event-detection-card ${className}`}>
      {/* Header */}
      <div className="event-detection-card__header">
        <div className="event-detection-card__title">
          <span className="body-base-mono-book">Event card: {data.eventType}</span>
        </div>
        <div className="event-detection-card__actions">
          <button
            className="event-detection-card__menu-btn"
            aria-label="More options"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 3C10.9 3 10 3.9 10 5C10 6.1 10.9 7 12 7C13.1 7 14 6.1 14 5C14 3.9 13.1 3 12 3ZM12 17C10.9 17 10 17.9 10 19C10 20.1 10.9 21 12 21C13.1 21 14 20.1 14 19C14 17.9 13.1 17 12 17ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10Z" fill="currentColor"/>
            </svg>
          </button>
          {onClose && (
            <button
              className="event-detection-card__close-btn"
              onClick={onClose}
              aria-label="Close"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M11.9997 10.5867L16.9497 5.63672L18.3637 7.05072L13.4137 12.0007L18.3637 16.9507L16.9497 18.3647L11.9997 13.4147L7.04974 18.3647L5.63574 16.9507L10.5857 12.0007L5.63574 7.05072L7.04974 5.63672L11.9997 10.5867Z" fill="currentColor"/>
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Image Container */}
      <div className="event-detection-card__image-container">
        <img 
          src={data.imageUrl} 
          alt={data.eventType}
          className="event-detection-card__image"
        />
      </div>

      {/* Detection Details Section */}
      <div className="event-detection-card__detection">
        <button 
          className="event-detection-card__detection-header"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="event-detection-card__detection-title">
            <span className="body-base-mono-medium">Object detection: {data.primaryDetection.name}</span>
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 20 20" 
              fill="none"
              className="event-detection-card__alert-icon"
            >
              <path d="M10.7218 2.49866L18.6602 16.2487C18.7333 16.3753 18.7718 16.519 18.7718 16.6653C18.7718 16.8116 18.7333 16.9553 18.6602 17.082C18.587 17.2087 18.4818 17.3139 18.3552 17.387C18.2285 17.4601 18.0848 17.4987 17.9385 17.4987H2.06183C1.91555 17.4987 1.77185 17.4621 1.64517 17.387C1.51849 17.3139 1.41329 17.2087 1.34016 17.082C1.26702 16.9553 1.22851 16.8116 1.22852 16.6653C1.22852 16.519 1.26702 16.3753 1.34016 16.2487L9.27849 2.49866C9.35164 2.37199 9.45683 2.2668 9.58351 2.19367C9.71019 2.12053 9.85389 2.08203 10.0002 2.08203C10.1464 2.08203 10.2901 2.12053 10.4168 2.19367C10.5435 2.2668 10.6487 2.37394 10.7218 2.49866ZM9.16683 13.332V14.9987H10.8335V13.332H9.16683ZM9.16683 7.49866V11.6653H10.8335V7.49866H9.16683Z" fill="#23A45A"/>
            </svg>
          </div>
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none"
            className={`event-detection-card__expand-icon ${isExpanded ? 'expanded' : ''}`}
          >
            <path d="M11.9997 13.1727L16.9497 8.22266L18.3637 9.63666L11.9997 16.0007L5.63574 9.63666L7.04974 8.22266L11.9997 13.1727Z" fill="currentColor"/>
          </svg>
        </button>

        {isExpanded && (
          <>
            {/* Confidence Circle and Details */}
            <div className="event-detection-card__confidence">
              <div className="event-detection-card__confidence-circle">
                <svg width="46" height="46" viewBox="0 0 46 46" fill="none">
                  <circle cx="23" cy="23" r="21.5" stroke="var(--color-gray-400)" strokeWidth="3"/>
                  <path 
                    d="M23 0C17.6096 -6.42802e-08 12.3904 1.8933 8.25366 5.34935C4.11694 8.8054 1.32551 13.6046 0.366739 18.9091C-0.592032 24.2136 0.342768 29.6863 3.00793 34.3718C5.67309 39.0572 9.89928 42.6578 14.9487 44.5447C19.998 46.4317 25.5497 46.4852 30.6345 44.6959C35.7193 42.9067 40.0142 39.3883 42.7691 34.755C45.5241 30.1218 46.5643 24.6681 45.7079 19.3461C44.8516 14.0242 42.1532 9.17204 38.0838 5.63689L36.1849 7.82277C39.7419 10.9129 42.1006 15.1542 42.8492 19.8061C43.5977 24.4581 42.6885 29.2252 40.2804 33.2752C37.8722 37.3251 34.1181 40.4006 29.6734 41.9646C25.2288 43.5286 20.3759 43.4818 15.9623 41.8324C11.5486 40.183 7.85442 37.0358 5.52478 32.9401C3.19514 28.8445 2.37803 24.0608 3.21609 19.4241C4.05416 14.7874 6.49417 10.5924 10.1101 7.57143C13.7261 4.55047 18.2882 2.89552 23 2.89552V0Z" 
                    fill="var(--color-green-500)"
                  />
                  <text 
                    fill="var(--Text-Blue-text-Main-text)" 
                    style={{ whiteSpace: 'pre' }}
                    fontFamily="Macan" 
                    fontSize="16" 
                    letterSpacing="-0.02em"
                  >
                    <tspan x="7" y="30.0039">{data.primaryDetection.confidence}%</tspan>
                  </text>
                </svg>
              </div>
              <div className="event-detection-card__details">
                <div className="event-detection-card__detail-row">
                  <span className="body-small-mono-book event-detection-card__detail-label">
                    Object Confidence:
                  </span>
                  <span className="body-base-mono-book event-detection-card__detail-value">
                    {data.primaryDetection.name}
                  </span>
                </div>
                <div className="event-detection-card__detail-row">
                  <span className="body-small-mono-book event-detection-card__detail-label">
                    Location Camera:
                  </span>
                  <span className="body-base-mono-book event-detection-card__detail-value">
                    {data.primaryDetection.location}
                  </span>
                </div>
                <div className="event-detection-card__detail-row">
                  <span className="body-small-mono-book event-detection-card__detail-label">
                    Confidence Model
                  </span>
                  <span className="body-base-mono-book event-detection-card__detail-value">
                    {data.primaryDetection.model}
                  </span>
                </div>
              </div>
            </div>

            {/* Detected Items List */}
            <div className="event-detection-card__items">
              {data.detectedItems.map((item) => (
                <div 
                  key={item.id}
                  className="event-detection-card__item"
                >
                  <div className="event-detection-card__item-info">
                    <span className="body-base-macan-book">{item.confidence}%</span>
                    <span className="body-base-macan-book">{item.name}</span>
                  </div>
                  <div className="event-detection-card__item-actions">
                    <span 
                      className="body-base-mono-book event-detection-card__item-status"
                      style={{ color: getStatusColor(item.status) }}
                    >
                      {getStatusLabel(item.status)}
                    </span>
                    <label className="event-detection-card__checkbox">
                      <input
                        type="checkbox"
                        checked={selectedItems.has(item.id)}
                        onChange={() => toggleItem(item.id)}
                      />
                      <span className="event-detection-card__checkbox-box" />
                    </label>
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="event-detection-card__buttons">
              <button 
                className="event-detection-card__button event-detection-card__button--secondary"
                onClick={onDismiss}
              >
                <span className="emphasis-body-mono-sm">DISMISS</span>
              </button>
              <button 
                className="event-detection-card__button event-detection-card__button--primary"
                onClick={handleGenerateCOA}
                disabled={selectedItems.size === 0}
              >
                <span className="emphasis-body-mono-sm">GENERATE COA</span>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default EventDetectionCard;
