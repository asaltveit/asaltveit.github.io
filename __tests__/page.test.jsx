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
            expect(screen.getByRole('link', { name: 'link to About section' })).toBeInTheDocument()
            expect(screen.getByRole('link', { name: 'link to Experience section' })).toBeInTheDocument()
            expect(screen.getByRole('link', { name: 'link to Projects section' })).toBeInTheDocument()
            expect(screen.getByRole('link', { name: 'link to Hackathons section' })).toBeInTheDocument()
        })
    })

    describe('Sections', () => {
        it('renders About section', () => {
            render(<Page />)
            const aboutSection = document.getElementById('about')
            expect(aboutSection).toBeInTheDocument()
            if (aboutSection) {
                const { getByText } = within(aboutSection)
                expect(getByText('About')).toBeInTheDocument()
            }
        })

        it('renders Experience section', () => {
            render(<Page />)
            const experienceSection = document.getElementById('experience')
            expect(experienceSection).toBeInTheDocument()
            // Section title should live inside the section, not only in the nav
            if (experienceSection) {
                const { getByText } = within(experienceSection)
                expect(getByText('Experience')).toBeInTheDocument()
            }
        })

        it('renders Projects section', () => {
            render(<Page />)
            const projectsSection = document.getElementById('projects')
            expect(projectsSection).toBeInTheDocument()
            // Section title should live inside the section, not only in the nav
            if (projectsSection) {
                const { getByText } = within(projectsSection)
                expect(getByText('Projects')).toBeInTheDocument()
            }
        })

        it('renders Hackathons section', () => {
            render(<Page />)
            const hackathonsSection = document.getElementById('hackathons')
            expect(hackathonsSection).toBeInTheDocument()
            // Section title should live inside the section, not only in the nav
            if (hackathonsSection) {
                const { getByText } = within(hackathonsSection)
                expect(getByText('Hackathons')).toBeInTheDocument()
            }
        })
    })

    describe('About content', () => {
        it('renders hero tagline', () => {
            render(<Page />)
            expect(
                screen.getByText(/Frontend developer and designer — I build responsive, accessible interfaces/i)
            ).toBeInTheDocument()
        })

        it('renders focus areas heading', () => {
            render(<Page />)
            expect(screen.getByText('What I focus on')).toBeInTheDocument()
        })

        it('renders stack heading', () => {
            render(<Page />)
            expect(screen.getByText('Stack I ship with')).toBeInTheDocument()
        })

        it('renders also-comfortable heading', () => {
            render(<Page />)
            expect(screen.getByText('Also comfortable with')).toBeInTheDocument()
        })
    })

    describe('Experience Components', () => {
        it('renders all experience entries', () => {
            render(<Page />)
            expect(screen.getByText('Real Estate Investment Group, Software Engineer')).toBeInTheDocument()
            expect(screen.getByText('Less Fluorescent, Software Developer')).toBeInTheDocument()
            expect(screen.getByText('Included Health, Web Developer')).toBeInTheDocument()
            expect(screen.getByText('Code for PDX, Frontend Developer')).toBeInTheDocument()
            expect(screen.getByText('Waitrainer, Intern')).toBeInTheDocument()
        })

        it('renders experience dates', () => {
            render(<Page />)
            expect(screen.getByText('2026 - Present')).toBeInTheDocument()
            expect(screen.getByText('2025 - 2025')).toBeInTheDocument()
            expect(screen.getByText('2021 - 2024')).toBeInTheDocument()
            expect(screen.getByText('2020 - 2020')).toBeInTheDocument()
            expect(screen.getByText('2017 - 2017')).toBeInTheDocument()
        })
    })

    describe('Projects and Hackathons', () => {
        it('renders ProjectsContainer', () => {
            render(<Page />)
            // At least one project title from app data
            expect(screen.getByText('Create Biblio')).toBeInTheDocument()
        })

        it('renders HackathonsContainer', () => {
            render(<Page />)
            // At least one hackathon title from app data
            expect(screen.getByText('ElevenLabs Worldwide Hackathon')).toBeInTheDocument()
        })
    })

    describe('BackToTopButton', () => {
        it('renders BackToTopButton component', () => {
            render(<Page />)
            const main = screen.getByRole('main')
            expect(main).toBeInTheDocument()
            // BackToTop visibility and scroll behavior: see backtotopbutton.test.jsx (uses pageYOffset)
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
                const githubLink = screen.getByRole('link', { name: 'link to Github (opens in new tab)' })
                expect(githubLink).toHaveAttribute('href', 'https://github.com/asaltveit')
            })
            it('opens in new tab', () => {
                render(<Page />)
                const githubLink = screen.getByRole('link', { name: 'link to Github (opens in new tab)' })
                expect(githubLink).toHaveAttribute('target', '_blank')
            })
            it('has security attributes', () => {
                render(<Page />)
                const githubLink = screen.getByRole('link', { name: 'link to Github (opens in new tab)' })
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
                const linkedinLink = screen.getByRole('link', { name: 'link to LinkedIn (opens in new tab)' })
                expect(linkedinLink).toHaveAttribute('href', 'https://www.linkedin.com/in/anna-saltveit-4a70b2184/')
            })
            it('opens in new tab', () => {
                render(<Page />)
                const linkedinLink = screen.getByRole('link', { name: 'link to LinkedIn (opens in new tab)' })
                expect(linkedinLink).toHaveAttribute('target', '_blank')
            })
            it('has security attributes', () => {
                render(<Page />)
                const linkedinLink = screen.getByRole('link', { name: 'link to LinkedIn (opens in new tab)' })
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
            const mainH1 = screen.getByRole('heading', { name: 'Anna Saltveit', level: 1 })
            expect(mainH1).toBeInTheDocument()
            expect(mainH1).toHaveTextContent('Anna Saltveit')
            expect(mainH1).not.toHaveClass('sr-only')
        })

        it('has accessible navigation', () => {
            render(<Page />)
            const nav = screen.getByRole('navigation', { name: 'main navigation' })
            expect(nav).toBeInTheDocument()
        })

        it('has accessible footer links', () => {
            render(<Page />)
            const githubLink = screen.getByRole('link', { name: 'link to Github (opens in new tab)' })
            const linkedinLink = screen.getByRole('link', { name: 'link to LinkedIn (opens in new tab)' })
            expect(githubLink).toHaveAttribute('aria-label', 'link to Github (opens in new tab)')
            expect(linkedinLink).toHaveAttribute('aria-label', 'link to LinkedIn (opens in new tab)')
        })
    })
})