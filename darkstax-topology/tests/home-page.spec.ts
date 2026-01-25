import { test, expect } from '@playwright/test';

test.describe('Home Page Baseline Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173');
    await page.waitForLoadState('networkidle');
  });

  test('should load home page successfully', async ({ page }) => {
    await expect(page).toHaveTitle(/Topology|Vite/);
    const canvas = page.locator('svg#topology-canvas');
    await expect(canvas).toBeVisible({ timeout: 10000 });
  });

  test('should display main UI components', async ({ page }) => {
    await page.waitForTimeout(2000);

    // Check for filter button
    const filterButton = page.locator('button[aria-label*="filter"], button:has-text("Filter")').first();
    const hasFilter = await filterButton.isVisible().catch(() => false);

    // Check for search input
    const searchInput = page.getByPlaceholder(/search/i);
    const hasSearch = await searchInput.isVisible().catch(() => false);

    // Check for canvas
    const canvas = page.locator('svg#topology-canvas');
    const hasCanvas = await canvas.isVisible();

    expect(hasFilter || hasSearch || hasCanvas).toBeTruthy();
  });

  test('should render topology within reasonable time', async ({ page }) => {
    const startTime = Date.now();
    
    const canvas = page.locator('svg#topology-canvas');
    await expect(canvas).toBeVisible({ timeout: 10000 });
    
    const nodes = page.locator('g.node, circle.node-background');
    await expect(nodes.first()).toBeVisible({ timeout: 5000 });
    
    const endTime = Date.now();
    const loadTime = endTime - startTime;
    
    console.log(`Topology loaded in ${loadTime}ms`);
    expect(loadTime).toBeLessThan(15000); // Should load within 15 seconds
  });

  test('should have stable page structure', async ({ page }) => {
    await page.waitForTimeout(2000);

    const bodyContent = await page.content();
    expect(bodyContent).toContain('topology');
  });

  test('should not have console errors on load', async ({ page }) => {
    const errors: string[] = [];
    
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    await page.waitForTimeout(3000);

    // Filter out known non-critical errors
    const criticalErrors = errors.filter(err => 
      !err.includes('favicon') && 
      !err.includes('404') &&
      !err.toLowerCase().includes('warning')
    );

    console.log('Console errors:', criticalErrors);
    expect(criticalErrors.length).toBe(0);
  });

  test('should handle page resize', async ({ page }) => {
    const canvas = page.locator('svg#topology-canvas');
    await expect(canvas).toBeVisible();

    // Resize to mobile
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(1000);
    await expect(canvas).toBeVisible();

    // Resize to desktop
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.waitForTimeout(1000);
    await expect(canvas).toBeVisible();
  });
});
