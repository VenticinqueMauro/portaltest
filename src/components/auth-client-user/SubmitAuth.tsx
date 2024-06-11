'use client';

import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";

interface Props {
    title: String;
    style?: string | undefined
    disabled?: boolean
}
export default function SubmitAuth({ title, style, disabled }: Props) {

    const { pending } = useFormStatus();

    return (
        <Button type="submit" disabled={disabled} className={`${pending ? "opacity-80 cursor-not-allowed" : ''} w-full flex items-center gap-1 ${style ? style : ''}`}>
            {pending && title.startsWith('Crear') ? "Creando su cuenta, por favor espere..." : pending && title.startsWith("Iniciar") ? 'Iniciando sesión , por favor espere...' : pending && title.startsWith('Enviar') ? 'Enviando enlace de recuperación...' : title}
        </Button>
    )
}
