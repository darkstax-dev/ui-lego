import type { Preview } from '@storybook/react'
import '../src/tokens.css'
import '../src/dev.css'

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/ } },
    a11y: { element: '#storybook-root', manual: false },
    layout: 'centered'
  }
}

export default preview
