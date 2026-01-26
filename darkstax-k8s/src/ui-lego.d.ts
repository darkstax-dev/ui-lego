declare module 'ui-lego' {
  import type React from 'react';

  export interface MultiSelectOption {
    id: string | number;
    label: string;
    value: string;
  }

  export interface MultiSelectProps {
    options?: MultiSelectOption[];
    value?: MultiSelectOption[];
    onChange?: (selectedItems: MultiSelectOption[]) => void;
    onItemAdd?: (newItem: MultiSelectOption) => void;
    onItemRemove?: (removedItem: MultiSelectOption, index: number) => void;
    placeholder?: string;
    className?: string;
    disabled?: boolean;
    maxHeight?: number;
    createNewItemFromQuery?: (query: string) => MultiSelectOption;
  }

  export const MultiSelect: React.FC<MultiSelectProps>;
}
