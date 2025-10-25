import type { KanbanBoardData } from './types'

export const mockKanbanData: KanbanBoardData = {
  columns: [
    {
      id: '1',
      title: 'To Do',
      cards: [
        {
          id: 'card-1',
          title: 'Design Login Screen',
          status: 'User Action Required',
          agentName: 'XYZ',
          agentRole: 'XYZ',
          created: '02/12/2025 [13:29PM]',
          dueDate: '02/12/2025',
          priority: 'High',
          agentComment: 'Client requested design update to align with new branding guidelines. Waiting for legal confirmation before proceeding.',
          customer: 'Acme Corp',
          attachments: [
            {
              id: 'att-1',
              fileName: 'File name',
              fileType: 'json',
              timestamp: 'January 08, 2025 [7:15 AM]'
            }
          ],
          taskLog: [
            {
              id: 'log-1',
              eventType: 'Unlock',
              eventBy: 'Maria N.',
              eventDatetime: '02/12/2025 [3:29PM]'
            },
            {
              id: 'log-2',
              eventType: 'Lock',
              eventBy: 'Maria N.',
              eventDatetime: '01/12/2025 [6:29PM]'
            },
            {
              id: 'log-3',
              eventType: 'Lock',
              eventBy: 'Maria N.',
              eventDatetime: '02/12/2025 [2:29PM]'
            },
            {
              id: 'log-4',
              eventType: 'Unlock',
              eventBy: 'Maria N.',
              eventDatetime: '02/12/2025 [9:29AM]'
            },
            {
              id: 'log-5',
              eventType: 'Lock',
              eventBy: 'Maria N.',
              eventDatetime: '02/12/2025 [13:29PM]'
            }
          ]
        },
        {
          id: 'card-2',
          title: 'Inventory Restock Report',
          status: 'Customer Action Required',
          agentName: 'XYZ',
          agentRole: 'XYZ',
          created: '02/12/2025 [13:29PM]',
          dueDate: '02/12/2025',
          priority: 'Normal',
          agentComment: 'Client requested design update to align with new branding guidelines. Waiting for legal confirmation before proceeding.',
          customer: 'Acme Corp',
          attachments: [
            {
              id: 'att-2',
              fileName: 'File name',
              fileType: 'xls',
              timestamp: 'January 08, 2025 [7:15 AM]'
            }
          ]
        }
      ]
    },
    {
      id: '2',
      title: 'In Progress',
      cards: [
        {
          id: 'card-3',
          title: 'API Endpoint Spec — Orders',
          status: 'Agents Active',
          agentName: 'XYZ',
          agentRole: 'XYZ',
          created: '02/12/2025 [13:29PM]',
          dueDate: '02/12/2025',
          priority: 'High',
          agentComment: 'Client requested design update to align with new branding guidelines. Waiting for legal confirmation before proceeding.',
          customer: 'Acme Corp'
        },
        {
          id: 'card-4',
          title: 'Optimize SQL Queries',
          status: 'Blocked',
          agentName: 'XYZ',
          agentRole: 'XYZ',
          created: '02/12/2025 [13:29PM]',
          dueDate: '02/12/2025',
          priority: 'Medium',
          agentComment: 'Stalled due to missing indexing rights. DBA access required.',
          customer: 'Finance Ops',
          attachments: [
            {
              id: 'att-3',
              fileName: 'File name',
              fileType: 'json',
              timestamp: 'January 08, 2025 [7:15 AM]'
            }
          ]
        }
      ]
    },
    {
      id: '3',
      title: 'Review',
      cards: [
        {
          id: 'card-5',
          title: 'Mobile App UI Testing',
          status: 'Waiting',
          agentName: 'XYZ',
          agentRole: 'XYZ',
          created: '02/12/2025 [13:29PM]',
          dueDate: '02/12/2025',
          priority: 'High',
          agentComment: 'Client requested design update to align with new branding guidelines. Waiting for legal confirmation before proceeding.',
          customer: 'Beta User Group',
          attachments: [
            {
              id: 'att-4',
              fileName: 'File name',
              fileType: 'json',
              timestamp: 'January 08, 2025 [7:15 AM]'
            },
            {
              id: 'att-5',
              fileName: 'File name',
              fileType: 'pdf',
              timestamp: 'January 08, 2025 [7:15 AM]'
            }
          ]
        },
        {
          id: 'card-6',
          title: 'API Security Audit',
          status: 'Review',
          agentName: 'XYZ',
          agentRole: 'XYZ',
          created: '02/12/2025 [13:29PM]',
          dueDate: '02/12/2025',
          priority: 'Medium',
          agentComment: 'GDPR compliance flagged. Recheck OAuth flow before sign-off.',
          customer: 'Supplier Network'
        }
      ]
    },
    {
      id: '4',
      title: 'Done',
      cards: [
        {
          id: 'card-7',
          title: 'Deploy CI/CD Pipeline',
          status: 'Done',
          agentName: 'XYZ',
          agentRole: 'XYZ',
          created: '02/12/2025 [13:29PM]',
          closeDate: '02/12/2025 [13:29PM]',
          priority: 'High',
          agentComment: 'Rollback tested, all pipelines green. Notifications integrated in Slack.',
          customer: 'Internal Dev Team',
          assignee: {
            name: 'Lili',
            avatar: 'https://api.builder.io/api/v1/image/assets/TEMP/845aba2e1f2887ca9f2c96f4ef51f71381a4000d?width=48'
          },
          attachments: [
            {
              id: 'att-6',
              fileName: 'PipelineConfig.yaml',
              fileType: 'yml',
              timestamp: 'January 08, 2025 [7:15 AM]'
            }
          ]
        },
        {
          id: 'card-8',
          title: 'Delivery Assignment Automation',
          status: 'Archived',
          agentName: 'XYZ',
          agentRole: 'XYZ',
          created: '02/12/2025 [13:29PM]',
          closeDate: '02/12/2025 [13:29PM]',
          priority: 'Normal',
          agentComment: 'Automation complete. Archived for audit trail.',
          customer: 'HealthCare Inc.'
        }
      ]
    }
  ]
}
