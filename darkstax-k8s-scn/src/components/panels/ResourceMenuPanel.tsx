import { useState } from 'react';
import { Search, ChevronDown, ChevronUp } from 'lucide-react';
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

  return (
    <div className="h-full bg-gray-200 shadow-[0px_16px_16px_-8px_rgba(12,12,13,0.1)] flex flex-col p-4 gap-4" style={{ width: '280px', minWidth: '280px', maxWidth: '280px', boxSizing: 'border-box' }} data-testid="resource-menu-panel">
      {/* Search Input */}
      <div className="h-10 px-4 bg-gray-100 flex items-center gap-2">
        <Search className="w-4 h-4 text-gray-500 flex-shrink-0" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search actions..."
          className="flex-1 bg-transparent text-base font-inter text-gray-500 placeholder:text-gray-500 outline-none"
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
            {expandedSections.aggregate ? 
              <ChevronUp className="w-5 h-5 text-gray-500" /> : 
              <ChevronDown className="w-5 h-5 text-gray-500" />
            }
          </button>
        </div>

        <div className="h-px bg-gray-400" style={{ backgroundImage: 'repeating-linear-gradient(to right, #C8C8C8 0, #C8C8C8 6px, transparent 6px, transparent 12px)' }} />

        {/* Kubernetes Section */}
        <div className="flex flex-col gap-3">
          <button 
            className="flex items-center justify-between"
            onClick={() => toggleSection('kubernetes')}
          >
            <span className="text-blue-dark-950 font-macan text-base font-semibold">Kubernetes</span>
            {expandedSections.kubernetes ? 
              <ChevronUp className="w-5 h-5 text-gray-500" /> : 
              <ChevronDown className="w-5 h-5 text-gray-500" />
            }
          </button>

          {expandedSections.kubernetes && (
            <div className="flex flex-wrap gap-x-3 gap-y-2">
              {groupedByCategory.Kubernetes.map(template => (
                <DraggableResourceItem key={template.id} template={template} />
              ))}
            </div>
          )}
        </div>

        <div className="h-px bg-gray-400" style={{ backgroundImage: 'repeating-linear-gradient(to right, #C8C8C8 0, #C8C8C8 6px, transparent 6px, transparent 12px)' }} />

        {/* Templates Section */}
        <div className="flex flex-col gap-3">
          <button 
            className="flex items-center justify-between"
            onClick={() => toggleSection('templates')}
          >
            <span className="text-blue-dark-950 font-macan text-base font-semibold">Templates</span>
            {expandedSections.templates ? 
              <ChevronUp className="w-5 h-5 text-gray-500" /> : 
              <ChevronDown className="w-5 h-5 text-gray-500" />
            }
          </button>
        </div>
      </div>
    </div>
  );
}
