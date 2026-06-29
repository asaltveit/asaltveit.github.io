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
    { title: "About", id: "about" },
    { title: "Projects", id: "projects" },
    { title: "Experience", id: "experience" },
    { title: "Hackathons", id: "hackathons" },
    { title: "Skills", id: "skills" },
  ];

  it('renders navigation with all links', () => {
    render(<NavBar links={mockLinks} />);

    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Projects')).toBeInTheDocument();
    expect(screen.getByText('Experience')).toBeInTheDocument();
    expect(screen.getByText('Hackathons')).toBeInTheDocument();
    expect(screen.getByText('Skills')).toBeInTheDocument();
  });

  it('renders links with correct href attributes', () => {
    render(<NavBar links={mockLinks} />);

    expect(screen.getByRole('link', { name: /link to About section/i })).toHaveAttribute('href', '#about');
    expect(screen.getByRole('link', { name: /link to Projects section/i })).toHaveAttribute('href', '#projects');
    expect(screen.getByRole('link', { name: /link to Experience section/i })).toHaveAttribute('href', '#experience');
    expect(screen.getByRole('link', { name: /link to Hackathons section/i })).toHaveAttribute('href', '#hackathons');
    expect(screen.getByRole('link', { name: /link to Skills section/i })).toHaveAttribute('href', '#skills');
  });

  it('renders navigation with aria-label', () => {
    const { container } = render(<NavBar links={mockLinks} />);
    
    const nav = container.querySelector('nav');
    expect(nav).toBeInTheDocument();
    expect(nav).toHaveAttribute('aria-label', 'main navigation');
  });

  it('renders navigation links in a list', () => {
    render(<NavBar links={mockLinks} />);
    
    const list = screen.getByRole('list');
    expect(list).toBeInTheDocument();
    
    const links = screen.getAllByRole('link', { name: /link to .* section/i });
    expect(links).toHaveLength(5);
  });

  it('renders links with aria-labels', () => {
    render(<NavBar links={mockLinks} />);
    
    expect(screen.getByRole('link', { name: /link to About section/i })).toHaveAttribute('aria-label', 'link to About section');
    expect(screen.getByRole('link', { name: /link to Projects section/i })).toHaveAttribute('aria-label', 'link to Projects section');
  });

  it('handles empty links array', () => {
    render(<NavBar links={[]} />);
    
    const list = screen.getByRole('list');
    expect(list).toBeInTheDocument();
    
    const navLinks = screen.queryAllByRole('link', { name: /link to .* section/i });
    expect(navLinks).toHaveLength(0);
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
      fireEvent.click(experienceLink);
      expect(experienceLink).toHaveAttribute('href', '#experience');
    });

    it('closes mobile menu and sets aria-expanded false when a navigation link is clicked', () => {
      render(<NavBar links={mockLinks} />);

      const menuButton = screen.getByRole('button', { name: /open main menu/i });
      fireEvent.click(menuButton);
      expect(menuButton).toHaveAttribute('aria-expanded', 'true');

      const projectsLink = screen.getByRole('link', { name: /link to Projects section/i });
      fireEvent.click(projectsLink);

      expect(menuButton).toHaveAttribute('aria-expanded', 'false');
    });

    it('supports keyboard navigation on links', () => {
      render(<NavBar links={mockLinks} />);
      
      const experienceLink = screen.getByRole('link', { name: /link to Experience section/i });
      
      experienceLink.focus();
      expect(experienceLink).toHaveFocus();
      
      fireEvent.keyDown(experienceLink, { key: 'Enter', code: 'Enter' });
      expect(experienceLink).toHaveAttribute('href', '#experience');
    });

    it('supports Tab key navigation between links', () => {
      render(<NavBar links={mockLinks} />);
      
      const aboutLink = screen.getByRole('link', { name: /link to About section/i });
      const projectsLink = screen.getByRole('link', { name: /link to Projects section/i });
      
      aboutLink.focus();
      expect(aboutLink).toHaveFocus();
      
      fireEvent.keyDown(aboutLink, { key: 'Tab', code: 'Tab' });
      expect(projectsLink).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have mobile menu button for small screens', () => {
      render(<NavBar links={mockLinks} />);
      
      const menuButton = screen.getByRole('button', { name: /open main menu/i });
      expect(menuButton).toBeInTheDocument();
      expect(menuButton).toHaveAttribute('aria-controls', 'navbar-solid-bg');
      expect(menuButton).toHaveAttribute('aria-expanded', 'false');
    });

    it('should have skip to main content link', () => {
      render(<NavBar links={mockLinks} />);
      
      const skipLink = screen.getByRole('link', { name: /skip to main content/i });
      expect(skipLink).toBeInTheDocument();
      expect(skipLink).toHaveAttribute('href', '#main-content');
    });

    it('should manage focus when mobile menu is toggled', () => {
      render(<NavBar links={mockLinks} />);
      
      const menuButton = screen.getByRole('button', { name: /open main menu/i });
      fireEvent.click(menuButton);
      
      expect(menuButton).toHaveAttribute('aria-expanded', 'true');
      const firstLink = screen.getByRole('link', { name: /link to About section/i });
      expect(firstLink).toHaveFocus();
    });

    it('should indicate current page with aria-current', () => {
      render(<NavBar links={mockLinks} />);

      const aboutLink = screen.getByRole('link', { name: /link to About section/i });
      expect(aboutLink).toHaveAttribute('aria-current', 'page');
    });

    it('should have properly labeled navigation landmark', () => {
      const { container } = render(<NavBar links={mockLinks} />);
      
      const nav = container.querySelector('nav[aria-label="main navigation"]');
      expect(nav).toBeInTheDocument();
      expect(nav).toHaveAttribute('role', 'navigation');
    });

    it('should support arrow key navigation between links', () => {
      render(<NavBar links={mockLinks} />);
      
      const aboutLink = screen.getByRole('link', { name: /link to About section/i });
      const projectsLink = screen.getByRole('link', { name: /link to Projects section/i });
      
      aboutLink.focus();
      fireEvent.keyDown(aboutLink, { key: 'ArrowRight', code: 'ArrowRight' });
      
      expect(projectsLink).toHaveFocus();
    });

    it('should have visible focus indicators', () => {
      render(<NavBar links={mockLinks} />);
      
      const experienceLink = screen.getByRole('link', { name: /link to Experience section/i });
      experienceLink.focus();
      
      const computedStyle = window.getComputedStyle(experienceLink, ':focus');
      expect(computedStyle.outline).not.toBe('none');
    });

    it('should specify list orientation for screen readers', () => {
      render(<NavBar links={mockLinks} />);
      
      const list = screen.getByRole('list');
      expect(list).toHaveAttribute('aria-orientation', 'horizontal');
    });

    it('should have accessible menu button with screen reader text', () => {
      render(<NavBar links={mockLinks} />);
      
      const menuButton = screen.getByRole('button', { name: /open main menu/i });
      const srOnly = menuButton.querySelector('.sr-only');
      expect(srOnly).toBeInTheDocument();
      expect(srOnly).toHaveTextContent('Open main menu');
    });

    it('should have proper navigation structure without heading', () => {
      const { container } = render(<NavBar links={mockLinks} />);
      
      const nav = container.querySelector('nav');
      expect(nav).toBeInTheDocument();
      expect(nav).toHaveAttribute('aria-label', 'main navigation');
      const heading = container.querySelector('h1, h2, h3');
      expect(heading).not.toBeInTheDocument();
    });
  });
});
