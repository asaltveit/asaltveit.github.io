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
        <nav className="flex md:flex md:flex-grow flex-row justify-end space-x-4" >
            {
                links.map((link: Link) => <span key={`${link.id}`}><Link href={`#${link.id}`} className="hover:underline hover:underline-offset-4"> {link.title} </Link></span>)
            }
        </nav>
    )
}