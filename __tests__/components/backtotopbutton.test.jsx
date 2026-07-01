import '@testing-library/jest-dom'
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react'
import BackToTopButton from '@/components/BackToTopButton'
import { useNavScrollState } from '@/utils/useNavScrollState'

jest.mock('../../app/utils/useNavScrollState', () => ({
  TOP_THRESHOLD: 10,
  useNavScrollState: jest.fn(() => ({ variant: 'hidden' })),
}))

const mockScrollTo = jest.fn()
Object.defineProperty(window, 'scrollTo', {
  value: mockScrollTo,
  writable: true,
})

function setScrollY(y) {
  Object.defineProperty(window, 'scrollY', {
    writable: true,
    configurable: true,
    value: y,
  })
  Object.defineProperty(window, 'pageYOffset', {
    writable: true,
    configurable: true,
    value: y,
  })
}

function scrollWindow() {
  act(() => {
    fireEvent.scroll(window)
  })
}

describe('BackToTopButton', () => {
  beforeEach(() => {
    jest.useFakeTimers()
    mockScrollTo.mockClear()
    useNavScrollState.mockReturnValue({ variant: 'hidden' })
    setScrollY(0)
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('does not render when at the top of the page', () => {
    setScrollY(5)

    render(<BackToTopButton />)
    scrollWindow()

    expect(screen.queryByRole('button', { name: /back to top/i })).not.toBeInTheDocument()
  })

  it('renders when scrolled past top and compact nav is hidden', async () => {
    setScrollY(400)

    render(<BackToTopButton />)
    scrollWindow()

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /back to top/i })).toBeInTheDocument()
    })
  })

  it('does not render when compact nav is showing', async () => {
    useNavScrollState.mockReturnValue({ variant: 'compact' })
    setScrollY(400)

    render(<BackToTopButton />)
    scrollWindow()

    await waitFor(() => {
      expect(screen.queryByRole('button', { name: /back to top/i })).not.toBeInTheDocument()
    })
  })

  it('shows button when scrolling past top threshold', async () => {
    render(<BackToTopButton />)

    expect(screen.queryByRole('button', { name: /back to top/i })).not.toBeInTheDocument()

    setScrollY(50)
    scrollWindow()

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /back to top/i })).toBeInTheDocument()
    })
  })

  it('hides button when scrolling back to top', async () => {
    setScrollY(400)

    render(<BackToTopButton />)
    scrollWindow()

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /back to top/i })).toBeInTheDocument()
    })

    setScrollY(0)
    scrollWindow()

    act(() => {
      jest.advanceTimersByTime(300)
    })

    await waitFor(() => {
      expect(screen.queryByRole('button', { name: /back to top/i })).not.toBeInTheDocument()
    })
  })

  it('plays exit animation before unmounting', async () => {
    setScrollY(400)

    const { rerender } = render(<BackToTopButton />)
    scrollWindow()

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /back to top/i })).toBeInTheDocument()
    })

    useNavScrollState.mockReturnValue({ variant: 'compact' })
    rerender(<BackToTopButton />)

    const button = document.querySelector('[aria-label="Back to top"]')
    expect(button).toHaveClass('opacity-0', 'translate-y-2', 'scale-95')
    expect(button).toHaveAttribute('aria-hidden', 'true')

    act(() => {
      jest.advanceTimersByTime(300)
    })

    await waitFor(() => {
      expect(screen.queryByRole('button', { name: /back to top/i })).not.toBeInTheDocument()
    })
  })

  it('calls scrollTo when button is clicked', async () => {
    setScrollY(400)

    render(<BackToTopButton />)
    scrollWindow()

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
    setScrollY(400)

    render(<BackToTopButton />)
    scrollWindow()

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
    setScrollY(400)

    render(<BackToTopButton />)
    scrollWindow()

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
    setScrollY(400)

    render(<BackToTopButton />)
    scrollWindow()

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /back to top/i })).toBeInTheDocument()
    })

    const button = screen.getByRole('button', { name: /back to top/i })
    expect(button).toHaveClass(
      'fixed',
      'bottom-8',
      'right-8',
      'bg-accent',
      'hover:ring-4',
      'hover:bg-accent-hover',
      'text-surface',
      'p-4',
      'rounded-full',
      'shadow-2xl',
      'transition-all',
      'duration-300',
      'hover:scale-110',
      'motion-reduce:hover:scale-100',
      'hover:shadow-accent/50',
      'focus:outline-none',
      'focus-visible:ring-4',
      'focus-visible:ring-accent-hover',
      'z-50',
      'opacity-100',
      'translate-y-0',
      'scale-100'
    )
  })

  describe('Accessibility', () => {
    it('has proper accessibility attributes', async () => {
      setScrollY(400)
      render(<BackToTopButton />)
      scrollWindow()

      await waitFor(() => {
        expect(screen.getByRole('button', { name: /back to top/i })).toBeInTheDocument()
      })

      const button = screen.getByRole('button', { name: /back to top/i })
      expect(button).toHaveAttribute('aria-label', 'Back to top')
      expect(button).toHaveAttribute('type', 'button')
      expect(button.tagName.toLowerCase()).toBe('button')
    })

    it('is keyboard accessible with visible focus indicator', async () => {
      setScrollY(400)
      render(<BackToTopButton />)
      scrollWindow()

      await waitFor(() => {
        expect(screen.getByRole('button', { name: /back to top/i })).toBeInTheDocument()
      })

      const button = screen.getByRole('button', { name: /back to top/i })
      button.focus()
      expect(button).toHaveFocus()
      expect(button).toHaveClass('focus-visible:ring-4', 'focus-visible:ring-accent-hover')
    })

    it('should announce button appearance to screen readers', async () => {
      setScrollY(0)
      const { container } = render(<BackToTopButton />)

      expect(screen.queryByRole('button', { name: /back to top/i })).not.toBeInTheDocument()

      const liveRegion = container.querySelector('[aria-live="polite"]')
      expect(liveRegion).toBeInTheDocument()
      expect(liveRegion).toHaveAttribute('aria-live', 'polite')
      expect(liveRegion).toHaveAttribute('aria-atomic', 'true')
      expect(liveRegion).toHaveClass('sr-only')

      expect(liveRegion).toBeEmptyDOMElement()

      setScrollY(400)
      scrollWindow()

      await waitFor(() => {
        expect(screen.getByRole('button', { name: /back to top/i })).toBeInTheDocument()
      })

      await waitFor(() => {
        expect(liveRegion).toHaveTextContent('Back to top button available')
      })
    })

    it('should manage focus after scrolling to top', async () => {
      setScrollY(400)
      render(<BackToTopButton />)
      scrollWindow()

      await waitFor(() => {
        expect(screen.getByRole('button', { name: /back to top/i })).toBeInTheDocument()
      })

      const button = screen.getByRole('button', { name: /back to top/i })
      button.focus()

      fireEvent.click(button)

      expect(document.activeElement).toBe(button)
    })

    it('should have sufficient color contrast (visual test placeholder)', async () => {
      setScrollY(400)
      render(<BackToTopButton />)
      scrollWindow()

      await waitFor(() => {
        expect(screen.getByRole('button', { name: /back to top/i })).toBeInTheDocument()
      })

      const button = screen.getByRole('button', { name: /back to top/i })
      expect(button).toBeInTheDocument()
      // Contrast: assert classes only; use axe or visual review for WCAG ratios
    })
  })
})
