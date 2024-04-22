'use server';

import { v2 as cloudinary } from 'cloudinary';
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

const processAndUploadFiles = async (file: File | null, resourceType: ResourceType = "image", role: FormDataEntryValue | null) => {
    if (file instanceof File && file.size > 0) {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = new Uint8Array(arrayBuffer);

        return new Promise<CloudinaryUploadResult>((resolve, reject) => {
            const options = {
                folder: `Administradores/${role}/`,
                resource_type: resourceType,
                eager: {
                    width: 100,
                    height: 100,
                    crop: 'auto',
                    aspect_ratio: '1:1',
                    quality: 'auto',
                },
                
            };
            cloudinary.uploader.upload_stream(options, (error, result) => {
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
    }
    return Promise.reject('El archivo no es válido.');
}

const deleteResources = async (publicId: string) => {
    try {
        // Utilizar await para esperar la resolución de la promesa
        await cloudinary.api.delete_resources([publicId], { type: 'upload', resource_type: 'image' });
        console.log('Imagen eliminada correctamente');
    } catch (error) {
        console.error('Error al eliminar la imagen:', error);
    }
}


interface Data {
    fullname?: string;
    email?: string;
    avatar?: {
        publicId: string;
        url: string;
    };
}

export async function handleUserAdminProfile(formData: FormData) {

    const id = formData.get('id') as string;
    const publicId = formData.get('publicId') as string;
    const oldFullname = formData.get('oldFullaname') as string;
    const newFullname = formData.get('fullname') as string;
    const oldEmail = formData.get('oldEmail') as string;
    const newEmail = formData.get('email') as string;
    const role = formData.get('role') as string;
    const avatar = formData.get('avatar') as File;


    const fullname = newFullname || oldFullname;
    const email = newEmail || oldEmail;

    let imageAvatar = null;

    if (avatar) {
        try {
            if (publicId) {
                await deleteResources(publicId);
            }
            const results = await processAndUploadFiles(avatar, 'image', role);
            imageAvatar = results;
        } catch (error) {
            console.error('Error al cargar y procesar el avatar:', error);
        }
    }


    const data: Data = {};

    if (fullname) {
        data.fullname = fullname;
    }

    if (email && email.length) {
        data.email = email;
    }

    if (imageAvatar && imageAvatar.public_id && imageAvatar.url) {
        data.avatar = {
            publicId: imageAvatar.public_id,
            url: imageAvatar.url
        };
    }

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL}api/auth/admin/${id}`, {
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
        revalidatePath('/dashboard/profile');
        return json;
    } catch (error) {
        if (error instanceof Error) {
            return error.message
        }
    }

}