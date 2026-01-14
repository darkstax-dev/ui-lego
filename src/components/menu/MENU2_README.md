# Menu 2.0 Component

A modern, accessible menu component based on the latest Figma design system. The Menu2.0 component provides a flexible and customizable menu with support for different states, sizes, and expandable items.

## Features

- ✅ **Multiple States**: Default, hover, and danger variants
- ✅ **Flexible Sizing**: Small, medium, and large sizes
- ✅ **Expandable Items**: Support for nested menus with trailing arrow icons
- ✅ **Keyboard Navigation**: Full keyboard support (arrow keys, Enter, Space, Escape)
- ✅ **Accessibility**: ARIA-compliant with proper roles and attributes
- ✅ **Responsive**: Adapts to different screen sizes
- ✅ **Customizable**: Easy to style and extend

## Components

### Menu2

The container component that wraps menu items.

**Props:**
- `children` (ReactNode) - Menu items to display
- `className` (string) - Additional CSS class names
- `role` (string) - ARIA role (default: 'menu')
- `aria-label` (string) - Accessible label
- `aria-labelledby` (string) - ID of the element that labels the menu

### MenuItem2

Individual menu item component.

**Props:**
- `label` (string) - Text to display
- `variant` ('default' | 'hover' | 'danger') - Visual variant (default: 'default')
- `size` ('small' | 'medium' | 'large') - Size variant (default: 'small')
- `iconLeading` (ReactNode) - Icon to display before the label
- `iconTrailing` (ReactNode) - Icon to display after the label
- `hasTrailingArrow` (boolean) - Show trailing arrow icon (default: false)
- `onClick` (() => void) - Click handler
- `onMouseEnter` (() => void) - Mouse enter handler
- `onMouseLeave` (() => void) - Mouse leave handler
- `className` (string) - Additional CSS class names
- `disabled` (boolean) - Whether the item is disabled (default: false)

## Usage

### Basic Menu

```tsx
import { Menu2, MenuItem2 } from './components/menu'

function MyComponent() {
  return (
    <Menu2>
      <MenuItem2 label="Open" onClick={() => console.log('Open clicked')} />
      <MenuItem2 label="Edit" onClick={() => console.log('Edit clicked')} />
      <MenuItem2 label="Delete" variant="danger" onClick={() => console.log('Delete clicked')} />
    </Menu2>
  )
}
```

### Menu with Expandable Items (Separate Submenu Box)

```tsx
import { Menu2, MenuItem2 } from './components/menu'
import { useState } from 'react'

function MyComponent() {
  const [expandedItem, setExpandedItem] = useState<string | null>(null)

  return (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
      {/* Main Menu */}
      <div style={{ width: '300px' }}>
        <Menu2>
          <MenuItem2 label="Open" onClick={() => console.log('Open')} />
          <MenuItem2 label="Edit" onClick={() => console.log('Edit')} />
          <MenuItem2
            label="Action Output"
            hasTrailingArrow
            onClick={() => setExpandedItem(expandedItem === 'output' ? null : 'output')}
            onMouseEnter={() => setExpandedItem('output')}
          />
          <MenuItem2
            label="Action Input"
            hasTrailingArrow
            onClick={() => setExpandedItem(expandedItem === 'input' ? null : 'input')}
            onMouseEnter={() => setExpandedItem('input')}
          />
          <MenuItem2 label="Delete" variant="danger" onClick={() => console.log('Delete')} />
        </Menu2>
      </div>

      {/* Submenu - appears in separate box to the right */}
      {expandedItem && (
        <div style={{ width: '300px' }}>
          <Menu2>
            <MenuItem2 label="Action" onClick={() => console.log('Action 1')} />
            <MenuItem2 label="Action" onClick={() => console.log('Action 2')} />
            <MenuItem2 label="Action" onClick={() => console.log('Action 3')} />
            <MenuItem2 label="Action" onClick={() => console.log('Action 4')} />
          </Menu2>
        </div>
      )}
    </div>
  )
}
```

### Different Sizes

