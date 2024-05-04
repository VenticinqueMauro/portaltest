'use server';

import { MainCover } from "@/types/news.types";
import { decodeToken } from "@/utils/utils";
import { revalidatePath } from "next/cache";

export async function handleEditPortadaHome(selectedNews: MainCover) {

    const token = decodeToken();

    if (token.role !== 'admin' && token.role !== 'editor') {
        return { error: 'No tienes permisos para realizar esta acción' }
    }

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL}api/edit-home`, {
            method: 'PUT',
            credentials: 'include',
            body: JSON.stringify(selectedNews)
        })

        const json = await response.json();

        if (!response.ok) {
            return json.error
        }

        revalidatePath('/dashboard/editar-home')
        return json;

    } catch (error) {
        if (error instanceof Error) {
            return error.message
        }
    }
}