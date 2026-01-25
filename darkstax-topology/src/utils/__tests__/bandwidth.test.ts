import { describe, it, expect } from 'vitest';
import { formatBandwidth, getBandwidthColor } from '../bandwidth';

describe('bandwidth utilities', () => {
  describe('formatBandwidth', () => {
    it('should format bytes correctly', () => {
      expect(formatBandwidth(500)).toBe('500 bps');
    });

    it('should format kilobytes correctly', () => {
      expect(formatBandwidth(1500)).toBe('1.50 Kbps');
    });

    it('should format megabytes correctly', () => {
      expect(formatBandwidth(1500000)).toBe('1.50 Mbps');
    });

    it('should format gigabytes correctly', () => {
      expect(formatBandwidth(1500000000)).toBe('1.50 Gbps');
    });
  });

  describe('getBandwidthColor', () => {
    it('should return green for low bandwidth', () => {
      expect(getBandwidthColor(0.2)).toBe('#10b981');
    });

    it('should return green for medium bandwidth (0.5)', () => {
      expect(getBandwidthColor(0.5)).toBe('#10b981');
    });

    it('should return yellow for high bandwidth (0.6)', () => {
      expect(getBandwidthColor(0.6)).toBe('#f59e0b');
    });

    it('should return red for critical bandwidth', () => {
      expect(getBandwidthColor(0.9)).toBe('#ef4444');
    });
  });
});
