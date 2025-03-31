import Link from 'next/link'

interface Link {
    title: string,
    id: string 
}

interface NavBarProps {
    links: Link[]
  }

export default function NavBar ({ links } : NavBarProps) {
    return (
        <nav className="md:flex md:flex-grow md:flex-row justify-end space-x-3 md:space-x-4" >
            {
                links.map((link: Link) => <span key={`${link.id}`}><Link href={`#${link.id}`} className="underline underline-offset-4 md:no-underline hover:underline hover:underline-offset-4"> {link.title} </Link></span>)
            }
        </nav>
    )
}