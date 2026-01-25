# Playwright Test Suite - Figma Design Comparison

## Quick Start

```bash
# Install dependencies (first time only)
npm install --legacy-peer-deps

# Install Playwright browsers (first time only)
npx playwright install

# Run all tests
npm test

# Run with interactive UI
npm run test:ui

# Run in headed mode (see the browser)
npm run test:headed

# View HTML report
npm run test:report
```

## What Gets Tested

This test suite compares the **actual implementation** against the **Figma design** (`screenshot-of-entire-figma-design.jpeg`).

### Test Categories

1. **Layout Structure** - Verifies viewport size, component dimensions, and positioning
2. **Header Elements** - Back button, inputs, dropdown, search
3. **Resource Menu** - Right panel with Kubernetes resource icons
4. **Bottom Panel** - Action buttons and info button
5. **Status Legend** - Tooltip with status indicators
6. **Canvas Area** - Dotted background, lanes, resource containers
7. **Typography** - Font families, sizes, weights
8. **Colors** - Background colors, text colors, status colors
9. **Interactive Elements** - Drag-and-drop, hover states

### Total Tests: **38 automated tests**

## Test Output

### Console Logs
Tests will output detailed information:
- ✓ Elements found matching the design
- ✗ Elements missing or incorrect
- Actual dimensions vs expected
- Color values
- Font information

### Screenshots
Screenshots are saved to `tests/screenshots/`:
- `current-implementation.png` - Full page screenshot of current state

Compare this with the Figma design to identify visual gaps.

## Understanding Test Results

### ✅ Passing Tests
Green checkmarks indicate the implementation matches the Figma design.

### ⚠️ Informational Logs
Look for console logs that say:
- "found" - Element exists
- "missing" - Element not found (potential gap)

### ❌ Failing Tests
Red X marks indicate critical mismatches:
- Wrong dimensions
- Missing components
- Incorrect styling

## Fixing Issues

If tests fail:

1. **Check the test output** for specific failures
2. **Review the component file** mentioned in the test
3. **Compare with Figma design** for the exact specification
4. **Update the component** to match
5. **Re-run tests** to verify fix

## Key Test Files

- `figma-design-comparison.spec.ts` - Main test suite
- `screenshots/` - Generated screenshots
- `../playwright.config.ts` - Test configuration

## Continuous Integration

These tests can be run in CI/CD pipelines:
```bash
# CI mode
CI=true npm test
```

## Troubleshooting

### Port Already in Use
If `localhost:5173` is already in use:
```bash
# Stop existing dev server
pkill -f "vite"

# Or change port in playwright.config.ts
```

### Browser Not Found
```bash
npx playwright install chromium
```

### Tests Timeout
Increase timeout in `playwright.config.ts`:
```typescript
timeout: 60000, // 60 seconds
```

## Advanced Usage

### Run Specific Test
```bash
npx playwright test -g "should render back button"
```

### Debug Mode
```bash
npx playwright test --debug
```

### Generate Report
```bash
npx playwright show-report
```

### Update Screenshots
```bash
npx playwright test --update-snapshots
```

## See Also

- [Full Analysis Document](../FIGMA_DESIGN_ANALYSIS.md)
- [Playwright Documentation](https://playwright.dev)
- [Figma Design File](../../screenshot-of-entire-figma-design.jpeg)
