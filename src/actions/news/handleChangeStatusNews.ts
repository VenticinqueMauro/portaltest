'use server';

import { NewsStatus } from "@/types/news.types";
import { revalidatePath } from "next/cache";
import { decodeToken } from '@/utils/utils';


export const handleNewsStatus = async (id: string, status: NewsStatus) => {

    const token = decodeToken();

    if(token.role !== 'admin' && token.role !== 'editor') {
        return { error: 'No autorizado' };
    }

    const updatedStatus = status === 'publicado' ? 'pendiente' : 'publicado';

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL}api/news/status/${id}`, {
            method: "PATCH",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedStatus)
        })

        const data = await response.json();

        if (!response.ok) {
            return data.error;
        }

        revalidatePath('/dashboard/noticias');
        return data.message
    } catch (error) {
        if (error instanceof Error) {
            return error.message
        }
    }
}