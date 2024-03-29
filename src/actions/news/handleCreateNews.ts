'use server'

import { decodeToken, handleError } from "@/utils/utils";
import { revalidatePath } from "next/cache";

export const handleCreateNews = async (formData: FormData) => {
    const decodedToken = decodeToken();
    const author = decodedToken.fullname;

    if (!author) {
        return { error: 'No autorizado' };
    }

    const data = {
        title: formData.get('title'),
        summary: formData.get('summary'),
        content: formData.get('content'),
        category: formData.get('category'),
        tags: formData.get('tags'),
        image: formData.get('image'),
        author: author
    }

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/news`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error);
        }

        revalidatePath('/dashboard');
        return await response.json();
    } catch (error) {
        return handleError(error);
    }
}
