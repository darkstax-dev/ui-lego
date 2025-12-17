import React from 'react';
import './AttackGraphLegend.css';

export interface AttackGraphLegendProps {
  className?: string;
}

export const AttackGraphLegend: React.FC<AttackGraphLegendProps> = ({ className }) => {
  return (
    <div className={`attack-graph-legend ${className || ''}`}>
      <div className="legend-beak" />
      
      <div className="legend-title">Legend</div>
      
      <div className="legend-items">
        <div className="legend-item">
          <div className="legend-icon legend-square red-border" />
          <div className="legend-label">Data Center</div>
        </div>
        
        <div className="legend-item">
          <div className="legend-icon legend-square pink-border" />
          <div className="legend-label">Power Station</div>
        </div>
        
        <div className="legend-item">
          <div className="legend-icon legend-square orange-border" />
          <div className="legend-label">Emergency Station</div>
        </div>
        
        <div className="legend-item">
          <div className="legend-icon legend-square dark-blue-border" />
          <div className="legend-label">Analytics Service</div>
        </div>
        
        <div className="legend-item">
          <div className="legend-icon legend-square green-border" />
          <div className="legend-label">Control Service</div>
        </div>
        
        <div className="legend-item">
          <div className="legend-icon legend-hexagon">
            <svg width="21" height="24" viewBox="0 0 21 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.64062 1.2666C10.2594 0.909337 11.0218 0.90941 11.6406 1.2666L19.2822 5.67871C19.9008 6.036 20.2822 6.69583 20.2822 7.41016V16.2344C20.2821 16.9487 19.9008 17.6086 19.2822 17.9658L11.6406 22.3779C11.0218 22.7351 10.2594 22.7352 9.64062 22.3779L2 17.9658C1.38131 17.6086 1.0001 16.9488 1 16.2344V7.41016C1.00005 6.69572 1.3813 6.03596 2 5.67871L9.64062 1.2666Z" stroke="#B6261F" strokeOpacity="0.2" strokeWidth="2"/>
              <path d="M10.5283 2.73535C10.6056 2.69071 10.701 2.69075 10.7783 2.73535L18.4199 7.14648C18.4972 7.19112 18.5449 7.27402 18.5449 7.36328V16.1875C18.5448 16.2766 18.497 16.3587 18.4199 16.4033L10.7783 20.8154C10.701 20.86 10.6056 20.8601 10.5283 20.8154L2.8877 16.4033C2.81047 16.3587 2.7628 16.2767 2.7627 16.1875V7.36328C2.76275 7.27402 2.81039 7.19112 2.8877 7.14648L10.5283 2.73535Z" fill="white" fillOpacity="0.4" stroke="#B6261F" strokeWidth="1.5"/>
            </svg>
          </div>
          <div className="legend-label">Alert Service</div>
        </div>
        
        <div className="legend-item">
          <div className="legend-icon legend-hexagon">
            <svg width="21" height="24" viewBox="0 0 21 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.64062 1.2666C10.2594 0.909337 11.0218 0.90941 11.6406 1.2666L19.2822 5.67871C19.9008 6.036 20.2822 6.69583 20.2822 7.41016V16.2344C20.2821 16.9487 19.9008 17.6086 19.2822 17.9658L11.6406 22.3779C11.0218 22.7351 10.2594 22.7352 9.64062 22.3779L2 17.9658C1.38131 17.6086 1.0001 16.9488 1 16.2344V7.41016C1.00005 6.69572 1.3813 6.03596 2 5.67871L9.64062 1.2666Z" stroke="#108541" strokeOpacity="0.2" strokeWidth="2"/>
              <path d="M10.5283 2.73535C10.6056 2.69071 10.701 2.69075 10.7783 2.73535L18.4199 7.14648C18.4972 7.19112 18.5449 7.27402 18.5449 7.36328V16.1875C18.5448 16.2766 18.497 16.3587 18.4199 16.4033L10.7783 20.8154C10.701 20.86 10.6056 20.8601 10.5283 20.8154L2.8877 16.4033C2.81047 16.3587 2.7628 16.2767 2.7627 16.1875V7.36328C2.76275 7.27402 2.81039 7.19112 2.8877 7.14648L10.5283 2.73535Z" fill="white" fillOpacity="0.4" stroke="#23A45A" strokeWidth="1.5"/>
            </svg>
          </div>
          <div className="legend-label">Sensor</div>
        </div>
        
        <div className="legend-item">
          <div className="legend-icon legend-square gray-border" />
          <div className="legend-label">Zone</div>
        </div>
        
        <div className="legend-item">
          <div className="legend-icon legend-hexagon">
            <svg width="21" height="24" viewBox="0 0 21 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.64062 1.2666C10.2594 0.909337 11.0218 0.90941 11.6406 1.2666L19.2822 5.67871C19.9008 6.036 20.2822 6.69583 20.2822 7.41016V16.2344C20.2821 16.9487 19.9008 17.6086 19.2822 17.9658L11.6406 22.3779C11.0218 22.7351 10.2594 22.7352 9.64062 22.3779L2 17.9658C1.38131 17.6086 1.0001 16.9488 1 16.2344V7.41016C1.00005 6.69572 1.3813 6.03596 2 5.67871L9.64062 1.2666Z" stroke="#FF6C64" strokeOpacity="0.2" strokeWidth="2"/>
              <path d="M10.5283 2.73535C10.6056 2.69071 10.701 2.69075 10.7783 2.73535L18.4199 7.14648C18.4972 7.19112 18.5449 7.27402 18.5449 7.36328V16.1875C18.5448 16.2766 18.497 16.3587 18.4199 16.4033L10.7783 20.8154C10.701 20.86 10.6056 20.8601 10.5283 20.8154L2.8877 16.4033C2.81047 16.3587 2.7628 16.2767 2.7627 16.1875V7.36328C2.76275 7.27402 2.81039 7.19112 2.8877 7.14648L10.5283 2.73535Z" fill="white" fillOpacity="0.4" stroke="#FF6C64" strokeWidth="1.5"/>
            </svg>
          </div>
          <div className="legend-label">Vehicle</div>
        </div>
        
        <div className="legend-item">
          <div className="legend-icon legend-hexagon">
            <svg width="21" height="24" viewBox="0 0 21 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.64062 1.2666C10.2594 0.909337 11.0218 0.90941 11.6406 1.2666L19.2822 5.67871C19.9008 6.036 20.2822 6.69583 20.2822 7.41016V16.2344C20.2821 16.9487 19.9008 17.6086 19.2822 17.9658L11.6406 22.3779C11.0218 22.7351 10.2594 22.7352 9.64062 22.3779L2 17.9658C1.38131 17.6086 1.0001 16.9488 1 16.2344V7.41016C1.00005 6.69572 1.3813 6.03596 2 5.67871L9.64062 1.2666Z" stroke="#ED8B30" strokeOpacity="0.2" strokeWidth="2"/>
              <path d="M10.5283 2.73535C10.6056 2.69071 10.701 2.69075 10.7783 2.73535L18.4199 7.14648C18.4972 7.19112 18.5449 7.27402 18.5449 7.36328V16.1875C18.5448 16.2766 18.497 16.3587 18.4199 16.4033L10.7783 20.8154C10.701 20.86 10.6056 20.8601 10.5283 20.8154L2.8877 16.4033C2.81047 16.3587 2.7628 16.2767 2.7627 16.1875V7.36328C2.76275 7.27402 2.81039 7.19112 2.8877 7.14648L10.5283 2.73535Z" fill="white" fillOpacity="0.4" stroke="#ED8B30" strokeWidth="1.5"/>
            </svg>
          </div>
          <div className="legend-label">Event</div>
        </div>
        
        <div className="legend-item">
          <div className="legend-icon legend-hexagon">
            <svg width="21" height="24" viewBox="0 0 21 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.64062 1.2666C10.2594 0.909337 11.0218 0.90941 11.6406 1.2666L19.2822 5.67871C19.9008 6.036 20.2822 6.69583 20.2822 7.41016V16.2344C20.2821 16.9487 19.9008 17.6086 19.2822 17.9658L11.6406 22.3779C11.0218 22.7351 10.2594 22.7352 9.64062 22.3779L2 17.9658C1.38131 17.6086 1.0001 16.9488 1 16.2344V7.41016C1.00005 6.69572 1.3813 6.03596 2 5.67871L9.64062 1.2666Z" stroke="#0451A4" strokeOpacity="0.2" strokeWidth="2"/>
              <path d="M10.5283 2.73535C10.6056 2.69071 10.701 2.69075 10.7783 2.73535L18.4199 7.14648C18.4972 7.19112 18.5449 7.27402 18.5449 7.36328V16.1875C18.5448 16.2766 18.497 16.3587 18.4199 16.4033L10.7783 20.8154C10.701 20.86 10.6056 20.8601 10.5283 20.8154L2.8877 16.4033C2.81047 16.3587 2.7628 16.2767 2.7627 16.1875V7.36328C2.76275 7.27402 2.81039 7.19112 2.8877 7.14648L10.5283 2.73535Z" fill="white" fillOpacity="0.4" stroke="#0451A4" strokeWidth="1.5"/>
            </svg>
          </div>
          <div className="legend-label">Policy</div>
        </div>
      </div>
    </div>
  );
};
