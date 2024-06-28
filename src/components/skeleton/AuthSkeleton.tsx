import { Skeleton } from '../ui/skeleton'

export default function AuthSkeleton() {
    return (
        <div className='md:space-x-4 flex flex-col md:flex-row justify-between items-center'>
            <Skeleton className='w-28 h-9 bg-gray-200 mb-2 md:mb-0' />
            <Skeleton className='w-28 h-9 bg-gray-200' />
        </div>
    )
}
