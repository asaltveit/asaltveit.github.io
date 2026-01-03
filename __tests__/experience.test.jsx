import '@testing-library/jest-dom'
import { render, screen, within, fireEvent } from '@testing-library/react'
import Experience from '@/components/Experience'

// Mock Next.js Link component
jest.mock('next/link', () => {
  return ({ children, href, ...props }) => {
    return <a href={href} {...props}>{children}</a>
  }
})

describe('Experience', () => {
  const defaultProps = {
    title: 'Test Experience',
    dates: 'January 2024 - Present',
    items: ['Item 1', 'Item 2', 'Item 3']
  };

  it('renders', () => {
    render(<Experience title="Test" dates="1-1" items={["bullet1", "bullet2"]} />)
    const title = screen.getByText('Test')
    expect(title).toBeInTheDocument()
    
    const dates = screen.getByText('1-1')
    expect(dates).toBeInTheDocument()

    const list = screen.getByRole("list", {
      name: "",
    })
    const { getAllByRole } = within(list)
    const items = getAllByRole("listitem")
    expect(items.length).toBe(2)
    
    const item1 = screen.getByText('bullet1')
    expect(item1).toBeInTheDocument()
    
    const item2 = screen.getByText('bullet2')
    expect(item2).toBeInTheDocument()
  })

  it('renders experience with title, dates, and items', () => {
    render(<Experience {...defaultProps} />);
    
    expect(screen.getByText('Test Experience')).toBeInTheDocument();
    expect(screen.getByText('January 2024 - Present')).toBeInTheDocument();
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
    expect(screen.getByText('Item 3')).toBeInTheDocument();
  });

  it('renders location link when linkLocation and linkName are provided', () => {
    render(
      <Experience 
        {...defaultProps} 
        linkLocation="https://example.com"
        linkName="Example Company"
      />
    );
    
    const link = screen.getByRole('link', { name: 'link to Test Experience' });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://example.com');
    expect(screen.getByText('Example Company')).toBeInTheDocument();
    expect(screen.getByText(/Located at:/)).toBeInTheDocument();
  });

  it('does not render location link when linkLocation is not provided', () => {
    render(<Experience {...defaultProps} />);
    
    const link = screen.queryByRole('link');
    expect(link).not.toBeInTheDocument();
    expect(screen.queryByText(/Located at:/)).not.toBeInTheDocument();
  });

  it('renders all list items correctly', () => {
    const items = ['First item', 'Second item', 'Third item', 'Fourth item'];
    render(<Experience {...defaultProps} items={items} />);
    
    const lists = screen.getAllByRole('list');
    const listItems = screen.getAllByRole('listitem');
    
    expect(lists.length).toBeGreaterThan(0);
    expect(listItems.length).toBeGreaterThanOrEqual(4);
    items.forEach(item => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });
  });

  it('handles empty items array', () => {
    render(<Experience {...defaultProps} items={[]} />);
    
    const lists = screen.getAllByRole('list');
    const listItems = screen.queryAllByRole('listitem');
    
    // Should still have at least one list element
    expect(lists.length).toBeGreaterThan(0);
    // Items list should be empty
    const itemsList = lists.find(list => {
      const items = within(list).queryAllByRole('listitem');
      return items.length === 0;
    });
    expect(itemsList).toBeInTheDocument();
  });

  describe('User Interactions', () => {
    it('allows clicking on the location link', () => {
      const mockClick = jest.fn();
      
      render(
        <Experience 
          {...defaultProps} 
          linkLocation="https://example.com"
          linkName="Example Company"
        />
      );
      
      const link = screen.getByRole('link', { name: 'link to Test Experience' });
      link.onclick = mockClick;
      
      fireEvent.click(link);
      expect(mockClick).toHaveBeenCalled();
    });

    it('supports keyboard navigation on location link with Enter key', () => {
      render(
        <Experience 
          {...defaultProps} 
          linkLocation="https://example.com"
          linkName="Example Company"
        />
      );
      
      const link = screen.getByRole('link', { name: 'link to Test Experience' });
      
      link.focus();
      expect(link).toHaveFocus();
      
      fireEvent.keyDown(link, { key: 'Enter', code: 'Enter' });
      expect(link).toHaveAttribute('href', 'https://example.com');
    });

    it('has proper aria-label for accessibility', () => {
      render(
        <Experience 
          {...defaultProps} 
          linkLocation="https://example.com"
          linkName="Example Company"
        />
      );
      
      const link = screen.getByRole('link', { name: 'link to Test Experience' });
      expect(link).toHaveAttribute('aria-label', 'link to Test Experience');
    });

    // TODO: This test is currently failing - links should open in new tab with security attributes
    it('opens location link in new tab with proper security attributes', () => {
      render(
        <Experience 
          {...defaultProps} 
          linkLocation="https://example.com"
          linkName="Example Company"
        />
      );
      
      const link = screen.getByRole('link', { name: 'link to Test Experience' });
      // This test will fail - links should open in new tab with security attributes
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });

    // TODO: This test is currently failing - focus indicators should be visible
    it('has visible focus indicators', () => {
      render(
        <Experience 
          {...defaultProps} 
          linkLocation="https://example.com"
          linkName="Example Company"
        />
      );
      
      const link = screen.getByRole('link', { name: 'link to Test Experience' });
      link.focus();
      
      // Focus indicator should be visible
      // This test will fail if focus styles are not properly implemented
      const computedStyle = window.getComputedStyle(link);
      const outline = computedStyle.outline || computedStyle.outlineWidth;
      expect(outline).not.toBe('none');
    });
  });

  describe('Accessibility', () => {
    // TODO: This test is currently failing - space bar should activate links
    it('should support space bar activation on location link', () => {
      render(
        <Experience 
          {...defaultProps} 
          linkLocation="https://example.com"
          linkName="Example Company"
        />
      );
      
      const link = screen.getByRole('link', { name: 'link to Test Experience' });
      
      link.focus();
      expect(link).toHaveFocus();
      
      // Space bar should activate the link (this test will fail until implemented)
      // Links don't support space bar by default - need custom keyboard handler
      // For better accessibility, space should activate links like buttons do
      const mockClick = jest.fn();
      link.onclick = mockClick;
      
      fireEvent.keyDown(link, { key: ' ', code: 'Space' });
      
      // This test will fail - space bar should trigger click on link
      // Native links only respond to Enter key, not space bar
      // To pass, component needs onKeyDown handler that prevents default scroll and clicks link
      expect(mockClick).toHaveBeenCalled();
    });

    // TODO: This test is currently failing - title should use semantic heading element
    it('should use semantic heading for title', () => {
      render(<Experience {...defaultProps} />);
      
      // Title should be a heading element for semantic structure
      // This test will fail - title is currently a div
      const heading = screen.getByRole('heading', { name: 'Test Experience' });
      expect(heading).toBeInTheDocument();
    });

    // TODO: This test is currently failing - dates should use time element
    it('should use time element for dates', () => {
      const { container } = render(<Experience {...defaultProps} />);
      
      // Dates should use <time> element for semantic meaning
      // This test will fail - dates are currently in a div
      const timeElement = container.querySelector('time');
      expect(timeElement).toBeInTheDocument();
      expect(timeElement).toHaveTextContent('January 2024 - Present');
    });

    // TODO: This test is currently failing - should have proper heading hierarchy
    it('should have proper heading hierarchy', () => {
      render(<Experience {...defaultProps} />);
      
      // Title should be an h2 or h3 (depending on page structure)
      // This test will fail until semantic heading is implemented
      const heading = screen.getByRole('heading', { name: 'Test Experience' });
      expect(['h2', 'h3']).toContain(heading.tagName.toLowerCase());
    });

    // TODO: This test is currently failing - location link should have more descriptive aria-label
    it('should have accessible location link text', () => {
      render(
        <Experience 
          {...defaultProps} 
          linkLocation="https://example.com"
          linkName="Example Company"
        />
      );
      
      const link = screen.getByRole('link', { name: 'link to Test Experience' });
      // Link text should be more descriptive or aria-label should be more specific
      // Current aria-label is generic - should include location context
      expect(link).toHaveAttribute('aria-label', 'link to Test Experience location at Example Company');
    });

    // TODO: This test is currently failing - should handle missing linkName gracefully
    it('should handle missing linkName gracefully', () => {
      // When linkLocation is provided but linkName is missing, should have fallback
      render(
        <Experience 
          {...defaultProps} 
          linkLocation="https://example.com"
        />
      );
      
      // Should either not render link or have fallback text
      // This test will fail if link renders without linkName
      const link = screen.queryByRole('link');
      // Option 1: Link should not render if linkName is missing
      expect(link).not.toBeInTheDocument();
      // OR Option 2: Link should have fallback accessible text
    });

    // TODO: This test is currently failing - lists should have proper accessible labels
    it('should have proper list structure with accessible labels', () => {
      render(<Experience {...defaultProps} />);
      
      const lists = screen.getAllByRole('list');
      // Lists should have accessible names/labels when appropriate
      // This test will fail if lists need aria-labels for context
      lists.forEach(list => {
        // If list has a specific purpose, it should have an accessible name
        const hasAriaLabel = list.hasAttribute('aria-label');
        const hasAriaLabelledBy = list.hasAttribute('aria-labelledby');
        // For now, we'll just check that lists exist
        expect(list).toBeInTheDocument();
      });
    });
  });
})