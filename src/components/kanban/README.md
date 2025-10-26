# Kanban Board – Integration Guide

This guide explains how to add the Kanban Board to a new UI page or layout.

## 1) Install and import

The component is already part of this library and exposed from the root index.

```tsx
import { KanbanBoard, mockKanbanData, type KanbanBoardProps } from 'ui-lego'
```

## 2) Ensure design tokens and fonts are loaded

Kanban styles rely on CSS variables and fonts defined in `src/tokens.css` and the font files under `public/fonts`.

- Include tokens once globally (e.g., in your app root):
  
  ```ts
  import '../src/tokens.css'
  ```

- Make sure `public/fonts/*` is served at `/fonts/*` (this repo already includes them).

## 3) Minimal usage

```tsx
import { KanbanBoard, mockKanbanData } from 'ui-lego'

export default function Page() {
  return (
    <div style={{ padding: 16 }}>
      <KanbanBoard data={mockKanbanData} />
    </div>
  )
}
```

## 4) Data shape

```ts
export interface KanbanCard {
  id: string
  title: string
  status: 'User Action Required' | 'Customer Action Required' | 'Agents Active' | 'Blocked' | 'Waiting' | 'Review' | 'Done' | 'Archived'
  agentName: string
  agentRole: string
  created: string
  dueDate?: string
  closeDate?: string
  priority: 'High' | 'Medium' | 'Normal' | 'Low'
  agentComment: string
  customer: string
  attachments?: { id: string; fileName: string; fileType: 'json' | 'xls' | 'pdf' | 'yml'; timestamp: string }[]
  assignee?: { name: string; avatar: string }
  checklist?: { id: string; text: string; done?: boolean }[]
  taskLog?: { id: string; eventType: 'Lock' | 'Unlock'; eventBy: string; eventDatetime: string }[]
}

export interface KanbanColumn {
  id: string
  title: string
  cards: KanbanCard[]
}

export interface KanbanBoardData {
  columns: KanbanColumn[]
}
```

A ready-to-use dataset is exported as `mockKanbanData` for demos.

## 5) Props and callbacks

```ts
interface KanbanBoardProps {
  data: KanbanBoardData
  showHeader?: boolean
  headerTitle?: string

  onCardClick?: (card: KanbanCard) => void
  onCardMove?: (cardId: string, fromColumnId: string, toColumnId: string) => void
  onSearchChange?: (value: string) => void
  onSettingsClick?: () => void
  onFilterClick?: () => void

  onRenameColumn?: (columnId: string) => void
  onArchiveColumn?: (columnId: string) => void
  onDeleteColumn?: (columnId: string) => void
  onOpenTask?: (card: KanbanCard) => void
  onEditCardName?: (card: KanbanCard) => void
  onMoveCard?: (card: KanbanCard) => void
  onDeleteCard?: (card: KanbanCard) => void

  // Task Drawer customization
  taskSchema?: JSONSchemaRoot
  descriptionRule?: DescriptionRule
}
```

## 6) Drag & Drop and persistence

Drag-and-drop is built-in. To persist moves, listen to `onCardMove` and update your store or call an API:

```tsx
import { useState, useMemo } from 'react'
import { KanbanBoard, type KanbanBoardData } from 'ui-lego'

function moveCard(data: KanbanBoardData, cardId: string, fromId: string, toId: string): KanbanBoardData {
  const card = data.columns.flatMap(c => c.cards).find(c => c.id === cardId)
  if (!card || fromId === toId) return data
  return {
    columns: data.columns.map(col => {
      if (col.id === fromId) return { ...col, cards: col.cards.filter(c => c.id !== cardId) }
      if (col.id === toId) return { ...col, cards: [...col.cards, card] }
      return col
    })
  }
}

export default function PersistedBoard({ initial }: { initial: KanbanBoardData }) {
  const [state, setState] = useState<KanbanBoardData>(initial)

  return (
    <KanbanBoard
      data={state}
      onCardMove={(cardId, from, to) => {
        setState(prev => moveCard(prev, cardId, from, to))
        // await fetch('/api/kanban/move', { method: 'POST', body: JSON.stringify({ cardId, from, to }) })
      }}
    />
  )
}
```

