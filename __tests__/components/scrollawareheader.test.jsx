import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import ScrollAwareHeader from '@/components/ScrollAwareHeader'
import { useNavScrollState } from '@/utils/useNavScrollState'

jest.mock('../../app/utils/useNavScrollState')

const mockLinks = [
  { title: 'About', id: 'about' },
  { title: 'Projects', id: 'projects' },
  { title: 'Skills', id: 'skills' },
]

function mockVariant(variant) {
  useNavScrollState.mockReturnValue({ variant })
}

describe('ScrollAwareHeader', () => {
  beforeEach(() => {
    class ResizeObserverMock {
      observe = jest.fn()
      disconnect = jest.fn()
      unobserve = jest.fn()
    }
    global.ResizeObserver = ResizeObserverMock
    mockVariant('full')
  })

  it('renders full NavBar when variant is full', () => {
    render(<ScrollAwareHeader links={mockLinks} />)

    expect(screen.getByRole('link', { name: 'link to Skills section' })).toBeInTheDocument()
    expect(screen.queryByRole('link', { name: 'link to Github (opens in new tab)' })).not.toBeInTheDocument()
  })

  it('renders CompactNavBar when variant is compact', () => {
    mockVariant('compact')
    render(<ScrollAwareHeader links={mockLinks} />)

    expect(screen.getByRole('link', { name: 'link to About section' })).toHaveTextContent('About')
    expect(screen.getByRole('link', { name: 'link to Skills section' })).toBeInTheDocument()
    expect(screen.queryByRole('link', { name: 'link to Github (opens in new tab)' })).not.toBeInTheDocument()
  })

  it('hides header when variant is hidden', () => {
    mockVariant('hidden')
    render(<ScrollAwareHeader links={mockLinks} />)

    const header = screen.getByRole('banner', { hidden: true })
    expect(header).toHaveAttribute('aria-hidden', 'true')
    expect(header).toHaveAttribute('inert')
    expect(header).toHaveClass('-translate-y-full', 'pointer-events-none')
  })

  it('shows header when variant is not hidden', () => {
    mockVariant('full')
    render(<ScrollAwareHeader links={mockLinks} />)

    const header = screen.getByRole('banner')
    expect(header).toHaveAttribute('aria-hidden', 'false')
    expect(header).not.toHaveAttribute('inert')
    expect(header).toHaveClass('translate-y-0')
  })

  it('collapses spacer height when not in full variant', () => {
    mockVariant('compact')
    const { container } = render(<ScrollAwareHeader links={mockLinks} />)

    const spacer = container.querySelector('header + div')
    expect(Number.parseFloat(spacer.style.height)).toBe(0)
  })

  it('reserves full nav spacer height before measurement when variant is full', () => {
    mockVariant('full')
    const { container } = render(<ScrollAwareHeader links={mockLinks} />)

    const spacer = container.querySelector('header + div')
    expect(spacer.style.height).toBe('var(--full-nav-height)')
  })
})
