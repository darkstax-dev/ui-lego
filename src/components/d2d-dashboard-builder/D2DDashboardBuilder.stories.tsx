import type { Meta, StoryObj } from '@storybook/react'
import D2DDashboardBuilder from './D2DDashboardBuilder'
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
      chartHeight: '400',
      tableHeight: '300',
      tableColumnWidth: '150',
      defaultTablePageSize: '10',
      position: { x: 20, y: 20 }
    },
    {
      id: 'card-2',
      title: 'Select Notebook Cell',
      notebookCell: 'cell2',
      chartHeight: '500',
      tableHeight: '400',
      tableColumnWidth: '200',
      defaultTablePageSize: '20',
      position: { x: 380, y: 20 }
    },
    {
      id: 'card-3',
      title: 'Select Notebook Cell',
      notebookCell: '',
      chartHeight: '',
      tableHeight: '',
      tableColumnWidth: '',
      defaultTablePageSize: '',
      position: { x: 20, y: 500 }
    },
    {
      id: 'card-4',
      title: 'Select Notebook Cell',
      notebookCell: 'cell3',
      chartHeight: '600',
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
          chartHeight: '400',
          tableHeight: '300',
          tableColumnWidth: '150',
          defaultTablePageSize: '10',
          cardWidth: '25',  // 25% of screen width
          cardHeight: '40', // 40% of screen height
          position: { x: 20, y: 20 }
        },
        {
          id: 'card-2',
          title: 'Select Notebook Cell',
          notebookCell: 'cell2',
          chartHeight: '500',
          tableHeight: '400',
          tableColumnWidth: '200',
          defaultTablePageSize: '20',
          cardWidth: '35',  // 35% of screen width
          cardHeight: '50', // 50% of screen height
          position: { x: 450, y: 20 }
        },
        {
          id: 'card-3',
          title: 'Select Notebook Cell',
          notebookCell: '',
          chartHeight: '',
          tableHeight: '',
          tableColumnWidth: '',
          defaultTablePageSize: '',
          cardWidth: '30',  // 30% of screen width
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
          chartHeight: '400',
          tableHeight: '300',
          tableColumnWidth: '150',
          defaultTablePageSize: '10',
          position: { x: 20, y: 20 }
        },
        {
          id: 'card-2',
          title: 'Select Notebook Cell',
          notebookCell: 'cell2',
          chartHeight: '500',
          tableHeight: '400',
          tableColumnWidth: '200',
          defaultTablePageSize: '20',
          position: { x: 100, y: 100 }
        },
        {
          id: 'card-3',
          title: 'Select Notebook Cell',
          notebookCell: '',
          chartHeight: '',
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
