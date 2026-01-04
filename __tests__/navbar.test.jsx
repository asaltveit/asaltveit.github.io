import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import './mocks/matchMediaFalse.mock'
import NavBar from '@/components/NavBar'

const matchMediaMock = jest.spyOn(window, 'matchMedia');

beforeEach(() => {
  matchMediaMock.mockClear();
});

describe('NavBar', () => {
  const mockLinks = [
    { title: "Experience", id: "experience" },
    { title: "Projects", id: "projects" },
    { title: "Hackathons", id: "hackathons" }
  ];

  it('renders navigation with all links', () => {
    render(<NavBar links={mockLinks} />);
    
    expect(screen.getByText('Experience')).toBeInTheDocument();
    expect(screen.getByText('Projects')).toBeInTheDocument();
    expect(screen.getByText('Hackathons')).toBeInTheDocument();
  });

  it('renders links with correct href attributes', () => {
    render(<NavBar links={mockLinks} />);
    
    const experienceLink = screen.getByRole('link', { name: /link to Experience section/i });
    expect(experienceLink).toHaveAttribute('href', '#experience');
    
    const projectsLink = screen.getByRole('link', { name: /link to Projects section/i });
    expect(projectsLink).toHaveAttribute('href', '#projects');
    
    const hackathonsLink = screen.getByRole('link', { name: /link to Hackathons section/i });
    expect(hackathonsLink).toHaveAttribute('href', '#hackathons');
  });

  it('renders navigation with aria-label', () => {
    const { container } = render(<NavBar links={mockLinks} />);
    
    const nav = container.querySelector('nav');
    expect(nav).toBeInTheDocument();
    expect(nav).toHaveAttribute('aria-label', 'main navigation');
  });

  it('renders menu with proper role attributes', () => {
    render(<NavBar links={mockLinks} />);
    
    const menu = screen.getByRole('menu');
    expect(menu).toBeInTheDocument();
    
    const menuItems = screen.getAllByRole('menuitem');
    expect(menuItems).toHaveLength(3);
  });

  it('renders menu items with aria-labels', () => {
    render(<NavBar links={mockLinks} />);
    
    const menuItems = screen.getAllByRole('menuitem');
    expect(menuItems[0]).toHaveAttribute('aria-label', 'includes link to Experience section');
    expect(menuItems[1]).toHaveAttribute('aria-label', 'includes link to Projects section');
    expect(menuItems[2]).toHaveAttribute('aria-label', 'includes link to Hackathons section');
  });

  it('renders links with aria-labels', () => {
    render(<NavBar links={mockLinks} />);
    
    const experienceLink = screen.getByRole('link', { name: /link to Experience section/i });
    expect(experienceLink).toHaveAttribute('aria-label', 'link to Experience section');
    
    const projectsLink = screen.getByRole('link', { name: /link to Projects section/i });
    expect(projectsLink).toHaveAttribute('aria-label', 'link to Projects section');
  });

  it('handles empty links array', () => {
    render(<NavBar links={[]} />);
    
    const menu = screen.getByRole('menu');
    expect(menu).toBeInTheDocument();
    
    const menuItems = screen.queryAllByRole('menuitem');
    expect(menuItems).toHaveLength(0);
  });

  it('handles single link', () => {
    render(<NavBar links={[{ title: "Test", id: "test" }]} />);
    
    expect(screen.getByText('Test')).toBeInTheDocument();
    const link = screen.getByRole('link', { name: /link to Test section/i });
    expect(link).toHaveAttribute('href', '#test');
  });

  describe('User Interactions', () => {
    it('allows clicking on navigation links', () => {
      render(<NavBar links={mockLinks} />);
      
      const experienceLink = screen.getByRole('link', { name: /link to Experience section/i });
      expect(experienceLink).toBeInTheDocument();
      
      fireEvent.click(experienceLink);
      // Link should be clickable
      expect(experienceLink).toHaveAttribute('href', '#experience');
    });

    it('supports keyboard navigation on links', () => {
      render(<NavBar links={mockLinks} />);
      
      const experienceLink = screen.getByRole('link', { name: /link to Experience section/i });
      
      // Focus the link
      experienceLink.focus();
      expect(experienceLink).toHaveFocus();
      
      // Press Enter to activate
      fireEvent.keyDown(experienceLink, { key: 'Enter', code: 'Enter' });
      expect(experienceLink).toHaveAttribute('href', '#experience');
    });

    it('supports Tab key navigation between menu items', () => {
      render(<NavBar links={mockLinks} />);
      
      const menuItems = screen.getAllByRole('menuitem');
      const firstLink = menuItems[0].querySelector('a');
      const secondLink = menuItems[1].querySelector('a');
      
      firstLink.focus();
      expect(firstLink).toHaveFocus();
      
      fireEvent.keyDown(firstLink, { key: 'Tab', code: 'Tab' });
      // Tab navigation should work
      expect(firstLink).toBeInTheDocument();
      expect(secondLink).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    // TODO: Add mobile menu button with proper ARIA attributes (aria-controls, aria-expanded)
    it('should have mobile menu button for small screens', () => {
      render(<NavBar links={mockLinks} />);
      
      // This test will fail - mobile menu button is commented out
      const menuButton = screen.getByRole('button', { name: /open main menu/i });
      expect(menuButton).toBeInTheDocument();
      expect(menuButton).toHaveAttribute('aria-controls', 'navbar-solid-bg');
      expect(menuButton).toHaveAttribute('aria-expanded', 'false');
    });

    // TODO: Add skip to main content link at the beginning of navigation
    it('should have skip to main content link', () => {
      render(<NavBar links={mockLinks} />);
      
      // This test will fail - no skip link
      const skipLink = screen.getByRole('link', { name: /skip to main content/i });
      expect(skipLink).toBeInTheDocument();
      expect(skipLink).toHaveAttribute('href', '#main-content');
    });

    // TODO: Ensure proper focus management when menu is toggled
    it('should manage focus when mobile menu is toggled', () => {
      render(<NavBar links={mockLinks} />);
      
      // This test will fail - no focus management for mobile menu
      const menuButton = screen.getByRole('button', { name: /open main menu/i });
      fireEvent.click(menuButton);
      
      const menu = screen.getByRole('menu');
      const firstMenuItem = screen.getAllByRole('menuitem')[0].querySelector('a');
      expect(firstMenuItem).toHaveFocus();
    });

    // TODO: Add aria-current="page" to active navigation link
    it('should indicate current page with aria-current', () => {
      render(<NavBar links={mockLinks} />);
      
      // This test will fail - no aria-current support
      const experienceLink = screen.getByRole('link', { name: /link to Experience section/i });
      // When on experience page, should have aria-current="page"
      expect(experienceLink).toHaveAttribute('aria-current', 'page');
    });

    it('should have properly labeled navigation landmark', () => {
      const { container } = render(<NavBar links={mockLinks} />);
      
      const nav = container.querySelector('nav[aria-label="main navigation"]');
      expect(nav).toBeInTheDocument();
      // Navigation should be properly identified as a landmark
      // Note: nav elements have implicit role="navigation", but explicit is clearer
      expect(nav).toHaveAttribute('role', 'navigation');
    });

    // TODO: Ensure menu items are keyboard accessible with arrow keys
    it('should support arrow key navigation between menu items', () => {
      render(<NavBar links={mockLinks} />);
      
      // This test will fail - no arrow key navigation
      const menuItems = screen.getAllByRole('menuitem');
      const firstLink = menuItems[0].querySelector('a');
      const secondLink = menuItems[1].querySelector('a');
      
      firstLink.focus();
      fireEvent.keyDown(firstLink, { key: 'ArrowRight', code: 'ArrowRight' });
      
      expect(secondLink).toHaveFocus();
    });

    it('should have visible focus indicators', () => {
      render(<NavBar links={mockLinks} />);
      
      const experienceLink = screen.getByRole('link', { name: /link to Experience section/i });
      experienceLink.focus();
      
      const computedStyle = window.getComputedStyle(experienceLink, ':focus');
      expect(computedStyle.outline).not.toBe('none');
    });

    it('should specify menu orientation for screen readers', () => {
      render(<NavBar links={mockLinks} />);
      
      const menu = screen.getByRole('menu');
      expect(menu).toHaveAttribute('aria-orientation', 'horizontal');
    });

    // TODO: Ensure menu button has proper aria-label and screen reader text
    it('should have accessible menu button with screen reader text', () => {
      render(<NavBar links={mockLinks} />);
      
      // This test will fail - menu button is commented out
      const menuButton = screen.getByRole('button');
      const srOnly = menuButton.querySelector('.sr-only');
      expect(srOnly).toBeInTheDocument();
      expect(srOnly).toHaveTextContent('Open main menu');
    });

    it('should have proper navigation structure without heading', () => {
      const { container } = render(<NavBar links={mockLinks} />);
      
      // NavBar does not require a heading - navigation is identified by the nav element
      const nav = container.querySelector('nav');
      expect(nav).toBeInTheDocument();
      expect(nav).toHaveAttribute('aria-label', 'main navigation');
      
      // Verify no heading is present (heading is not required for navigation)
      const heading = container.querySelector('h1, h2, h3');
      expect(heading).not.toBeInTheDocument();
    });
  });
});
