import Section from '@/components/containers/Section';
import NavBar from '@/components/NavBar';
import Experience from '@/components/Experience';
import HeroSocialLinks from '@/components/HeroSocialLinks';
import DeferredBackToTop from '@/components/lazy/DeferredBackToTop';
import DeferredProjectsSection from '@/components/lazy/DeferredProjectsSection';
import DeferredHackathonsSection from '@/components/lazy/DeferredHackathonsSection';
import { navLinks } from '@/data';

export default function Home() {
  return (
    <div className="bg-bg grid min-h-screen px-4 pb-20 pt-0 gap-8 md:gap-16 md:px-10">
      <header className="text-text-primary">
        <NavBar links={navLinks} />
      </header>
      <main id="main-content" tabIndex={-1} className="min-w-0 max-w-6xl mx-auto w-full">
        <section className="py-[8rem] space-y-6">
          <h1 className="text-hero text-text-primary leading-tight font-sans">
            Anna Saltveit
          </h1>
          <p className="text-h2 text-text-secondary max-w-[65ch] leading-snug">
            Product engineer building AI-powered tools and interactive experiences.
          </p>
          <HeroSocialLinks />
        </section>
        <div className="flex flex-col gap-[4px] items-start">
          <Section title="Featured Projects" id="projects">
            <div className="grid grid-cols-1 space-y-6 md:space-y-12">
              <DeferredProjectsSection />
            </div>
          </Section>
          <Section title="Experience" id="experience">
            <div className="grid grid-cols-1 space-y-6 md:space-y-10">
              <Experience
                title="Real Estate Investment Group, Software Engineer"
                dates="2026 - Present"
                items={[
                  'Took ownership of an incomplete scraping system, rebuilding and extending it using Python and Playwright to reliably extract real estate data from multiple sources.',
                  'Designing data processing pipelines to clean, normalize, and structure inconsistent inputs into usable datasets for downstream analysis in spreadsheet workflows.',
                  'Working directly with stakeholders to define requirements and iterate on product direction.',
                  'Designing systems to handle inconsistent real-world data and evolving business logic.',
                ]}
              />
              <Experience
                title="Less Fluorescent, Software Developer"
                dates="2025 - 2025"
                items={[
                  'Conducted research and design of machine learning pipelines for EEG signal and audio analysis, including signal preprocessing techniques and feature extraction methods, and a custom graph database architecture in C.',
                  'Built responsive web and mobile prototypes using JavaScript, HTML, CSS.',
                  'Worked on early-stage architecture and component design for MVP validation.',
                ]}
              />
              <Experience
                title="Included Health, Web Developer"
                dates="2021 - 2024"
                items={[
                  'Led code base maintenance initiatives for my team and collaborated with a multi-team committee to improve maintenance using Github Actions and Rollbar, reducing bug and Dependabot alerts by 80% and preventing deployment locks.',
                  'Led the development of medium and large features from code design to release.',
                  'Collaborated with cross-functional teams, including project managers, designers, and data engineers among others.',
                ]}
              />
            </div>
          </Section>
          <Section title="Selected Hackathons" id="hackathons">
            <div className="grid grid-cols-1 space-y-6 md:space-y-12">
              <DeferredHackathonsSection />
            </div>
          </Section>
        </div>
        <Section title="Skills" id="skills">
          <div className="grid max-w-prose">
            <h3 className="text-text-primary text-xl md:text-2xl font-bold mb-3">Product Engineering</h3>
            <p className="text-text-primary text-lg md:text-xl leading-relaxed mb-6 md:mb-8">
              TypeScript, React, Next.js, Tailwind CSS, Material UI, Zustand, Jest, Vite, HTML, CSS
            </p>
            <h3 className="text-text-primary text-xl md:text-2xl font-bold mb-3">AI and Agents</h3>
            <p className="text-text-primary text-lg md:text-xl leading-relaxed mb-6 md:mb-8">
              Letta, n8n, Weights & Biases Weave, Pipecat, Meshy, Cursor, Claude Code
            </p>
            <h3 className="text-text-primary text-xl md:text-2xl font-bold mb-3">Design</h3>
            <p className="text-text-primary text-lg md:text-xl leading-relaxed mb-6 md:mb-8">
              Blender, FreeCAD, Figma
            </p>
            <h3 className="text-text-primary text-xl md:text-2xl font-bold mb-3">Backend and data</h3>
            <p className="text-text-primary text-lg md:text-xl leading-relaxed mb-6 md:mb-8">
              Python, Node.js, Supabase, PostgreSQL, Express, Sequelize.js
            </p>
            <h3 className="text-text-primary text-xl md:text-2xl font-bold mb-3">Delivery</h3>
            <p className="text-text-primary text-lg md:text-xl leading-relaxed mb-6 md:mb-8">
              GitHub Actions, Git, Vercel, Slack, Jira, Agile workflows
            </p>
          </div>
        </Section>
      </main>

      <footer className="row-start-3 flex gap-[24px] text-text-primary flex-wrap items-center justify-center" />

      <DeferredBackToTop />
    </div>
  );
}
