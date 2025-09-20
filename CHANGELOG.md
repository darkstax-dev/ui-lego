# Changelog

All notable changes to this project will be documented in this file.

## 1.1.0 - 2025-09-20

- Accessibility: Added Escape/focus trap for Modal; keyboard navigation and roles for Menu/Dropdown; roving tabindex and arrow navigation for Tabs; improved focus-visible styles across components
- Tokens/Theming: Introduced semantic tokens (surfaces, borders, body text); extracted all inline styles in src/dev.tsx to token-based classes; ensured dark-mode parity for new tokens
- API/Architecture: Standardized size/variant/state for Button/IconButton; added forwardRef and asChild polymorphism via Slot utility; improved className override patterns
- Primitives: Enabled composition via Slot (asChild) for Button, IconButton, MenuItem, DropdownItem
- Tooling/Quality: Added ESLint config; GitHub Actions CI (typecheck/lint/build); Storybook configured with a11y/controls
- Performance: Wrapped core primitives with React.memo for better rendering performance
