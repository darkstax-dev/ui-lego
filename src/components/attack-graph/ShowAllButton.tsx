import React from 'react';
import './ActionButtons.css';

export interface ShowAllButtonProps {
  onClick?: () => void;
}

export const ShowAllButton: React.FC<ShowAllButtonProps> = ({ onClick }) => {
  return (
    <button className="action-button show-all-button" onClick={onClick}>
      <span className="action-button-label">SHOW ALL</span>
      <div className="action-button-icon">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path 
            d="M8.33382 17.5V15.8333H5.34215L9.09215 12.0833L7.91715 10.9083L4.16715 14.6583V11.6667H2.50049V17.5H8.33382ZM12.0838 9.09167L15.8338 5.34167V8.33333H17.5005V2.5H11.6672V4.16667H14.6588L10.9088 7.91667L12.0838 9.09167Z" 
            fill="white"
          />
        </svg>
      </div>
    </button>
  );
};
