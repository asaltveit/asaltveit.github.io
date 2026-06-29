import type { ProjectProps } from "@/components/cards/ProjectCard";

/** Flagship UI work — full cards above the fold */
export const featuredProjects: ProjectProps[] = [
  {
    title: "The Mitsubishi Pilots Online Group Website",
    dates: "2025 - 2026",
    items: [
      "The community needed a credible, easy-to-update home for news and resources without leaning on ad-heavy platforms.",
      "Led requirements with stakeholders, iterated on layout and typography for readability, and shipped a responsive Next.js + Tailwind experience.",
      "Outcome: A fast, modern site the group can maintain, with clear navigation and mobile-friendly content blocks.",
    ],
    link: "https://asaltveit.github.io/mu2-fanclub-website/",
    techStack: ["Next.js", "TypeScript", "TailwindCSS"],
    image: "/pilots-website-screenshot.webp",
  },
  {
    title: "ROTAS Squares Map",
    dates: "2024 - 2025",
    items: [
      "A researcher wanted to view the timeline of where Sator Squares were found and create artifacts for presentations.",
      "A clean, explorable map users can filter and inspect on desktop or phone, with a codebase that stayed easy to extend.",
      "?",
    ],
    link: "https://rotas-squares-map.vercel.app/",
    techStack: ["React", "TailwindCSS", "Observable Plot", "Supabase", "JavaScript"],
    image: "/map-screenshot-032725.webp",
  },
    {
    title: "Create Biblio",
    dates: "2024 - 2025",
    items: [
      "A researcher faced hundreds of PDFs and manual citation cleanup.",
      "Designed and implemented a Python CLI that walks folders, extracts metadata, and emits RIS for bibliography tools—prioritizing predictable output and clear error reporting.",
      "Cut citation prep time by about 85% on the target backlog, turning weeks of work into a repeatable pipeline.",
    ],
    link: "https://github.com/asaltveit/create-biblio",
    techStack: ["Python"],
    image: "/create-biblio-screenshot-032825.webp",
  },
];

/** Additional work — same cards, grouped behind disclosure on the homepage */
export const otherProjects: ProjectProps[] = [
  {
    title: "This Website",
    dates: "2025 - Present",
    items: [
      "Problem: A single place to show craft—accessible UI, keyboard support, and maintainable structure—not just a list of buzzwords.",
      "Approach: Next.js App Router, TypeScript, Tailwind v4 with design tokens in CSS, focus-visible rings, skip links, external-link affordances, and Jest tests for core components.",
      "Outcome: A portfolio that doubles as a small example of how I build interfaces for real users and reviewers.",
    ],
    link: "https://github.com/asaltveit/asaltveit.github.io",
    techStack: ["React", "Next.js", "TypeScript", "TailwindCSS"],
    image: "/asaltveit.github.io-screenshot-040225.webp",
  },
];

/** Full ordered list for references or tooling */
export const projects: ProjectProps[] = [...featuredProjects, ...otherProjects];

export const hackathons = [
  {
    title: "Open Metaverse Hackathon",
    dates: "3/7/26",
    items: [
      "Created a tool that transforms text descriptions into 3D models of individual trees or biomes of multiple plant and tree types.",
      "The trees are procedurally generated using fractals and L-systems in order to keep file and texture sizes small.",
    ],
    image: "/rp1-trees-website-screenshot.webp",
    link: "https://github.com/asaltveit/rp1-trees",
    techStack: ["RP1 MCP", "Claude"],
    award: "2nd Place in the Remote Track",
    teamSize: 1,
    duration: "25 hours",
  },
  {
    title: "ElevenLabs Worldwide Hackathon",
    dates: "12/11/25",
    items: [
      "Created SteadyTalk, an emotionally intelligent AI manager designed for practicing live performance conversations via video.",
    ],
    image: "/angry_boss.webp",
    link: "https://github.com/asaltveit/SteadyTalk",
    techStack: ["n8n", "Tavus", "ElevenLabs", "fal"],
    award: "Sponsor awards from n8n and Anam",
    teamSize: 2,
    duration: "4 hours",
  },
  {
    title: "Navi AI x GDG DevFest: Aviation Hackathon",
    dates: "November 2025",
    items: [
      "Created a product that alerts pilots if they've read back instructions from ATC controllers incorrectly.",
    ],
    techStack: ["Otter.ai"],
    award: "9th Place",
    teamSize: 3,
    duration: "12 hours",
  },
  /*{
    title: "WeaveHacks 3: Self-Improving Agents Hackathon with Weights & Biases",
    dates: "1/31-2/1/26",
    items: [
      "An AI-powered research and mapping app that turns natural-language questions into live map updates.",
      "The project supports self-healing agents and workflows.",
    ],
    image: "/map-searcher-screenshot.png",
    link: "https://github.com/asaltveit/map-searcher",
    techStack: ["Letta", "Pipecat", "W&B Weave", "Redis", "Nest.js", "Next.js", "MapLibre"],
    teamSize: 3,
    duration: "24 hours",
  },
  {
    title: "Hack FLUX: Beyond One",
    dates: "11/22-11/23/25",
    items: [
      "Created a flipbook-style animation using a user's prompt and uploaded drawing.",
      "Used Flux to generate images, and Anthropic to generate the step-by-step image prompts.",
    ],
    image: "/Flipbook-screenshot-3-pages-cropped.png",
    link: "https://drive.google.com/file/d/1p_v-1c9PbVzYC6lSmS57wo0fypRrbId9/view",
    techStack: ["fal", "Black Forest (Flux)", "Anthropic", "React"],
    teamSize: 1,
    duration: "24 hours",
  },*/
];

export const navLinks = [
  { title: "About", id: "about" },
  { title: "Experience", id: "experience" },
  { title: "Projects", id: "projects" },
  { title: "Hackathons", id: "hackathons" },
];
