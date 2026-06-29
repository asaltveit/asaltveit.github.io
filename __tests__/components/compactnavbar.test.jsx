import '@testing-library/jest-dom'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import CompactNavBar from '@/components/CompactNavBar'

describe('CompactNavBar', () => {
  it('renders Anna, Projects, and Github links', () => {
    render(<CompactNavBar />)

    expect(screen.getByRole('link', { name: 'link to About section' })).toHaveTextContent('Anna')
    expect(screen.getByRole('link', { name: 'link to Projects section' })).toHaveTextContent('Projects')
    expect(screen.getByRole('link', { name: 'link to Github (opens in new tab)' })).toHaveTextContent('Github')
  })

  it('has correct href attributes', () => {
    render(<CompactNavBar />)

    expect(screen.getByRole('link', { name: 'link to About section' })).toHaveAttribute('href', '#about')
    expect(screen.getByRole('link', { name: 'link to Projects section' })).toHaveAttribute('href', '#projects')
    expect(screen.getByRole('link', { name: 'link to Github (opens in new tab)' })).toHaveAttribute(
      'href',
      'https://github.com/asaltveit'
    )
  })

  it('opens Github in a new tab', () => {
    render(<CompactNavBar />)

    const githubLink = screen.getByRole('link', { name: 'link to Github (opens in new tab)' })
    expect(githubLink).toHaveAttribute('target', '_blank')
    expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('renders navigation landmark', () => {
    render(<CompactNavBar />)

    const nav = screen.getByRole('navigation', { name: 'main navigation' })
    expect(nav).toBeInTheDocument()
    expect(nav).toHaveClass('h-12')
  })

  it('renders skip to main content link', () => {
    render(<CompactNavBar />)

    expect(screen.getByRole('link', { name: 'skip to main content' })).toHaveAttribute('href', '#main-content')
  })
})
