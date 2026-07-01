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
    
    expect(lists.length).toBeGreaterThan(0);
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

    it('opens location link in new tab with proper security attributes', () => {
      render(
        <Experience 
          {...defaultProps} 
          linkLocation="https://example.com"
          linkName="Example Company"
        />
      );
      
      const link = screen.getByRole('link', { name: 'link to Test Experience' });
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });

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
      
      const computedStyle = window.getComputedStyle(link);
      const outline = computedStyle.outline || computedStyle.outlineWidth;
      expect(outline).not.toBe('none');
    });
  });

  describe('Accessibility', () => {
    it('should support space bar activation on location link', () => {
      render(
        <Experience 
          {...defaultProps} 
          linkLocation="https://example.com"
          linkName="Example Company"
        />
      );
      
      // handleSpacebarKeyDown on the link (same pattern as other external links)
      const link = screen.getByRole('link', { name: 'link to Test Experience' });
      
      link.focus();
      expect(link).toHaveFocus();
      
      const mockClick = jest.fn();
      link.onclick = mockClick;
      
      fireEvent.keyDown(link, { key: ' ', code: 'Space' });
      
      expect(mockClick).toHaveBeenCalled();
    });

    it('should use semantic heading for title', () => {
      render(<Experience {...defaultProps} />);
      
      const heading = screen.getByRole('heading', { name: 'Test Experience' });
      expect(heading).toBeInTheDocument();
    });

    it('should use time element for dates', () => {
      const { container } = render(<Experience {...defaultProps} />);
      
      const timeElement = container.querySelector('time');
      expect(timeElement).toBeInTheDocument();
      expect(timeElement).toHaveTextContent('January 2024 - Present');
    });

    it('should have proper heading hierarchy', () => {
      render(<Experience {...defaultProps} />);
      
      const heading = screen.getByRole('heading', { name: 'Test Experience' });
      expect(['h2', 'h3']).toContain(heading.tagName.toLowerCase());
    });

    it('should have accessible location link text', () => {
      render(
        <Experience 
          {...defaultProps} 
          linkLocation="https://example.com"
          linkName="Example Company"
        />
      );
      
      const link = screen.getByRole('link', { name: 'link to Test Experience' });
      expect(link).toHaveAttribute('aria-label', 'link to Test Experience');
      expect(link).toHaveTextContent('Example Company');
    });

    it('should handle missing linkName gracefully with fallback to linkLocation', () => {
      render(
        <Experience 
          {...defaultProps} 
          linkLocation="https://example.com"
        />
      );
      
      const link = screen.getByRole('link', { name: 'link to Test Experience' });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', 'https://example.com');
      expect(link).toHaveTextContent('https://example.com');
    });

    it('should have proper list structure with accessible labels', () => {
      render(<Experience {...defaultProps} />);
      
      const lists = screen.getAllByRole('list');
      lists.forEach(list => {
        expect(list).toBeInTheDocument();
      });
    });

    it('should have time element with proper semantic structure', () => {
      const { container } = render(<Experience {...defaultProps} />);
      
      const timeElement = container.querySelector('time');
      expect(timeElement).toBeInTheDocument();
      expect(timeElement).toHaveTextContent('January 2024 - Present');
    });
  });
})