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
                <TooltipContent className='bg-foreground max-w-sm text-wrap text-sm'>
                    <h3 className='font-bold underline'>IMPORTANTE</h3>
                    <p>
                        Asegúrese de que las noticias guardadas en la portada y en las secciones tienen contenido de texto y multimedia confirmado.
                        Si modifica una noticia después de cargarla en la página principal o en las categorías, estos cambios no se reflejarán.
                        Deberá volver a cargar la noticia en la sección correspondiente. Solo se pueden cargar noticias en estado <b className="text-green-600">Publicado</b>.
                    </p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}
