'use server';

import { revalidatePath } from "next/cache";
import { v2 as cloudinary } from 'cloudinary';

interface Props {
    id: string;
    media?: string;
}

export const handleDeleteNews = async ({ id, media }: Props) => {

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

        if (media) {
            await cloudinary.uploader.destroy(media);
        }

        revalidatePath('/dashboard');
        return json;
    } catch (error) {
        if (error instanceof Error) {
            return error.message
        }
    }
}