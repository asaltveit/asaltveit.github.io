export const projects = [
    {
        title:"Create Biblio", 
        dates:"2024 - 2025", 
        items:[
            "Created an open-source PDF-analyzing tool for an independent researcher.",
            "Decreased time needed to find citations for a backlog of hundreds of PDFs by 85%, removing weeks-worth of work.",
            "Gathered requirements, designed, implemented, and tested a Python program that creates citations in RIS format for every PDF in a given folder. ",
        ], 
        link:"https://github.com/asaltveit/create-biblio",
        techStack: ["Python"],
        image: "/create-biblio-screenshot-032825.png"
    },
    {
        title:"ROTAS Squares Map",
        dates:"2024 - Present",
        items:[
            "Developed a clean, modular frontend using React.js and Material UI, with an interactive map powered by Observable Plot.",
            "Configured and integrated Supabase client with the frontend, including Google OAuth for seamless user sign-in.",
        ], 
        link:"https://rotas-squares-map.vercel.app/",
        techStack: ["React", "Material UI", "Observable Plot", "Supabase", "JavaScript"],
        image: "/map-screenshot-032725.png"
    },
    {
        title:"This Website", 
        dates:"2025 - Present", 
        items:[
            "Developed with React, Next.js, TypeScript, and TailwindCSS.",
        ],
        link:"https://github.com/asaltveit/asaltveit.github.io",
        techStack: ["React", "Next.js", "TypeScript", "TailwindCSS"],
        image: "/asaltveit.github.io-screenshot-040225.png"
    },
    /* Removing for now
    {
        title:"ROTAS Map Monitor",
        dates:"2025 - Present",
        items:[
            "The back of house for the ROTAS Map.",
            "Includes admin functions (add user access, add data to map) and analytics."
        ],
        link:"https://github.com/asaltveit/ROTAS-Map-monitor",
        techStack: ["React", "Supabase", "TypeScript"]
    },*/
];

export const hackathons = [
    /* Add your hackathon entries here
        Example structure:
        {
            title: "Hackathon Name",
            dates: "2024",
            items: [
                "Description of what was built",
                "Key achievements or features"
            ],
            link: "https://github.com/...",
            techStack: ["React", "Node.js"],
            award: "1st Place",
            teamSize: 3,
            duration: "48 hours"
        }
    */
    {
        title: "ElevenLabs Worldwide Hackathon",
        dates: "12/11/25",
        items: [
            "Created SteadyTalk, an emotionally intelligent AI manager designed for practicing live performance conversations via video",
        ],
        link: "https://github.com/asaltveit/SteadyTalk",
        techStack: ["n8n", "Tavus", "ElevenLabs", "fal", "Cursor AI"],
        award: "Sponsor awards from n8n and Anam",
        teamSize: 2,
        duration: "4 hours"
    },
    {
        title: "Hack FLUX: Beyond One",
        dates: "11/22-11/23/25",
        items: [
            "Created a flipbook-style animation using a user's prompt and uploaded drawing.",
            "Used Flux to generate images, and Anthropic to generate the step-by-step image prompts."
        ],
        link: "https://drive.google.com/file/d/1p_v-1c9PbVzYC6lSmS57wo0fypRrbId9/view",
        techStack: ["fal", "Black Forest (Flux)", "Anthropic", "React"],
        teamSize: 1,
        duration: "24 hours",
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
    }
];

// Don't need {title: "About", id: "about"} - it's right there at the top
export const navLinks = [
    {title: "Experience", id: "experience"}, 
    {title: "Projects", id: "projects"},
    {title: "Hackathons", id: "hackathons"}
];