Note: The component manages its own internal board state after mount. If you need to fully control state from the outside, render it with a `key` that changes when your `data` changes so it re-initializes:

```tsx
<KanbanBoard key={JSON.stringify(externalData.columns.map(c => [c.id, c.cards.map(x => x.id)]))} data={externalData} />
```

## 7) Header and search

Enable the header and wire the search/filter/settings actions:

```tsx
<KanbanBoard
  data={mockKanbanData}
  showHeader
  headerTitle="Workboard"
  onSearchChange={v => console.log('search:', v)}
  onSettingsClick={() => console.log('settings')}
  onFilterClick={() => console.log('filter')}
/>
```

## 8) Task Drawer customization (form schema)

You can override the default task form inside the drawer via `taskSchema` and `descriptionRule`.

```tsx
import type { JSONSchemaRoot, DescriptionRule } from 'ui-lego/components/schema/SchemaTypes' // same types re-used by Kanban

const customSchema: JSONSchemaRoot = {
  type: 'object',
  order: ['title', 'status', 'priority', 'assignee', 'customer', 'agentComment'],
  properties: {
    title: { type: 'string', title: 'Title', ui: { widget: 'text' } },
    status: { type: 'string', title: 'Status', enum: ['Done', 'Review', 'Blocked'], ui: { widget: 'select' } },
    priority: { type: 'string', title: 'Priority', enum: ['High', 'Medium', 'Low'], ui: { widget: 'badge' } },
    assignee: { type: 'string', title: 'Assignee', ui: { widget: 'text' } },
    customer: { type: 'string', title: 'Customer' },
    agentComment: { type: 'string', title: 'Agent Comment', ui: { widget: 'textarea' } }
  },
  layout: {
    headerFields: { status: 'status', priority: 'priority' },
    assigneeField: 'assignee',
    customerField: 'customer',
    productField: 'agentRole',
    sections: [
      { title: 'Comment', field: 'agentComment', type: 'textarea' }
    ]
  }
}

const rule: DescriptionRule = { template: '$(title) — $(customer)' }

<KanbanBoard data={mockKanbanData} taskSchema={customSchema} descriptionRule={rule} />
```

## 9) Styling and overrides

- All DOM nodes are classed (e.g., `.kanban-board`, `.kanban-column`, `.kanban-card`, header/menu classes) so you can add local overrides.
- Prefer theming by overriding CSS variables defined in `tokens.css` (e.g., `--text-blue-main`, `--surface-card`, `--divider-light`).

Example override:

```css
/* app.css */
:root {
  --surface-card: #f7f7f8;
  --divider-light: #ddd;
}
.kanban-card:hover { box-shadow: 0 24px 48px -12px rgba(0,0,0,0.25); }
```

## 10) Accessibility

- Cards are draggable and respond to pointer events; ensure sufficient color contrast in your theme.
- Header controls are regular buttons/inputs and inherit global focus styles.

## 11) Testing and Storybook

- Explore interactive stories under `Components/Kanban/KanbanBoard`:
  - Default
  - With Drag And Drop
  - With Header And Search
  - Without Header
  - Single/Two Columns
  - Empty Board

These demonstrate the import surface and expected interactions end-to-end.

---

## 12) Design system and CSS tokens used by Kanban

Kanban consumes the design tokens from `src/tokens.css`. Key groups you can override globally:

- Surfaces: `--surface-default`, `--surface-card`, `--surface-subtle`, `--border-subtle`
- Text: `--text-blue-main`, `--text-gray-main`, `--text-white-main` and their secondary/tertiary variants
- Dividers and outlines: `--divider-light`, `--divider-dark`, `--sds-size-stroke-border`
- Spacing and radius: `--sds-size-space-*`, `--sds-size-radius-*`
- Typography: `--font-family-macan*`, `--font-weight-*`, `--font-size-*`, `--line-height-*`, `--letter-spacing-*`
- Brand and semantic colors used in statuses and badges: `--color-red-*`, `--color-blue-*`, `--color-green-*`, `--color-yellow-*`, `--color-gray-*`

