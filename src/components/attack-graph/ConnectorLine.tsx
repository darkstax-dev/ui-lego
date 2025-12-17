import React from 'react';
import './ConnectorLine.css';

export interface ConnectorLineProps {
  startX?: number;
  startY?: number;
  endX?: number;
  endY?: number;
  curved?: boolean;
  className?: string;
}

export const ConnectorLine: React.FC<ConnectorLineProps> = ({
  startX = 0,
  startY = 0,
  endX = 100,
  endY = 100,
  curved = true,
  className = ''
}) => {
  const width = Math.abs(endX - startX);
  const height = Math.abs(endY - startY);
  const viewBoxWidth = width + 40;
  const viewBoxHeight = height + 40;

  const path = curved
    ? `M 20 20 Q ${width / 2} ${height / 3}, ${width + 20} ${height + 20}`
    : `M 20 20 L ${width + 20} ${height + 20}`;

  return (
    <svg
      className={`connector-line ${className}`}
      width={viewBoxWidth}
      height={viewBoxHeight}
      viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <marker
          id="arrowhead"
          markerWidth="10"
          markerHeight="10"
          refX="8"
          refY="3"
          orient="auto"
        >
          <polygon points="0 0, 10 3, 0 6" fill="#00112B" />
        </marker>
      </defs>
      <circle cx="20" cy="20" r="8" fill="#00112B" />
      <path
        d={path}
        stroke="#00112B"
        strokeWidth="2"
        strokeDasharray="8 4"
        fill="none"
        markerEnd="url(#arrowhead)"
      />
    </svg>
  );
};
