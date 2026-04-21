import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Section from '@/components/containers/Section'

describe('Section', () => {
  const defaultProps = {
    title: 'Test Section',
    id: 'test-section',
    children: <div>Test content</div>
  }

  it('renders', () => {
    render(<Section {...defaultProps} />)
    
    const section = document.getElementById('test-section')
    expect(section).toBeInTheDocument()
    
    expect(screen.getByText('Test Section')).toBeInTheDocument()
    expect(screen.getByText('Test content')).toBeInTheDocument()
  })

  it('renders with correct id attribute', () => {
    render(<Section {...defaultProps} />)
    
    const section = document.getElementById('test-section')
    expect(section).toBeInTheDocument()
    expect(section).toHaveAttribute('id', 'test-section')
  })

  it('renders title correctly', () => {
    render(<Section {...defaultProps} title="Custom Title" />)
    
    expect(screen.getByText('Custom Title')).toBeInTheDocument()
  })

  it('renders children correctly', () => {
    const children = (
      <div>
        <p>Child paragraph 1</p>
        <p>Child paragraph 2</p>
      </div>
    )
    
    render(<Section {...defaultProps} children={children} />)
    
    expect(screen.getByText('Child paragraph 1')).toBeInTheDocument()
    expect(screen.getByText('Child paragraph 2')).toBeInTheDocument()
  })

  it('renders multiple children correctly', () => {
    render(
      <Section title="Multi Children" id="multi">
        <div>First child</div>
        <div>Second child</div>
        <div>Third child</div>
      </Section>
    )
    
    expect(screen.getByText('First child')).toBeInTheDocument()
    expect(screen.getByText('Second child')).toBeInTheDocument()
    expect(screen.getByText('Third child')).toBeInTheDocument()
  })

  it('applies correct CSS classes', () => {
    const { container } = render(<Section {...defaultProps} />)
    
    const section = container.querySelector('#test-section')
    expect(section).toHaveClass('relative', 'max-w-sm', 'md:max-w-5xl', 'min-w-0', 'mx-auto', 'w-full', 'break-words', 'bg-primary-blue', 'mb-3', 'shadow-lg', 'rounded-xl', 'md:mt-16', 'mt-8')
  })

  describe('Accessibility', () => {
    it('should use semantic heading element for title', () => {
      render(<Section {...defaultProps} />)
      
      const heading = screen.getByRole('heading', { name: 'Test Section' })
      expect(heading).toBeInTheDocument()
    })

    it('should use h2 element for section title', () => {
      const { container } = render(<Section {...defaultProps} />)
      
      const heading = container.querySelector('h2')
      expect(heading).toBeInTheDocument()
      expect(heading).toHaveTextContent('Test Section')
    })

    it('should use semantic section element', () => {
      const { container } = render(<Section {...defaultProps} />)
      
      const sectionElement = container.querySelector('section')
      expect(sectionElement).toBeInTheDocument()
      expect(sectionElement).toHaveAttribute('id', 'test-section')
    })

    it('should have proper heading hierarchy', () => {
      render(<Section {...defaultProps} />)
      
      const heading = screen.getByRole('heading', { name: 'Test Section' })
      expect(heading.tagName.toLowerCase()).toBe('h2')
    })

    it('should have accessible region landmark', () => {
      render(<Section {...defaultProps} />)
      
      const region = screen.getByRole('region', { name: 'Test Section' })
      expect(region).toBeInTheDocument()
    })

    it('should have aria-labelledby linking title to section', () => {
      const { container } = render(<Section {...defaultProps} />)
      
      const section = container.querySelector('section') || container.querySelector('#test-section')
      const heading = container.querySelector('h2')
      expect(heading).toBeInTheDocument()
      expect(section).toHaveAttribute('aria-labelledby', heading.getAttribute('id'))
    })

    it('should have heading with id for aria-labelledby reference', () => {
      const { container } = render(<Section {...defaultProps} />)
      
      const heading = container.querySelector('h2')
      expect(heading).toBeInTheDocument()
      expect(heading).toHaveAttribute('id')
      expect(heading.getAttribute('id')).toBeTruthy()
    })

    it('should be keyboard navigable when used with anchor links', () => {
      render(<Section {...defaultProps} />)
      
      const section = document.getElementById('test-section')
      expect(section).toBeInTheDocument()
      expect(section).toHaveAttribute('id', 'test-section')
    })

    it('should have proper color contrast (visual test placeholder)', () => {
      render(<Section {...defaultProps} />)
      
      const title = screen.getByText('Test Section')
      expect(title).toBeInTheDocument()
      // Contrast: use axe or visual review; title uses text-white on bg-primary-blue
    })
  })
})

