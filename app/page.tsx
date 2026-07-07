import Section from '@/components/containers/Section';
import ScrollAwareHeader from '@/components/ScrollAwareHeader';
import Experience from '@/components/Experience';
import HeroSocialLinks from '@/components/HeroSocialLinks';
import SkillsSection from '@/components/containers/SkillsSection';
import DeferredBackToTop from '@/components/lazy/DeferredBackToTop';
import ProjectsSection from '@/components/containers/ProjectsSection';
import DeferredHackathonsSection from '@/components/lazy/DeferredHackathonsSection';
import { navLinks, experienceEntries } from '@/data';
import { ACCENT_EXTERNAL_LINK_CLASS } from '@/components/linkStyles';
import { TEXT_LINK_EXTERNAL_ICON_CLASS } from '@/components/cards/externalLinkIndicators';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';

export default function Home() {
  return (
    <div className="bg-bg min-h-screen px-4 pb-20 pt-0 md:px-10">
      <ScrollAwareHeader links={navLinks} />
      <main id="main-content" tabIndex={-1} className="min-w-0 max-w-[68.75rem] mx-auto w-full">
        <section id="about" aria-labelledby="about-heading" className="scroll-mt-16 min-h-[calc(100dvh-var(--full-nav-height))] py-12 md:min-h-0 md:py-28 lg:py-32 space-y-6">
          <h1
            id="about-heading"
            tabIndex={-1}
            className="text-hero text-text-primary leading-tight font-sans focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
          >
            Anna Saltveit
          </h1>
          <p className="text-h2 text-text-secondary max-w-[65ch] leading-snug">
            Product engineer building AI-powered tools and interactive experiences.
          </p>
          <HeroSocialLinks />
        </section>
        <div className="flex flex-col gap-4 items-start">
          <Section title="Featured Projects" id="projects">
            <div className="grid grid-cols-1 space-y-6 md:space-y-10">
              <ProjectsSection />
            </div>
          </Section>
          <Section title="Experience" id="experience" contentDeferred>
            <div className="grid grid-cols-1 space-y-6 md:space-y-10">
              {experienceEntries.map((entry) => (
                <Experience key={entry.title} {...entry} />
              ))}
            </div>
          </Section>
          <Section title="Selected Hackathons" id="hackathons" contentDeferred>
            <div className="grid grid-cols-1 space-y-6 md:space-y-10">
              <DeferredHackathonsSection />
            </div>
          </Section>
        </div>
        <Section title="Skills" id="skills" contentDeferred>
          <SkillsSection />
        </Section>
      </main>

      <footer className="text-text-secondary text-small py-6 content-deferred">
        <p className="flex flex-wrap items-center justify-center gap-4">
          <span className="inline-flex items-center gap-2">
            © {new Date().getFullYear()} Anna Saltveit
            <ExternalLink className={TEXT_LINK_EXTERNAL_ICON_CLASS} aria-hidden />
          </span>
          <Link
            href="https://www.linkedin.com/in/anna-saltveit-4a70b2184/"
            className={ACCENT_EXTERNAL_LINK_CLASS}
            aria-label="link to LinkedIn (opens in new tab)"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
            <ExternalLink className={TEXT_LINK_EXTERNAL_ICON_CLASS} aria-hidden />
          </Link>
          <Link
            href="https://github.com/asaltveit"
            className={ACCENT_EXTERNAL_LINK_CLASS}
            aria-label="link to Github (opens in new tab)"
            target="_blank"
            rel="noopener noreferrer"
          >
            Github
            <ExternalLink className={TEXT_LINK_EXTERNAL_ICON_CLASS} aria-hidden />
          </Link>
        </p>
      </footer>

      <DeferredBackToTop />
    </div>
  );
}
