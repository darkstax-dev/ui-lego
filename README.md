# UI Lego

A React component library built with TypeScript and Vite.

## Getting Started

### Development

Run the development server:

```bash
npm run dev
```

### Storybook

Start Storybook to view and develop components:

```bash
npm run storybook
```

Open [http://localhost:6006](http://localhost:6006) to view Storybook.

### Build

Build the library:

```bash
npm run build
```

Build Storybook for production:

```bash
npm run build-storybook
```

## Testing

This project uses Storybook Test Runner with Playwright for automated testing of components.

### Run Tests

To run component tests:

```bash
npm run test-storybook
```

This will start Storybook and run tests against all stories, including:

- **Interaction tests** (if `play` functions are defined in stories) - ✅ **Added to Button and InputField components**
- **Accessibility tests** using `@storybook/addon-a11y`
- **Visual regression tests** (screenshots are automatically captured and compared) - ✅ **115 visual baselines created**

For CI environments:

```bash
npm run test-storybook:ci
```

### Adding Tests

- **Interaction Tests**: Add `play` functions to your stories to test user interactions. Example:

  ```tsx
  export const MyStory: Story = {
    // ... story config
    play: async ({ canvasElement }) => {
      const canvas = within(canvasElement);
      const button = canvas.getByRole('button');
      await userEvent.click(button);
      expect(someElement).toHaveTextContent('expected text');
    },
  };
  ```

- **Accessibility**: Tests run automatically using `@storybook/addon-a11y`.
- **Visual Regression**: Screenshots are taken automatically on each test run and compared against baselines. Run tests once to create baselines, then they will detect visual changes.

## Scripts

- `npm run dev` - Start Vite dev server
- `npm run build` - Build the library
- `npm run preview` - Preview the built library
- `npm run storybook` - Start Storybook
- `npm run build-storybook` - Build Storybook for production
- `npm run test-storybook` - Run component tests
- `npm run typecheck` - Run TypeScript type checking
- `npm run lint` - Run ESLint
- `npm run check` - Run typecheck, lint, and build
