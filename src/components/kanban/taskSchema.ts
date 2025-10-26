import type { JSONSchemaRoot, DescriptionRule } from '../schema/SchemaTypes'

export const defaultTaskSchema: JSONSchemaRoot = {
  type: 'object',
  order: ['title', 'created', 'dueDate', 'status', 'priority', 'assignee', 'customer', 'agentComment', 'attachments', 'checklist'],
  properties: {
    title: { type: 'string', title: 'Title', ui: { widget: 'text' } },
    created: { type: 'string', title: 'Created', ui: { widget: 'text' } },
    dueDate: { type: 'string', title: 'Due date', ui: { widget: 'date' } },
    status: {
      type: 'string',
      title: 'Status',
      enum: [
        'User Action Required',
        'Customer Action Required',
        'Agents Active',
        'Blocked',
        'Waiting',
        'Review',
        'Done',
        'Archived'
      ],
      ui: { widget: 'select' }
    },
    priority: { type: 'string', title: 'Priority', enum: ['High', 'Medium', 'Normal', 'Low'], ui: { widget: 'badge' } },
    assignee: { type: 'string', title: 'Assignee', ui: { widget: 'text' } },
    customer: { type: 'string', title: 'Customer' },
    agentComment: { type: 'string', title: 'Agent Comment', ui: { widget: 'textarea', placeholder: 'Type comment' } },
    attachments: { type: 'array', title: 'Attachments', items: { type: 'string' } },
    checklist: { type: 'array', title: 'Checklist', items: { type: 'string' } },
  },
  layout: {
    headerFields: { created: 'created', dueDate: 'dueDate', status: 'status', priority: 'priority' },
    assigneeField: 'assignee',
    productField: 'agentRole',
    customerField: 'customer',
    sections: [
      { title: 'Agent Comment', field: 'agentComment', type: 'textarea' },
      { title: 'Checklist', field: 'checklist', type: 'checklist' },
      { title: 'Attachments', field: 'attachments', type: 'attachments' },
    ],
  }
}

export const defaultDescriptionRule: DescriptionRule = {
  template: '$(title) — $(customer)'
}
