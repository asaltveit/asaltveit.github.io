import '@testing-library/jest-dom'
import { render, screen, within } from '@testing-library/react'
import './mocks/matchMediaFalse.mock'
import Page from '../app/page'

// Mock Next.js Link component
jest.mock('next/link', () => {
  return ({ children, href, ...props }) => {
    return <a href={href} {...props}>{children}</a>
  }
})
 
describe('Page', () => {
    it('renders', () => {
        render(<Page />)
        const header = screen.getByRole('banner')
        expect(header).toBeInTheDocument()

        const main = screen.getByRole('main')
        expect(main).toBeInTheDocument()

        const footer = screen.getByRole('contentinfo')
        expect(footer).toBeInTheDocument()
    })

    describe('Main Heading', () => {
        it('renders the main heading', () => {
            render(<Page />)
            const heading = screen.getByRole('heading', { name: 'Anna Saltveit', level: 1 })
            expect(heading).toBeInTheDocument()
        })

        it('has correct heading level', () => {
            render(<Page />)
            const heading = screen.getByRole('heading', { name: 'Anna Saltveit' })
            expect(heading.tagName.toLowerCase()).toBe('h1')
        })
    })

    describe('Navigation', () => {
        it('renders NavBar component', () => {
            render(<Page />)
            const nav = screen.getByRole('navigation', { name: 'main navigation' })
            expect(nav).toBeInTheDocument()
        })

        it('renders all navigation links', () => {
            render(<Page />)
            expect(screen.getByRole('link', { name: 'link to Experience section' })).toBeInTheDocument()
            expect(screen.getByRole('link', { name: 'link to Projects section' })).toBeInTheDocument()
            expect(screen.getByRole('link', { name: 'link to Hackathons section' })).toBeInTheDocument()
        })
    })

    describe('Sections', () => {
        it('renders About Me section', () => {
            render(<Page />)
            const aboutSection = document.getElementById('about')
            expect(aboutSection).toBeInTheDocument()
            expect(screen.getByText('About Me')).toBeInTheDocument()
        })

        it('renders Experience section', () => {
            render(<Page />)
            const experienceSection = document.getElementById('experience')
            expect(experienceSection).toBeInTheDocument()
            // Check that section title exists within the section (not in nav)
            if (experienceSection) {
                const { getByText } = within(experienceSection)
                expect(getByText('Experience')).toBeInTheDocument()
            }
        })

        it('renders Projects section', () => {
            render(<Page />)
            const projectsSection = document.getElementById('projects')
            expect(projectsSection).toBeInTheDocument()
            // Check that section title exists within the section (not in nav)
            if (projectsSection) {
                const { getByText } = within(projectsSection)
                expect(getByText('Projects')).toBeInTheDocument()
            }
        })

        it('renders Hackathons section', () => {
            render(<Page />)
            const hackathonsSection = document.getElementById('hackathons')
            expect(hackathonsSection).toBeInTheDocument()
            // Check that section title exists within the section (not in nav)
            if (hackathonsSection) {
                const { getByText } = within(hackathonsSection)
                expect(getByText('Hackathons')).toBeInTheDocument()
            }
        })
    })

    describe('About Me Content', () => {
        it('renders about me text', () => {
            render(<Page />)
            expect(screen.getByText(/I'm a web developer who enjoys creating attractive and accessible products/)).toBeInTheDocument()
        })

        it('renders Technical Skills heading', () => {
            render(<Page />)
            expect(screen.getByText('Technical Skills')).toBeInTheDocument()
        })
        // Not including easily-changeable text
        it('renders Frontend skills', () => {
            render(<Page />)
            expect(screen.getByText('Frontend:')).toBeInTheDocument()
        })

        it('renders Backend skills', () => {
            render(<Page />)
            expect(screen.getByText('Backend:')).toBeInTheDocument()
        })

        it('renders Tools', () => {
            render(<Page />)
            expect(screen.getByText('Tools:')).toBeInTheDocument()
        })
    })

    describe('Experience Components', () => {
        it('renders all experience entries', () => {
            render(<Page />)
            expect(screen.getByText('Less Fluorescent, Software Developer')).toBeInTheDocument()
            expect(screen.getByText('Included Health, Web Developer')).toBeInTheDocument()
            expect(screen.getByText('Code for PDX, Frontend Developer')).toBeInTheDocument()
            expect(screen.getByText('Waitrainer, Intern')).toBeInTheDocument()
        })

        it('renders experience dates', () => {
            render(<Page />)
            expect(screen.getByText('2025 - 2025')).toBeInTheDocument()
            expect(screen.getByText('2021 - 2024')).toBeInTheDocument()
            expect(screen.getByText('2020 - 2020')).toBeInTheDocument()
            expect(screen.getByText('2017 - 2017')).toBeInTheDocument()
        })
    })

    describe('Projects and Hackathons', () => {
        it('renders ProjectsContainer', () => {
            render(<Page />)
            // ProjectsContainer should render project cards
            // Check for at least one project title from data
            expect(screen.getByText('Create Biblio')).toBeInTheDocument()
        })

        it('renders HackathonsContainer', () => {
            render(<Page />)
            // HackathonsContainer should render hackathon cards
            // Check for at least one hackathon title from data
            expect(screen.getByText('ElevenLabs Worldwide Hackathon')).toBeInTheDocument()
        })
    })

    describe('BackToTopButton', () => {
        it('renders BackToTopButton component', () => {
            render(<Page />)
            // BackToTopButton is rendered but may not be visible initially (only shows after scrolling)
            // The component is present in the component tree even if it returns null
            // We can verify it's not throwing errors by checking the page renders successfully
            const main = screen.getByRole('main')
            expect(main).toBeInTheDocument()
            // Note: The button only appears when scroll position > 300px
            // To test visibility, we'd need to mock window.pageYOffset
        })
    })

    describe('Footer Links', () => {
        describe('Github', () => {
            it('renders', () => {
                render(<Page />)
                const github = screen.getByText('Github')
                expect(github).toBeInTheDocument()
            })
            it('has correct href', () => {
                render(<Page />)
                const githubLink = screen.getByRole('link', { name: 'link to Github' })
                expect(githubLink).toHaveAttribute('href', 'https://github.com/asaltveit')
            })
            it('opens in new tab', () => {
                render(<Page />)
                const githubLink = screen.getByRole('link', { name: 'link to Github' })
                expect(githubLink).toHaveAttribute('target', '_blank')
            })
            it('has security attributes', () => {
                render(<Page />)
                const githubLink = screen.getByRole('link', { name: 'link to Github' })
                expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer')
            })
        })
        describe('LinkedIn', () => {
            it('renders', () => {
                render(<Page />)
                const linkedin = screen.getByText('LinkedIn')
                expect(linkedin).toBeInTheDocument()
            })
            it('has correct href', () => {
                render(<Page />)
                const linkedinLink = screen.getByRole('link', { name: 'link to LinkedIn' })
                expect(linkedinLink).toHaveAttribute('href', 'https://www.linkedin.com/in/anna-saltveit-4a70b2184/')
            })
            it('opens in new tab', () => {
                render(<Page />)
                const linkedinLink = screen.getByRole('link', { name: 'link to LinkedIn' })
                expect(linkedinLink).toHaveAttribute('target', '_blank')
            })
            it('has security attributes', () => {
                render(<Page />)
                const linkedinLink = screen.getByRole('link', { name: 'link to LinkedIn' })
                expect(linkedinLink).toHaveAttribute('rel', 'noopener noreferrer')
            })
        })
    })

    describe('Accessibility', () => {
        it('has proper semantic structure with header, main, and footer', () => {
            render(<Page />)
            expect(screen.getByRole('banner')).toBeInTheDocument()
            expect(screen.getByRole('main')).toBeInTheDocument()
            expect(screen.getByRole('contentinfo')).toBeInTheDocument()
        })

        it('has proper heading hierarchy', () => {
            render(<Page />)
            // Check that the main visible h1 heading exists with correct content
            const mainH1 = screen.getByRole('heading', { name: 'Anna Saltveit', level: 1 })
            expect(mainH1).toBeInTheDocument()
            expect(mainH1).toHaveTextContent('Anna Saltveit')
            
            // Verify it's the main page heading (not sr-only)
            expect(mainH1).not.toHaveClass('sr-only')
        })

        it('has accessible navigation', () => {
            render(<Page />)
            const nav = screen.getByRole('navigation', { name: 'main navigation' })
            expect(nav).toBeInTheDocument()
        })

        it('has accessible footer links', () => {
            render(<Page />)
            const githubLink = screen.getByRole('link', { name: 'link to Github' })
            const linkedinLink = screen.getByRole('link', { name: 'link to LinkedIn' })
            expect(githubLink).toHaveAttribute('aria-label', 'link to Github')
            expect(linkedinLink).toHaveAttribute('aria-label', 'link to LinkedIn')
        })
    })
})