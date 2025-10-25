import React, { useMemo, useState } from 'react'
import Drawer, { DrawerSize } from '../drawer'
import type { KanbanCard } from './types'
import type { JSONSchemaRoot, DescriptionRule } from '../schema/SchemaTypes'
import { SchemaDisplay, SchemaForm } from '../schema/SchemaRenderer'
import { applyTemplate } from '../schema/SchemaTypes'
import '../schema/SchemaRenderer.css'
import './TaskDrawer.css'

interface TaskDrawerProps {
  card: KanbanCard | null
  isOpen: boolean
  onClose: () => void
  schema: JSONSchemaRoot
  descriptionRule?: DescriptionRule
  onSave?: (updated: any) => void
}

const Tab = {
  Details: 'details',
  Log: 'log',
} as const

const TaskDrawer: React.FC<TaskDrawerProps> = ({ card, isOpen, onClose, schema, descriptionRule, onSave }) => {
  const [activeTab, setActiveTab] = useState<typeof Tab[keyof typeof Tab]>(Tab.Details)
  const [editing, setEditing] = useState(false)
  const [formValue, setFormValue] = useState<Record<string, any>>({})

  const data = useMemo(() => (card ? { ...card } : {}), [card])

  const title = useMemo(() => {
    if (!card) return ''
    if (descriptionRule?.template) return applyTemplate(descriptionRule.template, { ...data })
    return card.title
  }, [card, descriptionRule, data])

  const beginEdit = () => {
    setFormValue(data)
    setEditing(true)
  }

  const save = () => {
    setEditing(false)
    onSave?.(formValue)
  }

  return (
    <Drawer isOpen={isOpen} onClose={onClose} title={title} size={DrawerSize.LARGE}>
      <div className="taskdrawer">
        <div className="taskdrawer-tabs">
          <button className={`taskdrawer-tab ${activeTab === Tab.Details ? 'is-active' : ''}`} onClick={() => setActiveTab(Tab.Details)}>Details</button>
          <button className={`taskdrawer-tab ${activeTab === Tab.Log ? 'is-active' : ''}`} onClick={() => setActiveTab(Tab.Log)}>Task log</button>
        </div>

        {activeTab === Tab.Details && (
          <div className="taskdrawer-section">
            <div className="taskdrawer-section-header">Main Info</div>
            {!editing ? (
              <SchemaDisplay schema={schema} data={data} />
            ) : (
              <SchemaForm schema={schema} value={formValue} onChange={setFormValue} />
            )}
          </div>
        )}

        {activeTab === Tab.Log && (
          <div className="taskdrawer-log">No activity yet.</div>
        )}

        <div className="taskdrawer-actions">
          {!editing ? (
            <>
              <button className="td-btn" onClick={beginEdit}>Edit</button>
              <button className="td-btn td-btn-secondary" onClick={onClose}>Close</button>
            </>
          ) : (
            <>
              <button className="td-btn" onClick={save}>Save</button>
              <button className="td-btn td-btn-secondary" onClick={() => setEditing(false)}>Cancel</button>
            </>
          )}
        </div>
      </div>
    </Drawer>
  )
}

export default TaskDrawer
