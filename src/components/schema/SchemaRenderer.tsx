import React from 'react'
import type { JSONSchemaRoot, JSONSchemaProperty, JSONSchemaArray, JSONSchemaBoolean, JSONSchemaNumber, JSONSchemaObject, JSONSchemaString } from './SchemaTypes'

export interface SchemaDisplayProps {
  schema: JSONSchemaRoot
  data: Record<string, any>
}

export const SchemaDisplay: React.FC<SchemaDisplayProps> = ({ schema, data }) => {
  const renderProperty = (key: string, prop: JSONSchemaProperty) => {
    const label = prop.title ?? key
    const value = (data as any)[key]

    if ((prop as JSONSchemaObject).type === 'object') {
      const obj = prop as JSONSchemaObject
      const order = obj.order ?? Object.keys(obj.properties)
      return (
        <div key={key} className="schema-display-object">
          {label && <div className="schema-section-title">{label}</div>}
          <div className="schema-grid">
            {order.map((k) => (
              <div key={k} className="schema-field">
                {renderProperty(k, obj.properties[k])}
              </div>
            ))}
          </div>
        </div>
      )
    }

    let text: React.ReactNode = ''
    switch (prop.type) {
      case 'boolean':
        text = value ? 'Yes' : 'No'
        break
      case 'number':
        text = value
        break
      case 'array': {
        const arr = value as any[] | undefined
        text = (
          <ul className="schema-list">
            {(arr ?? []).map((item, idx) => (
              <li key={idx}>{String(item)}</li>
            ))}
          </ul>
        )
        break
      }
      case 'string':
      default:
        text = String(value ?? '')
    }

    return (
      <div key={key} className="schema-field-row">
        <div className="schema-label">{label}</div>
        <div className={`schema-value ${prop.ui?.widget === 'badge' ? 'schema-badge' : ''}`}>{text}</div>
      </div>
    )
  }

  const order = schema.order ?? Object.keys(schema.properties)
  return <div className="schema-display">{order.map((k) => renderProperty(k, schema.properties[k]))}</div>
}

export interface SchemaFormProps {
  schema: JSONSchemaRoot
  value: Record<string, any>
  onChange: (next: Record<string, any>) => void
}

export const SchemaForm: React.FC<SchemaFormProps> = ({ schema, value, onChange }) => {
  const handleChange = (key: string, v: any) => {
    onChange({ ...value, [key]: v })
  }

  const renderInput = (key: string, prop: JSONSchemaProperty) => {
    const label = prop.title ?? key
    const v = (value as any)[key]

    if (prop.type === 'object') {
      const obj = prop as JSONSchemaObject
      const order = obj.order ?? Object.keys(obj.properties)
      const nested = v ?? {}
      return (
        <fieldset key={key} className="schema-fieldset">
          <legend>{label}</legend>
          {order.map((nk) => (
            <div key={nk} className="schema-form-row">
              {renderInput(`${key}.${nk}`, obj.properties[nk])}
            </div>
          ))}
        </fieldset>
      )
    }

    const set = (val: any) => {
      if (key.includes('.')) {
        const parts = key.split('.')
        const topKey = parts[0]
        const rest = parts.slice(1)
        const current = { ...(value as any)[topKey] }
        let cursor: any = current
        for (let i = 0; i < rest.length - 1; i++) {
          const p = rest[i]
          cursor[p] = { ...(cursor[p] ?? {}) }
          cursor = cursor[p]
        }
        cursor[rest[rest.length - 1]] = val
        onChange({ ...value, [topKey]: current })
      } else {
        handleChange(key, val)
      }
    }

    if (prop.type === 'string') {
      const p = prop as JSONSchemaString
      const widget = p.ui?.widget ?? (p.enum ? 'select' : p.format === 'date' || p.format === 'date-time' ? 'date' : 'text')
      if (widget === 'textarea') {
        return (
          <label key={key} className="schema-input">
            <span>{label}</span>
            <textarea value={v ?? ''} onChange={(e) => set(e.target.value)} placeholder={p.ui?.placeholder} />
          </label>
        )
      }
      if (widget === 'select' && p.enum) {
        return (
          <label key={key} className="schema-input">
            <span>{label}</span>
            <select value={v ?? ''} onChange={(e) => set(e.target.value)}>
              <option value="" disabled>
                Select
              </option>
              {p.enum.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </label>
        )
      }
      if (widget === 'date') {
        return (
          <label key={key} className="schema-input">
            <span>{label}</span>
            <input type="date" value={v ?? ''} onChange={(e) => set(e.target.value)} />
          </label>
        )
      }
      return (
        <label key={key} className="schema-input">
          <span>{label}</span>
          <input type="text" value={v ?? ''} onChange={(e) => set(e.target.value)} placeholder={p.ui?.placeholder} />
        </label>
      )
    }

    if (prop.type === 'number') {
      const p = prop as JSONSchemaNumber
      return (
        <label key={key} className="schema-input">
          <span>{label}</span>
          <input type="number" value={v ?? ''} onChange={(e) => set(Number(e.target.value))} />
        </label>
      )
    }

    if (prop.type === 'boolean') {
      const p = prop as JSONSchemaBoolean
      return (
        <label key={key} className="schema-input-checkbox">
          <input type="checkbox" checked={!!v} onChange={(e) => set(e.target.checked)} />
          <span>{label}</span>
        </label>
      )
    }

    if (prop.type === 'array') {
      const p = prop as JSONSchemaArray
      const arr: any[] = Array.isArray(v) ? v : []
      const addItem = () => set([...arr, ''])
      const updateItem = (i: number, val: any) => {
        const copy = [...arr]
        copy[i] = val
        set(copy)
      }
      const removeItem = (i: number) => {
        const copy = [...arr]
        copy.splice(i, 1)
        set(copy)
      }
      return (
        <div key={key} className="schema-array">
          <div className="schema-array-label">{label}</div>
          {arr.map((item, idx) => (
            <div key={idx} className="schema-array-item">
              <input
                type="text"
                value={item}
                onChange={(e) => updateItem(idx, e.target.value)}
              />
              <button type="button" onClick={() => removeItem(idx)} aria-label={`remove-${idx}`}>×</button>
            </div>
          ))}
          <button type="button" className="schema-array-add" onClick={addItem}>Add</button>
        </div>
      )
    }

    return null
  }

  const order = schema.order ?? Object.keys(schema.properties)
  return (
    <form className="schema-form" onSubmit={(e) => e.preventDefault()}>
      {order.map((k) => (
        <div key={k} className="schema-form-row">
          {renderInput(k, schema.properties[k])}
        </div>
      ))}
    </form>
  )
}

export default SchemaDisplay
