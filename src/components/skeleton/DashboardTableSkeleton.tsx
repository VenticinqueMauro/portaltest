
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardTableSkeleton() {
    return (
        <div className="py-10 pr-6">
            <div className="py-4">
                <div className="flex items-center space-x-4 mb-4">
                    <Skeleton className="max-w-sm w-full h-10 bg-gray-100 rounded" />
                    <Skeleton className="w-32 h-10 bg-gray-100 rounded" />
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white">
                        <thead>
                            <tr>
                                {[...Array(5)].map((_, index) => (
                                    <th key={index} className="px-6 py-3 border-b-2 border-gray-100 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                                        <Skeleton className="w-24 h-4 bg-gray-200" />
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {[...Array(10)].map((_, rowIndex) => (
                                <tr key={rowIndex}>
                                    {[...Array(5)].map((_, colIndex) => (
                                        <td key={colIndex} className="px-6 py-4 whitespace-no-wrap border-b border-gray-100">
                                            <Skeleton className="w-full h-4 bg-gray-200" />
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

