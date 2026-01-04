import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import '../mocks/matchMediaFalse.mock'
import TechStackIcons from '@/components/cards/TechStackIcons'

const matchMediaMock = jest.spyOn(window, 'matchMedia');

beforeEach(() => {
  matchMediaMock.mockClear();
});

describe('TechStackIcons', () => {
  it('returns null when techStack is empty', () => {
    const { container } = render(<TechStackIcons techStack={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it('returns null when techStack is not provided', () => {
    const { container } = render(<TechStackIcons techStack={undefined} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders single tech stack item', () => {
    render(<TechStackIcons techStack={['React']} />);
    
    expect(screen.getByText('React')).toBeInTheDocument();
  });

  it('renders multiple tech stack items', () => {
    render(<TechStackIcons techStack={['React', 'TypeScript', 'Node.js']} />);
    
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('Node.js')).toBeInTheDocument();
  });

  it('renders icons for known technologies', () => {
    render(<TechStackIcons techStack={['React', 'Python', 'PostgreSQL']} />);
    
    const reactItem = screen.getByText('React').closest('div');
    const pythonItem = screen.getByText('Python').closest('div');
    const postgresItem = screen.getByText('PostgreSQL').closest('div');
    
    expect(reactItem).toBeInTheDocument();
    expect(pythonItem).toBeInTheDocument();
    expect(postgresItem).toBeInTheDocument();
    
    // Check that icons (SVG elements) are present
    const icons = document.querySelectorAll('svg');
    expect(icons.length).toBeGreaterThan(0);
  });

  it('renders default icon for unknown technologies', () => {
    render(<TechStackIcons techStack={['UnknownTech']} />);
    
    expect(screen.getByText('UnknownTech')).toBeInTheDocument();
    const icons = document.querySelectorAll('svg');
    expect(icons.length).toBeGreaterThan(0);
  });

  it('renders Brain icon for AI tools', () => {
    render(<TechStackIcons techStack={['Some AI Tool']} />);
    
    expect(screen.getByText('Some AI Tool')).toBeInTheDocument();
    const icons = document.querySelectorAll('svg');
    expect(icons.length).toBeGreaterThan(0);
  });

  describe('User Interactions', () => {
    it('displays tooltip on hover via title attribute', () => {
      render(<TechStackIcons techStack={['React']} />);
      
      const techItem = screen.getByText('React').closest('div');
      expect(techItem).toHaveAttribute('title', 'React');
    });

    it('each tech item has a title attribute for accessibility', () => {
      render(<TechStackIcons techStack={['React', 'TypeScript', 'Node.js']} />);
      
      const reactItem = screen.getByText('React').closest('div');
      const tsItem = screen.getByText('TypeScript').closest('div');
      const nodeItem = screen.getByText('Node.js').closest('div');
      
      expect(reactItem).toHaveAttribute('title', 'React');
      expect(tsItem).toHaveAttribute('title', 'TypeScript');
      expect(nodeItem).toHaveAttribute('title', 'Node.js');
    });

    it('renders all tech stack items in a flex container', () => {
      const { container } = render(
        <TechStackIcons techStack={['React', 'TypeScript', 'Node.js', 'PostgreSQL']} />
      );
      
      const flexContainer = container.querySelector('.flex.flex-wrap');
      expect(flexContainer).toBeInTheDocument();
      
      const techItems = flexContainer?.querySelectorAll('div');
      expect(techItems?.length).toBe(4);
    });

    it('handles special characters in tech names', () => {
      render(<TechStackIcons techStack={['Next.js', 'C++', 'C#']} />);
      
      expect(screen.getByText('Next.js')).toBeInTheDocument();
      expect(screen.getByText('C++')).toBeInTheDocument();
      expect(screen.getByText('C#')).toBeInTheDocument();
    });

    it('handles case-insensitive AI tool detection', () => {
      render(<TechStackIcons techStack={['Anthropic', 'ELEVENLABS', 'cursor ai']} />);
      
      expect(screen.getByText('Anthropic')).toBeInTheDocument();
      expect(screen.getByText('ELEVENLABS')).toBeInTheDocument();
      expect(screen.getByText('cursor ai')).toBeInTheDocument();
    });

    it('renders correct icons for mapped technologies', () => {
      const knownTechs = ['React', 'Next.js', 'TypeScript', 'Python', 'Supabase'];
      render(<TechStackIcons techStack={knownTechs} />);
      
      knownTechs.forEach(tech => {
        expect(screen.getByText(tech)).toBeInTheDocument();
      });
      
      // All items should have icons
      const icons = document.querySelectorAll('svg');
      expect(icons.length).toBe(knownTechs.length);
    });

    it('wraps items correctly in flex layout', () => {
      const manyTechs = ['React', 'TypeScript', 'Node.js', 'Python', 'PostgreSQL', 'TailwindCSS'];
      const { container } = render(<TechStackIcons techStack={manyTechs} />);
      const flexContainer = container.querySelector('.flex.flex-wrap');
      
      expect(flexContainer).toBeInTheDocument();
      expect(flexContainer).toHaveClass('gap-2');
    });
  });

  describe('Accessibility', () => {
    it('should mark all icons as decorative with aria-hidden', () => {
      const { container } = render(
        <TechStackIcons techStack={['React', 'TypeScript', 'Node.js']} />
      );
      
      // All icons are decorative since the tech name is already in text
      // lucide-react automatically adds aria-hidden="true" to icons
      const icons = container.querySelectorAll('svg');
      icons.forEach(icon => {
        expect(icon).toHaveAttribute('aria-hidden', 'true');
      });
    });

    it('should not duplicate information for screen readers', () => {
      const { container } = render(
        <TechStackIcons techStack={['React']} />
      );
      
      // Since icons are decorative, they should be hidden
      // The text "React" is sufficient for screen readers
      // lucide-react automatically adds aria-hidden="true" to icons
      const icon = container.querySelector('svg');
      expect(icon).toHaveAttribute('aria-hidden', 'true');
    });

    it('should have title attribute on tech stack items for tooltips', () => {
      render(<TechStackIcons techStack={['React', 'TypeScript']} />);
      
      const reactItem = screen.getByText('React').closest('div');
      const tsItem = screen.getByText('TypeScript').closest('div');
      
      expect(reactItem).toHaveAttribute('title', 'React');
      expect(tsItem).toHaveAttribute('title', 'TypeScript');
    });

    it('should have proper structure for screen readers', () => {
      const { container } = render(
        <TechStackIcons techStack={['React', 'TypeScript', 'Node.js']} />
      );
      
      // Container should be a div with flex layout
      const containerDiv = container.firstChild;
      expect(containerDiv).toBeInTheDocument();
      expect(containerDiv).toHaveClass('flex', 'flex-wrap', 'gap-2');
    });
  });
});

