'use server'

import { decodeToken } from "@/utils/utils";
import { TransformationOptions, UploadApiOptions, v2 as cloudinary } from 'cloudinary';
import { revalidatePath } from "next/cache";

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

type ResourceType = "image" | "raw" | "video";


const processAndUploadFile = async (file: File, resourceType: ResourceType = "image", category: FormDataEntryValue | null, title: FormDataEntryValue | null) => {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    return new Promise<string>((resolve, reject) => {
        const options: UploadApiOptions = {
            folder: `Noticias/${category}/${title}`,
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
            resolve(result?.public_id || '');
        }).end(buffer);
    });
};

export const handleCreateNews = async (formData: FormData) => {

    const decodedToken = decodeToken();
    const author = decodedToken.fullname;

    const title = formData.get('title');
    const summary = formData.get('summary');
    const content = formData.get('content');
    const category = formData.get('category');
    const file = formData.get('image') as File;
    const isImage = file.type.startsWith('image');
    const isVideo = file.type.startsWith('video');

    let imageUrl;
    let videoUrl;

    if (isImage) {
        imageUrl = await processAndUploadFile(file, 'image', category, title);
    } else if (isVideo) {
        videoUrl = await processAndUploadFile(file, 'video', category, title);
    }

    const data = {
        title,
        summary,
        content,
        category,
        author,
        image: imageUrl || videoUrl,
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

