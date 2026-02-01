import { useState } from 'react';
import { Search, Layers } from 'lucide-react';
import { useDraggable } from '@dnd-kit/core';
import { k8sResourceTemplates } from '../../data/k8sTemplates';
import { KubernetesIconWrapper } from '../ui/KubernetesIconWrapper';
import { useUIStore } from '../../store/uiStore';
import { K8sResourceTemplate } from '../../types';

function DraggableResourceItem({ template }: { template: K8sResourceTemplate }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: template.id,
    data: template,
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    opacity: isDragging ? 0.5 : 1,
  } : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      data-testid={`resource-item-${template.id}`}
      className="flex flex-col items-center gap-2 cursor-grab active:cursor-grabbing"
    >
      <KubernetesIconWrapper 
        type={template.type}
        status="ready"
      />
    </div>
  );
}

export function ResourceMenuPanel() {
  const { resourceMenuOpen } = useUIStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedSections, setExpandedSections] = useState({
    aggregate: true,
    kubernetes: true,
    templates: false,
  });

  if (!resourceMenuOpen) return null;

  const filteredTemplates = k8sResourceTemplates.filter(template =>
    template.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
    template.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const groupedByCategory = {
    'Aggregate': filteredTemplates.filter(t => t.category === 'aggregate'),
    'Kubernetes': filteredTemplates.filter(t => t.category !== 'aggregate'),
  };

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section as keyof typeof prev]
    }));
  };

  const isCompact = !expandedSections.aggregate && !expandedSections.kubernetes && !expandedSections.templates;

  if (isCompact) {
    return (
      <div
        className="absolute top-4 right-4 z-30 shadow-[0px_16px_16px_-8px_rgba(12,12,13,0.1)] w-14 h-14 box-border"
        style={{ backgroundColor: 'var(--nav-secondary-bg)' }}
        data-testid="resource-menu-panel"
      >
        <button
          type="button"
          className="w-full h-full flex items-center justify-center bg-surface-default hover:bg-surface-default transition-colors"
          onClick={() => setExpandedSections((prev) => ({ ...prev, kubernetes: true }))}
          aria-label="Open resource menu"
        >
          <Layers className="w-5 h-5" style={{ color: 'var(--text-blue-main)' }} />
        </button>
      </div>
    );
  }

  return (
    <div
      className="absolute top-4 right-4 z-30 shadow-[0px_16px_16px_-8px_rgba(12,12,13,0.1)] flex flex-col p-4 gap-4 overflow-hidden w-[300px] min-w-[300px] max-w-[300px] h-[calc(100%-2rem)] box-border"
      style={{ backgroundColor: 'var(--nav-secondary-bg)' }}
      data-testid="resource-menu-panel"
    >
      {/* Search Input */}
      <div
        className="h-10 px-4 flex items-center gap-2"
        style={{
          backgroundColor: 'var(--search-input-bg)',
          borderRadius: 'var(--sds-size-radius-200)',
        }}
      >
        <Search className="w-4 h-4 flex-shrink-0" style={{ color: 'var(--search-input-icon)' }} />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search actions..."
          className="flex-1 bg-transparent text-base font-inter outline-none"
          style={{ color: 'var(--search-input-text)' }}
        />
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 flex flex-col gap-4 overflow-y-auto">
        {/* Aggregate Section */}
        <div className="flex flex-col gap-3">
          <button
            className="flex items-center justify-between"
            onClick={() => toggleSection('aggregate')}
          >
            <span className="text-blue-dark-950 font-macan text-base font-semibold">Aggregate</span>
            <span
              className="w-5 h-5 text-gray-500 inline-flex items-center justify-center font-semibold leading-none text-[18px]"
              aria-hidden="true"
            >
              {expandedSections.aggregate ? '−' : '+'}
            </span>
          </button>
        </div>

        <div
          className="h-px bg-gray-400 bg-[repeating-linear-gradient(to_right,_#C8C8C8_0,_#C8C8C8_6px,_transparent_6px,_transparent_12px)]"
        />

        {/* Kubernetes Section */}
        <div className="flex flex-col gap-3">
          <button
            className="flex items-center justify-between"
            onClick={() => toggleSection('kubernetes')}
          >
            <span className="text-blue-dark-950 font-macan text-base font-semibold">Kubernetes</span>
            <span
              className="w-5 h-5 text-gray-500 inline-flex items-center justify-center font-semibold leading-none text-[18px]"
              aria-hidden="true"
            >
              {expandedSections.kubernetes ? '−' : '+'}
            </span>
          </button>

          {expandedSections.kubernetes && (
            <div className="flex flex-wrap gap-x-3 gap-y-2">
              {groupedByCategory.Kubernetes.map((template) => (
                <DraggableResourceItem key={template.id} template={template} />
              ))}
            </div>
          )}
        </div>

        <div
          className="h-px bg-gray-400 bg-[repeating-linear-gradient(to_right,_#C8C8C8_0,_#C8C8C8_6px,_transparent_6px,_transparent_12px)]"
        />

        {/* Templates Section */}
        <div className="flex flex-col gap-3">
          <button
            className="flex items-center justify-between"
            onClick={() => toggleSection('templates')}
          >
            <span className="text-blue-dark-950 font-macan text-base font-semibold">Templates</span>
            <span
              className="w-5 h-5 text-gray-500 inline-flex items-center justify-center font-semibold leading-none text-[18px]"
              aria-hidden="true"
            >
              {expandedSections.templates ? '−' : '+'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
