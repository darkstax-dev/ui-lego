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

  test('shows pod links to Network + Config/Storage lanes when selecting a pod', async ({ page }) => {
    const aggregateLane = page.getByTestId('lane-aggregate');
    const dc03Tile = aggregateLane.locator('[data-node-id="dc-03"]');
    await dc03Tile.click();

    const loadLane = page.getByTestId('lane-load');
    await expect(loadLane).toBeVisible();

    // Expand the first workload controller group (deployment/statefulset/job) and then click one of its pods.
    const controller = loadLane
      .locator('[data-node-id^="deploy-"], [data-node-id^="statefulset-"], [data-node-id^="job-"]')
      .first();
    await expect(controller).toBeVisible();

    const controllerId = await controller.getAttribute('data-node-id');
    expect(controllerId).toBeTruthy();

    const match = controllerId!.match(/^(deploy|statefulset|job)-(.+)$/);
    expect(match).not.toBeNull();

    const suffix = match![2];

    await controller.click();

    const pod = loadLane.locator(`[data-node-id^="pod-${suffix}"]`).first();
    await expect(pod).toBeVisible();
    await pod.click();

    // Auto-paging should bring linked nodes into view.
    const networkLane = page.getByTestId('lane-network');
    const storageLane = page.getByTestId('lane-storage');
    const configLane = page.getByTestId('lane-config');
    await expect(networkLane).toBeVisible();
    await expect(storageLane).toBeVisible();
    await expect(configLane).toBeVisible();

    await expect(networkLane.locator(`[data-node-id="multus-${suffix}-a"]`)).toBeVisible();
    await expect(storageLane.locator(`[data-node-id="pvc-${suffix}"]`)).toBeVisible();
    await expect(configLane.locator(`[data-node-id="configmap-${suffix}"]`)).toBeVisible();

    // Connection paths should be computed for the now-visible linked nodes.
    await expect
      .poll(async () => page.getByTestId('connection-layer').locator('path').count())
      .toBeGreaterThan(0);
  });
});
