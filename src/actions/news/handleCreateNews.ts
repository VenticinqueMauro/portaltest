'use server'

import { decodeToken } from "@/utils/utils";
import { v2 as cloudinary } from 'cloudinary';
import { revalidatePath } from "next/cache";

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const processAndUploadFile = async (file: File, resourceType: string = '') => {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    return new Promise<string>((resolve, reject) => {
        const options: any = {};
        if (resourceType) {
            options.resource_type = resourceType;
        }

        cloudinary.uploader.upload_stream(options, (error, result) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(result?.secure_url || '');
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
        imageUrl = await processAndUploadFile(file);
    } else if (isVideo) {
        videoUrl = await processAndUploadFile(file, 'video');
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
