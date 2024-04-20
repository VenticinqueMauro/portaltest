import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { NewsStatus, NewsType } from "@/types/news.types";
import { Bell } from 'lucide-react';

async function getPendingNews() {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL}api/news`);

        if (!response.ok) {
            console.log('Ocurrio un error al consultar las noticias')
        }

        const { data }: { data: NewsType[] } = await response.json();

        const hasPendingNews = data.some((news) => news.status === NewsStatus.PENDING);

        return hasPendingNews;

    } catch (error) {
        console.log(error)
    }
}


export default async function NotificationBell() {

    const hasPendingNews = await getPendingNews();

    const tooltipMessage = hasPendingNews ? 'Tienes noticias pendientes de aprobación.' : 'No hay noticias pendientes en este momento.';

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <button className='relative p-1'>
                        <Bell className='text-muted-foreground w-5 h-5' />
                        {
                            hasPendingNews &&
                            <div className='absolute top-0 right-0 rounded-full w-2 h-2 animate-bounce inline-block bg-primary'></div>
                        }
                    </button>
                </TooltipTrigger>
                <TooltipContent className='rounded'>
                    <p>{tooltipMessage}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}
