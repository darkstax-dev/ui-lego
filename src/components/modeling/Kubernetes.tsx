import React from 'react'
import './Kubernetes.css'

interface KubernetesProps {
  state?: 'default' | 'hover'
  showText?: boolean
  text?: string
  onClick?: () => void
}

const Kubernetes: React.FC<KubernetesProps> = ({
  state = 'default',
  showText = true,
  text = 'text',
  onClick
}) => {
  const HexagonShape = ({ opacity = 0.4 }: { opacity?: number }) => (
    <svg 
      width="50" 
      height="56" 
      viewBox="0 0 50 56" 
      fill="none"
      className="kubernetes__hexagon"
    >
      <path 
        d="M24.4449 0.145144C24.7884 -0.0483814 25.2116 -0.0483813 25.5551 0.145144L49.4449 13.6035C49.7884 13.797 50 14.1546 50 14.5417V41.4583C50 41.8454 49.7884 42.203 49.4449 42.3965L25.5551 55.8549C25.2116 56.0484 24.7884 56.0484 24.4449 55.8549L0.555144 42.3965C0.21162 42.203 0 41.8454 0 41.4583V14.5417C0 14.1546 0.21162 13.797 0.555144 13.6035L24.4449 0.145144Z" 
        fill="white" 
        fillOpacity={opacity}
      />
    </svg>
  )

  const CircleIcon = () => (
    <svg 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none"
      className="kubernetes__icon"
    >
      <g clipPath="url(#clip0_circle)">
        <path 
          d="M12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2C17.523 2 22 6.477 22 12C22 17.523 17.523 22 12 22ZM12 20C14.1217 20 16.1566 19.1571 17.6569 17.6569C19.1571 16.1566 20 14.1217 20 12C20 9.87827 19.1571 7.84344 17.6569 6.34315C16.1566 4.84285 14.1217 4 12 4C9.87827 4 7.84344 4.84285 6.34315 6.34315C4.84285 7.84344 4 9.87827 4 12C4 14.1217 4.84285 16.1566 6.34315 17.6569C7.84344 19.1571 9.87827 20 12 20Z" 
          fill="#072B56"
        />
      </g>
      <defs>
        <clipPath id="clip0_circle">
          <rect width="24" height="24" fill="white"/>
        </clipPath>
      </defs>
    </svg>
  )

  const MoreIcon = () => (
    <svg 
      width="16" 
      height="16" 
      viewBox="0 0 16 16" 
      fill="none"
      className="kubernetes__more-icon"
    >
      <g clipPath="url(#clip0_more_k8s)">
        <path 
          d="M7.99996 2C7.26663 2 6.66663 2.6 6.66663 3.33333C6.66663 4.06667 7.26663 4.66667 7.99996 4.66667C8.73329 4.66667 9.33329 4.06667 9.33329 3.33333C9.33329 2.6 8.73329 2 7.99996 2ZM7.99996 11.3333C7.26663 11.3333 6.66663 11.9333 6.66663 12.6667C6.66663 13.4 7.26663 14 7.99996 14C8.73329 14 9.33329 13.4 9.33329 12.6667C9.33329 11.9333 8.73329 11.3333 7.99996 11.3333ZM7.99996 6.66667C7.26663 6.66667 6.66663 7.26667 6.66663 8C6.66663 8.73333 7.26663 9.33333 7.99996 9.33333C8.73329 9.33333 9.33329 8.73333 9.33329 8C9.33329 7.26667 8.73329 6.66667 7.99996 6.66667Z" 
          fill="#78797A"
        />
      </g>
      <defs>
        <clipPath id="clip0_more_k8s">
          <rect width="16" height="16" fill="white"/>
        </clipPath>
      </defs>
    </svg>
  )

  return (
    <div 
      className={`kubernetes kubernetes--${state}`}
      onClick={onClick}
    >
      <div className="kubernetes__content">
        <div className="kubernetes__hexagon-container">
          <HexagonShape opacity={state === 'hover' ? 0.6 : 0.4} />
          <div className="kubernetes__icon-container">
            <CircleIcon />
          </div>
        </div>
        {state === 'hover' && <MoreIcon />}
        {showText && (
          <div className="kubernetes__text">{text}</div>
        )}
      </div>
    </div>
  )
}

export default Kubernetes
