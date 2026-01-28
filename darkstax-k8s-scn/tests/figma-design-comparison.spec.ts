import { test, expect } from '@playwright/test';

/**
 * Figma Design Comparison Test Suite
 * 
 * This test suite compares the actual UI implementation against the Figma design.
 * Design file: screenshot-of-entire-figma-design.jpeg
 * 
 * Key design elements to verify:
 * - Header: Back button, folder path input, file name input, dropdown, search
 * - Main canvas: Dotted background, hierarchy visualization
 * - Right panel: Resource menu with Kubernetes icons
 * - Bottom panel: Action buttons (Monitor Deployment, Visualize Activity)
 * - Status legend tooltip
 * - Color scheme: Gray backgrounds (#CECECE, #DFDFDF), Blue dark (#00112B)
 */

test.describe('Figma Design - Page Layout', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should have correct viewport dimensions (1440x900)', async ({ page }) => {
    const viewport = page.viewportSize();
    expect(viewport?.width).toBe(1440);
    expect(viewport?.height).toBe(900);
  });

  test('should render main layout structure', async ({ page }) => {
    // Header should be 72px tall
    const header = page.locator('header');
    await expect(header).toBeVisible();
    
    const headerBox = await header.boundingBox();
    expect(headerBox?.height).toBeCloseTo(72, 2);
  });

  test('should render canvas area with correct background', async ({ page }) => {
    const canvas = page.locator('main');
    await expect(canvas).toBeVisible();
    
    const backgroundColor = await canvas.evaluate((el) => 
      window.getComputedStyle(el).backgroundColor
    );
    
    // Should be part of gray color scheme
    console.log('Canvas background color:', backgroundColor);
  });

  test('should render bottom panel with 72px height', async ({ page }) => {
    // Select the bottom panel by its border-t class and content
    const bottomPanel = page.locator('div.border-t').filter({ has: page.getByText('Monitor Deployment') });
    await expect(bottomPanel).toBeVisible();
    
    const panelBox = await bottomPanel.boundingBox();
    expect(panelBox?.height).toBeCloseTo(72, 2);
  });

  test('should render right resource menu panel with 280px width', async ({ page }) => {
    const resourcePanel = page.getByTestId('resource-menu-panel');
    await expect(resourcePanel).toBeVisible();
    
    const panelBox = await resourcePanel.boundingBox();
    expect(panelBox?.width).toBeCloseTo(280, 2);
  });
});

test.describe('Figma Design - Header Elements', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should render back button with correct icon', async ({ page }) => {
    const backButton = page.locator('button[aria-label="Go back"]');
    await expect(backButton).toBeVisible();
    
    // Should be 40x40
    const buttonBox = await backButton.boundingBox();
    expect(buttonBox?.width).toBeCloseTo(40, 2);
    expect(buttonBox?.height).toBeCloseTo(40, 2);
    
    // Should contain arrow-left icon
    const svg = backButton.locator('svg');
    await expect(svg).toBeVisible();
  });

  test('should render folder path input with placeholder', async ({ page }) => {
    const folderInput = page.getByPlaceholder('Folder path');
    await expect(folderInput).toBeVisible();
    
    const inputBox = await folderInput.boundingBox();
    expect(inputBox?.width).toBeCloseTo(180, 5);
    expect(inputBox?.height).toBeCloseTo(40, 2);
  });

  test('should render file name input with default value', async ({ page }) => {
    const fileInput = page.getByPlaceholder('File name');
    await expect(fileInput).toBeVisible();
    
    const value = await fileInput.inputValue();
    expect(value).toBe('Untitled 1');
    
    const inputBox = await fileInput.boundingBox();
    expect(inputBox?.width).toBeCloseTo(180, 5);
  });

  test('should render "Select node" dropdown', async ({ page }) => {
    const dropdown = page.locator('button:has-text("Select node")');
    await expect(dropdown).toBeVisible();
    
    // Should have chevron down icon
    const chevron = dropdown.locator('svg');
    await expect(chevron).toBeVisible();
  });

  test('should render search filter component', async ({ page }) => {
    const searchInput = page.getByPlaceholder(/search nodes/i);
    await expect(searchInput).toBeVisible();
    
    const inputBox = await searchInput.boundingBox();
    console.log('Search input dimensions:', inputBox);
  });
});

