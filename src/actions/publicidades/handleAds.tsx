'use server';

import { SectionName } from '@/components/dashboard/editar-home/EditorContainer';
import { Ad, AdPosition, AdSectionName, Ads } from '@/types/news.types';
import { v2 as cloudinary } from 'cloudinary';

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
                folder: `Publicidades/${sectionName}/${device}/${position}`,
                resource_type: resourceType,
                eager: {
                    crop: 'auto',
                    quality: 'auto',
                },
            };

            if (sectionName === 'portada') {
                if (position === 'top') {
                    options.eager.width = 970;
                    options.eager.height = 150;
                    options.eager.aspect_ratio = '970:150';
                } else if (position === 'side') {
                    options.eager.width = 200;
                    options.eager.height = 500;
                    options.eager.aspect_ratio = '200:500';
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
    const position = positionValue as AdPosition;

    const DesktopFile = formData.get('desktop') as File;
    const MobileFile = formData.get('mobile') as File;

    const ads: Ads = {
        ads: {
            home: {}
        }
    };

    const newAd: Ad = {
        media: {
            desktop: {
                top: { publicId: '', url: '' },
                side: { publicId: '', url: '' },
                bottom: { publicId: '', url: '' }
            },
            mobile: {
                top: { publicId: '', url: '' },
                side: { publicId: '', url: '' },
                bottom: { publicId: '', url: '' }
            }
        }
    };

    // Procesar el archivo de escritorio si está presente
    if (DesktopFile && newAd.media?.desktop && position) {
        try {
            const desktopMedia = await processAndUploadFiles(DesktopFile, 'image', section, 'desktop', position);
            newAd.media.desktop[position] = desktopMedia;
        } catch (error) {
            console.error('Error al cargar y procesar archivo de escritorio:', error);
        }
    }

    // Procesar el archivo móvil si está presente
    if (MobileFile && newAd.media?.mobile && position) {
        try {
            const mobileMedia = await processAndUploadFiles(MobileFile, 'image', section, 'mobile', position);
            newAd.media.mobile[position] = mobileMedia;
        } catch (error) {
            console.error('Error al cargar y procesar archivo móvil:', error);
        }
    }

    // Asignar el nuevo anuncio a la sección correspondiente
    ads.ads.home[section] = newAd;

    return ads;

    // let imageDesktop = null;
    // let imageMobile = null;

    // if (DesktopFile) {
    //     try {
    //         const results = await processAndUploadFiles(DesktopFile, 'image', section, 'desktop');
    //         imageDesktop = results;
    //     } catch (error) {
    //         console.error('Error al cargar y procesar archivo desktop:', error);
    //     }
    // }
    // if (MobileFile) {
    //     try {
    //         const results = await processAndUploadFiles(MobileFile, 'image', section, 'mobile');
    //         imageMobile = results;
    //     } catch (error) {
    //         console.error('Error al cargar y procesar archivo mobile:', error);
    //     }
    // }

    // console.log(imageDesktop)

    // const ad: Ad = {
    //     position: position === 'top' || position === 'side' || position === 'bottom' ? position : undefined,
    //     device: 'desktop',
    //     media: imageDesktop ? imageDesktop : undefined
    // };


    // return {
    //     section: section,
    //     ads: {
    //         [section]: [ad],
    //     },
    // };

    // if (fullname) {
    //     data.fullname = fullname;
    // }

    // if (email && email.length) {
    //     data.email = email;
    // }

    // if (imageAvatar && imageAvatar.public_id && imageAvatar.url) {
    //     data.avatar = {
    //         publicId: imageAvatar.public_id,
    //         url: imageAvatar.url
    //     };
    // }

    // try {
    //     const response = await fetch(`${process.env.NEXT_PUBLIC_URL}api/auth/admin/${id}`, {
    //         method: 'PATCH',
    //         credentials: "include",
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(data)
    //     });

    //     const json = await response.json();

    //     if (!response.ok) {
    //         return json.error
    //     }
    //     revalidatePath('/dashboard/profile');
    //     return json;
    // } catch (error) {
    //     if (error instanceof Error) {
    //         return error.message
    //     }
    // }

}