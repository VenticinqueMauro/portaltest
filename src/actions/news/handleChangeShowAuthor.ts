'use server';

import { decodeToken } from '@/utils/utils';
import { revalidatePath } from "next/cache";

export const handleChangeShowAuthor = async (id: string, currentVisibility: boolean) => {
    const token = decodeToken();

    if (token.role !== 'admin' && token.role !== 'editor') {
        return { error: 'No autorizado' };
    }

    const updatedVisibility = !currentVisibility;

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL}api/news/show-author/${id}`, {
            method: "PATCH",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ showAuthor: updatedVisibility })
        });

        const data = await response.json();

        if (!response.ok) {
            return { error: data.error };
        }

        revalidatePath('/dashboard/noticias');
        return data;
    } catch (error) {
        if (error instanceof Error) {
            return { error: error.message };
        }
    }
};