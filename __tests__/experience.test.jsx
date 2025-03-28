import '@testing-library/jest-dom'
import { render, screen, within } from '@testing-library/react'
import Experience from '@/components/Experience'
 
describe('Experience', () => {
    it('renders', () => {
        render(<Experience title="Test" dates="1-1" items={["bullet1", "bullet2"]} />)
        const title = screen.getByText('Test')
        expect(title).toBeInTheDocument()
        
        const dates = screen.getByText('1-1')
        expect(dates).toBeInTheDocument()

        const list = screen.getByRole("list", {
            name: "",
        })
        const { getAllByRole } = within(list)
        const items = getAllByRole("listitem")
        expect(items.length).toBe(2)
        
        const item1 = screen.getByText('bullet1')
        expect(item1).toBeInTheDocument()
        
        const item2 = screen.getByText('bullet2')
        expect(item2).toBeInTheDocument()
    })
})