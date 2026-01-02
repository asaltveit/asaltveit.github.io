import Link from 'next/link';

// Custom Components
import Section from '@/components/Section';
import NavBar from '@/components/NavBar';
import Experience from '@/components/Experience';
import BackToTopButton from '@/components/BackToTopButton';
import ProjectsContainer from '@/components/ProjectsContainer';
import HackathonsContainer from '@/components/HackathonsContainer';
import { projects, hackathons, navLinks } from '@/data';


export default function Home() {
  return (
    <div className="bg-indigo-700 grid min-h-screen px-10 pb-20 gap-8 md:gap-16 font-[family-name:var(--font-geist-sans)]">
        <header className="text-white" >
          <NavBar links={navLinks} />
        </header>
        <main>
          <h1 className="text-white text-4xl mt-6 md:mt-10 md:text-6xl items-center text-center font-medium" >
            Anna Saltveit
          </h1>
          <div className="flex flex-col gap-[4px] row-start-2 items-start sm:items-start">
            <Section title="About Me" id="about" >
              <div className="grid">
                <div className="text-slate-700 dark:text-white pb-6 md:pb-8 text-lg md:text-xl">
                  I&apos;m a web developer who enjoys creating useful and accessible products.
                </div>
                <div className="text-slate-700 dark:text-white text-xl md:text-2xl font-bold grid mb-4">
                  Technical Skills
                </div>
                <div className='mb-2'>
                  <span className="text-slate-700 dark:text-white text-lg md:text-xl font-bold items-start pr-3">
                    Frontend:
                  </span>
                  <span className="text-slate-700 dark:text-white text-lg md:text-xl items-end">
                    Next.js, React, TypeScript, JavaScript, TailwindCSS, Material UI, Zustand, Observable Plot, HTML, CSS, Vitest, Vue
                  </span>
                </div>
                <div className='mb-2'>
                  <span className="text-slate-700 dark:text-white text-lg md:text-xl font-bold items-start pr-3">
                    Backend:
                  </span>
                  <span className="text-slate-700 dark:text-white text-lg md:text-xl items-end">
                    Python, Supabase, Node.js, Express.js, Sequelize.js, PostgreSQL
                  </span>
                </div>
                <div>
                  <span className="text-slate-700 dark:text-white text-lg md:text-xl font-bold items-start pr-3">
                    Tools:
                  </span>
                  <span className="text-slate-700 dark:text-white text-lg md:text-xl items-end">
                    Git, Github Actions, Vercel, Agile Development, npm, LaunchDarkly, Slack, Jira, Confluence, PagerDuty
                  </span>
                </div>
              </div>
            </Section>
            <Section title="Experience" id="experience" >
              <div className="grid grid-cols-1 space-y-6 md:space-y-10">
                <Experience title="Less Fluorescent, Software Developer" dates="2025 - 2025" items={[
                  "Conducted research and design of machine learning pipelines for EEG signal and audio analysis, including signal preprocessing techniques and feature extraction methods, and a custom graph database architecture in C.",
                  "Built responsive web and mobile prototypes using JavaScript, HTML, CSS.",
                  "Worked on early-stage architecture and component design for MVP validation."
                  ]} 
                />
                <Experience title="Included Health, Web Developer" dates="2021 - 2024" items={[
                  "Led code base maintenance initiatives for my team and collaborated with a multi-team committee to improve maintenance using Github Actions and Rollbar, reducing bug and Dependabot alerts by 80% and preventing deployment locks.",
                  "Led the development of medium and large features from code design to release.",
                  "Collaborated with cross-functional teams, including project managers, designers, and data engineers among others.",
                ]} />
                <Experience title="Code for PDX, Frontend Developer" dates="2020 - 2020" items={[
                  "Volunteered on Dwellingly app, which connects property managers with social workers to help homeless people find housing.",
                  "Contributed components in React and SCSS."
                ]} />
                <Experience title="Waitrainer, Intern" dates="2017 - 2017" items={[
                  "Worked with the full stack (PHP, MongoDB, Vue.js) in a waiter-training startup.",
                  "Designed and implemented features such as live search menus and refactored webpages."
                ]} />
              </div>
            </Section>
            <Section title="Projects" id="projects" >
              <div className="grid grid-cols-1 space-y-6 md:space-y-12">
                <ProjectsContainer projects={projects} />
              </div>
            </Section>
            <Section title="Hackathons" id="hackathons" >
              <div className="grid grid-cols-1 space-y-6 md:space-y-12">
                <HackathonsContainer hackathons={hackathons} />
              </div>
            </Section>
          </div>
        </main>

        <footer className="row-start-3 flex gap-[24px] text-white flex-wrap items-center justify-center">
          <Link
            className="flex items-center gap-2 underline underline-offset-5 md:no-underline hover:underline hover:underline-offset-4"
            href="https://github.com/asaltveit"
            aria-label={`link to Github`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Github
          </Link>
          <Link
            className="flex items-center gap-2 underline underline-offset-5 md:no-underline hover:underline hover:underline-offset-4"
            href="https://www.linkedin.com/in/anna-saltveit-4a70b2184/"
            aria-label={`link to LinkedIn`}
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </Link>
        </footer>

        <BackToTopButton />
    </div>
  );
}
