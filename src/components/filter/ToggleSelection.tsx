import React, { useState } from 'react';
import SwitchField from '../inputs/SwitchField';
import './ToggleSelection.css';

export interface ToggleOption {
  id: string;
  label: string;
  checked?: boolean;
}

export interface ToggleSelectionProps {
  /** Title displayed at the top */
  title?: string;
  /** Array of toggle options */
  options: ToggleOption[];
  /** Callback when option is toggled */
  onChange?: (options: ToggleOption[]) => void;
  /** Show search input */
  showSearch?: boolean;
  /** Search placeholder text */
  searchPlaceholder?: string;
  /** Show "Hide All" / "Show All" buttons */
  showActions?: boolean;
  /** Additional CSS classes */
  className?: string;
}

const ToggleSelection: React.FC<ToggleSelectionProps> = ({
  title = 'Find column',
  options,
  onChange,
  showSearch = true,
  searchPlaceholder = 'Column title',
  showActions = true,
  className = '',
}) => {
  const [toggleOptions, setToggleOptions] = useState<ToggleOption[]>(() => {
    return options.map(opt => ({ ...opt, checked: opt.checked !== false }));
  });

  const [searchQuery, setSearchQuery] = useState('');

  const handleToggle = (optionId: string) => {
    const updated = toggleOptions.map(opt =>
      opt.id === optionId ? { ...opt, checked: !opt.checked } : opt
    );
    setToggleOptions(updated);
    if (onChange) {
      onChange(updated);
    }
  };

  const handleHideAll = () => {
    const updated = toggleOptions.map(opt => ({ ...opt, checked: false }));
    setToggleOptions(updated);
    if (onChange) {
      onChange(updated);
    }
  };

  const handleShowAll = () => {
    const updated = toggleOptions.map(opt => ({ ...opt, checked: true }));
    setToggleOptions(updated);
    if (onChange) {
      onChange(updated);
    }
  };

  const filteredOptions = toggleOptions.filter(opt =>
    opt.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={`toggle-selection ${className}`}>
      {title && (
        <div className="toggle-selection__header">
          <label className="toggle-selection__title">{title}</label>
        </div>
      )}

      {showSearch && (
        <input
          type="text"
          className="toggle-selection__search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={searchPlaceholder}
        />
      )}

      <div className="toggle-selection__list">
        {filteredOptions.map((option) => (
          <div key={option.id} className="toggle-selection__item">
            <SwitchField
              checked={option.checked || false}
              onChange={() => handleToggle(option.id)}
              label={option.label}
              labelPosition="left"
            />
          </div>
        ))}
      </div>

      {showActions && (
        <div className="toggle-selection__actions">
          <button
            className="toggle-selection__action toggle-selection__action--hide"
            onClick={handleHideAll}
            type="button"
          >
            HIDE ALL
          </button>
          <button
            className="toggle-selection__action toggle-selection__action--show"
            onClick={handleShowAll}
            type="button"
          >
            SHOW ALL
          </button>
        </div>
      )}
    </div>
  );
};

export default ToggleSelection;