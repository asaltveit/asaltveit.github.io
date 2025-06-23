"use client"
import Image, { StaticImageData } from 'next/image'
import { useEffect, useState } from "react"
import Link from 'next/link'

interface ProjectProps {
    title: string;
    dates: string;
    items: string[];
    image?: StaticImageData;
    imageTitle?: string;
    link: string;
    isEven?: boolean;
}
// TODO: Image sizing
export default function Project ({ title, dates, items, image, imageTitle="image", link="#", isEven } : ProjectProps) {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // window is accessible here.
        setIsMobile(window.matchMedia("(max-width: 500px)").matches)
      }, []);

    if (isMobile) {
        return (
            <div className="grid justify-items-start">
                <div className="grid items-end" >
                    <div className="text-slate-700 dark:text-white text-xl underline underline-offset-5 md:text-2xl font-bold">
                        <Link href={link} aria-label={`link to ${title}`}> {title} </Link>
                    </div>
                    <div className="text-slate-500 dark:text-slate-400 mt-1 text-lg md:text-xl pb-2">
                        {dates}
                    </div>
                    <ul className='marker:text-green list-outside list-disc ml-6 text-slate-700 dark:text-white text-lg md:text-xl justify-items-start'>
                        {
                            items.map((item: string, i: number) => <li key={`${i}`}> {item} </li>)
                        }
                    </ul>
                </div> 
            </div>
        )
    }

    if (isEven) {
        return (
            <div className="grid md:grid-cols-2 items-start justify-items-start">
                <div className="items-start md:pr-10">
                {
                    image && 
                    <Link href={link} aria-label={`link to ${title}`}>
                        <Image
                            src={image}
                            alt={`${imageTitle} image`}
                            // placeholder="blur" // Optional blur-up while loading
                        />
                    </Link>
                }
                </div> 
                <div className="grid items-end md:pr-10" >
                    <div className="text-slate-700 dark:text-white text-xl md:text-2xl font-bold">
                    <Link href={link} aria-label={`link to ${title}`} className='hover:underline hover:underline-offset-4'> {title} </Link>
                    </div>
                    <div className="text-slate-500 dark:text-slate-400 text-lg md:text-xl pb-2">
                        {dates}
                    </div>
                    <ul className='marker:text-green list-outside list-disc ml-6 text-slate-700 dark:text-white text-lg md:text-xl justify-items-start'>
                        {
                            items.map((item: string, i: number) => <li key={`${i}`}> {item} </li>)
                        }
                    </ul>
                </div> 
            </div>
        )
    } else {
        return (
            <div className="grid md:grid-cols-2 items-start justify-items-start">
                <div className="grid items-start md:pr-10" >
                    <div className="text-slate-700 dark:text-white text-xl md:text-2xl font-bold">
                    <Link href={link} aria-label={`link to ${title}`} className='hover:underline hover:underline-offset-4'> {title} </Link>
                    </div>
                    <div className="text-slate-500 dark:text-slate-400 text-lg md:text-xl pb-2">
                        {dates}
                    </div>
                    <ul className='marker:text-green list-outside list-disc ml-6 text-slate-700 dark:text-white text-lg md:text-xl justify-items-start'>
                        {
                            items.map((item: string, i: number) => <li key={`${i}`}> {item} </li>)
                        }
                    </ul>
                </div>
                <div className="items-end">
                {
                    image && 
                    <Link href={link} aria-label={`link to ${title}`}>
                        <Image
                            src={image}
                            alt={`${imageTitle} screenshot`}
                            // placeholder="blur" // Optional blur-up while loading
                        />
                    </Link>
                }
                </div>  
            </div>
        )   
    }
}