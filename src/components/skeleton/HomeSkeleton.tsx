import { Skeleton } from "@/components/ui/skeleton";

export default function HomeSkeleton() {
    return (
        <div className="max-w-7xl mx-auto grid grid-cols-12 gap-4 px-3 mt-10">
            <div className="rounded min-h-full col-span-12 lg:col-span-8 pb-4 md:pb-0">
                <div className="transition-all duration-100 shadow">
                    <div className="px-1">
                        <div className="relative -top-2">
                            <Skeleton className="w-full aspect-video rounded" />
                        </div>
                    </div>
                    <div className="text-center mt-4 pb-4">
                        <Skeleton className="w-1/2 h-4 mx-auto" />
                        <Skeleton className="w-3/4 h-8 mx-auto mt-2" />
                    </div>
                </div>
            </div>
            <div className="col-span-12 lg:col-span-4 min-h-full">
                <div className="grid grid-cols-12 gap-4 h-full">
                    {[...Array(4)].map((_, index) => (
                        <div key={index} className="col-span-6 w-full space-y-2 shadow rounded">
                            <Skeleton className="w-full aspect-video rounded" />
                            <div className="p-2">
                                <Skeleton className="w-full h-4" />
                                <Skeleton className="w-3/4 h-6 mt-2" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="col-span-12 lg:col-span-12 mt-4">
                <div className="grid grid-cols-12 gap-4 ">
                    {[...Array(2)].map((_, index) => (
                        <div key={index} className="col-span-6 w-full space-y-2 shadow rounded">
                            <Skeleton className="w-full aspect-video rounded" />
                            <div className="p-2">
                                <Skeleton className="w-full h-4" />
                                <Skeleton className="w-3/4 h-6 mt-2" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="col-span-12 flex justify-between my-4">
                {[...Array(5)].map((_, index) => (
                    <Skeleton key={index} className="w-[200px] h-[150px] rounded-lg" />
                ))}
            </div>
        </div>
    );
}
