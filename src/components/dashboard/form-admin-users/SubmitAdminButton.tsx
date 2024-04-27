'use client';

import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";

interface Props {
    title: String;
}
export default function SubmitAdminButton({ title }: Props) {

    const { pending } = useFormStatus();

    const message = pending && title.startsWith('Crear') ? "Creando usuario, por favor espere..." : pending && title.startsWith("Editar") ? 'Editando usuario, por favor espere...' : pending && title.startsWith('Cambiar') ? "Cambiando contraseña" : pending && title.startsWith('Ingresar') ? 'Ingresando al panel...' : pending && title.startsWith('Actualizar') ? "Actualizando cotización" : title;

    return (
        <Button type="submit" className={`${pending ? "opacity-80 cursor-not-allowed" : ''} w-full flex items-center gap-1`}>
            {message}
        </Button>
    )
}
