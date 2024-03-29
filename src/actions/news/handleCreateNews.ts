'use server'

import { decodeToken } from "@/utils/utils";
import { revalidatePath } from "next/cache";

export const handleCreateNews = async (formData: FormData) => {
    const decodedToken = decodeToken();
    const author = decodedToken.fullname;

    if (!author) {
        return { error: 'No autorizado' };
    }

    const title = formData.get('title')
    const summary = formData.get('summary')
    const content = formData.get('content')
    const category = formData.get('category')
    const tags = formData.get('tags')
    const image = formData.get('image')


    const data = {
        title,
        summary,
        content,
        category,
        tags,
        image,
        author
    }

    const dataString = JSON.stringify(data);

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/news`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: dataString
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error);
        }

        revalidatePath('/dashboard');
        return await response.json();
    } catch (error) {
        return { error: 'Hubo un error al crear la noticia' };
    }
}
