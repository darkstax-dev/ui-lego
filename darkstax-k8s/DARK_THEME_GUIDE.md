# Dark Theme Implementation Guide

## Overview

The darkstax-k8s application now supports a complete dark theme implementation based on the Figma design. The theme system is built as a reusable library that can be easily integrated into other projects.

## Features

- **Automatic Theme Detection**: Respects system preference (light/dark)
- **Manual Theme Toggle**: Users can override system preference
- **Persistent Preference**: Theme choice is saved in localStorage
- **Smooth Transitions**: Theme changes animate smoothly
- **CSS Variable Based**: All colors use CSS variables for easy theming

## Architecture

### 1. Token System (`tokens.css`)

All colors and design tokens are centralized in `tokens.css`:

```css
:root {
  /* Base color palette */
  --color-blue-dark-950: #00112b;
  --color-gray-300: #cecece;
  /* ... more colors */
  
  /* Semantic tokens */
  --surface-default: var(--color-gray-300);
  --text-blue-main: var(--color-blue-dark-950);
  /* ... more semantic tokens */
  
  /* Status colors */
  --status-ready: #ebebeb;
  --status-active: #2b9952;
  /* ... more status colors */
}

/* Dark mode overrides */
@media (prefers-color-scheme: dark) {
  :root {
    --surface-default: var(--color-blue-medium-950);
    --text-blue-main: var(--color-gray-200);
    /* ... */
  }
}

/* Manual dark mode class */
[data-theme="dark"] {
  /* Same as @media dark mode */
}
```

### 2. Tailwind Integration

Tailwind is configured to use CSS variables instead of hardcoded colors:

```javascript
// tailwind.config.js
colors: {
  'blue-dark-950': 'var(--color-blue-dark-950)',
  'surface-default': 'var(--surface-default)',
  'text-primary': 'var(--text-blue-main)',
  // ... more color mappings
}
```

This allows Tailwind classes like `bg-surface-default` and `text-primary` to automatically respond to theme changes.

### 3. Theme Hook (`useTheme`)

A custom React hook manages theme state and applies it to the DOM:

```typescript
const { theme, resolvedTheme, setTheme, toggleTheme } = useTheme();

// theme: 'light' | 'dark' | 'system'
// resolvedTheme: 'light' | 'dark' (actual applied theme)
```

The hook:
- Reads initial preference from localStorage
- Listens to system preference changes
- Applies `data-theme="dark"` attribute to `document.documentElement`
- Persists theme choice

### 4. Theme Toggle Component

A reusable toggle button cycles through: light → dark → system

```tsx
import { ThemeToggle } from './components/controls/ThemeToggle';

// Use in your header or settings
<ThemeToggle />
```

## Usage Guide

### For Developers

#### 1. Using Theme Colors in Components

**Preferred: Use Tailwind classes**
```tsx
<div className="bg-surface-default text-primary">
  <p className="text-secondary">Secondary text</p>
</div>
```

**Alternative: Use CSS variables directly**
```tsx
<div style={{ backgroundColor: 'var(--surface-card)' }}>
  <span style={{ color: 'var(--text-blue-main)' }}>Text</span>
</div>
```

**For SVG elements**
```tsx
<svg>
  <path fill="var(--status-active)" />
</svg>
```

#### 2. Adding New Theme Colors

Add to both light and dark mode sections in `tokens.css`:

```css
:root {
  --my-new-color: #123456;
}

@media (prefers-color-scheme: dark) {
  :root {
    --my-new-color: #654321;
  }
}

[data-theme="dark"] {
  --my-new-color: #654321;
}
```

Then add to Tailwind config if needed:
```javascript
colors: {
  'my-color': 'var(--my-new-color)',
}
```

#### 3. Migrating Hardcoded Colors

**Before:**
```tsx
<div style={{ backgroundColor: '#CECECE', color: '#00112B' }}>
```

**After:**
```tsx
<div className="bg-surface-default text-primary">
```

Or:
```tsx
<div style={{ backgroundColor: 'var(--surface-default)', color: 'var(--text-blue-main)' }}>
```

### For Users

Click the theme toggle button in the header to cycle through:
1. **Light Theme** (☀️): Always use light colors
2. **Dark Theme** (🌙): Always use dark colors  
3. **System Theme** (🖥️): Follow system preference

Your choice is remembered for future visits.

## Color Palette

### Surface Colors
- `--surface-default`: Main background
- `--surface-card`: Card/panel backgrounds
- `--surface-subtle`: Subtle backgrounds

### Text Colors
- `--text-blue-main`: Primary text
- `--text-blue-secondary`: Secondary text
- `--text-blue-tertiary`: Tertiary text
- `--text-gray-main`: Gray text
- `--text-gray-disabled`: Disabled text

### Status Colors
- `--status-ready`: Not deployed / Ready
- `--status-deploying`: Deploying state
- `--status-active`: Active / Running
- `--status-error`: Error state
- `--status-terminated`: Terminated state

### Navigation
- `--nav-main-bg`: Main navigation background
- `--nav-secondary-bg`: Secondary navigation background

### Dividers
- `--divider-light`: Light divider color
- `--divider-dark`: Dark divider color

## Files Modified

1. **darkstax-k8s/tailwind.config.js** - Mapped colors to CSS variables
2. **darkstax-k8s/tokens.css** - Added status colors and dark mode overrides
3. **darkstax-k8s/src/index.css** - Updated body to use theme-aware background
4. **darkstax-k8s/src/hooks/useTheme.ts** - Created theme management hook
5. **darkstax-k8s/src/App.tsx** - Integrated theme hook
6. **darkstax-k8s/src/components/controls/ThemeToggle.tsx** - Created toggle component
7. **darkstax-k8s/src/components/layout/AppHeader.tsx** - Added theme toggle button
8. **darkstax-k8s/src/components/panels/MetadataPanel.tsx** - Refactored to use CSS variables
9. **darkstax-k8s/src/data/k8sTemplates.ts** - Updated status colors to use CSS variables

## Reusability

This dark theme implementation is designed to be reusable across the darkstax ecosystem:

### To reuse in another project:

1. **Copy the token system:**
   ```bash
   cp darkstax-k8s/tokens.css your-project/
   ```

2. **Import in your CSS:**
   ```css
   @import './tokens.css';
   ```

3. **Copy the theme hook:**
   ```bash
   cp darkstax-k8s/src/hooks/useTheme.ts your-project/src/hooks/
   ```

4. **Copy the theme toggle component:**
   ```bash
   cp darkstax-k8s/src/components/controls/ThemeToggle.tsx your-project/src/components/
   ```

5. **Update your Tailwind config** to reference CSS variables

6. **Initialize in your App:**
   ```tsx
   import { useTheme } from './hooks/useTheme';
   
   function App() {
     useTheme(); // Initialize theme
     return <YourApp />;
   }
   ```

## Browser Support

- Modern browsers with CSS custom properties support
- `prefers-color-scheme` media query support
- localStorage support for persistence

## Future Enhancements

- [ ] Theme preview before applying
- [ ] More theme variants (high contrast, etc.)
- [ ] Per-component theme overrides
- [ ] Export theme as JSON for other platforms
- [ ] Sync theme across tabs

## References

- Figma Design: [Dark Theme Specification]
- CSS Custom Properties: https://developer.mozilla.org/en-US/docs/Web/CSS/--*
- prefers-color-scheme: https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme
