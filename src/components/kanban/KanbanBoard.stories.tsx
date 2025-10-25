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

export const Default: Story = {}

export const WithCardClickHandler: Story = {
  args: {
    data: mockKanbanData,
    onCardClick: (card) => {
      console.log('Card clicked:', card)
      alert(`Clicked on: ${card.title}`)
    },
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
  },
}

export const SingleColumn: Story = {
  args: {
    data: {
      columns: [mockKanbanData.columns[0]],
    },
  },
}

export const TwoColumns: Story = {
  args: {
    data: {
      columns: [mockKanbanData.columns[0], mockKanbanData.columns[1]],
    },
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
  },
}
