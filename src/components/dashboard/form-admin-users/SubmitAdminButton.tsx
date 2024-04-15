'use client';

import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";

interface Props {
    title: String;
}
export default function SubmitAdminButton({ title }: Props) {

    const { pending } = useFormStatus();

    return (
        <Button type="submit" className={`${pending ? "opacity-80 cursor-not-allowed" : ''} w-full flex items-center gap-1`}>
            {pending && title.startsWith('Crear') ? "Creando usuario, por favor espere..." : pending && title.startsWith("Editar") ? 'Editando usuario, por favor espere...' : pending && title.startsWith('Cambiar') ? "Cambiando contraseña" : title}
        </Button>
    )
}
