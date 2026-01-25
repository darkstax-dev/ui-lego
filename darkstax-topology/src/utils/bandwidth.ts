export function formatBandwidth(bps: number): string {
  if (bps >= 1e9) return `${(bps / 1e9).toFixed(2)} Gbps`;
  if (bps >= 1e6) return `${(bps / 1e6).toFixed(2)} Mbps`;
  if (bps >= 1e3) return `${(bps / 1e3).toFixed(2)} Kbps`;
  return `${bps} bps`;
}

export function getBandwidthColor(bandwidth: number): string {
  if (bandwidth > 0.8) return '#ef4444';
  if (bandwidth > 0.5) return '#f59e0b';
  return '#10b981';
}
