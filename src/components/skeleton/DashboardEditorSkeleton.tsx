import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardEditorSkeleton() {
    return (
        <div className="flex flex-col space-y-4 p-6 h-screen">
            <div className="flex justify-between">
                <Skeleton className="max-w-lg w-full h-10 bg-gray-200 rounded" />
            </div>
            <div className="flex flex-1 space-x-4">
                <Skeleton className="flex-1 h-full bg-gray-200 rounded" />
                <Skeleton className="w-1/6 h-full bg-gray-200 rounded" />
            </div>
        </div>
    );
}
