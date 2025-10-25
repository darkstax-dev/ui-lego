export type Priority = 'High' | 'Medium' | 'Normal' | 'Low'

export type Status = 
  | 'User Action Required'
  | 'Customer Action Required'
  | 'Agents Active'
  | 'Blocked'
  | 'Waiting'
  | 'Review'
  | 'Done'
  | 'Archived'

export interface Attachment {
  id: string
  fileName: string
  fileType: 'json' | 'xls' | 'pdf' | 'yml'
  timestamp: string
}

export interface ChecklistItem {
  id: string
  text: string
  done?: boolean
}

export interface TaskLogEvent {
  id: string
  eventType: 'Lock' | 'Unlock'
  eventBy: string
  eventDatetime: string
}

export interface KanbanCard {
  id: string
  title: string
  status: Status
  agentName: string
  agentRole: string
  created: string
  dueDate?: string
  closeDate?: string
  priority: Priority
  agentComment: string
  customer: string
  attachments?: Attachment[]
  assignee?: {
    name: string
    avatar: string
  }
  checklist?: ChecklistItem[]
  taskLog?: TaskLogEvent[]
}

export interface KanbanColumn {
  id: string
  title: string
  cards: KanbanCard[]
}

export interface KanbanBoardData {
  columns: KanbanColumn[]
}