```tsx
import { Menu2, MenuItem2 } from './components/menu'

function MyComponent() {
  return (
    <>
      {/* Small */}
      <Menu2>
        <MenuItem2 label="Small Item" size="small" />
      </Menu2>

      {/* Medium */}
      <Menu2>
        <MenuItem2 label="Medium Item" size="medium" />
      </Menu2>

      {/* Large */}
      <Menu2>
        <MenuItem2 label="Large Item" size="large" />
      </Menu2>
    </>
  )
}
```

### Context Menu

```tsx
import { Menu2, MenuItem2 } from './components/menu'

function ContextMenu() {
  return (
    <Menu2 aria-label="Context menu">
      <MenuItem2 label="Open" />
      <MenuItem2 label="Open in new tab" />
      <MenuItem2 label="Edit" />
      <MenuItem2 label="Copy" />
      <MenuItem2 label="Paste" />
      <MenuItem2 label="Share" hasTrailingArrow />
      <MenuItem2 label="Export" hasTrailingArrow />
      <MenuItem2 label="Delete" variant="danger" />
    </Menu2>
  )
}
```

## Variants

### Default
Standard menu item with default background and text color.

### Hover
Shows the hover state (darker background). Useful for demonstrating the hover state.

### Danger
Red text color for destructive actions like "Delete" or "Remove".

## Sizes

- **Small**: 8px padding, 14px font size (default)
- **Medium**: 12px padding, 16px font size
- **Large**: 16px padding, 18px font size

## Keyboard Navigation

The Menu2 component supports full keyboard navigation:

- **Arrow Down**: Move to next item
- **Arrow Up**: Move to previous item
- **Home**: Move to first item
- **End**: Move to last item
- **Enter/Space**: Activate the focused item
- **Escape**: Close the menu (dispatches 'menu:escape' event)

## Accessibility

The Menu2 component follows WAI-ARIA best practices:

- Uses proper ARIA roles (`menu`, `menuitem`)
- Supports `aria-label` and `aria-labelledby` for labeling
- Indicates disabled state with `aria-disabled`
- Manages focus with `tabIndex`
- Provides keyboard navigation

## Styling

The component uses CSS custom properties (CSS variables) from the design system:

```css
/* Background colors */
--Drop-down-light-Background-default: #ECECEC
--Gray-300: #CECECE (hover)

/* Text colors */
--Text-Blue-text-Main-text: #00112B
--Red-500: #FF3B31 (danger)

/* Font */
--font-family-macan: 'Macan', -apple-system, Roboto, Helvetica, sans-serif
```

### Custom Styling

You can override styles by passing a `className`:

```tsx
<Menu2 className="my-custom-menu">
  <MenuItem2 label="Item" className="my-custom-item" />
</Menu2>
```

```css
.my-custom-menu {
  /* Custom menu styles */
}

.my-custom-item {
  /* Custom item styles */
}
```

## Migration from Menu v1

If you're migrating from the original Menu component:

### Menu Component
- `Menu` → `Menu2` (same API, but different styling)

### MenuItem Component
- `MenuItem` → `MenuItem2`
- `state` prop → `variant` prop
- `hasIcon` removed (just pass `iconLeading`)
- `hasShortcut` removed (just pass `iconTrailing`)
- New `hasTrailingArrow` prop for expandable items

### Example

```tsx
// Old (Menu v1)
<Menu>
  <MenuItem label="Item" state="default" hasIcon icon={<Icon />} />
</Menu>

// New (Menu 2.0)
<Menu2>
  <MenuItem2 label="Item" variant="default" iconLeading={<Icon />} />
</Menu2>
```

## Design System

This component is based on the Figma design system with the following specifications:

- **Font Family**: Macan
- **Font Weight**: 450 (Book)
- **Font Size**: 14px (small), 16px (medium), 18px (large)
- **Line Height**: 120%
- **Padding**: 8px (small), 12px (medium), 16px (large)
- **Gap**: 8px (small), 12px (medium), 16px (large)

## Examples

See the Storybook stories for complete examples:

- `Menu2.stories.tsx` - Component examples
- `Menu2Demo.stories.tsx` - Interactive demo

## Browser Support

The Menu2 component supports all modern browsers:

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT
