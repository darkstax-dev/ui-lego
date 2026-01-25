export interface PerformanceMetrics {
  fps: number;
  renderTime: number;
  nodeCount: number;
  edgeCount: number;
  memoryUsage?: number;
}

export class PerformanceMonitor {
  private frameCount = 0;
  private lastTime = performance.now();
  private fps = 60;
  private renderTimes: number[] = [];
  private callbacks: Set<(metrics: PerformanceMetrics) => void> = new Set();
  private animationFrameId: number | null = null;

  start() {
    this.stop();
    this.measure();
  }

  stop() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  onMetricsUpdate(callback: (metrics: PerformanceMetrics) => void) {
    this.callbacks.add(callback);
    return () => this.callbacks.delete(callback);
  }

  recordRenderTime(time: number) {
    this.renderTimes.push(time);
    if (this.renderTimes.length > 60) {
      this.renderTimes.shift();
    }
  }

  private measure() {
    this.frameCount++;
    const currentTime = performance.now();
    const elapsed = currentTime - this.lastTime;

    if (elapsed >= 1000) {
      this.fps = Math.round((this.frameCount * 1000) / elapsed);
      this.frameCount = 0;
      this.lastTime = currentTime;

      const avgRenderTime = this.renderTimes.length > 0
        ? this.renderTimes.reduce((a, b) => a + b, 0) / this.renderTimes.length
        : 0;

      const metrics: PerformanceMetrics = {
        fps: this.fps,
        renderTime: avgRenderTime,
        nodeCount: 0,
        edgeCount: 0,
        memoryUsage: (performance as any).memory?.usedJSHeapSize,
      };

      this.callbacks.forEach(callback => callback(metrics));
    }

    this.animationFrameId = requestAnimationFrame(() => this.measure());
  }
}
