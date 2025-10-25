import type { Meta, StoryObj } from '@storybook/react-vite'
import KanbanBoard from './KanbanBoard'
import { mockKanbanData } from './mockData'
import { userEvent, within, screen, waitFor, expect, fireEvent } from '@storybook/test'

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
    },
    onRenameColumn: (columnId) => console.log('Rename column:', columnId),
    onArchiveColumn: (columnId) => console.log('Archive column:', columnId),
    onDeleteColumn: (columnId) => console.log('Delete column:', columnId),
    onOpenTask: (card) => console.log('Open task:', card.title),
    onEditCardName: (card) => console.log('Edit card name:', card.title),
    onMoveCard: (card) => console.log('Move card:', card.title),
    onDeleteCard: (card) => console.log('Delete card:', card.title),
  },
  play: async () => {
    await userEvent.click(screen.getByText('Design Login Screen'))
    const dialog = await screen.findByRole('dialog')
    await expect(dialog).toBeInTheDocument()
    await userEvent.click(screen.getByRole('button', { name: /close drawer/i }))
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument())
  }
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    const sourceCardTitle = 'Design Login Screen'
    const sourceEl = canvas.getByText(sourceCardTitle)
    const sourceCard = sourceEl.closest('.kanban-card') as HTMLElement

    const targetColumnTitle = canvas.getByText('In Progress')
    const targetColumn = targetColumnTitle.closest('.kanban-column') as HTMLElement

    const dataTransfer = new DataTransfer()

    fireEvent.dragStart(sourceCard, { dataTransfer })
    fireEvent.dragOver(targetColumn, { dataTransfer })
    fireEvent.drop(targetColumn, { dataTransfer })
    fireEvent.dragEnd(sourceCard)

    await waitFor(() => {
      const inTarget = targetColumn.querySelector('.kanban-column-cards') as HTMLElement
      expect(within(inTarget).getByText(sourceCardTitle)).toBeInTheDocument()
    })
  }
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByPlaceholderText('Search') as HTMLInputElement

    await userEvent.type(input, 'API')

    await waitFor(() => {
      expect(canvas.queryByText('Design Login Screen')).not.toBeInTheDocument()
      expect(canvas.getByText('API Endpoint Spec — Orders')).toBeInTheDocument()
    })

    await userEvent.clear(input)
    await waitFor(() => {
      expect(canvas.getByText('Design Login Screen')).toBeInTheDocument()
    })
  }
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
