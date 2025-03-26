import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Page from '../app/page'
 
describe('Page', () => {
    it('renders', () => {
        render(<Page />)
        const heading = screen.getByRole('heading', { level: 1 })
        expect(heading).toBeInTheDocument()

        const main = screen.getByRole('main', { level: 1 })
        expect(main).toBeInTheDocument()

        const footer = screen.getByRole('footer', { level: 1 })
        expect(footer).toBeInTheDocument()
    })
    describe('Links', () => {
        it('renders', () => {
            render(<Page />)
            const github = screen.getByText('Github')
            expect(github).toBeInTheDocument()

            const linkedin = screen.getByText('LinkedIn')
            expect(linkedin).toBeInTheDocument()
        })
        it('works', () => {
            /* TODO */
        })
    })
})