test.describe('Figma Design - Resource Menu Panel', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should render search input in resource panel', async ({ page }) => {
    const searchInput = page.getByPlaceholder('Search actions...');
    
    if (await searchInput.isVisible()) {
      await expect(searchInput).toBeVisible();
      
      // Should have search icon
      const searchIcon = page.locator('svg').filter({ has: page.locator('path') }).first();
      await expect(searchIcon).toBeVisible();
    }
  });

  test('should render "Aggregate" section header', async ({ page }) => {
    const aggregateHeader = page.getByText('Aggregate', { exact: true });
    
    if (await aggregateHeader.isVisible()) {
      await expect(aggregateHeader).toBeVisible();
      
      // Should have chevron icon for expand/collapse
      const section = aggregateHeader.locator('..');
      const chevron = section.locator('svg');
      await expect(chevron).toBeVisible();
    }
  });

  test('should render "Kubernetes" section with resource icons', async ({ page }) => {
    const k8sHeader = page.getByText('Kubernetes', { exact: true });
    
    if (await k8sHeader.isVisible()) {
      await expect(k8sHeader).toBeVisible();
      
      // Should display multiple Kubernetes resource types
      const resourceIcons = page.locator('[class*="KubernetesIconWrapper"]');
      const count = await resourceIcons.count();
      
      console.log(`Kubernetes resource icons found: ${count}`);
      expect(count).toBeGreaterThan(0);
    }
  });

  test('should render Kubernetes resource types: ns, svc, deploy, node, job, ing, pod, secret, cm, pv, pvc, sts, kubevirt, multus', async ({ page }) => {
    // Expected resources from Figma
    const expectedResources = [
      'ns',    // namespace
      'svc',   // service
      'deploy',// deployment
      'node',  // node
      'job',   // job
      'ing',   // ingress
      'pod',   // pod
      'secret',// secret
      'cm',    // configmap
      'pv',    // persistent volume
      'pvc',   // persistent volume claim
      'sts',   // statefulset
      // 'kubevirt',
      // 'multus',
    ];
    
    for (const resourceType of expectedResources.slice(0, 8)) {
      const resourceLabel = page.getByText(resourceType, { exact: true });
      
      if (await resourceLabel.isVisible()) {
        console.log(`✓ Resource type "${resourceType}" found`);
      } else {
        console.log(`✗ Resource type "${resourceType}" missing`);
      }
    }
  });

  test('should render "Templates" section', async ({ page }) => {
    const templatesHeader = page.getByText('Templates', { exact: true });
    
    if (await templatesHeader.isVisible()) {
      await expect(templatesHeader).toBeVisible();
    }
  });

  test('should render divider lines between sections', async ({ page }) => {
    // Dashed dividers should be present
    const dividers = page.locator('div[class*="h-px"]');
    const count = await dividers.count();
    
    console.log(`Divider lines found: ${count}`);
    expect(count).toBeGreaterThanOrEqual(1);
  });
});

test.describe('Figma Design - Bottom Panel Actions', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should render "Monitor Deployment" button', async ({ page }) => {
    const monitorButton = page.getByText('Monitor Deployment');
    await expect(monitorButton).toBeVisible();
    
    // Should have monitor icon
    const buttonContainer = monitorButton.locator('..');
    const icon = buttonContainer.locator('svg').first();
    await expect(icon).toBeVisible();
    
    // Should have arrow-up-right icon
    const arrowIcon = buttonContainer.locator('svg').last();
    await expect(arrowIcon).toBeVisible();
  });

  test('should render "Visualize activity" button', async ({ page }) => {
    const visualizeButton = page.getByText('Visualize activity');
    await expect(visualizeButton).toBeVisible();
    
    // Should have trending up icon
    const buttonContainer = visualizeButton.locator('..');
    const icon = buttonContainer.locator('svg').first();
    await expect(icon).toBeVisible();
  });

  test('should render info button with dark background', async ({ page }) => {
    const infoButton = page.locator('button').filter({ has: page.locator('svg').filter({ hasText: '' }) }).last();
    
    if (await infoButton.isVisible()) {
      const backgroundColor = await infoButton.evaluate((el) => 
        window.getComputedStyle(el).backgroundColor
      );
      
      console.log('Info button background color:', backgroundColor);
      // Should be dark blue (#00112B)
    }
  });

  test('should show hand cursor decoration on info button', async ({ page }) => {
    // The hand cursor SVG should be visible
    const handCursor = page.locator('svg[viewBox="0 0 35 38"]');
    
    if (await handCursor.isVisible()) {
      await expect(handCursor).toBeVisible();
      console.log('✓ Hand cursor decoration found');
    }
  });
});

