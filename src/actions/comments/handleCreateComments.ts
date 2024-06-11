'use server';

import { revalidatePath } from "next/cache";

export async function handleCreateComments(formData: FormData) {

    const content = formData.get('content');
    const newsId = formData.get('newsId');
    const category = formData.get('category');
    const userId = formData.get('userId');

    const data = {
        newsId,
        content,
        userId
    }

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL}api/news/comment`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const json = await res.json();

        revalidatePath(`${category}/${newsId}`);
        return json;
    } catch (error) {
        if (error instanceof Error) {
            return error.message
        }
    }

}