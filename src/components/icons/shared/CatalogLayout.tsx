import React from 'react';
import './CatalogLayout.css';

interface CatalogLayoutProps {
  title: string;
  description: string;
  copyStatus?: string;
  children: React.ReactNode;
}

export const CatalogLayout: React.FC<CatalogLayoutProps> = ({
  title,
  description,
  copyStatus,
  children
}) => {
  return (
    <div className="catalog-layout">
      <div className="catalog-layout__header">
        <h1 className="catalog-layout__title">{title}</h1>
        <p className="catalog-layout__description">{description}</p>
        
        {copyStatus && (
          <div className="catalog-layout__status">
            {copyStatus}
          </div>
        )}
      </div>
      
      {children}
    </div>
  );
};

interface CatalogControlsProps {
  children: React.ReactNode;
}

export const CatalogControls: React.FC<CatalogControlsProps> = ({ children }) => {
  return (
    <div className="catalog-controls">
      {children}
    </div>
  );
};

interface CatalogControlGroupProps {
  label: string;
  children: React.ReactNode;
}

export const CatalogControlGroup: React.FC<CatalogControlGroupProps> = ({ label, children }) => {
  return (
    <div className="catalog-control-group">
      <label className="catalog-control-group__label">{label}</label>
      {children}
    </div>
  );
};

interface CatalogGridProps {
  children: React.ReactNode;
  resultCount?: number;
}

export const CatalogGrid: React.FC<CatalogGridProps> = ({ children, resultCount }) => {
  return (
    <>
      {resultCount !== undefined && (
        <div className="catalog-grid__results">
          <p className="catalog-grid__count">
            {resultCount} icon{resultCount !== 1 ? 's' : ''} found
          </p>
        </div>
      )}
      <div className="catalog-grid">
        {children}
      </div>
    </>
  );
};

interface CatalogEmptyStateProps {
  icon?: React.ReactNode;
  message: string;
  suggestion?: string;
}

export const CatalogEmptyState: React.FC<CatalogEmptyStateProps> = ({ 
  icon, 
  message, 
  suggestion 
}) => {
  return (
    <div className="catalog-empty-state">
      {icon && <div className="catalog-empty-state__icon">{icon}</div>}
      <p className="catalog-empty-state__message">{message}</p>
      {suggestion && <p className="catalog-empty-state__suggestion">{suggestion}</p>}
    </div>
  );
};
