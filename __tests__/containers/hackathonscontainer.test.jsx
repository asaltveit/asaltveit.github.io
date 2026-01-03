import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import '../mocks/matchMediaFalse.mock'
import HackathonsContainer from '@/components/containers/HackathonsContainer'

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

describe('HackathonsContainer', () => {
  const mockHackathons = [
    {
      title: 'Hackathon 1',
      dates: '12/11/25',
      items: ['Item 1', 'Item 2'],
      link: 'https://example.com/hackathon1',
      techStack: ['React', 'TypeScript'],
      image: '/hackathon1.png',
      imageTitle: 'Hackathon 1 screenshot',
      award: '1st Place',
      teamSize: 3,
      duration: '48 hours'
    },
    {
      title: 'Hackathon 2',
      dates: '11/22-11/23/25',
      items: ['Item 3'],
      link: 'https://example.com/hackathon2',
      techStack: ['Python'],
      award: '2nd Place',
      teamSize: 2,
      duration: '24 hours'
    },
    {
      title: 'Hackathon 3',
      dates: 'November 2025',
      items: ['Item 4', 'Item 5'],
      link: 'https://example.com/hackathon3',
      techStack: []
    }
  ];

  it('renders all hackathons when provided', () => {
    render(<HackathonsContainer hackathons={mockHackathons} />);
    
    expect(screen.getByText('Hackathon 1')).toBeInTheDocument();
    expect(screen.getByText('Hackathon 2')).toBeInTheDocument();
    expect(screen.getByText('Hackathon 3')).toBeInTheDocument();
  });

  it('renders hackathon cards with correct content', () => {
    render(<HackathonsContainer hackathons={[mockHackathons[0]]} />);
    
    expect(screen.getByText('Hackathon 1')).toBeInTheDocument();
    expect(screen.getByText('12/11/25')).toBeInTheDocument();
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
    expect(screen.getByText('1st Place')).toBeInTheDocument();
    expect(screen.getByText('3 people')).toBeInTheDocument();
    expect(screen.getByText('48 hours')).toBeInTheDocument();
  });

  it('returns null when hackathons array is empty', () => {
    const { container } = render(<HackathonsContainer hackathons={[]} />);
    
    expect(container.firstChild).toBeNull();
  });

  it('returns null when hackathons prop is undefined', () => {
    const { container } = render(<HackathonsContainer hackathons={undefined} />);
    
    expect(container.firstChild).toBeNull();
  });

  it('applies correct grid classes when hackathons are provided', () => {
    const { container } = render(<HackathonsContainer hackathons={mockHackathons} />);
    
    const grid = container.querySelector('.grid');
    expect(grid).toBeInTheDocument();
    expect(grid).toHaveClass('grid');
    expect(grid).toHaveClass('grid-cols-1');
    expect(grid).toHaveClass('md:grid-cols-2');
    expect(grid).toHaveClass('gap-6');
    expect(grid).toHaveClass('md:gap-8');
  });

  it('renders hackathons with images when provided', () => {
    render(<HackathonsContainer hackathons={[mockHackathons[0]]} />);
    
    const image = screen.getByAltText('Hackathon 1 screenshot screenshot');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/hackathon1.png');
  });

  it('uses default imageTitle when not provided', () => {
    const hackathonWithImageNoTitle = {
      ...mockHackathons[1],
      image: '/hackathon2.png'
    };
    render(<HackathonsContainer hackathons={[hackathonWithImageNoTitle]} />);
    
    const image = screen.getByAltText('Hackathon 2 screenshot');
    expect(image).toBeInTheDocument();
  });

  it('renders hackathon metadata correctly', () => {
    render(<HackathonsContainer hackathons={[mockHackathons[0]]} />);
    
    expect(screen.getByText('1st Place')).toBeInTheDocument();
    expect(screen.getByText('3 people')).toBeInTheDocument();
    expect(screen.getByText('48 hours')).toBeInTheDocument();
  });

  it('renders singular "person" for teamSize of 1', () => {
    const singlePersonHackathon = {
      ...mockHackathons[0],
      teamSize: 1
    };
    
    render(<HackathonsContainer hackathons={[singlePersonHackathon]} />);
    
    expect(screen.getByText('1 person')).toBeInTheDocument();
    expect(screen.queryByText('1 people')).not.toBeInTheDocument();
  });

  it('renders all hackathon links correctly', () => {
    render(<HackathonsContainer hackathons={mockHackathons} />);
    
    const links = screen.getAllByRole('link');
    expect(links.length).toBeGreaterThan(0);
    
    const hackathon1Link = screen.getByRole('link', { name: /link to Hackathon 1/i });
    expect(hackathon1Link).toHaveAttribute('href', 'https://example.com/hackathon1');
  });

  it('handles hackathons without optional fields', () => {
    const minimalHackathon = {
      title: 'Minimal Hackathon',
      dates: '2024',
      items: ['Item'],
      link: 'https://example.com'
    };
    
    render(<HackathonsContainer hackathons={[minimalHackathon]} />);
    
    expect(screen.getByText('Minimal Hackathon')).toBeInTheDocument();
    expect(screen.getByText('2024')).toBeInTheDocument();
    expect(screen.getByText('Item')).toBeInTheDocument();
  });

  describe('Accessibility', () => {
    // TODO: Add region landmark with aria-label to HackathonsContainer
    it('should have a region landmark with aria-label', () => {
      const { container } = render(<HackathonsContainer hackathons={mockHackathons} />);
      
      // This test will fail - container doesn't have a region landmark
      const region = container.querySelector('[role="region"]');
      expect(region).toBeInTheDocument();
      expect(region).toHaveAttribute('aria-label', 'Hackathons');
    });

    it('should have a main heading for the hackathons section', () => {
      render(<HackathonsContainer hackathons={mockHackathons} />);
      
      const heading = screen.getByRole('heading', { name: /hackathons/i, level: 2 });
      expect(heading).toBeInTheDocument();
    });

    // TODO: Add skip link for keyboard navigation
    it('should have skip link for keyboard navigation', () => {
      const { container } = render(<HackathonsContainer hackathons={mockHackathons} />);
      
      // This test will fail - no skip link
      const skipLink = screen.getByRole('link', { name: /skip to hackathons content/i });
      expect(skipLink).toBeInTheDocument();
    });

    it('should have proper heading hierarchy', () => {
      render(<HackathonsContainer hackathons={mockHackathons} />);
      
      const headings = screen.getAllByRole('heading');
      const h2Headings = headings.filter(h => h.tagName === 'H2');
      expect(h2Headings.length).toBeGreaterThan(0);
    });

    // TODO: Add aria-describedby linking to description
    it('should have aria-describedby linking to description', () => {
      const { container } = render(<HackathonsContainer hackathons={mockHackathons} />);
      
      // This test will fail - no aria-describedby
      const grid = container.querySelector('.grid');
      expect(grid).toHaveAttribute('aria-describedby', 'hackathons-description');
      
      const description = screen.getByText(/hackathons/i);
      expect(description).toHaveAttribute('id', 'hackathons-description');
    });

    // TODO: Add proper focus management for grid navigation (role="grid", aria-label)
    it('should have proper focus management for grid navigation', () => {
      const { container } = render(<HackathonsContainer hackathons={mockHackathons} />);
      
      // This test will fail - no tabindex or focus management
      const grid = container.querySelector('.grid');
      expect(grid).toHaveAttribute('role', 'grid');
      expect(grid).toHaveAttribute('aria-label', 'Hackathons grid');
    });

    // TODO: Add aria-busy attribute support for loading states
    it('should have aria-busy attribute during loading states', () => {
      const { container } = render(<HackathonsContainer hackathons={mockHackathons} />);
      
      // This test will fail - no aria-busy support
      const grid = container.querySelector('.grid');
      expect(grid).toHaveAttribute('aria-busy', 'false');
    });
  });
});

