import { useState } from 'react';
import { ChevronDown, ChevronRight, Copy, Check } from 'lucide-react';

interface ObjectDetailProps {
  object: any;
  level?: number;
  defaultExpanded?: boolean;
}

export function ObjectDetail({ object, level = 0, defaultExpanded = true }: ObjectDetailProps) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [copied, setCopied] = useState<string | null>(null);

  const toggleExpand = (key: string) => {
    setExpanded(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const copyValue = (value: string, key: string) => {
    navigator.clipboard.writeText(value);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  const renderValue = (key: string, value: any, depth: number) => {
    const isExpanded = expanded[key] ?? defaultExpanded;

    if (value === null || value === undefined) {
      return (
        <div className="flex items-center gap-2 py-1">
          <span className="body-small-macan-book" style={{ color: 'var(--text-gray-main)' }}>{key}:</span>
          <span className="body-small-macan-book" style={{ color: 'var(--text-gray-disabled)', fontStyle: 'italic' }}>null</span>
        </div>
      );
    }

    if (typeof value === 'object' && !Array.isArray(value)) {
      return (
        <div key={key}>
          <button
            onClick={() => toggleExpand(key)}
            className="flex items-center gap-1 py-1 px-1 -mx-1 w-full text-left"
          >
            {isExpanded ? (
              <ChevronDown className="w-4 h-4" style={{ color: 'var(--text-gray-main)' }} />
            ) : (
              <ChevronRight className="w-4 h-4" style={{ color: 'var(--text-gray-main)' }} />
            )}
            <span className="body-small-macan-book" style={{ color: 'var(--text-gray-main)' }}>{key}</span>
            <span className="body-small-mono-book" style={{ color: 'var(--text-gray-disabled)' }}>
              {Object.keys(value).length} {Object.keys(value).length === 1 ? 'item' : 'items'}
            </span>
          </button>
          {isExpanded && (
            <div className="ml-6 pl-3 mt-1" style={{ borderLeft: '2px solid var(--divider-light)' }}>
              <ObjectDetail object={value} level={depth + 1} defaultExpanded={false} />
            </div>
          )}
        </div>
      );
    }

    if (Array.isArray(value)) {
      return (
        <div key={key}>
          <button
            onClick={() => toggleExpand(key)}
            className="flex items-center gap-1 py-1 px-1 -mx-1 w-full text-left"
          >
            {isExpanded ? (
              <ChevronDown className="w-4 h-4" style={{ color: 'var(--text-gray-main)' }} />
            ) : (
              <ChevronRight className="w-4 h-4" style={{ color: 'var(--text-gray-main)' }} />
            )}
            <span className="body-small-macan-book" style={{ color: 'var(--text-gray-main)' }}>{key}</span>
            <span className="body-small-mono-book" style={{ color: 'var(--text-gray-disabled)' }}>
              [{value.length}]
            </span>
          </button>
          {isExpanded && (
            <div className="ml-6 pl-3 mt-1" style={{ borderLeft: '2px solid var(--divider-light)' }}>
              {value.map((item, index) => (
                <div key={index} className="py-1">
                  {typeof item === 'object' ? (
                    <ObjectDetail object={{ [index]: item }} level={depth + 1} defaultExpanded={false} />
                  ) : (
                    <div className="flex items-center gap-2">
                      <span className="body-small-mono-book" style={{ color: 'var(--text-gray-main)' }}>[{index}]</span>
                      <span className="body-small-mono-book" style={{ color: 'var(--text-blue-main)' }}>
                        {String(item)}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }

    const stringValue = String(value);
    const isCopied = copied === key;

    return (
      <div key={key} className="flex items-center justify-between gap-2 py-1 group">
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <span className="body-small-macan-book flex-shrink-0" style={{ color: 'var(--text-gray-main)' }}>{key}:</span>
          <span className="body-small-mono-book truncate" style={{ 
            color: typeof value === 'number' ? 'var(--color-blue-700)' : 
                   typeof value === 'boolean' ? 'var(--color-yellow-500)' : 
                   'var(--text-blue-main)'
          }}>
            {typeof value === 'string' ? `"${value}"` : stringValue}
          </span>
        </div>
        <button
          onClick={() => copyValue(stringValue, key)}
          className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
          title="Copy value"
        >
          {isCopied ? (
            <Check className="w-3 h-3" style={{ color: 'var(--color-green-600)' }} />
          ) : (
            <Copy className="w-3 h-3" style={{ color: 'var(--text-gray-main)' }} />
          )}
        </button>
      </div>
    );
  };

  return (
    <div className="space-y-0.5">
      {Object.entries(object).map(([key, value]) => renderValue(key, value, level))}
    </div>
  );
}
