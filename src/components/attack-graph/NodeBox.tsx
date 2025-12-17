import React from 'react';
import './NodeBox.css';

export type NodeBoxVariant = 'blue' | 'green' | 'orange';

export interface NodeBoxProps {
  variant?: NodeBoxVariant;
  className?: string;
}

export const NodeBox: React.FC<NodeBoxProps> = ({ 
  variant = 'blue',
  className = ''
}) => {
  return (
    <div className={`node-box node-box-${variant} ${className}`} />
  );
};
