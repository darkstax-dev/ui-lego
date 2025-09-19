import React from 'react'
import './ModelingCard.css'
import Kubernetes from './Kubernetes'
import Indicator from './Indicator'

interface ModelingCardProps {
  state?: 'default' | 'hover' | 'active'
  title?: string
  showIndicator?: boolean
  indicatorValue?: string | number
  indicatorVariant?: 'green' | 'blue' | 'variant3'
  onClick?: () => void
}

const ModelingCard: React.FC<ModelingCardProps> = ({
  state = 'default',
  title = 'Top view',
  showIndicator = true,
  indicatorValue = '2',
  indicatorVariant = 'green',
  onClick
}) => {
  const BuildingIcon = () => (
    <svg 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none"
      className="modeling-card__building-icon"
    >
      <g clipPath="url(#clip0_building)">
        <path 
          d="M21 20H23V22H1V20H3V3C3 2.73478 3.10536 2.48043 3.29289 2.29289C3.48043 2.10536 3.73478 2 4 2H20C20.2652 2 20.5196 2.10536 20.7071 2.29289C20.8946 2.48043 21 2.73478 21 3V20ZM8 11V13H11V11H8ZM8 7V9H11V7H8ZM8 15V17H11V15H8ZM13 15V17H16V15H13ZM13 11V13H16V11H13ZM13 7V9H16V7H13Z" 
          fill="#072B56"
        />
      </g>
      <defs>
        <clipPath id="clip0_building">
          <rect width="24" height="24" fill="white"/>
        </clipPath>
      </defs>
    </svg>
  )

  const HexagonBackground = ({ opacity = 0.6 }: { opacity?: number }) => (
    <svg 
      width="50" 
      height="56" 
      viewBox="0 0 50 56" 
      fill="none"
      className="modeling-card__hexagon"
    >
      <path 
        d="M24.4449 0.145144C24.7884 -0.0483814 25.2116 -0.0483813 25.5551 0.145144L49.4449 13.6035C49.7884 13.797 50 14.1546 50 14.5417V41.4583C50 41.8454 49.7884 42.203 49.4449 42.3965L25.5551 55.8549C25.2116 56.0484 24.7884 56.0484 24.4449 55.8549L0.555144 42.3965C0.21162 42.203 0 41.8454 0 41.4583V14.5417C0 14.1546 0.21162 13.797 0.555144 13.6035L24.4449 0.145144Z" 
        fill="white" 
        fillOpacity={opacity}
      />
    </svg>
  )

  return (
    <div 
      className={`modeling-card modeling-card--${state}`}
      onClick={onClick}
    >
      <div className="modeling-card__content">
        <div className="modeling-card__icon-section">
          <div className="modeling-card__icon-container">
            <div className="modeling-card__hexagon-container">
              <HexagonBackground />
              <div className="modeling-card__icon-wrapper">
                <BuildingIcon />
              </div>
            </div>
            {showIndicator && (
              <div className="modeling-card__indicator">
                <Indicator 
                  variant={indicatorVariant} 
                  value={indicatorValue} 
                />
              </div>
            )}
          </div>
        </div>
        
        <div className="modeling-card__title-section">
          <div className="modeling-card__title">
            {title}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModelingCard
