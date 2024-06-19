'use server';

import { Ad, AdPosition, AdSectionName, Ads } from '@/types/news.types';
import { v2 as cloudinary } from 'cloudinary';
import { revalidatePath } from 'next/cache';

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

type ResourceType = "image";

interface CloudinaryUploadResult {
    public_id?: string;
    url?: string;
}

const processAndUploadFiles = async (file: File | null, resourceType: ResourceType = "image", sectionName: FormDataEntryValue | null, device: 'desktop' | 'mobile', position: 'top' | 'side' | 'bottom'): Promise<CloudinaryUploadResult> => {
    if (file instanceof File && file.size > 0) {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = new Uint8Array(arrayBuffer);

        return new Promise<CloudinaryUploadResult>((resolve, reject) => {
            let options: any = {
                folder: `Publicidades/${sectionName === 'eco & negocios' && 'econegocios'}/${device}/${position}`,
                resource_type: resourceType,
                eager: {
                    crop: 'auto',
                    quality: '70',
                },
            };

            if (sectionName === 'portada') {
                if (device === 'desktop') {
                    if (position === 'top') {
                        options.eager.width = 970;
                        options.eager.height = 150;
                        options.eager.aspect_ratio = '970:150';
                    } else if (position === 'side') {
                        options.eager.width = 200;
                        options.eager.height = 500;
                        options.eager.aspect_ratio = '200:500';
                    }
                } else if (device === 'mobile') {
                    if (position === 'top') {
                        options.eager.width = 400;
                        options.eager.height = 100;
                        options.eager.aspect_ratio = '400:100';
                    } else if (position === 'side') {
                        options.eager.width = 400;
                        options.eager.height = 400;
                        options.eager.aspect_ratio = '400:400';
                    }
                }
            } else {
                if (position === 'top') {
                    options.eager.width = 970;
                    options.eager.height = 100;
                    options.eager.aspect_ratio = '970:100';
                } else if (position === 'side') {
                    options.eager.width = 200;
                    options.eager.height = 500;
                    options.eager.aspect_ratio = '200:500';
                } else if (position === 'bottom') {
                    options.eager.width = 480;
                    options.eager.height = 150;
                    options.eager.aspect_ratio = '480:150';
                }
            }

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




export async function handleAds(formData: FormData) {
    const sectionValue = formData.get('section');
    if (sectionValue === null) {
        return null;
    }
    const section = sectionValue as AdSectionName;

    const positionValue = formData.get('position');
    if (positionValue === null || !['top', 'side', 'bottom'].includes(positionValue as string)) {
        return null;
    }

    const deskPublicId = formData.get('deskPublicId');
    const mobPublicId = formData.get('mobPublicId');
    const position = positionValue as AdPosition;
    const DesktopFile = formData.get('desktop') as File;
    const MobileFile = formData.get('mobile') as File;
    const linkDesktop = formData.get('linkdesktop') as string;
    const linkMobile = formData.get('linkmobile') as string;


    if (!linkDesktop && !linkMobile) {
        return 'Debes agregar una url publicitaria';
    }

    const ads: Ads = {
        home: {}
    };

    const newAd: Ad = {
        media: {
            desktop: {
                top: { public_id: '', url: '', link: '' },
                side: { public_id: '', url: '', link: '' },
                bottom: { public_id: '', url: '', link: '' }
            },
            mobile: {
                top: { public_id: '', url: '', link: '' },
                side: { public_id: '', url: '', link: '' },
                bottom: { public_id: '', url: '', link: '' }
            }
        }
    };

    // Procesar el archivo de escritorio si está presente
    if (DesktopFile && newAd.media?.desktop && position) {
        try {
            if (deskPublicId) {
                await deleteResources(deskPublicId as string);
            }
            const desktopMedia = await processAndUploadFiles(DesktopFile, 'image', section, 'desktop', position);
            newAd.media.desktop[position] = {
                ...desktopMedia,
                link: linkDesktop
            };
        } catch (error) {
            console.error('Error al cargar y procesar archivo de escritorio:', error);
        }
    }

    // Procesar el archivo móvil si está presente
    if (MobileFile && newAd.media?.mobile && position) {
        try {
            if (mobPublicId) {
                await deleteResources(mobPublicId as string);
            }
            const mobileMedia = await processAndUploadFiles(MobileFile, 'image', section, 'mobile', position);
            newAd.media.mobile[position] = {
                ...mobileMedia,
                link: linkMobile
            };
        } catch (error) {
            console.error('Error al cargar y procesar archivo móvil:', error);
        }
    }

    // Asignar el nuevo anuncio a la sección correspondiente
    ads.home[section] = newAd;

    const data = {
        ads: ads
    };

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL}api/ads`, {
            method: 'PUT',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        const json = await response.json();

        if (!response.ok) {
            return json.error;
        }
        revalidatePath('/dashboard/publicidad');
        return json;
    } catch (error) {
        if (error instanceof Error) {
            return error.message;
        }
    }
}
