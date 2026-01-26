import React from 'react';

/**
 * Extracts SVG content from an icon element in the DOM
 * This function expects to be passed a ref to an element containing the SVG
 */
export const extractSVGFromElement = (element: HTMLElement | null): string => {
  if (!element) return '';
  
  const svgElement = element.querySelector('svg');
  if (!svgElement) return '';
  
  return svgElement.outerHTML;
};

/**
 * Creates SVG markup string from icon component
 * This renders the icon to a temporary DOM element to extract its SVG
 */
export const createSVGString = (
  IconComponent: React.ComponentType<any>,
  props: { width?: number; height?: number; fill?: string } = {}
): string => {
  const defaultProps = {
    width: 24,
    height: 24,
    fill: 'currentColor',
    ...props
  };
  
  // Create a temporary container
  const tempDiv = document.createElement('div');
  tempDiv.style.position = 'absolute';
  tempDiv.style.left = '-9999px';
  document.body.appendChild(tempDiv);
  
  try {
    // Create the icon element
    const iconElement = React.createElement(IconComponent, defaultProps);
    
    // Use a simple DOM manipulation approach
    const wrapper = document.createElement('div');
    tempDiv.appendChild(wrapper);
    
    // For synchronous extraction, we'll use innerHTML after component creates SVG
    // This works because our icon components return SVG elements directly
    const tempRoot = document.createElement('div');
    const iconInstance: any = iconElement;
    
    // Try to get SVG from the component's render output
    if (iconInstance && iconInstance.type) {
      const result = iconInstance.type(iconInstance.props);
      if (result && result.type === 'svg') {
        // Create actual SVG element
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        
        // Copy props to SVG
        Object.keys(result.props || {}).forEach(key => {
          if (key === 'children') return;
          const value = result.props[key];
          if (key === 'className') {
            svg.setAttribute('class', value);
          } else if (typeof value === 'string' || typeof value === 'number') {
            svg.setAttribute(key, String(value));
          }
        });
        
        // Add children
        if (result.props.children) {
          tempRoot.appendChild(svg);
          const renderChildren = (children: any, parent: any) => {
            React.Children.forEach(children, (child: any) => {
              if (!child) return;
              if (typeof child === 'string') {
                parent.appendChild(document.createTextNode(child));
              } else if (child.type) {
                const elem = document.createElementNS('http://www.w3.org/2000/svg', child.type);
                Object.keys(child.props || {}).forEach(key => {
                  if (key === 'children') return;
                  const value = child.props[key];
                  if (typeof value === 'string' || typeof value === 'number') {
                    elem.setAttribute(key, String(value));
                  }
                });
                parent.appendChild(elem);
                if (child.props.children) {
                  renderChildren(child.props.children, elem);
                }
              }
            });
          };
          renderChildren(result.props.children, svg);
        }
        
        return svg.outerHTML;
      }
    }
    
    return '';
  } finally {
    document.body.removeChild(tempDiv);
  }
};

/**
 * Copies SVG content to clipboard from an element
 * @param svgElement - The SVG element to copy
 * @returns Promise that resolves when copy is complete
 */
export const copySVGToClipboard = async (svgElement: SVGElement | null): Promise<void> => {
  try {
    if (!svgElement) {
      throw new Error('No SVG element provided');
    }
    
    const svgContent = svgElement.outerHTML;
    await navigator.clipboard.writeText(svgContent);
  } catch (error) {
    console.error('Error copying SVG to clipboard:', error);
    throw error;
  }
};

/**
 * Downloads SVG content as a file from an element
 * @param svgElement - The SVG element to download
 * @param filename - Name for the downloaded file
 */
export const downloadSVG = (svgElement: SVGElement | null, filename: string): void => {
  try {
    if (!svgElement) {
      throw new Error('No SVG element provided');
    }
    
    const svgContent = svgElement.outerHTML;
    const blob = new Blob([svgContent], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `${filename}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error downloading SVG:', error);
    throw error;
  }
};
