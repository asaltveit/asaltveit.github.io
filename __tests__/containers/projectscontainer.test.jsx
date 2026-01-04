import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import '../mocks/matchMediaFalse.mock'
import ProjectsContainer from '@/components/containers/ProjectsContainer'

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

  it('renders all project links correct', () => {
    render(<ProjectsContainer projects={mockProjects} />);
    
    const links = screen.getAllByRole('link');
    expect(links.length).toBeGreaterThan(0);
    
    const project1Link = screen.getByRole('link', { name: /link to Project 1/i });
    expect(project1Link).toHaveAttribute('href', 'https://example.com/project1');
  });

  describe('Accessibility', () => {
    // Note: Section and heading are provided by the Section component wrapper,
    // not by ProjectsContainer itself. The container only provides the grid.

    it('should have skip link for keyboard navigation', () => {
      render(<ProjectsContainer projects={mockProjects} />);
      
      // Skip link should skip to hackathons (next section)
      const skipLink = screen.getByRole('link', { name: /skip to hackathons content/i });
      expect(skipLink).toBeInTheDocument();
    });

    it('should have aria-describedby linking to description', () => {
      const { container } = render(<ProjectsContainer projects={mockProjects} />);
      
      const grid = container.querySelector('.grid');
      expect(grid).toHaveAttribute('aria-describedby', 'projects-description');
      
      const description = document.getElementById('projects-description');
      expect(description).toBeInTheDocument();
      expect(description).toHaveAttribute('id', 'projects-description');
    });

    it('should have proper focus management for grid navigation', () => {
      const { container } = render(<ProjectsContainer projects={mockProjects} />);
      
      const grid = container.querySelector('.grid');
      expect(grid).toHaveAttribute('role', 'grid');
      expect(grid).toHaveAttribute('aria-label', 'Projects grid');
      expect(grid).toHaveAttribute('tabindex', '0');
    });
  });
});

