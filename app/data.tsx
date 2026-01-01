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
    {
        title:"ROTAS Map Monitor",
        dates:"2025 - Present",
        items:[
            "The back of house for the ROTAS Map.",
            "Includes admin functions (add user access, add data to map) and analytics."
        ],
        link:"https://github.com/asaltveit/ROTAS-Map-monitor",
        techStack: ["React", "Supabase", "TypeScript"]
    },
];

export const hackathons = [
    // Add your hackathon entries here
    // Example structure:
    // {
    //     title: "Hackathon Name",
    //     dates: "2024",
    //     items: [
    //         "Description of what was built",
    //         "Key achievements or features"
    //     ],
    //     link: "https://github.com/...",
    //     techStack: ["React", "Node.js"],
    //     award: "1st Place",
    //     teamSize: 3,
    //     duration: "48 hours"
    // }
];

// Don't need {title: "About", id: "about"} - it's right there at the top
export const navLinks = [
    {title: "Experience", id: "experience"}, 
    {title: "Projects", id: "projects"},
    {title: "Hackathons", id: "hackathons"}
];