export interface DashboardCard {
    id: string
    title: string
    cardType?: 'data' | 'text'  // 'data' for notebook cells, 'text' for rich content
    notebookCell: string
    tableHeight: string
    tableColumnWidth: string
    defaultTablePageSize: string
    hyperlink?: string
    cardWidth?: number  // Grid units: 1-4 (1=25%, 2=50%, 3=75%, 4=100%)
    cardHeight?: number // Grid units: 1-4 (1=25%, 2=50%, 3=75%, 4=100%)
    textContent?: string  // For text cards
    position: {
      x: number
      y: number
    }
  }
  
  export interface DashboardBuilderData {
    cards: DashboardCard[]
}