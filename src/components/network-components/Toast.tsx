import React from 'react'
import './Toast.css'

export interface ToastProps {
  location?: string
  potentialImpact?: string
  threatLevel?: string
  badActorSource?: string
  onClose?: () => void
  className?: string
}

const AlertIcon = () => (
  <div className="toast__icon">
    <svg width="5" height="5" viewBox="0 0 5 5" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2.66702 1.68945L1.69141 2.66506L2.66702 3.64067L3.64263 2.66506L2.66702 1.68945Z" fill="#D9322A"/>
    </svg>
    <svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2.66656 0.226562L0.227539 2.66559L2.66656 5.10461L5.10559 2.66559L2.66656 0.226562Z" fill="#D9322A"/>
    </svg>
    <svg width="5" height="5" viewBox="0 0 5 5" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2.66702 1.68945L1.69141 2.66506L2.66702 3.64067L3.64263 2.66506L2.66702 1.68945Z" fill="#D9322A"/>
    </svg>
    <svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2.66656 0.226562L0.227539 2.66559L2.66656 5.10461L5.10559 2.66559L2.66656 0.226562Z" fill="#D9322A"/>
    </svg>
    <svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2.66656 0.226562L0.227539 2.66559L2.66656 5.10461L5.10559 2.66559L2.66656 0.226562Z" fill="#D9322A"/>
    </svg>
    <svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2.66656 0.226562L0.227539 2.66559L2.66656 5.10461L5.10559 2.66559L2.66656 0.226562Z" fill="#D9322A"/>
    </svg>
    <svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2.66656 0.226562L0.227539 2.66559L2.66656 5.10461L5.10559 2.66559L2.66656 0.226562Z" fill="#D9322A"/>
    </svg>
    <svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2.66656 0.226562L0.227539 2.66559L2.66656 5.10461L5.10559 2.66559L2.66656 0.226562Z" fill="#D9322A"/>
    </svg>
    <svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2.66656 0.226562L0.227539 2.66559L2.66656 5.10461L5.10559 2.66559L2.66656 0.226562Z" fill="#D9322A"/>
    </svg>
    <svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2.66656 0.226562L0.227539 2.66559L2.66656 5.10461L5.10559 2.66559L2.66656 0.226562Z" fill="#D9322A"/>
    </svg>
    <svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2.66656 0.226562L0.227539 2.66559L2.66656 5.10461L5.10559 2.66559L2.66656 0.226562Z" fill="#D9322A"/>
    </svg>
    <svg width="5" height="5" viewBox="0 0 5 5" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2.66702 1.68945L1.69141 2.66506L2.66702 3.64067L3.64263 2.66506L2.66702 1.68945Z" fill="#D9322A"/>
    </svg>
    <svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2.66656 0.226562L0.227539 2.66559L2.66656 5.10461L5.10559 2.66559L2.66656 0.226562Z" fill="#D9322A"/>
    </svg>
    <svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2.66656 0.226562L0.227539 2.66559L2.66656 5.10461L5.10559 2.66559L2.66656 0.226562Z" fill="#D9322A"/>
    </svg>
    <svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2.66656 0.226562L0.227539 2.66559L2.66656 5.10461L5.10559 2.66559L2.66656 0.226562Z" fill="#D9322A"/>
    </svg>
    <svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2.66656 0.226562L0.227539 2.66559L2.66656 5.10461L5.10559 2.66559L2.66656 0.226562Z" fill="#D9322A"/>
    </svg>
    <svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2.66656 0.228516L0.227539 2.66754L2.66656 5.10656L5.10559 2.66754L2.66656 0.228516Z" fill="#D9322A"/>
    </svg>
    <svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2.66656 0.228516L0.227539 2.66754L2.66656 5.10656L5.10559 2.66754L2.66656 0.228516Z" fill="#D9322A"/>
    </svg>
    <svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2.66656 0.228516L0.227539 2.66754L2.66656 5.10656L5.10559 2.66754L2.66656 0.228516Z" fill="#D9322A"/>
    </svg>
    <svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2.66656 0.228516L0.227539 2.66754L2.66656 5.10656L5.10559 2.66754L2.66656 0.228516Z" fill="#D9322A"/>
    </svg>
    <svg width="5" height="5" viewBox="0 0 5 5" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2.66702 1.69141L1.69141 2.66702L2.66702 3.64263L3.64263 2.66702L2.66702 1.69141Z" fill="#D9322A"/>
    </svg>
    <svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2.66656 0.228516L0.227539 2.66754L2.66656 5.10656L5.10559 2.66754L2.66656 0.228516Z" fill="#D9322A"/>
    </svg>
    <svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2.66656 0.228516L0.227539 2.66754L2.66656 5.10656L5.10559 2.66754L2.66656 0.228516Z" fill="#D9322A"/>
    </svg>
    <svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2.66656 0.228516L0.227539 2.66754L2.66656 5.10656L5.10559 2.66754L2.66656 0.228516Z" fill="#D9322A"/>
    </svg>
    <svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2.66656 0.228516L0.227539 2.66754L2.66656 5.10656L5.10559 2.66754L2.66656 0.228516Z" fill="#D9322A"/>
    </svg>
    <svg width="5" height="5" viewBox="0 0 5 5" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2.66702 1.69141L1.69141 2.66702L2.66702 3.64263L3.64263 2.66702L2.66702 1.69141Z" fill="#D9322A"/>
    </svg>
    <svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2.66656 0.228516L0.227539 2.66754L2.66656 5.10656L5.10559 2.66754L2.66656 0.228516Z" fill="#D9322A"/>
    </svg>
    <svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2.66656 0.228516L0.227539 2.66754L2.66656 5.10656L5.10559 2.66754L2.66656 0.228516Z" fill="#D9322A"/>
    </svg>
    <svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2.66656 0.228516L0.227539 2.66754L2.66656 5.10656L5.10559 2.66754L2.66656 0.228516Z" fill="#D9322A"/>
    </svg>
    <svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2.66656 0.228516L0.227539 2.66754L2.66656 5.10656L5.10559 2.66754L2.66656 0.228516Z" fill="#D9322A"/>
    </svg>
    <svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2.66656 0.228516L0.227539 2.66754L2.66656 5.10656L5.10559 2.66754L2.66656 0.228516Z" fill="#D9322A"/>
    </svg>
    <svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2.66656 0.228516L0.227539 2.66754L2.66656 5.10656L5.10559 2.66754L2.66656 0.228516Z" fill="#D9322A"/>
    </svg>
    <svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2.66656 0.228516L0.227539 2.66754L2.66656 5.10656L5.10559 2.66754L2.66656 0.228516Z" fill="#D9322A"/>
    </svg>
  </div>
)

export const Toast: React.FC<ToastProps> = ({
  location = 'Denver',
  potentialImpact = 'PIP, Financial records',
  threatLevel = 'High',
  badActorSource = '128.39.202.55',
  onClose,
  className = ''
}) => {
  return (
    <div className={`toast ${className}`}>
      <div className="toast__content-wrapper">
        <AlertIcon />
        <div className="toast__content">
          <div className="toast__text">
            <span className="toast__label">Location: </span>
            <span className="toast__value">{location}</span>
          </div>
          <div className="toast__text">
            <span className="toast__label">Potential Impact: </span>
            <span className="toast__value">{potentialImpact}</span>
          </div>
          <div className="toast__text">
            <span className="toast__label">Threat Level: </span>
            <span className="toast__value">{threatLevel}</span>
          </div>
          <div className="toast__text">
            <span className="toast__label">Bad Actor Source: </span>
            <span className="toast__value">{badActorSource}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Toast
