import '@testing-library/jest-dom'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import ThemeToggle from '@/components/ThemeToggle'

describe('ThemeToggle', () => {
  beforeEach(() => {
    document.documentElement.classList.remove('dark')
    localStorage.clear()
  })

  it('renders with dark theme switch label in light mode', () => {
    render(<ThemeToggle />)

    expect(
      screen.getByRole('button', { name: 'Switch to dark theme' })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Switch to dark theme' })
    ).toHaveAttribute('aria-pressed', 'false')
  })

  it('syncs to dark mode when html has dark class on mount', () => {
    document.documentElement.classList.add('dark')
    render(<ThemeToggle />)

    const button = screen.getByRole('button', { name: 'Switch to light theme' })
    expect(button).toHaveAttribute('aria-pressed', 'true')
  })

  it('toggles dark class, aria-pressed, and localStorage on click', async () => {
    render(<ThemeToggle />)

    const button = screen.getByRole('button', { name: 'Switch to dark theme' })
    expect(button).toHaveAttribute('aria-pressed', 'false')
    expect(document.documentElement.classList.contains('dark')).toBe(false)

    fireEvent.click(button)

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Switch to light theme' })).toHaveAttribute(
        'aria-pressed',
        'true'
      )
    })
    expect(document.documentElement.classList.contains('dark')).toBe(true)
    expect(localStorage.getItem('theme')).toBe('dark')

    fireEvent.click(screen.getByRole('button', { name: 'Switch to light theme' }))

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Switch to dark theme' })).toHaveAttribute(
        'aria-pressed',
        'false'
      )
    })
    expect(document.documentElement.classList.contains('dark')).toBe(false)
    expect(localStorage.getItem('theme')).toBe('light')
  })

  it('marks theme icons as decorative', () => {
    render(<ThemeToggle />)

    screen.getByRole('button', { name: 'Switch to dark theme' })
    const iconWrappers = document.querySelectorAll('button .theme-toggle-icon')
    expect(iconWrappers).toHaveLength(2)
    iconWrappers.forEach((wrapper) => {
      expect(wrapper).toHaveAttribute('aria-hidden', 'true')
    })
  })
})
