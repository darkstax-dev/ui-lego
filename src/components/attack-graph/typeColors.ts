/**
 * Type color configuration for NodeTypeBadge
 * Maps node types to their background and text colors
 */
export interface TypeColor {
  backgroundColor: string;
  textColor: string;
}

export const typeColorMap: Record<string, TypeColor> = {
  datacenter: {
    backgroundColor: 'rgba(4, 81, 164, 0.20)',
    textColor: '#0451A4',
  },
  server: {
    backgroundColor: 'rgba(52, 168, 83, 0.20)',
    textColor: '#34A853',
  },
  workstation: {
    backgroundColor: 'rgba(234, 67, 53, 0.20)',
    textColor: '#EA4335',
  },
  network: {
    backgroundColor: 'rgba(251, 188, 4, 0.20)',
    textColor: '#FBBC04',
  },
  database: {
    backgroundColor: 'rgba(66, 133, 244, 0.20)',
    textColor: '#4285F4',
  },
  default: {
    backgroundColor: 'rgba(120, 121, 122, 0.20)',
    textColor: '#78797A',
  },
};

/**
 * Get color configuration for a given node type
 * Falls back to default color if type is not found
 */
export const getTypeColor = (type: string): TypeColor => {
  return typeColorMap[type.toLowerCase()] || typeColorMap.default;
};
