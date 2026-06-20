import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import '../mocks/matchMediaFalse.mock'
import ProjectsContainer from '@/components/containers/ProjectsContainer'

// Mock Next.js Link and Image components
jest.mock('next/link', () => {
  return ({ children, href, ...props }) => {
    return <a href={href} {...props}>{children}</a>
  }
})

jest.mock('next/image', () => {
  return ({ src, alt, ...props }) => {
    return <img src={src} alt={alt} {...props} />
  }
})

const matchMediaMock = jest.spyOn(window, 'matchMedia')

beforeEach(() => {
  matchMediaMock.mockClear()
})

describe('ProjectsContainer', () => {
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
  const other = [mockProjects[2]]

  it('renders all projects when split between featured and other', () => {
    render(<ProjectsContainer featuredProjects={featured} otherProjects={other} />)

    expect(screen.getByText('Project 1')).toBeInTheDocument()
    expect(screen.getByText('Project 2')).toBeInTheDocument()
    expect(screen.getByText('Project 3')).toBeInTheDocument()
    expect(screen.getByText(/Other projects \(1\)/)).toBeInTheDocument()
  })

  it('renders project cards with correct content', () => {
    render(<ProjectsContainer featuredProjects={[mockProjects[0]]} otherProjects={[]} />)

    expect(screen.getByText('Project 1')).toBeInTheDocument()
    expect(screen.getByText('2024 - 2025')).toBeInTheDocument()
    expect(screen.getByText('Item 1')).toBeInTheDocument()
    expect(screen.getByText('Item 2')).toBeInTheDocument()
  })

  it('renders no featured grid when featured is empty', () => {
    const { container } = render(<ProjectsContainer featuredProjects={[]} otherProjects={other} />)

    expect(container.querySelector('#projects-grid')).not.toBeInTheDocument()
    expect(screen.getByText('Project 3')).toBeInTheDocument()
  })

  it('renders empty state when both lists are empty', () => {
    const { container } = render(<ProjectsContainer featuredProjects={[]} otherProjects={[]} />)

    expect(container.querySelector('#projects-grid')).not.toBeInTheDocument()
    expect(screen.queryByText(/Other projects/)).not.toBeInTheDocument()
  })

  it('applies correct grid classes to featured grid', () => {
    const { container } = render(<ProjectsContainer featuredProjects={featured} otherProjects={[]} />)

    const grid = container.querySelector('#projects-grid')
    expect(grid).toBeInTheDocument()
    expect(grid).toHaveClass('grid')
    expect(grid).toHaveClass('grid-cols-1')
    expect(grid).toHaveClass('md:grid-cols-2')
    expect(grid).toHaveClass('gap-6')
    expect(grid).toHaveClass('md:gap-8')
  })

  it('renders projects with images when provided', () => {
    render(<ProjectsContainer featuredProjects={[mockProjects[0]]} otherProjects={[]} />)

    const image = screen.getByAltText('Project 1 screenshot screenshot')
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', '/project1.png')
  })

  it('uses default imageTitle when not provided', () => {
    render(<ProjectsContainer featuredProjects={[mockProjects[1]]} otherProjects={[]} />)

    const image = screen.getByAltText('Project 2 screenshot')
    expect(image).toBeInTheDocument()
  })

  it('renders all project links correct', () => {
    render(<ProjectsContainer featuredProjects={featured} otherProjects={other} />)

    const project1Link = screen.getByRole('link', { name: /link to Project 1/i })
    expect(project1Link).toHaveAttribute('href', 'https://example.com/project1')
  })

  describe('Accessibility', () => {
    it('should have skip link for keyboard navigation', () => {
      render(<ProjectsContainer featuredProjects={featured} otherProjects={[]} />)

      const skipLink = screen.getByRole('link', { name: /skip to hackathons content/i })
      expect(skipLink).toBeInTheDocument()
    })

    it('should have aria-describedby linking to description', () => {
      const { container } = render(<ProjectsContainer featuredProjects={featured} otherProjects={[]} />)

      const grid = container.querySelector('#projects-grid')
      expect(grid).toHaveAttribute('aria-describedby', 'projects-description')

      const description = document.getElementById('projects-description')
      expect(description).toBeInTheDocument()
      expect(description).toHaveAttribute('id', 'projects-description')
    })

    it('should have proper focus management for grid navigation', () => {
      const { container } = render(<ProjectsContainer featuredProjects={featured} otherProjects={[]} />)

      const grid = container.querySelector('#projects-grid')
      expect(grid).toHaveAttribute('role', 'grid')
      expect(grid).toHaveAttribute('aria-label', 'Selected projects')
    })
  })
})
