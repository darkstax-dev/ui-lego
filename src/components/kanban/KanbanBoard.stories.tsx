import type { Meta, StoryObj } from '@storybook/react-vite'
import KanbanBoard from './KanbanBoard'
import { mockKanbanData } from './mockData'

const meta: Meta<typeof KanbanBoard> = {
  title: 'Components/Kanban/KanbanBoard',
  component: KanbanBoard,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    data: mockKanbanData,
  },
}

export default meta
type Story = StoryObj<typeof KanbanBoard>

export const Default: Story = {
  args: {
    onRenameColumn: (columnId) => console.log('Rename column:', columnId),
    onArchiveColumn: (columnId) => console.log('Archive column:', columnId),
    onDeleteColumn: (columnId) => console.log('Delete column:', columnId),
    onOpenTask: (card) => console.log('Open task:', card.title),
    onEditCardName: (card) => console.log('Edit card name:', card.title),
    onMoveCard: (card) => console.log('Move card:', card.title),
    onDeleteCard: (card) => console.log('Delete card:', card.title),
  },
}

export const WithCardClickHandler: Story = {
  args: {
    data: mockKanbanData,
    onCardClick: (card) => {
      console.log('Card clicked:', card)
      alert(`Clicked on: ${card.title}`)
    },
    onRenameColumn: (columnId) => console.log('Rename column:', columnId),
    onArchiveColumn: (columnId) => console.log('Archive column:', columnId),
    onDeleteColumn: (columnId) => console.log('Delete column:', columnId),
    onOpenTask: (card) => console.log('Open task:', card.title),
    onEditCardName: (card) => console.log('Edit card name:', card.title),
    onMoveCard: (card) => console.log('Move card:', card.title),
    onDeleteCard: (card) => console.log('Delete card:', card.title),
  },
}

export const WithDragAndDrop: Story = {
  args: {
    data: mockKanbanData,
    onCardMove: (cardId, fromColumnId, toColumnId) => {
      console.log(`Card ${cardId} moved from ${fromColumnId} to ${toColumnId}`)
    },
    onCardClick: (card) => {
      console.log('Card clicked:', card)
    },
    onRenameColumn: (columnId) => console.log('Rename column:', columnId),
    onArchiveColumn: (columnId) => console.log('Archive column:', columnId),
    onDeleteColumn: (columnId) => console.log('Delete column:', columnId),
    onOpenTask: (card) => console.log('Open task:', card.title),
    onEditCardName: (card) => console.log('Edit card name:', card.title),
    onMoveCard: (card) => console.log('Move card:', card.title),
    onDeleteCard: (card) => console.log('Delete card:', card.title),
  },
}

export const WithHeaderAndSearch: Story = {
  args: {
    data: mockKanbanData,
    showHeader: true,
    onSearchChange: (value) => {
      console.log('Search value:', value)
    },
    onSettingsClick: () => {
      console.log('Settings clicked')
    },
    onFilterClick: () => {
      console.log('Filter clicked')
    },
    onCardMove: (cardId, fromColumnId, toColumnId) => {
      console.log(`Card ${cardId} moved from ${fromColumnId} to ${toColumnId}`)
    },
    onRenameColumn: (columnId) => console.log('Rename column:', columnId),
    onArchiveColumn: (columnId) => console.log('Archive column:', columnId),
    onDeleteColumn: (columnId) => console.log('Delete column:', columnId),
    onOpenTask: (card) => console.log('Open task:', card.title),
    onEditCardName: (card) => console.log('Edit card name:', card.title),
    onMoveCard: (card) => console.log('Move card:', card.title),
    onDeleteCard: (card) => console.log('Delete card:', card.title),
  },
}

export const WithoutHeader: Story = {
  args: {
    data: mockKanbanData,
    showHeader: false,
    onRenameColumn: (columnId) => console.log('Rename column:', columnId),
    onArchiveColumn: (columnId) => console.log('Archive column:', columnId),
    onDeleteColumn: (columnId) => console.log('Delete column:', columnId),
    onOpenTask: (card) => console.log('Open task:', card.title),
    onEditCardName: (card) => console.log('Edit card name:', card.title),
    onMoveCard: (card) => console.log('Move card:', card.title),
    onDeleteCard: (card) => console.log('Delete card:', card.title),
  },
}

export const SingleColumn: Story = {
  args: {
    data: {
      columns: [mockKanbanData.columns[0]],
    },
    onRenameColumn: (columnId) => console.log('Rename column:', columnId),
    onArchiveColumn: (columnId) => console.log('Archive column:', columnId),
    onDeleteColumn: (columnId) => console.log('Delete column:', columnId),
    onOpenTask: (card) => console.log('Open task:', card.title),
    onEditCardName: (card) => console.log('Edit card name:', card.title),
    onMoveCard: (card) => console.log('Move card:', card.title),
    onDeleteCard: (card) => console.log('Delete card:', card.title),
  },
}

export const TwoColumns: Story = {
  args: {
    data: {
      columns: [mockKanbanData.columns[0], mockKanbanData.columns[1]],
    },
    onRenameColumn: (columnId) => console.log('Rename column:', columnId),
    onArchiveColumn: (columnId) => console.log('Archive column:', columnId),
    onDeleteColumn: (columnId) => console.log('Delete column:', columnId),
    onOpenTask: (card) => console.log('Open task:', card.title),
    onEditCardName: (card) => console.log('Edit card name:', card.title),
    onMoveCard: (card) => console.log('Move card:', card.title),
    onDeleteCard: (card) => console.log('Delete card:', card.title),
  },
}

export const EmptyBoard: Story = {
  args: {
    data: {
      columns: [
        {
          id: '1',
          title: 'To Do',
          cards: [],
        },
        {
          id: '2',
          title: 'In Progress',
          cards: [],
        },
        {
          id: '3',
          title: 'Review',
          cards: [],
        },
        {
          id: '4',
          title: 'Done',
          cards: [],
        },
      ],
    },
    onRenameColumn: (columnId) => console.log('Rename column:', columnId),
    onArchiveColumn: (columnId) => console.log('Archive column:', columnId),
    onDeleteColumn: (columnId) => console.log('Delete column:', columnId),
    onOpenTask: (card) => console.log('Open task:', card.title),
    onEditCardName: (card) => console.log('Edit card name:', card.title),
    onMoveCard: (card) => console.log('Move card:', card.title),
    onDeleteCard: (card) => console.log('Delete card:', card.title),
  },
}
