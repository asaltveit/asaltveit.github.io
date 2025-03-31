import '@testing-library/jest-dom'
import { render, screen, within } from '@testing-library/react'
import Project from '@/components/Project'
import mapScreenshotSrc from "../public/map-screenshot-032725.png"
 
describe('Project', () => {
    it('renders without image', () => {
        render(<Project title="Test" dates="1-1" items={["bullet1", "bullet2"]} />)
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
    it('renders with image and not isEven', () => {
        render(<Project title="Test" dates="1-1" items={["bullet1", "bullet2"]} image={mapScreenshotSrc} />)
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

        const imageElement = document.querySelector('img');
        expect(imageElement.alt).toBe('image');

        expect(screen.getByRole('link')).toHaveAttribute('href', '#')
    })
    it('renders with image and isEven', () => {
        render(<Project title="Test" dates="1-1" items={["bullet1", "bullet2"]} image={mapScreenshotSrc} isEven />)
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

        const imageElement = document.querySelector('img');
        expect(imageElement.alt).toBe('image');

        expect(screen.getByRole('link')).toHaveAttribute('href', '#')
    })

    it('renders for mobile', () => {
        // TODO
    })
})