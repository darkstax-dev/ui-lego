# MetaMapper Components

A collection of specialized components for the MetaMapper interface, including database connections, API testing, and search functionality.

## Components

### Database

A form component for database connection configuration.

**Features:**
- Input fields for host, port, database name, schema, username, and password
- Connect button for establishing database connections
- Message and delete action buttons in the header

**Props:**
- `onConnect?: (data: DatabaseFormData) => void` - Callback when connect button is clicked
- `initialData?: Partial<DatabaseFormData>` - Initial form data
- `className?: string` - Additional CSS classes

**Usage:**
```tsx
import { Database } from 'ui-lego/src/components/metamapper-components'

<Database 
  onConnect={(data) => {
    console.log('Connecting to:', data.host, data.port)
  }}
  initialData={{
    host: 'localhost',
    port: '5432',
  }}
/>
```

---

### Graph1

A component for GraphQL or graph-based API interactions.

**Features:**
- URL input field
- Send and Response buttons
- Display area for response content
- More options menu

**Props:**
- `onSend?: (url: string) => void` - Callback when send button is clicked
- `onResponse?: () => void` - Callback when response button is clicked
- `initialUrl?: string` - Initial URL value
- `responseContent?: React.ReactNode` - Response content to display
- `className?: string` - Additional CSS classes

**Usage:**
```tsx
import { Graph1 } from 'ui-lego/src/components/metamapper-components'

<Graph1 
  onSend={(url) => console.log('Sending to:', url)}
  onResponse={() => console.log('Show response')}
  responseContent={<pre>{JSON.stringify(data, null, 2)}</pre>}
/>
```

---

### RestAPI

A component for REST API testing and interaction.

**Features:**
- HTTP method dropdown (GET, POST, PUT, DELETE, PATCH)
- URL input field
- Send and Response buttons
- More options menu

**Props:**
- `onSend?: (method: HttpMethod, url: string) => void` - Callback when send button is clicked
- `onResponse?: () => void` - Callback when response button is clicked
- `initialUrl?: string` - Initial URL value
- `initialMethod?: HttpMethod` - Initial HTTP method
- `responseContent?: React.ReactNode` - Response content to display
- `className?: string` - Additional CSS classes

**Usage:**
```tsx
import { RestAPI } from 'ui-lego/src/components/metamapper-components'

<RestAPI 
  initialMethod="POST"
  onSend={(method, url) => {
    console.log(`${method} request to ${url}`)
  }}
  onResponse={() => console.log('Show response')}
/>
```

---

### SearchPanel

A collapsible search panel with categorized nodes.

**Features:**
- Search input with icon
- Collapsible sections for Input Nodes, Output Nodes, and Execution Nodes
- Functional dropdowns with smooth animations
- Search functionality

**Props:**
- `onSearch?: (value: string) => void` - Callback when search value changes
- `inputNodes?: string[]` - Array of input node names
- `outputNodes?: string[]` - Array of output node names
- `executionNodes?: string[]` - Array of execution node names
- `className?: string` - Additional CSS classes

**Usage:**
```tsx
import { SearchPanel } from 'ui-lego/src/components/metamapper-components'

<SearchPanel 
  inputNodes={['String Input', 'Number Input', 'Boolean Input']}
  outputNodes={['JSON Output', 'CSV Output']}
  executionNodes={['Execute', 'Transform', 'Filter']}
  onSearch={(value) => console.log('Searching:', value)}
/>
```

---

## Button Variant: Response

A new button variant added to the existing Button component.

**Features:**
- Outlined style with red border
- Transparent background
- Hover effects

**Usage:**
```tsx
import { Button } from 'ui-lego/src/components/buttons'

<Button variant="response" onClick={() => console.log('clicked')}>
  RESPONSE
</Button>
```

---

## Styling

All components use CSS variables for consistent theming:
- `--Background-Card` - Card background color
- `--Text-Blue-text-Main-text` - Main text color
- `--red-600-cta` - Primary red color for CTAs
- `--Divider-Light` - Divider color
- `--inputs-search-search-bg-default-light` - Search input background

Components are responsive and adapt to different screen sizes using flexbox and modern CSS techniques.

---

## Examples

See `darkstax-k8s/src/examples/MetaMapperComponentsDemo.tsx` for a complete working example showcasing all components.

To view the demo:
1. Run `npm run dev`
2. Open the application in your browser
3. The demo page will display all MetaMapper components with interactive examples

---

## TypeScript

All components are fully typed with TypeScript. Import types as needed:

```tsx
import type { 
  DatabaseProps, 
  DatabaseFormData,
  Graph1Props,
  RestAPIProps,
  HttpMethod,
  SearchPanelProps 
} from 'ui-lego/src/components/metamapper-components'
```
