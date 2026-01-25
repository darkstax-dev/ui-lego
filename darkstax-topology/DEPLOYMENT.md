# Deployment Guide

## Building for Production

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Tests

```bash
npm run test:coverage
```

### 3. Type Check

```bash
npm run type-check
```

### 4. Build Library

```bash
npm run build
```

This creates:
- `dist/darkstax-topology.es.js` - ES module
- `dist/darkstax-topology.umd.js` - UMD module
- `dist/darkstax-topology.css` - Styles
- `dist/types/` - TypeScript declarations

### 5. Analyze Bundle

```bash
npm run build:analyze
```

Open `dist/stats.html` to view bundle analysis.

## Publishing to NPM

### 1. Update Version

```bash
npm version patch|minor|major
```

### 2. Publish

```bash
npm publish
```

## CDN Deployment

### Upload to CDN

Upload the following files:
- `dist/darkstax-topology.umd.js`
- `dist/darkstax-topology.css`

### Usage via CDN

```html
<link rel="stylesheet" href="https://cdn.example.com/darkstax-topology.css">
<script src="https://cdn.example.com/darkstax-topology.umd.js"></script>

<script>
  const { TopologyViewer } = DarkstaxTopology;
  // Use TopologyViewer
</script>
```

## Docker Deployment (Storybook)

### Build Storybook

```bash
npm run build-storybook
```

### Dockerfile

```dockerfile
FROM nginx:alpine
COPY storybook-static /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Build & Run

```bash
docker build -t darkstax-topology-docs .
docker run -p 8080:80 darkstax-topology-docs
```

## Performance Optimization

### Code Splitting

The library automatically splits code by:
- Core components
- D3 visualizations
- Utility functions

### Tree Shaking

Import only what you need:

```typescript
import { TopologyViewer } from 'darkstax-topology';
// Not: import * as Topology from 'darkstax-topology';
```

### Bundle Size Targets

- Main bundle: < 150KB (gzipped)
- CSS: < 20KB (gzipped)
- Total: < 170KB (gzipped)

## Monitoring

### Performance Metrics

Monitor in production:
- FPS (target: 60fps)
- Render time (target: < 16ms)
- Memory usage (target: < 100MB for 1000 nodes)

### Error Tracking

Integrate with Sentry or similar:

```typescript
import * as Sentry from '@sentry/react';

Sentry.init({
  dsn: 'YOUR_DSN',
  integrations: [new Sentry.BrowserTracing()],
  tracesSampleRate: 1.0,
});
```

## Validation Steps

### 1. Install Test Dependencies

```bash
npm install -D vitest @vitest/ui @testing-library/react @testing-library/jest-dom jsdom
npm install -D vite-plugin-dts rollup-plugin-visualizer
```

### 2. Run Tests

```bash
npm run test
npm run test:coverage
```

### 3. Build Storybook

```bash
npm run storybook
```

Open http://localhost:6006 and verify all components render correctly.

### 4. Build Production

```bash
npm run build
npm run build:analyze
```

Check `dist/stats.html` for bundle size analysis.

### 5. Test Production Build

```bash
npm run preview
```

## Expected Outcome

After Phase 7, you should have:

✅ **Advanced Visualizations** - Heat maps, flow animations, cluster views  
✅ **Theme System** - Multiple color schemes with easy switching  
✅ **Performance Monitoring** - FPS tracking and optimization  
✅ **Comprehensive Tests** - Unit tests with >80% coverage  
✅ **Storybook Documentation** - Interactive component showcase  
✅ **Production Build** - Optimized, tree-shakeable bundle  
✅ **Deployment Ready** - NPM and CDN deployment configured  
✅ **Enterprise Grade** - Professional, scalable, maintainable  

## Performance Benchmarks

Target performance metrics:

| Metric | Target | Excellent |
|--------|--------|-----------|
| FPS | 60 | 60 |
| Render Time | < 16ms | < 10ms |
| Bundle Size (gzipped) | < 170KB | < 150KB |
| Time to Interactive | < 2s | < 1s |
| Memory (1000 nodes) | < 100MB | < 80MB |

## Troubleshooting

**Issue: Tests fail with module resolution errors**
- Fix: Check `vitest.config.ts` alias configuration

**Issue: Storybook doesn't load components**
- Fix: Verify `.storybook/main.ts` alias matches `vite.config.ts`

**Issue: Bundle size too large**
- Fix: Run `npm run build:analyze` and identify large dependencies

**Issue: Performance degradation with many nodes**
- Fix: Implement virtual rendering or reduce simulation complexity

**Issue: Theme not applying**
- Fix: Ensure `ThemeManager.applyTheme()` is called on mount
