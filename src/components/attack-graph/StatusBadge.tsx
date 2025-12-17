import React from 'react';
import './StatusBadge.css';

export type StatusBadgeVariant = 'normal' | 'medium' | 'high' | 'critical';

export interface StatusBadgeProps {
  label: string;
  variant?: StatusBadgeVariant;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ 
  label,
  variant = 'normal',
  className = ''
}) => {
  return (
    <div className={`status-badge status-badge-${variant} ${className}`}>
      <span className="status-badge-label">{label}</span>
    </div>
  );
};
