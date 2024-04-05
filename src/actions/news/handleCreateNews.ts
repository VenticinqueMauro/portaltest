'use server'

import { CategoryNews } from "@/models/news";
import { NewsType } from "@/types/news.types";
import { decodeToken } from "@/utils/utils";
import { TransformationOptions, UploadApiOptions, v2 as cloudinary } from 'cloudinary';
import { revalidatePath } from "next/cache";

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

type ResourceType = "image" | "raw" | "video";

interface CloudinaryUploadResult {
    public_id?: string;
    url?: string;
}

const processAndUploadFile = async (file: File, resourceType: ResourceType = "image", category: FormDataEntryValue | null, title: FormDataEntryValue | null) => {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    return new Promise<CloudinaryUploadResult>((resolve, reject) => {
        const options: UploadApiOptions = {
            folder: `Noticias/${category === 'eco & negocios' ? 'eco-negocios' : category}/${title}`,
            resource_type: resourceType,
            eager: {
                width: 400,
                height: 300,
                crop: 'fill',
                quality: 'auto',
            },
        };
        cloudinary.uploader.upload_stream(options, (error, result) => {
            if (error) {
                if (error.message.includes('too large')) {
                    reject('La imagen es demasiado grande. Por favor, elige una imagen más pequeña.');
                    return;
                } else {
                    reject(error.message);
                    return;
                }
            }
            const publicId = result?.public_id;
            const url = result?.eager?.[0]?.secure_url;

            if (publicId && url) {
                // Resuelve la promesa con un objeto que contiene el public_id y la url
                resolve({ public_id: publicId, url: url });
            } else {
                // Si no se pudo obtener el public_id o la url, rechaza la promesa con un mensaje de error
                reject('No se pudo obtener el public_id o la URL de la imagen cargada.');
            }
        }).end(buffer);
    });
};


export const handleCreateNews = async (formData: FormData) => {

    const decodedToken = decodeToken();
    const author = decodedToken.fullname;

    const title = formData.get('title');
    const summary = formData.get('summary');
    let content = formData.get('content') || '';
    const category = formData.get('category');
    const filePortada = formData.get('portada') as File;
    const fileContent = formData.get('imgContent') as File;
    const isImagePortada = filePortada.type.startsWith('image');
    const isImageContent = fileContent.type.startsWith('image');
    const isVideoPortada = filePortada.type.startsWith('video');
    const isVideoContent = fileContent.type.startsWith('video');

    let imagePortadaUrl: CloudinaryUploadResult | null = null;
    let videoPortadaUrl: CloudinaryUploadResult | null = null;
    let imageContentUrl: CloudinaryUploadResult | null = null;
    let videoContentUrl: CloudinaryUploadResult | null = null;

    if (isImagePortada) {
        imagePortadaUrl = await processAndUploadFile(filePortada, 'image', category, title);
    } else if (isVideoPortada) {
        videoPortadaUrl = await processAndUploadFile(filePortada, 'video', category, title);
    }

    if (isImageContent) {
        imageContentUrl = await processAndUploadFile(fileContent, 'image', category, title);
    } else if (isVideoContent) {
        videoContentUrl = await processAndUploadFile(fileContent, 'video', category, title);
    }

    // Reemplazar las URLs de las imágenes en el contenido si hay una URL de imagen
    if (imageContentUrl) {
        content = String(content).replace(/<img.*?src="(.*?)".*?>/g, () => {
            return `<img src="${imageContentUrl?.url}" alt="${title}" />`;
        });
    }
    if (videoContentUrl) {
        content = String(content).replace(/<img.*?src="(.*?)".*?>/g, () => {
            return `<video controls><source src="${videoContentUrl?.url}" type="video/mp4" /></video>`;
        });
    }


    const data = {
        title,
        summary,
        content,
        category,
        author,
        media: {
            portada: {
                publicId: imagePortadaUrl?.public_id || videoPortadaUrl?.public_id || '',
                url: imagePortadaUrl?.url || videoPortadaUrl?.url || '',
                type: imagePortadaUrl ? 'image' : (videoPortadaUrl ? 'video' : '')
            },
            zona1: {},
            zona2: {},
        }
    }

    // Comprobar si hay datos disponibles para zona1 antes de incluirlos en media
    if (imageContentUrl || videoContentUrl) {
        data.media.zona1 = {
            publicId: imageContentUrl?.public_id || videoContentUrl?.public_id || '',
            url: imageContentUrl?.url || videoContentUrl?.url || '',
            type: imageContentUrl ? 'image' : (videoContentUrl ? 'video' : '')
        };
    }

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL}api/news`, {
            method: 'POST',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
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

