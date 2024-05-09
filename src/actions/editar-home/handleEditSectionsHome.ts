'use server';

import { SectionNewsMap } from "@/types/news.types";
import { decodeToken } from "@/utils/utils";
import { revalidatePath } from "next/cache";

export async function handleEditSectionsHome(selectedNews: SectionNewsMap) {

    const token = decodeToken();

    if (token.role !== 'admin' && token.role !== 'editor') {
        return { error: 'No tienes permisos para realizar esta acción' }
    }

    const data = {
        sections: selectedNews
    }

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL}api/edit-home/sections`, {
            method: 'PUT',
            credentials: 'include',
            body: JSON.stringify(data)
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