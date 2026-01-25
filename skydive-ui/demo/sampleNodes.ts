import type { K8sNode } from '../src/TopologyCanvas'

// Sample nodes to make the demo canvas useful immediately (no drag/drop required).
// Positions are chosen to show a simple horizontal flow similar to the Figma example.
export const sampleNodes: K8sNode[] = [
  {
    id: 'ns-1',
    type: 'namespace',
    name: 'ns',
    status: 'ready',
    position: { x: 160, y: 120 },
  },
  {
    id: 'pod-1',
    type: 'pod',
    name: 'pod1',
    status: 'running',
    position: { x: 320, y: 120 },
  },
  {
    id: 'pod-2',
    type: 'pod',
    name: 'pod1',
    status: 'running',
    badge: 2,
    position: { x: 480, y: 120 },
  },
  {
    id: 'pod-3',
    type: 'pod',
    name: 'rdfpod',
    status: 'deploying',
    position: { x: 640, y: 120 },
  },
  {
    id: 'pod-4',
    type: 'pod',
    name: 'az-pod',
    status: 'error',
    position: { x: 800, y: 120 },
  },
  {
    id: 'deploy-1',
    type: 'deployment',
    name: 'azrdf-deployment',
    status: 'terminated',
    position: { x: 980, y: 120 },
  },
]
