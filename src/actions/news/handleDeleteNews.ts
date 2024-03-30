'use server';

import { revalidatePath } from "next/cache";

export const handleDeleteNews = async (id: string) => {

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL}api/news/${id}`, {
            method: 'DELETE',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const json = await response.json();

        if (!response.ok) {
            return json.error
        }

        revalidatePath('/dashboard');
        return json;
    } catch (error) {
        if (error instanceof Error) {
            return error.message
        }
    }
}