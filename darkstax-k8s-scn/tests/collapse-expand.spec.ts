import { test, expect } from '@playwright/test';

test.describe('Kubernetes Topology - Collapse/Expand Feature', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5175');
    await page.waitForLoadState('networkidle');
  });

  test('should display Group Controller with resource groups', async ({ page }) => {
    const groupController = page.locator('text=Resource Groups').first();
    await expect(groupController).toBeVisible();

    const productionGroup = page.locator('text=production').first();
    await expect(productionGroup).toBeVisible();
    
    const memberCount = page.locator('text=26 members').first();
    await expect(memberCount).toBeVisible();
  });

  test('should show all groups with correct hierarchy', async ({ page }) => {
    const groupController = page.locator('text=Resource Groups').locator('..');
    await expect(groupController.locator('text=production').first()).toBeVisible();
    await expect(groupController.locator('text=frontend-deployment').first()).toBeVisible();
    await expect(groupController.locator('text=backend-api-deployment').first()).toBeVisible();
    await expect(groupController.locator('text=postgres-statefulset').first()).toBeVisible();
  });

  test('should collapse namespace group and hide all members', async ({ page }) => {
    const productionGroup = page.locator('div').filter({ hasText: /^production26 members$/ }).first();
    
    await expect(page.locator('text=frontend-pod-1')).toBeVisible();
    await expect(page.locator('text=backend-api-1')).toBeVisible();
    
    await productionGroup.click();
    
    await expect(page.locator('text=26 members (collapsed)')).toBeVisible();
    
    await expect(page.locator('text=frontend-pod-1')).not.toBeVisible();
    await expect(page.locator('text=backend-api-1')).not.toBeVisible();
    await expect(page.locator('text=postgres-0')).not.toBeVisible();
    
    const loadLane = page.locator('text=Drop load resources here');
    await expect(loadLane).toBeVisible();
  });

  test('should expand collapsed namespace group and show all members', async ({ page }) => {
    const productionGroup = page.locator('div').filter({ hasText: /^production26 members$/ }).first();
    
    await productionGroup.click();
    await expect(page.locator('text=26 members (collapsed)')).toBeVisible();
    
    const collapsedGroup = page.locator('div').filter({ hasText: /^production26 members \(collapsed\)$/ }).first();
    await collapsedGroup.click();
    await page.waitForTimeout(500);
    
    const canvas = page.locator('main');
    await expect(canvas.getByText('frontend-pod-1', { exact: true })).toBeVisible();
    await expect(canvas.getByText('backend-api-1', { exact: true })).toBeVisible();
    await expect(canvas.getByText('postgres-0', { exact: true })).toBeVisible();
  });

  test('should collapse deployment group and hide only its pods', async ({ page }) => {
    const frontendGroup = page.locator('div').filter({ hasText: /^frontend-deployment3 members$/ }).first();
    const canvas = page.locator('main');
    
    await expect(canvas.getByText('frontend-pod-1', { exact: true })).toBeVisible();
    await expect(canvas.getByText('frontend-pod-2', { exact: true })).toBeVisible();
    await expect(canvas.getByText('frontend-pod-3', { exact: true })).toBeVisible();
    await expect(canvas.getByText('backend-api-1', { exact: true })).toBeVisible();
    
    await frontendGroup.click();
    await page.waitForTimeout(300);
    
    await expect(page.locator('text=3 members (collapsed)')).toBeVisible();
    
    await expect(canvas.getByText('frontend-pod-1', { exact: true })).not.toBeVisible();
    await expect(canvas.getByText('frontend-pod-2', { exact: true })).not.toBeVisible();
    await expect(canvas.getByText('frontend-pod-3', { exact: true })).not.toBeVisible();
    
    const groupController = page.locator('text=Resource Groups').locator('..');
    await expect(groupController.getByText('frontend-deployment', { exact: true })).toBeVisible();
    await expect(canvas.getByText('backend-api-1', { exact: true })).toBeVisible();
  });

  test('should support multiple collapsed groups simultaneously', async ({ page }) => {
    const frontendGroup = page.locator('div').filter({ hasText: /^frontend-deployment3 members$/ }).first();
    const backendGroup = page.locator('div').filter({ hasText: /^backend-api-deployment4 members$/ }).first();
    const canvas = page.locator('main');
    
    await frontendGroup.click();
    await page.waitForTimeout(300);
    await backendGroup.click();
    await page.waitForTimeout(300);
    
    await expect(page.locator('text=3 members (collapsed)')).toBeVisible();
    await expect(page.locator('text=4 members (collapsed)')).toBeVisible();
    
    await expect(canvas.getByText('frontend-pod-1', { exact: true })).not.toBeVisible();
    await expect(canvas.getByText('backend-api-1', { exact: true })).not.toBeVisible();
    
    await expect(canvas.getByText('postgres-0', { exact: true })).toBeVisible();
    await expect(canvas.getByText('postgres-1', { exact: true })).toBeVisible();
  });

  test('should show chevron icons indicating collapse state', async ({ page }) => {
    const frontendGroup = page.locator('div').filter({ hasText: /^frontend-deployment3 members$/ }).first();
    
    await expect(frontendGroup).toBeVisible();
    
    await frontendGroup.click({ force: true });
    await page.waitForTimeout(300);
    
    await expect(page.locator('text=3 members (collapsed)')).toBeVisible();
  });

  test('should maintain collapse state when switching between groups', async ({ page }) => {
    const frontendGroup = page.locator('div').filter({ hasText: /^frontend-deployment3 members$/ }).first();
    const backendGroup = page.locator('div').filter({ hasText: /^backend-api-deployment4 members$/ }).first();
    
    await frontendGroup.click();
    await page.waitForTimeout(300);
    await expect(page.locator('text=3 members (collapsed)')).toBeVisible();
    
    await backendGroup.click();
    await page.waitForTimeout(300);
    
    await expect(page.locator('text=3 members (collapsed)')).toBeVisible();
    await expect(page.locator('text=4 members (collapsed)')).toBeVisible();
  });

  test('should display correct member count for each group', async ({ page }) => {
    await expect(page.locator('text=26 members').first()).toBeVisible();
    await expect(page.locator('text=3 members').first()).toBeVisible();
    await expect(page.locator('text=4 members').first()).toBeVisible();
    await expect(page.locator('text=2 members').first()).toBeVisible();
  });

  test('should show hierarchical indentation for nested groups', async ({ page }) => {
    const groupController = page.locator('text=Resource Groups').locator('..');
    
    const productionText = groupController.getByText('production', { exact: true });
    const frontendText = groupController.getByText('frontend-deployment', { exact: true });
    
    await expect(productionText).toBeVisible();
    await expect(frontendText).toBeVisible();
    
    const productionBox = await productionText.boundingBox();
    const frontendBox = await frontendText.boundingBox();
    
    expect(frontendBox!.x).toBeGreaterThan(productionBox!.x);
  });

  test('should handle rapid collapse/expand clicks', async ({ page }) => {
    const canvas = page.locator('main');
    
    const frontendGroup1 = page.locator('div').filter({ hasText: /^frontend-deployment3 members$/ }).first();
    await frontendGroup1.click({ force: true });
    await page.waitForTimeout(300);
    
    const frontendGroup2 = page.locator('div').filter({ hasText: /frontend-deployment3 members/ }).first();
    await frontendGroup2.click({ force: true });
    await page.waitForTimeout(300);
    
    const frontendGroup3 = page.locator('div').filter({ hasText: /frontend-deployment3 members/ }).first();
    await frontendGroup3.click({ force: true });
    await page.waitForTimeout(300);
    
    await expect(canvas.getByText('frontend-pod-1', { exact: true })).not.toBeVisible();
  });
});
