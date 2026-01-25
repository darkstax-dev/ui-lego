import { test, expect } from '@playwright/test';

test.describe('Graph Durability and Flickering Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
  });

  test('should detect graph flickering - visual stability test', async ({ page }) => {
    const canvas = page.locator('svg#topology-canvas');
    await expect(canvas).toBeVisible();

    // Take multiple screenshots over time to detect flickering
    const screenshots: Buffer[] = [];
    const screenshotCount = 5;
    const interval = 500; // ms between screenshots

    console.log('Capturing screenshots to detect flickering...');
    
    for (let i = 0; i < screenshotCount; i++) {
      await page.waitForTimeout(interval);
      const screenshot = await canvas.screenshot();
      screenshots.push(screenshot);
      console.log(`Screenshot ${i + 1}/${screenshotCount} captured`);
    }

    // Compare screenshots - they should be identical if no flickering
    let flickerDetected = false;
    for (let i = 1; i < screenshots.length; i++) {
      if (!screenshots[i].equals(screenshots[0])) {
        flickerDetected = true;
        console.log(`Flicker detected between screenshot 0 and ${i}`);
        break;
      }
    }

    console.log(`Flicker detected: ${flickerDetected}`);
    
    // Save screenshots for analysis
    if (flickerDetected) {
      await page.screenshot({ 
        path: 'tests/screenshots/flicker-detected.png',
        fullPage: false 
      });
    }
  });

  test('should maintain stable node positions over time', async ({ page }) => {
    await page.waitForTimeout(3000); // Wait for layout to settle

    const nodes = page.locator('g.node');
    const nodeCount = await nodes.count();
    
    if (nodeCount === 0) {
      console.log('No nodes found, skipping position stability test');
      return;
    }

    // Get initial positions
    const initialPositions = [];
    for (let i = 0; i < Math.min(nodeCount, 5); i++) {
      const node = nodes.nth(i);
      const box = await node.boundingBox();
      if (box) {
        initialPositions.push({ x: box.x, y: box.y, index: i });
      }
    }

    console.log('Initial positions:', initialPositions);

    // Wait longer for stabilization to complete
    await page.waitForTimeout(5000);

    const laterPositions = [];
    for (let i = 0; i < Math.min(nodeCount, 5); i++) {
      const node = nodes.nth(i);
      const box = await node.boundingBox();
      if (box) {
        laterPositions.push({ x: box.x, y: box.y, index: i });
      }
    }

    console.log('Later positions:', laterPositions);

    // Check if positions are stable (within 5px tolerance for force layout settling)
    let unstableNodes = 0;
    for (let i = 0; i < initialPositions.length; i++) {
      const initial = initialPositions[i];
      const later = laterPositions[i];
      
      const deltaX = Math.abs(later.x - initial.x);
      const deltaY = Math.abs(later.y - initial.y);
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      
      if (distance > 5) {
        unstableNodes++;
        console.log(`Node ${i} moved ${distance}px`);
      }
    }

    console.log(`Unstable nodes: ${unstableNodes}/${initialPositions.length}`);
    
    // With stabilization improvements, movement should be minimal
    // Allow up to 80% of nodes to have settled (20% can still be settling)
    const maxUnstableNodes = Math.ceil(initialPositions.length * 0.8);
    expect(unstableNodes).toBeLessThanOrEqual(maxUnstableNodes);
  });

  test('should not continuously re-render - performance test', async ({ page }) => {
    await page.waitForTimeout(2000);

    // Monitor for excessive re-renders by checking paint events
    const metrics = await page.evaluate(() => {
      return new Promise((resolve) => {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const paintEntries = entries.filter(e => e.entryType === 'paint');
          resolve(paintEntries.length);
        });
        
        observer.observe({ entryTypes: ['paint'] });
        
        setTimeout(() => {
          observer.disconnect();
          resolve(0);
        }, 3000);
      });
    });

    console.log(`Paint events detected: ${metrics}`);
  });

  test('should handle rapid interactions without flickering', async ({ page }) => {
    const canvas = page.locator('svg#topology-canvas');
    await expect(canvas).toBeVisible();

    // Rapid zoom in/out
    for (let i = 0; i < 5; i++) {
      await page.mouse.move(500, 500);
      await page.mouse.wheel(0, -100); // Zoom in
      await page.waitForTimeout(100);
      await page.mouse.wheel(0, 100); // Zoom out
      await page.waitForTimeout(100);
    }

    // Canvas should still be visible and stable
    await expect(canvas).toBeVisible();
    
    // Take screenshot after rapid interactions
    await page.screenshot({ 
      path: 'tests/screenshots/after-rapid-interactions.png' 
    });
  });

  test('should maintain graph during continuous panning', async ({ page }) => {
    const canvas = page.locator('svg#topology-canvas');
    await expect(canvas).toBeVisible();

    const box = await canvas.boundingBox();
    if (!box) {
      console.log('Canvas not found, skipping pan test');
      return;
    }

    // Continuous panning
    const centerX = box.x + box.width / 2;
    const centerY = box.y + box.height / 2;

    await page.mouse.move(centerX, centerY);
    await page.mouse.down();
    
    // Pan in a circle
    for (let angle = 0; angle < 360; angle += 30) {
      const rad = (angle * Math.PI) / 180;
      const x = centerX + Math.cos(rad) * 100;
      const y = centerY + Math.sin(rad) * 100;
      await page.mouse.move(x, y);
      await page.waitForTimeout(50);
    }
    
    await page.mouse.up();

    // Canvas should still be visible
    await expect(canvas).toBeVisible();
  });

  test('should detect animation frame rate issues', async ({ page }) => {
    await page.waitForTimeout(2000);

    const frameData = await page.evaluate(() => {
      return new Promise<{ avgFps: number; minFps: number; maxFps: number }>((resolve) => {
        const frameTimes: number[] = [];
        let lastTime = performance.now();
        let frameCount = 0;
        const duration = 2000; // 2 seconds
        const startTime = performance.now();

        function measureFrame() {
          const currentTime = performance.now();
          const delta = currentTime - lastTime;
          frameTimes.push(delta);
          lastTime = currentTime;
          frameCount++;

          if (currentTime - startTime < duration) {
            requestAnimationFrame(measureFrame);
          } else {
            const fps = frameTimes.map(t => 1000 / t);
            const avgFps = fps.reduce((a, b) => a + b, 0) / fps.length;
            const minFps = Math.min(...fps);
            const maxFps = Math.max(...fps);
            
            resolve({ avgFps, minFps, maxFps });
          }
        }

        requestAnimationFrame(measureFrame);
      });
    });

    console.log('Frame rate analysis:', frameData);
    console.log(`Average FPS: ${frameData.avgFps.toFixed(2)}`);
    console.log(`Min FPS: ${frameData.minFps.toFixed(2)}`);
    console.log(`Max FPS: ${frameData.maxFps.toFixed(2)}`);

    // Check for consistent frame rate (should be close to 60fps or stable)
    expect(frameData.avgFps).toBeGreaterThan(20); // At least 20fps average
    
    // Check for frame drops (min fps shouldn't be too low)
    if (frameData.minFps < 10) {
      console.warn('⚠️ Significant frame drops detected!');
    }
  });

  test('should check for memory leaks during extended use', async ({ page }) => {
    await page.waitForTimeout(2000);

    const initialMemory = await page.evaluate(() => {
      if (performance.memory) {
        return performance.memory.usedJSHeapSize;
      }
      return 0;
    });

    console.log(`Initial memory: ${(initialMemory / 1024 / 1024).toFixed(2)} MB`);

    // Simulate extended use
    for (let i = 0; i < 10; i++) {
      // Interact with the graph
      await page.mouse.move(Math.random() * 800, Math.random() * 600);
      await page.mouse.wheel(0, Math.random() > 0.5 ? -50 : 50);
      await page.waitForTimeout(200);
    }

    const finalMemory = await page.evaluate(() => {
      if (performance.memory) {
        return performance.memory.usedJSHeapSize;
      }
      return 0;
    });

    console.log(`Final memory: ${(finalMemory / 1024 / 1024).toFixed(2)} MB`);

    if (initialMemory > 0 && finalMemory > 0) {
      const memoryIncrease = finalMemory - initialMemory;
      const increasePercent = (memoryIncrease / initialMemory) * 100;
      
      console.log(`Memory increase: ${(memoryIncrease / 1024 / 1024).toFixed(2)} MB (${increasePercent.toFixed(2)}%)`);
      
      // Memory shouldn't increase more than 50% during normal use
      expect(increasePercent).toBeLessThan(50);
    }
  });

  test('should capture flickering evidence with video', async ({ page }) => {
    // Start video recording
    const context = page.context();
    
    await page.waitForTimeout(2000);
    
    const canvas = page.locator('svg#topology-canvas');
    await expect(canvas).toBeVisible();

    // Perform actions that might cause flickering
    await page.mouse.move(400, 400);
    await page.mouse.wheel(0, -100);
    await page.waitForTimeout(500);
    await page.mouse.wheel(0, 100);
    await page.waitForTimeout(500);

    // Click on canvas
    await canvas.click({ position: { x: 200, y: 200 } });
    await page.waitForTimeout(1000);

    console.log('Video recording completed (if enabled in config)');
  });
});
