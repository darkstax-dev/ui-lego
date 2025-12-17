import React, { useState } from 'react';
import './GraphNode.css';
import { NodeTooltip } from './NodeTooltip';

export interface GraphNodeProps {
  label: string;
  onClick?: () => void;
  tooltipData?: {
    type: string;
    priority: string;
    criticality: string;
    status: string;
  };
}

export const GraphNode: React.FC<GraphNodeProps> = ({ 
  label, 
  onClick,
  tooltipData 
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleClick = () => {
    setShowTooltip(!showTooltip);
    onClick?.();
  };

  return (
    <div className="graph-node-wrapper">
      <div className="graph-node" onClick={handleClick}>
        <svg
          className="graph-node-svg"
          width="72"
          height="80"
          viewBox="0 0 72 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            className="graph-node-outer"
            d="M34.5 2.40039C35.3702 1.898 36.4294 1.86707 37.3232 2.30664L37.5 2.40039L67.6768 19.8232C68.6049 20.3591 69.1767 21.3492 69.1768 22.4209V57.2666C69.1767 58.3383 68.6049 59.3284 67.6768 59.8643L37.5 77.2871C36.5718 77.823 35.4282 77.823 34.5 77.2871L4.32324 59.8643C3.39511 59.3284 2.82331 58.3383 2.82324 57.2666V22.4209C2.82331 21.3492 3.3951 20.3591 4.32324 19.8232L34.5 2.40039Z"
            stroke="#FF6C64"
            strokeOpacity="0.2"
            strokeWidth="4"
          />
          <path
            className="graph-node-inner"
            d="M36.0645 4.75684L36.125 4.78223L66.3018 22.2051C66.379 22.2497 66.4267 22.3317 66.4268 22.4209V57.2666C66.4267 57.3558 66.379 57.4378 66.3018 57.4824L36.125 74.9053C36.0476 74.9499 35.9523 74.9499 35.875 74.9053L5.69824 57.4824C5.621 57.4378 5.57331 57.3558 5.57324 57.2666V22.4209C5.57331 22.3317 5.62101 22.2497 5.69824 22.2051L35.875 4.78223C35.9331 4.74869 36.0013 4.74 36.0645 4.75684Z"
            fill="white"
            fillOpacity="0.4"
            stroke="#FF6C64"
            strokeWidth="1.5"
          />
          <text
            className="graph-node-text"
            fill="#00112B"
            xmlSpace="preserve"
            fontFamily="Macan Mono Trial"
            fontSize="12"
            letterSpacing="0.1em"
          >
            <tspan x="50%" y="40%" textAnchor="middle" dominantBaseline="middle">
              {label.split('\n').map((line, i) => (
                <tspan key={i} x="50%" dy={i === 0 ? 0 : '1.2em'}>
                  {line}
                </tspan>
              ))}
            </tspan>
          </text>
        </svg>
      </div>
      {showTooltip && tooltipData && (
        <NodeTooltip
          type={tooltipData.type}
          priority={tooltipData.priority}
          criticality={tooltipData.criticality}
          status={tooltipData.status}
          onClose={() => setShowTooltip(false)}
        />
      )}
    </div>
  );
};
