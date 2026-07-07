import type { ProjectProps } from "@/components/cards/ProjectCard";

/** Flagship UI work — full cards above the fold */
export const featuredProjects: ProjectProps[] = [
  {
    title: "The Mitsubishi Pilots Online Group Website",
    dates: "2025 - 2026",
    items: [
      "The community needed a modern, easy-to-update home for news and resources.",
      "I gathered requirements from stakeholders, iterated on layout and typography for readability, and shipped a responsive Next.js + Tailwind experience.",
      "A fast, modern site the group can maintain, with clear navigation and mobile-friendly content blocks.",
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
      "I built a clean, explorable map users can filter and inspect on desktop or phone, with a codebase that stayed easy to extend.",
      "Researchers can explore Sator Square locations over time and export presentation-ready artifacts.",
    ],
    link: "https://rotas-squares-map.vercel.app/",
    techStack: ["React", "TailwindCSS", "Observable Plot", "Supabase", "JavaScript"],
    image: "/map-screenshot.webp",
  },
    {
    title: "Create Biblio",
    dates: "2024 - 2025",
    items: [
      "A researcher faced hundreds of PDFs and manual citation cleanup.",
      "I designed and implemented a Python CLI that walks folders, extracts metadata, and emits RIS for bibliography tools—prioritizing predictable output and clear error reporting.",
      "Citation prep time cut by about 85% on the target backlog, turning weeks of work into a repeatable pipeline.",
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
      "A single place to show craft—accessible UI, keyboard support, and maintainable structure—not just a list of buzzwords.",
      "Next.js App Router, TypeScript, Tailwind v4 with design tokens in CSS, focus-visible rings, skip links, external-link affordances, and Jest tests for core components.",
      "A portfolio that doubles as a small example of how I build interfaces for real users and reviewers.",
    ],
    link: "https://github.com/asaltveit/asaltveit.github.io",
    techStack: ["React", "Next.js", "TypeScript", "TailwindCSS"],
    //image: "/asaltveit.github.io-screenshot-040225.webp",
  },
];

/** Full ordered list for references or tooling */
export const projects: ProjectProps[] = [...featuredProjects, ...otherProjects];

export const hackathons = [
  {
    title: "Hackathon: Humanizing The Prototype",
    dates: "6/27/26",
    items: [
      "There isn't affordable access to IELTS speaking assessment prep for English learners.",
      "AI video practice with a Tavus examiner, mock exams, and personalized study plans.",
    ],
    image: "/IELTS-speaking-practice.webp",
    link: "https://github.com/byseon/speak-lab-ai",
    techStack: ["Tavus", "Lovable", "Python", "Next.js", "TypeScript", "TailwindCSS"],
    award: "3rd Place",
    teamSize: 4,
    duration: "4 hours",
  },
  {
    title: "Open Metaverse Hackathon",
    dates: "3/7/26",
    items: [
      "Open Metaverse users will want shrubbery for decoration and the limits for 3d models are too tight for current generation methods.",
      "Created a tool that transforms text descriptions into 3D models of individual trees or biomes of multiple plant and tree types. The trees are procedurally generated using fractals and L-systems in order to keep file and texture sizes small.",
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
      "People struggle to prepare for difficult conversations with their boss, including body language and facial expressions.",
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
      "Pilots and ATC controllers still miscommunicate due to misinterpretation of instructions.",
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
  { title: "Projects", id: "projects" },
  { title: "Experience", id: "experience" },
  { title: "Hackathons", id: "hackathons" },
  { title: "Skills", id: "skills" },
];

export interface ExperienceEntry {
  title: string;
  dates: string;
  items: string[];
  linkLocation?: string;
  linkName?: string;
}

export const experienceEntries: ExperienceEntry[] = [
  {
    title: "Real Estate Investment Group, Software Engineer",
    dates: "2026 - Present",
    items: [
      "Took ownership of an incomplete scraping system, rebuilding and extending it using Python and Playwright to reliably extract real estate data from multiple sources.",
      "Designing data processing pipelines to clean, normalize, and structure inconsistent inputs into usable datasets for downstream analysis in spreadsheet workflows.",
      "Working directly with stakeholders to define requirements and iterate on product direction.",
      "Designing systems to handle inconsistent real-world data and evolving business logic.",
    ],
  },
  {
    title: "Less Fluorescent, Software Developer",
    dates: "2025 - 2025",
    items: [
      "Conducted research and design of machine learning pipelines for EEG signal and audio analysis, including signal preprocessing techniques and feature extraction methods, and a custom graph database architecture in C.",
      "Built responsive web and mobile prototypes using JavaScript, HTML, CSS.",
      "Worked on early-stage architecture and component design for MVP validation.",
    ],
  },
  {
    title: "Included Health, Web Developer",
    dates: "2021 - 2024",
    items: [
      "Led code base maintenance initiatives for my team and collaborated with a multi-team committee to improve maintenance using Github Actions and Rollbar, reducing bug and Dependabot alerts by 80% and preventing deployment locks.",
      "Led the development of medium and large features from code design to release.",
      "Collaborated with cross-functional teams, including project managers, designers, and data engineers among others.",
    ],
  },
];

export interface SkillGroup {
  title: string;
  items: string;
}

export const skillGroups: SkillGroup[] = [
  {
    title: "Product Engineering",
    items: "TypeScript, React, Next.js, Tailwind CSS, Material UI, Zustand, Jest, Vite, HTML, CSS",
  },
  {
    title: "AI and Agents",
    items: "Letta, n8n, Weights & Biases Weave, Pipecat, Meshy, Cursor, Claude Code",
  },
  {
    title: "Design",
    items: "Blender, FreeCAD, Figma",
  },
  {
    title: "Backend and data",
    items: "Python, Node.js, Supabase, PostgreSQL, Express, Sequelize.js",
  },
  {
    title: "Delivery",
    items: "GitHub Actions, Git, Vercel, Slack, Jira, Agile workflows",
  },
];
