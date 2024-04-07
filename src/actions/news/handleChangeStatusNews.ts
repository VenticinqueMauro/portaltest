'use server';

import { NewsStatus } from "@/models/news";
import { revalidatePath } from "next/cache";

export const handleNewsStatus = async (id: string, status: NewsStatus) => {

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

        revalidatePath('/dashboard');
        return data.message
    } catch (error) {
        if (error instanceof Error) {
            return error.message
        }
    }
}