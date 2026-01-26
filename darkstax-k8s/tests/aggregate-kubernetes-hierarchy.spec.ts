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
    // This view is already in hierarchy lane mode; wait for the Aggregate lane to render.
    await expect(page.getByTestId('lane-aggregate')).toBeVisible();
  });

  test('expands detail lanes when an aggregate node is selected and collapses on double-click', async ({ page }) => {
    const aggregateLane = page.getByTestId('lane-aggregate');
    await expect(aggregateLane).toBeVisible();

    // By default, details lanes are collapsed (only Aggregate lane should render).
    await expect(page.getByTestId('lane-load')).toHaveCount(0);
    await expect(page.getByTestId('lane-service')).toHaveCount(0);

    // Select an aggregate node.
    // Use data-node-id for stability (avoids clicking only the text label).
    const dc03Tile = aggregateLane.locator('[data-node-id="dc-03"]');
    await expect(dc03Tile).toBeVisible();
    await expect(dc03Tile).toContainText('DC03');
    await dc03Tile.click();

    // Detail lanes should become visible.
    await expect(page.getByTestId('lane-load')).toBeVisible();

    // Some Kubernetes workload nodes should be visible once lanes are expanded.
    await expect
      .poll(async () => page.getByTestId('lane-load').locator('[data-node-id]').count())
      .toBeGreaterThan(0);

    // Double-clicking collapses the detail lanes.
    await dc03Tile.dblclick();

    await expect(page.getByTestId('lane-load')).toHaveCount(0);
    await expect(page.getByTestId('lane-service')).toHaveCount(0);
  });
});
