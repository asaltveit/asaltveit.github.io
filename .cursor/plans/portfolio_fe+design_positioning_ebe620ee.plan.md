---
name: Portfolio FE+Design positioning
overview: Suggestions to reposition your existing single-page portfolio so it reads clearly as a frontend developer and designer, using stronger narrative, visual craft, and project storytelling—without changing your stack.
todos:
  - id: copy-metadata
    content: Refine hero tagline and layout metadata for frontend + design positioning
    status: completed
  - id: about-hierarchy
    content: "Restructure About: lead with UI/a11y/craft; shorten or relocate generalist lists"
    status: completed
  - id: visual-system
    content: "Visual system: Geist/body alignment, spacing, max width; extend CSS design tokens + @theme mapping"
    status: completed
  - id: project-stories
    content: Rewrite key entries in data.tsx toward problem → approach → outcome
    status: completed
  - id: nav-ia
    content: "Navigation + IA: add About to nav; decide featured vs collapsible projects; optional /work/[slug] routes"
    status: completed
isProject: false
---

# Portfolio as frontend developer and designer

Your site already signals engineering quality ([`app/page.tsx`](app/page.tsx), [`app/components/NavBar.tsx`](app/components/NavBar.tsx), Jest coverage, external-link and focus patterns). The gap is mostly **positioning**, **information hierarchy**, and **design-led storytelling** so visitors immediately see UI craft and product thinking, not only a long skills list.

## 1. Lead with identity, not inventory

- **Hero copy**: The line *"I'm a web developer who enjoys creating attractive and accessible products"* is accurate but generic. Reframe to a tight **role + point of view** (e.g. frontend + UI, systems thinking, accessibility as a default). One sentence beats a paragraph above the fold.
- **Metadata**: [`app/layout.tsx`](app/layout.tsx) uses a generic description. Align `title` / `description` / `keywords` with the same frontend-and-design story for consistency when links are shared.

## 2. Rebalance “About” for a designer–developer read

- **Skills**: The current blocks (Frontend / Backend / Tools / AI Tools) are dense and skew generalist. For a **frontend + designer** brand, put **UI implementation, design collaboration, accessibility, and performance** first; keep backend/AI as a shorter *“Also comfortable with…”* or fold into experience bullets so the first screen does not read as “full-stack + AI tools dump.”
- **Explicit design signals** (only what is true for you): e.g. prototyping, design handoff (Figma), component libraries, responsive layouts, design systems—stated as outcomes (“shipped responsive UI from Figma specs”) not only tool names.

## 3. Let the site itself prove design taste

- **Visual system**: You load Geist in [`app/layout.tsx`](app/layout.tsx) but [`app/globals.css`](app/globals.css) sets `body` to Arial—small inconsistency that undercuts a “typography matters” message. A coherent **type scale**, **max content width** for long text, and a slightly richer **color/spacing system** (still minimal) reads as intentional UI work.
- **Design tokens (yes, they fit here)**: You already have a minimal token layer: CSS variables in `:root` and Tailwind v4 **`@theme inline`** mapping in [`app/globals.css`](app/globals.css) (`--background`, `--foreground`, `--primary-blue`, font vars). That is token-style theming. A sensible next step for a portfolio is **semantic tokens** (e.g. `--color-surface-page`, `--color-text-primary`, `--color-focus-ring`, `--space-section`) defined once, mapped into `@theme`, then consumed as utilities (`bg-*`, `text-*`, `ring-*`) so JSX stops repeating one-off hex values like `indigo-700` everywhere. Optional later: export tokens from Figma / Style Dictionary if you want to demo a pipeline—usually unnecessary for a single small site.
- **Tailwind and tokens together (not parallel silos)**: **They make sense together.** *Design tokens* are the **named values** layer (usually CSS variables and semantics like “surface / on-surface / focus”). *Tailwind* is a **utility engine** whose **theme** (in v4, `@theme`) is the bridge: you point theme slots at those variables, and components keep using Tailwind classes—now backed by your tokens instead of only the default palette or one-off arbitrary values. They only feel like “parallel systems” if half the UI uses `@theme`-driven utilities and half uses unrelated arbitrary colors; the fix is one **source of truth** (tokens) and **one consumption path** (utilities that read `@theme`).
- **Keep the current color scheme (constraint)**: **Feasible.** Token work should **alias today’s colors** first—semantic names whose values match your existing indigo / white / slate / gray usage so the site looks the same. **Additive-only is realistic for the token layer**: new variables and `@theme` mappings can land without touching components. **Optional follow-up** (still same colors): replace repeated utility strings in JSX with utilities backed by those tokens; that touches existing lines but does not change appearance if token values match the old classes 1:1.
- **Motion**: You already have restrained hover/focus on cards ([`app/components/cards/ProjectCard.tsx`](app/components/cards/ProjectCard.tsx)). A few **purposeful** motion or scroll cues (section transitions, reduced motion respect) can signal frontend craft without clutter.

