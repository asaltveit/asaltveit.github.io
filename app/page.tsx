import Container from './components/Container'
import NavBar from './components/NavBar';
import Experience from './components/Experience';
import Project from './components/Project'

// Project Images
import mapScreenshotSrc from "../public/map-screenshot-032725.png"
import createBiblioScreenshot from "../public/create-biblio-screenshot-032825.png"

export default function Home() {
  const navLinks = [{title: "About", id: "about"}, {title: "Experience", id: "experience"}, {title: "Projects", id: "projects"}]
  /* 
    NavBar positioning 
      w- doesn't scale/resize with screen size
      max-w- doesn't change width of header
      w-4/5 is closest, but scale is weird 

      dark:text-black
  */
  return (
    <div className="bg-indigo-700 grid md:grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-8 md:gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <header className="text-white md:w-4/5" >
        <NavBar links={navLinks} />
        <div className="text-3xl mt-10 md:text-6xl items-center font-medium" >
          Anna Saltveit
        </div>
      </header>
      <main className="flex flex-col gap-[4px] row-start-2 items-start sm:items-start">
        <Container title="About Me" id="about" >
          <div className="grid">
            <div className="text-slate-700 pb-6 md:pb-8 text-lg md:text-xl">
              I&apos;m a web developer who enjoys creating beautiful and accessible products.
            </div>
            <div className="text-slate-700 text-xl md:text-2xl font-bold grid mb-4">
              Technical Skills
            </div>
            <div className='mb-2'>
              <span className="text-slate-700 text-lg md:text-xl font-bold items-start pr-3">
                Frontend:
              </span>
              <span className="text-slate-700 text-lg md:text-xl items-end">
                React, Vue, TypeScript, JavaScript, Observable Plot, Zustand, Redux, GraphQL, TailwindCSS, CSS, Vitest, Jest
              </span>
            </div>
            <div className='mb-2'>
              <span className="text-slate-700 text-lg md:text-xl font-bold items-start pr-3">
                Backend:
              </span>
              <span className="text-slate-700 text-lg md:text-xl items-end">
                Python, Node.js, Express.js, Sequelize.js, PostgreSQL
              </span>
            </div>
            <div>
              <span className="text-slate-700 text-lg md:text-xl font-bold items-start pr-3">
                Tools:
              </span>
              <span className="text-slate-700 text-lg md:text-xl items-end">
                Git, Github Actions, Figma, Agile Development
              </span>
            </div>
          </div>
        </Container>
        {/* TODO: Add months to dates? */}
        <Container title="Experience" id="experience" >
          <div className="grid grid-cols-1 space-y-6 md:space-y-10">
            <Experience title="Included Health, Web Developer" dates="2021 - 2024" items={[
              "I led the development of medium and large features from code design to release.",
              "I collaborated with cross-functional teams, including project managers, designers, and data engineers among others.",
              "I led code base maintenance initiatives for my team and collaborated with a multi-team committee to improve maintenance using Github Actions and Rollbar, reducing bug and Dependabot alerts by 80% and preventing deployment locks."
            ]} />
            <Experience title="Code for PDX, Frontend Developer" dates="2020 - 2020" items={[
              "I volunteered on Dwellingly app, which connects property managers with social workers to help homeless people find housing.",
              "I contributed components in React and SCSS."
            ]} />
          </div>
        </Container>
        <Container title="Projects" id="projects" >
          <div className="grid grid-cols-1 space-y-6 md:space-y-12">
            <Project title="ROTAS Squares Map" dates="2024 - Present" items={[
              "An interactive map and timeline using Observable Plot, React, and JavaScript on the frontend and Node.js, Express.js, and PostgreSQL on the backend.",
              "Includes filters and functionality to manipulate the data (add, update, delete).",
              "Created upon request of a researcher."
            ]}
            image={mapScreenshotSrc}
            imageTitle='ROTAS Map Image'
            imageLink="https://github.com/asaltveit/ROTAS-squares-map"
            />
            <Project title="Create Biblio" dates="2024 - Present" items={[
              "Creates a citation for each PDF in a given folder (and all sub-folders) and adds them to an RIS file which can be uploaded to Zotero and/or other programs which accept RIS format.",
              "Developed with Python.",
              "Created upon request of a researcher."
            ]}
            image={createBiblioScreenshot}
            imageTitle='ROTAS Map Image'
            imageLink="https://github.com/asaltveit/create-biblio"
            isEven
            />
          </div>
        </Container>
      </main>

      <footer className="row-start-3 flex gap-[24px] text-white flex-wrap items-center justify-center">
        {/* TODO: Use Link instead of a? */}
        <a
          className="flex items-center gap-2 underline underline-offset-5 md:no-underline hover:underline hover:underline-offset-4"
          href="https://github.com/asaltveit"
          target="_blank"
          rel="noopener noreferrer"
        >
          Github
        </a>
        <a
          className="flex items-center gap-2 underline underline-offset-5 md:no-underline hover:underline hover:underline-offset-4"
          href="https://www.linkedin.com/in/anna-saltveit-4a70b2184/"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>
      </footer>
    </div>
  );
}