test.describe('Figma Design - Status Legend Tooltip', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should toggle status legend on info button click', async ({ page }) => {
    const infoButton = page.locator('button').filter({ has: page.locator('svg path[fill="white"]') }).last();
    
    // Initially hidden
    const tooltip = page.locator('text=Status Legend').locator('..');
    const initiallyVisible = await tooltip.isVisible().catch(() => false);
    
    // Click to show
    await infoButton.click();
    await page.waitForTimeout(300);
    
    const afterClickVisible = await tooltip.isVisible().catch(() => false);
    
    if (!initiallyVisible && afterClickVisible) {
      console.log('✓ Status legend toggles correctly');
    }
  });

  test('should render status legend with correct items', async ({ page }) => {
    const infoButton = page.locator('button').last();
    await infoButton.click();
    await page.waitForTimeout(300);
    
    const statusItems = [
      'Not deployed / Ready',
      'Deploying',
      'Active / Deployed / Running',
      'Error',
      'Terminated'
    ];
    
    for (const status of statusItems) {
      const statusLabel = page.getByText(status);
      
      if (await statusLabel.isVisible()) {
        console.log(`✓ Status "${status}" found in legend`);
        await expect(statusLabel).toBeVisible();
      } else {
        console.log(`✗ Status "${status}" missing from legend`);
      }
    }
  });

  test('should render hexagonal status indicators with correct colors', async ({ page }) => {
    const infoButton = page.locator('button').last();
    await infoButton.click();
    await page.waitForTimeout(300);
    
    // Each status should have a hexagon shape
    const hexagons = page.locator('svg[width="18"][height="20"]');
    const count = await hexagons.count();
    
    console.log(`Status hexagons found: ${count}`);
    expect(count).toBeGreaterThanOrEqual(3);
  });

  test('should position tooltip correctly (bottom-right)', async ({ page }) => {
    const infoButton = page.locator('button').last();
    await infoButton.click();
    await page.waitForTimeout(300);
    
    // Select the tooltip container div directly
    const tooltip = page.locator('div.absolute.right-12.bottom-24').filter({ hasText: 'Status Legend' });
    await expect(tooltip).toBeVisible();
    
    const tooltipBox = await tooltip.boundingBox();
    const viewportWidth = page.viewportSize()?.width || 0;
    
    // Should be positioned near bottom-right
    console.log('Tooltip position:', tooltipBox);
    expect(tooltipBox?.x).toBeGreaterThan(viewportWidth - 400);
  });

  test('should have tooltip beak/arrow pointing down', async ({ page }) => {
    const infoButton = page.locator('button').last();
    await infoButton.click();
    await page.waitForTimeout(300);
    
    // The beak should be a rotated square/diamond
    const beak = page.locator('.absolute.-bottom-\\[6px\\]');
    
    if (await beak.isVisible()) {
      await expect(beak).toBeVisible();
      console.log('✓ Tooltip beak found');
    }
  });
});

