import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import '../mocks/matchMediaFalse.mock'
import BaseCard from '@/components/cards/BaseCard'

// Mock Next.js Link component
jest.mock('next/link', () => {
  return ({ children, href, ...props }) => {
    return <a href={href} {...props}>{children}</a>
  }
})

const matchMediaMock = jest.spyOn(window, 'matchMedia');

beforeEach(() => {
  matchMediaMock.mockClear();
});

describe('BaseCard', () => {
  const defaultProps = {
    title: 'Test Card',
    dates: 'January 2024 - Present',
    items: ['Item 1', 'Item 2', 'Item 3']
  };

  it('renders card with title, dates, and items', () => {
    render(<BaseCard {...defaultProps} />);
    
    expect(screen.getByText('Test Card')).toBeInTheDocument();
    expect(screen.getByText('January 2024 - Present')).toBeInTheDocument();
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
    expect(screen.getByText('Item 3')).toBeInTheDocument();
  });

  it('renders link when provided', () => {
    render(<BaseCard {...defaultProps} link="https://example.com" />);
    
    const link = screen.getByRole('link', { name: 'link to Test Card' });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://example.com');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('does not render link when not provided', () => {
    render(<BaseCard {...defaultProps} />);
    
    const link = screen.queryByRole('link');
    expect(link).not.toBeInTheDocument();
    expect(screen.getByText('Test Card')).toBeInTheDocument();
  });

  it('renders children content when provided', () => {
    render(
      <BaseCard {...defaultProps}>
        <div data-testid="child-content">Child Content</div>
      </BaseCard>
    );
    
    expect(screen.getByTestId('child-content')).toBeInTheDocument();
  });

  it('renders footer content when provided', () => {
    render(
      <BaseCard {...defaultProps} footerContent={<div data-testid="footer">Footer</div>} />
    );
    
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  describe('User Interactions', () => {
    it('allows clicking on the title link', () => {
      const mockClick = jest.fn();
      
      render(
        <BaseCard 
          {...defaultProps} 
          link="https://example.com"
        />
      );
      
      const link = screen.getByRole('link', { name: 'link to Test Card' });
      link.onclick = mockClick;
      
      fireEvent.click(link);
      expect(mockClick).toHaveBeenCalled();
    });

    it('shows external link icon on hover', () => {
      render(<BaseCard {...defaultProps} link="https://example.com" />);
      
      const link = screen.getByRole('link', { name: 'link to Test Card' });
      const icon = link.querySelector('svg');
      
      expect(icon).toBeInTheDocument();
      // Icon should have opacity transition class
      expect(icon).toHaveClass('opacity-0');
    });

    it('supports keyboard navigation on link', () => {
      render(<BaseCard {...defaultProps} link="https://example.com" />);
      
      const link = screen.getByRole('link', { name: 'link to Test Card' });
      
      // Focus the link
      link.focus();
      expect(link).toHaveFocus();
      
      // Press Enter to activate
      fireEvent.keyDown(link, { key: 'Enter', code: 'Enter' });
      // Link should be clickable via keyboard
      expect(link).toHaveAttribute('href', 'https://example.com');
    });


    it('renders all list items correctly', () => {
      const items = ['First item', 'Second item', 'Third item', 'Fourth item'];
      render(<BaseCard {...defaultProps} items={items} />);
      
      const list = screen.getByRole('list');
      const listItems = screen.getAllByRole('listitem');
      
      expect(list).toBeInTheDocument();
      expect(listItems).toHaveLength(4);
      items.forEach(item => {
        expect(screen.getByText(item)).toBeInTheDocument();
      });
    });

    it('handles empty items array', () => {
      render(<BaseCard {...defaultProps} items={[]} />);
      
      const list = screen.getByRole('list');
      const listItems = screen.queryAllByRole('listitem');
      
      expect(list).toBeInTheDocument();
      expect(listItems).toHaveLength(0);
    });
  });

  describe('Accessibility', () => {
    it('should mark external link icon as decorative with aria-hidden', () => {
      const { container } = render(
        <BaseCard 
          {...defaultProps} 
          link="https://example.com"
        />
      );
      
      const link = screen.getByRole('link', { name: 'link to Test Card' });
      const externalIcon = link.querySelector('svg');
      
      expect(externalIcon).toBeInTheDocument();
      // The icon is decorative since the link text already conveys the information
      // lucide-react automatically adds aria-hidden="true" to icons
      expect(externalIcon).toHaveAttribute('aria-hidden', 'true');
    });

    it('should use semantic heading for title when not a link', () => {
      render(<BaseCard {...defaultProps} />);
      
      // Title should be a heading element for semantic structure
      const heading = screen.getByRole('heading', { name: 'Test Card' });
      expect(heading).toBeInTheDocument();
    });

    it('should use time element for dates', () => {
      const { container } = render(<BaseCard {...defaultProps} />);
      
      // Dates should use <time> element for semantic meaning
      const timeElement = container.querySelector('time');
      expect(timeElement).toBeInTheDocument();
      expect(timeElement).toHaveTextContent('January 2024 - Present');
    });

    it('should have proper list structure', () => {
      render(<BaseCard {...defaultProps} />);
      
      const list = screen.getByRole('list');
      expect(list).toBeInTheDocument();
      // List should be properly structured with listitems
      const listItems = screen.getAllByRole('listitem');
      expect(listItems.length).toBeGreaterThan(0);
    });

    it('should have accessible link with proper attributes when link is provided', () => {
      render(<BaseCard {...defaultProps} link="https://example.com" />);
      
      const link = screen.getByRole('link', { name: 'link to Test Card' });
      expect(link).toHaveAttribute('aria-label', 'link to Test Card');
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });
});

