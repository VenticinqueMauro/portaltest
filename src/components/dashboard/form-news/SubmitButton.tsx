'use client';

import { Button } from "@/components/ui/button";
import { HTMLAttributes } from "react";
import { useFormStatus } from "react-dom";

interface Props {
    title: String;
    style?: string | undefined
}
export default function SubmitButton({ title, style }: Props) {

    const { pending } = useFormStatus();

    return (
        <Button type="submit" className={`${pending ? "opacity-80 cursor-not-allowed" : ''} w-full flex items-center gap-1 ${style ? style : ''}`}>
            {pending && title.startsWith('Crear') ? "Creando noticia, por favor espere..." : pending && title.startsWith("Editar") ? 'Editando noticia, por favor espere...' : pending && title.startsWith('Guardar') ? 'Guardando cambios...' : title}
        </Button>
    )
}
