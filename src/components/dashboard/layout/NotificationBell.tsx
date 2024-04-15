import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Bell } from 'lucide-react';


export default function NotificationBell() {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <button className='relative p-1'>
                        <Bell className='text-muted-foreground w-5 h-5' />
                        <div className='absolute top-0 right-0 rounded-full w-2 h-2 animate-bounce inline-block bg-primary'></div>
                    </button>
                </TooltipTrigger>
                <TooltipContent className='rounded'>
                    <p>Tienes noticias pendietes de aprobación</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}
