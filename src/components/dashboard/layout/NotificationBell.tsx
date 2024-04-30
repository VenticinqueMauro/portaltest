import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { UserRole } from "@/types/news.types";
import { Bell } from 'lucide-react';

export default function NotificationBell({ hasPendingNews, role }: { hasPendingNews: boolean, role: UserRole }) {

    let tooltipMessage;
    if (hasPendingNews && (role === 'admin' || role === 'editor')) {
        tooltipMessage = 'Tienes noticias pendientes de aprobación.';
    } else if (role !== 'admin' && role !== 'editor') {
        tooltipMessage = 'No tienes notificaciones pendientes.';
    } else {
        tooltipMessage = 'No hay noticias pendientes en este momento.';
    }

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <button className='relative p-1 mb-5'>
                        <Bell className='text-muted-foreground w-5 h-5' />
                        {hasPendingNews && (role === 'admin' || role === 'editor') && (
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

