export type JSONSchemaType =
  | 'string'
  | 'number'
  | 'boolean'
  | 'object'
  | 'array'

export type UIWidget = 'text' | 'textarea' | 'select' | 'number' | 'checkbox' | 'date' | 'badge'

export interface JSONSchemaPropertyBase {
  title?: string
  description?: string
  ui?: {
    widget?: UIWidget
    placeholder?: string
    options?: { label: string; value: string | number }[]
  }
}

export interface JSONSchemaString extends JSONSchemaPropertyBase {
  type: 'string'
  enum?: string[]
  format?: 'date' | 'date-time'
}

export interface JSONSchemaNumber extends JSONSchemaPropertyBase {
  type: 'number'
  minimum?: number
  maximum?: number
}

export interface JSONSchemaBoolean extends JSONSchemaPropertyBase {
  type: 'boolean'
}

export interface JSONSchemaArray extends JSONSchemaPropertyBase {
  type: 'array'
  items: JSONSchemaString | JSONSchemaNumber | JSONSchemaBoolean
}

export interface JSONSchemaObject extends JSONSchemaPropertyBase {
  type: 'object'
  properties: Record<string, JSONSchemaProperty>
  required?: string[]
  order?: string[]
}

export type JSONSchemaProperty =
  | JSONSchemaString
  | JSONSchemaNumber
  | JSONSchemaBoolean
  | JSONSchemaArray
  | JSONSchemaObject

export interface JSONSchemaRoot extends JSONSchemaObject {
  type: 'object'
}

export type DescriptionRule = {
  template: string // e.g. "$(title) — $(customer)"
}

export const applyTemplate = (template: string, data: Record<string, any>) => {
  return template.replace(/\$\(([^)]+)\)/g, (_, path: string) => {
    const parts = path.split('.')
    let curr: any = data
    for (const p of parts) {
      if (curr == null) return ''
      curr = curr[p]
    }
    return curr == null ? '' : String(curr)
  })
}
