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
