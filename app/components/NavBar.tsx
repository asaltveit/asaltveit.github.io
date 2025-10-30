import Link from 'next/link'

interface Link {
    title: string,
    id: string 
}

interface NavBarProps {
    links: Link[]
}

export default function NavBar ({ links } : NavBarProps) {
    // Another clickable link possibility: md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent
    /*
    Check mobile before deleting
    return (
        <nav className="md:flex md:flex-grow md:flex-wrap md:flex-row  justify-end space-x-3 md:space-x-4" >
            {
                links.map((link: Link) => <span key={`${link.id}`}><Link href={`#${link.id}`} className=" underline underline-offset-4 md:no-underline hover:underline hover:underline-offset-4"> {link.title} </Link></span>)
            }
        </nav>
    )*/
   return (
        <nav aria-label="main navigation" >
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto md:p-4">
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                    <div className="h-8" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"></span>
                </div>
                {/* Add menu button when screen collapsed?
                <button data-collapse-toggle="navbar-solid-bg" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 dark:text-white rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-solid-bg" aria-expanded="false">
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
                    </svg>
                </button>*/}
                <div className="hidden w-full md:block md:w-auto" id="navbar-solid-bg">
                    <ul role="menu" className="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
                        {
                            links.map((link: Link) => <li key={`${link.id}`} role="menuitem" aria-label={`includes link to ${link.title} section`}><a href={`#${link.id}`} aria-label={`link to ${link.title} section`} className=" underline underline-offset-4 md:no-underline hover:underline hover:underline-offset-4"> {link.title} </a></li>)
                        }
                    </ul>
                </div>
            </div>
        </nav>
   )
}