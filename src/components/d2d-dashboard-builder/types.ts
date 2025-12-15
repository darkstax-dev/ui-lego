export interface DashboardCard {
  id: string
  title: string
  notebookCell: string
  chartHeight: string
  tableHeight: string
  tableColumnWidth: string
  defaultTablePageSize: string
  hyperlink?: string
  cardWidth?: string
  cardHeight?: string
  position: {
    x: number
    y: number
  }
}

export interface DashboardBuilderData {
  cards: DashboardCard[]
}