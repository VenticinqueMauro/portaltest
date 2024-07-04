import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from 'lucide-react';

export default function InfoTooltip() {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>
                    <Info />
                </TooltipTrigger>
                <TooltipContent className="bg-foreground max-w-sm text-wrap text-sm">
                    <h3 className="font-bold underline mb-1">Recuerde:</h3>
                    <p>
                        • En caso de editar una noticia, deberá volver a cargarla en la sección correspondiente para reflejar sus cambios.
                    </p>
                    <p>
                        • Solo se podrán cargar aquellas noticias en estado <b className="text-green-600">Publicado</b>.
                    </p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}
