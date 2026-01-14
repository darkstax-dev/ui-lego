import React from 'react';
import './NodeTypeBadge.css';

export interface NodeTypeBadgeProps {
  label: string;
  backgroundColor?: string;
  textColor?: string;
  className?: string;
}

export const NodeTypeBadge: React.FC<NodeTypeBadgeProps> = ({
  label,
  backgroundColor = 'rgba(4, 81, 164, 0.20)',
  textColor = '#0451A4',
  className = ''
}) => {
  return (
    <div 
      className={`node-type-badge ${className}`}
      style={{
        backgroundColor,
        color: textColor
      }}
    >
      <span className="node-type-badge-text">
        {label}
      </span>
    </div>
  );
};
