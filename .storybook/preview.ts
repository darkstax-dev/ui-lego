import type { Preview } from '@storybook/react-vite';
import '../src/tokens.css';
import '../src/dev.css';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
      expanded: true,
      sort: 'requiredFirst',
    },
    a11y: {
      context: '#storybook-root',
      manual: false,
      config: {
        rules: [
          {
            id: 'color-contrast',
            enabled: true,
          },
        ],
      },
    },
    layout: 'centered',
    options: {
      storySort: {
        order: ['Introduction', 'Components'],
      },
    },
    docs: {
      toc: true,
    },
  },
};

export default preview;
