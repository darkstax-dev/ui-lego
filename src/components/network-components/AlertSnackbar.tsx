import React from 'react'
import './AlertSnackbar.css'

export interface AlertSnackbarProps {
  location: string
  potentialImpact: string
  threatLevel: 'High' | 'Medium' | 'Low'
  badActorSource: string
  className?: string
}

export const AlertSnackbar: React.FC<AlertSnackbarProps> = ({
  location,
  potentialImpact,
  threatLevel,
  badActorSource,
  className = ''
}) => {
  return (
    <div className={`alert-snackbar ${className}`}>
      <div className="alert-snackbar__icon">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2.66702 1.68945L1.69141 2.66506L2.66702 3.64067L3.64263 2.66506L2.66702 1.68945Z" fill="#D9322A"/>
          <path d="M2.66656 0.226562L0.227539 2.66559L2.66656 5.10461L5.10559 2.66559L2.66656 0.226562Z" fill="#D9322A"/>
          <path d="M2.66702 1.68945L1.69141 2.66506L2.66702 3.64067L3.64263 2.66506L2.66702 1.68945Z" fill="#D9322A"/>
          <path d="M2.66754 0.226562L0.228516 2.66559L2.66754 5.10461L5.10656 2.66559L2.66754 0.226562Z" fill="#D9322A"/>
          <path d="M2.66754 0.226562L0.228516 2.66559L2.66754 5.10461L5.10656 2.66559L2.66754 0.226562Z" fill="#D9322A"/>
          <path d="M2.66656 0.226562L0.227539 2.66559L2.66656 5.10461L5.10559 2.66559L2.66656 0.226562Z" fill="#D9322A"/>
          <path d="M2.66656 0.226562L0.227539 2.66559L2.66656 5.10461L5.10559 2.66559L2.66656 0.226562Z" fill="#D9322A"/>
          <path d="M2.66754 0.226562L0.228516 2.66559L2.66754 5.10461L5.10656 2.66559L2.66754 0.226562Z" fill="#D9322A"/>
          <path d="M2.66754 0.226562L0.228516 2.66559L2.66754 5.10461L5.10656 2.66559L2.66754 0.226562Z" fill="#D9322A"/>
          <path d="M2.66754 0.226562L0.228516 2.66559L2.66754 5.10461L5.10656 2.66559L2.66754 0.226562Z" fill="#D9322A"/>
          <path d="M2.66754 0.226562L0.228516 2.66559L2.66754 5.10461L5.10656 2.66559L2.66754 0.226562Z" fill="#D9322A"/>
          <path d="M2.66702 1.68945L1.69141 2.66506L2.66702 3.64067L3.64263 2.66506L2.66702 1.68945Z" fill="#D9322A"/>
          <path d="M2.66754 0.226562L0.228516 2.66559L2.66754 5.10461L5.10656 2.66559L2.66754 0.226562Z" fill="#D9322A"/>
          <path d="M2.66656 0.226562L0.227539 2.66559L2.66656 5.10461L5.10559 2.66559L2.66656 0.226562Z" fill="#D9322A"/>
          <path d="M2.66656 0.226562L0.227539 2.66559L2.66656 5.10461L5.10559 2.66559L2.66656 0.226562Z" fill="#D9322A"/>
          <path d="M2.66656 0.226562L0.227539 2.66559L2.66656 5.10461L5.10559 2.66559L2.66656 0.226562Z" fill="#D9322A"/>
          <path d="M2.66754 0.226562L0.228516 2.66559L2.66754 5.10461L5.10656 2.66559L2.66754 0.226562Z" fill="#D9322A"/>
          <path d="M2.66702 1.68945L1.69141 2.66506L2.66702 3.64067L3.64263 2.66506L2.66702 1.68945Z" fill="#D9322A"/>
          <path d="M2.66656 0.228516L0.227539 2.66754L2.66656 5.10656L5.10559 2.66754L2.66656 0.228516Z" fill="#D9322A"/>
          <path d="M2.66656 0.228516L0.227539 2.66754L2.66656 5.10656L5.10559 2.66754L2.66656 0.228516Z" fill="#D9322A"/>
          <path d="M2.66656 0.228516L0.227539 2.66754L2.66656 5.10656L5.10559 2.66754L2.66656 0.228516Z" fill="#D9322A"/>
          <path d="M2.66656 0.228516L0.227539 2.66754L2.66656 5.10656L5.10559 2.66754L2.66656 0.228516Z" fill="#D9322A"/>
          <path d="M2.66702 1.69141L1.69141 2.66702L2.66702 3.64263L3.64263 2.66702L2.66702 1.69141Z" fill="#D9322A"/>
          <path d="M2.66754 0.228516L0.228516 2.66754L2.66754 5.10656L5.10656 2.66754L2.66754 0.228516Z" fill="#D9322A"/>
          <path d="M2.66656 0.228516L0.227539 2.66754L2.66656 5.10656L5.10559 2.66754L2.66656 0.228516Z" fill="#D9322A"/>
          <path d="M2.66656 0.228516L0.227539 2.66754L2.66656 5.10656L5.10559 2.66754L2.66656 0.228516Z" fill="#D9322A"/>
          <path d="M2.66656 0.228516L0.227539 2.66754L2.66656 5.10656L5.10559 2.66754L2.66656 0.228516Z" fill="#D9322A"/>
          <path d="M2.66754 0.228516L0.228516 2.66754L2.66754 5.10656L5.10656 2.66754L2.66754 0.228516Z" fill="#D9322A"/>
          <path d="M2.66702 1.69141L1.69141 2.66702L2.66702 3.64263L3.64263 2.66702L2.66702 1.69141Z" fill="#D9322A"/>
          <path d="M2.66754 0.228516L0.228516 2.66754L2.66754 5.10656L5.10656 2.66754L2.66754 0.228516Z" fill="#D9322A"/>
          <path d="M2.66754 0.228516L0.228516 2.66754L2.66754 5.10656L5.10656 2.66754L2.66754 0.228516Z" fill="#D9322A"/>
          <path d="M2.66754 0.228516L0.228516 2.66754L2.66754 5.10656L5.10656 2.66754L2.66754 0.228516Z" fill="#D9322A"/>
          <path d="M2.66754 0.228516L0.228516 2.66754L2.66754 5.10656L5.10656 2.66754L2.66754 0.228516Z" fill="#D9322A"/>
          <path d="M2.66656 0.228516L0.227539 2.66754L2.66656 5.10656L5.10559 2.66754L2.66656 0.228516Z" fill="#D9322A"/>
          <path d="M2.66754 0.228516L0.228516 2.66754L2.66754 5.10656L5.10656 2.66754L2.66754 0.228516Z" fill="#D9322A"/>
          <path d="M2.66754 0.228516L0.228516 2.66754L2.66754 5.10656L5.10656 2.66754L2.66754 0.228516Z" fill="#D9322A"/>
          <path d="M2.66702 1.69141L1.69141 2.66702L2.66702 3.64263L3.64263 2.66702L2.66702 1.69141Z" fill="#D9322A"/>
          <path d="M2.66656 0.228516L0.227539 2.66754L2.66656 5.10656L5.10559 2.66754L2.66656 0.228516Z" fill="#D9322A"/>
          <path d="M2.66702 1.69141L1.69141 2.66702L2.66702 3.64263L3.64263 2.66702L2.66702 1.69141Z" fill="#D9322A"/>
        </svg>
      </div>
      <div className="alert-snackbar__content">
        <div className="alert-snackbar__row">
          <span className="alert-snackbar__label">Location: </span>
          <span className="alert-snackbar__value">{location}</span>
        </div>
        <div className="alert-snackbar__row">
          <span className="alert-snackbar__label">Potential Impact: </span>
          <span className="alert-snackbar__value">{potentialImpact}</span>
        </div>
        <div className="alert-snackbar__row">
          <span className="alert-snackbar__label">Threat Level: </span>
          <span className="alert-snackbar__value">{threatLevel}</span>
        </div>
        <div className="alert-snackbar__row">
          <span className="alert-snackbar__label">Bad Actor Source: </span>
          <span className="alert-snackbar__value">{badActorSource}</span>
        </div>
      </div>
    </div>
  )
}
