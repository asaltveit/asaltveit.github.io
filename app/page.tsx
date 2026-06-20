'use client';

import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import { TEXT_LINK_EXTERNAL_ICON_CLASS } from '@/components/cards/externalLinkIndicators';
import { handleSpacebarKeyDown } from '@/utils/keyboard';

// Custom Components
import Section from '@/components/containers/Section';
import NavBar from '@/components/NavBar';
import Experience from '@/components/Experience';
import BackToTopButton from '@/components/BackToTopButton';
import ProjectsContainer from '@/components/containers/ProjectsContainer';
import HackathonsContainer from '@/components/containers/HackathonsContainer';
import { featuredProjects, otherProjects, hackathons, navLinks } from '@/data';

export default function Home() {
  return (
    <div className="bg-bg grid min-h-screen px-4 pb-20 pt-0 gap-8 md:gap-16 md:px-10">
      <header className="text-text-primary">
        <NavBar links={navLinks} />
      </header>
      <main id="main-content" tabIndex={-1} className="min-w-0 max-w-6xl mx-auto w-full">
        <h1 className="text-text-primary text-hero mt-6 md:mt-10 md:text-6xl text-center font-medium px-2">
          Anna Saltveit
        </h1>
        <p className="text-text-primary text-center text-h1 md:text-xl max-w-2xl mx-auto mt-4 px-2 leading-relaxed">
          Product engineer building AI-powered tools and interactive experiences. 
          I specialize in turning ambiguous ideas into usable products, from frontend interfaces to data pipelines and intelligent workflows.
        </p>
        <p>
          <Link
            className="group flex items-center gap-2 underline underline-offset-5 md:no-underline hover:underline hover:underline-offset-4"
            href="https://github.com/asaltveit"
            aria-label="link to Github (opens in new tab)"
            target="_blank"
            rel="noopener noreferrer"
            onKeyDown={handleSpacebarKeyDown}
          >
            Github
            <ExternalLink className={TEXT_LINK_EXTERNAL_ICON_CLASS} aria-hidden />
          </Link>
          <Link
            className="group flex items-center gap-2 underline underline-offset-5 md:no-underline hover:underline hover:underline-offset-4"
            href="https://www.linkedin.com/in/anna-saltveit-4a70b2184/"
            aria-label="link to LinkedIn (opens in new tab)"
            target="_blank"
            rel="noopener noreferrer"
            onKeyDown={handleSpacebarKeyDown}
          >
            LinkedIn
            <ExternalLink className={TEXT_LINK_EXTERNAL_ICON_CLASS} aria-hidden />
          </Link>
        </p>
        <div className="flex flex-col gap-[4px] items-start">
          <Section title="Featured Projects" id="projects">
            <div className="grid grid-cols-1 space-y-6 md:space-y-12">
              <ProjectsContainer featuredProjects={featuredProjects} />
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
              {/*<Experience
                title="Code for PDX, Frontend Developer"
                dates="2020 - 2020"
                items={[
                  'Volunteered on Dwellingly app, which connects property managers with social workers to help homeless people find housing.',
                  'Contributed components in React and SCSS.',
                ]}
              />
              <Experience
                title="Waitrainer, Intern"
                dates="2017 - 2017"
                items={[
                  'Worked with the full stack (PHP, MongoDB, Vue.js) in a waiter-training startup.',
                  'Designed and implemented features such as live search menus and refactored webpages.',
                ]}
              />*/}
            </div>
          </Section>
          <Section title="Selected Hackathons" id="hackathons">
            <div className="grid grid-cols-1 space-y-6 md:space-y-12">
              <HackathonsContainer hackathons={hackathons} />
            </div>
          </Section>
        </div>
          <Section title="Skills" id="skills">
            <div className="grid max-w-prose">
              <h3 className="text-text-primary text-xl md:text-2xl font-bold mb-3">What I focus on</h3>
              <ul className="list-outside list-disc ml-6 text-text-primary text-lg md:text-xl space-y-2 mb-6 md:mb-8 marker:text-success">
                <li>Responsive layouts and component structure from mobile up</li>
                <li>Accessibility — semantic HTML, focus-visible patterns, and meaningful labels</li>
                <li>Visual polish in CSS (spacing, type, states) and pragmatic design systems</li>
              </ul>
              <h3 className="text-text-primary text-xl md:text-2xl font-bold mb-3">Stack I ship with</h3>
              <p className="text-text-primary text-lg md:text-xl leading-relaxed mb-6 md:mb-8">
                React, Next.js, TypeScript, Tailwind CSS, Jest, HTML, and CSS — plus Material UI, Zustand,
                Observable Plot, and Vite when the product calls for them.
              </p>
              <h3 className="text-text-primary text-xl md:text-2xl font-bold mb-3">Also comfortable with</h3>
              <p className="text-text-primary text-lg md:text-xl leading-relaxed mb-3">
                Backend and data: Python, Node.js, Supabase, PostgreSQL, Express, Sequelize — enough to
                integrate APIs and ship full features with backend teammates.
              </p>
              <p className="text-text-primary text-lg md:text-xl leading-relaxed mb-3">
                Delivery: GitHub Actions, Git, Vercel, npm, LaunchDarkly, Slack, Jira, and Agile workflows.
              </p>
              <p className="text-text-primary text-lg md:text-xl leading-relaxed">
                Exploring AI-assisted development and agents (Letta, n8n, Weights & Biases Weave, Pipecat,
                Cursor, Claude Code, and related tools) where they speed up research and prototyping.
              </p>
            </div>
          </Section>
      </main>

      <footer className="row-start-3 flex gap-[24px] text-text-primary flex-wrap items-center justify-center">

      </footer>

      <BackToTopButton />
    </div>
  );
}
