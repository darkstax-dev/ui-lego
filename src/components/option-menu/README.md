# OptionBar Component

A dropdown menu component for scenario actions in the Scenario Listing module.

## Features

- 10 predefined action items (Open, Version History, Edit, etc.)
- Highlighted variant for important actions (Deploy)
- Danger variant for destructive actions (Delete)
- Fully keyboard accessible
- Responsive design
- Dark mode support
- Follows design system tokens

## Usage

```tsx
import { OptionBar } from './components/scenario-listing/option-bar'

function MyComponent() {
  return (
    <OptionBar
      onOpen={() => console.log('Open')}
      onVersionHistory={() => console.log('Version History')}
      onEdit={() => console.log('Edit')}
      onScenarioAccessibility={() => console.log('Scenario Accessibility')}
      onScenarioNodes={() => console.log('Scenario Nodes')}
      onDeploy={() => console.log('Deploy')}
      onRun={() => console.log('Run')}
      onDeleteNamespace={() => console.log('Delete Namespace')}
      onDelete={() => console.log('Delete')}
    />
  )
}
```

## Props

| Prop | Type | Description |
|------|------|-------------|
| `onOpen` | `() => void` | Callback when "Open" is clicked |
| `onVersionHistory` | `() => void` | Callback when "Version history" is clicked |
| `onEdit` | `() => void` | Callback when "Edit" is clicked |
| `onScenarioAccessibility` | `() => void` | Callback when "Scenario accessibility" is clicked |
| `onScenarioNodes` | `() => void` | Callback when "Scenario nodes" is clicked |
| `onDeploy` | `() => void` | Callback when "Deploy" is clicked |
| `onRun` | `() => void` | Callback when "Run" is clicked |
| `onDeleteNamespace` | `() => void` | Callback when "Delete namespace" is clicked |
| `onDelete` | `() => void` | Callback when "Delete" is clicked |
| `items` | `OptionBarItem[]` | Custom items (optional, overrides default items) |
| `className` | `string` | Additional CSS classes |

## Custom Items

You can provide custom items using the `items` prop:

```tsx
const customItems: OptionBarItem[] = [
  {
    id: 'custom-action',
    label: 'Custom Action',
    icon: <MyIcon />,
    onClick: () => console.log('Custom'),
    variant: 'default'
  }
]

<OptionBar items={customItems} />
```

## Icons

The following system icons were added for this component:

- `Timer2Line` - Version history icon
- `EditLine` - Edit icon
- `ShieldLine` - Security/accessibility icon
- `Shape2Line` - Nodes icon
- `InboxUnarchiveFill` - Deploy icon
- `PlayCircleLine` - Run icon
- `DeleteBack2Line` - Delete namespace icon
- `DeleteBin7Line` - Delete icon

All icons are available in `src/components/icons/system/`.

## Styling

The component uses CSS custom properties from the design token system:

- `--color-blue-dark-950` - Background color
- `--color-blue-950` - Highlighted item background
- `--color-red-500` - Danger text color
- `--font-family-macan` - Font family
- `--sds-size-space-300` - Padding/spacing

## Accessibility

- Full keyboard navigation support (Enter and Space keys)
- ARIA attributes for screen readers
- Focus visible states
- High contrast mode support
- Reduced motion support

## Design Alignment

The component follows the Figma design specifications:
- 220px width
- 12px padding for items
- 18x18px icons
- White text on dark blue background
- Highlighted state for "Deploy" action
- Red color for "Delete" action
- Dashed divider line before delete
