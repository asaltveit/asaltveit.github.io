import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import CardGrid from '@/components/containers/CardGrid'
import { useGridColumns } from '@/utils/useGridColumns'

jest.mock('../../../app/utils/useGridColumns')

const mockUseGridColumns = useGridColumns

function renderTestGrid(columns) {
  mockUseGridColumns.mockReturnValue(columns)

  const { container } = render(
    <>
      <p id="grid-desc">Test grid description</p>
      <CardGrid
        id="test-grid"
        ariaLabel="Test grid"
        ariaDescribedBy="grid-desc"
        cellCount={4}
      >
        {[0, 1, 2, 3].map((i) => (
          <a key={i} href={`#cell-${i}`}>
            Cell {i}
          </a>
        ))}
      </CardGrid>
    </>
  )

  const grid = container.querySelector('#test-grid')
  const links = screen.getAllByRole('link', { name: /Cell \d/ })
  return { grid, links }
}

function activateGridKeyboardNav(grid, link) {
  fireEvent.focusIn(link)
  link.focus()
}

describe('CardGrid', () => {
  beforeEach(() => {
    mockUseGridColumns.mockReset()
  })

  it('renders nothing when cellCount is 0', () => {
    const { container } = render(
      <CardGrid
        id="empty-grid"
        ariaLabel="Empty"
        ariaDescribedBy="grid-desc"
        cellCount={0}
      />
    )

    expect(container.querySelector('#empty-grid')).not.toBeInTheDocument()
  })

  it('exposes grid semantics', () => {
    const { grid } = renderTestGrid(1)

    expect(grid).toHaveAttribute('role', 'grid')
    expect(grid).toHaveAttribute('aria-label', 'Test grid')
    expect(grid).toHaveAttribute('aria-describedby', 'grid-desc')
    expect(grid.querySelectorAll('[role="gridcell"]')).toHaveLength(4)
  })

  describe('keyboard navigation with 1 column', () => {
    it('moves focus down and up between cells', () => {
      const { grid, links } = renderTestGrid(1)

      activateGridKeyboardNav(grid, links[0])
      expect(links[0]).toHaveFocus()

      fireEvent.keyDown(grid, { key: 'ArrowDown' })
      expect(links[1]).toHaveFocus()

      fireEvent.keyDown(grid, { key: 'ArrowUp' })
      expect(links[0]).toHaveFocus()
    })

    it('jumps to first and last cells with Home and End', () => {
      const { grid, links } = renderTestGrid(1)

      activateGridKeyboardNav(grid, links[2])
      fireEvent.keyDown(grid, { key: 'Home' })
      expect(links[0]).toHaveFocus()

      fireEvent.keyDown(grid, { key: 'End' })
      expect(links[3]).toHaveFocus()
    })
  })

  describe('keyboard navigation with 2 columns', () => {
    it('moves focus right and left between cells in a row', () => {
      const { grid, links } = renderTestGrid(2)

      activateGridKeyboardNav(grid, links[0])
      fireEvent.keyDown(grid, { key: 'ArrowRight' })
      expect(links[1]).toHaveFocus()

      fireEvent.keyDown(grid, { key: 'ArrowLeft' })
      expect(links[0]).toHaveFocus()
    })

    it('moves focus down and up between rows', () => {
      const { grid, links } = renderTestGrid(2)

      activateGridKeyboardNav(grid, links[0])
      fireEvent.keyDown(grid, { key: 'ArrowDown' })
      expect(links[2]).toHaveFocus()

      fireEvent.keyDown(grid, { key: 'ArrowUp' })
      expect(links[0]).toHaveFocus()
    })

    it('wraps to next row when moving right from last column', () => {
      const { grid, links } = renderTestGrid(2)

      activateGridKeyboardNav(grid, links[1])
      fireEvent.keyDown(grid, { key: 'ArrowRight' })
      expect(links[2]).toHaveFocus()
    })
  })
})
