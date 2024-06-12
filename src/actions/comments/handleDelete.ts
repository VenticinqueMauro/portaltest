'use server';

import { revalidatePath } from "next/cache";

export async function handleDelete(commentId: string, newsId: string, category: string) {

    const data = {
        newsId,
        commentId
    }

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL}api/news/comment`, {
            method: 'DELETE',
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