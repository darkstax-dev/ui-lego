import React, { useState } from 'react'
import { TabItem } from '../tabs/Tabs'
import Checkbox from '../checkbox/Checkbox'
import SliderField from '../inputs/SliderField'
import './FeedManager.css'

export interface FeedInfo {
  name: string
  value: string
  valueColor?: 'default' | 'warning' | 'danger'
}

export interface ContributingFeed {
  id: string
  label: string
  checked: boolean
}

export interface InformationSource {
  id: string
  label: string
}

export interface FeedManagerProps {
  activeTab?: string
  onTabChange?: (tab: string) => void
  distance?: number
  onDistanceChange?: (distance: number) => void
  contributingFeeds?: ContributingFeed[]
  onContributingFeedsChange?: (feeds: ContributingFeed[]) => void
  feedInfo?: FeedInfo[]
  onSeeDetails?: () => void
  informationSources?: InformationSource[]
  onRemoveSource?: (id: string) => void
  className?: string
}

const FeedManager: React.FC<FeedManagerProps> = ({
  activeTab = 'feeds',
  onTabChange,
  distance = 400,
  onDistanceChange,
  contributingFeeds = [
    { id: 'nwas', label: 'NWAS', checked: false },
    { id: 'highway', label: 'Highway Patrol', checked: false },
    { id: 'emergency', label: 'Emergency', checked: false },
    { id: 'social', label: 'Social feed', checked: false }
  ],
  onContributingFeedsChange,
  feedInfo = [
    { name: 'Danaging Winds', value: '38-49 mhp', valueColor: 'default' },
    { name: 'Hall possible', value: 'Large', valueColor: 'default' },
    { name: 'Herricane', value: 'Very Likely', valueColor: 'warning' },
    { name: 'Flooding', value: 'Confirmed', valueColor: 'danger' },
    { name: 'Location affected', value: '4', valueColor: 'default' },
    { name: 'Trail last update', value: '00:00:00 UTC', valueColor: 'default' },
    { name: 'Est Persons', value: '3,672', valueColor: 'default' },
    { name: 'State of emergency', value: 'No', valueColor: 'default' }
  ],
  onSeeDetails,
  informationSources = [
    { id: 'nwas', label: 'NWAS' },
    { id: 'neh', label: 'NEH' },
    { id: 'faa', label: 'FAA' }
  ],
  onRemoveSource,
  className = ''
}) => {
  const [internalFeeds, setInternalFeeds] = useState(contributingFeeds)
  const [internalSources, setInternalSources] = useState(informationSources)
  const [currentTab, setCurrentTab] = useState(activeTab)

  const tabs: TabItem[] = [
    { value: 'emergency', label: 'Emergency' },
    { value: 'feeds', label: 'Feeds' },
    { value: 'activity', label: 'Activity' }
  ]

  const handleTabChange = (tab: string) => {
    setCurrentTab(tab)
    onTabChange?.(tab)
  }

  const handleFeedChange = (id: string, checked: boolean) => {
    const updatedFeeds = internalFeeds.map(feed =>
      feed.id === id ? { ...feed, checked } : feed
    )
    setInternalFeeds(updatedFeeds)
    onContributingFeedsChange?.(updatedFeeds)
  }

  const handleRemoveSource = (id: string) => {
    const updatedSources = internalSources.filter(source => source.id !== id)
    setInternalSources(updatedSources)
    onRemoveSource?.(id)
  }

  const handleDistanceChange = (value: [number, number]) => {
    onDistanceChange?.(value[1])
  }

  const renderEmergencyTab = () => (
    <div className="feed-manager__content">
      <div className="feed-manager__section feed-manager__section--info">
        <h3 className="feed-manager__section-title">Emergency Information</h3>
        {feedInfo.map((info, index) => (
          <div key={index} className="feed-manager__info-row">
            <span className="feed-manager__info-label">{info.name}</span>
            <span className={`feed-manager__info-value feed-manager__info-value--${info.valueColor}`}>
              {info.value}
            </span>
          </div>
        ))}
      </div>

      <button className="feed-manager__details-button" onClick={onSeeDetails}>
        SEE DETAILS
      </button>

      <div className="feed-manager__section feed-manager__section--sources">
        <div className="feed-manager__sources-label-wrapper">
          <label className="feed-manager__sources-label">Contributing Information Sources</label>
        </div>
        <div className="feed-manager__sources-tags">
          {internalSources.map((source) => (
            <div key={source.id} className="feed-manager__source-tag">
              <div className="feed-manager__source-tag-label">{source.label}</div>
              <svg className="feed-manager__source-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_eye)">
                  <path d="M7.99978 2C11.5944 2 14.5851 4.58667 15.2124 8C14.5858 11.4133 11.5944 14 7.99978 14C4.40511 14 1.41444 11.4133 0.787109 8C1.41378 4.58667 4.40511 2 7.99978 2ZM7.99978 12.6667C9.35942 12.6664 10.6787 12.2045 11.7417 11.3568C12.8047 10.509 13.5484 9.32552 13.8511 8C13.5473 6.67554 12.8031 5.49334 11.7402 4.64668C10.6773 3.80003 9.35865 3.33902 7.99978 3.33902C6.64091 3.33902 5.32224 3.80003 4.25936 4.64668C3.19648 5.49334 2.45229 6.67554 2.14844 8C2.45117 9.32552 3.19489 10.509 4.25787 11.3568C5.32085 12.2045 6.64013 12.6664 7.99978 12.6667ZM7.99978 11C7.20413 11 6.44107 10.6839 5.87846 10.1213C5.31585 9.55871 4.99978 8.79565 4.99978 8C4.99978 7.20435 5.31585 6.44129 5.87846 5.87868C6.44107 5.31607 7.20413 5 7.99978 5C8.79543 5 9.55849 5.31607 10.1211 5.87868C10.6837 6.44129 10.9998 7.20435 10.9998 8C10.9998 8.79565 10.6837 9.55871 10.1211 10.1213C9.55849 10.6839 8.79543 11 7.99978 11ZM7.99978 9.66667C8.4418 9.66667 8.86573 9.49107 9.17829 9.17851C9.49085 8.86595 9.66644 8.44203 9.66644 8C9.66644 7.55797 9.49085 7.13405 9.17829 6.82149C8.86573 6.50893 8.4418 6.33333 7.99978 6.33333C7.55775 6.33333 7.13383 6.50893 6.82127 6.82149C6.5087 7.13405 6.33311 7.55797 6.33311 8C6.33311 8.44203 6.5087 8.86595 6.82127 9.17851C7.13383 9.49107 7.55775 9.66667 7.99978 9.66667Z" fill="#00112B"/>
                </g>
                <defs>
                  <clipPath id="clip0_eye">
                    <rect width="16" height="16" fill="white"/>
                  </clipPath>
                </defs>
              </svg>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderFeedsTab = () => (
    <div className="feed-manager__content">
      <div className="feed-manager__location-section">
        <div className="feed-manager__location-control">
          <div className="feed-manager__map-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <g clipPath="url(#clip0_map_pin)">
                <path d="M12 23.7279L5.636 17.3639C4.37734 16.1052 3.52019 14.5016 3.17293 12.7558C2.82567 11.0099 3.00391 9.20035 3.6851 7.55582C4.36629 5.91129 5.51984 4.50569 6.99988 3.51677C8.47992 2.52784 10.22 2 12 2C13.78 2 15.5201 2.52784 17.0001 3.51677C18.4802 4.50569 19.6337 5.91129 20.3149 7.55582C20.9961 9.20035 21.1743 11.0099 20.8271 12.7558C20.4798 14.5016 19.6227 16.1052 18.364 17.3639L12 23.7279ZM16.95 15.9499C17.9289 14.9709 18.5955 13.7236 18.8656 12.3658C19.1356 11.0079 18.9969 9.60052 18.4671 8.32148C17.9373 7.04244 17.04 5.94923 15.8889 5.18009C14.7378 4.41095 13.3844 4.00043 12 4.00043C10.6156 4.00043 9.26222 4.41095 8.11109 5.18009C6.95996 5.94923 6.06275 7.04244 5.53292 8.32148C5.00308 9.60052 4.86442 11.0079 5.13445 12.3658C5.40449 13.7236 6.07111 14.9709 7.05 15.9499L12 20.8999L16.95 15.9499ZM12 12.9999C11.4696 12.9999 10.9609 12.7892 10.5858 12.4141C10.2107 12.0391 10 11.5304 10 10.9999C10 10.4695 10.2107 9.96078 10.5858 9.58571C10.9609 9.21064 11.4696 8.99992 12 8.99992C12.5304 8.99992 13.0391 9.21064 13.4142 9.58571C13.7893 9.96078 14 10.4695 14 10.9999C14 11.5304 13.7893 12.0391 13.4142 12.4141C13.0391 12.7892 12.5304 12.9999 12 12.9999Z" fill="#03053D"/>
              </g>
              <defs>
                <clipPath id="clip0_map_pin">
                  <rect width="24" height="24" fill="white"/>
                </clipPath>
              </defs>
            </svg>
          </div>
          <div style={{ flex: 1 }}>
            <SliderField
              value={[0, distance]}
              onChange={handleDistanceChange}
              min={0}
              max={500}
              step={10}
              suffix=" mi"
              prefix=""
            />
          </div>
        </div>
      </div>

      <div className="feed-manager__section feed-manager__section--feeds">
        <h3 className="feed-manager__section-title">Contributing feeds</h3>
        <div className="feed-manager__checkbox-grid">
          <div className="feed-manager__checkbox-row">
            {internalFeeds.slice(0, 2).map((feed) => (
              <div key={feed.id} className="feed-manager__checkbox-item">
                <div className="feed-manager__checkbox-wrapper">
                  <Checkbox
                    checked={feed.checked}
                    onChange={(checked) => handleFeedChange(feed.id, checked)}
                  />
                </div>
                <div className="feed-manager__checkbox-label">{feed.label}</div>
              </div>
            ))}
          </div>
          <div className="feed-manager__checkbox-row">
            {internalFeeds.slice(2, 4).map((feed) => (
              <div key={feed.id} className="feed-manager__checkbox-item">
                <div className="feed-manager__checkbox-wrapper">
                  <Checkbox
                    checked={feed.checked}
                    onChange={(checked) => handleFeedChange(feed.id, checked)}
                  />
                </div>
                <div className="feed-manager__checkbox-label">{feed.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  const renderActivityTab = () => (
    <div className="feed-manager__content">
      <div className="feed-manager__section">
        <h3 className="feed-manager__section-title">Recent Activity</h3>
        <div style={{ padding: '16px', color: '#78797A', fontSize: '14px' }}>
          <p style={{ margin: '0 0 12px 0' }}>No recent activity to display</p>
          <div className="feed-manager__checkbox-grid">
            <div className="feed-manager__checkbox-row">
              <div className="feed-manager__checkbox-item">
                <div className="feed-manager__checkbox-wrapper">
                  <Checkbox
                    checked={false}
                    onChange={() => {}}
                  />
                </div>
                <div className="feed-manager__checkbox-label">Show notifications</div>
              </div>
              <div className="feed-manager__checkbox-item">
                <div className="feed-manager__checkbox-wrapper">
                  <Checkbox
                    checked={true}
                    onChange={() => {}}
                  />
                </div>
                <div className="feed-manager__checkbox-label">Auto-update</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className={`feed-manager ${className}`}>
      <div className="feed-manager__tabs">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            className={`feed-manager__tab ${currentTab === tab.value ? 'feed-manager__tab--active' : ''}`}
            onClick={() => handleTabChange(tab.value)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {currentTab === 'emergency' && renderEmergencyTab()}
      {currentTab === 'feeds' && renderFeedsTab()}
      {currentTab === 'activity' && renderActivityTab()}
    </div>
  )
}

export default FeedManager
