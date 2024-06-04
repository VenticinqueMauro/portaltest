import Image from 'next/image'
import React from 'react'
import { Separator } from '../ui/separator'
import { blurImage } from '@/utils/blurImage';
import Link from 'next/link';
import { fontLato } from '@/app/fonts';

interface Props {
    image: {
        type: "image" | "video";
        url: string;
    },
    pretitle: string;
    title: string;
    category: string;
    path: string;
    index: number;
    isLast: boolean;
}

export default function LateralIzquierdo({ image, pretitle, title, category, path, index, isLast }: Props) {
    return (
        <>
            <Link href={`${category}/${path}`} className="rounded flex flex-col justify-start md:hover:shadow md:hover:bg-gray-50 transition-all duration-100 cursor-pointer">
                <div className="px-1">
                    {/* DESKTOP DONDE SOLO SE MUESTRA LA IMAGEN DE LA PRIMERA NOTICIA  */}
                    <div className="hidden md:block relative -top-2">
                        {index === 0 && (
                            image.type !== 'video' ? (
                                <Image src={image.url} alt={title} width={856} height={422} placeholder="blur"
                                    blurDataURL={blurImage} className="w-full object-cover aspect-video rounded" />
                            ) : (
                                <video
                                    width="400"
                                    height="300"
                                    controls={true}
                                    autoPlay
                                    loop
                                    className="w-full object-cover aspect-video rounded"
                                >
                                    <source src={image.url} type="video/mp4" />
                                    Tu navegador no soporta la etiqueta de video.
                                </video>
                            )
                        )}
                    </div>
                    {/* MOBILE DONDE SE MUESTRAN IMAGENES EN TODAS LAS NOTICIAS  */}
                    <div className="md:hidden relative -top-2">
                        {(
                            image.type !== 'video' ? (
                                <Image src={image.url} alt={title} width={856} height={422} placeholder="blur"
                                    blurDataURL={blurImage} className="w-full object-cover aspect-video rounded" />
                            ) : (
                                <video
                                    width="400"
                                    height="300"
                                    controls={true}
                                    autoPlay
                                    loop
                                    className="w-full object-cover aspect-video rounded"
                                >
                                    <source src={image.url} type="video/mp4" />
                                    Tu navegador no soporta la etiqueta de video.
                                </video>
                            )
                        )}
                    </div>
                </div>
                <div className="text-start px-1">
                    <p className={`${fontLato.className} text-sm font-medium text-muted-foreground`}>{pretitle}</p>
                    <p className="font-semibold tracking-tight line-clamp-3">{title}</p>
                </div>
            </Link>
            {!isLast && (
                <Separator className="hidden md:block " />
            )}
            <Separator className="md:hidden mt-5 mb-7" />
        </>
    )
}
