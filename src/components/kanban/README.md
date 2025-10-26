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
