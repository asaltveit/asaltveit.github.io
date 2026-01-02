import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import '../mocks/matchMediaFalse.mock'
import ProjectCard from '@/components/cards/ProjectCard'

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

describe('ProjectCard', () => {
  const defaultProps = {
    title: 'Test Project',
    dates: 'January 2024 - Present',
    items: ['Feature 1', 'Feature 2'],
    link: 'https://project.com'
  };

  it('renders project card with basic information', () => {
    render(<ProjectCard {...defaultProps} />);
    
    expect(screen.getByText('Test Project')).toBeInTheDocument();
    expect(screen.getByText('January 2024 - Present')).toBeInTheDocument();
    expect(screen.getByText('Feature 1')).toBeInTheDocument();
    expect(screen.getByText('Feature 2')).toBeInTheDocument();
  });

  it('renders placeholder code icon when no image provided', () => {
    render(<ProjectCard {...defaultProps} />);
    
    const codeIcon = document.querySelector('svg');
    expect(codeIcon).toBeInTheDocument();
  });

  it('renders image when provided', () => {
    render(
      <ProjectCard 
        {...defaultProps} 
        image="/test-image.png"
        imageTitle="test project"
      />
    );
    
    const image = screen.getByAltText('test project screenshot');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/test-image.png');
  });

  it('renders tech stack icons when provided', () => {
    render(
      <ProjectCard 
        {...defaultProps} 
        techStack={['React', 'TypeScript', 'TailwindCSS']}
      />
    );
    
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('TailwindCSS')).toBeInTheDocument();
  });

  it('requires link prop', () => {
    render(<ProjectCard {...defaultProps} />);
    
    const link = screen.getByRole('link', { name: 'link to Test Project' });
    expect(link).toHaveAttribute('href', 'https://project.com');
  });

  describe('User Interactions', () => {
    it('allows clicking on the title link', () => {
      const mockClick = jest.fn();
      
      render(<ProjectCard {...defaultProps} />);
      
      const link = screen.getByRole('link', { name: 'link to Test Project' });
      link.onclick = mockClick;
      
      fireEvent.click(link);
      expect(mockClick).toHaveBeenCalled();
    });

    it('allows clicking on the image link', () => {
      const mockClick = jest.fn();
      
      render(
        <ProjectCard 
          {...defaultProps} 
          image="/test-image.png"
          imageTitle="test project"
        />
      );
      
      const imageLink = screen.getByRole('link', { name: 'image link to Test Project' });
      imageLink.onclick = mockClick;
      
      fireEvent.click(imageLink);
      expect(mockClick).toHaveBeenCalled();
      expect(imageLink).toHaveAttribute('href', 'https://project.com');
    });

    it('image is always clickable (link is required)', () => {
      render(
        <ProjectCard 
          {...defaultProps} 
          image="/test-image.png"
          imageTitle="test project"
        />
      );
      
      const imageLink = screen.getByRole('link', { name: 'image link to Test Project' });
      expect(imageLink).toBeInTheDocument();
      expect(imageLink).toHaveAttribute('href', 'https://project.com');
    });

    it('shows hover overlay on image link', () => {
      render(
        <ProjectCard 
          {...defaultProps} 
          image="/test-image.png"
          imageTitle="test project"
        />
      );
      
      const imageLink = screen.getByRole('link', { name: 'image link to Test Project' });
      const overlay = imageLink.querySelector('.group-hover\\:opacity-20');
      
      expect(overlay).toBeInTheDocument();
    });

    it('supports keyboard navigation on title link', () => {
      render(<ProjectCard {...defaultProps} />);
      
      const link = screen.getByRole('link', { name: 'link to Test Project' });
      
      link.focus();
      expect(link).toHaveFocus();
      
      fireEvent.keyDown(link, { key: 'Enter', code: 'Enter' });
      expect(link).toHaveAttribute('href', 'https://project.com');
    });

    it('supports keyboard navigation on image link', () => {
      render(
        <ProjectCard 
          {...defaultProps} 
          image="/test-image.png"
          imageTitle="test project"
        />
      );
      
      const imageLink = screen.getByRole('link', { name: 'image link to Test Project' });
      
      imageLink.focus();
      expect(imageLink).toHaveFocus();
      
      fireEvent.keyDown(imageLink, { key: 'Enter', code: 'Enter' });
      expect(imageLink).toHaveAttribute('href', 'https://project.com');
    });

    it('has proper aria-labels for accessibility', () => {
      render(
        <ProjectCard 
          {...defaultProps} 
          image="/test-image.png"
          imageTitle="test project"
        />
      );
      
      const titleLink = screen.getByRole('link', { name: 'link to Test Project' });
      const imageLink = screen.getByRole('link', { name: 'image link to Test Project' });
      
      expect(titleLink).toHaveAttribute('aria-label', 'link to Test Project');
      expect(imageLink).toHaveAttribute('aria-label', 'image link to Test Project');
    });

    it('opens links in new tab with proper security attributes', () => {
      render(<ProjectCard {...defaultProps} />);
      
      const link = screen.getByRole('link', { name: 'link to Test Project' });
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('image link opens in new tab with proper security attributes', () => {
      render(
        <ProjectCard 
          {...defaultProps} 
          image="/test-image.png"
          imageTitle="test project"
        />
      );
      
      const imageLink = screen.getByRole('link', { name: 'image link to Test Project' });
      expect(imageLink).toHaveAttribute('target', '_blank');
      expect(imageLink).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  describe('Accessibility', () => {
    it('should mark placeholder code icon as decorative', () => {
      const { container } = render(<ProjectCard {...defaultProps} />);
      
      // Code2 icon from lucide-react
      const codeIcon = container.querySelector('svg.lucide-code-2') || 
                      container.querySelector('svg[class*="code"]');
      // Placeholder icon is purely decorative
      expect(codeIcon).toBeInTheDocument();
      expect(codeIcon).toHaveAttribute('aria-hidden', 'true');
    });
  });
});

