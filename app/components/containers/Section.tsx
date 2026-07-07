interface SectionProps {
    title: string;
    id: string;
    children: React.ReactNode;
    contentDeferred?: boolean;
}

export default function Section ({ title, id, children, contentDeferred = false } : SectionProps) {
    const headingId = `${id}-heading`;

    return (
        <section id={`${id}`} aria-labelledby={headingId} role="region" className={`relative scroll-mt-16 w-full max-w-[68.75rem] min-w-0 mx-auto break-words bg-surface mb-3 shadow-lg rounded-xl md:mt-16 mt-8${contentDeferred ? ' content-deferred' : ''}`}>
            <div className="px-6 py-9 md:px-12 md:py-16 lg:px-16">
                <div className="flex flex-wrap"> 
                    <div className="w-full justify-center">
                        <h2 
                            id={headingId} 
                            tabIndex={-1} 
                            className="text-text-primary text-h1 font-bold mb-2 md:mb-8 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                        >
                            {title}
                        </h2>
                        <div className="flex justify-start pt-4 pb-0">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}