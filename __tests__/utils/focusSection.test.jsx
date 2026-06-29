import '@testing-library/jest-dom'
import { focusSectionHeading } from '@/utils/focusSection'

describe('focusSectionHeading', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <section id="projects" aria-labelledby="projects-heading">
        <h2 id="projects-heading" tabindex="-1">Featured Projects</h2>
      </section>
      <section id="about" aria-labelledby="about-heading">
        <h1 id="about-heading" tabindex="-1">Anna Saltveit</h1>
      </section>
    `
  })

  it('focuses the section heading when id follows the sectionId-heading pattern', () => {
    focusSectionHeading('projects')
    expect(document.getElementById('projects-heading')).toHaveFocus()
  })

  it('focuses about heading via the standard id pattern', () => {
    focusSectionHeading('about')
    expect(document.getElementById('about-heading')).toHaveFocus()
  })

  it('falls back to the first heading inside the section', () => {
    document.body.innerHTML = `
      <section id="legacy">
        <h2 tabindex="-1">Legacy Section</h2>
      </section>
    `
    focusSectionHeading('legacy')
    expect(document.querySelector('#legacy h2')).toHaveFocus()
  })

  it('does nothing when the section is missing', () => {
    const active = document.activeElement
    focusSectionHeading('missing')
    expect(document.activeElement).toBe(active)
  })
})