Dark mode is supported via media query overrides in `tokens.css` and can be forced by applying `[data-theme="dark"]` on a wrapper.

## 13) CSS entry points and class reference

Files:
- `src/components/kanban/KanbanBoard.css` (container + scrollers)
- `src/components/kanban/KanbanHeader.css` (header/search/actions)
- `src/components/kanban/KanbanColumn.css` (columns + scroll)
- `src/components/kanban/KanbanCard.css` (cards, status, priority, attachments)
- `src/components/kanban/KanbanCardMenu.css`, `KanbanColumnMenu.css` (dropdown menus)
- `src/components/kanban/TaskDrawer.css` (task drawer content + form)
- `src/components/drawer/Drawer.css` (generic drawer shell used by Task Drawer)

Important classes you can target:
- Board: `.kanban-board-container`, `.kanban-board`, `.kanban-board-columns`
- Header: `.kanban-header`, `.kanban-header-title`, `.kanban-header-search`, `.kanban-header-actions`
- Column: `.kanban-column`, `.kanban-column-header`, `.kanban-column-title`, `.kanban-column-cards`, `.kanban-column-drag-over`
- Card: `.kanban-card`, `.kanban-card-header`, `.kanban-card-title`, `.kanban-card-meta*`, `.kanban-card-menu`
- Card status modifiers: `.status-user-action`, `.status-customer-action`, `.status-agents-active`, `.status-blocked`, `.status-waiting`, `.status-review`, `.status-done`, `.status-archived`
- Card priority modifiers: `.priority-high`, `.priority-medium`, `.priority-normal`, `.priority-low`
- Menus: `.kanban-card-menu-container .dropdown*`, `.kanban-column-menu-container .dropdown*`

## 14) Status and Priority theming hooks

`KanbanCard.tsx` maps business enums to CSS classes. You can retheme status/priority without touching TS by overriding the classes:

```css
/* Status flag + text backgrounds and colors */
.status-user-action .status-flag { background: color-mix(in srgb, var(--color-red-500) 20%, transparent); }
.status-user-action .status-text { background: color-mix(in srgb, var(--color-red-500) 20%, transparent); color: var(--color-red-500); }
/* Repeat for other statuses or point to your tokens */

/* Priority badges */
.priority-high   { background: color-mix(in srgb, var(--color-yellow-500) 20%, transparent); color: var(--color-yellow-500); }
.priority-medium { background: color-mix(in srgb, var(--color-blue-800) 20%, transparent);   color: var(--color-blue-800); }
```

If you add a new status/priority, extend the enum in `src/components/kanban/types.ts` and the mapping in `KanbanCard.tsx` to a new class, then define its CSS.

## 15) Drawer shell (Task Drawer container)

`TaskDrawer.tsx` uses the generic `Drawer` component from `src/components/drawer/Drawer.tsx` with `appearance="light"` and `size={DrawerSize.LARGE}`.

Drawer styling hooks (`src/components/drawer/Drawer.css`):
- Overlay: `.drawer-overlay` (backdrop color `--sds-color-background-utilities-overlay`)
- Panel: `.drawer-panel`, light variant `.drawer-panel--light`
- Positions: `.drawer-panel--right|left|top|bottom`
- Title and header: `.drawer-header`, `.drawer-title`, `.drawer-close-button`
- Content: `.drawer-content`

Tokens used by the light variant: `--sds-color-background-default-default`, `--Divider-Light`, `--Text-Blue-text-Main-text`, plus spacing tokens like `--sds-size-space-*`.

You can globally retheme the drawer by overriding those tokens, or locally by scoping overrides under a wrapper and targeting the classes above.

## 16) Task Drawer content and form styling

