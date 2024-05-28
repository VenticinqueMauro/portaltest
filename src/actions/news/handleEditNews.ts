'use server';

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
                            width: 856,
                            height: 422,
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
                        width: 856,
                        height: 422,
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


export const handleEditNews = async (formData: FormData) => {

    const decodedToken = decodeToken();
    const modifiedBy = decodedToken.fullname;

    const newsJSONString = formData.get('news') as string;
    const news = JSON.parse(newsJSONString);

    const pretitle = formData.get('pretitle');
    const title = formData.get('title');
    const summary = formData.get('summary');
    const imageCaption = formData.get('caption') as string;
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
    const filePortada = formData.get('portada') as File | null;
    const fileContent = formData.get('imgContent') as File | null;
    const filesGallery = formData.getAll('gallery') as File[] | null;
    const isImagePortada = filePortada?.type.startsWith('image');
    const isImageContent = fileContent?.type.startsWith('image');
    const isVideoPortada = filePortada?.type.startsWith('video');
    const isVideoContent = fileContent?.type.startsWith('video');
    const tags = formData.getAll('tags');


    let imagePortadaUrl: CloudinaryUploadResult | null = null;
    let videoPortadaUrl: CloudinaryUploadResult | null = null;
    let imageContentUrl: CloudinaryUploadResult | null = null;
    let videoContentUrl: CloudinaryUploadResult | null = null;
    let imagesGalleryUrls: CloudinaryUploadResult[] = [];

    if (filePortada !== null && isImagePortada) {
        cloudinary.api
            .delete_resources([`${news.media.portada.publicId}`],
                { type: 'upload', resource_type: `${news.media.portada.type}` })
            .then(console.log);
        const results = await processAndUploadFiles(filePortada, 'image', category, title);
        imagePortadaUrl = results.length > 0 ? results[0] : null; // Solo toma el primer resultado
    } else if (filePortada !== null && isVideoPortada) {
        cloudinary.api
            .delete_resources([`${news.media.portada.publicId}`],
                { type: 'upload', resource_type: `${news.media.portada.type}` })
            .then(console.log);
        const results = await processAndUploadFiles(filePortada, 'video', category, title);
        videoPortadaUrl = results.length > 0 ? results[0] : null; // Solo toma el primer resultado
    }

    if (fileContent !== null && isImageContent) {
        cloudinary.api
            .delete_resources([`${news.media.zona1.publicId}`],
                { type: 'upload', resource_type: `${news.media.zona1.type}` })
            .then(console.log);
        const results = await processAndUploadFiles(fileContent, 'image', category, title);
        imageContentUrl = results.length > 0 ? results[0] : null; // Solo toma el primer resultado
    } else if (fileContent !== null && isVideoContent) {
        cloudinary.api
            .delete_resources([`${news.media.zona1.publicId}`],
                { type: 'upload', resource_type: `${news.media.zona1.type}` })
            .then(console.log);
        const results = await processAndUploadFiles(fileContent, 'video', category, title);
        videoContentUrl = results.length > 0 ? results[0] : null; // Solo toma el primer resultado
    }

    if (filesGallery !== null && filesGallery.length >= 3) {
        const publicIds = news.media.gallery.map((image: any) => image.publicId);
        cloudinary.api
            .delete_resources(publicIds,
                { type: 'upload', resource_type: 'image' })
            .then(console.log);
        const uploadPromises = filesGallery.map(file => processAndUploadFiles(file, 'image', category, title));
        const results = await Promise.all(uploadPromises);

        // Aplanar el array de resultados
        const flattenedResults = results.flat();

        imagesGalleryUrls = flattenedResults.filter(result => result !== null) as CloudinaryUploadResult[];
    }


    // Reemplazar las URLs de las imágenes en el contenido si hay una URL de imagen
    if (imageContentUrl) {
        content = String(content).replace(/<img.*?src="(.*?)".*?>/g, () => {
            return `<img src="${imageContentUrl?.url}" alt="${title}" class="object-cover rounded w-full aspect-video" />`;
        });
    }
    if (videoContentUrl) {
        content = String(content).replace(/<img.*?src="(.*?)".*?>/g, () => {
            return `<video controls><source src="${videoContentUrl?.url}" type="video/mp4" class="object-cover rounded w-full aspect-video" /></video>`;
        });
    }

    const formattedGallery = imagesGalleryUrls.map(item => ({
        publicId: item?.public_id,
        url: item?.url,
        type: 'image'
    }));

    const filteredTags = tags.filter(tags => tags !== '')

    // Función para transformar etiquetas <p> vacías en <br/>
    function transformEmptyParagraphs(content: any) {
        // Expresión regular para buscar etiquetas <p> vacías, incluyendo aquellas con clases y espacios en blanco
        const emptyParagraphRegex = /<p[^>]*>\s*<\/p>/g;
        // Reemplazar todas las coincidencias de etiquetas <p> vacías con <br/>
        return content.replace(emptyParagraphRegex, '<br/>');
    }

    // Lógica para transformar etiquetas <p> vacías en <br/> en el contenido
    const transformedContent = transformEmptyParagraphs(content);


    const data = {
        pretitle,
        title,
        summary,
        content: transformedContent,
        category,
        lastModifiedBy: modifiedBy,
        media: {
            portada: {
                caption: imageCaption.length > 0 ? imageCaption : news.media.portada.caption,
                publicId: imagePortadaUrl?.public_id || videoPortadaUrl?.public_id || news.media.portada.publicId,
                url: imagePortadaUrl?.url || videoPortadaUrl?.url || news.media.portada.url,
                type: imagePortadaUrl ? 'image' : (videoPortadaUrl ? 'video' : news.media.portada.type)
            },
            zona1: {},
            zona2: {},
            gallery: formattedGallery.length >= 3 ? formattedGallery : news.media.gallery
        },
        newsLinked: arrayLinkedNews,
        tags: filteredTags
    }

    // Comprobar si hay datos disponibles para zona1 antes de incluirlos en media
    if (imageContentUrl || videoContentUrl) {
        data.media.zona1 = {
            publicId: imageContentUrl?.public_id || videoContentUrl?.public_id || news.media.zona1.publicId,
            url: imageContentUrl?.url || videoContentUrl?.url || news.media.zona1.publicId,
            type: imageContentUrl ? 'image' : (videoContentUrl ? 'video' : news.media.portada.type)
        };
    }

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL}api/news/${news.id}`, {
            method: 'PATCH',
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
        revalidatePath('/dashboard/noticias');
        return json;
    } catch (error) {
        if (error instanceof Error) {
            return error.message
        }
    }
}

