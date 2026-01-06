import React from 'react';
import './NodeBox.css';

export type NodeBoxVariant = 'blue' | 'green' | 'orange' | 'gray' | 'red-hexagon';

export interface NodeBoxProps {
  variant?: NodeBoxVariant;
  className?: string;
  editable?: boolean;
  defaultText?: string;
  onTextChange?: (text: string) => void;
}

export const NodeBox: React.FC<NodeBoxProps> = ({
  variant = 'blue',
  className = '',
  editable = false,
  defaultText = '',
  onTextChange
}) => {
  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    if (onTextChange) {
      onTextChange(e.currentTarget.textContent || '');
    }
  };

  if (variant === 'red-hexagon') {
    return (
      <div className={`node-box node-box-${variant} ${className}`}>
        <svg
          width="72"
          height="72"
          viewBox="0 0 63 72"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ display: 'block' }}
        >
          <path
            d="M31.0519 0.782227C31.1292 0.737568 31.2245 0.737569 31.3019 0.782227L61.4786 18.2051C61.5559 18.2497 61.6036 18.3317 61.6036 18.4209V53.2666C61.6036 53.3558 61.5559 53.4378 61.4786 53.4824L31.3019 70.9053C31.2245 70.9499 31.1292 70.9499 31.0519 70.9053L0.875122 53.4824C0.797885 53.4378 0.750194 53.3558 0.750122 53.2666V18.4209C0.750194 18.3317 0.797885 18.2497 0.875122 18.2051L31.0519 0.782227Z"
            fill="#FFE3E1"
            stroke="#FF6C64"
            strokeWidth="1.5"
          />
        </svg>
        {editable && (
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              fontFamily: 'Macan Mono Trial, monospace',
              fontSize: '14px',
              fontWeight: 500,
              color: '#00112B',
            }}
            contentEditable
            suppressContentEditableWarning
            onInput={handleInput}
          >
            {defaultText}
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className={`node-box node-box-${variant} ${className}`}
      contentEditable={editable}
      suppressContentEditableWarning
      onInput={handleInput}
    >
      {defaultText}
    </div>
  );
};
