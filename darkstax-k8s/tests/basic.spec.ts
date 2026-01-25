import { test, expect } from '@playwright/test';

test.describe('Darkstax K8s - Basic UI', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('renders core layout regions', async ({ page }) => {
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('main')).toBeVisible();
    await expect(page.getByTestId('resource-menu-panel')).toBeVisible();
    await expect(page.getByPlaceholder(/search nodes/i)).toBeVisible();
  });

  test('shows topology nodes and updates metadata panel', async ({ page }) => {
    const layoutSelect = page.getByLabel('Select layout mode');
    await layoutSelect.selectOption('hierarchy');

    const nodeTile = page.locator('[data-node-id="deploy-frontend"]').first();
    await expect(nodeTile).toBeVisible();
    await nodeTile.click();

    await expect(page.getByRole('button', { name: 'Metadata' })).toBeVisible();
    await expect(page.getByText('Key Metadata')).toBeVisible();
  });

  test('switches layout modes', async ({ page }) => {
    const layoutSelect = page.getByLabel('Select layout mode');
    await expect(layoutSelect).toBeVisible();

    await layoutSelect.selectOption('tree');
    await expect(page.getByText('frontend', { exact: true }).first()).toBeVisible();

    await layoutSelect.selectOption('force');
    await expect(page.getByText('frontend', { exact: true }).first()).toBeVisible();
  });

  test('search filter adds and toggles filter chip', async ({ page }) => {
    const searchInput = page.getByPlaceholder(/search nodes/i);
    await searchInput.fill('frontend');
    await searchInput.press('Enter');

    const filterChip = page.getByRole('button', { name: /toggle filter: frontend/i });
    await expect(filterChip).toBeVisible();

    await filterChip.click();
    await expect(filterChip).toBeVisible();
  });

  test('metadata panel shows raw tab content', async ({ page }) => {
    await page.locator('[data-node-id="deploy-frontend"]').first().click();
    await page.getByText('Raw').click();
    await expect(page.getByText('Raw Metadata')).toBeVisible();
  });

  test('persists layout selection after reload', async ({ page }) => {
    const layoutSelect = page.getByLabel('Select layout mode');
    await layoutSelect.selectOption('tree');

    await page.reload();
    await expect(layoutSelect).toHaveValue('tree');
  });

  test('persists filters after reload', async ({ page }) => {
    const searchInput = page.getByPlaceholder(/search nodes/i);
    await searchInput.fill('frontend');
    await searchInput.press('Enter');

    await page.reload();
    await expect(page.getByRole('button', { name: /toggle filter: frontend/i })).toBeVisible();
  });

  test('group controller toggles collapse state', async ({ page }) => {
    const controller = page.getByTestId('group-controller');
    await expect(controller).toBeVisible();

    const groupItem = page.getByTestId('group-item-group-deploy-frontend');
    await expect(groupItem).toBeVisible();
    await groupItem.click();

    await expect(groupItem.getByText('✓')).toBeVisible();
  });

  test('dragging a resource highlights lane', async ({ page }) => {
    const draggable = page.getByTestId('resource-item-tpl-deployment');
    await expect(draggable).toBeVisible();

    const lane = page.getByTestId('lane-load');
    const dropZone = page.getByTestId('lane-drop-load');
    await expect(lane).toBeVisible();
    await expect(dropZone).toBeVisible();

    const start = await draggable.boundingBox();
    const target = await dropZone.boundingBox();
    expect(start).not.toBeNull();
    expect(target).not.toBeNull();

    await page.mouse.move(start!.x + start!.width / 2, start!.y + start!.height / 2);
    await page.mouse.down();
    await page.mouse.move(target!.x + target!.width / 2, target!.y + 20);

    await expect(dropZone).toHaveClass(/border-dashed/);

    await page.mouse.up();
  });

  test('connection layer renders path elements', async ({ page }) => {
    const connectionLayer = page.getByTestId('connection-layer');
    await expect(connectionLayer).toBeVisible();

    const paths = connectionLayer.locator('path');
    const count = await paths.count();
    expect(count).toBeGreaterThan(0);
  });
});
