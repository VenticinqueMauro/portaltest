'use server';

import { revalidatePath } from "next/cache";
import { v2 as cloudinary } from 'cloudinary';
import { CategoryNews } from "@/models/news";

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

interface Props {
    id: string;
    category?: CategoryNews,
    title?: string
    media?: string;
}

export const handleDeleteNews = async ({ id, category, title, media }: Props) => {

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
            await cloudinary.api.delete_resources([`${media}`], {
                type: 'upload',
                resource_type: 'image'
            }).then(async () => {
                await cloudinary.api.delete_folder(`Noticias/${category}/${title}`).then(console.log).catch(console.error);
            }).catch(console.error);
        }

        revalidatePath('/dashboard');
        return json;
    } catch (error) {
        if (error instanceof Error) {
            return error.message
        }
    }
}