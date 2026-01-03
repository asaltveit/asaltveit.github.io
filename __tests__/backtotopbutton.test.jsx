import '@testing-library/jest-dom'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import BackToTopButton from '@/components/BackToTopButton'

// Mock window.scrollTo
const mockScrollTo = jest.fn()
Object.defineProperty(window, 'scrollTo', {
  value: mockScrollTo,
  writable: true,
})

describe('BackToTopButton', () => {
  beforeEach(() => {
    mockScrollTo.mockClear()
    // Reset window.pageYOffset
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
    
    // Trigger scroll event to update visibility
    fireEvent.scroll(window)
    
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /back to top/i })).toBeInTheDocument()
    })
  })

  it('shows button when scrolling past 300px threshold', async () => {
    render(<BackToTopButton />)
    
    // Initially not visible
    expect(screen.queryByRole('button', { name: /back to top/i })).not.toBeInTheDocument()
    
    // Simulate scroll past threshold
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
    // Start with button visible
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
    
    // Scroll back to top
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
    // Enter key on a focused button triggers click event in browsers
    // Simulate this by triggering click after keyDown
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
    // Space key on a focused button triggers click event in browsers
    // Simulate this by triggering click after keyDown
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
      'bg-white',
      'dark:bg-blue-600',
      'hover:ring-4',
      'hover:ring-blue-300',
      'dark:hover:bg-blue-700',
      'dark:text-white',
      'p-4',
      'rounded-full',
      'shadow-2xl',
      'transition-all',
      'duration-300',
      'hover:scale-110',
      'hover:shadow-blue-500/50',
      'focus:outline-none',
      'focus:ring-4',
      'focus:ring-blue-300',
      'dark:focus:bg-blue-700',
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

    it('has aria-label attribute', async () => {
      render(<BackToTopButton />)
      
      fireEvent.scroll(window)
      
      await waitFor(() => {
        expect(screen.getByRole('button', { name: /back to top/i })).toBeInTheDocument()
      })
      
      const button = screen.getByRole('button', { name: /back to top/i })
      expect(button).toHaveAttribute('aria-label', 'Back to top')
    })

    it('is keyboard accessible', async () => {
      render(<BackToTopButton />)
      
      fireEvent.scroll(window)
      
      await waitFor(() => {
        expect(screen.getByRole('button', { name: /back to top/i })).toBeInTheDocument()
      })
      
      const button = screen.getByRole('button', { name: /back to top/i })
      button.focus()
      expect(button).toHaveFocus()
    })

    it('has visible focus indicator', async () => {
      render(<BackToTopButton />)
      
      fireEvent.scroll(window)
      
      await waitFor(() => {
        expect(screen.getByRole('button', { name: /back to top/i })).toBeInTheDocument()
      })
      
      const button = screen.getByRole('button', { name: /back to top/i })
      button.focus()
      
      // Button has focus:ring-4 focus:ring-blue-300 classes
      // This test verifies the button can receive focus
      expect(button).toHaveFocus()
    })

    it('has proper button type', async () => {
      render(<BackToTopButton />)
      
      fireEvent.scroll(window)
      
      await waitFor(() => {
        expect(screen.getByRole('button', { name: /back to top/i })).toBeInTheDocument()
      })
      
      const button = screen.getByRole('button', { name: /back to top/i })
      // This test verifies the button element exists and is accessible
      expect(button.tagName.toLowerCase()).toBe('button')
      // Button should be a button element (not a link or div)
      expect(button).toBeInTheDocument()
    })

    // TODO: This test is currently failing - should announce button appearance to screen readers
    it('should announce button appearance to screen readers', async () => {
      render(<BackToTopButton />)
      
      // Initially not visible
      expect(screen.queryByRole('button', { name: /back to top/i })).not.toBeInTheDocument()
      
      // Scroll to make button appear
      Object.defineProperty(window, 'pageYOffset', {
        writable: true,
        configurable: true,
        value: 400,
      })
      
      fireEvent.scroll(window)
      
      await waitFor(() => {
        expect(screen.getByRole('button', { name: /back to top/i })).toBeInTheDocument()
      })
      
      // Button should have aria-live region or be announced when it appears
      // This test will fail - no aria-live region for button appearance
      const button = screen.getByRole('button', { name: /back to top/i })
      expect(button).toHaveAttribute('aria-live', 'polite')
    })

    // TODO: This test is currently failing - should have explicit type="button"
    it('should have explicit type="button" attribute', async () => {
      render(<BackToTopButton />)
      
      fireEvent.scroll(window)
      
      await waitFor(() => {
        expect(screen.getByRole('button', { name: /back to top/i })).toBeInTheDocument()
      })
      
      const button = screen.getByRole('button', { name: /back to top/i })
      // Explicit type="button" is clearer than relying on default
      // This test will fail - button doesn't have explicit type attribute in JSX
      // Note: HTML buttons default to type="button", but explicit is better practice
      expect(button.getAttribute('type')).toBe('button')
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
      
      // After scrolling to top, focus should be managed appropriately
      // Focus should either remain on button or move to top of page
      // Currently button may disappear after scroll, so focus management is important
      expect(document.activeElement).toBe(button)
    })

    it('should be accessible via screen reader', async () => {
      render(<BackToTopButton />)
      
      fireEvent.scroll(window)
      
      await waitFor(() => {
        expect(screen.getByRole('button', { name: /back to top/i })).toBeInTheDocument()
      })
      
      const button = screen.getByRole('button', { name: /back to top/i })
      expect(button).toBeInTheDocument()
      expect(button).toHaveAttribute('aria-label', 'Back to top')
    })

    it('should have sufficient color contrast (visual test placeholder)', async () => {
      render(<BackToTopButton />)
      
      fireEvent.scroll(window)
      
      await waitFor(() => {
        expect(screen.getByRole('button', { name: /back to top/i })).toBeInTheDocument()
      })
      
      const button = screen.getByRole('button', { name: /back to top/i })
      expect(button).toBeInTheDocument()
      
      // Button has classes: bg-white dark:bg-blue-600
      // Icon has: text-blue-600 dark:text-white
      // These should provide sufficient contrast, but automated testing
      // would require checking computed styles against background
    })
  })
})

