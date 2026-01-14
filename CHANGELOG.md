# Changelog

All notable changes to this project will be documented in this file.

## 1.2.0 - TBD

### Added
- **Menu2.0 Component**: New menu component based on latest Figma design specifications
  - `Menu2`: Container component with keyboard navigation and accessibility features
  - `MenuItem2`: Menu item with multiple variants (default, hover, danger) and sizes (small, medium, large)
  - Built-in arrow icon support for expandable menu items
  - Full keyboard navigation (Arrow keys, Enter, Space, Escape)
  - WAI-ARIA compliant with proper roles and attributes
  - Responsive design for mobile, tablet, and desktop
  - Comprehensive Storybook stories and interactive demo
  - Complete documentation in `MENU2_README.md`

### Design System
- Implemented Figma design tokens for Menu2.0:
  - Background colors: `#ECECEC` (default), `#CECECE` (hover)
  - Text colors: `#00112B` (default), `#FF3B31` (danger)
  - Typography: Macan font, 450 weight, 120% line-height
  - Spacing: 8px padding and gap (small size)

## 1.1.0 - 2025-09-20

- Accessibility: Added Escape/focus trap for Modal; keyboard navigation and roles for Menu/Dropdown; roving tabindex and arrow navigation for Tabs; improved focus-visible styles across components
- Tokens/Theming: Introduced semantic tokens (surfaces, borders, body text); extracted all inline styles in src/dev.tsx to token-based classes; ensured dark-mode parity for new tokens
- API/Architecture: Standardized size/variant/state for Button/IconButton; added forwardRef and asChild polymorphism via Slot utility; improved className override patterns
- Primitives: Enabled composition via Slot (asChild) for Button, IconButton, MenuItem, DropdownItem
- Tooling/Quality: Added ESLint config; GitHub Actions CI (typecheck/lint/build); Storybook configured with a11y/controls
- Performance: Wrapped core primitives with React.memo for better rendering performance
