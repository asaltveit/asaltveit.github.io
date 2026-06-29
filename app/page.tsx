import Section from '@/components/containers/Section';
import NavBar from '@/components/NavBar';
import Experience from '@/components/Experience';
import HeroSocialLinks from '@/components/HeroSocialLinks';
import SkillsSection from '@/components/containers/SkillsSection';
import DeferredBackToTop from '@/components/lazy/DeferredBackToTop';
import DeferredProjectsSection from '@/components/lazy/DeferredProjectsSection';
import DeferredHackathonsSection from '@/components/lazy/DeferredHackathonsSection';
import { navLinks, experienceEntries } from '@/data';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="bg-bg grid min-h-screen px-4 pb-20 pt-0 gap-8 md:gap-16 md:px-10">
      <header className="text-text-primary">
        <NavBar links={navLinks} />
      </header>
      <main id="main-content" tabIndex={-1} className="min-w-0 max-w-[68.75rem] mx-auto w-full">
        <section id="about" className="scroll-mt-16 py-16 md:py-28 lg:py-32 space-y-6">
          <h1 className="text-hero text-text-primary leading-tight font-sans">
            Anna Saltveit
          </h1>
          <p className="text-h2 text-text-secondary max-w-[65ch] leading-snug">
            Product engineer building AI-powered tools and interactive experiences.
          </p>
          <HeroSocialLinks />
        </section>
        <div className="flex flex-col gap-space-4 items-start">
          <Section title="Featured Projects" id="projects">
            <div className="grid grid-cols-1 space-y-6 md:space-y-10">
              <DeferredProjectsSection />
            </div>
          </Section>
          <Section title="Experience" id="experience">
            <div className="grid grid-cols-1 space-y-6 md:space-y-10">
              {experienceEntries.map((entry) => (
                <Experience key={entry.title} {...entry} />
              ))}
            </div>
          </Section>
          <Section title="Selected Hackathons" id="hackathons">
            <div className="grid grid-cols-1 space-y-6 md:space-y-10">
              <DeferredHackathonsSection />
            </div>
          </Section>
        </div>
        <Section title="Skills" id="skills">
          <SkillsSection />
        </Section>
      </main>

      <footer className="text-text-secondary text-small text-center py-6">
        <p>
          © {new Date().getFullYear()} Anna Saltveit ·{' '}
          <Link
            href="https://github.com/asaltveit"
            className="text-accent hover:text-accent-hover underline underline-offset-4"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </Link>
        </p>
      </footer>

      <DeferredBackToTop />
    </div>
  );
}
