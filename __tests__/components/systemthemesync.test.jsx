import '@testing-library/jest-dom'
import { render, act } from '@testing-library/react'
import SystemThemeSync from '@/components/SystemThemeSync'

describe('SystemThemeSync', () => {
  let mediaListeners
  let matchesDark = false

  beforeEach(() => {
    mediaListeners = []
    matchesDark = false
    document.documentElement.classList.remove('dark')
    localStorage.clear()

    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query === '(prefers-color-scheme: dark)' ? matchesDark : false,
      media: query,
      addEventListener: (_event, listener) => {
        mediaListeners.push(listener)
      },
      removeEventListener: (_event, listener) => {
        mediaListeners = mediaListeners.filter((item) => item !== listener)
      },
    }))
  })

  it('follows system theme changes when no stored preference exists', () => {
    render(<SystemThemeSync />)

    matchesDark = true
    act(() => {
      mediaListeners.forEach((listener) => listener({ matches: true }))
    })

    expect(document.documentElement.classList.contains('dark')).toBe(true)

    matchesDark = false
    act(() => {
      mediaListeners.forEach((listener) => listener({ matches: false }))
    })

    expect(document.documentElement.classList.contains('dark')).toBe(false)
  })

  it('ignores system theme changes when a stored preference exists', () => {
    localStorage.setItem('theme', 'dark')
    document.documentElement.classList.add('dark')

    render(<SystemThemeSync />)

    matchesDark = false
    act(() => {
      mediaListeners.forEach((listener) => listener({ matches: false }))
    })

    expect(document.documentElement.classList.contains('dark')).toBe(true)
  })
})
