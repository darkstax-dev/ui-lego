import React from 'react';
import './ActionButtons.css';

export interface OptimalButtonProps {
  onClick?: () => void;
}

export const OptimalButton: React.FC<OptimalButtonProps> = ({ onClick }) => {
  return (
    <button className="action-button optimal-button" onClick={onClick}>
      <span className="action-button-label">OPTIMAL</span>
      <div className="action-button-icon">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path 
            d="M16.2504 2.57031L12.5004 6.32031V3.32865H10.8338V9.16198H16.6671V7.49531H13.6754L17.4254 3.74531L16.2504 2.57031ZM3.33377 10.8286V12.4953H6.32544L2.57544 16.2453L3.75044 17.4203L7.50044 13.6703V16.662H9.16711V10.8286H3.33377Z" 
            fill="white"
          />
        </svg>
      </div>
    </button>
  );
};
