import { describe, it, expect } from 'vitest';
import { FilterEngine } from '../FilterEngine';
import { TopologyNode, TopologyEdge } from '@/types/graph';

describe('FilterEngine', () => {
  const mockNodes: TopologyNode[] = [
    {
      id: '1',
      type: 'host',
      position: { x: 0, y: 0 },
      data: {
        label: 'Host 1',
        metadata: { Type: 'host', Name: 'host-1', State: 'UP', TID: 'tid-1' }
      }
    },
    {
      id: '2',
      type: 'container',
      position: { x: 100, y: 100 },
      data: {
        label: 'Container 1',
        metadata: { Type: 'container', Name: 'container-1', TID: 'tid-2' }
      }
    },
  ];

  const mockEdges: TopologyEdge[] = [];

  it('should return all nodes for empty query', () => {
    const engine = new FilterEngine(mockNodes, mockEdges);
    const result = engine.executeQuery('');
    expect(result.nodes).toHaveLength(2);
  });

  it('should filter nodes by type', () => {
    const engine = new FilterEngine(mockNodes, mockEdges);
    const result = engine.executeQuery('g.V().Has("Type", "host")');
    expect(result.nodes).toHaveLength(1);
    expect(result.nodes[0].type).toBe('host');
  });

  it('should filter nodes by HasKey', () => {
    const engine = new FilterEngine(mockNodes, mockEdges);
    const result = engine.executeQuery('g.V().HasKey("State")');
    expect(result.nodes).toHaveLength(1);
    expect(result.nodes[0].id).toBe('1');
  });

  it('should limit results', () => {
    const engine = new FilterEngine(mockNodes, mockEdges);
    const result = engine.executeQuery('g.V().Limit(1)');
    expect(result.nodes).toHaveLength(1);
  });

  it('should highlight nodes by search term', () => {
    const engine = new FilterEngine(mockNodes, mockEdges);
    const highlighted = engine.highlightNodes('host');
    expect(highlighted.size).toBeGreaterThan(0);
    expect(highlighted.has('1')).toBe(true);
  });
});
