import Container from './components/Container'
import NavBar from './components/NavBar';
import Experience from './components/Experience';
//import Image from 'next/image'
//import mapScreenshotSrc from "@/public/map-screenshot-032725.png"
export default function Home() {
  const navLinks = [{title: "About", id: "about"}, {title: "Experience", id: "experience"}, {title: "Projects", id: "projects"}]
  /* 
    NavBar positioning 
      w- doesn't scale/resize with screen size
      max-w- doesn't change width of header
      w-4/5 is closest, but scale is weird 
  */
  return (
    <div className="bg-indigo-700 grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <header className="text-black dark:text-white w-4/5" >
        <NavBar links={navLinks} />
        <div className="text-6xl font-medium" >
          Anna Saltveit
        </div>
      </header>
      <main className="flex flex-col gap-[4px] row-start-2 items-start sm:items-start">
        <Container title="About Me" id="about" >
          <div className="grid">
            <div className="text-slate-700 pb-8 text-xl">
              I&apos;m a web developer who enjoys creating beautiful and accessible products.
            </div>
            <div className="text-slate-700 text-2xl font-bold grid mb-4">
              Technical Skills
            </div>
            <div >
              <span className="text-slate-700 text-xl font-bold items-start pr-3">
                Frontend:
              </span>
              <span className="text-slate-700 text-xl items-end">
                React, Vue, TypeScript, JavaScript, Observable Plot, Zustand, Redux, GraphQL, TailwindCSS, CSS, Vitest, Jest
              </span>
            </div>
            <div>
              <span className="text-slate-700 text-xl font-bold items-start pr-3">
                Backend:
              </span>
              <span className="text-slate-700 text-xl items-end">
                Python, Node.js, Express.js, Sequelize.js, PostgreSQL
              </span>
            </div>
            <div>
              <span className="text-slate-700 text-xl font-bold items-start pr-3">
                Tools:
              </span>
              <span className="text-slate-700 text-xl items-end">
                Git, Github Actions, Figma, Agile Development
              </span>
            </div>
          </div>
        </Container>
        <Container title="Experience" id="experience" >
          <div className="grid grid-cols-1">
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
          <div>
            <div className="grid grid-cols-1">
              <div className="grid grid-cols-2 justify-items-start pb-8">
                <div className="grid items-start" >
                  <div className="text-slate-700 text-2xl font-bold">
                    ROTAS Squares Map
                  </div>
                  <div className="text-slate-500 text-xl pb-2">
                    2024 - Present
                  </div>
                  <ul className='marker:text-green list-outside list-disc ml-6 text-slate-700 text-xl justify-items-start'>
                    <li> An interactive map and timeline using Observable Plot, React, and JavaScript on the frontend and Node.js, Express.js, and
                    PostgreSQL on the backend. </li>
                    <li> Includes filters and functionality to manipulate the data (add, update, delete). </li>
                    <li> Created upon request of a researcher. </li>
                  </ul>
                </div>
                {/*<div className="items-end">
                   Include an image / video 
                  <Image
                    src={mapScreenshotSrc}
                    alt="ROTAS Squares Map"
                    width={2746} //automatically provided
                    height={1508} //automatically provided
                    className="max-w-[150px]"
                    // blurDataURL="data:..." automatically provided
                    // placeholder="blur" // Optional blur-up while loading
                  />
                </div>*/}
              </div>
            </div>
          </div>
        </Container>
      </main>

      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://github.com/asaltveit"
          target="_blank"
          rel="noopener noreferrer"
        >
          Github
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
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
