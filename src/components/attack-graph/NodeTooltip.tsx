import React from 'react';
import './NodeTooltip.css';
import { NodeTypeBadge } from './NodeTypeBadge';

export interface NodeTooltipProps {
  type: string;
  priority: string;
  criticality: string;
  status: string;
  onClose?: () => void;
  typeBackgroundColor?: string;
  typeTextColor?: string;
}

export const NodeTooltip: React.FC<NodeTooltipProps> = ({
  type,
  priority,
  criticality,
  status,
  onClose,
  typeBackgroundColor,
  typeTextColor
}) => {
  return (
    <div className="node-tooltip">
      <svg
        className="node-tooltip-beak"
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5.65685 11.3137L11.3137 5.65685L5.65685 0L0 5.65685L5.65685 11.3137Z"
          fill="#DFDFDF"
        />
      </svg>
      <div className="node-tooltip-content">
        <div className="node-tooltip-section">
          <div className="node-tooltip-label">Type:</div>
          <NodeTypeBadge
            label={type}
            backgroundColor={typeBackgroundColor}
            textColor={typeTextColor}
          />
        </div>
        
        <div className="node-tooltip-divider" />
        
        <div className="node-tooltip-section">
          <div className="node-tooltip-label">Priority:</div>
          <div className="node-tooltip-value">{priority}</div>
        </div>
        
        <div className="node-tooltip-divider" />
        
        <div className="node-tooltip-section">
          <div className="node-tooltip-label">Criticality:</div>
          <div className="node-tooltip-value">{criticality}</div>
        </div>
        
        <div className="node-tooltip-divider" />
        
        <div className="node-tooltip-section">
          <div className="node-tooltip-label">Status:</div>
          <div className="node-tooltip-value">{status}</div>
        </div>
      </div>
    </div>
  );
};
