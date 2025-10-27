export type Priority = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | 'NORMAL' | 'DONE' | 'BLOCKED' | 'WAITING' | 'ARCHIVED'

export interface Attachment {
  id: string
  name: string
  type: 'JSON' | 'YAML' | 'PDF' | 'TXT' | 'IMG'
  date: string
}

export interface CardMeta {
  agentName?: string
  agentRole?: string
  assignee?: string
  createdAt?: string
  dueDate?: string
  closeDate?: string
  customer?: string
}

export interface KanbanCardData {
  id: string
  title: string
  statusChips?: string[]
  priority?: Priority
  comment?: string
  meta?: CardMeta
  attachments?: Attachment[]
}

export interface KanbanColumnData {
  id: string
  title: string
  cards: KanbanCardData[]
}

export interface KanbanBoardData {
  columns: KanbanColumnData[]
}
