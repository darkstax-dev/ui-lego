import { test, expect } from '@playwright/test';

/**
 * Regression test: Aggregate lane should control Kubernetes hierarchy visibility.
 *
 * Expected behavior:
 * - In hierarchy mode, only the Aggregate lane is shown by default.
 * - Clicking an Aggregate node (e.g. DC01) expands detail lanes (Workload/Service/etc).
 * - The Aggregate → Kubernetes relationship is visualized via at least one connection path.
 * - Double-clicking the Aggregate node collapses detail lanes again.
 */

test.describe('Aggregate → Kubernetes hierarchy relationship', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Make the test resilient if other tests (or localStorage) change the layout mode.
    await page.getByLabel('Select layout mode').selectOption('hierarchy');
  });

  test('expands detail lanes when an aggregate node is selected and collapses on double-click', async ({ page }) => {
    const aggregateLane = page.getByTestId('lane-aggregate');
    await expect(aggregateLane).toBeVisible();

    // By default, details lanes are collapsed (only Aggregate lane should render).
    await expect(page.getByTestId('lane-load')).toHaveCount(0);
    await expect(page.getByTestId('lane-service')).toHaveCount(0);

    // Select an aggregate node.
    const dc01Tile = aggregateLane.getByText('DC01', { exact: true });
    await expect(dc01Tile).toBeVisible();
    await dc01Tile.click();

    // Detail lanes should become visible.
    await expect(page.getByTestId('lane-load')).toBeVisible();

    // A known Kubernetes workload node should be visible once lanes are expanded.
    await expect(page.locator('[data-node-id="deploy-frontend"]').first()).toBeVisible();

    // Aggregate → Kubernetes relationship should be represented by at least one connection path
    // (dc-01 connects to ns-production in the demo scenario, and dc-01 click maps to selecting ns-production).
    await expect
      .poll(async () => page.getByTestId('connection-layer').locator('path').count())
      .toBeGreaterThan(0);

    // Double-clicking collapses the detail lanes.
    await dc01Tile.dblclick();

    await expect(page.getByTestId('lane-load')).toHaveCount(0);
    await expect(page.getByTestId('lane-service')).toHaveCount(0);
  });
});
