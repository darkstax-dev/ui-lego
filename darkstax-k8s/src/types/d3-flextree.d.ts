declare module 'd3-flextree' {
  export interface FlextreeNode {
    data: any;
    x: number;
    y: number;
    children?: FlextreeNode[];
  }

  export interface FlextreeLayout {
    (root: any): FlextreeNode;
    hierarchy(data: any): any;
    nodeSize(size: (node: any) => [number, number]): FlextreeLayout;
    spacing(space: number): FlextreeLayout;
  }

  export function flextree(options?: {
    nodeSize?: (node: any) => [number, number];
    spacing?: number;
  }): FlextreeLayout;
}
