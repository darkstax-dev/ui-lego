import React from 'react';
import './InfoButton.css';

export interface InfoButtonProps {
  onClick?: () => void;
  size?: 'small' | 'big';
}

export const InfoButton: React.FC<InfoButtonProps> = ({ 
  onClick,
  size = 'big'
}) => {
  return (
    <button 
      className={`info-button info-button-${size}`}
      onClick={onClick}
      aria-label="Information"
    >
      <svg 
        className="info-icon" 
        width="20" 
        height="20" 
        viewBox="0 0 20 20" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          fillRule="evenodd" 
          clipRule="evenodd" 
          d="M9.99984 3.33073C6.31794 3.33073 3.33317 6.3155 3.33317 9.9974C3.33317 13.6793 6.31794 16.6641 9.99984 16.6641C13.6817 16.6641 16.6665 13.6793 16.6665 9.9974C16.6665 6.3155 13.6817 3.33073 9.99984 3.33073ZM1.6665 9.9974C1.6665 5.39502 5.39746 1.66406 9.99984 1.66406C14.6022 1.66406 18.3332 5.39502 18.3332 9.9974C18.3332 14.5998 14.6022 18.3307 9.99984 18.3307C5.39746 18.3307 1.6665 14.5998 1.6665 9.9974ZM9.29646 10.8307H7.9165L8.33317 9.16406H11.6665L10.4165 12.4974H11.6665L11.2069 13.4167C10.9778 13.8747 10.5097 14.1641 9.99752 14.1641C9.05349 14.1641 8.40005 13.2212 8.73152 12.3372L9.29646 10.8307ZM9.99984 5.83073C9.30948 5.83073 8.74984 6.39037 8.74984 7.08073C8.74984 7.77109 9.30948 8.33073 9.99984 8.33073C10.6902 8.33073 11.2498 7.77109 11.2498 7.08073C11.2498 6.39037 10.6902 5.83073 9.99984 5.83073Z" 
          fill="#78797A"
        />
      </svg>
    </button>
  );
};
