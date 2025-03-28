
interface ContainerProps {
    title: string;
    children: React.ReactNode;
  }

export default function Container ({ title, children } : ContainerProps) {
    return (
        <div className="relative max-w-md mx-auto md:max-w-5xl mt-6 min-w-0 break-words bg-white w-full mb-3 shadow-lg rounded-xl mt-16">
            <div className="px-20 py-18">
                <div className="flex flex-wrap"> 
                    <div className="w-full justify-center">
                        <div className="text-slate-700 text-5xl text-start font-bold mb-12">
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