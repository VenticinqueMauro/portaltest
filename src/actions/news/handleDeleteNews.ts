'use server';

import { revalidatePath } from "next/cache";
import { v2 as cloudinary } from 'cloudinary';
import { decodeToken } from '@/utils/utils';
import { CategoryNews, MediaNews } from "@/types/news.types";

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

interface Props {
    id: string;
    category?: CategoryNews,
    title?: string
    media?: MediaNews;
}

export const handleDeleteNews = async ({ id, category, title, media }: Props) => {

    const token = decodeToken();


    if (token.role !== 'admin' && token.role !== 'editor') {
        return { error: 'No autorizado' };
    }


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
            // Construir arrays de IDs de Cloudinary para cada tipo de recurso
            const publicIdsToDelete: { [key: string]: string[] } = {
                image: [],
                video: []
            };

            // Agregar los IDs de Cloudinary para cada tipo de recurso
            if (media.portada && media.portada.publicId) {
                const resourceType = media.portada.type === 'image' ? 'image' : 'video';
                publicIdsToDelete[resourceType].push(media.portada.publicId);
            }
            if (media.zona1 && media.zona1.publicId) {
                const resourceType = media.zona1.type === 'image' ? 'image' : 'video';
                publicIdsToDelete[resourceType].push(media.zona1.publicId);
            }
            if (media.gallery && media.gallery.length > 0) {
                media.gallery.forEach((item: any) => {
                    console.log(item)
                    if (item.publicId) {
                        publicIdsToDelete["image"].push(item.publicId);
                    }
                });
            }

            console.log(publicIdsToDelete)

            // Eliminar recursos en Cloudinary por tipo de recurso
            const deletePromises: Promise<any>[] = [];
            for (const resourceType in publicIdsToDelete) {
                if (publicIdsToDelete[resourceType].length > 0) {
                    const deletePromise = cloudinary.api.delete_resources(publicIdsToDelete[resourceType], {
                        type: 'upload',
                        resource_type: resourceType
                    });
                    deletePromises.push(deletePromise);
                }
            }

            // Esperar que todas las promesas de eliminación se completen
            await Promise.all(deletePromises).then(async () => {
                // Eliminar la carpeta en Cloudinary
                await cloudinary.api.delete_folder(`Noticias/${category === 'eco & negocios' ? 'eco-negocios' : category}/${title}`).then(console.log).catch(console.error);
            }).catch(console.error);
        }

        revalidatePath('/dashboard/noticias');
        return json;
    } catch (error) {
        if (error instanceof Error) {
            return error.message
        }
    }
}
