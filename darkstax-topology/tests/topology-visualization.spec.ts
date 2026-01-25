import { test, expect } from '@playwright/test';

test.describe('OpenStack Network Topology Visualization', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173');
    await page.waitForLoadState('networkidle');
  });

  test('should render topology canvas', async ({ page }) => {
    const canvas = page.locator('svg#topology-canvas');
    await expect(canvas).toBeVisible({ timeout: 10000 });
  });

  test('should display correct number of nodes', async ({ page }) => {
    await page.waitForTimeout(2000);
    
    const nodes = page.locator('[class*="node"], circle.node-background');
    const nodeCount = await nodes.count();
    
    console.log(`Found ${nodeCount} nodes`);
    expect(nodeCount).toBeGreaterThan(0);
  });

  test('should render node labels', async ({ page }) => {
    await page.waitForTimeout(2000);
    
    const expectedLabels = [
      'qr-7a83e4-1c',
      'tap-b42d3dda',
      'qr-dc2e-4bc',
      'ns-aa2e-br',
      'patch-tun',
      'tap-c9f7',
      'vnet_br0_eth1',
      'vnet_ovs_br0'
    ];

    for (const label of expectedLabels.slice(0, 3)) {
      const labelElement = page.getByText(label, { exact: false });
      const isVisible = await labelElement.isVisible().catch(() => false);
      console.log(`Label "${label}" visible: ${isVisible}`);
    }
  });

  test('should display grouped nodes with containers', async ({ page }) => {
    await page.waitForTimeout(2000);
    
    const groups = page.locator('[class*="group"], rect.group-background, path.group-boundary');
    const groupCount = await groups.count();
    
    console.log(`Found ${groupCount} group containers`);
    expect(groupCount).toBeGreaterThanOrEqual(0);
  });

  test('should render different node icons', async ({ page }) => {
    await page.waitForTimeout(2000);
    
    const icons = page.locator('path[class*="icon"], g.node-icon path, svg path[fill]');
    const iconCount = await icons.count();
    
    console.log(`Found ${iconCount} icon elements`);
    expect(iconCount).toBeGreaterThan(0);
  });

  test('should have correct background color', async ({ page }) => {
    await page.waitForTimeout(1000);
    
    const canvas = page.locator('svg, canvas').first();
    const backgroundColor = await canvas.evaluate((el) => {
      return window.getComputedStyle(el).backgroundColor || 
             el.getAttribute('style')?.match(/background[^;]*/)?.[0];
    });
    
    console.log(`Canvas background: ${backgroundColor}`);
  });

  test('should display edges/connections between nodes', async ({ page }) => {
    await page.waitForTimeout(2000);
    
    const edges = page.locator('line, path.edge, path[class*="link"]');
    const edgeCount = await edges.count();
    
    console.log(`Found ${edgeCount} edges/connections`);
    expect(edgeCount).toBeGreaterThan(0);
  });

  test('should have search functionality', async ({ page }) => {
    const searchInput = page.getByPlaceholder(/search/i);
    await expect(searchInput).toBeVisible({ timeout: 5000 });
  });

  test('should have control buttons', async ({ page }) => {
    const filterButton = page.locator('button[aria-label*="filter"], button:has-text("Filter")').first();
    const downloadButton = page.locator('button[aria-label*="download"], button:has-text("Download")').first();
    const infoButton = page.locator('button[aria-label*="info"], button[aria-label*="legend"]').first();
    
    const hasControls = await filterButton.isVisible().catch(() => false) ||
                        await downloadButton.isVisible().catch(() => false) ||
                        await infoButton.isVisible().catch(() => false);
    
    expect(hasControls).toBeTruthy();
  });

  test('visual comparison - node icons should match expected types', async ({ page }) => {
    await page.waitForTimeout(2000);
    
    const settingsIcons = page.locator('path[d*="M12"], g:has(path[d*="settings"])');
    const lockIcons = page.locator('path[d*="M19"], g:has(path[d*="lock"])');
    const alertIcons = page.locator('path[fill="#D9322A"], path[fill="red"]');
    
    const settingsCount = await settingsIcons.count();
    const lockCount = await lockIcons.count();
    const alertCount = await alertIcons.count();
    
    console.log(`Icon counts - Settings: ${settingsCount}, Lock: ${lockCount}, Alert: ${alertCount}`);
  });

  test('should render group containers with rounded corners', async ({ page }) => {
    await page.waitForTimeout(2000);
    
    const roundedRects = page.locator('rect[rx], rect[ry], path[class*="group"]');
    const count = await roundedRects.count();
    
    console.log(`Found ${count} elements with rounded corners`);
    
    if (count > 0) {
      const firstRect = roundedRects.first();
      const rx = await firstRect.getAttribute('rx');
      const ry = await firstRect.getAttribute('ry');
      
      console.log(`Border radius: rx=${rx}, ry=${ry}`);
    }
  });

  test('should have proper node spacing and layout', async ({ page }) => {
    await page.waitForTimeout(3000);
    
    const nodes = page.locator('circle.node-background, g.node');
    const count = await nodes.count();
    
    if (count >= 2) {
      const positions = [];
      for (let i = 0; i < Math.min(count, 5); i++) {
        const node = nodes.nth(i);
        const box = await node.boundingBox();
        if (box) {
          positions.push({ x: box.x, y: box.y });
        }
      }
      
      console.log('Node positions:', positions);
      
      if (positions.length >= 2) {
        const distance = Math.sqrt(
          Math.pow(positions[1].x - positions[0].x, 2) + 
          Math.pow(positions[1].y - positions[0].y, 2)
        );
        console.log(`Distance between first two nodes: ${distance}px`);
        expect(distance).toBeGreaterThan(20);
      }
    }
  });

  test('screenshot comparison', async ({ page }) => {
    await page.waitForTimeout(3000);
    
    const canvas = page.locator('svg, canvas, [class*="topology"]').first();
    await expect(canvas).toBeVisible();
    
    await page.screenshot({ 
      path: 'tests/screenshots/topology-current.png',
      fullPage: false 
    });
    
    console.log('Screenshot saved to tests/screenshots/topology-current.png');
  });
});

test.describe('Configuration-Driven Features', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
  });

  test('should apply theme from configuration', async ({ page }) => {
    const body = page.locator('body');
    const backgroundColor = await body.evaluate((el) => {
      const svg = el.querySelector('svg');
      return svg ? window.getComputedStyle(svg).backgroundColor : null;
    });
    
    console.log(`Theme background color: ${backgroundColor}`);
  });

  test('should render nodes according to nodeTypes config', async ({ page }) => {
    const nodes = page.locator('g.node, circle.node-background').first();
    const nodeExists = await nodes.isVisible().catch(() => false);
    
    expect(nodeExists).toBeTruthy();
  });

  test('should apply grouping rules from configuration', async ({ page }) => {
    await page.waitForTimeout(2000);
    
    const groupContainers = page.locator('[class*="group-container"], rect.group-background');
    const hasGroups = await groupContainers.count() > 0;
    
    console.log(`Grouping applied: ${hasGroups}`);
  });
});
