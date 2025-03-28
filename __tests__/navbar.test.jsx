import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import NavBar from '@/components/NavBar'
 
describe('NavBar', () => {
    it('renders', () => {
        const linkParams = [{title: "Test", id: "test"}, {title: "Test2", id: "test2"}]
        render(<NavBar links={linkParams} />)
        const link = screen.getByText('Test')
        expect(link).toBeInTheDocument()
        expect(link).toHaveAttribute('href', '#test')

        const link2 = screen.getByText('Test2')
        expect(link2).toBeInTheDocument()
        expect(link2).toHaveAttribute('href', '#test2')
    })
})