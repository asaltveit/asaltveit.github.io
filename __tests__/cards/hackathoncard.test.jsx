import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import '../mocks/matchMediaFalse.mock'
import HackathonCard from '@/components/cards/HackathonCard'

// Mock Next.js Image and Link components
jest.mock('next/image', () => {
  return ({ src, alt, ...props }) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} {...props} />
  }
})

jest.mock('next/link', () => {
  return ({ children, href, ...props }) => {
    return <a href={href} {...props}>{children}</a>
  }
})

const matchMediaMock = jest.spyOn(window, 'matchMedia');

beforeEach(() => {
  matchMediaMock.mockClear();
});

describe('HackathonCard', () => {
  const defaultProps = {
    title: 'Test Hackathon',
    dates: 'January 2024',
    items: ['Built a cool app', 'Won first place']
  };

  it('renders hackathon card with basic information', () => {
    render(<HackathonCard {...defaultProps} />);
    
    expect(screen.getByText('Test Hackathon')).toBeInTheDocument();
    expect(screen.getByText('January 2024')).toBeInTheDocument();
    expect(screen.getByText('Built a cool app')).toBeInTheDocument();
    expect(screen.getByText('Won first place')).toBeInTheDocument();
  });

  it('renders placeholder trophy icon when no image provided', () => {
    const { container } = render(<HackathonCard {...defaultProps} />);
    
    const trophyIcon = container.querySelector('svg.lucide-trophy');
    expect(trophyIcon).toBeInTheDocument();
  });

  it('renders image when provided', () => {
    render(
      <HackathonCard 
        {...defaultProps} 
        image="/test-image.png"
        imageTitle="test hackathon"
      />
    );
    
    const image = screen.getByAltText('test hackathon screenshot');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/test-image.png');
  });

  it('renders tech stack icons when provided', () => {
    render(
      <HackathonCard 
        {...defaultProps} 
        techStack={['React', 'TypeScript', 'Node.js']}
      />
    );
    
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('Node.js')).toBeInTheDocument();
  });

  it('renders award badge when provided', () => {
    render(
      <HackathonCard 
        {...defaultProps} 
        award="First Place"
      />
    );
    
    expect(screen.getByText('First Place')).toBeInTheDocument();
  });

  it('renders team size when provided', () => {
    render(
      <HackathonCard 
        {...defaultProps} 
        teamSize={3}
      />
    );
    
    expect(screen.getByText('3 people')).toBeInTheDocument();
  });

  it('renders singular person for team size of 1', () => {
    render(
      <HackathonCard 
        {...defaultProps} 
        teamSize={1}
      />
    );
    
    expect(screen.getByText('1 person')).toBeInTheDocument();
  });

  it('renders duration when provided', () => {
    render(
      <HackathonCard 
        {...defaultProps} 
        duration="24 hours"
      />
    );
    
    expect(screen.getByText('24 hours')).toBeInTheDocument();
  });

  describe('User Interactions', () => {
    it('allows clicking on the title link', () => {
      const mockClick = jest.fn();
      
      render(
        <HackathonCard 
          {...defaultProps} 
          link="https://hackathon.com"
        />
      );
      
      const link = screen.getByRole('link', { name: 'link to Test Hackathon' });
      link.onclick = mockClick;
      
      fireEvent.click(link);
      expect(mockClick).toHaveBeenCalled();
    });

    it('allows clicking on the image when link is provided', () => {
      const mockClick = jest.fn();
      
      render(
        <HackathonCard 
          {...defaultProps} 
          link="https://hackathon.com"
          image="/test-image.png"
          imageTitle="test hackathon"
        />
      );
      
      const imageLink = screen.getByRole('link', { name: 'image link to Test Hackathon' });
      imageLink.onclick = mockClick;
      
      fireEvent.click(imageLink);
      expect(mockClick).toHaveBeenCalled();
      expect(imageLink).toHaveAttribute('href', 'https://hackathon.com');
    });

    it('image is not clickable when no link is provided', () => {
      render(
        <HackathonCard 
          {...defaultProps} 
          image="/test-image.png"
          imageTitle="test hackathon"
        />
      );
      
      const imageLink = screen.queryByRole('link', { name: 'image link to Test Hackathon' });
      expect(imageLink).not.toBeInTheDocument();
      
      const image = screen.getByAltText('test hackathon screenshot');
      expect(image).toBeInTheDocument();
    });

    it('shows hover overlay on image link', () => {
      render(
        <HackathonCard 
          {...defaultProps} 
          link="https://hackathon.com"
          image="/test-image.png"
          imageTitle="test hackathon"
        />
      );
      
      const imageLink = screen.getByRole('link', { name: 'image link to Test Hackathon' });
      const overlay = imageLink.querySelector('.group-hover\\:opacity-20');
      
      expect(overlay).toBeInTheDocument();
    });

    it('supports keyboard navigation on title link', () => {
      render(
        <HackathonCard 
          {...defaultProps} 
          link="https://hackathon.com"
        />
      );
      
      const link = screen.getByRole('link', { name: 'link to Test Hackathon' });
      
      link.focus();
      expect(link).toHaveFocus();
      
      fireEvent.keyDown(link, { key: 'Enter', code: 'Enter' });
      expect(link).toHaveAttribute('href', 'https://hackathon.com');
    });

    it('supports keyboard navigation on image link', () => {
      render(
        <HackathonCard 
          {...defaultProps} 
          link="https://hackathon.com"
          image="/test-image.png"
          imageTitle="test hackathon"
        />
      );
      
      const imageLink = screen.getByRole('link', { name: 'image link to Test Hackathon' });
      
      imageLink.focus();
      expect(imageLink).toHaveFocus();
      
      fireEvent.keyDown(imageLink, { key: 'Enter', code: 'Enter' });
      expect(imageLink).toHaveAttribute('href', 'https://hackathon.com');
    });

    it('has proper aria-labels for accessibility', () => {
      render(
        <HackathonCard 
          {...defaultProps} 
          link="https://hackathon.com"
          image="/test-image.png"
          imageTitle="test hackathon"
        />
      );
      
      const titleLink = screen.getByRole('link', { name: 'link to Test Hackathon' });
      const imageLink = screen.getByRole('link', { name: 'image link to Test Hackathon' });
      
      expect(titleLink).toHaveAttribute('aria-label', 'link to Test Hackathon');
      expect(imageLink).toHaveAttribute('aria-label', 'image link to Test Hackathon');
    });

    it('displays all metadata items together', () => {
      render(
        <HackathonCard 
          {...defaultProps} 
          award="First Place"
          teamSize={4}
          duration="48 hours"
        />
      );
      
      expect(screen.getByText('First Place')).toBeInTheDocument();
      expect(screen.getByText('4 people')).toBeInTheDocument();
      expect(screen.getByText('48 hours')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should mark decorative icons (Trophy, Clock, Users) with aria-hidden', () => {
      const { container } = render(
        <HackathonCard 
          {...defaultProps} 
          award="First Place"
          teamSize={3}
          duration="24 hours"
        />
      );
      
      // All decorative icons should be hidden from screen readers
      const icons = container.querySelectorAll('svg');
      icons.forEach(icon => {
        // Icons that are decorative (not providing additional info beyond text) should be hidden
        // Trophy, Clock, Users icons are decorative since text is present
        if (icon.closest('[class*="flex items-center gap"]')) {
          expect(icon).toHaveAttribute('aria-hidden', 'true');
        }
      });
    });

    it('should mark placeholder trophy icon as decorative', () => {
      const { container } = render(<HackathonCard {...defaultProps} />);
      
      const trophyIcon = container.querySelector('svg.lucide-trophy');
      // Placeholder icon is purely decorative
      expect(trophyIcon).toHaveAttribute('aria-hidden', 'true');
    });
  });
});

