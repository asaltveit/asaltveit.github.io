import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import '../mocks/matchMediaFalse.mock'
import ProjectsContainer from '@/components/ProjectsContainer'

// Mock Next.js Link and Image components
jest.mock('next/link', () => {
  return ({ children, href, ...props }) => {
    return <a href={href} {...props}>{children}</a>
  }
})

jest.mock('next/image', () => {
  return ({ src, alt, ...props }) => {
    return <img src={src} alt={alt} {...props} />
  }
})

const matchMediaMock = jest.spyOn(window, 'matchMedia');

beforeEach(() => {
  matchMediaMock.mockClear();
});

describe('ProjectsContainer', () => {
  const mockProjects = [
    {
      title: 'Project 1',
      dates: '2024 - 2025',
      items: ['Item 1', 'Item 2'],
      link: 'https://example.com/project1',
      techStack: ['React', 'TypeScript'],
      image: '/project1.png',
      imageTitle: 'Project 1 screenshot'
    },
    {
      title: 'Project 2',
      dates: '2023 - 2024',
      items: ['Item 3', 'Item 4'],
      link: 'https://example.com/project2',
      techStack: ['Python'],
      image: '/project2.png'
    },
    {
      title: 'Project 3',
      dates: '2022',
      items: ['Item 5'],
      link: 'https://example.com/project3',
      techStack: []
    }
  ];

  it('renders all projects when provided', () => {
    render(<ProjectsContainer projects={mockProjects} />);
    
    expect(screen.getByText('Project 1')).toBeInTheDocument();
    expect(screen.getByText('Project 2')).toBeInTheDocument();
    expect(screen.getByText('Project 3')).toBeInTheDocument();
  });

  it('renders project cards with correct content', () => {
    render(<ProjectsContainer projects={[mockProjects[0]]} />);
    
    expect(screen.getByText('Project 1')).toBeInTheDocument();
    expect(screen.getByText('2024 - 2025')).toBeInTheDocument();
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });

  it('renders empty container when projects array is empty', () => {
    const { container } = render(<ProjectsContainer projects={[]} />);
    
    const grid = container.querySelector('.grid');
    expect(grid).toBeInTheDocument();
    expect(grid?.children.length).toBe(0);
  });

  it('renders empty container when projects prop is undefined', () => {
    const { container } = render(<ProjectsContainer projects={undefined} />);
    
    const grid = container.querySelector('.grid');
    expect(grid).toBeInTheDocument();
    expect(grid?.children.length).toBe(0);
  });

  it('applies correct grid classes', () => {
    const { container } = render(<ProjectsContainer projects={mockProjects} />);
    
    const grid = container.querySelector('.grid');
    expect(grid).toHaveClass('grid');
    expect(grid).toHaveClass('grid-cols-1');
    expect(grid).toHaveClass('md:grid-cols-2');
    expect(grid).toHaveClass('gap-6');
    expect(grid).toHaveClass('md:gap-8');
  });

  it('renders projects with images when provided', () => {
    render(<ProjectsContainer projects={[mockProjects[0]]} />);
    
    const image = screen.getByAltText('Project 1 screenshot screenshot');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/project1.png');
  });

  it('uses default imageTitle when not provided', () => {
    render(<ProjectsContainer projects={[mockProjects[1]]} />);
    
    const image = screen.getByAltText('Project 2 screenshot');
    expect(image).toBeInTheDocument();
  });

  it('renders all project links correctly', () => {
    render(<ProjectsContainer projects={mockProjects} />);
    
    const links = screen.getAllByRole('link');
    expect(links.length).toBeGreaterThan(0);
    
    const project1Link = screen.getByRole('link', { name: /link to Project 1/i });
    expect(project1Link).toHaveAttribute('href', 'https://example.com/project1');
  });

  describe('Accessibility', () => {
    // TODO: Add region landmark with aria-label to ProjectsContainer
    it('should have a region landmark with aria-label', () => {
      const { container } = render(<ProjectsContainer projects={mockProjects} />);
      
      // This test will fail - container doesn't have a region landmark
      const region = container.querySelector('[role="region"]');
      expect(region).toBeInTheDocument();
      expect(region).toHaveAttribute('aria-label', 'Projects');
    });

    // TODO: Add main heading (h2) for the projects section
    it('should have a main heading for the projects section', () => {
      render(<ProjectsContainer projects={mockProjects} />);
      
      // This test will fail - no heading element in container
      const heading = screen.getByRole('heading', { name: /projects/i, level: 2 });
      expect(heading).toBeInTheDocument();
    });

    // TODO: Add aria-live region for dynamic content updates
    it('should have aria-live region for dynamic content updates', () => {
      const { container } = render(<ProjectsContainer projects={mockProjects} />);
      
      // This test will fail - no aria-live region
      const liveRegion = container.querySelector('[aria-live]');
      expect(liveRegion).toBeInTheDocument();
    });

    // TODO: Add skip link for keyboard navigation
    it('should have skip link for keyboard navigation', () => {
      const { container } = render(<ProjectsContainer projects={mockProjects} />);
      
      // This test will fail - no skip link
      const skipLink = screen.getByRole('link', { name: /skip to projects content/i });
      expect(skipLink).toBeInTheDocument();
    });

    // TODO: Add proper heading hierarchy (h2) to ProjectsContainer
    it('should have proper heading hierarchy', () => {
      render(<ProjectsContainer projects={mockProjects} />);
      
      // This test will fail - no h2 heading
      const headings = screen.getAllByRole('heading');
      const h2Headings = headings.filter(h => h.tagName === 'H2');
      expect(h2Headings.length).toBeGreaterThan(0);
    });

    // TODO: Add aria-describedby linking to description
    it('should have aria-describedby linking to description', () => {
      const { container } = render(<ProjectsContainer projects={mockProjects} />);
      
      // This test will fail - no aria-describedby
      const grid = container.querySelector('.grid');
      expect(grid).toHaveAttribute('aria-describedby', 'projects-description');
      
      const description = screen.getByText(/projects/i);
      expect(description).toHaveAttribute('id', 'projects-description');
    });

    // TODO: Add screen reader announcement for number of projects
    it('should announce number of projects to screen readers', () => {
      render(<ProjectsContainer projects={mockProjects} />);
      
      // This test will fail - no announcement
      const announcement = screen.getByText(/3 projects/i);
      expect(announcement).toBeInTheDocument();
      expect(announcement).toHaveAttribute('aria-live', 'polite');
    });

    // TODO: Add proper focus management for grid navigation (role="grid", aria-label)
    it('should have proper focus management for grid navigation', () => {
      const { container } = render(<ProjectsContainer projects={mockProjects} />);
      
      // This test will fail - no tabindex or focus management
      const grid = container.querySelector('.grid');
      expect(grid).toHaveAttribute('role', 'grid');
      expect(grid).toHaveAttribute('aria-label', 'Projects grid');
    });
  });
});

