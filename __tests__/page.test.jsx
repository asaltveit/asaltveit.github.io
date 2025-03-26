import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Page from '../app/page'
 
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
    describe('Links', () => {
        describe('Github', () => {
            it('renders', () => {
                render(<Page />)
                const github = screen.getByText('Github')
                expect(github).toBeInTheDocument()
            })
            it('works', () => {
                render(<Page />)
                expect(screen.getByRole('link', { name: 'Github' })).toHaveAttribute('href', 'https://github.com/asaltveit')
            })
        })
        describe('LinkedIn', () => {
            it('renders', () => {
                render(<Page />)
                const linkedin = screen.getByText('LinkedIn')
                expect(linkedin).toBeInTheDocument()
            })
            it('works', () => {
                render(<Page />)
                expect(screen.getByRole('link', { name: 'LinkedIn' })).toHaveAttribute('href', 'https://www.linkedin.com/in/anna-saltveit-4a70b2184/')
            })
        })
    })
})