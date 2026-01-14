# Drawer Component Updates

## Summary

Updated the Drawer component to match the new Figma designs and refactored to use existing reusable components from the codebase instead of creating custom implementations.

## Changes Made

### 1. **Drawer Component** (`Drawer.tsx`)
- ✅ Added new header design with expand and fullscreen icons from Figma
- ✅ Added optional `onExpand` and `onFullscreen` callback props
- ✅ Updated default appearance to `'light'` to match Figma design
- ✅ Removed title prop from header (as shown in Figma)
- ✅ Implemented proper SVG icons matching Figma exactly

### 2. **Drawer Styles** (`Drawer.css`)
- ✅ Simplified CSS to remove redundant styles
- ✅ Kept only drawer-specific layout and structure styles
- ✅ Added SwitchField overrides to match Figma design (34x20 toggle size)
- ✅ Fully responsive using flexbox
- ✅ Uses existing CSS variables from design system

### 3. **DrawerExampleContent Component** (`DrawerExampleContent.tsx`)
- ✅ **Recycled existing InputField component** instead of custom inputs
- ✅ **Recycled existing SwitchField component** instead of custom toggles
- ✅ **Created DrawerFileUpload component** based on Figma design (matches exactly)
- ✅ Manages state for form fields and toggles
- ✅ Proper TypeScript types and event handlers

### 4. **DrawerFileUpload Component** (`DrawerFileUpload.tsx` & `DrawerFileUpload.css`)
- ✅ Custom file upload component matching Figma design exactly
- ✅ "Click to upload" as red underlined link
- ✅ "or drag and drop" text in tertiary color
- ✅ Dashed border container matching Figma
- ✅ Drag and drop functionality
- ✅ Accessibility support (keyboard, ARIA labels)

### 5. **Drawer Stories** (`Drawer.stories.tsx`)
- ✅ **Default**: Empty drawer with just the header (no content)
- ✅ **Example Drawer**: Full drawer with all form content from Figma
- ✅ **Positions**: Shows drawer from different sides
- ✅ **Sizes**: Shows different drawer sizes
- ✅ **No Backdrop**: Shows drawer without overlay backdrop
- ✅ All stories use single "Open Drawer" button as requested

## Reused Components

### From `src/components/inputs/`:
1. **InputField** - Used for all 5 form inputs
   - Activity name
   - Node type name
   - Group name
   - Node internal name
   - Display order

2. **SwitchField** - Used for all 3 toggle switches
   - Is Active?
   - Is System Activity
   - Support multi rule

3. **FileUpload** (as base) - Created custom DrawerFileUpload to match Figma exactly

## Key Features

### Accessibility
- ✅ Proper ARIA labels and roles
- ✅ Keyboard navigation support
- ✅ Focus management
- ✅ Focus trapping within drawer
- ✅ ESC key to close

### Responsive Design
- ✅ Mobile: Vertical layout for toggles
- ✅ Tablet: Optimized spacing
- ✅ Desktop: Full layout with horizontal toggles
- ✅ Breakpoints at 480px, 640px, and 768px

### Design System
- ✅ Uses CSS variables from `tokens.css`
- ✅ Macan font family
- ✅ Consistent spacing using `--sds-size-space-*` tokens
- ✅ Color tokens for light theme

## Usage Example

```tsx
import Drawer, { DrawerExampleContent } from './components/drawer'

function MyComponent() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open Drawer</button>
      
      <Drawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        appearance="light"
        onExpand={() => console.log('Expand clicked')}
        onFullscreen={() => console.log('Fullscreen clicked')}
      >
        <DrawerExampleContent />
      </Drawer>
    </>
  )
}
```

## Files Modified

- `src/components/drawer/Drawer.tsx` - Main component
- `src/components/drawer/Drawer.css` - Simplified styles
- `src/components/drawer/DrawerExampleContent.tsx` - Example content using reused components
- `src/components/drawer/DrawerFileUpload.tsx` - NEW: Custom file upload
- `src/components/drawer/DrawerFileUpload.css` - NEW: File upload styles
- `src/components/drawer/Drawer.stories.tsx` - Updated stories
- `src/components/drawer/index.ts` - Updated exports

## Benefits of Refactoring

1. **Code Reuse**: Leverages existing InputField and SwitchField components
2. **Consistency**: Ensures drawer uses same components as rest of app
3. **Maintainability**: Changes to base components automatically apply to drawer
4. **Smaller Bundle**: No duplicate component code
5. **Type Safety**: Proper TypeScript types throughout
6. **Accessibility**: Inherits accessibility features from base components
