import { Skeleton } from '../ui/skeleton'

export default function DashboardAdsSkeleton() {
    return (
        <div className="flex space-x-4 ">
            {[...Array(3)].map((_, index) => (
                <div key={index} className="relative max-w-xs w-full bg-white shadow rounded-xl p-4 h-[150px]">
                    <div className="flex items-center justify-between mb-4">
                        <Skeleton className="w-1/2 h-6 bg-gray-200 rounded" />
                        <Skeleton className="w-1/4 h-6 bg-gray-200 rounded" />
                    </div>
                    <div className="flex flex-col space-y-2">
                        {[...Array(2)].map((_, subIndex) => (
                            <div key={subIndex} className="flex justify-between items-center">
                                <div className="flex items-center space-x-2">
                                    <Skeleton className="w-20 h-4 bg-gray-200 rounded" />
                                    <Skeleton className="w-10 h-4 bg-gray-200 rounded" />
                                </div>
                                <Skeleton className="w-10 h-4 bg-gray-200 rounded" />
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}
