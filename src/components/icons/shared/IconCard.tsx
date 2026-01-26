import React, { useRef } from 'react';
import { copySVGToClipboard, downloadSVG } from '../utils/svgExtractor';
import './IconCard.css';

interface IconCardProps {
  icon: React.ComponentType<any>;
  iconSize: number;
  iconColor?: string;
  name: string;
  category: string;
  categoryColor?: string;
  onCopySuccess?: (message: string) => void;
  onCopyError?: (error: string) => void;
}

export const IconCard: React.FC<IconCardProps> = ({
  icon: IconComponent,
  iconSize,
  iconColor,
  name,
  category,
  categoryColor,
  onCopySuccess,
  onCopyError
}) => {
  const iconRef = useRef<HTMLDivElement>(null);

  const handleCopy = async () => {
    try {
      const svgElement = iconRef.current?.querySelector('svg') || null;
      await copySVGToClipboard(svgElement);
      onCopySuccess?.(`Copied ${name} SVG!`);
    } catch (error) {
      onCopyError?.('Failed to copy SVG');
    }
  };

  const handleDownload = () => {
    try {
      const svgElement = iconRef.current?.querySelector('svg') || null;
      const filename = name.replace(/\s+/g, '');
      downloadSVG(svgElement, filename);
    } catch (error) {
      console.error('Failed to download SVG:', error);
    }
  };

  return (
    <div className="icon-card">
      <div className="icon-card__preview" ref={iconRef}>
        <IconComponent 
          width={iconSize} 
          height={iconSize} 
          fill={iconColor || 'var(--text-blue-main)'}
        />
      </div>
      
      <div className="icon-card__info">
        <h3 className="icon-card__name">{name}</h3>
        <span 
          className="icon-card__category" 
          style={categoryColor ? { color: categoryColor } : undefined}
        >
          {category}
        </span>
      </div>
      
      <div className="icon-card__actions">
        <button
          className="icon-card__button icon-card__button--copy"
          onClick={handleCopy}
          type="button"
          aria-label={`Copy ${name} SVG`}
        >
          COPY SVG
        </button>
        <button
          className="icon-card__button icon-card__button--download"
          onClick={handleDownload}
          type="button"
          aria-label={`Download ${name} SVG`}
        >
          DOWNLOAD
        </button>
      </div>
    </div>
  );
};
