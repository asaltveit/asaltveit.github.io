import '@testing-library/jest-dom'
import { renderHook, act, waitFor, fireEvent } from '@testing-library/react'
import { endAutoScroll, beginAutoScroll } from '../../app/utils/autoScrollLock'
import { useNavScrollState } from '@/utils/useNavScrollState'

function setScrollY(y) {
  Object.defineProperty(window, 'scrollY', {
    writable: true,
    configurable: true,
    value: y,
  })
  Object.defineProperty(window, 'pageYOffset', {
    writable: true,
    configurable: true,
    value: y,
  })
}

function scrollTo(y) {
  setScrollY(y)
  act(() => {
    fireEvent.scroll(window)
    jest.runOnlyPendingTimers()
  })
}

describe('useNavScrollState', () => {
  beforeEach(() => {
    jest.useFakeTimers()
    endAutoScroll()
    setScrollY(0)
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('starts in full variant at page top', () => {
    const { result } = renderHook(() => useNavScrollState())
    expect(result.current.variant).toBe('full')
  })

  it('switches to hidden when scrolling down', async () => {
    const { result } = renderHook(() => useNavScrollState())

    scrollTo(100)

    await waitFor(() => {
      expect(result.current.variant).toBe('hidden')
    })
  })

  it('switches to compact when scrolling up', async () => {
    const { result } = renderHook(() => useNavScrollState())

    scrollTo(100)
    await waitFor(() => {
      expect(result.current.variant).toBe('hidden')
    })

    scrollTo(99)

    await waitFor(() => {
      expect(result.current.variant).toBe('compact')
    })
  })

  it('returns to full variant at page top', async () => {
    const { result } = renderHook(() => useNavScrollState())

    scrollTo(100)
    await waitFor(() => {
      expect(result.current.variant).toBe('hidden')
    })

    scrollTo(0)

    await waitFor(() => {
      expect(result.current.variant).toBe('full')
    })
  })

  it('shows compact on upward scroll even by 1px', async () => {
    const { result } = renderHook(() => useNavScrollState())

    scrollTo(200)
    await waitFor(() => {
      expect(result.current.variant).toBe('hidden')
    })

    scrollTo(199)

    await waitFor(() => {
      expect(result.current.variant).toBe('compact')
    })
  })

  it('stays hidden when scrolling up during auto-scroll', async () => {
    const { result } = renderHook(() => useNavScrollState())

    scrollTo(200)
    await waitFor(() => {
      expect(result.current.variant).toBe('hidden')
    })

    beginAutoScroll()
    scrollTo(199)

    await waitFor(() => {
      expect(result.current.variant).toBe('hidden')
    })
  })

  it('returns to full at top during auto-scroll and ends the lock', async () => {
    const { result } = renderHook(() => useNavScrollState())

    scrollTo(200)
    await waitFor(() => {
      expect(result.current.variant).toBe('hidden')
    })

    beginAutoScroll()
    scrollTo(0)

    await waitFor(() => {
      expect(result.current.variant).toBe('full')
    })
  })

  it('shows compact again after auto-scroll settles and user scrolls up', async () => {
    const { result } = renderHook(() => useNavScrollState())

    scrollTo(200)
    await waitFor(() => {
      expect(result.current.variant).toBe('hidden')
    })

    beginAutoScroll()
    scrollTo(199)
    await waitFor(() => {
      expect(result.current.variant).toBe('hidden')
    })

    act(() => {
      jest.advanceTimersByTime(150)
    })
    endAutoScroll()

    scrollTo(198)

    await waitFor(() => {
      expect(result.current.variant).toBe('compact')
    })
  })
})
