import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Bell } from 'lucide-react';

export default function NotificationBell({ hasPendingNews }: { hasPendingNews: boolean }) {

    const tooltipMessage = hasPendingNews ? 'Tienes noticias pendientes de aprobación.' : 'No hay noticias pendientes en este momento.';

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <button className='relative p-1 mb-5'>
                        <Bell className='text-muted-foreground w-5 h-5' />
                        {hasPendingNews && (
                            <div className='absolute top-0 right-0 rounded-full w-2 h-2 animate-bounce inline-block bg-primary'></div>
                        )}
                    </button>
                </TooltipTrigger>
                <TooltipContent className='rounded'>
                    {tooltipMessage}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