`src/components/kanban/TaskDrawer.css` provides detailed hooks:
- Tabs: `.taskdrawer-tabs`, `.taskdrawer-tab`, active `.taskdrawer-tab.is-active`
- Sections and titles: `.taskdrawer-section`, `.section-title`, `.section-title.with-count`, `.count-dot`
- Info blocks: `.info-card`, `.info-grid`, `.info-item`, `.info-label`, `.info-value`, `.info-assignee`, `.assignee-chip`
- Status/priority badges (view mode): `.badge-status` with modifiers `.status-user|.status-customer|.status-agents|.status-blocked|.status-waiting|.status-review|.status-done|.status-archived`; `.badge-priority` with modifiers `.prio-high|.prio-medium|.prio-normal|.prio-low`
- Free text and lists: `.text-panel`, `.checklist`, `.checklist-item`, `.attachments`, `.attachment-row`, `.file-icon`, `.file-name`
- Log table: `.taskdrawer-log-container`, `.task-log-*` (header/body/row/cell/pagination)
- Form (edit/create): `.taskdrawer-form`, `.form-field`, `.form-label`, `.form-input`, `.form-textarea`, `.form-select`, `.form-date-input`, `.form-file-upload`, `.save-task-button`

All of the above consume design tokens from `tokens.css` (spacing, colors, fonts). To align with your product palette, override variables like:

```css
:root {
  --Inputs-Input-Background: #f7f7f9;
  --Text-Blue-text-Main-text: #0d1321;
  --Divider-Light: #e5e7eb;
  --Primary-button-red-Fill: #d92c2c;
}
```

## 17) Header, search, and actions styling hooks

`src/components/kanban/KanbanHeader.css` uses:
- Search input container: `.kanban-header-search .search-field__*`
- Action buttons: `.kanban-header-actions .icon-button[--gray|--selected]`
- Tokens: `--surface-card`, `--text-gray-main`, `--nav-main-bg` for hover/selected states

Override these for branding or to integrate with an existing button/input set.

## 18) Responsive behavior

- Columns are min/max constrained (`min-width: 340px`, `max-width: 400px`) and horizontally scrollable.
- Column/card lists customize scrollbars via `::-webkit-scrollbar*` rules and tokens.
- Header stacks below 768px, and spacings shrink further below 480px.
- Drawer reduces paddings under 640px.

Adjust breakpoints by editing the media queries in the respective CSS files if needed.

## 19) Theming recipes

Global theme via tokens:

```css
/* Light theme defaults */
:root {
  --surface-default: #f6f7fb;
  --surface-card: #ffffff;
  --text-blue-main: #0f172a; /* slate-900 */
  --text-gray-main: #6b7280; /* gray-500 */
  --divider-light: #e5e7eb;
}

/* Dark theme override via data attribute */
[data-theme="dark"] {
  --surface-default: #0b1220;
  --surface-card: #0f172a;
  --text-blue-main: #e5e7eb;
  --text-gray-main: #9ca3af;
  --divider-light: #1f2937;
}
```

Local overrides (scoped to a page/section):

```css
.page-kanban .kanban-card { border: 1px solid var(--divider-light); border-radius: 0; }
.page-kanban .kanban-column-header { box-shadow: none; border: 1px solid var(--divider-light); }
.page-kanban .drawer-panel--light { box-shadow: 0 24px 64px rgba(0,0,0,.24); }
```

## 20) Extending the Kanban design

- New card fields: Update `src/components/kanban/types.ts`, render in `KanbanCard.tsx`, and add corresponding CSS classes.
- New column visuals: Extend `KanbanColumn.css` and reuse tokens for spacing/typography.
- New statuses/priorities: Add to enums + mapping in `KanbanCard.tsx`, define class styles.
- Drawer variants: Use `appearance` and `size` from `Drawer` or add new modifier classes and styles under `Drawer.css`.

By centralizing colors, spacing, fonts, and states in `tokens.css`, you can keep rebrands and theme switches low-effort while maintaining consistent visuals across the board, menus, and task drawers.