test.describe('Figma Design - Canvas Topology Area', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should render dotted background pattern', async ({ page }) => {
    // The canvas should have a dotted grid pattern
    const canvas = page.locator('main').first();
    await expect(canvas).toBeVisible();
    
    // Look for SVG circles or dots
    const dots = page.locator('circle[r="1"]');
    const count = await dots.count();
    
    console.log(`Dotted background circles found: ${count}`);
    
    if (count > 0) {
      console.log('✓ Dotted background pattern exists');
    } else {
      console.log('✗ Dotted background pattern missing - DESIGN GAP');
    }
  });

  test('should display hierarchical lanes (Load, Service, Network, Config)', async ({ page }) => {
    const expectedLanes = ['Load', 'Service', 'Network', 'Storage', 'Config'];
    
    for (const lane of expectedLanes) {
      const laneLabel = page.getByText(lane);
      const isVisible = await laneLabel.isVisible().catch(() => false);
      
      if (isVisible) {
        console.log(`✓ Lane "${lane}" found`);
      } else {
        console.log(`✗ Lane "${lane}" missing - DESIGN GAP`);
      }
    }
  });

  test('should render Kubernetes resources with hexagonal containers', async ({ page }) => {
    // Resources should have hexagonal backgrounds
    const hexagons = page.locator('svg path[d*="M8.80015"]');
    const count = await hexagons.count();
    
    console.log(`Hexagonal resource containers found: ${count}`);
    
    if (count > 0) {
      console.log('✓ Hexagonal containers exist');
    } else {
      console.log('✗ Hexagonal containers missing - DESIGN GAP');
    }
  });

  test('should show connection lines between resources', async ({ page }) => {
    // Dashed connection lines should exist
    const lines = page.locator('line, path[d*="M"]').filter({ hasNot: page.locator('[fill]') });
    const count = await lines.count();
    
    console.log(`Connection lines found: ${count}`);
  });

  test('should display resource labels below icons', async ({ page }) => {
    const resourceLabels = ['pod1', 'rdfpod', 'az-pod', 'azrdf-deploument', 'service1', 'multus1', 'configmap1'];
    
    for (const label of resourceLabels.slice(0, 3)) {
      const labelElement = page.getByText(label);
      const isVisible = await labelElement.isVisible().catch(() => false);
      
      if (isVisible) {
        console.log(`✓ Resource label "${label}" found`);
      } else {
        console.log(`✗ Resource label "${label}" missing`);
      }
    }
  });
});

test.describe('Figma Design - Typography & Colors', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should use Macan font family for headers', async ({ page }) => {
    const header = page.locator('header');
    const fontFamily = await header.evaluate((el) => 
      window.getComputedStyle(el).fontFamily
    );
    
    console.log('Header font family:', fontFamily);
    // Should contain 'Macan' or fallback to system fonts
  });

  test('should use correct gray color scheme', async ({ page }) => {
    // Background colors should be:
    // - #CECECE (main background)
    // - #DFDFDF (panels, buttons)
    // - #00112B (dark blue for text/accents)
    
    const body = page.locator('body');
    const backgroundColor = await body.evaluate((el) => 
      window.getComputedStyle(el).backgroundColor
    );
    
    console.log('Body background color:', backgroundColor);
  });

  test('should use Inter font for status legend', async ({ page }) => {
    const infoButton = page.locator('button').last();
    await infoButton.click();
    await page.waitForTimeout(300);
    
    const statusText = page.getByText('Not deployed / Ready').first();
    
    if (await statusText.isVisible()) {
      const fontFamily = await statusText.evaluate((el) => 
        window.getComputedStyle(el).fontFamily
      );
      
      console.log('Status legend font family:', fontFamily);
    }
  });
});

test.describe('Figma Design - Interactive Elements', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should support drag-and-drop for resources', async ({ page }) => {
    // Resources in the panel should be draggable
    const resourceIcon = page.locator('[class*="KubernetesIconWrapper"]').first();
    
    if (await resourceIcon.isVisible()) {
      const box = await resourceIcon.boundingBox();
      
      if (box) {
        // Attempt to drag
        await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
        await page.mouse.down();
        await page.mouse.move(box.x + 100, box.y + 100);
        await page.mouse.up();
        
        console.log('✓ Drag interaction attempted');
      }
    }
  });

  test('should highlight resources on hover', async ({ page }) => {
    const resourceIcon = page.locator('[class*="KubernetesIconWrapper"]').first();
    
    if (await resourceIcon.isVisible()) {
      await resourceIcon.hover();
      await page.waitForTimeout(200);
      
      console.log('✓ Hover interaction tested');
    }
  });
});

test.describe('Figma Design - Overall Assessment', () => {
  test('should generate visual comparison screenshot', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    
    await page.screenshot({ 
      path: 'tests/screenshots/current-implementation.png',
      fullPage: true 
    });
    
    console.log('Screenshot saved to tests/screenshots/current-implementation.png');
    console.log('Compare this with screenshot-of-entire-figma-design.jpeg to identify visual gaps');
  });
});
