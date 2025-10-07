import React, { useState } from 'react'
import BackButton from './BackButton'
import './BackButtonDemo.css'

const BackButtonDemo: React.FC = () => {
  const [clickCount, setClickCount] = useState(0)
  const [isDisabled, setIsDisabled] = useState(false)
  const [currentLabel, setCurrentLabel] = useState('Back to Scenarios')

  const handleBackClick = () => {
    setClickCount(prev => prev + 1)
    console.log('Back button clicked!')
  }

  const labels = [
    'Back',
    'Back to Scenarios', 
    'Back to Dashboard',
    'Back to List',
    'Back to Previous Page',
    'Return to Main Menu'
  ]

  return (
    <div className="back-button-demo">
      <div className="back-button-demo__container">
        <h2 className="back-button-demo__title">BackButton Component Demo</h2>
        
        <div className="back-button-demo__section">
          <h3>Interactive Back Button</h3>
          <div className="back-button-demo__example">
            <BackButton 
              onClick={handleBackClick} 
              label={currentLabel}
              disabled={isDisabled}
            />
          </div>
          <p className="back-button-demo__info">
            Clicked {clickCount} times
          </p>
        </div>

        <div className="back-button-demo__controls">
          <div className="back-button-demo__control-group">
            <h4>Label Options</h4>
            <div className="back-button-demo__label-buttons">
              {labels.map((label) => (
                <button
                  key={label}
                  onClick={() => setCurrentLabel(label)}
                  className={`back-button-demo__label-btn ${currentLabel === label ? 'active' : ''}`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="back-button-demo__control-group">
            <h4>State Controls</h4>
            <label className="back-button-demo__checkbox">
              <input
                type="checkbox"
                checked={isDisabled}
                onChange={(e) => setIsDisabled(e.target.checked)}
              />
              Disabled
            </label>
          </div>
        </div>

        <div className="back-button-demo__section">
          <h3>Different Contexts</h3>
          <div className="back-button-demo__contexts">
            <div className="back-button-demo__context back-button-demo__context--light">
              <h4>Light Background</h4>
              <BackButton label="Back to Home" onClick={() => console.log('Light context')} />
            </div>
            
            <div className="back-button-demo__context back-button-demo__context--dark">
              <h4>Dark Background</h4>
              <BackButton label="Back to Settings" onClick={() => console.log('Dark context')} />
            </div>
          </div>
        </div>

        <div className="back-button-demo__section">
          <h3>Usage Examples</h3>
          <div className="back-button-demo__usage">
            <div className="back-button-demo__usage-item">
              <BackButton label="Back" onClick={() => {}} />
              <span>Minimal</span>
            </div>
            <div className="back-button-demo__usage-item">
              <BackButton label="Back to Scenarios" onClick={() => {}} />
              <span>Descriptive</span>
            </div>
            <div className="back-button-demo__usage-item">
              <BackButton label="Return to Dashboard" onClick={() => {}} />
              <span>Formal</span>
            </div>
            <div className="back-button-demo__usage-item">
              <BackButton label="Back" disabled onClick={() => {}} />
              <span>Disabled</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BackButtonDemo
