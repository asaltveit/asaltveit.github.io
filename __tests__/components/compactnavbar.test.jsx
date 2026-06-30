import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import CompactNavBar from '@/components/CompactNavBar'

const mockLinks = [
  { title: 'About', id: 'about' },
  { title: 'Projects', id: 'projects' },
  { title: 'Experience', id: 'experience' },
  { title: 'Hackathons', id: 'hackathons' },
  { title: 'Skills', id: 'skills' },
]

describe('CompactNavBar', () => {
  it('renders the same links as the full nav bar', () => {
    render(<CompactNavBar links={mockLinks} />)

    mockLinks.forEach(({ title }) => {
      expect(screen.getByRole('link', { name: `link to ${title} section` })).toHaveTextContent(title)
    })
  })

  it('has correct href attributes', () => {
    render(<CompactNavBar links={mockLinks} />)

    mockLinks.forEach(({ title, id }) => {
      expect(screen.getByRole('link', { name: `link to ${title} section` })).toHaveAttribute('href', `#${id}`)
    })
  })

  it('does not render Github link', () => {
    render(<CompactNavBar links={mockLinks} />)

    expect(screen.queryByRole('link', { name: 'link to Github (opens in new tab)' })).not.toBeInTheDocument()
  })

  it('renders navigation landmark', () => {
    render(<CompactNavBar links={mockLinks} />)

    const nav = screen.getByRole('navigation', { name: 'main navigation' })
    expect(nav).toBeInTheDocument()
    expect(nav).toHaveClass('compact-nav-bar')
  })

  it('renders skip to main content link', () => {
    render(<CompactNavBar links={mockLinks} />)

    expect(screen.getByRole('link', { name: 'skip to main content' })).toHaveAttribute('href', '#main-content')
  })
})
