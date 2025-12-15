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
          <path d="M2.66702 1.68945L1.69141 2.66506L2.66702 3.64067L3.64263 2.66506L2.66702 1.68945Z" transform="translate(13, 0)" fill="#D9322A"/>
          <path d="M2.66656 0.226562L0.227539 2.66559L2.66656 5.10461L5.10559 2.66559L2.66656 0.226562Z" transform="translate(18, 0)" fill="#D9322A"/>
          <path d="M2.66702 1.68945L1.69141 2.66506L2.66702 3.64067L3.64263 2.66506L2.66702 1.68945Z" transform="translate(22, 0)" fill="#D9322A"/>
          <path d="M2.66754 0.226562L0.228516 2.66559L2.66754 5.10461L5.10656 2.66559L2.66754 0.226562Z" transform="translate(4, 4)" fill="#D9322A"/>
          <path d="M2.66754 0.226562L0.228516 2.66559L2.66754 5.10461L5.10656 2.66559L2.66754 0.226562Z" transform="translate(9, 4)" fill="#D9322A"/>
          <path d="M2.66656 0.226562L0.227539 2.66559L2.66656 5.10461L5.10559 2.66559L2.66656 0.226562Z" transform="translate(13, 4)" fill="#D9322A"/>
          <path d="M2.66656 0.226562L0.227539 2.66559L2.66656 5.10461L5.10559 2.66559L2.66656 0.226562Z" transform="translate(22, 4)" fill="#D9322A"/>
          <path d="M2.66754 0.226562L0.228516 2.66559L2.66754 5.10461L5.10656 2.66559L2.66754 0.226562Z" transform="translate(26, 4)" fill="#D9322A"/>
          <path d="M2.66754 0.226562L0.228516 2.66559L2.66754 5.10461L5.10656 2.66559L2.66754 0.226562Z" transform="translate(31, 4)" fill="#D9322A"/>
          <path d="M2.66754 0.226562L0.228516 2.66559L2.66754 5.10461L5.10656 2.66559L2.66754 0.226562Z" transform="translate(4, 9)" fill="#D9322A"/>
          <path d="M2.66754 0.226562L0.228516 2.66559L2.66754 5.10461L5.10656 2.66559L2.66754 0.226562Z" transform="translate(31, 9)" fill="#D9322A"/>
          <path d="M2.66702 1.68945L1.69141 2.66506L2.66702 3.64067L3.64263 2.66506L2.66702 1.68945Z" transform="translate(0, 13)" fill="#D9322A"/>
          <path d="M2.66754 0.226562L0.228516 2.66559L2.66754 5.10461L5.10656 2.66559L2.66754 0.226562Z" transform="translate(4, 13)" fill="#D9322A"/>
          <path d="M2.66656 0.226562L0.227539 2.66559L2.66656 5.10461L5.10559 2.66559L2.66656 0.226562Z" transform="translate(13, 13)" fill="#D9322A"/>
          <path d="M2.66656 0.226562L0.227539 2.66559L2.66656 5.10461L5.10559 2.66559L2.66656 0.226562Z" transform="translate(18, 13)" fill="#D9322A"/>
          <path d="M2.66656 0.226562L0.227539 2.66559L2.66656 5.10461L5.10559 2.66559L2.66656 0.226562Z" transform="translate(22, 13)" fill="#D9322A"/>
          <path d="M2.66754 0.226562L0.228516 2.66559L2.66754 5.10461L5.10656 2.66559L2.66754 0.226562Z" transform="translate(31, 13)" fill="#D9322A"/>
          <path d="M2.66702 1.68945L1.69141 2.66506L2.66702 3.64067L3.64263 2.66506L2.66702 1.68945Z" transform="translate(35, 13)" fill="#D9322A"/>
          <path d="M2.66656 0.228516L0.227539 2.66754L2.66656 5.10656L5.10559 2.66754L2.66656 0.228516Z" transform="translate(0, 18)" fill="#D9322A"/>
          <path d="M2.66656 0.228516L0.227539 2.66754L2.66656 5.10656L5.10559 2.66754L2.66656 0.228516Z" transform="translate(13, 18)" fill="#D9322A"/>
          <path d="M2.66656 0.228516L0.227539 2.66754L2.66656 5.10656L5.10559 2.66754L2.66656 0.228516Z" transform="translate(22, 18)" fill="#D9322A"/>
          <path d="M2.66656 0.228516L0.227539 2.66754L2.66656 5.10656L5.10559 2.66754L2.66656 0.228516Z" transform="translate(35, 18)" fill="#D9322A"/>
          <path d="M2.66702 1.69141L1.69141 2.66702L2.66702 3.64263L3.64263 2.66702L2.66702 1.69141Z" transform="translate(0, 22)" fill="#D9322A"/>
          <path d="M2.66754 0.228516L0.228516 2.66754L2.66754 5.10656L5.10656 2.66754L2.66754 0.228516Z" transform="translate(4, 22)" fill="#D9322A"/>
          <path d="M2.66656 0.228516L0.227539 2.66754L2.66656 5.10656L5.10559 2.66754L2.66656 0.228516Z" transform="translate(13, 22)" fill="#D9322A"/>
          <path d="M2.66656 0.228516L0.227539 2.66754L2.66656 5.10656L5.10559 2.66754L2.66656 0.228516Z" transform="translate(18, 22)" fill="#D9322A"/>
          <path d="M2.66656 0.228516L0.227539 2.66754L2.66656 5.10656L5.10559 2.66754L2.66656 0.228516Z" transform="translate(22, 22)" fill="#D9322A"/>
          <path d="M2.66754 0.228516L0.228516 2.66754L2.66754 5.10656L5.10656 2.66754L2.66754 0.228516Z" transform="translate(31, 22)" fill="#D9322A"/>
          <path d="M2.66702 1.69141L1.69141 2.66702L2.66702 3.64263L3.64263 2.66702L2.66702 1.69141Z" transform="translate(35, 22)" fill="#D9322A"/>
          <path d="M2.66754 0.228516L0.228516 2.66754L2.66754 5.10656L5.10656 2.66754L2.66754 0.228516Z" transform="translate(4, 26)" fill="#D9322A"/>
          <path d="M2.66754 0.228516L0.228516 2.66754L2.66754 5.10656L5.10656 2.66754L2.66754 0.228516Z" transform="translate(31, 26)" fill="#D9322A"/>
          <path d="M2.66754 0.228516L0.228516 2.66754L2.66754 5.10656L5.10656 2.66754L2.66754 0.228516Z" transform="translate(4, 31)" fill="#D9322A"/>
          <path d="M2.66754 0.228516L0.228516 2.66754L2.66754 5.10656L5.10656 2.66754L2.66754 0.228516Z" transform="translate(9, 31)" fill="#D9322A"/>
          <path d="M2.66656 0.228516L0.227539 2.66754L2.66656 5.10656L5.10559 2.66754L2.66656 0.228516Z" transform="translate(13, 31)" fill="#D9322A"/>
          <path d="M2.66656 0.228516L0.227539 2.66754L2.66656 5.10656L5.10559 2.66754L2.66656 0.228516Z" transform="translate(22, 31)" fill="#D9322A"/>
          <path d="M2.66754 0.228516L0.228516 2.66754L2.66754 5.10656L5.10656 2.66754L2.66754 0.228516Z" transform="translate(26, 31)" fill="#D9322A"/>
          <path d="M2.66754 0.228516L0.228516 2.66754L2.66754 5.10656L5.10656 2.66754L2.66754 0.228516Z" transform="translate(31, 31)" fill="#D9322A"/>
          <path d="M2.66702 1.69141L1.69141 2.66702L2.66702 3.64263L3.64263 2.66702L2.66702 1.69141Z" transform="translate(13, 35)" fill="#D9322A"/>
          <path d="M2.66656 0.228516L0.227539 2.66754L2.66656 5.10656L5.10559 2.66754L2.66656 0.228516Z" transform="translate(18, 35)" fill="#D9322A"/>
          <path d="M2.66702 1.69141L1.69141 2.66702L2.66702 3.64263L3.64263 2.66702L2.66702 1.69141Z" transform="translate(22, 35)" fill="#D9322A"/>
        </svg>
      </div>
      <div className="alert-snackbar__content">
        <div className="alert-snackbar__info-row">
          <span className="alert-snackbar__label">Location: </span>
          <span className="alert-snackbar__value">{location}</span>
        </div>
        <div className="alert-snackbar__info-row">
          <span className="alert-snackbar__label">Potential Impact: </span>
          <span className="alert-snackbar__value">{potentialImpact}</span>
        </div>
        <div className="alert-snackbar__info-row">
          <span className="alert-snackbar__label">Threat Level: </span>
          <span className="alert-snackbar__value">{threatLevel}</span>
        </div>
        <div className="alert-snackbar__info-row">
          <span className="alert-snackbar__label">Bad Actor Source: </span>
          <span className="alert-snackbar__value">{badActorSource}</span>
        </div>
      </div>
    </div>
  )
}
