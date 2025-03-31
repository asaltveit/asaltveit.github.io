
interface ContainerProps {
    title: string;
    id: string;
    children: React.ReactNode;
  }

export default function Container ({ title, id, children } : ContainerProps) {
    return (
        <div id={`${id}`} className="relative max-w-sm mx-auto md:max-w-5xl min-w-0 break-words bg-white w-full mb-3 shadow-lg rounded-xl md:mt-16 mt-8">
            <div className="px-10 py-9 md:px-20 md:py-18">
                <div className="flex flex-wrap"> 
                    <div className="w-full justify-center">
                        <div className="text-slate-700 md:text-5xl text-2xl text-start font-bold mb-2 md:mb-12">
                            {title}
                        </div>
                        <div className="flex justify-start lg:pt-4 pt-8 pb-0">
                            <>{children}</>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}