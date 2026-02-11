import type { Meta, StoryObj } from '@storybook/react'
import Database from './Database'
import Graph1 from './Graph1'
import RestAPI from './RestAPI'
import SearchPanel from './SearchPanel'

// Database Stories
const metaDatabase: Meta<typeof Database> = {
  title: 'MetaMapper Components/Database',
  component: Database,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default metaDatabase

type DatabaseStory = StoryObj<typeof Database>

export const Default: DatabaseStory = {
  args: {
    onConnect: (data) => console.log('Connect clicked:', data),
  },
}

export const WithInitialData: DatabaseStory = {
  args: {
    initialData: {
      host: 'localhost',
      port: '5432',
      dbName: 'mydb',
      schema: 'public',
      username: 'admin',
      password: '',
    },
    onConnect: (data) => console.log('Connect clicked:', data),
  },
}

// Graph1 Stories
const metaGraph1: Meta<typeof Graph1> = {
  title: 'MetaMapper Components/Graph1',
  component: Graph1,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export const Graph1Default: StoryObj<typeof Graph1> = {
  args: {
    onSend: (url) => console.log('Send clicked:', url),
    onResponse: () => console.log('Response clicked'),
  },
}

export const Graph1WithResponse: StoryObj<typeof Graph1> = {
  args: {
    onSend: (url) => console.log('Send clicked:', url),
    onResponse: () => console.log('Response clicked'),
    responseContent: (
      <pre style={{ margin: 0, fontSize: '12px' }}>
        {JSON.stringify({ status: 'success', data: [] }, null, 2)}
      </pre>
    ),
  },
}

export { metaGraph1 }

// RestAPI Stories
const metaRestAPI: Meta<typeof RestAPI> = {
  title: 'MetaMapper Components/RestAPI',
  component: RestAPI,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export const RestAPIDefault: StoryObj<typeof RestAPI> = {
  args: {
    onSend: (method, url) => console.log('Send clicked:', method, url),
    onResponse: () => console.log('Response clicked'),
  },
}

export const RestAPIPost: StoryObj<typeof RestAPI> = {
  args: {
    initialMethod: 'POST',
    initialUrl: 'http://localhost:3001/api/data',
    onSend: (method, url) => console.log('Send clicked:', method, url),
    onResponse: () => console.log('Response clicked'),
  },
}

export { metaRestAPI }

// SearchPanel Stories
const metaSearchPanel: Meta<typeof SearchPanel> = {
  title: 'MetaMapper Components/SearchPanel',
  component: SearchPanel,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export const SearchPanelDefault: StoryObj<typeof SearchPanel> = {
  args: {
    onSearch: (value) => console.log('Search:', value),
  },
}

export const SearchPanelWithData: StoryObj<typeof SearchPanel> = {
  args: {
    inputNodes: ['Input Node 1', 'Input Node 2', 'Input Node 3'],
    outputNodes: ['Output Node 1', 'Output Node 2'],
    executionNodes: ['Execution Node 1', 'Execution Node 2', 'Execution Node 3', 'Execution Node 4'],
    onSearch: (value) => console.log('Search:', value),
  },
}

export { metaSearchPanel }

// All Components Together
const metaAll: Meta = {
  title: 'MetaMapper Components/All Components',
  parameters: {
    layout: 'centered',
  },
}

export const AllComponentsShowcase: StoryObj = {
  render: () => (
    <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', padding: '20px' }}>
      <Database onConnect={(data) => console.log('Connect:', data)} />
      <Graph1 
        onSend={(url) => console.log('Send:', url)} 
        onResponse={() => console.log('Response')} 
      />
      <RestAPI 
        onSend={(method, url) => console.log('Send:', method, url)} 
        onResponse={() => console.log('Response')} 
      />
      <SearchPanel 
        inputNodes={['Input 1', 'Input 2']}
        outputNodes={['Output 1', 'Output 2']}
        executionNodes={['Execution 1', 'Execution 2']}
        onSearch={(value) => console.log('Search:', value)}
      />
    </div>
  ),
}

export { metaAll }
