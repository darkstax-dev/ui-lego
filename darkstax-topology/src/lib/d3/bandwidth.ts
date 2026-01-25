import { MetricData } from '@/types/graph';

export interface BandwidthResult {
  bps: number;
  normalized: number;
  isActive: boolean;
}

export class BandwidthCalculator {
  private static readonly ACTIVE_THRESHOLD_MS = 5 * 60 * 1000;

  static calculate(metrics: MetricData | undefined): BandwidthResult {
    if (!metrics || !metrics.Last || !metrics.Start) {
      return { bps: 0, normalized: 0, isActive: false };
    }

    const totalBytes = (metrics.RxBytes || 0) + (metrics.TxBytes || 0);
    const deltaMillis = metrics.Last - metrics.Start;
    const elapsedMillis = Date.now() - new Date(metrics.Last).getTime();

    const isActive = elapsedMillis < this.ACTIVE_THRESHOLD_MS;

    if (deltaMillis === 0 || !isActive) {
      return { bps: 0, normalized: 0, isActive: false };
    }

    const bps = Math.floor(8 * totalBytes * 1000 / deltaMillis);

    const normalized = Math.min(bps / 1e9, 1);

    return { bps, normalized, isActive };
  }

  static calculateLatency(metrics: MetricData | undefined): number | null {
    if (!metrics || !metrics.RTT) {
      return null;
    }
    return metrics.RTT;
  }

  static getThresholdColor(normalized: number): string {
    if (normalized > 0.8) return '#ef4444';
    if (normalized > 0.6) return '#f59e0b';
    if (normalized > 0.3) return '#eab308';
    return '#10b981';
  }
}
