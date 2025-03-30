import Image, { StaticImageData } from 'next/image'
import Link from 'next/link'

interface ProjectProps {
    title: string;
    dates: string;
    items: string[];
    image?: StaticImageData;
    imageTitle?: string;
    imageLink?: string;
    isEven?: boolean;
}
// TODO: Image sizing
export default function Project ({ title, dates, items, image, imageTitle="image", imageLink="#", isEven } : ProjectProps) {
    if (isEven) {
        return (
            <div className="grid md:grid-cols-2 justify-items-start">
                <div className="items-start pr-10">
                {
                    image && 
                    <Link href={imageLink} >
                        <Image
                            src={image}
                            alt={imageTitle}
                            // placeholder="blur" // Optional blur-up while loading
                        />
                    </Link>
                }
                </div> 
                <div className="grid items-end" >
                    <div className="text-slate-700 text-2xl font-bold">
                        {title}
                    </div>
                    <div className="text-slate-500 text-xl pb-2">
                        {dates}
                    </div>
                    <ul className='marker:text-green list-outside list-disc ml-6 text-slate-700 text-xl justify-items-start'>
                        {
                            items.map((item: string, i: number) => <li key={`${i}`}> {item} </li>)
                        }
                    </ul>
                </div> 
            </div>
        )
    } else {
        return (
            <div className="grid md:grid-cols-2 justify-items-start">
                <div className="grid items-start pr-10" >
                    <div className="text-slate-700 text-2xl font-bold">
                        {title}
                    </div>
                    <div className="text-slate-500 text-xl pb-2">
                        {dates}
                    </div>
                    <ul className='marker:text-green list-outside list-disc ml-6 text-slate-700 text-xl justify-items-start'>
                        {
                            items.map((item: string, i: number) => <li key={`${i}`}> {item} </li>)
                        }
                    </ul>
                </div>
                <div className="items-end">
                {
                    image && 
                    <Link href={imageLink} >
                        <Image
                            src={image}
                            alt={imageTitle}
                            // placeholder="blur" // Optional blur-up while loading
                        />
                    </Link>
                }
                </div>  
            </div>
        )   
    }
}