import React from 'react'
import './Indicator.css'

interface IndicatorProps {
  variant?: 'green' | 'blue' | 'variant3'
  value?: string | number
}

const Indicator: React.FC<IndicatorProps> = ({
  variant = 'green',
  value = '2'
}) => {
  return (
    <div className={`indicator indicator--${variant}`}>
      <div className="indicator__content">
        {value}
      </div>
    </div>
  )
}

export default Indicator
