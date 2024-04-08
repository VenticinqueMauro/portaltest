'use server'

import { decodeToken } from "@/utils/utils";
import { UploadApiOptions, v2 as cloudinary } from 'cloudinary';
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

const processAndUploadFiles = async (files: File[] | File | null, resourceType: ResourceType = "image", category: FormDataEntryValue | null, title: FormDataEntryValue | null) => {
    const uploadPromises: Promise<CloudinaryUploadResult>[] = [];


    if (Array.isArray(files)) {
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            if (file instanceof File) { // Verifica si es un archivo válido
                const arrayBuffer = await file.arrayBuffer();
                const buffer = new Uint8Array(arrayBuffer);

                const uploadPromise = new Promise<CloudinaryUploadResult>((resolve, reject) => {
                    const options: UploadApiOptions = {
                        folder: `Noticias/${category === 'eco & negocios' ? 'eco-negocios' : category}/${title}/galeria`,
                        resource_type: resourceType,
                        eager: {
                            width: 400,
                            height: 300,
                            crop: 'limit',
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

                uploadPromises.push(uploadPromise);
            }
        }
    } else {
        // Si solo hay un archivo, procesa ese archivo directamente
        if (files instanceof File && files.size > 0) { // Verifica si es un archivo válido
            const arrayBuffer = await files.arrayBuffer();
            const buffer = new Uint8Array(arrayBuffer);

            const uploadPromise = new Promise<CloudinaryUploadResult>((resolve, reject) => {
                const options: UploadApiOptions = {
                    folder: `Noticias/${category === 'eco & negocios' ? 'eco-negocios' : category}/${title}`,
                    resource_type: resourceType,
                    eager: {
                        width: 400,
                        height: 300,
                        crop: 'limit',
                        quality: 'auto',
                    },
                };
                cloudinary.uploader.upload_stream(options, (error, result) => {
                    console.log(options)
                    if (error) {
                        if (error.message.includes('too large')) {
                            reject('La imagen es demasiado grande. Por favor, elige una imagen más pequeña.');
                            return;
                        } else {
                            console.log('ERRORASO!', error)
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

            uploadPromises.push(uploadPromise);
        }
    }

    return Promise.all(uploadPromises);
};



export const handleCreateNews = async (formData: FormData) => {

    const decodedToken = decodeToken();
    const author = decodedToken.fullname;

    const title = formData.get('title');
    const summary = formData.get('summary');
    let content = formData.get('content') || '';
    let arrayLinkedNews: string[] = [];
    const newsLinkedForm = formData.get('newsLinked');

    if (Array.isArray(newsLinkedForm)) {
        // Iteramos sobre cada elemento del array
        newsLinkedForm.forEach(item => {
            // Removemos corchetes y comillas y dividimos por coma
            const splitItems = item.replace(/\[|\]|"/g, '').split(',');
            // Agregamos los valores resultantes a arrayLinkedNews
            arrayLinkedNews = arrayLinkedNews.concat(splitItems);
        });
    } else if (typeof newsLinkedForm === 'string') {
        // Removemos corchetes y comillas y dividimos por coma
        arrayLinkedNews = newsLinkedForm.replace(/\[|\]|"/g, '').split(',');
    }

    const category = formData.get('category');
    const filePortada = formData.get('portada') as File;
    const fileContent = formData.get('imgContent') as File;
    const filesGallery = formData.getAll('gallery') as File[] | null;
    const isImagePortada = filePortada.type.startsWith('image');
    const isImageContent = fileContent.type.startsWith('image');
    const isVideoPortada = filePortada.type.startsWith('video');
    const isVideoContent = fileContent.type.startsWith('video');

    let imagePortadaUrl: CloudinaryUploadResult | null = null;
    let videoPortadaUrl: CloudinaryUploadResult | null = null;
    let imageContentUrl: CloudinaryUploadResult | null = null;
    let videoContentUrl: CloudinaryUploadResult | null = null;
    let imagesGalleryUrls: CloudinaryUploadResult[] = [];

    if (isImagePortada) {
        const results = await processAndUploadFiles(filePortada, 'image', category, title);
        imagePortadaUrl = results.length > 0 ? results[0] : null; // Solo toma el primer resultado
    } else if (isVideoPortada) {
        const results = await processAndUploadFiles(filePortada, 'video', category, title);
        videoPortadaUrl = results.length > 0 ? results[0] : null; // Solo toma el primer resultado
    }

    if (isImageContent) {
        const results = await processAndUploadFiles(fileContent, 'image', category, title);
        imageContentUrl = results.length > 0 ? results[0] : null; // Solo toma el primer resultado
    } else if (isVideoContent) {
        const results = await processAndUploadFiles(fileContent, 'video', category, title);
        videoContentUrl = results.length > 0 ? results[0] : null; // Solo toma el primer resultado
    }

    if (filesGallery !== null && filesGallery.length > 0) {
        const uploadPromises = filesGallery.map(file => processAndUploadFiles(file, 'image', category, title));
        const results = await Promise.all(uploadPromises);

        // Aplanar el array de resultados
        const flattenedResults = results.flat();

        imagesGalleryUrls = flattenedResults.filter(result => result !== null) as CloudinaryUploadResult[];
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

    const formattedGallery = imagesGalleryUrls.map(item => ({
        publicId: item?.public_id,
        url: item?.url,
        type: 'image'
    }));

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
            gallery: formattedGallery
        },
        newsLinked: arrayLinkedNews
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

