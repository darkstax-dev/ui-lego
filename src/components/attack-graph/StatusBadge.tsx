import React from 'react';
import './StatusBadge.css';

export type StatusBadgeVariant = 'normal' | 'medium' | 'high' | 'critical';

export interface StatusBadgeProps {
  label: string;
  variant?: StatusBadgeVariant;
  className?: string;
  editable?: boolean;
  onLabelChange?: (label: string) => void;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  label,
  variant = 'normal',
  className = '',
  editable = false,
  onLabelChange
}) => {
  const handleInput = (e: React.FormEvent<HTMLSpanElement>) => {
    if (onLabelChange) {
      onLabelChange(e.currentTarget.textContent || '');
    }
  };

  return (
    <div className={`status-badge status-badge-${variant} ${className}`}>
      <span
        className="status-badge-label"
        contentEditable={editable}
        suppressContentEditableWarning
        onInput={handleInput}
      >
        {label}
      </span>
    </div>
  );
};
