test.describe('Kubernetes Topology - Collapse/Expand Feature', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('can collapse a node group and hide its children', async ({ page }) => {
    const parentNode = page.locator('[data-node-id="deploy-frontend"]').first();
    await expect(parentNode).toBeVisible();

    const childNode = page.getByText('frontend-pod-1').first();
    await expect(childNode).toBeVisible();

    const parentContainer = parentNode.locator('..');
    await parentContainer.getByRole('button', { name: 'Collapse' }).click();

    await expect(childNode).not.toBeVisible();
  });

  test('can expand a collapsed node group and show its children', async ({ page }) => {
    const parentNode = page.locator('[data-node-id="deploy-frontend"]').first();
    await expect(parentNode).toBeVisible();

    const childNode = page.getByText('frontend-pod-1').first();
    await expect(childNode).toBeVisible();

    const parentContainer = parentNode.locator('..');
    await parentContainer.getByRole('button', { name: 'Collapse' }).click();
    await expect(childNode).not.toBeVisible();

    await parentContainer.getByRole('button', { name: 'Expand' }).click();
    await expect(childNode).toBeVisible();
  });
});
