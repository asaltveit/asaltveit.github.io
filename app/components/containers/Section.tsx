
interface SectionProps {
    title: string;
    id: string;
    children: React.ReactNode;
}

export default function Section ({ title, id, children } : SectionProps) {
    return (
        <div id={`${id}`} className="relative max-w-sm md:max-w-5xl min-w-0 mx-auto w-full break-words bg-white dark:bg-primary-blue mb-3 shadow-lg rounded-xl md:mt-16 mt-8">
            <div className="px-10 py-9 md:px-20 md:py-18">
                <div className="flex flex-wrap"> 
                    <div className="w-full justify-center">
                        <div className="text-slate-700 dark:text-white md:text-5xl text-2xl text-start font-bold mb-2 md:mb-12">
                            {title}
                        </div>
                        <div className="flex justify-start lg:pt-4 pt-8 pb-0">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}