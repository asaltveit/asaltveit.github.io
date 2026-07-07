import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import ProjectsSection from '@/components/containers/ProjectsSection'

// Mock Next.js Link and Image components
jest.mock('next/link')

jest.mock('next/image')

const matchMediaMock = jest.spyOn(window, 'matchMedia')

beforeEach(() => {
  matchMediaMock.mockClear()
})

describe('ProjectsSection', () => {
  const mockProjects = [
    {
      title: 'Project 1',
      dates: '2024 - 2025',
      items: ['Item 1', 'Item 2'],
      link: 'https://example.com/project1',
      techStack: ['React', 'TypeScript'],
      image: '/project1.png',
      imageTitle: 'Project 1 screenshot',
    },
    {
      title: 'Project 2',
      dates: '2023 - 2024',
      items: ['Item 3', 'Item 4'],
      link: 'https://example.com/project2',
      techStack: ['Python'],
      image: '/project2.png',
    },
    {
      title: 'Project 3',
      dates: '2022',
      items: ['Item 5'],
      link: 'https://example.com/project3',
      techStack: [],
    },
  ]

  const featured = [mockProjects[0], mockProjects[1]]

  it('renders featured projects', () => {
    render(<ProjectsSection featuredProjects={featured} />)

    expect(screen.getByText('Project 1')).toBeInTheDocument()
    expect(screen.getByText('Project 2')).toBeInTheDocument()
  })

  it('renders project cards with correct content', () => {
    render(<ProjectsSection featuredProjects={[mockProjects[0]]} />)

    expect(screen.getByText('Project 1')).toBeInTheDocument()
    expect(screen.getByText('2024 - 2025')).toBeInTheDocument()
    expect(screen.getByText('Item 1')).toBeInTheDocument()
    expect(screen.getByText('Item 2')).toBeInTheDocument()
  })

  it('renders no featured grid when featured is empty', () => {
    const { container } = render(<ProjectsSection featuredProjects={[]} />)

    expect(container.querySelector('#projects-grid')).not.toBeInTheDocument()
  })

  it('applies correct grid classes to featured grid', () => {
    const { container } = render(<ProjectsSection featuredProjects={featured} />)

    const grid = container.querySelector('#projects-grid')
    expect(grid).toBeInTheDocument()
    expect(grid).toHaveClass('grid')
    expect(grid).toHaveClass('grid-cols-1')
    expect(grid).toHaveClass('md:grid-cols-2')
    expect(grid).toHaveClass('gap-6')
    expect(grid).toHaveClass('md:gap-8')
  })

  it('renders projects with images when provided', () => {
    render(<ProjectsSection featuredProjects={[mockProjects[0]]} />)

    const imageLink = screen.getByRole('link', { name: 'View Project 1 (opens in new tab)' })
    const image = imageLink.querySelector('img')
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', '/project1-800w.webp')
    expect(image).toHaveAttribute('alt', '')
  })

  it('uses decorative alt on linked project images', () => {
    render(<ProjectsSection featuredProjects={[mockProjects[1]]} />)

    const imageLink = screen.getByRole('link', { name: 'View Project 2 (opens in new tab)' })
    const image = imageLink.querySelector('img')
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('alt', '')
  })

  it('renders all project links correct', () => {
    render(<ProjectsSection featuredProjects={featured} />)

    const project1Link = screen.getByRole('link', { name: /link to Project 1/i })
    expect(project1Link).toHaveAttribute('href', 'https://example.com/project1')
  })

  describe('Accessibility', () => {
    it('should have skip link for keyboard navigation', () => {
      render(<ProjectsSection featuredProjects={featured} />)

      const skipLink = screen.getByRole('link', { name: /skip to hackathons content/i })
      expect(skipLink).toBeInTheDocument()
    })

    it('should have aria-describedby linking to description', () => {
      const { container } = render(<ProjectsSection featuredProjects={featured} />)

      const grid = container.querySelector('#projects-grid')
      expect(grid).toHaveAttribute('aria-describedby', 'projects-description')

      const description = document.getElementById('projects-description')
      expect(description).toBeInTheDocument()
      expect(description).toHaveAttribute('id', 'projects-description')
    })

    it('should have proper focus management for grid navigation', () => {
      const { container } = render(<ProjectsSection featuredProjects={featured} />)

      const grid = container.querySelector('#projects-grid')
      expect(grid).toHaveAttribute('role', 'grid')
      expect(grid).toHaveAttribute('aria-label', 'Selected projects')
    })
  })
})
