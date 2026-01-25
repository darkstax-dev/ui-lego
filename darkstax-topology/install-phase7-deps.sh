#!/bin/bash

# Phase 7 Dependencies Installation Script
# This script installs all required dependencies for Phase 7 implementation

echo "Installing Phase 7 dependencies..."

# Testing dependencies
npm install -D vitest@latest \
  @vitest/ui@latest \
  @testing-library/react@latest \
  @testing-library/jest-dom@latest \
  jsdom@latest

# Build optimization dependencies
npm install -D vite-plugin-dts@latest \
  rollup-plugin-visualizer@latest

# Storybook dependencies (if not already installed)
npm install -D @storybook/react@latest \
  @storybook/react-vite@latest \
  @storybook/addon-links@latest \
  @storybook/addon-essentials@latest \
  @storybook/addon-interactions@latest \
  @storybook/addon-a11y@latest

# Type definitions
npm install -D @types/node@latest

echo "✅ Phase 7 dependencies installed successfully!"
echo ""
echo "Next steps:"
echo "1. Run tests: npm run test"
echo "2. Run Storybook: npm run storybook"
echo "3. Build production: npm run build"
echo "4. Analyze bundle: npm run build:analyze"
