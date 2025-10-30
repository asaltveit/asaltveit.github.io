export const projects = [
    {
        title:"Create Biblio", 
        dates:"2024 - 2025", 
        items:[
            "Created an open-source PDF-analyzing tool for an independent researcher.",
            "Decreased time needed to find citations for a backlog of hundreds of PDFs by 85%, removing weeks-worth of work.",
            "Gathered requirements, designed, implemented, and tested a Python program that creates citations in RIS format for every PDF in a given folder. ",
        ], 
        link:"https://github.com/asaltveit/create-biblio"
    },
    {
        title:"ROTAS Squares Map",
        dates:"2024 - Present",
        items:[
            "Developed a clean, modular frontend using React.js and Material UI, with an interactive map powered by Observable Plot.",
            "Configured and integrated Supabase client with the frontend, including Google OAuth for seamless user sign-in.",
        ], 
        link:"https://rotas-squares-map.vercel.app/"
    },
    {
        title:"This Website", 
        dates:"2025 - Present", 
        items:[
            "Developed with React, Next.js, TypeScript, and TailwindCSS.",
        ],
        link:"https://github.com/asaltveit/asaltveit.github.io"
    },
    {
        title:"ROTAS Map Monitor",
        dates:"2025 - Present",
        items:[
            "The back of house for the ROTAS Map.",
            "Includes admin functions (add user access, add data to map) and analytics."
        ],
        link:"https://github.com/asaltveit/ROTAS-Map-monitor"
    },
];

// Don't need {title: "About", id: "about"} - it's right there at the top
export const navLinks = [{title: "Experience", id: "experience"}, {title: "Projects", id: "projects"}];