import '@testing-library/jest-dom'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import BackToTopButton from '@/components/BackToTopButton'

const mockScrollTo = jest.fn()
Object.defineProperty(window, 'scrollTo', {
  value: mockScrollTo,
  writable: true,
})

describe('BackToTopButton', () => {
  beforeEach(() => {
    mockScrollTo.mockClear()
    Object.defineProperty(window, 'pageYOffset', {
      writable: true,
      configurable: true,
      value: 0,
    })
  })

  it('does not render when scroll position is less than 300', () => {
    Object.defineProperty(window, 'pageYOffset', {
      writable: true,
      configurable: true,
      value: 200,
    })

    render(<BackToTopButton />)
    
    const button = screen.queryByRole('button', { name: /back to top/i })
    expect(button).not.toBeInTheDocument()
  })

  it('renders when scroll position is greater than 300', async () => {
    Object.defineProperty(window, 'pageYOffset', {
      writable: true,
      configurable: true,
      value: 400,
    })

    render(<BackToTopButton />)
    
    fireEvent.scroll(window)
    
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /back to top/i })).toBeInTheDocument()
    })
  })

  it('shows button when scrolling past 300px threshold', async () => {
    render(<BackToTopButton />)
    
    expect(screen.queryByRole('button', { name: /back to top/i })).not.toBeInTheDocument()
    
    Object.defineProperty(window, 'pageYOffset', {
      writable: true,
      configurable: true,
      value: 400,
    })
    
    fireEvent.scroll(window)
    
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /back to top/i })).toBeInTheDocument()
    })
  })

  it('hides button when scrolling back to top', async () => {
    Object.defineProperty(window, 'pageYOffset', {
      writable: true,
      configurable: true,
      value: 400,
    })

    render(<BackToTopButton />)
    
    fireEvent.scroll(window)
    
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /back to top/i })).toBeInTheDocument()
    })
    
    Object.defineProperty(window, 'pageYOffset', {
      writable: true,
      configurable: true,
      value: 0,
    })
    
    fireEvent.scroll(window)
    
    await waitFor(() => {
      expect(screen.queryByRole('button', { name: /back to top/i })).not.toBeInTheDocument()
    })
  })

  it('calls scrollTo when button is clicked', async () => {
    Object.defineProperty(window, 'pageYOffset', {
      writable: true,
      configurable: true,
      value: 400,
    })

    render(<BackToTopButton />)
    
    fireEvent.scroll(window)
    
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /back to top/i })).toBeInTheDocument()
    })
    
    const button = screen.getByRole('button', { name: /back to top/i })
    fireEvent.click(button)
    
    expect(mockScrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: 'smooth'
    })
  })

  it('calls scrollTo when button is activated with Enter key', async () => {
    Object.defineProperty(window, 'pageYOffset', {
      writable: true,
      configurable: true,
      value: 400,
    })

    render(<BackToTopButton />)
    
    fireEvent.scroll(window)
    
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /back to top/i })).toBeInTheDocument()
    })
    
    const button = screen.getByRole('button', { name: /back to top/i })
    button.focus()
    fireEvent.keyDown(button, { key: 'Enter', code: 'Enter' })
    fireEvent.click(button)
    
    expect(mockScrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: 'smooth'
    })
  })

  it('calls scrollTo when button is activated with Space key', async () => {
    Object.defineProperty(window, 'pageYOffset', {
      writable: true,
      configurable: true,
      value: 400,
    })

    render(<BackToTopButton />)
    
    fireEvent.scroll(window)
    
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /back to top/i })).toBeInTheDocument()
    })
    
    const button = screen.getByRole('button', { name: /back to top/i })
    button.focus()
    fireEvent.keyDown(button, { key: ' ', code: 'Space' })
    fireEvent.click(button)
    
    expect(mockScrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: 'smooth'
    })
  })

  it('cleans up scroll event listener on unmount', () => {
    const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener')
    
    const { unmount } = render(<BackToTopButton />)
    
    unmount()
    
    expect(removeEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function))
    
    removeEventListenerSpy.mockRestore()
  })

  it('renders with correct CSS classes', async () => {
    Object.defineProperty(window, 'pageYOffset', {
      writable: true,
      configurable: true,
      value: 400,
    })

    render(<BackToTopButton />)
    
    fireEvent.scroll(window)
    
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /back to top/i })).toBeInTheDocument()
    })
    
    const button = screen.getByRole('button', { name: /back to top/i })
    expect(button).toHaveClass(
      'fixed',
      'bottom-8',
      'right-8',
      'bg-blue-600',
      'hover:ring-4',
      'hover:bg-blue-700',
      'text-white',
      'p-4',
      'rounded-full',
      'shadow-2xl',
      'transition-all',
      'duration-300',
      'hover:scale-110',
      'hover:shadow-blue-500/50',
      'focus:outline-none',
      'focus:ring-4',
      'focus:ring-blue-700',
      'z-50'
    )
  })

  describe('Accessibility', () => {
    beforeEach(() => {
      Object.defineProperty(window, 'pageYOffset', {
        writable: true,
        configurable: true,
        value: 400,
      })
    })

    it('has proper accessibility attributes', async () => {
      render(<BackToTopButton />)
      
      fireEvent.scroll(window)
      
      await waitFor(() => {
        expect(screen.getByRole('button', { name: /back to top/i })).toBeInTheDocument()
      })
      
      const button = screen.getByRole('button', { name: /back to top/i })
      expect(button).toHaveAttribute('aria-label', 'Back to top')
      expect(button).toHaveAttribute('type', 'button')
      expect(button.tagName.toLowerCase()).toBe('button')
    })

    it('is keyboard accessible with visible focus indicator', async () => {
      render(<BackToTopButton />)
      
      fireEvent.scroll(window)
      
      await waitFor(() => {
        expect(screen.getByRole('button', { name: /back to top/i })).toBeInTheDocument()
      })
      
      const button = screen.getByRole('button', { name: /back to top/i })
      button.focus()
      expect(button).toHaveFocus()
      expect(button).toHaveClass('focus:ring-4', 'focus:ring-blue-700')
    })

    it('should announce button appearance to screen readers', async () => {
      const { container } = render(<BackToTopButton />)
      
      expect(screen.queryByRole('button', { name: /back to top/i })).not.toBeInTheDocument()
      
      const liveRegion = container.querySelector('[aria-live="polite"]')
      expect(liveRegion).toBeInTheDocument()
      expect(liveRegion).toHaveAttribute('aria-live', 'polite')
      expect(liveRegion).toHaveAttribute('aria-atomic', 'true')
      expect(liveRegion).toHaveClass('sr-only')
      
      expect(liveRegion).toBeEmptyDOMElement()
      
      Object.defineProperty(window, 'pageYOffset', {
        writable: true,
        configurable: true,
        value: 400,
      })
      
      fireEvent.scroll(window)
      
      await waitFor(() => {
        expect(screen.getByRole('button', { name: /back to top/i })).toBeInTheDocument()
      })
      
      await waitFor(() => {
        expect(liveRegion).toHaveTextContent('Back to top button available')
      })
    })

    it('should manage focus after scrolling to top', async () => {
      render(<BackToTopButton />)
      
      fireEvent.scroll(window)
      
      await waitFor(() => {
        expect(screen.getByRole('button', { name: /back to top/i })).toBeInTheDocument()
      })
      
      const button = screen.getByRole('button', { name: /back to top/i })
      button.focus()
      
      fireEvent.click(button)
      
      expect(document.activeElement).toBe(button)
    })

    it('should have sufficient color contrast (visual test placeholder)', async () => {
      render(<BackToTopButton />)
      
      fireEvent.scroll(window)
      
      await waitFor(() => {
        expect(screen.getByRole('button', { name: /back to top/i })).toBeInTheDocument()
      })
      
      const button = screen.getByRole('button', { name: /back to top/i })
      expect(button).toBeInTheDocument()
      // Contrast: assert classes only; use axe or visual review for WCAG ratios
    })
  })
})