## 4. Projects: story over feature list

- **Case-study shape** (even briefly): *problem → your UI/UX or implementation approach → outcome* (metrics, user feedback, or technical wins). Your ROTAS and fan-site entries in [`app/data.tsx`](app/data.tsx) are strong candidates; “This Website” is a good place to mention **a11y choices, testing, and component structure** as the “meta” portfolio piece.
- **Ordering and framing**: Lead with work that is **visibly UI-heavy**; tools-only or non-UI projects can sit lower or be framed as “full-stack / tooling” so the primary narrative stays visual.

## 5. Information architecture and navigation

### Row at top vs menu button

- **Recommended pattern: both, responsive** — same mental model as most product sites: **horizontal links on larger viewports** (fast scanning, no extra tap), **menu button that reveals the same links on small screens** (saves horizontal space, avoids tiny touch targets).
- Your [`NavBar`](app/components/NavBar.tsx) already does this (`md:flex-row` + hamburger below `md`). Keeping it is reasonable; refinements are polish (e.g. optional name/logo left on desktop for balance, Escape-to-close menu, `aria-expanded` label toggling “open/close”) rather than replacing the pattern.
- **Menu-only on all sizes** is fine for a very minimal aesthetic but adds friction for recruiters who want one-click jumps; **row-only on mobile** often breaks or crowds unless you have very few links.

### One long page vs separate linked pages

- **Single scroll + in-page anchors** (current): Best when you want one fast “full picture” load, section content is moderate, and most visitors skim top-to-bottom once.
- **Hybrid: home scroll + dedicated routes for 1–3 flagship pieces** (e.g. `/work/rotas-map`): Best when you want **shareable deep links**, room for long case studies (galleries, embeds), or stronger SEO on named projects without making the homepage endless.
- **Every major section as its own page**: Rarely needed for a personal portfolio unless each area is huge (blog, many articles); otherwise it increases clicks to see the whole story.

**Practical recommendation**: Stay **anchor-first** on the homepage for About / Experience / Projects / Hackathons. Add **optional** `/work/[slug]` (or similar) only for projects where the case study truly needs more space than a card + modal; keep hackathons on the home page unless you outgrow it.

### Featured case studies vs “more projects” list

- **Yes — curated hierarchy reads well** for a frontend + designer profile: **2–3 flagship projects** in **case-study shape** (problem → approach → outcome, screenshots, maybe role/tools) **visible by default**; **remaining work** in a **compact list** (`<details>`/accordion, or “Show N more” disclosure) so the page does not feel like an infinite card stack.
- **Collapsible list**: Prefer a single **disclosure control** (“Other projects”, “More work”) with clear focus management and `prefers-reduced-motion` respect so it still signals engineering quality.
- **Ordering**: Put the case-study slots for work that best shows **UI, interaction, and craft**; demote CLI-only or backend-heavy items to the list unless they support a specific narrative.

### Nav vs content (existing gap)

- [`navLinks`](app/data.tsx) jumps to Experience, Projects, Hackathons but **not** to `#about`. Add **About** (or a single **Intro** anchor that includes the hero + about) so nav matches the page order and first-time visitors can jump to your positioning copy.

## 6. Optional sections (add only if they strengthen the story)

- **Contact CTA**: A clear primary action (email, form, or calendar) if you want inbound opportunities.
- **Selected work / filters**: If the list grows, light filtering (e.g. “UI”, “Maps”, “Open source”) helps designers and FE leads find relevance fast.
- **Writing or talks**: Short links if you have them; skip if empty.

## 7. What you can skip unless you care about it

- **Blog**: Only if you will maintain it.
- **Heavy 3D or experimental chrome**: Not required; clarity and polish often read better for a hybrid FE + design profile.

---

**Summary**: Sharpen the **first-screen message** and **About hierarchy**, align **typography and layout** with the story you tell, evolve **projects into mini case studies**, and tighten **nav + metadata** so the same person who cares about accessible, attractive products is visible in both words and presentation.
