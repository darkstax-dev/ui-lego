import { useUIStore } from '../../store/uiStore';
import { statusColors } from '../../data/k8sTemplates';

export function StatusLegendTooltip() {
  const { showStatusLegend } = useUIStore();

  if (!showStatusLegend) return null;

  return (
    <div className="absolute right-12 bottom-24 w-[234px] bg-gray-200 shadow-[0px_4px_4px_-1px_rgba(12,12,13,0.1)] p-3 flex flex-col gap-3 z-50">
      {/* Beak/Arrow */}
      <div className="absolute -bottom-[6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-gray-200 rotate-45" />
      
      {/* Title */}
      <div className="text-blue-dark-950 font-macan-mono text-base font-medium leading-tight">
        Status Legend
      </div>

      {/* Status Items */}
      <div className="flex flex-col gap-3">
        {Object.entries(statusColors).map(([status, { hex, label }]) => (
          <div key={status} className="flex items-center gap-2">
            {/* Status Hexagon */}
            <svg width="18" height="20" viewBox="0 0 18 20" fill="none" className="flex-shrink-0">
              <path
                d="M8.80015 0.0518371C8.92382 -0.0172791 9.07618 -0.017279 9.19985 0.0518371L17.8001 4.85838C17.9238 4.92749 18 5.05523 18 5.19346V14.8065C18 14.9448 17.9238 15.0725 17.8001 15.1416L9.19985 19.9482C9.07618 20.0173 8.92382 20.0173 8.80015 19.9482L0.199852 15.1416C0.0761831 15.0725 0 14.9448 0 14.8065V5.19346C0 5.05523 0.0761832 4.92749 0.199852 4.85838L8.80015 0.0518371Z"
                fill={hex}
                style={status === 'ready' ? {
                  stroke: 'rgba(0,0,0,0.1)',
                  strokeWidth: '1px'
                } : {}}
              />
            </svg>

            {/* Status Label */}
            <div className="text-blue-dark-950 font-inter text-sm leading-[140%]">
              {label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
