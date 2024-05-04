'use client';

import { Button } from "@/components/ui/button";
import { MainCover } from "@/types/news.types";

interface Props {
    selectedNews: MainCover;
}

export default function SubmitButtonEditHome({ selectedNews }: Props) {

    const handleClick = async () => {

        try {

            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}api/edit-home`, {
                method: 'PUT',
                credentials: 'include',
                body: JSON.stringify(selectedNews) 
            })

            const data = await response.json();

            console.log(data)


        } catch (error) {
            // Manejar errores aquí
            console.error("Error al editar la página de inicio:", error);
            throw new Error("Error al editar la página de inicio");
        }
    }

    return (
        <div className="col-span-12 col-start-1">
            <Button size='sm' className="float-end block w-fit" onClick={handleClick}>Guardar cambios</Button>
        </div>
    )
}

