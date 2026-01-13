import type { Meta, StoryObj } from '@storybook/react'
import D2DDashboardBuilder from './DashboardBuilder'
import type { DashboardBuilderData } from './types'

const meta: Meta<typeof D2DDashboardBuilder> = {
  title: 'Components/D2DDashboardBuilder',
  component: D2DDashboardBuilder,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof D2DDashboardBuilder>

const sampleData: DashboardBuilderData = {
  cards: [
    {
      id: 'card-1',
      title: 'Select Notebook Cell',
      notebookCell: 'cell1',
      tableHeight: '300',
      tableColumnWidth: '150',
      defaultTablePageSize: '10',
      position: { x: 20, y: 20 }
    },
    {
      id: 'card-2',
      title: 'Select Notebook Cell',
      notebookCell: 'cell2',
      tableHeight: '400',
      tableColumnWidth: '200',
      defaultTablePageSize: '20',
      position: { x: 380, y: 20 }
    },
    {
      id: 'card-3',
      title: 'Select Notebook Cell',
      notebookCell: '',
      tableHeight: '',
      tableColumnWidth: '',
      defaultTablePageSize: '',
      position: { x: 20, y: 500 }
    },
    {
      id: 'card-4',
      title: 'Select Notebook Cell',
      notebookCell: 'cell3',
      tableHeight: '500',
      tableColumnWidth: '180',
      defaultTablePageSize: '15',
      position: { x: 380, y: 500 }
    },
  ],
}

export const Default: Story = {
  args: {
    data: sampleData,
    showHeader: true,
    headerTitle: 'D2D Dashboard Builder',
  },
}

export const WithoutHeader: Story = {
  args: {
    data: sampleData,
    showHeader: false,
  },
}

export const CustomTitle: Story = {
  args: {
    data: sampleData,
    showHeader: true,
    headerTitle: 'My Custom Dashboard Builder',
  },
}

export const Empty: Story = {
  args: {
    data: {
      cards: [],
    },
    showHeader: true,
    headerTitle: 'D2D Dashboard Builder',
  },
}

export const WithCustomSizes: Story = {
  args: {
    data: {
      cards: [
        {
          id: 'card-1',
          title: 'Select Notebook Cell',
          notebookCell: 'cell1',
          tableHeight: '300',
          tableColumnWidth: '150',
          defaultTablePageSize: '10',
          cardWidth: 1,  // Grid unit 1 = 25% of screen width
          cardHeight: 2, // Grid unit 2 = 50% of screen height
          position: { x: 20, y: 20 }
        },
        {
          id: 'card-2',
          title: 'Select Notebook Cell',
          notebookCell: 'cell2',
          tableHeight: '400',
          tableColumnWidth: '200',
          defaultTablePageSize: '20',
          cardWidth: 2,  // Grid unit 2 = 50% of screen width
          cardHeight: 2, // Grid unit 2 = 50% of screen height
          position: { x: 450, y: 20 }
        },
        {
          id: 'card-3',
          title: 'Select Notebook Cell',
          notebookCell: '',
          tableHeight: '',
          tableColumnWidth: '',
          defaultTablePageSize: '',
          cardWidth: 2,  // Grid unit 2 = 50% of screen width
          position: { x: 20, y: 500 }
        },
      ],
    },
    showHeader: true,
    headerTitle: 'D2D Dashboard Builder - Viewport-Based Sizing',
  },
}

export const WithAutoLayout: Story = {
  args: {
    data: {
      cards: [
        {
          id: 'card-1',
          title: 'Select Notebook Cell',
          notebookCell: 'cell1',
          tableHeight: '300',
          tableColumnWidth: '150',
          defaultTablePageSize: '10',
          position: { x: 20, y: 20 }
        },
        {
          id: 'card-2',
          title: 'Select Notebook Cell',
          notebookCell: 'cell2',
          tableHeight: '400',
          tableColumnWidth: '200',
          defaultTablePageSize: '20',
          position: { x: 100, y: 100 }
        },
        {
          id: 'card-3',
          title: 'Select Notebook Cell',
          notebookCell: '',
          tableHeight: '',
          tableColumnWidth: '',
          defaultTablePageSize: '',
          position: { x: 150, y: 150 }
        },
      ],
    },
    showHeader: true,
    headerTitle: 'D2D Dashboard Builder - Auto Layout Enabled',
    enableAutoLayout: true,
    cardSpacing: 20,
  },
}

export const Interactive: Story = {
  args: {
    data: sampleData,
    showHeader: true,
    headerTitle: 'D2D Dashboard Builder',
    enableAutoLayout: true,
    cardSpacing: 20,
    onCardClick: (card) => {
      console.log('Card clicked:', card)
    },
    onCardUpdate: (card) => {
      console.log('Card updated:', card)
    },
    onCardDelete: (card) => {
      console.log('Card deleted:', card)
    },
    onCardAdd: () => {
      console.log('Add card clicked')
    },
  },
}
