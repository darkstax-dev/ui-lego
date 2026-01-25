/**
 * Calculate the convex hull of a set of 2D points
 * Uses Graham scan algorithm
 */
export interface Point {
  x: number;
  y: number;
}

function crossProduct(o: Point, a: Point, b: Point): number {
  return (a.x - o.x) * (b.y - o.y) - (a.y - o.y) * (b.x - o.x);
}

export function convexHull(points: Point[]): Point[] {
  if (points.length <= 2) return points;

  // Sort points lexicographically
  const sorted = [...points].sort((a, b) => a.x - b.x || a.y - b.y);

  // Build lower hull
  const lower: Point[] = [];
  for (const p of sorted) {
    while (lower.length >= 2 && crossProduct(lower[lower.length - 2], lower[lower.length - 1], p) <= 0) {
      lower.pop();
    }
    lower.push(p);
  }

  // Build upper hull
  const upper: Point[] = [];
  for (let i = sorted.length - 1; i >= 0; i--) {
    const p = sorted[i];
    while (upper.length >= 2 && crossProduct(upper[upper.length - 2], upper[upper.length - 1], p) <= 0) {
      upper.pop();
    }
    upper.push(p);
  }

  // Remove last point of each half because it's repeated
  return lower.slice(0, -1).concat(upper.slice(0, -1));
}

/**
 * Create a rounded rectangle path around a bounding box
 */
export function createRoundedRectPath(
  minX: number,
  minY: number,
  maxX: number,
  maxY: number,
  radius: number = 20
): string {
  return `
    M ${minX + radius} ${minY}
    L ${maxX - radius} ${minY}
    Q ${maxX} ${minY} ${maxX} ${minY + radius}
    L ${maxX} ${maxY - radius}
    Q ${maxX} ${maxY} ${maxX - radius} ${maxY}
    L ${minX + radius} ${maxY}
    Q ${minX} ${maxY} ${minX} ${maxY - radius}
    L ${minX} ${minY + radius}
    Q ${minX} ${minY} ${minX + radius} ${minY}
    Z
  `;
}

/**
 * Create a path from convex hull points
 */
export function hullToPath(points: Point[]): string {
  if (points.length === 0) return '';
  
  const commands: string[] = [];
  points.forEach((point, i) => {
    if (i === 0) {
      commands.push(`M ${point.x} ${point.y}`);
    } else {
      commands.push(`L ${point.x} ${point.y}`);
    }
  });
  commands.push('Z'); // Close path
  
  return commands.join(' ');
}
