import type { Meta, StoryObj } from '@storybook/react-vite'
import './FilterBar.css'
import '../../tokens.css'
import FilterBar, { FilterControl, FilterValues } from './FilterBar'

const meta: Meta<typeof FilterBar> = {
  component: FilterBar,
  title: 'Components/FilterBar',
  tags: ['autodocs']
}
export default meta

type Story = StoryObj<typeof FilterBar>

const shipmentStatus = [
  { value: '', label: 'Shipment Status' },
  { value: 'pending', label: 'Pending' },
  { value: 'in_transit', label: 'In transit' },
  { value: 'delivered', label: 'Delivered' },
  { value: 'canceled', label: 'Canceled' }
]

const renewalDate = [
  { value: '', label: 'Renewal Date' },
  { value: 'past_due', label: 'Past due' },
  { value: 'next_7', label: 'Next 7 days' },
  { value: 'next_30', label: 'Next 30 days' },
  { value: 'any', label: 'Any time' }
]

const nameSort = [
  { value: '', label: 'Name' },
  { value: 'az', label: 'A → Z' },
  { value: 'za', label: 'Z → A' }
]

const locations = [
  { value: '', label: 'Location' },
  { value: 'east', label: 'Eastern' },
  { value: 'west', label: 'Western' },
  { value: 'central', label: 'Central' }
]

const tagOptions = [
  { id: 1, label: 'Client', value: 'client' },
  { id: 2, label: 'Made-to-order', value: 'mto' },
  { id: 3, label: 'Quick Ship', value: 'quick' },
  { id: 4, label: 'Eco', value: 'eco' }
]

export const Default: Story = {
  render: () => {
    const [values, setValues] = React.useState<FilterValues>({
      shipment: '',
      renewal: '',
      name: '',
      location: '',
      tags: []
    })

    const controls: FilterControl[] = [
      { id: 'shipment', type: 'select', options: shipmentStatus, placeholder: 'Shipment Status', minWidth: 220 },
      { id: 'renewal', type: 'select', options: renewalDate, placeholder: 'Renewal Date', minWidth: 200 },
      { id: 'name', type: 'select', options: nameSort, placeholder: 'Name', minWidth: 160 },
      { id: 'location', type: 'select', options: locations, placeholder: 'Location', minWidth: 180 },
      { id: 'tags', type: 'multiselect', options: tagOptions, placeholder: 'Tags', minWidth: 260 },
    ]

    return (
      <div style={{ padding: 16, background: 'var(--surface-default)' }}>
        <FilterBar controls={controls} values={values} onChange={setValues} />
        <pre style={{ marginTop: 16, fontSize: 12, color: 'var(--text-blue-tertiary)' }}>
          {JSON.stringify(values, null, 2)}
        </pre>
      </div>
    )
  }
}
