import { Skeleton } from '../ui/skeleton'

export default function DashboardProfileSkeleton() {
    return (
        <div className="w-[500px] mx-auto rounded h-fit my-10 relative p-6 bg-white shadow">
            <div className="mb-6">
                <Skeleton className="w-24 h-6 bg-gray-200 rounded" />
                <Skeleton className="w-40 h-4 mt-2 bg-gray-200 rounded" />
            </div>
            <div className="space-y-6">
                <form className="flex items-center space-x-6">
                    <div className="flex-shrink-0 w-12">
                        <Skeleton className="w-16 h-16 bg-gray-200 rounded-full" />
                    </div>
                    <div className="flex-1 space-y-2">
                        <Skeleton className="w-3/4 h-6 bg-gray-200 rounded" />
                        <Skeleton className="w-1/2 h-4 bg-gray-200 rounded" />
                    </div>
                </form>
                <div className="border-t border-gray-200 dark:border-gray-800" />
                <div className="grid gap-1.5 md:grid-cols-2">
                    <div>
                        <Skeleton className="w-20 h-4 bg-gray-200 rounded mb-2" />
                        <Skeleton className="w-1/2 h-4 bg-gray-200 rounded" />
                    </div>
                </div>
            </div>
        </div>
    )
}
