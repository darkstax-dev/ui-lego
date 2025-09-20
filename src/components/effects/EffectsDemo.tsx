import React from 'react'
import './EffectsDemo.css'

const EffectsDemo: React.FC = () => {
  return (
    <div className="effects-demo">
      <div className="effects-container">
        {/* Drop Shadows Section */}
        <div className="effects-section drop-shadows">
          <div className="effects-header">
            <h3>Drop Shadows</h3>
          </div>
          
          {/* Component Annotations */}
          <div className="annotation annotation-100">
            <div className="annotation-label">
              <span>100</span>
            </div>
            <div className="annotation-pointer"></div>
          </div>
          
          <div className="annotation annotation-200">
            <div className="annotation-label">
              <span>200</span>
            </div>
            <div className="annotation-pointer"></div>
          </div>
          
          <div className="annotation annotation-300">
            <div className="annotation-label">
              <span>300</span>
            </div>
            <div className="annotation-pointer"></div>
          </div>
          
          <div className="annotation annotation-400">
            <div className="annotation-label">
              <span>400</span>
            </div>
            <div className="annotation-pointer"></div>
          </div>
          
          <div className="annotation annotation-500">
            <div className="annotation-label">
              <span>500</span>
            </div>
            <div className="annotation-pointer"></div>
          </div>
          
          <div className="annotation annotation-600">
            <div className="annotation-label">
              <span>600</span>
            </div>
            <div className="annotation-pointer"></div>
          </div>

          {/* Effect Cards */}
          <div className="effects-grid">
            {/* Row 1 */}
            <div className="effect-card">
              <div className="effect-item drop-shadow-100"></div>
            </div>
            <div className="effect-card">
              <div className="effect-item drop-shadow-100-border"></div>
            </div>
            
            {/* Row 2 */}
            <div className="effect-card">
              <div className="effect-item drop-shadow-200"></div>
            </div>
            <div className="effect-card">
              <div className="effect-item drop-shadow-200-border"></div>
            </div>
            
            {/* Row 3 */}
            <div className="effect-card">
              <div className="effect-item drop-shadow-300"></div>
            </div>
            <div className="effect-card">
              <div className="effect-item drop-shadow-300-border"></div>
            </div>
            
            {/* Row 4 */}
            <div className="effect-card">
              <div className="effect-item drop-shadow-400"></div>
            </div>
            <div className="effect-card">
              <div className="effect-item drop-shadow-400-border"></div>
            </div>
            
            {/* Row 5 */}
            <div className="effect-card">
              <div className="effect-item drop-shadow-500"></div>
            </div>
            <div className="effect-card">
              <div className="effect-item drop-shadow-500-border"></div>
            </div>
            
            {/* Row 6 */}
            <div className="effect-card">
              <div className="effect-item drop-shadow-600"></div>
            </div>
            <div className="effect-card">
              <div className="effect-item drop-shadow-600-border"></div>
            </div>
          </div>
        </div>

        {/* Inner Shadows Section */}
        <div className="effects-section inner-shadows">
          <div className="effects-header">
            <h3>Inner Shadows</h3>
          </div>
          
          {/* Component Annotations */}
          <div className="annotation annotation-100">
            <div className="annotation-label">
              <span>100</span>
            </div>
            <div className="annotation-pointer"></div>
          </div>
          
          <div className="annotation annotation-200">
            <div className="annotation-label">
              <span>200</span>
            </div>
            <div className="annotation-pointer"></div>
          </div>
          
          <div className="annotation annotation-300">
            <div className="annotation-label">
              <span>300</span>
            </div>
            <div className="annotation-pointer"></div>
          </div>
          
          <div className="annotation annotation-400">
            <div className="annotation-label">
              <span>400</span>
            </div>
            <div className="annotation-pointer"></div>
          </div>
          
          <div className="annotation annotation-500">
            <div className="annotation-label">
              <span>500</span>
            </div>
            <div className="annotation-pointer"></div>
          </div>
          
          <div className="annotation annotation-600">
            <div className="annotation-label">
              <span>600</span>
            </div>
            <div className="annotation-pointer"></div>
          </div>

          {/* Effect Cards */}
          <div className="effects-grid">
            {/* Row 1 */}
            <div className="effect-card">
              <div className="effect-item inner-shadow-100"></div>
            </div>
            <div className="effect-card">
              <div className="effect-item inner-shadow-100-border"></div>
            </div>
            
            {/* Row 2 */}
            <div className="effect-card">
              <div className="effect-item inner-shadow-200"></div>
            </div>
            <div className="effect-card">
              <div className="effect-item inner-shadow-200-border"></div>
            </div>
            
            {/* Row 3 */}
            <div className="effect-card">
              <div className="effect-item inner-shadow-300"></div>
            </div>
            <div className="effect-card">
              <div className="effect-item inner-shadow-300-border"></div>
            </div>
            
            {/* Row 4 */}
            <div className="effect-card">
              <div className="effect-item inner-shadow-400"></div>
            </div>
            <div className="effect-card">
              <div className="effect-item inner-shadow-400-border"></div>
            </div>
            
            {/* Row 5 */}
            <div className="effect-card">
              <div className="effect-item inner-shadow-500"></div>
            </div>
            <div className="effect-card">
              <div className="effect-item inner-shadow-500-border"></div>
            </div>
            
            {/* Row 6 */}
            <div className="effect-card">
              <div className="effect-item inner-shadow-600"></div>
            </div>
            <div className="effect-card">
              <div className="effect-item inner-shadow-600-border"></div>
            </div>
          </div>
        </div>

        {/* Blur Section */}
        <div className="effects-section blur-effects">
          <div className="effects-header">
            <h3>Blur</h3>
          </div>
          
          {/* Component Annotations */}
          <div className="annotation annotation-overlay">
            <div className="annotation-label">
              <span>Overlay</span>
            </div>
            <div className="annotation-pointer"></div>
          </div>
          
          <div className="annotation annotation-blanket">
            <div className="annotation-label">
              <span>Blanket</span>
            </div>
            <div className="annotation-pointer"></div>
          </div>
          
          <div className="annotation annotation-layer">
            <div className="annotation-label">
              <span>Layer</span>
            </div>
            <div className="annotation-pointer"></div>
          </div>
          
          <div className="annotation annotation-glass">
            <div className="annotation-label">
              <span>Glass</span>
            </div>
            <div className="annotation-pointer"></div>
          </div>

          {/* Effect Cards */}
          <div className="blur-grid">
            <div className="effect-card blur-overlay">
              <img src="https://api.builder.io/api/v1/image/assets/TEMP/42fb0342b0036b7823e06941e8d0c539e56b2045?width=160" alt="" className="blur-image" />
              <div className="blur-layer overlay-blur"></div>
            </div>
            
            <div className="effect-card blur-blanket">
              <img src="https://api.builder.io/api/v1/image/assets/TEMP/42fb0342b0036b7823e06941e8d0c539e56b2045?width=160" alt="" className="blur-image" />
              <div className="blur-layer blanket-blur"></div>
            </div>
            
            <div className="effect-card blur-layer-demo">
              <img src="https://api.builder.io/api/v1/image/assets/TEMP/e182e49fb7d1bb36b3caeb7a3691c007b0bb2429?width=160" alt="" className="blur-image layer-image-blur" />
            </div>
            
            <div className="effect-card blur-glass">
              <img src="https://api.builder.io/api/v1/image/assets/TEMP/42fb0342b0036b7823e06941e8d0c539e56b2045?width=160" alt="" className="blur-image" />
              <div className="blur-layer glass-blur"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Documentation Note */}
      <div className="documentation-note">
        <div className="note-header">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 16.6667H17.5M13.75 2.91669C14.0815 2.58517 14.5312 2.39893 15 2.39893C15.2321 2.39893 15.462 2.44465 15.6765 2.53349C15.891 2.62233 16.0858 2.75254 16.25 2.91669C16.4142 3.08084 16.5444 3.27572 16.6332 3.4902C16.722 3.70467 16.7678 3.93455 16.7678 4.16669C16.7678 4.39884 16.722 4.62871 16.6332 4.84319C16.5444 5.05766 16.4142 5.25254 16.25 5.41669L5.83333 15.8334L2.5 16.6667L3.33333 13.3334L13.75 2.91669Z" stroke="#682D03" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>To change the effects within the Simple Design System to look like your brand, change the values stored within each Style.</span>
        </div>
        <div className="note-divider"></div>
      </div>
    </div>
  )
}

export default EffectsDemo
