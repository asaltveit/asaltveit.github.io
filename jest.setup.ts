import '@testing-library/jest-dom'
import { afterEach } from '@jest/globals'
import { cleanup } from '@testing-library/react'

// Mock window.getComputedStyle since it's not fully implemented in jsdom
Object.defineProperty(window, 'getComputedStyle', {
  value: (element: Element, pseudoElement?: string | null) => {
    // Check if element is focused (either activeElement or has :focus pseudo-element)
    const isFocused = element === document.activeElement || pseudoElement === ':focus';
    
    const style = {
      outline: isFocused ? '2px solid' : 'none',
      outlineWidth: isFocused ? '2px' : '0px',
      outlineStyle: isFocused ? 'solid' : 'none',
      outlineColor: isFocused ? 'rgb(99, 102, 241)' : 'transparent',
      display: 'block',
      visibility: 'visible',
      opacity: '1',
      // Add other common CSS properties as needed
      getPropertyValue: (prop: string) => {
        // Return default values for common properties
        const defaults: Record<string, string> = {
          'outline': isFocused ? '2px solid' : 'none',
          'outline-width': isFocused ? '2px' : '0px',
          'outline-style': isFocused ? 'solid' : 'none',
          'outline-color': isFocused ? 'rgb(99, 102, 241)' : 'transparent',
        };
        return defaults[prop] || '';
      },
    } as CSSStyleDeclaration;
    
    return style;
  },
  writable: true,
  configurable: true,
});

// runs a clean after each test case (e.g. clearing jsdom)
afterEach(() => {
    cleanup();
  })